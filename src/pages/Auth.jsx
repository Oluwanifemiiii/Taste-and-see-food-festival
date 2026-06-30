import { useState } from 'react'
import { currentUser, isSupabaseConfigured, signIn, signUp } from '../services/supabase'

export default function Auth({ onNav }) {
  const user = currentUser()
  const [tab, setTab] = useState('signin')
  const [form, setForm] = useState({ name: '', email: '', phone: '', password: '', confirm: '' })
  const [message, setMessage] = useState('')
  const [loading, setLoading] = useState(false)

  const inputStyle = {
    width: '100%',
    background: '#252C1A',
    border: '.5px solid #3D5030',
    borderRadius: 4,
    padding: '14px 16px',
    color: '#EFE8D5',
    fontSize: 14,
    outline: 'none',
  }

  const labelStyle = {
    display: 'block',
    fontSize: 10,
    fontWeight: 700,
    letterSpacing: '.15em',
    textTransform: 'uppercase',
    color: '#A89B80',
    marginBottom: 8,
  }

  const update = (key, value) => setForm({ ...form, [key]: value })

  const submit = async (e) => {
    e.preventDefault()
    setLoading(true)
    setMessage('')
    if (tab === 'create' && form.password !== form.confirm) {
      setMessage('Passwords do not match.')
      setLoading(false)
      return
    }

    try {
      if (tab === 'create') {
        const result = await signUp({ name: form.name, email: form.email, phone: form.phone, password: form.password })
        if (result.needsConfirmation) {
          setMessage('Account created. Check your email and confirm it, then come back to sign in.')
          setTab('signin')
          setLoading(false)
          return
        }
      } else {
        await signIn({ email: form.email, password: form.password })
      }
      setMessage(isSupabaseConfigured ? 'Signed in successfully.' : 'Demo account saved locally. Connect Supabase Auth for production login.')
      setTimeout(() => onNav('accounts'), 500)
    } catch (err) {
      setMessage(err.message || 'Authentication failed.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <main className="auth-wrap" style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 'clamp(80px,12vh,100px) clamp(16px,4vw,20px)', background: '#0F1208' }}>
      <div style={{ width: '100%', maxWidth: 440 }}>
        <div style={{ textAlign: 'center', marginBottom: 40 }}>
          <div style={{ fontSize: 24, fontFamily: "'Yeseva One',serif", color: '#EFE8D5', marginBottom: 4 }}>TASTE &amp; SEE</div>
          <div style={{ fontSize: 9, fontWeight: 700, letterSpacing: '.22em', textTransform: 'uppercase', color: '#C8891F' }}>FESTIVAL ACCOUNT</div>
        </div>

        {user && (
          <div style={{ background: '#1E2418', border: '.5px solid #2A3020', borderRadius: 8, padding: 28, textAlign: 'center', marginBottom: 18 }}>
            <h2 style={{ fontSize: 24, fontFamily: "'Yeseva One',serif", color: '#EFE8D5', marginBottom: 8 }}>You are signed in</h2>
            <p style={{ color: '#A89B80', fontSize: 14, marginBottom: 20 }}>{user.email}</p>
            <button onClick={() => onNav('accounts')} style={{ background: '#C8891F', color: '#0F1208', border: 'none', borderRadius: 2, padding: '14px 24px', fontSize: 12, fontWeight: 700, letterSpacing: '.10em', textTransform: 'uppercase' }}>Open My Tickets</button>
          </div>
        )}

        {!user && <form onSubmit={submit} style={{ background: '#1E2418', border: '.5px solid #2A3020', borderRadius: 8, overflow: 'hidden' }}>
          <div style={{ display: 'flex', borderBottom: '.5px solid #2A3020' }}>
            {[
              ['create', 'Create Account'],
              ['signin', 'Sign In'],
            ].map(([key, label]) => (
              <button type="button" key={key} onClick={() => setTab(key)}
                style={{ flex: 1, padding: '14px 20px', background: 'transparent', border: 'none', borderBottom: `2px solid ${tab === key ? '#C8891F' : 'transparent'}`, color: tab === key ? '#EFE8D5' : '#A89B80', fontSize: 14, fontWeight: 700 }}>
                {label}
              </button>
            ))}
          </div>

          <div style={{ padding: 'clamp(20px, 4vw, 30px)', display: 'grid', gap: 18 }}>
            {tab === 'create' && (
              <>
                <div><label style={labelStyle}>Full Name</label><input required value={form.name} onChange={e => update('name', e.target.value)} style={inputStyle} /></div>
                <div><label style={labelStyle}>Phone Number</label><input required value={form.phone} onChange={e => update('phone', e.target.value)} style={inputStyle} /></div>
              </>
            )}
            <div><label style={labelStyle}>Email Address</label><input required type="email" value={form.email} onChange={e => update('email', e.target.value)} style={inputStyle} /></div>
            <div><label style={labelStyle}>Password</label><input required type="password" value={form.password} onChange={e => update('password', e.target.value)} style={inputStyle} /></div>
            {tab === 'create' && <div><label style={labelStyle}>Confirm Password</label><input required type="password" value={form.confirm} onChange={e => update('confirm', e.target.value)} style={inputStyle} /></div>}

            {message && <p style={{ color: message.includes('failed') || message.includes('Invalid') || message.includes('match') || message.includes('confirm your email') ? '#D66B55' : '#6DB86D', fontSize: 13, lineHeight: 1.6 }}>{message}</p>}
            <button disabled={loading} style={{ width: '100%', background: loading ? '#3D5030' : '#C8891F', color: '#0F1208', border: 'none', borderRadius: 2, padding: 16, fontSize: 12, fontWeight: 700, letterSpacing: '.10em', textTransform: 'uppercase' }}>
              {loading ? 'Please wait...' : tab === 'create' ? 'Create Account' : 'Sign In'}
            </button>
            <p style={{ textAlign: 'center', fontSize: 12, color: '#A89B80', lineHeight: 1.6 }}>
              {isSupabaseConfigured ? '' : 'Demo auth is active until Supabase env vars are added.'}
            </p>
          </div>
        </form>}
      </div>
    </main>
  )
}
