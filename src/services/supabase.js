const SUPABASE_URL = import.meta.env.VITE_SUPABASE_URL
const SUPABASE_ANON_KEY = import.meta.env.VITE_SUPABASE_ANON_KEY
const ADMIN_EMAILS = (import.meta.env.VITE_ADMIN_EMAILS || '').split(',').map(email => email.trim().toLowerCase()).filter(Boolean)

export const isSupabaseConfigured = Boolean(SUPABASE_URL && SUPABASE_ANON_KEY)
const TABLES = new Set(['orders', 'leads', 'event_checkins', 'events'])

function getSession() {
  return JSON.parse(localStorage.getItem('tsf:session') || 'null')
}

function authHeaders() {
  const session = getSession()
  return {
    apikey: SUPABASE_ANON_KEY || '',
    Authorization: `Bearer ${session?.access_token || SUPABASE_ANON_KEY || ''}`,
    'Content-Type': 'application/json',
    Prefer: 'return=representation',
  }
}

const authBaseHeaders = {
  apikey: SUPABASE_ANON_KEY || '',
  'Content-Type': 'application/json',
}

function assertTable(table) {
  if (!TABLES.has(table)) {
    throw new Error(`Unsupported table: ${table}`)
  }
}

export async function insertRow(table, payload) {
  assertTable(table)
  if (!isSupabaseConfigured) {
    const localRows = JSON.parse(localStorage.getItem(`tsf:${table}`) || '[]')
    const row = { id: crypto.randomUUID(), created_at: new Date().toISOString(), ...payload }
    localRows.unshift(row)
    localStorage.setItem(`tsf:${table}`, JSON.stringify(localRows))
    return row
  }

  const response = await fetch(`${SUPABASE_URL}/rest/v1/${table}`, {
    method: 'POST',
    headers: authHeaders(),
    body: JSON.stringify(payload),
  })

  if (!response.ok) {
    throw new Error(`Could not save ${table}: ${await response.text()}`)
  }

  const rows = await response.json()
  return rows[0]
}

export async function listRows(table) {
  assertTable(table)
  if (!isSupabaseConfigured) {
    return JSON.parse(localStorage.getItem(`tsf:${table}`) || '[]')
  }

  const response = await fetch(`${SUPABASE_URL}/rest/v1/${table}?select=*&order=created_at.desc`, {
    headers: authHeaders(),
  })

  if (!response.ok) {
    throw new Error(`Could not load ${table}: ${await response.text()}`)
  }

  return response.json()
}

export async function findRows(table, filters = {}) {
  assertTable(table)
  if (!isSupabaseConfigured) {
    const rows = JSON.parse(localStorage.getItem(`tsf:${table}`) || '[]')
    return rows.filter(row => Object.entries(filters).every(([key, value]) => {
      if (!value) return true
      return String(row[key] || '').toLowerCase() === String(value).toLowerCase()
    }))
  }

  const params = new URLSearchParams({ select: '*' })
  Object.entries(filters).forEach(([key, value]) => {
    if (value) params.set(key, `eq.${value}`)
  })
  const response = await fetch(`${SUPABASE_URL}/rest/v1/${table}?${params.toString()}`, {
    headers: authHeaders(),
  })

  if (!response.ok) {
    throw new Error(`Could not search ${table}: ${await response.text()}`)
  }

  return response.json()
}

export async function rpc(name, payload = {}) {
  if (!isSupabaseConfigured) {
    throw new Error('RPC calls require Supabase configuration.')
  }

  const response = await fetch(`${SUPABASE_URL}/rest/v1/rpc/${name}`, {
    method: 'POST',
    headers: authHeaders(),
    body: JSON.stringify(payload),
  })

  if (!response.ok) {
    throw new Error(`RPC ${name} failed: ${await response.text()}`)
  }

  return response.json()
}

