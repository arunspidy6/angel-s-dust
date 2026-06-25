import type { VercelRequest, VercelResponse } from '@vercel/node'
import { neon } from '@neondatabase/serverless'

export default async function handler(req: VercelRequest, res: VercelResponse) {
  res.setHeader('Access-Control-Allow-Origin', '*')
  res.setHeader('Access-Control-Allow-Methods', 'GET,POST,OPTIONS')
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type')
  if (req.method === 'OPTIONS') return res.status(200).end()

  const sql = neon(process.env.angel_dust_db_POSTGRES_URL ?? process.env.POSTGRES_URL ?? process.env.DATABASE_URL ?? "")
  try {
    await sql`CREATE TABLE IF NOT EXISTS content (
      key TEXT PRIMARY KEY, value TEXT, updated_at TIMESTAMP DEFAULT NOW()
    )`

    if (req.method === 'GET') {
      const rows = await sql`SELECT key, value FROM content`
      const content: Record<string, string> = {}
      rows.forEach((r: any) => { content[r.key] = r.value })
      return res.json(content)
    }
    if (req.method === 'POST') {
      for (const [key, value] of Object.entries(req.body as Record<string, string>)) {
        await sql`INSERT INTO content (key, value) VALUES (${key}, ${value})
          ON CONFLICT (key) DO UPDATE SET value=${value}, updated_at=NOW()`
      }
      return res.json({ success: true })
    }
    return res.status(405).json({ error: 'Method not allowed' })
  } catch (err: any) {
    console.error('/api/content error:', err.message)
    return res.status(500).json({ error: err.message })
  }
}
