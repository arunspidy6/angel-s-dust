import sqlite3 from 'sqlite3'
import path from 'path'

const dbPath = path.join(__dirname, '..', 'cms.db')
const db = new sqlite3.Database(dbPath)

export interface Message {
  id: string
  name: string
  email: string
  message: string
  read: boolean
  createdAt: string
}

export function getMessages(): Message[] {
  return new Promise((resolve, reject) => {
    db.all('SELECT * FROM messages ORDER BY createdAt DESC', (err, rows) => {
      if (err) reject(err)
      else resolve((rows || []).map(r => ({ ...r, read: Boolean(r.read) })))
    })
  }) as any
}

export function addMessage(message: Omit<Message, 'id' | 'createdAt' | 'read'>): Message {
  const id = `msg_${Date.now()}`
  return new Promise((resolve, reject) => {
    db.run(
      `INSERT INTO messages (id, name, email, message) VALUES (?, ?, ?, ?)`,
      [id, message.name, message.email, message.message],
      function (err) {
        if (err) reject(err)
        else resolve({
          id,
          ...message,
          read: false,
          createdAt: new Date().toISOString()
        })
      }
    )
  }) as any
}

export function deleteMessage(id: string): void {
  db.run('DELETE FROM messages WHERE id = ?', [id])
}
