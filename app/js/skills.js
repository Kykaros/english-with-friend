/* Giai đoạn 2 — luyện 4 kỹ năng theo từng bài: Đọc, Nghe, Nói, Viết; gửi bài nói/viết cho bạn cùng phòng chấm.
   Nội dung từng bài nằm trong data/*-skills-*.js (EWF.addSkills). Bài nào không có dữ liệu thì không hiện phần này. */
(function () {
  const { $, $$, esc, I, app, toast, addRoute, navAlias, afterRoute, speak, speakBtn, speakLines, findDeck, findLesson, setCleanup } = EWF.ui;
  const sync = EWF.sync;
  const S = sync ? sync.state : {};

  const KINDS = {
    read:   { name: "Đọc", icon: "📖", desc: "Đoạn văn kiểu TOEIC Part 7" },
    listen: { name: "Nghe", icon: "🎧", desc: "Hội thoại + chép chính tả" },
    speak:  { name: "Nói", icon: "🗣️", desc: "Đọc theo, trả lời câu hỏi" },
    write:  { name: "Viết", icon: "✍️", desc: "Đặt câu, viết email ngắn" },
  };
  const LETTERS = "ABCD";
  const SR = window.SpeechRecognition || window.webkitSpeechRecognition;
  const canRecord = !!(navigator.mediaDevices && navigator.mediaDevices.getUserMedia && window.MediaRecorder);
  const inRoom = () => !!(sync && sync.enabled && S.user && S.room);
  const LS = {
    get(k, f) { try { const v = localStorage.getItem(k); return v == null ? f : JSON.parse(v); } catch { return f; } },
    set(k, v) { try { localStorage.setItem(k, JSON.stringify(v)); } catch { /* bỏ qua */ } },
  };

  // Việc cần dừng khi rời trang (micro, máy đọc, ghi âm).
  let stops = [];
  const onLeave = (fn) => stops.push(fn);
  function resetLeave() {
    stops = [];
    setCleanup(() => { stops.forEach((f) => { try { f(); } catch { /* bỏ qua */ } }); stops = []; closePop(); });
  }

  // ---------- So khớp từ ----------
  /** Mẫu regex khớp từ và các dạng chia thường gặp (agree → agrees, agreed, agreeing). */
  // Động từ bất quy tắc hay gặp trong các bài (hold → held, sell out → sold out…).
  const IRREGULAR = {
    be: ["is", "am", "are", "was", "were", "been", "being"], hold: ["held"], bear: ["bore", "borne"], draw: ["drew", "drawn"],
    sell: ["sold"], take: ["took", "taken"], bring: ["brought"], come: ["came"], give: ["gave", "given"], get: ["got", "gotten"],
    keep: ["kept"], run: ["ran"], forget: ["forgot", "forgotten"], choose: ["chose", "chosen"], throw: ["threw", "thrown"],
    fall: ["fell", "fallen"], catch: ["caught"], build: ["built"], pay: ["paid"], make: ["made"], lead: ["led"], buy: ["bought"],
    set: ["set"], shut: ["shut"], put: ["put"], cut: ["cut"], go: ["went", "gone"], see: ["saw", "seen"], write: ["wrote", "written"],
    think: ["thought"], find: ["found"], meet: ["met"], leave: ["left"], begin: ["began", "begun"], rise: ["rose", "risen"],
  };
  function formsPattern(token) {
    const t = token.toLowerCase().replace(/[^a-z'-]/g, "");
    if (!t) return null;
    const e = (x) => x.replace(/-/g, "\\-");
    let p;
    if (/[^aeiou]y$/.test(t)) p = e(t.slice(0, -1)) + "(?:y|ies|ied|ying)";
    else if (/e$/.test(t)) p = e(t.slice(0, -1)) + "(?:e|es|ed|ing|er|ers)";
    else { const last = t.slice(-1); p = e(t) + `(?:s|es|${last}?ed|${last}?ing|${last}?ers?)?`; }
    return IRREGULAR[t] ? `(?:${p}|${IRREGULAR[t].join("|")})` : p;
  }
  function phrasePattern(phrase) {
    const toks = phrase.split(/\s+/).filter(Boolean);
    return toks.map((t, i) => (i === 0 || i === toks.length - 1 ? formsPattern(t) : t.toLowerCase().replace(/[^a-z'-]/g, ""))).join("\\s+");
  }
  /** Từ chính và họ từ (cột family), ví dụ "agreement" chấp nhận cả "agree", "agreeable". */
  function wordRegex(w, withFamily) {
    const list = [w.word, ...(withFamily ? String(w.family || "").split(/[,;]/).map((x) => x.replace(/\(.*?\)/g, "").trim()).filter(Boolean) : [])];
    return new RegExp(`\\b(?:${list.map(phrasePattern).filter(Boolean).join("|")})\\b`, "gi");
  }
  function highlight(text, lesson) {
    const ranges = [];
    for (const w of lesson.words) {
      const re = wordRegex(w, false);
      let m;
      while ((m = re.exec(text))) ranges.push([m.index, m.index + m[0].length, w]);
    }
    ranges.sort((a, b) => a[0] - b[0] || b[1] - a[1]);
    let out = "", pos = 0;
    for (const [s, e, w] of ranges) {
      if (s < pos) continue;
      out += esc(text.slice(pos, s)) + `<button class="kw" data-key="${esc(w.key)}">${esc(text.slice(s, e))}</button>`;
      pos = e;
    }
    return out + esc(text.slice(pos));
  }
  const normTok = (s) => s.toLowerCase().replace(/[’‘]/g, "'").replace(/[^a-z0-9'$%]/g, "");
  const tokens = (s) => String(s || "").split(/[\s—–-]+/).map(normTok).filter(Boolean);
  /** So từng từ (LCS): từ nào của câu gốc có trong câu của người học. */
  function diffWords(target, said) {
    const T = String(target).split(/\s+/).filter(Boolean);
    const t = T.map(normTok), a = tokens(said);
    const n = t.length, m = a.length;
    const dp = Array.from({ length: n + 1 }, () => new Array(m + 1).fill(0));
    for (let i = n - 1; i >= 0; i--) for (let j = m - 1; j >= 0; j--) dp[i][j] = t[i] && t[i] === a[j] ? dp[i + 1][j + 1] + 1 : Math.max(dp[i + 1][j], dp[i][j + 1]);
    const hit = new Array(n).fill(false);
    for (let i = 0, j = 0; i < n && j < m;) {
      if (t[i] && t[i] === a[j]) { hit[i] = true; i++; j++; } else if (dp[i + 1][j] >= dp[i][j + 1]) i++; else j++;
    }
    const counted = t.filter(Boolean).length;
    const ok = hit.filter(Boolean).length;
    return {
      html: T.map((w, k) => (t[k] ? `<span class="${hit[k] ? "w-ok" : "w-bad"}">${esc(w)}</span>` : esc(w))).join(" "),
      pct: Math.round((ok / Math.max(1, counted)) * 100),
    };
  }
  const wordCount = (s) => (String(s).match(/[A-Za-z0-9'’-]+/g) || []).length;

  // ---------- Khung trang ----------
  function load(deckId, lessonId, kind) {
    const deck = findDeck(deckId), lesson = findLesson(deck, lessonId);
    const data = lesson && EWF.skillsOf(deck.id, lesson.id);
    if (!data || !data[kind]) { location.hash = lesson ? `#/lesson/${deckId}/${lessonId}` : "#/"; return null; }
    resetLeave();
    return { deck, lesson, data, base: `${deck.id}/${lesson.id}` };
  }
  const skillId = (ctx, kind) => `${ctx.deck.id}|${ctx.lesson.id}|${kind}`;
  function bestPct(r) { return r ? Math.round((r.best ?? r.score / Math.max(1, r.total)) * 100) : null; }
  function head(ctx, kind, sub) {
    const l = ctx.lesson;
    return `<div class="row" style="justify-content:space-between;margin-bottom:10px">
        <a class="btn ghost sm" href="#/lesson/${esc(ctx.base)}">${I.back} Bài ${esc(l.id)} · ${esc(l.title)}</a>
      </div>
      <nav class="skill-tabs">${Object.entries(KINDS).filter(([k]) => ctx.data[k]).map(([k, v]) =>
        `<a href="#/${k}/${esc(ctx.base)}" class="${k === kind ? "active" : ""}">${v.icon} ${v.name}</a>`).join("")}</nav>
      <div class="page-head"><div><p class="eyebrow">${KINDS[kind].name} · Bài ${esc(l.id)} ${esc(l.titleVi ? "· " + l.titleVi : "")}</p><h1>${esc(sub)}</h1></div></div>`;
  }
  /** Lưu kết quả (giữ điểm cao nhất) và báo lên dòng hoạt động. */
  function saveResult(ctx, kind, score, total, extra = {}, log = true) {
    const id = skillId(ctx, kind);
    const prev = EWF.getSkill(id);
    const best = Math.max(score / Math.max(1, total), prev ? prev.best ?? prev.score / Math.max(1, prev.total) : 0);
    EWF.setSkill(id, { score, total, best, ...extra });
    if (log && sync) sync.logActivity("skill", { kind, title: `Bài ${ctx.lesson.id} · ${ctx.lesson.title}`, ok: score, total });
  }
  function nextKind(ctx, kind) {
    const ks = Object.keys(KINDS).filter((k) => ctx.data[k]);
    const k = ks[ks.indexOf(kind) + 1];
    return k ? `<a class="btn" href="#/${k}/${esc(ctx.base)}">Sang phần ${KINDS[k].name} ${I.next}</a>` : `<a class="btn" href="#/lesson/${esc(ctx.base)}">Về bài học</a>`;
  }

  // ---------- Trắc nghiệm có giải thích (dùng cho Đọc và Nghe) ----------
  /** Xáo thứ tự đáp án mỗi lần làm, để không ai đoán theo vị trí A/B/C/D. */
  function mixOptions(q) {
    const idx = EWF.ui.shuffle(q.o.map((_, i) => i));
    return { ...q, o: idx.map((i) => q.o[i]), a: idx.indexOf(q.a) };
  }
  function mcq(el, qs, onDone) {
    qs = qs.map(mixOptions);
    let answered = 0, score = 0;
    el.innerHTML = qs.map((q, n) => `<div class="card panel mcq" data-n="${n}">
        <p class="q-text"><b>${n + 1}.</b> ${esc(q.q)}</p>
        <div class="choices wide">${q.o.map((o, i) => `<button class="choice" data-i="${i}"><span class="k">${LETTERS[i]}</span><span>${esc(o)}</span></button>`).join("")}</div>
        <div class="why-box" hidden></div>
      </div>`).join("");
    $$(".mcq", el).forEach((card) => {
      const q = qs[+card.dataset.n];
      $$(".choice", card).forEach((b) => (b.onclick = () => {
        const i = +b.dataset.i, ok = i === q.a;
        $$(".choice", card).forEach((x, k) => {
          x.disabled = true;
          if (k === q.a) x.classList.add("correct"); else if (k === i) x.classList.add("wrong");
        });
        const box = $(".why-box", card);
        box.hidden = false;
        box.className = "why-box " + (ok ? "ok" : "no");
        box.innerHTML = `<b>${ok ? "✓ Chính xác." : `✗ Đáp án đúng: ${LETTERS[q.a]}.`}</b> ${esc(q.why || "")}`;
        answered++; if (ok) score++;
        if (answered === qs.length) onDone(score);
      }));
    });
  }
  function resultCard(ctx, kind, score, total, note = "") {
    const pct = Math.round((score / total) * 100);
    return `<div class="card result skill-result">
      <p class="eyebrow">${KINDS[kind].name} · Bài ${esc(ctx.lesson.id)}</p>
      <div class="score">${score}/${total}</div>
      <p class="muted">${pct === 100 ? "Xuất sắc!" : pct >= 75 ? "Rất tốt!" : pct >= 50 ? "Khá ổn, đọc lại phần giải thích nhé." : "Đọc kỹ phần giải thích rồi làm lại nhé."} ${note}</p>
      <div class="row" style="justify-content:center;margin-top:14px"><button class="btn" data-redo>Làm lại</button>${nextKind(ctx, kind)}</div>
    </div>`;
  }

  // ---------- Bảng nghĩa khi bấm vào từ được tô ----------
  function closePop() { const p = $("#kw-pop"); if (p) p.remove(); }
  document.addEventListener("click", (e) => {
    const b = e.target.closest(".kw");
    if (!b) { if (!e.target.closest("#kw-pop")) closePop(); return; }
    const w = EWF.wordByKey(b.dataset.key);
    if (!w) return;
    closePop();
    const r = b.getBoundingClientRect();
    const left = Math.max(8, Math.min(r.left, window.innerWidth - 296)) + window.scrollX;
    document.body.insertAdjacentHTML("beforeend", `<div id="kw-pop" class="card kw-pop" style="left:${left}px;top:${r.bottom + window.scrollY + 6}px">
      <div class="row" style="justify-content:space-between"><span><b class="w">${esc(w.word)}</b> <span class="pos">${esc(w.pos || "")}</span></span>${speakBtn(w.word)}</div>
      <div>${esc(w.vi || "")}</div>${w.def ? `<div class="muted small">${esc(w.def)}</div>` : ""}</div>`);
    speak(w.word);
  });

  // ================= ĐỌC =================
  function readPage(deckId, lessonId) {
    const ctx = load(deckId, lessonId, "read");
    if (!ctx) return;
    const R = ctx.data.read;
    app.innerHTML = `${head(ctx, "read", R.title)}
      <div class="skill-split">
        <article class="card panel passage-card">
          <p class="eyebrow">${esc(R.type || "")}</p>
          <div class="passage">${R.text.split(/\n\s*\n/).map((p) => `<p>${highlight(p.trim(), ctx.lesson).replace(/\n/g, "<br>")}</p>`).join("")}</div>
          <p class="muted small" style="margin-bottom:0">Bấm vào từ được tô để xem nghĩa và nghe phát âm.</p>
        </article>
        <section><div id="qs"></div><div id="done"></div></section>
      </div>`;
    mcq($("#qs"), R.q, (score) => {
      saveResult(ctx, "read", score, R.q.length);
      $("#done").innerHTML = resultCard(ctx, "read", score, R.q.length);
      $("#done [data-redo]").onclick = () => readPage(deckId, lessonId);
      $("#done").scrollIntoView({ behavior: "smooth", block: "nearest" });
    });
  }

  // ================= NGHE =================
  const SPEAKER = { M: "Nam", W: "Nữ" };
  function dictationLines(L) {
    if (L.dict) return L.dict.map((i) => L.lines[i]).filter(Boolean);
    const ok = L.lines.filter(([, t]) => { const n = wordCount(t); return n >= 5 && n <= 16; });
    return (ok.length >= 3 ? ok : L.lines).slice(0, 3);
  }
  function listenPage(deckId, lessonId) {
    const ctx = load(deckId, lessonId, "listen");
    if (!ctx) return;
    const L = ctx.data.listen;
    const rate0 = EWF.settings().rate;
    const dict = dictationLines(L);
    app.innerHTML = `${head(ctx, "listen", L.title)}
      <div class="card panel player">
        <div class="row">
          <button class="btn primary" id="ls-play">${I.speaker} Nghe</button>
          <button class="btn" id="ls-stop">Dừng</button>
          <label class="small row">Tốc độ <select id="ls-rate">
            ${[[0.7, "Chậm"], [0.85, "Vừa"], [1, "Bình thường"], [1.15, "Nhanh"]].map(([v, n]) => `<option value="${v}" ${Math.abs(v - rate0) < 0.08 ? "selected" : ""}>${n}</option>`).join("")}
          </select></label>
          <button class="btn ghost sm" id="ls-show" style="margin-left:auto">Hiện bản chữ</button>
        </div>
        <p class="muted small" style="margin:10px 0 0">${esc(L.intro || "Nghe đoạn hội thoại (có thể nghe nhiều lần) rồi trả lời câu hỏi. Bản chữ được ẩn cho tới khi bạn làm xong.")}</p>
        <div class="transcript" id="ls-tr" hidden>${L.lines.map(([who, t], i) => `<p data-line="${i}"><b>${SPEAKER[who] || who}:</b> ${highlight(t, ctx.lesson)}</p>`).join("")}</div>
      </div>
      <section class="section"><div id="qs"></div><div id="done"></div></section>
      <section class="section">
        <div class="deck-head"><div><h2>Chép chính tả</h2><p class="muted small" style="margin:4px 0 0">Nghe từng câu rồi gõ lại. Từ thiếu hoặc sai sẽ tô đỏ.</p></div></div>
        ${dict.map(([who, t], i) => `<div class="card panel dict" data-i="${i}">
          <div class="row"><button class="btn sm" data-play="${i}">${I.speaker} Nghe câu ${i + 1}</button><button class="btn sm ghost" data-slow="${i}">Nghe chậm</button><span class="muted small">${SPEAKER[who] || ""}</span></div>
          <form class="type-row" data-form="${i}" autocomplete="off"><input type="text" placeholder="Gõ câu bạn nghe được…" autocapitalize="off" spellcheck="false"><button class="btn primary" type="submit">Kiểm tra</button></form>
          <div class="dict-out"></div>
        </div>`).join("")}
      </section>`;

    let stop = null;
    const halt = () => { if (stop) stop(); stop = null; };
    onLeave(halt);
    const rate = () => +$("#ls-rate").value;
    const mark = (i) => $$("#ls-tr p").forEach((p) => p.classList.toggle("now", +p.dataset.line === i));
    $("#ls-play").onclick = () => { halt(); stop = speakLines(L.lines, { rate: rate(), onLine: mark }); };
    $("#ls-stop").onclick = halt;
    let finished = false;
    $("#ls-show").onclick = (e) => {
      const tr = $("#ls-tr");
      if (tr.hidden && !finished && e.currentTarget.dataset.confirm !== "1") {
        e.currentTarget.dataset.confirm = "1"; e.currentTarget.textContent = "Chưa làm xong — bấm lần nữa để xem"; return;
      }
      tr.hidden = !tr.hidden;
      e.currentTarget.textContent = tr.hidden ? "Hiện bản chữ" : "Ẩn bản chữ";
    };
    mcq($("#qs"), L.q, (score) => {
      finished = true;
      saveResult(ctx, "listen", score, L.q.length);
      $("#ls-tr").hidden = false; $("#ls-show").textContent = "Ẩn bản chữ";
      $("#done").innerHTML = resultCard(ctx, "listen", score, L.q.length, "Bản chữ đã hiện ở trên.");
      $("#done [data-redo]").onclick = () => listenPage(deckId, lessonId);
    });

    const scores = {};
    $$("[data-play]").forEach((b) => (b.onclick = () => { halt(); stop = speakLines([dict[+b.dataset.play]], { rate: rate() }); }));
    $$("[data-slow]").forEach((b) => (b.onclick = () => { halt(); stop = speakLines([dict[+b.dataset.slow]], { rate: 0.65 }); }));
    $$("[data-form]").forEach((f) => (f.onsubmit = (e) => {
      e.preventDefault();
      const i = +f.dataset.form, val = $("input", f).value;
      if (!val.trim()) return;
      const d = diffWords(dict[i][1], val);
      scores[i] = d.pct;
      $(`.dict[data-i="${i}"] .dict-out`).innerHTML = `<div class="diff">${d.html}</div><div class="small ${d.pct >= 90 ? "good" : d.pct >= 60 ? "" : "bad"}"><b>${d.pct}%</b> số từ đúng${d.pct === 100 ? " — hoàn hảo!" : ""}</div>`;
      const vals = Object.values(scores);
      if (vals.length === dict.length) {
        const avg = Math.round(vals.reduce((a, b) => a + b, 0) / vals.length);
        saveResult(ctx, "dict", avg, 100, {}, false);
      }
    }));
  }

  // ================= NÓI =================
  function recognize() {
    return new Promise((resolve, reject) => {
      const r = new SR();
      r.lang = "en-US"; r.interimResults = false; r.maxAlternatives = 5; r.continuous = false;
      let done = false;
      r.onresult = (e) => { done = true; resolve([...e.results[0]].map((a) => a.transcript)); };
      r.onerror = (e) => {
        done = true;
        reject(new Error({ "not-allowed": "Bạn chưa cho phép dùng micro (bấm biểu tượng ổ khoá trên thanh địa chỉ để bật).",
          "service-not-allowed": "Trình duyệt chặn nhận dạng giọng nói.", "no-speech": "Không nghe thấy gì, thử nói to hơn nhé.",
          "audio-capture": "Không tìm thấy micro.", network: "Nhận dạng giọng nói cần có mạng." }[e.error] || "Lỗi nhận dạng: " + e.error));
      };
      r.onend = () => { if (!done) resolve([]); };
      onLeave(() => { try { r.abort(); } catch { /* bỏ qua */ } });
      r.start();
    });
  }
  function speakPage(deckId, lessonId) {
    const ctx = load(deckId, lessonId, "speak");
    if (!ctx) return;
    const P = ctx.data.speak;
    const words = ctx.lesson.words;
    const sentences = words.filter((w) => w.example).map((w) => w.example);
    const qs = P.q || [];
    app.innerHTML = `${head(ctx, "speak", "Luyện nói")}
      ${SR ? "" : `<div class="card panel banner-sm">Trình duyệt này chưa hỗ trợ nhận dạng giọng nói. Hãy mở bằng <b>Chrome</b> hoặc <b>Edge</b> để được chấm phát âm. Phần ghi âm gửi bạn bên dưới vẫn dùng được.</div>`}
      ${SR ? `<section class="section">
        <div class="deck-head"><div><h2>Đọc theo</h2><p class="muted small" style="margin:4px 0 0">Bấm ${I.speaker.replace("<svg", '<svg width="14" height="14"')} nghe mẫu, rồi bấm 🎤 và đọc to. App so từng từ máy nghe được với câu gốc.</p></div><span class="chip" id="sp-avg"></span></div>
        <h3 class="sub-h">Từ vựng</h3>
        <div class="card sp-list">${words.map((w, i) => spRow("w" + i, w.word, w.vi)).join("")}</div>
        <h3 class="sub-h">Câu ví dụ</h3>
        <div class="card sp-list">${sentences.map((s, i) => spRow("s" + i, s)).join("")}</div>
      </section>` : ""}
      ${qs.length ? `<section class="section">
        <div class="deck-head"><div><h2>Trả lời câu hỏi</h2><p class="muted small" style="margin:4px 0 0">Ghi âm câu trả lời (30–60 giây)${inRoom() ? " rồi gửi để bạn cùng phòng nghe và góp ý." : ". Vào phòng ở mục Cùng học để gửi cho bạn nghe."}</p></div></div>
        ${qs.map((q, i) => `<div class="card panel rec" data-q="${i}">
          <div class="row" style="justify-content:space-between;flex-wrap:nowrap"><p class="q-text" style="margin:0">${esc(q)}</p>${speakBtn(q)}</div>
          ${P.tips && P.tips[i] ? `<p class="muted small">${esc(P.tips[i])}</p>` : ""}
          ${canRecord ? `<div class="row rec-ctl"><button class="btn primary" data-rec="${i}">🎙 Ghi âm</button><span class="muted small rec-time"></span></div><div class="rec-out"></div>`
            : `<p class="muted small">Trình duyệt này không ghi âm được.</p>`}
        </div>`).join("")}
      </section>` : ""}`;

    // --- Đọc theo ---
    const results = LS.get("ewf.speak." + skillId(ctx, "speak"), {});
    let logged = false;
    const showAvg = () => {
      const v = Object.values(results);
      const el = $("#sp-avg");
      if (el) el.textContent = v.length ? `Trung bình ${Math.round(v.reduce((a, b) => a + b, 0) / v.length)}% · ${v.length} lượt` : "";
    };
    const paint = (id, pct, html, heard) => {
      const row = $(`.sp-row[data-id="${id}"]`);
      if (!row) return;
      $(".sp-score", row).textContent = pct == null ? "" : pct + "%";
      $(".sp-score", row).className = "sp-score " + (pct >= 85 ? "good" : pct >= 60 ? "" : "bad");
      if (html) $(".sp-text", row).innerHTML = html;
      $(".sp-heard", row).textContent = heard ? `Máy nghe được: “${heard}”` : "";
    };
    Object.entries(results).forEach(([id, pct]) => paint(id, pct));
    showAvg();
    let busy = false;
    $$("[data-mic]").forEach((b) => (b.onclick = async () => {
      if (busy) return;
      busy = true;
      const id = b.dataset.mic, text = b.dataset.text;
      speechSynthesis.cancel();
      b.classList.add("on"); b.disabled = true;
      try {
        const alts = await recognize();
        if (!alts.length) throw new Error("Không nghe thấy gì, thử lại nhé.");
        let best = { pct: -1 };
        for (const a of alts) { const d = diffWords(text, a); if (d.pct > best.pct) best = { ...d, heard: a }; }
        results[id] = best.pct;
        LS.set("ewf.speak." + skillId(ctx, "speak"), results);
        paint(id, best.pct, best.html, best.heard);
        const v = Object.values(results);
        const avg = Math.round(v.reduce((x, y) => x + y, 0) / v.length);
        showAvg();
        saveResult(ctx, "speak", avg, 100, { n: v.length }, !logged && v.length >= 5);
        if (v.length >= 5) logged = true;
      } catch (ex) { toast(ex.message); }
      b.classList.remove("on"); b.disabled = false; busy = false;
    }));

    // --- Ghi âm trả lời câu hỏi ---
    $$("[data-rec]").forEach((b) => (b.onclick = () => record(ctx, qs, +b.dataset.rec, b)));
  }
  function spRow(id, text, vi) {
    return `<div class="sp-row" data-id="${id}">
      ${speakBtn(text)}
      <div><div class="sp-text">${esc(text)}</div>${vi ? `<div class="muted small">${esc(vi)}</div>` : ""}<div class="muted small sp-heard"></div></div>
      <span class="sp-score"></span>
      <button class="icon-btn mic" data-mic="${id}" data-text="${esc(text)}" title="Bấm rồi đọc to">🎤</button>
    </div>`;
  }
  const MIME = ["audio/webm;codecs=opus", "audio/webm", "audio/mp4", "audio/ogg"].find((m) => window.MediaRecorder && MediaRecorder.isTypeSupported && MediaRecorder.isTypeSupported(m)) || "";
  async function record(ctx, qs, i, btn) {
    const card = $(`.rec[data-q="${i}"]`);
    const out = $(".rec-out", card), time = $(".rec-time", card);
    if (btn.dataset.state === "on") { btn.stopRec(); return; }
    let stream;
    try { stream = await navigator.mediaDevices.getUserMedia({ audio: true }); }
    catch { toast("Không mở được micro — hãy cho phép trình duyệt dùng micro."); return; }
    speechSynthesis.cancel();
    const rec = new MediaRecorder(stream, MIME ? { mimeType: MIME } : undefined);
    const chunks = [];
    rec.ondataavailable = (e) => e.data.size && chunks.push(e.data);
    const t0 = Date.now();
    const tick = setInterval(() => {
      const s = Math.floor((Date.now() - t0) / 1000);
      time.textContent = `Đang ghi… ${s}s / 90s`;
      if (s >= 90) btn.stopRec();
    }, 250);
    const end = () => { clearInterval(tick); stream.getTracks().forEach((t) => t.stop()); };
    btn.stopRec = () => { if (rec.state !== "inactive") rec.stop(); };
    onLeave(() => { btn.stopRec(); end(); });
    rec.onstop = () => {
      end();
      btn.dataset.state = ""; btn.textContent = "🎙 Ghi lại"; time.textContent = "";
      const blob = new Blob(chunks, { type: rec.mimeType || MIME || "audio/webm" });
      const secs = Math.round((Date.now() - t0) / 1000);
      const url = URL.createObjectURL(blob);
      out.innerHTML = `<audio controls src="${url}"></audio>
        <div class="row">${inRoom() ? `<button class="btn primary sm" data-send>Gửi cho bạn nghe</button>` : `<span class="muted small">Vào phòng ở mục Cùng học để gửi bài cho bạn.</span>`}<span class="muted small">${secs} giây</span></div>`;
      const send = $("[data-send]", out);
      if (send) send.onclick = async () => {
        send.disabled = true; send.textContent = "Đang gửi…";
        try {
          await sync.submitWork({
            kind: "speaking", ref: `${skillId(ctx, "speak")}|${i}`, title: `Bài ${ctx.lesson.id} · Nói`,
            prompt: qs[i], audio: blob,
          });
          send.textContent = "Đã gửi ✓";
          toast("Đã gửi — bạn cùng phòng sẽ nghe và góp ý");
        } catch (ex) { toast(ex.message); send.disabled = false; send.textContent = "Gửi lại"; }
      };
    };
    rec.start();
    btn.dataset.state = "on"; btn.textContent = "■ Dừng"; out.innerHTML = "";
  }

  // ================= VIẾT =================
  function checksFor(text, reqWords, opts = {}) {
    const t = text.trim();
    const n = wordCount(t);
    const out = reqWords.map((w) => ({ ok: wordRegex(w, true).test(t), label: `Dùng từ “${w.word}”` }));
    if (opts.min) out.push({ ok: n >= opts.min && (!opts.max || n <= opts.max), label: opts.max ? `Độ dài ${opts.min}–${opts.max} từ (hiện ${n})` : `Ít nhất ${opts.min} từ (hiện ${n})` });
    // Che dấu chấm trong chữ viết tắt (9 a.m. to…, Mr. Lee) để không bị coi là hết câu.
    const masked = t.replace(/\b(a\.m|p\.m|e\.g|i\.e|etc|mr|mrs|ms|dr|st|no|vs|approx)\./gi, (m) => m.replace(/\./g, "·"));
    const sentences = masked.split(/(?<=[.!?])\s+/).filter(Boolean);
    out.push({ ok: !!t && sentences.every((s) => /^["'(]?[A-Z0-9]/.test(s)), label: "Viết hoa chữ cái đầu câu" });
    if (!opts.email) out.push({ ok: /[.!?]["')]?$/.test(t), label: "Kết thúc bằng dấu câu (. ! ?)" }); // email kết thúc bằng tên người gửi
    if (/\bi\b/.test(t)) out.push({ ok: false, label: "Đại từ “I” phải viết hoa" });
    if (opts.email) {
      out.push({ ok: /^(dear|hi|hello|good (morning|afternoon))\b/i.test(t), label: "Có lời chào (Dear …, Hi …)" });
      out.push({ ok: /\b(regards|sincerely|best|thanks|thank you|cheers)\b/i.test(t.slice(-80)), label: "Có lời kết (Best regards, …)" });
    }
    return out;
  }
  const checkList = (cs) => `<ul class="checks">${cs.map((c) => `<li class="${c.ok ? "ok" : "no"}">${c.ok ? "✓" : "✗"} ${esc(c.label)}</li>`).join("")}</ul>`;
  function writePage(deckId, lessonId) {
    const ctx = load(deckId, lessonId, "write");
    if (!ctx) return;
    const Wd = ctx.data.write;
    const byWord = (s) => ctx.lesson.words.find((w) => w.word.toLowerCase() === s.toLowerCase()) || { word: s, family: "" };
    const items = (Wd.s || []).map(([word, hint]) => ({ w: byWord(word), hint }));
    const em = Wd.email;
    const emWords = em ? em.use.map(byWord) : [];
    const draftKey = "ewf.draft." + skillId(ctx, "write");
    const draft = LS.get(draftKey, {});
    app.innerHTML = `${head(ctx, "write", "Luyện viết")}
      <section class="section">
        <div class="deck-head"><div><h2>Đặt câu</h2><p class="muted small" style="margin:4px 0 0">Viết một câu tiếng Anh dùng từ được giao (dạng chia khác hoặc họ từ cũng được).</p></div></div>
        ${items.map((it, i) => `<div class="card panel wr" data-i="${i}">
          <div class="row"><b class="w">${esc(it.w.word)}</b>${it.w.vi ? `<span class="muted small">${esc(it.w.vi)}</span>` : ""}${speakBtn(it.w.word)}</div>
          <p class="small" style="margin:6px 0 10px">${esc(it.hint)}</p>
          <textarea class="wr-in" rows="2" data-s="${i}" spellcheck="true" placeholder="Viết câu của bạn…">${esc(draft["s" + i] || "")}</textarea>
          <div class="wr-out"></div>
        </div>`).join("")}
      </section>
      ${em ? `<section class="section">
        <div class="deck-head"><div><h2>Viết email</h2><p class="muted small" style="margin:4px 0 0">${em.min || 50}–${em.max || 80} từ. Dùng các từ: ${emWords.map((w) => `<b>${esc(w.word)}</b>`).join(", ")}.</p></div><span class="chip" id="em-count"></span></div>
        <div class="card panel">
          <p style="margin-top:0">${esc(em.task)}</p>
          <textarea class="wr-in email-in" id="em-in" rows="9" spellcheck="true" placeholder="Dear …,&#10;&#10;…&#10;&#10;Best regards,&#10;…">${esc(draft.email || "")}</textarea>
          <div id="em-out"></div>
        </div>
      </section>` : ""}
      <div class="row section" style="justify-content:flex-end">
        <button class="btn primary" id="wr-check">Kiểm tra</button>
        ${inRoom() ? `<button class="btn" id="wr-send">Gửi cho bạn chấm</button>` : `<span class="muted small">Vào phòng ở mục Cùng học để gửi bài cho bạn chấm.</span>`}
      </div>
      <div id="done"></div>`;

    const save = () => {
      const d = {};
      $$("[data-s]").forEach((t) => (d["s" + t.dataset.s] = t.value));
      if ($("#em-in")) d.email = $("#em-in").value;
      LS.set(draftKey, d);
    };
    const count = () => { if ($("#em-in")) { const n = wordCount($("#em-in").value); $("#em-count").textContent = `${n} từ`; $("#em-count").className = "chip " + (n >= (em.min || 50) && n <= (em.max || 80) ? "mastered" : ""); } };
    $$(".wr-in").forEach((t) => (t.oninput = () => { save(); count(); }));
    count();

    const evaluate = () => {
      let passed = 0, totalChecks = 0, okChecks = 0;
      items.forEach((it, i) => {
        const val = $(`[data-s="${i}"]`).value;
        const cs = checksFor(val, [it.w], { min: 6 });
        const ok = cs.every((c) => c.ok);
        if (ok) passed++;
        totalChecks += cs.length; okChecks += cs.filter((c) => c.ok).length;
        $(`.wr[data-i="${i}"] .wr-out`).innerHTML = checkList(cs) + (it.w.example ? `<p class="muted small">Câu mẫu: “${esc(it.w.example)}”</p>` : "");
      });
      let emailOk = true;
      if (em) {
        const cs = checksFor($("#em-in").value, emWords, { min: em.min || 50, max: em.max || 80, email: true });
        emailOk = cs.every((c) => c.ok);
        if (emailOk) passed++;
        totalChecks += cs.length; okChecks += cs.filter((c) => c.ok).length;
        $("#em-out").innerHTML = checkList(cs) + (em.sample ? `<details class="sample"><summary>Xem bài mẫu</summary><div class="passage">${esc(em.sample).replace(/\n/g, "<br>")}</div></details>` : "");
      }
      return { passed, total: items.length + (em ? 1 : 0), auto: Math.round((okChecks / Math.max(1, totalChecks)) * 100) };
    };
    let logged = false;
    $("#wr-check").onclick = () => {
      const r = evaluate();
      saveResult(ctx, "write", r.passed, r.total, {}, !logged);
      logged = true;
      $("#done").innerHTML = `<div class="card panel banner-sm"><b>${r.passed}/${r.total}</b> phần đạt mọi tiêu chí tự động.
        ${r.passed === r.total ? "Rất tốt! " : ""}Máy chỉ kiểm tra hình thức — gửi cho bạn chấm để được sửa ngữ pháp và cách diễn đạt.</div>`;
    };
    const sendBtn = $("#wr-send");
    if (sendBtn) sendBtn.onclick = async () => {
      const parts = items.map((it, i) => `${i + 1}. (${it.w.word}) ${$(`[data-s="${i}"]`).value.trim()}`).filter((s) => !/\)\s*$/.test(s));
      const email = $("#em-in") ? $("#em-in").value.trim() : "";
      if (!parts.length && !email) { toast("Bạn chưa viết gì"); return; }
      const r = evaluate();
      sendBtn.disabled = true; sendBtn.textContent = "Đang gửi…";
      try {
        await sync.submitWork({
          kind: "writing", ref: skillId(ctx, "write"), title: `Bài ${ctx.lesson.id} · Viết`,
          prompt: [items.length ? "Đặt câu với: " + items.map((it) => it.w.word).join(", ") : "", em ? "Email: " + em.task : ""].filter(Boolean).join("\n"),
          text: [parts.join("\n"), email ? "— Email —\n" + email : ""].filter(Boolean).join("\n\n"),
          autoScore: r.auto,
        });
        sendBtn.textContent = "Đã gửi ✓";
        toast("Đã gửi — bạn cùng phòng sẽ chấm và sửa bài");
      } catch (ex) { toast(ex.message); sendBtn.disabled = false; sendBtn.textContent = "Gửi lại"; }
    };
  }

  // ================= CHẤM BÀI CHO NHAU =================
  const nameOf = (id) => (S.user && id === S.user.id ? "Bạn" : (S.members.find((m) => m.id === id) || {}).display_name || "Ai đó");
  const ago = (t) => new Date(t).toLocaleString("vi-VN", { hour: "2-digit", minute: "2-digit", day: "numeric", month: "numeric" });
  const stars = (n) => `<span class="stars">${"★".repeat(n)}<span class="off">${"★".repeat(5 - n)}</span></span>`;
  const pendingFor = (subs) => subs.filter((s) => s.user_id !== S.user.id && !(s.reviews || []).some((r) => r.reviewer_id === S.user.id));

  async function inboxPage() {
    if (!EWF.ui.gate || !EWF.ui.gate()) return;
    resetLeave();
    app.innerHTML = `<div class="page-head"><div><p class="eyebrow">Cùng học</p><h1>Chấm bài cho nhau</h1>
        <p class="muted">Bài nói và bài viết gửi từ phần luyện kỹ năng của từng bài học.</p></div><a class="btn ghost" href="#/friends">${I.back} Cùng học</a></div>
      <div class="tabs" id="ib-tabs"><button class="tab active" data-t="todo">Chờ bạn chấm</button><button class="tab" data-t="mine">Bài của bạn</button><button class="tab" data-t="done">Đã chấm</button></div>
      <div id="ib-list"><div class="card panel muted">Đang tải…</div></div>`;
    let subs = [];
    try { subs = await sync.listSubmissions(60); } catch (ex) { $("#ib-list").innerHTML = `<div class="card panel">Không tải được: ${esc(ex.message)}</div>`; return; }
    if (location.hash !== "#/inbox") return;
    const groups = {
      todo: pendingFor(subs),
      mine: subs.filter((s) => s.user_id === S.user.id),
      done: subs.filter((s) => s.user_id !== S.user.id && (s.reviews || []).some((r) => r.reviewer_id === S.user.id)),
    };
    const EMPTY = { todo: "Không có bài nào đang chờ bạn chấm 🎉", mine: "Bạn chưa gửi bài nào. Vào một bài học → Nói hoặc Viết để gửi.", done: "Chưa chấm bài nào." };
    $$("#ib-tabs .tab").forEach((t) => (t.textContent += ` (${groups[t.dataset.t].length})`));
    const show = (k) => {
      $$("#ib-tabs .tab").forEach((t) => t.classList.toggle("active", t.dataset.t === k));
      $("#ib-list").innerHTML = groups[k].length ? groups[k].map((s) => subCard(s, k === "todo" || k === "done")).join("") : `<div class="card panel muted">${EMPTY[k]}</div>`;
      bindCards(groups[k]);
    };
    $$("#ib-tabs .tab").forEach((t) => (t.onclick = () => show(t.dataset.t)));
    show(groups.todo.length ? "todo" : "mine");
  }
  function subCard(s, canReview) {
    const mine = (s.reviews || []).find((r) => r.reviewer_id === S.user.id);
    const others = (s.reviews || []).filter((r) => r.reviewer_id !== S.user.id);
    const [deckId, lessonId] = s.ref.split("|");
    const l = findLesson(findDeck(deckId), lessonId);
    return `<article class="card panel sub" data-id="${esc(s.id)}">
      <div class="row" style="justify-content:space-between"><div><b>${esc(nameOf(s.user_id))}</b> · ${s.kind === "speaking" ? "🗣️ Bài nói" : "✍️ Bài viết"}
        ${l ? ` · <a href="#/lesson/${esc(deckId)}/${esc(lessonId)}">Bài ${esc(l.id)} ${esc(l.title)}</a>` : ""}</div><span class="muted small">${ago(s.created_at)}</span></div>
      ${s.prompt ? `<p class="muted small sub-prompt">${esc(s.prompt).replace(/\n/g, "<br>")}</p>` : ""}
      ${s.text ? `<div class="sub-text">${esc(s.text)}</div>` : ""}
      ${s.audio_path ? `<div class="sub-audio" data-path="${esc(s.audio_path)}"><span class="muted small">Đang tải ghi âm…</span></div>` : ""}
      ${s.auto_score != null ? `<p class="muted small">Máy kiểm tra hình thức: ${s.auto_score}%</p>` : ""}
      ${others.map(reviewView).join("")}
      ${canReview ? reviewForm(s, mine) : !others.length ? `<p class="muted small">Chưa có ai chấm.</p>` : ""}
    </article>`;
  }
  function reviewView(r) {
    return `<div class="review"><div><b>${esc(nameOf(r.reviewer_id))}</b> chấm ${stars(r.stars)}</div>
      ${r.corrected ? `<div class="small"><span class="muted">Bản sửa:</span><div class="sub-text corrected">${esc(r.corrected)}</div></div>` : ""}
      ${r.comment ? `<div class="small"><span class="muted">Nhận xét:</span> ${esc(r.comment)}</div>` : ""}</div>`;
  }
  function reviewForm(s, mine) {
    const st = mine ? mine.stars : 0;
    return `<form class="review-form" data-review="${esc(s.id)}">
      <div class="row"><span class="small">Chấm:</span><span class="star-pick" data-v="${st}">${[1, 2, 3, 4, 5].map((n) => `<button type="button" data-star="${n}" class="${n <= st ? "on" : ""}">★</button>`).join("")}</span></div>
      ${s.kind === "writing" ? `<label class="small muted">Sửa lại bài (sửa trực tiếp trên bài của bạn ấy)</label><textarea rows="5" name="corrected">${esc(mine ? mine.corrected || "" : s.text || "")}</textarea>` : ""}
      <label class="small muted">Nhận xét</label><textarea rows="2" name="comment" placeholder="${s.kind === "speaking" ? "Phát âm, ngữ điệu, ý trả lời…" : "Ngữ pháp, từ vựng, cách diễn đạt…"}">${esc(mine ? mine.comment || "" : "")}</textarea>
      <div class="row"><button class="btn primary sm" type="submit">${mine ? "Cập nhật" : "Gửi nhận xét"}</button></div>
    </form>`;
  }
  function bindCards(list) {
    $$(".sub-audio").forEach(async (el) => {
      try { el.innerHTML = `<audio controls preload="none" src="${esc(await sync.audioUrl(el.dataset.path))}"></audio>`; }
      catch (ex) { el.innerHTML = `<span class="muted small">Không tải được ghi âm: ${esc(ex.message)}</span>`; }
    });
    $$(".star-pick").forEach((p) => $$("[data-star]", p).forEach((b) => (b.onclick = () => {
      p.dataset.v = b.dataset.star;
      $$("[data-star]", p).forEach((x) => x.classList.toggle("on", +x.dataset.star <= +b.dataset.star));
    })));
    $$("[data-review]").forEach((f) => (f.onsubmit = async (e) => {
      e.preventDefault();
      const s = list.find((x) => x.id === f.dataset.review);
      const v = +$(".star-pick", f).dataset.v;
      if (!v) { toast("Chọn số sao trước đã"); return; }
      const btn = $("button[type=submit]", f);
      btn.disabled = true;
      try {
        const corrected = f.corrected ? f.corrected.value.trim() : "";
        await sync.reviewWork(s, { stars: v, corrected: corrected && corrected !== (s.text || "").trim() ? corrected : "", comment: f.comment.value.trim() });
        toast("Đã gửi nhận xét");
        inboxPage();
      } catch (ex) { toast(ex.message); btn.disabled = false; }
    }));
  }

  // ---------- Gắn vào trang bài học và trang Cùng học ----------
  afterRoute(async (h) => {
    const m = h.match(/^#\/lesson\/([^/]+)\/([^/]+)$/);
    if (m) {
      const d = findDeck(m[1]), l = findLesson(d, m[2]);
      const data = l && EWF.skillsOf(d.id, l.id);
      const modes = $(".modes", app);
      if (!data || !modes) return;
      const base = `${d.id}/${l.id}`;
      modes.insertAdjacentHTML("afterend", `<div class="deck-head section" style="margin-top:18px"><h2>Luyện 4 kỹ năng</h2></div>
        <div class="modes skills-row">${Object.entries(KINDS).filter(([k]) => data[k]).map(([k, v]) => {
          const p = bestPct(EWF.getSkill(`${d.id}|${l.id}|${k}`));
          return `<a class="card mode" href="#/${k}/${esc(base)}"><span class="ic emoji">${v.icon}</span><div><b>${v.name}${p != null ? ` <span class="chip ${p >= 80 ? "mastered" : "learning"}">${k === "speak" ? p + "%" : p + "%"}</span>` : ""}</b><span>${v.desc}</span></div></a>`;
        }).join("")}</div>`);
    }
    if (h === "#/friends" && inRoom()) {
      const bar = $(".page-head .row", app);
      if (!bar || $("#inbox-btn")) return;
      bar.insertAdjacentHTML("beforeend", `<a class="btn" id="inbox-btn" href="#/inbox">Chấm bài <span class="badge" id="inbox-n" hidden></span></a>`);
      try {
        const n = pendingFor(await sync.listSubmissions(60)).length;
        const b = $("#inbox-n");
        if (b && n) { b.hidden = false; b.textContent = n; }
      } catch { /* bỏ qua */ }
    }
  });

  navAlias({ read: "home", listen: "home", speak: "home", write: "home", inbox: "friends" });
  addRoute(/^#\/read\/([^/]+)\/([^/]+)$/, readPage);
  addRoute(/^#\/listen\/([^/]+)\/([^/]+)$/, listenPage);
  addRoute(/^#\/speak\/([^/]+)\/([^/]+)$/, speakPage);
  addRoute(/^#\/write\/([^/]+)\/([^/]+)$/, writePage);
  addRoute(/^#\/inbox$/, inboxPage);

  EWF.skills = { KINDS, mixOptions, diffWords, formsPattern, wordRegex, checksFor };
})();
