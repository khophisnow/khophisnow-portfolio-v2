-- DareDeck online rooms
-- Run this in Supabase SQL Editor before using online multiplayer.

create table if not exists public.daredeck_rooms (
  room_id text primary key,
  state jsonb not null,
  updated_at timestamptz not null default now()
);

alter table public.daredeck_rooms enable row level security;

-- Public room links are treated like secret invite URLs. Anyone with the room id can read or update that room.
-- This is intentionally lightweight for a portfolio multiplayer demo with no accounts.
do $$
begin
  if not exists (select 1 from pg_policies where schemaname = 'public' and tablename = 'daredeck_rooms' and policyname = 'DareDeck rooms are readable by invite link') then
    create policy "DareDeck rooms are readable by invite link"
      on public.daredeck_rooms for select
      to anon
      using (true);
  end if;

  if not exists (select 1 from pg_policies where schemaname = 'public' and tablename = 'daredeck_rooms' and policyname = 'DareDeck rooms can be created by browser clients') then
    create policy "DareDeck rooms can be created by browser clients"
      on public.daredeck_rooms for insert
      to anon
      with check (true);
  end if;

  if not exists (select 1 from pg_policies where schemaname = 'public' and tablename = 'daredeck_rooms' and policyname = 'DareDeck rooms can be updated by invite link') then
    create policy "DareDeck rooms can be updated by invite link"
      on public.daredeck_rooms for update
      to anon
      using (true)
      with check (true);
  end if;
end $$;

do $$
begin
  alter publication supabase_realtime add table public.daredeck_rooms;
exception
  when duplicate_object then null;
end $$;
