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

create table if not exists users (
  id uuid primary key,
  tenant_id uuid not null references organizations(id),
  email text not null,
  name text not null,
  status text not null default 'invited',
  last_active_at timestamptz null,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  deleted_at timestamptz null,
  constraint users_status_check check (status in ('active', 'invited', 'suspended'))
);

create table if not exists roles (
  id uuid primary key,
  tenant_id uuid not null references organizations(id),
  name text not null,
  slug text not null,
  description text null,
  is_system boolean not null default false,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  deleted_at timestamptz null
);

create table if not exists permissions (
  id uuid primary key,
  key text not null unique,
  description text not null,
  module text not null,
  created_at timestamptz not null default now()
);

create table if not exists role_permissions (
  role_id uuid not null references roles(id),
  permission_id uuid not null references permissions(id),
  created_at timestamptz not null default now(),
  primary key (role_id, permission_id)
);

create table if not exists user_roles (
  tenant_id uuid not null references organizations(id),
  user_id uuid not null references users(id),
  role_id uuid not null references roles(id),
  scope_type text null,
  scope_id uuid null,
  created_at timestamptz not null default now(),
  primary key (user_id, role_id, scope_type, scope_id)
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

create unique index if not exists uq_users_tenant_email on users(tenant_id, email);
create index if not exists idx_users_tenant_status on users(tenant_id, status);
create unique index if not exists uq_roles_tenant_slug on roles(tenant_id, slug);
create index if not exists idx_role_permissions_permission on role_permissions(permission_id);
create index if not exists idx_user_roles_tenant_user on user_roles(tenant_id, user_id);
create unique index if not exists uq_courses_tenant_slug on courses(tenant_id, slug);
create index if not exists idx_courses_tenant_status on courses(tenant_id, status);
create index if not exists idx_courses_tenant_subject on courses(tenant_id, subject);
