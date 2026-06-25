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

  useEffect(() => {
    fetchMessages()
    const interval = setInterval(fetchMessages, 5000)
    return () => clearInterval(interval)
  }, [])

  const fetchMessages = async () => {
    try {
      const res = await fetch('http://localhost:3001/api/messages')
      const data = await res.json()
      setMessages(data)
    } catch (err) {
      console.error('Failed to fetch messages:', err)
    } finally {
      setLoading(false)
    }
  }

  const deleteMessage = async (id: string) => {
    if (!confirm('Delete this message?')) return
    try {
      await fetch(`http://localhost:3001/api/messages/${id}`, { method: 'DELETE' })
      fetchMessages()
    } catch (err) {
      console.error('Failed to delete message:', err)
    }
  }

  if (loading) return <div>Loading...</div>

  const unreadCount = messages.filter(m => !m.read).length

  return (
    <div>
      <h2 style={{ marginBottom: '2rem' }}>
        Messages {unreadCount > 0 && <span style={{ fontSize: '0.875rem', background: '#d32f2f', color: 'white', padding: '0.25rem 0.5rem', borderRadius: '4px', marginLeft: '0.5rem' }}>
          {unreadCount} new
        </span>}
      </h2>
      {messages.length === 0 ? (
        <div style={{ padding: '2rem', textAlign: 'center', color: '#999' }}>No messages yet</div>
      ) : (
        <div style={{ display: 'grid', gap: '1rem' }}>
          {messages.map(message => (
            <div
              key={message.id}
              style={{
                padding: '1.5rem',
                background: message.read ? 'white' : '#fffbf0',
                border: `1px solid ${message.read ? '#ddd' : '#D4AF37'}`,
                borderRadius: '4px',
              }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start', marginBottom: '1rem' }}>
                <div>
                  <h3 style={{ margin: '0 0 0.25rem 0' }}>
                    {message.name}
                    {!message.read && <span style={{ marginLeft: '0.5rem', fontSize: '0.75rem', background: '#D4AF37', color: 'white', padding: '0.25rem 0.5rem', borderRadius: '4px' }}>NEW</span>}
                  </h3>
                  <p style={{ margin: '0.25rem 0', fontSize: '0.875rem', color: '#666' }}>{message.email}</p>
                  <p style={{ margin: '0.25rem 0', fontSize: '0.75rem', color: '#999' }}>{new Date(message.createdAt).toLocaleString()}</p>
                </div>
              </div>

              <div style={{ marginBottom: '1rem', padding: '1rem', background: '#f5f5f5', borderRadius: '4px', lineHeight: 1.6 }}>
                {message.message}
              </div>

              <div style={{ display: 'flex', gap: '0.5rem' }}>
                <a
                  href={`mailto:${message.email}`}
                  style={{
                    padding: '0.5rem 1rem',
                    background: '#2D2422',
                    color: 'white',
                    textDecoration: 'none',
                    borderRadius: '4px',
                    fontSize: '0.875rem',
                    cursor: 'pointer',
                  }}
                >
                  Reply
                </a>
                <button
                  onClick={() => deleteMessage(message.id)}
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
