# Velour Store

React + Vite minimalist clothing store.

    npm install
    npm run dev

## Structure
- `src/components/<area>`: UI split by domain (layout, product, cart, auth, admin, home, common)
- `src/pages`: route level screens
- `src/context`: global state (auth, cart, wishlist, products, toast)
- `src/services`: data access. Each function has a Supabase branch and a localStorage demo branch
- `src/routes`: router and route guards
- `supabase/schema.sql`: products table and policies

## Supabase
1. Create a project and run `supabase/schema.sql`
2. Copy `.env.example` to `.env`, fill in URL and anon key
3. Add admin emails to `VITE_ADMIN_EMAILS`

Demo mode (no env) admin login: admin@demo.com / admin123
