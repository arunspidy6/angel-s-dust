import { useEffect, useState } from 'react'
import Hero from './components/Hero'
import Story from './components/Story'
import Patisserie from './components/Patisserie'
import Reviews from './components/Reviews'
import Preorder from './components/Preorder'
import Visit from './components/Visit'
import Footer from './components/Footer'
import AdminLayout from './components/Admin/AdminLayout'

export default function App() {
  const [isAdmin, setIsAdmin] = useState(false)

  useEffect(() => {
    const path = window.location.pathname
    setIsAdmin(path === '/admin' || path.startsWith('/admin/'))
  }, [])

  if (isAdmin) {
    return <AdminLayout />
  }

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
