import { neon } from '@neondatabase/serverless'

// Neon serverless driver — works with Vercel's Neon Postgres integration
// Env var POSTGRES_URL is set automatically when you connect Neon in Vercel Storage
const sql = neon(process.env.POSTGRES_URL!)

export default sql
