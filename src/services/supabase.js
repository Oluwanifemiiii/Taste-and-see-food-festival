const SUPABASE_URL = import.meta.env.VITE_SUPABASE_URL
const SUPABASE_ANON_KEY = import.meta.env.VITE_SUPABASE_ANON_KEY

export const isSupabaseConfigured = Boolean(SUPABASE_URL && SUPABASE_ANON_KEY)

const headers = {
  apikey: SUPABASE_ANON_KEY || '',
  Authorization: `Bearer ${SUPABASE_ANON_KEY || ''}`,
  'Content-Type': 'application/json',
  Prefer: 'return=representation',
}

export async function insertRow(table, payload) {
  if (!isSupabaseConfigured) {
    const localRows = JSON.parse(localStorage.getItem(`tsf:${table}`) || '[]')
    const row = { id: crypto.randomUUID(), created_at: new Date().toISOString(), ...payload }
    localRows.unshift(row)
    localStorage.setItem(`tsf:${table}`, JSON.stringify(localRows))
    return row
  }

  const response = await fetch(`${SUPABASE_URL}/rest/v1/${table}`, {
    method: 'POST',
    headers,
    body: JSON.stringify(payload),
  })

  if (!response.ok) {
    throw new Error(`Could not save ${table}: ${await response.text()}`)
  }

  const rows = await response.json()
  return rows[0]
}

export async function listRows(table) {
  if (!isSupabaseConfigured) {
    return JSON.parse(localStorage.getItem(`tsf:${table}`) || '[]')
  }

  const response = await fetch(`${SUPABASE_URL}/rest/v1/${table}?select=*&order=created_at.desc`, {
    headers,
  })

  if (!response.ok) {
    throw new Error(`Could not load ${table}: ${await response.text()}`)
  }

  return response.json()
}
