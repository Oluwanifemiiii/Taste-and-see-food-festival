export default function Footer({ onNav }) {
  return (
    <footer style={{ background: '#0F1208', borderTop: '.5px solid #2A3020', padding: '60px 48px 0' }}>
      <div style={{ maxWidth: 1440, margin: '0 auto' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 48, flexWrap: 'wrap', gap: 32 }}>
          <div>
            <div style={{ fontSize: 22, fontFamily: "'Yeseva One',serif", color: '#EFE8D5', marginBottom: 4 }}>TASTE &amp; SEE</div>
            <div style={{ fontSize: 9, fontWeight: 600, letterSpacing: '.22em', textTransform: 'uppercase', color: '#C8891F' }}>FESTIVAL BY LAMIDE FOODS</div>
          </div>
          <div style={{ display: 'flex', gap: 28, flexWrap: 'wrap', alignItems: 'center' }}>
            {[
              ['events', 'Events'],
              ['business', 'Masterclasses'],
              ['business', 'Vendor Booths'],
              ['business', 'Sponsors'],
              ['business', 'Merchandise'],
              ['legal', 'Terms & Privacy'],
            ].map(([page, label], i) => (
              <button key={i} onClick={() => onNav(page)} className="nav-lnk"
                style={{ background: 'none', border: 'none', fontSize: 13, color: '#A89B80', cursor: 'pointer', transition: 'color .2s' }}>
                {label}
              </button>
            ))}
          </div>
          <div style={{ display: 'flex', gap: 16, alignItems: 'center' }}>
            <button onClick={() => onNav('admin')} className="nav-lnk"
              style={{ background: 'none', border: 'none', fontSize: 10, fontWeight: 600, letterSpacing: '.12em', textTransform: 'uppercase', color: '#3D5030', cursor: 'pointer', transition: 'color .2s' }}>
              Admin Portal →
            </button>
            <button onClick={() => onNav('accounts')} className="nav-lnk"
              style={{ background: 'none', border: 'none', fontSize: 10, fontWeight: 600, letterSpacing: '.12em', textTransform: 'uppercase', color: '#3D5030', cursor: 'pointer', transition: 'color .2s' }}>
              Accounts →
            </button>
          </div>
        </div>
        <div style={{ borderTop: '.5px solid #2A3020', padding: '20px 0' }}>
          <p style={{ fontSize: 11, color: '#4A5C3E', letterSpacing: '.05em' }}>© 2026 Lamide Foods. All Rights Reserved.</p>
        </div>
      </div>
      <div className="adire" style={{ width: '100%', borderRadius: 0 }} />
    </footer>
  )
}
