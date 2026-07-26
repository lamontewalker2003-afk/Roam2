alter table public.financing_applications
  add column if not exists payment_method text,
  add column if not exists payment_till_number text,
  add column if not exists payment_paybill_number text,
  add column if not exists payment_account_number text;
