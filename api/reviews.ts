import type { VercelRequest, VercelResponse } from '@vercel/node'
import { neon } from '@neondatabase/serverless'
import { isAdmin } from './_auth'

export default async function handler(req: VercelRequest, res: VercelResponse) {
  res.setHeader('Access-Control-Allow-Origin', '*')
  res.setHeader('Access-Control-Allow-Methods', 'GET,POST,PUT,DELETE,OPTIONS')
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type,x-admin-token')
  if (req.method === 'OPTIONS') return res.status(200).end()

  const sql = neon(process.env.angel_dust_db_POSTGRES_URL ?? process.env.POSTGRES_URL ?? process.env.DATABASE_URL ?? "")
  try {
    await sql`CREATE TABLE IF NOT EXISTS reviews (
      id TEXT PRIMARY KEY, name TEXT, rating INTEGER, comment TEXT,
      approved BOOLEAN DEFAULT false, created_at TIMESTAMP DEFAULT NOW()
    )`
    const id = req.query.id as string | undefined

    if (req.method === 'GET') {
      const rows = await sql`SELECT * FROM reviews ORDER BY created_at DESC`
      return res.json(rows)
    }
    if (req.method === 'POST') {
      // Customers submit reviews — public
      const { name, rating, comment } = req.body
      const newId = crypto.randomUUID()
      await sql`INSERT INTO reviews (id, name, rating, comment) VALUES (${newId}, ${name}, ${rating}, ${comment})`
      return res.status(201).json({ id: newId, name, rating, comment, approved: false })
    }
    if (req.method === 'PUT' && id) {
      if (!isAdmin(req)) return res.status(401).json({ error: 'Unauthorized' })
      const { approved } = req.body
      await sql`UPDATE reviews SET approved=${approved} WHERE id=${id}`
      return res.json({ id, approved })
    }
    if (req.method === 'DELETE' && id) {
      if (!isAdmin(req)) return res.status(401).json({ error: 'Unauthorized' })
      await sql`DELETE FROM reviews WHERE id=${id}`
      return res.json({ success: true })
    }
    return res.status(405).json({ error: 'Method not allowed' })
  } catch (err: any) {
    console.error('/api/reviews error:', err.message)
    return res.status(500).json({ error: err.message })
  }
}
