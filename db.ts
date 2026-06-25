import sqlite3 from 'sqlite3'
import path from 'path'
import { fileURLToPath } from 'url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const dbPath = path.join(__dirname, 'cms.db')
const db = new sqlite3.Database(dbPath)

export interface Product {
  id: string
  number: string
  title: string
  img: string
  desc: string
  sub: string
  price: string
  imgLeft: boolean
}

export function initDatabase() {
  db.run(`
    CREATE TABLE IF NOT EXISTS products (
      id TEXT PRIMARY KEY,
      number TEXT,
      title TEXT,
      img TEXT,
      desc TEXT,
      sub TEXT,
      price TEXT,
      imgLeft BOOLEAN,
      createdAt DATETIME DEFAULT CURRENT_TIMESTAMP,
      updatedAt DATETIME DEFAULT CURRENT_TIMESTAMP
    )
  `)

  db.run(`
    CREATE TABLE IF NOT EXISTS orders (
      id TEXT PRIMARY KEY,
      name TEXT,
      email TEXT,
      phone TEXT,
      items TEXT,
      totalPrice REAL,
      status TEXT DEFAULT 'pending',
      notes TEXT,
      createdAt DATETIME DEFAULT CURRENT_TIMESTAMP,
      updatedAt DATETIME DEFAULT CURRENT_TIMESTAMP
    )
  `)

  db.run(`
    CREATE TABLE IF NOT EXISTS messages (
      id TEXT PRIMARY KEY,
      name TEXT,
      email TEXT,
      message TEXT,
      read BOOLEAN DEFAULT 0,
      createdAt DATETIME DEFAULT CURRENT_TIMESTAMP
    )
  `)

  db.run(`
    CREATE TABLE IF NOT EXISTS reviews (
      id TEXT PRIMARY KEY,
      author TEXT,
      time TEXT,
      stars INTEGER,
      text TEXT,
      approved BOOLEAN DEFAULT 0,
      createdAt DATETIME DEFAULT CURRENT_TIMESTAMP
    )
  `)
}

export function getProducts(): Product[] {
  return new Promise((resolve, reject) => {
    db.all('SELECT * FROM products ORDER BY number ASC', (err, rows) => {
      if (err) reject(err)
      else resolve(rows || [])
    })
  }) as any
}

export function addProduct(product: Omit<Product, 'id'>): Product {
  const id = `prod_${Date.now()}`
  return new Promise((resolve, reject) => {
    db.run(
      `INSERT INTO products (id, number, title, img, desc, sub, price, imgLeft) VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
      [id, product.number, product.title, product.img, product.desc, product.sub, product.price, product.imgLeft ? 1 : 0],
      function (err) {
        if (err) reject(err)
        else resolve({ id, ...product })
      }
    )
  }) as any
}

export function updateProduct(id: string, updates: Partial<Product>): Product {
  return new Promise((resolve, reject) => {
    const fields = Object.keys(updates)
      .filter(k => k !== 'id')
      .map(k => `${k} = ?`)
      .join(', ')
    const values = Object.keys(updates)
      .filter(k => k !== 'id')
      .map(k => updates[k as keyof Product])

    db.run(
      `UPDATE products SET ${fields}, updatedAt = CURRENT_TIMESTAMP WHERE id = ?`,
      [...values, id],
      function (err) {
        if (err) reject(err)
        else resolve({ id, ...updates } as Product)
      }
    )
  }) as any
}

export function deleteProduct(id: string): void {
  db.run('DELETE FROM products WHERE id = ?', [id])
}
