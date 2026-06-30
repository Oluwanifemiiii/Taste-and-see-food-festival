const RESEND_API_KEY = Deno.env.get('RESEND_API_KEY') || ''
const FROM_EMAIL = Deno.env.get('FROM_EMAIL') || 'Taste and See Festival <tickets@example.com>'
const SITE_URL = Deno.env.get('SITE_URL') || 'https://tasteandsee.ng'
const ALLOWED_ORIGIN = new URL(SITE_URL).origin

function corsHeaders(request: Request) {
  const origin = request.headers.get('origin') || ''
  return {
    'Access-Control-Allow-Origin': origin === ALLOWED_ORIGIN ? origin : ALLOWED_ORIGIN,
    'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
  }
}

function money(value: number) {
  return `₦${Number(value || 0).toLocaleString('en-NG')}`
}

function ticketEmailHtml({ order, event, ticketLabel }: any) {
  const lookupUrl = `${SITE_URL.replace(/\/$/, '')}/lookup`
  return `
  <!doctype html>
  <html>
    <body style="margin:0;background:#0F1208;color:#EFE8D5;font-family:Arial,sans-serif;">
      <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:#0F1208;padding:32px 16px;">
        <tr>
          <td align="center">
            <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="max-width:640px;background:#1E2418;border:1px solid #2A3020;border-radius:10px;overflow:hidden;">
              <tr>
                <td style="padding:34px 32px;text-align:center;border-bottom:6px solid #C8891F;">
                  <div style="font-size:26px;letter-spacing:.04em;font-weight:700;color:#EFE8D5;">TASTE &amp; SEE</div>
                  <div style="font-size:11px;letter-spacing:.22em;text-transform:uppercase;color:#C8891F;margin-top:6px;">Festival by Lamide Foods</div>
                </td>
              </tr>
              <tr>
                <td style="padding:34px 32px;">
                  <p style="font-size:12px;letter-spacing:.16em;text-transform:uppercase;color:#C8891F;margin:0 0 14px;">Ticket Confirmed</p>
                  <h1 style="font-size:32px;line-height:1.15;color:#EFE8D5;margin:0 0 14px;">${event.title}</h1>
                  <p style="font-size:15px;line-height:1.7;color:#A89B80;margin:0 0 26px;">Hello ${order.attendee_name}, your ${ticketLabel} ticket is confirmed. Present this email or your ticket reference at the gate.</p>

                  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:#252C1A;border:1px solid #3D5030;border-radius:8px;margin-bottom:24px;">
                    <tr>
                      <td style="padding:18px;color:#A89B80;font-size:12px;text-transform:uppercase;letter-spacing:.12em;">Ticket ID</td>
                      <td style="padding:18px;color:#C8891F;font-size:15px;font-family:monospace;text-align:right;">${order.reference}</td>
                    </tr>
                    <tr>
                      <td style="padding:18px;color:#A89B80;font-size:12px;text-transform:uppercase;letter-spacing:.12em;border-top:1px solid #3D5030;">Date</td>
                      <td style="padding:18px;color:#EFE8D5;font-size:14px;text-align:right;border-top:1px solid #3D5030;">${event.date}</td>
                    </tr>
                    <tr>
                      <td style="padding:18px;color:#A89B80;font-size:12px;text-transform:uppercase;letter-spacing:.12em;border-top:1px solid #3D5030;">Time</td>
                      <td style="padding:18px;color:#EFE8D5;font-size:14px;text-align:right;border-top:1px solid #3D5030;">${event.time}</td>
                    </tr>
                    <tr>
                      <td style="padding:18px;color:#A89B80;font-size:12px;text-transform:uppercase;letter-spacing:.12em;border-top:1px solid #3D5030;">Location</td>
                      <td style="padding:18px;color:#EFE8D5;font-size:14px;text-align:right;border-top:1px solid #3D5030;">${event.location}</td>
                    </tr>
                    <tr>
                      <td style="padding:18px;color:#A89B80;font-size:12px;text-transform:uppercase;letter-spacing:.12em;border-top:1px solid #3D5030;">Total Paid</td>
                      <td style="padding:18px;color:#C8891F;font-size:18px;text-align:right;border-top:1px solid #3D5030;">${money(order.total)}</td>
                    </tr>
                  </table>

                  <a href="${lookupUrl}" style="display:inline-block;background:#C8891F;color:#0F1208;text-decoration:none;padding:14px 22px;border-radius:3px;font-size:12px;font-weight:700;letter-spacing:.12em;text-transform:uppercase;">Recover Ticket</a>
                  <p style="font-size:12px;line-height:1.7;color:#A89B80;margin:24px 0 0;">You can recover your ticket anytime with your ticket ID and checkout email at ${lookupUrl}.</p>
                </td>
              </tr>
              <tr>
                <td style="padding:18px 32px;background:#161C10;color:#4A5C3E;font-size:11px;letter-spacing:.08em;text-align:center;">Eat. Remember. Return.</td>
              </tr>
            </table>
          </td>
        </tr>
      </table>
    </body>
  </html>`
}

Deno.serve(async (request) => {
  const headers = corsHeaders(request)
  if (request.method === 'OPTIONS') {
    return new Response('ok', { headers })
  }

  if (request.method !== 'POST') {
    return new Response('Method not allowed', { status: 405, headers })
  }

  if (!RESEND_API_KEY) {
    return Response.json({ skipped: true, message: 'RESEND_API_KEY is not configured.' }, { headers })
  }

  const payload = await request.json()
  const { order, event, ticketLabel } = payload

  const response = await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${RESEND_API_KEY}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      from: FROM_EMAIL,
      to: order.attendee_email,
      subject: `Your Taste and See ticket: ${event.title}`,
      html: ticketEmailHtml({ order, event, ticketLabel }),
    }),
  })

  if (!response.ok) {
    return new Response(await response.text(), { status: 502, headers })
  }

  return Response.json(await response.json(), { headers })
})
