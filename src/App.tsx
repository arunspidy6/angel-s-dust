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
      <AdminLink />
    </div>
  )
}

function AdminLink() {
  return (
    <a
      href="/admin"
      style={{
        position: 'fixed',
        bottom: '2rem',
        right: '2rem',
        width: '50px',
        height: '50px',
        borderRadius: '50%',
        background: '#D4AF37',
        color: 'white',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        textDecoration: 'none',
        fontSize: '1.5rem',
        boxShadow: '0 2px 8px rgba(0,0,0,0.15)',
        transition: 'all 0.3s ease',
      }}
      title="Admin Panel"
      onMouseEnter={e => {
        (e.currentTarget as HTMLElement).style.background = '#2D2422'
      }}
      onMouseLeave={e => {
        (e.currentTarget as HTMLElement).style.background = '#D4AF37'
      }}
    >
      ⚙️
    </a>
  )
}
