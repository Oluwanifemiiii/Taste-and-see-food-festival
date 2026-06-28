import { EVENTS } from '../data/events'

export default function Ticket({ eventId, ticketType, onNav }) {
  const evt = EVENTS.find(e => e.id === eventId) || EVENTS[0]
  const ticketLabel = { regular: 'Regular', premium: 'Premium', vip: 'VIP Experience' }[ticketType || 'premium']

  return (
    <main style={{ minHeight: '100vh', background: '#0F1208', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '80px 20px' }}>
      <div style={{ width: '100%', maxWidth: 480 }}>
        <div style={{ background: '#1E2418', border: '1px solid #C8891F', borderRadius: 16, overflow: 'hidden', boxShadow: '0 0 80px rgba(200,137,31,.12)' }}>
          {/* Header */}
          <div style={{ padding: '28px 32px', textAlign: 'center' }}>
            <div style={{ fontSize: 20, fontFamily: "'Yeseva One',serif", color: '#EFE8D5', letterSpacing: '.05em', marginBottom: 4 }}>TASTE &amp; SEE</div>
            <div style={{ fontSize: 9, fontWeight: 600, letterSpacing: '.22em', textTransform: 'uppercase', color: '#C8891F' }}>FESTIVAL — LAMIDE FOODS</div>
          </div>

          {/* Adire divider with punch holes */}
          <div className="adire" style={{ borderRadius: 0, position: 'relative' }}>
            <div style={{ position: 'absolute', left: -8, top: '50%', transform: 'translateY(-50%)', width: 16, height: 16, borderRadius: '50%', background: '#0F1208' }} />
            <div style={{ position: 'absolute', right: -8, top: '50%', transform: 'translateY(-50%)', width: 16, height: 16, borderRadius: '50%', background: '#0F1208' }} />
          </div>

          {/* Ticket body */}
          <div style={{ padding: '28px 32px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 20 }}>
              <div>
                <h2 style={{ fontSize: 22, fontFamily: "'Yeseva One',serif", color: '#EFE8D5', lineHeight: 1.2, marginBottom: 8 }}>{evt.title}</h2>
                <div style={{ display: 'inline-flex', padding: '3px 10px', border: '.5px solid #C8891F', borderRadius: 20 }}>
                  <span style={{ fontSize: 10, fontWeight: 600, letterSpacing: '.10em', textTransform: 'uppercase', color: '#C8891F' }}>{evt.ethnic || 'Multi-Ethnic'}</span>
                </div>
              </div>
              <div style={{ background: '#252C1A', border: '.5px solid #3D5030', borderRadius: 4, padding: '6px 12px', textAlign: 'center' }}>
                <div style={{ fontSize: 10, fontWeight: 600, letterSpacing: '.12em', textTransform: 'uppercase', color: '#C8891F' }}>{ticketLabel}</div>
              </div>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14, marginBottom: 20, padding: 16, background: '#252C1A', borderRadius: 8, border: '.5px solid #2A3020' }}>
              {[['Date', evt.date], ['Time', evt.time], ['Location', evt.shortLoc], ['Attendee', 'Adaeze Okonkwo']].map(([k, v]) => (
                <div key={k}>
                  <p style={{ fontSize: 10, fontWeight: 600, letterSpacing: '.12em', textTransform: 'uppercase', color: '#A89B80', marginBottom: 4 }}>{k}</p>
                  <p style={{ fontSize: 13, color: '#EFE8D5' }}>{v}</p>
                </div>
              ))}
            </div>

            <p style={{ fontSize: 10, fontWeight: 600, letterSpacing: '.12em', textTransform: 'uppercase', color: '#A89B80', marginBottom: 6 }}>Ticket ID</p>
            <p style={{ fontFamily: 'monospace', fontSize: 13, color: '#C8891F', letterSpacing: '.08em', marginBottom: 24 }}>TSF-2025-YHT-001847</p>

            {/* QR code placeholder */}
            <div style={{ display: 'flex', justifyContent: 'center', marginBottom: 24 }}>
              <svg width="160" height="160" viewBox="0 0 160 160" xmlns="http://www.w3.org/2000/svg">
                <rect width="160" height="160" fill="#252C1A" rx="6"/>
                <rect x="16" y="16" width="44" height="44" fill="#3D5030" rx="3"/>
                <rect x="22" y="22" width="32" height="32" fill="#252C1A" rx="2"/>
                <rect x="28" y="28" width="20" height="20" fill="#C8891F" rx="1"/>
                <rect x="100" y="16" width="44" height="44" fill="#3D5030" rx="3"/>
                <rect x="106" y="22" width="32" height="32" fill="#252C1A" rx="2"/>
                <rect x="112" y="28" width="20" height="20" fill="#C8891F" rx="1"/>
                <rect x="16" y="100" width="44" height="44" fill="#3D5030" rx="3"/>
                <rect x="22" y="106" width="32" height="32" fill="#252C1A" rx="2"/>
                <rect x="28" y="112" width="20" height="20" fill="#C8891F" rx="1"/>
                <rect x="72" y="20" width="6" height="6" fill="#3D5030"/>
                <rect x="82" y="20" width="6" height="6" fill="#3D5030"/>
                <rect x="72" y="30" width="6" height="6" fill="#3D5030"/>
                <rect x="72" y="72" width="16" height="16" fill="#3D5030" rx="2"/>
                <rect x="76" y="76" width="8" height="8" fill="#252C1A"/>
                <rect x="100" y="74" width="6" height="6" fill="#3D5030"/>
                <rect x="110" y="74" width="6" height="6" fill="#3D5030"/>
                <rect x="120" y="74" width="6" height="6" fill="#3D5030"/>
                <rect x="100" y="84" width="6" height="6" fill="#3D5030"/>
                <rect x="110" y="94" width="6" height="6" fill="#3D5030"/>
                <rect x="20" y="74" width="6" height="6" fill="#3D5030"/>
                <rect x="34" y="84" width="6" height="6" fill="#3D5030"/>
                <rect x="48" y="74" width="6" height="6" fill="#3D5030"/>
                <rect x="56" y="84" width="6" height="6" fill="#3D5030"/>
              </svg>
            </div>

            <div className="adire" style={{ borderRadius: 0, margin: '0 -32px' }} />
          </div>

          {/* Footer */}
          <div style={{ padding: '16px 32px', background: '#161C10', textAlign: 'center' }}>
            <p style={{ fontSize: 11, color: '#A89B80', letterSpacing: '.08em', marginBottom: 4 }}>Present this ticket at the gate</p>
            <p style={{ fontSize: 10, fontWeight: 600, letterSpacing: '.15em', textTransform: 'uppercase', color: '#4A5C3E' }}>Lamide Foods</p>
          </div>
        </div>

        {/* Action buttons */}
        <div style={{ display: 'flex', gap: 12, marginTop: 24, justifyContent: 'center' }}>
          {['Download PDF', 'Share', 'Add to Wallet'].map(label => (
            <button key={label} style={{ background: '#1E2418', color: '#EFE8D5', border: '.5px solid #3D5030', borderRadius: 2, padding: '12px 20px', fontSize: 12, fontWeight: 600, letterSpacing: '.10em', textTransform: 'uppercase', cursor: 'pointer' }}>
              {label}
            </button>
          ))}
        </div>
        <div style={{ textAlign: 'center', marginTop: 16 }}>
          <button onClick={() => onNav('home')} className="nav-lnk" style={{ background: 'none', border: 'none', color: '#A89B80', cursor: 'pointer', fontSize: 13, transition: 'color .2s' }}>← Back to Home</button>
        </div>
      </div>
    </main>
  )
}
