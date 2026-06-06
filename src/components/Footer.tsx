import { motion } from 'framer-motion'
import { MapPin, Phone, Clock, Instagram, Facebook } from 'lucide-react'
import { fadeIn, slideUp } from '../lib/motion'

export default function Footer() {
  return (
    <footer style={{ background: '#1A120A' }} className="text-ivory/50 font-sans">

      {/* Top section */}
      <div className="max-w-site mx-auto px-8 lg:px-16 pt-20 pb-16">
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-12">

          {/* Brand */}
          <motion.div {...slideUp(0)}>
            <p className="font-display text-2xl font-normal text-ivory mb-1">
              Angel's <span className="italic gold-shimmer">Dust</span>
            </p>
            <p className="font-sans text-[8px] tracking-caps uppercase mb-5" style={{ color: 'rgba(201,169,110,0.45)' }}>
              Patisserie · Limerick, Ireland
            </p>
            <p className="font-sans text-xs leading-relaxed" style={{ color: 'rgba(250,247,242,0.38)' }}>
              Handcrafted French pastries made fresh daily in the heart of Limerick.
            </p>
          </motion.div>

          {/* Hours */}
          <motion.div {...slideUp(0.08)}>
            <p className="font-sans text-[9px] tracking-caps uppercase mb-5 text-gold">Hours</p>
            <div className="flex flex-col gap-2 text-xs">
              <p style={{ color: 'rgba(250,247,242,0.2)' }}>Mon – Wed &middot; Closed</p>
              <p style={{ color: 'rgba(219,193,156,0.65)' }}>Thu – Sun &middot; 11:30 am</p>
              <p className="font-sans text-[10px] italic mt-1" style={{ color: 'rgba(250,247,242,0.3)' }}>
                Until sold out daily
              </p>
            </div>
          </motion.div>

          {/* Contact */}
          <motion.div {...slideUp(0.16)}>
            <p className="font-sans text-[9px] tracking-caps uppercase mb-5 text-gold">Contact</p>
            <div className="flex flex-col gap-3 text-xs">
              <a
                href="https://maps.google.com/?q=12+Thomas+St,+Limerick"
                target="_blank" rel="noopener noreferrer"
                className="flex items-start gap-2 transition-colors duration-200"
                style={{ color: 'rgba(250,247,242,0.4)' }}
              >
                <MapPin size={11} className="mt-0.5 flex-shrink-0" style={{ color: '#C9A96E' }} />
                12 Thomas St, Limerick
              </a>
              <a
                href="tel:+35361410021"
                className="flex items-center gap-2 transition-colors duration-200"
                style={{ color: 'rgba(250,247,242,0.4)' }}
              >
                <Phone size={11} style={{ color: '#C9A96E' }} />
                +353 61 410 021
              </a>
              <div className="flex items-center gap-2" style={{ color: 'rgba(250,247,242,0.4)' }}>
                <Clock size={11} style={{ color: '#C9A96E' }} />
                Open Thu – Sun
              </div>
            </div>
          </motion.div>

          {/* Social */}
          <motion.div {...slideUp(0.24)}>
            <p className="font-sans text-[9px] tracking-caps uppercase mb-5 text-gold">Follow Us</p>
            <div className="flex gap-3 mb-5">
              {[
                { icon: Instagram, label: 'Instagram' },
                { icon: Facebook, label: 'Facebook' },
              ].map(({ icon: Icon, label }) => (
                <motion.a
                  key={label}
                  href="#"
                  aria-label={label}
                  whileHover={{ scale: 1.1, borderColor: 'rgba(201,169,110,0.5)' }}
                  transition={{ type: 'spring', stiffness: 400, damping: 20 }}
                  className="w-9 h-9 rounded-full flex items-center justify-center transition-all duration-300"
                  style={{ border: '1px solid rgba(255,255,255,0.1)', color: 'rgba(250,247,242,0.35)' }}
                >
                  <Icon size={14} />
                </motion.a>
              ))}
            </div>
            <p className="font-sans text-[10px] leading-relaxed" style={{ color: 'rgba(250,247,242,0.28)' }}>
              Tag us in your visit — we love seeing our pastries in the wild!
            </p>
          </motion.div>
        </div>
      </div>

      {/* Thin gold divider */}
      <div className="max-w-site mx-auto px-8 lg:px-16">
        <div style={{ height: 1, background: 'linear-gradient(to right, transparent, rgba(201,169,110,0.3), transparent)' }} />
      </div>

      {/* Bottom bar */}
      <div className="max-w-site mx-auto px-8 lg:px-16 py-6 flex flex-col sm:flex-row items-center justify-between gap-3">
        <p className="font-sans text-[10px] tracking-wide" style={{ color: 'rgba(250,247,242,0.2)' }}>
          &copy; 2025 Angel's Dust Patisserie &amp; Bakery, Limerick, Ireland
        </p>
        <p className="font-sans text-[10px]" style={{ color: 'rgba(250,247,242,0.18)' }}>
          Made with love in Limerick 🇮🇪
        </p>
      </div>
    </footer>
  )
}
