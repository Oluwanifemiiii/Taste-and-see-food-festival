import { useState } from 'react'
import { CITIES } from '../data/events'
import EventCard from '../components/EventCard'
import { useFestivalEvents } from '../hooks/useFestivalEvents'

const P = 'clamp(16px, 4vw, 48px)'

export default function Events({ onNav }) {
  const [filter, setFilter] = useState('all')
  const [city, setCity] = useState('all')
  const [search, setSearch] = useState('')
  const { events: allEvents } = useFestivalEvents()

  const filtered = allEvents.filter(e => {
    if (filter === 'ethnic' && e.type !== 'A') return false
    if (filter === 'oldnew' && e.type !== 'B') return false
    if (city !== 'all' && e.city !== city) return false
    if (search && !e.title.toLowerCase().includes(search.toLowerCase())) return false
    return true
  })

  const nbStyle = (active) => ({
    padding: '8px 20px', borderRadius: 2, fontSize: 12, fontWeight: 600,
    letterSpacing: '.10em', textTransform: 'uppercase', cursor: 'pointer',
    border: `1px solid ${active ? '#C8891F' : '#3D5030'}`,
    background: active ? '#C8891F' : 'transparent',
    color: active ? '#0F1208' : '#EFE8D5',
    fontFamily: "'Plus Jakarta Sans',sans-serif",
    transition: 'all .2s',
  })

  return (
    <main style={{ minHeight: '100vh', background: '#0F1208', paddingTop: 72 }}>
      <div style={{ maxWidth: 1440, margin: '0 auto', padding: `clamp(40px, 6vh, 60px) ${P}` }}>
        <div style={{ marginBottom: 36 }}>
          <h1 style={{ fontSize: 'clamp(32px, 6vw, 48px)', fontFamily: "'Yeseva One',serif", color: '#EFE8D5', marginBottom: 32 }}>All Events</h1>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12, flexWrap: 'wrap' }}>
            <button onClick={() => setFilter('all')} style={nbStyle(filter === 'all')}>All</button>
            <button onClick={() => setFilter('ethnic')} style={nbStyle(filter === 'ethnic')}>Ethnic Showcase</button>
            <button onClick={() => setFilter('oldnew')} style={nbStyle(filter === 'oldnew')}>Old vs New</button>
            <select value={city} onChange={e => setCity(e.target.value)}
              style={{ background: '#1E2418', border: '.5px solid #3D5030', borderRadius: 2, padding: '10px 14px', color: '#EFE8D5', fontSize: 13 }}>
              <option value="all">All Cities</option>
              {CITIES.map(item => <option key={item} value={item}>{item}</option>)}
            </select>
            <div style={{ marginLeft: 'auto', background: '#1E2418', border: '.5px solid #3D5030', borderRadius: 2, padding: '10px 16px', display: 'flex', alignItems: 'center', gap: 10 }}>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#A89B80" strokeWidth="1.5"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>
              <input type="text" placeholder="Search events..." value={search} onChange={e => setSearch(e.target.value)}
                style={{ background: 'none', border: 'none', outline: 'none', color: '#EFE8D5', fontSize: 13, width: 'clamp(120px, 20vw, 180px)' }} />
            </div>
          </div>
        </div>
        <div className="adire" style={{ width: '100%', borderRadius: 0, marginBottom: 36 }} />

        {filtered.length > 0 ? (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2,1fr)', gap: 24 }} className="col1">
            {filtered.map(evt => (
              <EventCard key={evt.id} evt={evt} onNavigate={onNav} layout="full" />
            ))}
          </div>
        ) : (
          <div style={{ textAlign: 'center', padding: '80px 0', color: '#A89B80' }}>
            <p style={{ fontSize: 20, fontFamily: "'Yeseva One',serif", color: '#EFE8D5', marginBottom: 8 }}>No events found</p>
            <p style={{ fontSize: 14 }}>Try a different search or filter</p>
          </div>
        )}

        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: 48, paddingTop: 24, borderTop: '.5px solid #2A3020', flexWrap: 'wrap', gap: 16 }}>
          <span style={{ fontSize: 13, color: '#A89B80' }}>Showing {filtered.length} of {allEvents.length} events</span>
          <div style={{ display: 'flex', gap: 8 }}>
            <button style={{ width: 36, height: 36, background: '#1E2418', border: '.5px solid #2A3020', borderRadius: 2, color: '#A89B80', cursor: 'pointer', fontSize: 14 }}>←</button>
            <button style={{ width: 36, height: 36, background: '#C8891F', border: 'none', borderRadius: 2, color: '#0F1208', cursor: 'pointer', fontSize: 13, fontWeight: 600 }}>1</button>
            <button style={{ width: 36, height: 36, background: '#1E2418', border: '.5px solid #2A3020', borderRadius: 2, color: '#A89B80', cursor: 'pointer', fontSize: 14 }}>→</button>
          </div>
        </div>
      </div>
    </main>
  )
}
