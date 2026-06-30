import { useState } from 'react'
import { EVENTS, getTicketLabel, fmt } from '../data/events'
import { findTicket } from '../services/orders'
import { getEventById, useFestivalEvents } from '../hooks/useFestivalEvents'

const inputStyle = {
  width: '100%',
  background: '#252C1A',
  border: '.5px solid #3D5030',
  borderRadius: 4,
  padding: '14px 16px',
  color: '#EFE8D5',
  fontSize: 14,
}

export default function TicketLookup({ onNav }) {
  const [form, setForm] = useState({ reference: '', email: '' })
  const [ticket, setTicket] = useState(null)
  const [message, setMessage] = useState('')
  const [loading, setLoading] = useState(false)
  const { events } = useFestivalEvents()

  const submit = async (e) => {
    e.preventDefault()
    setLoading(true)
    setMessage('')
    setTicket(null)
    try {
      const found = await findTicket(form)
      if (!found) {
        setMessage('No ticket matched that reference and email.')
      } else {
        setTicket(found)
      }
    } catch (err) {
      setMessage(err.message || 'Ticket lookup failed.')
    } finally {
      setLoading(false)
    }
  }

  const event = ticket ? getEventById(events, Number(ticket.event_id)) || EVENTS[0] : null

  return (
    <main style={{ minHeight: '100vh', background: '#0F1208', padding: '120px 48px 80px' }}>
      <div style={{ maxWidth: 900, margin: '0 auto' }}>
        <p style={{ fontSize: 10, fontWeight: 700, letterSpacing: '.18em', textTransform: 'uppercase', color: '#C8891F', marginBottom: 14 }}>Guest Ticket Recovery</p>
        <h1 style={{ fontSize: 46, fontFamily: "'Yeseva One',serif", color: '#EFE8D5', marginBottom: 14 }}>Find my ticket</h1>
        <p style={{ fontSize: 15, color: '#A89B80', lineHeight: 1.8, maxWidth: 620, marginBottom: 34 }}>Guests do not need an account. Enter the ticket reference and the email used at checkout to recover the ticket.</p>

        <form onSubmit={submit} style={{ background: '#1E2418', border: '.5px solid #2A3020', borderRadius: 8, padding: 28, display: 'grid', gap: 16, marginBottom: 24 }}>
          <input required placeholder="Ticket reference, e.g. TSF-2026-ABC123" value={form.reference} onChange={e => setForm({ ...form, reference: e.target.value.trim().toUpperCase() })} style={inputStyle} />
          <input required type="email" placeholder="Email used at checkout" value={form.email} onChange={e => setForm({ ...form, email: e.target.value.trim() })} style={inputStyle} />
          <button disabled={loading} style={{ background: loading ? '#3D5030' : '#C8891F', color: '#0F1208', border: 'none', borderRadius: 2, padding: 15, fontSize: 12, fontWeight: 700, letterSpacing: '.10em', textTransform: 'uppercase' }}>
            {loading ? 'Searching...' : 'Find Ticket'}
          </button>
          {message && <p style={{ color: '#D66B55', fontSize: 13 }}>{message}</p>}
        </form>

        {ticket && event && (
          <div style={{ background: '#1E2418', border: '1px solid #C8891F', borderRadius: 8, padding: 26, display: 'flex', justifyContent: 'space-between', gap: 20, flexWrap: 'wrap' }}>
            <div>
              <p style={{ fontSize: 10, letterSpacing: '.14em', textTransform: 'uppercase', color: '#C8891F', marginBottom: 8 }}>{ticket.reference}</p>
              <h2 style={{ fontSize: 26, fontFamily: "'Yeseva One',serif", color: '#EFE8D5', marginBottom: 8 }}>{event.title}</h2>
              <p style={{ color: '#A89B80', fontSize: 13 }}>{event.date} • {event.city} • {getTicketLabel(ticket.ticket_type)}</p>
            </div>
            <div style={{ textAlign: 'right' }}>
              <p style={{ fontSize: 24, fontFamily: "'Yeseva One',serif", color: '#C8891F', marginBottom: 12 }}>{fmt(ticket.total || 0)}</p>
              <button onClick={() => onNav('ticket', event.id, ticket.ticket_type, ticket.quantity, ticket)} style={{ background: '#C8891F', color: '#0F1208', border: 'none', borderRadius: 2, padding: '12px 20px', fontSize: 12, fontWeight: 700, letterSpacing: '.10em', textTransform: 'uppercase' }}>Open Ticket</button>
            </div>
          </div>
        )}
      </div>
    </main>
  )
}
