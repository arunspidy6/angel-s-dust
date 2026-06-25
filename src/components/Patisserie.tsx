import { useRef, useEffect, useState } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import { slideUp, slideLeft, slideRight, imageReveal, VP } from '../lib/motion'

const DEFAULT_PLATES = [
  { id: '1', number: '01', title: 'Signature Cakes', imgLeft: true, img: 'https://static.prod-images.emergentagent.com/jobs/cbb31a6a-4943-4178-85f1-14347656ed11/images/395f490bfca4ccced891679c2a2301ccc040efb8c1581ffdb2152d8c11933911.png', desc: 'Layered entremets finished by hand with edible gold leaf. Built the day before service, never a moment sooner.', sub: 'Pistachio · Rose · Hazelnut Praliné', price: 'from €6' },
  { id: '2', number: '02', title: 'Macarons', imgLeft: false, img: 'https://images.pexels.com/photos/32600936/pexels-photo-32600936.jpeg', desc: "Crisp shells, soft centres. The flavours change with the morning's mood and the season's fruit.", sub: '12 daily flavours · gluten-free', price: 'from €2.50' },
  { id: '3', number: '03', title: 'Viennoiserie', imgLeft: true, img: 'https://images.unsplash.com/photo-1530610476181-d83430b64dcd?w=900&q=85&auto=format&fit=crop', desc: 'Three-day cold-fermented dough, French butter, laminated by hand. The croissant you remember from holiday — every single morning.', sub: 'Plain · Almond · Chocolate · Pain Suisse', price: 'from €3.80' },
  { id: '4', number: '04', title: 'Slices & Tarts', imgLeft: false, img: 'https://images.unsplash.com/photo-1624000961428-eeece184988b?w=900&q=85&auto=format&fit=crop', desc: "Single-serve compositions that arrive looking too pretty to eat — until they don't. Refined, never overwrought.", sub: 'Pistachio Raspberry · Dark Chocolate · Lemon Verveine', price: 'from €5' },
  { id: '5', number: '05', title: 'Behind the Counter', imgLeft: true, img: 'https://images.pexels.com/photos/33703638/pexels-photo-33703638.jpeg', desc: 'The glass case opens Thursday at 11:30. By Saturday afternoon, what\'s left is what\'s left. Come early.', sub: 'Restocked Thu · Fri · Sat', price: 'Visit us' },
]

function Plate({ plate }: { plate: typeof DEFAULT_PLATES[number] }) {
  const ref = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] })
  const imgY = useTransform(scrollYProgress, [0, 1], ['10%', '-10%'])
  const textAnim = plate.imgLeft ? slideRight : slideLeft

  return (
    <article ref={ref} className="grid grid-cols-12 gap-6 md:gap-12 lg:gap-20 items-center py-20 md:py-28" style={{ borderBottom: '1px solid rgba(45,36,34,0.1)' }}>
      {/* Image - matches Story section size */}
      <motion.div
        {...imageReveal()}
        className={`col-span-12 md:col-span-5 lg:col-span-4 ${plate.imgLeft ? 'md:order-1' : 'md:order-2'}`}
      >
        <div style={{ position: 'relative', aspectRatio: '3/4', overflow: 'hidden', background: '#FFF5F3' }}>
          <motion.img
            src={plate.img}
            alt={plate.title}
            style={{ y: imgY, position: 'absolute', inset: '-8% 0', width: '100%', height: '116%', objectFit: 'cover' }}
          />
          <div style={{ position: 'absolute', top: '1.25rem', left: '1.25rem', right: '1.25rem', display: 'flex', justifyContent: 'space-between', fontSize: '0.625rem', textTransform: 'uppercase', letterSpacing: '0.35em', color: 'white', mixBlendMode: 'difference', fontFamily: "'Inter', sans-serif" }}>
            <span>N°{plate.number}</span><span>Pâtisserie</span>
          </div>
        </div>
      </motion.div>

      {/* Text */}
      <motion.div
        {...textAnim()}
        className={`col-span-12 md:col-span-7 lg:col-span-8 ${plate.imgLeft ? 'md:order-2 md:pr-4 lg:pr-8' : 'md:order-1 md:pl-4 lg:pl-8'}`}
      >
        <div style={{ display: 'flex', alignItems: 'baseline', gap: '1.5rem', marginBottom: '1rem' }}>
          <span style={{ fontFamily: "'Instrument Serif', serif", fontStyle: 'italic', color: 'rgba(212,175,55,0.4)', fontSize: 'clamp(4rem, 9vw, 8rem)', lineHeight: 1 }}>{plate.number}</span>
          <motion.span
            initial={{ scaleX: 0 }} whileInView={{ scaleX: 1 }} viewport={VP}
            transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            style={{ height: '1px', flex: 1, background: 'rgba(45,36,34,0.2)', marginBottom: '0.75rem', transformOrigin: 'left' }}
          />
        </div>
        <h3 style={{ fontFamily: "'Instrument Serif', serif", fontSize: 'clamp(2.25rem, 4.5vw, 4rem)', lineHeight: 0.95, letterSpacing: '-1px', color: '#2D2422', fontWeight: 400 }}>{plate.title}</h3>
        <p style={{ marginTop: '1.5rem', fontSize: 'clamp(1rem, 1.5vw, 1.125rem)', color: '#6F6F6F', lineHeight: 1.7, maxWidth: '28rem', fontFamily: "'Inter', sans-serif" }}>{plate.desc}</p>
        <div style={{ marginTop: '2.5rem', display: 'flex', alignItems: 'center', justifyContent: 'space-between', maxWidth: '28rem', paddingBottom: '1rem', borderBottom: '1px solid rgba(45,36,34,0.2)' }}>
          <span style={{ fontSize: '0.75rem', textTransform: 'uppercase', letterSpacing: '0.25em', color: '#2D2422', fontFamily: "'Inter', sans-serif" }}>{plate.sub}</span>
          <span style={{ fontFamily: "'Instrument Serif', serif", fontStyle: 'italic', fontSize: '1.5rem', color: '#D4AF37' }}>{plate.price}</span>
        </div>
      </motion.div>
    </article>
  )
}

