create extension if not exists pgcrypto;

create table if not exists public.farms (
  id text primary key,
  dn text not null unique,
  title text not null,
  category text not null check (category in ('java', 'bedrock', 'build')),
  farm_type text not null,
  description text not null,
  detailed_description text,
  world_download_url text not null default 'link',
  schematic_url text,
  youtube_url text not null default '',
  version text,
  rates text,
  difficulty text check (difficulty in ('Easy', 'Medium', 'Hard', 'Expert')),
  tags text[] not null default '{}',
  thumbnail_url text,
  author text,
  date date,
  featured boolean not null default false,
  views bigint not null default 0 check (views >= 0),
  materials jsonb not null default '[]'::jsonb,
  schematic_path text,
  created_at timestamptz not null default timezone('utc', now()),
  updated_at timestamptz not null default timezone('utc', now())
);

create index if not exists farms_category_idx on public.farms (category);
create index if not exists farms_farm_type_idx on public.farms (farm_type);
create index if not exists farms_featured_date_idx on public.farms (featured desc, date desc nulls last);
create index if not exists farms_tags_idx on public.farms using gin (tags);
create index if not exists farms_search_idx on public.farms using gin (
  to_tsvector('simple', coalesce(title, '') || ' ' || coalesce(description, '') || ' ' || coalesce(farm_type, '') || ' ' || coalesce(dn, '') || ' ' || coalesce(version, ''))
);

create or replace function public.set_farms_updated_at()
returns trigger
language plpgsql
as $$
begin
  new.updated_at = timezone('utc', now());
  return new;
end;
$$;

drop trigger if exists farms_updated_at on public.farms;
create trigger farms_updated_at
before update on public.farms
for each row execute function public.set_farms_updated_at();

create or replace function public.can_manage_farms()
returns boolean
language sql
stable
as $$
  select coalesce((auth.jwt() -> 'app_metadata' ->> 'farm_admin')::boolean, false);
$$;

alter table public.farms enable row level security;
drop policy if exists "Farms are publicly readable" on public.farms;
create policy "Farms are publicly readable" on public.farms for select using (true);
drop policy if exists "Farm managers can insert" on public.farms;
create policy "Farm managers can insert" on public.farms for insert with check (public.can_manage_farms());
drop policy if exists "Farm managers can update" on public.farms;
create policy "Farm managers can update" on public.farms for update using (public.can_manage_farms()) with check (public.can_manage_farms());
drop policy if exists "Farm managers can delete" on public.farms;
create policy "Farm managers can delete" on public.farms for delete using (public.can_manage_farms());

insert into storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
values ('schematics', 'schematics', true, 52428800, array[
  'application/octet-stream',
  'application/x-binary',
  'application/zip',
  'application/x-zip-compressed'
])
on conflict (id) do update set
  public = excluded.public,
  file_size_limit = excluded.file_size_limit,
  allowed_mime_types = excluded.allowed_mime_types;

drop policy if exists "Schematics are publicly readable" on storage.objects;
create policy "Schematics are publicly readable" on storage.objects
for select using (bucket_id = 'schematics');
drop policy if exists "Farm managers can upload schematics" on storage.objects;
create policy "Farm managers can upload schematics" on storage.objects
for insert with check (bucket_id = 'schematics' and public.can_manage_farms());
drop policy if exists "Farm managers can update schematics" on storage.objects;
create policy "Farm managers can update schematics" on storage.objects
for update using (bucket_id = 'schematics' and public.can_manage_farms())
with check (bucket_id = 'schematics' and public.can_manage_farms());
drop policy if exists "Farm managers can delete schematics" on storage.objects;
create policy "Farm managers can delete schematics" on storage.objects
for delete using (bucket_id = 'schematics' and public.can_manage_farms());