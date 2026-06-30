import { invokeFunction, isSupabaseConfigured } from './supabase'

export async function sendTicketEmail({ order, event, ticketLabel }) {
  if (!order?.attendee_email) return { skipped: true }

  if (!isSupabaseConfigured) {
    console.info('Ticket email demo payload', { order, event, ticketLabel })
    return { skipped: true, demo: true }
  }

  return invokeFunction('send-ticket-email', {
    order,
    event,
    ticketLabel,
  })
}
