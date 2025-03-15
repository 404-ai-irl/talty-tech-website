create table public.leads (
  id uuid not null default gen_random_uuid (),
  name text not null,
  email text not null,
  phone text null,
  company text null,
  message text null,
  created_at timestamp with time zone not null default now(),
  constraint leads_pkey primary key (id)
) TABLESPACE pg_default;
