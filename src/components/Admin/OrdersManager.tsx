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

  useEffect(() => {
    fetchOrders()
    const interval = setInterval(fetchOrders, 5000)
    return () => clearInterval(interval)
  }, [])

  const fetchOrders = async () => {
    try {
      const res = await fetch('http://localhost:3001/api/orders')
      const data = await res.json()
      setOrders(data)
    } catch (err) {
      console.error('Failed to fetch orders:', err)
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
      console.error('Failed to update order:', err)
    }
  }

  const deleteOrder = async (id: string) => {
    if (!confirm('Delete this order?')) return
    try {
      await fetch(`http://localhost:3001/api/orders/${id}`, { method: 'DELETE' })
      fetchOrders()
    } catch (err) {
      console.error('Failed to delete order:', err)
    }
  }

  if (loading) return <div>Loading...</div>

  const statusColors: Record<string, string> = {
    pending: '#FFA500',
    confirmed: '#4CAF50',
    shipped: '#2196F3',
    completed: '#2D2422',
    cancelled: '#d32f2f',
  }

  return (
    <div>
      <h2 style={{ marginBottom: '2rem' }}>Orders ({orders.length})</h2>
      {orders.length === 0 ? (
        <div style={{ padding: '2rem', textAlign: 'center', color: '#999' }}>No orders yet</div>
      ) : (
        <div style={{ display: 'grid', gap: '1rem' }}>
          {orders.map(order => (
            <div key={order.id} style={{ padding: '1.5rem', background: 'white', border: '1px solid #ddd', borderRadius: '4px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start', marginBottom: '1rem' }}>
                <div>
                  <h3 style={{ margin: '0 0 0.5rem 0' }}>{order.name}</h3>
                  <p style={{ margin: '0.25rem 0', fontSize: '0.875rem', color: '#666' }}>{order.email}</p>
                  <p style={{ margin: '0.25rem 0', fontSize: '0.875rem', color: '#666' }}>{order.phone}</p>
                </div>
                <div style={{ textAlign: 'right' }}>
                  <div style={{ fontSize: '1.25rem', fontWeight: 600, marginBottom: '0.5rem' }}>€{order.totalPrice.toFixed(2)}</div>
                  <div style={{ fontSize: '0.75rem', color: '#999' }}>{new Date(order.createdAt).toLocaleDateString()}</div>
                </div>
              </div>

              <div style={{ marginBottom: '1rem', padding: '1rem', background: '#f5f5f5', borderRadius: '4px' }}>
                <p style={{ margin: 0, fontSize: '0.875rem' }}>
                  <strong>Items:</strong> {order.items}
                </p>
                {order.notes && <p style={{ margin: '0.5rem 0 0 0', fontSize: '0.875rem' }}>
                  <strong>Notes:</strong> {order.notes}
                </p>}
              </div>

              <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '1rem' }}>
                {(['pending', 'confirmed', 'shipped', 'completed', 'cancelled'] as const).map(status => (
                  <button
                    key={status}
                    onClick={() => updateStatus(order.id, status)}
                    style={{
                      padding: '0.5rem 1rem',
                      background: order.status === status ? statusColors[status] : '#eee',
                      color: order.status === status ? 'white' : '#666',
                      border: 'none',
                      cursor: 'pointer',
                      borderRadius: '4px',
                      fontSize: '0.75rem',
                      fontWeight: 600,
                      textTransform: 'capitalize',
                      transition: 'all 0.3s ease',
                    }}
                  >
                    {status}
                  </button>
                ))}
              </div>

              <button
                onClick={() => deleteOrder(order.id)}
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
          ))}
        </div>
      )}
    </div>
  )
}
