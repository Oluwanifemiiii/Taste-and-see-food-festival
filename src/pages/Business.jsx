import { useState } from 'react'
import Footer from '../components/Footer'
import { CITIES, MASTERCLASSES, MERCH, PARTNERS, REPORTS, SPONSOR_PACKAGES, VENDOR_PACKAGES, fmt, IMPACT_METRICS } from '../data/events'
import { saveLead } from '../services/orders'

const card = {
  background: '#1E2418',
  border: '.5px solid #2A3020',
  borderRadius: 8,
  padding: 28,
}

const input = {
  width: '100%',
  background: '#252C1A',
  border: '.5px solid #3D5030',
  borderRadius: 4,
  padding: '13px 14px',
  color: '#EFE8D5',
  fontSize: 14,
}

function LeadForm({ type, options }) {
  const [form, setForm] = useState({ name: '', email: '', phone: '', interest: options[0] || '', note: '' })
  const [status, setStatus] = useState('')

  const submit = async (e) => {
    e.preventDefault()
    await saveLead('leads', { type, ...form })
    setStatus('Submitted. Our team will follow up with package details.')
    setForm({ name: '', email: '', phone: '', interest: options[0] || '', note: '' })
  }

  return (
    <form onSubmit={submit} style={{ ...card, display: 'grid', gap: 14 }}>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14 }} className="col1">
        <input required placeholder="Full name" value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} style={input} />
        <input required type="email" placeholder="Email address" value={form.email} onChange={e => setForm({ ...form, email: e.target.value })} style={input} />
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14 }} className="col1">
        <input required placeholder="Phone number" value={form.phone} onChange={e => setForm({ ...form, phone: e.target.value })} style={input} />
        <select value={form.interest} onChange={e => setForm({ ...form, interest: e.target.value })} style={input}>
          {options.map(option => <option key={option}>{option}</option>)}
        </select>
      </div>
      <textarea placeholder="Tell us what you need" value={form.note} onChange={e => setForm({ ...form, note: e.target.value })} style={{ ...input, minHeight: 96, resize: 'vertical' }} />
      <button style={{ background: '#C8891F', color: '#0F1208', border: 'none', borderRadius: 2, padding: 15, fontSize: 12, fontWeight: 700, letterSpacing: '.10em', textTransform: 'uppercase' }}>
        Submit Interest
      </button>
      {status && <p style={{ fontSize: 13, color: '#6DB86D' }}>{status}</p>}
    </form>
  )
}

