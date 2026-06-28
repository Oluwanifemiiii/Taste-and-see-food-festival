import { fmt } from '../data/events'

export default function EventCard({ evt, onNavigate, layout = 'grid' }) {
  const badgeBg = evt.type === 'A' ? '#C8891F' : '#A33D21'

  if (layout === 'compact') {
    return (
      <div className="hov-card" onClick={() => onNavigate('event-detail', evt.id)}
        style={{ flex: 1, minWidth: 280, background: '#1E2418', border: '.5px solid #2A3020', borderRadius: 12, overflow: 'hidden', display: 'flex', flexDirection: 'column', cursor: 'pointer' }}>
        <div className="photo" style={{ aspectRatio: '16/9', position: 'relative' }}>
          <div className="photo-lbl">Event photography</div>
          <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to bottom,transparent 50%,rgba(15,18,8,.65) 100%)' }} />
          <div style={{ position: 'absolute', top: 12, left: 12, background: badgeBg, color: '#0F1208', padding: '4px 10px', borderRadius: 2, fontSize: 10, fontWeight: 600, letterSpacing: '.10em', textTransform: 'uppercase', zIndex: 1 }}>
            {evt.type === 'A' ? 'Ethnic Showcase' : 'Old vs New'}
          </div>
        </div>
        <div style={{ padding: 24, display: 'flex', flexDirection: 'column', gap: 12, flex: 1 }}>
          <div style={{ display: 'inline-flex', padding: '4px 12px', border: '.5px solid #C8891F', borderRadius: 20, width: 'fit-content' }}>
            <span style={{ fontSize: 10, fontWeight: 600, letterSpacing: '.10em', textTransform: 'uppercase', color: '#C8891F' }}>
              {evt.ethnic || 'Multi-Ethnic'}
            </span>
          </div>
          <h3 style={{ fontSize: 20, fontFamily: "'Yeseva One',serif", color: '#EFE8D5', lineHeight: 1.3 }}>{evt.title}</h3>
          <p style={{ fontSize: 13, color: '#A89B80' }}>{evt.date} · {evt.shortLoc}</p>
          <div style={{ display: 'flex', gap: 20, padding: '12px 0', borderTop: '.5px solid #2A3020', borderBottom: '.5px solid #2A3020' }}>
            {[['Regular', evt.prices.regular, '#EFE8D5'], ['Premium', evt.prices.premium, '#C8891F'], ['VIP', evt.prices.vip, '#EFE8D5']].map(([label, price, color]) => (
              <div key={label}>
                <div style={{ fontSize: 10, textTransform: 'uppercase', letterSpacing: '.08em', color: '#A89B80', marginBottom: 4 }}>{label}</div>
                <div style={{ fontSize: 15, fontFamily: "'Yeseva One',serif", color }}>{fmt(price)}</div>
              </div>
            ))}
          </div>
          <button onClick={e => { e.stopPropagation(); onNavigate('checkout', evt.id) }}
            style={{ background: 'transparent', color: '#EFE8D5', border: '1px solid rgba(239,232,213,.4)', borderRadius: 2, padding: '12px 20px', fontSize: 12, fontWeight: 600, letterSpacing: '.10em', textTransform: 'uppercase', cursor: 'pointer', width: '100%', transition: 'all .2s', marginTop: 'auto' }}
            onMouseOver={e => e.currentTarget.style.borderColor = '#EFE8D5'}
            onMouseOut={e => e.currentTarget.style.borderColor = 'rgba(239,232,213,.4)'}>
            Register Now
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="hov-card" onClick={() => onNavigate('event-detail', evt.id)}
      style={{ background: '#1E2418', border: '.5px solid #2A3020', borderRadius: 12, overflow: 'hidden', cursor: 'pointer' }}>
      <div className="photo" style={{ aspectRatio: '16/9', position: 'relative' }}>
        <div className="photo-lbl">Event photography</div>
        <div style={{ position: 'absolute', top: 12, left: 12, background: badgeBg, color: '#0F1208', padding: '4px 10px', borderRadius: 2, fontSize: 10, fontWeight: 600, letterSpacing: '.10em', textTransform: 'uppercase', zIndex: 1 }}>
          {evt.type === 'A' ? 'Ethnic Showcase' : 'Old vs New'}
        </div>
        <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, background: 'linear-gradient(transparent,rgba(15,18,8,.6))', padding: '20px 16px 12px' }}>
          <p style={{ fontSize: 11, fontWeight: 500, letterSpacing: '.1em', color: '#A89B80', textTransform: 'uppercase' }}>{evt.date}</p>
        </div>
      </div>
      <div style={{ padding: 24 }}>
        <div style={{ display: 'inline-flex', padding: '4px 12px', border: '.5px solid #C8891F', borderRadius: 20, marginBottom: 12 }}>
          <span style={{ fontSize: 10, fontWeight: 600, letterSpacing: '.10em', textTransform: 'uppercase', color: '#C8891F' }}>
            {evt.ethnic || 'Multi-Ethnic'}
          </span>
        </div>
        <h3 style={{ fontSize: 22, fontFamily: "'Yeseva One',serif", color: '#EFE8D5', marginBottom: 10, lineHeight: 1.3 }}>{evt.title}</h3>
        <p style={{ fontSize: 13, lineHeight: 1.6, color: '#A89B80', marginBottom: 20 }}>{evt.desc}</p>
        <div style={{ display: 'flex', gap: 20, padding: '14px 0', borderTop: '.5px solid #2A3020', borderBottom: '.5px solid #2A3020', marginBottom: 16 }}>
          {[['Regular', evt.prices.regular, '#EFE8D5'], ['Premium', evt.prices.premium, '#C8891F'], ['VIP', evt.prices.vip, '#EFE8D5']].map(([label, price, color]) => (
            <div key={label}>
              <div style={{ fontSize: 10, textTransform: 'uppercase', letterSpacing: '.08em', color: '#A89B80', marginBottom: 4 }}>{label}</div>
              <div style={{ fontSize: 15, fontFamily: "'Yeseva One',serif", color }}>{fmt(price)}</div>
            </div>
          ))}
        </div>
        <button onClick={e => { e.stopPropagation(); onNavigate('checkout', evt.id) }}
          style={{ background: '#C8891F', color: '#0F1208', border: 'none', borderRadius: 2, padding: '12px 24px', fontSize: 12, fontWeight: 600, letterSpacing: '.10em', textTransform: 'uppercase', cursor: 'pointer', width: '100%' }}>
          Register →
        </button>
      </div>
    </div>
  )
}
