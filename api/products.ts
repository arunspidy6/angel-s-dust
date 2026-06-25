import type { VercelRequest, VercelResponse } from '@vercel/node'
import sql from './_db'

async function ensureTable() {
  await sql`CREATE TABLE IF NOT EXISTS products (
    id TEXT PRIMARY KEY,
    number TEXT,
    title TEXT,
    description TEXT,
    sub TEXT,
    price TEXT,
    img TEXT,
    img_position TEXT DEFAULT 'center',
    img_left BOOLEAN DEFAULT true,
    created_at TIMESTAMP DEFAULT NOW()
  )`
}

export default async function handler(req: VercelRequest, res: VercelResponse) {
  res.setHeader('Access-Control-Allow-Origin', '*')
  res.setHeader('Access-Control-Allow-Methods', 'GET,POST,PUT,DELETE,OPTIONS')
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type')
  if (req.method === 'OPTIONS') return res.status(200).end()

  try {
    await ensureTable()
    const id = req.query.id as string | undefined

    if (req.method === 'GET') {
      const rows = await sql`SELECT * FROM products ORDER BY number ASC`
      return res.json(rows)
    }
    if (req.method === 'POST') {
      const { number, title, desc, description, sub, price, img, img_position, imgLeft, img_left } = req.body
      const newId = crypto.randomUUID()
      await sql`INSERT INTO products (id, number, title, description, sub, price, img, img_position, img_left)
        VALUES (${newId}, ${number}, ${title}, ${desc ?? description}, ${sub}, ${price}, ${img}, ${img_position ?? 'center'}, ${imgLeft ?? img_left ?? true})`
      return res.status(201).json({ id: newId, ...req.body })
    }
    if (req.method === 'PUT' && id) {
      const { number, title, desc, description, sub, price, img, img_position, imgLeft, img_left } = req.body
      await sql`UPDATE products SET number=${number}, title=${title}, description=${desc ?? description},
        sub=${sub}, price=${price}, img=${img}, img_position=${img_position ?? 'center'}, img_left=${imgLeft ?? img_left ?? true} WHERE id=${id}`
      return res.json({ id, ...req.body })
    }
    if (req.method === 'DELETE' && id) {
      await sql`DELETE FROM products WHERE id=${id}`
      return res.json({ success: true })
    }
    return res.status(405).json({ error: 'Method not allowed' })
  } catch (err: any) {
    console.error('/api/products error:', err.message)
    return res.status(500).json({ error: err.message })
  }
}
