import Footer from '../components/Footer'

const sections = [
  {
    title: 'Privacy',
    body: 'Taste and See collects attendee details, ticket purchases, dietary notes, vendor leads, and sponsor enquiries only for festival operations, customer support, safety, analytics, and legally required records.',
  },
  {
    title: 'Payments & Refunds',
    body: 'Tickets are confirmed after successful payment verification. Refund windows, transfer rules, and event postponement policies should be finalized before launch and displayed here with exact timelines.',
  },
  {
    title: 'Ticket Terms',
    body: 'Guests must present a valid ticket reference or QR code at entry. Tickets may be checked against the order database and can be invalidated if duplicated, refunded, or fraudulently obtained.',
  },
  {
    title: 'Vendor Terms',
    body: 'Vendor approval is subject to curation, food safety checks, booth availability, event theme fit, and payment confirmation. Vendors remain responsible for licensing, hygiene, staff conduct, and product liability.',
  },
  {
    title: 'Content & Media',
    body: 'Events may be photographed or recorded for documentary, marketing, education, and licensing purposes. Guests and partners should be notified clearly at ticket purchase and venue entry.',
  },
]

export default function Legal({ onNav }) {
  return (
    <main style={{ minHeight: '100vh', background: '#0F1208', paddingTop: 72 }}>
      <section style={{ padding: '90px 48px', maxWidth: 980, margin: '0 auto' }}>
        <p style={{ fontSize: 10, fontWeight: 700, letterSpacing: '.18em', textTransform: 'uppercase', color: '#C8891F', marginBottom: 16 }}>Launch Policies</p>
        <h1 style={{ fontSize: 'clamp(40px,5vw,64px)', lineHeight: 1.1, fontFamily: "'Yeseva One',serif", color: '#EFE8D5', marginBottom: 20 }}>Terms, privacy, refunds, and operating policies.</h1>
        <p style={{ fontSize: 15, lineHeight: 1.8, color: '#A89B80', marginBottom: 42 }}>These policy blocks are production placeholders. Have a Nigerian legal advisor review and finalize them before accepting live payments.</p>

        <div style={{ display: 'grid', gap: 18 }}>
          {sections.map(section => (
            <article key={section.title} style={{ background: '#1E2418', border: '.5px solid #2A3020', borderRadius: 8, padding: 28 }}>
              <h2 style={{ fontSize: 24, fontFamily: "'Yeseva One',serif", color: '#EFE8D5', marginBottom: 12 }}>{section.title}</h2>
              <p style={{ fontSize: 14, lineHeight: 1.8, color: '#A89B80' }}>{section.body}</p>
            </article>
          ))}
        </div>

        <div style={{ marginTop: 34, textAlign: 'center' }}>
          <button onClick={() => onNav('checkout')} style={{ background: '#C8891F', color: '#0F1208', border: 'none', borderRadius: 2, padding: '15px 28px', fontSize: 12, fontWeight: 700, letterSpacing: '.10em', textTransform: 'uppercase' }}>Continue to Tickets</button>
        </div>
      </section>
      <Footer onNav={onNav} />
    </main>
  )
}
