import { useState } from 'react'

export default function Auth({ onNav }) {
  const [tab, setTab] = useState('signin')

  const tabStyle = (active) => ({
    padding: '12px 24px', background: 'transparent', border: 'none',
    borderBottom: `2px solid ${active ? '#C8891F' : 'transparent'}`,
    color: active ? '#EFE8D5' : '#A89B80',
    fontSize: 14, fontWeight: 600, cursor: 'pointer',
    fontFamily: "'Plus Jakarta Sans',sans-serif", flex: 1,
    transition: 'color .2s',
  })

  const inputStyle = {
    width: '100%', background: '#252C1A', border: '.5px solid #3D5030',
    borderRadius: 4, padding: '14px 16px', color: '#EFE8D5', fontSize: 14, outline: 'none',
  }
  const labelStyle = {
    display: 'block', fontSize: 10, fontWeight: 600, letterSpacing: '.15em',
    textTransform: 'uppercase', color: '#A89B80', marginBottom: 8,
  }

  return (
    <main className="auth-wrap" style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 'clamp(80px,12vh,100px) clamp(16px,4vw,20px)', background: '#0F1208' }}>
      <div style={{ width: '100%', maxWidth: 440 }}>
        <div style={{ textAlign: 'center', marginBottom: 40 }}>
          <div style={{ fontSize: 24, fontFamily: "'Yeseva One',serif", color: '#EFE8D5', marginBottom: 4 }}>TASTE &amp; SEE</div>
          <div style={{ fontSize: 9, fontWeight: 600, letterSpacing: '.22em', textTransform: 'uppercase', color: '#C8891F' }}>FESTIVAL</div>
        </div>

        <div style={{ background: '#1E2418', border: '.5px solid #2A3020', borderRadius: 12, overflow: 'hidden' }}>
          <div style={{ display: 'flex', borderBottom: '.5px solid #2A3020' }}>
            <button onClick={() => setTab('create')} style={tabStyle(tab === 'create')}>Create Account</button>
            <button onClick={() => setTab('signin')} style={tabStyle(tab === 'signin')}>Sign In</button>
          </div>

          {tab === 'create' && (
            <div style={{ padding: 'clamp(20px, 4vw, 32px)', display: 'flex', flexDirection: 'column', gap: 20 }}>
              <div><label style={labelStyle}>Full Name</label><input type="text" placeholder="Adaeze Okonkwo" style={inputStyle} /></div>
              <div><label style={labelStyle}>Email Address</label><input type="email" placeholder="you@email.com" style={inputStyle} /></div>
              <div><label style={labelStyle}>Phone Number</label><input type="tel" placeholder="+234 801 234 5678" style={inputStyle} /></div>
              <div><label style={labelStyle}>Password</label><input type="password" placeholder="••••••••" style={inputStyle} /></div>
              <div><label style={labelStyle}>Confirm Password</label><input type="password" placeholder="••••••••" style={inputStyle} /></div>
              <button onClick={() => onNav('checkout')} style={{ width: '100%', background: '#C8891F', color: '#0F1208', border: 'none', borderRadius: 2, padding: 16, fontSize: 12, fontWeight: 600, letterSpacing: '.10em', textTransform: 'uppercase', cursor: 'pointer' }}>
                Create Account
              </button>
              <p style={{ textAlign: 'center', fontSize: 11, color: '#A89B80' }}>
                By continuing, you agree to our <span style={{ color: '#C8891F', cursor: 'pointer' }}>Terms</span> and <span style={{ color: '#C8891F', cursor: 'pointer' }}>Privacy Policy</span>
              </p>
              <p style={{ textAlign: 'center', fontSize: 13, color: '#A89B80' }}>
                Already have an account? <button onClick={() => setTab('signin')} style={{ background: 'none', border: 'none', color: '#C8891F', cursor: 'pointer', fontSize: 13 }}>Sign in</button>
              </p>
            </div>
          )}

          {tab === 'signin' && (
            <div style={{ padding: 'clamp(20px, 4vw, 32px)', display: 'flex', flexDirection: 'column', gap: 20 }}>
              <div><label style={labelStyle}>Email Address</label><input type="email" placeholder="you@email.com" style={inputStyle} /></div>
              <div><label style={labelStyle}>Password</label><input type="password" placeholder="••••••••" style={inputStyle} /></div>
              <button onClick={() => onNav('checkout')} style={{ width: '100%', background: '#C8891F', color: '#0F1208', border: 'none', borderRadius: 2, padding: 16, fontSize: 12, fontWeight: 600, letterSpacing: '.10em', textTransform: 'uppercase', cursor: 'pointer' }}>
                Sign In
              </button>
              <p style={{ textAlign: 'center' }}>
                <button className="nav-lnk" style={{ background: 'none', border: 'none', color: '#C8891F', cursor: 'pointer', fontSize: 13 }}>Forgot password?</button>
              </p>
              <p style={{ textAlign: 'center', fontSize: 13, color: '#A89B80' }}>
                New here? <button onClick={() => setTab('create')} style={{ background: 'none', border: 'none', color: '#C8891F', cursor: 'pointer', fontSize: 13 }}>Create an account</button>
              </p>
            </div>
          )}
        </div>

        <p style={{ textAlign: 'center', marginTop: 20 }}>
          <button onClick={() => onNav('home')} className="nav-lnk" style={{ background: 'none', border: 'none', color: '#A89B80', cursor: 'pointer', fontSize: 13 }}>← Back to home</button>
        </p>
      </div>
    </main>
  )
}
