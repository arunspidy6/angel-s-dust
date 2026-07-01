import type { VercelRequest, VercelResponse } from '@vercel/node'

export default function handler(req: VercelRequest, res: VercelResponse) {
  res.setHeader('Access-Control-Allow-Origin', '*')
  res.setHeader('Access-Control-Allow-Methods', 'POST,OPTIONS')
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type')
  if (req.method === 'OPTIONS') return res.status(200).end()

  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' })

  const { password } = req.body ?? {}
  const adminPassword = process.env.ADMIN_PASSWORD

  if (!adminPassword) {
    return res.status(500).json({ error: 'ADMIN_PASSWORD is not configured on the server' })
  }

  if (password === adminPassword) {
    return res.json({ ok: true })
  }

  return res.status(401).json({ error: 'Incorrect password' })
}
