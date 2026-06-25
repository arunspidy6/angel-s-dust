import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { slideLeft, staggerParent, staggerChild, VP } from '../lib/motion'

const DEFAULT_reviews = [
  { id: '1', author: 'Kym Tucker', time: '2 months ago', stars: 5, text: "It's like a taste of Paris right here in Limerick. The patisseries are amazingly delicious and absolute works of art. Fantastic value for money." },
  { id: '2', author: 'May', time: 'Local Guide · 248 reviews', stars: 5, text: "The cakes are unreal. No wonder they sell out so fast. Arrive as soon as they open!" },
  { id: '3', author: 'S.S.', time: 'Local Guide · 59 reviews', stars: 5, text: "Beautiful pastries. Each piece is a work of art. Great value starting from €5." },
  { id: '4', author: "Claire O'Brien", time: '1 month ago', stars: 5, text: "Absolutely incredible. The croissants are the best I've had outside of France. Worth every penny." },
  { id: '5', author: 'Dermot F.', time: '3 months ago', stars: 5, text: "A gem in Limerick. The pistachio choux is extraordinary. We drove an hour just to get here." },
]

function Stars() {
  return (
    <div style={{ display: 'flex', gap: '2px' }}>
      {[...Array(5)].map((_, i) => (
        <svg key={i} width="12" height="12" viewBox="0 0 24 24" fill="#D4AF37" stroke="#D4AF37" strokeWidth="0">
          <path d="M11.525 2.295a.53.53 0 0 1 .95 0l2.31 4.679a2.123 2.123 0 0 0 1.595 1.16l5.166.756a.53.53 0 0 1 .294.904l-3.736 3.638a2.123 2.123 0 0 0-.611 1.878l.882 5.14a.53.53 0 0 1-.771.56l-4.618-2.428a2.122 2.122 0 0 0-1.973 0L6.396 21.01a.53.53 0 0 1-.77-.56l.881-5.139a2.122 2.122 0 0 0-.611-1.879L2.16 9.795a.53.53 0 0 1 .294-.906l5.165-.755a2.122 2.122 0 0 0 1.597-1.16z" />
        </svg>
      ))}
    </div>
  )
}

