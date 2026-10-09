-- English With Friend — cấu trúc dữ liệu trên Supabase.
-- Cách dùng: Supabase Dashboard → SQL Editor → New query → dán toàn bộ file này → Run.
-- Chạy lại nhiều lần cũng không sao (các lệnh đều có "if not exists" / "or replace").

-- ============ Bảng ============

create table if not exists public.profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  username text unique not null check (username ~ '^[a-z0-9_.]{3,20}$'),
  display_name text not null check (char_length(display_name) between 1 and 40),
  created_at timestamptz not null default now()
);

create table if not exists public.rooms (
  id uuid primary key default gen_random_uuid(),
  code text unique not null,
  name text not null default 'Phòng học',
  week_test_day smallint not null default 0 check (week_test_day between 0 and 6), -- 0 = Chủ nhật
  created_by uuid references auth.users(id) on delete set null,
  created_at timestamptz not null default now()
);

create table if not exists public.room_members (
  room_id uuid not null references public.rooms(id) on delete cascade,
  user_id uuid not null unique references auth.users(id) on delete cascade, -- mỗi người 1 phòng
  joined_at timestamptz not null default now(),
  primary key (room_id, user_id)
);

create table if not exists public.user_state (
  user_id uuid primary key references auth.users(id) on delete cascade,
  progress jsonb not null default '{}',
  days jsonb not null default '{}',
  custom_decks jsonb not null default '{"decks":[],"deleted":[]}',
  skills jsonb not null default '{}',
  reset_at bigint not null default 0,
  updated_at timestamptz not null default now()
);

create table if not exists public.activities (
  id bigint generated always as identity primary key,
  room_id uuid not null references public.rooms(id) on delete cascade,
  user_id uuid not null references auth.users(id) on delete cascade,
  type text not null,
  payload jsonb not null default '{}',
  created_at timestamptz not null default now()
);
create index if not exists activities_room_time on public.activities (room_id, created_at desc);

create table if not exists public.challenges (
  id uuid primary key default gen_random_uuid(),
  room_id uuid not null references public.rooms(id) on delete cascade,
  created_by uuid not null references auth.users(id) on delete cascade,
  kind text not null check (kind in ('duel', 'weekly')),
  week text,
  title text not null,
  questions jsonb not null,
  created_at timestamptz not null default now()
);
create unique index if not exists challenges_one_weekly on public.challenges (room_id, week) where kind = 'weekly';
create index if not exists challenges_room_time on public.challenges (room_id, created_at desc);

create table if not exists public.challenge_results (
  challenge_id uuid not null references public.challenges(id) on delete cascade,
  user_id uuid not null references auth.users(id) on delete cascade,
  score int not null,
  total int not null,
  answers jsonb not null default '[]',
  duration_ms int not null default 0,
  finished_at timestamptz not null default now(),
  primary key (challenge_id, user_id)
);

-- Giai đoạn 2: bài viết / bài nói gửi cho bạn chấm
create table if not exists public.submissions (
  id uuid primary key default gen_random_uuid(),
  room_id uuid not null references public.rooms(id) on delete cascade,
  user_id uuid not null references auth.users(id) on delete cascade,
  kind text not null check (kind in ('writing', 'speaking')),
  ref text not null,
  prompt text,
  text text,
  audio_path text,
  auto_score int,
  created_at timestamptz not null default now()
);
create index if not exists submissions_room_time on public.submissions (room_id, created_at desc);

create table if not exists public.reviews (
  submission_id uuid not null references public.submissions(id) on delete cascade,
  reviewer_id uuid not null references auth.users(id) on delete cascade,
  stars smallint not null check (stars between 1 and 5),
  corrected text,
  comment text,
  created_at timestamptz not null default now(),
  primary key (submission_id, reviewer_id)
);

-- ============ Hàm hỗ trợ phân quyền ============

create or replace function public.is_member(r uuid) returns boolean
language sql stable security definer set search_path = public as $$
  select exists (select 1 from room_members where room_id = r and user_id = auth.uid());
$$;

-- true nếu u là chính mình hoặc ở cùng phòng với mình
create or replace function public.is_room_mate(u uuid) returns boolean
language sql stable security definer set search_path = public as $$
  select u = auth.uid() or exists (
    select 1 from room_members a join room_members b on a.room_id = b.room_id
    where a.user_id = auth.uid() and b.user_id = u);
$$;

-- ============ Tự tạo hồ sơ khi đăng ký ============

create or replace function public.handle_new_user() returns trigger
language plpgsql security definer set search_path = public as $$
begin
  insert into profiles (id, username, display_name)
  values (new.id,
          lower(new.raw_user_meta_data->>'username'),
          coalesce(nullif(new.raw_user_meta_data->>'display_name', ''), new.raw_user_meta_data->>'username'));
  insert into user_state (user_id) values (new.id);
  return new;
end $$;

drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created after insert on auth.users
  for each row execute function public.handle_new_user();

-- ============ RPC ============

create or replace function public.username_available(p_username text) returns boolean
language sql stable security definer set search_path = public as $$
  select not exists (select 1 from profiles where username = lower(p_username));
$$;

create or replace function public.create_room(p_name text) returns public.rooms
language plpgsql security definer set search_path = public as $$
declare r rooms; c text;
begin
  if auth.uid() is null then raise exception 'Chưa đăng nhập'; end if;
  if exists (select 1 from room_members where user_id = auth.uid()) then
    raise exception 'Bạn đang ở trong một phòng rồi';
  end if;
  loop
    c := upper(substr(md5(random()::text || clock_timestamp()::text), 1, 6));
    exit when not exists (select 1 from rooms where code = c);
  end loop;
  insert into rooms (code, name, created_by)
  values (c, coalesce(nullif(trim(p_name), ''), 'Phòng học'), auth.uid()) returning * into r;
  insert into room_members (room_id, user_id) values (r.id, auth.uid());
  return r;
