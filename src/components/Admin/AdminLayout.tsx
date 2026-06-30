import { useState } from 'react'
import ProductsManager from './ProductsManager'
import OrdersManager from './OrdersManager'
import MessagesManager from './MessagesManager'
import ReviewsManager from './ReviewsManager'
import ContentManager from './ContentManager'
import { API_BASE } from '../../lib/apiUrl'

type Tab = 'content' | 'products' | 'orders' | 'messages' | 'reviews'

export default function AdminLayout() {
  const [isAuthenticated, setIsAuthenticated] = useState(() => !!localStorage.getItem('admin_token'))
  const [password, setPassword] = useState('')
  const [loginError, setLoginError] = useState('')
  const [loggingIn, setLoggingIn] = useState(false)
  const [activeTab, setActiveTab] = useState<Tab>('content')

  const login = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoggingIn(true)
    setLoginError('')
    try {
      const res = await fetch(API_BASE + '/api/auth', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ password }),
      })
      if (res.ok) {
        localStorage.setItem('admin_token', password)
        setIsAuthenticated(true)
        setPassword('')
      } else {
        const data = await res.json().catch(() => ({}))
        setLoginError(data.error || 'Incorrect password')
      }
    } catch {
      setLoginError('Could not reach the server. Check your connection.')
    } finally {
      setLoggingIn(false)
    }
  }

  const logout = () => {
    localStorage.removeItem('admin_token')
    setIsAuthenticated(false)
  }

  if (!isAuthenticated) {
    return (
      <div style={{
        minHeight: '100vh',
        background: '#FAF8F5',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '2rem',
      }}>
        <div style={{
          width: '100%',
          maxWidth: '400px',
          background: 'white',
          borderRadius: '12px',
          padding: '2.5rem',
          boxShadow: '0 4px 24px rgba(45,36,34,0.12)',
          border: '1px solid #E8DDD5',
        }}>
          <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
            <div style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>🥐</div>
            <h1 style={{ margin: 0, fontSize: '1.5rem', fontWeight: 700, color: '#2D2422', letterSpacing: '-0.5px' }}>
              Angel's Dust
            </h1>
            <p style={{ margin: '0.25rem 0 0 0', fontSize: '0.875rem', color: '#D4AF37', fontStyle: 'italic' }}>
              CMS Admin
            </p>
          </div>

          <form onSubmit={login} style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
            <div>
              <label style={{
                display: 'block',
                marginBottom: '0.5rem',
                fontSize: '0.8125rem',
                fontWeight: 600,
                color: '#2D2422',
                textTransform: 'uppercase',
                letterSpacing: '0.5px',
              }}>
                Admin Password
              </label>
              <input
                type="password"
                value={password}
                onChange={e => setPassword(e.target.value)}
                placeholder="Enter your password"
                autoFocus
                required
                style={{
                  width: '100%',
                  padding: '0.75rem',
                  border: `1px solid ${loginError ? '#C33' : '#DDD'}`,
                  borderRadius: '6px',
                  fontSize: '1rem',
                  boxSizing: 'border-box',
                  outline: 'none',
                  transition: 'border-color 0.2s ease',
                }}
                onFocus={e => (e.currentTarget.style.borderColor = '#D4AF37')}
                onBlur={e => (e.currentTarget.style.borderColor = loginError ? '#C33' : '#DDD')}
              />
              {loginError && (
                <p style={{ margin: '0.5rem 0 0 0', fontSize: '0.8125rem', color: '#C33' }}>
                  {loginError}
                </p>
              )}
            </div>

            <button
              type="submit"
              disabled={loggingIn || !password}
              style={{
                width: '100%',
                padding: '0.875rem',
                background: loggingIn || !password ? '#E0C97A' : '#D4AF37',
                color: 'white',
                border: 'none',
                borderRadius: '6px',
                fontSize: '0.9375rem',
                fontWeight: 600,
                cursor: loggingIn || !password ? 'not-allowed' : 'pointer',
                transition: 'all 0.2s ease',
              }}
            >
              {loggingIn ? 'Signing in…' : 'Sign in'}
            </button>
          </form>
        </div>
      </div>
    )
  }

  const tabs = [
    { id: 'content', label: 'Content', icon: '📝' },
    { id: 'products', label: 'Products', icon: '📦' },
    { id: 'orders', label: 'Orders', icon: '🛍️' },
    { id: 'messages', label: 'Messages', icon: '💬' },
    { id: 'reviews', label: 'Reviews', icon: '⭐' },
  ] as const

  return (
    <div style={{ minHeight: '100vh', background: '#F9F7F5' }}>
      {/* Header */}
      <header style={{
        background: 'linear-gradient(135deg, #2D2422 0%, #3D3432 100%)',
        color: '#FAF8F5',
        padding: '1.5rem 2rem',
        boxShadow: '0 2px 8px rgba(45,36,34,0.12)',
        borderBottom: '1px solid rgba(212,175,55,0.2)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
      }}>
        <div>
          <h1 style={{ margin: 0, fontSize: '1.75rem', fontWeight: 600, letterSpacing: '-0.5px', color: '#FFFFFF' }}>
            Angel's Dust CMS
          </h1>
          <p style={{ margin: '0.25rem 0 0 0', fontSize: '0.8125rem', color: '#D4AF37' }}>
            Manage your pastry shop content, orders, and customer interactions
          </p>
        </div>
        <button
          onClick={logout}
          style={{
            padding: '0.5rem 1.25rem',
            background: 'rgba(255,255,255,0.08)',
            color: 'rgba(255,255,255,0.7)',
            border: '1px solid rgba(255,255,255,0.15)',
            borderRadius: '6px',
            cursor: 'pointer',
            fontSize: '0.875rem',
            transition: 'all 0.2s ease',
          }}
          onMouseEnter={e => {
            (e.currentTarget as HTMLElement).style.background = 'rgba(255,255,255,0.15)'
            ;(e.currentTarget as HTMLElement).style.color = 'white'
          }}
          onMouseLeave={e => {
            (e.currentTarget as HTMLElement).style.background = 'rgba(255,255,255,0.08)'
            ;(e.currentTarget as HTMLElement).style.color = 'rgba(255,255,255,0.7)'
          }}
        >
          Sign out
        </button>
      </header>

      {/* Navigation Tabs */}
      <nav style={{
        background: '#FFFFFF',
        borderBottom: '1px solid #E8DDD5',
        position: 'sticky',
        top: 0,
        zIndex: 40,
        boxShadow: '0 1px 3px rgba(45,36,34,0.08)',
      }}>
        <div style={{ maxWidth: '1400px', margin: '0 auto', display: 'flex', overflow: 'auto' }}>
          {tabs.map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as Tab)}
              style={{
                flex: '0 0 auto',
                minWidth: '140px',
                padding: '1rem',
                border: 'none',
                background: activeTab === tab.id ? '#FAF8F5' : 'transparent',
                color: activeTab === tab.id ? '#D4AF37' : '#6F6F6F',
                borderBottom: activeTab === tab.id ? '3px solid #D4AF37' : 'none',
                cursor: 'pointer',
                fontSize: '0.9375rem',
                fontWeight: activeTab === tab.id ? 600 : 500,
                transition: 'all 0.25s ease',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '0.5rem',
              }}
              onMouseEnter={e => {
                if (activeTab !== tab.id) (e.currentTarget as HTMLElement).style.color = '#D4AF37'
              }}
              onMouseLeave={e => {
                if (activeTab !== tab.id) (e.currentTarget as HTMLElement).style.color = '#6F6F6F'
              }}
            >
              <span>{tab.icon}</span>
              <span>{tab.label}</span>
            </button>
          ))}
        </div>
      </nav>

      {/* Content */}
      <main style={{ maxWidth: '1400px', margin: '0 auto', padding: '2rem 1.5rem' }}>
        {activeTab === 'content' && <ContentManager />}
        {activeTab === 'products' && <ProductsManager />}
        {activeTab === 'orders' && <OrdersManager />}
        {activeTab === 'messages' && <MessagesManager />}
        {activeTab === 'reviews' && <ReviewsManager />}
      </main>

      <footer style={{
        marginTop: '4rem',
        padding: '2rem',
        textAlign: 'center',
        borderTop: '1px solid #E8DDD5',
        color: '#999',
        fontSize: '0.875rem',
      }}>
        <p style={{ margin: 0 }}>
          Angel's Dust CMS •
          <a href="https://angel-s-dust.vercel.app" style={{ color: '#D4AF37', textDecoration: 'none', marginLeft: '0.5rem' }}>
            View Site
          </a>
        </p>
      </footer>
    </div>
  )
}
