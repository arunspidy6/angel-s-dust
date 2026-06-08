import { useEffect, useRef, useState } from 'react'

const VIDEO_URL =
  'https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260328_083109_283f3553-e28f-428b-a723-d639c617eb2b.mp4'

const NAV_LINKS = [
  { label: 'Pâtisserie', href: '#patisserie', primary: true },
  { label: 'Studio',     href: '#story',      primary: false },
  { label: 'Menu',       href: '#menu',       primary: false },
  { label: 'Reviews',    href: '#reviews',    primary: false },
  { label: 'Visit',      href: '#visit',      primary: false },
]

/* ─── Video with manual fade-loop ─── */
function CinematicVideo() {
  const videoRef = useRef<HTMLVideoElement>(null)
  const rafRef   = useRef<number>(0)

  useEffect(() => {
    const vid = videoRef.current
    if (!vid) return

    // Fade-in / fade-out using rAF
    const FADE = 0.5 // seconds
    const tick = () => {
      const { currentTime, duration, paused } = vid
      if (!paused && duration) {
        if (currentTime < FADE) {
          vid.style.opacity = String(currentTime / FADE)
        } else if (currentTime > duration - FADE) {
          vid.style.opacity = String((duration - currentTime) / FADE)
        } else {
          vid.style.opacity = '1'
        }
      }
      rafRef.current = requestAnimationFrame(tick)
    }

    // Seamless manual loop
    const handleEnded = () => {
      vid.style.opacity = '0'
      setTimeout(() => {
        vid.currentTime = 0
        vid.play()
      }, 100)
    }

    vid.style.opacity = '0'
    vid.play().catch(() => {/* autoplay blocked, that's fine */})
    rafRef.current = requestAnimationFrame(tick)
    vid.addEventListener('ended', handleEnded)

    return () => {
      cancelAnimationFrame(rafRef.current)
      vid.removeEventListener('ended', handleEnded)
    }
  }, [])

  return (
    <div
      aria-hidden="true"
      style={{
        position: 'absolute',
        inset: 'auto 0 0 0',
        top: '300px',
        zIndex: 0,
        overflow: 'hidden',
      }}
    >
      {/* top-to-bottom white-fade overlay */}
      <div style={{
        position: 'absolute', inset: 0, zIndex: 1,
        background: 'linear-gradient(to bottom, #ffffff 0%, transparent 28%, transparent 72%, #ffffff 100%)',
        pointerEvents: 'none',
      }} />
      {/* left/right softening */}
      <div style={{
        position: 'absolute', inset: 0, zIndex: 1,
        background: 'linear-gradient(to right, #ffffff 0%, transparent 12%, transparent 88%, #ffffff 100%)',
        pointerEvents: 'none',
      }} />
      <video
        ref={videoRef}
        src={VIDEO_URL}
        muted
        playsInline
        preload="auto"
        style={{
          width: '100%',
          height: '100%',
          objectFit: 'cover',
          display: 'block',
          transition: 'opacity 0.08s linear',
        }}
      />
    </div>
  )
}

