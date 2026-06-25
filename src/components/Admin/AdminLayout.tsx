import { useState } from 'react'
import ProductsManager from './ProductsManager'
import OrdersManager from './OrdersManager'
import MessagesManager from './MessagesManager'
import ReviewsManager from './ReviewsManager'

type Tab = 'products' | 'orders' | 'messages' | 'reviews'

export default function AdminLayout() {
  const [activeTab, setActiveTab] = useState<Tab>('products')

  const tabs = [
    { id: 'products', label: 'Products', icon: '📦' },
    { id: 'orders', label: 'Orders', icon: '🛍️' },
    { id: 'messages', label: 'Messages', icon: '💬' },
    { id: 'reviews', label: 'Reviews', icon: '⭐' },
  ] as const

  return (
    <div style={{ minHeight: '100vh', background: '#FAF8F5' }}>
      {/* Header */}
      <div style={{ background: '#2D2422', color: '#FAF8F5', padding: '1.5rem', textAlign: 'center' }}>
        <h1 style={{ margin: 0, fontSize: '1.875rem' }}>Angel's Dust CMS</h1>
      </div>

      {/* Navigation */}
      <div style={{ display: 'flex', borderBottom: '1px solid rgba(45,36,34,0.1)', background: '#FFFFFF' }}>
        {tabs.map(tab => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id as Tab)}
            style={{
              flex: 1,
              padding: '1rem',
              border: 'none',
              background: activeTab === tab.id ? '#D4AF37' : 'transparent',
              color: activeTab === tab.id ? 'white' : '#2D2422',
              cursor: 'pointer',
              fontSize: '1rem',
              fontWeight: activeTab === tab.id ? 600 : 400,
              transition: 'all 0.3s ease',
            }}
          >
            {tab.icon} {tab.label}
          </button>
        ))}
      </div>

      {/* Content */}
      <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '2rem' }}>
        {activeTab === 'products' && <ProductsManager />}
        {activeTab === 'orders' && <OrdersManager />}
        {activeTab === 'messages' && <MessagesManager />}
        {activeTab === 'reviews' && <ReviewsManager />}
      </div>
    </div>
  )
}
