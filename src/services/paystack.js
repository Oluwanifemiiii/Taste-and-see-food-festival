const PAYSTACK_PUBLIC_KEY = import.meta.env.VITE_PAYSTACK_PUBLIC_KEY

export const isPaystackConfigured = Boolean(PAYSTACK_PUBLIC_KEY)

function loadPaystackScript() {
  return new Promise((resolve, reject) => {
    if (window.PaystackPop) {
      resolve(window.PaystackPop)
      return
    }

    const script = document.createElement('script')
    script.src = 'https://js.paystack.co/v1/inline.js'
    script.onload = () => resolve(window.PaystackPop)
    script.onerror = () => reject(new Error('Paystack checkout script could not be loaded.'))
    document.body.appendChild(script)
  })
}

export async function startPaystackPayment({ email, amount, reference, metadata }) {
  if (!isPaystackConfigured) {
    return {
      reference,
      status: 'demo_success',
      message: 'Demo checkout completed. Add VITE_PAYSTACK_PUBLIC_KEY for live Paystack payments.',
    }
  }

  const PaystackPop = await loadPaystackScript()

  return new Promise((resolve, reject) => {
    const handler = PaystackPop.setup({
      key: PAYSTACK_PUBLIC_KEY,
      email,
      amount: amount * 100,
      currency: 'NGN',
      ref: reference,
      metadata,
      callback: (response) => resolve(response),
      onClose: () => reject(new Error('Payment window was closed before confirmation.')),
    })

    handler.openIframe()
  })
}