export default function Reviews() {
  const [idx, setIdx] = useState(0)
  const [reviews, setReviews] = useState(DEFAULT_reviews)

  useEffect(() => {
    fetch('http://localhost:3001/api/reviews')
      .then(res => res.json())
      .then(data => {
        if (data && data.length > 0) {
          setReviews(data)
        }
      })
      .catch(() => {
        // Use default reviews if API is not available
      })
  }, [])

  return (
    <section id="reviews" style={{ position: 'relative', background: '#FAF8F5', padding: '8rem 0 10rem', overflow: 'hidden' }}>

      {/* Watermark */}
      <motion.div
        aria-hidden
        initial={{ opacity: 0, x: -60 }} whileInView={{ opacity: 1, x: -30 }} viewport={VP}
        transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
        style={{ position: 'absolute', bottom: '-2.5rem', left: '-1.5rem', fontFamily: "'Instrument Serif', serif", fontSize: 'clamp(30vw, 40vw, 42rem)', lineHeight: 1, color: 'rgba(212,175,55,0.06)', pointerEvents: 'none', userSelect: 'none', fontStyle: 'italic' }}
      >4.8</motion.div>

      <div style={{ maxWidth: '1400px', margin: '0 auto', padding: '0 1.5rem' }}>
        <div className="grid grid-cols-12 gap-6 md:gap-10">

          {/* Left — sticky on desktop */}
          <motion.div {...slideLeft()} className="col-span-12 md:col-span-5 md:sticky md:top-32 md:self-start">
            <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1.5rem' }}>
              <span style={{ fontSize: '0.625rem', textTransform: 'uppercase', letterSpacing: '0.4em', fontWeight: 600, color: '#D4AF37', fontFamily: "'Inter', sans-serif" }}>[ N°04 ] Reviews</span>
              <span style={{ height: '1px', width: '4rem', background: '#D4AF37', display: 'block' }} />
            </div>

            <h2 style={{ fontFamily: "'Instrument Serif', serif", fontSize: 'clamp(3rem, 5.5vw, 5.5rem)', letterSpacing: '-1px', color: '#2D2422', lineHeight: 0.95, fontWeight: 400 }}>
              Loved<br />by<br />
              <em style={{ fontStyle: 'italic', color: '#D4AF37' }}>Limerick.</em>
            </h2>

            <div style={{ marginTop: '2.5rem', display: 'flex', alignItems: 'center', gap: '1.25rem' }}>
              <div style={{ fontFamily: "'Instrument Serif', serif", fontSize: 'clamp(3rem, 6vw, 4.5rem)', color: '#2D2422', lineHeight: 1 }}>4.8</div>
              <div>
                <Stars />
                <div style={{ fontSize: '0.625rem', textTransform: 'uppercase', letterSpacing: '0.3em', color: '#5C4E4C', marginTop: '0.5rem', fontFamily: "'Inter', sans-serif" }}>118 Google reviews</div>
              </div>
            </div>

            <div style={{ marginTop: '2.5rem', display: 'flex', alignItems: 'center', gap: '1rem' }}>
              <button
                onClick={() => setIdx(i => Math.max(0, i - 1))}
                aria-label="Previous"
                style={{ width: '3rem', height: '3rem', border: '1px solid #2D2422', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', background: 'transparent', color: '#2D2422', transition: 'all 0.3s ease' }}
                onMouseEnter={e => { (e.currentTarget as HTMLElement).style.background = '#2D2422'; (e.currentTarget as HTMLElement).style.color = '#FAF8F5' }}
                onMouseLeave={e => { (e.currentTarget as HTMLElement).style.background = 'transparent'; (e.currentTarget as HTMLElement).style.color = '#2D2422' }}
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="m15 18-6-6 6-6" /></svg>
              </button>
              <button
                onClick={() => setIdx(i => Math.min(reviews.length - 1, i + 1))}
                aria-label="Next"
                style={{ width: '3rem', height: '3rem', border: '1px solid #2D2422', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', background: 'transparent', color: '#2D2422', transition: 'all 0.3s ease' }}
                onMouseEnter={e => { (e.currentTarget as HTMLElement).style.background = '#2D2422'; (e.currentTarget as HTMLElement).style.color = '#FAF8F5' }}
                onMouseLeave={e => { (e.currentTarget as HTMLElement).style.background = 'transparent'; (e.currentTarget as HTMLElement).style.color = '#2D2422' }}
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="m9 18 6-6-6-6" /></svg>
              </button>
              <span style={{ fontSize: '0.625rem', textTransform: 'uppercase', letterSpacing: '0.3em', color: '#5C4E4C', marginLeft: '0.5rem', fontFamily: "'Inter', sans-serif" }}>
                0{idx + 1} / 0{reviews.length}
              </span>
            </div>
          </motion.div>

          {/* Right — review cards */}
          <motion.div
            {...staggerParent(0.12)}
            className="col-span-12 md:col-span-7 md:col-start-6"
            style={{ marginTop: '3rem', display: 'flex', flexDirection: 'column', gap: '1rem' }}
          >
            {reviews.map((r, i) => (
              <motion.div
                key={i}
                variants={staggerChild}
                onClick={() => setIdx(i)}
                whileHover={{ y: -4 }}
                animate={{
                  scale: i === idx ? 1.01 : 1,
                  borderColor: i === idx ? '#D4AF37' : 'rgba(45,36,34,0.12)',
                  backgroundColor: i === idx ? '#ffffff' : 'rgba(255,255,255,0)',
                }}
                transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                style={{
                  padding: '2rem 2.5rem',
                  border: '1px solid rgba(45,36,34,0.12)',
                  cursor: 'pointer',
                }}
              >
                <Stars />
                <p style={{ marginTop: '1rem', fontFamily: "'Inter', sans-serif", fontSize: '0.9375rem', lineHeight: 1.7, color: '#2D2422' }}>
                  "{r.text}"
                </p>
                <div style={{ marginTop: '1.25rem', display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                  <div style={{ width: '32px', height: '32px', borderRadius: '50%', background: '#D4AF37', display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: "'Instrument Serif', serif", fontSize: '0.875rem', color: 'white', flexShrink: 0 }}>
                    {r.author[0]}
                  </div>
                  <div>
                    <div style={{ fontFamily: "'Inter', sans-serif", fontSize: '0.8125rem', fontWeight: 600, color: '#2D2422' }}>{r.author}</div>
                    <div style={{ fontFamily: "'Inter', sans-serif", fontSize: '0.6875rem', color: '#6F6F6F' }}>{r.time}</div>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  )
}
