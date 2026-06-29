import { insertRow } from './supabase'

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
