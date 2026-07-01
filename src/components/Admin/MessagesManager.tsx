import { API_BASE, adminHeaders } from '../../lib/apiUrl'
import { useState, useEffect } from 'react'

interface Message {
  id: string
  name: string
  email: string
  message: string
  read: boolean
  createdAt: string
}

export default function MessagesManager() {
  const [messages, setMessages] = useState<Message[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    fetchMessages()
    const interval = setInterval(fetchMessages, 10000)
    return () => clearInterval(interval)
  }, [])

  const fetchMessages = async () => {
    try {
      const res = await fetch(API_BASE + '/api/messages', { headers: adminHeaders() })
      if (!res.ok) throw new Error(`API error: ${res.status}`)
      const data = await res.json()
      setMessages(Array.isArray(data) ? data : [])
      setError(null)
    } catch (err) {
      console.error('Failed to fetch messages:', err)
      setMessages([])
      setError('Failed to load messages')
    } finally {
      setLoading(false)
    }
  }

  const deleteMessage = async (id: string) => {
    if (!confirm('Delete this message?')) return
    try {
      await fetch(API_BASE + `/api/messages/${id}`, { method: 'DELETE', headers: adminHeaders() })
      fetchMessages()
    } catch (err) {
      setError('Failed to delete message')
    }
  }

  if (loading) {
    return <div style={{ padding: '3rem', textAlign: 'center', color: '#999' }}>⏳ Loading messages...</div>
  }

  const unreadCount = messages.filter(m => !m.read).length

  return (
    <div>
      <div style={{ marginBottom: '2rem' }}>
        <h2 style={{ margin: 0, fontSize: '1.75rem', color: '#2D2422', display: 'flex', alignItems: 'center', gap: '1rem' }}>
          Messages
          {unreadCount > 0 && (
            <span style={{
              background: '#C33',
              color: 'white',
              borderRadius: '20px',
              padding: '0.25rem 0.75rem',
              fontSize: '0.75rem',
              fontWeight: 600,
            }}>
              {unreadCount} new
            </span>
          )}
        </h2>
        <p style={{ margin: '0.5rem 0 0 0', fontSize: '0.875rem', color: '#999' }}>
          {messages.length} {messages.length === 1 ? 'message' : 'messages'}
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

      {messages.length === 0 ? (
        <div style={{
          padding: '3rem',
          textAlign: 'center',
          background: '#FFFFFF',
          borderRadius: '8px',
          border: '1px dashed #DDD'
        }}>
          <div style={{ fontSize: '2rem', marginBottom: '1rem' }}>💬</div>
          <h3 style={{ margin: '0 0 0.5rem 0', color: '#2D2422' }}>No messages yet</h3>
          <p style={{ margin: 0, color: '#999' }}>Customer messages will appear here</p>
        </div>
      ) : (
        <div style={{ display: 'grid', gap: '1rem' }}>
          {messages.map(msg => (
            <div
              key={msg.id}
              style={{
                padding: '1.5rem',
                background: msg.read ? 'white' : '#FFFBF5',
                border: `1px solid ${msg.read ? '#E8DDD5' : '#D4AF37'}`,
                borderRadius: '8px',
                boxShadow: '0 1px 3px rgba(45,36,34,0.08)',
              }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start', marginBottom: '1rem' }}>
                <div>
                  <h3 style={{ margin: 0, fontSize: '1.125rem', color: '#2D2422' }}>
                    {msg.name}
                    {!msg.read && <span style={{ marginLeft: '0.5rem', background: '#D4AF37', color: 'white', padding: '0.25rem 0.5rem', borderRadius: '4px', fontSize: '0.75rem', fontWeight: 600 }}>NEW</span>}
                  </h3>
                  <p style={{ margin: '0.25rem 0', fontSize: '0.875rem', color: '#666' }}>📧 {msg.email}</p>
                  <p style={{ margin: '0.25rem 0', fontSize: '0.75rem', color: '#999' }}>
                    {new Date(msg.createdAt).toLocaleDateString()} {new Date(msg.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                  </p>
                </div>
              </div>

              <div style={{
                margin: '1rem 0',
                padding: '1rem',
                background: '#F9F7F5',
                borderRadius: '6px',
                lineHeight: 1.6,
                color: '#2D2422',
                fontSize: '0.9375rem',
                whiteSpace: 'pre-wrap',
                wordBreak: 'break-word',
              }}>
                {msg.message}
              </div>

              <div style={{ display: 'flex', gap: '0.5rem' }}>
                <a
                  href={`mailto:${msg.email}`}
                  style={{
                    padding: '0.5rem 1rem',
                    background: '#2D2422',
                    color: 'white',
                    textDecoration: 'none',
                    borderRadius: '4px',
                    fontSize: '0.875rem',
                    fontWeight: 500,
                    transition: 'all 0.2s ease',
                    cursor: 'pointer',
                  }}
                  onMouseEnter={(e) => (e.currentTarget.style.opacity = '0.85')}
                  onMouseLeave={(e) => (e.currentTarget.style.opacity = '1')}
                >
                  Reply
                </a>
                <button
                  onClick={() => deleteMessage(msg.id)}
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
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
