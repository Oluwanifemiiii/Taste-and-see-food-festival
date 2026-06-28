import { useState, useEffect } from 'react'

export default function Nav({ onNav, currentPage }) {
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)

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
        padding: '0 48px', height: 72,
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
      }}>
        <button onClick={() => go('home')} style={{ background: 'none', border: 'none', padding: 0, cursor: 'pointer', display: 'flex', flexDirection: 'column', gap: 3 }}>
          <span style={{ fontSize: 24, lineHeight: 1, fontFamily: "'Yeseva One',serif", color: '#EFE8D5', letterSpacing: '.02em' }}>TASTE &amp; SEE</span>
          <span style={{ fontSize: 9, fontWeight: 600, letterSpacing: '.22em', textTransform: 'uppercase', color: '#C8891F' }}>FESTIVAL</span>
        </button>

        <div className="hm" style={{ display: 'flex', alignItems: 'center', gap: 36 }}>
          {[['events', 'Events'], ['experience', 'The Experience'], ['about', 'About'], ['auth', 'Tickets']].map(([page, label]) => (
            <button key={page} onClick={() => go(page)} className="nav-lnk"
              style={{ background: 'none', border: 'none', fontSize: 13, fontWeight: 500, color: '#A89B80', cursor: 'pointer', transition: 'color .2s' }}>
              {label}
            </button>
          ))}
        </div>

        <div className="hm" style={{ display: 'flex', alignItems: 'center', gap: 20 }}>
          <a href="#" className="nav-lnk" style={{ color: '#A89B80', transition: 'color .2s' }}>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"/><circle cx="12" cy="12" r="4"/><circle cx="17.5" cy="6.5" r="1" fill="currentColor"/></svg>
          </a>
          <a href="#" className="nav-lnk" style={{ color: '#A89B80', transition: 'color .2s' }}>
            <svg width="15" height="17" viewBox="0 0 24 24" fill="currentColor"><path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-2.88 2.5 2.89 2.89 0 0 1-2.89-2.89 2.89 2.89 0 0 1 2.89-2.89c.28 0 .54.04.79.1V9.01a6.33 6.33 0 0 0-.79-.05 6.34 6.34 0 0 0-6.34 6.34 6.34 6.34 0 0 0 6.34 6.34 6.34 6.34 0 0 0 6.33-6.34V8.93a8.18 8.18 0 0 0 4.78 1.52V7.01a4.85 4.85 0 0 1-1.01-.32z"/></svg>
          </a>
          <button onClick={() => go('checkout')} style={{ background: '#C8891F', color: '#0F1208', border: 'none', borderRadius: 2, padding: '10px 20px', fontSize: 12, fontWeight: 600, letterSpacing: '.10em', textTransform: 'uppercase', cursor: 'pointer', transition: 'background .2s' }}
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
        <div className="fi" style={{ position: 'fixed', inset: 0, background: '#0F1208', zIndex: 200, display: 'flex', flexDirection: 'column', padding: 40 }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 60 }}>
            <span style={{ fontSize: 22, fontFamily: "'Yeseva One',serif", color: '#EFE8D5' }}>TASTE &amp; SEE</span>
            <button onClick={() => setMobileOpen(false)} style={{ background: 'none', border: 'none', color: '#EFE8D5', cursor: 'pointer' }}>
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
            </button>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 28 }}>
            {[['events', 'Events'], ['experience', 'The Experience'], ['about', 'About'], ['auth', 'Tickets']].map(([page, label]) => (
              <button key={page} onClick={() => go(page)} style={{ background: 'none', border: 'none', fontSize: 36, fontFamily: "'Yeseva One',serif", color: '#EFE8D5', cursor: 'pointer', textAlign: 'left' }}>
                {label}
              </button>
            ))}
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