/* ─── Navigation — fixed, scroll-reactive, centered tabs ─── */
function NavBar() {
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    let ticking = false
    const onScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          setScrolled(window.scrollY > 40)
          ticking = false
        })
        ticking = true
      }
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    onScroll()
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <header
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        zIndex: 50,
        background: scrolled ? 'rgba(255,255,255,0.85)' : 'transparent',
        backdropFilter: scrolled ? 'blur(14px)' : 'none',
        WebkitBackdropFilter: scrolled ? 'blur(14px)' : 'none',
        borderBottom: scrolled ? '1px solid rgba(0,0,0,0.06)' : '1px solid transparent',
        boxShadow: scrolled ? '0 4px 20px rgba(0,0,0,0.05)' : 'none',
        transition: 'background 0.35s ease, box-shadow 0.35s ease, border-color 0.35s ease, height 0.35s ease',
      }}
    >
      <div
        style={{
          maxWidth: '88rem',
          margin: '0 auto',
          padding: '0 2rem',
          height: scrolled ? '60px' : '76px',
          display: 'grid',
          gridTemplateColumns: '1fr auto 1fr',
          alignItems: 'center',
          transition: 'height 0.35s ease',
        }}
      >
        {/* Logo — left */}
        <a
          href="#"
          aria-label="Angel's Dust"
          style={{
            justifySelf: 'start',
            fontFamily: "'Instrument Serif', Georgia, serif",
            fontSize: '1.75rem',
            letterSpacing: '-0.03em',
            color: '#000000',
            textDecoration: 'none',
            lineHeight: 1,
            whiteSpace: 'nowrap',
          }}
        >
          Angel's Dust<sup style={{ fontSize: '0.5em', verticalAlign: 'super', marginLeft: '2px' }}>®</sup>
        </a>

        {/* Nav — center */}
        <nav
          aria-label="Main navigation"
          style={{ justifySelf: 'center', display: 'flex', alignItems: 'center', gap: '2.25rem' }}
        >
          {NAV_LINKS.map(({ label, href, primary }) => (
            <a
              key={label}
              href={href}
              style={{
                position: 'relative',
                fontFamily: "'Inter', system-ui, sans-serif",
                fontSize: '0.8125rem',
                letterSpacing: '0.04em',
                textTransform: 'uppercase',
                color: primary ? '#000000' : '#6F6F6F',
                textDecoration: 'none',
                transition: 'color 0.2s ease',
                whiteSpace: 'nowrap',
              }}
              onMouseEnter={e => (e.currentTarget.style.color = '#000000')}
              onMouseLeave={e => (e.currentTarget.style.color = primary ? '#000000' : '#6F6F6F')}
            >
              {label}
            </a>
          ))}
        </nav>

        {/* CTA — right */}
        <a
          href="#visit"
          style={{
            justifySelf: 'end',
            fontFamily: "'Inter', system-ui, sans-serif",
            fontSize: '0.8125rem',
            background: '#000000',
            color: '#ffffff',
            borderRadius: '9999px',
            padding: '0.625rem 1.5rem',
            textDecoration: 'none',
            transition: 'transform 0.2s ease',
            display: 'inline-flex',
            alignItems: 'center',
            whiteSpace: 'nowrap',
          }}
          onMouseEnter={e => (e.currentTarget.style.transform = 'scale(1.03)')}
          onMouseLeave={e => (e.currentTarget.style.transform = 'scale(1)')}
        >
          Reserve a Table
        </a>
      </div>
    </header>
  )
}

