# Cee2Sweet

Next.js storefront foundation for a premium Sierra Leone hair vendor.

## Start locally

1. Copy `.env.local.example` to `.env.local` and add Supabase project values when ready.
2. `npm install`
3. `npm run dev`

The storefront uses a seeded local catalogue so it is usable without credentials. The migration in `supabase/migrations` defines the production database, RLS baseline, products, images, customers and orders. Before enabling admin operations, implement Supabase Auth plus server-side role checks (never from UI visibility alone).

## Current functionality

- Responsive storefront, catalogue and product detail pages
- Persistent browser cart with stock-aware quantity checks
- Sierra Leonean Leone formatting and checkout form
- Safe, provider-neutral payment method placeholders
- Admin route shells ready to connect to protected Supabase data
