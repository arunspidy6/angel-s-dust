import { useState, useEffect } from 'react'

interface Review {
  id: string
  author: string
  time: string
  stars: number
  text: string
  approved: boolean
  createdAt: string
}

export default function ReviewsManager() {
  const [reviews, setReviews] = useState<Review[]>([])
  const [pendingReviews, setPendingReviews] = useState<Review[]>([])
  const [loading, setLoading] = useState(true)
  const [showPending, setShowPending] = useState(true)

  useEffect(() => {
    fetchReviews()
    const interval = setInterval(fetchReviews, 5000)
    return () => clearInterval(interval)
  }, [])

  const fetchReviews = async () => {
    try {
      const res = await fetch('http://localhost:3001/api/reviews')
      const data = await res.json()
      setReviews(data)

      // Fetch pending reviews
      const pendingRes = await fetch('http://localhost:3001/api/reviews/pending')
      if (pendingRes.ok) {
        const pendingData = await pendingRes.json()
        setPendingReviews(pendingData)
      }
    } catch (err) {
      console.error('Failed to fetch reviews:', err)
    } finally {
      setLoading(false)
    }
  }

  const approveReview = async (id: string) => {
    try {
      await fetch(`http://localhost:3001/api/reviews/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ approved: true }),
      })
      fetchReviews()
    } catch (err) {
      console.error('Failed to approve review:', err)
    }
  }

  const deleteReview = async (id: string) => {
    if (!confirm('Delete this review?')) return
    try {
      await fetch(`http://localhost:3001/api/reviews/${id}`, { method: 'DELETE' })
      fetchReviews()
    } catch (err) {
      console.error('Failed to delete review:', err)
    }
  }

  if (loading) return <div>Loading...</div>

  return (
    <div>
      <h2 style={{ marginBottom: '2rem' }}>Reviews</h2>

      {/* Pending Reviews */}
      {pendingReviews.length > 0 && (
        <div style={{ marginBottom: '3rem', padding: '1.5rem', background: '#fff3cd', border: '1px solid #ffc107', borderRadius: '4px' }}>
          <h3 style={{ margin: '0 0 1rem 0', color: '#856404' }}>⏳ Pending Approval ({pendingReviews.length})</h3>
          <div style={{ display: 'grid', gap: '1rem' }}>
            {pendingReviews.map(review => (
              <div key={review.id} style={{ padding: '1rem', background: 'white', borderRadius: '4px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start', marginBottom: '0.5rem' }}>
                  <div>
                    <h4 style={{ margin: 0 }}>{review.author}</h4>
                    <p style={{ margin: '0.25rem 0', fontSize: '0.875rem', color: '#666' }}>
                      {'★'.repeat(review.stars)}{'☆'.repeat(5 - review.stars)}
                    </p>
                  </div>
                  <p style={{ margin: 0, fontSize: '0.75rem', color: '#999' }}>{new Date(review.createdAt).toLocaleDateString()}</p>
                </div>
                <p style={{ margin: '0.5rem 0', fontSize: '0.9375rem', color: '#2D2422', lineHeight: 1.6 }}>
                  "{review.text}"
                </p>
                <div style={{ display: 'flex', gap: '0.5rem', marginTop: '1rem' }}>
                  <button
                    onClick={() => approveReview(review.id)}
                    style={{
                      padding: '0.5rem 1rem',
                      background: '#4CAF50',
                      color: 'white',
                      border: 'none',
                      cursor: 'pointer',
                      borderRadius: '4px',
                      fontSize: '0.875rem',
                      fontWeight: 600,
                    }}
                  >
                    Approve
                  </button>
                  <button
                    onClick={() => deleteReview(review.id)}
                    style={{
                      padding: '0.5rem 1rem',
                      background: '#d32f2f',
                      color: 'white',
                      border: 'none',
                      cursor: 'pointer',
                      borderRadius: '4px',
                      fontSize: '0.875rem',
                    }}
                  >
                    Reject
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Approved Reviews */}
      <div>
        <h3 style={{ marginBottom: '1rem' }}>✓ Published ({reviews.length})</h3>
        {reviews.length === 0 ? (
          <div style={{ padding: '2rem', textAlign: 'center', color: '#999' }}>No published reviews yet</div>
        ) : (
          <div style={{ display: 'grid', gap: '1rem' }}>
            {reviews.map(review => (
              <div key={review.id} style={{ padding: '1.5rem', background: 'white', border: '1px solid #ddd', borderRadius: '4px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start', marginBottom: '0.5rem' }}>
                  <div>
                    <h4 style={{ margin: 0 }}>{review.author}</h4>
                    <p style={{ margin: '0.25rem 0', fontSize: '0.875rem', color: '#666' }}>
                      {'★'.repeat(review.stars)}{'☆'.repeat(5 - review.stars)}
                    </p>
                    <p style={{ margin: '0.25rem 0', fontSize: '0.75rem', color: '#999' }}>{review.time}</p>
                  </div>
                  <p style={{ margin: 0, fontSize: '0.75rem', color: '#999' }}>{new Date(review.createdAt).toLocaleDateString()}</p>
                </div>
                <p style={{ margin: '0.5rem 0', fontSize: '0.9375rem', color: '#2D2422', lineHeight: 1.6 }}>
                  "{review.text}"
                </p>
                <button
                  onClick={() => deleteReview(review.id)}
                  style={{
                    padding: '0.5rem 1rem',
                    background: '#d32f2f',
                    color: 'white',
                    border: 'none',
                    cursor: 'pointer',
                    borderRadius: '4px',
                    fontSize: '0.875rem',
                    marginTop: '1rem',
                  }}
                >
                  Delete
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
