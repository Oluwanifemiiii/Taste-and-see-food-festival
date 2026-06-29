import { useEffect, useState } from 'react'
import { EVENTS, fmt } from '../data/events'
import { currentUser, isAdminUser, isSupabaseConfigured, listRows } from '../services/supabase'

const box = {
  background: '#1E2418',
  border: '.5px solid #2A3020',
  borderRadius: 8,
  padding: 24,
}

export default function Admin({ onNav }) {
  const [orders, setOrders] = useState([])
  const [leads, setLeads] = useState([])
  const user = currentUser()
  const allowed = isAdminUser(user)

  useEffect(() => {
    if (!allowed) return
    listRows('orders').then(setOrders).catch(() => setOrders([]))
    listRows('leads').then(setLeads).catch(() => setLeads([]))
  }, [allowed])

  const revenue = orders.reduce((sum, order) => sum + Number(order.total || 0), 0)
  const sold = EVENTS.reduce((sum, event) => sum + event.sold, 0) + orders.reduce((sum, order) => sum + Number(order.quantity || 0), 0)
  const capacity = EVENTS.reduce((sum, event) => sum + event.capacity, 0)

  return (
    <main style={{ minHeight: '100vh', background: '#0F1208', padding: '120px 48px 80px' }}>
      <div style={{ maxWidth: 1440, margin: '0 auto' }}>
        {!allowed && (
          <section style={{ maxWidth: 560, margin: '60px auto', background: '#1E2418', border: '.5px solid #2A3020', borderRadius: 8, padding: 34, textAlign: 'center' }}>
            <p style={{ fontSize: 10, fontWeight: 700, letterSpacing: '.18em', textTransform: 'uppercase', color: '#C8891F', marginBottom: 14 }}>Restricted Area</p>
            <h1 style={{ fontSize: 34, fontFamily: "'Yeseva One',serif", color: '#EFE8D5', marginBottom: 12 }}>Admin access required</h1>
            <p style={{ color: '#A89B80', fontSize: 14, lineHeight: 1.8, marginBottom: 24 }}>Sign in with an email listed in VITE_ADMIN_EMAILS to manage orders, leads, vendors, and event inventory.</p>
            <button onClick={() => onNav('auth')} style={{ background: '#C8891F', color: '#0F1208', border: 'none', borderRadius: 2, padding: '14px 24px', fontSize: 12, fontWeight: 700, letterSpacing: '.10em', textTransform: 'uppercase' }}>Sign In</button>
          </section>
        )}
        {allowed && (
        <>
        <div style={{ display: 'flex', justifyContent: 'space-between', gap: 24, alignItems: 'flex-start', marginBottom: 40, flexWrap: 'wrap' }}>
          <div>
            <p style={{ fontSize: 10, fontWeight: 700, letterSpacing: '.18em', textTransform: 'uppercase', color: '#C8891F', marginBottom: 14 }}>Operator Console</p>
            <h1 style={{ fontSize: 48, fontFamily: "'Yeseva One',serif", color: '#EFE8D5' }}>Admin Dashboard</h1>
          </div>
          <button onClick={() => onNav('business')} style={{ background: '#C8891F', color: '#0F1208', border: 'none', borderRadius: 2, padding: '14px 24px', fontSize: 12, fontWeight: 700, letterSpacing: '.10em', textTransform: 'uppercase' }}>Business Tools</button>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: 18, marginBottom: 36 }} className="col1">
          {[
            [EVENTS.length, 'Events scheduled'],
            [sold.toLocaleString('en-NG'), 'Tickets allocated'],
            [fmt(revenue), 'New order revenue'],
            [leads.length, 'Vendor/sponsor leads'],
          ].map(([value, label]) => (
            <div key={label} style={box}>
              <p style={{ fontSize: 30, fontFamily: "'Yeseva One',serif", color: '#C8891F', marginBottom: 6 }}>{value}</p>
              <p style={{ fontSize: 12, color: '#A89B80', textTransform: 'uppercase', letterSpacing: '.08em' }}>{label}</p>
            </div>
          ))}
        </div>

        <div style={{ marginBottom: 28, ...box, borderColor: isSupabaseConfigured ? '#315B31' : '#6A4A1E' }}>
          <p style={{ fontSize: 14, color: isSupabaseConfigured ? '#6DB86D' : '#C8891F', lineHeight: 1.7 }}>
            Backend mode: {isSupabaseConfigured ? 'Supabase REST API connected.' : 'Demo localStorage mode. Add VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY to connect the database.'}
          </p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1.2fr .8fr', gap: 24 }} className="col1">
          <section style={box}>
            <h2 style={{ fontSize: 26, fontFamily: "'Yeseva One',serif", color: '#EFE8D5', marginBottom: 20 }}>Event Inventory</h2>
            <div style={{ display: 'grid', gap: 12 }}>
              {EVENTS.map(event => {
                const pct = Math.round((event.sold / event.capacity) * 100)
                return (
                  <div key={event.id} style={{ background: '#252C1A', border: '.5px solid #2A3020', borderRadius: 8, padding: 16 }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', gap: 18, marginBottom: 10 }}>
                      <div>
                        <p style={{ fontSize: 15, fontWeight: 700, color: '#EFE8D5' }}>{event.title}</p>
                        <p style={{ fontSize: 12, color: '#A89B80' }}>{event.city} • {event.date}</p>
                      </div>
                      <strong style={{ color: '#C8891F' }}>{pct}%</strong>
                    </div>
                    <div style={{ height: 8, background: '#0F1208', borderRadius: 20, overflow: 'hidden' }}>
                      <div style={{ width: `${pct}%`, height: '100%', background: '#C8891F' }} />
                    </div>
                  </div>
                )
              })}
            </div>
          </section>

          <section style={box}>
            <h2 style={{ fontSize: 26, fontFamily: "'Yeseva One',serif", color: '#EFE8D5', marginBottom: 20 }}>Recent Activity</h2>
            <div style={{ display: 'grid', gap: 14 }}>
              {[...orders.map(order => ({ type: 'Order', title: order.event_title, meta: `${order.ticket_type} • ${fmt(order.total || 0)}` })), ...leads.map(lead => ({ type: lead.type, title: lead.name, meta: lead.interest }))].slice(0, 10).map((item, index) => (
                <div key={`${item.type}-${index}`} style={{ borderBottom: '.5px solid #2A3020', paddingBottom: 12 }}>
                  <p style={{ fontSize: 10, letterSpacing: '.14em', textTransform: 'uppercase', color: '#C8891F', marginBottom: 5 }}>{item.type}</p>
                  <p style={{ fontSize: 14, color: '#EFE8D5' }}>{item.title || 'Untitled'}</p>
                  <p style={{ fontSize: 12, color: '#A89B80' }}>{item.meta}</p>
                </div>
              ))}
              {!orders.length && !leads.length && <p style={{ fontSize: 14, color: '#A89B80', lineHeight: 1.7 }}>No live activity yet. Submit a ticket order or business lead to populate this dashboard.</p>}
            </div>
          </section>
        </div>
        </>
        )}
      </div>
    </main>
  )
}
