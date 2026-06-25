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
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    fetchReviews()
    const interval = setInterval(fetchReviews, 10000)
    return () => clearInterval(interval)
  }, [])

  const fetchReviews = async () => {
    try {
      const res = await fetch('http://localhost:3001/api/reviews')
      if (!res.ok) throw new Error(`API error: ${res.status}`)
      const data = await res.json()
      setReviews(Array.isArray(data) ? data : [])
      setPendingReviews([])
      setError(null)
    } catch (err) {
      console.error('Failed to fetch reviews:', err)
      setReviews([])
      setPendingReviews([])
      setError('Failed to load reviews')
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
      setError('Failed to approve review')
    }
  }

  const deleteReview = async (id: string) => {
    if (!confirm('Delete this review?')) return
    try {
      await fetch(`http://localhost:3001/api/reviews/${id}`, { method: 'DELETE' })
      fetchReviews()
    } catch (err) {
      setError('Failed to delete review')
    }
  }

  if (loading) {
    return <div style={{ padding: '3rem', textAlign: 'center', color: '#999' }}>⏳ Loading reviews...</div>
  }

  const StarRating = ({ stars }: { stars: number }) => (
    <div style={{ display: 'flex', gap: '2px' }}>
      {[...Array(5)].map((_, i) => (
        <span key={i} style={{ fontSize: '1rem', color: i < stars ? '#D4AF37' : '#DDD' }}>★</span>
      ))}
    </div>
  )

  return (
    <div>
      <div style={{ marginBottom: '2rem' }}>
        <h2 style={{ margin: 0, fontSize: '1.75rem', color: '#2D2422' }}>Reviews</h2>
        <p style={{ margin: '0.5rem 0 0 0', fontSize: '0.875rem', color: '#999' }}>
          {reviews.length} published • {pendingReviews.length} pending approval
        </p>
      </div>

      {error && (
        <div style={{
          padding: '1rem',
          background: '#FEE8E8',
          color: '#C33',
          borderRadius: '6px',
          marginBottom: '1.5rem',
        }}>
          ❌ {error}
        </div>
      )}

      {/* Pending Reviews */}
      {pendingReviews.length > 0 && (
        <div style={{ marginBottom: '2rem' }}>
          <h3 style={{ margin: '0 0 1rem 0', fontSize: '1.125rem', color: '#2D2422' }}>⏳ Pending Approval</h3>
          <div style={{ display: 'grid', gap: '1rem' }}>
            {pendingReviews.map(review => (
              <div key={review.id} style={{
                padding: '1.5rem',
                background: '#FFFBF5',
                border: '2px solid #D4AF37',
                borderRadius: '8px',
              }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start', marginBottom: '0.75rem' }}>
                  <div>
                    <h4 style={{ margin: 0, fontSize: '1rem', color: '#2D2422' }}>{review.author}</h4>
                    <StarRating stars={review.stars} />
                  </div>
                  <p style={{ margin: 0, fontSize: '0.75rem', color: '#999' }}>{new Date(review.createdAt).toLocaleDateString()}</p>
                </div>
                <p style={{ margin: '0.75rem 0', fontSize: '0.9375rem', color: '#2D2422', lineHeight: 1.6 }}>
                  "{review.text}"
                </p>
                <div style={{ display: 'flex', gap: '0.5rem' }}>
                  <button
                    onClick={() => approveReview(review.id)}
                    style={{
                      padding: '0.5rem 1rem',
                      background: '#E8F5E9',
                      color: '#2E7D32',
                      border: 'none',
                      cursor: 'pointer',
                      borderRadius: '4px',
                      fontSize: '0.875rem',
                      fontWeight: 600,
                      transition: 'all 0.2s ease',
                    }}
                    onMouseEnter={(e) => (e.currentTarget.style.background = '#C8E6C9')}
                    onMouseLeave={(e) => (e.currentTarget.style.background = '#E8F5E9')}
                  >
                    Approve
                  </button>
                  <button
                    onClick={() => deleteReview(review.id)}
                    style={{
                      padding: '0.5rem 1rem',
                      background: '#F5E6E6',
                      color: '#C33',
                      border: 'none',
                      cursor: 'pointer',
                      borderRadius: '4px',
                      fontSize: '0.875rem',
                      transition: 'all 0.2s ease',
                    }}
                    onMouseEnter={(e) => (e.currentTarget.style.background = '#F0CCCC')}
                    onMouseLeave={(e) => (e.currentTarget.style.background = '#F5E6E6')}
                  >
                    Reject
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Published Reviews */}
      <div>
        <h3 style={{ margin: '0 0 1rem 0', fontSize: '1.125rem', color: '#2D2422' }}>✓ Published</h3>
        {reviews.length === 0 && pendingReviews.length === 0 ? (
          <div style={{
            padding: '3rem',
            textAlign: 'center',
            background: '#FFFFFF',
            borderRadius: '8px',
            border: '1px dashed #DDD'
          }}>
            <div style={{ fontSize: '2rem', marginBottom: '1rem' }}>⭐</div>
            <h3 style={{ margin: '0 0 0.5rem 0', color: '#2D2422' }}>No reviews yet</h3>
            <p style={{ margin: 0, color: '#999' }}>Customer reviews will appear here after approval</p>
          </div>
        ) : (
          <div style={{ display: 'grid', gap: '1rem' }}>
            {reviews.map(review => (
              <div key={review.id} style={{
                padding: '1.5rem',
                background: 'white',
                border: '1px solid #E8DDD5',
                borderRadius: '8px',
                boxShadow: '0 1px 3px rgba(45,36,34,0.08)',
              }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start', marginBottom: '0.75rem' }}>
                  <div>
                    <h4 style={{ margin: 0, fontSize: '1rem', color: '#2D2422' }}>{review.author}</h4>
                    <div style={{ marginTop: '0.25rem' }}>
                      <StarRating stars={review.stars} />
                    </div>
                    <p style={{ margin: '0.25rem 0 0 0', fontSize: '0.75rem', color: '#999' }}>{review.time}</p>
                  </div>
                  <p style={{ margin: 0, fontSize: '0.75rem', color: '#999' }}>{new Date(review.createdAt).toLocaleDateString()}</p>
                </div>
                <p style={{ margin: '0.75rem 0', fontSize: '0.9375rem', color: '#2D2422', lineHeight: 1.6 }}>
                  "{review.text}"
                </p>
                <button
                  onClick={() => deleteReview(review.id)}
                  style={{
                    padding: '0.5rem 1rem',
                    background: '#F5E6E6',
                    color: '#C33',
                    border: 'none',
                    cursor: 'pointer',
                    borderRadius: '4px',
                    fontSize: '0.875rem',
                    marginTop: '0.75rem',
                    transition: 'all 0.2s ease',
                  }}
                  onMouseEnter={(e) => (e.currentTarget.style.background = '#F0CCCC')}
                  onMouseLeave={(e) => (e.currentTarget.style.background = '#F5E6E6')}
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
