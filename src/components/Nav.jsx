import { useState, useEffect } from 'react'
import { currentUser } from '../services/supabase'

export default function Nav({ onNav }) {
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const [user, setUser] = useState(currentUser())

  useEffect(() => {
    const sync = () => setUser(currentUser())
    window.addEventListener('focus', sync)
    return () => window.removeEventListener('focus', sync)
  }, [])

  const accountTarget = user ? 'accounts' : 'auth'

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 80)
    window.addEventListener('scroll', handler, { passive: true })
    return () => window.removeEventListener('scroll', handler)
  }, [])

  const go = (page) => {
    setMobileOpen(false)
    onNav(page)
  }

  return (
    <>
      <nav style={{
        position: 'fixed', top: 0, left: 0, right: 0, zIndex: 100,
        transition: 'background .3s, border-bottom .3s',
        background: scrolled ? '#0F1208' : 'transparent',
        borderBottom: scrolled ? '.5px solid #2A3020' : '.5px solid transparent',
        padding: '0 clamp(16px, 4vw, 48px)',
        height: 72,
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
      }}>
        <button onClick={() => go('home')} style={{ background: 'none', border: 'none', padding: 0, cursor: 'pointer', display: 'flex', flexDirection: 'column', gap: 3 }}>
          <span style={{ fontSize: 'clamp(18px, 3vw, 24px)', lineHeight: 1, fontFamily: "'Yeseva One',serif", color: '#EFE8D5', letterSpacing: '.02em' }}>TASTE &amp; SEE</span>
          <span style={{ fontSize: 9, fontWeight: 600, letterSpacing: '.22em', textTransform: 'uppercase', color: '#C8891F' }}>FOOD FESTIVAL</span>
        </button>

        <div className="hm" style={{ display: 'flex', alignItems: 'center', gap: 36 }}>
          {[['events', 'Events'], ['experience', 'Experience'], ['business', 'Business'], ['checkout', 'Tickets'], ['lookup', 'Find Ticket'], [accountTarget, 'Account']].map(([page, label]) => (
            <button key={page} onClick={() => go(page)} className="nav-lnk"
              style={{ background: 'none', border: 'none', fontSize: 13, fontWeight: 500, color: '#A89B80', cursor: 'pointer', transition: 'color .2s' }}>
              {label}
            </button>
          ))}
        </div>

        <div className="hm" style={{ display: 'flex', alignItems: 'center', gap: 20 }}>
          {/* Profile icon — shows dot when logged in */}
          <button onClick={() => go('accounts')} title={user ? `Signed in as ${user.name}` : 'Sign in'}
            style={{ position: 'relative', background: 'none', border: 'none', color: '#A89B80', cursor: 'pointer', padding: 2, display: 'flex', alignItems: 'center' }}>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><circle cx="12" cy="8" r="4"/><path d="M4 20c0-4 3.6-7 8-7s8 3 8 7"/></svg>
            {user && <span style={{ position: 'absolute', top: 0, right: 0, width: 7, height: 7, background: '#6DB86D', borderRadius: '50%', border: '1.5px solid #0F1208' }} />}
          </button>
          <button onClick={() => go('checkout')}
            style={{ background: '#C8891F', color: '#0F1208', border: 'none', borderRadius: 2, padding: '10px 20px', fontSize: 12, fontWeight: 600, letterSpacing: '.10em', textTransform: 'uppercase', cursor: 'pointer', transition: 'background .2s' }}
            onMouseOver={e => e.currentTarget.style.background = '#B07A18'}
            onMouseOut={e => e.currentTarget.style.background = '#C8891F'}>
            Get Tickets
          </button>
        </div>

        <button className="hd" onClick={() => setMobileOpen(o => !o)} style={{ background: 'none', border: 'none', color: '#EFE8D5', cursor: 'pointer' }}>
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><line x1="3" y1="6" x2="21" y2="6"/><line x1="3" y1="12" x2="21" y2="12"/><line x1="3" y1="18" x2="21" y2="18"/></svg>
        </button>
      </nav>

      {mobileOpen && (
        <div className="fi" style={{ position: 'fixed', inset: 0, background: '#0F1208', zIndex: 200, display: 'flex', flexDirection: 'column', padding: '40px 24px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 60 }}>
            <span style={{ fontSize: 22, fontFamily: "'Yeseva One',serif", color: '#EFE8D5' }}>TASTE &amp; SEE FOOD FESTIVAL</span>
            <button onClick={() => setMobileOpen(false)} style={{ background: 'none', border: 'none', color: '#EFE8D5', cursor: 'pointer' }}>
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
            </button>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 28 }}>
            {[['events', 'Events'], ['experience', 'Experience'], ['business', 'Business'], ['checkout', 'Tickets'], ['lookup', 'Find Ticket']].map(([page, label]) => (
              <button key={page} onClick={() => go(page)}
                style={{ background: 'none', border: 'none', fontSize: 'clamp(28px, 8vw, 36px)', fontFamily: "'Yeseva One',serif", color: '#EFE8D5', cursor: 'pointer', textAlign: 'left' }}>
                {label}
              </button>
            ))}
            <button onClick={() => go('accounts')}
              style={{ background: 'none', border: 'none', fontSize: 'clamp(28px, 8vw, 36px)', fontFamily: "'Yeseva One',serif", color: user ? '#6DB86D' : '#A89B80', cursor: 'pointer', textAlign: 'left', display: 'flex', alignItems: 'center', gap: 12 }}>
              {user ? `Hi, ${user.name?.split(' ')[0]}` : 'Sign In'}
              {user && <span style={{ width: 10, height: 10, background: '#6DB86D', borderRadius: '50%', display: 'inline-block', flexShrink: 0 }} />}
            </button>
          </div>
          <div style={{ marginTop: 'auto' }}>
            <button onClick={() => go('checkout')} style={{ width: '100%', background: '#C8891F', color: '#0F1208', border: 'none', borderRadius: 2, padding: 18, fontSize: 12, fontWeight: 600, letterSpacing: '.10em', textTransform: 'uppercase', cursor: 'pointer' }}>
              Get Tickets →
            </button>
          </div>
        </div>
      )}
    </>
  )
}
