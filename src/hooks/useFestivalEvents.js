import { useEffect, useMemo, useState } from 'react'
import { EVENTS } from '../data/events'
import { listRows } from '../services/supabase'

function normalizeEvent(event) {
  return {
    ...event,
    id: Number(event.id),
    type: event.type || 'A',
    ethnic: event.ethnic || null,
    shortLoc: event.shortLoc || event.short_loc || event.location,
    desc: event.desc || event.description || '',
    sold: Number(event.sold || 0),
    capacity: Number(event.capacity || 0),
    dishes: Array.isArray(event.dishes) ? event.dishes : String(event.dishes || '').split(',').map(item => item.trim()).filter(Boolean),
    methods: Array.isArray(event.methods) ? event.methods : String(event.methods || '').split(',').map(item => item.trim()).filter(Boolean),
    image_url: event.image_url || '',
  }
}

export function useFestivalEvents() {
  const [managedEvents, setManagedEvents] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    let active = true
    listRows('events')
      .then(rows => {
        if (active) setManagedEvents(rows.map(normalizeEvent))
      })
      .catch(() => {
        if (active) setManagedEvents([])
      })
      .finally(() => {
        if (active) setLoading(false)
      })
    return () => {
      active = false
    }
  }, [])

  const events = useMemo(() => {
    const combined = [...managedEvents, ...EVENTS.map(normalizeEvent)]
    return Array.from(new Map(combined.map(event => [event.id, event])).values())
  }, [managedEvents])

  return { events, managedEvents, loading }
}

export function getEventById(events, eventId) {
  return events.find(event => Number(event.id) === Number(eventId)) || events[0] || EVENTS[0]
}
