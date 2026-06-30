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
import Legal from './pages/Legal'
import TicketLookup from './pages/TicketLookup'

function routeFromPath(pathname) {
  const parts = pathname.split('/').filter(Boolean)
  if (!parts.length) return { page: 'home' }
  if (parts[0] === 'events' && parts[1]) return { page: 'event-detail', eventId: Number(parts[1]) || 1 }
  if (parts[0] === 'checkout') return { page: 'checkout', eventId: Number(parts[1]) || 1 }
  if (parts[0] === 'tickets') return { page: 'checkout', eventId: Number(parts[1]) || 1 }
  if (parts[0] === 'ticket') return { page: 'ticket', eventId: Number(parts[1]) || 1 }
  const routes = {
    events: 'events',
    experience: 'experience',
    about: 'about',
    business: 'business',
    auth: 'auth',
    account: 'accounts',
    accounts: 'accounts',
    lookup: 'lookup',
    admin: 'admin',
    legal: 'legal',
  }
  return { page: routes[parts[0]] || 'home' }
}

function pathForRoute(page, eventId) {
  const routes = {
    home: '/',
    events: '/events',
    'event-detail': `/events/${eventId || 1}`,
    checkout: `/checkout/${eventId || 1}`,
    ticket: `/ticket/${eventId || 1}`,
    experience: '/experience',
    about: '/about',
    business: '/business',
    auth: '/auth',
    accounts: '/account',
    lookup: '/lookup',
    admin: '/admin',
    legal: '/legal',
  }
  return routes[page] || '/'
}

export default function App() {
  const initialRoute = routeFromPath(window.location.pathname)
  const [page, setPage] = useState(initialRoute.page)
  const [eventId, setEventId] = useState(initialRoute.eventId || 1)
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
    window.history.pushState({}, '', pathForRoute(target, evtId ?? eventId))
    window.scrollTo(0, 0)
  }

  useEffect(() => {
    const onPop = () => {
      const route = routeFromPath(window.location.pathname)
      setPage(route.page)
      if (route.eventId) setEventId(route.eventId)
      window.scrollTo(0, 0)
    }
    window.addEventListener('popstate', onPop)
    return () => window.removeEventListener('popstate', onPop)
  }, [])

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
      {page === 'lookup' && <TicketLookup onNav={navigate} />}
      {page === 'legal' && <Legal onNav={navigate} />}
    </>
  )
}
