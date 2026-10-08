-- Run in the Supabase SQL editor.

create table if not exists public.products (
  id bigint generated always as identity primary key,
  name text not null,
  category text not null,
  price numeric(10,2) not null,
  color text default '#1e3a8a',
  description text,
  stock int default 0,
  featured boolean default false,
  rating numeric(2,1) default 4.5,
  badge text default '',
  image text default ''
);

create table if not exists public.profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  name text not null,
  role text not null default 'customer' check (role in ('customer', 'admin'))
);

alter table public.products enable row level security;
alter table public.profiles enable row level security;

grant select on public.products to anon, authenticated;
grant insert, update, delete on public.products to authenticated;
grant usage, select on sequence public.products_id_seq to authenticated;
grant select on public.profiles to authenticated;

drop policy if exists "Public read" on public.products;
drop policy if exists "Auth write" on public.products;
drop policy if exists "Admin insert products" on public.products;
drop policy if exists "Admin update products" on public.products;
drop policy if exists "Admin delete products" on public.products;
drop policy if exists "Read own profile" on public.profiles;

create policy "Public read" on public.products
  for select using (true);
create policy "Admin insert products" on public.products
  for insert to authenticated
  with check (
    exists (select 1 from public.profiles where id = (select auth.uid()) and role = 'admin')
  );
create policy "Admin update products" on public.products
  for update to authenticated
  using (
    exists (select 1 from public.profiles where id = (select auth.uid()) and role = 'admin')
  )
  with check (
    exists (select 1 from public.profiles where id = (select auth.uid()) and role = 'admin')
  );
create policy "Admin delete products" on public.products
  for delete to authenticated
  using (
    exists (select 1 from public.profiles where id = (select auth.uid()) and role = 'admin')
  );
create policy "Read own profile" on public.profiles
  for select to authenticated
  using (id = (select auth.uid()));

create or replace function public.handle_new_user()
returns trigger
language plpgsql
security definer
set search_path = ''
as $$
begin
  insert into public.profiles (id, name)
  values (
    new.id,
    coalesce(new.raw_user_meta_data ->> 'name', split_part(new.email, '@', 1))
  )
  on conflict (id) do nothing;
  return new;
end;
$$;

drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created
  after insert on auth.users
  for each row execute function public.handle_new_user();

insert into public.profiles (id, name)
select id, coalesce(raw_user_meta_data ->> 'name', split_part(email, '@', 1))
from auth.users
on conflict (id) do nothing;

insert into public.products (name, category, price, color, description, stock, featured, rating, badge, image)
select seed.name, seed.category, seed.price, seed.color, seed.description, seed.stock,
       seed.featured, seed.rating, seed.badge,
       'https://images.unsplash.com/photo-' || seed.photo_id || '?auto=format&fit=crop&w=800&h=1000&q=80'
