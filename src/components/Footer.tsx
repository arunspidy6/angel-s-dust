export default function Footer() {
  const linkStyle: React.CSSProperties = {
    fontFamily: "'Inter', sans-serif", fontSize: '0.8125rem', color: 'rgba(250,248,245,0.6)',
    textDecoration: 'none', lineHeight: 2, transition: 'color 0.2s ease', display: 'block',
  }

  return (
    <footer style={{ background: '#2D2422', color: '#FAF8F5', padding: '5rem 0 3rem' }}>
      <div style={{ maxWidth: '1400px', margin: '0 auto', padding: '0 1.5rem' }}>

        <div style={{ borderBottom: '1px solid rgba(250,248,245,0.1)', paddingBottom: '3rem', marginBottom: '3rem' }}>
          <h3 style={{ fontFamily: "'Instrument Serif', serif", fontSize: '1.5rem', fontWeight: 400, marginBottom: '0.75rem' }}>
            First word on new flavours, special collections &amp; seasonal openings.
          </h3>
          <form onSubmit={e => e.preventDefault()} style={{ display: 'flex', maxWidth: '26rem', marginTop: '1.5rem', borderBottom: '1px solid rgba(250,248,245,0.3)' }}>
            <input type="email" placeholder="your@email.com" style={{ flex: 1, background: 'transparent', border: 'none', outline: 'none', color: '#FAF8F5', fontFamily: "'Inter', sans-serif", fontSize: '0.9375rem', padding: '0.5rem 0' }} />
            <button type="submit" style={{ background: 'transparent', border: 'none', color: '#D4AF37', fontFamily: "'Inter', sans-serif", fontSize: '0.75rem', textTransform: 'uppercase', letterSpacing: '0.15em', cursor: 'pointer', padding: '0.5rem 0 0.5rem 1rem', whiteSpace: 'nowrap' }}>
              Subscribe →
            </button>
          </form>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(12,1fr)', gap: '2rem' }}>
          <div style={{ gridColumn: 'span 12' }} className="md:col-span-4">
            <div style={{ fontFamily: "'Instrument Serif', serif", fontSize: '1.75rem', letterSpacing: '-0.03em', marginBottom: '1rem' }}>
              Angel's Dust<sup style={{ fontSize: '0.5em', verticalAlign: 'super', color: '#D4AF37', marginLeft: '2px' }}>®</sup>
            </div>
            <p style={{ fontFamily: "'Inter', sans-serif", fontSize: '0.875rem', color: 'rgba(250,248,245,0.55)', lineHeight: 1.7, maxWidth: '20rem' }}>
              A Parisian pâtisserie on Thomas Street, Limerick. Handmade every morning, sold out by lunch.
            </p>
            <div style={{ display: 'flex', gap: '1rem', marginTop: '1.5rem' }}>
              {['Instagram', 'Facebook'].map(s => (
                <a key={s} href="#" style={{ fontSize: '0.75rem', textTransform: 'uppercase', letterSpacing: '0.12em', color: 'rgba(250,248,245,0.5)', textDecoration: 'none', fontFamily: "'Inter', sans-serif" }}>{s}</a>
              ))}
            </div>
          </div>

          <div style={{ gridColumn: 'span 6' }} className="md:col-span-2">
            <div style={{ fontSize: '0.625rem', textTransform: 'uppercase', letterSpacing: '0.3em', color: '#D4AF37', marginBottom: '1rem', fontFamily: "'Inter', sans-serif" }}>Explore</div>
            {['Story', 'Patisserie', 'Reviews', 'Preorder', 'Visit'].map(l => (
              <a key={l} href={`#${l.toLowerCase()}`} style={linkStyle}>{l}</a>
            ))}
          </div>

          <div style={{ gridColumn: 'span 6' }} className="md:col-span-3">
            <div style={{ fontSize: '0.625rem', textTransform: 'uppercase', letterSpacing: '0.3em', color: '#D4AF37', marginBottom: '1rem', fontFamily: "'Inter', sans-serif" }}>Contact</div>
            {["12 Thomas Street", "Prior's-Land, Limerick", "V94 KXF1, Ireland"].map(l => (
              <span key={l} style={{ ...linkStyle, color: 'rgba(250,248,245,0.6)' }}>{l}</span>
            ))}
            <a href="tel:+353614100021" style={linkStyle}>+353 61 410 021</a>
          </div>
        </div>

        <div style={{ marginTop: '4rem', paddingTop: '1.5rem', borderTop: '1px solid rgba(250,248,245,0.1)', display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap', gap: '0.5rem' }}>
          <span style={{ fontFamily: "'Inter', sans-serif", fontSize: '0.75rem', color: 'rgba(250,248,245,0.35)' }}>© 2026 Angel's Dust Patisserie — Limerick, Ireland</span>
          <span style={{ fontFamily: "'Inter', sans-serif", fontSize: '0.75rem', color: 'rgba(250,248,245,0.35)' }}>Angel Dust · Pâtisserie &amp; Bakery</span>
        </div>
      </div>
    </footer>
  )
}
