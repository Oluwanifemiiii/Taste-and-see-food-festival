import { findRows, insertRow, isSupabaseConfigured, rpc } from './supabase'

export function makeReference(prefix = 'TSF') {
  const code = Math.random().toString(36).slice(2, 8).toUpperCase()
  return `${prefix}-${new Date().getFullYear()}-${code}`
}

export async function saveOrder(order) {
  return insertRow('orders', order)
}

export async function saveLead(table, lead) {
  return insertRow(table, lead)
}

export async function findTicket({ reference, email }) {
  if (isSupabaseConfigured) {
    const rows = await rpc('lookup_ticket', {
      ticket_reference: reference,
      ticket_email: email,
    })
    return rows[0] || null
  }

  const rows = await findRows('orders', {
    reference,
    attendee_email: email,
  })
  return rows[0] || null
}

export async function recordCheckIn({ reference, checkedInBy }) {
  return insertRow('event_checkins', {
    order_reference: reference,
    checked_in_by: checkedInBy || 'admin',
  })
}
