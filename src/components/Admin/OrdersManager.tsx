import { useState, useEffect } from 'react'

interface Order {
  id: string
  name: string
  email: string
  phone: string
  items: string
  totalPrice: number
  status: 'pending' | 'confirmed' | 'shipped' | 'completed' | 'cancelled'
  notes: string
  createdAt: string
  updatedAt: string
}

export default function OrdersManager() {
  const [orders, setOrders] = useState<Order[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    fetchOrders()
    const interval = setInterval(fetchOrders, 10000)
    return () => clearInterval(interval)
  }, [])

  const fetchOrders = async () => {
    try {
      const res = await fetch('http://localhost:3001/api/orders')
      if (!res.ok) throw new Error(`API error: ${res.status}`)
      const data = await res.json()
      setOrders(Array.isArray(data) ? data : [])
      setError(null)
    } catch (err) {
      console.error('Failed to fetch orders:', err)
      setOrders([])
      setError('Failed to load orders')
    } finally {
      setLoading(false)
    }
  }

  const updateStatus = async (id: string, status: string) => {
    try {
      await fetch(`http://localhost:3001/api/orders/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status }),
      })
      fetchOrders()
    } catch (err) {
      setError('Failed to update order status')
    }
  }

  const deleteOrder = async (id: string) => {
    if (!confirm('Delete this order? This cannot be undone.')) return
    try {
      await fetch(`http://localhost:3001/api/orders/${id}`, { method: 'DELETE' })
      fetchOrders()
    } catch (err) {
      setError('Failed to delete order')
    }
  }

  if (loading) {
    return (
      <div style={{ padding: '3rem', textAlign: 'center' }}>
        <div style={{ fontSize: '2rem', marginBottom: '1rem' }}>⏳</div>
        <p style={{ color: '#999' }}>Loading orders...</p>
      </div>
    )
  }

  const statusColors: Record<string, { bg: string; text: string }> = {
    pending: { bg: '#FFF3E0', text: '#E65100' },
    confirmed: { bg: '#E8F5E9', text: '#2E7D32' },
    shipped: { bg: '#E3F2FD', text: '#1565C0' },
    completed: { bg: '#F3E5F5', text: '#512DA8' },
    cancelled: { bg: '#FFEBEE', text: '#C62828' },
  }

  return (
    <div>
      <div style={{ marginBottom: '2rem' }}>
        <h2 style={{ margin: 0, fontSize: '1.75rem', color: '#2D2422' }}>Orders</h2>
        <p style={{ margin: '0.5rem 0 0 0', fontSize: '0.875rem', color: '#999' }}>
          {orders.length} {orders.length === 1 ? 'order' : 'orders'} in total
        </p>
      </div>

      {error && (
        <div style={{
          padding: '1rem',
          background: '#FEE8E8',
          color: '#C33',
          borderRadius: '6px',
          marginBottom: '1.5rem',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}>
          <span>❌ {error}</span>
          <button onClick={() => setError(null)} style={{ background: 'none', border: 'none', cursor: 'pointer', fontSize: '1.25rem' }}>×</button>
        </div>
      )}

      {orders.length === 0 ? (
        <div style={{
          padding: '3rem',
          textAlign: 'center',
          background: '#FFFFFF',
          borderRadius: '8px',
          border: '1px dashed #DDD'
        }}>
          <div style={{ fontSize: '2rem', marginBottom: '1rem' }}>🛍️</div>
          <h3 style={{ margin: '0 0 0.5rem 0', color: '#2D2422' }}>No orders yet</h3>
          <p style={{ margin: 0, color: '#999' }}>Orders will appear here when customers place pre-orders</p>
        </div>
      ) : (
        <div style={{ display: 'grid', gap: '1rem' }}>
          {orders.map(order => (
            <div key={order.id} style={{
              padding: '1.5rem',
              background: 'white',
              border: '1px solid #E8DDD5',
              borderRadius: '8px',
              boxShadow: '0 1px 3px rgba(45,36,34,0.08)',
              transition: 'all 0.2s ease',
            }}
            onMouseEnter={(e) => (e.currentTarget.style.boxShadow = '0 4px 12px rgba(45,36,34,0.12)')}
            onMouseLeave={(e) => (e.currentTarget.style.boxShadow = '0 1px 3px rgba(45,36,34,0.08)')}
            >
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem', marginBottom: '1rem' }}>
                <div>
                  <h3 style={{ margin: 0, fontSize: '1.125rem', color: '#2D2422', marginBottom: '0.25rem' }}>
                    {order.name}
                  </h3>
                  <p style={{ margin: '0.25rem 0', fontSize: '0.875rem', color: '#666' }}>
                    📧 {order.email}
                  </p>
                  <p style={{ margin: '0.25rem 0', fontSize: '0.875rem', color: '#666' }}>
                    📱 {order.phone || 'Not provided'}
                  </p>
                </div>
                <div style={{ textAlign: 'right' }}>
                  <div style={{ fontSize: '1.375rem', fontWeight: 600, color: '#D4AF37', marginBottom: '0.5rem' }}>
                    €{order.totalPrice.toFixed(2)}
                  </div>
                  <div style={{ fontSize: '0.75rem', color: '#999' }}>
                    {new Date(order.createdAt).toLocaleDateString()} {new Date(order.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                  </div>
                </div>
              </div>

              <div style={{
                marginBottom: '1rem',
                padding: '1rem',
                background: '#F9F7F5',
                borderRadius: '6px',
                borderLeft: '3px solid #D4AF37',
              }}>
                <p style={{ margin: 0, fontSize: '0.9375rem', color: '#2D2422', lineHeight: 1.6 }}>
                  <strong>Items:</strong> {order.items}
                </p>
                {order.notes && (
                  <p style={{ margin: '0.5rem 0 0 0', fontSize: '0.875rem', color: '#666', fontStyle: 'italic' }}>
                    <strong>Notes:</strong> {order.notes}
                  </p>
                )}
              </div>

              <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '1rem', flexWrap: 'wrap' }}>
                {(['pending', 'confirmed', 'shipped', 'completed', 'cancelled'] as const).map(status => {
                  const color = statusColors[status]
                  const isActive = order.status === status
                  return (
                    <button
                      key={status}
                      onClick={() => updateStatus(order.id, status)}
                      style={{
                        padding: '0.5rem 1rem',
                        background: isActive ? color.bg : '#F0F0F0',
                        color: isActive ? color.text : '#999',
                        border: isActive ? `2px solid ${color.text}` : '1px solid #DDD',
                        cursor: 'pointer',
                        borderRadius: '20px',
                        fontSize: '0.75rem',
                        fontWeight: isActive ? 600 : 500,
                        textTransform: 'capitalize',
                        transition: 'all 0.2s ease',
                      }}
                    >
                      {status}
                    </button>
                  )
                })}
              </div>

              <button
                onClick={() => deleteOrder(order.id)}
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
                Delete Order
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
