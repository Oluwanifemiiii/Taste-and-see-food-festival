# Taste and See Festival Production Checklist

## Required Services

1. Create a Supabase project.
2. Run `supabase-schema.sql` in the Supabase SQL editor.
3. Add real admin users to `admin_users` after they create Supabase Auth accounts.
4. Create a Paystack business account and get test/live keys.
5. Deploy `supabase/functions/paystack-webhook` and add its URL to Paystack webhooks.
6. Deploy `supabase/functions/send-ticket-email` for ticket confirmation emails.
7. Create a public Supabase Storage bucket named `event-images`, or run the schema to create it.

## Environment Variables

Copy `.env.example` to `.env.local` for local development and set:

- `VITE_SUPABASE_URL`
- `VITE_SUPABASE_ANON_KEY`
- `VITE_PAYSTACK_PUBLIC_KEY`
- `VITE_ADMIN_EMAILS`

Set these as Supabase Edge Function secrets:

- `PAYSTACK_SECRET_KEY`
- `SUPABASE_SERVICE_ROLE_KEY`
- `RESEND_API_KEY`
- `FROM_EMAIL`
- `SITE_URL`

## Launch Must-Dos

- Replace placeholder legal text with lawyer-reviewed Nigerian terms, privacy, refund, vendor, and media policies.
- Use live Paystack keys only after webhook verification is deployed.
- Replace placeholder imagery with licensed Nigerian food, festival, chef, and marketplace photography.
- Test guest checkout, account signup, admin login, sponsor lead submission, vendor lead submission, and mobile views.
- Test admin event creation and image upload from `/admin`.
- Decide whether Supabase Auth should require email confirmation. If enabled, users must confirm their email before sign-in.
- If Supabase SMTP is not configured yet, disable email confirmation in Supabase Auth settings for testing, or use the app's fallback account mode. The fallback keeps the UI usable, but full authenticated Supabase reads require a confirmed/login session.
- Test guest ticket recovery at `/lookup` with ticket reference and checkout email.
- Confirm ticket email delivery through Resend after successful checkout.
- Add monitoring for failed Paystack callbacks and failed Supabase writes.

## Security Notes

- Guest ticket purchase is supported and should remain enabled.
- Admin access is checked in the frontend through `VITE_ADMIN_EMAILS`, but the database policies are the real guard. Keep `admin_users` accurate.
- Do not expose `SUPABASE_SERVICE_ROLE_KEY` in the frontend. It belongs only in Supabase Edge Function secrets.
- Keep Paystack secret key server-side only.
