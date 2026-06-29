const PAYSTACK_SECRET_KEY = Deno.env.get('PAYSTACK_SECRET_KEY') || ''
const SUPABASE_URL = Deno.env.get('SUPABASE_URL') || ''
const SUPABASE_SERVICE_ROLE_KEY = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') || ''

async function hmacSha512(message: string, secret: string) {
  const key = await crypto.subtle.importKey(
    'raw',
    new TextEncoder().encode(secret),
    { name: 'HMAC', hash: 'SHA-512' },
    false,
    ['sign'],
  )
  const signature = await crypto.subtle.sign('HMAC', key, new TextEncoder().encode(message))
  return Array.from(new Uint8Array(signature)).map(byte => byte.toString(16).padStart(2, '0')).join('')
}

async function supabaseRequest(path: string, init: RequestInit) {
  return fetch(`${SUPABASE_URL}/rest/v1/${path}`, {
    ...init,
    headers: {
      apikey: SUPABASE_SERVICE_ROLE_KEY,
      Authorization: `Bearer ${SUPABASE_SERVICE_ROLE_KEY}`,
      'Content-Type': 'application/json',
      Prefer: 'return=representation',
      ...(init.headers || {}),
    },
  })
}

Deno.serve(async (request) => {
  if (request.method !== 'POST') {
    return new Response('Method not allowed', { status: 405 })
  }

  const rawBody = await request.text()
  const expected = await hmacSha512(rawBody, PAYSTACK_SECRET_KEY)
  const received = request.headers.get('x-paystack-signature') || ''

  if (!PAYSTACK_SECRET_KEY || expected !== received) {
    return new Response('Invalid signature', { status: 401 })
  }

  const payload = JSON.parse(rawBody)
  const reference = payload?.data?.reference
  const event = payload?.event || 'unknown'

  await supabaseRequest('payment_webhooks', {
    method: 'POST',
    body: JSON.stringify({
      event,
      reference,
      payload,
    }),
  })

  if (event === 'charge.success' && reference) {
    await supabaseRequest(`orders?reference=eq.${encodeURIComponent(reference)}`, {
      method: 'PATCH',
      body: JSON.stringify({ payment_status: 'verified' }),
    })
  }

  return Response.json({ received: true })
})
