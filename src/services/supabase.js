import { createClient } from '@supabase/supabase-js'

const SUPABASE_URL = import.meta.env.VITE_SUPABASE_URL
const SUPABASE_ANON_KEY = import.meta.env.VITE_SUPABASE_ANON_KEY
const ADMIN_EMAILS = (import.meta.env.VITE_ADMIN_EMAILS || '').split(',').map(e => e.trim().toLowerCase()).filter(Boolean)

export const isSupabaseConfigured = Boolean(SUPABASE_URL && SUPABASE_ANON_KEY)

const supabase = isSupabaseConfigured
  ? createClient(SUPABASE_URL, SUPABASE_ANON_KEY)
  : null

const TABLES = new Set(['orders', 'leads', 'event_checkins', 'events'])

function assertTable(table) {
  if (!TABLES.has(table)) throw new Error(`Unsupported table: ${table}`)
}

// ── Rows ─────────────────────────────────────────────────────────────────────

export async function insertRow(table, payload) {
  assertTable(table)
  if (!supabase) {
    const rows = JSON.parse(localStorage.getItem(`tsf:${table}`) || '[]')
    const row = { id: crypto.randomUUID(), created_at: new Date().toISOString(), ...payload }
    rows.unshift(row)
    localStorage.setItem(`tsf:${table}`, JSON.stringify(rows))
    return row
  }
  const { data, error } = await supabase.from(table).insert(payload).select().single()
  if (error) throw new Error(`Could not save ${table}: ${error.message}`)
  return data
}

export async function listRows(table) {
  assertTable(table)
  if (!supabase) return JSON.parse(localStorage.getItem(`tsf:${table}`) || '[]')
  const { data, error } = await supabase.from(table).select('*').order('created_at', { ascending: false })
  if (error) throw new Error(`Could not load ${table}: ${error.message}`)
  return data
}

export async function findRows(table, filters = {}) {
  assertTable(table)
  if (!supabase) {
    const rows = JSON.parse(localStorage.getItem(`tsf:${table}`) || '[]')
    return rows.filter(row =>
      Object.entries(filters).every(([k, v]) => !v || String(row[k] || '').toLowerCase() === String(v).toLowerCase())
    )
  }
  let query = supabase.from(table).select('*')
  Object.entries(filters).forEach(([k, v]) => { if (v) query = query.eq(k, v) })
  const { data, error } = await query
  if (error) throw new Error(`Could not search ${table}: ${error.message}`)
  return data
}

export async function rpc(name, payload = {}) {
  if (!supabase) throw new Error('RPC calls require Supabase configuration.')
  const { data, error } = await supabase.rpc(name, payload)
  if (error) throw new Error(`RPC ${name} failed: ${error.message}`)
  return data
}

// ── Functions ─────────────────────────────────────────────────────────────────

export async function invokeFunction(name, payload = {}) {
  if (!supabase) return { ok: false, skipped: true, message: 'Supabase functions are not configured.' }
  const { data, error } = await supabase.functions.invoke(name, { body: payload })
  if (error) throw new Error(`Function ${name} failed: ${error.message}`)
  return data
}

// ── Storage ───────────────────────────────────────────────────────────────────

export async function uploadEventImage(file) {
  if (!supabase || !file) return null
  const ext = file.name.split('.').pop() || 'jpg'
  const path = `events/${crypto.randomUUID()}.${ext}`.toLowerCase()
  const { error } = await supabase.storage.from('event-images').upload(path, file, { upsert: true })
  if (error) throw new Error(`Image upload failed: ${error.message}`)
  const { data } = supabase.storage.from('event-images').getPublicUrl(path)
  return data.publicUrl
}

// ── Auth ──────────────────────────────────────────────────────────────────────

export async function signUp({ name, email, phone, password }) {
  if (!supabase) {
    const user = { name, email, phone, role: isAdminEmail(email) ? 'admin' : 'guest' }
    localStorage.setItem('tsf:user', JSON.stringify(user))
    return { user, needsConfirmation: false }
  }

  const { data, error } = await supabase.auth.signUp({
    email,
    password,
    options: { data: { name, phone } },
  })

  if (error) throw new Error(error.message)

  const user = normalizeUser(data.user, { name, email, phone })

  if (!data.session) {
    // Email confirmation required — user created but not yet active
    return { user, needsConfirmation: true }
  }

  localStorage.setItem('tsf:user', JSON.stringify(user))
  return { user, session: data.session, needsConfirmation: false }
}

export async function signIn({ email, password }) {
  if (!supabase) {
    const existing = JSON.parse(localStorage.getItem('tsf:user') || 'null')
    const user = existing?.email === email
      ? existing
      : { name: 'Festival Guest', email, role: isAdminEmail(email) ? 'admin' : 'guest' }
    localStorage.setItem('tsf:user', JSON.stringify(user))
    return { user }
  }

  const { data, error } = await supabase.auth.signInWithPassword({ email, password })

  if (error) {
    const msg = error.message || ''
    throw new Error(msg.toLowerCase().includes('email not confirmed')
      ? 'Please confirm your email address first, then sign in.'
      : msg || 'Invalid email or password.')
  }

  const user = normalizeUser(data.user, { email })
  localStorage.setItem('tsf:user', JSON.stringify(user))
  return { user, session: data.session }
}

export function signOut() {
  supabase?.auth.signOut()
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
