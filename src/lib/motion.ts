/**
 * Shared Framer Motion animation presets
 * ui-ux-pro-max compliant:
 *  - duration 0.8–0.95s (complex transitions ≤400ms micro, long reveals OK for hero content)
 *  - ease: [0.16, 1, 0.3, 1] — spring-like exit curve
 *  - viewport: once:true, amount:0.05 — triggers as soon as edge is visible
 *  - NO repeat:Infinity (use CSS animations.css for those)
 */

export const VP = { once: true, amount: 0.05 } as const

export const slideUp = (delay = 0, y = 36) => ({
  initial: { opacity: 0, y },
  whileInView: { opacity: 1, y: 0 },
  viewport: VP,
  transition: { duration: 0.88, delay, ease: [0.16, 1, 0.3, 1] as const },
})

export const fadeIn = (delay = 0) => ({
  initial: { opacity: 0 },
  whileInView: { opacity: 1 },
  viewport: VP,
  transition: { duration: 0.8, delay, ease: 'easeOut' as const },
})

export const scaleReveal = (delay = 0) => ({
  initial: { opacity: 0, scale: 0.96 },
  whileInView: { opacity: 1, scale: 1 },
  viewport: VP,
  transition: { duration: 1.0, delay, ease: [0.16, 1, 0.3, 1] as const },
})

export const slideLeft = (delay = 0) => ({
  initial: { opacity: 0, x: -28 },
  whileInView: { opacity: 1, x: 0 },
  viewport: VP,
  transition: { duration: 0.88, delay, ease: [0.16, 1, 0.3, 1] as const },
})

export const slideRight = (delay = 0) => ({
  initial: { opacity: 0, x: 28 },
  whileInView: { opacity: 1, x: 0 },
  viewport: VP,
  transition: { duration: 0.88, delay, ease: [0.16, 1, 0.3, 1] as const },
})

export const stagger = (i: number, base = 0, step = 0.1) =>
  slideUp(base + i * step)

/* Cinematic image unveil — scale down from 1.18 */
export const imageReveal = (delay = 0) => ({
  initial: { opacity: 0, scale: 1.18 },
  whileInView: { opacity: 1, scale: 1 },
  viewport: VP,
  transition: { duration: 1.2, delay, ease: [0.16, 1, 0.3, 1] as const },
})

/* Container that staggers its motion children */
export const staggerParent = (step = 0.12, delayChildren = 0.1) => ({
  initial: 'hidden',
  whileInView: 'show',
  viewport: VP,
  variants: {
    hidden: {},
    show: { transition: { staggerChildren: step, delayChildren } },
  },
})

/* Child variant for use inside staggerParent */
export const staggerChild = {
  hidden: { opacity: 0, y: 28 },
  show: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] as const } },
}