export async function invokeFunction(name, payload = {}) {
  if (!isSupabaseConfigured) {
    return { ok: false, skipped: true, message: 'Supabase functions are not configured.' }
  }

  const response = await fetch(`${SUPABASE_URL}/functions/v1/${name}`, {
    method: 'POST',
    headers: authHeaders(),
    body: JSON.stringify(payload),
  })

  if (!response.ok) {
    throw new Error(`Function ${name} failed: ${await response.text()}`)
  }

  return response.json()
}

export async function uploadEventImage(file) {
  if (!isSupabaseConfigured || !file) return null

  const ext = file.name.split('.').pop() || 'jpg'
  const filename = `${crypto.randomUUID()}.${ext}`.toLowerCase()
  const path = `events/${filename}`

  const session = getSession()
  const response = await fetch(`${SUPABASE_URL}/storage/v1/object/event-images/${path}`, {
    method: 'POST',
    headers: {
      apikey: SUPABASE_ANON_KEY || '',
      Authorization: `Bearer ${session?.access_token || SUPABASE_ANON_KEY || ''}`,
      'Content-Type': file.type || 'application/octet-stream',
      'x-upsert': 'true',
    },
    body: file,
  })

  if (!response.ok) {
    throw new Error(`Image upload failed: ${await response.text()}`)
  }

  return `${SUPABASE_URL}/storage/v1/object/public/event-images/${path}`
}

export async function signUp({ name, email, phone, password }) {
  if (!isSupabaseConfigured) {
    const user = { name, email, phone, role: isAdminEmail(email) ? 'admin' : 'guest' }
    localStorage.setItem('tsf:user', JSON.stringify(user))
    return { user, needsConfirmation: false }
  }

  const response = await fetch(`${SUPABASE_URL}/auth/v1/signup`, {
    method: 'POST',
    headers: authBaseHeaders,
    body: JSON.stringify({
      email,
      password,
      data: { name, phone },
    }),
  })

  if (!response.ok) {
    throw new Error(await response.text())
  }

  const session = await response.json()
  const user = normalizeUser(session.user, { name, email, phone })
  if (!session.access_token) {
    return { user, session, needsConfirmation: true }
  }
  localStorage.setItem('tsf:session', JSON.stringify(session))
  localStorage.setItem('tsf:user', JSON.stringify(user))
  return { user, session, needsConfirmation: false }
}

export async function signIn({ email, password }) {
  if (!isSupabaseConfigured) {
    const existing = JSON.parse(localStorage.getItem('tsf:user') || 'null')
    const user = existing?.email === email ? existing : { name: 'Festival Guest', email, role: isAdminEmail(email) ? 'admin' : 'guest' }
    localStorage.setItem('tsf:user', JSON.stringify(user))
    return { user }
  }

  const response = await fetch(`${SUPABASE_URL}/auth/v1/token?grant_type=password`, {
    method: 'POST',
    headers: authBaseHeaders,
    body: JSON.stringify({ email, password }),
  })

  if (!response.ok) {
    const body = await response.json().catch(() => ({}))
    const message = body.error_description || body.msg || body.error || 'Invalid email or password.'
    throw new Error(message.includes('Email not confirmed') ? 'Please confirm your email address first, then sign in.' : message)
  }

  const session = await response.json()
  localStorage.setItem('tsf:session', JSON.stringify(session))
  const user = normalizeUser(session.user, { email })
  localStorage.setItem('tsf:user', JSON.stringify(user))
  return { user, session }
}

export function signOut() {
  localStorage.removeItem('tsf:session')
  localStorage.removeItem('tsf:user')
}

export function currentUser() {
  return JSON.parse(localStorage.getItem('tsf:user') || 'null')
}

export function isAdminEmail(email) {
  return ADMIN_EMAILS.includes((email || '').toLowerCase())
}

export function isAdminUser(user = currentUser()) {
  return Boolean(user?.role === 'admin' || isAdminEmail(user?.email))
}

function normalizeUser(user, fallback = {}) {
  const email = user?.email || fallback.email
  return {
    id: user?.id,
    name: user?.user_metadata?.name || fallback.name || 'Festival Guest',
    email,
    phone: user?.user_metadata?.phone || fallback.phone || '',
    role: isAdminEmail(email) ? 'admin' : 'guest',
  }
}