export default function Patisserie() {
  const [plates, setPlates] = useState(DEFAULT_PLATES)

  useEffect(() => {
    fetch('http://localhost:3001/api/products')
      .then(res => res.json())
      .then(data => {
        if (data && data.length > 0) {
          setPlates(data)
        }
      })
      .catch(() => {
        // Use default plates if API is not available
      })
  }, [])

  return (
    <section id="patisserie" style={{ background: '#FAF8F5', padding: '7rem 0 9rem', overflow: 'hidden' }}>
      <div style={{ maxWidth: '1400px', margin: '0 auto', padding: '0 1.5rem' }}>

        {/* Header */}
        <div className="grid grid-cols-12 gap-6 items-end mb-20 md:mb-28">
          <motion.div {...slideUp()} className="col-span-12 md:col-span-8">
            <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1.5rem' }}>
              <span style={{ fontSize: '0.625rem', textTransform: 'uppercase', letterSpacing: '0.4em', fontWeight: 600, color: '#D4AF37', fontFamily: "'Inter', sans-serif" }}>[ N°02 ] The Pâtisserie</span>
              <span style={{ height: '1px', width: '3rem', background: '#D4AF37', display: 'block' }} />
            </div>
            <h2 style={{ fontFamily: "'Instrument Serif', serif", fontSize: 'clamp(2.75rem, 6vw, 6rem)', lineHeight: 0.95, letterSpacing: '-1.8px', color: '#2D2422', fontWeight: 400 }}>
              Today's menu, <em style={{ fontStyle: 'italic', color: '#D4AF37' }}>a small work of art.</em>
            </h2>
          </motion.div>
          <motion.div {...slideUp(0.15)} className="col-span-12 md:col-span-4 md:pb-3">
            <p style={{ fontSize: 'clamp(1rem, 1.5vw, 1.125rem)', color: '#6F6F6F', lineHeight: 1.7, fontFamily: "'Inter', sans-serif" }}>
              Five plates, written for the season. The counter shifts each week — what's here is what's true today.
            </p>
            <div style={{ marginTop: '1.5rem', display: 'flex', alignItems: 'center', gap: '1rem', fontSize: '0.625rem', textTransform: 'uppercase', letterSpacing: '0.3em', color: '#6F6F6F', fontFamily: "'Inter', sans-serif" }}>
              <span>0{plates.length} Plates</span>
              <span style={{ height: '1px', flex: 1, background: 'rgba(45,36,34,0.2)' }} />
              <span>Lookbook</span>
            </div>
          </motion.div>
        </div>

        {/* Plates */}
        <div style={{ borderTop: '1px solid rgba(45,36,34,0.1)' }}>
          {plates.map(plate => <Plate key={plate.id || plate.number} plate={plate} />)}
        </div>
      </div>
    </section>
  )
}
