import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Menu, X, Phone } from 'lucide-react'

const links = [
  { label: 'Our Story', href: '#about' },
  { label: 'Menu', href: '#menu' },
  { label: 'Hours', href: '#hours' },
  { label: 'Reviews', href: '#reviews' },
  { label: 'Find Us', href: '#find' },
]

export default function Nav() {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <>
      <motion.nav
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          scrolled
            ? 'glass border-b border-wheat/30 shadow-sm'
            : 'bg-transparent'
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 lg:px-10 flex items-center justify-between h-18 py-4">
          {/* Logo */}
          <a href="#" className="flex flex-col leading-none group">
            <span className="font-serif text-xl font-semibold tracking-wide text-dark group-hover:text-wheat transition-colors duration-300">
              Angel's <span className="gold-shimmer">Dust</span>
            </span>
            <span className="font-sans text-[9px] tracking-[0.25em] uppercase text-espresso/50 mt-0.5">
              Patisserie · Limerick
            </span>
          </a>

          {/* Desktop links */}
          <ul className="hidden lg:flex items-center gap-8">
            {links.map((l) => (
              <li key={l.href}>
                <a
                  href={l.href}
                  className="font-sans text-[11px] font-500 tracking-[0.15em] uppercase text-espresso/70 hover:text-espresso transition-colors duration-200 relative after:absolute after:bottom-0 after:left-0 after:w-0 after:h-px after:bg-gold after:transition-all after:duration-300 hover:after:w-full"
                >
                  {l.label}
                </a>
              </li>
            ))}
          </ul>

          {/* CTA */}
          <div className="hidden lg:flex items-center gap-3">
            <a
              href="tel:+35361410021"
              className="flex items-center gap-2 font-sans text-[11px] tracking-[0.12em] uppercase px-5 py-2.5 border border-wheat text-espresso hover:bg-wheat hover:border-wheat rounded-sm transition-all duration-300 group"
            >
              <Phone size={12} className="group-hover:text-espresso transition-colors" />
              Call Us
            </a>
            <a
              href="#find"
              className="font-sans text-[11px] tracking-[0.12em] uppercase px-5 py-2.5 bg-espresso text-cream hover:bg-dark rounded-sm transition-all duration-300"
            >
              Get Directions
            </a>
          </div>

          {/* Mobile toggle */}
          <button
            className="lg:hidden p-2 text-espresso"
            onClick={() => setOpen(!open)}
            aria-label="Toggle menu"
          >
            {open ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </motion.nav>

      {/* Mobile menu */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-x-0 top-[68px] z-40 glass border-b border-wheat/30 px-6 py-8 flex flex-col gap-6"
          >
            {links.map((l, i) => (
              <motion.a
                key={l.href}
                href={l.href}
                initial={{ opacity: 0, x: -16 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.06 }}
                onClick={() => setOpen(false)}
                className="font-sans text-sm tracking-[0.15em] uppercase text-espresso/80 hover:text-espresso"
              >
                {l.label}
              </motion.a>
            ))}
            <a
              href="tel:+35361410021"
              className="flex items-center gap-2 font-sans text-sm tracking-widest uppercase px-5 py-3 border border-wheat text-espresso text-center justify-center rounded-sm mt-2"
              onClick={() => setOpen(false)}
            >
              <Phone size={14} />
              +353 61 410 021
            </a>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
