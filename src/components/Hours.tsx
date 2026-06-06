import { useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import { Phone } from 'lucide-react'

const DAYS = [
  { day: 'Thursday',  open: true  },
  { day: 'Friday',    open: true  },
  { day: 'Saturday',  open: true  },
  { day: 'Sunday',    open: true  },
]

const TODAY = ['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday'][new Date().getDay()]

export default function Hours() {
  const section = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({ target: section, offset: ['start 0.8', 'end 0.2'] })
  const headlineY = useTransform(scrollYProgress, [0, 0.3], [60, 0])
  const headlineOpacity = useTransform(scrollYProgress, [0, 0.2], [0, 1])
  const imgScale = useTransform(scrollYProgress, [0.2, 0.6], [0.85, 1])
  const imgOpacity = useTransform(scrollYProgress, [0.1, 0.4], [0, 1])

  return (
    <section id="visit" ref={section} className="py-32 lg:py-48 overflow-hidden" style={{ background: '#2C1F14' }}>
      <div className="max-w-7xl mx-auto px-8 lg:px-16">

        {/* Header */}
        <motion.div
          style={{ y: headlineY, opacity: headlineOpacity }}
          className="mb-20"
        >
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.5 }}
            transition={{ duration: 0.8 }}
            className="font-sans text-[10px] tracking-[0.25em] uppercase text-gold mb-4"
          >
            03 — When to Visit
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.5 }}
            transition={{ duration: 0.9, delay: 0.1 }}
            className="font-display font-normal"
            style={{ fontSize: 'clamp(2.4rem, 6vw, 5rem)', color: '#FAF7F2', lineHeight: 0.95 }}
          >
            Open Thursday<br />through Sunday
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.5 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="font-sans text-base mt-6 max-w-lg"
            style={{ color: 'rgba(219,193,156,0.6)', lineHeight: 1.7 }}
          >
            We rest Monday through Wednesday to give you our very best Thursday through Sunday.
          </motion.p>
        </motion.div>

        {/* Grid layout */}
        <div className="grid lg:grid-cols-2 gap-16 lg:gap-20 items-center">

          {/* LEFT — Image */}
          <motion.div
            style={{ scale: imgScale, opacity: imgOpacity }}
            className="relative rounded-2xl overflow-hidden shadow-2xl order-2 lg:order-1"
            style2={{ height: 'clamp(320px, 40vh, 480px)' }}
          >
            <img
              src="https://images.unsplash.com/photo-1486427944299-d1955d23e34d?w=900&q=90&auto=format&fit=crop"
              alt="Fresh pastries display"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-40" />
            {/* Quote overlay */}
            <div className="absolute bottom-0 left-0 right-0 p-10 lg:p-12">
              <p className="font-display italic text-white leading-snug mb-2"
                style={{ fontSize: 'clamp(1.4rem, 2.5vw, 2rem)' }}>
                "Like a taste of Paris"
              </p>
              <p className="font-sans text-[9px] tracking-[0.2em] uppercase" style={{ color: 'rgba(212,175,106,0.5)' }}>
                Local Guide · 248 Reviews
              </p>
            </div>
          </motion.div>

          {/* RIGHT — Schedule */}
          <div className="order-1 lg:order-2">
            {/* Day rows */}
            {DAYS.map((d, i) => {
              const isToday = d.day === TODAY
              return (
                <motion.div
                  key={d.day}
                  initial={{ opacity: 0, x: 30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, amount: 0.3 }}
                  transition={{ duration: 0.8, delay: i * 0.1 }}
                  className="group flex items-center justify-between py-6 lg:py-8 border-b border-white/10 relative overflow-hidden"
                  whileHover={{ paddingLeft: 16 }}
                >
                  {/* Hover background */}
                  <motion.div
                    className="absolute inset-0"
                    style={{ background: 'rgba(255,255,255,0.02)', transformOrigin: 'left' }}
                    initial={{ scaleX: 0 }}
                    whileHover={{ scaleX: 1 }}
                    transition={{ duration: 0.3 }}
                  />

                  <div className="relative flex items-center gap-8 lg:gap-16">
                    <span
                      className="font-sans text-[9px] tracking-[0.2em] uppercase hidden lg:block w-8"
                      style={{ color: 'rgba(255,255,255,0.15)' }}
                    >
                      {d.day.slice(0, 3).toUpperCase()}
                    </span>
                    <span
                      className="font-display font-normal leading-none"
                      style={{
                        fontSize: 'clamp(1.8rem, 4vw, 3.5rem)',
                        letterSpacing: '-0.02em',
                        color: isToday ? '#D4AF6A' : 'rgba(250,247,242,0.85)',
                      }}
                    >
                      {d.day}
                    </span>
                    {isToday && (
                      <motion.span
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="font-sans text-[8px] tracking-[0.2em] uppercase px-3 py-1.5 rounded-full"
                        style={{
                          border: '1px solid rgba(212,175,106,0.4)',
                          color: '#D4AF6A',
                          background: 'rgba(212,175,106,0.1)',
                        }}
                      >
                        Today
                      </motion.span>
                    )}
                  </div>

                  <div className="relative flex items-center gap-6 lg:gap-10">
                    <span
                      className="font-sans text-base lg:text-lg tracking-wide font-medium"
                      style={{ color: isToday ? '#D4AF6A' : 'rgba(219,193,156,0.6)' }}
                    >
                      11:30 am
                    </span>
                    <span
                      className="opacity-0 group-hover:opacity-60 transition-opacity duration-300 text-xl"
                      style={{ color: '#D4AF6A' }}
                    >
                      →
                    </span>
                  </div>
                </motion.div>
              )
            })}

            {/* Closed message */}
            <motion.p
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.8, delay: 0.5 }}
              className="mt-8 font-sans text-xs tracking-wide"
              style={{ color: 'rgba(255,255,255,0.2)' }}
            >
              Monday — Wednesday &mdash; Closed for preparation
            </motion.p>

            {/* CTA */}
            <motion.a
              href="tel:+35361410021"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.8, delay: 0.6 }}
              whileHover={{ x: 8 }}
              className="inline-flex items-center gap-3 mt-10 px-7 py-4 rounded-full font-sans text-[11px] tracking-[0.2em] uppercase"
              style={{ background: '#D4AF6A', color: '#1A1410' }}
            >
              <Phone size={13} /> Call to Reserve
            </motion.a>
          </div>
        </div>
      </div>
    </section>
  )
}
