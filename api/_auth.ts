import type { VercelRequest } from '@vercel/node'

export function isAdmin(req: VercelRequest): boolean {
  const token = req.headers['x-admin-token']
  const adminPassword = process.env.ADMIN_PASSWORD
  if (!adminPassword) return false
  return token === adminPassword
}
