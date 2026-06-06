const ITEMS = [
  { text: '4.9 Stars on Google', sym: '★' },
  { text: '121 Verified Reviews', sym: '·' },
  { text: 'Open Thursday – Sunday', sym: '·' },
  { text: 'Sells Out Daily', sym: '·' },
  { text: '12 Thomas St, Limerick', sym: '·' },
  { text: '"Like a taste of Paris"', sym: '·' },
  { text: 'Handcrafted Every Morning', sym: '·' },
  { text: 'From €5', sym: '·' },
]

// Triple for seamless loop at all speeds
const DOUBLED = [...ITEMS, ...ITEMS, ...ITEMS]

export default function Marquee() {
  return (
    <div
      className="overflow-hidden py-4 border-y select-none"
      style={{ background: '#2A1F15', borderColor: 'rgba(255,255,255,0.04)' }}
      aria-hidden="true"
    >
      <div className="animate-marquee flex whitespace-nowrap will-change-transform">
        {DOUBLED.map((item, i) => (
          <span
            key={i}
            className="inline-flex items-center gap-4 mx-8 flex-shrink-0"
          >
            <span
              className="font-sans text-[10px] tracking-[0.25em] uppercase"
              style={{ color: 'rgba(219,193,156,0.55)' }}
            >
              {item.text}
            </span>
            <span style={{ color: 'rgba(201,176,55,0.35)', fontSize: '0.7rem' }}>
              {item.sym}
            </span>
          </span>
        ))}
      </div>
    </div>
  )
}
