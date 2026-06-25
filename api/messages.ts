import type { VercelRequest, VercelResponse } from '@vercel/node'
import { sql } from '@vercel/postgres'

async function ensureTable() {
  await sql`CREATE TABLE IF NOT EXISTS messages (
    id TEXT PRIMARY KEY,
    name TEXT,
    email TEXT,
    message TEXT,
    created_at TIMESTAMP DEFAULT NOW()
  )`
}

export default async function handler(req: VercelRequest, res: VercelResponse) {
  res.setHeader('Access-Control-Allow-Origin', '*')
  res.setHeader('Access-Control-Allow-Methods', 'GET,POST,DELETE,OPTIONS')
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type')
  if (req.method === 'OPTIONS') return res.status(200).end()

  await ensureTable()

  const id = req.query.id as string | undefined

  if (req.method === 'GET') {
    const { rows } = await sql`SELECT * FROM messages ORDER BY created_at DESC`
    return res.json(rows)
  }

  if (req.method === 'POST') {
    const { name, email, message } = req.body
    const newId = crypto.randomUUID()
    await sql`INSERT INTO messages (id, name, email, message) VALUES (${newId}, ${name}, ${email}, ${message})`
    return res.status(201).json({ id: newId, name, email, message })
  }

  if (req.method === 'DELETE' && id) {
    await sql`DELETE FROM messages WHERE id=${id}`
    return res.json({ success: true })
  }

  return res.status(405).json({ error: 'Method not allowed' })
}
