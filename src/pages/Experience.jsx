import Footer from '../components/Footer'

const TIMELINE = [
  { n: 1, time: '4:00 PM', title: 'Arrival & Welcome Drink', color: '#C8891F', textColor: '#0F1208', desc: "Guests arrive to live traditional music. A welcome drink — zobo, fura da nono, or fresh palm wine depending on the evening's theme — is served at the door. The space is designed to feel like you've stepped into someone's family compound.", label: 'Welcome' },
  { n: 2, time: '5:00 PM', title: 'The Showcase Floor Opens', color: '#C8891F', textColor: '#0F1208', desc: 'Twelve to fifteen curated food stalls open across the venue. Each is run by a cook, a family, or a food entrepreneur representing that evening\'s featured tradition. You graze, you ask questions, you listen. Food custodians are on hand to explain every dish\'s origin and significance.', label: 'Showcase floor' },
  { n: 3, time: '7:30 PM', title: 'Cultural Performances', color: '#C8891F', textColor: '#0F1208', desc: 'The main floor clears for a curated performance programme — traditional dance, live drumming, spoken word rooted in food, and sometimes a short documentary screening about the featured ethnic group. Every performance is selected to deepen, not merely entertain.', label: 'Performances' },
  { n: 4, time: '9:00 PM — VIP & Premium', title: "Chef's Masterclass & Closing", color: '#A33D21', textColor: '#EFE8D5', desc: 'Premium and VIP guests retire for an intimate, hands-on session with the evening\'s lead chef. This is not a demonstration — you cook. You ask. You learn techniques that are rarely documented anywhere. The evening closes with a communal meal made from what was just prepared together.', label: 'Masterclass' },
]

