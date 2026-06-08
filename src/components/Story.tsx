import { useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import { slideUp, imageReveal, staggerParent, staggerChild, VP } from '../lib/motion'

export default function Story() {
  const sectionRef = useRef<HTMLElement>(null)
  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ['start end', 'end start'] })

  // Parallax: image drifts up, watermark drifts opposite
  const imgY = useTransform(scrollYProgress, [0, 1], ['8%', '-8%'])
  const markY = useTransform(scrollYProgress, [0, 1], ['60px', '-40px'])

  return (
    <section
      id="story"
      ref={sectionRef}
      style={{ position: 'relative', background: '#FAF8F5', padding: '8rem 0 11rem', overflow: 'hidden' }}
    >
      {/* Watermark with parallax */}
      <motion.div
        aria-hidden
        style={{
          y: markY,
          position: 'absolute', top: '-2.5rem', right: 0,
          fontFamily: "'Instrument Serif', serif", fontSize: 'clamp(14vw, 18vw, 22rem)',
          lineHeight: 1, color: 'rgba(212,175,55,0.07)', pointerEvents: 'none',
          userSelect: 'none', fontStyle: 'italic',
        }}
      >
        Maison
      </motion.div>

      <div style={{ maxWidth: '1400px', margin: '0 auto', padding: '0 1.5rem' }}>
        <div className="grid grid-cols-12 gap-6 md:gap-10">

          {/* Image */}
          <motion.div className="col-span-12 md:col-span-5 lg:col-span-4" {...imageReveal()}>
            <div style={{ position: 'relative', aspectRatio: '3/4', overflow: 'hidden' }}>
              <motion.img
                src="https://images.pexels.com/photos/18330310/pexels-photo-18330310.jpeg"
                alt="Angel Dust interior"
                style={{ y: imgY, position: 'absolute', inset: '-8% 0', width: '100%', height: '116%', objectFit: 'cover', scale: 1.05 }}
              />
            </div>
            <motion.div
              {...slideUp(0.2)}
              style={{ marginTop: '1rem', display: 'flex', justifyContent: 'space-between', fontSize: '0.625rem', textTransform: 'uppercase', letterSpacing: '0.3em', color: '#6F6F6F', fontFamily: "'Inter', sans-serif" }}
            >
              <span>Plate № 02</span><span>The Counter, 7:00 AM</span>
            </motion.div>
          </motion.div>

          {/* Text */}
          <div className="col-span-12 md:col-span-7 lg:col-start-6 lg:col-span-7 md:mt-24">
            <motion.div {...slideUp()} style={{ display: 'inline-flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1.5rem' }}>
              <span style={{ fontSize: '0.625rem', textTransform: 'uppercase', letterSpacing: '0.4em', fontWeight: 600, color: '#D4AF37', fontFamily: "'Inter', sans-serif" }}>
                [ N°01 ] Our Story
              </span>
              <motion.span
                initial={{ scaleX: 0 }} whileInView={{ scaleX: 1 }} viewport={VP}
                transition={{ duration: 0.7, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
                style={{ height: '1px', width: '3rem', background: '#D4AF37', display: 'block', transformOrigin: 'left' }}
              />
            </motion.div>

            {/* Headline — word-by-word reveal */}
            <motion.h2
              {...staggerParent(0.1)}
              style={{ fontFamily: "'Instrument Serif', serif", fontSize: 'clamp(2.75rem, 6vw, 6rem)', lineHeight: 0.95, letterSpacing: '-1.8px', color: '#2D2422', fontWeight: 400 }}
            >
              {['Quiet', 'patience,'].map((w, i) => (
                <span key={i} style={{ display: 'inline-block', overflow: 'hidden', verticalAlign: 'bottom', marginRight: '0.25em' }}>
                  <motion.span style={{ display: 'inline-block' }} variants={staggerChild}>{w}</motion.span>
                </span>
              ))}
              <br />
              <span style={{ display: 'inline-block', overflow: 'hidden', verticalAlign: 'bottom' }}>
                <motion.em style={{ display: 'inline-block', fontStyle: 'italic', color: '#D4AF37' }} variants={staggerChild}>extraordinary</motion.em>
              </span>
              <br />
              <span style={{ display: 'inline-block', overflow: 'hidden', verticalAlign: 'bottom' }}>
                <motion.span style={{ display: 'inline-block' }} variants={staggerChild}>pastry.</motion.span>
              </span>
            </motion.h2>

            <div className="grid grid-cols-12 gap-6 mt-12">
              <motion.p
                {...slideUp(0.1)}
                className="col-span-12 md:col-span-9 md:col-start-3"
                style={{ color: '#6F6F6F', lineHeight: 1.75, fontSize: 'clamp(1rem, 1.5vw, 1.125rem)', fontFamily: "'Inter', sans-serif" }}
              >
                Tucked away on Thomas Street, Angel Dust began with one quiet obsession: bring the elegance and rigour of a Parisian pâtisserie to the cobbled streets of Limerick.
                <br /><br />
                Every croissant laminated by hand. Every entremet built layer by layer the day before service. We don't take shortcuts — and yes, that's why we sometimes sell out by 2pm.
              </motion.p>
            </div>

            {/* Stats — staggered */}
            <motion.div className="grid grid-cols-3 gap-6 md:gap-10" {...staggerParent(0.14)} style={{ marginTop: '4rem', maxWidth: '36rem' }}>
              {[
                { value: '100%', label: 'Hand-made daily' },
                { value: '4.8★', label: '118 Google reviews' },
                { value: 'Thu–Sun', label: 'Opening hours' },
              ].map(stat => (
                <motion.div key={stat.label} variants={staggerChild} style={{ borderTop: '1px solid #2D2422', paddingTop: '1rem' }}>
                  <div style={{ fontFamily: "'Instrument Serif', serif", fontSize: 'clamp(1.5rem, 3vw, 2.25rem)', color: '#2D2422', lineHeight: 1 }}>{stat.value}</div>
                  <div style={{ fontSize: '0.625rem', textTransform: 'uppercase', letterSpacing: '0.25em', color: '#6F6F6F', marginTop: '0.75rem', fontFamily: "'Inter', sans-serif" }}>{stat.label}</div>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  )
}
