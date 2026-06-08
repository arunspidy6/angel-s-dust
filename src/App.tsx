import Hero from './components/Hero'
import Story from './components/Story'
import Patisserie from './components/Patisserie'
import Reviews from './components/Reviews'
import Preorder from './components/Preorder'
import Visit from './components/Visit'
import Footer from './components/Footer'

export default function App() {
  return (
    <div className="overflow-x-hidden" style={{ background: '#FAF8F5', color: '#2D2422' }}>
      <Hero />
      <Story />
      <Patisserie />
      <Reviews />
      <Preorder />
      <Visit />
      <Footer />
    </div>
  )
}
