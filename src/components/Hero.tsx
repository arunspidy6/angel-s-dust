import { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence, useMotionValue, useSpring, useScroll, useTransform } from 'framer-motion'

const WORDS = ['Pistachio.', 'Éclair.', 'Elegance.', 'Paris.']
const NAV = ['Pâtisserie', 'Reviews', 'Visit', 'Contact']

function CycleWord() {
  const [i, setI] = useState(0)
  useEffect(() => {
    const t = setInterval(() => setI(n => (n + 1) % WORDS.length), 2800)
    return () => clearInterval(t)
  }, [])
  return (
    <span className="inline-block overflow-hidden">
      <AnimatePresence mode="wait">
        <motion.em
          key={i}
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -30 }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="font-display italic block"
          style={{ color: '#E8C8D0' }}
        >
          {WORDS[i]}
        </motion.em>
      </AnimatePresence>
    </span>
  )
}

function MagneticButton({ href, children, outline = false, className = '' }: {
  href: string; children: React.ReactNode; outline?: boolean; className?: string
}) {
  const x = useMotionValue(0), y = useMotionValue(0)
  const sx = useSpring(x, { stiffness: 300, damping: 24 })
  const sy = useSpring(y, { stiffness: 300, damping: 24 })

  return (
    <motion.a
      href={href}
      style={{ x: sx, y: sy }}
      onMouseMove={e => {
        const r = e.currentTarget.getBoundingClientRect()
        x.set((e.clientX - r.left - r.width / 2) * 0.32)
        y.set((e.clientY - r.top - r.height / 2) * 0.32)
      }}
      onMouseLeave={() => { x.set(0); y.set(0) }}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      className={`inline-flex items-center gap-3 font-sans text-sm rounded-full cursor-pointer select-none focus-visible:outline focus-visible:outline-2 ${className}`}
      style={outline
        ? { background: 'rgba(255,255,255,0.12)', color: '#fff', border: '1.5px solid rgba(255,255,255,0.35)', backdropFilter: 'blur(12px)', padding: '0.95rem 2.2rem' }
        : { background: '#D4AF6A', color: '#1A1410', padding: '0.95rem 2.2rem' }
      }
    >
      {children}
    </motion.a>
  )
}

