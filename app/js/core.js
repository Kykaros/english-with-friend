/* Lõi: đăng ký bộ từ, lưu tiến độ học (localStorage), lặp lại ngắt quãng (SRS). */
(function () {
  const LS = {
    get(key, fallback) {
      try { const v = localStorage.getItem(key); return v == null ? fallback : JSON.parse(v); }
      catch { return fallback; }
    },
    set(key, value) {
      try { localStorage.setItem(key, JSON.stringify(value)); } catch { /* bộ nhớ đầy hoặc bị chặn */ }
    },
  };

  const KEYS = {
    progress: "ewf.progress.v1", days: "ewf.days.v1", settings: "ewf.settings.v1", custom: "ewf.customDecks.v1",
    deleted: "ewf.deletedDecks.v1", resetAt: "ewf.resetAt.v1", skills: "ewf.skills.v1",
  };
  const DAY = 24 * 60 * 60 * 1000;
  // Khoảng cách ôn tập (ngày) theo từng "hộp" Leitner: hộp càng cao càng thuộc.
  const INTERVALS = [0, 1, 2, 4, 8, 16, 32];
  const MASTERED_BOX = 4;

  const decks = [];

  function normalizeDeck(raw, source) {
    const fields = raw.fields || ["word", "pos", "vi", "def", "example", "family"];
    const lessons = (raw.lessons || []).map((les, i) => {
      const lessonId = les.id ?? i + 1;
      const words = (les.words || []).map((w) => {
        const o = Array.isArray(w) ? Object.fromEntries(fields.map((f, k) => [f, w[k] ?? ""])) : { ...w };
        o.word = String(o.word || "").trim();
        o.key = `${raw.id}|${o.word.toLowerCase()}`;
        o.deckId = raw.id;
        o.lessonId = lessonId;
        return o;
      }).filter((w) => w.word);
      return { id: lessonId, title: les.title || `Bài ${lessonId}`, titleVi: les.titleVi || "", words };
    });
    return {
      id: raw.id, name: raw.name || raw.id, description: raw.description || "",
      audio: typeof raw.audio === "function" ? raw.audio : () => null,
      lessons, source,
    };
  }

  const byKey = new Map();
  function addDeck(raw, source = "file") {
    if (!raw || !raw.id) { console.warn("Bộ từ thiếu id", raw); return; }
    const i = decks.findIndex((d) => d.id === raw.id);
    const deck = normalizeDeck(raw, source);
    if (i >= 0) decks[i] = deck; else decks.push(deck);
    deck.lessons.forEach((l) => l.words.forEach((w) => byKey.set(w.key, w)));
  }
  const wordByKey = (key) => byKey.get(key) || null;

  // Nội dung luyện 4 kỹ năng của từng bài (data/*-skills-*.js gọi EWF.addSkills).
  const skillData = {};
  function addSkills(deckId, lessonId, data) { skillData[`${deckId}|${lessonId}`] = data; }
  const skillsOf = (deckId, lessonId) => skillData[`${deckId}|${lessonId}`] || null;

  // Thông báo cho lớp đồng bộ (sync.js) mỗi khi dữ liệu học thay đổi.
  const listeners = [];
  const onChange = (fn) => listeners.push(fn);
  const emit = (what) => listeners.forEach((fn) => { try { fn(what); } catch (e) { console.error(e); } });

  // Nạp lần lượt các file trong data/manifest.js (giữ đúng thứ tự hiển thị) rồi gọi onDone.
  function loadFiles(files, onDone) {
    const failed = [];
    const step = (i) => {
      if (i >= files.length) return onDone(failed);
      const s = document.createElement("script");
      s.src = "data/" + files[i];
      s.onload = () => step(i + 1);
      s.onerror = () => { failed.push(files[i]); step(i + 1); };
      document.head.appendChild(s);
    };
    step(0);
  }

  function loadCustomDecks() {
    LS.get(KEYS.custom, []).forEach((d) => addDeck(d, "import"));
  }
  function saveCustomDeck(raw) {
    const list = LS.get(KEYS.custom, []).filter((d) => d.id !== raw.id);
    list.push(raw);
    LS.set(KEYS.custom, list);
    addDeck(raw, "import");
    emit("decks");
  }
  function removeCustomDeck(id) {
    LS.set(KEYS.custom, LS.get(KEYS.custom, []).filter((d) => d.id !== id));
    LS.set(KEYS.deleted, [...new Set([...LS.get(KEYS.deleted, []), id])]);
    const i = decks.findIndex((d) => d.id === id && d.source === "import");
    if (i >= 0) decks.splice(i, 1);
    emit("decks");
  }

  // ---- Ngày & tuần (theo giờ máy) ----
  const dayKey = (d) => `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`;
  function today() { return dayKey(new Date()); }
  /** 0h thứ Hai của tuần chứa thời điểm t. */
  function weekStart(t = Date.now()) {
    const d = new Date(t);
    d.setHours(0, 0, 0, 0);
    d.setDate(d.getDate() - ((d.getDay() + 6) % 7));
    return d;
  }
  /** Mã tuần ISO, ví dụ "2026-W41". */
  function weekId(t = Date.now()) {
    const d = new Date(t);
    d.setHours(0, 0, 0, 0);
    d.setDate(d.getDate() + 3 - ((d.getDay() + 6) % 7)); // thứ Năm của tuần
    const w1 = new Date(d.getFullYear(), 0, 4);
    const n = 1 + Math.round(((d - w1) / DAY - 3 + ((w1.getDay() + 6) % 7)) / 7);
    return `${d.getFullYear()}-W${String(n).padStart(2, "0")}`;
  }

  // ---- Tiến độ ----
  let progress = LS.get(KEYS.progress, {});
  let days = LS.get(KEYS.days, {});
  let resetAt = LS.get(KEYS.resetAt, 0);
  let skills = LS.get(KEYS.skills, {});
  const saveAll = () => {
    LS.set(KEYS.progress, progress); LS.set(KEYS.days, days); LS.set(KEYS.resetAt, resetAt); LS.set(KEYS.skills, skills);
  };
  function getState(key) { return progress[key] || null; }
  function isDue(key, now = Date.now()) { const s = progress[key]; return !!s && s.due <= now; }
  function isMastered(key) { const s = progress[key]; return !!s && s.box >= MASTERED_BOX; }

  /** grade: 0 = quên, 1 = khó, 2 = nhớ, 3 = dễ */
  function grade(key, g) {
    const s = progress[key] || { box: 0, due: 0, seen: 0, right: 0, wrong: 0 };
    s.seen++;
    if (g === 0) { s.box = 0; s.wrong++; s.due = Date.now() + 10 * 60 * 1000; }
    else {
      s.right++;
      if (g === 1) s.box = Math.max(1, s.box);
      if (g === 2) s.box = Math.min(INTERVALS.length - 1, s.box + 1);
      if (g === 3) s.box = Math.min(INTERVALS.length - 1, s.box + 2);
      s.due = Date.now() + INTERVALS[s.box] * DAY - 60 * 60 * 1000;
    }
    s.last = Date.now();
    if (!s.first) s.first = s.last;
    progress[key] = s;
    const t = today();
    days[t] = (days[t] || 0) + 1;
    LS.set(KEYS.progress, progress);
    LS.set(KEYS.days, days);
    emit("progress");
  }

  function streakOf(d) {
    let n = 0;
    const c = new Date();
    if (!d[today()]) c.setDate(c.getDate() - 1); // chưa học hôm nay thì tính tới hôm qua
    while (d[dayKey(c)]) { n++; c.setDate(c.getDate() - 1); }
    return n;
  }
  function streak() { return streakOf(days); }

  /** Thống kê từ dữ liệu thô — dùng cho cả mình lẫn bạn cùng phòng. */
  function summarize(p = progress, d = days) {
    const ws = weekStart().getTime();
    const r = { learned: 0, mastered: 0, newThisWeek: 0, today: d[today()] || 0, weekReviews: 0, streak: streakOf(d), lastActive: 0 };
    for (const s of Object.values(p || {})) {
      r.learned++;
      if (s.box >= MASTERED_BOX) r.mastered++;
      if ((s.first || 0) >= ws) r.newThisWeek++;
      if ((s.last || 0) > r.lastActive) r.lastActive = s.last;
    }
    const c = new Date(ws);
    for (let i = 0; i < 7; i++) { r.weekReviews += d[dayKey(c)] || 0; c.setDate(c.getDate() + 1); }
    return r;
  }

  function exportProgress() { return { progress, days, exportedAt: new Date().toISOString() }; }
  function importProgress(data) {
    if (!data || typeof data.progress !== "object") throw new Error("File không đúng định dạng");
    progress = data.progress; days = data.days || {};
    resetAt = 0;
    saveAll();
    emit("progress");
  }
  function resetProgress() {
    progress = {}; days = {}; resetAt = Date.now();
    saveAll();
    emit("progress");
  }

  // ---- Đồng bộ ----
  /** Toàn bộ dữ liệu học để đẩy lên máy chủ. */
  function snapshot() {
    return {
      progress, days, skills, reset_at: resetAt,
      custom_decks: { decks: LS.get(KEYS.custom, []), deleted: LS.get(KEYS.deleted, []) },
    };
  }
  /**
   * Gộp dữ liệu từ máy chủ vào máy này. Không bao giờ làm mất dữ liệu của bên nào:
   * từng từ lấy bản học gần nhất, số lượt mỗi ngày lấy giá trị lớn hơn, bộ từ hợp lại.
   * Trả về { local: có thay đổi ở máy này, remote: máy này có dữ liệu mà máy chủ chưa có }.
   */
  function mergeState(r) {
    const out = { local: false, remote: false };
    if (!r) return out;
    const rReset = Number(r.reset_at) || 0;
    if (rReset > resetAt) {
      resetAt = rReset;
      for (const k of Object.keys(progress)) if ((progress[k].last || 0) < resetAt) { delete progress[k]; out.local = true; }
      for (const k of Object.keys(days)) if (new Date(k + "T23:59:59").getTime() < resetAt) { delete days[k]; out.local = true; }
    } else if (resetAt > rReset) out.remote = true;

    const rp = r.progress || {};
    for (const [k, s] of Object.entries(rp)) {
      if ((s.last || 0) < resetAt) continue;
      const mine = progress[k];
      if (!mine || (s.last || 0) > (mine.last || 0)) { progress[k] = s; out.local = true; }
      else if ((mine.last || 0) > (s.last || 0)) out.remote = true;
    }
    for (const k of Object.keys(progress)) if (!rp[k]) out.remote = true;

    const rd = r.days || {};
    for (const [k, n] of Object.entries(rd)) {
      if (new Date(k + "T23:59:59").getTime() < resetAt) continue;
      if ((days[k] || 0) < n) { days[k] = n; out.local = true; }
      else if ((days[k] || 0) > n) out.remote = true;
    }
    for (const k of Object.keys(days)) if (rd[k] === undefined) out.remote = true;

    const rs = r.skills || {};
    for (const [k, v] of Object.entries(rs)) {
      if (!skills[k] || (v.at || 0) > (skills[k].at || 0)) { skills[k] = v; out.local = true; }
      else if ((skills[k].at || 0) > (v.at || 0)) out.remote = true;
    }
    for (const k of Object.keys(skills)) if (!rs[k]) out.remote = true;

    const rc = r.custom_decks || {};
    const deleted = [...new Set([...LS.get(KEYS.deleted, []), ...(rc.deleted || [])])];
    const mineDecks = LS.get(KEYS.custom, []);
    const merged = new Map(mineDecks.map((d) => [d.id, d]));
    for (const d of rc.decks || []) if (!merged.has(d.id)) { merged.set(d.id, d); out.local = true; }
    for (const d of mineDecks) if (!(rc.decks || []).some((x) => x.id === d.id)) out.remote = true;
    if (deleted.length > (rc.deleted || []).length) out.remote = true;
    const list = [...merged.values()].filter((d) => !deleted.includes(d.id));
    if (list.length !== merged.size) out.local = true;
    LS.set(KEYS.custom, list); LS.set(KEYS.deleted, deleted);
    for (let i = decks.length - 1; i >= 0; i--) if (decks[i].source === "import" && deleted.includes(decks[i].id)) decks.splice(i, 1);
    list.forEach((d) => { if (!decks.some((x) => x.id === d.id)) addDeck(d, "import"); });

    saveAll();
    return out;
  }
  /** Xóa toàn bộ dữ liệu học trên máy (khi đổi sang tài khoản khác). */
  function clearLocal() {
    progress = {}; days = {}; skills = {}; resetAt = 0;
    saveAll();
    LS.set(KEYS.custom, []); LS.set(KEYS.deleted, []);
    for (let i = decks.length - 1; i >= 0; i--) if (decks[i].source === "import") decks.splice(i, 1);
  }

  // ---- Kết quả các kỹ năng (giai đoạn 2): skills["deck|lesson|kind"] = { score, total, at } ----
  function setSkill(id, result) {
    skills[id] = { ...result, at: Date.now() };
    LS.set(KEYS.skills, skills);
    const t = today();
    days[t] = (days[t] || 0) + 1;
    LS.set(KEYS.days, days);
    emit("skills");
  }
  const getSkill = (id) => skills[id] || null;

  const defaultSettings = { voice: "", rate: 0.9, quizSize: 12, autoSpeak: true, showVi: true };
  function settings() { return { ...defaultSettings, ...LS.get(KEYS.settings, {}) }; }
  function saveSettings(s) { LS.set(KEYS.settings, s); }

  window.EWF = {
    decks, addDeck, addSkills, skillsOf, loadFiles, loadCustomDecks, saveCustomDeck, removeCustomDeck, wordByKey,
    getState, isDue, isMastered, grade, streak, streakOf, summarize, today, dayKey, weekStart, weekId, days: () => days,
    progress: () => progress,
    exportProgress, importProgress, resetProgress, settings, saveSettings,
    onChange, snapshot, mergeState, clearLocal, setSkill, getSkill,
    MASTERED_BOX, DAY,
  };
})();
