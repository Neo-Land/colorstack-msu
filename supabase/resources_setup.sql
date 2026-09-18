create table if not exists public.resources (
  id uuid primary key default gen_random_uuid(),
  sort_order integer not null default 1,
  title text not null,
  event text not null default 'Resource',
  description text not null,
  "date" text not null default 'ColorStack MSU',
  image text not null,
  slides_url text not null,
  is_active boolean not null default true,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index if not exists resources_sort_order_idx
  on public.resources (sort_order);

alter table public.resources enable row level security;

drop policy if exists "Published resources are readable by everyone" on public.resources;
create policy "Published resources are readable by everyone"
  on public.resources
  for select
  using (is_active or auth.role() = 'authenticated');

drop policy if exists "Authenticated users can manage resources" on public.resources;
create policy "Authenticated users can manage resources"
  on public.resources
  for all
  to authenticated
  using (true)
  with check (true);

insert into storage.buckets (id, name, public)
values ('resource-images', 'resource-images', true)
on conflict (id) do update set public = true;

drop policy if exists "Resource images are public" on storage.objects;
create policy "Resource images are public"
  on storage.objects
  for select
  using (bucket_id = 'resource-images');

drop policy if exists "Authenticated users can upload resource images" on storage.objects;
create policy "Authenticated users can upload resource images"
  on storage.objects
  for insert
  to authenticated
  with check (bucket_id = 'resource-images');

drop policy if exists "Authenticated users can update resource images" on storage.objects;
create policy "Authenticated users can update resource images"
  on storage.objects
  for update
  to authenticated
  using (bucket_id = 'resource-images')
  with check (bucket_id = 'resource-images');

drop policy if exists "Authenticated users can delete resource images" on storage.objects;
create policy "Authenticated users can delete resource images"
  on storage.objects
  for delete
  to authenticated
  using (bucket_id = 'resource-images');

insert into public.resources (
  sort_order,
  title,
  event,
  description,
  "date",
  image,
  slides_url,
  is_active
)
select
  1,
  'Freshman Schedule Help Day',
  'Workshop Slides',
  'Presentation deck from our schedule planning session, built to help members choose classes and plan a stronger semester.',
  'ColorStack MSU',
  '/resources/ScheduleHelpDay.png',
  'https://canva.link/xk9xdoog1q9nt89',
  true
where not exists (
  select 1
  from public.resources
  where title = 'Freshman Schedule Help Day'
);
