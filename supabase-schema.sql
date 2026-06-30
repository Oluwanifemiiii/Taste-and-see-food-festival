create extension if not exists "pgcrypto";

create table if not exists orders (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz not null default now(),
  reference text not null unique,
  payment_status text not null,
  event_id integer not null,
  event_title text not null,
  ticket_type text not null check (ticket_type in ('regular', 'premium', 'vip')),
  quantity integer not null check (quantity > 0),
  subtotal integer not null,
  vat integer not null,
  total integer not null,
  attendee_name text not null,
  attendee_email text not null,
  attendee_phone text not null,
  dietary text
);

create table if not exists leads (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz not null default now(),
  type text not null,
  name text not null,
  email text not null,
  phone text not null,
  interest text not null,
  note text
);

create table if not exists event_checkins (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz not null default now(),
  order_reference text not null references orders(reference),
  checked_in_by text,
  checked_in_at timestamptz not null default now()
);

create table if not exists payment_webhooks (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz not null default now(),
  provider text not null default 'paystack',
  event text not null,
  reference text,
  payload jsonb not null
);

create table if not exists admin_users (
  email text primary key,
  created_at timestamptz not null default now()
);

alter table orders enable row level security;
alter table leads enable row level security;
alter table event_checkins enable row level security;
alter table payment_webhooks enable row level security;
alter table admin_users enable row level security;

create policy "public can create orders"
on orders for insert
to anon
with check (true);

create policy "signed in users can create orders"
on orders for insert
to authenticated
with check (true);

create policy "users can read their own orders"
on orders for select
to authenticated
using (lower(attendee_email) = lower(auth.jwt() ->> 'email'));

create or replace function public.lookup_ticket(ticket_reference text, ticket_email text)
returns table (
  reference text,
  payment_status text,
  event_id integer,
  event_title text,
  ticket_type text,
  quantity integer,
  total integer,
  attendee_name text,
  attendee_email text,
  attendee_phone text,
  dietary text
)
language sql
security definer
set search_path = public
as $$
  select
    orders.reference,
    orders.payment_status,
    orders.event_id,
    orders.event_title,
    orders.ticket_type,
    orders.quantity,
    orders.total,
    orders.attendee_name,
    orders.attendee_email,
    orders.attendee_phone,
    orders.dietary
  from orders
  where lower(orders.reference) = lower(ticket_reference)
    and lower(orders.attendee_email) = lower(ticket_email)
  limit 1;
$$;

create policy "public can create leads"
on leads for insert
to anon
with check (true);

create policy "signed in users can create leads"
on leads for insert
to authenticated
with check (true);

create policy "admins can read admin list"
on admin_users for select
to authenticated
using (lower(email) = lower(auth.jwt() ->> 'email'));

grant execute on function public.lookup_ticket(text, text) to anon, authenticated;

create policy "admins can read orders"
on orders for select
to authenticated
using (
  exists (
    select 1 from admin_users
    where lower(admin_users.email) = lower(auth.jwt() ->> 'email')
  )
);

create policy "admins can read leads"
on leads for select
to authenticated
using (
  exists (
    select 1 from admin_users
    where lower(admin_users.email) = lower(auth.jwt() ->> 'email')
  )
);

create policy "admins can create checkins"
on event_checkins for insert
to authenticated
with check (
  exists (
    select 1 from admin_users
    where lower(admin_users.email) = lower(auth.jwt() ->> 'email')
  )
);

-- Add launch admins after creating their Supabase Auth users:
-- insert into admin_users (email) values ('founder@example.com');
