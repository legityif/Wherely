-- ─── profiles
-- Extends Supabase auth.users (created automatically on sign-up / anon sign-in)
create table if not exists public.profiles (
  id              uuid primary key references auth.users(id) on delete cascade,
  radius_km       int not null default 5 check (radius_km in (2, 5, 10)),
  streak_count    int not null default 0,
  last_opened_at  timestamptz
);

alter table public.profiles enable row level security;

create policy "Users can read own profile"
  on public.profiles for select
  using (auth.uid() = id);

create policy "Users can update own profile"
  on public.profiles for update
  using (auth.uid() = id);

-- Auto-create a profile row when a new user is created
create or replace function public.handle_new_user()
returns trigger as $$
begin
  insert into public.profiles (id) values (new.id);
  return new;
end;
$$ language plpgsql security definer;

create or replace trigger on_auth_user_created
  after insert on auth.users
  for each row execute function public.handle_new_user();

-- ─── places ───────────────────────────────────────────────────────────────────
-- Cached Google Places data (keyed by Google place_id)
create table if not exists public.places (
  id           text primary key,       -- Google place_id
  name         text not null,
  category     text not null,
  lat          double precision not null,
  lng          double precision not null,
  photos       jsonb not null default '[]',  -- array of photo URLs
  description  text,
  why_today    text,
  cached_at    timestamptz not null default now()
);

alter table public.places enable row level security;

-- All authenticated users can read places
create policy "Authenticated users can read places"
  on public.places for select
  using (auth.role() = 'authenticated');

-- Only service role can insert/update (via Edge Functions)
create policy "Service role can manage places"
  on public.places for all
  using (auth.role() = 'service_role');

-- ─── daily_picks ──────────────────────────────────────────────────────────────
-- One place per user per day
create table if not exists public.daily_picks (
  id         uuid primary key default gen_random_uuid(),
  user_id    uuid not null references public.profiles(id) on delete cascade,
  place_id   text not null references public.places(id),
  date       date not null default current_date,
  unique (user_id, date)
);

alter table public.daily_picks enable row level security;

create policy "Users can read own daily picks"
  on public.daily_picks for select
  using (auth.uid() = user_id);

-- ─── interactions ─────────────────────────────────────────────────────────────
-- User reactions: liked | skipped | saved
do $$ begin
  create type interaction_action as enum ('liked', 'skipped', 'saved');
exception when duplicate_object then null;
end $$;

create table if not exists public.interactions (
  id         uuid primary key default gen_random_uuid(),
  user_id    uuid not null references public.profiles(id) on delete cascade,
  place_id   text not null references public.places(id),
  action     interaction_action not null,
  created_at timestamptz not null default now(),
  unique (user_id, place_id)              -- one reaction per place (upsert replaces)
);

alter table public.interactions enable row level security;

create policy "Users can manage own interactions"
  on public.interactions for all
  using (auth.uid() = user_id);
