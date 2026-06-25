import type { VercelRequest, VercelResponse } from '@vercel/node'
import { neon } from '@neondatabase/serverless'

export default async function handler(req: VercelRequest, res: VercelResponse) {
  res.setHeader('Access-Control-Allow-Origin', '*')
  res.setHeader('Access-Control-Allow-Methods', 'GET,POST,PUT,DELETE,OPTIONS')
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type')
  if (req.method === 'OPTIONS') return res.status(200).end()

  const sql = neon(process.env.angel_dust_db_POSTGRES_URL ?? process.env.POSTGRES_URL ?? process.env.DATABASE_URL ?? "")
  try {
    await sql`CREATE TABLE IF NOT EXISTS orders (
      id TEXT PRIMARY KEY, name TEXT, email TEXT, phone TEXT, items TEXT,
      total_price NUMERIC DEFAULT 0, status TEXT DEFAULT 'pending',
      notes TEXT, pickup_date TEXT, created_at TIMESTAMP DEFAULT NOW()
    )`
    const id = req.query.id as string | undefined

    if (req.method === 'GET') {
      const rows = await sql`SELECT * FROM orders ORDER BY created_at DESC`
      return res.json(rows)
    }
    if (req.method === 'POST') {
      const { name, email, phone, items, totalPrice, status, notes, pickupDate } = req.body
      const newId = crypto.randomUUID()
      await sql`INSERT INTO orders (id, name, email, phone, items, total_price, status, notes, pickup_date)
        VALUES (${newId}, ${name}, ${email}, ${phone}, ${items}, ${totalPrice ?? 0}, ${status ?? 'pending'}, ${notes}, ${pickupDate})`
      return res.status(201).json({ id: newId, ...req.body })
    }
    if (req.method === 'PUT' && id) {
      const { status } = req.body
      await sql`UPDATE orders SET status=${status} WHERE id=${id}`
      return res.json({ id, status })
    }
    if (req.method === 'DELETE' && id) {
      await sql`DELETE FROM orders WHERE id=${id}`
      return res.json({ success: true })
    }
    return res.status(405).json({ error: 'Method not allowed' })
  } catch (err: any) {
    console.error('/api/orders error:', err.message)
    return res.status(500).json({ error: err.message })
  }
}
