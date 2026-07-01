import { API_BASE, adminHeaders } from '../../lib/apiUrl'
import { useState, useEffect } from 'react'

interface PageContent {
  // Hero
  hero_eyebrow: string
  hero_title_part1: string
  hero_title_italic: string
  hero_title_part2: string
  hero_description: string
  hero_cta1_text: string
  hero_cta1_link: string
  hero_cta2_text: string
  hero_cta2_link: string
  hero_rating: string
  hero_rating_count: string

  // Story
  story_tag: string
  story_title_part1: string
  story_title_italic: string
  story_title_part2: string
  story_description: string
  story_image_url: string

  // Patisserie/Menu
  menu_tag: string
  menu_title_part1: string
  menu_title_italic: string
  menu_description: string
  menu_plate_count: string

  // Reviews
  reviews_tag: string
  reviews_title_part1: string
  reviews_title_italic: string
  reviews_rating: string
  reviews_count: string

  // Visit
  visit_title_part1: string
  visit_title_italic: string
  visit_address: string
  visit_phone: string

  // Preorder
  preorder_tag: string
  preorder_title_part1: string
  preorder_title_italic: string
  preorder_description: string
}

export default function ContentManager() {
  const [content, setContent] = useState<PageContent>({
    // Hero
    hero_eyebrow: 'Pâtisserie · Thomas Street · Limerick',
    hero_title_part1: 'Beyond crumbs, we craft',
    hero_title_italic: 'the timeless.',
    hero_title_part2: '',
    hero_description: 'Handcrafted French pastries — made fresh each morning on Thomas Street. Open Thursday–Sunday, 11:30 am. Arrive early. We sell out.',
    hero_cta1_text: 'Explore Pastries',
    hero_cta1_link: '#patisserie',
    hero_cta2_text: 'Plan Your Visit',
    hero_cta2_link: '#visit',
    hero_rating: '4.9',
    hero_rating_count: '121 Google reviews',

    // Story
    story_tag: '[ N°01 ] Our Story',
    story_title_part1: 'Quiet patience,',
    story_title_italic: 'extraordinary',
    story_title_part2: 'pastry.',
    story_description: 'Tucked away on Thomas Street, Angel Dust began with one quiet obsession: bring the elegance and rigour of a Parisian pâtisserie to the cobbled streets of Limerick.\n\nEvery croissant laminated by hand. Every entremet built layer by layer the day before service.',
    story_image_url: 'https://images.pexels.com/photos/18330310/pexels-photo-18330310.jpeg',

    // Menu
    menu_tag: '[ N°02 ] The Pâtisserie',
    menu_title_part1: 'Each piece,',
    menu_title_italic: 'a small work of art.',
    menu_description: 'Five plates, written for the season. The counter shifts each week — what\'s here is what\'s true today.',
    menu_plate_count: '05 Plates',

    // Reviews
    reviews_tag: '[ N°04 ] Reviews',
    reviews_title_part1: 'Loved by',
    reviews_title_italic: 'Limerick.',
    reviews_rating: '4.8',
    reviews_count: '118 Google reviews',

    // Visit
    visit_title_part1: 'Come for the pastries.',
    visit_title_italic: 'Stay',
    visit_address: '12 Thomas Street, Limerick V94 KXF1, Ireland',
    visit_phone: '+353 61 410 021',

    // Preorder
    preorder_tag: 'Reserve · Pre-order',
    preorder_title_part1: 'Skip the queue.',
    preorder_title_italic: 'Reserve',
    preorder_description: 'Cakes and pastries sell out quickly. Fill this in by Tuesday and we\'ll have your order ready for collection from Thursday onward.',
  })

  const [activeSection, setActiveSection] = useState<string>('hero')
  const [success, setSuccess] = useState(false)

  const saveContent = async () => {
    try {
      await fetch(API_BASE + '/api/content', {
        method: 'POST',
        headers: adminHeaders(),
        body: JSON.stringify(content),
      })
      setSuccess(true)
      setTimeout(() => setSuccess(false), 2000)
    } catch (err) {
      console.error('Failed to save content:', err)
    }
  }

  const sections = [
    { id: 'hero', title: '🎯 Hero', icon: '✈️', description: 'Main hero section' },
    { id: 'story', title: '📖 Story', icon: '📖', description: 'Our Story section' },
    { id: 'menu', title: '📦 Menu', icon: '📦', description: 'Today\'s Menu section' },
    { id: 'reviews', title: '⭐ Reviews', icon: '⭐', description: 'Customer Reviews' },
    { id: 'visit', title: '🚪 Visit', icon: '🚪', description: 'Visit & Contact' },
    { id: 'preorder', title: '🔔 Pre-Order', icon: '🔔', description: 'Reservation Section' },
  ]

  const sectionFields: Record<string, { label: string; key: keyof PageContent; isLong?: boolean }[]> = {
    hero: [
      { label: 'Eyebrow Tag', key: 'hero_eyebrow' },
      { label: 'Main Title (Part 1)', key: 'hero_title_part1' },
      { label: 'Main Title (Italic)', key: 'hero_title_italic' },
      { label: 'Description', key: 'hero_description', isLong: true },
      { label: 'Button 1 Text', key: 'hero_cta1_text' },
      { label: 'Button 1 Link', key: 'hero_cta1_link' },
      { label: 'Button 2 Text', key: 'hero_cta2_text' },
      { label: 'Button 2 Link', key: 'hero_cta2_link' },
      { label: 'Rating (e.g., 4.9)', key: 'hero_rating' },
      { label: 'Rating Count', key: 'hero_rating_count' },
    ],
    story: [
      { label: 'Section Tag', key: 'story_tag' },
      { label: 'Title Part 1', key: 'story_title_part1' },
      { label: 'Title Italic (Important word)', key: 'story_title_italic' },
      { label: 'Title Part 2', key: 'story_title_part2' },
      { label: 'Description', key: 'story_description', isLong: true },
      { label: 'Image URL', key: 'story_image_url' },
    ],
    menu: [
      { label: 'Section Tag', key: 'menu_tag' },
      { label: 'Title Part 1', key: 'menu_title_part1' },
      { label: 'Title Italic', key: 'menu_title_italic' },
      { label: 'Description', key: 'menu_description', isLong: true },
      { label: 'Plate Count', key: 'menu_plate_count' },
    ],
    reviews: [
      { label: 'Section Tag', key: 'reviews_tag' },
      { label: 'Title Part 1', key: 'reviews_title_part1' },
      { label: 'Title Italic', key: 'reviews_title_italic' },
      { label: 'Rating (e.g., 4.8)', key: 'reviews_rating' },
      { label: 'Review Count', key: 'reviews_count' },
    ],
    visit: [
      { label: 'Title Part 1', key: 'visit_title_part1' },
      { label: 'Title Italic Word', key: 'visit_title_italic' },
      { label: 'Address', key: 'visit_address', isLong: true },
      { label: 'Phone Number', key: 'visit_phone' },
    ],
    preorder: [
      { label: 'Section Tag', key: 'preorder_tag' },
      { label: 'Title Part 1', key: 'preorder_title_part1' },
      { label: 'Title Italic Word', key: 'preorder_title_italic' },
      { label: 'Description', key: 'preorder_description', isLong: true },
    ],
  }

  return (
    <div>
      <div style={{ marginBottom: '2rem' }}>
        <h2 style={{ margin: 0, fontSize: '1.75rem', color: '#2D2422' }}>Page Content</h2>
        <p style={{ margin: '0.5rem 0 0 0', fontSize: '0.875rem', color: '#999' }}>
          Edit all website sections and text fields — matching the actual site structure
        </p>
      </div>

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

      <div style={{ display: 'grid', gridTemplateColumns: '220px 1fr', gap: '2rem' }}>
        {/* Sections List */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
          {sections.map(section => {
            const isActive = section.id === activeSection
            return (
              <button
                key={section.id}
                onClick={() => setActiveSection(section.id)}
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
            const isActive = section.id === activeSection
            if (!isActive) return null

            const fields = sectionFields[section.id] || []

            return (
              <div key={section.id}>
                <h3 style={{ margin: '0 0 1rem 0', fontSize: '1.25rem', color: '#2D2422' }}>
                  {section.title}
                </h3>
                <p style={{ margin: '0 0 1.5rem 0', fontSize: '0.9375rem', color: '#666' }}>
                  {section.description}
                </p>

                <div style={{ display: 'grid', gap: '1.5rem' }}>
                  {fields.map(field => (
                    <div key={field.key}>
                      <label style={{
                        display: 'block',
                        marginBottom: '0.5rem',
                        fontWeight: 600,
                        fontSize: '0.875rem',
                        color: '#2D2422',
                        textTransform: 'uppercase',
                        letterSpacing: '0.5px',
                      }}>
                        {field.label}
                      </label>

                      {field.isLong ? (
                        <textarea
                          value={content[field.key] || ''}
                          onChange={e => setContent({ ...content, [field.key]: e.target.value })}
                          style={{
                            width: '100%',
                            padding: '0.75rem',
                            border: '1px solid #DDD',
                            borderRadius: '6px',
                            fontSize: '1rem',
                            fontFamily: 'inherit',
                            minHeight: '100px',
                            boxSizing: 'border-box',
                            transition: 'all 0.2s ease',
                          }}
                          onFocus={(e) => (e.currentTarget.style.borderColor = '#D4AF37')}
                          onBlur={(e) => (e.currentTarget.style.borderColor = '#DDD')}
                        />
                      ) : (
                        <input
                          type="text"
                          value={content[field.key] || ''}
                          onChange={e => setContent({ ...content, [field.key]: e.target.value })}
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
                  ))}
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
                    }}
                  >
                    Save All Changes
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
          💡 How to Use
        </h4>
        <ul style={{ margin: '0.5rem 0', fontSize: '0.9375rem', color: '#666', lineHeight: 1.6, paddingLeft: '1.25rem' }}>
          <li>Each section is organized as it appears on your website</li>
          <li>Edit text directly from the fields below</li>
          <li>For multi-part titles (like "Quiet patience, <em>extraordinary</em> pastry"), edit each part separately</li>
          <li>Changes save to database and appear immediately on your live site</li>
          <li>Use bold italic tags for emphasis in descriptions if needed</li>
        </ul>
      </div>
    </div>
  )
}
