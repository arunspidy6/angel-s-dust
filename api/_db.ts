import postgres from 'postgres'

// Works with Supabase, Vercel Postgres, Neon, or any PostgreSQL
const sql = postgres(process.env.POSTGRES_URL || process.env.DATABASE_URL!, {
  max: 1,           // serverless: one connection per function instance
  idle_timeout: 20,
  connect_timeout: 10,
  ssl: 'require',
})

export default sql
