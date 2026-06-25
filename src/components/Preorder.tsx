import { useState } from 'react'
import { motion } from 'framer-motion'
import { slideLeft, slideRight } from '../lib/motion'

const ITEMS = [
  'Signature Layered Cake (8")',
  'Box of 6 Macarons',
  'Box of 12 Macarons',
  'All-butter Croissant',
  'Pistachio Raspberry Tart',
  'Chocolate Éclair',
  'Seasonal Entremet',
]

export default function Preorder() {
  const [qty, setQty] = useState<Record<string, number>>({})
  const [sent, setSent] = useState(false)
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    pickupDate: '',
    notes: '',
  })

  const update = (item: string, delta: number) =>
    setQty(prev => ({ ...prev, [item]: Math.max(0, (prev[item] ?? 0) + delta) }))

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    const items = Object.entries(qty)
      .filter(([, count]) => count > 0)
      .map(([item, count]) => `${count}x ${item}`)
      .join(', ')

    if (!items) {
      alert('Please select at least one item')
      return
    }

    try {
      const res = await fetch('http://localhost:3001/api/orders', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          phone: formData.phone,
          items,
          totalPrice: 0,
          status: 'pending',
          notes: formData.notes,
        }),
      })

      if (res.ok) {
        setSent(true)
        setFormData({ name: '', email: '', phone: '', pickupDate: '', notes: '' })
        setQty({})
      }
    } catch (err) {
      console.error('Failed to submit order:', err)
      alert('Failed to submit order. Please try again.')
    }
  }

  const inputStyle: React.CSSProperties = {
    width: '100%', marginTop: '0.5rem', padding: '0.75rem 0',
    borderBottom: '1px solid rgba(45,36,34,0.25)', borderTop: 'none',
    borderLeft: 'none', borderRight: 'none',
    background: 'transparent', outline: 'none',
    fontFamily: "'Inter', sans-serif", fontSize: '0.9375rem', color: '#2D2422',
  }

  return (
    <section id="preorder" style={{ background: '#2D2422', color: '#FAF8F5', padding: '6rem 0 8rem' }}>
      <div style={{ maxWidth: '72rem', margin: '0 auto', padding: '0 1.5rem', display: 'grid', gridTemplateColumns: '1fr', gap: '3rem' }} className="lg:grid-cols-12">

        {/* Left */}
        <motion.div {...slideLeft()} className="lg:col-span-5">
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1.5rem' }}>
            <span style={{ height: '1px', width: '2.5rem', background: '#D4AF37', display: 'block' }} />
            <span style={{ fontSize: '0.75rem', textTransform: 'uppercase', letterSpacing: '0.3em', fontWeight: 600, color: '#D4AF37', fontFamily: "'Inter', sans-serif" }}>Reserve · Pre-order</span>
          </div>
          <h2 style={{ fontFamily: "'Instrument Serif', serif", fontSize: 'clamp(2.25rem, 4vw, 3.5rem)', lineHeight: 1.05, fontWeight: 400 }}>
            Skip the queue.<br />
            <em style={{ fontStyle: 'italic', color: '#D4AF37' }}>Reserve</em> your favourites.
          </h2>
          <p style={{ marginTop: '1.5rem', color: 'rgba(217,207,201,0.9)', lineHeight: 1.7, fontSize: '1rem', maxWidth: '28rem', fontFamily: "'Inter', sans-serif" }}>
            Cakes and pastries sell out quickly. Fill this in by Tuesday and we'll have your order ready for collection from Thursday onward. We'll confirm by email or phone within 24 hours.
          </p>
          <ul style={{ marginTop: '2rem', display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
            {['No payment required to reserve', 'We confirm within 24 hours', '48 hours notice for custom cakes'].map(item => (
              <li key={item} style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', fontSize: '0.875rem', color: 'rgba(217,207,201,0.9)', fontFamily: "'Inter', sans-serif" }}>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#D4AF37" strokeWidth="2"><path d="M20 6 9 17l-5-5" /></svg>
                {item}
              </li>
            ))}
          </ul>
        </motion.div>

        {/* Form */}
        <motion.div {...slideRight(0.1)} className="lg:col-span-7" style={{ background: '#FAF8F5', color: '#2D2422', padding: '2.5rem 2rem' }}>
          {sent ? (
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '100%', minHeight: '300px', gap: '1rem', textAlign: 'center' }}>
              <div style={{ fontFamily: "'Instrument Serif', serif", fontSize: '2rem', color: '#D4AF37' }}>✓</div>
              <h3 style={{ fontFamily: "'Instrument Serif', serif", fontSize: '1.75rem', color: '#2D2422' }}>Reservation received</h3>
              <p style={{ color: '#6F6F6F', fontFamily: "'Inter', sans-serif", fontSize: '0.9375rem' }}>We'll confirm within 24 hours by email or phone.</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit}>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem 2rem' }}>
                <div style={{ gridColumn: 'span 1' }}>
                  <label style={{ fontSize: '0.6875rem', textTransform: 'uppercase', letterSpacing: '0.2em', color: '#5C4E4C', fontFamily: "'Inter', sans-serif" }}>Name</label>
                  <input type="text" placeholder="Your full name" required value={formData.name} onChange={e => setFormData({ ...formData, name: e.target.value })} style={inputStyle} />
                </div>
                <div style={{ gridColumn: 'span 1' }}>
                  <label style={{ fontSize: '0.6875rem', textTransform: 'uppercase', letterSpacing: '0.2em', color: '#5C4E4C', fontFamily: "'Inter', sans-serif" }}>Email</label>
                  <input type="email" placeholder="you@example.com" required value={formData.email} onChange={e => setFormData({ ...formData, email: e.target.value })} style={inputStyle} />
                </div>
                <div style={{ gridColumn: 'span 1' }}>
                  <label style={{ fontSize: '0.6875rem', textTransform: 'uppercase', letterSpacing: '0.2em', color: '#5C4E4C', fontFamily: "'Inter', sans-serif" }}>Phone (optional)</label>
                  <input type="tel" placeholder="+353 …" value={formData.phone} onChange={e => setFormData({ ...formData, phone: e.target.value })} style={inputStyle} />
                </div>
                <div style={{ gridColumn: 'span 1' }}>
                  <label style={{ fontSize: '0.6875rem', textTransform: 'uppercase', letterSpacing: '0.2em', color: '#5C4E4C', fontFamily: "'Inter', sans-serif" }}>Pickup Date</label>
                  <input type="date" required value={formData.pickupDate} onChange={e => setFormData({ ...formData, pickupDate: e.target.value })} style={inputStyle} />
                </div>
              </div>

              {/* Items */}
              <div style={{ marginTop: '2.5rem' }}>
                <label style={{ fontSize: '0.6875rem', textTransform: 'uppercase', letterSpacing: '0.2em', color: '#5C4E4C', fontFamily: "'Inter', sans-serif" }}>Select Items</label>
                <div style={{ marginTop: '1rem', borderTop: '1px solid #EADCC8', borderBottom: '1px solid #EADCC8' }}>
                  {ITEMS.map(item => (
                    <div key={item} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0.875rem 0', borderBottom: '1px solid #EADCC8' }}>
                      <span style={{ fontFamily: "'Instrument Serif', serif", fontSize: '1.0625rem', color: '#2D2422' }}>{item}</span>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                        <button type="button" onClick={() => update(item, -1)} style={{ width: '2rem', height: '2rem', border: '1px solid #EADCC8', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', background: 'transparent', transition: 'all 0.2s ease' }}
                          onMouseEnter={e => { e.currentTarget.style.background = '#2D2422'; e.currentTarget.style.color = '#FAF8F5' }}
                          onMouseLeave={e => { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.color = '#2D2422' }}>
                          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M5 12h14" /></svg>
                        </button>
                        <span style={{ width: '1.5rem', textAlign: 'center', fontFamily: "'Inter', sans-serif", fontWeight: 500 }}>{qty[item] ?? 0}</span>
                        <button type="button" onClick={() => update(item, 1)} style={{ width: '2rem', height: '2rem', border: '1px solid #EADCC8', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', background: 'transparent', transition: 'all 0.2s ease' }}
                          onMouseEnter={e => { e.currentTarget.style.background = '#D4AF37'; e.currentTarget.style.borderColor = '#D4AF37'; e.currentTarget.style.color = 'white' }}
                          onMouseLeave={e => { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.borderColor = '#EADCC8'; e.currentTarget.style.color = '#2D2422' }}>
                          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M5 12h14" /><path d="M12 5v14" /></svg>
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Notes */}
              <div style={{ marginTop: '1.5rem' }}>
                <label style={{ fontSize: '0.6875rem', textTransform: 'uppercase', letterSpacing: '0.2em', color: '#5C4E4C', fontFamily: "'Inter', sans-serif" }}>Notes (allergies, custom requests)</label>
                <textarea rows={3} value={formData.notes} onChange={e => setFormData({ ...formData, notes: e.target.value })} style={{ ...inputStyle, resize: 'none', width: '100%' }} />
              </div>

              <button type="submit" style={{ marginTop: '2rem', width: '100%', padding: '1rem', background: '#2D2422', color: '#FAF8F5', border: 'none', fontSize: '0.875rem', textTransform: 'uppercase', letterSpacing: '0.2em', cursor: 'pointer', fontFamily: "'Inter', sans-serif", transition: 'opacity 0.2s ease' }}
                onMouseEnter={e => (e.currentTarget.style.opacity = '0.85')}
                onMouseLeave={e => (e.currentTarget.style.opacity = '1')}>
                Submit Reservation
              </button>
            </form>
          )}
        </motion.div>
      </div>
    </section>
  )
}
