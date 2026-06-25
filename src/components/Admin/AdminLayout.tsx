import { useState } from 'react'
import ProductsManager from './ProductsManager'
import OrdersManager from './OrdersManager'
import MessagesManager from './MessagesManager'
import ReviewsManager from './ReviewsManager'
import ContentManager from './ContentManager'

type Tab = 'content' | 'products' | 'orders' | 'messages' | 'reviews'

export default function AdminLayout() {
  const [activeTab, setActiveTab] = useState<Tab>('content')

  const tabs = [
    { id: 'content', label: 'Content', icon: '📝', count: null },
    { id: 'products', label: 'Products', icon: '📦', count: null },
    { id: 'orders', label: 'Orders', icon: '🛍️', count: null },
    { id: 'messages', label: 'Messages', icon: '💬', count: null },
    { id: 'reviews', label: 'Reviews', icon: '⭐', count: null },
  ] as const

  return (
    <div style={{ minHeight: '100vh', background: '#F9F7F5' }}>
      {/* Header */}
      <header style={{
        background: 'linear-gradient(135deg, #2D2422 0%, #3D3432 100%)',
        color: '#FAF8F5',
        padding: '2rem',
        boxShadow: '0 2px 8px rgba(45,36,34,0.12)',
        borderBottom: '1px solid rgba(212,175,55,0.2)'
      }}>
        <div style={{ maxWidth: '1400px', margin: '0 auto' }}>
          <h1 style={{ margin: 0, fontSize: '2rem', fontWeight: 600, letterSpacing: '-0.5px' }}>
            Angel's Dust CMS
          </h1>
          <p style={{ margin: '0.5rem 0 0 0', fontSize: '0.875rem', color: 'rgba(212,175,55,0.8)', opacity: 0.9 }}>
            Manage your pastry shop content, orders, and customer interactions
          </p>
        </div>
      </header>

      {/* Navigation Tabs */}
      <nav style={{
        background: '#FFFFFF',
        borderBottom: '1px solid #E8DDD5',
        position: 'sticky',
        top: 0,
        zIndex: 40,
        boxShadow: '0 1px 3px rgba(45,36,34,0.08)'
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
              onMouseEnter={(e) => {
                if (activeTab !== tab.id) {
                  (e.currentTarget as HTMLElement).style.color = '#D4AF37'
                }
              }}
              onMouseLeave={(e) => {
                if (activeTab !== tab.id) {
                  (e.currentTarget as HTMLElement).style.color = '#6F6F6F'
                }
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

      {/* Footer */}
      <footer style={{
        marginTop: '4rem',
        padding: '2rem',
        textAlign: 'center',
        borderTop: '1px solid #E8DDD5',
        color: '#999',
        fontSize: '0.875rem'
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