export default function Experience({ onNav }) {
  return (
    <main style={{ minHeight: '100vh', background: '#0F1208' }}>
      {/* Hero */}
      <div className="photo" style={{ height: '58vh', position: 'relative', display: 'flex', alignItems: 'flex-end', paddingBottom: 72, paddingTop: 72 }}>
        <div className="photo-lbl">Festival photography</div>
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to bottom,rgba(15,18,8,.15) 0%,rgba(15,18,8,.85) 100%)' }} />
        <div style={{ position: 'relative', zIndex: 2, padding: '0 48px', maxWidth: 1440, width: '100%', margin: '0 auto' }}>
          <p style={{ fontSize: 10, fontWeight: 600, letterSpacing: '.18em', textTransform: 'uppercase', color: '#C8891F', marginBottom: 16 }}>The Full Experience</p>
          <h1 style={{ fontSize: 'clamp(44px,6vw,80px)', fontFamily: "'Yeseva One',serif", color: '#EFE8D5', lineHeight: 1.05, maxWidth: 680 }}>Every feast<br />tells a story.</h1>
        </div>
      </div>

      {/* Opening prose */}
      <section style={{ padding: '100px 48px', maxWidth: 1440, margin: '0 auto', display: 'flex', gap: 80, alignItems: 'flex-start', flexWrap: 'wrap' }}>
        <div style={{ flex: .55, minWidth: 280 }}>
          <p style={{ fontSize: 10, fontWeight: 600, letterSpacing: '.18em', textTransform: 'uppercase', color: '#C8891F', marginBottom: 24 }}>What to Expect</p>
          <p style={{ fontSize: 'clamp(20px,2.5vw,28px)', lineHeight: 1.45, fontFamily: "'Yeseva One',serif", color: '#EFE8D5', marginBottom: 28 }}>From the moment you arrive, the air changes.</p>
          <p style={{ fontSize: 15, lineHeight: 1.8, color: '#A89B80', marginBottom: 20 }}>There's the warmth of communal cooking, the percussion of a live drummer setting the tone, the quiet pride of a food custodian laying out a dish their grandmother taught them.</p>
          <p style={{ fontSize: 15, lineHeight: 1.8, color: '#A89B80' }}>Taste &amp; See is not a food festival. It is a living archive. An act of remembrance. A feast you carry home long after the plates are cleared.</p>
        </div>
        <div style={{ flex: .45, minWidth: 260 }}>
          <div className="photo" style={{ aspectRatio: '4/5', borderRadius: 4, overflow: 'hidden' }}>
            <div className="photo-lbl">Festival atmosphere</div>
          </div>
        </div>
      </section>

      <div className="adire" style={{ width: '100%', borderRadius: 0 }} />

      {/* Timeline */}
      <section style={{ padding: '100px 48px', maxWidth: 1440, margin: '0 auto' }}>
        <p style={{ fontSize: 10, fontWeight: 600, letterSpacing: '.18em', textTransform: 'uppercase', color: '#C8891F', marginBottom: 16 }}>A Typical Evening</p>
        <h2 style={{ fontSize: 48, fontFamily: "'Yeseva One',serif", color: '#EFE8D5', marginBottom: 64 }}>Your Evening,<br />Step by Step</h2>
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          {TIMELINE.map((item, i) => (
            <div key={item.n} style={{ display: 'flex', gap: 40, alignItems: 'flex-start', paddingBottom: i < 3 ? 52 : 0, borderLeft: i < 3 ? '1px solid #2A3020' : 'none', marginLeft: 20, paddingLeft: 48, position: 'relative', flexWrap: 'wrap' }}>
              <div style={{ position: 'absolute', left: -14, top: 0, width: 28, height: 28, borderRadius: '50%', background: item.color, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 11, fontWeight: 700, color: item.textColor, flexShrink: 0 }}>{item.n}</div>
              <div style={{ flex: 1, minWidth: 240 }}>
                <p style={{ fontSize: 12, fontWeight: 600, letterSpacing: '.12em', textTransform: 'uppercase', color: item.color, marginBottom: 8 }}>{item.time}</p>
                <h3 style={{ fontSize: 24, fontFamily: "'Yeseva One',serif", color: '#EFE8D5', marginBottom: 12 }}>{item.title}</h3>
                <p style={{ fontSize: 15, lineHeight: 1.75, color: '#A89B80', maxWidth: 520 }}>{item.desc}</p>
              </div>
              <div className="photo" style={{ width: 240, flexShrink: 0, aspectRatio: '4/3', borderRadius: 4, overflow: 'hidden' }}>
                <div className="photo-lbl">{item.label}</div>
              </div>
            </div>
          ))}
        </div>
      </section>

      <div className="adire" style={{ width: '100%', borderRadius: 0 }} />

      {/* Two Formats */}
      <section style={{ padding: '100px 48px', maxWidth: 1440, margin: '0 auto' }}>
        <p style={{ fontSize: 10, fontWeight: 600, letterSpacing: '.18em', textTransform: 'uppercase', color: '#C8891F', marginBottom: 16 }}>The Formats</p>
        <h2 style={{ fontSize: 48, fontFamily: "'Yeseva One',serif", color: '#EFE8D5', marginBottom: 48 }}>Two ways to gather</h2>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 24 }} className="col1">
          <div style={{ background: '#1E2418', border: '.5px solid #2A3020', borderRadius: 12, padding: 40, borderTop: '3px solid #C8891F' }}>
            <p style={{ fontSize: 10, fontWeight: 600, letterSpacing: '.18em', textTransform: 'uppercase', color: '#C8891F', marginBottom: 16 }}>Type A</p>
            <h3 style={{ fontSize: 28, fontFamily: "'Yeseva One',serif", color: '#EFE8D5', marginBottom: 20 }}>Ethnic Food Showcase</h3>
            <p style={{ fontSize: 15, lineHeight: 1.75, color: '#A89B80', marginBottom: 28 }}>Each event is built entirely around one ethnic group. The food, the performances, the custodians, the marketplace — all of it represents a single people's culinary world. We rotate through Nigeria's groups on a bi-weekly schedule.</p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
              {['Yoruba, Igbo, Hausa, Efik, Tiv, Ijaw, Itsekiri, Nupe and more', '12–15 signature dishes per event', 'Food custodians, not just chefs, tell the stories'].map(t => (
                <div key={t} style={{ display: 'flex', gap: 12 }}>
                  <div style={{ width: 6, height: 6, borderRadius: '50%', background: '#C8891F', flexShrink: 0, marginTop: 7 }} />
                  <span style={{ fontSize: 13, color: '#A89B80' }}>{t}</span>
                </div>
              ))}
            </div>
          </div>
          <div style={{ background: '#252C1A', border: '.5px solid #2A3020', borderRadius: 12, padding: 40, borderTop: '3px solid #A33D21' }}>
            <p style={{ fontSize: 10, fontWeight: 600, letterSpacing: '.18em', textTransform: 'uppercase', color: '#A33D21', marginBottom: 16 }}>Type B</p>
            <h3 style={{ fontSize: 28, fontFamily: "'Yeseva One',serif", color: '#EFE8D5', marginBottom: 20 }}>Old vs New</h3>
            <p style={{ fontSize: 15, lineHeight: 1.75, color: '#A89B80', marginBottom: 28 }}>Traditional and contemporary methods placed side by side — same dish, same ingredient, different hands and different centuries. There is no winner. The audience decides what they value. These events spark the most conversation.</p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
              {['Grandmothers and young chefs on the same stage', 'Focused on a single ingredient or technique per event', 'Audience votes on which version they prefer'].map(t => (
                <div key={t} style={{ display: 'flex', gap: 12 }}>
                  <div style={{ width: 6, height: 6, borderRadius: '50%', background: '#A33D21', flexShrink: 0, marginTop: 7 }} />
                  <span style={{ fontSize: 13, color: '#A89B80' }}>{t}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <div className="adire" style={{ width: '100%', borderRadius: 0 }} />

      {/* Marketplace */}
      <section style={{ padding: '100px 48px', background: '#1E2418' }}>
        <div style={{ maxWidth: 1440, margin: '0 auto', display: 'flex', gap: 80, alignItems: 'center', flexWrap: 'wrap' }}>
          <div style={{ flex: .45, minWidth: 260 }}>
            <div className="photo" style={{ aspectRatio: '3/4', borderRadius: 4, overflow: 'hidden' }}>
              <div className="photo-lbl">Marketplace</div>
            </div>
          </div>
          <div style={{ flex: .55, minWidth: 280 }}>
            <p style={{ fontSize: 10, fontWeight: 600, letterSpacing: '.18em', textTransform: 'uppercase', color: '#C8891F', marginBottom: 20 }}>The Marketplace</p>
            <h2 style={{ fontSize: 40, fontFamily: "'Yeseva One',serif", color: '#EFE8D5', marginBottom: 24, lineHeight: 1.1 }}>Take the table<br />home with you.</h2>
            <p style={{ fontSize: 15, lineHeight: 1.75, color: '#A89B80', marginBottom: 32 }}>Every Taste &amp; See event includes a curated marketplace of food entrepreneurs — artisan sauce makers, spice merchants, cookbook authors, clay pot craftspeople, and cold-press oil producers. You leave not just with memories, but with the ingredients to recreate what you tasted.</p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
              {['20–30 artisan vendors per event', 'Priority applications open for food entrepreneurs', 'All vendors curated to match the event\'s theme'].map(t => (
                <div key={t} style={{ display: 'flex', gap: 16 }}>
                  <div style={{ width: 8, height: 8, borderRadius: '50%', background: '#C8891F', flexShrink: 0, marginTop: 5 }} />
                  <p style={{ fontSize: 14, color: '#A89B80' }}>{t}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section style={{ padding: '100px 48px', textAlign: 'center', background: '#0F1208' }}>
        <h2 style={{ fontSize: 48, fontFamily: "'Yeseva One',serif", color: '#EFE8D5', marginBottom: 16 }}>Ready to come to the table?</h2>
        <p style={{ fontSize: 15, lineHeight: 1.75, color: '#A89B80', maxWidth: 460, margin: '0 auto 40px' }}>Events run every two weeks. Select yours and secure your seat before they're gone.</p>
        <div style={{ display: 'flex', gap: 16, justifyContent: 'center', flexWrap: 'wrap' }}>
          <button onClick={() => onNav('events')}
            style={{ background: '#C8891F', color: '#0F1208', border: 'none', borderRadius: 2, padding: '16px 36px', fontSize: 12, fontWeight: 600, letterSpacing: '.10em', textTransform: 'uppercase', cursor: 'pointer' }}
            onMouseOver={e => e.currentTarget.style.background = '#B07A18'}
            onMouseOut={e => e.currentTarget.style.background = '#C8891F'}>
            See All Events →
          </button>
          <button onClick={() => onNav('checkout')}
            style={{ background: 'transparent', color: '#EFE8D5', border: '1px solid rgba(239,232,213,.4)', borderRadius: 2, padding: '16px 36px', fontSize: 12, fontWeight: 600, letterSpacing: '.10em', textTransform: 'uppercase', cursor: 'pointer' }}>
            Get Tickets Now
          </button>
        </div>
      </section>

      <Footer onNav={onNav} />
    </main>
  )
}
