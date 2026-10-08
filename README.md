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
1. In your Supabase project, open **SQL Editor**, run `supabase/schema.sql`. This creates the products and profiles tables, their row-level security policies, and seeds the catalog if the products table is empty. It also creates profiles for existing Supabase Auth users.
2. Copy `.env.example` to `.env` and set `VITE_SUPABASE_URL` and either `VITE_SUPABASE_PUBLISHABLE_KEY` or `VITE_SUPABASE_ANON_KEY` from **Project Settings → API**. The app accepts either key name. These public client keys are intended for browser use; never put a service-role key in the frontend.
3. Restart `npm run dev` after changing `.env`. New sign-ups are stored in Supabase Auth, with a `profiles` row automatically created for each user. If email confirmation is enabled in Supabase Auth, confirm the email before signing in. Products are read from and managed in the Supabase `products` table.
4. To grant admin access, sign up through the app, then run this in the SQL Editor, replacing the email:

   ```sql
   update public.profiles
   set role = 'admin'
   where id = (select id from auth.users where lower(email) = lower('you@example.com'));
   ```

   Product write policies check this database role. Do not grant admin access using a frontend environment variable.

Existing demo accounts and products in browser `localStorage` are not automatically uploaded. Supabase Auth does not allow importing those passwords from the browser; users should create accounts again after connecting Supabase. The catalog seed in `supabase/schema.sql` populates a fresh, empty products table.

Demo mode (no env) admin login: admin@demo.com / admin123
