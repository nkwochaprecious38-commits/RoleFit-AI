-- ============================================================
-- RoleFit AI — Initial Database Schema
-- Run via: supabase db push  OR  apply in Supabase SQL Editor
-- ============================================================

-- Enable required extensions
create extension if not exists "uuid-ossp";
create extension if not exists "pg_trgm";

-- ============================================================
-- ENUMS
-- ============================================================

create type user_role as enum ('owner', 'admin', 'member', 'viewer');
create type application_stage as enum (
  'new_application',
  'screening',
  'interview_1',
  'interview_2',
  'assessment',
  'offer',
  'hired',
  'rejected'
);
create type job_status as enum ('draft', 'active', 'paused', 'closed', 'filled');
create type employment_type as enum ('full_time', 'part_time', 'contract', 'freelance', 'internship');

-- ============================================================
-- PROFILES
-- (extends Supabase auth.users)
-- ============================================================

create table public.profiles (
  id            uuid primary key references auth.users(id) on delete cascade,
  email         text,
  full_name     text,
  avatar_url    text,
  role          user_role default 'member',
  created_at    timestamptz default now() not null,
  updated_at    timestamptz default now() not null
);

alter table public.profiles enable row level security;

create policy "Users can view their own profile"
  on public.profiles for select
  using (auth.uid() = id);

create policy "Users can update their own profile"
  on public.profiles for update
  using (auth.uid() = id);

-- Auto-create profile on signup
create or replace function public.handle_new_user()
returns trigger language plpgsql security definer set search_path = public as $$
begin
  insert into public.profiles (id, email, full_name, avatar_url)
  values (
    new.id,
    new.email,
    new.raw_user_meta_data ->> 'full_name',
    new.raw_user_meta_data ->> 'avatar_url'
  );
  return new;
end;
$$;

create trigger on_auth_user_created
  after insert on auth.users
  for each row execute function public.handle_new_user();

-- ============================================================
-- ORGANIZATIONS
-- ============================================================

create table public.organizations (
  id          uuid primary key default uuid_generate_v4(),
  name        text not null,
  slug        text unique,
  logo_url    text,
  website     text,
  industry    text,
  size        text,
  created_at  timestamptz default now() not null,
  updated_at  timestamptz default now() not null
);

alter table public.organizations enable row level security;

create policy "Organization members can view their org"
  on public.organizations for select
  using (
    exists (
      select 1 from public.organization_members
      where organization_id = organizations.id
        and user_id = auth.uid()
    )
  );

create policy "Org admins/owners can update their org"
  on public.organizations for update
  using (
    exists (
      select 1 from public.organization_members
      where organization_id = organizations.id
        and user_id = auth.uid()
        and role in ('owner', 'admin')
    )
  );

-- ============================================================
-- ORGANIZATION MEMBERS
-- ============================================================

create table public.organization_members (
  id               uuid primary key default uuid_generate_v4(),
  organization_id  uuid not null references public.organizations(id) on delete cascade,
  user_id          uuid not null references auth.users(id) on delete cascade,
  role             user_role default 'member' not null,
  created_at       timestamptz default now() not null,
  unique(organization_id, user_id)
);

alter table public.organization_members enable row level security;

create policy "Members can view their organization membership"
  on public.organization_members for select
  using (user_id = auth.uid());

create policy "Members can view teammates in their org"
  on public.organization_members for select
  using (
    exists (
      select 1 from public.organization_members om
      where om.organization_id = organization_members.organization_id
        and om.user_id = auth.uid()
    )
  );

create policy "Org admins can manage members"
  on public.organization_members for all
  using (
    exists (
      select 1 from public.organization_members om
      where om.organization_id = organization_members.organization_id
        and om.user_id = auth.uid()
        and om.role in ('owner', 'admin')
    )
  );

-- ============================================================
-- JOBS
-- ============================================================

create table public.jobs (
  id               uuid primary key default uuid_generate_v4(),
  organization_id  uuid not null references public.organizations(id) on delete cascade,
  title            text not null,
  department       text,
  location         text,
  employment_type  employment_type default 'full_time',
  status           job_status default 'draft',
  description      text,
  requirements     text[],
  skills           text[],
  salary_min       integer,
  salary_max       integer,
  currency         text default 'USD',
  remote_ok        boolean default false,
  created_by       uuid references auth.users(id),
  created_at       timestamptz default now() not null,
  updated_at       timestamptz default now() not null
);

alter table public.jobs enable row level security;

create policy "Org members can view jobs"
  on public.jobs for select
  using (
    exists (
      select 1 from public.organization_members
      where organization_id = jobs.organization_id
        and user_id = auth.uid()
    )
  );

create policy "Org members can create jobs"
  on public.jobs for insert
  with check (
    exists (
      select 1 from public.organization_members
      where organization_id = jobs.organization_id
        and user_id = auth.uid()
    )
  );

