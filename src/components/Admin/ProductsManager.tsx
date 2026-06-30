import { API_BASE, adminHeaders } from '../../lib/apiUrl'
import { useState, useEffect } from 'react'
import EnhancedProductForm from './EnhancedProductForm'

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
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState(false)

  useEffect(() => {
    fetchProducts()
  }, [])

  const fetchProducts = async () => {
    try {
      const res = await fetch(API_BASE + '/api/products')
      if (!res.ok) throw new Error(`API error: ${res.status}`)
      const data = await res.json()
      setProducts(Array.isArray(data) ? data : [])
      setError(null)
    } catch (err) {
      console.error('Failed to fetch products:', err)
      setProducts([])
      setError('Failed to load products')
    } finally {
      setLoading(false)
    }
  }

  const handleEdit = (product: Product) => {
    setEditingId(product.id)
    setFormData(product)
    setIsAdding(false)
    setError(null)
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
    setError(null)
  }

  const handleSave = async () => {
    if (!formData.title || !formData.desc) {
      setError('Please fill in all required fields')
      return
    }

    try {
      const url = isAdding ? API_BASE + '/api/products' : API_BASE + `/api/products/${editingId}`
      const method = isAdding ? 'POST' : 'PUT'

      const res = await fetch(url, {
        method,
        headers: adminHeaders(),
        body: JSON.stringify(formData),
      })

      if (res.ok) {
        setSuccess(true)
        setTimeout(() => setSuccess(false), 2000)
        fetchProducts()
        setEditingId(null)
        setIsAdding(false)
        setError(null)
      } else {
        const body = await res.json().catch(() => ({}))
        setError(body.error || `Server error (${res.status})`)
      }
    } catch (err) {
      setError('Failed to save product — check your network')
      console.error('Failed to save product:', err)
    }
  }

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this product? This cannot be undone.')) return
    try {
      await fetch(API_BASE + `/api/products/${id}`, { method: 'DELETE', headers: adminHeaders() })
      fetchProducts()
    } catch (err) {
      setError('Failed to delete product')
      console.error('Failed to delete product:', err)
    }
  }

  const handleCancel = () => {
    setEditingId(null)
    setIsAdding(false)
    setError(null)
  }

  if (loading) {
    return (
      <div style={{ padding: '3rem', textAlign: 'center' }}>
        <div style={{ fontSize: '2rem', marginBottom: '1rem' }}>⏳</div>
        <p style={{ color: '#999' }}>Loading products...</p>
      </div>
    )
  }

  return (
    <div>
      {/* Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
        <div>
          <h2 style={{ margin: 0, fontSize: '1.75rem', color: '#2D2422' }}>Products</h2>
          <p style={{ margin: '0.5rem 0 0 0', fontSize: '0.875rem', color: '#999' }}>
            Manage your menu items and pastry offerings
          </p>
        </div>
        <button
          onClick={handleAdd}
          style={{
            padding: '0.75rem 1.5rem',
            background: '#D4AF37',
            color: 'white',
            border: 'none',
            cursor: 'pointer',
            borderRadius: '6px',
            fontWeight: 600,
            fontSize: '0.9375rem',
            transition: 'all 0.2s ease',
            boxShadow: '0 2px 8px rgba(212,175,55,0.2)',
          }}
          onMouseEnter={(e) => (e.currentTarget.style.boxShadow = '0 4px 12px rgba(212,175,55,0.3)')}
          onMouseLeave={(e) => (e.currentTarget.style.boxShadow = '0 2px 8px rgba(212,175,55,0.2)')}
        >
          + Add Product
        </button>
      </div>

      {/* Error/Success Messages */}
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
          fontSize: '0.9375rem'
        }}>
          <span>❌ {error}</span>
          <button onClick={() => setError(null)} style={{ background: 'none', border: 'none', cursor: 'pointer', fontSize: '1.25rem' }}>×</button>
        </div>
      )}
      {success && (
        <div style={{
          padding: '1rem',
          background: '#E8F5E9',
          color: '#2E7D32',
          borderRadius: '6px',
          marginBottom: '1.5rem',
          fontSize: '0.9375rem'
        }}>
          ✓ Product saved successfully
        </div>
      )}

      {/* Form or List */}
      {editingId || isAdding ? (
        <EnhancedProductForm
          product={formData}
          onChange={setFormData}
          onSave={handleSave}
          onCancel={handleCancel}
          isAdding={isAdding}
        />
      ) : products.length === 0 ? (
        <div style={{
          padding: '3rem',
          textAlign: 'center',
          background: '#FFFFFF',
          borderRadius: '8px',
          border: '1px dashed #DDD'
        }}>
          <div style={{ fontSize: '2rem', marginBottom: '1rem' }}>📦</div>
          <h3 style={{ margin: '0 0 0.5rem 0', color: '#2D2422' }}>No products yet</h3>
          <p style={{ margin: '0 0 1.5rem 0', color: '#999' }}>Create your first pastry item to get started</p>
          <button
            onClick={handleAdd}
            style={{
              padding: '0.75rem 1.5rem',
              background: '#D4AF37',
              color: 'white',
              border: 'none',
              cursor: 'pointer',
              borderRadius: '6px',
              fontWeight: 600,
              fontSize: '0.9375rem',
            }}
          >
            Add Your First Product
          </button>
        </div>
      ) : (
        <div style={{ display: 'grid', gap: '1rem' }}>
          {products.map(product => (
            <div key={product.id} style={{
              padding: '1.5rem',
              background: 'white',
              border: '1px solid #E8DDD5',
              borderRadius: '8px',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'start',
              transition: 'all 0.2s ease',
              boxShadow: '0 1px 3px rgba(45,36,34,0.08)',
            }}
            onMouseEnter={(e) => (e.currentTarget.style.boxShadow = '0 4px 12px rgba(45,36,34,0.12)')}
            onMouseLeave={(e) => (e.currentTarget.style.boxShadow = '0 1px 3px rgba(45,36,34,0.08)')}
            >
              <div style={{ flex: 1 }}>
                <h3 style={{ margin: '0 0 0.5rem 0', fontSize: '1.125rem', color: '#2D2422' }}>
                  {product.number}. {product.title}
                </h3>
                <p style={{ margin: '0.5rem 0', fontSize: '0.9375rem', color: '#666', lineHeight: 1.6 }}>
                  {product.desc}
                </p>
                <div style={{ marginTop: '0.75rem', display: 'flex', gap: '1.5rem', fontSize: '0.875rem', color: '#999' }}>
                  <span>{product.sub}</span>
                  <span style={{ fontWeight: 600, color: '#D4AF37' }}>{product.price}</span>
                </div>
              </div>
              <div style={{ display: 'flex', gap: '0.5rem', marginLeft: '1rem' }}>
                <button
                  onClick={() => handleEdit(product)}
                  style={{
                    padding: '0.5rem 1rem',
                    background: '#2D2422',
                    color: 'white',
                    border: 'none',
                    cursor: 'pointer',
                    borderRadius: '4px',
                    fontSize: '0.875rem',
                    transition: 'all 0.2s ease',
                  }}
                  onMouseEnter={(e) => (e.currentTarget.style.opacity = '0.85')}
                  onMouseLeave={(e) => (e.currentTarget.style.opacity = '1')}
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(product.id)}
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

function ProductForm({
  product,
  onChange,
  onSave,
  onCancel,
  isAdding,
}: {
  product: Partial<Product>
  onChange: (p: Partial<Product>) => void
  onSave: () => void
  onCancel: () => void
  isAdding: boolean
}) {
  return (
    <div style={{
      background: 'white',
      padding: '2rem',
      borderRadius: '8px',
      border: '1px solid #E8DDD5',
      maxWidth: '600px',
    }}>
      <h3 style={{ margin: '0 0 1.5rem 0', fontSize: '1.25rem', color: '#2D2422' }}>
        {isAdding ? 'Add New Product' : 'Edit Product'}
      </h3>

      {/* Number */}
      <div style={{ marginBottom: '1.5rem' }}>
        <label style={{
          display: 'block',
          marginBottom: '0.5rem',
          fontWeight: 600,
          fontSize: '0.875rem',
          color: '#2D2422',
          textTransform: 'uppercase',
          letterSpacing: '0.5px',
        }}>
          Number <span style={{ color: '#C33' }}>*</span>
        </label>
        <input
          value={product.number || ''}
          onChange={e => onChange({ ...product, number: e.target.value })}
          placeholder="e.g., 01"
          style={{
            width: '100%',
            padding: '0.75rem',
            border: '1px solid #DDD',
            borderRadius: '6px',
            fontSize: '1rem',
            boxSizing: 'border-box',
            transition: 'all 0.2s ease',
          }}
          onFocus={(e) => (e.currentTarget.style.borderColor = '#D4AF37')}
          onBlur={(e) => (e.currentTarget.style.borderColor = '#DDD')}
        />
        <p style={{ margin: '0.25rem 0 0 0', fontSize: '0.75rem', color: '#999' }}>Used for ordering items</p>
      </div>

      {/* Title */}
      <div style={{ marginBottom: '1.5rem' }}>
        <label style={{
          display: 'block',
          marginBottom: '0.5rem',
          fontWeight: 600,
          fontSize: '0.875rem',
          color: '#2D2422',
          textTransform: 'uppercase',
          letterSpacing: '0.5px',
        }}>
          Title <span style={{ color: '#C33' }}>*</span>
        </label>
        <input
          value={product.title || ''}
          onChange={e => onChange({ ...product, title: e.target.value })}
          placeholder="e.g., Signature Cakes"
          style={{
            width: '100%',
            padding: '0.75rem',
            border: '1px solid #DDD',
            borderRadius: '6px',
            fontSize: '1rem',
            boxSizing: 'border-box',
            transition: 'all 0.2s ease',
          }}
          onFocus={(e) => (e.currentTarget.style.borderColor = '#D4AF37')}
          onBlur={(e) => (e.currentTarget.style.borderColor = '#DDD')}
        />
      </div>

      {/* Image URL */}
      <div style={{ marginBottom: '1.5rem' }}>
        <label style={{
          display: 'block',
          marginBottom: '0.5rem',
          fontWeight: 600,
          fontSize: '0.875rem',
          color: '#2D2422',
          textTransform: 'uppercase',
          letterSpacing: '0.5px',
        }}>
          Image URL
        </label>
        <input
          value={product.img || ''}
          onChange={e => onChange({ ...product, img: e.target.value })}
          placeholder="https://example.com/image.jpg"
          style={{
            width: '100%',
            padding: '0.75rem',
            border: '1px solid #DDD',
            borderRadius: '6px',
            fontSize: '0.9375rem',
            boxSizing: 'border-box',
            transition: 'all 0.2s ease',
          }}
          onFocus={(e) => (e.currentTarget.style.borderColor = '#D4AF37')}
          onBlur={(e) => (e.currentTarget.style.borderColor = '#DDD')}
        />
        {product.img && (
          <div style={{
            marginTop: '0.75rem',
            width: '100px',
            height: '100px',
            borderRadius: '6px',
            overflow: 'hidden',
            border: '1px solid #DDD',
          }}>
            <img src={product.img} alt={product.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
          </div>
        )}
      </div>

      {/* Description */}
      <div style={{ marginBottom: '1.5rem' }}>
        <label style={{
          display: 'block',
          marginBottom: '0.5rem',
          fontWeight: 600,
          fontSize: '0.875rem',
          color: '#2D2422',
          textTransform: 'uppercase',
          letterSpacing: '0.5px',
        }}>
          Description <span style={{ color: '#C33' }}>*</span>
        </label>
        <textarea
          value={product.desc || ''}
          onChange={e => onChange({ ...product, desc: e.target.value })}
          placeholder="Detailed description of the product..."
          style={{
            width: '100%',
            padding: '0.75rem',
            border: '1px solid #DDD',
            borderRadius: '6px',
            fontSize: '1rem',
            boxSizing: 'border-box',
            minHeight: '100px',
            fontFamily: 'inherit',
            transition: 'all 0.2s ease',
            resize: 'vertical',
          }}
          onFocus={(e) => (e.currentTarget.style.borderColor = '#D4AF37')}
          onBlur={(e) => (e.currentTarget.style.borderColor = '#DDD')}
        />
      </div>

      {/* Sub */}
      <div style={{ marginBottom: '1.5rem' }}>
        <label style={{
          display: 'block',
          marginBottom: '0.5rem',
          fontWeight: 600,
          fontSize: '0.875rem',
          color: '#2D2422',
          textTransform: 'uppercase',
          letterSpacing: '0.5px',
        }}>
          Flavours / Varieties
        </label>
        <input
          value={product.sub || ''}
          onChange={e => onChange({ ...product, sub: e.target.value })}
          placeholder="e.g., Pistachio · Rose · Hazelnut"
          style={{
            width: '100%',
            padding: '0.75rem',
            border: '1px solid #DDD',
            borderRadius: '6px',
            fontSize: '1rem',
            boxSizing: 'border-box',
            transition: 'all 0.2s ease',
          }}
          onFocus={(e) => (e.currentTarget.style.borderColor = '#D4AF37')}
          onBlur={(e) => (e.currentTarget.style.borderColor = '#DDD')}
        />
      </div>

      {/* Price */}
      <div style={{ marginBottom: '1.5rem' }}>
        <label style={{
          display: 'block',
          marginBottom: '0.5rem',
          fontWeight: 600,
          fontSize: '0.875rem',
          color: '#2D2422',
          textTransform: 'uppercase',
          letterSpacing: '0.5px',
        }}>
          Price
        </label>
        <input
          value={product.price || ''}
          onChange={e => onChange({ ...product, price: e.target.value })}
          placeholder="e.g., from €6"
          style={{
            width: '100%',
            padding: '0.75rem',
            border: '1px solid #DDD',
            borderRadius: '6px',
            fontSize: '1rem',
            boxSizing: 'border-box',
            transition: 'all 0.2s ease',
          }}
          onFocus={(e) => (e.currentTarget.style.borderColor = '#D4AF37')}
          onBlur={(e) => (e.currentTarget.style.borderColor = '#DDD')}
        />
      </div>

      {/* Image Position */}
      <div style={{ marginBottom: '2rem', display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
        <input
          type="checkbox"
          checked={product.imgLeft || false}
          onChange={e => onChange({ ...product, imgLeft: e.target.checked })}
          id="imgLeft"
          style={{ cursor: 'pointer', width: '18px', height: '18px' }}
        />
        <label htmlFor="imgLeft" style={{ fontWeight: 500, color: '#2D2422', cursor: 'pointer' }}>
          Display image on the left
        </label>
      </div>

      {/* Actions */}
      <div style={{ display: 'flex', gap: '1rem' }}>
        <button
          onClick={onSave}
          style={{
            flex: 1,
            padding: '0.75rem',
            background: '#D4AF37',
            color: 'white',
            border: 'none',
            cursor: 'pointer',
            borderRadius: '6px',
            fontWeight: 600,
            fontSize: '0.9375rem',
            transition: 'all 0.2s ease',
          }}
          onMouseEnter={(e) => (e.currentTarget.style.opacity = '0.9')}
          onMouseLeave={(e) => (e.currentTarget.style.opacity = '1')}
        >
          Save Product
        </button>
        <button
          onClick={onCancel}
          style={{
            flex: 1,
            padding: '0.75rem',
            background: '#F0F0F0',
            color: '#2D2422',
            border: '1px solid #DDD',
            cursor: 'pointer',
            borderRadius: '6px',
            fontWeight: 600,
            fontSize: '0.9375rem',
            transition: 'all 0.2s ease',
          }}
          onMouseEnter={(e) => (e.currentTarget.style.background = '#E0E0E0')}
          onMouseLeave={(e) => (e.currentTarget.style.background = '#F0F0F0')}
        >
          Cancel
        </button>
      </div>
    </div>
  )
}
