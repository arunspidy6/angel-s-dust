import { useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'

const PRODUCTS = [
  { number: '01', name: 'Pistachio Choux', price: '€6', tag: 'Bestseller', color: 'bg-pink', desc: 'Hand-piped choux pastry with pistachio cream filling and gold dust.' },
  { number: '02', name: 'Chocolate Éclair', price: '€6', tag: 'Classic', color: 'bg-pink-dark', desc: 'Dark chocolate ganache and pastry cream in the traditional French way.' },
  { number: '03', name: 'Rhubarb Tart', price: '€5', tag: 'Seasonal', color: 'bg-blush', desc: 'Bright rhubarb compote over vanilla crème pâtissière. Spring only.' },
  { number: '04', name: 'Pain au Chocolat', price: '€5', tag: 'Fresh Daily', color: 'bg-gold-pale', desc: 'Laminated three days. Cold-fermented dough. French butter. Two bars.' },
  { number: '05', name: 'Macaron Assort', price: '€4', tag: 'Colorful', color: 'bg-pink', desc: 'Twelve flavours rotate daily. Crisp shell, soft centre. Always gluten-free.' },
  { number: '06', name: 'Raspberry Croissant', price: '€4.50', tag: 'Morning Fresh', color: 'bg-blush', desc: 'Laminated by hand. Raspberry jam. Buttery, flaky, ready at dawn.' },
]

export default function Products() {
  const section = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({ target: section, offset: ['start 0.8', 'end 0.2'] })

  // Parallax zoom effect - like entering the kitchen
  const bgScale = useTransform(scrollYProgress, [0, 1], [1.05, 0.95])
  const overlayOpacity = useTransform(scrollYProgress, [0, 0.3], [0.5, 0.75])

  return (
    <section id="patisserie" ref={section} className="relative min-h-screen py-24 lg:py-32 overflow-hidden" style={{ background: '#FFF' }}>

      {/* ═══ BACKGROUND IMAGE — Kitchen POV ═══ */}
      <motion.div
        style={{ scale: bgScale }}
        className="absolute inset-0 z-0"
        aria-hidden="true"
      >
        <img
          src="https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=1920&q=90&auto=format&fit=crop"
          alt=""
          className="w-full h-full object-cover"
        />
        {/* Dark overlay for readability */}
        <motion.div
          style={{ opacity: overlayOpacity }}
          className="absolute inset-0"
          style2={{ background: 'linear-gradient(135deg, rgba(31,46,84,0.6) 0%, rgba(232,200,208,0.3) 100%)' }}
        />
      </motion.div>

      {/* ═══ CONTENT ═══ */}
      <div className="relative z-10 max-w-7xl mx-auto px-8 lg:px-16">

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.85, ease: 'easeOut' }}
          className="text-center mb-20"
        >
          <p className="font-sans text-[10px] tracking-[0.25em] uppercase text-gold mb-4">
            ✦ N°02 ✦ Our Collection
          </p>
          <h2
            className="font-display font-normal text-navy mb-6"
            style={{
              fontSize: 'clamp(2.2rem, 6vw, 4.8rem)',
              letterSpacing: '-0.03em',
              lineHeight: 0.95,
            }}
          >
            Each piece, <em style={{ color: '#E8C8D0', fontStyle: 'italic' }}>a small work of art</em>.
          </h2>
          <p
            className="font-sans text-base lg:text-lg max-w-2xl mx-auto"
            style={{ color: '#5C6B8E', lineHeight: 1.7 }}
          >
            <em style={{ color: '#1F2E54' }}>Handcrafted</em> with precision and passion. Five plates, written for the season. The counter shifts each week — what's here is what's <em style={{ color: '#1F2E54' }}>true today</em>.
          </p>
        </motion.div>

        {/* Products Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {PRODUCTS.map((product, i) => (
            <motion.div
              key={product.name}
              initial={{ opacity: 0, y: 40, scale: 0.95 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{
                duration: 0.8,
                delay: i * 0.08,
                ease: 'easeOut',
              }}
              whileHover={{ y: -8, transition: { duration: 0.3, ease: 'easeOut' } }}
              className="group relative p-8 lg:p-10 rounded-2xl overflow-hidden cursor-pointer focus-within:outline focus-within:outline-2 focus-within:outline-gold"
              style={{ background: 'rgba(255, 255, 255, 0.92)', backdropFilter: 'blur(10px)', border: '1px solid rgba(232, 200, 208, 0.3)' }}
              role="article"
              tabIndex={0}
              aria-label={`${product.name}, ${product.price}`}
            >
              {/* Top accent bar */}
              <motion.div
                className="absolute top-0 left-0 right-0 h-1"
                style={{
                  background: `linear-gradient(to right, #E8C8D0, #D4AF6A)`,
                  scaleX: 0,
                  originX: 0,
                }}
                whileHover={{ scaleX: 1 }}
                transition={{ duration: 0.5, ease: 'easeOut' }}
              />

              {/* Number */}
              <p className="font-sans text-[9px] tracking-[0.2em] uppercase text-gold mb-3" style={{ letterSpacing: '0.1em' }}>
                Plate N°{product.number}
              </p>

              {/* Tag */}
              <div className="inline-flex mb-4 px-3 py-1 rounded-full text-[8px] tracking-[0.2em] uppercase font-sans"
                style={{ background: 'rgba(232, 200, 208, 0.2)', color: '#1F2E54', border: '1px solid rgba(232, 200, 208, 0.4)' }}>
                {product.tag}
              </div>

              {/* Name */}
              <h3
                className="font-display font-normal text-navy mb-3"
                style={{ fontSize: 'clamp(1.3rem, 2.5vw, 1.8rem)', letterSpacing: '-0.02em', lineHeight: 1.2 }}
              >
                {product.name}
              </h3>

              {/* Price */}
              <motion.div
                className="flex items-baseline gap-2 mb-4"
                initial={{ opacity: 0, x: -8 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.6, delay: i * 0.08 + 0.2, ease: 'easeOut' }}
              >
                <span className="font-display italic text-2xl gold-shimmer">{product.price}</span>
                <span className="font-sans text-[10px] tracking-wide text-text-muted">per piece</span>
              </motion.div>

              {/* Hover text */}
              <motion.p
                className="font-sans text-xs leading-relaxed"
                style={{ color: 'rgba(92, 107, 142, 0.7)' }}
                initial={{ opacity: 0 }}
                whileHover={{ opacity: 1 }}
                transition={{ duration: 0.3 }}
              >
                {product.desc}
              </motion.p>

              {/* Bottom shine effect */}
              <motion.div
                className="absolute bottom-0 left-0 right-0 h-px"
                style={{
                  background: 'linear-gradient(to right, transparent, rgba(232, 200, 208, 0.5), transparent)',
                  opacity: 0,
                }}
                whileHover={{ opacity: 1 }}
                transition={{ duration: 0.3 }}
              />
            </motion.div>
          ))}
        </div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.8, delay: 0.6, ease: 'easeOut' }}
          className="text-center mt-20"
        >
          <p
            className="font-sans text-sm mb-6"
            style={{ color: '#5C6B8E', lineHeight: 1.7 }}
          >
            Open Thursday – Sunday, 11:30 am. Menu varies by season. Visit us to discover today's fresh creations.
          </p>
          <a
            href="#visit"
            className="inline-flex items-center gap-2 px-8 py-3.5 rounded-full font-sans text-[11px] tracking-[0.15em] uppercase transition-all duration-300 focus-visible:outline focus-visible:outline-2 focus-visible:outline-gold"
            style={{ background: '#1F2E54', color: '#FFF' }}
          >
            Reserve Your Favorites →
          </a>
        </motion.div>
      </div>
    </section>
  )
}
