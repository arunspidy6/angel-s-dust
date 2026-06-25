import { useState, useRef } from 'react'
import ReactEasyCrop from 'react-easy-crop'
import 'react-easy-crop/lib/styles.css'

interface Product {
  id?: string
  number: string
  title: string
  img: string
  desc: string
  sub: string
  price: string
  imgLeft: boolean
}

interface EnhancedProductFormProps {
  product: Partial<Product>
  onChange: (p: Partial<Product>) => void
  onSave: () => void
  onCancel: () => void
  isAdding: boolean
}

export default function EnhancedProductForm({
  product,
  onChange,
  onSave,
  onCancel,
  isAdding,
}: EnhancedProductFormProps) {
  const [showCropper, setShowCropper] = useState(false)
  const [uploadedImage, setUploadedImage] = useState<string | null>(null)
  const [crop, setCrop] = useState({ x: 0, y: 0 })
  const [zoom, setZoom] = useState(1)
  const [croppedAreaPixels, setCroppedAreaPixels] = useState(null)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onload = (ev) => {
        setUploadedImage(ev.target?.result as string)
        setShowCropper(true)
      }
      reader.readAsDataURL(file)
    }
  }

  const handleCropComplete = (croppedArea: any, croppedAreaPixels: any) => {
    setCroppedAreaPixels(croppedAreaPixels)
  }

  const applyCrop = async () => {
    if (!uploadedImage || !croppedAreaPixels) return

    const canvas = document.createElement('canvas')
    const image = new Image()
    image.src = uploadedImage

    image.onload = () => {
      canvas.width = croppedAreaPixels.width
      canvas.height = croppedAreaPixels.height
      const ctx = canvas.getContext('2d')

      if (ctx) {
        ctx.drawImage(
          image,
          croppedAreaPixels.x,
          croppedAreaPixels.y,
          croppedAreaPixels.width,
          croppedAreaPixels.height,
          0,
          0,
          croppedAreaPixels.width,
          croppedAreaPixels.height
        )

        const croppedImage = canvas.toDataURL('image/jpeg')
        onChange({ ...product, img: croppedImage })
        setShowCropper(false)
        setUploadedImage(null)
      }
    }
  }

  return (
    <div style={{
      background: 'white',
      padding: '2rem',
      borderRadius: '8px',
      border: '1px solid #E8DDD5',
    }}>
      <h3 style={{ margin: '0 0 1.5rem 0', fontSize: '1.25rem', color: '#2D2422' }}>
        {isAdding ? 'Add New Product' : 'Edit Product'}
      </h3>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2rem' }}>
        {/* Left: Form */}
        <div>
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

          {/* Image Upload */}
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
              Image
            </label>
            <div style={{ display: 'flex', gap: '0.5rem' }}>
              <button
                type="button"
                onClick={() => fileInputRef.current?.click()}
                style={{
                  flex: 1,
                  padding: '0.75rem',
                  background: '#F0F0F0',
                  border: '1px solid #DDD',
                  borderRadius: '6px',
                  cursor: 'pointer',
                  fontWeight: 600,
                  fontSize: '0.875rem',
                  transition: 'all 0.2s ease',
                }}
                onMouseEnter={(e) => (e.currentTarget.style.background = '#E0E0E0')}
                onMouseLeave={(e) => (e.currentTarget.style.background = '#F0F0F0')}
              >
                📤 Upload Image
              </button>
            </div>
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              onChange={handleImageUpload}
              style={{ display: 'none' }}
            />
            <p style={{ margin: '0.5rem 0 0 0', fontSize: '0.75rem', color: '#999' }}>
              Upload and crop your image, or paste URL below
            </p>
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
              Or Image URL
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
                minHeight: '80px',
                fontFamily: 'inherit',
                transition: 'all 0.2s ease',
                resize: 'vertical',
              }}
              onFocus={(e) => (e.currentTarget.style.borderColor = '#D4AF37')}
              onBlur={(e) => (e.currentTarget.style.borderColor = '#DDD')}
            />
          </div>

          {/* Sub & Price */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginBottom: '1.5rem' }}>
            <div>
              <label style={{
                display: 'block',
                marginBottom: '0.5rem',
                fontWeight: 600,
                fontSize: '0.875rem',
                color: '#2D2422',
                textTransform: 'uppercase',
                letterSpacing: '0.5px',
              }}>
                Flavours
              </label>
              <input
                value={product.sub || ''}
                onChange={e => onChange({ ...product, sub: e.target.value })}
                placeholder="e.g., Pistachio · Rose"
                style={{
                  width: '100%',
                  padding: '0.75rem',
                  border: '1px solid #DDD',
                  borderRadius: '6px',
                  fontSize: '0.9375rem',
                  boxSizing: 'border-box',
                }}
              />
            </div>
            <div>
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
                placeholder="from €6"
                style={{
                  width: '100%',
                  padding: '0.75rem',
                  border: '1px solid #DDD',
                  borderRadius: '6px',
                  fontSize: '0.9375rem',
                  boxSizing: 'border-box',
                }}
              />
            </div>
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
              }}
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
              }}
            >
              Cancel
            </button>
          </div>
        </div>

        {/* Right: Preview */}
        <div style={{
          display: 'flex',
          flexDirection: 'column',
          gap: '1rem',
          padding: '1.5rem',
          background: '#F9F7F5',
          borderRadius: '8px',
          border: '1px solid #E8DDD5',
          position: 'sticky',
          top: '100px',
        }}>
          <h4 style={{ margin: 0, fontSize: '1rem', color: '#2D2422', fontWeight: 600 }}>
            📱 Live Preview
          </h4>

          {/* Preview Image */}
          {product.img ? (
            <div style={{
              position: 'relative',
              aspectRatio: '3/4',
              overflow: 'hidden',
              background: '#FFF5F3',
              borderRadius: '6px',
              border: '1px solid #DDD',
            }}>
              <img
                src={product.img}
                alt={product.title}
                style={{
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover',
                }}
              />
            </div>
          ) : (
            <div style={{
              aspectRatio: '3/4',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              background: '#FFF5F3',
              borderRadius: '6px',
              border: '1px dashed #DDD',
              color: '#999',
            }}>
              📸 Image preview
            </div>
          )}

          {/* Preview Text */}
          <div style={{ padding: '1rem', background: 'white', borderRadius: '6px', border: '1px solid #DDD' }}>
            <div style={{
              display: 'flex',
              alignItems: 'baseline',
              gap: '0.75rem',
              marginBottom: '0.75rem',
            }}>
              <span style={{
                fontFamily: "'Instrument Serif', serif",
                fontSize: '2rem',
                color: 'rgba(212,175,55,0.4)',
                lineHeight: 1,
              }}>
                {product.number || '??'}
              </span>
            </div>

            <h3 style={{
              fontFamily: "'Instrument Serif', serif",
              fontSize: '1.25rem',
              color: '#2D2422',
              margin: '0 0 0.75rem 0',
              lineHeight: 1.2,
            }}>
              {product.title || 'Product Title'}
            </h3>

            <p style={{
              margin: '0.5rem 0',
              fontSize: '0.875rem',
              color: '#666',
              lineHeight: 1.5,
            }}>
              {product.desc || 'Description will appear here...'}
            </p>

            <div style={{
              marginTop: '0.75rem',
              display: 'flex',
              justifyContent: 'space-between',
              fontSize: '0.75rem',
              color: '#999',
              paddingTop: '0.75rem',
              borderTop: '1px solid #EEE',
            }}>
              <span>{product.sub || 'Varieties'}</span>
              <span style={{ color: '#D4AF37', fontWeight: 600 }}>
                {product.price || 'Price'}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Image Cropper Modal */}
      {showCropper && uploadedImage && (
        <div style={{
          position: 'fixed',
          inset: 0,
          background: 'rgba(0,0,0,0.8)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 1000,
          padding: '1rem',
        }}>
          <div style={{
            background: 'white',
            borderRadius: '8px',
            padding: '2rem',
            maxWidth: '600px',
            width: '100%',
          }}>
            <h3 style={{ margin: '0 0 1rem 0', fontSize: '1.25rem', color: '#2D2422' }}>
              Crop Your Image
            </h3>

            <div style={{ position: 'relative', height: '400px', marginBottom: '1.5rem', background: '#F0F0F0' }}>
              <ReactEasyCrop
                image={uploadedImage}
                crop={crop}
                zoom={zoom}
                aspect={3 / 4}
                cropShape="rect"
                showGrid
                onCropChange={setCrop}
                onCropComplete={handleCropComplete}
                onZoomChange={setZoom}
                restricted={false}
              />
            </div>

            <div style={{ marginBottom: '1.5rem' }}>
              <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.875rem', fontWeight: 600 }}>
                Zoom
              </label>
              <input
                type="range"
                value={zoom}
                onInput={(e) => setZoom(Number(e.currentTarget.value))}
                min={1}
                max={3}
                step={0.1}
                style={{ width: '100%' }}
              />
            </div>

            <div style={{ display: 'flex', gap: '1rem' }}>
              <button
                onClick={applyCrop}
                style={{
                  flex: 1,
                  padding: '0.75rem',
                  background: '#D4AF37',
                  color: 'white',
                  border: 'none',
                  cursor: 'pointer',
                  borderRadius: '6px',
                  fontWeight: 600,
                }}
              >
                Apply Crop
              </button>
              <button
                onClick={() => setShowCropper(false)}
                style={{
                  flex: 1,
                  padding: '0.75rem',
                  background: '#F0F0F0',
                  border: '1px solid #DDD',
                  cursor: 'pointer',
                  borderRadius: '6px',
                  fontWeight: 600,
                }}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