export default function Business({ onNav }) {
  return (
    <main style={{ minHeight: '100vh', background: '#0F1208', paddingTop: 72 }}>
      <section style={{ padding: '90px 48px', maxWidth: 1440, margin: '0 auto' }}>
        <p style={{ fontSize: 10, fontWeight: 700, letterSpacing: '.18em', textTransform: 'uppercase', color: '#C8891F', marginBottom: 18 }}>Commercial Platform</p>
        <h1 style={{ fontSize: 'clamp(42px,6vw,76px)', lineHeight: 1.05, fontFamily: "'Yeseva One',serif", color: '#EFE8D5', maxWidth: 900, marginBottom: 22 }}>More than tickets. A year-round food heritage economy.</h1>
        <p style={{ fontSize: 16, lineHeight: 1.8, color: '#A89B80', maxWidth: 680 }}>Taste and See supports vendor booths, paid masterclasses, merchandise, sponsorships, content licensing, research publications, tourism partnerships, and multi-city expansion.</p>
      </section>

      <div className="adire" style={{ width: '100%', borderRadius: 0 }} />

      <section style={{ padding: '80px 48px', maxWidth: 1440, margin: '0 auto' }}>
        <h2 style={{ fontSize: 38, fontFamily: "'Yeseva One',serif", color: '#EFE8D5', marginBottom: 32 }}>Vendor Booths</h2>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 24 }} className="col1">
          {VENDOR_PACKAGES.map(pkg => (
            <div key={pkg.id} style={card}>
              <p style={{ fontSize: 10, letterSpacing: '.16em', textTransform: 'uppercase', color: '#C8891F', marginBottom: 10 }}>Marketplace</p>
              <h3 style={{ fontSize: 24, fontFamily: "'Yeseva One',serif", color: '#EFE8D5', marginBottom: 10 }}>{pkg.title}</h3>
              <p style={{ fontSize: 28, fontFamily: "'Yeseva One',serif", color: '#C8891F', marginBottom: 18 }}>{fmt(pkg.price)} - {fmt(pkg.max)}</p>
              {pkg.includes.map(item => <p key={item} style={{ fontSize: 14, color: '#A89B80', lineHeight: 1.8 }}>• {item}</p>)}
            </div>
          ))}
        </div>
        <div style={{ marginTop: 24 }}>
          <LeadForm type="vendor" options={VENDOR_PACKAGES.map(pkg => pkg.title)} />
        </div>
      </section>

      <section style={{ padding: '80px 48px', background: '#1E2418' }}>
        <div style={{ maxWidth: 1440, margin: '0 auto' }}>
          <h2 style={{ fontSize: 38, fontFamily: "'Yeseva One',serif", color: '#EFE8D5', marginBottom: 32 }}>Masterclasses</h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 20 }} className="col1">
            {MASTERCLASSES.map(cls => (
              <div key={cls.id} style={{ ...card, background: '#0F1208' }}>
                <p style={{ fontSize: 10, letterSpacing: '.16em', textTransform: 'uppercase', color: '#A33D21', marginBottom: 12 }}>{cls.city} • {cls.date}</p>
                <h3 style={{ fontSize: 22, fontFamily: "'Yeseva One',serif", color: '#EFE8D5', marginBottom: 10 }}>{cls.title}</h3>
                <p style={{ fontSize: 14, color: '#A89B80', marginBottom: 18 }}>{cls.chef} • {cls.seats} seats</p>
                <p style={{ fontSize: 26, fontFamily: "'Yeseva One',serif", color: '#C8891F' }}>{fmt(cls.price)}</p>
              </div>
            ))}
          </div>
          <div style={{ marginTop: 24 }}>
            <LeadForm type="masterclass" options={MASTERCLASSES.map(cls => cls.title)} />
          </div>
        </div>
      </section>

      <section style={{ padding: '80px 48px', maxWidth: 1440, margin: '0 auto' }}>
        <h2 style={{ fontSize: 38, fontFamily: "'Yeseva One',serif", color: '#EFE8D5', marginBottom: 32 }}>Sponsorship Packages</h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 20 }} className="col1">
          {SPONSOR_PACKAGES.map(pkg => (
            <div key={pkg.id} style={{ ...card, borderTop: '3px solid #C8891F' }}>
              <h3 style={{ fontSize: 24, fontFamily: "'Yeseva One',serif", color: '#EFE8D5', marginBottom: 8 }}>{pkg.title}</h3>
              <p style={{ fontSize: 28, fontFamily: "'Yeseva One',serif", color: '#C8891F', marginBottom: 18 }}>{fmt(pkg.price)}</p>
              {pkg.includes.map(item => <p key={item} style={{ fontSize: 14, color: '#A89B80', lineHeight: 1.8 }}>• {item}</p>)}
            </div>
          ))}
        </div>
        <div style={{ marginTop: 24 }}>
          <LeadForm type="sponsor" options={SPONSOR_PACKAGES.map(pkg => pkg.title)} />
        </div>
      </section>

      <section style={{ padding: '80px 48px', background: '#1E2418' }}>
        <div style={{ maxWidth: 1440, margin: '0 auto', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 48 }} className="col1">
          <div>
            <h2 style={{ fontSize: 36, fontFamily: "'Yeseva One',serif", color: '#EFE8D5', marginBottom: 24 }}>Merchandise Store</h2>
            <div style={{ display: 'grid', gap: 14 }}>
              {MERCH.map(item => (
                <div key={item.id} style={{ ...card, background: '#0F1208', display: 'flex', justifyContent: 'space-between', gap: 16 }}>
                  <div>
                    <p style={{ fontSize: 10, letterSpacing: '.14em', textTransform: 'uppercase', color: '#A89B80', marginBottom: 6 }}>{item.category}</p>
                    <h3 style={{ fontSize: 18, color: '#EFE8D5' }}>{item.title}</h3>
                  </div>
                  <strong style={{ color: '#C8891F' }}>{fmt(item.price)}</strong>
                </div>
              ))}
            </div>
          </div>
          <div>
            <h2 style={{ fontSize: 36, fontFamily: "'Yeseva One',serif", color: '#EFE8D5', marginBottom: 24 }}>Research & Licensing</h2>
            <div style={{ display: 'grid', gap: 14 }}>
              {REPORTS.map(report => (
                <div key={report.id} style={{ ...card, background: '#0F1208' }}>
                  <p style={{ fontSize: 10, letterSpacing: '.14em', textTransform: 'uppercase', color: '#C8891F', marginBottom: 8 }}>{report.status} • {fmt(report.price)}</p>
                  <h3 style={{ fontSize: 20, color: '#EFE8D5', marginBottom: 10 }}>{report.title}</h3>
                  <p style={{ fontSize: 14, color: '#A89B80', lineHeight: 1.7 }}>{report.focus}</p>
                </div>
              ))}
              <div style={card}>
                <h3 style={{ fontSize: 20, color: '#EFE8D5', marginBottom: 10 }}>Content Licensing</h3>
                <p style={{ fontSize: 14, color: '#A89B80', lineHeight: 1.7 }}>Television rights, YouTube series partnerships, streaming distribution, documentary sponsorship, and branded recipe content.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section style={{ padding: '80px 48px', maxWidth: 1440, margin: '0 auto' }}>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 48 }} className="col1">
          <div>
            <h2 style={{ fontSize: 36, fontFamily: "'Yeseva One',serif", color: '#EFE8D5', marginBottom: 24 }}>Expansion Cities</h2>
            <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
              {CITIES.map(city => <span key={city} style={{ border: '.5px solid #3D5030', borderRadius: 20, padding: '9px 16px', color: '#A89B80', background: '#1E2418' }}>{city}</span>)}
            </div>
          </div>
          <div>
            <h2 style={{ fontSize: 36, fontFamily: "'Yeseva One',serif", color: '#EFE8D5', marginBottom: 24 }}>Social Impact</h2>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14 }}>
              {IMPACT_METRICS.map(([value, label]) => (
                <div key={label} style={card}>
                  <p style={{ fontSize: 30, fontFamily: "'Yeseva One',serif", color: '#C8891F' }}>{value}</p>
                  <p style={{ fontSize: 12, color: '#A89B80', lineHeight: 1.5 }}>{label}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section style={{ padding: '70px 48px', background: '#1E2418' }}>
        <div style={{ maxWidth: 1440, margin: '0 auto' }}>
          <h2 style={{ fontSize: 32, fontFamily: "'Yeseva One',serif", color: '#EFE8D5', marginBottom: 24 }}>Partners & Sponsors</h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(6,1fr)', gap: 12 }} className="col1">
            {PARTNERS.map(partner => (
              <div key={partner} style={{ background: '#252C1A', border: '.5px solid #2A3020', borderRadius: 8, minHeight: 76, display: 'flex', alignItems: 'center', justifyContent: 'center', textAlign: 'center', padding: 12, color: '#A89B80', fontSize: 12, fontWeight: 700 }}>
                {partner}
              </div>
            ))}
          </div>
          <div style={{ textAlign: 'center', marginTop: 42 }}>
            <button onClick={() => onNav('events')} style={{ background: '#C8891F', color: '#0F1208', border: 'none', borderRadius: 2, padding: '16px 34px', fontSize: 12, fontWeight: 700, letterSpacing: '.10em', textTransform: 'uppercase' }}>View Events</button>
          </div>
        </div>
      </section>

      <Footer onNav={onNav} />
    </main>
  )
}
