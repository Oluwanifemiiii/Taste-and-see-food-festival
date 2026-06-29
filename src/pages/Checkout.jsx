import { useState } from 'react'
import { EVENTS, fmt, PRICE_MAP } from '../data/events'

const P = 'clamp(16px, 4vw, 48px)'

export default function Checkout({ eventId, initialTicket, initialQty, onNav }) {
  const [step, setStep] = useState(2)
  const [selected, setSelected] = useState(initialTicket || 'premium')
  const [qty, setQty] = useState(initialQty || 1)

  const evt = EVENTS.find(e => e.id === eventId) || EVENTS[0]
  const subtotal = PRICE_MAP[selected] * qty
  const tax = Math.round(subtotal * 0.075)
  const total = subtotal + tax
  const ticketLabel = { regular: 'Regular', premium: 'Premium', vip: 'VIP Experience' }[selected]

  const stepCircle = (n) => ({
    width: 32, height: 32, borderRadius: '50%',
    display: 'flex', alignItems: 'center', justifyContent: 'center',
    background: step >= n ? '#C8891F' : '#2A3020',
    color: step >= n ? '#0F1208' : '#A89B80',
    fontSize: 13, fontWeight: 600, fontFamily: "'Plus Jakarta Sans',sans-serif",
    flexShrink: 0,
  })

  const inputStyle = {
    width: '100%', background: '#252C1A', border: '.5px solid #3D5030',
    borderRadius: 4, padding: '14px 16px', color: '#EFE8D5', fontSize: 14, outline: 'none',
  }
  const labelStyle = {
    display: 'block', fontSize: 10, fontWeight: 600, letterSpacing: '.15em',
    textTransform: 'uppercase', color: '#A89B80', marginBottom: 8,
  }

  return (
    <main style={{ minHeight: '100vh', background: '#0F1208', padding: `clamp(80px, 12vh, 100px) ${P} 80px` }}>
      <div style={{ maxWidth: 900, margin: '0 auto' }}>
        {/* Step indicator */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 60, flexWrap: 'wrap', gap: '8px 0' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <div style={{ ...stepCircle(1), background: '#C8891F' }}>
              <svg width="14" height="10" viewBox="0 0 24 16" fill="none" stroke="#0F1208" strokeWidth="3"><path d="M2 8l6 6L22 2"/></svg>
            </div>
            <span className="step-label" style={{ fontSize: 11, fontWeight: 600, letterSpacing: '.10em', textTransform: 'uppercase', color: '#C8891F' }}>Select Ticket</span>
          </div>
          {[[2, 'Your Details'], [3, 'Payment'], [4, 'Confirm']].map(([n, label]) => (
            <div key={n} style={{ display: 'flex', alignItems: 'center' }}>
              <div className="step-connector" style={{ width: 60, height: .5, background: '#3D5030', margin: '0 8px' }} />
              <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                <div style={stepCircle(n)}>{n}</div>
                <span className="step-label" style={{ fontSize: 11, fontWeight: 600, letterSpacing: '.10em', textTransform: 'uppercase', color: step >= n ? '#C8891F' : '#A89B80' }}>{label}</span>
              </div>
            </div>
          ))}
        </div>

        {/* Step 2 — Details */}
        {step === 2 && (
          <div>
            <h2 style={{ fontSize: 'clamp(24px, 4vw, 32px)', fontFamily: "'Yeseva One',serif", color: '#EFE8D5', marginBottom: 8 }}>Your Details</h2>
            <p style={{ fontSize: 15, color: '#A89B80', marginBottom: 40 }}>Confirm your information and we'll have your tickets ready.</p>
            <div style={{ background: '#1E2418', border: '.5px solid #2A3020', borderRadius: 12, padding: 'clamp(20px, 4vw, 32px)', display: 'flex', flexDirection: 'column', gap: 20, marginBottom: 24 }}>
              <div><label style={labelStyle}>Full Name</label><input type="text" defaultValue="Adaeze Okonkwo" style={inputStyle} /></div>
              <div><label style={labelStyle}>Email Address</label><input type="email" defaultValue="adaeze@email.com" style={inputStyle} /></div>
              <div><label style={labelStyle}>Phone Number</label><input type="tel" defaultValue="+234 801 234 5678" style={inputStyle} /></div>
              <div>
                <label style={labelStyle}>Dietary Requirements <span style={{ fontWeight: 400, color: '#4A5C3E' }}>(Optional)</span></label>
                <input type="text" placeholder="Vegetarian, nut allergy, etc." style={inputStyle} />
              </div>
            </div>
            <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
              <button onClick={() => setStep(3)} style={{ background: '#C8891F', color: '#0F1208', border: 'none', borderRadius: 2, padding: '16px 40px', fontSize: 12, fontWeight: 600, letterSpacing: '.10em', textTransform: 'uppercase', cursor: 'pointer' }}>Continue →</button>
            </div>
          </div>
        )}

        {/* Step 3 — Payment */}
        {step === 3 && (
          <div style={{ display: 'flex', gap: 40, alignItems: 'flex-start', flexWrap: 'wrap' }}>
            <div style={{ flex: .6, minWidth: 'min(280px, 100%)' }}>
              <h2 style={{ fontSize: 'clamp(24px, 4vw, 32px)', fontFamily: "'Yeseva One',serif", color: '#EFE8D5', marginBottom: 32 }}>Payment</h2>
              <div style={{ background: '#1E2418', border: '.5px solid #2A3020', borderRadius: 12, padding: 'clamp(20px, 4vw, 32px)' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 24, paddingBottom: 20, borderBottom: '.5px solid #2A3020' }}>
                  <div style={{ width: 36, height: 22, background: '#00457C', borderRadius: 3, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                    <span style={{ fontSize: 8, fontWeight: 700, color: '#fff', letterSpacing: '.04em' }}>PAY</span>
                  </div>
                  <span style={{ fontSize: 13, fontWeight: 600, color: '#EFE8D5' }}>Paystack Secure Checkout</span>
                  <svg width="12" height="14" viewBox="0 0 24 24" fill="none" stroke="#6DB86D" strokeWidth="1.5" style={{ marginLeft: 'auto', flexShrink: 0 }}><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>
                </div>

                {/* Paystack integration placeholder */}
                <div style={{ background: '#252C1A', border: '1px dashed #3D5030', borderRadius: 8, padding: '32px 24px', textAlign: 'center', marginBottom: 24 }}>
                  <div style={{ width: 48, height: 48, borderRadius: '50%', background: '#1E2418', border: '.5px solid #3D5030', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 16px' }}>
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#C8891F" strokeWidth="1.5"><rect x="1" y="4" width="22" height="16" rx="2" ry="2"/><line x1="1" y1="10" x2="23" y2="10"/></svg>
                  </div>
                  <p style={{ fontSize: 14, fontWeight: 600, color: '#EFE8D5', marginBottom: 6 }}>Paystack Payment Window</p>
                  <p style={{ fontSize: 12, color: '#A89B80', lineHeight: 1.6 }}>The Paystack payment widget will appear here once the backend integration is connected. Card, bank transfer, and USSD payment methods will be available.</p>
                </div>

                <button onClick={() => setStep(4)} style={{ width: '100%', background: '#C8891F', color: '#0F1208', border: 'none', borderRadius: 2, padding: 18, fontSize: 13, fontWeight: 600, letterSpacing: '.10em', textTransform: 'uppercase', cursor: 'pointer' }}>
                  Pay {fmt(total)} →
                </button>
              </div>
            </div>

            {/* Order summary */}
            <div style={{ flex: .4, minWidth: 'min(260px, 100%)', background: '#1E2418', border: '.5px solid #2A3020', borderRadius: 12, padding: 28, position: 'sticky', top: 88 }}>
              <h3 style={{ fontSize: 16, fontFamily: "'Yeseva One',serif", color: '#EFE8D5', marginBottom: 20 }}>Order Summary</h3>
              <div style={{ marginBottom: 18, paddingBottom: 18, borderBottom: '.5px solid #2A3020' }}>
                <p style={{ fontSize: 13, fontWeight: 600, color: '#EFE8D5', marginBottom: 4 }}>{evt.title}</p>
                <p style={{ fontSize: 12, color: '#A89B80' }}>{evt.date}</p>
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 12, marginBottom: 18, paddingBottom: 18, borderBottom: '.5px solid #2A3020' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <span style={{ fontSize: 13, color: '#A89B80' }}>{ticketLabel} × {qty}</span>
                  <span style={{ fontSize: 13, color: '#EFE8D5' }}>{fmt(subtotal)}</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <span style={{ fontSize: 13, color: '#A89B80' }}>VAT (7.5%)</span>
                  <span style={{ fontSize: 13, color: '#EFE8D5' }}>{fmt(tax)}</span>
                </div>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span style={{ fontSize: 14, fontWeight: 600, color: '#EFE8D5' }}>Total</span>
                <span style={{ fontSize: 24, fontFamily: "'Yeseva One',serif", color: '#C8891F' }}>{fmt(total)}</span>
              </div>
            </div>
          </div>
        )}

        {/* Step 4 — Confirmation */}
        {step === 4 && (
          <div style={{ textAlign: 'center', maxWidth: 520, margin: '0 auto' }}>
            <div style={{ width: 64, height: 64, borderRadius: '50%', background: '#1A3A1A', border: '1.5px solid #6DB86D', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 32px' }}>
              <svg width="28" height="22" viewBox="0 0 28 22" fill="none" stroke="#6DB86D" strokeWidth="2.5"><path d="M2 11l8 8L26 2"/></svg>
            </div>
            <h2 style={{ fontSize: 'clamp(28px, 5vw, 40px)', fontFamily: "'Yeseva One',serif", color: '#EFE8D5', marginBottom: 12 }}>You're In!</h2>
            <p style={{ fontSize: 15, lineHeight: 1.75, color: '#A89B80', marginBottom: 40 }}>
              Your ticket for <strong style={{ color: '#EFE8D5' }}>{evt.title}</strong> is confirmed. Check your email for details.
            </p>
            <div style={{ background: '#1E2418', border: '.5px solid #2A3020', borderRadius: 12, padding: 24, marginBottom: 32, textAlign: 'left' }}>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
                {[['Event', evt.title], ['Date', evt.date], ['Ticket', ticketLabel], ['Total Paid', fmt(total)]].map(([k, v]) => (
                  <div key={k}>
                    <p style={{ fontSize: 10, fontWeight: 600, letterSpacing: '.15em', textTransform: 'uppercase', color: '#A89B80', marginBottom: 4 }}>{k}</p>
                    <p style={{ fontSize: 13, color: k === 'Total Paid' ? '#C8891F' : '#EFE8D5', fontFamily: k === 'Total Paid' ? "'Yeseva One',serif" : 'inherit' }}>{v}</p>
                  </div>
                ))}
              </div>
            </div>
            <div style={{ display: 'flex', gap: 16, justifyContent: 'center', flexWrap: 'wrap' }}>
              <button onClick={() => onNav('ticket')} style={{ background: '#C8891F', color: '#0F1208', border: 'none', borderRadius: 2, padding: '16px 32px', fontSize: 12, fontWeight: 600, letterSpacing: '.10em', textTransform: 'uppercase', cursor: 'pointer' }}>View Your Ticket</button>
              <button style={{ background: 'transparent', color: '#EFE8D5', border: '1px solid rgba(239,232,213,.4)', borderRadius: 2, padding: '16px 32px', fontSize: 12, fontWeight: 600, letterSpacing: '.10em', textTransform: 'uppercase', cursor: 'pointer' }}>Add to Calendar</button>
            </div>
          </div>
        )}
      </div>
    </main>
  )
}
