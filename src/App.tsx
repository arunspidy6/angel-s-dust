import Hero from './components/Hero'
import Marquee from './components/Marquee'
import About from './components/About'
import Products from './components/Products'
import Menu from './components/Menu'
import Hours from './components/Hours'
import Reviews from './components/Reviews'
import FindUs from './components/FindUs'
import Footer from './components/Footer'

export default function App() {
  return (
    <div className="overflow-x-hidden">
      <Hero />
      <Marquee />
      <About />
      <Products />
      <Menu />
      <Hours />
      <Reviews />
      <FindUs />
      <Footer />
    </div>
  )
}
