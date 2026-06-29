import Footer from '../components/Footer'

const P = 'clamp(16px, 4vw, 48px)'
const PY = 'clamp(60px, 10vh, 100px)'

const TEAM = [
  { name: 'Lamide Adeyemi', role: 'Founder & Director', bio: 'Chef, food historian, and the creative force behind Lamide Foods since 2019.' },
  { name: 'Emeka Okafor', role: 'Programme Director', bio: 'Oversees curation, custodian relationships, and the ethnic group research programme.' },
  { name: 'Chisom Nwosu', role: 'Head of Experience', bio: 'Designs every guest touchpoint from arrival to the final plate. The atmosphere is her craft.' },
  { name: 'Aisha Garba', role: 'Vendor & Partnerships', bio: 'Sources, vets, and supports every artisan and food entrepreneur in the marketplace.' },
]

export default function About({ onNav }) {
  return (
    <main style={{ minHeight: '100vh', background: '#0F1208' }}>
      {/* Manifesto hero */}
      <section style={{ minHeight: '75vh', display: 'flex', alignItems: 'center', padding: `clamp(100px,14vh,140px) ${P} clamp(60px,8vh,100px)`, position: 'relative', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(ellipse at 65% 50%,rgba(200,137,31,.06) 0%,transparent 65%)' }} />
        <div style={{ maxWidth: 960, position: 'relative', zIndex: 1 }}>
          <div className="adire" style={{ width: 80, marginBottom: 32, borderRadius: 3 }} />
          <h1 style={{ fontSize: 'clamp(28px, 5.5vw, 72px)', fontFamily: "'Yeseva One',serif", color: '#EFE8D5', lineHeight: 1.1, marginBottom: 40 }}>
            Nigeria has more than 250 ethnic groups.<br />
            <span style={{ color: '#C8891F' }}>Each one has a table<br />worth gathering around.</span>
          </h1>
          <p style={{ fontSize: 'clamp(14px, 2vw, 17px)', lineHeight: 1.8, color: '#A89B80', maxWidth: 560 }}>We built the Taste &amp; See Festival to make sure those tables are never empty, never forgotten, and never reduced to a footnote in someone else's food story.</p>
        </div>
      </section>

      <div className="adire" style={{ width: '100%', borderRadius: 0 }} />

      {/* About Lamide Foods */}
      <section style={{ padding: `${PY} ${P}`, maxWidth: 1440, margin: '0 auto', display: 'flex', gap: 80, alignItems: 'flex-start', flexWrap: 'wrap' }}>
        <div style={{ flex: .42, minWidth: 'min(260px, 100%)' }}>
          <div className="photo" style={{ aspectRatio: '3/4', borderRadius: 4, overflow: 'hidden' }}>
            <div className="photo-lbl">Lamide Foods</div>
          </div>
        </div>
        <div style={{ flex: .58, minWidth: 'min(280px, 100%)' }}>
          <p style={{ fontSize: 10, fontWeight: 600, letterSpacing: '.18em', textTransform: 'uppercase', color: '#C8891F', marginBottom: 20 }}>The Organisation</p>
          <h2 style={{ fontSize: 'clamp(28px, 4vw, 40px)', fontFamily: "'Yeseva One',serif", color: '#EFE8D5', marginBottom: 24, lineHeight: 1.1 }}>About Lamide Foods</h2>
          <p style={{ fontSize: 15, lineHeight: 1.8, color: '#A89B80', marginBottom: 20 }}>Founded in Lagos in 2019, Lamide Foods began as a catering company with one conviction: that authentic Nigerian cuisine deserved the same care and elevation that fine dining accorded to French, Japanese, or Italian food.</p>
          <p style={{ fontSize: 15, lineHeight: 1.8, color: '#A89B80', marginBottom: 20 }}>What started as private dinners for discerning Lagos clients grew into something larger — a cultural mission to document, celebrate, and preserve the culinary heritage of Nigeria's many peoples before it slips away into convenience and forgetting.</p>
          <p style={{ fontSize: 15, lineHeight: 1.8, color: '#A89B80', marginBottom: 44 }}>The Taste &amp; See Festival was born from a simple question: if we don't celebrate this food, who will?</p>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 24, padding: 'clamp(20px, 4vw, 32px)', background: '#1E2418', border: '.5px solid #2A3020', borderRadius: 12 }}>
            {[['2019', 'Founded in Lagos'], ['250+', 'Ethnic groups in Nigeria'], ['26', 'Festival events annually'], ['13+', 'Ethnic groups featured']].map(([n, label]) => (
              <div key={label}>
                <p style={{ fontSize: 'clamp(24px, 4vw, 32px)', fontFamily: "'Yeseva One',serif", color: '#C8891F', marginBottom: 6 }}>{n}</p>
                <p style={{ fontSize: 12, color: '#A89B80', letterSpacing: '.05em' }}>{label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <div className="adire" style={{ width: '100%', borderRadius: 0 }} />

      {/* Mission pillars */}
      <section style={{ padding: `${PY} ${P}`, background: '#1E2418' }}>
        <div style={{ maxWidth: 1200, margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: 64 }}>
            <p style={{ fontSize: 10, fontWeight: 600, letterSpacing: '.18em', textTransform: 'uppercase', color: '#C8891F', marginBottom: 20 }}>Our Mission</p>
            <h2 style={{ fontSize: 'clamp(22px, 4vw, 44px)', fontFamily: "'Yeseva One',serif", color: '#EFE8D5', lineHeight: 1.2, maxWidth: 720, margin: '0 auto' }}>"To create a living, recurring archive of Nigerian food heritage — one feast at a time."</h2>
          </div>
          <div className="adire" style={{ width: 160, margin: '0 auto 64px', borderRadius: 3 }} />
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 32 }} className="col1 mission-grid">
            {[
              { icon: <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#C8891F" strokeWidth="1.5"><path d="M12 2L2 7l10 5 10-5-10-5z"/><path d="M2 17l10 5 10-5"/><path d="M2 12l10 5 10-5"/></svg>, title: 'Preserve', body: 'Document dishes, techniques, and food stories before they are lost to time, migration, and globalisation.' },
              { icon: <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#C8891F" strokeWidth="1.5"><circle cx="12" cy="12" r="10"/><line x1="2" y1="12" x2="22" y2="12"/><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/></svg>, title: 'Celebrate', body: 'Create a recurring, joyful space for Nigerians to take pride in the extraordinary depth of their culinary inheritance.' },
              { icon: <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#C8891F" strokeWidth="1.5"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>, title: 'Platform', body: 'Give food entrepreneurs, custodians, and emerging chefs a serious stage — not a food court, but a curated cultural exhibition.' },
            ].map(({ icon, title, body }) => (
              <div key={title}>
                <div style={{ width: 44, height: 44, borderRadius: '50%', background: '#252C1A', border: '.5px solid #3D5030', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 20 }}>{icon}</div>
                <h3 style={{ fontSize: 20, fontFamily: "'Yeseva One',serif", color: '#EFE8D5', marginBottom: 12 }}>{title}</h3>
                <p style={{ fontSize: 14, lineHeight: 1.75, color: '#A89B80' }}>{body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <div className="adire" style={{ width: '100%', borderRadius: 0 }} />

      {/* Team */}
      <section style={{ padding: `${PY} ${P}`, maxWidth: 1440, margin: '0 auto' }}>
        <p style={{ fontSize: 10, fontWeight: 600, letterSpacing: '.18em', textTransform: 'uppercase', color: '#C8891F', marginBottom: 16 }}>The People</p>
        <h2 style={{ fontSize: 'clamp(28px, 4vw, 40px)', fontFamily: "'Yeseva One',serif", color: '#EFE8D5', marginBottom: 56 }}>Built by those who care</h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: 32 }} className="team-grid">
          {TEAM.map(({ name, role, bio }) => (
            <div key={name} style={{ textAlign: 'center' }}>
              <div style={{ width: 96, height: 96, borderRadius: '50%', background: 'linear-gradient(135deg,#2A3020,#1E2418)', border: '.5px solid #3D5030', margin: '0 auto 16px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 10, letterSpacing: '.08em', color: '#4A5C3E', fontFamily: 'monospace' }}>Portrait</div>
              <h3 style={{ fontSize: 17, fontFamily: "'Yeseva One',serif", color: '#EFE8D5', marginBottom: 4 }}>{name}</h3>
              <p style={{ fontSize: 11, fontWeight: 600, letterSpacing: '.12em', textTransform: 'uppercase', color: '#C8891F', marginBottom: 10 }}>{role}</p>
              <p style={{ fontSize: 13, lineHeight: 1.6, color: '#A89B80' }}>{bio}</p>
            </div>
          ))}
        </div>
      </section>

      <div className="adire" style={{ width: '100%', borderRadius: 0 }} />

      {/* Press & Partners */}
      <section style={{ padding: `clamp(48px, 8vh, 80px) ${P}`, background: '#1E2418' }}>
        <div style={{ maxWidth: 1440, margin: '0 auto', display: 'flex', gap: 80, flexWrap: 'wrap' }}>
          <div style={{ flex: 1, minWidth: 'min(280px, 100%)' }}>
            <p style={{ fontSize: 10, fontWeight: 600, letterSpacing: '.18em', textTransform: 'uppercase', color: '#C8891F', marginBottom: 24 }}>Press &amp; Media</p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
              {['"The festival Lagos has been waiting for."', '"A serious, sustained act of cultural preservation."', '"Every Nigerian should attend at least once."'].map(quote => (
                <div key={quote} style={{ background: '#252C1A', border: '.5px solid #2A3020', borderRadius: 8, padding: '18px 22px', display: 'flex', alignItems: 'center', gap: 16 }}>
                  <div style={{ width: 56, height: 24, background: '#2A3020', borderRadius: 2, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                    <span style={{ fontSize: 9, color: '#4A5C3E', fontFamily: 'monospace' }}>Press</span>
                  </div>
                  <p style={{ fontSize: 13, color: '#A89B80', fontStyle: 'italic' }}>{quote}</p>
                </div>
              ))}
            </div>
          </div>
          <div style={{ flex: 1, minWidth: 'min(280px, 100%)' }}>
            <p style={{ fontSize: 10, fontWeight: 600, letterSpacing: '.18em', textTransform: 'uppercase', color: '#C8891F', marginBottom: 24 }}>Partners &amp; Supporters</p>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 12 }}>
              {Array(6).fill(0).map((_, i) => (
                <div key={i} style={{ background: '#252C1A', border: '.5px solid #2A3020', borderRadius: 8, height: 56, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <span style={{ fontSize: 9, color: '#4A5C3E', fontFamily: 'monospace', letterSpacing: '.05em' }}>Partner</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section style={{ padding: `${PY} ${P}`, textAlign: 'center', background: '#0F1208' }}>
        <div className="adire" style={{ width: 120, margin: '0 auto 32px', borderRadius: 3 }} />
        <h2 style={{ fontSize: 'clamp(28px, 4vw, 40px)', fontFamily: "'Yeseva One',serif", color: '#EFE8D5', marginBottom: 16 }}>Come to the table.</h2>
        <p style={{ fontSize: 15, lineHeight: 1.75, color: '#A89B80', maxWidth: 440, margin: '0 auto 40px' }}>Events every two weeks. A different group each time. Your seat is waiting.</p>
        <button onClick={() => onNav('events')} style={{ background: '#C8891F', color: '#0F1208', border: 'none', borderRadius: 2, padding: '16px 36px', fontSize: 12, fontWeight: 600, letterSpacing: '.10em', textTransform: 'uppercase', cursor: 'pointer' }}
          onMouseOver={e => e.currentTarget.style.background = '#B07A18'} onMouseOut={e => e.currentTarget.style.background = '#C8891F'}>
          See Upcoming Events →
        </button>
      </section>

      <Footer onNav={onNav} />
    </main>
  )
}
