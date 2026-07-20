create table if not exists organizations (
  id uuid primary key,
  name text not null,
  slug text not null unique,
  status text not null default 'active',
  plan text not null default 'starter',
  contact_email text not null,
  academic_year text not null,
  timezone text not null,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  deleted_at timestamptz null
);

create table if not exists courses (
  id uuid primary key,
  tenant_id uuid not null references organizations(id),
  title text not null,
  slug text not null,
  description text null,
  subject text not null,
  level text not null,
  batch_name text not null,
  status text not null default 'draft',
  ai_status text not null default 'needs_material',
  lesson_count integer not null default 0,
  enrolled_count integer not null default 0,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  deleted_at timestamptz null,
  constraint courses_status_check check (status in ('draft', 'published', 'archived')),
  constraint courses_ai_status_check check (ai_status in ('indexed', 'indexing', 'needs_material'))
);

create unique index if not exists uq_courses_tenant_slug on courses(tenant_id, slug);
create index if not exists idx_courses_tenant_status on courses(tenant_id, status);
create index if not exists idx_courses_tenant_subject on courses(tenant_id, subject);