export default function Hero() {
  const [open, setOpen] = useState(false)
  const ref = useRef<HTMLElement>(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] })
  const bgScale = useTransform(scrollYProgress, [0, 1], [1, 1.1])
  const contentOpacity = useTransform(scrollYProgress, [0, 0.6], [1, 0])
  const contentY = useTransform(scrollYProgress, [0, 0.6], ['0px', '-60px'])

  return (
    <>
      <a href="#story" className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[200] focus:bg-espresso focus:text-ivory focus:px-4 focus:py-2 focus:rounded font-sans text-sm">
        Skip to content
      </a>

      <section ref={ref} className="relative w-full min-h-screen overflow-hidden flex items-center justify-center">

        {/* ═══ HERO BACKGROUND IMAGE — FULL BLEED ═══ */}
        <motion.div
          style={{ scale: bgScale }}
          className="absolute inset-0 z-0 overflow-hidden"
          aria-hidden="true"
        >
          <img
            src="https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=1600&h=900&q=90&auto=format&fit=crop"
            alt=""
            className="w-full h-full object-cover"
          />
          {/* Dark overlay for text contrast */}
          <div className="absolute inset-0" style={{ background: 'radial-gradient(circle at center, rgba(26,20,16,0.3) 0%, rgba(26,20,16,0.7) 100%)' }} />
        </motion.div>

        {/* ═══ NAVIGATION ═══ */}
        <motion.nav
          initial={{ opacity: 0, y: -16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="absolute top-0 left-0 right-0 z-20 max-w-6xl mx-auto px-8 lg:px-16 py-6 flex items-center justify-between w-full"
        >
          <a href="#" className="font-display text-2xl text-white select-none" aria-label="Angel's Dust">
            Angel's Dust<sup className="text-xs align-super ml-1.5">®</sup>
          </a>
          <ul className="hidden lg:flex items-center gap-12" role="list">
            {NAV.map((l, i) => (
              <li key={l}>
                <a href={`#${l.toLowerCase()}`}
                  className="font-sans text-sm tracking-wide transition-all duration-300 hover:text-gold"
                  style={{ color: 'rgba(255,255,255,0.8)' }}>
                  {l}
                </a>
              </li>
            ))}
          </ul>
          <MagneticButton href="#visit" outline className="hidden lg:inline-flex text-xs">
            Reserve
          </MagneticButton>
          <button
            onClick={() => setOpen(o => !o)}
            aria-expanded={open}
            className="lg:hidden w-10 h-10 flex flex-col justify-center items-center gap-1.5"
          >
            {[0, 1, 2].map(j => (
              <motion.span key={j} className="block h-0.5 bg-white" style={{ width: 20 }}
                animate={open ? (j === 1 ? { opacity: 0 } : j === 0 ? { rotate: 45, y: 7 } : { rotate: -45, y: -7 }) : { rotate: 0, y: 0, opacity: 1 }}
              />
            ))}
          </button>
        </motion.nav>

        {/* Mobile menu */}
        <AnimatePresence>
          {open && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="absolute top-20 left-0 right-0 z-20 overflow-hidden"
              style={{ background: 'rgba(26,20,16,0.95)', backdropFilter: 'blur(12px)' }}
            >
              <nav className="px-8 py-6 flex flex-col gap-4">
                {NAV.map((l, i) => (
                  <motion.a key={l} href={`#${l.toLowerCase()}`}
                    initial={{ opacity: 0, x: -12 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.06 }}
                    onClick={() => setOpen(false)}
                    className="font-sans text-sm text-white"
                  >
                    {l}
                  </motion.a>
                ))}
              </nav>
            </motion.div>
          )}
        </AnimatePresence>

        {/* ═══ CENTERED HERO CONTENT ═══ */}
        <motion.div
          style={{ opacity: contentOpacity, y: contentY }}
          className="relative z-10 max-w-4xl mx-auto px-8 lg:px-16 text-center"
        >
          {/* Eyebrow */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="font-sans text-[11px] tracking-[0.3em] uppercase mb-8 text-gold"
          >
            Pâtisserie — Limerick, Ireland
          </motion.p>

          {/* Headline */}
          <motion.h1
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.0, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}
            className="font-display font-normal text-white mb-8"
            style={{
              fontSize: 'clamp(3.2rem, 9vw, 7.5rem)',
              lineHeight: 0.98,
              letterSpacing: '-0.03em',
            }}
          >
            Beyond <em style={{ color: '#E8C8D0', fontStyle: 'italic' }}>sweetness</em>,<br />
            we craft <CycleWord /><br />
            <span style={{ color: '#D4AF6A', fontStyle: 'italic' }}>the extraordinary.</span>
          </motion.h1>

          {/* Description */}
          <motion.p
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.65 }}
            className="font-sans text-lg max-w-2xl mx-auto mb-12"
            style={{ color: 'rgba(255,255,255,0.85)', lineHeight: 1.8 }}
          >
            Handcrafted French pastries made <em style={{ color: '#E8C8D0', fontStyle: 'italic' }}>fresh each morning</em> on Thomas Street. Open Thursday–Sunday, 11:30 am. <em style={{ color: '#E8C8D0', fontStyle: 'italic' }}>Arrive early</em> — we sell out within hours.
          </motion.p>

          {/* CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.8 }}
            className="flex flex-wrap items-center justify-center gap-5"
          >
            <MagneticButton href="#patisserie">
              Explore Menu
              <span className="hero-arrow-nudge inline-block">→</span>
            </MagneticButton>
            <MagneticButton href="#visit" outline>
              Plan Your Visit
            </MagneticButton>
          </motion.div>

          {/* Rating */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.95 }}
            className="flex items-center justify-center gap-3 mt-16"
          >
            <div className="flex gap-0.5">
              {[...Array(5)].map((_, i) => (
                <svg key={i} className="w-4 h-4" viewBox="0 0 20 20" style={{ fill: '#D4AF6A' }}>
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/>
                </svg>
              ))}
            </div>
            <span className="font-sans text-sm font-semibold text-white">4.9</span>
            <span className="text-white/30">·</span>
            <span className="font-sans text-sm" style={{ color: 'rgba(255,255,255,0.6)' }}>121 reviews</span>
          </motion.div>
        </motion.div>

        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2 }}
          className="absolute bottom-10 left-1/2 -translate-x-1/2 z-10"
          aria-hidden
        >
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="flex flex-col items-center gap-3"
          >
            <p className="font-sans text-[9px] tracking-[0.2em] uppercase" style={{ color: 'rgba(255,255,255,0.4)' }}>Scroll</p>
            <motion.div className="w-0.5 h-6" style={{ background: 'rgba(255,255,255,0.3)' }} />
          </motion.div>
        </motion.div>
      </section>
    </>
  )
}
