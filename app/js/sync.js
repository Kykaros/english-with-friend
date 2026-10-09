/* Đồng bộ với Supabase: tài khoản, phòng học, tiến độ, dòng hoạt động, thách đấu.
   Dữ liệu trên máy (localStorage) luôn là nguồn chính — mất mạng vẫn học bình thường. */
(function () {
  const cfg = window.EWF_CONFIG || {};
  const enabled = !!(cfg.supabaseUrl && cfg.supabaseKey && window.supabase && window.supabase.createClient);
  const db = enabled
    ? window.supabase.createClient(cfg.supabaseUrl, cfg.supabaseKey, { auth: { persistSession: true, autoRefreshToken: true, storageKey: "ewf.auth" } })
    : null;
  const OWNER = "ewf.owner.v1"; // tài khoản sở hữu dữ liệu đang nằm trên máy

  const S = { user: null, profile: null, room: null, members: [], status: enabled ? "connecting" : "off", ready: !enabled };
  const subs = { change: [], activity: [] };
  const on = (k, fn) => subs[k].push(fn);
  const emit = (k, x) => subs[k].forEach((fn) => { try { fn(x); } catch (e) { console.error(e); } });

  let dirty = false, timer = null, pushing = false, channel = null;

  // ---------- Trạng thái trên thanh trên cùng ----------
  const STATUS = {
    connecting: ["", "Đang kết nối…"], guest: ["", "Đăng nhập"], synced: ["ok", ""], pending: ["wait", "Đang lưu…"],
    offline: ["off", "Ngoại tuyến"], error: ["bad", "Lỗi đồng bộ"],
  };
  function setStatus(s) { S.status = s; renderStatus(); }
  function renderStatus() {
    const el = document.getElementById("sync-status");
    if (!el) return;
    el.hidden = !enabled;
    if (!enabled) return;
    const [cls, label] = STATUS[S.status] || ["", ""];
    const name = S.profile ? S.profile.display_name : "";
    el.className = "sync-status " + cls;
    el.title = { ok: "Đã đồng bộ", wait: "Đang lưu lên máy chủ", off: "Không có mạng — dữ liệu vẫn được lưu trên máy", bad: "Không đồng bộ được, sẽ thử lại" }[cls] || "";
    el.innerHTML = `<i></i><span>${escape(S.user && S.status !== "guest" ? (label && S.status !== "synced" ? `${name} · ${label}` : name) : label)}</span>`;
  }
  const escape = (s) => String(s ?? "").replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));

  function friendly(e) {
    const m = (e && (e.message || e.error_description)) || String(e);
    if (/Invalid login credentials/i.test(m)) return new Error("Sai tên đăng nhập hoặc mật khẩu");
    if (/already registered|already exists/i.test(m)) return new Error("Tên đăng nhập đã có người dùng");
    if (/Failed to fetch|NetworkError|network/i.test(m)) return new Error("Không kết nối được máy chủ — kiểm tra mạng");
    if (/Email.*invalid/i.test(m)) return new Error("Supabase từ chối email nội bộ — đổi emailDomain trong js/config.js (xem README)");
    if (/Email not confirmed/i.test(m)) return new Error("Cần tắt 'Confirm email' trong Supabase (Authentication → Sign In / Providers → Email)");
    if (/Password should be/i.test(m)) return new Error("Mật khẩu tối thiểu 6 ký tự");
    if (/rate limit/i.test(m)) return new Error("Thử quá nhiều lần, đợi một lúc rồi thử lại");
    if (/recovery_code|reset_password_with_code/i.test(m)) return new Error("Máy chủ chưa có tính năng mã khôi phục — cần chạy file supabase/recovery.sql (xem README)");
    return new Error(m);
  }
  const need = (res) => { if (res.error) throw friendly(res.error); return res.data; };

  // ---------- Tài khoản ----------
  const USER_RE = /^[a-z0-9_.]{3,20}$/;
  const emailOf = (u) => `${u.trim().toLowerCase()}@${cfg.emailDomain || "ewf.local"}`;

  async function signUp(username, displayName, password) {
    username = username.trim().toLowerCase();
    if (!USER_RE.test(username)) throw new Error("Tên đăng nhập 3–20 ký tự: chữ thường không dấu, số, dấu _ hoặc dấu chấm");
    if (password.length < 6) throw new Error("Mật khẩu tối thiểu 6 ký tự");
    const free = need(await db.rpc("username_available", { p_username: username }));
    if (!free) throw new Error("Tên đăng nhập đã có người dùng");
    const data = need(await db.auth.signUp({
      email: emailOf(username), password,
      options: { data: { username, display_name: displayName.trim() || username } },
    }));
    if (!data.session) throw new Error("Đã tạo tài khoản nhưng cần tắt 'Confirm email' trong Supabase rồi đăng nhập lại");
    await afterLogin(data.session.user);
  }
  async function signIn(username, password) {
    const data = need(await db.auth.signInWithPassword({ email: emailOf(username), password }));
    await afterLogin(data.user);
  }
  // ---------- Mã khôi phục mật khẩu (supabase/recovery.sql) ----------
  async function newRecoveryCode() {
    const code = need(await db.rpc("new_recovery_code"));
    S.recovery = true;
    return code;
  }
  // Đặt mật khẩu mới bằng mã khôi phục rồi đăng nhập luôn. Trả về mã khôi phục mới (mã cũ hết hiệu lực).
  async function resetPassword(username, code, password) {
    if (password.length < 6) throw new Error("Mật khẩu tối thiểu 6 ký tự");
    const r = need(await db.rpc("reset_password_with_code", { p_username: username, p_code: code, p_password: password }));
    if (!r || !r.ok) throw new Error((r && r.error) || "Không đặt lại được mật khẩu");
    await signIn(username, password);
    S.recovery = true;
    return r.code;
  }
  async function checkRecovery() {
    const { data, error } = await db.rpc("has_recovery_code");
    S.recovery = error ? null : !!data; // null: máy chủ chưa chạy recovery.sql → không nhắc
  }

  async function signOut() {
    await flush();
    unsubscribe();
    await db.auth.signOut();
    Object.assign(S, { user: null, profile: null, room: null, members: [], recovery: null });
    setStatus("guest");
    emit("change");
  }

  async function afterLogin(user) {
    S.user = user; S.error = null;
    const owner = localStorage.getItem(OWNER);
    if (owner && owner !== user.id) EWF.clearLocal(); // dữ liệu của tài khoản khác vẫn an toàn trên máy chủ
    localStorage.setItem(OWNER, user.id);
    await loadContext();
    await checkRecovery();
    await pull();
  }

  async function loadContext() {
    const uid = S.user.id;
    const [prof, mem] = await Promise.all([
      db.from("profiles").select("*").eq("id", uid).maybeSingle(),
      db.from("room_members").select("room_id").eq("user_id", uid).maybeSingle(),
    ]);
    S.profile = need(prof);
    const m = need(mem);
    S.room = null; S.members = [];
    if (m) {
      const [room, list] = await Promise.all([
        db.from("rooms").select("*").eq("id", m.room_id).single(),
        db.from("room_members").select("user_id, joined_at").eq("room_id", m.room_id),
      ]);
      S.room = need(room);
      const rows = need(list);
      const profs = need(await db.from("profiles").select("id, username, display_name").in("id", rows.map((r) => r.user_id)));
      S.members = rows.map((r) => ({ ...(profs.find((p) => p.id === r.user_id) || { id: r.user_id, display_name: "?" }), joined_at: r.joined_at }))
        .sort((a, b) => (a.id === uid ? -1 : b.id === uid ? 1 : a.joined_at.localeCompare(b.joined_at)));
      subscribe();
    } else unsubscribe();
    renderStatus();
  }

  // ---------- Đồng bộ tiến độ ----------
  async function fetchMine() {
    return need(await db.from("user_state").select("progress, days, custom_decks, skills, reset_at").eq("user_id", S.user.id).maybeSingle());
  }
  async function pull() {
    const out = EWF.mergeState(await fetchMine());
    if (out.local) refreshView();
    if (out.remote) { dirty = true; await flush(); }
    else if (!dirty) setStatus("synced");
  }
  function schedule() { clearTimeout(timer); timer = setTimeout(flush, 3000); }
  async function flush() {
    clearTimeout(timer);
    if (!S.user || !dirty || pushing) return;
    if (!navigator.onLine) { setStatus("offline"); return; }
    pushing = true; dirty = false; setStatus("pending");
    try {
      // Gộp với bản trên máy chủ trước khi ghi, để thiết bị khác của mình không bị ghi đè.
      const out = EWF.mergeState(await fetchMine());
      if (out.local) refreshView();
      need(await db.from("user_state").upsert({ user_id: S.user.id, ...EWF.snapshot(), updated_at: new Date().toISOString() }));
      setStatus(dirty ? "pending" : "synced");
    } catch (e) {
      dirty = true;
      console.warn("Đồng bộ lỗi:", e);
      setStatus(navigator.onLine ? "error" : "offline");
    } finally {
      pushing = false;
      if (dirty && S.status === "pending") schedule();
    }
  }
  // Vẽ lại trang đang xem nếu dữ liệu vừa được gộp thêm — trừ khi đang làm bài.
  function refreshView() {
    const h = location.hash;
    if (/^#\/(study|challenge|weekly)/.test(h) || !EWF.ui) return;
    EWF.ui.route();
  }

  // ---------- Phòng học ----------
  async function createRoom(name) {
    need(await db.rpc("create_room", { p_name: name }));
    await loadContext();
    await logActivity("joined");
    emit("change");
  }
  async function joinRoom(code) {
    need(await db.rpc("join_room", { p_code: code }));
    await loadContext();
    await logActivity("joined");
    emit("change");
  }
  async function leaveRoom() {
    need(await db.rpc("leave_room"));
    unsubscribe();
    S.room = null; S.members = [];
    emit("change");
  }
  async function updateRoom(patch) {
    S.room = need(await db.from("rooms").update(patch).eq("id", S.room.id).select().single());
    emit("change");
  }
  /** Dữ liệu học của mọi người trong phòng; của mình lấy từ máy (mới nhất). */
  async function roomStates() {
    const rows = need(await db.from("user_state").select("user_id, progress, days, skills, updated_at").in("user_id", S.members.map((m) => m.id)));
    const map = Object.fromEntries(rows.map((r) => [r.user_id, r]));
    map[S.user.id] = { user_id: S.user.id, progress: EWF.progress(), days: EWF.days(), skills: EWF.snapshot().skills };
    return map;
  }

  // ---------- Dòng hoạt động ----------
  async function logActivity(type, payload = {}) {
    if (!S.user || !S.room) return;
    const res = await db.from("activities").insert({ room_id: S.room.id, user_id: S.user.id, type, payload });
    if (res.error) console.warn("Không ghi được hoạt động:", res.error.message);
  }
  async function activities(limit = 40, since) {
    let q = db.from("activities").select("*").eq("room_id", S.room.id).order("created_at", { ascending: false }).limit(limit);
    if (since) q = q.gt("created_at", new Date(since).toISOString());
    return need(await q);
  }
  function subscribe() {
    if (channel && channel.topic === "realtime:room-" + S.room.id) return;
    unsubscribe();
    channel = db.channel("room-" + S.room.id)
      .on("postgres_changes", { event: "INSERT", schema: "public", table: "activities", filter: `room_id=eq.${S.room.id}` }, async (p) => {
        if (p.new.type === "joined" && !S.members.some((m) => m.id === p.new.user_id)) await loadContext();
        emit("activity", p.new);
      })
      .subscribe();
  }
  function unsubscribe() { if (channel) { db.removeChannel(channel); channel = null; } }

  // ---------- Thách đấu & test tuần ----------
  const CH_LIST = "id, kind, week, title, created_by, created_at, challenge_results(user_id, score, total, duration_ms, finished_at)";
  async function createChallenge({ kind, week, title, questions }) {
    const res = await db.from("challenges")
      .insert({ room_id: S.room.id, created_by: S.user.id, kind, week: week || null, title, questions })
      .select(CH_LIST).single();
    if (res.error && res.error.code === "23505" && kind === "weekly") return { ...(await getWeekly(week)), existed: true };
    return need(res);
  }
  async function getChallenge(id) {
    return need(await db.from("challenges").select("*, challenge_results(*)").eq("id", id).eq("room_id", S.room.id).maybeSingle());
  }
  async function getWeekly(week) {
    return need(await db.from("challenges").select(CH_LIST).eq("room_id", S.room.id).eq("kind", "weekly").eq("week", week).maybeSingle());
  }
  async function listChallenges(limit = 20, kind) {
    let q = db.from("challenges").select(CH_LIST).eq("room_id", S.room.id).order("created_at", { ascending: false }).limit(limit);
    if (kind) q = q.eq("kind", kind);
    return need(await q);
  }
  async function submitResult(id, r) {
    need(await db.from("challenge_results").insert({
      challenge_id: id, user_id: S.user.id, score: r.score, total: r.total, answers: r.answers, duration_ms: Math.round(r.duration),
    }));
    return need(await db.from("challenge_results").select("*").eq("challenge_id", id));
  }

  // ---------- Khởi động ----------
  async function start() {
    renderStatus();
    if (!enabled) return;
    EWF.onChange(() => { if (S.user) { dirty = true; setStatus("pending"); schedule(); } });
    document.addEventListener("visibilitychange", () => { if (document.visibilityState === "hidden") flush(); });
    window.addEventListener("online", () => { if (S.user) pull().catch(() => {}).then(flush); });
    window.addEventListener("offline", () => { if (S.user) setStatus("offline"); });
    setInterval(() => { if (S.user && dirty) flush(); }, 60000);
    try {
      const { data } = await db.auth.getSession();
      if (data.session) await afterLogin(data.session.user);
      else setStatus("guest");
    } catch (e) {
      console.warn(e);
      S.error = e.message;
      setStatus(navigator.onLine ? "error" : "offline");
    }
    S.ready = true;
    emit("change");
  }

  EWF.sync = {
    enabled, db, state: S, on, start, flush,
    signUp, signIn, signOut, newRecoveryCode, resetPassword,
    async reload() {
      S.error = null;
      try { await loadContext(); await pull(); } catch (e) { S.error = e.message; setStatus(navigator.onLine ? "error" : "offline"); }
      emit("change");
    },
    createRoom, joinRoom, leaveRoom, updateRoom, roomStates,
    logActivity: (t, p) => (enabled && S.room ? logActivity(t, p) : Promise.resolve()),
    activities, createChallenge, getChallenge, getWeekly, listChallenges, submitResult,
  };
})();
