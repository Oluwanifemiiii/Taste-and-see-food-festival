import { useState } from 'react'
import { TICKET_TIERS, fmt } from '../data/events'
import { makeReference, saveOrder } from '../services/orders'
import { isPaystackConfigured, startPaystackPayment } from '../services/paystack'
import { sendTicketEmail } from '../services/email'
import { getEventById, useFestivalEvents } from '../hooks/useFestivalEvents'

const inputStyle = {
  width: '100%',
  background: '#252C1A',
  border: '.5px solid #3D5030',
  borderRadius: 4,
  padding: '14px 16px',
  color: '#EFE8D5',
  fontSize: 14,
  outline: 'none',
}

const labelStyle = {
  display: 'block',
  fontSize: 10,
  fontWeight: 700,
  letterSpacing: '.15em',
  textTransform: 'uppercase',
  color: '#A89B80',
  marginBottom: 8,
}

export default function Checkout({ eventId, initialTicket, initialQty, onNav }) {
  const { events } = useFestivalEvents()
  const evt = getEventById(events, eventId)
  const [step, setStep] = useState(1)
  const [selected, setSelected] = useState(initialTicket || 'premium')
  const [qty, setQty] = useState(initialQty || 1)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [emailNotice, setEmailNotice] = useState('')
  const [confirmedOrder, setConfirmedOrder] = useState(null)
  const [attendee, setAttendee] = useState({
    name: '',
    email: '',
    phone: '',
    dietary: '',
  })

  const subtotal = TICKET_TIERS[selected].price * qty
  const vat = Math.round(subtotal * 0.075)
  const total = subtotal + vat

  const pay = async () => {
    setLoading(true)
    setError('')
    try {
      const reference = makeReference('TSF')
      const payment = await startPaystackPayment({
        email: attendee.email,
        amount: total,
        reference,
        metadata: {
          event_id: evt.id,
          event_title: evt.title,
          ticket_type: selected,
          quantity: qty,
          attendee_name: attendee.name,
        },
      })

      const order = await saveOrder({
        reference: payment.reference || reference,
        payment_status: payment.status || 'success',
        event_id: evt.id,
        event_title: evt.title,
        ticket_type: selected,
        quantity: qty,
        subtotal,
        vat,
        total,
        attendee_name: attendee.name,
        attendee_email: attendee.email,
        attendee_phone: attendee.phone,
        dietary: attendee.dietary,
      })

      const emailResult = await sendTicketEmail({ order, event: evt, ticketLabel: TICKET_TIERS[selected].label }).catch(() => ({ skipped: true }))
      if (emailResult?.skipped) {
        setEmailNotice('Email delivery is not configured yet, so please save your ticket reference. You can recover the ticket later with your reference and email.')
      } else {
        setEmailNotice('A confirmation email has been sent with your ticket details.')
      }

      setConfirmedOrder(order)
      setStep(4)
    } catch (err) {
      setError(err.message || 'Payment could not be completed.')
    } finally {
      setLoading(false)
    }
  }

  const canContinue = attendee.name && attendee.email && attendee.phone

  return (
    <main style={{ minHeight: '100vh', background: '#0F1208', padding: '100px 48px 80px' }}>
      <div style={{ maxWidth: 1100, margin: '0 auto' }}>
        <div style={{ display: 'flex', justifyContent: 'center', gap: 12, marginBottom: 48, flexWrap: 'wrap' }}>
          {['Select Ticket', 'Your Details', 'Payment', 'Confirm'].map((label, index) => (
            <div key={label} style={{ display: 'flex', alignItems: 'center', gap: 9 }}>
              <span style={{ width: 30, height: 30, borderRadius: '50%', display: 'grid', placeItems: 'center', background: step >= index + 1 ? '#C8891F' : '#2A3020', color: step >= index + 1 ? '#0F1208' : '#A89B80', fontSize: 12, fontWeight: 700 }}>{index + 1}</span>
              <span style={{ fontSize: 11, letterSpacing: '.10em', textTransform: 'uppercase', color: step >= index + 1 ? '#C8891F' : '#A89B80' }}>{label}</span>
            </div>
          ))}
        </div>

        {step === 1 && (
          <section>
            <h1 style={{ fontSize: 40, fontFamily: "'Yeseva One',serif", color: '#EFE8D5', marginBottom: 8 }}>Choose your ticket</h1>
            <p style={{ color: '#A89B80', marginBottom: 32 }}>{evt.title} • {evt.date} • {evt.city}</p>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 20, marginBottom: 28 }} className="col1">
              {Object.entries(TICKET_TIERS).map(([key, tier]) => (
                <button key={key} onClick={() => setSelected(key)}
                  style={{ textAlign: 'left', background: key === selected ? '#252C1A' : '#1E2418', border: `1px solid ${key === selected ? '#C8891F' : '#2A3020'}`, borderRadius: 8, padding: 28, color: '#EFE8D5' }}>
                  <p style={{ fontSize: 10, letterSpacing: '.16em', textTransform: 'uppercase', color: key === selected ? '#C8891F' : '#A89B80', marginBottom: 12 }}>{tier.label}</p>
                  <p style={{ fontSize: 36, fontFamily: "'Yeseva One',serif", color: key === 'vip' ? '#A33D21' : '#C8891F', marginBottom: 18 }}>{fmt(tier.price)}</p>
                  {tier.benefits.map(benefit => <p key={benefit} style={{ fontSize: 13, color: '#A89B80', lineHeight: 1.8 }}>• {benefit}</p>)}
                </button>
              ))}
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 20, background: '#1E2418', border: '.5px solid #2A3020', borderRadius: 8, padding: 20, flexWrap: 'wrap' }}>
              <div>
                <p style={{ fontSize: 11, letterSpacing: '.14em', textTransform: 'uppercase', color: '#A89B80', marginBottom: 6 }}>Quantity</p>
                <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                  <button onClick={() => setQty(q => Math.max(1, q - 1))} style={{ width: 38, height: 38, borderRadius: 4, border: '.5px solid #3D5030', background: '#252C1A', color: '#EFE8D5', fontSize: 18 }}>-</button>
                  <strong style={{ minWidth: 34, textAlign: 'center', fontSize: 20 }}>{qty}</strong>
                  <button onClick={() => setQty(q => Math.min(10, q + 1))} style={{ width: 38, height: 38, borderRadius: 4, border: '.5px solid #3D5030', background: '#252C1A', color: '#EFE8D5', fontSize: 18 }}>+</button>
                </div>
              </div>
              <div style={{ textAlign: 'right' }}>
                <p style={{ color: '#A89B80', fontSize: 13, marginBottom: 6 }}>Subtotal</p>
                <p style={{ fontSize: 32, fontFamily: "'Yeseva One',serif", color: '#C8891F' }}>{fmt(subtotal)}</p>
              </div>
              <button onClick={() => setStep(2)} style={{ background: '#C8891F', color: '#0F1208', border: 'none', borderRadius: 2, padding: '16px 34px', fontSize: 12, fontWeight: 700, letterSpacing: '.10em', textTransform: 'uppercase' }}>Continue</button>
            </div>
          </section>
        )}

        {step === 2 && (
          <section>
            <h1 style={{ fontSize: 40, fontFamily: "'Yeseva One',serif", color: '#EFE8D5', marginBottom: 8 }}>Your details</h1>
            <p style={{ color: '#A89B80', marginBottom: 32 }}>These details are used for ticket delivery and gate check-in.</p>
            <div style={{ background: '#1E2418', border: '.5px solid #2A3020', borderRadius: 8, padding: 28, display: 'grid', gap: 18 }}>
              <div><label style={labelStyle}>Full Name</label><input required value={attendee.name} onChange={e => setAttendee({ ...attendee, name: e.target.value })} style={inputStyle} /></div>
              <div><label style={labelStyle}>Email Address</label><input required type="email" value={attendee.email} onChange={e => setAttendee({ ...attendee, email: e.target.value })} style={inputStyle} /></div>
              <div><label style={labelStyle}>Phone Number</label><input required value={attendee.phone} onChange={e => setAttendee({ ...attendee, phone: e.target.value })} style={inputStyle} /></div>
              <div><label style={labelStyle}>Dietary Requirements</label><input placeholder="Vegetarian, nut allergy, etc." value={attendee.dietary} onChange={e => setAttendee({ ...attendee, dietary: e.target.value })} style={inputStyle} /></div>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 24 }}>
              <button onClick={() => setStep(1)} style={{ background: 'transparent', color: '#EFE8D5', border: '1px solid rgba(239,232,213,.4)', borderRadius: 2, padding: '14px 28px', fontSize: 12, fontWeight: 700, letterSpacing: '.10em', textTransform: 'uppercase' }}>Back</button>
              <button disabled={!canContinue} onClick={() => setStep(3)} style={{ background: canContinue ? '#C8891F' : '#3D5030', color: '#0F1208', border: 'none', borderRadius: 2, padding: '14px 28px', fontSize: 12, fontWeight: 700, letterSpacing: '.10em', textTransform: 'uppercase' }}>Payment</button>
            </div>
          </section>
        )}

        {step === 3 && (
          <section style={{ display: 'grid', gridTemplateColumns: '1fr 360px', gap: 28 }} className="col1">
            <div style={{ background: '#1E2418', border: '.5px solid #2A3020', borderRadius: 8, padding: 30 }}>
              <h1 style={{ fontSize: 36, fontFamily: "'Yeseva One',serif", color: '#EFE8D5', marginBottom: 20 }}>Payment</h1>
              <div style={{ background: '#252C1A', border: `1px dashed ${isPaystackConfigured ? '#6DB86D' : '#C8891F'}`, borderRadius: 8, padding: 26, marginBottom: 22 }}>
                <p style={{ fontSize: 15, fontWeight: 700, color: '#EFE8D5', marginBottom: 8 }}>Paystack Secure Checkout</p>
                <p style={{ fontSize: 13, color: '#A89B80', lineHeight: 1.7 }}>
                  {isPaystackConfigured ? 'Your Paystack inline checkout will open when you click pay.' : 'Demo mode is active. Add VITE_PAYSTACK_PUBLIC_KEY to process real Paystack payments.'}
                </p>
              </div>
              {error && <p style={{ color: '#D66B55', fontSize: 13, marginBottom: 16 }}>{error}</p>}
              <button disabled={loading} onClick={pay} style={{ width: '100%', background: '#C8891F', color: '#0F1208', border: 'none', borderRadius: 2, padding: 18, fontSize: 13, fontWeight: 700, letterSpacing: '.10em', textTransform: 'uppercase' }}>
                {loading ? 'Processing...' : `Pay ${fmt(total)}`}
              </button>
            </div>
            <div style={{ background: '#1E2418', border: '.5px solid #2A3020', borderRadius: 8, padding: 26, height: 'fit-content' }}>
              <h2 style={{ fontSize: 22, fontFamily: "'Yeseva One',serif", color: '#EFE8D5', marginBottom: 18 }}>Order Summary</h2>
              {[
                ['Event', evt.title],
                ['Ticket', TICKET_TIERS[selected].label],
                ['Quantity', qty],
                ['Subtotal', fmt(subtotal)],
                ['VAT (7.5%)', fmt(vat)],
                ['Total', fmt(total)],
              ].map(([key, value]) => (
                <div key={key} style={{ display: 'flex', justifyContent: 'space-between', gap: 18, borderBottom: '.5px solid #2A3020', padding: '11px 0' }}>
                  <span style={{ color: '#A89B80', fontSize: 13 }}>{key}</span>
                  <strong style={{ color: key === 'Total' ? '#C8891F' : '#EFE8D5', fontSize: 13, textAlign: 'right' }}>{value}</strong>
                </div>
              ))}
            </div>
          </section>
        )}

        {step === 4 && confirmedOrder && (
          <section style={{ textAlign: 'center', maxWidth: 640, margin: '0 auto' }}>
            <div style={{ width: 66, height: 66, borderRadius: '50%', background: '#1A3A1A', border: '1.5px solid #6DB86D', display: 'grid', placeItems: 'center', margin: '0 auto 28px', color: '#6DB86D', fontSize: 32 }}>✓</div>
            <h1 style={{ fontSize: 44, fontFamily: "'Yeseva One',serif", color: '#EFE8D5', marginBottom: 12 }}>You're in.</h1>
            <p style={{ fontSize: 15, color: '#A89B80', lineHeight: 1.8, marginBottom: 30 }}>Your {TICKET_TIERS[selected].label} ticket for {evt.title} has been confirmed. Reference: <strong style={{ color: '#EFE8D5' }}>{confirmedOrder.reference}</strong></p>
            {emailNotice && <p style={{ fontSize: 13, color: emailNotice.includes('not configured') ? '#C8891F' : '#6DB86D', lineHeight: 1.7, marginBottom: 24 }}>{emailNotice}</p>}
            <div style={{ display: 'flex', gap: 14, justifyContent: 'center', flexWrap: 'wrap' }}>
              <button onClick={() => onNav('ticket', evt.id, selected, qty, confirmedOrder)} style={{ background: '#C8891F', color: '#0F1208', border: 'none', borderRadius: 2, padding: '15px 28px', fontSize: 12, fontWeight: 700, letterSpacing: '.10em', textTransform: 'uppercase' }}>View Ticket</button>
              <button onClick={() => onNav('accounts', evt.id, selected, qty, confirmedOrder)} style={{ background: 'transparent', color: '#EFE8D5', border: '1px solid rgba(239,232,213,.4)', borderRadius: 2, padding: '15px 28px', fontSize: 12, fontWeight: 700, letterSpacing: '.10em', textTransform: 'uppercase' }}>My Account</button>
            </div>
          </section>
        )}
      </div>
    </main>
  )
}
