-- Run in the Supabase SQL editor
create table if not exists products (
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
alter table products enable row level security;
create policy "Public read" on products for select using (true);
-- Tighten this for production (e.g. check a profiles.role = 'admin')
create policy "Auth write" on products for all using (auth.role() = 'authenticated');
