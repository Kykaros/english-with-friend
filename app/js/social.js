/* Học cùng bạn: đăng nhập, phòng học, so sánh tiến độ, dòng hoạt động, chọc bạn, thách đấu, test cuối tuần. */
(function () {
  const { $, $$, esc, I, MODES, app, toast, addRoute, navAlias, afterRoute, runSession, buildQuestions, allWords, findDeck, findLesson, wrongList } = EWF.ui;
  const sync = EWF.sync;
  const S = sync.state;
  const DAY = EWF.DAY;

  const CHALLENGE_MODES = ["envi", "vien", "listen", "cloze", "spell"];
  const WEEKLY_SIZE = 20;
  const WEEKDAYS = ["Chủ nhật", "Thứ Hai", "Thứ Ba", "Thứ Tư", "Thứ Năm", "Thứ Sáu", "Thứ Bảy"];
  const LS = {
    get(k, f) { try { const v = localStorage.getItem(k); return v == null ? f : JSON.parse(v); } catch { return f; } },
    set(k, v) { try { localStorage.setItem(k, JSON.stringify(v)); } catch { /* bỏ qua */ } },
  };

  const me = () => S.user && S.user.id;
  const member = (id) => S.members.find((m) => m.id === id);
  const nameOf = (id) => (id === me() ? "Bạn" : (member(id) || {}).display_name || "Ai đó");
  const COLORS = ["#1f6f5c", "#b5541c", "#5a4fcf", "#a0760a", "#b3261e", "#2e7d32", "#0b6e99", "#8e3b8a"];
  function avatar(id, size = "") {
    const m = member(id) || { display_name: "?" };
    const i = [...(m.username || m.display_name)].reduce((a, c) => a + c.charCodeAt(0), 0) % COLORS.length;
    return `<span class="avatar ${size}" style="background:${COLORS[i]}">${esc((m.display_name || "?").trim().charAt(0).toUpperCase())}</span>`;
  }
  function timeAgo(t) {
    const s = (Date.now() - new Date(t).getTime()) / 1000;
    if (s < 60) return "vừa xong";
    if (s < 3600) return `${Math.floor(s / 60)} phút trước`;
    if (s < 86400) return `${Math.floor(s / 3600)} giờ trước`;
    if (s < 7 * 86400) return `${Math.floor(s / 86400)} ngày trước`;
    return new Date(t).toLocaleDateString("vi-VN");
  }
  const fmtDur = (ms) => { const s = Math.round(ms / 1000); return s < 60 ? `${s} giây` : `${Math.floor(s / 60)} phút ${s % 60} giây`; };
  const fmtDate = (d) => d.toLocaleDateString("vi-VN", { weekday: "long", day: "numeric", month: "numeric" });

  // ---------- Cổng vào: cấu hình → đăng nhập → vào phòng ----------
  let gated = false;
  function gate() {
    gated = true;
    if (!sync.enabled) { setupPage(); return false; }
    if (!S.ready) { app.innerHTML = `<div class="card empty"><h2>Đang kết nối…</h2></div>`; return false; }
    if (!S.user) { authPage(); return false; }
    if (S.error && !S.profile) {
      app.innerHTML = `<div class="card empty"><h2>Chưa kết nối được máy chủ</h2><p class="muted">${esc(S.error)}<br>Bạn vẫn học bình thường được, tiến độ sẽ tự đồng bộ khi có mạng.</p><button class="btn primary" id="retry">Thử lại</button></div>`;
      $("#retry").onclick = () => { app.innerHTML = `<div class="card empty"><h2>Đang kết nối…</h2></div>`; sync.reload(); };
      return false;
    }
    if (!S.room) { roomPage(); return false; }
    gated = false;
    return true;
  }

  function setupPage() {
    app.innerHTML = `
      <div class="page-head"><div><h1>Cùng học</h1><p class="muted">Học cùng bạn ở xa: xem tiến độ của nhau, thách đấu, bài test cuối tuần.</p></div></div>
      <div class="card panel">
        <h3>Chưa kết nối máy chủ</h3>
        <p class="muted">Tính năng này cần một project Supabase miễn phí. Làm theo mục <b>“Học cùng bạn”</b> trong file <code>README.md</code>, rồi điền Project URL và anon key vào <code>app/js/config.js</code>.</p>
        <p class="muted small">Trong lúc chờ, app vẫn chạy một mình như bình thường.</p>
      </div>`;
  }

  function authPage() {
    app.innerHTML = `
      <div class="auth">
        <div class="card panel">
          <div class="tabs"><button class="tab active" data-tab="in">Đăng nhập</button><button class="tab" data-tab="up">Tạo tài khoản</button></div>
          <h3 id="au-forgot-h" hidden>Đặt lại mật khẩu</h3>
          <form id="auth-form" autocomplete="on">
            <div class="field"><label for="au-user">Tên đăng nhập</label><input type="text" id="au-user" autocomplete="username" autocapitalize="off" spellcheck="false" placeholder="vd: minh_nguyen" required></div>
            <div class="field" id="au-name-f" hidden><label for="au-name">Tên hiển thị</label><input type="text" id="au-name" maxlength="40" placeholder="vd: Minh"></div>
            <div class="field" id="au-code-f" hidden><label for="au-code">Mã khôi phục</label><input type="text" id="au-code" autocomplete="off" autocapitalize="characters" spellcheck="false" placeholder="vd: K7QM-2XFD-9PLA" class="code-input"></div>
            <div class="field"><label for="au-pass" id="au-pass-l">Mật khẩu</label><input type="password" id="au-pass" autocomplete="current-password" minlength="6" required></div>
            <p class="small" id="au-err" style="color:var(--bad)" hidden></p>
            <button class="btn primary" type="submit" id="au-go" style="width:100%">Đăng nhập</button>
          </form>
          <p class="small" style="margin-bottom:0"><button class="btn ghost sm" id="au-forgot" type="button">Quên mật khẩu?</button></p>
          <p class="muted small" id="au-note" style="margin-bottom:0">Tiến độ đang có trên máy này sẽ được gộp vào tài khoản, không bị mất.</p>
        </div>
      </div>`;
    let mode = "in";
    const setMode = (m) => {
      mode = m;
      const forgot = m === "forgot";
      $$(".tab").forEach((x) => x.classList.toggle("active", x.dataset.tab === m));
      $(".auth .tabs").hidden = forgot;
      $("#au-forgot-h").hidden = !forgot;
      $("#au-name-f").hidden = m !== "up";
      $("#au-code-f").hidden = !forgot;
      $("#au-code").required = forgot;
      $("#au-pass-l").textContent = forgot ? "Mật khẩu mới" : "Mật khẩu";
      $("#au-go").textContent = { in: "Đăng nhập", up: "Tạo tài khoản", forgot: "Đặt mật khẩu mới" }[m];
      $("#au-pass").autocomplete = m === "in" ? "current-password" : "new-password";
      $("#au-forgot").textContent = forgot ? "← Quay lại đăng nhập" : "Quên mật khẩu?";
      $("#au-note").textContent = forgot
        ? "Nhập mã khôi phục bạn đã lưu khi tạo tài khoản. Tiến độ học vẫn còn nguyên."
        : "Tiến độ đang có trên máy này sẽ được gộp vào tài khoản, không bị mất.";
      $("#au-err").hidden = true;
    };
    $$(".tab").forEach((t) => (t.onclick = () => setMode(t.dataset.tab)));
    $("#au-forgot").onclick = () => setMode(mode === "forgot" ? "in" : "forgot");
    $("#auth-form").onsubmit = async (e) => {
      e.preventDefault();
      const btn = $("#au-go"), err = $("#au-err");
      btn.disabled = true; err.hidden = true;
      const user = $("#au-user").value, pass = $("#au-pass").value;
      try {
        let code = null;
        if (mode === "in") await sync.signIn(user, pass);
        else if (mode === "up") {
          await sync.signUp(user, $("#au-name").value, pass);
          try { code = await sync.newRecoveryCode(); } catch (ex) { console.warn(ex); }
        } else code = await sync.resetPassword(user, $("#au-code").value, pass);
        const done = () => { EWF.ui.route(); checkNotifications(); };
        toast(mode === "forgot" ? "Đã đổi mật khẩu" : `Chào ${S.profile ? S.profile.display_name : "bạn"}!`);
        if (code) recoveryCodePage(code, mode === "forgot", done); else done();
      } catch (ex) {
        err.textContent = ex.message; err.hidden = false; btn.disabled = false;
      }
    };
  }

  // Hiện mã khôi phục một lần duy nhất; phải xác nhận đã lưu mới đi tiếp.
  let showingCode = false;
  function recoveryCodePage(code, afterReset, next) {
    showingCode = true; // để sync "change" không vẽ đè trang này
    const name = S.profile ? S.profile.username : "";
    app.innerHTML = `
      <div class="auth">
        <div class="card panel">
          <p class="eyebrow">${afterReset ? "Mã cũ đã hết hiệu lực" : "Bước quan trọng"}</p>
          <h3>Lưu mã khôi phục mật khẩu</h3>
          <p class="muted small">Nếu quên mật khẩu, bấm <b>Quên mật khẩu?</b> ở màn hình đăng nhập và nhập mã này để đặt mật khẩu mới.
            Mã chỉ hiện <b>một lần</b>. Hãy chụp màn hình hoặc gửi vào tin nhắn cho chính bạn.</p>
          <div class="recovery-code" id="rc-code">${esc(code)}</div>
          <p class="muted small" style="text-align:center">Tài khoản: <b>${esc(name)}</b></p>
          <div class="row" style="justify-content:center"><button class="btn sm" id="rc-copy">Sao chép</button></div>
          <label class="row small" style="margin:16px 0 12px"><input type="checkbox" id="rc-ok"> Tôi đã lưu mã ở nơi an toàn</label>
          <button class="btn primary" id="rc-next" style="width:100%" disabled>Tiếp tục</button>
        </div>
      </div>`;
    $("#rc-copy").onclick = () => {
      const text = `Mã khôi phục English With Friend (tài khoản ${name}): ${code}`;
      (navigator.clipboard ? navigator.clipboard.writeText(text) : Promise.reject()).then(() => toast("Đã sao chép mã"), () => {
        const sel = window.getSelection(), range = document.createRange();
        range.selectNodeContents($("#rc-code")); sel.removeAllRanges(); sel.addRange(range);
        toast("Nhấn Ctrl+C để sao chép mã");
      });
    };
    $("#rc-ok").onchange = (e) => { $("#rc-next").disabled = !e.target.checked; };
    $("#rc-next").onclick = () => { showingCode = false; next(); };
  }

  async function makeRecoveryCode(next) {
    try { recoveryCodePage(await sync.newRecoveryCode(), false, next); }
    catch (ex) { toast(ex.message); }
  }

  function roomPage() {
    app.innerHTML = `
      <div class="page-head"><div><p class="eyebrow">Xin chào ${esc(S.profile ? S.profile.display_name : "")}</p><h1>Vào phòng học</h1><p class="muted">Một người tạo phòng rồi gửi mã cho bạn; người kia nhập mã để vào.</p></div></div>
      <div class="two-col">
        <div class="card panel">
          <h3>Tạo phòng mới</h3>
          <div class="field" style="margin-top:12px"><label for="rm-name">Tên phòng</label><input type="text" id="rm-name" maxlength="40" placeholder="vd: TOEIC 750 cùng nhau"></div>
          <button class="btn primary" id="rm-create">Tạo phòng</button>
        </div>
        <div class="card panel">
          <h3>Có mã mời rồi?</h3>
          <div class="field" style="margin-top:12px"><label for="rm-code">Mã phòng (6 ký tự)</label><input type="text" id="rm-code" maxlength="6" placeholder="vd: 4F9A2C" autocapitalize="characters" style="text-transform:uppercase;letter-spacing:3px"></div>
          <button class="btn primary" id="rm-join">Vào phòng</button>
        </div>
      </div>
      <p class="small" id="rm-err" style="color:var(--bad)" hidden></p>
      <p class="muted small" style="margin-top:18px">Đăng nhập với tên <b>${esc(S.profile ? S.profile.username : "")}</b> · <button class="btn ghost sm" id="logout">Đăng xuất</button></p>`;
    const run = (fn) => async (e) => {
      const b = e.currentTarget; b.disabled = true; $("#rm-err").hidden = true;
      try { await fn(); EWF.ui.route(); } catch (ex) { $("#rm-err").textContent = ex.message; $("#rm-err").hidden = false; b.disabled = false; }
    };
    $("#rm-create").onclick = run(() => sync.createRoom($("#rm-name").value));
    $("#rm-join").onclick = run(() => sync.joinRoom($("#rm-code").value));
    $("#logout").onclick = async () => { await sync.signOut(); EWF.ui.route(); };
  }

  // ---------- Số liệu từng người ----------
  let lastStates = null, lastStatesAt = 0;
  async function loadStates() {
    lastStates = await sync.roomStates();
    lastStatesAt = Date.now();
    return lastStates;
  }
  const summaryOf = (states, id) => (states[id] ? EWF.summarize(states[id].progress, states[id].days) : EWF.summarize({}, {}));

  /** Từ cả phòng đã học trong tuần (ưu tiên từ nhiều người cùng học). */
  function weekWords(states, since) {
    const count = new Map();
    for (const st of Object.values(states)) {
      for (const [k, s] of Object.entries(st.progress || {})) {
        if (Math.max(s.first || 0, s.last || 0) >= since) count.set(k, (count.get(k) || 0) + 1);
      }
    }
    return [...count.entries()].map(([k, n]) => ({ w: EWF.wordByKey(k), n })).filter((x) => x.w)
      .sort((a, b) => b.n - a.n || Math.random() - 0.5).map((x) => x.w);
  }
  function everLearned(states) {
    const keys = new Set(Object.values(states).flatMap((st) => Object.keys(st.progress || {})));
    return [...keys].map((k) => EWF.wordByKey(k)).filter(Boolean);
  }

  // ---------- Trang "Cùng học" ----------
  async function friendsPage() {
    if (!gate()) return;
    LS.set("ewf.seenAt.v1", Date.now());
    setBadge(0);
    const r = S.room;
    const ws = EWF.weekStart();
    const we = new Date(ws.getTime() + 6 * DAY);
    app.innerHTML = `
      <div class="page-head"><div><p class="eyebrow">Phòng học · ${S.members.length} người</p><h1>${esc(r.name)}</h1></div>
        <div class="row"><a class="btn primary" href="#/challenge/new">${I.swap} Tạo thách đấu</a><a class="btn" href="#/weekly">Test cuối tuần</a></div></div>
      <div id="fr-weekly"></div>
      <section class="section" style="margin-top:8px">
        <div class="deck-head"><div><h2>Bảng xếp hạng tuần</h2><p class="muted small" style="margin:4px 0 0">${ws.toLocaleDateString("vi-VN")} – ${we.toLocaleDateString("vi-VN")} · xếp theo số lượt ôn trong tuần</p></div></div>
        <div class="people" id="fr-people"><div class="card panel muted">Đang tải…</div></div>
      </section>
      <div class="two-col section">
        <section><div class="deck-head"><h2>Dòng hoạt động</h2></div><div class="card feed" id="fr-feed"><p class="muted small" style="padding:14px">Đang tải…</p></div></section>
        <section><div class="deck-head"><h2>Thách đấu gần đây</h2><a class="btn sm" href="#/challenge/new">Tạo mới</a></div><div class="card ch-list" id="fr-ch"><p class="muted small" style="padding:14px">Đang tải…</p></div></section>
      </div>
      <section class="section card panel room-box">
        <div><p class="eyebrow">Mã mời bạn vào phòng</p><div class="room-code" id="room-code">${esc(r.code)}</div></div>
        <div class="field" style="margin:0"><label for="wk-day">Ngày làm test tuần</label>
          <select id="wk-day">${WEEKDAYS.map((d, i) => `<option value="${i}" ${i === r.week_test_day ? "selected" : ""}>${d}</option>`).join("")}</select></div>
        <div class="row"><button class="btn sm" id="copy-code">Sao chép mã</button><button class="btn sm ghost" id="new-rc">Mã khôi phục mới</button><button class="btn sm ghost" id="logout">Đăng xuất (${esc(S.profile.username)})</button><button class="btn sm danger" id="leave">Rời phòng</button></div>
      </section>`;

    $("#copy-code").onclick = () => {
      const text = `Vào phòng học "${r.name}" với mình nhé! Mã phòng: ${r.code}`;
      (navigator.clipboard ? navigator.clipboard.writeText(text) : Promise.reject()).then(() => toast("Đã sao chép lời mời"), () => {
        const sel = window.getSelection(), range = document.createRange();
        range.selectNodeContents($("#room-code")); sel.removeAllRanges(); sel.addRange(range);
        toast("Nhấn Ctrl+C để sao chép mã");
      });
    };
    $("#wk-day").onchange = async (e) => {
      try { await sync.updateRoom({ week_test_day: +e.target.value }); toast(`Test tuần vào ${WEEKDAYS[+e.target.value]}`); }
      catch (ex) { toast(ex.message); }
    };
    $("#logout").onclick = async () => { await sync.signOut(); toast("Đã đăng xuất"); EWF.ui.route(); };
    $("#new-rc").onclick = (e) => {
      const b = e.currentTarget;
      if (b.dataset.confirm !== "1") { b.dataset.confirm = "1"; b.textContent = "Mã cũ sẽ hết hiệu lực — bấm lần nữa"; return; }
      makeRecoveryCode(() => EWF.ui.route());
    };
    $("#leave").onclick = async (e) => {
      const b = e.currentTarget;
      if (b.dataset.confirm !== "1") { b.dataset.confirm = "1"; b.textContent = "Bấm lần nữa để rời"; return; }
      try { await sync.leaveRoom(); toast("Đã rời phòng"); EWF.ui.route(); } catch (ex) { toast(ex.message); }
    };

    const here = location.hash;
    try {
      const [states, acts, chs] = await Promise.all([loadStates(), sync.activities(40), sync.listChallenges(8)]);
      if (location.hash !== here) return;
      renderPeople(states);
      renderFeed(acts);
      renderChallenges(chs);
      renderWeeklyBanner(states);
    } catch (ex) {
      if (location.hash === here) $("#fr-people").innerHTML = `<div class="card panel">Không tải được dữ liệu: ${esc(ex.message)}</div>`;
    }
  }

  function renderPeople(states) {
    const rows = S.members.map((m) => ({ m, s: summaryOf(states, m.id) })).sort((a, b) => b.s.weekReviews - a.s.weekReviews || b.s.newThisWeek - a.s.newThisWeek);
    const medals = ["🥇", "🥈", "🥉"];
    $("#fr-people").innerHTML = rows.map(({ m, s }, i) => `
      <div class="card person ${m.id === me() ? "me" : ""}">
        <div class="person-head">${avatar(m.id)}<div><b>${esc(m.display_name)}</b>${m.id === me() ? ` <span class="muted small">(bạn)</span>` : ""}
          <div class="muted small">${s.today ? `Hôm nay ${s.today} lượt` : "Hôm nay chưa học"}${s.lastActive ? ` · ${timeAgo(s.lastActive)}` : ""}</div></div>
          <span class="medal">${s.weekReviews ? medals[i] || "" : ""}</span></div>
        <div class="person-stats">
          <div><b>${s.weekReviews}</b><span>lượt ôn</span></div>
          <div><b>${s.newThisWeek}</b><span>từ mới</span></div>
          <div><b>${s.streak}</b><span>ngày liên tiếp</span></div>
          <div><b>${s.learned}</b><span>đã học</span></div>
          <div><b>${s.mastered}</b><span>đã thuộc</span></div>
        </div>
        ${skillLine(states[m.id])}
        ${m.id !== me() ? `<button class="btn sm" data-nudge="${esc(m.id)}">👉 Chọc ${esc(m.display_name)}</button>` : ""}
      </div>`).join("") + (S.members.length < 2 ? `<div class="card panel muted">Chưa có bạn nào trong phòng. Gửi mã <b>${esc(S.room.code)}</b> cho bạn để cùng học nhé.</div>` : "");
    $$("[data-nudge]").forEach((b) => (b.onclick = () => nudge(b.dataset.nudge)));
  }

  /** Số bài đã luyện mỗi kỹ năng (từ user_state.skills: "deck|bài|kỹ năng"). */
  function skillLine(st) {
    const n = { read: 0, listen: 0, speak: 0, write: 0 };
    for (const k of Object.keys((st && st.skills) || {})) { const kind = k.split("|")[2]; if (kind in n) n[kind]++; }
    if (!Object.values(n).some(Boolean)) return "";
    return `<div class="muted small skill-line">Kỹ năng (số bài): 📖 Đọc <b>${n.read}</b> · 🎧 Nghe <b>${n.listen}</b> · 🗣️ Nói <b>${n.speak}</b> · ✍️ Viết <b>${n.write}</b></div>`;
  }

  async function nudge(id) {
    const key = "ewf.nudged." + id;
    const last = LS.get(key, 0);
    if (Date.now() - last < 10 * 60 * 1000) { toast("Vừa chọc rồi, đợi chút nữa nhé"); return; }
    LS.set(key, Date.now());
    await sync.logActivity("nudge", { to: id });
    toast(`Đã chọc ${nameOf(id)} 👉`);
  }

  // ---------- Dòng hoạt động ----------
  function activityText(a) {
    const p = a.payload || {};
    const who = `<b>${esc(nameOf(a.user_id))}</b>`;
    const link = (id, t) => `<a href="#/challenge/${esc(id)}">${esc(t)}</a>`;
    switch (a.type) {
      case "session": return `${who} vừa học <i>${esc(p.title)}</i> · ${esc((MODES[p.mode] || {}).name || "")}: ${p.mode === "flash" ? `nhớ ${p.ok}/${p.total} thẻ` : `đúng ${p.ok}/${p.total}`}`;
      case "nudge": return p.to === me() ? `${who} chọc bạn: “Học bài đi nào!” 👉` : `${who} chọc <b>${esc(nameOf(p.to))}</b> 👉`;
      case "challenge": return `${who} tạo thách đấu ${link(p.id, p.title)} (${p.n} câu) ⚔️`;
      case "result": return `${who} làm xong ${link(p.id, p.title)}: <b>${p.score}/${p.total}</b>`;
      case "weekly_open": return `📝 Bài test tuần ${esc(String(p.week || "").split("-W")[1] || "")} đã mở — ${link(p.id, "vào làm")}`;
      case "win": return p.tie ? `🤝 ${link(p.id, p.title)}: hoà nhau!` : `🏆 <b>${esc(nameOf(p.winner))}</b> thắng ${link(p.id, p.title)} (${esc(p.scores)})`;
      case "joined": return `${who} đã vào phòng 👋`;
      case "skill": return `${who} luyện ${esc({ read: "Đọc 📖", listen: "Nghe 🎧", speak: "Nói 🗣️", write: "Viết ✍️" }[p.kind] || p.kind)} <i>${esc(p.title)}</i>: ${p.kind === "speak" ? `phát âm đúng ${p.ok}%` : p.kind === "write" ? `đạt ${p.ok}/${p.total} phần` : `đúng ${p.ok}/${p.total}`}`;
      case "review": return `${who} đã chấm bài ${esc(p.kind === "speaking" ? "nói" : "viết")} của <b>${esc(nameOf(p.to))}</b>: ${"★".repeat(p.stars || 0)}`;
      case "submission": return `${who} gửi bài ${esc(p.kind === "speaking" ? "nói" : "viết")} <i>${esc(p.title || "")}</i> — <a href="#/inbox">chấm giúp</a>`;
      default: return `${who} · ${esc(a.type)}`;
    }
  }
  const feedItem = (a) => `<div class="feed-item" data-id="${esc(a.id)}">${avatar(a.user_id, "sm")}<div><div>${activityText(a)}</div><div class="muted small">${timeAgo(a.created_at)}</div></div></div>`;
  function renderFeed(acts) {
    const el = $("#fr-feed");
    if (!el) return;
    el.innerHTML = acts.length ? acts.map(feedItem).join("") : `<p class="muted small" style="padding:14px">Chưa có hoạt động nào. Học một bài là có ngay!</p>`;
  }

  // ---------- Danh sách thách đấu ----------
  function challengeRow(c) {
    const res = c.challenge_results || [];
    const mine = res.find((x) => x.user_id === me());
    const scores = S.members.map((m) => {
      const x = res.find((r) => r.user_id === m.id);
      return `<span class="ch-score ${x ? "" : "muted"}">${esc(m.id === me() ? "Bạn" : m.display_name)}: ${x ? (mine || m.id === me() ? `${x.score}/${x.total}` : "✓ xong") : "—"}</span>`;
    }).join("");
    return `<a class="ch-row" href="#/challenge/${esc(c.id)}">
      <div><div><span class="chip ${c.kind === "weekly" ? "mastered" : "learning"}">${c.kind === "weekly" ? "Test tuần" : "Thách đấu"}</span> <b>${esc(c.title)}</b></div>
        <div class="small">${scores}</div>
        <div class="muted small">${esc(nameOf(c.created_by))} tạo · ${timeAgo(c.created_at)}</div></div>
      <span class="btn sm ${mine ? "" : "primary"}">${mine ? "Xem" : "Làm"}</span></a>`;
  }
  function renderChallenges(chs) {
    const el = $("#fr-ch");
    if (!el) return;
    el.innerHTML = chs.length ? chs.map(challengeRow).join("") : `<p class="muted small" style="padding:14px">Chưa có thách đấu nào. Tạo một đề rồi thách bạn làm thử!</p>`;
  }

  // ---------- Test cuối tuần: lịch ----------
  /** Ngày mở test của tuần chứa t, và hạn chót (lúc test tuần sau mở). */
  function weeklyWindow(t = Date.now()) {
    const ws = EWF.weekStart(t);
    const open = new Date(ws.getTime() + ((S.room.week_test_day + 6) % 7) * DAY);
    open.setHours(0, 0, 0, 0);
    const close = new Date(open.getTime() + 7 * DAY);
    close.setHours(0, 0, 0, 0);
    return { week: EWF.weekId(t), weekStart: ws, open, close };
  }
  /** Tạo đề test tuần nếu đã tới ngày mà chưa ai tạo. Trả về đề (hoặc null nếu chưa tới ngày / chưa đủ từ). */
  /** Thêm 2 câu đọc hiểu + 2 câu nghe hiểu từ bài cả phòng học nhiều nhất trong tuần (nếu bài đó có phần kỹ năng). */
  function skillQuestions(words) {
    const count = new Map();
    for (const w of words) if (EWF.skillsOf(w.deckId, w.lessonId)) { const k = w.deckId + "|" + w.lessonId; count.set(k, (count.get(k) || 0) + 1); }
    const top = [...count.entries()].sort((a, b) => b[1] - a[1])[0];
    if (!top) return [];
    const [d, l] = top[0].split("|");
    const data = EWF.skillsOf(d, l);
    const pick = (qs) => EWF.ui.shuffle(qs.map((q, i) => ({ q, i }))).slice(0, 2).sort((a, b) => a.i - b.i);
    const out = [];
    if (data.read) pick(data.read.q).forEach(({ q, i }) => out.push({
      m: "rc", w: { key: `rc|${d}|${l}|${i}`, word: "" }, p: { type: data.read.type, title: data.read.title, text: data.read.text },
      ...EWF.skills.mixOptions({ q: q.q, o: q.o, a: q.a }), why: q.why || "",
    }));
    if (data.listen) pick(data.listen.q).forEach(({ q, i }) => out.push({
      m: "lc", w: { key: `lc|${d}|${l}|${i}`, word: "" }, lines: data.listen.lines, ...EWF.skills.mixOptions({ q: q.q, o: q.o, a: q.a }), why: q.why || "",
    }));
    return out;
  }

  async function ensureWeekly(states) {
    const w = weeklyWindow();
    if (Date.now() < w.open.getTime()) return null;
    const existing = await sync.getWeekly(w.week);
    if (existing) return existing;
    states = states || (await loadStates());
    let words = weekWords(states, w.weekStart.getTime());
    if (words.length < 4) words = everLearned(states);
    if (words.length < 4) return null;
    const questions = [...buildQuestions(words, CHALLENGE_MODES, WEEKLY_SIZE), ...skillQuestions(words)];
    const n = w.week.split("-W")[1];
    const c = await sync.createChallenge({ kind: "weekly", week: w.week, title: `Test tuần ${n}`, questions });
    if (!c.existed) await sync.logActivity("weekly_open", { id: c.id, week: w.week });
    return c;
  }

  async function renderWeeklyBanner(states) {
    const el = $("#fr-weekly");
    if (!el) return;
    const w = weeklyWindow();
    try {
      const c = await ensureWeekly(states);
      if (!$("#fr-weekly")) return;
      if (c) {
        const done = (c.challenge_results || []).some((r) => r.user_id === me());
        el.innerHTML = `<div class="card hero banner"><div><p class="eyebrow">Test cuối tuần</p><h2>${esc(c.title)} ${done ? "— bạn đã làm xong" : "đã mở!"}</h2>
          <p class="muted">Từ vựng, đọc và nghe từ những bài cả phòng học trong tuần · làm được tới hết ${fmtDate(new Date(w.close.getTime() - DAY))}</p></div>
          <a class="btn ${done ? "" : "primary"}" href="#/challenge/${esc(c.id)}">${done ? "Xem kết quả" : "Làm ngay"}</a></div>`;
      } else if (Date.now() < w.open.getTime()) {
        const left = Math.ceil((w.open.getTime() - Date.now()) / DAY);
        const n = weekWords(states, w.weekStart.getTime()).length;
        el.innerHTML = `<div class="card panel banner-sm"><b>Test cuối tuần</b> mở vào ${fmtDate(w.open)} (còn ${left} ngày) · tuần này cả phòng đã học <b>${n}</b> từ sẽ có trong đề.</div>`;
      }
    } catch (ex) { console.warn(ex); }
  }

  // ---------- Tạo thách đấu ----------
  function newChallengePage() {
    if (!gate()) return;
    const decks = EWF.decks.filter((d) => d.lessons.length);
    app.innerHTML = `
      <div class="row" style="margin-bottom:10px"><a class="btn ghost sm" href="#/friends">${I.back} Cùng học</a></div>
      <div class="page-head"><div><h1>Tạo thách đấu</h1><p class="muted">Bạn làm trước, sau đó bạn cùng phòng làm <b>đúng bộ câu đó</b> rồi so điểm. Hoà điểm thì ai nhanh hơn thắng.</p></div></div>
      <div class="card panel">
        <div class="field"><label for="ch-src">Lấy từ ở đâu?</label>
          <select id="ch-src">
            <option value="lesson">Một bài học</option>
            <option value="week">Từ cả phòng đã học tuần này</option>
            <option value="learned">Từ ngẫu nhiên mình đã học</option>
            <option value="due">Từ mình đang cần ôn</option>
            <option value="hard">Từ mình hay sai</option>
          </select></div>
        <div class="row" id="ch-lesson-f" style="align-items:flex-end">
          <div class="field" style="flex:1;min-width:180px"><label for="ch-deck">Bộ từ</label><select id="ch-deck">${decks.map((d) => `<option value="${esc(d.id)}">${esc(d.name)}</option>`).join("")}</select></div>
          <div class="field" style="flex:2;min-width:200px"><label for="ch-lesson">Bài</label><select id="ch-lesson"></select></div>
        </div>
        <div class="field"><label for="ch-n">Số câu</label><select id="ch-n"><option>10</option><option selected>15</option><option>20</option></select></div>
        <div class="field"><label>Kiểu câu hỏi (trộn lẫn)</label>
          <div class="row">${CHALLENGE_MODES.map((k) => `<label class="toggle small check-pill"><input type="checkbox" value="${k}" ${k !== "spell" ? "checked" : ""}> ${MODES[k].name}</label>`).join("")}</div></div>
        <p class="small" id="ch-err" style="color:var(--bad)" hidden></p>
        <button class="btn primary" id="ch-go">Tạo đề và làm ngay</button>
      </div>`;
    const fillLessons = () => {
      const d = findDeck($("#ch-deck").value);
      $("#ch-lesson").innerHTML = d ? d.lessons.map((l) => `<option value="${esc(l.id)}">Bài ${esc(l.id)} · ${esc(l.title)}</option>`).join("") : "";
    };
    fillLessons();
    $("#ch-deck").onchange = fillLessons;
    $("#ch-src").onchange = () => ($("#ch-lesson-f").hidden = $("#ch-src").value !== "lesson");
    $("#ch-go").onclick = async (e) => {
      const btn = e.currentTarget, err = $("#ch-err");
      err.hidden = true;
      const modes = $$("input[type=checkbox]:checked", app).map((x) => x.value);
      if (!modes.length) { err.textContent = "Chọn ít nhất một kiểu câu hỏi"; err.hidden = false; return; }
      btn.disabled = true;
      try {
        const src = $("#ch-src").value;
        let words = [], title;
        if (src === "lesson") {
          const d = findDeck($("#ch-deck").value), l = findLesson(d, $("#ch-lesson").value);
          words = l ? l.words : []; title = l ? `Bài ${l.id} · ${l.title}` : "";
        } else if (src === "week") {
          words = weekWords(await loadStates(), EWF.weekStart().getTime()); title = "Từ của tuần " + EWF.weekId().split("-W")[1];
        } else if (src === "learned") {
          words = allWords().filter((w) => EWF.getState(w.key)); title = "Từ đã học";
        } else if (src === "due") {
          words = EWF.ui.dueWords(); title = "Từ cần ôn";
        } else {
          words = allWords().filter((w) => (EWF.getState(w.key) || {}).wrong > 0); title = "Từ hay sai";
        }
        const questions = buildQuestions(words, modes, +$("#ch-n").value);
        if (questions.length < 4) throw new Error("Nguồn này chưa đủ từ phù hợp (cần ít nhất 4). Thử nguồn khác hoặc thêm kiểu câu hỏi.");
        const c = await sync.createChallenge({ kind: "duel", title, questions });
        await sync.logActivity("challenge", { id: c.id, title, n: questions.length });
        location.hash = "#/challenge/" + c.id + "/play";
      } catch (ex) {
        err.textContent = ex.message; err.hidden = false; btn.disabled = false;
      }
    };
  }

  // ---------- Làm đề & xem kết quả ----------
  function winnerOf(results) {
    if (results.length < 2) return null;
    const sorted = results.slice().sort((a, b) => b.score - a.score || a.duration_ms - b.duration_ms);
    const tie = sorted[0].score === sorted[1].score && sorted[0].duration_ms === sorted[1].duration_ms;
    return { winner: sorted[0].user_id, tie };
  }

  async function challengePage(id, play) {
    if (!gate()) return;
    app.innerHTML = `<div class="card empty"><h2>Đang tải đề…</h2></div>`;
    const here = location.hash;
    let c;
    try { c = await sync.getChallenge(id); } catch (ex) { app.innerHTML = `<div class="card empty"><h2>Không tải được đề</h2><p class="muted">${esc(ex.message)}</p><a class="btn" href="#/friends">Quay lại</a></div>`; return; }
    if (location.hash !== here) return;
    if (!c) { app.innerHTML = `<div class="card empty"><h2>Không tìm thấy đề này</h2><p class="muted">Có thể đề thuộc phòng khác.</p><a class="btn" href="#/friends">Quay lại</a></div>`; return; }
    const results = c.challenge_results || [];
    const mine = results.find((r) => r.user_id === me());
    if (mine) return resultView(c, results);

    const deadline = c.kind === "weekly" ? weeklyWindow(new Date(c.created_at).getTime()).close : null;
    const expired = deadline && Date.now() >= deadline.getTime();
    const kinds = [...new Set(c.questions.map((q) => q.m))].map(EWF.ui.modeName).join(", ");
    const start = () => runSession("envi", [], c.title, "#/challenge/" + c.id, {
      questions: c.questions,
      onFinish: (res) => submit(c, res),
    });
    if (play && !expired) return start();
    app.innerHTML = `
      <div class="row" style="margin-bottom:10px"><a class="btn ghost sm" href="#/friends">${I.back} Cùng học</a></div>
      <div class="study"><div class="card result">
        <p class="eyebrow">${c.kind === "weekly" ? "Test cuối tuần" : `Thách đấu của ${esc(nameOf(c.created_by))}`}</p>
        <h1 style="margin:6px 0">${esc(c.title)}</h1>
        <p class="muted">${c.questions.length} câu · ${esc(kinds)}${deadline ? ` · hạn chót hết ${fmtDate(new Date(deadline.getTime() - DAY))}` : ""}</p>
        <div class="vs-list">${S.members.filter((m) => m.id !== me()).map((m) => `<div>${avatar(m.id, "sm")} ${esc(m.display_name)}: ${results.some((r) => r.user_id === m.id) ? "<b>đã làm xong</b> — làm xong để xem điểm" : "chưa làm"}</div>`).join("")}</div>
        ${expired ? `<p class="due-dot">Đề này đã hết hạn.</p>` : `<p class="muted small">Mỗi người chỉ làm một lần. Thời gian được tính từ câu đầu tiên.</p><button class="btn primary" id="go">Bắt đầu làm</button>`}
      </div></div>`;
    if (!expired) $("#go").onclick = start;
  }

  async function submit(c, res) {
    app.innerHTML = `<div class="card empty"><h2>Đang nộp bài…</h2></div>`;
    let results;
    try {
      results = await sync.submitResult(c.id, res);
    } catch (ex) {
      app.innerHTML = `<div class="card empty"><h2>Chưa nộp được bài</h2><p class="muted">${esc(ex.message)}</p><button class="btn primary" id="retry">Thử nộp lại</button></div>`;
      $("#retry").onclick = () => submit(c, res);
      return;
    }
    await sync.logActivity("result", { id: c.id, title: c.title, score: res.score, total: res.total });
    if (results.length >= S.members.length && results.length >= 2) {
      const w = winnerOf(results);
      const scores = results.map((r) => `${(member(r.user_id) || {}).display_name || "?"} ${r.score}/${r.total}`).join(" vs ");
      await sync.logActivity("win", { id: c.id, title: c.title, winner: w.winner, tie: w.tie, scores });
    }
    const target = "#/challenge/" + c.id;
    if (location.hash === target) resultView(c, results); else location.hash = target;
  }

  function resultView(c, results) {
    const w = winnerOf(results);
    const allDone = results.length >= Math.max(2, S.members.length);
    const mine = results.find((r) => r.user_id === me());
    const rows = S.members.map((m) => ({ m, r: results.find((x) => x.user_id === m.id) }))
      .sort((a, b) => (b.r ? b.r.score : -1) - (a.r ? a.r.score : -1) || (a.r ? a.r.duration_ms : 1e12) - (b.r ? b.r.duration_ms : 1e12));
    const wrong = (mine.answers || []).filter((a) => !a.ok).map((a) => (c.questions.find((q) => q.w.key === a.k) || {}).w).filter((w) => w && w.word);
    const headline = !allDone ? "Đang chờ bạn cùng phòng làm bài…"
      : w && w.tie ? "Hoà nhau! 🤝"
      : w && w.winner === me() ? "Bạn thắng! 🏆" : `${esc(nameOf(w ? w.winner : ""))} thắng lần này 💪`;
    app.innerHTML = `
      <div class="row" style="margin-bottom:10px"><a class="btn ghost sm" href="#/friends">${I.back} Cùng học</a></div>
      <div class="study"><div class="card result">
        <p class="eyebrow">${c.kind === "weekly" ? "Test cuối tuần" : "Thách đấu"} · ${esc(c.title)}</p>
        <h2 style="margin:8px 0 16px">${headline}</h2>
        <div class="scoreboard">${rows.map(({ m, r }) => `
          <div class="sb-row ${allDone && w && !w.tie && w.winner === m.id ? "win" : ""}">${avatar(m.id)}<b>${esc(m.id === me() ? "Bạn" : m.display_name)}</b>
            <span class="sb-score">${r ? `${r.score}/${r.total}` : "—"}</span><span class="muted small">${r ? fmtDur(r.duration_ms) : "chưa làm"}</span></div>`).join("")}</div>
        <div class="row" style="justify-content:center;margin-top:18px">
          ${wrong.length ? `<button class="btn primary" id="redo-wrong">Ôn lại ${wrong.length} từ sai</button>` : ""}
          <a class="btn" href="#/challenge/new">Tạo thách đấu mới</a><a class="btn" href="#/friends">Xong</a>
        </div>
        ${wrongList(wrong)}
      </div></div>`;
    const rw = $("#redo-wrong");
    if (rw) rw.onclick = () => {
      const local = wrong.map((x) => EWF.wordByKey(x.key) || x);
      runSession("flash", local, "Từ sai trong " + c.title, "#/challenge/" + c.id);
    };
  }

  // ---------- Trang test tuần ----------
  async function weeklyPage() {
    if (!gate()) return;
    const w = weeklyWindow();
    const prev = weeklyWindow(w.weekStart.getTime() - DAY);
    app.innerHTML = `
      <div class="row" style="margin-bottom:10px"><a class="btn ghost sm" href="#/friends">${I.back} Cùng học</a></div>
      <div class="page-head"><div><h1>Test cuối tuần</h1><p class="muted">Mỗi ${WEEKDAYS[S.room.week_test_day]}, cả phòng làm chung một đề ${WEEKLY_SIZE} câu từ những từ đã học trong tuần. Đổi ngày ở trang Cùng học.</p></div></div>
      <div id="wk-now"><div class="card panel muted">Đang tải…</div></div>
      <section class="section"><h2>Lịch sử</h2><div id="wk-tally" class="row" style="margin:10px 0"></div><div class="card ch-list" id="wk-hist"><p class="muted small" style="padding:14px">Đang tải…</p></div></section>`;
    const here = location.hash;
    try {
      const states = await loadStates();
      const cur = await ensureWeekly(states);
      const list = await sync.listChallenges(30, "weekly");
      if (location.hash !== here) return;
      const pending = list.find((c) => c.week === prev.week && Date.now() < prev.close.getTime() && !(c.challenge_results || []).some((r) => r.user_id === me()));
      let html = "";
      if (cur) {
        const done = (cur.challenge_results || []).some((r) => r.user_id === me());
        html += `<div class="card hero"><div><p class="eyebrow">Tuần này</p><h2>${esc(cur.title)}</h2><p class="muted">Hạn chót: hết ${fmtDate(new Date(w.close.getTime() - DAY))}</p></div>
          <a class="btn ${done ? "" : "primary"}" href="#/challenge/${esc(cur.id)}">${done ? "Xem kết quả" : "Làm ngay"}</a></div>`;
      } else if (Date.now() < w.open.getTime()) {
        const words = weekWords(states, w.weekStart.getTime());
        html += `<div class="card hero"><div><p class="eyebrow">Tuần này</p><h2>Mở vào ${fmtDate(w.open)}</h2>
          <p class="muted">Còn ${Math.ceil((w.open.getTime() - Date.now()) / DAY)} ngày · cả phòng đã học <b>${words.length}</b> từ trong tuần — học càng nhiều, đề càng sát.</p></div></div>`;
      } else {
        html += `<div class="card panel">Tuần này chưa đủ từ để ra đề (cần ít nhất 4 từ đã học).</div>`;
      }
      if (pending) html += `<div class="card panel" style="margin-top:12px">Bạn chưa làm <b>${esc(pending.title)}</b> của tuần trước — còn hạn tới hết ${fmtDate(new Date(prev.close.getTime() - DAY))}. <a class="btn sm primary" href="#/challenge/${esc(pending.id)}">Làm ngay</a></div>`;
      $("#wk-now").innerHTML = html;

      const wins = {};
      list.forEach((c) => { const r = winnerOf(c.challenge_results || []); if (r && !r.tie && (c.challenge_results || []).length >= S.members.length) wins[r.winner] = (wins[r.winner] || 0) + 1; });
      $("#wk-tally").innerHTML = S.members.map((m) => `<span class="card tally">${avatar(m.id, "sm")} ${esc(m.id === me() ? "Bạn" : m.display_name)}: <b>${wins[m.id] || 0}</b> tuần thắng</span>`).join("");
      $("#wk-hist").innerHTML = list.length ? list.map(challengeRow).join("") : `<p class="muted small" style="padding:14px">Chưa có bài test nào.</p>`;
    } catch (ex) {
      if (location.hash === here) $("#wk-now").innerHTML = `<div class="card panel">Không tải được: ${esc(ex.message)}</div>`;
    }
  }

  // ---------- Thông báo ----------
  function setBadge(n) {
    const b = $("#friends-badge");
    if (b) { b.hidden = !n; b.textContent = n > 9 ? "9+" : n; }
  }
  async function checkNotifications() {
    if (!S.room) return;
    try {
      const seenAt = LS.get("ewf.seenAt.v1", 0);
      const [acts, chs] = await Promise.all([sync.activities(30, seenAt || Date.now() - 7 * DAY), sync.listChallenges(20)]);
      ensureWeekly().catch(() => {}); // tới ngày thì người mở app đầu tiên tạo đề
      const nudges = acts.filter((a) => a.type === "nudge" && (a.payload || {}).to === me());
      const todo = chs.filter((c) => !(c.challenge_results || []).some((r) => r.user_id === me()) && c.created_by !== me()
        && Date.now() - new Date(c.created_at).getTime() < 8 * DAY);
      if (location.hash !== "#/friends") setBadge(todo.length + (nudges.length ? 1 : 0));
      if (nudges.length) toast(`${nameOf(nudges[0].user_id)} chọc bạn đó! Học thôi 💪`);
      else if (todo.length) toast(`Có ${todo.length} thách đấu đang chờ bạn ⚔️`);
    } catch (ex) { console.warn(ex); }
  }

  sync.on("activity", (a) => {
    const mineAct = a.user_id === me();
    if (!mineAct && a.type === "nudge" && (a.payload || {}).to === me()) toast(`${nameOf(a.user_id)} chọc bạn đó! Học thôi 💪`);
    if (!mineAct && (a.type === "challenge" || a.type === "weekly_open")) {
      toast(a.type === "challenge" ? `${nameOf(a.user_id)} vừa thách đấu bạn ⚔️` : "Bài test tuần đã mở 📝");
      if (location.hash !== "#/friends") { const b = $("#friends-badge"); setBadge((+b.textContent || 0) + 1); }
    }
    const feed = $("#fr-feed");
    if (feed && location.hash === "#/friends") {
      if (feed.querySelector("p.muted")) feed.innerHTML = "";
      if (!feed.querySelector(`[data-id="${a.id}"]`)) feed.insertAdjacentHTML("afterbegin", feedItem(a));
      if (!mineAct && ["session", "result", "win"].includes(a.type)) {
        loadStates().then((st) => { if ($("#fr-people")) renderPeople(st); }).catch(() => {});
        if (a.type !== "session") sync.listChallenges(8).then(renderChallenges).catch(() => {});
      }
    }
    if (!mineAct && (a.type === "result" || a.type === "win") && location.hash === "#/challenge/" + (a.payload || {}).id) EWF.ui.route();
  });

  let notified = false;
  sync.on("change", () => {
    if (!showingCode && (gated || location.hash === "#/friends")) EWF.ui.route();
    if (S.room && !notified) { notified = true; checkNotifications(); }
    if (!S.user) { notified = false; setBadge(0); }
  });

  // Tài khoản tạo trước khi có mã khôi phục: nhắc tạo mã (trang chủ và Cùng học).
  afterRoute((h) => {
    if (S.recovery !== false || showingCode || !["#/", "#", "#/friends"].includes(h) || $("#rc-banner")) return;
    app.insertAdjacentHTML("afterbegin", `<div class="card panel banner-sm row" id="rc-banner" style="justify-content:space-between;flex-wrap:wrap">
      <span>🔑 Tạo <b>mã khôi phục</b> để tự đặt lại mật khẩu nếu lỡ quên.</span><button class="btn sm primary" id="rc-make">Tạo mã ngay</button></div>`);
    $("#rc-make").onclick = () => makeRecoveryCode(() => EWF.ui.route());
  });

  // Khối nhỏ trên trang chủ: hôm nay bạn cùng phòng học thế nào.
  afterRoute(async (h) => {
    if (h !== "#/" && h !== "#") return;
    const slot = $("#home-social");
    if (!slot || !S.room) return;
    try {
      const states = lastStates && Date.now() - lastStatesAt < 60000 ? lastStates : await loadStates();
      if (!document.body.contains(slot)) return;
      const others = S.members.filter((m) => m.id !== me());
      if (!others.length) return;
      const mineS = EWF.summarize();
      slot.innerHTML = `<a class="card friend-strip" href="#/friends">
        ${others.map((m) => { const s = summaryOf(states, m.id); return `<span class="row">${avatar(m.id, "sm")} <span><b>${esc(m.display_name)}</b> ${s.today ? `hôm nay đã học <b>${s.today}</b> lượt` : "hôm nay chưa học"}</span></span>`; }).join("")}
        <span class="muted small">${mineS.today ? `Bạn: ${mineS.today} lượt` : "Bạn chưa học hôm nay — vượt mặt bạn ấy nào!"} →</span></a>`;
    } catch { /* mất mạng: bỏ qua */ }
  });

  EWF.ui.gate = gate;
  navAlias({ challenge: "friends", weekly: "friends" });
  addRoute(/^#\/friends$/, friendsPage);
  addRoute(/^#\/challenge\/new$/, newChallengePage);
  addRoute(/^#\/challenge\/([\w-]+)(\/play)?$/, challengePage);
  addRoute(/^#\/weekly$/, weeklyPage);
})();