create policy "Org members can update jobs"
  on public.jobs for update
  using (
    exists (
      select 1 from public.organization_members
      where organization_id = jobs.organization_id
        and user_id = auth.uid()
    )
  );

-- ============================================================
-- CANDIDATES
-- ============================================================

create table public.candidates (
  id               uuid primary key default uuid_generate_v4(),
  organization_id  uuid not null references public.organizations(id) on delete cascade,
  full_name        text not null,
  email            text,
  phone            text,
  location         text,
  current_title    text,
  current_company  text,
  experience_years integer,
  skills           text[],
  linkedin_url     text,
  portfolio_url    text,
  resume_url       text,
  source           text,
  notes            text,
  tags             text[],
  created_by       uuid references auth.users(id),
  created_at       timestamptz default now() not null,
  updated_at       timestamptz default now() not null
);

alter table public.candidates enable row level security;

create policy "Org members can view candidates"
  on public.candidates for select
  using (
    exists (
      select 1 from public.organization_members
      where organization_id = candidates.organization_id
        and user_id = auth.uid()
    )
  );

create policy "Org members can create candidates"
  on public.candidates for insert
  with check (
    exists (
      select 1 from public.organization_members
      where organization_id = candidates.organization_id
        and user_id = auth.uid()
    )
  );

create policy "Org members can update candidates"
  on public.candidates for update
  using (
    exists (
      select 1 from public.organization_members
      where organization_id = candidates.organization_id
        and user_id = auth.uid()
    )
  );

-- ============================================================
-- APPLICATIONS
-- ============================================================

create table public.applications (
  id               uuid primary key default uuid_generate_v4(),
  organization_id  uuid not null references public.organizations(id) on delete cascade,
  job_id           uuid not null references public.jobs(id) on delete cascade,
  candidate_id     uuid not null references public.candidates(id) on delete cascade,
  stage            application_stage default 'new_application' not null,
  score            integer check (score >= 0 and score <= 100),
  notes            text,
  applied_at       timestamptz default now(),
  stage_updated_at timestamptz default now(),
  created_at       timestamptz default now() not null,
  updated_at       timestamptz default now() not null,
  unique(job_id, candidate_id)
);

alter table public.applications enable row level security;

create policy "Org members can view applications"
  on public.applications for select
  using (
    exists (
      select 1 from public.organization_members
      where organization_id = applications.organization_id
        and user_id = auth.uid()
    )
  );

create policy "Org members can create applications"
  on public.applications for insert
  with check (
    exists (
      select 1 from public.organization_members
      where organization_id = applications.organization_id
        and user_id = auth.uid()
    )
  );

create policy "Org members can update applications"
  on public.applications for update
  using (
    exists (
      select 1 from public.organization_members
      where organization_id = applications.organization_id
        and user_id = auth.uid()
    )
  );

-- ============================================================
-- CANDIDATE MATCH RESULTS
-- ============================================================

create table public.candidate_match_results (
  id              uuid primary key default uuid_generate_v4(),
  organization_id uuid not null references public.organizations(id) on delete cascade,
  job_id          uuid not null references public.jobs(id) on delete cascade,
  candidate_id    uuid not null references public.candidates(id) on delete cascade,
  score           integer not null check (score >= 0 and score <= 100),
  skills_match    integer check (skills_match >= 0 and skills_match <= 100),
  experience_match integer check (experience_match >= 0 and experience_match <= 100),
  strengths       text[],
  gaps            text[],
  ai_summary      text,
  created_at      timestamptz default now() not null,
  unique(job_id, candidate_id)
);

alter table public.candidate_match_results enable row level security;

create policy "Org members can manage match results"
  on public.candidate_match_results for all
  using (
    exists (
      select 1 from public.organization_members
      where organization_id = candidate_match_results.organization_id
        and user_id = auth.uid()
    )
  );

-- ============================================================
-- CANDIDATE DOCUMENTS
-- ============================================================

create table public.candidate_documents (
  id           uuid primary key default uuid_generate_v4(),
  candidate_id uuid not null references public.candidates(id) on delete cascade,
  name         text not null,
  type         text not null,
  url          text not null,
  size         integer,
  created_at   timestamptz default now() not null
);

alter table public.candidate_documents enable row level security;

create policy "Org members can view candidate documents"
  on public.candidate_documents for select
  using (
    exists (
      select 1
      from public.candidates c
      join public.organization_members om on om.organization_id = c.organization_id
      where c.id = candidate_documents.candidate_id
        and om.user_id = auth.uid()
    )
  );

-- ============================================================
-- INTERVIEWS
-- ============================================================