end $$;

create or replace function public.join_room(p_code text) returns public.rooms
language plpgsql security definer set search_path = public as $$
declare r rooms;
begin
  if auth.uid() is null then raise exception 'Chưa đăng nhập'; end if;
  select * into r from rooms where code = upper(trim(p_code));
  if r.id is null then raise exception 'Không tìm thấy phòng với mã này'; end if;
  if exists (select 1 from room_members where user_id = auth.uid() and room_id = r.id) then return r; end if;
  if exists (select 1 from room_members where user_id = auth.uid()) then
    raise exception 'Bạn đang ở trong một phòng khác, hãy rời phòng đó trước';
  end if;
  if (select count(*) from room_members where room_id = r.id) >= 10 then
    raise exception 'Phòng đã đủ 10 người';
  end if;
  insert into room_members (room_id, user_id) values (r.id, auth.uid());
  return r;
end $$;

create or replace function public.leave_room() returns void
language sql security definer set search_path = public as $$
  delete from room_members where user_id = auth.uid();
$$;

-- ============ Row Level Security ============

alter table public.profiles enable row level security;
alter table public.rooms enable row level security;
alter table public.room_members enable row level security;
alter table public.user_state enable row level security;
alter table public.activities enable row level security;
alter table public.challenges enable row level security;
alter table public.challenge_results enable row level security;
alter table public.submissions enable row level security;
alter table public.reviews enable row level security;

drop policy if exists "profiles read" on public.profiles;
create policy "profiles read" on public.profiles for select using (is_room_mate(id));
drop policy if exists "profiles update own" on public.profiles;
create policy "profiles update own" on public.profiles for update using (id = auth.uid()) with check (id = auth.uid());

drop policy if exists "rooms read" on public.rooms;
create policy "rooms read" on public.rooms for select using (is_member(id));
drop policy if exists "rooms update" on public.rooms;
create policy "rooms update" on public.rooms for update using (is_member(id)) with check (is_member(id));

drop policy if exists "members read" on public.room_members;
create policy "members read" on public.room_members for select using (is_member(room_id));

drop policy if exists "state read" on public.user_state;
create policy "state read" on public.user_state for select using (is_room_mate(user_id));
drop policy if exists "state insert own" on public.user_state;
create policy "state insert own" on public.user_state for insert with check (user_id = auth.uid());
drop policy if exists "state update own" on public.user_state;
create policy "state update own" on public.user_state for update using (user_id = auth.uid()) with check (user_id = auth.uid());

drop policy if exists "activities read" on public.activities;
create policy "activities read" on public.activities for select using (is_member(room_id));
drop policy if exists "activities insert" on public.activities;
create policy "activities insert" on public.activities for insert with check (user_id = auth.uid() and is_member(room_id));

drop policy if exists "challenges read" on public.challenges;
create policy "challenges read" on public.challenges for select using (is_member(room_id));
drop policy if exists "challenges insert" on public.challenges;
create policy "challenges insert" on public.challenges for insert with check (created_by = auth.uid() and is_member(room_id));

drop policy if exists "results read" on public.challenge_results;
create policy "results read" on public.challenge_results for select
  using (exists (select 1 from challenges c where c.id = challenge_id and is_member(c.room_id)));
drop policy if exists "results insert" on public.challenge_results;
create policy "results insert" on public.challenge_results for insert
  with check (user_id = auth.uid() and exists (select 1 from challenges c where c.id = challenge_id and is_member(c.room_id)));

drop policy if exists "submissions read" on public.submissions;
create policy "submissions read" on public.submissions for select using (is_member(room_id));
drop policy if exists "submissions insert" on public.submissions;
create policy "submissions insert" on public.submissions for insert with check (user_id = auth.uid() and is_member(room_id));

drop policy if exists "reviews read" on public.reviews;
create policy "reviews read" on public.reviews for select
  using (exists (select 1 from submissions s where s.id = submission_id and is_member(s.room_id)));
drop policy if exists "reviews write" on public.reviews;
create policy "reviews write" on public.reviews for insert
  with check (reviewer_id = auth.uid() and exists (select 1 from submissions s where s.id = submission_id and is_member(s.room_id) and s.user_id <> auth.uid()));
drop policy if exists "reviews update own" on public.reviews;
create policy "reviews update own" on public.reviews for update using (reviewer_id = auth.uid()) with check (reviewer_id = auth.uid());

-- ============ Realtime (dòng hoạt động cập nhật tức thì) ============

do $$ begin
  alter publication supabase_realtime add table public.activities;
exception when duplicate_object then null; end $$;

-- ============ Lưu file ghi âm (giai đoạn 2) ============
-- Đường dẫn file: <room_id>/<user_id>/<tên file>. Chỉ thành viên phòng được nghe.

insert into storage.buckets (id, name, public) values ('recordings', 'recordings', false)
on conflict (id) do nothing;

drop policy if exists "recordings read" on storage.objects;
create policy "recordings read" on storage.objects for select
  using (bucket_id = 'recordings' and is_member(((storage.foldername(name))[1])::uuid));
drop policy if exists "recordings upload" on storage.objects;
create policy "recordings upload" on storage.objects for insert
  with check (bucket_id = 'recordings'
              and is_member(((storage.foldername(name))[1])::uuid)
              and (storage.foldername(name))[2] = auth.uid()::text);