/* ─── Main Hero ─── */
export default function Hero() {
  return (
    <>
      {/* Skip to content */}
      <a
        href="#patisserie"
        className="sr-only focus:not-sr-only"
        style={{
          position: 'fixed', top: '1rem', left: '1rem', zIndex: 200,
          background: '#000', color: '#fff', padding: '0.5rem 1rem',
          borderRadius: '6px', fontFamily: "'Inter', sans-serif", fontSize: '0.875rem',
        }}
      >
        Skip to content
      </a>

      <section
        style={{
          position: 'relative',
          minHeight: '100vh',
          width: '100%',
          overflow: 'hidden',
          background: '#ffffff',
        }}
      >
        {/* ── Looping video background ── */}
        <CinematicVideo />

        {/* ── Navigation ── */}
        <NavBar />

        {/* ── Hero content ── */}
        <div
          style={{
            position: 'relative',
            zIndex: 10,
            minHeight: '100vh',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            textAlign: 'center',
            padding: '6rem 1.5rem 4rem',
          }}
        >
          {/* Eyebrow */}
          <p
            className="animate-fade-rise"
            style={{
              fontFamily: "'Inter', system-ui, sans-serif",
              fontSize: '0.6875rem',
              letterSpacing: '0.28em',
              textTransform: 'uppercase',
              color: '#6F6F6F',
              marginBottom: '2rem',
            }}
          >
            Pâtisserie · Thomas Street · Limerick
          </p>

          {/* Headline */}
          <h1
            className="animate-fade-rise"
            style={{
              fontFamily: "'Instrument Serif', Georgia, serif",
              fontSize: 'clamp(2.8rem, 8vw, 5.5rem)',
              fontWeight: 400,
              lineHeight: 0.95,
              letterSpacing: '-2.46px',
              color: '#000000',
              maxWidth: '80rem',
              marginBottom: '0',
            }}
          >
            Beyond{' '}
            <em style={{ color: '#6F6F6F', fontStyle: 'italic' }}>crumbs,</em>{' '}
            we craft<br />
            <em style={{ color: '#6F6F6F', fontStyle: 'italic' }}>the timeless.</em>
          </h1>

          {/* Description */}
          <p
            className="animate-fade-rise-delay"
            style={{
              fontFamily: "'Inter', system-ui, sans-serif",
              fontSize: 'clamp(0.9375rem, 2vw, 1.125rem)',
              lineHeight: 1.7,
              color: '#6F6F6F',
              maxWidth: '36rem',
              marginTop: '2rem',
            }}
          >
            Handcrafted French pastries — made fresh each morning on Thomas Street.
            Open Thursday–Sunday, 11:30 am. Arrive early. We sell out.
          </p>

          {/* CTAs */}
          <div
            className="animate-fade-rise-delay-2"
            style={{
              display: 'flex',
              flexWrap: 'wrap',
              gap: '0.875rem',
              justifyContent: 'center',
              marginTop: '3rem',
            }}
          >
            {/* Primary CTA */}
            <a
              href="#patisserie"
              style={{
                fontFamily: "'Inter', system-ui, sans-serif",
                fontSize: '0.9375rem',
                background: '#000000',
                color: '#ffffff',
                borderRadius: '9999px',
                padding: '1.125rem 3.5rem',
                textDecoration: 'none',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.5rem',
                transition: 'transform 0.2s ease',
              }}
              onMouseEnter={e => (e.currentTarget.style.transform = 'scale(1.03)')}
              onMouseLeave={e => (e.currentTarget.style.transform = 'scale(1)')}
            >
              Explore Pastries
            </a>

            {/* Secondary CTA */}
            <a
              href="#visit"
              style={{
                fontFamily: "'Inter', system-ui, sans-serif",
                fontSize: '0.9375rem',
                background: 'transparent',
                color: '#000000',
                borderRadius: '9999px',
                padding: '1.125rem 3.5rem',
                textDecoration: 'none',
                display: 'inline-flex',
                alignItems: 'center',
                border: '1.5px solid rgba(0,0,0,0.18)',
                transition: 'all 0.2s ease',
              }}
              onMouseEnter={e => {
                e.currentTarget.style.background = '#000'
                e.currentTarget.style.color = '#fff'
              }}
              onMouseLeave={e => {
                e.currentTarget.style.background = 'transparent'
                e.currentTarget.style.color = '#000'
              }}
            >
              Plan Your Visit
            </a>
          </div>

          {/* Rating */}
          <div
            className="animate-fade-rise-delay-3"
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '0.625rem',
              marginTop: '3.5rem',
            }}
          >
            {/* Stars */}
            <div style={{ display: 'flex', gap: '2px' }}>
              {[...Array(5)].map((_, i) => (
                <svg key={i} width="14" height="14" viewBox="0 0 20 20" fill="#000000">
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
              ))}
            </div>
            <span style={{ fontFamily: "'Inter', sans-serif", fontSize: '0.8125rem', fontWeight: 600, color: '#000' }}>4.9</span>
            <span style={{ color: '#d0d0d0' }}>·</span>
            <span style={{ fontFamily: "'Inter', sans-serif", fontSize: '0.8125rem', color: '#6F6F6F' }}>121 Google reviews</span>
          </div>
        </div>

        {/* Scroll cue */}
        <div
          className="animate-fade-rise-delay-3"
          style={{
            position: 'absolute',
            bottom: '2.5rem',
            left: '50%',
            transform: 'translateX(-50%)',
            zIndex: 10,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: '0.5rem',
          }}
          aria-hidden
        >
          <span style={{
            fontFamily: "'Inter', sans-serif",
            fontSize: '0.625rem',
            letterSpacing: '0.2em',
            textTransform: 'uppercase',
            color: '#b0b0b0',
          }}>Scroll</span>
          <div style={{
            width: '1px',
            height: '36px',
            background: 'linear-gradient(to bottom, #000 0%, transparent 100%)',
            animation: 'pulse-bar 2s ease-in-out infinite',
          }} />
        </div>
      </section>
    </>
  )
}
