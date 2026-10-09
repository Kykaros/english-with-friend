-- Mã khôi phục mật khẩu (không cần email).
-- Dán toàn bộ file này vào Supabase → SQL Editor → Run. Chạy lại nhiều lần cũng không sao.
-- Máy chủ chỉ lưu bản băm (bcrypt) của mã; nhập sai 5 lần thì khoá 1 giờ.

create extension if not exists pgcrypto with schema extensions;

create table if not exists public.recovery_codes (
  user_id uuid primary key references auth.users(id) on delete cascade,
  code_hash text not null,
  failed int not null default 0,
  locked_until timestamptz,
  created_at timestamptz not null default now()
);
-- Bật RLS và không tạo policy nào: không ai đọc/ghi trực tiếp được, chỉ qua các hàm bên dưới.
alter table public.recovery_codes enable row level security;

-- Tạo mã mới cho một người (dùng nội bộ, không mở cho client).
create or replace function public._set_recovery_code(p_uid uuid) returns text
language plpgsql security definer set search_path = public, extensions as $$
declare
  alphabet text := 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789'; -- bỏ I, O, 0, 1 cho khỏi nhầm
  raw text := '';
  b bytea := gen_random_bytes(12);
begin
  for i in 0..11 loop
    raw := raw || substr(alphabet, 1 + (get_byte(b, i) % 32), 1);
  end loop;
  insert into recovery_codes (user_id, code_hash) values (p_uid, crypt(raw, gen_salt('bf')))
  on conflict (user_id) do update
    set code_hash = excluded.code_hash, failed = 0, locked_until = null, created_at = now();
  return substr(raw, 1, 4) || '-' || substr(raw, 5, 4) || '-' || substr(raw, 9, 4);
end $$;
revoke all on function public._set_recovery_code(uuid) from public, anon, authenticated;

create or replace function public.has_recovery_code() returns boolean
language sql stable security definer set search_path = public as $$
  select exists (select 1 from recovery_codes where user_id = auth.uid());
$$;

create or replace function public.new_recovery_code() returns text
language plpgsql security definer set search_path = public as $$
begin
  if auth.uid() is null then raise exception 'Chưa đăng nhập'; end if;
  return _set_recovery_code(auth.uid());
end $$;

-- Đặt lại mật khẩu bằng mã. Trả về JSON (không raise) để bộ đếm nhập sai được lưu lại.
create or replace function public.reset_password_with_code(p_username text, p_code text, p_password text)
returns jsonb
language plpgsql security definer set search_path = public, extensions as $$
declare
  uid uuid;
  rc recovery_codes;
  clean text := upper(regexp_replace(coalesce(p_code, ''), '[^A-Za-z0-9]', '', 'g'));
  bad constant jsonb := jsonb_build_object('ok', false, 'error', 'Sai tên đăng nhập hoặc mã khôi phục');
begin
  if char_length(coalesce(p_password, '')) < 6 then
    return jsonb_build_object('ok', false, 'error', 'Mật khẩu tối thiểu 6 ký tự');
  end if;
  select id into uid from profiles where username = lower(trim(p_username));
  if uid is null then return bad; end if;
  select * into rc from recovery_codes where user_id = uid for update;
  if not found then
    return jsonb_build_object('ok', false, 'error', 'Tài khoản này chưa tạo mã khôi phục — nhờ người quản lý Supabase đặt lại mật khẩu');
  end if;
  if rc.locked_until > now() then
    return jsonb_build_object('ok', false, 'error',
      format('Nhập sai quá nhiều lần, thử lại sau %s phút', ceil(extract(epoch from rc.locked_until - now()) / 60)));
  end if;
  if crypt(clean, rc.code_hash) <> rc.code_hash then
    update recovery_codes
      set failed = case when rc.failed + 1 >= 5 then 0 else rc.failed + 1 end,
          locked_until = case when rc.failed + 1 >= 5 then now() + interval '1 hour' else null end
      where user_id = uid;
    return bad;
  end if;
  update auth.users set encrypted_password = crypt(p_password, gen_salt('bf')), updated_at = now() where id = uid;
  -- Mã đã dùng thì bỏ, cấp ngay mã mới.
  return jsonb_build_object('ok', true, 'code', _set_recovery_code(uid));
end $$;

grant execute on function public.has_recovery_code() to authenticated;
grant execute on function public.new_recovery_code() to authenticated;
grant execute on function public.reset_password_with_code(text, text, text) to anon, authenticated;