from (values
  (1, 'Essential Tee Black', 'T-Shirts', 24, '#111111', 'Essential Tee Black. Soft, durable fabric with a clean modern cut. Designed to be worn on repeat and styled with anything.', 5, true, 4.0, 'New', '1618354691373-d851c5c3a990'),
  (2, 'Long Sleeve Crew White', 'T-Shirts', 32, '#f4f4f5', 'Long Sleeve Crew White. Soft, durable fabric with a clean modern cut. Designed to be worn on repeat and styled with anything.', 18, false, 4.7, '', '1620799140408-edc6dcb6d633'),
  (3, 'Classic White Tee', 'T-Shirts', 24, '#f4f4f5', 'Classic White Tee. Soft, durable fabric with a clean modern cut. Designed to be worn on repeat and styled with anything.', 31, false, 4.4, '', '1622445275463-afa2ab738c34'),
  (4, 'Moss Green Tee', 'T-Shirts', 26, '#5f7a5a', 'Moss Green Tee. Soft, durable fabric with a clean modern cut. Designed to be worn on repeat and styled with anything.', 44, false, 4.1, '', '1633966887768-64f9a867bdba'),
  (5, 'Brick Street Tee Black', 'T-Shirts', 28, '#111111', 'Brick Street Tee Black. Soft, durable fabric with a clean modern cut. Designed to be worn on repeat and styled with anything.', 17, false, 4.8, '', '1618453292459-53424b66bb6a'),
  (6, 'Tri-Color Tee Pack', 'T-Shirts', 59, '#1e3a8a', 'Tri-Color Tee Pack. Soft, durable fabric with a clean modern cut. Designed to be worn on repeat and styled with anything.', 30, true, 4.5, '', '1716541424893-734612ddcabb'),
  (7, 'Mono Crew Tee', 'T-Shirts', 29, '#3b3b3f', 'Mono Crew Tee. Soft, durable fabric with a clean modern cut. Designed to be worn on repeat and styled with anything.', 43, false, 4.2, '', '1618354691438-25bc04584c23'),
  (8, 'Black and White Duo Set', 'T-Shirts', 48, '#18181b', 'Black and White Duo Set. Soft, durable fabric with a clean modern cut. Designed to be worn on repeat and styled with anything.', 16, false, 4.9, 'New', '1693443687750-611ad77f3aba'),
  (9, 'Black and Sage Tee Set', 'T-Shirts', 46, '#8aa88a', 'Black and Sage Tee Set. Soft, durable fabric with a clean modern cut. Designed to be worn on repeat and styled with anything.', 29, false, 4.6, '', '1759572095384-1a7e646d0d4f'),
  (10, 'Studio White Tee', 'T-Shirts', 27, '#fafafa', 'Studio White Tee. Soft, durable fabric with a clean modern cut. Designed to be worn on repeat and styled with anything.', 42, false, 4.3, '', '1622445272461-c6580cab8755'),
  (11, 'Night Print Hoodie', 'Hoodies', 68, '#111111', 'Night Print Hoodie. Soft, durable fabric with a clean modern cut. Designed to be worn on repeat and styled with anything.', 15, true, 4.0, '', '1680292783974-a9a336c10366'),
  (12, 'Stone Fleece Hoodie', 'Hoodies', 66, '#9ca3af', 'Stone Fleece Hoodie. Soft, durable fabric with a clean modern cut. Designed to be worn on repeat and styled with anything.', 28, false, 4.7, 'Sale', '1564557287817-3785e38ec1f5'),
  (13, 'Mocha Pullover Hoodie', 'Hoodies', 70, '#7b5e4a', 'Mocha Pullover Hoodie. Soft, durable fabric with a clean modern cut. Designed to be worn on repeat and styled with anything.', 41, false, 4.4, '', '1578768079052-aa76e52ff62e'),
  (14, 'Ghost White Hoodie', 'Hoodies', 68, '#f1f1f3', 'Ghost White Hoodie. Soft, durable fabric with a clean modern cut. Designed to be worn on repeat and styled with anything.', 14, false, 4.1, '', '1615397587950-3cbb55f95b77'),
  (15, 'Monochrome Hoodie', 'Hoodies', 72, '#2a2a2e', 'Monochrome Hoodie. Soft, durable fabric with a clean modern cut. Designed to be worn on repeat and styled with anything.', 27, false, 4.8, 'New', '1614214191247-5b2d3a734f1b'),
  (16, 'Core Hoodie Black', 'Hoodies', 64, '#141414', 'Core Hoodie Black. Soft, durable fabric with a clean modern cut. Designed to be worn on repeat and styled with anything.', 40, true, 4.5, '', '1610582144787-eda2e6f293b4'),
  (17, 'Cloud Hoodie White', 'Hoodies', 69, '#fafafa', 'Cloud Hoodie White. Soft, durable fabric with a clean modern cut. Designed to be worn on repeat and styled with anything.', 13, false, 4.2, '', '1620799140188-3b2a02fd9a77'),
  (18, 'Cocoa Zip Hoodie', 'Hoodies', 74, '#6b4a3a', 'Cocoa Zip Hoodie. Soft, durable fabric with a clean modern cut. Designed to be worn on repeat and styled with anything.', 26, false, 4.9, '', '1548883354-94bcfe321cbb'),
  (19, 'Brown Bomber', 'Jackets', 98, '#6b4a3a', 'Brown Bomber. Soft, durable fabric with a clean modern cut. Designed to be worn on repeat and styled with anything.', 39, false, 4.6, '', '1591047139829-d91aecb6caea'),
  (20, 'Denim Button Jacket', 'Jackets', 84, '#4a6fa5', 'Denim Button Jacket. Soft, durable fabric with a clean modern cut. Designed to be worn on repeat and styled with anything.', 12, false, 4.3, '', '1611312449408-fcece27cdbb7'),
  (21, 'White Puffer Jacket', 'Jackets', 120, '#f5f5f5', 'White Puffer Jacket. Soft, durable fabric with a clean modern cut. Designed to be worn on repeat and styled with anything.', 25, true, 4.0, '', '1706765779494-2705542ebe74'),
  (22, 'Black Leather Jacket', 'Jackets', 129, '#0f0f10', 'Black Leather Jacket. Soft, durable fabric with a clean modern cut. Designed to be worn on repeat and styled with anything.', 38, false, 4.7, 'New', '1727515546577-f7d82a47b51d'),
  (23, 'Black Zip Jacket', 'Jackets', 79, '#111111', 'Black Zip Jacket. Soft, durable fabric with a clean modern cut. Designed to be worn on repeat and styled with anything.', 11, false, 4.4, 'Sale', '1605908502724-9093a79a1b39'),
  (24, 'Camel Coat', 'Jackets', 109, '#a98467', 'Camel Coat. Soft, durable fabric with a clean modern cut. Designed to be worn on repeat and styled with anything.', 24, false, 4.1, '', '1627637454030-5ddd536e06e5'),
  (25, 'Washed Blue Jacket', 'Jackets', 82, '#5b7fb0', 'Washed Blue Jacket. Soft, durable fabric with a clean modern cut. Designed to be worn on repeat and styled with anything.', 37, false, 4.8, '', '1543076447-215ad9ba6923'),
  (26, 'Sky Blue Shirt', 'Shirts', 54, '#7aa7d9', 'Sky Blue Shirt. Soft, durable fabric with a clean modern cut. Designed to be worn on repeat and styled with anything.', 10, true, 4.5, '', '1740711152088-88a009e877bb'),
  (27, 'White Button-Up', 'Shirts', 55, '#ffffff', 'White Button-Up. Soft, durable fabric with a clean modern cut. Designed to be worn on repeat and styled with anything.', 23, false, 4.2, '', '1603252109303-2751441dd157'),
  (28, 'Heart Print Button-Down', 'Shirts', 58, '#4a6fa5', 'Heart Print Button-Down. Soft, durable fabric with a clean modern cut. Designed to be worn on repeat and styled with anything.', 36, false, 4.9, '', '1596755094514-f87e34085b2c'),
  (29, 'Slate Grey Shirt', 'Shirts', 49, '#9ca3af', 'Slate Grey Shirt. Soft, durable fabric with a clean modern cut. Designed to be worn on repeat and styled with anything.', 9, false, 4.6, 'New', '1564584217132-2271feaeb3c5'),
  (30, 'Heritage Shirt Set', 'Shirts', 79, '#1e3a8a', 'Heritage Shirt Set. Soft, durable fabric with a clean modern cut. Designed to be worn on repeat and styled with anything.', 22, false, 4.3, '', '1489987707025-afc232f7ea0f')
) as seed(sort_order, name, category, price, color, description, stock, featured, rating, badge, photo_id)
where not exists (select 1 from public.products)
order by seed.sort_order;
