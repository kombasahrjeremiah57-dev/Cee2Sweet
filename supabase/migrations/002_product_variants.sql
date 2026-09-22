create table public.product_variants (
  id uuid primary key default gen_random_uuid(),
  product_id uuid not null references public.products(id) on delete cascade,
  length text,
  color text,
  options jsonb not null default '{}'::jsonb,
  price numeric(12,2) not null check (price >= 0),
  compare_at_price numeric(12,2) check (compare_at_price >= 0),
  stock_quantity integer not null default 0 check (stock_quantity >= 0),
  sku text not null unique,
  is_active boolean not null default true,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);
create index product_variants_product_idx on public.product_variants(product_id);
create index product_variants_active_idx on public.product_variants(product_id, is_active);
alter table public.product_variants enable row level security;
create or replace function public.is_admin() returns boolean language sql security definer set search_path = public stable as $$ select exists(select 1 from public.profiles where id = auth.uid() and role = 'admin'); $$;
create policy "public active variant reads" on public.product_variants for select using (is_active = true);
create policy "admin variant management" on public.product_variants for all using (public.is_admin()) with check (public.is_admin());
alter table public.order_items add column if not exists variant_id uuid references public.product_variants(id) on delete set null;
alter table public.order_items add column if not exists options jsonb not null default '{}'::jsonb;
