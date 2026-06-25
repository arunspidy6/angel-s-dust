import { useState, useEffect } from 'react'

interface PageContent {
  hero_title: string
  hero_subtitle: string
  hero_cta_text: string
  story_title: string
  story_description: string
  patisserie_title: string
  patisserie_subtitle: string
  visit_title: string
  visit_subtitle: string
  preorder_title: string
  preorder_description: string
}

export default function ContentManager() {
  const [content, setContent] = useState<PageContent>({
    hero_title: 'Angel\'s Dust',
    hero_subtitle: 'The finest pâtisserie in Limerick',
    hero_cta_text: 'Reserve Now',
    story_title: 'Our Story',
    story_description: 'Handcrafted pastries made fresh daily...',
    patisserie_title: 'Today\'s menu',
    patisserie_subtitle: 'Five plates, written for the season...',
    visit_title: 'Come for the pastries',
    visit_subtitle: 'Stay for the morning',
    preorder_title: 'Skip the queue',
    preorder_description: 'Reserve your favourites',
  })
  const [activeSection, setActiveSection] = useState<keyof PageContent>('hero_title')
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState(false)

  useEffect(() => {
    fetchContent()
  }, [])

  const fetchContent = async () => {
    try {
      const res = await fetch('http://localhost:3001/api/content')
      if (res.ok) {
        const data = await res.json()
        setContent({ ...content, ...data })
      }
      setError(null)
    } catch (err) {
      console.error('Failed to fetch content:', err)
    } finally {
      setLoading(false)
    }
  }

  const saveContent = async () => {
    try {
      await fetch('http://localhost:3001/api/content', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(content),
      })
      setSuccess(true)
      setTimeout(() => setSuccess(false), 2000)
      setError(null)
    } catch (err) {
      setError('Failed to save content')
      console.error('Failed to save content:', err)
    }
  }

  const sections = [
    {
      title: '🎯 Hero Section',
      fields: ['hero_title', 'hero_subtitle', 'hero_cta_text'],
      description: 'Main headline and call-to-action',
    },
    {
      title: '📖 Story Section',
      fields: ['story_title', 'story_description'],
      description: 'About your patisserie',
    },
    {
      title: '📦 Menu Section',
      fields: ['patisserie_title', 'patisserie_subtitle'],
      description: 'Today\'s menu introduction',
    },
    {
      title: '🚪 Visit Section',
      fields: ['visit_title', 'visit_subtitle'],
      description: 'Location and contact info headline',
    },
    {
      title: '🔔 Pre-Order Section',
      fields: ['preorder_title', 'preorder_description'],
      description: 'Reservation section intro',
    },
  ]

  const fieldLabels: Record<string, string> = {
    hero_title: 'Hero Title',
    hero_subtitle: 'Hero Subtitle',
    hero_cta_text: 'CTA Button Text',
    story_title: 'Section Title',
    story_description: 'Description',
    patisserie_title: 'Menu Title',
    patisserie_subtitle: 'Menu Description',
    visit_title: 'Section Title',
    visit_subtitle: 'Tagline',
    preorder_title: 'Section Title',
    preorder_description: 'Description',
  }

  if (loading) {
    return <div style={{ padding: '3rem', textAlign: 'center', color: '#999' }}>⏳ Loading content...</div>
  }

  return (
    <div>
      <div style={{ marginBottom: '2rem' }}>
        <h2 style={{ margin: 0, fontSize: '1.75rem', color: '#2D2422' }}>Page Content</h2>
        <p style={{ margin: '0.5rem 0 0 0', fontSize: '0.875rem', color: '#999' }}>
          Edit text throughout your website without touching code
        </p>
      </div>

      {error && (
        <div style={{
          padding: '1rem',
          background: '#FEE8E8',
          color: '#C33',
          borderRadius: '6px',
          marginBottom: '1.5rem',
        }}>
          ❌ {error}
        </div>
      )}
      {success && (
        <div style={{
          padding: '1rem',
          background: '#E8F5E9',
          color: '#2E7D32',
          borderRadius: '6px',
          marginBottom: '1.5rem',
        }}>
          ✓ Content saved successfully
        </div>
      )}

      <div style={{ display: 'grid', gridTemplateColumns: '250px 1fr', gap: '2rem' }}>
        {/* Sections List */}
        <div style={{
          display: 'flex',
          flexDirection: 'column',
          gap: '0.5rem',
        }}>
          {sections.map(section => {
            const isActive = section.fields.some(f => f === activeSection)
            return (
              <button
                key={section.title}
                onClick={() => setActiveSection(section.fields[0] as keyof PageContent)}
                style={{
                  padding: '1rem',
                  background: isActive ? '#D4AF37' : 'white',
                  color: isActive ? 'white' : '#2D2422',
                  border: '1px solid #E8DDD5',
                  borderRadius: '6px',
                  textAlign: 'left',
                  cursor: 'pointer',
                  transition: 'all 0.2s ease',
                  boxShadow: isActive ? '0 2px 8px rgba(212,175,55,0.2)' : 'none',
                }}
                onMouseEnter={(e) => {
                  if (!isActive) (e.currentTarget as HTMLElement).style.background = '#F9F7F5'
                }}
                onMouseLeave={(e) => {
                  if (!isActive) (e.currentTarget as HTMLElement).style.background = 'white'
                }}
              >
                <div style={{ fontWeight: 600, fontSize: '0.9375rem' }}>{section.title}</div>
                <div style={{ fontSize: '0.75rem', opacity: 0.7, marginTop: '0.25rem' }}>
                  {section.description}
                </div>
              </button>
            )
          })}
        </div>

        {/* Content Editor */}
        <div style={{
          background: 'white',
          padding: '2rem',
          borderRadius: '8px',
          border: '1px solid #E8DDD5',
        }}>
          {sections.map(section => {
            const isActive = section.fields.some(f => f === activeSection)
            if (!isActive) return null

            return (
              <div key={section.title}>
                <h3 style={{ margin: '0 0 1.5rem 0', fontSize: '1.25rem', color: '#2D2422' }}>
                  {section.title}
                </h3>
                <p style={{ margin: '0 0 1.5rem 0', fontSize: '0.9375rem', color: '#666' }}>
                  {section.description}
                </p>

                <div style={{ display: 'grid', gap: '1.5rem' }}>
                  {section.fields.map(field => {
                    const isLongText = field.includes('description')
                    const value = content[field as keyof PageContent] || ''

                    return (
                      <div key={field}>
                        <label style={{
                          display: 'block',
                          marginBottom: '0.5rem',
                          fontWeight: 600,
                          fontSize: '0.875rem',
                          color: '#2D2422',
                          textTransform: 'uppercase',
                          letterSpacing: '0.5px',
                        }}>
                          {fieldLabels[field]}
                        </label>

                        {isLongText ? (
                          <textarea
                            value={value}
                            onChange={e => setContent({ ...content, [field]: e.target.value })}
                            style={{
                              width: '100%',
                              padding: '0.75rem',
                              border: '1px solid #DDD',
                              borderRadius: '6px',
                              fontSize: '1rem',
                              fontFamily: 'inherit',
                              minHeight: '120px',
                              boxSizing: 'border-box',
                              transition: 'all 0.2s ease',
                            }}
                            onFocus={(e) => (e.currentTarget.style.borderColor = '#D4AF37')}
                            onBlur={(e) => (e.currentTarget.style.borderColor = '#DDD')}
                          />
                        ) : (
                          <input
                            type="text"
                            value={value}
                            onChange={e => setContent({ ...content, [field]: e.target.value })}
                            style={{
                              width: '100%',
                              padding: '0.75rem',
                              border: '1px solid #DDD',
                              borderRadius: '6px',
                              fontSize: '1rem',
                              boxSizing: 'border-box',
                              transition: 'all 0.2s ease',
                            }}
                            onFocus={(e) => (e.currentTarget.style.borderColor = '#D4AF37')}
                            onBlur={(e) => (e.currentTarget.style.borderColor = '#DDD')}
                          />
                        )}
                      </div>
                    )
                  })}
                </div>

                <div style={{ marginTop: '2rem' }}>
                  <button
                    onClick={saveContent}
                    style={{
                      padding: '0.75rem 1.5rem',
                      background: '#D4AF37',
                      color: 'white',
                      border: 'none',
                      cursor: 'pointer',
                      borderRadius: '6px',
                      fontWeight: 600,
                      fontSize: '0.9375rem',
                      transition: 'all 0.2s ease',
                    }}
                    onMouseEnter={(e) => (e.currentTarget.style.opacity = '0.9')}
                    onMouseLeave={(e) => (e.currentTarget.style.opacity = '1')}
                  >
                    Save Changes
                  </button>
                </div>
              </div>
            )
          })}
        </div>
      </div>

      <div style={{
        marginTop: '3rem',
        padding: '1.5rem',
        background: '#F9F7F5',
        borderRadius: '8px',
        border: '1px solid #E8DDD5',
      }}>
        <h4 style={{ margin: '0 0 0.5rem 0', fontSize: '1rem', color: '#2D2422', fontWeight: 600 }}>
          💡 How It Works
        </h4>
        <p style={{ margin: '0.5rem 0', fontSize: '0.9375rem', color: '#666', lineHeight: 1.6 }}>
          Edit any text on your website right here. No coding required. Changes are saved to the database and appear on your live site immediately.
        </p>
        <p style={{ margin: '0.5rem 0 0 0', fontSize: '0.9375rem', color: '#999' }}>
          For changing product images and details, use the <strong>Products</strong> tab. For managing orders and customer inquiries, use <strong>Orders</strong> and <strong>Messages</strong>.
        </p>
      </div>
    </div>
  )
}
