import { useEffect, useState } from 'react'
import { EVENTS, fmt } from '../data/events'
import { currentUser, insertRow, isAdminUser, isSupabaseConfigured, listRows, uploadEventImage } from '../services/supabase'
import { findTicket, recordCheckIn } from '../services/orders'

const box = {
  background: '#1E2418',
  border: '.5px solid #2A3020',
  borderRadius: 8,
  padding: 24,
}

const fieldStyle = {
  background: '#252C1A',
  border: '.5px solid #3D5030',
  borderRadius: 4,
  padding: '12px 14px',
  color: '#EFE8D5',
  width: '100%',
}

export default function Admin({ onNav }) {
  const [orders, setOrders] = useState([])
  const [leads, setLeads] = useState([])
  const [managedEvents, setManagedEvents] = useState([])
  const [eventForm, setEventForm] = useState({
    type: 'A',
    title: '',
    ethnic: '',
    date: '',
    time: '',
    city: 'Lagos',
    location: '',
    short_loc: '',
    capacity: 500,
    status: 'Open',
    image_url: '',
    description: '',
    dishes: '',
    methods: '',
  })
  const [eventImage, setEventImage] = useState(null)
  const [eventMessage, setEventMessage] = useState('')
  const [verify, setVerify] = useState({ reference: '', email: '' })
  const [verifiedTicket, setVerifiedTicket] = useState(null)
  const [verifyMessage, setVerifyMessage] = useState('')
  const user = currentUser()
  const allowed = isAdminUser(user)

  useEffect(() => {
    if (!allowed) return
    listRows('orders').then(setOrders).catch(() => setOrders([]))
    listRows('leads').then(setLeads).catch(() => setLeads([]))
    listRows('events').then(setManagedEvents).catch(() => setManagedEvents([]))
  }, [allowed])

  const allEvents = [...managedEvents, ...EVENTS]
  const revenue = orders.reduce((sum, order) => sum + Number(order.total || 0), 0)
  const sold = allEvents.reduce((sum, event) => sum + Number(event.sold || 0), 0) + orders.reduce((sum, order) => sum + Number(order.quantity || 0), 0)
  const capacity = allEvents.reduce((sum, event) => sum + Number(event.capacity || 0), 0)

  const createEvent = async (e) => {
    e.preventDefault()
    setEventMessage('')
    try {
      const imageUrl = eventImage ? await uploadEventImage(eventImage) : eventForm.image_url
      const row = await insertRow('events', {
        ...eventForm,
        image_url: imageUrl || '',
        sold: 0,
        capacity: Number(eventForm.capacity || 0),
        dishes: eventForm.dishes.split(',').map(item => item.trim()).filter(Boolean),
        methods: eventForm.methods.split(',').map(item => item.trim()).filter(Boolean),
      })
      setManagedEvents([row, ...managedEvents])
      setEventForm({ type: 'A', title: '', ethnic: '', date: '', time: '', city: 'Lagos', location: '', short_loc: '', capacity: 500, status: 'Open', image_url: '', description: '', dishes: '', methods: '' })
      setEventImage(null)
      setEventMessage('Event created. It now appears on the public events page.')
    } catch (err) {
      setEventMessage(err.message || 'Could not create event.')
    }
  }

  const verifyTicket = async (e) => {
    e.preventDefault()
    setVerifyMessage('')
    setVerifiedTicket(null)
    try {
      const ticket = await findTicket(verify)
      if (!ticket) {
        setVerifyMessage('No matching ticket found.')
      } else {
        setVerifiedTicket(ticket)
      }
    } catch (err) {
      setVerifyMessage(err.message || 'Could not verify ticket.')
    }
  }

  const checkInTicket = async () => {
    if (!verifiedTicket) return
    try {
      await recordCheckIn({ reference: verifiedTicket.reference, checkedInBy: user?.email })
      setVerifyMessage('Ticket checked in successfully.')
    } catch (err) {
      setVerifyMessage(err.message || 'Could not check in ticket.')
    }
  }

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
            [allEvents.length, 'Events scheduled'],
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
              {allEvents.map(event => {
                const pct = Math.round((Number(event.sold || 0) / Number(event.capacity || 1)) * 100)
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
            <h2 style={{ fontSize: 26, fontFamily: "'Yeseva One',serif", color: '#EFE8D5', marginBottom: 20 }}>Gate Verification</h2>
            <form onSubmit={verifyTicket} style={{ display: 'grid', gap: 12, marginBottom: 20 }}>
              <input required placeholder="Ticket reference" value={verify.reference} onChange={e => setVerify({ ...verify, reference: e.target.value.trim().toUpperCase() })} style={{ background: '#252C1A', border: '.5px solid #3D5030', borderRadius: 4, padding: '12px 14px', color: '#EFE8D5' }} />
              <input required type="email" placeholder="Attendee email" value={verify.email} onChange={e => setVerify({ ...verify, email: e.target.value.trim() })} style={{ background: '#252C1A', border: '.5px solid #3D5030', borderRadius: 4, padding: '12px 14px', color: '#EFE8D5' }} />
              <button style={{ background: '#C8891F', color: '#0F1208', border: 'none', borderRadius: 2, padding: 13, fontSize: 12, fontWeight: 700, letterSpacing: '.10em', textTransform: 'uppercase' }}>Verify</button>
            </form>
            {verifiedTicket && (
              <div style={{ background: '#252C1A', border: '.5px solid #3D5030', borderRadius: 8, padding: 16, marginBottom: 18 }}>
                <p style={{ fontSize: 10, letterSpacing: '.14em', textTransform: 'uppercase', color: '#C8891F', marginBottom: 6 }}>{verifiedTicket.reference}</p>
                <p style={{ color: '#EFE8D5', fontWeight: 700, marginBottom: 4 }}>{verifiedTicket.event_title}</p>
                <p style={{ color: '#A89B80', fontSize: 13, marginBottom: 12 }}>{verifiedTicket.attendee_name} • {verifiedTicket.ticket_type} • Qty {verifiedTicket.quantity}</p>
                <button onClick={checkInTicket} style={{ width: '100%', background: '#6DB86D', color: '#0F1208', border: 'none', borderRadius: 2, padding: 12, fontSize: 12, fontWeight: 700, letterSpacing: '.10em', textTransform: 'uppercase' }}>Check In</button>
              </div>
            )}
            {verifyMessage && <p style={{ color: verifyMessage.includes('success') ? '#6DB86D' : '#D66B55', fontSize: 13, lineHeight: 1.6, marginBottom: 24 }}>{verifyMessage}</p>}

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

        <section style={{ ...box, marginTop: 24 }}>
          <h2 style={{ fontSize: 26, fontFamily: "'Yeseva One',serif", color: '#EFE8D5', marginBottom: 20 }}>Create New Event</h2>
          <form onSubmit={createEvent} style={{ display: 'grid', gap: 14 }}>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 14 }} className="col1">
              <input required placeholder="Event title" value={eventForm.title} onChange={e => setEventForm({ ...eventForm, title: e.target.value })} style={fieldStyle} />
              <select value={eventForm.type} onChange={e => setEventForm({ ...eventForm, type: e.target.value })} style={fieldStyle}>
                <option value="A">Ethnic Food Showcase</option>
                <option value="B">Old vs New</option>
              </select>
              <input placeholder="Ethnic group" value={eventForm.ethnic} onChange={e => setEventForm({ ...eventForm, ethnic: e.target.value })} style={fieldStyle} />
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 14 }} className="col1">
              <input required placeholder="Date, e.g. Sat, Nov 7, 2026" value={eventForm.date} onChange={e => setEventForm({ ...eventForm, date: e.target.value })} style={fieldStyle} />
              <input required placeholder="Time" value={eventForm.time} onChange={e => setEventForm({ ...eventForm, time: e.target.value })} style={fieldStyle} />
              <input required placeholder="City" value={eventForm.city} onChange={e => setEventForm({ ...eventForm, city: e.target.value })} style={fieldStyle} />
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 160px', gap: 14 }} className="col1">
              <input required placeholder="Full location" value={eventForm.location} onChange={e => setEventForm({ ...eventForm, location: e.target.value })} style={fieldStyle} />
              <input placeholder="Short location" value={eventForm.short_loc} onChange={e => setEventForm({ ...eventForm, short_loc: e.target.value })} style={fieldStyle} />
              <input type="number" min="1" placeholder="Capacity" value={eventForm.capacity} onChange={e => setEventForm({ ...eventForm, capacity: e.target.value })} style={fieldStyle} />
            </div>
            <textarea required placeholder="Event description" value={eventForm.description} onChange={e => setEventForm({ ...eventForm, description: e.target.value })} style={{ ...fieldStyle, minHeight: 90 }} />
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14 }} className="col1">
              <input placeholder="Dishes, comma separated" value={eventForm.dishes} onChange={e => setEventForm({ ...eventForm, dishes: e.target.value })} style={fieldStyle} />
              <input placeholder="Methods, comma separated" value={eventForm.methods} onChange={e => setEventForm({ ...eventForm, methods: e.target.value })} style={fieldStyle} />
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14 }} className="col1">
              <input placeholder="Image URL, or upload a file" value={eventForm.image_url} onChange={e => setEventForm({ ...eventForm, image_url: e.target.value })} style={fieldStyle} />
              <input type="file" accept="image/*" onChange={e => setEventImage(e.target.files?.[0] || null)} style={{ ...fieldStyle, padding: 11 }} />
            </div>
            <button style={{ background: '#C8891F', color: '#0F1208', border: 'none', borderRadius: 2, padding: 15, fontSize: 12, fontWeight: 700, letterSpacing: '.10em', textTransform: 'uppercase' }}>Create Event</button>
            {eventMessage && <p style={{ color: eventMessage.includes('created') ? '#6DB86D' : '#D66B55', fontSize: 13 }}>{eventMessage}</p>}
          </form>
        </section>
        </>
        )}
      </div>
    </main>
  )
}