create table public.interviews (
  id              uuid primary key default uuid_generate_v4(),
  organization_id uuid not null references public.organizations(id) on delete cascade,
  application_id  uuid references public.applications(id) on delete cascade,
  job_id          uuid references public.jobs(id),
  candidate_id    uuid references public.candidates(id),
  scheduled_at    timestamptz,
  duration_mins   integer default 60,
  format          text default 'video',
  status          text default 'scheduled',
  notes           text,
  meeting_url     text,
  created_by      uuid references auth.users(id),
  created_at      timestamptz default now() not null,
  updated_at      timestamptz default now() not null
);

alter table public.interviews enable row level security;

create policy "Org members can manage interviews"
  on public.interviews for all
  using (
    exists (
      select 1 from public.organization_members
      where organization_id = interviews.organization_id
        and user_id = auth.uid()
    )
  );

-- ============================================================
-- INTERVIEW FEEDBACK
-- ============================================================

create table public.interview_feedback (
  id           uuid primary key default uuid_generate_v4(),
  interview_id uuid not null references public.interviews(id) on delete cascade,
  reviewer_id  uuid not null references auth.users(id),
  rating       integer check (rating >= 1 and rating <= 5),
  recommendation text check (recommendation in ('strong_yes', 'yes', 'maybe', 'no', 'strong_no')),
  notes        text,
  submitted_at timestamptz default now() not null,
  unique(interview_id, reviewer_id)
);

alter table public.interview_feedback enable row level security;

create policy "Reviewers can manage their own feedback"
  on public.interview_feedback for all
  using (reviewer_id = auth.uid());

create policy "Org members can view interview feedback"
  on public.interview_feedback for select
  using (
    exists (
      select 1
      from public.interviews i
      join public.organization_members om on om.organization_id = i.organization_id
      where i.id = interview_feedback.interview_id
        and om.user_id = auth.uid()
    )
  );

-- ============================================================
-- NOTIFICATIONS
-- ============================================================

create table public.notifications (
  id          uuid primary key default uuid_generate_v4(),
  user_id     uuid not null references auth.users(id) on delete cascade,
  title       text not null,
  body        text,
  type        text default 'info',
  read        boolean default false,
  link        text,
  created_at  timestamptz default now() not null
);

alter table public.notifications enable row level security;

create policy "Users can view their own notifications"
  on public.notifications for select
  using (user_id = auth.uid());

create policy "Users can update their own notifications"
  on public.notifications for update
  using (user_id = auth.uid());

-- ============================================================
-- DEMO REQUESTS
-- ============================================================

create table public.demo_requests (
  id           uuid primary key default uuid_generate_v4(),
  full_name    text not null,
  email        text not null,
  company      text,
  role         text,
  team_size    text,
  use_case     text,
  created_at   timestamptz default now() not null
);

alter table public.demo_requests enable row level security;

-- Only service role can read/delete demo requests
create policy "Service role only"
  on public.demo_requests for select
  using (false);

-- Anyone can insert (public form)
create policy "Anyone can submit demo request"
  on public.demo_requests for insert
  with check (true);

-- ============================================================
-- CONTACT SUBMISSIONS
-- ============================================================

create table public.contact_submissions (
  id          uuid primary key default uuid_generate_v4(),
  full_name   text not null,
  email       text not null,
  company     text,
  subject     text,
  message     text not null,
  created_at  timestamptz default now() not null
);

alter table public.contact_submissions enable row level security;

create policy "Anyone can submit contact form"
  on public.contact_submissions for insert
  with check (true);

create policy "Service role only reads submissions"
  on public.contact_submissions for select
  using (false);

-- ============================================================
-- UPDATED_AT TRIGGER
-- ============================================================

create or replace function public.set_updated_at()
returns trigger language plpgsql as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

create trigger set_updated_at before update on public.profiles
  for each row execute function public.set_updated_at();
create trigger set_updated_at before update on public.organizations
  for each row execute function public.set_updated_at();
create trigger set_updated_at before update on public.jobs
  for each row execute function public.set_updated_at();
create trigger set_updated_at before update on public.candidates
  for each row execute function public.set_updated_at();
create trigger set_updated_at before update on public.applications
  for each row execute function public.set_updated_at();
create trigger set_updated_at before update on public.interviews
  for each row execute function public.set_updated_at();

-- ============================================================
-- INDEXES for common queries
-- ============================================================

create index idx_organization_members_user_id on public.organization_members(user_id);
create index idx_organization_members_org_id on public.organization_members(organization_id);
create index idx_jobs_organization_id on public.jobs(organization_id);
create index idx_jobs_status on public.jobs(status);
create index idx_candidates_organization_id on public.candidates(organization_id);
create index idx_applications_job_id on public.applications(job_id);
create index idx_applications_candidate_id on public.applications(candidate_id);
create index idx_applications_stage on public.applications(stage);
create index idx_notifications_user_id on public.notifications(user_id);
create index idx_notifications_read on public.notifications(user_id, read);
