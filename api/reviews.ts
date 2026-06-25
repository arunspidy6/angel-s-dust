import sqlite3 from 'sqlite3'
import path from 'path'

const dbPath = path.join(__dirname, '..', 'cms.db')
const db = new sqlite3.Database(dbPath)

export interface Review {
  id: string
  author: string
  time: string
  stars: number
  text: string
  approved: boolean
  createdAt: string
}

export function getReviews(): Review[] {
  return new Promise((resolve, reject) => {
    db.all('SELECT * FROM reviews WHERE approved = 1 ORDER BY createdAt DESC', (err, rows) => {
      if (err) reject(err)
      else resolve((rows || []).map(r => ({ ...r, approved: Boolean(r.approved) })))
    })
  }) as any
}

export function addReview(review: Omit<Review, 'id' | 'createdAt' | 'approved'>): Review {
  const id = `rev_${Date.now()}`
  return new Promise((resolve, reject) => {
    db.run(
      `INSERT INTO reviews (id, author, time, stars, text, approved) VALUES (?, ?, ?, ?, ?, 0)`,
      [id, review.author, review.time, review.stars, review.text],
      function (err) {
        if (err) reject(err)
        else resolve({
          id,
          ...review,
          approved: false,
          createdAt: new Date().toISOString()
        })
      }
    )
  }) as any
}

export function updateReview(id: string, updates: Partial<Review>): Review {
  return new Promise((resolve, reject) => {
    const fields = Object.keys(updates)
      .filter(k => !['id', 'createdAt'].includes(k))
      .map(k => `${k} = ?`)
      .join(', ')
    const values = Object.keys(updates)
      .filter(k => !['id', 'createdAt'].includes(k))
      .map(k => updates[k as keyof Review])

    db.run(
      `UPDATE reviews SET ${fields} WHERE id = ?`,
      [...values, id],
      function (err) {
        if (err) reject(err)
        else resolve({ id, ...updates } as any)
      }
    )
  }) as any
}

export function deleteReview(id: string): void {
  db.run('DELETE FROM reviews WHERE id = ?', [id])
}
