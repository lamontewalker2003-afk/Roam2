create extension if not exists pgcrypto;

create table if not exists public.site_settings (
  id uuid primary key default gen_random_uuid(),
  whatsapp_label text not null default '+254 740 666 555',
  whatsapp_link text not null default 'https://wa.me/254740666555',
  contact_email text not null default 'info@roam-electric.com',
  contact_phone text not null default '+254 740 666 555',
  footer_message text not null default 'Reach out to discover how Roam is transforming electric mobility.',
  updated_at timestamptz not null default now()
);

alter table public.site_settings enable row level security;

insert into public.site_settings (whatsapp_label, whatsapp_link, contact_email, contact_phone, footer_message)
values ('+254 740 666 555', 'https://wa.me/254740666555', 'info@roam-electric.com', '+254 740 666 555', 'Reach out to discover how Roam is transforming electric mobility.')
on conflict (id) do nothing;
