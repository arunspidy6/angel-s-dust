import { useState, useEffect } from 'react'

interface Product {
  id: string
  number: string
  title: string
  img: string
  desc: string
  sub: string
  price: string
  imgLeft: boolean
}

export default function ProductsManager() {
  const [products, setProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState(true)
  const [editingId, setEditingId] = useState<string | null>(null)
  const [formData, setFormData] = useState<Partial<Product>>({})
  const [isAdding, setIsAdding] = useState(false)

  useEffect(() => {
    fetchProducts()
  }, [])

  const fetchProducts = async () => {
    try {
      const res = await fetch('http://localhost:3001/api/products')
      const data = await res.json()
      setProducts(data)
    } catch (err) {
      console.error('Failed to fetch products:', err)
    } finally {
      setLoading(false)
    }
  }

  const handleEdit = (product: Product) => {
    setEditingId(product.id)
    setFormData(product)
    setIsAdding(false)
  }

  const handleAdd = () => {
    setIsAdding(true)
    setEditingId(null)
    setFormData({
      number: '',
      title: '',
      img: '',
      desc: '',
      sub: '',
      price: '',
      imgLeft: false,
    })
  }

  const handleSave = async () => {
    try {
      const url = isAdding ? 'http://localhost:3001/api/products' : `http://localhost:3001/api/products/${editingId}`
      const method = isAdding ? 'POST' : 'PUT'

      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      })

      if (res.ok) {
        fetchProducts()
        setEditingId(null)
        setIsAdding(false)
      }
    } catch (err) {
      console.error('Failed to save product:', err)
    }
  }

  const handleDelete = async (id: string) => {
    if (!confirm('Delete this product?')) return
    try {
      await fetch(`http://localhost:3001/api/products/${id}`, { method: 'DELETE' })
      fetchProducts()
    } catch (err) {
      console.error('Failed to delete product:', err)
    }
  }

  if (loading) return <div>Loading...</div>

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
        <h2>Products</h2>
        <button
          onClick={handleAdd}
          style={{
            padding: '0.75rem 1.5rem',
            background: '#D4AF37',
            color: 'white',
            border: 'none',
            cursor: 'pointer',
            borderRadius: '4px',
            fontWeight: 600,
          }}
        >
          + Add Product
        </button>
      </div>

      {editingId || isAdding ? (
        <ProductForm
          product={formData}
          onChange={setFormData}
          onSave={handleSave}
          onCancel={() => {
            setEditingId(null)
            setIsAdding(false)
          }}
        />
      ) : (
        <div style={{ display: 'grid', gap: '1rem' }}>
          {products.map(product => (
            <div key={product.id} style={{ padding: '1.5rem', background: 'white', border: '1px solid #ddd', borderRadius: '4px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start' }}>
                <div style={{ flex: 1 }}>
                  <h3 style={{ margin: '0 0 0.5rem 0' }}>
                    {product.number}. {product.title}
                  </h3>
                  <p style={{ margin: '0.5rem 0', fontSize: '0.875rem', color: '#666' }}>{product.desc}</p>
                  <p style={{ margin: '0.5rem 0', fontSize: '0.875rem', color: '#999' }}>{product.price}</p>
                </div>
                <div style={{ display: 'flex', gap: '0.5rem' }}>
                  <button
                    onClick={() => handleEdit(product)}
                    style={{
                      padding: '0.5rem 1rem',
                      background: '#2D2422',
                      color: 'white',
                      border: 'none',
                      cursor: 'pointer',
                      borderRadius: '4px',
                    }}
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(product.id)}
                    style={{
                      padding: '0.5rem 1rem',
                      background: '#d32f2f',
                      color: 'white',
                      border: 'none',
                      cursor: 'pointer',
                      borderRadius: '4px',
                    }}
                  >
                    Delete
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

function ProductForm({
  product,
  onChange,
  onSave,
  onCancel,
}: {
  product: Partial<Product>
  onChange: (p: Partial<Product>) => void
  onSave: () => void
  onCancel: () => void
}) {
  return (
    <div style={{ background: 'white', padding: '2rem', borderRadius: '4px', border: '1px solid #ddd', maxWidth: '600px' }}>
      <div style={{ marginBottom: '1rem' }}>
        <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 600 }}>Number</label>
        <input
          value={product.number || ''}
          onChange={e => onChange({ ...product, number: e.target.value })}
          style={{ width: '100%', padding: '0.5rem', border: '1px solid #ddd', borderRadius: '4px', boxSizing: 'border-box' }}
        />
      </div>
      <div style={{ marginBottom: '1rem' }}>
        <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 600 }}>Title</label>
        <input
          value={product.title || ''}
          onChange={e => onChange({ ...product, title: e.target.value })}
          style={{ width: '100%', padding: '0.5rem', border: '1px solid #ddd', borderRadius: '4px', boxSizing: 'border-box' }}
        />
      </div>
      <div style={{ marginBottom: '1rem' }}>
        <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 600 }}>Image URL</label>
        <input
          value={product.img || ''}
          onChange={e => onChange({ ...product, img: e.target.value })}
          style={{ width: '100%', padding: '0.5rem', border: '1px solid #ddd', borderRadius: '4px', boxSizing: 'border-box' }}
        />
      </div>
      <div style={{ marginBottom: '1rem' }}>
        <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 600 }}>Description</label>
        <textarea
          value={product.desc || ''}
          onChange={e => onChange({ ...product, desc: e.target.value })}
          style={{ width: '100%', padding: '0.5rem', border: '1px solid #ddd', borderRadius: '4px', boxSizing: 'border-box', minHeight: '100px' }}
        />
      </div>
      <div style={{ marginBottom: '1rem' }}>
        <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 600 }}>Sub (flavours/varieties)</label>
        <input
          value={product.sub || ''}
          onChange={e => onChange({ ...product, sub: e.target.value })}
          style={{ width: '100%', padding: '0.5rem', border: '1px solid #ddd', borderRadius: '4px', boxSizing: 'border-box' }}
        />
      </div>
      <div style={{ marginBottom: '1rem' }}>
        <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 600 }}>Price</label>
        <input
          value={product.price || ''}
          onChange={e => onChange({ ...product, price: e.target.value })}
          style={{ width: '100%', padding: '0.5rem', border: '1px solid #ddd', borderRadius: '4px', boxSizing: 'border-box' }}
        />
      </div>
      <div style={{ marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
        <input
          type="checkbox"
          checked={product.imgLeft || false}
          onChange={e => onChange({ ...product, imgLeft: e.target.checked })}
        />
        <label style={{ fontWeight: 600 }}>Image on left</label>
      </div>
      <div style={{ display: 'flex', gap: '1rem' }}>
        <button
          onClick={onSave}
          style={{
            padding: '0.75rem 1.5rem',
            background: '#D4AF37',
            color: 'white',
            border: 'none',
            cursor: 'pointer',
            borderRadius: '4px',
            fontWeight: 600,
          }}
        >
          Save
        </button>
        <button
          onClick={onCancel}
          style={{
            padding: '0.75rem 1.5rem',
            background: '#ddd',
            color: '#2D2422',
            border: 'none',
            cursor: 'pointer',
            borderRadius: '4px',
            fontWeight: 600,
          }}
        >
          Cancel
        </button>
      </div>
    </div>
  )
}
