import { useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'

export default function About() {
  const section = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({ target: section, offset: ['start 0.8', 'end 0.2'] })

  // Parallax zoom effect
  const bgScale = useTransform(scrollYProgress, [0, 1], [1.05, 0.95])
  const overlayOpacity = useTransform(scrollYProgress, [0, 0.3], [0.4, 0.65])

  return (
    <section id="story" ref={section} className="relative min-h-screen py-24 lg:py-32 overflow-hidden" style={{ background: '#FFF' }}>

      {/* Background Image with Parallax */}
      <motion.div
        style={{ scale: bgScale }}
        className="absolute inset-0 z-0"
        aria-hidden="true"
      >
        <img
          src="https://images.unsplash.com/photo-1509042239860-f550ce710b93?w=1920&q=90&auto=format&fit=crop"
          alt=""
          className="w-full h-full object-cover"
        />
        <motion.div
          style={{ opacity: overlayOpacity }}
          className="absolute inset-0"
          style={{ background: 'linear-gradient(135deg, rgba(31,46,84,0.5) 0%, rgba(232,200,208,0.2) 100%)' }}
        />
      </motion.div>

      {/* Content */}
      <div className="relative z-10 max-w-5xl mx-auto px-8 lg:px-16">

        {/* Section Label */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
          className="mb-12"
        >
          <p className="font-sans text-[10px] tracking-[0.25em] uppercase text-gold mb-2">
            ✦ N°01 ✦ Our Story
          </p>
          <div className="w-12 h-0.5 bg-gradient-to-r from-gold to-pink" />
        </motion.div>

        {/* Headline */}
        <motion.h2
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.8, ease: 'easeOut', delay: 0.1 }}
          className="font-display font-normal text-navy mb-8"
          style={{
            fontSize: 'clamp(2rem, 5vw, 3.8rem)',
            letterSpacing: '-0.03em',
            lineHeight: 1.1,
          }}
        >
          Quiet patience,<br />
          <em style={{ color: '#E8C8D0', fontStyle: 'italic' }}>extraordinary</em> pastry.
        </motion.h2>

        {/* Description */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.8, ease: 'easeOut', delay: 0.2 }}
          className="space-y-6 max-w-3xl"
        >
          <p
            className="font-sans text-base lg:text-lg"
            style={{ color: '#5C6B8E', lineHeight: 1.8 }}
          >
            Tucked away on Thomas Street, <strong>Angel's Dust</strong> began with one <em style={{ fontStyle: 'italic', color: '#1F2E54' }}>quiet obsession:</em> bring the elegance and rigour of a Parisian pâtisserie to the cobbled streets of Limerick.
          </p>

          <p
            className="font-sans text-base lg:text-lg"
            style={{ color: '#5C6B8E', lineHeight: 1.8 }}
          >
            Every croissant <em style={{ fontStyle: 'italic', color: '#E8C8D0' }}>laminated by hand.</em> Every entremet built <em style={{ fontStyle: 'italic', color: '#E8C8D0' }}>layer by layer</em> the day before service. We don't take shortcuts — and yes, that's why we sometimes sell out by 2pm.
          </p>
        </motion.div>

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.8, ease: 'easeOut', delay: 0.3 }}
          className="grid grid-cols-3 gap-8 mt-16 pt-12 border-t"
          style={{ borderColor: 'rgba(31, 46, 84, 0.1)' }}
        >
          <div>
            <p className="text-3xl lg:text-4xl font-display text-navy mb-2" style={{ color: '#D4AF6A' }}>
              100%
            </p>
            <p className="font-sans text-sm" style={{ color: '#5C6B8E' }}>
              Hand-made daily
            </p>
          </div>
          <div>
            <p className="text-3xl lg:text-4xl font-display text-navy mb-2" style={{ color: '#D4AF6A' }}>
              4.8★
            </p>
            <p className="font-sans text-sm" style={{ color: '#5C6B8E' }}>
              118 Google reviews
            </p>
          </div>
          <div>
            <p className="text-3xl lg:text-4xl font-display text-navy mb-2" style={{ color: '#D4AF6A' }}>
              Thu–Sun
            </p>
            <p className="font-sans text-sm" style={{ color: '#5C6B8E' }}>
              Opening hours
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
