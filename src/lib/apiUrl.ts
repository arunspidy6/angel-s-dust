// Dev: set VITE_API_URL=http://localhost:3001 in .env.local
// Vercel: empty string → /api/* routes are served by serverless functions on the same domain
export const API_BASE = (import.meta as any).env?.VITE_API_URL ?? ''

export function getAdminToken(): string {
  return localStorage.getItem('admin_token') ?? ''
}

export function adminHeaders(): HeadersInit {
  return {
    'Content-Type': 'application/json',
    'x-admin-token': getAdminToken(),
  }
}
