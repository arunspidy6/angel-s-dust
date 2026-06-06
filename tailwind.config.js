/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        display: ['Instrument Serif', 'Georgia', 'serif'],
        serif: ['Cormorant', 'Georgia', 'serif'],
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
      colors: {
        white: '#FFFFFF',
        ivory: '#FAF8F5',
        blush: '#F5E6E0',
        gold: '#D4AF6A',
        'gold-light': '#E8D48B',
        'gold-pale': '#F5EDD8',
        pink: '#E8C8D0',
        'pink-dark': '#D4A8B8',
        navy: '#1F2E54',
        'navy-light': '#2D3E6E',
      },
      maxWidth: {
        'site': '88rem',
      },
      letterSpacing: {
        'tight-display': '-0.03em',
      },
      lineHeight: {
        'tight-display': '0.95',
        'relaxed': '1.75',
      },
    },
  },
  plugins: [],
}
