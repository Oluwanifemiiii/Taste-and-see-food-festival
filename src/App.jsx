import { useState, useEffect } from 'react'
import Nav from './components/Nav'
import Home from './pages/Home'
import Events from './pages/Events'
import EventDetail from './pages/EventDetail'
import Auth from './pages/Auth'
import Checkout from './pages/Checkout'
import Ticket from './pages/Ticket'
import Experience from './pages/Experience'
import About from './pages/About'
import Business from './pages/Business'
import Admin from './pages/Admin'
import Account from './pages/Account'

export default function App() {
  const [page, setPage] = useState('home')
  const [eventId, setEventId] = useState(1)
  const [ticketType, setTicketType] = useState('premium')
  const [ticketQty, setTicketQty] = useState(1)
  const [latestOrder, setLatestOrder] = useState(null)

  // Navigate and scroll to top
  const navigate = (target, evtId, ticket, qty, order) => {
    setPage(target)
    if (evtId !== undefined) setEventId(evtId)
    if (ticket !== undefined) setTicketType(ticket)
    if (qty !== undefined) setTicketQty(qty)
    if (order !== undefined) setLatestOrder(order)
    window.scrollTo(0, 0)
  }

  // Pages that hide the nav (full-screen flows)
  const hideNav = ['ticket'].includes(page)

  return (
    <>
      {!hideNav && <Nav onNav={navigate} currentPage={page} />}

      {page === 'home' && <Home onNav={navigate} />}
      {page === 'events' && <Events onNav={navigate} />}
      {page === 'event-detail' && <EventDetail eventId={eventId} onNav={navigate} />}
      {page === 'auth' && <Auth onNav={navigate} />}
      {page === 'checkout' && (
        <Checkout
          eventId={eventId}
          initialTicket={ticketType}
          initialQty={ticketQty}
          onNav={navigate}
        />
      )}
      {page === 'ticket' && <Ticket eventId={eventId} ticketType={ticketType} order={latestOrder} onNav={navigate} />}
      {page === 'experience' && <Experience onNav={navigate} />}
      {page === 'about' && <About onNav={navigate} />}
      {page === 'business' && <Business onNav={navigate} />}
      {page === 'admin' && <Admin onNav={navigate} />}
      {page === 'accounts' && <Account onNav={navigate} order={latestOrder} />}
    </>
  )
}
