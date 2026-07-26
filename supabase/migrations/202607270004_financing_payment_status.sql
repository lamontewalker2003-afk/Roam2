alter table public.financing_applications
  add column if not exists payment_status text default 'pending',
  add column if not exists deposit_paid boolean default false,
  add column if not exists full_payment_confirmed boolean default false;
