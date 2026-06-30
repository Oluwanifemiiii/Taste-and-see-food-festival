import { useState, useEffect, useRef } from 'react'
import { fmt } from '../data/events'
import Footer from '../components/Footer'
import EventCard from '../components/EventCard'
import { useFestivalEvents } from '../hooks/useFestivalEvents'

const P = 'clamp(16px, 4vw, 48px)'   // horizontal page padding
const PY = 'clamp(60px, 10vh, 120px)' // vertical section padding

export default function Home({ onNav }) {
  const [counts, setCounts] = useState({ events: 0, groups: 0, revenue: 0 })
  const [email, setEmail] = useState('')
  const animated = useRef(false)
  const { events } = useFestivalEvents()

  useEffect(() => {
    if (animated.current) return
    animated.current = true
    const dur = 1800, t0 = performance.now()
    const run = (now) => {
      const p = Math.min(1, (now - t0) / dur)
      const e = 1 - Math.pow(1 - p, 3)
      setCounts({ events: Math.round(e * 26), groups: Math.round(e * 13), revenue: Math.round(e * 234) })
      if (p < 1) requestAnimationFrame(run)
    }
    const id = setTimeout(() => requestAnimationFrame(run), 800)
    return () => clearTimeout(id)
  }, [])

  return (
    <main>
      {/* HERO */}
      <section style={{ position: 'relative', width: '100%', height: '100vh', overflow: 'hidden', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <div className="photo" style={{ position: 'absolute', inset: 0 }}>
          <div className="photo-lbl">Nigerian food photography</div>
          <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to bottom,rgba(15,18,8,.2) 0%,rgba(15,18,8,.1) 35%,rgba(15,18,8,.88) 100%)' }} />
        </div>
        <div style={{ position: 'relative', zIndex: 2, textAlign: 'center', maxWidth: 960, padding: `0 ${P}`, width: '100%' }}>
          <p className="fu fu1" style={{ fontSize: 10, fontWeight: 600, letterSpacing: '.18em', textTransform: 'uppercase', color: '#C8891F', marginBottom: 20 }}>Lagos, Nigeria — Every Two Weeks</p>
          <div className="fu fu2 adire" style={{ width: 'min(240px, 60%)', margin: '0 auto 28px' }} />
          <h1 className="fu fu3" style={{ fontSize: 'clamp(40px, 7vw, 96px)', lineHeight: 1, fontFamily: "'Yeseva One',serif", color: '#EFE8D5', marginBottom: 24 }}>Eat. Remember. Return.</h1>
          <p className="fu fu4" style={{ fontSize: 'clamp(13px, 2vw, 15px)', lineHeight: 1.75, color: '#A89B80', maxWidth: 500, margin: '0 auto 48px' }}>Nigeria's premier culinary heritage festival, celebrating the food stories of every ethnic group, one dish at a time.</p>
          <div className="fu fu5 sm" style={{ display: 'flex', gap: 16, justifyContent: 'center', flexWrap: 'wrap' }}>
            <button onClick={() => onNav('checkout')}
              style={{ background: '#C8891F', color: '#0F1208', border: 'none', borderRadius: 2, padding: '16px 36px', fontSize: 12, fontWeight: 600, letterSpacing: '.10em', textTransform: 'uppercase', cursor: 'pointer' }}
              onMouseOver={e => e.currentTarget.style.background = '#B07A18'}
              onMouseOut={e => e.currentTarget.style.background = '#C8891F'}>
              Get Tickets →
            </button>
            <button onClick={() => onNav('events')}
              style={{ background: 'transparent', color: '#EFE8D5', border: '1px solid rgba(239,232,213,.5)', borderRadius: 2, padding: '16px 36px', fontSize: 12, fontWeight: 600, letterSpacing: '.10em', textTransform: 'uppercase', cursor: 'pointer' }}>
              View Upcoming Events
            </button>
          </div>
        </div>

        {/* Stat row */}
        <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', background: 'rgba(15,18,8,.7)', backdropFilter: 'blur(8px)', borderTop: '.5px solid #2A3020' }}>
          {[
            [counts.events, 'Events per year'],
            [counts.groups + (counts.groups >= 13 ? '+' : ''), 'Ethnic groups'],
            ['₦' + counts.revenue + 'M', 'Projected revenue'],
          ].map(([val, label], i) => (
            <div key={i} style={{ textAlign: 'center', padding: 'clamp(12px,2vh,20px) 8px', borderLeft: i > 0 ? '.5px solid #2A3020' : 'none' }}>
              <div style={{ fontSize: 'clamp(22px, 4vw, 44px)', lineHeight: 1, fontFamily: "'Yeseva One',serif", color: '#C8891F' }}>{val}</div>
              <div style={{ fontSize: 'clamp(9px, 2vw, 11px)', fontWeight: 500, letterSpacing: '.08em', textTransform: 'uppercase', color: '#A89B80', marginTop: 4 }}>{label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* TWO EXPERIENCES */}
      <section style={{ display: 'flex', flexWrap: 'wrap' }}>
        <div style={{ flex: 1, minWidth: 'min(300px, 100%)', background: '#1E2418', padding: `clamp(48px, 8vh, 80px) clamp(20px, 5vw, 60px)`, display: 'flex', flexDirection: 'column', justifyContent: 'center', borderBottom: '3px solid #C8891F' }}>
          <p style={{ fontSize: 10, fontWeight: 600, letterSpacing: '.18em', textTransform: 'uppercase', color: '#C8891F', marginBottom: 16 }}>Event Type A</p>
          <h2 style={{ fontSize: 'clamp(32px, 5vw, 46px)', lineHeight: 1.1, fontFamily: "'Yeseva One',serif", color: '#EFE8D5', marginBottom: 24 }}>Ethnic Food<br />Showcase</h2>
          <p style={{ fontSize: 15, lineHeight: 1.75, color: '#A89B80', maxWidth: 420, marginBottom: 32 }}>A rotating celebration of Nigeria's ethnic culinary heritage. Each event spotlights one group — Yoruba, Igbo, Hausa, Efik, Tiv, Ijaw — with authentic dishes, storytelling, and cultural performance.</p>
          <div style={{ display: 'flex', gap: 10, marginBottom: 40, flexWrap: 'wrap' }}>
            {['Yo', 'Ig', 'Ha', 'Ef', '+9'].map(t => (
              <div key={t} style={{ width: 40, height: 40, borderRadius: '50%', background: '#252C1A', border: '.5px solid #3D5030', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 11, fontWeight: 600, color: '#A89B80' }}>{t}</div>
            ))}
          </div>
          <button onClick={() => onNav('events')} style={{ background: 'none', border: 'none', color: '#C8891F', fontSize: 12, fontWeight: 600, letterSpacing: '.10em', textTransform: 'uppercase', cursor: 'pointer', textAlign: 'left', display: 'flex', alignItems: 'center', gap: 8 }}>Explore Events →</button>
        </div>
        <div style={{ flex: 1, minWidth: 'min(300px, 100%)', background: '#252C1A', padding: `clamp(48px, 8vh, 80px) clamp(20px, 5vw, 60px)`, display: 'flex', flexDirection: 'column', justifyContent: 'center', borderBottom: '3px solid #A33D21' }}>
          <p style={{ fontSize: 10, fontWeight: 600, letterSpacing: '.18em', textTransform: 'uppercase', color: '#A33D21', marginBottom: 16 }}>Event Type B</p>
          <h2 style={{ fontSize: 'clamp(32px, 5vw, 46px)', lineHeight: 1.1, fontFamily: "'Yeseva One',serif", color: '#EFE8D5', marginBottom: 24 }}>Old vs New</h2>
          <p style={{ fontSize: 15, lineHeight: 1.75, color: '#A89B80', maxWidth: 420, marginBottom: 32 }}>Traditional methods meet modern innovation. Pepper grinding. Pounded yam. Palm oil processing. Watch a conversation across generations unfold on the same table.</p>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 12, marginBottom: 40 }}>
            {['Pepper grinding — mortar vs blender', 'Pounded yam — pestle vs machine', 'Palm oil — old methods, new science'].map(t => (
              <div key={t} style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                <div style={{ width: 6, height: 6, borderRadius: '50%', background: '#A33D21', flexShrink: 0 }} />
                <span style={{ fontSize: 13, color: '#A89B80' }}>{t}</span>
              </div>
            ))}
          </div>
          <button onClick={() => onNav('events')} style={{ background: 'none', border: 'none', color: '#A33D21', fontSize: 12, fontWeight: 600, letterSpacing: '.10em', textTransform: 'uppercase', cursor: 'pointer', textAlign: 'left', display: 'flex', alignItems: 'center', gap: 8 }}>Explore Events →</button>
        </div>
      </section>

      <div className="adire" style={{ width: '100%', borderRadius: 0 }} />

      {/* UPCOMING EVENTS */}
      <section style={{ padding: `${PY} ${P}`, maxWidth: 1440, margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: 64 }}>
          <p style={{ fontSize: 10, fontWeight: 600, letterSpacing: '.18em', textTransform: 'uppercase', color: '#C8891F', marginBottom: 16 }}>Next Experiences</p>
          <div className="adire" style={{ width: 120, margin: '0 auto 20px' }} />
          <h2 style={{ fontSize: 'clamp(28px, 5vw, 48px)', fontFamily: "'Yeseva One',serif", color: '#EFE8D5' }}>Don't Miss What's Coming</h2>
        </div>
        <div style={{ display: 'flex', gap: 24, flexWrap: 'wrap' }}>
          {events.slice(0, 3).map(evt => (
            <EventCard key={evt.id} evt={evt} onNavigate={onNav} layout="compact" />
          ))}
        </div>
        <div style={{ textAlign: 'center', marginTop: 48 }}>
          <button onClick={() => onNav('events')} style={{ background: 'none', border: 'none', color: '#C8891F', fontSize: 12, fontWeight: 600, letterSpacing: '.10em', textTransform: 'uppercase', cursor: 'pointer', display: 'inline-flex', alignItems: 'center', gap: 8 }}>
            See All Upcoming Events →
          </button>
        </div>
      </section>

      <div className="adire" style={{ width: '100%', borderRadius: 0 }} />

      {/* PHILOSOPHY */}
      <section style={{ padding: `${PY} ${P}`, maxWidth: 1440, margin: '0 auto', display: 'flex', gap: 80, alignItems: 'flex-start', flexWrap: 'wrap' }}>
        <div style={{ flex: .6, minWidth: 'min(300px, 100%)' }}>
          <p style={{ fontSize: 10, fontWeight: 600, letterSpacing: '.18em', textTransform: 'uppercase', color: '#C8891F', marginBottom: 32 }}>Our Philosophy</p>
          <blockquote style={{ fontSize: 'clamp(26px, 4vw, 52px)', lineHeight: 1.15, fontFamily: "'Yeseva One',serif", color: '#EFE8D5' }}>"We don't just serve food.<br />We serve memory."</blockquote>
        </div>
        <div style={{ flex: .4, minWidth: 'min(260px, 100%)', paddingTop: 80 }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 28 }}>
            {['Rooted in real culinary tradition', 'Built for discovery and education', 'A platform for food entrepreneurs', 'A living archive of Nigerian food heritage'].map(t => (
              <div key={t} style={{ display: 'flex', gap: 16 }}>
                <div style={{ width: 8, height: 8, borderRadius: '50%', background: '#C8891F', flexShrink: 0, marginTop: 7 }} />
                <p style={{ fontSize: 15, lineHeight: 1.75, color: '#A89B80' }}>{t}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <div className="adire" style={{ width: '100%', borderRadius: 0 }} />

      {/* TICKET TIERS */}
      <section style={{ padding: `${PY} ${P}`, background: '#1E2418' }}>
        <div style={{ maxWidth: 1200, margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: 64 }}>
            <p style={{ fontSize: 10, fontWeight: 600, letterSpacing: '.18em', textTransform: 'uppercase', color: '#C8891F', marginBottom: 16 }}>Join the Experience</p>
            <h2 style={{ fontSize: 'clamp(28px, 5vw, 48px)', fontFamily: "'Yeseva One',serif", color: '#EFE8D5' }}>Choose Your Seat at the Table</h2>
          </div>
          <div style={{ display: 'flex', gap: 24, alignItems: 'stretch', flexWrap: 'wrap' }}>
            {/* Regular */}
            <div style={{ flex: 1, minWidth: 'min(240px, 100%)', background: '#0F1208', border: '.5px solid #2A3020', borderRadius: 12, padding: 40, display: 'flex', flexDirection: 'column' }}>
              <p style={{ fontSize: 10, fontWeight: 600, letterSpacing: '.18em', textTransform: 'uppercase', color: '#A89B80', marginBottom: 16 }}>Regular</p>
              <div style={{ fontSize: 52, lineHeight: 1, fontFamily: "'Yeseva One',serif", color: '#EFE8D5', marginBottom: 8 }}>₦5,000</div>
              <div className="adire" style={{ width: 60, margin: '20px 0' }} />
              <div style={{ display: 'flex', flexDirection: 'column', gap: 12, marginBottom: 40, flex: 1 }}>
                {['Festival entry', 'Food tasting — all stalls', 'Cultural performances'].map(f => (
                  <div key={f} style={{ display: 'flex', gap: 10 }}><span style={{ color: '#C8891F', marginTop: 1 }}>✓</span><span style={{ fontSize: 14, lineHeight: 1.6, color: '#A89B80' }}>{f}</span></div>
                ))}
              </div>
              <button onClick={() => onNav('checkout')} style={{ background: 'transparent', color: '#EFE8D5', border: '1px solid rgba(239,232,213,.4)', borderRadius: 2, padding: 14, fontSize: 12, fontWeight: 600, letterSpacing: '.10em', textTransform: 'uppercase', cursor: 'pointer', width: '100%' }}>Buy Regular Ticket</button>
            </div>
            {/* Premium */}
            <div className="tier-popular" style={{ flex: 1, minWidth: 'min(240px, 100%)', background: '#1E2418', border: '1px solid #C8891F', borderRadius: 12, padding: 40, display: 'flex', flexDirection: 'column', position: 'relative', transform: 'scale(1.04)' }}>
              <div style={{ position: 'absolute', top: -14, left: '50%', transform: 'translateX(-50%)', background: '#C8891F', color: '#0F1208', padding: '4px 20px', borderRadius: 20, fontSize: 10, fontWeight: 600, letterSpacing: '.12em', textTransform: 'uppercase', whiteSpace: 'nowrap' }}>Most Popular</div>
              <p style={{ fontSize: 10, fontWeight: 600, letterSpacing: '.18em', textTransform: 'uppercase', color: '#C8891F', marginBottom: 16 }}>Premium</p>
              <div style={{ fontSize: 52, lineHeight: 1, fontFamily: "'Yeseva One',serif", color: '#C8891F', marginBottom: 8 }}>₦15,000</div>
              <div className="adire" style={{ width: 60, margin: '20px 0' }} />
              <div style={{ display: 'flex', flexDirection: 'column', gap: 12, marginBottom: 40, flex: 1 }}>
                {['All Regular benefits', 'Reserved seating', 'Cooking demonstrations', 'Priority food access'].map(f => (
                  <div key={f} style={{ display: 'flex', gap: 10 }}><span style={{ color: '#C8891F', marginTop: 1 }}>✓</span><span style={{ fontSize: 14, lineHeight: 1.6, color: '#A89B80' }}>{f}</span></div>
                ))}
              </div>
              <button onClick={() => onNav('checkout')} style={{ background: '#C8891F', color: '#0F1208', border: 'none', borderRadius: 2, padding: 14, fontSize: 12, fontWeight: 600, letterSpacing: '.10em', textTransform: 'uppercase', cursor: 'pointer', width: '100%' }}>Buy Premium Ticket</button>
            </div>
            {/* VIP */}
            <div style={{ flex: 1, minWidth: 'min(240px, 100%)', background: '#221810', border: '1px solid #A33D21', borderRadius: 12, padding: 40, display: 'flex', flexDirection: 'column' }}>
              <p style={{ fontSize: 10, fontWeight: 600, letterSpacing: '.18em', textTransform: 'uppercase', color: '#A33D21', marginBottom: 16 }}>VIP Experience</p>
              <div style={{ fontSize: 52, lineHeight: 1, fontFamily: "'Yeseva One',serif", color: '#A33D21', marginBottom: 8 }}>₦50,000</div>
              <div className="adire" style={{ width: 60, margin: '20px 0' }} />
              <div style={{ display: 'flex', flexDirection: 'column', gap: 12, marginBottom: 40, flex: 1 }}>
                {['All Premium benefits', 'Private chef access', 'Exclusive masterclass', 'VIP lounge access', 'Gift bag from Lamide Foods'].map(f => (
                  <div key={f} style={{ display: 'flex', gap: 10 }}><span style={{ color: '#A33D21', marginTop: 1 }}>✓</span><span style={{ fontSize: 14, lineHeight: 1.6, color: '#A89B80' }}>{f}</span></div>
                ))}
              </div>
              <button onClick={() => onNav('checkout')} style={{ background: '#A33D21', color: '#EFE8D5', border: 'none', borderRadius: 2, padding: 14, fontSize: 12, fontWeight: 600, letterSpacing: '.10em', textTransform: 'uppercase', cursor: 'pointer', width: '100%' }}>Buy VIP Ticket</button>
            </div>
          </div>
        </div>
      </section>

      {/* NEWSLETTER */}
      <section style={{ padding: `clamp(60px, 10vh, 100px) ${P}`, background: '#0F1208', textAlign: 'center' }}>
        <h2 style={{ fontSize: 'clamp(22px, 4vw, 32px)', fontFamily: "'Yeseva One',serif", color: '#EFE8D5', marginBottom: 8 }}>Be First to Know</h2>
        <p style={{ fontSize: 15, color: '#A89B80', marginBottom: 40 }}>New events, featured chefs, limited tickets — straight to your inbox.</p>
        <div className="newsletter-row" style={{ display: 'flex', maxWidth: 460, margin: '0 auto 48px' }}>
          <input type="email" placeholder="your@email.com" value={email} onChange={e => setEmail(e.target.value)}
            style={{ flex: 1, background: '#1E2418', border: '.5px solid #3D5030', borderRight: 'none', borderRadius: '2px 0 0 2px', padding: '14px 18px', color: '#EFE8D5', fontSize: 14, outline: 'none', minWidth: 0 }} />
          <button style={{ background: '#C8891F', color: '#0F1208', border: 'none', borderRadius: '0 2px 2px 0', padding: '14px 24px', fontSize: 12, fontWeight: 600, letterSpacing: '.10em', textTransform: 'uppercase', cursor: 'pointer', whiteSpace: 'nowrap', flexShrink: 0 }}>Notify Me</button>
        </div>
        <div style={{ display: 'flex', justifyContent: 'center', gap: 24 }}>
          <a href="#" className="nav-lnk" style={{ color: '#A89B80' }}><svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"/><circle cx="12" cy="12" r="4"/><circle cx="17.5" cy="6.5" r="1" fill="currentColor"/></svg></a>
          <a href="#" className="nav-lnk" style={{ color: '#A89B80' }}><svg width="18" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-2.88 2.5 2.89 2.89 0 0 1-2.89-2.89 2.89 2.89 0 0 1 2.89-2.89c.28 0 .54.04.79.1V9.01a6.33 6.33 0 0 0-.79-.05 6.34 6.34 0 0 0-6.34 6.34 6.34 6.34 0 0 0 6.34 6.34 6.34 6.34 0 0 0 6.33-6.34V8.93a8.18 8.18 0 0 0 4.78 1.52V7.01a4.85 4.85 0 0 1-1.01-.32z"/></svg></a>
          <a href="#" className="nav-lnk" style={{ color: '#A89B80' }}><svg width="22" height="16" viewBox="0 0 24 17" fill="currentColor"><path d="M23.5 2.7A3 3 0 0 0 21.4.6C19.5 0 12 0 12 0S4.5 0 2.6.6A3 3 0 0 0 .5 2.7C0 4.6 0 8.5 0 8.5s0 3.9.5 5.8a3 3 0 0 0 2.1 2.1c1.9.5 9.4.5 9.4.5s7.5 0 9.4-.5a3 3 0 0 0 2.1-2.1C24 12.4 24 8.5 24 8.5s0-3.9-.5-5.8zM9.7 12V5l6.3 3.5L9.7 12z"/></svg></a>
        </div>
      </section>

      <Footer onNav={onNav} />
    </main>
  )
}
