/* Giao diện: định tuyến theo hash, các trang và các chế độ học. */
(function () {
  const $ = (s, el = document) => el.querySelector(s);
  const $$ = (s, el = document) => [...el.querySelectorAll(s)];
  const esc = (s) => String(s ?? "").replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));
  const app = $("#app");
  let cleanup = null;

  const svg = (d) => `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${d}</svg>`;
  const I = {
    speaker: svg('<path d="M11 5 6 9H2v6h4l5 4V5z"/><path d="M15.5 8.5a5 5 0 0 1 0 7"/><path d="M19 5a10 10 0 0 1 0 14"/>'),
    cards: svg('<rect x="3" y="6" width="14" height="14" rx="2"/><path d="M7 2h12a2 2 0 0 1 2 2v12"/>'),
    check: svg('<path d="M20 6 9 17l-5-5"/>'),
    swap: svg('<path d="M7 4 3 8l4 4"/><path d="M3 8h14"/><path d="m17 20 4-4-4-4"/><path d="M21 16H7"/>'),
    ear: svg('<path d="M6 8.5a6 6 0 1 1 12 0c0 4-3 5-3 8a3.5 3.5 0 0 1-7 0"/><path d="M10 8.5a2 2 0 1 1 4 0"/>'),
    text: svg('<path d="M4 7V5h16v2"/><path d="M12 5v14"/><path d="M9 19h6"/>'),
    keyboard: svg('<rect x="2" y="6" width="20" height="12" rx="2"/><path d="M6 10h.01M10 10h.01M14 10h.01M18 10h.01M7 14h10"/>'),
    back: svg('<path d="m15 18-6-6 6-6"/>'),
    next: svg('<path d="m9 18 6-6-6-6"/>'),
    x: svg('<path d="M18 6 6 18M6 6l12 12"/>'),
  };

  const MODES = {
    flash:  { name: "Thẻ ghi nhớ", desc: "Lật thẻ, tự chấm mức nhớ", icon: I.cards },
    envi:   { name: "Anh → Việt", desc: "Chọn nghĩa đúng", icon: I.swap, needVi: true },
    vien:   { name: "Việt → Anh", desc: "Nhìn nghĩa, chọn từ", icon: I.swap, needVi: true },
    listen: { name: "Nghe & chọn", desc: "Nghe phát âm, chọn từ", icon: I.ear },
    cloze:  { name: "Điền vào câu", desc: "Chọn từ hợp với câu", icon: I.text, needCloze: true },
    spell:  { name: "Chính tả", desc: "Nghe + nghĩa, gõ lại từ", icon: I.keyboard },
  };

  // ---------- Tiện ích ----------
  function toast(msg) {
    const t = $("#toast");
    t.textContent = msg; t.hidden = false;
    clearTimeout(toast._t); toast._t = setTimeout(() => (t.hidden = true), 2200);
  }
  function shuffle(a) {
    a = a.slice();
    for (let i = a.length - 1; i > 0; i--) { const j = Math.floor(Math.random() * (i + 1)); [a[i], a[j]] = [a[j], a[i]]; }
    return a;
  }
  const fold = (s) => String(s || "").toLowerCase().normalize("NFD").replace(/[̀-ͯ]/g, "").replace(/đ/g, "d");
  const normAnswer = (s) => String(s || "").toLowerCase().replace(/[’']/g, "'").replace(/[^a-z0-9' -]/g, "").replace(/[\s-]+/g, " ").trim();

  const findDeck = (id) => EWF.decks.find((d) => d.id === id);
  const findLesson = (deck, id) => deck && deck.lessons.find((l) => String(l.id) === String(id));
  const allWords = () => EWF.decks.flatMap((d) => d.lessons.flatMap((l) => l.words));
  const dueWords = (deckId) => allWords().filter((w) => (!deckId || w.deckId === deckId) && EWF.isDue(w.key));

  function status(w) {
    const s = EWF.getState(w.key);
    if (!s) return "new";
    if (s.due <= Date.now()) return "due";
    return s.box >= EWF.MASTERED_BOX ? "mastered" : "learning";
  }
  const STATUS_LABEL = { new: "Mới", learning: "Đang học", mastered: "Đã thuộc", due: "Cần ôn" };

  function stats(words) {
    const r = { total: words.length, seen: 0, mastered: 0, due: 0 };
    const now = Date.now();
    for (const w of words) {
      const s = EWF.getState(w.key);
      if (!s) continue;
      r.seen++;
      if (s.box >= EWF.MASTERED_BOX) r.mastered++;
      if (s.due <= now) r.due++;
    }
    return r;
  }
  function bar(st) {
    const m = st.total ? (st.mastered / st.total) * 100 : 0;
    const l = st.total ? ((st.seen - st.mastered) / st.total) * 100 : 0;
    return `<div class="bar" title="${st.mastered} đã thuộc · ${st.seen - st.mastered} đang học"><i class="m" style="width:${m}%"></i><i class="l" style="width:${l}%"></i></div>`;
  }

  // ---------- Phát âm (Web Speech API, chạy offline với giọng có sẵn của Windows) ----------
  let voices = [];
  function loadVoices() {
    if (!("speechSynthesis" in window)) return;
    voices = speechSynthesis.getVoices().filter((v) => /^en[-_]/i.test(v.lang));
  }
  if ("speechSynthesis" in window) { loadVoices(); speechSynthesis.onvoiceschanged = loadVoices; }
  function speak(text, rate) {
    if (!("speechSynthesis" in window)) { toast("Trình duyệt không hỗ trợ đọc phát âm"); return; }
    speechSynthesis.cancel();
    const s = EWF.settings();
    const u = new SpeechSynthesisUtterance(text);
    const v = voices.find((x) => x.name === s.voice) || voices.find((x) => /en-US/i.test(x.lang)) || voices[0];
    if (v) u.voice = v;
    u.lang = v ? v.lang : "en-US";
    u.rate = rate || s.rate;
    speechSynthesis.speak(u);
  }
  document.addEventListener("click", (e) => {
    const b = e.target.closest("[data-speak]");
    if (b) { e.preventDefault(); e.stopPropagation(); speak(b.dataset.speak); }
  });
  const speakBtn = (text, cls = "icon-btn") => `<button class="${cls}" data-speak="${esc(text)}" title="Nghe phát âm">${I.speaker}</button>`;

  // ---------- Câu điền từ: tìm từ (hoặc dạng biến đổi) trong câu ví dụ ----------
  const BE = "(?:be|is|am|are|was|were|been|being)";
  function stemPattern(token) {
    const t = token.toLowerCase().replace(/[^a-z'-]/g, "");
    if (t === "be") return BE;
    if (t.length <= 3) return t.replace(/[-]/g, "\\-") + "\\w*";
    let st = t;
    if (/e$/.test(st)) st = st.slice(0, -1);
    else if (/y$/.test(st)) st = st.slice(0, -1);
    return st.replace(/[-]/g, "\\-") + "\\w*";
  }
  function clozeOf(w) {
    if (!w.example) return null;
    if (w._cloze !== undefined) return w._cloze;
    const cands = [w.word, ...String(w.family || "").split(/[,;]/).map((x) => x.replace(/\(.*?\)/g, "").trim()).filter(Boolean)];
    let found = null;
    for (const c of cands) {
      const toks = c.split(/\s+/);
      const pat = toks.map((t, i) => (i === 0 || i === toks.length - 1 ? stemPattern(t) : t.replace(/[^a-z'-]/gi, ""))).join("\\s+");
      const m = new RegExp(`\\b(${pat})\\b`, "i").exec(w.example);
      if (m) { found = { before: w.example.slice(0, m.index), answer: m[1], after: w.example.slice(m.index + m[1].length) }; break; }
    }
    w._cloze = found;
    return found;
  }

  // ---------- Định tuyến ----------
  const routes = [
    [/^#\/?$/, home],
    [/^#\/lesson\/([^/]+)\/([^/]+)$/, lessonPage],
    [/^#\/study\/(\w+)\/([^/]+)\/([^/]+)$/, studyRoute],
    [/^#\/review$/, reviewPage],
    [/^#\/search$/, searchPage],
    [/^#\/import$/, importPage],
    [/^#\/settings$/, settingsPage],
  ];
  // Mục menu được tô sáng cho các trang con (social.js thêm vào qua EWF.ui.addRoute).
  const NAV_OF = { lesson: "home", study: "home" };
  const afterRoute = [];
  function route() {
    if (cleanup) { cleanup(); cleanup = null; }
    if ("speechSynthesis" in window) speechSynthesis.cancel();
    const h = decodeURI(location.hash || "#/");
    const nav = h.split("/")[1] || "home";
    $$(".nav a").forEach((a) => a.classList.toggle("active", a.dataset.nav === (NAV_OF[nav] || nav)));
    for (const [re, fn] of routes) {
      const m = h.match(re);
      if (m) {
        fn(...m.slice(1)); updateBadge(); window.scrollTo(0, 0);
        afterRoute.forEach((f) => f(h));
        return;
      }
    }
    location.hash = "#/";
  }
  function updateBadge() {
    const n = dueWords().length;
    const b = $("#due-badge");
    b.hidden = n === 0; b.textContent = n > 99 ? "99+" : n;
  }
  function onKey(fn) {
    if (cleanup) cleanup();
    const h = (e) => {
      if (e.ctrlKey || e.metaKey || e.altKey) return;
      fn(e);
    };
    document.addEventListener("keydown", h);
    cleanup = () => document.removeEventListener("keydown", h);
  }

  // ---------- Trang chủ ----------
  function home() {
    const words = allWords();
    const st = stats(words);
    const due = st.due;
    const streak = EWF.streak();

    let next = null;
    for (const d of EWF.decks) {
      for (const l of d.lessons) {
        const s = stats(l.words);
        if (s.seen < s.total) { next = { d, l }; break; }
      }
      if (next) break;
    }

    let hero;
    if (due > 0) {
      hero = `<div><h2>Hôm nay có ${due} từ cần ôn</h2><p class="muted">Ôn đúng lúc sắp quên giúp nhớ lâu hơn rất nhiều so với học dồn.</p></div>
        <div class="row"><a class="btn primary" href="#/study/flash/all/due">Ôn ngay bằng thẻ</a><a class="btn" href="#/review">Chọn cách ôn</a></div>`;
    } else if (next) {
      hero = `<div><p class="eyebrow">Học tiếp</p><h2>Bài ${esc(next.l.id)} · ${esc(next.l.title)}</h2><p class="muted">${esc(next.l.titleVi)} — ${next.l.words.length} từ · ${esc(next.d.name)}</p></div>
        <div class="row"><a class="btn primary" href="#/study/flash/${esc(next.d.id)}/${esc(next.l.id)}">Học bằng thẻ</a><a class="btn" href="#/lesson/${esc(next.d.id)}/${esc(next.l.id)}">Xem bài</a></div>`;
    } else {
      hero = `<div><h2>Bạn đã học hết các bài hiện có</h2><p class="muted">Thêm bộ từ mới ở mục Nhập dữ liệu nhé.</p></div><a class="btn primary" href="#/import">Nhập dữ liệu</a>`;
    }

    app.innerHTML = `
      <div class="page-head"><div><p class="eyebrow">${new Date().toLocaleDateString("vi-VN", { weekday: "long", day: "numeric", month: "long" })}</p><h1>Chào bạn, học chút nhé!</h1></div></div>
      <div class="card hero">${hero}</div>
      <div id="home-social"></div>
      <div class="stats section" style="margin-top:14px">
        <div class="card stat"><div class="num">${st.seen}<span class="muted small"> / ${st.total}</span></div><div class="lbl">Từ đã học</div></div>
        <div class="card stat good"><div class="num">${st.mastered}</div><div class="lbl">Từ đã thuộc</div></div>
        <div class="card stat warn"><div class="num">${due}</div><div class="lbl">Cần ôn hôm nay</div></div>
        <div class="card stat"><div class="num">${streak}</div><div class="lbl">Ngày học liên tiếp</div></div>
      </div>
      ${EWF.decks.map(deckSection).join("") || `<div class="card empty section"><h2>Chưa có dữ liệu</h2><p class="muted">Kiểm tra file data/manifest.js hoặc nhập dữ liệu.</p><a class="btn primary" href="#/import">Nhập dữ liệu</a></div>`}
    `;
  }
  function deckSection(d) {
    const words = d.lessons.flatMap((l) => l.words);
    const st = stats(words);
    return `<section class="section">
      <div class="deck-head"><div><h2>${esc(d.name)}</h2><p class="muted small" style="margin:4px 0 0">${esc(d.description)} · ${st.mastered}/${st.total} từ đã thuộc</p></div>
      ${st.due ? `<a class="btn sm" href="#/study/flash/${esc(d.id)}/due">Ôn ${st.due} từ của bộ này</a>` : ""}</div>
      <div class="grid">${d.lessons.map((l) => {
        const s = stats(l.words);
        const done = s.total && s.mastered === s.total;
        return `<a class="card lesson-card" href="#/lesson/${esc(d.id)}/${esc(l.id)}">
          <div class="num"><span>Bài ${esc(l.id)}</span>${done ? `<span class="check">${I.check.replace("<svg", '<svg width="14" height="14"')}</span>` : s.due ? `<span class="due-dot">${s.due} cần ôn</span>` : ""}</div>
          <div class="t">${esc(l.title)}</div><div class="tv">${esc(l.titleVi)}</div>
          <div class="meta"><span>${s.seen}/${s.total} đã học</span><span>${s.mastered} thuộc</span></div>${bar(s)}
        </a>`;
      }).join("")}</div></section>`;
  }

  // ---------- Trang bài học ----------
  function lessonPage(deckId, lessonId) {
    const d = findDeck(deckId), l = findLesson(d, lessonId);
    if (!l) { location.hash = "#/"; return; }
    const i = d.lessons.indexOf(l);
    const prev = d.lessons[i - 1], next = d.lessons[i + 1];
    const st = stats(l.words);
    const audio = d.audio(l.id);
    const s = EWF.settings();

    app.innerHTML = `
      <div class="row" style="justify-content:space-between;margin-bottom:10px">
        <a class="btn ghost sm" href="#/">${I.back} ${esc(d.name)}</a>
        <div class="row">
          ${prev ? `<a class="btn ghost sm" href="#/lesson/${esc(d.id)}/${esc(prev.id)}">${I.back} Bài ${esc(prev.id)}</a>` : ""}
          ${next ? `<a class="btn ghost sm" href="#/lesson/${esc(d.id)}/${esc(next.id)}">Bài ${esc(next.id)} ${I.next}</a>` : ""}
        </div>
      </div>
      <div class="page-head"><div><p class="eyebrow">Bài ${esc(l.id)} · ${l.words.length} từ</p><h1>${esc(l.title)}</h1><p class="muted">${esc(l.titleVi)}</p></div>
        <div style="min-width:220px">${bar(st)}<p class="muted small" style="margin:6px 0 0">${st.seen} đã học · ${st.mastered} đã thuộc${st.due ? ` · <b class="due-dot">${st.due} cần ôn</b>` : ""}</p></div></div>
      <div class="modes">${Object.entries(MODES).map(([k, m]) => `
        <a class="card mode" href="#/study/${k}/${esc(d.id)}/${esc(l.id)}"><span class="ic">${m.icon}</span><div><b>${m.name}</b><span>${m.desc}</span></div></a>`).join("")}
      </div>
      ${audio ? `<div class="card audio-box"><b class="small">Audio bài ${esc(l.id)}</b><audio controls preload="none" src="${esc(audio)}"></audio><span class="small muted" id="audio-err" hidden>Không mở được file audio.</span></div>` : ""}
      <div class="row section" style="justify-content:space-between;margin-top:22px">
        <h2>Danh sách từ</h2>
        <label class="toggle small"><input type="checkbox" id="hide-vi" ${s.showVi ? "" : "checked"}> Ẩn nghĩa để tự kiểm tra</label>
      </div>
      <div class="card word-list ${s.showVi ? "" : "hide-vi"}" id="word-list">${l.words.map((w) => wordRow(w)).join("")}</div>
    `;
    const au = $("audio", app);
    if (au) au.addEventListener("error", () => ($("#audio-err").hidden = false));
    $("#hide-vi").addEventListener("change", (e) => {
      $("#word-list").classList.toggle("hide-vi", e.target.checked);
      EWF.saveSettings({ ...EWF.settings(), showVi: !e.target.checked });
    });
  }
  function wordRow(w, extra = "") {
    const st = status(w);
    return `<div class="word-row">
      ${speakBtn(w.word)}
      <div>
        <div><span class="w">${esc(w.word)}</span>${w.pos ? `<span class="pos">${esc(w.pos)}</span>` : ""}</div>
        ${w.vi ? `<div class="vi">${esc(w.vi)}</div>` : ""}
        ${w.def ? `<div class="def">${esc(w.def)}</div>` : ""}
        ${w.example ? `<div class="ex">“${esc(w.example)}” <button class="btn ghost sm" data-speak="${esc(w.example)}" title="Nghe câu">${I.speaker.replace("<svg", '<svg width="14" height="14"')}</button></div>` : ""}
        ${w.family ? `<div class="fam">Họ từ: ${esc(w.family)}</div>` : ""}
        ${extra}
      </div>
      <span class="chip ${st}">${STATUS_LABEL[st]}</span>
    </div>`;
  }

  // ---------- Ôn tập ----------
  function reviewPage() {
    const due = dueWords();
    const hard = allWords().map((w) => ({ w, s: EWF.getState(w.key) })).filter((x) => x.s && x.s.wrong > 0)
      .sort((a, b) => b.s.wrong - a.s.wrong || a.s.box - b.s.box).slice(0, 20);
    const byDeck = EWF.decks.map((d) => ({ d, n: due.filter((w) => w.deckId === d.id).length })).filter((x) => x.n);

    app.innerHTML = `
      <div class="page-head"><div><h1>Ôn tập</h1><p class="muted">Từ được hẹn ôn lại theo khoảng cách tăng dần: 1 → 2 → 4 → 8 → 16 → 32 ngày. Trả lời sai sẽ quay lại từ đầu.</p></div></div>
      ${due.length ? `
        <div class="card hero"><div><h2>${due.length} từ đến hạn ôn</h2><p class="muted">${byDeck.map((x) => `${esc(x.d.name)}: ${x.n}`).join(" · ")}</p></div></div>
        <div class="modes">${Object.entries(MODES).map(([k, m]) => `
          <a class="card mode" href="#/study/${k}/all/due"><span class="ic">${m.icon}</span><div><b>${m.name}</b><span>${m.desc}</span></div></a>`).join("")}</div>`
      : `<div class="card empty"><h2>Không có từ nào cần ôn lúc này</h2><p class="muted">Học thêm bài mới, các từ sẽ tự động được hẹn lịch ôn.</p><a class="btn primary" href="#/">Chọn bài để học</a></div>`}
      ${hard.length ? `<section class="section"><div class="deck-head"><div><h2>Từ hay sai</h2><p class="muted small" style="margin:4px 0 0">Những từ bạn trả lời sai nhiều nhất</p></div>
        <a class="btn sm" href="#/study/flash/all/hard">Luyện các từ này</a></div>
        <div class="card word-list">${hard.map((x) => wordRow(x.w)).join("")}</div></section>` : ""}
    `;
  }

  // ---------- Phiên học ----------
  function studyRoute(mode, deckId, lessonId) {
    if (!MODES[mode]) { location.hash = "#/"; return; }
    let words, title, back;
    if (lessonId === "due") {
      words = shuffle(dueWords(deckId === "all" ? null : deckId)).slice(0, mode === "flash" ? 40 : 60);
      title = "Ôn tập"; back = "#/review";
    } else if (lessonId === "hard") {
      words = allWords().map((w) => ({ w, s: EWF.getState(w.key) })).filter((x) => x.s && x.s.wrong > 0)
        .sort((a, b) => b.s.wrong - a.s.wrong).slice(0, 20).map((x) => x.w);
      title = "Từ hay sai"; back = "#/review";
    } else {
      const d = findDeck(deckId), l = findLesson(d, lessonId);
      if (!l) { location.hash = "#/"; return; }
      words = l.words; title = `Bài ${l.id} · ${l.title}`; back = `#/lesson/${d.id}/${l.id}`;
    }
    runSession(mode, words, title, back);
  }

  // --- Đáp án nhiễu & câu hỏi cố định (dùng chung cho buổi học và đề thách đấu) ---
  const canAsk = (mode, w) => (!MODES[mode].needVi || w.vi) && (!MODES[mode].needCloze || clozeOf(w));
  function answerOf(mode, w) {
    if (mode === "envi") return w.vi;
    if (mode === "cloze") { const c = clozeOf(w); return c ? c.answer : w.word; }
    return w.word;
  }
  function choiceOptions(mode, w, pool) {
    const right = answerOf(mode, w);
    const seen = new Set([fold(right)]);
    const deck = findDeck(w.deckId);
    const out = [];
    for (const x of [...shuffle(pool.filter((p) => p.key !== w.key)), ...shuffle(deck ? deck.lessons.flatMap((l) => l.words) : [])]) {
      const k = answerOf(mode, x);
      if (!k || seen.has(fold(k))) continue;
      seen.add(fold(k)); out.push(k);
      if (out.length >= 3) break;
    }
    const o = shuffle([right, ...out]);
    return { o, a: o.indexOf(right) };
  }
  const snap = (w) => ({ key: w.key, deckId: w.deckId, lessonId: w.lessonId, word: w.word, pos: w.pos || "", vi: w.vi || "", def: w.def || "", example: w.example || "", family: w.family || "" });
  /** Tạo đề cố định: mỗi câu gồm kiểu câu, ảnh chụp từ và các lựa chọn theo đúng thứ tự — hai người làm sẽ thấy y hệt nhau. */
  function buildQuestions(words, modes, n) {
    const list = shuffle(words.filter((w) => modes.some((m) => canAsk(m, w)))).slice(0, n);
    const order = shuffle(modes);
    return list.map((w, i) => {
      let m = order[i % order.length];
      for (let k = 0; !canAsk(m, w) && k < order.length; k++) m = order[(i + k) % order.length];
      const q = { m, w: snap(w) };
      if (m !== "spell") Object.assign(q, choiceOptions(m, w, list));
      return q;
    });
  }

  /**
   * Một phiên học. opts.questions: đề cố định (thách đấu / test tuần), mỗi câu có kiểu riêng;
   * opts.onFinish({ score, total, answers, duration }) thay cho màn hình kết quả mặc định.
   */
  function runSession(mode, words, title, back, opts = {}) {
    const fixed = Array.isArray(opts.questions);
    let pool = fixed ? opts.questions.map((q) => q.w) : words.filter((w) => canAsk(mode, w));
    if (!pool.length) {
      const m = MODES[mode];
      app.innerHTML = `<div class="card empty"><h2>Không có từ phù hợp</h2><p class="muted">${m.needCloze ? "Các từ này chưa có câu ví dụ chứa đúng từ đó." : m.needVi ? "Các từ này chưa có nghĩa tiếng Việt." : "Danh sách trống."}</p><a class="btn" href="${back}">Quay lại</a></div>`;
      return;
    }
    const size = EWF.settings().quizSize;
    const queue = fixed ? opts.questions.slice()
      : (mode === "flash" ? shuffle(pool) : shuffle(pool).slice(0, Math.max(4, size || pool.length))).map((w) => ({ m: mode, w }));
    const total = queue.length;
    const results = new Map(); // key -> đúng/sai lần đầu
    const answers = [];
    const started = Date.now();
    let idx = 0;
    const requeued = new Set();

    const header = (q) => `<div class="study-top">
        <a class="icon-btn" href="${back}" title="Thoát">${I.x}</a>
        <div class="bar"><i style="width:${(Math.min(results.size, total) / total) * 100}%"></i></div>
        <span class="count">${Math.min(results.size + 1, total)}/${total}</span>
      </div>
      <p class="eyebrow" style="text-align:center;margin:-6px 0 14px">${esc(title)} · ${MODES[q.m].name}</p>`;

    function record(w, g, given) {
      if (EWF.wordByKey(w.key)) EWF.grade(w.key, g); // từ của bộ mà máy này không có thì chỉ tính điểm
      if (!results.has(w.key)) {
        results.set(w.key, { w, ok: g > 0 });
        answers.push({ k: w.key, ok: g > 0, given: given ?? null });
      }
    }

    function next() {
      idx++;
      if (idx >= queue.length) return finish();
      render();
    }

    function finish() {
      if (cleanup) { cleanup(); cleanup = null; }
      updateBadge();
      const list = [...results.values()];
      const ok = list.filter((r) => r.ok).length;
      if (opts.onFinish) return opts.onFinish({ score: ok, total: list.length, answers, duration: Date.now() - started });
      const wrong = list.filter((r) => !r.ok).map((r) => r.w);
      const pct = Math.round((ok / Math.max(1, list.length)) * 100);
      const m = MODES[mode];
      if (EWF.sync) EWF.sync.logActivity("session", { title, mode, ok, total: list.length });
      app.innerHTML = `<div class="study"><div class="card result">
        <p class="eyebrow">${esc(title)} · ${m.name}</p>
        <div class="score">${mode === "flash" ? ok : `${ok}/${list.length}`}</div>
        <p class="muted">${mode === "flash" ? `từ nhớ được trên ${list.length} thẻ` : `câu đúng (${pct}%)`}${pct === 100 ? " — xuất sắc!" : pct >= 80 ? " — rất tốt!" : pct >= 50 ? " — cố thêm chút nữa!" : " — đừng lo, ôn lại là nhớ thôi."}</p>
        <div class="row" style="justify-content:center;margin-top:16px">
          ${wrong.length ? `<button class="btn primary" id="redo-wrong">Học lại ${wrong.length} từ chưa nhớ</button>` : ""}
          <button class="btn" id="redo">Làm lại</button>
          <a class="btn" href="${back}">Xong</a>
        </div>
        ${wrongList(wrong)}
      </div></div>`;
      const rw = $("#redo-wrong");
      if (rw) rw.onclick = () => runSession(mode, wrong, title, back);
      $("#redo").onclick = () => runSession(mode, words, title, back);
    }

    function render() {
      const q = queue[idx];
      if (q.m === "flash") renderFlash(q);
      else if (q.m === "spell") renderSpell(q);
      else renderChoice(q);
    }

    // --- Thẻ ghi nhớ ---
    function renderFlash(q) {
      const w = q.w;
      app.innerHTML = `<div class="study">${header(q)}
        <div class="flash" id="flash"><div class="flash-inner">
          <div class="card face front">
            <span class="speak-corner">${speakBtn(w.word)}</span>
            <div class="big">${esc(w.word)}</div>${w.pos ? `<div class="pos">${esc(w.pos)}</div>` : ""}
            <div class="hint">Nhấn vào thẻ hoặc phím <span class="kbd">Space</span> để lật</div>
          </div>
          <div class="card face back">
            <span class="speak-corner">${speakBtn(w.word)}</span>
            <div class="pos">${esc(w.word)}${w.pos ? ` · ${esc(w.pos)}` : ""}</div>
            <div class="vi-big">${esc(w.vi || "—")}</div>
            ${w.def ? `<div class="def">${esc(w.def)}</div>` : ""}
            ${w.example ? `<div class="ex">“${esc(w.example)}”</div>` : ""}
            ${w.family ? `<div class="fam">Họ từ: ${esc(w.family)}</div>` : ""}
          </div>
        </div></div>
        <div class="grades" id="grades" style="visibility:hidden">
          <button class="btn g0" data-g="0">Quên <small><span class="kbd">1</span> gặp lại ngay</small></button>
          <button class="btn g1" data-g="1">Khó <small><span class="kbd">2</span> 1 ngày</small></button>
          <button class="btn g2" data-g="2">Nhớ <small><span class="kbd">3</span> lâu hơn</small></button>
          <button class="btn g3" data-g="3">Dễ <small><span class="kbd">4</span> rất lâu</small></button>
        </div>
        <p class="muted small" style="text-align:center;margin-top:14px">Phím tắt: <span class="kbd">S</span> nghe lại · <span class="kbd">1</span>–<span class="kbd">4</span> chấm điểm</p>
      </div>`;
      const card = $("#flash");
      let flipped = false;
      const flip = () => {
        flipped = !flipped;
        card.classList.toggle("flipped", flipped);
        if (flipped) $("#grades").style.visibility = "visible";
      };
      card.addEventListener("click", flip);
      const doGrade = (g) => {
        if (!flipped) return;
        record(w, g);
        if (g === 0 && !fixed && !requeued.has(w.key)) { requeued.add(w.key); queue.push(q); }
        next();
      };
      $$("#grades [data-g]").forEach((b) => (b.onclick = () => doGrade(+b.dataset.g)));
      if (EWF.settings().autoSpeak) speak(w.word);
      onKey((e) => {
        if (e.key === " " || e.key === "Enter") { e.preventDefault(); flip(); }
        else if (/^[1-4]$/.test(e.key)) doGrade(+e.key - 1);
        else if (e.key.toLowerCase() === "s") speak(w.word);
      });
    }

    // --- Trắc nghiệm (Anh→Việt, Việt→Anh, Nghe, Điền câu) ---
    function renderChoice(q) {
      const w = q.w, qm = q.m;
      let prompt, label;
      if (qm === "envi") {
        label = "Nghĩa của từ này là gì?";
        prompt = `<div class="prompt">${esc(w.word)} ${speakBtn(w.word)}</div>${w.pos ? `<div class="sub"><i>${esc(w.pos)}</i></div>` : ""}`;
      } else if (qm === "vien") {
        label = "Từ tiếng Anh nào có nghĩa này?";
        prompt = `<div class="prompt vi">${esc(w.vi)}</div>${w.pos ? `<div class="sub"><i>${esc(w.pos)}</i></div>` : ""}`;
      } else if (qm === "listen") {
        label = "Nghe và chọn từ bạn nghe được";
        prompt = `<button class="listen-btn" data-speak="${esc(w.word)}" title="Nghe lại (S)">${I.speaker}</button><div class="sub small">Nhấn để nghe lại · phím <span class="kbd">S</span></div>`;
      } else {
        const c = clozeOf(w) || { before: "", after: "", answer: w.word };
        label = "Chọn từ phù hợp để điền vào chỗ trống";
        prompt = `<div class="sentence">${esc(c.before)}<span class="blank">&nbsp;</span>${esc(c.after)}</div>${w.vi ? `<div class="sub small">Gợi ý nghĩa: ${esc(w.vi)}</div>` : ""}`;
      }
      const { o: opts, a: ans } = q.o ? q : choiceOptions(qm, w, pool);
      const showFn = (s) => (qm === "envi" ? esc(s) : `<span class="en">${esc(s)}</span>`);

      app.innerHTML = `<div class="study">${header(q)}
        <div class="card q-card"><div class="prompt-lbl">${label}</div>${prompt}</div>
        <div class="choices">${opts.map((o, i) => `<button class="choice" data-i="${i}"><span class="k">${i + 1}</span><span>${showFn(o)}</span></button>`).join("")}</div>
        <div id="fb"></div>
      </div>`;
      if ((qm === "listen" || (qm === "envi" && EWF.settings().autoSpeak))) speak(w.word);

      let answered = false;
      const choose = (i) => {
        if (answered || opts[i] === undefined) return;
        answered = true;
        const ok = i === ans;
        $$(".choice").forEach((b, k) => {
          b.disabled = true;
          if (k === ans) b.classList.add("correct");
          else if (k === i) b.classList.add("wrong");
        });
        record(w, ok ? 2 : 0, i);
        if (qm === "cloze" || qm === "vien" || qm === "listen") speak(qm === "cloze" ? w.example : w.word);
        feedback(w, ok);
      };
      $$(".choice").forEach((b) => (b.onclick = () => choose(+b.dataset.i)));
      onKey((e) => {
        if (/^[1-4]$/.test(e.key)) choose(+e.key - 1);
        else if (e.key.toLowerCase() === "s" && qm !== "vien") speak(w.word);
        else if ((e.key === "Enter" || e.key === " ") && answered) { e.preventDefault(); next(); }
      });
    }

    function feedback(w, ok) {
      const fb = $("#fb");
      fb.innerHTML = `<div class="feedback ${ok ? "ok" : "no"}">
        <div><div class="ans">${ok ? "Chính xác!" : "Chưa đúng —"} ${esc(w.word)} <span class="muted small">${esc(w.vi)}</span></div>
        ${w.example ? `<div class="ex">“${esc(w.example)}”</div>` : ""}</div>
        <div class="row">${speakBtn(w.word)}<button class="btn primary" id="next-btn">Tiếp <span class="kbd" style="color:inherit;border-color:currentColor">Enter</span></button></div>
      </div>`;
      $("#next-btn").onclick = next;
      if (ok) {
        const t = setTimeout(() => { if (document.body.contains(fb)) next(); }, 1300);
        const prev = cleanup;
        cleanup = () => { clearTimeout(t); prev && prev(); };
      }
    }

    // --- Chính tả ---
    function renderSpell(q) {
      const w = q.w;
      app.innerHTML = `<div class="study">${header(q)}
        <div class="card q-card">
          <div class="prompt-lbl">Nghe và gõ lại từ</div>
          <button class="listen-btn" data-speak="${esc(w.word)}" title="Nghe lại">${I.speaker}</button>
          <div class="prompt vi" style="margin-top:14px">${esc(w.vi || "")}</div>
          ${w.pos ? `<div class="sub"><i>${esc(w.pos)}</i></div>` : ""}
          <div class="sub small" id="hint"></div>
        </div>
        <form class="type-row" id="spell-form" autocomplete="off">
          <input id="spell-in" type="text" placeholder="Gõ từ bạn nghe được…" autocapitalize="off" spellcheck="false">
          <button class="btn" type="button" id="hint-btn">Gợi ý</button>
          <button class="btn primary" type="submit">Kiểm tra</button>
        </form>
        <div id="fb"></div>
      </div>`;
      speak(w.word);
      const inp = $("#spell-in");
      inp.focus();
      let hints = 0, answered = false;
      $("#hint-btn").onclick = () => {
        hints = Math.min(w.word.length, hints + 1);
        $("#hint").textContent = "Gợi ý: " + w.word.slice(0, hints) + w.word.slice(hints).replace(/[a-z]/gi, "_");
        inp.focus();
      };
      $("#spell-form").onsubmit = (e) => {
        e.preventDefault();
        if (answered) return next();
        if (!inp.value.trim()) return;
        answered = true;
        const ok = normAnswer(inp.value) === normAnswer(w.word);
        inp.classList.add(ok ? "ok" : "no");
        inp.readOnly = true;
        record(w, ok ? (hints ? 1 : 2) : 0, inp.value.trim());
        feedback(w, ok);
      };
      onKey((e) => {
        if (answered && (e.key === "Enter")) { e.preventDefault(); next(); }
        else if (e.key === "Escape") speak(w.word);
      });
    }

    render();
  }
  const wrongList = (wrong) => wrong.length ? `<div class="wrong-list"><p class="eyebrow">Cần chú ý</p><ul>${wrong.map((w) => `<li class="row" style="justify-content:space-between"><span><b>${esc(w.word)}</b> <span class="muted">— ${esc(w.vi)}</span></span>${speakBtn(w.word)}</li>`).join("")}</ul></div>` : "";

  // ---------- Tra từ ----------
  function searchPage() {
    app.innerHTML = `
      <div class="page-head"><div><h1>Tra từ</h1><p class="muted">Tìm theo tiếng Anh hoặc tiếng Việt (gõ không dấu cũng được).</p></div></div>
      <input class="search-input" id="q" type="search" placeholder="Ví dụ: contract, hợp đồng, hop dong…" autofocus>
      <p class="muted small" id="count" style="margin:10px 2px"></p>
      <div class="card word-list" id="results" hidden></div>`;
    const words = allWords();
    const index = words.map((w) => ({ w, en: w.word.toLowerCase(), vi: fold(w.vi), all: fold(`${w.word} ${w.vi} ${w.family}`) }));
    const q = $("#q");
    const run = () => {
      const t = fold(q.value.trim());
      const res = $("#results");
      if (!t) { res.hidden = true; $("#count").textContent = `${words.length} từ trong ${EWF.decks.length} bộ.`; return; }
      const hits = index.filter((x) => x.all.includes(t))
        .sort((a, b) => (b.en === t) - (a.en === t) || (b.en.startsWith(t)) - (a.en.startsWith(t)) || a.en.localeCompare(b.en))
        .slice(0, 60);
      $("#count").textContent = hits.length ? `${hits.length}${hits.length === 60 ? "+" : ""} kết quả` : "Không tìm thấy.";
      res.hidden = !hits.length;
      res.innerHTML = hits.map((x) => {
        const d = findDeck(x.w.deckId), l = findLesson(d, x.w.lessonId);
        return wordRow(x.w, `<div class="fam"><a href="#/lesson/${esc(d.id)}/${esc(l.id)}">${esc(d.name)} · Bài ${esc(l.id)} ${esc(l.title)}</a></div>`);
      }).join("");
    };
    q.addEventListener("input", run);
    run();
  }

  // ---------- Nhập dữ liệu ----------
  function parseDelimited(text) {
    text = text.replace(/^﻿/, "");
    const first = text.split(/\r?\n/)[0] || "";
    const delim = first.includes("\t") ? "\t" : first.includes(",") ? "," : first.includes(";") ? ";" : null;
    if (!delim) {
      // Mỗi dòng dạng "word - nghĩa" hoặc "word: nghĩa" hoặc "word = nghĩa"
      return text.split(/\r?\n/).map((line) => line.trim()).filter(Boolean).map((line) => {
        const m = line.match(/^(.+?)\s*(?:\s-\s|:|=|–|—)\s*(.+)$/);
        return m ? [m[1], m[2]] : [line];
      });
    }
    const rows = []; let row = [], cell = "", q = false;
    for (let i = 0; i < text.length; i++) {
      const c = text[i];
      if (q) {
        if (c === '"') { if (text[i + 1] === '"') { cell += '"'; i++; } else q = false; }
        else cell += c;
      } else if (c === '"' && cell === "") q = true;
      else if (c === delim) { row.push(cell); cell = ""; }
      else if (c === "\n" || c === "\r") {
        if (c === "\r" && text[i + 1] === "\n") i++;
        row.push(cell); rows.push(row); row = []; cell = "";
      } else cell += c;
    }
    if (cell || row.length) { row.push(cell); rows.push(row); }
    return rows.filter((r) => r.some((x) => x.trim()));
  }
  const HEADER_ALIASES = {
    word: ["word", "từ", "tu", "từ vựng", "tu vung", "english", "term", "vocabulary"],
    vi: ["vi", "nghĩa", "nghia", "meaning", "vietnamese", "tiếng việt", "dịch", "nghĩa tiếng việt"],
    pos: ["pos", "loại", "loai", "loại từ", "type", "part of speech"],
    def: ["def", "definition", "định nghĩa", "dinh nghia", "english definition"],
    example: ["example", "ví dụ", "vi du", "câu ví dụ", "sentence"],
    family: ["family", "họ từ", "ho tu", "word family", "related"],
    lesson: ["lesson", "bài", "bai", "topic", "chủ đề", "chu de", "unit"],
  };
  function rowsToDeck(rows, name) {
    let header = null;
    const h0 = rows[0].map((x) => x.trim().toLowerCase());
    const map = {};
    for (const [field, names] of Object.entries(HEADER_ALIASES)) {
      const i = h0.findIndex((x) => names.includes(x));
      if (i >= 0) map[field] = i;
    }
    if (map.word !== undefined) { header = h0; rows = rows.slice(1); }
    else { map.word = 0; map.vi = 1; map.example = 2; }
    const lessons = new Map();
    rows.forEach((r, n) => {
      const get = (f) => (map[f] !== undefined ? String(r[map[f]] ?? "").trim() : "");
      const word = get("word");
      if (!word) return;
      const lessonKey = get("lesson") || String(Math.floor(n / 12) + 1);
      if (!lessons.has(lessonKey)) lessons.set(lessonKey, []);
      lessons.get(lessonKey).push({ word, pos: get("pos"), vi: get("vi"), def: get("def"), example: get("example"), family: get("family") });
    });
    const id = "imp-" + fold(name).replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "") + "-" + Date.now().toString(36);
    return {
      id, name, description: `Nhập ngày ${new Date().toLocaleDateString("vi-VN")}`,
      lessons: [...lessons.entries()].map(([k, words], i) => ({
        id: /^\d+$/.test(k) ? +k : i + 1, title: /^\d+$/.test(k) ? `Bài ${k}` : k, titleVi: "", words,
      })),
      _header: !!header,
    };
  }
  function parseImport(text, name) {
    const t = text.trim();
    if (t.startsWith("{") || t.startsWith("[")) {
      const data = JSON.parse(t);
      if (Array.isArray(data)) return { id: "imp-" + Date.now().toString(36), name, description: "", lessons: [{ id: 1, title: name, titleVi: "", words: data }] };
      if (data.lessons) return { ...data, id: data.id || "imp-" + Date.now().toString(36), name: data.name || name };
      throw new Error("JSON cần có dạng mảng từ hoặc { name, lessons: [...] }");
    }
    return rowsToDeck(parseDelimited(text), name);
  }

  function importPage() {
    const custom = EWF.decks.filter((d) => d.source === "import");
    app.innerHTML = `
      <div class="page-head"><div><h1>Nhập dữ liệu</h1><p class="muted">Thêm bộ từ của riêng bạn từ file CSV/Excel, JSON, hoặc dán trực tiếp.</p></div></div>
      <div class="card panel">
        <div class="field"><label for="deck-name">Tên bộ từ</label><input type="text" id="deck-name" placeholder="Ví dụ: Từ vựng Hackers Reading"></div>
        <div class="field"><label for="file">Chọn file (.csv, .tsv, .txt, .json)</label><input type="file" id="file" accept=".csv,.tsv,.txt,.json"></div>
        <div class="field"><label for="paste">…hoặc dán nội dung vào đây</label>
          <textarea id="paste" placeholder="lesson,word,pos,vi,def,example,family&#10;1,abide by,v,tuân theo,to comply with,You must abide by the rules.,&#10;&#10;Hoặc đơn giản mỗi dòng: word - nghĩa&#10;deadline - hạn chót"></textarea></div>
        <div class="row"><button class="btn" id="preview-btn">Xem trước</button><button class="btn primary" id="save-btn" disabled>Lưu bộ từ</button></div>
        <div id="preview" class="small" style="margin-top:14px"></div>
      </div>
      <div class="card panel">
        <h3>Định dạng được hỗ trợ</h3>
        <p class="muted small">Dễ nhất: soạn trong Excel/Google Sheets với hàng tiêu đề bên dưới rồi <b>copy cả bảng dán vào ô trên</b>, hoặc lưu thành CSV (UTF-8). File mẫu: <code>app/data/mau-nhap.csv</code>.</p>
        <pre>lesson,word,pos,vi,def,example,family
1,abide by,v,tuân theo,to comply with,You must abide by the rules.,
1,cancel,v,hủy bỏ,to call off,The meeting was cancelled.,cancellation (n)</pre>
        <p class="muted small">Chỉ cột <b>word</b> là bắt buộc. Tiêu đề có thể viết tiếng Việt: <i>từ, nghĩa, loại từ, định nghĩa, ví dụ, họ từ, bài</i>. Không có cột bài thì tự chia 12 từ/bài. Không có hàng tiêu đề thì hiểu là: cột 1 = từ, cột 2 = nghĩa, cột 3 = ví dụ.</p>
        <p class="muted small">Muốn bộ từ được lưu thành file cố định (không mất khi xóa dữ liệu trình duyệt): tạo file <code>.js</code> trong <code>app/data/</code> theo mẫu <code>mau-bo-tu.js</code> và thêm tên file vào <code>data/manifest.js</code>.</p>
      </div>
      ${custom.length ? `<section class="section"><h2>Bộ từ đã nhập</h2><div class="card word-list">${custom.map((d) => `
        <div class="word-row" style="grid-template-columns:1fr auto"><div><b>${esc(d.name)}</b><div class="def">${d.lessons.length} bài · ${d.lessons.reduce((a, l) => a + l.words.length, 0)} từ · ${esc(d.description)}</div></div>
        <button class="btn sm danger" data-del="${esc(d.id)}">Xóa</button></div>`).join("")}</div></section>` : ""}
    `;
    let parsed = null;
    const file = $("#file"), paste = $("#paste"), nameIn = $("#deck-name"), pv = $("#preview"), save = $("#save-btn");
    file.onchange = () => {
      const f = file.files[0];
      if (!f) return;
      if (!nameIn.value) nameIn.value = f.name.replace(/\.[^.]+$/, "");
      const r = new FileReader();
      r.onload = () => { paste.value = r.result; doPreview(); };
      r.readAsText(f, "utf-8");
    };
    const doPreview = () => {
      parsed = null; save.disabled = true;
      const text = paste.value;
      if (!text.trim()) { pv.innerHTML = `<span class="muted">Chưa có nội dung.</span>`; return; }
      try {
        const deck = parseImport(text, nameIn.value.trim() || "Bộ từ mới");
        const n = deck.lessons.reduce((a, l) => a + (l.words || []).length, 0);
        if (!n) throw new Error("Không đọc được từ nào. Kiểm tra lại định dạng.");
        const sample = deck.lessons[0].words.slice(0, 5);
        pv.innerHTML = `<p><b>${n} từ</b> trong <b>${deck.lessons.length} bài</b>. Ví dụ:</p>
          <ul>${sample.map((w) => `<li><b>${esc(w.word ?? w[0])}</b> — ${esc(w.vi ?? w[2] ?? "")} ${w.example ? `<i class="muted">“${esc(w.example)}”</i>` : ""}</li>`).join("")}</ul>`;
        parsed = deck; save.disabled = false;
      } catch (err) {
        pv.innerHTML = `<span style="color:var(--bad)">Lỗi: ${esc(err.message)}</span>`;
      }
    };
    $("#preview-btn").onclick = doPreview;
    paste.addEventListener("input", () => { save.disabled = true; });
    save.onclick = () => {
      if (!parsed) return;
      if (nameIn.value.trim()) parsed.name = nameIn.value.trim();
      delete parsed._header;
      EWF.saveCustomDeck(parsed);
      toast(`Đã lưu “${parsed.name}”`);
      location.hash = "#/";
    };
    $$("[data-del]").forEach((b) => (b.onclick = () => {
      if (b.dataset.confirm !== "1") { b.dataset.confirm = "1"; b.textContent = "Chắc chắn xóa?"; return; }
      EWF.removeCustomDeck(b.dataset.del); toast("Đã xóa bộ từ"); importPage();
    }));
  }

  // ---------- Cài đặt ----------
  function settingsPage() {
    const s = EWF.settings();
    const vs = voices.length ? voices : [];
    app.innerHTML = `
      <div class="page-head"><div><h1>Cài đặt</h1></div></div>
      <div class="card panel">
        <h3 style="margin-bottom:12px">Phát âm</h3>
        <div class="field"><label for="voice">Giọng đọc</label>
          <select id="voice"><option value="">Tự động (ưu tiên giọng Mỹ)</option>${vs.map((v) => `<option value="${esc(v.name)}" ${v.name === s.voice ? "selected" : ""}>${esc(v.name)} (${esc(v.lang)})</option>`).join("")}</select>
          ${vs.length ? "" : `<span class="muted small">Chưa tìm thấy giọng tiếng Anh. Trên Windows: Settings → Time &amp; Language → Speech → Add voices → English (United States).</span>`}
        </div>
        <div class="field"><label for="rate">Tốc độ đọc: <span id="rate-v">${s.rate}</span>×</label><input type="range" id="rate" min="0.5" max="1.3" step="0.05" value="${s.rate}"></div>
        <label class="toggle"><input type="checkbox" id="auto" ${s.autoSpeak ? "checked" : ""}> Tự động đọc từ khi hiện thẻ / câu hỏi</label>
        <div class="row" style="margin-top:12px"><button class="btn" data-speak="The contract obligates us to pay within thirty days.">Nghe thử</button></div>
      </div>
      <div class="card panel">
        <h3 style="margin-bottom:12px">Bài kiểm tra</h3>
        <div class="field"><label for="qsize">Số câu mỗi lượt trắc nghiệm</label><input type="number" id="qsize" min="4" max="100" value="${s.quizSize}"></div>
      </div>
      <div class="card panel">
        <h3 style="margin-bottom:6px">Sao lưu tiến độ</h3>
        <p class="muted small">Tiến độ học được lưu trong trình duyệt này. Hãy xuất file sao lưu nếu muốn chuyển sang máy/trình duyệt khác.</p>
        <div class="row"><button class="btn" id="export">Xuất file tiến độ</button>
          <label class="btn">Nhập file tiến độ<input type="file" id="import-prog" accept=".json" hidden></label>
          <button class="btn danger" id="reset">Xóa toàn bộ tiến độ</button></div>
      </div>`;
    const save = (patch) => EWF.saveSettings({ ...EWF.settings(), ...patch });
    $("#voice").onchange = (e) => { save({ voice: e.target.value }); speak("Hello, nice to meet you."); };
    $("#rate").oninput = (e) => { $("#rate-v").textContent = e.target.value; save({ rate: +e.target.value }); };
    $("#auto").onchange = (e) => save({ autoSpeak: e.target.checked });
    $("#qsize").onchange = (e) => save({ quizSize: Math.max(4, Math.min(100, +e.target.value || 12)) });
    $("#export").onclick = () => {
      const blob = new Blob([JSON.stringify(EWF.exportProgress(), null, 1)], { type: "application/json" });
      const a = document.createElement("a");
      a.href = URL.createObjectURL(blob); a.download = `tien-do-hoc-${EWF.today()}.json`; a.click();
      setTimeout(() => URL.revokeObjectURL(a.href), 1000);
    };
    $("#import-prog").onchange = (e) => {
      const f = e.target.files[0]; if (!f) return;
      const r = new FileReader();
      r.onload = () => { try { EWF.importProgress(JSON.parse(r.result)); toast("Đã nhập tiến độ"); updateBadge(); } catch (err) { toast("Lỗi: " + err.message); } };
      r.readAsText(f);
    };
    $("#reset").onclick = (e) => {
      const b = e.currentTarget;
      if (b.dataset.confirm !== "1") { b.dataset.confirm = "1"; b.textContent = "Bấm lần nữa để xóa hẳn"; return; }
      EWF.resetProgress(); toast("Đã xóa tiến độ"); settingsPage(); updateBadge();
    };
    if (!vs.length && "speechSynthesis" in window) setTimeout(() => { loadVoices(); if (voices.length && location.hash === "#/settings") settingsPage(); }, 500);
  }

  // ---------- Dùng chung cho social.js ----------
  EWF.ui = {
    $, $$, esc, I, MODES, app, toast, shuffle, fold, normAnswer, speak, speakBtn, clozeOf, stemPattern,
    findDeck, findLesson, allWords, dueWords, stats, bar, wordRow, wrongList, updateBadge, onKey,
    runSession, buildQuestions, route,
    addRoute: (re, fn) => routes.push([re, fn]),
    navAlias: (map) => Object.assign(NAV_OF, map), // { "challenge": "friends" } — trang con tô sáng mục menu nào
    afterRoute: (fn) => afterRoute.push(fn),
    setCleanup(fn) { if (cleanup) cleanup(); cleanup = fn; },
  };

  // ---------- Khởi động ----------
  EWF.loadFiles(window.EWF_DATA_FILES || [], (failed) => {
    EWF.loadCustomDecks();
    window.addEventListener("hashchange", route);
    route();
    if (failed.length) toast("Không nạp được: " + failed.join(", "));
    if (EWF.sync) EWF.sync.start();
  });
})();
