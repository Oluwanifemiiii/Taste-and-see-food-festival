import { useState } from 'react'
import { fmt, PRICE_MAP, TICKET_TIERS } from '../data/events'
import { getEventById, useFestivalEvents } from '../hooks/useFestivalEvents'

const P = 'clamp(16px, 4vw, 48px)'

export default function EventDetail({ eventId, onNav }) {
  const { events } = useFestivalEvents()
  const evt = getEventById(events, eventId)
  const [selected, setSelected] = useState('premium')
  const [qty, setQty] = useState(1)

  const total = TICKET_TIERS[selected].price * qty

  const tkStyle = (key) => ({
    padding: 16, borderRadius: 8, cursor: 'pointer',
    border: `1px solid ${selected === key ? (key === 'vip' ? '#A33D21' : '#C8891F') : '#2A3020'}`,
    background: key === 'vip' ? '#221810' : 'transparent',
    transition: 'border-color .2s',
    display: 'flex', alignItems: 'center', justifyContent: 'space-between',
  })

  return (
    <main style={{ minHeight: '100vh', background: '#0F1208' }}>
      {/* Hero banner */}
      <div className="photo" style={{ height: 'clamp(280px, 45vw, 440px)', position: 'relative', paddingTop: 72, ...(evt.image_url ? { backgroundImage: `url(${evt.image_url})`, backgroundSize: 'cover', backgroundPosition: 'center' } : {}) }}>
        {!evt.image_url && <div className="photo-lbl">Event photography</div>}
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to bottom,rgba(15,18,8,.25) 0%,rgba(15,18,8,.75) 100%)' }} />
        <div className="evt-hero-text" style={{ position: 'absolute', bottom: 48, left: P, right: P }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 16, flexWrap: 'wrap' }}>
            <button onClick={() => onNav('events')} className="nav-lnk"
              style={{ background: 'none', border: 'none', color: '#A89B80', fontSize: 12, letterSpacing: '.08em', textTransform: 'uppercase', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 6 }}>
              ← All Events
            </button>
            <span style={{ color: '#3D5030' }}>·</span>
            <span style={{ fontSize: 10, fontWeight: 600, letterSpacing: '.18em', textTransform: 'uppercase', color: '#C8891F' }}>
              {evt.type === 'A' ? 'Ethnic Showcase' : 'Old vs New'}
            </span>
          </div>
          <h1 style={{ fontSize: 'clamp(28px, 5vw, 56px)', fontFamily: "'Yeseva One',serif", color: '#EFE8D5', marginBottom: 16, lineHeight: 1.1 }}>{evt.title}</h1>
          <p style={{ fontSize: 14, color: '#A89B80' }}>{evt.date} · {evt.time} · {evt.location}</p>
        </div>
      </div>

      <div style={{ maxWidth: 1300, margin: '0 auto', padding: `clamp(40px, 6vh, 60px) ${P}`, display: 'flex', gap: 48, alignItems: 'flex-start', flexWrap: 'wrap' }}>
        {/* Main content */}
        <div style={{ flex: .6, minWidth: 'min(300px, 100%)' }}>
          <div className="adire" style={{ width: '100%', marginBottom: 40, borderRadius: 0 }} />
          <h2 style={{ fontSize: 24, fontFamily: "'Yeseva One',serif", color: '#EFE8D5', marginBottom: 16 }}>About This Event</h2>
          <p style={{ fontSize: 15, lineHeight: 1.75, color: '#A89B80', marginBottom: 48 }}>{evt.desc}</p>

          <h3 style={{ fontSize: 20, fontFamily: "'Yeseva One',serif", color: '#EFE8D5', marginBottom: 20 }}>Featured Dishes</h3>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2,1fr)', gap: 12, marginBottom: 48 }} className="col1">
            {evt.dishes.map(d => (
              <div key={d} style={{ background: '#1E2418', border: '.5px solid #2A3020', borderRadius: 8, padding: 16, borderLeft: '3px solid #C8891F' }}>
                <p style={{ fontSize: 13, fontWeight: 600, color: '#EFE8D5' }}>{d}</p>
              </div>
            ))}
          </div>

          <h3 style={{ fontSize: 20, fontFamily: "'Yeseva One',serif", color: '#EFE8D5', marginBottom: 20 }}>What to Expect</h3>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2,1fr)', gap: 12, marginBottom: 48 }} className="col1">
            {[['🍽', 'Food Tasting'], ['👨‍🍳', 'Live Demonstrations'], ['🥁', 'Cultural Performances'], ['🛒', 'Artisan Marketplace']].map(([icon, label]) => (
              <div key={label} style={{ background: '#1E2418', border: '.5px solid #2A3020', borderRadius: 8, padding: 16, display: 'flex', alignItems: 'center', gap: 12 }}>
                <span style={{ fontSize: 20 }}>{icon}</span>
                <span style={{ fontSize: 13, color: '#A89B80' }}>{label}</span>
              </div>
            ))}
          </div>

          <h3 style={{ fontSize: 20, fontFamily: "'Yeseva One',serif", color: '#EFE8D5', marginBottom: 16 }}>Location</h3>
          <div style={{ background: '#1E2418', border: '.5px solid #2A3020', borderRadius: 8, height: 200, position: 'relative', overflow: 'hidden', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <div style={{ position: 'absolute', inset: 0, background: 'repeating-linear-gradient(0deg,transparent,transparent 29px,rgba(61,80,48,.2) 29px,rgba(61,80,48,.2) 30px),repeating-linear-gradient(90deg,transparent,transparent 29px,rgba(61,80,48,.2) 29px,rgba(61,80,48,.2) 30px)' }} />
            <div style={{ position: 'relative', textAlign: 'center' }}>
              <div style={{ width: 22, height: 22, borderRadius: '50%', background: '#C8891F', margin: '0 auto 8px' }} />
              <p style={{ fontSize: 13, fontWeight: 600, color: '#EFE8D5' }}>{evt.location}</p>
              <p style={{ fontSize: 11, color: '#A89B80', marginTop: 4 }}>Lagos, Nigeria</p>
            </div>
          </div>
        </div>

        {/* Ticket sidebar */}
        <div style={{ flex: .4, minWidth: 'min(300px, 100%)', position: 'sticky', top: 88, width: '100%' }}>
          <div style={{ background: '#1E2418', border: '.5px solid #2A3020', borderRadius: 12, padding: 28 }}>
            <div style={{ paddingBottom: 18, borderBottom: '.5px solid #2A3020', marginBottom: 18 }}>
              <p style={{ fontSize: 11, fontWeight: 600, letterSpacing: '.12em', textTransform: 'uppercase', color: '#A89B80', marginBottom: 6 }}>{evt.date}</p>
              <p style={{ fontSize: 13, color: '#A89B80' }}>{evt.time} · {evt.location}</p>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: 10, marginBottom: 18 }}>
              <div onClick={() => setSelected('regular')} style={tkStyle('regular')}>
                <div>
                  <p style={{ fontSize: 13, fontWeight: 600, color: '#EFE8D5', marginBottom: 3 }}>Regular</p>
                  <p style={{ fontSize: 11, color: '#A89B80' }}>Entry + food tasting</p>
                </div>
                <span style={{ fontSize: 17, fontFamily: "'Yeseva One',serif", color: '#EFE8D5' }}>{fmt(TICKET_TIERS.regular.price)}</span>
              </div>
              <div onClick={() => setSelected('premium')} style={tkStyle('premium')}>
                <div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 3 }}>
                    <p style={{ fontSize: 13, fontWeight: 600, color: '#EFE8D5' }}>Premium</p>
                    <span style={{ background: '#C8891F', color: '#0F1208', padding: '2px 8px', borderRadius: 20, fontSize: 9, fontWeight: 600, letterSpacing: '.08em', textTransform: 'uppercase' }}>Popular</span>
                  </div>
                  <p style={{ fontSize: 11, color: '#A89B80' }}>Reserved seating + demos</p>
                </div>
                <span style={{ fontSize: 17, fontFamily: "'Yeseva One',serif", color: '#C8891F' }}>{fmt(TICKET_TIERS.premium.price)}</span>
              </div>
              <div onClick={() => setSelected('vip')} style={tkStyle('vip')}>
                <div>
                  <p style={{ fontSize: 13, fontWeight: 600, color: '#EFE8D5', marginBottom: 3 }}>VIP Experience</p>
                  <p style={{ fontSize: 11, color: '#A89B80' }}>Chef access + lounge</p>
                </div>
                <span style={{ fontSize: 17, fontFamily: "'Yeseva One',serif", color: '#A33D21' }}>{fmt(TICKET_TIERS.vip.price)}</span>
              </div>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 14 }}>
              <span style={{ fontSize: 11, fontWeight: 600, letterSpacing: '.10em', textTransform: 'uppercase', color: '#A89B80', flex: 1 }}>Quantity</span>
              <div style={{ display: 'flex', alignItems: 'center', background: '#252C1A', border: '.5px solid #3D5030', borderRadius: 4, overflow: 'hidden' }}>
                <button onClick={() => setQty(q => Math.max(1, q - 1))} style={{ background: 'none', border: 'none', color: '#A89B80', cursor: 'pointer', padding: '8px 14px', fontSize: 18, lineHeight: 1 }}>−</button>
                <span style={{ fontSize: 15, color: '#EFE8D5', minWidth: 28, textAlign: 'center', fontWeight: 600 }}>{qty}</span>
                <button onClick={() => setQty(q => Math.min(10, q + 1))} style={{ background: 'none', border: 'none', color: '#A89B80', cursor: 'pointer', padding: '8px 14px', fontSize: 18, lineHeight: 1 }}>+</button>
              </div>
            </div>
            <p style={{ fontSize: 11, color: '#A89B80', marginBottom: 14 }}>Price inclusive of applicable taxes.</p>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '14px 0', borderTop: '.5px solid #2A3020', borderBottom: '.5px solid #2A3020', marginBottom: 18 }}>
              <span style={{ fontSize: 13, color: '#A89B80' }}>Total</span>
              <span style={{ fontSize: 24, fontFamily: "'Yeseva One',serif", color: '#C8891F' }}>{fmt(total)}</span>
            </div>
            <button onClick={() => onNav('checkout', eventId, selected, qty)}
              style={{ width: '100%', background: '#C8891F', color: '#0F1208', border: 'none', borderRadius: 2, padding: 16, fontSize: 12, fontWeight: 600, letterSpacing: '.10em', textTransform: 'uppercase', cursor: 'pointer', marginBottom: 14 }}>
              Proceed to Payment →
            </button>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6, marginBottom: 10 }}>
              <svg width="12" height="14" viewBox="0 0 24 24" fill="none" stroke="#A89B80" strokeWidth="1.5"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>
              <span style={{ fontSize: 11, color: '#A89B80' }}>Secured by Paystack</span>
            </div>
            <p style={{ textAlign: 'center', fontSize: 11 }}>
              <button className="nav-lnk" style={{ background: 'none', border: 'none', color: '#A89B80', cursor: 'pointer', fontSize: 11, transition: 'color .2s' }}>Questions? Contact us</button>
            </p>
          </div>
        </div>
      </div>
    </main>
  )
}
