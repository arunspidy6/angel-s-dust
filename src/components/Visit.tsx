import { useState } from 'react'
import { motion } from 'framer-motion'
import { slideUp, staggerParent, staggerChild } from '../lib/motion'

export default function Visit() {
  const [contactForm, setContactForm] = useState({ name: '', email: '', message: '' })
  const [contactSent, setContactSent] = useState(false)

  const handleContactSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      const res = await fetch('http://localhost:3001/api/messages', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(contactForm),
      })

      if (res.ok) {
        setContactSent(true)
        setContactForm({ name: '', email: '', message: '' })
        setTimeout(() => setContactSent(false), 3000)
      }
    } catch (err) {
      console.error('Failed to send message:', err)
    }
  }
  const label: React.CSSProperties = {
    fontSize: '0.625rem', textTransform: 'uppercase', letterSpacing: '0.3em',
    color: '#6F6F6F', fontFamily: "'Inter', sans-serif", marginBottom: '1rem', display: 'block',
  }
  const val: React.CSSProperties = {
    fontFamily: "'Instrument Serif', serif", fontSize: '1.125rem', color: '#2D2422', lineHeight: 1.5,
  }

  return (
    <section id="visit" style={{ background: '#FAF8F5', padding: '7rem 0 9rem' }}>
      <div style={{ maxWidth: '1400px', margin: '0 auto', padding: '0 1.5rem' }}>

        {/* Heading */}
        <motion.div {...slideUp()} style={{ marginBottom: '5rem' }}>
          <h2 style={{ fontFamily: "'Instrument Serif', serif", fontSize: 'clamp(2.5rem, 5vw, 5rem)', lineHeight: 0.95, letterSpacing: '-1.5px', color: '#2D2422', fontWeight: 400 }}>
            Come for the pastries.<br />
            <em style={{ fontStyle: 'italic', color: '#D4AF37' }}>Stay</em> for the morning.
          </h2>
        </motion.div>

        <motion.div className="grid grid-cols-12 gap-8" {...staggerParent(0.12)}>

          {/* Find Us */}
          <motion.div variants={staggerChild} className="col-span-12 md:col-span-3">
            <span style={label}>Find Us</span>
            <address style={{ ...val, fontStyle: 'normal', lineHeight: 1.8 }}>
              12 Thomas Street<br />
              Prior's-Land, Limerick<br />
              V94 KXF1, Ireland
            </address>
            <a
              href="https://www.google.com/maps/place/Angel+Dust+Patisserie+and+Bakery/@52.6628666,-8.626109,17z"
              target="_blank"
              rel="noopener noreferrer"
              style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', marginTop: '1.25rem', fontSize: '0.8125rem', textTransform: 'uppercase', letterSpacing: '0.15em', color: '#2D2422', textDecoration: 'none', fontFamily: "'Inter', sans-serif", borderBottom: '1px solid #2D2422', paddingBottom: '2px' }}
            >
              Get Directions →
            </a>
          </motion.div>

          {/* Call */}
          <motion.div variants={staggerChild} className="col-span-12 md:col-span-3">
            <span style={label}>Call Ahead</span>
            <a href="tel:+353614100021" style={{ ...val, textDecoration: 'none', color: '#2D2422' }}>
              +353 61 410 021
            </a>
          </motion.div>

          {/* Hours */}
          <motion.div variants={staggerChild} className="col-span-12 md:col-span-4">
            <span style={label}>Opening Hours</span>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
              {[
                { day: 'Mon – Wed', hours: 'Closed' },
                { day: 'Thursday', hours: '11:30 – 17:00' },
                { day: 'Friday', hours: '11:30 – 18:00' },
                { day: 'Saturday', hours: '10:00 – 18:00' },
                { day: 'Sunday', hours: '11:00 – 16:00' },
              ].map(h => (
                <div key={h.day} style={{ display: 'flex', justifyContent: 'space-between', padding: '0.5rem 0', borderBottom: '1px solid rgba(45,36,34,0.08)' }}>
                  <span style={{ fontFamily: "'Inter', sans-serif", fontSize: '0.875rem', color: h.hours === 'Closed' ? '#6F6F6F' : '#2D2422' }}>{h.day}</span>
                  <span style={{ fontFamily: "'Inter', sans-serif", fontSize: '0.875rem', color: h.hours === 'Closed' ? '#6F6F6F' : '#2D2422' }}>{h.hours}</span>
                </div>
              ))}
            </div>
            <p style={{ marginTop: '1rem', fontSize: '0.75rem', color: '#6F6F6F', fontFamily: "'Inter', sans-serif", fontStyle: 'italic' }}>
              * Cakes often sell out by early afternoon
            </p>
          </motion.div>

          {/* Map */}
          <motion.div variants={staggerChild} className="col-span-12" style={{ marginTop: '1rem' }}>
            <div style={{ width: '100%', height: '320px', overflow: 'hidden', border: '1px solid rgba(45,36,34,0.1)' }}>
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2430.5!2d-8.626109!3d52.6628666!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zNTLCsDM5JzQ2LjMiTiA4wrAzNyczOS42Ilc!5e0!3m2!1sen!2sie!4v1"
                width="100%"
                height="320"
                style={{ border: 0, display: 'block' }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Angel's Dust location"
              />
            </div>
          </motion.div>
        </motion.div>

        {/* Contact Form */}
        <motion.div {...slideUp(0.2)} style={{ marginTop: '6rem', maxWidth: '600px', margin: '6rem auto 0' }}>
          <h3 style={{ fontFamily: "'Instrument Serif', serif", fontSize: '2rem', color: '#2D2422', marginBottom: '2rem', textAlign: 'center' }}>
            Get In Touch
          </h3>
          {contactSent ? (
            <div style={{ padding: '2rem', textAlign: 'center', background: '#e8f5e9', border: '1px solid #4CAF50', borderRadius: '4px' }}>
              <p style={{ color: '#2e7d32', fontSize: '1rem', margin: 0 }}>✓ Message sent! We'll get back to you soon.</p>
            </div>
          ) : (
            <form onSubmit={handleContactSubmit} style={{ display: 'grid', gap: '1.5rem' }}>
              <div>
                <label style={{ display: 'block', fontSize: '0.875rem', fontWeight: 600, marginBottom: '0.5rem', color: '#2D2422' }}>Name</label>
                <input
                  type="text"
                  required
                  value={contactForm.name}
                  onChange={e => setContactForm({ ...contactForm, name: e.target.value })}
                  style={{
                    width: '100%',
                    padding: '0.75rem',
                    border: '1px solid #ddd',
                    borderRadius: '4px',
                    fontFamily: "'Inter', sans-serif",
                    fontSize: '1rem',
                  }}
                  placeholder="Your name"
                />
              </div>
              <div>
                <label style={{ display: 'block', fontSize: '0.875rem', fontWeight: 600, marginBottom: '0.5rem', color: '#2D2422' }}>Email</label>
                <input
                  type="email"
                  required
                  value={contactForm.email}
                  onChange={e => setContactForm({ ...contactForm, email: e.target.value })}
                  style={{
                    width: '100%',
                    padding: '0.75rem',
                    border: '1px solid #ddd',
                    borderRadius: '4px',
                    fontFamily: "'Inter', sans-serif",
                    fontSize: '1rem',
                  }}
                  placeholder="your@email.com"
                />
              </div>
              <div>
                <label style={{ display: 'block', fontSize: '0.875rem', fontWeight: 600, marginBottom: '0.5rem', color: '#2D2422' }}>Message</label>
                <textarea
                  required
                  rows={5}
                  value={contactForm.message}
                  onChange={e => setContactForm({ ...contactForm, message: e.target.value })}
                  style={{
                    width: '100%',
                    padding: '0.75rem',
                    border: '1px solid #ddd',
                    borderRadius: '4px',
                    fontFamily: "'Inter', sans-serif",
                    fontSize: '1rem',
                    boxSizing: 'border-box',
                  }}
                  placeholder="Your message..."
                />
              </div>
              <button
                type="submit"
                style={{
                  padding: '1rem',
                  background: '#D4AF37',
                  color: 'white',
                  border: 'none',
                  borderRadius: '4px',
                  fontSize: '1rem',
                  fontWeight: 600,
                  cursor: 'pointer',
                  transition: 'opacity 0.2s ease',
                }}
                onMouseEnter={e => (e.currentTarget.style.opacity = '0.85')}
                onMouseLeave={e => (e.currentTarget.style.opacity = '1')}
              >
                Send Message
              </button>
            </form>
          )}
        </motion.div>
      </div>
    </section>
  )
}
