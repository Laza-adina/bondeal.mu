-- Exécuter dans le SQL Editor du projet Supabase.
create table if not exists public.products (
 id text primary key,
 name text not null,
 category text not null,
 price numeric not null check (price >= 0),
 "oldPrice" numeric not null default 0,
 image text not null,
 stock integer not null default 0 check (stock >= 0)
);
alter table public.products enable row level security;
create policy "Public catalogue read" on public.products for select to anon, authenticated using (true);
-- Aucun droit d'écriture public. Le back-office actuel est une démonstration locale.
