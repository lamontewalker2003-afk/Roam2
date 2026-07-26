alter table public.financing_applications enable row level security;

do $$
begin
  if not exists (
    select 1
    from pg_policies
    where schemaname = 'public'
      and tablename = 'financing_applications'
      and policyname = 'Allow public read access to financing applications'
  ) then
    create policy "Allow public read access to financing applications"
    on public.financing_applications
    for select
    using (true);
  end if;
end
$$;

do $$
begin
  if not exists (
    select 1
    from pg_policies
    where schemaname = 'public'
      and tablename = 'financing_applications'
      and policyname = 'Allow public insert access to financing applications'
  ) then
    create policy "Allow public insert access to financing applications"
    on public.financing_applications
    for insert
    with check (true);
  end if;
end
$$;

do $$
begin
  if not exists (
    select 1
    from pg_policies
    where schemaname = 'public'
      and tablename = 'financing_applications'
      and policyname = 'Allow authenticated updates to financing applications'
  ) then
    create policy "Allow authenticated updates to financing applications"
    on public.financing_applications
    for update
    using (auth.role() = 'authenticated')
    with check (auth.role() = 'authenticated');
  end if;
end
$$;
