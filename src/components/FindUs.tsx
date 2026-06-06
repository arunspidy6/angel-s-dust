import { useRef } from 'react'
import { motion } from 'framer-motion'
import { MapPin, Clock, Phone, Navigation } from 'lucide-react'
import { slideUp, scaleReveal, fadeIn, slideLeft, VP } from '../lib/motion'

const DETAILS = [
  {
    icon: MapPin,
    label: 'Address',
    value: "12 Thomas St, Prior's-Land\nLimerick, V94 KXF1, Ireland",
    link: 'https://maps.google.com/?q=12+Thomas+St,+Limerick,+Ireland',
    cta: 'Open in Maps',
  },
  {
    icon: Clock,
    label: 'Opening Hours',
    value: 'Thursday – Sunday\n11:30 am onwards (until sold out)',
    link: '#hours',
    cta: 'Full Schedule',
  },
  {
    icon: Phone,
    label: 'Phone',
    value: '+353 61 410 021',
    link: 'tel:+35361410021',
    cta: 'Call Now',
  },
]

export default function FindUs() {
  const section = useRef(null)

  return (
    <section id="find" ref={section} className="py-28 lg:py-36 bg-parchment overflow-hidden">
      <div className="max-w-site mx-auto px-8 lg:px-16">

        {/* Header */}
        <div className="flex items-center justify-between mb-16 pb-5 border-b" style={{ borderColor: 'var(--sand)' }}>
          <div>
            <motion.p {...slideUp(0)} className="font-sans text-[10px] tracking-caps uppercase text-gold mb-2">
              05 &mdash; Visit Us
            </motion.p>
            <motion.h2 {...slideUp(0.08, 48)}
              className="font-display font-normal leading-tight-display text-dark"
              style={{ fontSize: 'clamp(2.4rem, 5vw, 4.5rem)', letterSpacing: 'var(--hero)' }}
            >
              Find us on <em className="italic" style={{ color: '#C9A96E' }}>Thomas Street</em>
            </motion.h2>
          </div>
        </div>

        <div className="grid lg:grid-cols-2 gap-14 items-start">

          {/* Details */}
          <div className="flex flex-col gap-5">
            {DETAILS.map(({ icon: Icon, label, value, link, cta }, i) => (
              <motion.div
                key={label}
                {...slideLeft(0.1 + i * 0.1)}
                whileHover={{ x: 4 }}
                transition={{ type: 'spring', stiffness: 300, damping: 22 }}
                className="flex gap-5 p-6 rounded-[2px] group cursor-default transition-all duration-300"
                style={{
                  background: 'var(--ivory)',
                  border: '1px solid var(--blush)',
                }}
              >
                <div
                  className="w-11 h-11 rounded-full flex items-center justify-center flex-shrink-0 transition-all duration-300"
                  style={{ background: 'var(--gold-pale)' }}
                >
                  <Icon size={16} style={{ color: 'var(--ink)' }} />
                </div>
                <div>
                  <p
                    className="font-sans text-[9px] tracking-caps uppercase mb-1"
                    style={{ color: 'var(--text-muted)' }}
                  >
                    {label}
                  </p>
                  <p
                    className="font-sans text-sm leading-relaxed whitespace-pre-line mb-2"
                    style={{ color: 'var(--dark)' }}
                  >
                    {value}
                  </p>
                  <a
                    href={link}
                    target={link.startsWith('http') ? '_blank' : undefined}
                    rel={link.startsWith('http') ? 'noopener noreferrer' : undefined}
                    className="inline-block font-sans text-[10px] tracking-[0.15em] uppercase pb-px border-b transition-colors duration-200"
                    style={{ color: 'var(--gold-dark)', borderColor: 'rgba(155,123,62,0.3)' }}
                  >
                    {cta} &rarr;
                  </a>
                </div>
              </motion.div>
            ))}

            {/* Tip */}
            <motion.div {...slideUp(0.4)}
              className="flex gap-3 p-5 rounded-[2px]"
              style={{ background: 'rgba(201,169,110,0.08)', border: '1px solid rgba(201,169,110,0.2)' }}
            >
              <Navigation size={14} style={{ color: 'var(--gold)', flexShrink: 0, marginTop: 2 }} />
              <p className="font-sans text-xs leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
                <span className="font-medium" style={{ color: 'var(--dark)' }}>Pro tip:</span>{' '}
                Short walk from Limerick City Centre. Street parking on Thomas Street.
                Arrive at 11:30 am sharp — we sell out fast!
              </p>
            </motion.div>

            <motion.a {...slideUp(0.5)}
              href="https://maps.google.com/?q=12+Thomas+St,+Limerick,+Ireland"
              target="_blank" rel="noopener noreferrer"
              whileHover={{ x: 4, scale: 1.01 }}
              transition={{ type: 'spring', stiffness: 300, damping: 20 }}
              className="inline-flex items-center gap-3 font-sans text-[11px] tracking-[0.18em] uppercase px-7 py-4 rounded-[2px] w-fit shadow-md transition-all duration-300"
              style={{
                background: 'var(--espresso)',
                color: 'var(--ivory)',
                boxShadow: '0 4px 20px rgba(44,31,20,0.18)',
              }}
            >
              <MapPin size={13} />
              Open in Google Maps
            </motion.a>
          </div>

          {/* Map */}
          <motion.div
            {...scaleReveal(0.2)}
            className="overflow-hidden rounded-[2px] shadow-xl"
            style={{
              height: 480,
              border: '1px solid var(--blush)',
              boxShadow: '0 8px 40px rgba(44,31,20,0.1)',
            }}
          >
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2427.0!2d-8.6296!3d52.6641!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x485b5c72657c1b89%3A0x3c3f55b15fc1b3a8!2s12%20Thomas%20St%2C%20Limerick!5e0!3m2!1sen!2sie!4v1700000000000!5m2!1sen!2sie"
              width="100%" height="100%"
              style={{ border: 0, display: 'block', filter: 'saturate(0.9) brightness(1.02)' }}
              allowFullScreen loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Angel's Dust location"
            />
          </motion.div>
        </div>
      </div>
    </section>
  )
}
