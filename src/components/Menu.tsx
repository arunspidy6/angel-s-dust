import { useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'

const ITEMS = [
  {
    name: 'Pistachio Choux',
    desc: 'Silky pistachio cream inside feather-light choux, crowned with crushed pistachios.',
    price: '€6', tag: 'Bestseller',
    img: 'https://images.unsplash.com/photo-1563729784474-d77dbb933a9e?w=1400&q=90&auto=format&fit=crop',
  },
  {
    name: 'Chocolate Éclair',
    desc: 'Dark chocolate glaze over velvety custard in feather-light choux.',
    price: '€6', tag: 'Classic',
    img: 'https://images.unsplash.com/photo-1612203985729-70726954388c?w=900&q=90&auto=format&fit=crop',
  },
  {
    name: 'Rhubarb Tart',
    desc: 'Seasonal rhubarb on buttery shortcrust with vanilla cream.',
    price: '€5', tag: 'Seasonal',
    img: 'https://images.unsplash.com/photo-1488477181946-6428a0291777?w=900&q=90&auto=format&fit=crop',
  },
  {
    name: 'Pain au Chocolat',
    desc: 'Perfectly laminated dough around premium Belgian chocolate.',
    price: '€5', tag: 'Fresh Daily',
    img: 'https://images.unsplash.com/photo-1509440159596-0249088772ff?w=900&q=90&auto=format&fit=crop',
  },
]

function PastryCard({ item, index }: { item: typeof ITEMS[0]; index: number }) {
  const ref = useRef(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start 0.8', 'end 0.2'] })
  const scale = useTransform(scrollYProgress, [0, 0.5], [0.8, 1])
  const opacity = useTransform(scrollYProgress, [0, 0.4], [0, 1])
  const y = useTransform(scrollYProgress, [0, 0.4], [50, 0])

  return (
    <motion.div
      ref={ref}
      style={{ scale, opacity, y }}
      className="group relative overflow-hidden rounded-xl shadow-lg cursor-pointer"
      style2={{ height: 'clamp(300px, 40vh, 420px)' }}
      whileHover="hovered"
    >
      <img
        src={item.img}
        alt={item.name}
        className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-70" />

      {/* Tag */}
      <motion.div
        className="absolute top-6 left-6 px-4 py-1.5 rounded-full text-[9px] tracking-[0.2em] uppercase font-sans"
        style={{ background: 'rgba(212,175,106,0.2)', color: '#D4AF6A', border: '1px solid rgba(212,175,106,0.4)', backdropFilter: 'blur(8px)' }}
      />

      {/* Content */}
      <div className="absolute bottom-0 left-0 right-0 p-8 lg:p-10">
        <h3 className="font-display italic text-white mb-2" style={{ fontSize: 'clamp(1.6rem, 3vw, 2.2rem)', lineHeight: 1.2 }}>
          {item.name}
        </h3>
        <motion.p
          className="font-sans text-xs leading-relaxed mb-4"
          style={{ color: 'rgba(255,255,255,0.3)' }}
          whileHover={{ color: 'rgba(255,255,255,0.7)' }}
          transition={{ duration: 0.3 }}
        >
          {item.desc}
        </motion.p>
        <div className="flex items-end justify-between">
          <span className="font-display italic text-3xl gold-shimmer">{item.price}</span>
        </div>
      </div>

      {/* Hover line */}
      <motion.div
        className="absolute bottom-0 left-0 right-0 h-px"
        style={{ background: 'linear-gradient(to right, transparent, #D4AF6A, transparent)', originX: 0 }}
        initial={{ scaleX: 0 }}
        whileHover={{ scaleX: 1 }}
        transition={{ duration: 0.5 }}
      />
    </motion.div>
  )
}

export default function Menu() {
  const section = useRef(null)
  const { scrollYProgress } = useScroll({ target: section, offset: ['start 0.8', 'end 0.2'] })
  const headlineY = useTransform(scrollYProgress, [0, 0.3], [60, 0])
  const headlineOpacity = useTransform(scrollYProgress, [0, 0.2], [0, 1])

  return (
    <section id="patisserie" ref={section} className="py-32 lg:py-48 bg-parchment overflow-hidden">
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
            ✦ N°03 ✦ Featured Pastries
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.5 }}
            transition={{ duration: 0.9, delay: 0.1 }}
            className="font-display font-normal text-espresso mb-2"
            style={{ fontSize: 'clamp(2.4rem, 6vw, 5rem)', lineHeight: 0.95 }}
          >
            Pastries worth
          </motion.h2>
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.5 }}
            transition={{ duration: 0.9, delay: 0.2 }}
            className="font-display italic font-normal"
            style={{ fontSize: 'clamp(2.4rem, 6vw, 5rem)', lineHeight: 0.95, color: '#E8C8D0' }}
          >
            queuing for.
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.5 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="font-sans text-base mt-6 max-w-lg"
            style={{ color: '#6B5344', lineHeight: 1.7 }}
          >
            Each pastry is handcrafted fresh each morning using traditional French techniques. From €5. They sell out within hours.
          </motion.p>
        </motion.div>

        {/* Divider */}
        <motion.div
          initial={{ scaleX: 0, opacity: 0 }}
          whileInView={{ scaleX: 1, opacity: 1 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 1, delay: 0.4 }}
          className="h-px bg-sand mb-14 origin-left"
        />

        {/* Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {ITEMS.map((item, i) => (
            <PastryCard key={item.name} item={item} index={i} />
          ))}
        </div>

        {/* Footer text */}
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="text-center font-sans text-[9px] tracking-[0.2em] uppercase mt-16"
          style={{ color: '#9E8878' }}
        >
          Menu varies by season — ask us what's fresh today
        </motion.p>
      </div>
    </section>
  )
}
