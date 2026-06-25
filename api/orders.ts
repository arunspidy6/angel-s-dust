import sqlite3 from 'sqlite3'
import path from 'path'

const dbPath = path.join(__dirname, '..', 'cms.db')
const db = new sqlite3.Database(dbPath)

export interface Order {
  id: string
  name: string
  email: string
  phone: string
  items: string
  totalPrice: number
  status: 'pending' | 'confirmed' | 'shipped' | 'completed' | 'cancelled'
  notes: string
  createdAt: string
  updatedAt: string
}

export function getOrders(): Order[] {
  return new Promise((resolve, reject) => {
    db.all('SELECT * FROM orders ORDER BY createdAt DESC', (err, rows) => {
      if (err) reject(err)
      else resolve(rows || [])
    })
  }) as any
}

export function addOrder(order: Omit<Order, 'id' | 'createdAt' | 'updatedAt'>): Order {
  const id = `ord_${Date.now()}`
  return new Promise((resolve, reject) => {
    db.run(
      `INSERT INTO orders (id, name, email, phone, items, totalPrice, status, notes) VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
      [id, order.name, order.email, order.phone, order.items, order.totalPrice, order.status || 'pending', order.notes || ''],
      function (err) {
        if (err) reject(err)
        else resolve({
          id,
          ...order,
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString()
        })
      }
    )
  }) as any
}

export function updateOrderStatus(id: string, status: string): Order {
  return new Promise((resolve, reject) => {
    db.run(
      `UPDATE orders SET status = ?, updatedAt = CURRENT_TIMESTAMP WHERE id = ?`,
      [status, id],
      function (err) {
        if (err) reject(err)
        else resolve({ id, status } as any)
      }
    )
  }) as any
}

export function deleteOrder(id: string): void {
  db.run('DELETE FROM orders WHERE id = ?', [id])
}
