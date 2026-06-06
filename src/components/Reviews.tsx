import { useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'

const FEATURED = {
  text: '"It\'s like a taste of Paris right here in Limerick. The patisseries are amazingly delicious and absolute works of art. Fantastic value for money."',
  author: 'Kym Tucker', meta: '2 months ago', stars: 5,
}
const OTHERS = [
  {
    text: '"The cakes are unreal. No wonder they sell out so fast. Arrive as soon as they open!"',
    author: 'May', meta: 'Local Guide · 248 reviews', stars: 5,
  },
  {
    text: '"Beautiful pastries. Each piece is a work of art. Great value starting from €5."',
    author: 'S.S.', meta: 'Local Guide · 59 reviews', stars: 4,
  },
]

function Stars({ n }: { n: number }) {
  return (
    <div className="flex gap-1">
      {[...Array(5)].map((_, i) => (
        <svg key={i} className="w-4 h-4" viewBox="0 0 20 20" style={{ fill: i < n ? '#D4AF6A' : 'rgba(255,255,255,0.1)' }}>
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/>
        </svg>
      ))}
    </div>
  )
}

export default function Reviews() {
  const section = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({ target: section, offset: ['start 0.8', 'end 0.2'] })
  const headlineOpacity = useTransform(scrollYProgress, [0, 0.2], [0, 1])
  const headlineY = useTransform(scrollYProgress, [0, 0.25], [60, 0])

  return (
    <section id="reviews" ref={section} className="py-32 lg:py-48 bg-ivory overflow-hidden">
      <div className="max-w-7xl mx-auto px-8 lg:px-16">

        {/* Header */}
        <motion.div style={{ opacity: headlineOpacity, y: headlineY }} className="mb-16">
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.5 }}
            transition={{ duration: 0.8 }}
            className="font-sans text-[10px] tracking-[0.25em] uppercase text-gold mb-4"
          >
            ✦ N°04 ✦ Reviews
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.5 }}
            transition={{ duration: 0.9, delay: 0.1 }}
            className="font-display font-normal text-espresso"
            style={{ fontSize: 'clamp(2.4rem, 6vw, 5rem)', lineHeight: 0.95 }}
          >
            Loved by<br />
            <span style={{ color: '#E8C8D0', fontStyle: 'italic' }}>Limerick</span>.
          </motion.h2>
        </motion.div>

        {/* Featured Review */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9, y: 40 }}
          whileInView={{ opacity: 1, scale: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 1, delay: 0.2 }}
          className="mb-8 relative p-12 lg:p-16 rounded-2xl shadow-xl overflow-hidden"
          style={{ background: '#2C1F14' }}
        >
          {/* Decorative quote mark */}
          <span
            className="absolute -top-8 -right-4 font-display leading-none select-none opacity-5"
            style={{ fontSize: '20rem', color: '#D4AF6A' }}
            aria-hidden
          >
            "
          </span>

          <Stars n={FEATURED.stars} />
          <p
            className="font-display italic font-normal text-white leading-snug mt-8 mb-10 relative z-10"
            style={{ fontSize: 'clamp(1.3rem, 2.5vw, 2.2rem)', lineHeight: 1.4 }}
          >
            {FEATURED.text}
          </p>

          <div className="flex items-center gap-4">
            <div
              className="w-10 h-10 rounded-full flex items-center justify-center font-display font-normal text-white flex-shrink-0"
              style={{ background: 'linear-gradient(135deg, #D4AF6A, #A48D5C)' }}
            >
              {FEATURED.author[0]}
            </div>
            <div>
              <p className="font-sans text-sm font-medium text-white">{FEATURED.author}</p>
              <p className="font-sans text-[9px]" style={{ color: 'rgba(212,175,106,0.4)' }}>
                {FEATURED.meta}
              </p>
            </div>
          </div>

          {/* Bottom line */}
          <motion.div
            className="absolute bottom-0 left-0 right-0 h-1"
            style={{ background: 'linear-gradient(to right, transparent, #D4AF6A, transparent)', originX: 0 }}
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true, amount: 0.5 }}
            transition={{ duration: 1.2, delay: 0.6 }}
          />
        </motion.div>

        {/* Smaller cards */}
        <div className="grid md:grid-cols-2 gap-6">
          {OTHERS.map((r, i) => (
            <motion.div
              key={r.author}
              initial={{ opacity: 0, y: 40, scale: 0.95 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.8, delay: 0.3 + i * 0.15 }}
              whileHover={{ y: -8 }}
              className="p-8 rounded-xl border border-sand relative overflow-hidden"
              style={{ background: '#FAF7F2' }}
            >
              <Stars n={r.stars} />
              <p
                className="font-display italic leading-snug mt-4 mb-6"
                style={{ fontSize: 'clamp(1rem, 1.8vw, 1.3rem)', color: '#1A1410', lineHeight: 1.5 }}
              >
                {r.text}
              </p>
              <div className="flex items-center gap-3 pt-5 border-t border-blush">
                <div
                  className="w-8 h-8 rounded-full flex items-center justify-center font-display font-normal text-white text-xs flex-shrink-0"
                  style={{ background: 'rgba(212,175,106,0.6)' }}
                >
                  {r.author[0]}
                </div>
                <div>
                  <p className="font-sans text-sm font-medium text-espresso">{r.author}</p>
                  <p className="font-sans text-[8px] tracking-wide text-text-muted">{r.meta}</p>
                </div>
              </div>

              {/* Bottom accent */}
              <motion.div
                className="absolute bottom-0 left-0 right-0 h-1"
                style={{ background: 'linear-gradient(to right, #D4AF6A, transparent)', originX: 0 }}
                initial={{ scaleX: 0 }}
                whileInView={{ scaleX: 1 }}
                viewport={{ once: true, amount: 0.5 }}
                transition={{ duration: 0.7, delay: 0.4 + i * 0.15 }}
              />
            </motion.div>
          ))}
        </div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="mt-16 flex flex-col sm:flex-row items-center gap-6 p-8 rounded-xl border border-blush"
          style={{ background: '#F3EDE3' }}
        >
          <div>
            <p className="font-display italic text-2xl text-espresso" style={{ letterSpacing: '-0.01em' }}>
              Loved your visit?
            </p>
            <p className="font-sans text-xs mt-1 text-text-muted">
              Share your experience on Google Maps.
            </p>
          </div>
          <motion.a
            href="https://maps.google.com/maps?q=Angel's+Dust+Patisserie+Limerick"
            target="_blank" rel="noopener noreferrer"
            whileHover={{ x: 6 }}
            className="sm:ml-auto flex-shrink-0 inline-flex items-center gap-2 px-7 py-3 rounded-full font-sans text-[11px] tracking-[0.2em] uppercase"
            style={{ background: '#1A1410', color: '#FAF7F2' }}
          >
            Leave a Review →
          </motion.a>
        </motion.div>
      </div>
    </section>
  )
}
