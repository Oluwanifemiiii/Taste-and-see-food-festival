import { useEffect, useState } from 'react'
import { EVENTS, getTicketLabel, fmt } from '../data/events'
import { currentUser, findRows, signOut } from '../services/supabase'
import { getEventById, useFestivalEvents } from '../hooks/useFestivalEvents'

export default function Account({ onNav, order }) {
  const [remoteOrders, setRemoteOrders] = useState([])
  const { events } = useFestivalEvents()
  const user = currentUser()
  const savedOrders = JSON.parse(localStorage.getItem('tsf:orders') || '[]')
  const merged = order ? [order, ...remoteOrders, ...savedOrders] : [...remoteOrders, ...savedOrders]
  const orders = Array.from(new Map(merged.map(item => [item.reference, item])).values())

  const logout = () => {
    signOut()
    onNav('auth')
  }

  useEffect(() => {
    if (!user?.email) return
    findRows('orders', { attendee_email: user.email }).then(setRemoteOrders).catch(() => setRemoteOrders([]))
  }, [user?.email])

  return (
    <main style={{ minHeight: '100vh', background: '#0F1208', padding: '120px 48px 80px' }}>
      <div style={{ maxWidth: 1100, margin: '0 auto' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', gap: 20, alignItems: 'flex-start', flexWrap: 'wrap' }}>
          <div>
            <p style={{ fontSize: 10, fontWeight: 700, letterSpacing: '.18em', textTransform: 'uppercase', color: '#C8891F', marginBottom: 14 }}>{user ? 'Signed-in Account' : 'Guest Tickets'}</p>
            <h1 style={{ fontSize: 48, fontFamily: "'Yeseva One',serif", color: '#EFE8D5', marginBottom: 16 }}>My Tickets & Bookings</h1>
          </div>
          {user && <button onClick={logout} style={{ background: 'transparent', color: '#EFE8D5', border: '1px solid rgba(239,232,213,.4)', borderRadius: 2, padding: '12px 20px', fontSize: 12, fontWeight: 700, letterSpacing: '.10em', textTransform: 'uppercase' }}>Sign Out</button>}
        </div>
        <p style={{ fontSize: 15, color: '#A89B80', lineHeight: 1.8, maxWidth: 680, marginBottom: 40 }}>{user ? `Showing tickets connected to ${user.email}, plus any tickets saved in this browser.` : 'Guest purchases are saved in this browser after checkout. Use Find Ticket with reference and email to recover a ticket from another device.'}</p>

        <div style={{ display: 'grid', gap: 18 }}>
          {orders.map(item => {
            const event = getEventById(events, Number(item.event_id)) || EVENTS[0]
            return (
              <div key={item.reference} style={{ background: '#1E2418', border: '.5px solid #2A3020', borderRadius: 8, padding: 24, display: 'flex', justifyContent: 'space-between', gap: 20, flexWrap: 'wrap' }}>
                <div>
                  <p style={{ fontSize: 10, letterSpacing: '.14em', textTransform: 'uppercase', color: '#C8891F', marginBottom: 8 }}>{item.reference}</p>
                  <h2 style={{ fontSize: 24, fontFamily: "'Yeseva One',serif", color: '#EFE8D5', marginBottom: 8 }}>{event.title}</h2>
                  <p style={{ fontSize: 13, color: '#A89B80' }}>{event.date} • {event.city} • {getTicketLabel(item.ticket_type)}</p>
                </div>
                <div style={{ textAlign: 'right' }}>
                  <p style={{ fontSize: 24, fontFamily: "'Yeseva One',serif", color: '#C8891F', marginBottom: 12 }}>{fmt(item.total || 0)}</p>
                  <button onClick={() => onNav('ticket', event.id, item.ticket_type, item.quantity, item)} style={{ background: '#C8891F', color: '#0F1208', border: 'none', borderRadius: 2, padding: '12px 20px', fontSize: 12, fontWeight: 700, letterSpacing: '.10em', textTransform: 'uppercase' }}>View Ticket</button>
                </div>
              </div>
            )
          })}
          {!orders.length && (
            <div style={{ background: '#1E2418', border: '.5px solid #2A3020', borderRadius: 8, padding: 36, textAlign: 'center' }}>
              <h2 style={{ fontSize: 24, fontFamily: "'Yeseva One',serif", color: '#EFE8D5', marginBottom: 12 }}>No tickets yet</h2>
              <p style={{ color: '#A89B80', marginBottom: 24 }}>Book an event and your ticket will appear here.</p>
              <div style={{ display: 'flex', gap: 12, justifyContent: 'center', flexWrap: 'wrap' }}>
                <button onClick={() => onNav('events')} style={{ background: '#C8891F', color: '#0F1208', border: 'none', borderRadius: 2, padding: '14px 24px', fontSize: 12, fontWeight: 700, letterSpacing: '.10em', textTransform: 'uppercase' }}>Browse Events</button>
                <button onClick={() => onNav('lookup')} style={{ background: 'transparent', color: '#EFE8D5', border: '1px solid rgba(239,232,213,.4)', borderRadius: 2, padding: '14px 24px', fontSize: 12, fontWeight: 700, letterSpacing: '.10em', textTransform: 'uppercase' }}>Find Ticket</button>
              </div>
            </div>
          )}
        </div>
      </div>
    </main>
  )
}
