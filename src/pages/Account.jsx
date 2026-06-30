import { useState } from 'react'
import { EVENTS, getTicketLabel, fmt } from '../data/events'
import { currentUser, signOut, isSupabaseConfigured } from '../services/supabase'

const inputStyle = {
  width: '100%',
  background: '#252C1A',
  border: '.5px solid #3D5030',
  borderRadius: 4,
  padding: '14px 16px',
  color: '#EFE8D5',
  fontSize: 14,
  outline: 'none',
  boxSizing: 'border-box',
}

const labelStyle = {
  display: 'block',
  fontSize: 10,
  fontWeight: 700,
  letterSpacing: '.15em',
  textTransform: 'uppercase',
  color: '#A89B80',
  marginBottom: 8,
}

export default function Account({ onNav, order }) {
  const [user, setUser] = useState(currentUser)
  const [editing, setEditing] = useState(false)
  const [form, setForm] = useState({ name: user?.name || '', email: user?.email || '', phone: user?.phone || '' })
  const [saved, setSaved] = useState(false)

  const savedOrders = JSON.parse(localStorage.getItem('tsf:orders') || '[]')
  const orders = order ? [order, ...savedOrders.filter(item => item.reference !== order.reference)] : savedOrders

  const handleLogout = () => {
    signOut()
    setUser(null)
    setEditing(false)
  }

  const handleSave = (e) => {
    e.preventDefault()
    const updated = { ...user, ...form }
    localStorage.setItem('tsf:user', JSON.stringify(updated))
    setUser(updated)
    setEditing(false)
    setSaved(true)
    setTimeout(() => setSaved(false), 2500)
  }

  return (
    <main style={{ minHeight: '100vh', background: '#0F1208', padding: 'clamp(100px,14vw,120px) clamp(16px,4vw,48px) 80px' }}>
      <div style={{ maxWidth: 1100, margin: '0 auto' }}>

        {/* ── Profile Card ─────────────────────────────────────────── */}
        <div style={{ background: '#1E2418', border: '.5px solid #2A3020', borderRadius: 8, padding: 'clamp(20px,4vw,36px)', marginBottom: 48 }}>

          {/* Header row */}
          <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: 16, flexWrap: 'wrap', marginBottom: 28 }}>
            <div>
              <p style={{ fontSize: 10, fontWeight: 700, letterSpacing: '.18em', textTransform: 'uppercase', color: '#C8891F', marginBottom: 8 }}>Profile Settings</p>
              <h1 style={{ fontSize: 'clamp(28px,5vw,38px)', fontFamily: "'Yeseva One',serif", color: '#EFE8D5', margin: 0 }}>
                {user ? user.name || 'Your Account' : 'Not Signed In'}
              </h1>
            </div>

            {/* Status badge */}
            <div style={{ display: 'flex', alignItems: 'center', gap: 8, background: user ? '#1A2E1A' : '#2A1A1A', border: `.5px solid ${user ? '#3D5030' : '#5C2A2A'}`, borderRadius: 20, padding: '8px 16px', marginTop: 4 }}>
              <span style={{ width: 8, height: 8, borderRadius: '50%', background: user ? '#6DB86D' : '#D66B55', display: 'inline-block' }} />
              <span style={{ fontSize: 11, fontWeight: 700, letterSpacing: '.12em', textTransform: 'uppercase', color: user ? '#6DB86D' : '#D66B55' }}>
                {user ? 'Logged In' : 'Not Logged In'}
              </span>
            </div>
          </div>

          {user ? (
            editing ? (
              <form onSubmit={handleSave} style={{ display: 'grid', gap: 16 }}>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: 16 }}>
                  <div>
                    <label style={labelStyle}>Full Name</label>
                    <input style={inputStyle} value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} />
                  </div>
                  <div>
                    <label style={labelStyle}>Email Address</label>
                    <input style={inputStyle} type="email" value={form.email} onChange={e => setForm({ ...form, email: e.target.value })} />
                  </div>
                  <div>
                    <label style={labelStyle}>Phone Number</label>
                    <input style={inputStyle} value={form.phone} onChange={e => setForm({ ...form, phone: e.target.value })} />
                  </div>
                </div>
                {!isSupabaseConfigured && (
                  <p style={{ fontSize: 12, color: '#A89B80', margin: 0 }}>Changes are saved locally. Connect Supabase to persist across devices.</p>
                )}
                <div style={{ display: 'flex', gap: 12 }}>
                  <button type="submit" style={{ background: '#C8891F', color: '#0F1208', border: 'none', borderRadius: 2, padding: '12px 24px', fontSize: 12, fontWeight: 700, letterSpacing: '.10em', textTransform: 'uppercase', cursor: 'pointer' }}>
                    Save Changes
                  </button>
                  <button type="button" onClick={() => { setEditing(false); setForm({ name: user.name, email: user.email, phone: user.phone || '' }) }}
                    style={{ background: 'transparent', color: '#A89B80', border: '.5px solid #3D5030', borderRadius: 2, padding: '12px 24px', fontSize: 12, fontWeight: 700, letterSpacing: '.10em', textTransform: 'uppercase', cursor: 'pointer' }}>
                    Cancel
                  </button>
                </div>
              </form>
            ) : (
              <>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: 20, marginBottom: 24 }}>
                  {[['Email', user.email], ['Phone', user.phone || '—'], ['Role', user.role === 'admin' ? 'Admin' : 'Guest']].map(([label, value]) => (
                    <div key={label}>
                      <p style={{ ...labelStyle, marginBottom: 4 }}>{label}</p>
                      <p style={{ color: '#EFE8D5', fontSize: 15, margin: 0 }}>{value}</p>
                    </div>
                  ))}
                </div>
                {saved && <p style={{ color: '#6DB86D', fontSize: 13, marginBottom: 16 }}>Profile updated.</p>}
                <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
                  <button onClick={() => setEditing(true)} style={{ background: '#C8891F', color: '#0F1208', border: 'none', borderRadius: 2, padding: '12px 24px', fontSize: 12, fontWeight: 700, letterSpacing: '.10em', textTransform: 'uppercase', cursor: 'pointer' }}>
                    Edit Profile
                  </button>
                  <button onClick={handleLogout} style={{ background: 'transparent', color: '#D66B55', border: '.5px solid #5C2A2A', borderRadius: 2, padding: '12px 24px', fontSize: 12, fontWeight: 700, letterSpacing: '.10em', textTransform: 'uppercase', cursor: 'pointer' }}>
                    Log Out
                  </button>
                </div>
              </>
            )
          ) : (
            <div>
              <p style={{ color: '#A89B80', fontSize: 15, lineHeight: 1.8, marginBottom: 24 }}>Sign in to manage your profile, view your tickets, and access your account across devices.</p>
              <button onClick={() => onNav('auth')} style={{ background: '#C8891F', color: '#0F1208', border: 'none', borderRadius: 2, padding: '14px 28px', fontSize: 12, fontWeight: 700, letterSpacing: '.10em', textTransform: 'uppercase', cursor: 'pointer' }}>
                Sign In / Create Account
              </button>
            </div>
          )}
        </div>

        {/* ── Tickets Section ───────────────────────────────────────── */}
        <p style={{ fontSize: 10, fontWeight: 700, letterSpacing: '.18em', textTransform: 'uppercase', color: '#C8891F', marginBottom: 14 }}>Bookings</p>
        <h2 style={{ fontSize: 'clamp(24px,4vw,32px)', fontFamily: "'Yeseva One',serif", color: '#EFE8D5', marginBottom: 28 }}>My Tickets</h2>

        <div style={{ display: 'grid', gap: 18 }}>
          {orders.map(item => {
            const event = EVENTS.find(evt => evt.id === Number(item.event_id)) || EVENTS[0]
            return (
              <div key={item.reference} style={{ background: '#1E2418', border: '.5px solid #2A3020', borderRadius: 8, padding: 24, display: 'flex', justifyContent: 'space-between', gap: 20, flexWrap: 'wrap' }}>
                <div>
                  <p style={{ fontSize: 10, letterSpacing: '.14em', textTransform: 'uppercase', color: '#C8891F', marginBottom: 8 }}>{item.reference}</p>
                  <h3 style={{ fontSize: 24, fontFamily: "'Yeseva One',serif", color: '#EFE8D5', marginBottom: 8 }}>{event.title}</h3>
                  <p style={{ fontSize: 13, color: '#A89B80' }}>{event.date} • {event.city} • {getTicketLabel(item.ticket_type)}</p>
                </div>
                <div style={{ textAlign: 'right' }}>
                  <p style={{ fontSize: 24, fontFamily: "'Yeseva One',serif", color: '#C8891F', marginBottom: 12 }}>{fmt(item.total || 0)}</p>
                  <button onClick={() => onNav('ticket', event.id, item.ticket_type, item.quantity, item)} style={{ background: '#C8891F', color: '#0F1208', border: 'none', borderRadius: 2, padding: '12px 20px', fontSize: 12, fontWeight: 700, letterSpacing: '.10em', textTransform: 'uppercase', cursor: 'pointer' }}>View Ticket</button>
                </div>
              </div>
            )
          })}
          {!orders.length && (
            <div style={{ background: '#1E2418', border: '.5px solid #2A3020', borderRadius: 8, padding: 36, textAlign: 'center' }}>
              <h3 style={{ fontSize: 24, fontFamily: "'Yeseva One',serif", color: '#EFE8D5', marginBottom: 12 }}>No tickets yet</h3>
              <p style={{ color: '#A89B80', marginBottom: 24 }}>Book an event and your ticket will appear here.</p>
              <button onClick={() => onNav('events')} style={{ background: '#C8891F', color: '#0F1208', border: 'none', borderRadius: 2, padding: '14px 24px', fontSize: 12, fontWeight: 700, letterSpacing: '.10em', textTransform: 'uppercase', cursor: 'pointer' }}>Browse Events</button>
            </div>
          )}
        </div>
      </div>
    </main>
  )
}
