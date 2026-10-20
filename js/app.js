/* =========================================================
   app.js – LEGO English Builder
   State, điều hướng 5 màn hình, bài học 6 bước, Xưởng lắp ráp,
   Sa bàn Thế giới, Tủ đồ Minifigure, Trạm bảo trì (SRS), Góc bố mẹ.
   ========================================================= */
(function () {
  'use strict';

  const { ZONES, WORDS, SCHOOL_BOOKS, PRAISE, ENCOURAGE, STEPS, BUILTIN_COUNT } = window.Curriculum;
  const CUR = window.Curriculum;
  const S = window.Store;
  const G = window.Grammar;
  const CU = window.CustomUnits;
  const LG = window.LegoSvg;
  const Sfx = window.Sfx;
  const Speech = window.Speech;
  const Listener = window.Listener;
  const Recorder = window.Recorder;

  /* =========================================================
     TIỆN ÍCH
     ========================================================= */
  const $ = (s, r = document) => r.querySelector(s);
  const $$ = (s, r = document) => Array.from(r.querySelectorAll(s));
  const esc = (s) => String(s == null ? '' : s).replace(/[&<>"']/g, (m) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[m]));
  const shuffle = (arr) => { const a = arr.slice(); for (let i = a.length - 1; i > 0; i--) { const j = Math.floor(Math.random() * (i + 1)); [a[i], a[j]] = [a[j], a[i]]; } return a; };
  const pick = (arr) => arr[Math.floor(Math.random() * arr.length)];
  const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
  const bi = (en, vi) => `<span class="en">${en}</span><small class="vi">${vi}</small>`;
  const inside = (el, x, y) => { if (!el) return false; const r = el.getBoundingClientRect(); return x >= r.left && x <= r.right && y >= r.top && y <= r.bottom; };
  const starsHTML = (n, max = 3) => `<span class="stars">${'★'.repeat(n)}<span class="off">${'★'.repeat(Math.max(0, max - n))}</span></span>`;
  const BRICK_COLORS = ['#E3000B', '#006CB7', '#FFD500', '#00A850', '#FF7E14', '#8E44AD'];
  const escRe = (s) => s.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  /** Biến CSS màu gạch theo vai trò ngữ pháp (Color-Coded Brick Grammar). */
  const roleVars = (r, prefix) => { const R = G.ROLES[r] || G.ROLES.obj; return `--${prefix}:${R.color};--${prefix}d:${R.dark}`; };
  const TONES = {
    yes: { en: 'Excited yes', vi: 'Đồng ý hào hứng', ico: '🤩' },
    no: { en: 'Polite no', vi: 'Từ chối lịch sự', ico: '🙏' },
    idea: { en: 'New idea', vi: 'Đề xuất ý khác', ico: '💡' },
    ask: { en: 'Ask more', vi: 'Hỏi thêm', ico: '❓' },
    calm: { en: 'Just answer', vi: 'Trả lời bình tĩnh', ico: '🙂' }
  };
  const TIERS = {
    plastic: { en: 'Plastic', vi: 'Nhựa thường', box: 'Box 1' },
    silver: { en: 'Silver', vi: 'Bạc', box: 'Box 2' },
    gold: { en: 'Gold', vi: 'Vàng', box: 'Box 3–4' },
    diamond: { en: 'Diamond', vi: 'Kim Cương', box: 'Box 5' }
  };

  const screenEl = $('#screen');
  const overlay = $('#overlay');
  const modal = $('#modal');
  const modalCard = $('.modal-card', modal);
  const toastEl = $('#toast');
  const fxLayer = $('#fx');

  const App = {
    screen: 'map',
    wsZone: 'z1',
    lockerCat: 'hat',
    parentOk: false,
    gate: null,
    lastActive: Date.now()
  };

  /* ---------- Toast / Modal / Hiệu ứng ---------- */
  let toastTimer = null;
  function toast(en, vi, type = '') {
    toastEl.className = 'toast ' + type;
    toastEl.innerHTML = `${esc(en)}${vi ? `<small>${esc(vi)}</small>` : ''}`;
    void toastEl.offsetWidth; // ép trình duyệt tính lại để transition chạy
    toastEl.classList.add('show');
    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => toastEl.classList.remove('show'), 2000);
  }
  function praise() { const p = pick(PRAISE); toast(p.en, p.vi, 'good'); return p; }
  function encourage() { const p = pick(ENCOURAGE); toast(p.en, p.vi, 'warm'); return p; }

  let modalOnClose = null;
  function openModal(html, opts = {}) {
    modalCard.innerHTML = (opts.noClose ? '' : `<button class="modal-close" data-action="modal-close" aria-label="Close">✕</button>`) + html;
    modal.hidden = false;
    modalOnClose = opts.onClose || null;
    modal.dataset.dismiss = opts.noClose ? '0' : '1';
  }
  function closeModal() {
    modal.hidden = true;
    modalCard.innerHTML = '';
    const fn = modalOnClose; modalOnClose = null;
    if (fn) fn();
  }
  function confirmModal({ en, vi, text = '', ok = 'OK', okVi = 'Đồng ý', cancel = 'Cancel', cancelVi = 'Hủy', okClass = 'btn-green' }) {
    return new Promise((resolve) => {
      openModal(`<h3>${esc(en)}</h3><span class="vi">${esc(vi)}</span>${text ? `<div class="modal-text">${text}</div>` : '<div style="height:16px"></div>'}
        <div class="btn-row center">
          <button class="brick-btn btn-gray" data-action="confirm-no">${bi(cancel, cancelVi)}</button>
          <button class="brick-btn ${okClass}" data-action="confirm-yes">${bi(ok, okVi)}</button>
        </div>`, { onClose: () => resolve(false) });
      modalCard.querySelector('[data-action="confirm-yes"]').addEventListener('click', () => { modalOnClose = null; closeModal(); resolve(true); }, { once: true });
      modalCard.querySelector('[data-action="confirm-no"]').addEventListener('click', () => { modalOnClose = null; closeModal(); resolve(false); }, { once: true });
    });
  }

  const fx = {
    confetti(n = 46) {
      for (let i = 0; i < n; i++) {
        const p = document.createElement('div');
        p.className = 'confetti-piece';
        const c = pick(BRICK_COLORS);
        p.style.background = c; p.style.color = c;
        p.style.left = Math.random() * 100 + 'vw';
        p.style.setProperty('--dx', (Math.random() * 200 - 100) + 'px');
        p.style.setProperty('--rot', (Math.random() * 900 - 450) + 'deg');
        p.style.setProperty('--dur', (1.4 + Math.random() * 1.2) + 's');
        p.style.animationDelay = (Math.random() * 0.35) + 's';
        fxLayer.appendChild(p);
        setTimeout(() => p.remove(), 3200);
      }
    },
    floatText(text, x, y) {
      const t = document.createElement('div');
      t.className = 'float-text'; t.textContent = text;
      t.style.left = x + 'px'; t.style.top = y + 'px';
      fxLayer.appendChild(t);
      setTimeout(() => t.remove(), 1200);
    },
    studsFly(fromEl, toEl, count = 3) {
      if (!fromEl || !toEl) return;
      const a = fromEl.getBoundingClientRect(), b = toEl.getBoundingClientRect();
      for (let i = 0; i < Math.min(count, 6); i++) {
        const s = document.createElement('div');
        s.className = 'stud-fly';
        const sx = a.left + a.width / 2 - 13 + (Math.random() * 40 - 20), sy = a.top + a.height / 2 - 13;
        s.style.left = sx + 'px'; s.style.top = sy + 'px';
        s.style.setProperty('--tx', (b.left + b.width / 2 - 13 - sx) + 'px');
        s.style.setProperty('--ty', (b.top + b.height / 2 - 13 - sy) + 'px');
        s.style.animationDelay = (i * 0.07) + 's';
        fxLayer.appendChild(s);
        setTimeout(() => s.remove(), 1300);
      }
    }
  };

  /* ---------- Ví & avatar ---------- */
  function updateWallet() {
    $('#studCount').textContent = S.state.studs;
    $('#goldCount').textContent = S.state.goldBricks;
    $('#avatarChip').innerHTML = LG.renderMinifig(S.state.avatar);
  }

  /* Cấp độ thích ứng: bắt đầu dễ (cấp 1), tự tăng khi con đã quen & thành thạo (xem Store.recordLessonSkill) */
  const LEVELS = {
    1: { icon: '🌱', en: 'Explorer', vi: 'Làm quen', mastery: 0.6, model: 'show', hintSteps: 1, colorMonths: 99, viFrom: 99 },
    2: { icon: '🌿', en: 'Builder', vi: 'Vững vàng', mastery: 0.65, model: 'after1', hintSteps: 2, colorMonths: 2, viFrom: 4 },
    3: { icon: '🚀', en: 'Master', vi: 'Thành thạo', mastery: 0.7, model: 'hidden', hintSteps: 3, colorMonths: 1, viFrom: 1 }
  };
  const diff = () => LEVELS[S.skillLevel()];
  const levelChipHTML = () => { const d = diff(); return `<span class="chip level-chip" style="box-shadow:0 4px 0 var(--card-edge)" title="Cấp độ">${d.icon}<small>Cấp ${S.skillLevel()} · ${d.vi}</small></span>`; };

  /* Tốc độ giọng đọc: trên iPad giọng máy đọc khá nhanh → thêm mức Rất chậm, mặc định Chậm */
  const SPEEDS = [
    { v: 0.5, icon: '🐌', en: 'Very slow', vi: 'Rất chậm' },
    { v: 0.65, icon: '🐢', en: 'Slow', vi: 'Chậm' },
    { v: 0.8, icon: '🚶', en: 'Normal', vi: 'Vừa' },
    { v: 0.95, icon: '🐇', en: 'Natural', vi: 'Tự nhiên' }
  ];
  const speedOf = (v) => SPEEDS.reduce((a, b) => (Math.abs(b.v - v) < Math.abs(a.v - v) ? b : a));
  function applySettings() {
    const st = S.state.settings;
    Sfx.enabled = st.sfx !== false;
    Speech.setAccent(st.accent);
    Speech.rate = Number(st.rate) || 0.65;
  }
  function speedChipHTML() {
    const sp = speedOf(Speech.rate);
    return `<button class="chip speed-chip" data-action="speed-cycle" style="box-shadow:0 4px 0 var(--card-edge)" aria-label="Speech speed">${sp.icon}<small>${sp.vi}</small></button>`;
  }
  function cycleSpeed() {
    const i = SPEEDS.indexOf(speedOf(Speech.rate));
    const sp = SPEEDS[(i + 1) % SPEEDS.length];
    S.state.settings.rate = sp.v; S.save(); applySettings();
    $$('.speed-chip').forEach((b) => { b.innerHTML = `${sp.icon}<small>${sp.vi}</small>`; });
    toast(`${sp.icon} ${sp.en}`, `Tốc độ đọc: ${sp.vi}`, 'good');
    Speech.speak('This is my speaking speed.');
  }

  function sayWord(w, slow) {
    return slow ? Speech.speakSlow(w.en.replace(/\.\.\.|…/g, '')) : Speech.speak(w.en.replace(/\.\.\.|…/g, ''));
  }

  function highlightWord(sentence, word) {
    const core = word.replace(/\.\.\.|…|\?|!/g, '').replace(/\.$/, '').trim();
    if (!core) return esc(sentence);
    const re = new RegExp(escRe(esc(core)), 'i');
    return esc(sentence).replace(re, (m) => `<b>${m}</b>`);
  }

  /* ---------- Trạng thái bài học ---------- */
  function lessonUnlocked(zone, idx) { return idx === 0 || S.isLessonDone(zone.lessons[idx - 1].id); }
  function findNextLesson(zones) {
    for (const z of (zones || ZONES)) {
      for (let i = 0; i < z.lessons.length; i++) {
        if (!S.isLessonDone(z.lessons[i].id) && lessonUnlocked(z, i)) return z.lessons[i];
      }
    }
    return null;
  }
  function zoneDueIds(zoneId) { return S.dueWordIds().filter((id) => WORDS[id] && WORDS[id].zoneId === zoneId); }
  function learnedInZone(zoneId) { return S.learnedWordIds().filter((id) => WORDS[id] && WORDS[id].zoneId === zoneId); }
  function zoneStyle(z) { return `--zc:${z.color};--zcd:${z.dark}`; }
  function zoneDone(z) { return z.lessons.every((l) => S.isLessonDone(l.id)); }
  function mysteryOpen(z) { return !!z.mystery && zoneDone(z); }
  function partLessonNo(z, i) { return z.lessons.findIndex((l) => l.parts.indexOf(i) !== -1) + 1; }
  function zoneById(id) { return CUR.zone(id); }

  /* =========================================================
     KÉO THẢ + CHẠM ĐỂ ĐẶT (Pointer Events – iPad Safari)
     ========================================================= */
  function attachDrag(root, o) {
    root.addEventListener('pointerdown', (e) => {
      const el = e.target.closest(o.itemSelector);
      if (!el || !root.contains(el) || (e.button && e.button > 0)) return;
      const sx = e.clientX, sy = e.clientY, pid = e.pointerId;
      let dragging = false, ghost = null;
      const move = (ev) => {
        if (ev.pointerId !== pid) return;
        if (!dragging && Math.hypot(ev.clientX - sx, ev.clientY - sy) > 8) {
          dragging = true;
          ghost = o.makeGhost(el);
          document.body.appendChild(ghost);
          el.classList.add('dragging-src');
          Sfx.playTap();
        }
        if (dragging) {
          ev.preventDefault();
          ghost.style.left = (ev.clientX - ghost.offsetWidth / 2) + 'px';
          ghost.style.top = (ev.clientY - ghost.offsetHeight / 2) + 'px';
          if (o.onMove) o.onMove(ev.clientX, ev.clientY);
        }
      };
      const end = (ev) => {
        if (ev.pointerId !== pid) return;
        window.removeEventListener('pointermove', move);
        window.removeEventListener('pointerup', end);
        window.removeEventListener('pointercancel', end);
        if (dragging) {
          ghost.remove();
          el.classList.remove('dragging-src');
          if (ev.type === 'pointerup') o.onDrop(el, ev.clientX, ev.clientY);
          else if (o.onCancel) o.onCancel();
        } else if (ev.type === 'pointerup') {
          o.onTap(el);
        }
      };
      window.addEventListener('pointermove', move, { passive: false });
      window.addEventListener('pointerup', end);
      window.addEventListener('pointercancel', end);
    });
  }

  /* =========================================================
     BÀN LẮP RÁP (dùng chung cho Bước 6 & Xưởng lắp ráp)
     ========================================================= */
  function mountBench(container, cfg) {
    const zoneId = cfg.zoneId;
    const model = LG.MODELS[zoneId];
    let sel = null, lastDrop = null;

    const render = () => {
      const parts = S.parts(zoneId);
      const tray = cfg.tray();
      if (sel !== null && tray.indexOf(sel) === -1) sel = null;
      const hint = sel !== null
        ? '<div class="stage-hint">👆 Tap the model to attach! · Chạm mô hình để gắn</div>'
        : (tray.length ? '<div class="stage-hint">Pick a part · Chọn hoặc kéo mảnh ghép</div>' : '');
      container.innerHTML = `<div class="build-layout">
        <div class="part-tray">
          <h4>🧰 Parts Tray<small>Khay mảnh ghép (${tray.length})</small></h4>
          ${tray.length ? tray.map((i) => `<div class="part-chip${sel === i ? ' selected' : ''}" data-pidx="${i}" role="button" aria-label="${esc(model.parts[i].n)}">
              ${LG.renderPart(zoneId, i)}<div><b>${i + 1}. ${esc(model.parts[i].n)}</b><small>${esc(model.parts[i].vi)}</small></div></div>`).join('')
            : `<div class="tray-empty">${cfg.emptyHTML || 'Empty'}</div>`}
        </div>
        <div class="model-stage">${hint}${LG.renderModel(zoneId, parts, { target: sel, dropIn: lastDrop })}</div>
      </div>`;
      lastDrop = null;
    };

    const assemble = (i) => {
      if (!S.assemblePart(zoneId, i)) return;
      sel = null; lastDrop = i;
      Sfx.playSnap();
      render();
      const stage = $('.model-stage', container);
      if (stage) { const r = stage.getBoundingClientRect(); fx.floatText('Click!', r.left + r.width / 2, r.top + r.height / 2); }
      if (cfg.onAssembled) cfg.onAssembled(i);
      if (S.zoneProgress(zoneId).complete && cfg.onComplete) setTimeout(cfg.onComplete, 700);
    };

    container.addEventListener('click', (e) => {
      if (sel === null) return;
      if (e.target.closest('.model-stage')) assemble(sel);
    });

    attachDrag(container, {
      itemSelector: '.part-chip',
      onTap: (el) => {
        const i = Number(el.dataset.pidx);
        sel = sel === i ? null : i;
        Sfx.playBrickClick();
        render();
        if (sel !== null) Speech.speak(model.parts[i].n);
      },
      makeGhost: (el) => {
        const g = document.createElement('div');
        g.className = 'part-ghost';
        g.innerHTML = LG.renderPart(zoneId, Number(el.dataset.pidx));
        return g;
      },
      onMove: (x, y) => { const st = $('.model-stage', container); if (st) st.classList.toggle('drop-hover', inside(st, x, y)); },
      onDrop: (el, x, y) => {
        const st = $('.model-stage', container);
        if (st) st.classList.remove('drop-hover');
        if (inside(st, x, y)) assemble(Number(el.dataset.pidx));
      },
      onCancel: () => { const st = $('.model-stage', container); if (st) st.classList.remove('drop-hover'); }
    });

    render();
    return { render };
  }

  function celebrateSet(zoneId) {
    const z = ZONES.find((x) => x.id === zoneId);
    const m = LG.MODELS[zoneId];
    S.polish(zoneId);
    Sfx.playSuccessFanfare();
    fx.confetti(80);
    S.addGold(3);
    updateWallet();
    Speech.speak(`Congratulations! You built the ${m.name}!`);
    openModal(`<h3>🏆 Set Complete!</h3><span class="vi">Hoàn thành Bộ Mô Hình – đã được đặt vào Sa bàn Thế giới LEGO của con!</span>
      <div class="model-stage" style="margin:16px 0">${LG.renderModel(zoneId, S.parts(zoneId), { sparkle: true })}</div>
      <p class="modal-text" style="text-align:center"><b>${esc(m.name)}</b><br><span class="vi">${esc(m.vi)} · ${esc(z.name)}</span><br>+3 <i class="gold-icon" style="vertical-align:middle"></i> Gold Bricks</p>
      <div class="btn-row center"><button class="brick-btn btn-purple" data-action="go" data-screen="diorama">${bi('🏙️ See My World', 'Xem Sa bàn')}</button></div>`);
  }

  /* =========================================================
     MÀN HÌNH 1: BẢN ĐỒ THẾ GIỚI
     ========================================================= */
  /* ---------- Lộ trình 9 Tháng: Giai đoạn đang chọn & thanh chọn ---------- */
  function curStage() {
    const v = S.state.settings.roadmap;
    return CUR.STAGES.some((x) => String(x.id) === String(v)) ? (v === 'sgk' ? 'sgk' : Number(v)) : 1;
  }
  function stageZones(stage) { return CUR.zonesOf(stage === undefined ? curStage() : stage); }
  function stageInfo(stage) { return CUR.STAGES.find((x) => String(x.id) === String(stage === undefined ? curStage() : stage)); }
  function zoneLabel(z, idx) { return z.week ? 'W' + z.week : z.custom ? z.icon : String(idx + 1); }

  function stageTabsHTML() {
    const cur = String(curStage());
    return `<div class="stage-tabs" role="tablist" aria-label="Lộ trình 9 tháng">${CUR.STAGES.map((st) => {
      const zs = CUR.zonesOf(st.id);
      const total = zs.reduce((a, z) => a + z.lessons.length, 0);
      const done = zs.reduce((a, z) => a + z.lessons.filter((l) => S.isLessonDone(l.id)).length, 0);
      return `<button class="stage-tab${String(st.id) === cur ? ' active' : ''}" role="tab" aria-selected="${String(st.id) === cur}" data-action="stage-tab" data-stage="${st.id}" title="${esc(st.vi)}">
        <span class="st-ico">${st.icon}</span><span class="st-txt"><b>${esc(st.short)}</b><small>${zs.length ? `${done}/${total} bài` : 'Sắp ra mắt'}</small></span>
        ${total ? `<i class="st-bar"><i style="width:${Math.round((done / total) * 100)}%"></i></i>` : ''}
      </button>`;
    }).join('')}</div>`;
  }

  function comingSoonHTML() {
    const st = stageInfo();
    return `<div class="card coming-soon studs-top"><div style="font-size:54px">${st.icon}🚧</div>
      <h3>${esc(st.vi)}</h3><p class="vi">Giai đoạn này đang được xây dựng – các Vùng đất mới sẽ xuất hiện ở đây trong bản cập nhật tiếp theo. Trong lúc chờ, con học tiếp ở các tab khác nhé!</p></div>`;
  }

  /** Các Unit SGK đang có bài LEGO tương ứng. */
  function bookUnits(book) {
    const B = SCHOOL_BOOKS[book];
    return B ? B.units.filter((u) => CUR.lesson(u.lesson)) : [];
  }

  function schoolPanelHTML() {
    const st = S.state;
    const book = SCHOOL_BOOKS[st.settings.book] ? st.settings.book : 'none';
    if (book === 'none') {
      return `<div class="card school-panel studs-top"><div class="school-row">
        <button class="toggle" data-action="toggle-school" aria-label="Học cùng SGK"></button>
        <label>📘 School Sync – Học cùng SGK<small class="vi" style="display:block;font-size:13px">Bật để chọn đúng Unit sách Tiếng Anh 3 hoặc Tiếng Anh 4 Global Success bé đang học trên lớp.</small></label>
      </div></div>`;
    }
    const units = bookUnits(book);
    const cur = units.find((u) => u.unit === Number(st.settings.schoolUnit)) || units[0];
    const L = cur && CUR.lesson(cur.lesson);
    const Z = L && CUR.zone(L.zoneId);
    return `<div class="card school-panel studs-top">
      <div class="school-row">
        <button class="toggle on" data-action="toggle-school" aria-label="Học cùng SGK"></button>
        <label>📘 School Sync – Học cùng SGK</label>
        <select class="select-lg" data-change="school-book" aria-label="Book">
          ${Object.keys(SCHOOL_BOOKS).map((k) => `<option value="${k}"${k === book ? ' selected' : ''}>${esc(SCHOOL_BOOKS[k].name)}</option>`).join('')}
        </select>
        <select class="select-lg" data-change="school-unit" aria-label="Unit">
          ${units.map((u) => `<option value="${u.unit}"${cur && u.unit === cur.unit ? ' selected' : ''}>Unit ${u.unit}: ${esc(u.title)}</option>`).join('')}
        </select>
      </div>
      ${L ? `<div class="school-result">
        <span class="pill blue">Unit ${cur.unit} → ${Z.week ? 'Week ' + Z.week : esc(Z.short || Z.name)} · ${esc(L.title)}</span>
        <span class="vi">Ôn đúng chủ đề tuần này trên lớp: <b>${esc(L.titleVi)}</b></span>
        <button class="brick-btn btn-blue btn-sm" data-action="start-lesson" data-lesson="${L.id}" data-force="1">${bi('▶ Practise now', 'Ôn ngay')}</button>
      </div>` : ''}
    </div>`;
  }

  function zoneCardHTML(z, idx, schoolLesson) {
    const prog = S.zoneProgress(z.id);
    const doneL = z.lessons.filter((l) => S.isLessonDone(l.id)).length;
    const dueN = zoneDueIds(z.id).length;
    const isSchool = schoolLesson && schoolLesson.zoneId === z.id;
    const mys = S.mystery(z.id);
    return `<button class="zone-card${z.custom ? ' custom' : ''}" data-action="open-zone" data-zone="${z.id}" style="${zoneStyle(z)}">
      <div class="zone-top"><div class="zone-num${z.week ? ' wk' : ''}">${zoneLabel(z, idx)}</div><div><h3>${esc(z.name)}</h3><small>${esc(z.vi)}</small></div></div>
      <div class="zone-thumb">
        ${dueN ? `<span class="badge-due">🔧 ${dueN}</span>` : ''}
        ${isSchool ? '<span class="badge-due badge-school">📘 Unit</span>' : ''}
        ${z.custom ? '<span class="badge-due badge-custom">✏️ Custom</span>' : ''}
        ${mys && mys.done ? '<span class="badge-due badge-mystery done">🕵️ ✓</span>' : mysteryOpen(z) ? '<span class="badge-due badge-mystery">🕵️ !</span>' : ''}
        ${LG.renderModel(z.id, S.parts(z.id))}
      </div>
      <div class="zone-meta">
        <div class="zone-topic">${z.icon} ${esc(z.topic)}<span class="vi">${esc(z.topicVi)}</span></div>
        <div class="brick-meter">${Array.from({ length: 12 }, (_, k) => `<i class="${k < prog.unlocked ? 'on' : ''}"></i>`).join('')}</div>
        <div class="zone-stats"><span>🧱 ${prog.unlocked}/12 Bricks</span><span>⭐ ${doneL}/${z.lessons.length}</span></div>
      </div>
    </button>`;
  }

  function renderMap() {
    const st = S.state;
    const stage = curStage();
    const zones = stageZones();
    const next = findNextLesson(zones) || findNextLesson();
    const due = S.dueWordIds().filter((id) => WORDS[id]).length;
    const lessonsDone = S.lessonsDoneCount();
    const book = SCHOOL_BOOKS[st.settings.book] ? st.settings.book : null;
    const sUnit = book && bookUnits(book).find((u) => u.unit === Number(st.settings.schoolUnit));
    const schoolLesson = sUnit ? CUR.lesson(sUnit.lesson) : null;
    const info = stageInfo();

    const hour = new Date().getHours();
    const greet = hour < 12 ? ['Good morning', 'Chào buổi sáng'] : hour < 18 ? ['Good afternoon', 'Chào buổi chiều'] : ['Good evening', 'Chào buổi tối'];

    let grid;
    if (!zones.length) grid = comingSoonHTML();
    else if (stage !== 'sgk') {
      // Nhóm theo Tháng (4 tuần / tháng)
      const months = [];
      zones.forEach((z) => {
        const m = z.month || 0;
        let g = months.find((x) => x.m === m);
        if (!g) { g = { m, title: z.monthTitle || '', titleVi: z.monthTitleVi || '', zones: [] }; months.push(g); }
        g.zones.push(z);
      });
      grid = months.map((g) => `<h4 class="month-title"><span class="month-num">${g.m ? 'Tháng ' + g.m : ''}</span>${esc(g.title)}<small class="vi">${esc(g.titleVi)}</small></h4>
        <div class="zone-grid">${g.zones.map((z, i) => zoneCardHTML(z, i, schoolLesson)).join('')}</div>`).join('');
    } else {
      const classic = zones.filter((z) => !z.custom), custom = zones.filter((z) => z.custom);
      grid = `<h4 class="month-title"><span class="month-num">Lớp 4</span>Classic LEGO Zones<small class="vi">10 Vùng đất gốc theo chương trình Lớp 4 / Movers–Flyers (nối với SGK Tiếng Anh 4)</small></h4>
        <div class="zone-grid">${classic.map((z, i) => zoneCardHTML(z, i, schoolLesson)).join('')}</div>
        ${custom.length ? `<h4 class="month-title"><span class="month-num">✏️</span>Custom Units<small class="vi">Bài học bố mẹ nhập theo SGK của con</small></h4>
        <div class="zone-grid">${custom.map((z, i) => zoneCardHTML(z, i, schoolLesson)).join('')}</div>` : ''}`;
    }

    screenEl.innerHTML = `<div class="screen-inner">
      <div class="card hero studs-top">
        <div>${LG.renderScene(st.avatar, { cls: 'hero-fig' })}</div>
        <div>
          <h2>${greet[0]}, ${esc(st.profile.name)}! 👋</h2>
          <p class="vi">${greet[1]}, ${esc(st.profile.name)}! Hôm nay mình học tiếng Anh và lắp LEGO nhé.</p>
          <p style="margin-top:8px;font-weight:800">🔥 ${S.streakDays()} day streak · 🧱 ${lessonsDone}/${CUR.totalLessons()} lessons · 🏆 ${ZONES.filter((z) => S.zoneProgress(z.id).complete).length}/${ZONES.length} sets · 🔤 ${S.learnedWordIds().filter((id) => WORDS[id]).length} words</p>
        </div>
        <div class="hero-actions">
          ${next ? `<button class="brick-btn btn-red" data-action="start-lesson" data-lesson="${next.id}">${bi('▶ Next lesson: ' + esc(next.title), 'Bài tiếp theo: ' + esc(next.titleVi))}</button>`
            : `<button class="brick-btn btn-green" data-action="go" data-screen="diorama">${bi('🏆 All lessons done!', 'Đã học hết – xem Sa bàn')}</button>`}
          <button class="brick-btn btn-red talk-btn" data-action="talk-time">${bi(`🎙️ Talk Time · ${Talk.doneCount()}/3`, 'Nhiệm vụ nói mỗi ngày – nói càng dài càng nhiều sao')}</button>
          <button class="brick-btn btn-orange" data-action="beat-review">${bi('🥁 Beat Talk', 'Nói từ vựng theo nhịp nhạc')}</button>
          ${talkMeterHTML()}
          ${(() => { const cs = checkStatus(); return cs.due ? `<button class="brick-btn btn-orange check-due" data-action="skill-check">${bi('📝 Skill Check is ready!', 'Bài kiểm tra kỹ năng đã sẵn sàng – làm thật để nhận thưởng theo điểm')}</button>` : ''; })()}
          <button class="brick-btn btn-purple" data-action="gym">${bi('🎧 Listening & Speaking Gym', `Luyện Nghe – Nói mỗi ngày (3 phút)${S.gymToday() ? ' · hôm nay: ' + S.gymToday() + ' lượt' : ''}${S.speakToday() ? ' · 🎤 đã nói ' + S.speakToday() + ' lần' : ''}${S.gymToday() < GYM_GOLD_PER_DAY ? ' · 🥇 còn ' + (GYM_GOLD_PER_DAY - S.gymToday()) + ' Gold' : ''}`)}</button>
          ${due ? `<button class="brick-btn btn-orange" data-action="review" data-zone="">${bi(`🔧 Tune-up time (${due})`, `Trạm bảo trì: ${due} từ cần ôn`)}</button>` : ''}
          ${(() => { const mz = ZONES.find((z) => mysteryOpen(z) && !(S.mystery(z.id) || {}).done); return mz ? `<button class="brick-btn btn-yellow" data-action="mystery" data-zone="${mz.id}">${bi('🕵️ Mystery Mission!', 'Nhiệm vụ thám tử: ' + esc(mz.short || mz.name))}</button>` : ''; })()}
          ${S.totalReadyParts() ? `<button class="brick-btn btn-blue" data-action="go" data-screen="workshop">${bi(`🧱 ${S.totalReadyParts()} parts to build`, 'Mảnh ghép đang chờ lắp')}</button>` : ''}
        </div>
      </div>
      ${stageTabsHTML()}
      ${stage === 'sgk' || book ? schoolPanelHTML() : ''}
      <h3 class="section-title">${info.icon} ${esc(info.en)} <span class="vi">${esc(info.vi)} – chạm vào Vùng đất để học</span></h3>
      ${grid}
    </div>`;
  }

  function openZone(zoneId) {
    const z = window.Curriculum.zone(zoneId);
    const m = LG.MODELS[zoneId];
    const prog = S.zoneProgress(zoneId);
    const due = zoneDueIds(zoneId).length;
    const mys = S.mystery(zoneId);
    const mOpen = mysteryOpen(z);
    openModal(`<div style="${zoneStyle(z)}">
      <div class="zone-sheet-head"><div class="zone-num">${zoneLabel(z, CUR.zonesOf(z.stage).indexOf(z))}</div>
        <div><h3>${esc(z.name)}</h3><span class="vi">${esc(z.vi)} · ${esc(z.topicVi)}</span></div></div>
      <p style="font-weight:800;margin-bottom:14px">🎁 ${esc(m.name)} <span class="vi">– ${esc(m.vi)} (${prog.assembled}/12 đã lắp)</span></p>
      <div class="lesson-list">
        ${z.lessons.map((l, i) => {
          const done = S.isLessonDone(l.id);
          const open = lessonUnlocked(z, i);
          const res = S.lesson(l.id);
          const cls = done ? 'done' : open ? 'next' : 'locked';
          return `<div class="lesson-row ${cls}">
            <div class="l-ico">${open ? l.icon : '🔒'}</div>
            <div><h4>Lesson ${i + 1}: ${esc(l.title)}</h4><span class="vi">Bài ${i + 1}: ${esc(l.titleVi)}</span>
              <div class="words-preview">${l.words.map((w) => esc(w.en)).join(' · ')}</div>
              ${done ? starsHTML(res.stars) : ''}</div>
            <div>${open
              ? `<button class="brick-btn ${done ? 'btn-white' : 'btn-red'} btn-sm" data-action="start-lesson" data-lesson="${l.id}">${bi(done ? '↻ Replay' : '▶ Start', done ? 'Học lại' : 'Bắt đầu')}</button>`
              : `<small class="vi">Học xong bài ${i} trước nhé</small>`}</div>
          </div>`;
        }).join('')}
        ${z.mystery ? `<div class="lesson-row mystery-row ${mys && mys.done ? 'done' : mOpen ? 'next' : 'locked'}">
            <div class="l-ico">${mOpen ? '🕵️' : '🔒'}</div>
            <div><h4>LEGO Mystery Mission: ${esc(z.mystery.title)}</h4><span class="vi">Nhiệm vụ thám tử: ${esc(z.mystery.titleVi)} – nghe 3 manh mối, giải câu đố!</span>
              ${mys && mys.done ? starsHTML(mys.stars) : ''}</div>
            <div>${mOpen
              ? `<button class="brick-btn ${mys && mys.done ? 'btn-white' : 'btn-purple'} btn-sm" data-action="mystery" data-zone="${z.id}">${bi(mys && mys.done ? '↻ Replay' : '🔍 Solve', mys && mys.done ? 'Chơi lại' : 'Phá án')}</button>`
              : `<small class="vi">Học xong ${z.lessons.length} bài để mở khóa</small>`}</div>
          </div>` : ''}
      </div>
      <div class="btn-row center" style="margin-top:18px">
        <button class="brick-btn btn-blue btn-sm" data-action="ws-open" data-zone="${z.id}">${bi('🧱 Workshop', 'Xưởng lắp ráp')}</button>
        ${due ? `<button class="brick-btn btn-orange btn-sm" data-action="review" data-zone="${z.id}">${bi(`🔧 Tune-up (${due})`, 'Bảo trì mô hình')}</button>` : ''}
      </div>
    </div>`);
  }

  /* =========================================================
     MÀN HÌNH 2: XƯỞNG LẮP RÁP
     ========================================================= */
  function renderWorkshop() {
    const zones = stageZones();
    if (!zones.length) {
      screenEl.innerHTML = `<div class="screen-inner"><div class="screen-head"><div><h2>🧱 Brick Workshop</h2><span class="vi">Xưởng lắp ráp</span></div></div>${stageTabsHTML()}${comingSoonHTML()}</div>`;
      return;
    }
    if (!zones.some((z) => z.id === App.wsZone)) App.wsZone = (zones.find((z) => S.zoneProgress(z.id).ready) || zones[0]).id;
    const zid = App.wsZone;
    const z = window.Curriculum.zone(zid);
    const m = LG.MODELS[zid];
    const prog = S.zoneProgress(zid);
    const next = z.lessons.find((l, i) => !S.isLessonDone(l.id) && lessonUnlocked(z, i));
    screenEl.innerHTML = `<div class="screen-inner">
      <div class="screen-head"><div><h2>🧱 Brick Workshop</h2><span class="vi">Xưởng lắp ráp – Sách hướng dẫn lắp từng bước (Building Instructions)</span></div></div>
      ${stageTabsHTML()}
      <div class="zone-chips">${zones.map((zz, i) => {
        const p = S.zoneProgress(zz.id);
        return `<button class="zone-chip${zz.id === zid ? ' active' : ''}" style="${zoneStyle(zz)}" data-action="ws-zone" data-zone="${zz.id}"><i></i>${zz.custom ? '✏️' : zoneLabel(zz, i) + '.'} ${esc(zz.short)} <span class="cnt">${p.assembled}/12${p.ready ? ' · 🧰' + p.ready : ''}</span></button>`;
      }).join('')}</div>
      <div class="ws-title"><div><h3>${esc(m.name)}</h3><span class="vi">${esc(m.vi)} · ${prog.assembled}/12 mảnh đã lắp</span></div>
        ${prog.complete ? '<span class="pill green">✅ Complete – Hoàn thành!</span>' : ''}</div>
      <div class="ws-layout">
        <div id="wsBench" class="ws-bench"></div>
        <div class="card ws-steps"><h4>📖 Building Steps <small class="vi" style="display:block;font-size:12px">Các bước lắp ráp</small></h4>
          <ol>${m.parts.map((p, i) => {
            const s = S.parts(zid)[i];
            const cls = s === 2 ? 'done' : s === 1 ? 'ready' : 'locked';
            return `<li class="${cls}"><span class="n">${s === 2 ? '✓' : s === 1 ? '🧰' : i + 1}</span><span>${esc(p.n)}<br><small class="vi">${s === 0 ? '🔒 Bài ' + partLessonNo(z, i) : esc(p.vi)}</small></span></li>`;
          }).join('')}</ol>
        </div>
      </div>
    </div>`;
    mountBench($('#wsBench'), {
      zoneId: zid,
      tray: () => S.parts(zid).map((s, i) => (s === 1 ? i : -1)).filter((i) => i >= 0),
      emptyHTML: prog.complete
        ? '✅ All parts built!<br><small>Đã lắp đủ 12 mảnh!</small>'
        : `No parts yet.<br><small>Học bài để nhận mảnh ghép!</small><br><br>${next ? `<button class="brick-btn btn-yellow btn-sm" data-action="start-lesson" data-lesson="${next.id}">${bi('▶ ' + esc(next.title), 'Học ngay')}</button>` : ''}`,
      onAssembled: () => { updateWallet(); setTimeout(() => { if (App.screen === 'workshop' && !S.zoneProgress(zid).complete) refreshStepsOnly(); }, 50); },
      onComplete: () => { celebrateSet(zid); renderWorkshop(); }
    });
  }
  function refreshStepsOnly() {
    const zid = App.wsZone, m = LG.MODELS[zid], z = zoneById(zid);
    const ol = $('.ws-steps ol');
    if (!ol) return;
    ol.innerHTML = m.parts.map((p, i) => {
      const s = S.parts(zid)[i];
      const cls = s === 2 ? 'done' : s === 1 ? 'ready' : 'locked';
      return `<li class="${cls}"><span class="n">${s === 2 ? '✓' : s === 1 ? '🧰' : i + 1}</span><span>${esc(p.n)}<br><small class="vi">${s === 0 ? '🔒 Bài ' + partLessonNo(z, i) : esc(p.vi)}</small></span></li>`;
    }).join('');
    $$('.zone-chip').forEach((c) => {
      const p = S.zoneProgress(c.dataset.zone);
      const cnt = $('.cnt', c);
      if (cnt) cnt.textContent = `${p.assembled}/12${p.ready ? ' · 🧰' + p.ready : ''}`;
    });
  }

  /* =========================================================
     MÀN HÌNH 3: SA BÀN THẾ GIỚI
     ========================================================= */
  function renderDiorama() {
    const states = {}, dusty = {};
    ZONES.forEach((z) => { states[z.id] = S.parts(z.id); dusty[z.id] = zoneDueIds(z.id).length > 0; });
    const built = ZONES.filter((z) => S.zoneProgress(z.id).complete).length;
    const dueTotal = S.dueWordIds().filter((id) => WORDS[id]).length;
    const zones = stageZones();
    screenEl.innerHTML = `<div class="screen-inner">
      <div class="screen-head"><div><h2>🏙️ My LEGO World</h2><span class="vi">Sa bàn Thế giới LEGO của bé – chạm vào mô hình hoặc nhân vật để nghe nói chuyện!</span></div>
        <div class="btn-row"><span class="pill green">🏆 ${built}/${ZONES.length} sets</span><span class="pill yellow">🥇 ${S.state.goldBricks} Gold</span></div></div>
      ${dueTotal ? `<div class="card studs-top" style="--stud-c:#FFEDD5;background:#FFF7ED;box-shadow:0 6px 0 #FED7AA;margin-bottom:18px;display:flex;align-items:center;gap:14px;flex-wrap:wrap">
          <span style="font-size:36px">🔧</span><div style="flex:1;min-width:200px"><b class="en" style="font-size:20px">Some models are dusty!</b><br><span class="vi">Có ${dueTotal} từ đến hạn ôn (1-3-7-14-30 ngày). Chạm vào mô hình có cờ lê 🔧 để siết ốc, lau bụi và nhận Gạch Vàng!</span></div>
          <button class="brick-btn btn-orange" data-action="review" data-zone="">${bi('🔧 Fix all', 'Bảo trì ngay')}</button></div>` : ''}
      ${stageTabsHTML()}
      ${zones.length ? `<div class="dio-wrap" id="dioWrap">${LG.renderDiorama({ zones: zones.slice(0, 14), states, dusty, avatar: S.state.avatar, name: S.state.profile.name })}</div>` : comingSoonHTML()}
      <div class="dio-legend">${zones.map((z) => {
        const p = S.zoneProgress(z.id), d = zoneDueIds(z.id).length;
        return `<div class="card item" style="${zoneStyle(z)}"><span class="dot"></span><div style="flex:1"><b>${esc(z.short)}</b><small>${p.complete ? '✅ Complete' : `🧱 ${p.assembled}/12 built`}${d ? ` · 🔧 ${d} due` : ''}</small></div>
          ${d ? `<button class="brick-btn btn-orange btn-sm" data-action="review" data-zone="${z.id}">🔧</button>` : p.ready ? `<button class="brick-btn btn-blue btn-sm" data-action="ws-open" data-zone="${z.id}">🧱</button>` : ''}</div>`;
      }).join('')}</div>
    </div>`;

    const wrap = $('#dioWrap');
    if (!wrap) return;
    wrap.addEventListener('click', (e) => {
      const fig = e.target.closest('.dio-fig');
      if (fig) {
        bounceEl(fig);
        const line = [`Hi! I'm ${S.state.profile.name}. Let's build!`, `Xin chào! Mình là ${S.state.profile.name}. Cùng xây nào!`];
        showDioBubble(fig, line[0], line[1]);
        Speech.speak(line[0], { pitch: 1.15 });
        return;
      }
      const mdl = e.target.closest('.dio-model');
      if (!mdl) return;
      const zid = mdl.dataset.zone;
      const z = window.Curriculum.zone(zid);
      const prog = S.zoneProgress(zid);
      if (prog.assembled === 0) {
        showDioBubble(mdl, 'Coming soon! Learn to build me!', `Học bài ở vùng ${z.short} để xây mô hình này nhé!`);
        Speech.speak('Coming soon! Learn to build me!');
        return;
      }
      if (zoneDueIds(zid).length) {
        Sfx.playGentleOops();
        confirmModal({ en: '🔧 This model needs a tune-up!', vi: 'Mô hình cần siết ốc & lau bụi!', text: `Trả lời nhanh 5 câu ôn tập (1–2 phút) để <b>${esc(LG.MODELS[zid].name)}</b> sáng bóng trở lại và nhận <b>Gạch Vàng</b>!`, ok: 'Fix it!', okVi: 'Sửa ngay', okClass: 'btn-orange' })
          .then((ok) => { if (ok) Review.start(zid); });
        return;
      }
      bounceEl(mdl);
      const pool = z.chatter.slice();
      learnedInZone(zid).forEach((id) => pool.push([WORDS[id].ex, WORDS[id].exVi]));
      const line = pick(pool);
      showDioBubble(mdl, line[0], line[1]);
      Speech.speak(line[0], { pitch: 0.9 + Math.random() * 0.35 });
    });
  }

  function bounceEl(el) {
    el.classList.remove('bounce');
    void el.getBoundingClientRect();
    el.classList.add('bounce');
    Sfx.playBrickClick();
    setTimeout(() => el.classList.remove('bounce'), 800);
  }

  function showDioBubble(target, en, vi) {
    const wrap = $('#dioWrap');
    if (!wrap) return;
    $$('.dio-bubble', wrap).forEach((b) => b.remove());
    const wr = wrap.getBoundingClientRect();
    const tr = target.getBoundingClientRect();
    const b = document.createElement('div');
    b.className = 'dio-bubble';
    b.innerHTML = `${esc(en)}<small>${esc(vi)}</small>`;
    let left = tr.left - wr.left + tr.width / 2;
    left = Math.max(120, Math.min(wr.width - 120, left));
    b.style.left = left + 'px';
    b.style.top = Math.max(70, tr.top - wr.top + 26) + 'px';
    wrap.appendChild(b);
    setTimeout(() => b.remove(), 3600);
  }

  /* =========================================================
     MÀN HÌNH 4: TỦ ĐỒ MINIFIGURE
     ========================================================= */
  const CATS = [
    { key: 'hat', en: 'Hats & Hair', vi: 'Mũ & Tóc' },
    { key: 'face', en: 'Faces', vi: 'Khuôn mặt' },
    { key: 'torso', en: 'Outfits', vi: 'Trang phục' },
    { key: 'legs', en: 'Legs', vi: 'Quần' },
    { key: 'acc', en: 'Accessories', vi: 'Phụ kiện' },
    { key: 'pet', en: '🐶 Pets', vi: 'Thú cưng' },
    { key: 'ride', en: '🛹 Rides', vi: 'Xe' },
    { key: 'buddy', en: '🧑‍🤝‍🧑 Buddies', vi: 'Bạn đồng hành' },
    { key: 'scene', en: '🏞️ Scenes', vi: 'Phông nền' }
  ];
  const priceHTML = (it) => it.gold ? `<i class="gold-icon"></i>${it.gold}` : `<i class="stud-icon"></i>${it.price}`;
  const canAfford = (it) => it.gold ? S.state.goldBricks >= it.gold : S.state.studs >= it.price;

  function renderLocker() {
    const st = S.state;
    if (LG.finalizeShop) LG.finalizeShop();
    if (!LG.ITEMS[App.lockerCat]) App.lockerCat = 'hat';
    const cat = App.lockerCat;
    const owns = (id) => S.owns(id);
    // Tầng sau ẩn ❓ cho tới khi mở; đồ bí mật 🎁 mở bằng Hành trình nói
    const items = LG.ITEMS[cat].map((it) => Object.assign({ gate: LG.shopGate ? LG.shopGate(cat, it, owns) : { visible: true } }, it))
      // Sắp xếp: món đã mở theo giá tăng dần → món ❓ tầng sau → 🎁 bí mật (theo mốc phút nói)
      .sort((a, b) => {
        const ka = a.secret && !owns(a.id) ? 3 : !a.gate.visible ? 2 : 1, kb = b.secret && !owns(b.id) ? 3 : !b.gate.visible ? 2 : 1;
        if (ka !== kb) return ka - kb;
        if (ka === 3) return a.milestone - b.milestone;
        return (a.tierNum || 0) - (b.tierNum || 0) || ((a.price || 0) + (a.gold || 0) * 200) - ((b.price || 0) + (b.gold || 0) * 200);
      });
    const allItems = [].concat(...Object.values(LG.ITEMS));
    const hiddenN = items.filter((it) => !it.secret && !it.gate.visible).length;
    screenEl.innerHTML = `<div class="screen-inner">
      <div class="screen-head"><div><h2>🧑‍🚀 Minifigure Locker</h2><span class="vi">Cửa hàng & Tủ đồ – dùng LEGO Studs kiếm được khi học để mua trang phục, thú cưng, xe và bạn đồng hành! Đồ ⭐ Huyền thoại mua bằng 🥇 Gold.</span></div>
        <div class="btn-row"><span class="chip" style="box-shadow:0 4px 0 var(--card-edge)"><i class="stud-icon"></i><b>${st.studs}</b><small>Studs</small></span>
        <span class="chip" style="box-shadow:0 4px 0 var(--card-edge)"><i class="gold-icon"></i><b>${st.goldBricks}</b><small>Gold</small></span></div></div>
      <div class="locker">
        <div class="card fig-stage studs-top">
          <div id="bigFig">${LG.renderScene(st.avatar, { cls: 'fig-big' })}</div>
          <div class="collection-bar">🏆 Bộ sưu tập: <b>${allItems.filter((it) => (it.price || it.gold || it.secret) && S.owns(it.id)).length}</b> / ${allItems.filter((it) => it.price || it.gold || it.secret).length} món</div>
          <div class="name-tag">${esc(st.profile.name)}</div>
          <div class="btn-row center">
            <button class="brick-btn btn-blue btn-sm" data-action="fig-hello">${bi('👋 Say hi', 'Chào bạn')}</button>
            <button class="brick-btn btn-yellow btn-sm" data-action="fig-random">${bi('🎲 Random', 'Ngẫu nhiên')}</button>
          </div>
          <small class="vi">Tên nhân vật đổi trong Góc Bố Mẹ.</small>
        </div>
        <div>
          <div class="cat-tabs">${CATS.map((c) => `<button class="cat-tab${c.key === cat ? ' active' : ''}" data-action="locker-cat" data-cat="${c.key}">${c.en}<small>${c.vi}</small></button>`).join('')}</div>
          ${hiddenN ? `<p class="vi locker-tip">❓ Còn ${hiddenN} món bí ẩn ở nhóm này – mua đồ ở tầng thấp để mở tầng tiếp theo! 🎁 Đồ bí mật mở bằng cách NÓI tiếng Anh thật nhiều.</p>` : ''}
          <div class="item-grid">${items.map((it) => {
            const owned = S.owns(it.id);
            if (it.secret && !owned) {
              return `<button class="item mystery secret" data-action="locker-mystery" data-id="${it.id}"><span class="tier-badge" style="--tc:#DB2777">🎁 Bí mật</span>
                <div class="mystery-q">🎁</div><b>Secret item</b><small>Nói tiếng Anh tổng cộng ${it.milestone} phút để mở</small>
                <span class="price">🎤 ${Math.min(it.milestone, S.talkMinTotal()).toFixed(1)}/${it.milestone} phút</span></button>`;
            }
            if (!it.gate.visible) {
              return `<button class="item mystery" data-action="locker-mystery" data-id="${it.id}"><span class="tier-badge" style="--tc:#475569">❓ Tầng ${it.tierNum}</span>
                <div class="mystery-q">❓</div><b>Mystery item</b><small>Mua thêm ${it.gate.need} món ${LG.TIERS[['', 'common', 'rare', 'epic', 'legendary'][it.gate.prevTier]].vi.toLowerCase()} để mở</small>
                <span class="price">🔒</span></button>`;
            }
            const equipped = st.avatar[cat] === it.id;
            const cfg = Object.assign({}, st.avatar, { [cat]: it.id });
            const cant = !owned && !canAfford(it);
            const tier = LG.TIERS[it.tier || 'common'];
            const solo = cat === 'pet' || cat === 'ride' || cat === 'buddy' || cat === 'scene';
            return `<button class="item tier-${it.tier || 'common'}${owned ? ' owned' : ''}${equipped ? ' equipped' : ''}${cant ? ' cant' : ''}" data-action="locker-item" data-id="${it.id}">
              ${it.price || it.gold ? `<span class="tier-badge" style="--tc:${tier.color}">${it.tier === 'legendary' ? '⭐ ' : ''}${tier.vi}</span>` : ''}
              ${solo ? LG.renderItemPreview(cat, it.id) : LG.renderMinifig(cfg)}
              <b>${esc(it.en)}</b><small>${esc(it.vi)}</small>
              <span class="price">${equipped ? '✓ Using' : owned ? 'Owned' : priceHTML(it)}</span>
            </button>`;
          }).join('')}</div>
        </div>
      </div>
    </div>`;
  }

  async function lockerItem(id) {
    const cat = App.lockerCat;
    const it = LG.ITEMS[cat].find((x) => x.id === id);
    if (!it) return;
    if (S.owns(id)) {
      S.equip(cat, id);
      Sfx.playBrickClick();
      renderLocker(); updateWallet();
      const f = $('#bigFig .fig-big'); if (f) { f.classList.add('cheer'); }
      return;
    }
    if (!canAfford(it)) {
      Sfx.playGentleOops();
      if (it.gold) toast(`You need ${it.gold - S.state.goldBricks} more Gold!`, `Cần thêm ${it.gold - S.state.goldBricks} 🥇 Gold – nói tiếng Anh thật tốt và đạt 3 sao để nhận Gold nhé!`, 'warm');
      else toast(`You need ${it.price - S.state.studs} more studs!`, `Cần thêm ${it.price - S.state.studs} nút xu – học bài để kiếm thêm nhé!`, 'warm');
      return;
    }
    const priceTxt = it.gold ? `<b>${it.gold}</b> 🥇 Gold Brick (con đang có ${S.state.goldBricks})` : `<b>${it.price}</b> LEGO Studs (con đang có ${S.state.studs})`;
    const ok = await confirmModal({ en: `Unlock ${it.en}?`, vi: `Mở khóa "${it.vi}"?`, text: `<div style="display:flex;justify-content:center">${LG.renderScene(Object.assign({}, S.state.avatar, { [cat]: id }), { cls: 'fig-confirm' })}</div><p style="text-align:center">Giá: ${priceTxt}</p>`, ok: 'Unlock!', okVi: 'Mở khóa' });
    if (!ok) return;
    if (it.gold ? S.buyWithGold(id, it.gold) : S.buy(id, it.price)) {
      S.equip(cat, id);
      Sfx.playStudCollect(3);
      fx.confetti(30);
      toast(`New ${it.en}!`, `Đã mở khóa: ${it.vi}`, 'good');
      updateWallet(); renderLocker();
    }
  }

  /* =========================================================
     MÀN HÌNH: HỘ CHIẾU LEGO (My Passport)
     Gạch từ vựng đổi chất liệu theo hộp SRS: Nhựa → Bạc → Vàng → Kim Cương; con dấu khi hoàn thành Vùng đất
     ========================================================= */
  function renderPassport() {
    const st = S.state;
    const f = App.ppFilter || 'all';
    const learned = S.learnedWordIds().filter((id) => WORDS[id]);
    const counts = { plastic: 0, silver: 0, gold: 0, diamond: 0 };
    learned.forEach((id) => { counts[S.wordTier(id)]++; });
    const stamps = ZONES.filter((z) => zoneDone(z)).length;
    const detectives = ZONES.filter((z) => (S.mystery(z.id) || {}).done).length;
    const supers = Object.values(st.snow).filter((v) => v >= 3).length;
    const passNo = 'LEB-' + String(st.createdAt || 0).slice(-6);

    const zones = stageZones();
    const stampHTML = zones.map((z, zi) => {
      const done = zoneDone(z);
      const doneL = z.lessons.filter((l) => S.isLessonDone(l.id)).length;
      const mys = (S.mystery(z.id) || {}).done;
      const sup = z.lessons.filter((l) => S.snowLevel(l.id) >= 3).length;
      return `<button class="stamp${done ? ' inked' : ''}" style="${zoneStyle(z)};--rot:${((zi * 7) % 11) - 5}deg" data-action="open-zone" data-zone="${z.id}" aria-label="${esc(z.name)}">
        <span class="stamp-ring">
          <span class="stamp-ico">${z.icon}</span>
          <b>${esc(z.short || z.name)}</b>
          <small>${done ? '★ COMPLETE ★' : `${doneL}/${z.lessons.length} lessons`}</small>
        </span>
        ${mys ? '<span class="stamp-badge det" title="Mystery solved">🕵️</span>' : ''}
        ${sup ? `<span class="stamp-badge sup" title="Super Builder">⭐${sup}</span>` : ''}
      </button>`;
    }).join('');

    const zonesHTML = zones.map((z) => {
      const words = [];
      z.lessons.forEach((l) => l.words.forEach((w) => words.push(w)));
      const got = words.filter((w) => S.wordBox(w.id) > 0);
      const shown = f === 'all' ? words : got.filter((w) => S.wordTier(w.id) === f);
      if (f !== 'all' && !shown.length) return '';
      if (f === 'all' && !got.length) {
        return `<div class="pp-zone" style="${zoneStyle(z)}"><h4><i></i>${esc(z.short || z.name)} <small>0/${words.length}</small></h4>
          <div class="pp-empty">🔒 ${words.length} viên gạch đang chờ – học bài ở vùng này để sưu tầm!</div></div>`;
      }
      return `<div class="pp-zone" style="${zoneStyle(z)}"><h4><i></i>${esc(z.short || z.name)} <small>${got.length}/${words.length}</small></h4>
        <div class="pp-bricks">${shown.map((w) => {
          const t = S.wordTier(w.id);
          if (t === 'none') return '<span class="pp-brick locked" aria-hidden="true">?</span>';
          return `<button class="pp-brick tier-${t}" style="${roleVars(G.wordRole(w), 'bc')}" data-action="pp-word" data-id="${w.id}"><span class="e">${w.emoji}</span>${esc(w.en)}</button>`;
        }).join('')}</div></div>`;
    }).join('');

    screenEl.innerHTML = `<div class="screen-inner">
      <div class="screen-head"><div><h2>🛂 My LEGO Passport</h2><span class="vi">Hộ chiếu Thợ xây – bộ sưu tập gạch từ vựng & con dấu các Vùng đất</span></div></div>
      <div class="card passport-cover studs-top">
        <div class="pp-photo">${LG.renderScene(st.avatar, { cls: 'pp-fig' })}</div>
        <div class="pp-info">
          <div class="pp-kicker">LEGO BUILDER PASSPORT · HỘ CHIẾU THỢ XÂY</div>
          <h3>${esc(st.profile.name)}</h3>
          <div class="pp-meta"><span>No. <b>${passNo}</b></span><span>🔤 <b>${learned.length}</b>/${CUR.totalWords()} bricks</span><span>🏅 <b>${stamps}</b>/${ZONES.length} stamps</span><span>🕵️ <b>${detectives}</b> mysteries</span><span>⭐ <b>${supers}</b> super builds</span></div>
          <div class="pp-mrz">P&lt;LEGO&lt;${esc(String(st.profile.name).toUpperCase().replace(/[^A-Z0-9]/g, '<'))}&lt;&lt;${passNo.replace('-', '')}&lt;&lt;&lt;</div>
        </div>
      </div>

      ${stageTabsHTML()}
      <h3 class="section-title">🏅 Zone Stamps <span class="vi">Con dấu Vùng đất – học xong cả vùng để đóng dấu; 🕵️ = đã phá án Mystery, ⭐ = câu Super Builder</span></h3>
      <div class="stamp-grid">${stampHTML || comingSoonHTML()}</div>

      <h3 class="section-title">🧱 Brick Collection <span class="vi">Ôn đúng lịch ở Trạm bảo trì 🔧 để nâng cấp gạch: Nhựa → Bạc → Vàng → Kim Cương</span></h3>
      <div class="tier-bar">
        <button class="tier-chip${f === 'all' ? ' active' : ''}" data-action="pp-filter" data-f="all">🧱 All<small>${learned.length}</small></button>
        ${Object.keys(TIERS).map((k) => `<button class="tier-chip tier-${k}${f === k ? ' active' : ''}" data-action="pp-filter" data-f="${k}"><i></i>${TIERS[k].en}<small>${TIERS[k].vi} · ${TIERS[k].box} · ${counts[k]}</small></button>`).join('')}
      </div>
      ${G.legendHTML({ compact: true })}
      <div class="pp-zones">${zonesHTML || '<div class="card empty-note">Chưa có viên gạch nào ở cấp này – hãy ôn tập để nâng cấp nhé!</div>'}</div>
    </div>`;
  }

  function passportWord(id) {
    const w = WORDS[id];
    if (!w) return;
    const t = S.wordTier(id), box = S.wordBox(id);
    const rec = S.word(id) || {};
    const next = rec.due ? new Date(rec.due).toLocaleDateString('vi-VN', { day: '2-digit', month: '2-digit' }) : '';
    Speech.speak(w.en.replace(/\.\.\.|…/g, ''));
    toast(`${w.emoji} ${w.en} = ${w.vi}`, `${TIERS[t] ? TIERS[t].vi : ''} · Hộp ${box}/5${next ? ' · ôn lại ' + next : ''}`, 'good');
  }

  /* =========================================================
     MÀN HÌNH 5: GÓC BỐ MẸ
     ========================================================= */
  function newGate() {
    const a = 12 + Math.floor(Math.random() * 8), b = 3 + Math.floor(Math.random() * 7), c = 5 + Math.floor(Math.random() * 16);
    App.gate = { q: `${a} × ${b} − ${c} = ?`, ans: a * b - c, input: '' };
  }

  async function fillCheckHistory() {
    const box = $('#checkHistory');
    if (!box) return;
    const checks = S.state.checks.slice().reverse();
    if (!checks.length) { box.innerHTML = `<p class="vi">Chưa có bài kiểm tra nào. ${checkStatus().ready ? 'Bé có thể làm bài đầu tiên ngay.' : 'Bài đầu tiên mở sau khi bé học xong 3 bài.'}</p>`; return; }
    const clips = await VoiceBook.list();
    const fmt = (d) => new Date(d).toLocaleDateString('vi-VN', { day: '2-digit', month: '2-digit' });
    const cell = (v) => (typeof v === 'number' ? `<b style="color:${v >= 80 ? '#15803D' : v >= 60 ? '#B45309' : '#B91C1C'}">${v}%</b>` : '—');
    box.innerHTML = `<div style="overflow-x:auto"><table class="map-table"><thead><tr><th>Ngày</th><th>Cấp</th>${Object.keys(SKILLS).map((k) => `<th>${SKILLS[k][0]} ${SKILLS[k][1]}</th>`).join('')}<th>Tổng</th></tr></thead><tbody>
      ${checks.slice(0, 12).map((c) => `<tr><td>${fmt(c.date)}${c.rewarded ? '' : ' <small class="vi">(làm thêm)</small>'}</td><td>${c.level || 1}</td>${Object.keys(SKILLS).map((k) => `<td>${k === 'speak' && c.speakPending && !Object.keys(c.speakGrades || {}).length ? '⏳ chờ chấm' : cell(c.scores[k])}</td>`).join('')}<td>${cell(checkPct(c))}</td></tr>`).join('')}
    </tbody></table></div>
    ${checks.filter((c) => c.speakPending).slice(0, 3).map((c) => {
      const cl = clips.filter((x) => x.checkId === c.id);
      if (!cl.length) return '';
      return `<div class="card grade-box"><b>🎤 Chấm phần Nói – bài ngày ${fmt(c.date)}</b><span class="vi">Nghe con trả lời; 👍 nếu con trả lời đúng ý câu hỏi bằng câu tiếng Anh dễ hiểu (không cần hoàn hảo).</span>
        ${cl.map((x) => { const g = (c.speakGrades || {})[x.id]; return `<div class="vb-row"><button class="brick-btn btn-blue btn-round btn-sm" data-action="vb-play" data-id="${x.id}">▶</button><div class="grow">“${esc(x.text)}”</div>
          <button class="brick-btn btn-sm ${g === true ? 'btn-green' : 'btn-white'}" data-action="grade-speak" data-check="${c.id}" data-clip="${x.id}" data-v="1">👍</button>
          <button class="brick-btn btn-sm ${g === false ? 'btn-orange' : 'btn-white'}" data-action="grade-speak" data-check="${c.id}" data-clip="${x.id}" data-v="0">👎</button></div>`; }).join('')}</div>`;
    }).join('')}`;
  }

  async function fillVoiceBook() {
    const box = $('#voiceBook');
    if (!box) return;
    const clips = await VoiceBook.list();
    if (!clips.length) { box.innerHTML = '<p class="vi">Chưa có bản ghi nào. Khi con trả lời câu hỏi bằng giọng nói trong bài học, Gym hoặc đọc câu Snowball tầng 3, app sẽ lưu lại ở đây (tối đa 120 bản ghi, chỉ trên thiết bị này).</p>'; return; }
    const fmt = (d) => new Date(d).toLocaleDateString('vi-VN', { weekday: 'short', day: '2-digit', month: '2-digit' });
    const oldest = clips[clips.length - 1], newest = clips[0];
    box.innerHTML = `${clips.length >= 2 ? `<div class="btn-row" style="margin-bottom:10px"><button class="brick-btn btn-purple btn-sm" data-action="vb-compare" data-a="${oldest.id}" data-b="${newest.id}">${bi('🆚 First vs Latest', `So sánh bản đầu (${fmt(oldest.date)}) và mới nhất (${fmt(newest.date)})`)}</button></div>` : ''}
      <div class="vb-list">${clips.slice(0, 40).map((c) => `<div class="vb-row">
        <button class="brick-btn btn-blue btn-round btn-sm" data-action="vb-play" data-id="${c.id}" aria-label="Play">▶</button>
        <div><b>${esc(c.title || '')}</b> <small class="vi">${fmt(c.date)} · ${c.kind === 'gym' ? '🎧 Gym' : c.kind === 'sentence' ? '⛄ Câu Snowball' : '🎙️ Trả lời câu hỏi'}</small><div class="vi">“${esc(c.text || '')}”</div></div>
      </div>`).join('')}</div>
      <p class="vi" style="margin-top:8px">Lưu trên thiết bị này, ${clips.length} bản ghi. <button class="btn-mini-text" data-action="vb-clear">🗑️ Xóa sổ giọng nói</button></p>`;
  }

  function renderParent() {
    if (!App.parentOk) {
      if (!App.gate) newGate();
      screenEl.innerHTML = `<div class="screen-inner"><div class="card gate studs-top">
        <h2>🔒 Parent Gate</h2><span class="vi">Góc Bố Mẹ – vui lòng giải phép tính để vào</span>
        <div class="q">${App.gate.q}</div>
        <input class="gate-input" id="gateInput" readonly inputmode="none" value="${esc(App.gate.input)}" aria-label="Answer">
        <div class="keypad">${[1, 2, 3, 4, 5, 6, 7, 8, 9].map((k) => `<button class="brick-btn btn-white" data-action="gate-key" data-k="${k}">${k}</button>`).join('')}
          <button class="brick-btn btn-gray" data-action="gate-key" data-k="del">⌫</button>
          <button class="brick-btn btn-white" data-action="gate-key" data-k="0">0</button>
          <button class="brick-btn btn-green" data-action="gate-key" data-k="ok">OK</button></div>
        <small class="vi">Câu hỏi đổi mỗi lần để bé không vào nhầm.</small>
      </div></div>`;
      return;
    }
    const st = S.state;
    const days = S.lastDays(7);
    const maxSec = Math.max(300, ...days.map((d) => d.seconds));
    const todayMin = Math.round((st.daily[S.todayKey()] || 0) / 60);
    // Tách "từ vựng" (từ đơn / cụm ≤ 2 từ, không phải câu giao tiếp) và "mẫu câu" để không phóng đại số từ
    const isVocab = (w) => w && w.pos !== 'phrase' && w.en.trim().split(/\s+/).length <= 2 && !/[?!.]$/.test(w.en.trim());
    const learnedW = S.learnedWordIds().filter((id) => isVocab(WORDS[id])).length;
    const learned = S.learnedWordIds().filter((id) => WORDS[id]).length, mastered = S.masteredWordIds().filter((id) => WORDS[id]).length;
    const mistakes = S.topMistakes(15);
    const upcoming = S.upcoming(7);
    const dueNow = S.dueWordIds().filter((id) => WORDS[id]).length;
    const book = st.settings.book;
    const fmtDate = (k) => { const [y, m, d] = k.split('-').map(Number); return new Date(y, m - 1, d).toLocaleDateString('vi-VN', { weekday: 'short', day: '2-digit', month: '2-digit' }); };

    screenEl.innerHTML = `<div class="screen-inner">
      <div class="screen-head"><div><h2>👨‍👩‍👧 Parent Corner</h2><span class="vi">Góc Bố Mẹ – thống kê, lịch ôn tập, cài đặt & sao lưu dữ liệu (lưu 100% trên thiết bị)</span></div>
        <button class="brick-btn btn-gray btn-sm" data-action="parent-lock">${bi('🔒 Lock', 'Khóa lại')}</button></div>

      <div class="stats-grid">
        <div class="card stat"><b>${todayMin}</b><span>Hôm nay (phút)</span><small>Today's minutes</small></div>
        <div class="card stat"><b>${Math.round(S.totalSeconds() / 60)}</b><span>Tổng thời gian (phút)</span><small>Total minutes</small></div>
        <div class="card stat"><b>${learnedW}</b><span>Từ vựng đã học</span><small>Single words · + ${learned - learnedW} mẫu câu / cụm giao tiếp</small></div>
        <div class="card stat"><b>${mastered}</b><span>Từ đã thuộc</span><small>Đã qua mốc ôn 7 ngày</small></div>
        <div class="card stat"><b>${S.lessonsDoneCount()}/${CUR.totalLessons()}</b><span>Bài học xong</span><small>Lessons completed</small></div>
        <div class="card stat"><b>${ZONES.filter((z) => S.zoneProgress(z.id).complete).length}/${ZONES.length}</b><span>Mô hình hoàn thành</span><small>LEGO sets built</small></div>
        <div class="card stat"><b>${ZONES.filter((z) => (S.mystery(z.id) || {}).done).length}/${ZONES.filter((z) => z.mystery).length}</b><span>Mystery đã giải</span><small>Detective missions</small></div>
        <div class="card stat"><b>${Object.values(S.state.snow).filter((v) => v >= 3).length}</b><span>Câu Super Builder</span><small>Snowball Level 3</small></div>
        <div class="card stat"><b>🎤 ${S.speakToday()}</b><span>Lần nói hôm nay</span><small>Tổng: ${S.speakTotal()} lần con đã nói tiếng Anh</small></div>
      </div>

      <h3 class="section-title">📈 Cấp độ & Kiểm tra kỹ năng <span class="vi">Skill level & Skill Checks – đo tiến bộ thật, không chỉ đếm bài đã xong</span></h3>
      <div class="card">
        <div class="setting-row"><label>Cấp độ học hiện tại: ${levelChipHTML()}<small>Tự động: 5 bài gần nhất đúng ≥ 85% và ≥ 60% câu tự nói (không gợi ý) → lên cấp; dưới 55% → xuống cấp. Cấp 1: ngưỡng mảnh ghép 60%, hiện câu mẫu sẵn · Cấp 2: 65%, câu mẫu sau 1 gợi ý · Cấp 3: 70%, tự nói trước.</small></label>
          <select class="select-lg" data-change="skillLevel">${['auto', 1, 2, 3].map((v) => `<option value="${v}"${(v === 'auto' ? S.state.skill.auto !== false : S.state.skill.auto === false && S.skillLevel() === v) ? ' selected' : ''}>${v === 'auto' ? '🤖 Tự động' : `${LEVELS[v].icon} Cấp ${v} – ${LEVELS[v].vi}`}</option>`).join('')}</select></div>
        ${S.state.skill.recent.length ? `<p class="vi">5 bài gần nhất: đúng trung bình <b>${Math.round(S.state.skill.recent.slice(-5).reduce((a, r) => a + r.acc, 0) / Math.min(5, S.state.skill.recent.length) * 100)}%</b> · tự nói không cần gợi ý <b>${Math.round(S.state.skill.recent.slice(-5).reduce((a, r) => a + (r.free || 0), 0) / Math.min(5, S.state.skill.recent.length) * 100)}%</b></p>` : ''}
        <div class="btn-row"><button class="brick-btn btn-orange btn-sm" data-action="skill-check">${bi('📝 Start a Skill Check', checkStatus().due ? 'Đến hạn kiểm tra – có thưởng theo điểm' : 'Làm thêm (không tính thưởng)')}</button></div>
        <div id="checkHistory"></div>
      </div>

      <h3 class="section-title">🎙️ Sổ giọng nói <span class="vi">Voice Notebook – nghe lại giọng con theo từng bài để thấy tiến bộ</span></h3>
      <div class="card" id="voiceBook"><p class="vi">Đang tải…</p></div>

      <h3 class="section-title">⏱️ Số phút học 7 ngày qua <span class="vi">Minutes per day</span></h3>
      <div class="card"><div class="bars">${days.map((d, i) => `<div class="bar-col${i === 6 ? ' today' : ''}"><span>${Math.round(d.seconds / 60)}</span><div class="bar" style="height:${Math.max(3, (d.seconds / maxSec) * 120)}px"></div><small>${d.date.toLocaleDateString('vi-VN', { weekday: 'short' })}</small></div>`).join('')}</div></div>

      <h3 class="section-title">🎤 Số giây NÓI tiếng Anh 7 ngày qua <span class="vi">Đo bằng giọng nói thật của con (không tính bấm chọn) · mục tiêu hiện tại ${talkGoalSec()} giây/ngày · tổng ${S.talkMinTotal().toFixed(1)} phút · 🔥 ${S.talkStreak()} ngày liên tiếp</span></h3>
      <div class="card"><div class="bars">${(() => { const tdays = days.map((d) => ({ date: d.date, sec: S.talkSecOn(d.key || S.todayKey(d.date)) })); const mx = Math.max(talkGoalSec(), ...tdays.map((d) => d.sec)); return tdays.map((d, i) => `<div class="bar-col${i === 6 ? ' today' : ''}"><span>${d.sec}</span><div class="bar talk${d.sec >= talkGoalSec() ? ' goal' : ''}" style="height:${Math.max(3, (d.sec / mx) * 120)}px"></div><small>${d.date.toLocaleDateString('vi-VN', { weekday: 'short' })}</small></div>`).join(''); })()}</div></div>

      <div class="p-grid" style="margin-top:22px">
        <div class="card p-section"><h3>🧩 Từ/mẫu câu bé hay nhầm</h3><span class="vi">Frequent mistakes – bấm 🔊 để nghe lại cùng bé</span>
          <div class="list-rows">${mistakes.length ? mistakes.map((m) => `<div class="row-item"><div class="grow">${esc(m.text)}<small>${esc(m.vi)}</small></div><span class="cnt">×${m.count}</span><button class="btn-mini" data-action="say-text" data-text="${esc(m.text)}">🔊</button></div>`).join('') : '<div class="empty-note">Chưa có lỗi nào – tuyệt vời! 🎉</div>'}</div>
          ${mistakes.length ? `<div style="margin-top:12px"><button class="brick-btn btn-gray btn-sm" data-action="clear-mistakes">${bi('Clear list', 'Xóa danh sách')}</button></div>` : ''}
        </div>
        <div class="card p-section"><h3>📅 Lịch nhắc ôn (SRS 1-3-7-14-30)</h3><span class="vi">Đến hạn hôm nay: <b>${dueNow}</b> từ · Bé ôn tại Trạm bảo trì 🔧 trên Sa bàn</span>
          <div class="list-rows">${Object.keys(upcoming).length ? Object.keys(upcoming).sort().map((k) => `<div class="row-item"><div class="grow"><b>${fmtDate(k)}</b><small>${upcoming[k].map((id) => esc(WORDS[id] ? WORDS[id].en : id)).join(' · ')}</small></div><span class="pill blue">${upcoming[k].length}</span></div>`).join('') : '<div class="empty-note">Chưa có lịch ôn – hãy hoàn thành bài học đầu tiên.</div>'}</div>
          ${dueNow ? `<div style="margin-top:12px"><button class="brick-btn btn-orange btn-sm" data-action="review" data-zone="">${bi('🔧 Review now', 'Ôn ngay')}</button></div>` : ''}
        </div>
      </div>

      <div class="p-grid" style="margin-top:22px">
        <div class="card p-section"><h3>⚙️ Cài đặt</h3><span class="vi">Settings</span>
          <div class="setting-row"><label>Tên nhân vật<small>Builder name</small></label><input class="text-input" maxlength="16" value="${esc(st.profile.name)}" data-change="name"></div>
          <div class="setting-row"><label>Giọng đọc<small>Voice accent</small></label><select class="select-lg" data-change="accent"><option value="en-US"${st.settings.accent === 'en-US' ? ' selected' : ''}>🇺🇸 American (US)</option><option value="en-GB"${st.settings.accent === 'en-GB' ? ' selected' : ''}>🇬🇧 British (UK)</option></select></div>
          <div class="setting-row"><label>Tốc độ đọc<small>Speech speed</small></label><select class="select-lg" data-change="rate">${SPEEDS.map((sp) => `<option value="${sp.v}"${speedOf(Number(st.settings.rate)).v === sp.v ? ' selected' : ''}>${sp.icon} ${sp.vi} – ${sp.en}</option>`).join('')}</select></div>
          <div class="setting-row"><label>Hiệu ứng âm thanh<small>Brick click & fanfare</small></label><button class="toggle${st.settings.sfx !== false ? ' on' : ''}" data-action="toggle-sfx" aria-label="SFX"></button></div>
          <div class="setting-row"><label>Chế độ luyện nói<small>${Listener.supported ? 'Trình duyệt có hỗ trợ nhận diện giọng nói' : 'Trình duyệt không hỗ trợ nhận diện – dùng Ghi âm & Chọn câu'}</small></label><select class="select-lg" data-change="micMode"><option value="auto"${st.settings.micMode === 'auto' ? ' selected' : ''}>🎙️ Tự động (Micro chấm điểm)</option><option value="fallback"${st.settings.micMode === 'fallback' ? ' selected' : ''}>🎤 Ghi âm nghe lại + Chọn câu</option></select></div>
          ${(window.navigator.standalone || (window.matchMedia && matchMedia('(display-mode: standalone)').matches)) ? `<div class="card speak-mode-note"><b>ℹ️ Chấm nội dung câu nói</b><span class="vi">App đang mở từ Màn hình chính: trên iPad chế độ này thường KHÔNG có nhận diện giọng nói, nên app chỉ kiểm tra được con <b>có nói</b> (đủ to, đủ dài) rồi cho con nghe lại để tự so sánh. Muốn app chấm <b>nội dung</b> câu nói (đúng/sai), hãy mở trang bằng <b>Safari</b> thường khi luyện nói. Bố mẹ có thể nghe lại giọng con trong 🎙️ Sổ giọng nói bên trên.</span></div>` : ''}
          <div class="setting-row"><label>Bắt buộc luyện nói<small>Bật: con phải nói (hoặc ghi âm có tiếng) mới thu được gạch & qua câu hỏi. Tắt khi con học ở nơi cần yên lặng.</small></label><select class="select-lg" data-change="speakMode"><option value="required"${st.settings.speakMode !== 'optional' ? ' selected' : ''}>🎤 Bật – phải nói mới qua</option><option value="optional"${st.settings.speakMode === 'optional' ? ' selected' : ''}>🔇 Tắt – nói là tùy chọn</option></select></div>
          <div class="setting-row"><label>Bộ sách trên lớp<small>School book</small></label><select class="select-lg" data-change="book"><option value="none"${!SCHOOL_BOOKS[book] ? ' selected' : ''}>Không – học theo Lộ trình</option>${Object.keys(SCHOOL_BOOKS).map((k) => `<option value="${k}"${book === k ? ' selected' : ''}>${esc(SCHOOL_BOOKS[k].name)}</option>`).join('')}</select></div>
          <div class="setting-row"><label>Thử giọng đọc<small>Test voice</small></label><button class="brick-btn btn-blue btn-sm" data-action="say-text" data-text="Hello! I'm your LEGO English buddy. Let's build together!">🔊 Test</button></div>
        </div>
        <div class="card p-section"><h3>💾 Sao lưu & Chuyển máy</h3><span class="vi">Đồng bộ giữa iPad và máy tính bằng file JSON hoặc Mã Chuyển Máy</span>
          <div class="btn-row" style="margin-bottom:12px">
            <button class="brick-btn btn-green btn-sm" data-action="backup-download">${bi('⬇️ Download .json', 'Tải file sao lưu')}</button>
            <label class="brick-btn btn-blue btn-sm" style="cursor:pointer">${bi('⬆️ Restore file', 'Khôi phục từ file')}<input type="file" accept=".json,application/json" data-change="restore-file" hidden></label>
          </div>
          <div class="setting-row" style="display:block"><label>Mã Chuyển Máy (copy sang thiết bị khác)<small>Transfer code</small></label>
            <textarea class="code-box" id="codeOut" readonly placeholder="Bấm 'Tạo mã' để tạo mã chuyển máy..."></textarea>
            <div class="btn-row" style="margin-top:8px"><button class="brick-btn btn-yellow btn-sm" data-action="code-make">${bi('Create code', 'Tạo mã')}</button><button class="brick-btn btn-white btn-sm" data-action="code-copy">${bi('Copy', 'Sao chép')}</button></div>
          </div>
          <div class="setting-row" style="display:block"><label>Dán mã từ thiết bị khác<small>Paste code to restore</small></label>
            <textarea class="code-box" id="codeIn" placeholder="LEB1:..."></textarea>
            <div class="btn-row" style="margin-top:8px"><button class="brick-btn btn-blue btn-sm" data-action="code-restore">${bi('Restore', 'Khôi phục')}</button></div>
          </div>
          <div class="setting-row"><label>Xóa toàn bộ tiến độ<small>Reset all progress</small></label><button class="brick-btn btn-red btn-sm" data-action="reset-all">${bi('Reset', 'Xóa')}</button></div>
        </div>
      </div>

      <h3 class="section-title">🧩 Custom Unit Importer <span class="vi">Nhập bài học theo SGK trên lớp của con – mở rộng kho bài học vô hạn, không cần sửa code</span></h3>
      <div class="p-grid importer">
        <div class="card p-section">
          <h3>① Nhờ AI soạn bài</h3><span class="vi">Dùng ChatGPT, Claude, Gemini... để biến Unit trên lớp thành bài học LEGO</span>
          <ol class="howto">
            <li>Bấm <b>Copy AI Prompt</b> (đã kèm sẵn cấu trúc JSON mẫu).</li>
            <li>Dán vào trợ lý AI, thay chỗ <b>[...]</b> bằng tên Unit, từ vựng và mẫu câu trong SGK của con.</li>
            <li>Copy đoạn JSON AI trả về → dán vào ô bên cạnh → <b>Kiểm tra</b> → <b>Nhập bài</b>.</li>
          </ol>
          <div class="btn-row">
            <button class="brick-btn btn-blue btn-sm" data-action="cu-copy-prompt">${bi('📋 Copy AI Prompt', 'Sao chép mẫu Prompt')}</button>
            <button class="brick-btn btn-white btn-sm" data-action="cu-sample">${bi('📄 Try sample', 'Dán JSON mẫu')}</button>
          </div>
          <details class="prompt-details"><summary>Xem nội dung Prompt mẫu</summary><textarea class="code-box tall" id="promptBox" readonly>${esc(CU.promptText())}</textarea></details>
          <p class="talk-tip" style="text-align:left">Phần nào JSON thiếu (truyện tranh, câu lắp ráp, luyện nói, Snowball, Mystery…) app sẽ tự tạo từ danh sách từ vựng. Bài nhập được lưu trên thiết bị và đi kèm file sao lưu.</p>
        </div>
        <div class="card p-section">
          <h3>② Dán JSON & nhập bài</h3><span class="vi">Mỗi Unit thành một Vùng đất mới trên Bản đồ (tối đa ${CU.MAX_LESSONS} bài/Unit)</span>
          <textarea class="code-box tall" id="unitJson" placeholder='{ "format": "lego-english-unit", "name": "Unit 5: ...", "lessons": [ ... ] }'>${esc(App.unitDraft || '')}</textarea>
          <div class="btn-row" style="margin-top:8px">
            <button class="brick-btn btn-yellow btn-sm" data-action="cu-check">${bi('🔍 Check', 'Kiểm tra')}</button>
            <button class="brick-btn btn-green btn-sm" data-action="cu-import">${bi('⬇️ Import unit', 'Nhập bài')}</button>
          </div>
          <div id="importReport">${App.importReport || ''}</div>
          <h4 class="sub-title">Bài đã nhập (${st.customUnits.length})</h4>
          <div class="list-rows">${st.customUnits.length ? st.customUnits.map((u) => {
            const z = zoneById(u.id);
            const nL = z ? z.lessons.length : 0;
            const nW = z ? z.lessons.reduce((a, l) => a + l.words.length, 0) : 0;
            const done = z ? z.lessons.filter((l) => S.isLessonDone(l.id)).length : 0;
            return `<div class="row-item"><span style="font-size:24px">${z ? z.icon : '⚠️'}</span><div class="grow">${esc(u.data.name || u.id)}<small>${z ? `${nL} bài · ${nW} từ · đã học ${done}/${nL}` : 'Dữ liệu lỗi – nên xóa và nhập lại'}</small></div>
              ${z ? `<button class="btn-mini" data-action="open-zone" data-zone="${u.id}" aria-label="Open">▶</button>` : ''}
              <button class="btn-mini" data-action="cu-copy" data-id="${u.id}" aria-label="Copy JSON">📋</button>
              <button class="btn-mini" data-action="cu-delete" data-id="${u.id}" aria-label="Delete">🗑️</button></div>`;
          }).join('') : '<div class="empty-note">Chưa có bài nào – thử bấm "Dán JSON mẫu" rồi "Nhập bài" nhé!</div>'}</div>
        </div>
      </div>

      ${SCHOOL_BOOKS[book] ? `<h3 class="section-title">📘 Học cùng SGK – ${esc(SCHOOL_BOOKS[book].name)} <span class="vi">Mỗi Unit trên lớp được nối với bài LEGO có chủ đề & mẫu câu gần nhất</span></h3>
        <div class="card" style="overflow-x:auto"><table class="map-table"><thead><tr><th>Unit SGK</th><th>Bài học LEGO</th><th>Trạng thái</th><th></th></tr></thead><tbody>
          ${bookUnits(book).map((u) => { const L = CUR.lesson(u.lesson); const Z = CUR.zone(L.zoneId); return `<tr><td><b>Unit ${u.unit}</b>: ${esc(u.title)}</td><td>${Z.week ? 'Week ' + Z.week : esc(Z.short || Z.name)} · ${esc(L.title)}<br><small class="vi">${esc(L.titleVi)}</small></td><td>${S.isLessonDone(L.id) ? starsHTML(S.lesson(L.id).stars) : '—'}</td><td><button class="brick-btn btn-blue btn-sm" data-action="start-lesson" data-lesson="${L.id}" data-force="1">▶</button></td></tr>`; }).join('')}
        </tbody></table></div>` : ''}
      <p class="vi" style="margin-top:24px;text-align:center">🔐 Không quảng cáo · Không thu thập dữ liệu · Mọi tiến độ chỉ lưu trên thiết bị này (IndexedDB).</p>
    </div>`;
    fillVoiceBook();
    fillCheckHistory();
  }

  async function handleParentChange(key, el) {
    const st = S.state.settings;
    if (key === 'name') { S.state.profile.name = (el.value || 'Builder').trim().slice(0, 16) || 'Builder'; S.save(); updateWallet(); toast('Saved!', 'Đã lưu tên', 'good'); }
    if (key === 'accent') { st.accent = el.value; S.save(); applySettings(); Speech.speak('Hello! This is my new voice.'); }
    if (key === 'rate') { st.rate = Number(el.value); S.save(); applySettings(); Speech.speak('This is my reading speed.'); }
    if (key === 'micMode') { st.micMode = el.value; S.save(); }
    if (key === 'skillLevel') { if (el.value === 'auto') { S.state.skill.auto = true; S.save(); } else S.setSkillLevel(Number(el.value), false); toast('Saved!', 'Đã đổi cấp độ học', 'good'); renderParent(); }
    if (key === 'speakMode') { st.speakMode = el.value; S.save(); toast('Saved!', el.value === 'optional' ? 'Đã tắt bắt buộc luyện nói' : 'Đã bật bắt buộc luyện nói 🎤', 'good'); }
    if (key === 'book') { st.book = el.value; S.save(); renderParent(); }
    if (key === 'school-unit') { st.schoolUnit = Number(el.value); S.save(); renderMap(); }
    if (key === 'school-book') { st.book = el.value; st.lastBook = el.value; st.schoolUnit = 1; S.save(); renderMap(); }
    if (key === 'restore-file') {
      const f = el.files && el.files[0];
      if (!f) return;
      try {
        const text = await f.text();
        const ok = await confirmModal({ en: 'Restore this backup?', vi: 'Khôi phục bản sao lưu này?', text: 'Toàn bộ tiến độ hiện tại trên thiết bị sẽ được thay bằng dữ liệu trong file.', ok: 'Restore', okVi: 'Khôi phục', okClass: 'btn-blue' });
        if (!ok) return;
        await S.importJSON(text);
        afterRestore();
      } catch (err) {
        toast('Could not read file', 'File không hợp lệ: ' + err.message, 'warm');
      }
      el.value = '';
    }
  }

  /* ---------- Custom Unit Importer ---------- */
  function importReportHTML(res, done) {
    const list = (arr, cls) => (arr.length ? `<ul class="report-list ${cls}">${arr.slice(0, 12).map((x) => `<li>${esc(x)}</li>`).join('')}${arr.length > 12 ? `<li>… và ${arr.length - 12} mục khác</li>` : ''}</ul>` : '');
    if (!res.ok) return `<div class="import-report bad"><b>❌ Chưa nhập được – cần sửa ${res.errors.length} lỗi:</b>${list(res.errors, 'err')}${list(res.warnings, 'warn')}</div>`;
    const d = res.data;
    const nW = d.lessons.reduce((a, l) => a + l.words.length, 0);
    const low = (res.quality || []).length > 0;
    return `<div class="import-report ${low ? 'low' : 'ok'}"><b>${done ? '✅ Đã nhập' : low ? '⚠️ Nhập được nhưng CHẤT LƯỢNG THẤP' : '✅ Hợp lệ'}: ${esc(d.icon)} ${esc(d.name)}</b><span class="vi">${d.lessons.length} bài · ${nW} từ vựng${d.mystery ? ' · có Mystery' : ' · Mystery tự tạo'}</span>
      ${low && !done ? `<div class="warn-head">🟡 ${res.quality.length} phần còn thiếu, app phải tự tạo – nên dùng Prompt AI để có bài đầy đủ (truyện tranh, câu lắp, câu hỏi nói):</div>${list(res.quality, 'warn')}` : ''}
      ${res.warnings.length ? `<div class="warn-head">⚠️ ${res.warnings.length} lưu ý (app đã tự xử lý):</div>${list(res.warnings, 'warn')}` : ''}</div>`;
  }

  function readUnitDraft() {
    const box = $('#unitJson');
    App.unitDraft = box ? box.value : (App.unitDraft || '');
    return App.unitDraft;
  }

  async function copyText(text, fallbackEl) {
    try { await navigator.clipboard.writeText(text); return true; } catch (e) {
      if (!fallbackEl) return false;
      const ro = fallbackEl.hasAttribute('readonly');
      fallbackEl.removeAttribute('readonly'); fallbackEl.select(); document.execCommand('copy');
      if (ro) fallbackEl.setAttribute('readonly', '');
      return true;
    }
  }

  async function importUnit() {
    const res = CU.parse(readUnitDraft());
    if (!res.ok) {
      App.importReport = importReportHTML(res);
      $('#importReport').innerHTML = App.importReport;
      Sfx.playGentleOops();
      return;
    }
    if (S.state.customUnits.length >= 20) { toast('Too many units', 'Đã có 20 bài nhập – hãy xóa bớt bài cũ trước nhé', 'warm'); return; }
    const d = res.data;
    const ok = await confirmModal({
      en: 'Import this unit?', vi: `Nhập "${d.name}" thành Vùng đất mới?`,
      text: `<p>${esc(d.icon)} <b>${esc(d.name)}</b> – ${d.lessons.length} bài: ${d.lessons.map((l) => esc(l.title)).join(' · ')}</p>${res.warnings.length ? `<p class="vi">⚠️ ${res.warnings.length} lưu ý – app đã tự bổ sung phần còn thiếu.</p>` : ''}`,
      ok: 'Import', okVi: 'Nhập bài', okClass: 'btn-green'
    });
    if (!ok) return;
    const id = S.nextCustomId();
    S.addCustomUnit(id, d);
    CU.syncAll(S.state.customUnits);
    if (!zoneById(id)) {
      S.removeCustomUnit(id); CU.syncAll(S.state.customUnits);
      toast('Import failed', 'Không tạo được Vùng đất từ dữ liệu này', 'warm');
      return;
    }
    App.unitDraft = '';
    App.importReport = importReportHTML(res, true);
    Sfx.playSuccessFanfare(); fx.confetti(40);
    toast('New zone added!', `Đã thêm Vùng đất "${d.name}" vào Bản đồ`, 'good');
    renderParent();
  }

  function afterRestore() {
    CU.syncAll(S.state.customUnits);
    applySettings(); updateWallet();
    toast('Restored!', 'Đã khôi phục dữ liệu thành công', 'good');
    renderParent();
  }

  /* =========================================================
     BÀI HỌC 6 BƯỚC
     ========================================================= */
  const Lesson = {
    token: 0,
    z: null, l: null, step: 0,
    stats: { correct: 0, total: 0 },
    studs: 0, gold: 0, combo: 0,
    vuToken: 0, studio: null,

    start(lessonId, opts = {}) {
      const l = window.Curriculum.lesson(lessonId);
      if (!l) return;
      const z = window.Curriculum.zone(l.zoneId);
      if (!opts.force && !lessonUnlocked(z, l.index)) { toast('Locked!', 'Học xong bài trước để mở khóa nhé', 'warm'); return; }
      closeModal();
      this.token++;
      this.z = z; this.l = l; this.step = 0;
      this.stats = { correct: 0, total: 0 };
      this.spokeN = 0; this.vbSaved = 0; this.talkCount = 0; this.talkFree = 0;
      this.payRate = !S.isLessonDone(l.id) ? 1 : l.parts.some((i) => !S.parts(z.id)[i]) ? 0.6 : 0.3;
      this.studs = 0; this.gold = 0; this.combo = 0;
      Speech.cancel();
      overlay.hidden = false;
      overlay.innerHTML = `
        <div class="lesson-top">
          <button class="brick-btn btn-white btn-round" data-action="lesson-close" aria-label="Close">✕</button>
          <div>
            <div class="lesson-progress">${STEPS.map((s, i) => `<div class="lp-brick" data-i="${i}" style="--bc:${s.color}"></div>`).join('')}</div>
            <div class="lesson-step-name" id="stepName"></div>
          </div>
          <div class="lesson-earned">
            ${levelChipHTML()}
            ${speedChipHTML()}
            <span class="chip" id="lsStudChip" style="box-shadow:0 4px 0 var(--card-edge)"><i class="stud-icon"></i><b id="lsStuds">0</b></span>
            <span class="chip" style="box-shadow:0 4px 0 var(--card-edge)"><i class="gold-icon"></i><b id="lsGold">0</b></span>
          </div>
        </div>
        <div class="lesson-body" id="lessonBody"></div>`;
      document.body.style.overflow = 'hidden';
      this.renderStep();
    },

    async close(ask = true) {
      if (ask && this.step < 5) {
        const ok = await confirmModal({ en: 'Leave the lesson?', vi: 'Thoát bài học? Tiến độ của bài này sẽ không được lưu (nút xu đã nhận vẫn giữ nguyên).', ok: 'Leave', okVi: 'Thoát', cancel: 'Stay', cancelVi: 'Học tiếp', okClass: 'btn-red' });
        if (!ok) return;
      }
      this.token++;
      Speech.cancel(); Listener.stop(); this.stopStudio();
      Recorder.releaseAll(); overlay.hidden = true; overlay.innerHTML = '';
      render();
    },

    body() { return $('#lessonBody'); },

    renderStep() {
      $$('.lp-brick', overlay).forEach((b, i) => {
        b.classList.toggle('on', i < this.step);
        b.classList.toggle('current', i === this.step);
      });
      const s = STEPS[this.step];
      $('#stepName').innerHTML = `Step ${this.step + 1}/6 · ${s.en} · <span class="vi">${s.vi}</span>`;
      const body = this.body();
      body.scrollTop = 0;
      Speech.cancel(); Listener.stop(); this.stopStudio(); Beat.stop(); Pic.stop();
      [this.discover, this.reflex, this.comic, this.build, this.talk, this.unbox][this.step].call(this);
    },

    next() {
      if (this.step >= 5) return;
      const b = $$('.lp-brick', overlay)[this.step];
      if (b) b.classList.add('on');
      Sfx.playBrickClick();
      this.step++;
      this.renderStep();
    },

    earn(n, el) {
      // Học lại bài đã xong: thưởng ít hơn (chống "cày" xu); luyện lại để mở mảnh còn thiếu: 60%
      n = Math.round(n * (this.payRate || 1));
      if (n <= 0) return;
      this.studs += n;
      S.addStuds(n);
      updateWallet();
      $('#lsStuds').textContent = this.studs;
      Sfx.playStudCollect(Math.min(n, 4));
      if (el) {
        fx.studsFly(el, $('#lsStudChip'), Math.min(n, 5));
        const r = el.getBoundingClientRect();
        fx.floatText('+' + n, r.left + r.width / 2, r.top);
      }
    },

    earnGold(n, el) {
      this.gold += n;
      S.addGold(n);
      updateWallet();
      $('#lsGold').textContent = this.gold;
      Sfx.playSparkle();
      if (el) { const r = el.getBoundingClientRect(); fx.floatText('+' + n + ' 🥇', r.left + r.width / 2, r.top); }
    },

    answered(first, correct) {
      if (!first) return;
      this.stats.total++;
      if (correct) this.stats.correct++;
    },

    figFor(who, cls = '') { return LG.renderMinifig(this.z.chars[who].fig, { cls }); },

    /* ---------- Bước 1: Brick Discovery ---------- */
    discover() {
      const words = this.l.words;
      this.d = { heard: new Set(), revealed: new Set(), collected: new Set(), spoken: new Set(), tries: {}, rec: null };
      this.d.roles = words.map((w) => G.wordRole(w));
      const roles = this.d.roles;
      const req = this.speakRequired();
      this.body().innerHTML = `<div class="step">
        <div class="step-head"><h2>🧱 Brick Discovery</h2><span class="vi">${req
          ? 'Bấm 🔊 nghe (🐢 nghe chậm) → bấm 🎤 <b>Say it!</b> và nói to từ đó → nghe lại giọng con so với giọng mẫu → thu thập viên gạch! Nói được = thêm Studs 🎤'
          : 'Bấm 🔊 nghe (🐢 nghe chậm từng chữ), đoán nghĩa qua hình rồi chạm để xem nghĩa. Nghe xong mới thu thập được viên gạch!'}</span></div>
        ${G.legendHTML({ compact: true })}
        <div class="word-grid">${words.map((w, i) => `
          <div class="word-card role-${roles[i]}" data-i="${i}" style="${roleVars(roles[i], 'wc')}">
            <span class="wc-role">${G.ROLES[roles[i]].dot} ${G.ROLES[roles[i]].en}</span>
            <div class="wc-emoji">${w.emoji}</div>
            <div class="wc-word">${esc(w.en)}</div>
            <span class="wc-pos pos-${w.pos}">${esc(w.posLabel)}</span>
            <div class="wc-ipa">${esc(w.ipa)}</div>
            <div class="wc-audio">
              <button class="brick-btn btn-blue btn-round" data-action="say-word" data-i="${i}" aria-label="Normal speed">🔊</button>
              <button class="brick-btn btn-green btn-round" data-action="say-slow" data-i="${i}" aria-label="Slow mode">🐢</button>
            </div>
            <button class="wc-meaning" data-action="reveal" data-i="${i}">👆 Tap to see meaning<br>Chạm để xem nghĩa</button>
            <div class="wc-example"><button data-action="say-ex" data-i="${i}">🔊 ${highlightWord(w.ex, w.en)}<span class="vi">${esc(w.exVi)}</span></button></div>
            ${req || Recorder.supported || this.useMic() ? `<button class="brick-btn btn-red btn-sm sayit-btn" data-action="say-it" data-i="${i}" disabled>${bi('🎤 Say it!', 'Nghe xong rồi nói')}</button>` : ''}
            <button class="brick-btn btn-yellow btn-sm collect-btn" data-action="collect" data-i="${i}" disabled>${bi('＋ Collect brick', req ? 'Nghe – Nói rồi thu thập' : 'Nghe trước rồi thu thập')}</button>
          </div>`).join('')}
        </div>
        ${this.l.fact ? `<div class="card fact-card studs-top">
          <div class="fact-head">💡 Real-Life / Science Fact <span class="vi">Con có biết?</span></div>
          <button class="fact-en" data-action="say-text" data-text="${esc(this.l.fact.en)}">🔊 ${esc(this.l.fact.en)}</button>
          ${this.l.fact.vi ? `<button class="btn-mini-text" data-action="fact-vi">🇻🇳 Dịch nghĩa</button><div class="fact-vi vi" hidden>${esc(this.l.fact.vi)}</div>` : ''}
        </div>` : ''}
        <div class="tray">
          <div class="tray-label">My Brick Tray<small>Khay gạch của em</small></div>
          ${words.map((w, i) => `<div class="tray-slot" data-slot="${i}"></div>`).join('')}
          <button class="brick-btn btn-green" data-action="${Pic.lines(this.l).length >= 2 ? 'pic-lesson' : 'lesson-next'}" id="discNext" disabled>${bi(Pic.lines(this.l).length >= 2 ? '📖 Picture Story ▶' : 'Next ▶', Pic.lines(this.l).length >= 2 ? 'Đọc qua tranh' : 'Tiếp tục')}</button>
        </div>
      </div>`;
    },

    discoverAction(act, i, el) {
      const w = this.l.words[i];
      const card = $(`.word-card[data-i="${i}"]`, overlay);
      const markHeard = () => {
        this.d.heard.add(i);
        const say = $('.sayit-btn', card);
        if (say && !this.d.spoken.has(i) && this.d.rec !== i) { say.disabled = false; say.innerHTML = bi('🎤 Say it!', 'Chạm rồi nói to từ này'); }
        if (this.speakRequired() && !this.d.spoken.has(i)) return;
        this.enableCollect(i);
      };
      if (act === 'say-word') { sayWord(w, false); markHeard(); }
      if (act === 'say-slow') { sayWord(w, true); markHeard(); }
      if (act === 'say-ex') { Speech.speak(w.ex); markHeard(); }
      if (act === 'reveal') {
        this.d.revealed.add(i);
        el.classList.add('revealed');
        el.innerHTML = `${esc(w.vi)}<br><small class="vi">${esc(w.posVi)}</small>`;
      }
      if (act === 'collect') {
        if (!this.d.heard.has(i)) { toast('Listen first!', 'Nghe trước đã nhé!', 'warm'); return; }
        if (this.speakRequired() && !this.d.spoken.has(i) && (this.d.tries[i] || 0) < 5) { toast('Say it first!', 'Bấm 🎤 Say it! và nói to từ này trước nhé!', 'warm'); return; }
        if (this.d.collected.has(i)) return;
        this.d.collected.add(i);
        card.classList.add('collected');
        el.disabled = true;
        el.innerHTML = bi('✓ In the tray!', 'Đã vào khay');
        if (!this.d.revealed.has(i)) this.discoverAction('reveal', i, $('.wc-meaning', card));
        const slot = $(`.tray-slot[data-slot="${i}"]`, overlay);
        slot.classList.add('filled');
        slot.style.setProperty('--sc', G.ROLES[this.d.roles[i]].color);
        slot.textContent = w.emoji;
        Sfx.playBrickClick();
        this.earn(this.d.spoken.has(i) ? 2 : 1, el);
        if (this.d.collected.size === this.l.words.length) {
          $('#discNext').disabled = false;
          praise();
          Speech.speak('Great! You collected all the bricks!');
        }
      }
    },

    enableCollect(i, skipped) {
      if (this.d.collected.has(i)) return;
      const card = $(`.word-card[data-i="${i}"]`, overlay);
      const btn = card && $('.collect-btn', card);
      if (btn) { btn.disabled = false; btn.innerHTML = skipped ? bi('＋ Collect brick', 'Thu thập (lần sau nói to hơn nhé)') : bi('＋ Collect brick', 'Thu thập vào khay'); }
    },

    /** 🎤 Say it! – con nói lại từ vừa nghe. Máy nhận diện (nếu có) hoặc ghi âm + nhận biết giọng, rồi phát lại giọng con và giọng mẫu. */
    sayIt(i, el) {
      const D = this.d;
      if (!D) return;
      if (D.rec === i) { this.sayItStop(i); return; }
      if (D.rec !== null) return;
      if (!D.heard.has(i)) { toast('Listen first!', 'Nghe giọng mẫu trước đã nhé!', 'warm'); return; }
      Speech.cancel();
      if (this.useMic()) {
        const w = this.l.words[i];
        D.rec = i;
        this.sayItBtn(i, 'listen');
        Sfx.playMicOn();
        const ok = Listener.start({
          onResult: (alts) => {
            D.rec = null;
            const r = Listener.score(alts, [], w.en);
            if (r.score >= 0.5) { this.sayItBtn(i, 'idle'); this.spokeWord(i, `“${r.text}”`); }
            else this.sayItMiss(i, `“${r.text}”`);
          },
          onError: (code) => {
            D.rec = null;
            if (code !== 'no-speech' && code !== 'aborted') {
              // Dịch vụ nhận diện không dùng được (iPad mở từ Màn hình chính, mất mạng…) → chuyển sang ghi âm + nhận biết giọng
              if (code === 'network') Listener.blocked = true;
              this.sayItBtn(i, 'idle');
              if (Recorder.supported) this.sayItRec(i); else { this.noMic = true; this.enableCollect(i); }
              return;
            }
            this.sayItMiss(i);
          },
          onEnd: () => { if (D.rec === i) { D.rec = null; this.sayItBtn(i, 'idle'); } }
        });
        if (!ok) { D.rec = null; if (Recorder.supported) this.sayItRec(i); else { this.noMic = true; this.enableCollect(i); } }
        return;
      }
      this.sayItRec(i);
    },

    async sayItRec(i) {
      const D = this.d, tk = this.token;
      D.rec = i;
      this.sayItBtn(i, 'rec');
      try {
        await Recorder.start({ maxMs: 5000, autoStop: true, silenceMs: 900, minVoiceMs: 200, onAuto: () => this.sayItStop(i) });
        if (tk !== this.token) { Recorder.stop(); return; }
        Sfx.playMicOn();
      } catch (e) {
        D.rec = null;
        this.noMic = true;           // chưa cấp quyền micro → không chặn bé
        this.sayItBtn(i, 'idle');
        toast('Microphone is off', 'Chưa dùng được micro – con nói to theo giọng mẫu rồi thu thập gạch nhé!', 'warm');
        this.l.words.forEach((_, k) => { if (D.heard.has(k)) this.enableCollect(k); });
      }
    },

    async sayItStop(i) {
      const D = this.d, tk = this.token;
      if (!D || D.rec !== i) return;
      D.rec = null;
      await Recorder.stop();
      if (tk !== this.token) return;
      this.sayItBtn(i, 'idle');
      if (!Recorder.heardVoice(250)) { this.sayItMiss(i); return; }
      D.clips = D.clips || {};
      D.clips[i] = Recorder.lastBlob;
      this.spokeWord(i);
      await this.hearMe(i);
    },

    /** ▶ Nghe lại giọng con rồi giọng mẫu để so sánh. */
    async hearMe(i) {
      const D = this.d, tk = this.token;
      const clip = D && D.clips && D.clips[i];
      if (!clip) return;
      const b = $(`.hearme-btn[data-i="${i}"]`, overlay);
      if (b) { b.classList.add('rec-on'); b.innerHTML = bi('🔊 Your voice…', 'Đang phát giọng con'); }
      await Recorder.play(clip);
      if (tk !== this.token) return;
      if (b) b.innerHTML = bi('🔊 Model…', 'Giọng mẫu (máy đọc)');
      await sleep(250);
      if (tk === this.token) await sayWord(this.l.words[i], false);
      if (b && b.isConnected) { b.classList.remove('rec-on'); b.innerHTML = bi('▶ My voice vs Model', 'Nghe lại giọng con & giọng mẫu'); }
    },

    sayItBtn(i, mode) {
      const b = $(`.sayit-btn[data-i="${i}"]`, overlay);
      if (!b) return;
      b.disabled = false;
      b.classList.toggle('rec-on', mode === 'rec' || mode === 'listen');
      b.innerHTML = mode === 'rec' ? bi('⏹️ Speak now…', 'Con nói đi – nói xong tự dừng')
        : mode === 'listen' ? bi('👂 Listening…', 'Đang nghe con nói…')
        : this.d.spoken.has(i) ? bi('🎤 Say it again', 'Nói lại lần nữa') : bi('🎤 Say it!', 'Chạm rồi nói to từ này');
    },

    spokeWord(i, said) {
      const D = this.d;
      const first = !D.spoken.has(i);
      D.spoken.add(i);
      const card = $(`.word-card[data-i="${i}"]`, overlay);
      if (card) card.classList.add('spoken');
      this.sayItBtn(i, 'idle');
      const say = card && $('.sayit-btn', card);
      if (say && D.clips && D.clips[i] && !$('.hearme-btn', card)) {
        say.insertAdjacentHTML('afterend', `<button class="brick-btn btn-blue btn-sm hearme-btn" data-action="hear-me" data-i="${i}">${bi('▶ My voice vs Model', 'Nghe lại giọng con & giọng mẫu')}</button>`);
      }
      this.countSpoken();
      if (first) {
        Sfx.playBrickClick();
        const b = $(`.sayit-btn[data-i="${i}"]`, overlay);
        if (b) { const r = b.getBoundingClientRect(); fx.floatText('🎤 ✓', r.left + r.width / 2, r.top); }
        toast(said ? `Great voice! ${said}` : 'Great voice!', 'Giọng con rõ lắm! Giờ thu thập viên gạch nhé (+2 Studs)', 'good');
      }
      this.enableCollect(i);
    },

    sayItMiss(i, said) {
      const D = this.d;
      D.tries[i] = (D.tries[i] || 0) + 1;
      this.sayItBtn(i, 'idle');
      Sfx.playGentleOops();
      if (D.tries[i] >= 5) {
        this.enableCollect(i, true);
        toast("Let's keep going!", 'Không sao! Con thu thập gạch rồi lần sau nói to hơn nhé 💪', 'warm');
      } else toast(said ? `I heard ${said}` : "I can't hear you!", said ? 'Gần đúng rồi! Nghe mẫu rồi nói lại nhé' : 'Mình chưa nghe thấy giọng con – nói TO và RÕ hơn nhé!', 'warm');
    },

    /** 📖 Picture Story ngay sau Bước 1: đọc các câu có từ vựng được thay bằng hình, rồi sang Bước 2. */
    picLesson() {
      Speech.cancel();
      Pic.start({
        lesson: this.l, zone: this.z,
        container: () => this.body(),
        earn: (n) => this.earn(n, this.body()),
        onDone: () => { this.countSpoken(); this.next(); }
      });
    },

    /** 🥁 Beat Talk ngay sau Bước 1: 5 từ của bài + 3 từ ôn, rồi sang Bước 2. */
    beatLesson() {
      const l = this.l, z = this.z;
      const review = shuffle(S.learnedWordIds().filter((id) => WORDS[id] && l.words.every((w) => w.id !== id))).slice(0, 3).map((id) => WORDS[id]);
      const fill = review.length < 3 ? shuffle(z.lessons.filter((x) => x.id !== l.id).flatMap((x) => x.words)).slice(0, 3 - review.length) : [];
      Speech.cancel();
      Beat.start({
        words: l.words.concat(review, fill).slice(0, 8), zone: z, title: l.title,
        container: () => this.body(),
        onDone: (stars) => {
          if (stars > 0) { this.earn(stars * 3, this.body()); toast(`🥁 ${'⭐'.repeat(stars)}`, 'Beat Talk hoàn thành!', 'good'); }
          this.next();
        }
      });
    },

    /* ---------- Bước 2: Sound-to-Brick Reflex ---------- */
    reflex() {
      this.r = { rounds: shuffle(this.l.words).map((w, i) => ({ w, mode: i < 3 ? 'word' : 'clue' })), i: 0, filled: 0 };
      this.renderReflex();
    },

    renderReflex() {
      const R = this.r;
      R.ready = false;
      if (R.i >= R.rounds.length) {
        praise();
        Speech.speak('Foundation complete!');
        setTimeout(() => { if (this.step === 1) this.next(); }, 900);
        return;
      }
      const round = R.rounds[R.i];
      const words = this.l.words;
      R.opts = shuffle([round.w].concat(shuffle(words.filter((x) => x !== round.w)).slice(0, 3)));
      R.first = true; R.showText = false;
      const charB = this.z.chars.b;
      this.body().innerHTML = `<div class="step">
        <div class="step-head"><h2>👂 Sound-to-Brick Reflex</h2><span class="vi">${esc(charB.name)} sẽ đọc to (không hiện chữ). Chọn thật nhanh viên gạch đúng để xây tầng móng! Đúng liên tiếp = Combo x2, x3 nút xu!</span></div>
        <div class="reflex-stage">
          <div class="card speaker-card studs-top">
            <div id="reflexFig">${this.figFor('b')}</div>
            <b class="en">${esc(charB.name)}</b>
            <button class="brick-btn btn-blue btn-sm" data-action="reflex-replay">${bi('🔊 Listen again', 'Nghe lại')}</button>
            <div class="foundation">${R.rounds.map((_, k) => `<div class="f-slot${k < R.filled ? ' on' : ''}" style="--sc:${BRICK_COLORS[k % 6]}"></div>`).join('')}</div>
            <div id="comboBox" style="min-height:36px"></div>
          </div>
          <div>
            <div class="reflex-q" id="reflexQ"></div>
            <div class="opt-grid">${R.opts.map((w, k) => `<button class="opt-brick wait" data-action="reflex-pick" data-i="${k}" style="--oc:${BRICK_COLORS[k]};--ocd:${LG.shade(BRICK_COLORS[k], -0.3)}">
              <span class="o-emoji">${w.emoji}</span><span class="o-word">${esc(round.mode === 'word' ? w.vi : w.en)}</span></button>`).join('')}</div>
          </div>
        </div>
      </div>`;
      this.updateReflexQ();
      const tk = this.token;
      setTimeout(() => { if (tk === this.token && this.step === 1) this.reflexSpeak(); }, 450);
    },

    updateReflexQ() {
      const R = this.r, round = R.rounds[R.i];
      const head = `Round ${R.i + 1}/${R.rounds.length} · `;
      const q = round.mode === 'word'
        ? `${head}Listen and tap the right brick!<span class="vi">Nghe và chọn viên gạch đúng!</span>`
        : `${head}Listen to the clue. Which brick is it?<span class="vi">Nghe câu đố – đó là viên gạch nào?</span>`;
      const shown = R.showText ? `<div class="pill yellow" style="margin-top:8px;font-size:16px">💬 ${esc(round.mode === 'word' ? round.w.en : round.w.clue)}</div>` : '';
      $('#reflexQ').innerHTML = q + shown;
    },

    reflexSpeak() {
      const round = this.r.rounds[this.r.i];
      if (!round) return;
      const fig = $('#reflexFig svg');
      if (fig) fig.classList.add('talking');
      const R = this.r, tk = this.token, at = R.i;
      const open = () => { if (tk === this.token && R.i === at) { R.ready = true; $$('.opt-brick.wait', overlay).forEach((b) => b.classList.remove('wait')); } };
      Speech.speak(round.mode === 'word' ? round.w.en.replace(/\.\.\./g, '') : round.w.clue, { pitch: 0.95 })
        .then(() => { if (fig) fig.classList.remove('talking'); setTimeout(open, 250); });
      setTimeout(open, 6000);
    },

    reflexPick(k, el) {
      const R = this.r, round = R.rounds[R.i];
      const w = R.opts[k];
      if (!round || el.classList.contains('right')) return;
      // Nghe hết rồi mới chọn – chặn bấm đoán cho qua
      if (!R.ready) { toast('Listen first! 👂', 'Nghe hết câu rồi mới chọn nhé!', 'warm'); return; }
      if (w === round.w) {
        $$('.opt-brick', overlay).forEach((b) => { b.style.pointerEvents = 'none'; });
        el.classList.add('right');
        const wordSpan = $('.o-word', el);
        if (wordSpan) wordSpan.innerHTML = `${esc(w.en)}<small style="display:block;font-size:13px;opacity:.9">${esc(w.vi)}</small>`;
        Sfx.playBrickClick();
        this.answered(R.first, true);
        if (R.first) { S.recordAnswer(w.id, true); this.combo++; }
        const mult = !R.first ? 0 : this.combo >= 4 ? 3 : this.combo >= 2 ? 2 : 1;
        this.earn(2 * mult, el);   // chỉ thưởng khi đúng NGAY lần đầu
        if (mult > 1) {
          $('#comboBox').innerHTML = `<span class="combo-badge">Combo x${mult}! 🔥</span>`;
          Sfx.playCombo(mult);
        }
        R.filled++;
        const slot = $$('.f-slot', overlay)[R.filled - 1];
        if (slot) slot.classList.add('on');
        Speech.speak(w.en.replace(/\.\.\./g, ''));
        R.i++;
        const tk = this.token;
        setTimeout(() => { if (tk === this.token && this.step === 1) this.renderReflex(); }, 1100);
      } else {
        if (R.first) {
          this.answered(true, false);
          S.recordAnswer(round.w.id, false);
          S.addMistake('word:' + round.w.id, round.w.en, round.w.vi);
          R.first = false;
        }
        this.combo = 0;
        $('#comboBox').innerHTML = '';
        el.classList.add('wrong');
        Sfx.playGentleOops();
        encourage();
        R.showText = true;
        this.updateReflexQ();
        setTimeout(() => this.reflexSpeak(), 500);
      }
    },

    /* ---------- Bước 3: LEGO Comic Strip ---------- */
    comic() {
      this.c = { phase: 'listen', played: false, playing: false, blankIdx: 0, filled: {}, first: true, opts: null, branchPicked: null, viShown: new Set() };
      this.renderComic();
    },

    panelHTML(p, i) {
      const C = this.c, cm = this.l.comic;
      const name = this.z.chars[p.who].name;
      // Giảm dần tiếng Việt: tháng 1–3 hiện sẵn, từ tháng 4 bấm 🇻🇳 mới hiện (tập nghe – hiểu bằng tiếng Anh)
      const viMode = typeof this.z.month === 'number' && this.z.month >= diff().viFrom ? 'tap' : 'show';
      const bIdx = cm.blanks.findIndex((b) => b.panel === i);
      let line, showVi = true;
      if (C.phase === 'fill' && bIdx !== -1) {
        const b = cm.blanks[bIdx];
        const at = p.text.indexOf(b.answer);
        const filled = !!C.filled[bIdx];
        const cur = bIdx === C.blankIdx && !filled;
        line = `${esc(p.text.slice(0, at))}<span class="blank${filled ? ' filled' : ''}${cur ? ' current' : ''}">${filled ? esc(b.answer) : '❓❓❓'}</span>${esc(p.text.slice(at + b.answer.length))}`;
        showVi = filled;
      } else {
        line = p.text.split(/\s+/).map((wd, k) => `<span class="kw" data-k="${k}">${esc(wd)}</span>`).join(' ');
      }
      return `<div class="panel" data-p="${i}">
        <span class="panel-num">${i + 1}</span>
        <div class="panel-bubble-wrap"><button class="bubble from-${p.who}" data-action="say-panel" data-p="${i}"><span class="who">${esc(name)} 🔊</span><span class="line">${line}</span>${showVi && (viMode === 'show' || C.viShown.has(i)) ? `<span class="vi-line">${esc(p.vi)}</span>` : ''}</button>${showVi && viMode !== 'show' && !C.viShown.has(i) && p.vi ? `<button class="btn-mini-text vi-peek" data-action="panel-vi" data-p="${i}">🇻🇳 Dịch</button>` : ''}</div>
        <div class="panel-scene" style="--zone-c:${this.z.color}">
          <div class="ground"></div>
          ${LG.renderMinifig(this.z.chars.a.fig, { cls: 'fig-a' + (p.who === 'a' ? ' is-speaker' : '') })}
          <span class="prop">${p.prop || this.z.icon}</span>
          ${LG.renderMinifig(this.z.chars.b.fig, { cls: 'fig-b' + (p.who === 'b' ? ' is-speaker' : '') })}
        </div>
      </div>`;
    },

    renderComic() {
      const C = this.c, cm = this.l.comic;
      let controls;
      if (C.phase === 'listen') {
        controls = `<div class="comic-controls">
          <button class="brick-btn btn-orange btn-xl" data-action="comic-play" id="comicPlay">${bi(C.played ? '↻ Play again' : '▶ Play the story', C.played ? 'Nghe lại' : 'Nghe cả câu chuyện')}</button>
          ${C.played ? `<button class="brick-btn btn-green btn-xl" data-action="comic-ready">${bi('✏️ Fill the bubbles!', 'Điền bóng thoại')}</button>` : ''}
        </div>`;
      } else if (C.blankIdx < cm.blanks.length) {
        const b = cm.blanks[C.blankIdx];
        if (!C.opts) C.opts = shuffle(b.options);
        controls = `<div class="blank-quiz card studs-top">
          <div class="q-title">Bubble ${b.panel + 1}: Which words fit best?<span class="vi">Khung ${b.panel + 1}: Cụm từ nào phù hợp nhất với câu chuyện?</span></div>
          <div class="choice-row">${C.opts.map((o, k) => `<button class="brick-btn btn-white" data-action="comic-pick" data-i="${k}">${esc(o)}</button>`).join('')}</div>
        </div>`;
      } else {
        const br = this.l.branchComic;
        const ready = !br || C.branchPicked !== null;
        controls = (br ? this.branchHTML(br, 'cb', C.branchPicked) : '') + `<div class="comic-controls"><button class="brick-btn btn-orange" data-action="comic-play">${bi('▶ Listen to the full story', 'Nghe lại cả truyện')}</button>
          ${ready ? `<button class="brick-btn btn-green btn-xl" data-action="lesson-next">${bi('Next ▶', 'Tiếp tục')}</button>` : ''}</div>`;
      }
      this.body().innerHTML = `<div class="step">
        <div class="step-head"><h2>💬 ${esc(cm.title)}</h2><span class="vi">Truyện tranh: ${esc(cm.titleVi)} — ${C.phase === 'listen' ? 'Bấm nghe cả câu chuyện, chữ sẽ sáng lên theo giọng đọc. Chạm vào bóng thoại để nghe riêng câu đó.' : 'Một số bóng thoại bị khuyết – chọn cụm từ đúng để hoàn thành câu chuyện!'}</span></div>
        <div class="comic-grid">${cm.panels.map((p, i) => this.panelHTML(p, i)).join('')}</div>
        ${controls}
      </div>`;
    },

    async speakPanel(i, tk) {
      const p = this.l.comic.panels[i];
      const panel = $(`.panel[data-p="${i}"]`, overlay);
      if (!panel) return;
      $$('.panel', overlay).forEach((x) => x.classList.toggle('active', x === panel));
      const fig = $('.is-speaker', panel);
      if (fig) fig.classList.add('speaking');
      const spans = $$('.kw', panel);
      await Speech.speak(p.text, {
        pitch: p.who === 'a' ? 1.2 : 0.92,
        onWord: (k) => { if (tk !== this.token) return; spans.forEach((s, j) => s.classList.toggle('lit', j === k)); }
      });
      if (fig) fig.classList.remove('speaking');
      spans.forEach((s) => s.classList.remove('lit'));
      panel.classList.remove('active');
    },

    async comicPlay() {
      const C = this.c;
      if (C.playing) return;
      if (C.phase === 'fill') { C.phase = 'listen'; this.renderComic(); }
      C.playing = true;
      const tk = this.token;
      const btn = $('#comicPlay'); if (btn) btn.disabled = true;
      for (let i = 0; i < this.l.comic.panels.length; i++) {
        if (tk !== this.token || this.step !== 2) return;
        await this.speakPanel(i, tk);
        await sleep(250);
      }
      if (tk !== this.token || this.step !== 2) return;
      C.playing = false;
      const allDone = C.blankIdx >= this.l.comic.blanks.length;
      C.played = true;
      if (allDone) C.phase = 'fill';
      this.renderComic();
    },

    comicPick(k, el) {
      const C = this.c, cm = this.l.comic;
      const b = cm.blanks[C.blankIdx];
      if (!b) return;
      const opt = C.opts[k];
      if (opt === b.answer) {
        this.answered(C.first, true);
        el.classList.add('right');
        Sfx.playBrickClick();
        if (C.first) this.earn(3, el);
        C.filled[C.blankIdx] = true;
        const panelIdx = b.panel;
        C.blankIdx++; C.opts = null; C.first = true;
        const tk = this.token;
        this.renderComic();
        praise();
        this.speakPanel(panelIdx, tk);
      } else {
        if (C.first) { this.answered(true, false); C.first = false; S.addMistake(`comic:${this.l.id}:${C.blankIdx}`, b.answer, `Truyện "${cm.titleVi}", khung ${b.panel + 1}`); }
        el.classList.add('wrong');
        Sfx.playGentleOops();
        encourage();
      }
    },

    /* ---------- Hội thoại rẽ nhánh (Bước 3 & Bước 5) ---------- */
    branchHTML(br, kind, picked) {
      const who = this.z.chars[br.who];
      const head = kind === 'cb'
        ? bi('🔀 What happens next? You decide!', 'Chuyện gì xảy ra tiếp theo? Con quyết định!')
        : bi('🔀 Your turn – you decide!', 'Đến lượt con – con chọn cách trả lời!');
      return `<div class="card branch-card studs-top" id="branch-${kind}">
        <div class="branch-head">${head}<p class="vi">Cả ${br.options.length} câu đều đúng ngữ pháp nhưng khác sắc thái. ${esc(who.name)} sẽ phản ứng khác nhau tùy lựa chọn của con – thử hết cũng được!</p></div>
        <div class="branch-scene">
          <div class="branch-fig">${LG.renderMinifig(who.fig, { cls: 'fig-who' })}<b>${esc(who.name)}</b></div>
          <button class="bubble from-a branch-q" data-action="say-text" data-text="${esc(br.q)}"><span class="who">${esc(who.name)} 🔊</span><span class="line">${esc(br.q)}</span><span class="vi-line">${esc(br.vi)}</span></button>
        </div>
        <div class="branch-opts">${br.options.map((o, k) => {
          const T = TONES[o.tone] || TONES.calm;
          const tried = (S.state.branches[`${this.l.id}:${kind}`] || []).indexOf(o.tone) !== -1;
          return `<button class="branch-opt tone-${o.tone}${picked === k ? ' picked' : ''}" data-action="branch-pick" data-kind="${kind}" data-i="${k}">
            <span class="tone-chip">${T.ico} ${T.en} · <small>${T.vi}</small>${tried ? ' ✓' : ''}</span>
            <span class="en">${esc(o.en)}</span><small class="vi">${esc(o.vi)}</small></button>`;
        }).join('')}</div>
        <div class="branch-react" id="react-${kind}">${picked !== null && picked !== undefined ? this.reactHTML(br, br.options[picked]) : ''}</div>
      </div>`;
    },

    reactHTML(br, o) {
      const who = this.z.chars[br.who];
      return `<div class="react-row tone-${o.tone}">
        <div class="react-fig">${LG.renderMinifig(who.fig, { cls: 'fig-react' })}<span class="react-emoji">${o.emoji}</span></div>
        <button class="bubble from-a" data-action="say-text" data-text="${esc(o.re)}"><span class="who">${esc(who.name)} 🔊</span><span class="line">${esc(o.re)}</span><span class="vi-line">${esc(o.reVi)}</span></button>
      </div>`;
    },

    branchPick(kind, k, el, spoken) {
      const br = kind === 'cb' ? this.l.branchComic : this.l.branchTalk;
      const st = kind === 'cb' ? this.c : this.t;
      if (!br || !br.options[k]) return;
      const o = br.options[k];
      const firstHere = st.branchPicked === null || st.branchPicked === undefined;
      const newTone = S.tryBranch(`${this.l.id}:${kind}`, o.tone);
      st.branchPicked = k;
      Listener.stop();
      Sfx.playBrickClick();
      if (kind === 'cb') this.renderComic(); else this.renderTalkBranch();
      const card = $(`#branch-${kind}`, overlay);
      if (card) setTimeout(() => card.scrollIntoView({ behavior: 'smooth', block: 'center' }), 60);
      const T = TONES[o.tone] || TONES.calm;
      toast(`${T.ico} ${T.en}!`, `${T.vi} – xem ${this.z.chars[br.who].name} phản ứng thế nào nhé!`, 'good');
      const anchor = $(`#react-${kind}`, overlay) || el;
      if (firstHere) { this.earn(3, anchor); if (spoken) this.earnGold(1, anchor); }
      else if (newTone) this.earn(1, anchor);   // khám phá thêm một sắc thái mới
      const tk = this.token;
      (async () => {
        await Speech.speak(o.en, { pitch: 1.18 });
        if (tk !== this.token) return;
        await sleep(200);
        const fig = $(`#react-${kind} .react-fig svg`, overlay);
        if (fig) fig.classList.add('talking');
        await Speech.speak(o.re, { pitch: br.who === 'a' ? 1.2 : 0.92 });
        if (fig) fig.classList.remove('talking');
      })();
    },

    /* ---------- Bước 4: Sentence Brick Builder + Snowball Upgrade ---------- */
    build() {
      const l = this.l;
      const queue = l.build.map((s, i) => ({ vi: s.vi, answer: s.answer, extra: s.extra, roles: s.roles, level: 0, n: i + 1 }));
      if (l.snowball) {
        l.snowball.levels.forEach((lv) => queue.push({
          vi: lv.vi, situ: l.snowball.vi, answer: lv.bricks, roles: lv.roles, level: lv.level,
          extra: (lv.level === 1 ? l.snowball.extra.slice(0, 2) : l.snowball.extra).filter((x) => lv.bricks.indexOf(x) === -1)
        }));
      }
      this.b = { si: 0, queue, normal: l.build.length };
      this.setupSentence();
    },

    snowHTML(lvl) {
      const info = [null, ['1 brick', '1 viên gạch'], ['3 bricks', '3 viên gạch'], ['5+ bricks', '5+ viên – Super Builder']];
      return `<div class="snow-banner">
        <div class="snow-title">⛄ Snowball Sentence Upgrade <span class="vi">Lắp gạch nâng cấp câu – càng lên cao câu càng dài & lịch sự!</span></div>
        <div class="snow-steps">${[1, 2, 3].map((k) => `<span class="snow-step${k < lvl ? ' done' : k === lvl ? ' cur' : ''}${k === 3 ? ' super' : ''}">
          <b>${k < lvl ? '✓' : k === 3 ? '⭐' : '🧱'} Level ${k}</b><small>${info[k][1]}</small></span>`).join('<i class="snow-arrow">➜</i>')}</div>
      </div>`;
    },

    setupSentence() {
      const B = this.b;
      const s = B.queue[B.si];
      const roles = G.roles(s.answer, s.roles);
      const extra = (s.extra || []).filter((x) => s.answer.indexOf(x) === -1);
      B.bricks = shuffle(s.answer.map((t, i) => ({ t, r: roles[i] })).concat(extra.map((t) => ({ t, r: G.role(t) }))))
        .map((b, i) => Object.assign(b, { id: i }));
      B.placed = [];
      B.first = true; B.hinted = false; B.solved = false; B.goldUp = false; B.spoken = false; B.sayTries = 0;
      // Màu gạch là "giàn giáo": tháng 1–2 hiện màu; từ tháng 3 tắt màu (bấm 🎨 để xem – tính là gợi ý)
      B.colorOn = !(typeof this.z.month === 'number' && this.z.month > diff().colorMonths);
      const lvl = s.level;
      const situ = lvl
        ? `<div class="card situation snow studs-top"><div class="s-vi">🗨️ ${esc(s.situ || '')}${s.situ ? ': ' : ''}${esc(s.vi)}</div><div class="s-en">${[
          '', 'Level 1 · Find the KEY brick! · Tìm viên gạch từ khóa',
          'Level 2 · Build a short sentence! · Lắp câu ngắn',
          'Level 3 · Build a long, polite sentence – double studs! · Lắp câu dài, lịch sự – nhân đôi nút xu!'][lvl]}</div></div>`
        : `<div class="card situation studs-top"><div class="s-vi">🗨️ ${esc(s.vi)}</div><div class="s-en">How do you say it in English? · Em nói bằng tiếng Anh thế nào?</div></div>`;
      this.body().innerHTML = `<div class="step">
        <div class="step-head"><h2>${lvl ? '⛄ Snowball Challenge' : '🔧 Sentence Brick Builder'}</h2><span class="vi">Chạm hoặc kéo các viên gạch chữ lên tấm đế xanh để lắp thành câu hoàn chỉnh${B.colorOn ? '. Màu gạch cho biết vai trò của từ trong câu' : ' – từ tháng 3 gạch không còn tô màu, con đọc kỹ từng chữ nhé (cần thì bấm 🎨)'}. Lắp xong nhớ 🎤 đọc to câu đó!</span></div>
        ${lvl ? this.snowHTML(lvl) : `<div class="builder-count">Sentence ${s.n}/${B.normal} · Câu ${s.n}${this.l.snowball ? ' · sau đó: ⛄ Snowball 3 tầng' : ''}</div>`}
        ${situ}
        ${B.colorOn ? G.legendHTML({ compact: true }) : '<div id="legendSlot"></div>'}
        <div id="builderArea"><div class="baseplate${lvl === 3 ? ' super' : ''}" id="plate"></div><div class="tray-bricks" id="trayB"></div></div>
        <div class="step-foot" id="buildFoot">
          <button class="brick-btn btn-yellow" data-action="build-hint">${bi('💡 Hint', 'Gợi ý')}</button>
          ${B.colorOn ? '' : `<button class="brick-btn btn-white" data-action="build-color">${bi('🎨 Colors', 'Hiện màu vai trò')}</button>`}
          <button class="brick-btn btn-gray" data-action="build-clear">${bi('↺ Clear', 'Làm lại')}</button>
          <button class="brick-btn btn-green" data-action="build-check" id="buildCheck">${bi('✓ Check', 'Kiểm tra')}</button>
        </div>
      </div>`;
      const area = $('#builderArea');
      attachDrag(area, {
        itemSelector: '.word-brick',
        onTap: (el) => this.toggleBrick(Number(el.dataset.bid)),
        makeGhost: (el) => {
          const g = el.cloneNode(true);
          g.classList.add('ghost');
          g.style.width = el.offsetWidth + 'px';
          return g;
        },
        onMove: (x, y) => { $('#plate').classList.toggle('drop-hover', inside($('#plate'), x, y)); },
        onDrop: (el, x, y) => {
          const plate = $('#plate');
          plate.classList.remove('drop-hover');
          const id = Number(el.dataset.bid);
          if (inside(plate, x, y)) this.placeAt(id, this.insertIndex(x, y, id));
          else if (inside($('#trayB'), x, y)) this.unplace(id);
          else this.renderBricks();
        },
        onCancel: () => { const p = $('#plate'); if (p) p.classList.remove('drop-hover'); }
      });
      this.renderBricks();
      if (lvl === 1 && B.si === B.normal) {
        const tk = this.token;
        setTimeout(() => { if (tk === this.token) Speech.speak("Snowball challenge! Let's make the sentence bigger and bigger!"); }, 300);
      }
    },

    renderBricks(bad = -1) {
      const B = this.b;
      const plate = $('#plate'), tray = $('#trayB');
      if (!plate) return;
      const brickEl = (b, extra = '', k = 0) => `<button class="word-brick role-${B.colorOn || B.goldUp ? b.r : 'off'}${extra}" data-bid="${b.id}"${extra.indexOf('gold-up') !== -1 ? ` style="animation-delay:${k * 0.12}s"` : ''}>${esc(b.t)}</button>`;
      plate.innerHTML = B.placed.length
        ? B.placed.map((id, k) => brickEl(B.bricks[id], (bad >= 0 && k >= bad ? ' bad' : '') + (B.goldUp ? ' gold-up' : ''), k)).join('')
        : '<div class="placeholder">⬇️ Put the word bricks here · Lắp gạch chữ vào đây</div>';
      const rest = B.bricks.filter((b) => B.placed.indexOf(b.id) === -1);
      tray.innerHTML = rest.length ? rest.map((b) => brickEl(b)).join('') : '<span class="vi">Khay trống – bấm ✓ Check để kiểm tra</span>';
    },

    toggleBrick(id) {
      if (this.b.solved) return;
      const k = this.b.placed.indexOf(id);
      if (k === -1) this.b.placed.push(id); else this.b.placed.splice(k, 1);
      Sfx.playBrickClick();
      this.renderBricks();
      if (k === -1) Speech.speak(this.b.bricks[id].t);
      this.autoCheckSnowL1();
    },

    /** Snowball Level 1 chỉ có 1 gạch: đặt đúng là tự chấm, bé không phải bấm ✓ Check. */
    autoCheckSnowL1() {
      const B = this.b, curS = B.queue[B.si];
      if (!curS || curS.level !== 1 || curS.answer.length !== 1) return;
      if (B.placed.length === 1 && B.bricks[B.placed[0]].t === curS.answer[0]) {
        setTimeout(() => { if (!this.b.solved) this.buildCheck($('#buildCheck')); }, 320);
      }
    },

    placeAt(id, idx) {
      if (this.b.solved) return;
      const P = this.b.placed;
      const cur = P.indexOf(id);
      if (cur !== -1) { P.splice(cur, 1); if (cur < idx) idx--; }
      P.splice(Math.max(0, Math.min(idx, P.length)), 0, id);
      Sfx.playBrickClick();
      this.renderBricks();
      this.autoCheckSnowL1();
    },

    unplace(id) {
      if (this.b.solved) return;
      const k = this.b.placed.indexOf(id);
      if (k !== -1) this.b.placed.splice(k, 1);
      Sfx.playTap();
      this.renderBricks();
    },

    insertIndex(x, y, dragId) {
      const els = $$('#plate .word-brick').filter((e) => Number(e.dataset.bid) !== dragId);
      for (let k = 0; k < els.length; k++) {
        const r = els[k].getBoundingClientRect();
        if (y < r.top - 6) return k;
        if (y <= r.bottom + 6 && x < r.left + r.width / 2) return k;
      }
      return els.length;
    },

    buildCheck(btn) {
      const B = this.b;
      if (B.solved) return;
      const s = B.queue[B.si];
      const texts = B.placed.map((id) => B.bricks[id].t);
      if (!texts.length) { toast('Add some bricks first!', 'Hãy lắp vài viên gạch trước nhé!', 'warm'); return; }
      const ok = texts.length === s.answer.length && texts.every((t, i) => t === s.answer[i]);
      if (ok) {
        B.solved = true;
        this.answered(B.first, true);
        $('#plate').classList.add('glow');
        Sfx.playSuccessFanfare();
        const sentence = s.answer.join(' ');
        // Thưởng: câu thường 5 · Snowball L1 = 2, L2 = 4, L3 = gấp đôi (10) + gạch hóa vàng
        const reward = (B.hinted ? [3, 1, 2, 3] : [5, 2, 4, 5])[s.level || 0] * (s.level === 3 ? 2 : 1);
        this.earn(reward, btn);
        if (s.level) {
          const firstTime = S.setSnow(this.l.id, s.level);
          if (s.level === 3) {
            B.goldUp = true;
            this.renderBricks();
            $('#plate').classList.add('gold-plate');
            fx.confetti(40);
            Sfx.playSparkle();
            if (firstTime) this.earnGold(1, btn);
            toast('⭐ Super Builder! x2 Studs', 'Siêu thợ xây! Nhân đôi nút xu – gạch đã hóa VÀNG!', 'good');
          } else praise();
        } else praise();
        Speech.speak(sentence);
        const last = B.si + 1 >= B.queue.length;
        const nextS = B.queue[B.si + 1];
        const nextLabel = !nextS ? null : nextS.level === 1 ? bi('⛄ Snowball challenge ▶', 'Thử thách nâng cấp câu') : nextS.level ? bi(`⬆️ Level ${nextS.level} ▶`, 'Lên tầng tiếp theo') : bi('Next sentence ▶', 'Câu tiếp theo');
        B.nextHTML = last ? `<button class="brick-btn btn-green btn-xl" data-action="lesson-next">${bi('Next ▶', 'Tiếp tục')}</button>`
          : `<button class="brick-btn btn-green btn-xl" data-action="build-next">${nextLabel}</button>`;
        // Lắp xong phải NÓI to câu vừa lắp (câu thường & Snowball tầng 3) → tăng thời lượng nói mỗi bài
        B.mustSay = (!s.level || s.level === 3) && this.speakRequired();
        $('#buildFoot').innerHTML = `<button class="brick-btn btn-blue" data-action="say-text" data-text="${esc(sentence)}">${bi('🔊 Listen', 'Nghe lại')}</button>`
          + ((!s.level || s.level === 3) && (Recorder.supported || this.useMic()) ? `<button class="brick-btn btn-red" data-action="build-say" id="buildSay">${bi('🎤 Say the sentence', 'Đọc to câu vừa lắp')}</button>` : '')
          + `<span id="buildNext">${B.mustSay ? '<small class="vi">🎤 Đọc to câu vừa lắp để đi tiếp nhé!</small>' : B.nextHTML}</span>`;
      } else {
        if (B.first) { this.answered(true, false); B.first = false; S.addMistake(`build:${this.l.id}:${B.si}`, s.answer.join(' '), s.vi); }
        let bad = texts.findIndex((t, i) => t !== s.answer[i]);
        if (bad === -1) bad = texts.length; // đúng nhưng thiếu gạch
        this.renderBricks(bad < texts.length ? bad : -1);
        Sfx.playGentleOops();
        if (bad >= texts.length) toast('Almost! Some bricks are missing.', 'Gần xong rồi! Còn thiếu vài viên gạch.', 'warm');
        else toast('Check the shaking bricks!', 'Xem lại những viên gạch đang rung nhé!', 'warm');
      }
    },

    buildColor() {
      const B = this.b;
      if (B.colorOn) return;
      B.colorOn = true; B.hinted = true;
      const slot = $('#legendSlot'); if (slot) slot.innerHTML = G.legendHTML({ compact: true });
      this.renderBricks();
      const btn = $('[data-action="build-color"]', overlay); if (btn) btn.remove();
    },

    async buildSay() {
      const B = this.b, s = B.queue[B.si];
      if (!B.solved || B.saying) return;
      const sentence = s.answer.join(' ');
      B.saying = true;
      const btn = $('#buildSay');
      const res = await this.voiceCheck(sentence, (mode) => {
        if (!btn || !btn.isConnected) return;
        btn.classList.toggle('rec-on', mode !== 'idle');
        btn.innerHTML = mode === 'rec' ? bi('⏹️ Speak now…', 'Con đọc đi – đọc xong tự dừng') : mode === 'listen' ? bi('👂 Listening…', 'Đang nghe…') : bi('🎤 Say it again', 'Đọc lại lần nữa');
      });
      B.saying = false;
      if (res.ok) {
        if (!B.spoken) {
          this.countSpoken(); this.earn(2, btn); toast('Great reading!', 'Con đọc rõ lắm! (+2 Studs)', 'good');
          if (s.level === 3 && res.clip) VoiceBook.add({ kind: 'sentence', lesson: this.l.id, title: this.l.title, text: sentence, blob: res.clip });
        }
        B.spoken = true;
        const nx0 = $('#buildNext'); if (nx0) nx0.innerHTML = B.nextHTML;
        if (res.clip) { await Recorder.play(res.clip); await sleep(200); await Speech.speak(sentence); }
      } else {
        B.sayTries++;
        Sfx.playGentleOops();
        toast(res.said ? `I heard “${res.said}”` : "I can't hear you!", res.said ? 'Nghe lại câu mẫu rồi đọc lại nhé' : 'Đọc TO và RÕ hơn nhé!', 'warm');
      }
      const nx = $('#buildNext');
      if (nx && (B.spoken || B.sayTries >= 5 || !B.mustSay)) nx.innerHTML = B.nextHTML;
    },

    /** Kiểm tra con có nói câu `text` không: nhận diện giọng (nếu có) chấm theo câu mẫu, nếu không thì ghi âm + nhận biết giọng. */
    voiceCheck(text, ui = () => {}, opts = {}) {
      return new Promise((resolve) => {
        const done = (r) => { ui('idle'); resolve(r); };
        const viaRecorder = async () => {
          if (!Recorder.supported) { this.noMic = true; done({ ok: true }); return; }
          ui('rec');
          try {
            let stopped = false;
            const stop = async () => {
              if (stopped) return; stopped = true;
              await Recorder.stop();
              done(Recorder.heardVoice(opts.minVoiceMs || 400) ? { ok: true, clip: Recorder.lastBlob } : { ok: false });
            };
            await Recorder.start({ maxMs: opts.maxMs || 8000, autoStop: true, silenceMs: opts.silenceMs || 1000, minVoiceMs: opts.minVoiceMs || 400, onAuto: stop });
            Sfx.playMicOn();
          } catch (e) { this.noMic = true; done({ ok: true }); }
        };
        Speech.cancel();
        if (this.useMic()) {
          ui('listen');
          const ok = Listener.start({
            onResult: (alts) => { const r = Listener.judge(alts, { hint: text }); done({ ok: r.ok, said: r.text }); },
            onError: (code) => { if (code === 'no-speech' || code === 'aborted') done({ ok: false }); else { if (code === 'network') Listener.blocked = true; viaRecorder(); } },
            onEnd: () => {}
          });
          if (!ok) viaRecorder();
        } else viaRecorder();
      });
    },

    buildHint() {
      const B = this.b;
      if (B.solved) return;
      const s = B.queue[B.si];
      let prefix = 0;
      while (prefix < B.placed.length && B.bricks[B.placed[prefix]].t === s.answer[prefix]) prefix++;
      B.placed = B.placed.slice(0, prefix);
      if (prefix >= s.answer.length) { this.renderBricks(); return; }
      const nextT = s.answer[prefix];
      const brick = B.bricks.find((b) => b.t === nextT && B.placed.indexOf(b.id) === -1);
      if (brick) B.placed.push(brick.id);
      B.hinted = true;
      Sfx.playBrickClick();
      this.renderBricks();
      Speech.speak(nextT);
    },

    /* ---------- Bước 5: Minifigure Role-Play Talk ---------- */
    talk() {
      this.t = { ti: 0 };
      this.setupTalk();
    },

    talkTotal() { return this.l.talk.length + (this.l.branchTalk ? 1 : 0); },

    useMic() {
      return S.state.settings.micMode !== 'fallback' && Listener.supported && !Listener.blocked;
    },

    /** Bố mẹ bật "Bắt buộc luyện nói" và thiết bị có micro (ghi âm hoặc nhận diện) → phải nói mới qua. */
    speakRequired() {
      return S.state.settings.speakMode !== 'optional' && !this.noMic && (Recorder.supported || this.useMic());
    },

    setupTalk() {
      const T = this.t;
      this.stopStudio();
      if (T.ti >= this.l.talk.length) { this.setupTalkBranch(); return; }
      const item = this.l.talk[T.ti];
      T.first = true; T.attempts = 0; T.done = false; T.mode = this.useMic() ? 'mic' : 'fallback'; T.rating = 0; T.choiceOpts = null; T.branch = false; T.tried = false; T.voiced = false; T.hintLevel = 0; T.hintStep = 0; T.longBonus = false;
      // Câu mẫu ẩn cho tới khi con tự nói một lần (hoặc dùng gợi ý mức 3) – tránh "nhại lại"
      this.studio = { state: 'idle', text: item.hint, hidden: diff().model !== 'show' };
      const charB = this.z.chars.b;
      this.body().innerHTML = `<div class="step">
        <div class="step-head"><h2>🎙️ Role-Play Talk</h2><span class="vi">${esc(charB.name)} hỏi con một câu. Hãy trả lời bằng tiếng Anh nhé! (Câu ${T.ti + 1}/${this.talkTotal()})</span></div>
        <div class="talk-stage">
          <div class="talk-fig">
            <div id="talkFig">${this.figFor('b')}</div>
            <b class="en">${esc(charB.name)}</b>
            <button class="brick-btn btn-blue btn-sm" data-action="talk-say">${bi('🔊 Listen again', 'Nghe lại câu hỏi')}</button>
          </div>
          <div>
            <div class="card studs-top">
              <div class="talk-q">“${esc(item.q)}”<span class="vi">${esc(item.vi)}</span></div>
              <div id="hintBox"><button class="brick-btn btn-yellow btn-sm" data-action="talk-hint" style="margin-top:12px">${bi('💡 Hint', 'Gợi ý câu trả lời')}</button></div>
            </div>
            <div id="talkMode"></div>
          </div>
        </div>
      </div>`;
      this.renderTalkMode();
      const tk = this.token;
      setTimeout(() => { if (tk === this.token && this.step === 4) this.talkSay(); }, 400);
    },

    talkSay() {
      const T = this.t;
      const q = T.branch ? this.l.branchTalk.q : this.l.talk[T.ti].q;
      const fig = $('#talkFig svg');
      if (fig) fig.classList.add('talking');
      return Speech.speak(q, { pitch: 0.95 }).then(() => { if (fig) fig.classList.remove('talking'); });
    },

    renderTalkMode(note = '') {
      const T = this.t;
      const box = $('#talkMode');
      if (!box) return;
      if (T.done) {
        box.innerHTML = `<div class="step-foot">
          ${T.ti + 1 < this.talkTotal()
            ? `<button class="brick-btn btn-green btn-xl" data-action="talk-next">${bi(T.ti + 1 >= this.l.talk.length ? '🔀 Your choice talk ▶' : 'Next question ▶', T.ti + 1 >= this.l.talk.length ? 'Hội thoại tự chọn' : 'Câu hỏi tiếp')}</button>`
            : `<button class="brick-btn btn-green btn-xl" data-action="lesson-next">${bi('Open my reward! 🎁', 'Mở phần thưởng')}</button>`}
        </div>`;
        return;
      }
      if (T.mode === 'mic') {
        box.innerHTML = `<div class="mic-wrap">
          <button class="mic-btn" data-action="talk-mic" id="micBtn" aria-label="Microphone">🎙️</button>
          <div class="en" style="font-size:20px">Tap the mic and answer!</div><small class="vi">Chạm micro rồi trả lời to, rõ bằng tiếng Anh</small>
          <div class="transcript" id="transcript">${note || '…'}</div>
          <div class="match-meter"><i id="matchBar" style="width:0%"></i></div>
        </div>
        <div class="btn-row center">
          ${Recorder.supported ? `<button class="brick-btn btn-white btn-sm" data-action="talk-fallback">${bi('🎧 Voice Studio', 'Phòng thu – ghi âm & so sánh')}</button>` : ''}
          <button class="brick-btn btn-white btn-sm" data-action="talk-choose"${this.speakRequired() && !T.tried ? ' hidden' : ''}>${bi('👆 Choose an answer', 'Chọn câu trả lời')}</button>
        </div>
        <p class="talk-tip">${this.speakRequired() && !T.tried ? 'Con hãy thử NÓI trước nhé – bấm 💡 Hint nếu cần câu mẫu. Nói xong mới mở được nút "Chọn câu trả lời".' : 'Cần đúng ≥ 70% từ khóa là được khen nhé! Micro không dùng được? Chọn "Voice Studio" hoặc "Chọn câu trả lời".'}</p>`;
        return;
      }
      if (T.mode === 'fallback') {
        const rec = this.studio.state;
        box.innerHTML = `<div class="fallback-box">
          ${note ? `<p class="talk-tip" style="margin:0 0 10px">${note}</p>` : ''}
          ${this.studioHTML()}
          ${Recorder.supported && rec === 'done' ? `<div class="card" style="margin-top:14px"><div class="q-title en" style="text-align:center;margin:0 0 8px">How did you do? <small class="vi">So với giọng mẫu, con tự chấm mấy sao?</small></div>
            <div class="star-rate">${[1, 2, 3].map((n) => `<button data-action="talk-rate" data-n="${n}" class="${T.rating >= n ? 'on' : ''}" aria-label="${n} stars">⭐</button>`).join('')}</div></div>` : ''}
          ${(!Recorder.supported || T.rating > 0) ? `<div class="card" style="margin-top:14px">${this.choiceHTML()}</div>` : ''}
        </div>
        ${this.useMic() ? `<div class="btn-row center" style="margin-top:12px"><button class="brick-btn btn-white btn-sm" data-action="talk-to-mic">${bi('🎙️ Use the mic', 'Dùng micro chấm điểm')}</button></div>` : ''}`;
        if (rec === 'recording') this.startVu();
        return;
      }
      if (T.mode === 'choose') {
        box.innerHTML = `<div class="card fallback-box">${note ? `<p class="talk-tip" style="margin:0 0 10px">${note}</p>` : ''}${this.choiceHTML()}</div>
          ${this.useMic() ? `<div class="btn-row center" style="margin-top:12px"><button class="brick-btn btn-white btn-sm" data-action="talk-to-mic">${bi('🎙️ Try the mic', 'Thử micro')}</button></div>` : ''}`;
      }
    },

    choiceHTML() {
      const T = this.t, item = this.l.talk[T.ti];
      if (!T.choiceOpts) T.choiceOpts = shuffle(item.choices);
      return `<div class="q-title en" style="font-size:20px;margin-top:6px">Listen and choose the most natural answer:<small class="vi" style="display:block">Nghe và chọn câu trả lời tự nhiên nhất:</small></div>
        <div class="choice-list">${T.choiceOpts.map((c, k) => `<button class="brick-btn btn-white" data-action="talk-pick" data-i="${k}">🔊 ${esc(c)}</button>`).join('')}</div>`;
    },

    talkMic() {
      const T = this.t, item = this.l.talk[T.ti];
      const btn = $('#micBtn');
      if (btn && btn.classList.contains('listening')) { Listener.stop(); return; }
      Speech.cancel();
      Sfx.playMicOn();
      const tr = $('#transcript');
      const started = Listener.start({
        onResult: (alts) => {
          T.tried = true;
          const chooseBtn = $('[data-action="talk-choose"]', overlay); if (chooseBtn) chooseBtn.hidden = false;
          const res = Listener.judge(alts, { q: item.q, keywords: item.keywords, hint: item.hint, wrong: item.choices.slice(1) });
          const pct = Math.round(res.score * 100);
          const bar = $('#matchBar'); if (bar) bar.style.width = pct + '%';
          const trEl = $('#transcript');
          if (res.ok) {
            if (trEl) { trEl.className = 'transcript good'; trEl.innerHTML = `“${esc(res.text)}” ✅ ${pct}%`; }
            this.countSpoken();
            this.talkSuccess(true, $('#micBtn'));
          } else {
            T.attempts++;
            if (T.first) { this.answered(true, false); T.first = false; S.addMistake(`talk:${this.l.id}:${T.ti}`, item.hint, item.vi); }
            if (trEl) { trEl.className = 'transcript try'; trEl.innerHTML = `“${esc(res.text)}” · ${pct}%<br><small class="vi">${res.reason === 'wrong' ? 'Câu này chưa trả lời đúng câu hỏi – nghe lại câu hỏi nhé!' : 'Gần đúng rồi! Bấm 💡 Hint để có gợi ý.'}</small>`; }
            Sfx.playGentleOops();
            encourage();
            this.showHint();
            if (T.attempts >= 2) toast('Try choosing the answer!', 'Thử chọn câu trả lời bên dưới nhé!', 'warm');
          }
        },
        onError: (code) => {
          const b = $('#micBtn'); if (b) b.classList.remove('listening');
          if (code === 'no-speech') { T.tried = true; const cb = $('[data-action="talk-choose"]', overlay); if (cb) cb.hidden = false; }
          if (Listener.blocked || code === 'unsupported' || code === 'start-failed') {
            T.mode = 'fallback';
            this.renderTalkMode('🎙️ Micro chưa dùng được trên thiết bị này (thường gặp khi mở app từ Màn hình chính iPad). Con dùng Phòng thu: nghe mẫu – ghi âm – so sánh giọng nhé!');
            return;
          }
          const trEl = $('#transcript');
          if (trEl) trEl.innerHTML = code === 'no-speech' ? "I didn't hear you. Try again! <small class=\"vi\">Mình chưa nghe thấy, con thử lại nhé!</small>" : 'Oops! Try again. <small class="vi">Có lỗi nhỏ, thử lại nhé!</small>';
        },
        onEnd: () => { const b = $('#micBtn'); if (b) b.classList.remove('listening'); }
      });
      if (started) {
        if (btn) btn.classList.add('listening');
        if (tr) { tr.className = 'transcript'; tr.innerHTML = 'Listening… <small class="vi">Đang nghe…</small>'; }
      }
    },

    /** Thang gợi ý 3 mức: ① từ khóa → ② nửa câu → ③ cả câu (+ mở giọng mẫu trong Phòng thu).
     *  Con tự nói trước; mỗi mức gợi ý giảm một chút thưởng, dùng hết 3 mức thì không có Gold. */
    showHint() {
      const T = this.t, item = this.l.talk[T.ti];
      const steps = diff().hintSteps;
      T.hintStep = Math.min(steps, (T.hintStep || 0) + 1);
      // Cấp 1: gợi ý đầu tiên là cả câu; cấp 2: từ khóa → cả câu; cấp 3: từ khóa → nửa câu → cả câu
      T.hintLevel = steps === 1 ? 3 : steps === 2 ? (T.hintStep === 1 ? 1 : 3) : T.hintStep;
      if (diff().model === 'after1' && this.studio && this.studio.hidden) { this.studio.hidden = false; if (T.mode === 'fallback') setTimeout(() => this.renderTalkMode(), 0); }
      const hb = $('#hintBox');
      const words = item.hint.replace(/[.!?]+$/, '').split(/\s+/);
      let html, say;
      if (T.hintLevel === 1) {
        const keys = words.filter((w) => item.keywords.some((k) => String(k).split('|').some((a) => Listener.normalize(a) === Listener.normalize(w))));
        const show = keys.length ? keys : words.filter((w) => w.length > 3).slice(0, 2);
        html = `🔑 Key words: <b>${show.map(esc).join(' · ')}</b><small class="vi">Từ khóa – con tự ghép thành câu nhé!</small>`;
        say = show.join(', ');
      } else if (T.hintLevel === 2) {
        const half = words.slice(0, Math.ceil(words.length / 2)).join(' ');
        html = `✍️ Start like this: <b>${esc(half)} …</b><small class="vi">Bắt đầu câu như thế này rồi nói tiếp</small>`;
        say = half;
      } else {
        html = `💬 <b>${esc(item.hint)}</b><small class="vi">Câu mẫu – nghe rồi nói theo, sau đó thử tự nói lại không nhìn chữ nhé!</small>`;
        say = item.hint;
        if (this.studio) { this.studio.hidden = false; if (T.mode === 'fallback') this.renderTalkMode(); }
      }
      if (hb) hb.innerHTML = `<div class="hint-box">${html}</div>${T.hintStep < steps ? `<button class="brick-btn btn-yellow btn-sm" data-action="talk-hint" style="margin-top:8px">${bi(`💡 More help (${T.hintStep}/${steps})`, 'Gợi ý thêm')}</button>` : ''}`;
      return say;
    },

    talkSuccess(spoken, el) {
      const T = this.t;
      if (T.done) return;
      T.done = true;
      this.stopStudio();
      this.answered(T.first, true);
      Sfx.playSuccessFanfare();
      const p = praise();
      Speech.speak(p.en);
      const hl = T.hintLevel || 0;
      this.earn(!spoken && !T.voiced && !T.first ? 1 : Math.max(2, 5 - (T.hintStep || 0)), el);
      this.talkCount = (this.talkCount || 0) + 1;
      if (!T.hintStep) this.talkFree = (this.talkFree || 0) + 1;
      // Gold khi con nói được; ở cấp 3 phải tự tạo câu (không dùng tới câu mẫu đầy đủ)
      if ((spoken || T.voiced || (T.rating === 3 && T.first)) && !(S.skillLevel() === 3 && hl >= 3)) this.earnGold(1, el);
      fx.confetti(24);
      this.renderTalkMode();
    },

    talkPick(k, el) {
      const T = this.t, item = this.l.talk[T.ti];
      const opt = T.choiceOpts[k];
      Speech.speak(opt);
      if (opt === item.choices[0]) {
        el.classList.add('right');
        $$('.choice-list .brick-btn', overlay).forEach((b) => { b.style.pointerEvents = 'none'; });
        setTimeout(() => this.talkSuccess(false, el), 600);
      } else {
        if (T.first) { this.answered(true, false); T.first = false; S.addMistake(`talk:${this.l.id}:${T.ti}`, item.choices[0], item.vi); }
        el.classList.add('wrong');
        Sfx.playGentleOops();
        encourage();
      }
    },

    /* ---------- Bước 5b: Hội thoại tự chọn (Branching Talk) ---------- */
    setupTalkBranch() {
      const T = this.t, br = this.l.branchTalk;
      T.branch = true; T.branchPicked = null; T.done = false; T.branchSpoken = false;
      this.studio = { state: 'idle', text: br.options[0].en };
      const who = this.z.chars[br.who];
      this.body().innerHTML = `<div class="step">
        <div class="step-head"><h2>🔀 Your Choice Talk</h2><span class="vi">${esc(who.name)} nói với con. Chọn – hoặc nói to – cách trả lời con thích nhất. Nhân vật sẽ phản ứng theo lựa chọn của con! (Câu ${T.ti + 1}/${this.talkTotal()})</span></div>
        <div id="talkBranch"></div>
        <div id="studioBox"></div>
        <div id="branchFoot"></div>
      </div>`;
      this.renderTalkBranch();
      const tk = this.token;
      setTimeout(() => { if (tk === this.token && this.step === 4) Speech.speak(br.q, { pitch: br.who === 'a' ? 1.2 : 0.95 }); }, 400);
    },

    renderTalkBranch() {
      const T = this.t, br = this.l.branchTalk;
      const box = $('#talkBranch');
      if (!box) return;
      const picked = T.branchPicked;
      box.innerHTML = this.branchHTML(br, 'tb', picked)
        + (picked === null && this.useMic() ? `<div class="mic-wrap">
            <button class="mic-btn" data-action="branch-mic" id="micBtn" aria-label="Microphone">🎙️</button>
            <div class="en" style="font-size:19px">Or say one of the answers!</div><small class="vi">Hoặc chạm micro và nói to một câu – app sẽ nhận ra con chọn hướng nào</small>
            <div class="transcript" id="transcript">…</div>
          </div>` : '');
      if (picked !== null) {
        if (this.studio.text !== br.options[picked].en) this.studio = { state: 'idle', text: br.options[picked].en };
        const mustSay = this.speakRequired() && Recorder.supported && !T.branchSpoken;
        $('#studioBox').innerHTML = `<p class="talk-tip" style="margin:18px 0 0">${mustSay ? '🎤 Giờ con hãy NÓI câu con vừa chọn: ① nghe mẫu → ② bấm Record và nói to → mở phần thưởng!' : '🎧 Luyện nói lại câu con vừa chọn trong Phòng thu' + (this.speakRequired() ? '' : ' (không bắt buộc)')}</p>${this.studioHTML()}`;
        $('#branchFoot').innerHTML = mustSay ? '' : `<div class="step-foot"><button class="brick-btn btn-green btn-xl" data-action="lesson-next">${bi('Open my reward! 🎁', 'Mở phần thưởng')}</button></div>`;
      }
    },

    branchMic() {
      const br = this.l.branchTalk;
      const btn = $('#micBtn');
      if (btn && btn.classList.contains('listening')) { Listener.stop(); return; }
      Speech.cancel();
      Sfx.playMicOn();
      const started = Listener.start({
        onResult: (alts) => {
          let best = -1, bestScore = 0, text = alts[0] || '';
          br.options.forEach((o, k) => {
            const r = Listener.score(alts, [], o.en);
            if (r.score > bestScore) { bestScore = r.score; best = k; text = r.text; }
          });
          const trEl = $('#transcript');
          if (best >= 0 && bestScore >= 0.5) {
            if (trEl) { trEl.className = 'transcript good'; trEl.innerHTML = `“${esc(text)}” ✅`; }
            this.t.branchSpoken = true; this.countSpoken();
            this.branchPick('tb', best, btn, true);
          } else {
            if (trEl) { trEl.className = 'transcript try'; trEl.innerHTML = `“${esc(text)}”<br><small class="vi">Mình chưa nhận ra con chọn câu nào – nói lại, hoặc chạm vào một câu trả lời nhé!</small>`; }
            Sfx.playGentleOops();
          }
        },
        onError: (code) => {
          const b = $('#micBtn'); if (b) b.classList.remove('listening');
          const trEl = $('#transcript');
          if (Listener.blocked || code === 'unsupported' || code === 'start-failed') {
            const wrap = b && b.closest('.mic-wrap'); if (wrap) wrap.innerHTML = '<p class="talk-tip">🎙️ Micro chưa dùng được – con chạm vào câu trả lời ở trên nhé!</p>';
            return;
          }
          if (trEl) trEl.innerHTML = code === 'no-speech' ? "I didn't hear you. Try again! <small class=\"vi\">Mình chưa nghe thấy, con thử lại nhé!</small>" : 'Oops! Try again.';
        },
        onEnd: () => { const b = $('#micBtn'); if (b) b.classList.remove('listening'); }
      });
      if (started && btn) { btn.classList.add('listening'); const tr = $('#transcript'); if (tr) { tr.className = 'transcript'; tr.innerHTML = 'Listening… <small class="vi">Đang nghe…</small>'; } }
    },

    /* ---------- Shadowing Voice Studio (MediaRecorder + AudioContext Analyser) ---------- */
    studioHTML() {
      const st = this.studio || { state: 'idle', text: '' };
      const rec = st.state;
      const COLS = 12, ROWS = 7;
      const colColor = (i) => G.ROLES[G.ORDER[i % G.ORDER.length]].color;
      const vu = `<div class="vu-bricks${rec === 'recording' ? ' live' : ''}" id="vuBricks" aria-hidden="true">${Array.from({ length: COLS }, (_, i) =>
        `<div class="vu-col" style="--vc:${colColor(i)};--d:${(i % 5) * 0.09}s">${'<i></i>'.repeat(ROWS)}</div>`).join('')}</div>`;
      const hidden = st.hidden && Recorder.supported;
      return `<div class="card studio studs-top">
        <div class="studio-head"><b class="en">🎧 Voice Studio</b><span class="vi">${hidden
          ? '① Con TỰ nghĩ và nói câu trả lời → ② bấm 🎤 Record → ③ app mở câu mẫu để con so sánh. Cần giúp thì bấm 💡 Hint.'
          : '① Nghe giọng mẫu (máy đọc) → ② Ghi âm giọng con (gạch LEGO nhảy theo giọng) → ③ Compare: nghe mẫu rồi nghe ngay giọng con'}</span></div>
        ${hidden ? '<div class="studio-line studio-hidden">🤔 Your own answer! <small class="vi">Câu mẫu sẽ hiện sau khi con tự nói</small></div>' : `<button class="studio-line" data-action="studio-model">🔊 “${esc(st.text)}”</button>`}
        ${Recorder.supported ? vu : ''}
        <div class="cmp-strip" id="cmpStrip"><span class="cmp native">🔊 Model</span><span class="cmp-vs">VS</span><span class="cmp you">🎤 You</span></div>
        <div class="btn-row center">
          ${hidden ? '' : `<button class="brick-btn btn-blue btn-sm" data-action="studio-model">${bi('🔊 Model voice', 'Giọng mẫu (máy đọc)')}</button>`}
          ${Recorder.supported ? `<button class="brick-btn ${rec === 'recording' ? 'btn-orange' : 'btn-red'} btn-sm${rec === 'recording' ? ' rec-on' : ''}" data-action="studio-rec">${bi(rec === 'recording' ? '⏹️ Stop' : rec === 'done' ? '🎤 Record again' : '🎤 Record', rec === 'recording' ? 'Đang ghi – chạm để dừng' : 'Ghi âm giọng con')}</button>` : ''}
          ${rec === 'done' ? `<button class="brick-btn btn-white btn-sm" data-action="studio-play">${bi('▶ My voice', 'Giọng của con')}</button>
            ${hidden ? '' : `<button class="brick-btn btn-purple btn-sm" data-action="studio-compare">${bi('🆚 Compare Voice', 'So sánh giọng')}</button>`}` : ''}
        </div>
        ${Recorder.supported ? '' : '<p class="talk-tip">Thiết bị này chưa hỗ trợ ghi âm – con nghe giọng mẫu rồi nói to theo nhé!</p>'}
      </div>`;
    },

    refreshStudio() {
      if (this.t && this.t.branch) {
        const box = $('#studioBox');
        const card = box && $('.studio', box);
        if (card) card.outerHTML = this.studioHTML();
        else if (box) box.innerHTML = `<p class="talk-tip" style="margin:18px 0 0">🎧 Luyện nói lại câu con vừa chọn trong Phòng thu</p>${this.studioHTML()}`;
        if (this.studio.state === 'recording') this.startVu();
      } else this.renderTalkMode();
    },

    startVu() {
      const tk = ++this.vuToken;
      let cols = [];
      const tick = () => {
        if (tk !== this.vuToken) return;
        if (!cols.length || !cols[0].isConnected) cols = $$('#vuBricks .vu-col', overlay);
        const lv = Recorder.levels(cols.length || 12);
        if (lv) cols.forEach((c, i) => {
          const n = Math.round(lv[i] * c.children.length);
          for (let j = 0; j < c.children.length; j++) c.children[j].classList.toggle('on', j < n);
        });
        requestAnimationFrame(tick);
      };
      requestAnimationFrame(tick);
    },

    stopVu() {
      this.vuToken++;
      $$('#vuBricks .vu-col i.on', overlay).forEach((b) => b.classList.remove('on'));
    },

    /** Dừng ghi âm/sóng âm khi rời câu hỏi (không làm mất bản ghi cũ). */
    stopStudio() {
      this.stopVu();
      if (Recorder.isRecording()) Recorder.stop().then(() => Recorder.release());
      else Recorder.release();
      if (this.studio && this.studio.state === 'recording') this.studio.state = Recorder.hasRecording() ? 'done' : 'idle';
    },

    async vuPlay(fn, mark) {
      const vu = $('#vuBricks', overlay);
      const strip = $('#cmpStrip', overlay);
      if (vu) vu.classList.add('playing');
      if (strip && mark) { strip.classList.add('show'); $$('.cmp', strip).forEach((c) => c.classList.toggle('on', c.classList.contains(mark))); }
      try { await fn(); } finally {
        if (vu) vu.classList.remove('playing');
        if (strip) $$('.cmp', strip).forEach((c) => c.classList.remove('on'));
      }
    },

    studioModel() {
      const st = this.studio;
      if (!st || st.state === 'recording' || (st.hidden && Recorder.supported)) return;
      this.vuPlay(() => Speech.speak(st.text, { rate: Math.min(0.9, Speech.rate) }), 'native');
    },

    async studioRec() {
      const st = this.studio;
      if (!st) return;
      const tk = this.token;
      try {
        if (st.state === 'recording') {
          this.stopVu();
          await Recorder.stop();
          if (tk !== this.token) return;
          if (!Recorder.heardVoice(400)) {
            // Không có tiếng nói trong bản ghi → chưa tính, mời con nói lại to hơn
            st.state = 'idle';
            this.refreshStudio();
            this.voiceMiss();
            return;
          }
          st.state = 'done';
          this.afterVoice();
          this.refreshStudio();
          Sfx.playBrickClick();
          await this.vuPlay(() => Recorder.play(), 'you');
        } else {
          Speech.cancel();
          await Recorder.start();
          if (tk !== this.token) { Recorder.stop(); return; }
          Sfx.playMicOn();
          st.state = 'recording';
          if (this.t && !this.t.branch) this.t.rating = 0;
          this.refreshStudio();
          this.startVu();
        }
      } catch (e) {
        st.state = 'idle';
        this.stopVu();
        if (this.t && !this.t.branch) {
          this.noMic = true;
          this.t.mode = 'choose';
          this.renderTalkMode('🎤 Chưa ghi âm được (có thể chưa cấp quyền micro). Con nói to câu trả lời rồi chọn câu đúng nhé!');
        } else {
          this.refreshStudio();
          toast('Microphone is off', 'Chưa ghi âm được – hãy cho phép dùng micro nhé', 'warm');
        }
      }
    },

    /** Đếm một lần con thực sự nói (để thưởng & báo cáo cho bố mẹ). */
    countSpoken() { S.recordSpeak(); this.spokeN = (this.spokeN || 0) + 1; },

    /** Bản ghi trong Phòng thu có giọng con → mở khóa bước tiếp theo. */
    afterVoice() {
      const T = this.t || {};
      if (this.studio && this.studio.hidden) { this.studio.hidden = false; toast('Now compare!', 'Giờ nghe câu mẫu và so với giọng con nhé (🆚 Compare)', 'good'); }
      if (T.gym) {
        S.recordSpeak();
        const r = Gym.round();
        if (r && !Gym.vbSaved) { Gym.vbSaved = true; VoiceBook.add({ kind: 'gym', title: 'Speaking Gym', text: r.q, blob: Recorder.lastBlob }); }
        Gym.voiced(); return;
      }
      this.countSpoken();
      // Thưởng NÓI DÀI: trả lời dài hơn câu mẫu (thêm lý do, chi tiết) → +2 Studs
      if (!T.branch && this.l && this.l.talk[T.ti]) {
        const expect = this.l.talk[T.ti].hint.split(/\s+/).length * 0.42;
        if ((Recorder.voiceMs || 0) / 1000 >= Math.max(2, expect * 1.4) && !T.longBonus) {
          T.longBonus = true; this.earn(2, $('#talkMode'));
          toast('🗣️ Long answer! +2', 'Con trả lời dài và đầy đủ – tuyệt vời!', 'good');
        }
      }
      if (!T.branch && this.l && (this.vbSaved || 0) < 1) {
        this.vbSaved = (this.vbSaved || 0) + 1;
        VoiceBook.add({ kind: 'talk', lesson: this.l.id, title: this.l.title, text: this.l.talk[T.ti].q, blob: Recorder.lastBlob });
      }
      if (T.branch) {
        const wasLocked = !T.branchSpoken;
        T.branchSpoken = true;
        if (wasLocked && T.branchPicked !== null && T.branchPicked !== undefined) {
          const f = $('#branchFoot');
          if (f) f.innerHTML = `<div class="step-foot"><button class="brick-btn btn-green btn-xl" data-action="lesson-next">${bi('Open my reward! 🎁', 'Mở phần thưởng')}</button></div>`;
          toast('Great voice!', 'Giọng con rõ lắm! Mở phần thưởng nào 🎁', 'good');
        }
      } else T.voiced = true;
    },

    voiceMiss() {
      Sfx.playGentleOops();
      const T = this.t || {};
      if (T.gym) Gym.voiceMiss();
      toast("I can't hear you!", 'Mình chưa nghe thấy giọng con – bấm 🎤 Record rồi nói TO và RÕ nhé!', 'warm');
    },

    async studioCompare() {
      const st = this.studio;
      if (!st || st.state !== 'done') return;
      const tk = this.token;
      await this.vuPlay(() => Speech.speak(st.text, { rate: Math.min(0.9, Speech.rate) }), 'native');
      if (tk !== this.token) return;
      await sleep(350);
      if (tk !== this.token) return;
      await this.vuPlay(() => Recorder.play(), 'you');
    },

    /* ---------- Bước 6: Unbox & Build! ---------- */
    unbox() {
      this.u = { taps: 0, opened: false, newly: [], finished: false, wasComplete: S.zoneProgress(this.z.id).complete };
      this.body().innerHTML = `<div class="step"><div class="unbox">
        <div class="step-head"><h2>🎁 Unbox & Build!</h2><span class="vi">Túi Mù LEGO bí ẩn! Chạm 3 lần để xé túi nào!</span></div>
        <button class="polybag-btn" data-action="bag-tap" id="bagBtn" aria-label="Mystery bag">${LG.renderPolybag(this.z.color, 0)}</button>
        <div class="tap-dots">${[0, 1, 2].map((i) => `<i data-d="${i}"></i>`).join('')}</div>
        <div id="lootBox"></div>
      </div><div id="quickBuild"></div></div>`;
      Speech.speak('Tap three times to open the mystery bag!');
    },

    bagTap() {
      const U = this.u;
      if (U.opened) return;
      U.taps++;
      const bag = $('#bagBtn');
      $$('.tap-dots i', overlay).forEach((d, i) => d.classList.toggle('on', i < U.taps));
      Sfx.playTear(U.taps);
      bag.classList.remove('shake'); void bag.offsetWidth; bag.classList.add('shake');
      bag.innerHTML = LG.renderPolybag(this.z.color, U.taps);
      if (U.taps >= 3) {
        U.opened = true;
        setTimeout(() => this.openBag(), 350);
      }
    },

    openBag() {
      const U = this.u;
      const bag = $('#bagBtn');
      bag.classList.add('torn');
      Sfx.playWhoosh();
      const acc = this.stats.total ? this.stats.correct / this.stats.total : 1;
      // Ngưỡng thành thạo: dưới 70% chỉ mở một nửa mảnh ghép; luyện lại đạt ≥ 70% mới mở nốt
      const MASTERY = diff().mastery;
      const give = acc >= MASTERY ? this.l.parts : this.l.parts.slice(0, Math.ceil(this.l.parts.length / 2));
      U.locked = this.l.parts.filter((i) => give.indexOf(i) === -1 && !S.parts(this.z.id)[i]);
      U.newly = S.unlockParts(this.z.id, give);
      const stars = acc >= 0.9 ? 3 : acc >= MASTERY ? 2 : 1;
      U.stars = stars; U.acc = acc;
      const bonus = 10 + stars * 5;
      setTimeout(() => {
        bag.style.display = 'none';
        $('.tap-dots', overlay).style.display = 'none';
        Sfx.playSuccessFanfare();
        fx.confetti(60);
        const m = LG.MODELS[this.z.id];
        const lootParts = U.newly.length ? U.newly : [];
        $('#lootBox').innerHTML = `<div class="loot">
          ${lootParts.map((i, k) => `<div class="loot-item" style="animation-delay:${k * 0.12}s">${LG.renderPart(this.z.id, i)}<small>${esc(m.parts[i].n)}</small></div>`).join('')}
          <div class="loot-item" style="animation-delay:${lootParts.length * 0.12}s;display:grid;place-items:center;min-height:120px"><i class="stud-icon" style="width:48px;height:48px"></i><small>+${bonus} Studs</small></div>
        </div>
        ${U.locked.length ? `<div class="card mastery-note"><b>🔒 ${U.locked.length} mảnh ghép đang chờ con!</b><span class="vi">Lần này con đúng ${Math.round(acc * 100)}% (cần ${Math.round(diff().mastery * 100)}%). Luyện lại bài này thật kỹ để mở nốt mảnh ghép nhé – con làm được mà! 💪</span>
          <button class="brick-btn btn-orange btn-sm" data-action="start-lesson" data-lesson="${this.l.id}" data-force="1">${bi('🔁 Practice again', 'Luyện lại bài này')}</button></div>` : ''}
        ${lootParts.length || U.locked.length ? '' : '<p class="vi" style="margin-top:10px">Con đã có đủ mảnh ghép của bài này – đây là nút xu thưởng thêm cho lần ôn lại!</p>'}`;
        this.earn(bonus, $('#lootBox'));
        if (lootParts.length) {
          Speech.speak(`You got ${lootParts.length} new parts! Let's build!`);
          this.mountQuickBuild();
        } else {
          this.finishLesson();
        }
      }, 450);
    },

    mountQuickBuild() {
      const qb = $('#quickBuild');
      const m = LG.MODELS[this.z.id];
      qb.innerHTML = `<h3 class="section-title">⚡ Quick Build <span class="vi">Bàn lắp ráp nhanh – kéo mảnh ghép vào mô hình ${esc(m.vi)}, hoặc chạm mảnh rồi chạm vào mô hình!</span></h3>
        <div id="qbBench"></div>
        <div class="step-foot"><button class="brick-btn btn-gray btn-sm" data-action="qb-later">${bi('Build later in Workshop', 'Để sau – lắp ở Xưởng')}</button></div>`;
      const lessonParts = this.l.parts;
      mountBench($('#qbBench'), {
        zoneId: this.z.id,
        tray: () => lessonParts.filter((i) => S.parts(this.z.id)[i] === 1),
        emptyHTML: '✅ All built!<br><small>Đã lắp xong!</small>',
        onAssembled: () => {
          updateWallet();
          const left = lessonParts.filter((i) => S.parts(this.z.id)[i] === 1).length;
          if (left === 0 && !this.u.finished) setTimeout(() => this.finishLesson(), 600);
        },
        onComplete: () => {}
      });
      qb.scrollIntoView({ behavior: 'smooth', block: 'start' });
    },

    finishLesson() {
      const U = this.u;
      if (U.finished) return;
      U.finished = true;
      const l = this.l, z = this.z;
      S.completeLesson(l.id, { stars: U.stars, accuracy: Math.round(U.acc * 100) });
      const lvChange = S.recordLessonSkill({ lesson: l.id, acc: U.acc, free: this.talkCount ? this.talkFree / this.talkCount : 0 });
      if (lvChange === 'up') setTimeout(() => { fx.confetti(60); toast(`${diff().icon} Level up! Level ${S.skillLevel()}`, `Con đã lên Cấp ${S.skillLevel()} – ${diff().vi}! Bài học sẽ thử thách hơn một chút 💪`, 'good'); }, 1600);
      if (lvChange === 'down') setTimeout(() => toast(`${diff().icon} Level ${S.skillLevel()}`, `Mình học chậm lại một chút ở Cấp ${S.skillLevel()} – ${diff().vi} cho chắc nhé!`, 'warm'), 1600);
      l.words.forEach((w) => S.learnWord(w.id));
      $$('.lp-brick', overlay).forEach((b) => { b.classList.add('on'); b.classList.remove('current'); });
      const nextL = z.lessons[l.index + 1] || (() => { const zi = ZONES.indexOf(z); return ZONES[zi + 1] ? ZONES[zi + 1].lessons[0] : null; })();
      const setDone = S.zoneProgress(z.id).complete;
      const mysNew = mysteryOpen(z) && !(S.mystery(z.id) || {}).done;
      const qbLater = $('[data-action="qb-later"]', overlay);
      if (qbLater) qbLater.remove();
      const box = document.createElement('div');
      box.className = 'card lesson-done studs-top';
      box.innerHTML = `<h3>🎉 Lesson Complete!</h3><span class="vi">Hoàn thành bài học “${esc(l.titleVi)}”!</span>
        <div style="font-size:40px;margin:8px 0">${starsHTML(U.stars)}</div>
        <div class="reward-row">
          <span class="reward"><i class="stud-icon"></i>+${this.studs} Studs</span>
          <span class="reward"><i class="gold-icon"></i>+${this.gold} Gold</span>
          <span class="reward">🎯 ${Math.round(U.acc * 100)}%</span>
          <span class="reward">🔤 ${l.words.length} words</span>
          ${this.spokeN ? `<span class="reward">🎤 ${this.spokeN}× spoken</span>` : ''}
        </div>
        ${this.spokeN ? `<p class="vi speak-praise">🎤 Hôm nay con đã nói tiếng Anh ${S.speakToday()} lần. Nói càng nhiều, càng tự tin!</p>` : ''}
        <p class="vi" style="margin-bottom:14px">Các từ mới đã vào lịch ôn: 1 – 3 – 7 – 14 – 30 ngày. Khi mô hình trên Sa bàn hiện 🔧, con nhớ vào bảo trì nhé! Gạch từ vựng mới đã vào 🛂 Hộ chiếu của con.</p>
        ${mysNew ? `<div class="mystery-unlock"><b>🕵️ LEGO Mystery Mission unlocked!</b><span class="vi">Con đã học xong cả vùng đất – mở nhiệm vụ thám tử “${esc(z.mystery.titleVi)}” nhé!</span>
          <button class="brick-btn btn-purple" data-action="mystery" data-zone="${z.id}">${bi('🔍 Solve the mystery', 'Phá án ngay')}</button></div>` : ''}
        <div class="btn-row center">
          ${nextL ? `<button class="brick-btn btn-red" data-action="start-lesson" data-lesson="${nextL.id}">${bi('▶ Next lesson', 'Bài tiếp theo')}</button>` : ''}
          <button class="brick-btn btn-blue" data-action="lesson-exit" data-screen="workshop">${bi('🧱 Workshop', 'Xưởng lắp ráp')}</button>
          <button class="brick-btn ${setDone ? 'btn-purple' : 'btn-white'}" data-action="lesson-exit" data-screen="${setDone ? 'diorama' : 'map'}">${bi(setDone ? '🏙️ My World' : '🌍 Map', setDone ? 'Xem Sa bàn' : 'Bản đồ')}</button>
        </div>`;
      $('.step', this.body()).appendChild(box);
      Speech.speak(`Lesson complete! You are a brilliant builder!`);
      setTimeout(() => box.scrollIntoView({ behavior: 'smooth', block: 'center' }), 200);
      if (setDone && !U.wasComplete) setTimeout(() => celebrateSet(z.id), 1200);
    }
  };

  /* =========================================================
     TRẠM BẢO TRÌ (Ôn tập Spaced Repetition)
     ========================================================= */
  const Review = {
    token: 0,
    start(zoneId) {
      closeModal();
      let due = S.dueWordIds();
      if (zoneId) due = due.filter((id) => WORDS[id] && WORDS[id].zoneId === zoneId);
      due = shuffle(due).filter((id) => WORDS[id]);
      if (!due.length) { toast('All shiny!', 'Mô hình đang sáng bóng – chưa có từ nào đến hạn ôn!', 'good'); return; }
      let items = due.slice(0, 5).map((id) => ({ id, due: true }));
      if (items.length < 5) {
        const extra = shuffle(S.learnedWordIds().filter((id) => WORDS[id] && items.every((x) => x.id !== id) && (!zoneId || WORDS[id].zoneId === zoneId)));
        items = items.concat(extra.slice(0, 5 - items.length).map((id) => ({ id, due: false })));
      }
      // Gợi nhớ CHỦ ĐỘNG: 2/5 câu là "nhìn hình + nghe gợi ý → tự NÓI ra từ" (chuyển từ vựng sang khả năng nói)
      const types = ['say', 'listen', 'meaning', 'say', 'translate'];
      this.items = items.map((it, i) => Object.assign(it, { type: types[i % types.length] }));
      this.i = 0; this.results = []; this.zoneId = zoneId; this.token++;
      Speech.cancel();
      overlay.hidden = false;
      overlay.innerHTML = `<div class="lesson-top">
          <button class="brick-btn btn-white btn-round" data-action="review-close" aria-label="Close">✕</button>
          <div style="text-align:center"><b class="en" style="font-size:22px">🔧 Maintenance Station</b><div class="lesson-step-name">Trạm bảo trì – siết ốc & lau bụi bằng 5 câu ôn nhanh</div></div>
          <div class="lesson-earned"><span class="chip" style="box-shadow:0 4px 0 var(--card-edge)"><i class="gold-icon"></i><b id="rvGold">0</b></span></div>
        </div>
        <div class="lesson-body" id="reviewBody"></div>`;
      this.render();
    },

    render() {
      const body = $('#reviewBody');
      if (this.i >= this.items.length) return this.finish();
      const it = this.items[this.i];
      const w = WORDS[it.id];
      if (it.type === 'say') return this.renderSay(it, w);
      const pool = Object.values(WORDS).filter((x) => x.zoneId === w.zoneId && x.id !== w.id);
      const opts = shuffle([w].concat(shuffle(pool).slice(0, 3)));
      this.opts = opts; this.answered = false;
      let q = '';
      if (it.type === 'listen') {
        q = `<div class="big-emoji">👂</div><div class="en" style="font-size:24px">Listen! Which brick is it?</div><div class="vi">Nghe rồi chọn từ đúng</div>
          <button class="brick-btn btn-blue" data-action="rv-say" style="margin-top:12px">${bi('🔊 Listen again', 'Nghe lại')}</button>`;
      } else if (it.type === 'meaning') {
        q = `<div class="big-emoji">${w.emoji}</div><div class="q-vi">${esc(w.vi)}</div><div class="vi">Chọn từ tiếng Anh đúng với nghĩa này</div>`;
      } else {
        q = `<div class="big-emoji">${w.emoji}</div><div class="q-word">${esc(w.en)}</div><div class="vi">Từ này nghĩa là gì?</div>`;
      }
      const optLabel = (o) => it.type === 'translate' ? `<span class="o-word" style="font-size:19px">${esc(o.vi)}</span>` : `<span class="o-emoji">${it.type === 'meaning' ? '' : o.emoji}</span><span class="o-word">${esc(o.en)}</span>`;
      body.innerHTML = `<div class="step">
        <div class="review-meter">${this.items.map((x, k) => `<i class="${k < this.results.length ? (this.results[k] ? 'ok' : 'no') : k === this.i ? 'cur' : ''}"></i>`).join('')}</div>
        <div class="card review-q studs-top" style="margin-bottom:22px">${q}</div>
        <div class="opt-grid">${opts.map((o, k) => `<button class="opt-brick" data-action="rv-pick" data-i="${k}" style="--oc:${BRICK_COLORS[k]};--ocd:${LG.shade(BRICK_COLORS[k], -0.3)};min-height:110px">${optLabel(o)}</button>`).join('')}</div>
      </div>`;
      if (it.type !== 'meaning') setTimeout(() => this.say(), 350);
    },

    say() { const w = WORDS[this.items[this.i].id]; Speech.speak(w.en.replace(/\.\.\./g, '')); },

    /** Ôn tập chủ động: nhìn hình + nghe câu đố tiếng Anh → con tự nói từ → mở đáp án, nghe lại & tự chấm. */
    renderSay(it, w) {
      const body = $('#reviewBody');
      this.sayState = { phase: 'ask', clip: null };
      body.innerHTML = `<div class="step">
        <div class="review-meter">${this.items.map((x, k) => `<i class="${k < this.results.length ? (this.results[k] ? 'ok' : 'no') : k === this.i ? 'cur' : ''}"></i>`).join('')}</div>
        <div class="card review-q studs-top" style="margin-bottom:18px">
          <div class="big-emoji">${w.emoji}</div>
          <div class="en" style="font-size:22px">🎤 Say the word! <small class="vi" style="display:block">Nhìn hình, nghe câu đố rồi tự NÓI từ tiếng Anh</small></div>
          <button class="brick-btn btn-blue btn-sm" data-action="rv-clue" style="margin-top:10px">${bi('🔊 Riddle', 'Nghe câu đố')}</button>
          <div class="rv-clue en">${esc(w.clue)}</div>
          <div id="rvAnswer"></div>
        </div>
        <div class="btn-row center" id="rvSayBtns">
          ${Recorder.supported || Lesson.useMic() ? `<button class="brick-btn btn-red btn-xl" data-action="rv-speak" id="rvSpeak">${bi('🎤 Say it', 'Nói từ đó')}</button>` : ''}
          <button class="brick-btn btn-white" data-action="rv-reveal">${bi('🤷 I forgot – show me', 'Con quên rồi – xem đáp án')}</button>
        </div>
      </div>`;
      setTimeout(() => this.clue(), 350);
    },

    clue() { const w = WORDS[this.items[this.i].id]; Speech.speak(w.clue); },

    async speakWord() {
      const st = this.sayState, w = WORDS[this.items[this.i].id], tk = this.token;
      if (!st || st.phase !== 'ask' || st.busy) return;
      st.busy = true;
      const btn = $('#rvSpeak');
      const res = await Lesson.voiceCheck(w.en.replace(/\.\.\./g, ''), (mode) => {
        if (!btn || !btn.isConnected) return;
        btn.classList.toggle('rec-on', mode !== 'idle');
        btn.innerHTML = mode === 'rec' ? bi('⏹️ Speak now…', 'Con nói đi') : mode === 'listen' ? bi('👂 Listening…', 'Đang nghe…') : bi('🎤 Say it', 'Nói từ đó');
      });
      st.busy = false;
      if (tk !== this.token) return;
      if (!res.ok && !res.said) { Sfx.playGentleOops(); toast("I can't hear you!", 'Nói TO và RÕ hơn nhé!', 'warm'); return; }
      S.recordSpeak();
      // Có nhận diện giọng: chấm tự động. Không có (iPad Màn hình chính): mở đáp án để con tự chấm.
      if (res.said !== undefined) this.sayResult(res.ok);
      else this.reveal(res.clip);
    },

    async reveal(clip, forgot) {
      const st = this.sayState, w = WORDS[this.items[this.i].id], tk = this.token;
      if (!st || st.phase !== 'ask') return;
      st.phase = 'check';
      const ans = $('#rvAnswer');
      if (ans) ans.innerHTML = `<div class="q-word" style="margin-top:12px">${esc(w.en)}</div><div class="vi">${esc(w.vi)}</div>`;
      const btns = $('#rvSayBtns');
      if (forgot) { this.sayResult(false); return; }
      if (btns) btns.innerHTML = `<div class="vi" style="width:100%;text-align:center;font-weight:800">Con đã nói đúng từ này chưa? Nghe lại giọng con & giọng mẫu rồi tự chấm thật thà nhé!</div>
        <button class="brick-btn btn-green" data-action="rv-self" data-ok="1">${bi('✅ I said it right', 'Con nói đúng')}</button>
        <button class="brick-btn btn-orange" data-action="rv-self" data-ok="0">${bi('🔁 Not quite', 'Chưa đúng lắm')}</button>`;
      if (clip) { await Recorder.play(clip); if (tk !== this.token) return; await sleep(250); }
      Speech.speak(w.en.replace(/\.\.\./g, ''));
    },

    sayResult(ok) {
      const it = this.items[this.i], w = WORDS[it.id];
      if (this.sayState) this.sayState.phase = 'done';
      if (it.due) S.reviewWord(w.id, ok); else S.recordAnswer(w.id, ok);
      this.results.push(ok);
      const ans = $('#rvAnswer');
      if (ans && !ans.innerHTML) ans.innerHTML = `<div class="q-word" style="margin-top:12px">${esc(w.en)}</div><div class="vi">${esc(w.vi)}</div>`;
      if (ok) { Sfx.playBrickClick(); praise(); } else { Sfx.playGentleOops(); S.addMistake('word:' + w.id, w.en, w.vi); Speech.speak(w.en.replace(/\.\.\./g, '')); }
      const btns = $('#rvSayBtns'); if (btns) btns.innerHTML = '';
      const tk = this.token;
      setTimeout(() => { if (tk === this.token) { this.i++; this.render(); } }, ok ? 1100 : 2200);
    },

    pick(k, el) {
      if (this.answered) return;
      this.answered = true;
      const it = this.items[this.i];
      const w = WORDS[it.id];
      const ok = this.opts[k] === w;
      if (it.due) S.reviewWord(w.id, ok); else S.recordAnswer(w.id, ok);
      this.results.push(ok);
      if (ok) {
        el.classList.add('right'); Sfx.playBrickClick(); praise();
        Speech.speak(w.en.replace(/\.\.\./g, ''));
      } else {
        el.classList.add('wrong'); Sfx.playGentleOops();
        S.addMistake('word:' + w.id, w.en, w.vi);
        const ri = this.opts.indexOf(w);
        const rb = $$('.opt-brick', overlay)[ri];
        if (rb) rb.classList.add('reveal');
        toast(`${w.en} = ${w.vi}`, 'Nhớ nhé! Lần sau sẽ đúng thôi.', 'warm');
        Speech.speak(w.en.replace(/\.\.\./g, ''));
      }
      const tk = this.token;
      setTimeout(() => { if (tk === this.token) { this.i++; this.render(); } }, ok ? 1000 : 1900);
    },

    finish() {
      const correct = this.results.filter(Boolean).length;
      const gold = Math.max(1, correct);
      S.addGold(gold);
      if (this.zoneId) S.polish(this.zoneId);
      else ZONES.forEach((z) => { if (zoneDueIds(z.id).length === 0) S.polish(z.id); });
      updateWallet();
      $('#rvGold').textContent = gold;
      Sfx.playSparkle(); Sfx.playSuccessFanfare(); fx.confetti(50);
      const zid = this.zoneId || (ZONES.find((z) => S.zoneProgress(z.id).assembled > 0) || ZONES[0]).id;
      const left = S.dueWordIds().length;
      $('#reviewBody').innerHTML = `<div class="step"><div class="card lesson-done studs-top">
        <h3>✨ Model polished!</h3><span class="vi">Mô hình đã sáng bóng trở lại! Đúng ${correct}/${this.items.length} câu.</span>
        <div class="model-stage" style="margin:16px auto;max-width:560px">${LG.renderModel(zid, S.parts(zid), { sparkle: true })}</div>
        <div class="reward-row"><span class="reward"><i class="gold-icon"></i>+${gold} Gold Bricks</span></div>
        <div class="btn-row center">
          ${left ? `<button class="brick-btn btn-orange" data-action="review" data-zone="${this.zoneId || ''}">${bi(`🔧 Fix more (${left})`, 'Bảo trì tiếp')}</button>` : ''}
          <button class="brick-btn btn-purple" data-action="review-exit">${bi('🏙️ Back to My World', 'Về Sa bàn')}</button>
        </div></div></div>`;
      Speech.speak('Great job! Your model is shiny again!');
    },

    close() {
      this.token++;
      Speech.cancel();
      Recorder.releaseAll(); overlay.hidden = true; overlay.innerHTML = '';
      render();
    }
  };

  /* =========================================================
     🎧 DAILY LISTENING & SPEAKING GYM – 5 lượt, 100% âm thanh trước
     (Đúng/Sai nghe hiểu đời sống – khoa học  +  Hỏi đáp phản xạ bằng micro / Phòng thu)
     ========================================================= */
  const coreWord = (en) => en.replace(/\.\.\.|…/g, '').replace(/[?!.]+$/, '').trim();

  /** Câu Đúng/Sai tự sinh từ câu đố của từ vựng (cho bài không có sẵn dữ liệu tf). */
  function autoTF(l) {
    const ws = l.words.filter((w) => w.clue);
    if (ws.length < 2) return [];
    const a = ws[0], b = ws[1], c = ws[ws.length - 1];
    return [
      { en: `${a.clue} This is "${coreWord(a.en)}".`, ok: true, why: `Yes! That describes "${coreWord(a.en)}".`, whyVi: `Đúng! Câu này mô tả "${a.en}" – ${a.vi}.` },
      { en: `${b.clue} This is "${coreWord(c.en)}".`, ok: false, why: `No! That describes "${coreWord(b.en)}", not "${coreWord(c.en)}".`, whyVi: `Sai! Câu này mô tả "${b.en}" (${b.vi}), không phải "${c.en}".` }
    ];
  }

  const GYM_GOLD_PER_DAY = 2;
  const Gym = {
    token: 0,
    start() {
      closeModal();
      this.token++;
      this.vbSaved = false;
      Speech.cancel(); Listener.stop();
      const pool = [];
      ZONES.forEach((z) => z.lessons.forEach((l) => { if (S.isLessonDone(l.id)) pool.push(l); }));
      const nxt = findNextLesson(stageZones()) || findNextLesson();
      if (nxt && pool.indexOf(nxt) === -1) pool.push(nxt);
      if (!pool.length) pool.push(ZONES[0].lessons[0]);
      // Ưu tiên bài gần đây: lấy tối đa 6 bài mới nhất + bài đang học
      const recent = pool.slice(-6);
      const tfs = [], qas = [];
      recent.forEach((l) => {
        (l.tf.length ? l.tf : autoTF(l)).forEach((t) => tfs.push(Object.assign({ type: 'tf', lesson: l }, t)));
        if (l.qa) qas.push(Object.assign({ type: 'qa', lesson: l }, l.qa));
        l.talk.forEach((t) => qas.push({ type: 'qa', lesson: l, q: t.q, vi: t.vi, hint: t.hint, keywords: t.keywords }));
      });
      const uniq = (arr, key) => { const seen = new Set(); return arr.filter((x) => (seen.has(x[key]) ? false : seen.add(x[key]))); };
      const tf = shuffle(uniq(tfs, 'en')).slice(0, 3);
      const qa = shuffle(uniq(qas, 'q')).slice(0, 2);
      this.rounds = [tf[0], qa[0], tf[1], qa[1], tf[2]].filter(Boolean);
      this.i = 0; this.score = 0; this.answered = 0;
      overlay.hidden = false;
      overlay.innerHTML = `<div class="lesson-top">
          <button class="brick-btn btn-white btn-round" data-action="gym-close" aria-label="Close">✕</button>
          <div style="text-align:center"><b class="en" style="font-size:22px">🎧 Listening & Speaking Gym</b><div class="lesson-step-name">Phòng luyện Nghe – Nói 3 phút · nghe trước, đọc sau!</div></div>
          <div class="lesson-earned">${speedChipHTML()}<span class="chip" style="box-shadow:0 4px 0 var(--card-edge)">🎯 <b id="gymScore">0</b></span></div>
        </div>
        <div class="lesson-body" id="gymBody"></div>`;
      document.body.style.overflow = 'hidden';
      this.render();
    },

    round() { return this.rounds[this.i]; },
    who(r) { const z = zoneById(r.lesson.zoneId); return z.chars.b; },

    render() {
      const body = $('#gymBody');
      if (!body) return;
      Lesson.stopStudio();
      if (this.i >= this.rounds.length) return this.finish();
      const r = this.round();
      r.state = r.state || { shown: false, done: false, hint: false };
      const who = this.who(r);
      const meter = `<div class="review-meter">${this.rounds.map((x, k) => `<i class="${k < this.i ? (x.type === 'tf' ? (x.state && x.state.right ? 'ok' : 'no') : 'ok') : k === this.i ? 'cur' : ''}"></i>`).join('')}</div>`;
      const fig = `<div class="gym-fig">${LG.renderMinifig(who.fig, { cls: 'fig-who' })}<b>${esc(who.name)}</b></div>`;
      let main;
      if (r.type === 'tf') {
        const st = r.state;
        main = `<div class="card gym-stage studs-top">${fig}
          <div class="gym-main">
            <div class="gym-kicker">👂 Round ${this.i + 1}/${this.rounds.length} · True or False? <span class="vi">Nghe rồi chọn Đúng hay Sai</span></div>
            <div class="gym-line${st.done ? '' : ' hidden-line'}">${st.done ? esc(r.en) : '🔊 ❓ ❓ ❓ <small class="vi">Nghe thật kỹ nhé – chữ sẽ hiện sau khi con trả lời!</small>'}</div>
            <button class="brick-btn btn-blue btn-sm" data-action="gym-say">${bi('🔊 Listen again', 'Nghe lại')}</button>
          </div></div>
          ${st.done ? `<div class="card gym-result ${st.right ? 'good' : 'warm'}">
              <b>${st.right ? '✅ Correct!' : '💡 Not quite!'} ${r.ok ? "It's TRUE." : "It's FALSE."}</b>
              <button class="intro-line" data-action="say-text" data-text="${esc(r.why || '')}">🔊 ${esc(r.why || '')}<span class="vi">${esc(r.whyVi || '')}</span></button>
            </div>
            <div class="step-foot"><button class="brick-btn btn-green btn-xl" data-action="gym-next">${bi('Next ▶', 'Tiếp tục')}</button></div>`
          : `<div class="tf-row">
              <button class="tf-btn tf-true" data-action="gym-tf" data-v="1"${r.state.ready ? '' : ' disabled'}><span>👍</span>True<small>Đúng</small></button>
              <button class="tf-btn tf-false" data-action="gym-tf" data-v="0"${r.state.ready ? '' : ' disabled'}><span>👎</span>False<small>Sai</small></button>
              ${r.state.ready ? '' : '<small class="vi tf-wait">👂 Nghe hết câu rồi mới chọn được nhé</small>'}
            </div>`}`;
      } else {
        const st = r.state;
        main = `<div class="card gym-stage studs-top">${fig}
          <div class="gym-main">
            <div class="gym-kicker">🎤 Round ${this.i + 1}/${this.rounds.length} · Quick Response <span class="vi">Nghe câu hỏi và trả lời bằng tiếng Anh</span></div>
            <div class="gym-line${st.shown ? '' : ' hidden-line'}">${st.shown ? `“${esc(r.q)}”<small class="vi">${esc(r.vi)}</small>` : '🔊 ❓ ❓ ❓ <small class="vi">Nghe câu hỏi trước – cần thì bấm “Show question”</small>'}</div>
            <div class="btn-row">
              <button class="brick-btn btn-blue btn-sm" data-action="gym-say">${bi('🔊 Listen again', 'Nghe lại')}</button>
              ${st.shown ? '' : `<button class="brick-btn btn-white btn-sm" data-action="gym-show">${bi('👁️ Show question', 'Hiện câu hỏi')}</button>`}
              <button class="brick-btn btn-yellow btn-sm" data-action="gym-hint">${bi('💡 Sample answer', 'Câu trả lời mẫu')}</button>
            </div>
            ${st.hint ? `<div class="hint-box">💡 ${esc(r.hint)}</div>` : ''}
          </div></div>
          ${Lesson.useMic() ? `<div class="mic-wrap">
            <button class="mic-btn${st.done ? ' done' : ''}" data-action="gym-mic" id="micBtn" aria-label="Microphone">${st.done ? '✅' : '🎙️'}</button>
            <div class="transcript${st.done ? ' good' : ''}" id="transcript">${st.note || 'Tap the mic and answer! <small class="vi">Chạm micro rồi trả lời to, rõ</small>'}</div>
          </div>` : ''}
          <div id="studioBox"></div>
          <div class="step-foot">${st.done || !this.mustSpeak(r)
            ? `<button class="brick-btn ${st.done ? 'btn-green btn-xl' : 'btn-white'}" data-action="gym-next">${st.done ? bi('Next ▶', 'Tiếp tục') : bi('✅ I answered – next', 'Con đã trả lời – tiếp')}</button>`
            : `<p class="talk-tip">🎤 Trả lời bằng giọng nói nhé: ${Lesson.useMic() ? 'chạm micro, hoặc ' : ''}ghi âm trong Phòng thu. Nói xong mới sang câu tiếp!</p>`}</div>`;
      }
      body.innerHTML = `<div class="step gym">${meter}${main}</div>`;
      if (r.type === 'qa') {
        Lesson.t = { branch: true, gym: true };
        Lesson.studio = r.state.studio || (r.state.studio = { state: 'idle', text: r.hint, hidden: true });
        if (r.state.hint) Lesson.studio.hidden = false;
        $('#studioBox').innerHTML = `<p class="talk-tip" style="margin:16px 0 0">🎧 ${Lesson.useMic() ? 'Hoặc nói' : 'Nói'} câu trả lời của con trong Phòng thu (có thể nói theo câu mẫu) – ghi âm rồi Compare Voice</p>${Lesson.studioHTML()}`;
      }
      if (!r.state.played) { r.state.played = true; const tk = this.token; setTimeout(() => { if (tk === this.token) this.say(); }, 450); }
    },

    say() {
      const r = this.round();
      if (!r) return;
      const fig = $('#gymBody .gym-fig svg');
      if (fig) fig.classList.add('talking');
      const tk = this.token;
      const open = () => { if (tk !== this.token) return; r.state.ready = true; if (this.round() !== r) return; $$('[data-action="gym-tf"]', overlay).forEach((b) => { b.disabled = false; }); const w = $('.tf-wait', overlay); if (w) w.remove(); };
      Speech.speak(r.type === 'tf' ? r.en : r.q, { pitch: 0.95 }).then(() => { if (fig) fig.classList.remove('talking'); setTimeout(open, 200); });
      setTimeout(open, 9000);
    },

    pickTF(v, el) {
      const r = this.round();
      if (!r || r.type !== 'tf' || r.state.done) return;
      if (!r.state.ready) { toast('Listen first! 👂', 'Nghe hết câu rồi mới chọn Đúng/Sai nhé!', 'warm'); return; }
      r.state.done = true;
      r.state.right = v === r.ok;
      if (r.state.right) { this.score++; Sfx.playBrickClick(); praise(); } else { Sfx.playGentleOops(); S.addMistake('gym:' + r.en.slice(0, 40), r.en, r.whyVi); }
      $('#gymScore').textContent = this.score;
      this.render();
      const tk = this.token;
      (async () => {
        await Speech.speak(r.ok ? "That's true!" : "That's false!");
        if (tk !== this.token) return;
        await Speech.speak(r.en);
        if (tk !== this.token || !r.why) return;
        await Speech.speak(r.why);
      })();
    },

    /** Gym câu hỏi đời sống: bắt buộc trả lời bằng giọng nói (trừ khi bố mẹ tắt / không có micro / đã thử 3 lần không nghe thấy). */
    mustSpeak(r) { return Lesson.speakRequired() && (Recorder.supported || Lesson.useMic()) && (r.state.miss || 0) < 3; },

    voiced() {
      const r = this.round();
      if (!r || r.type !== 'qa' || r.state.done) return;
      r.state.done = true; r.state.shown = true;
      r.state.note = '🎤 ✅ Great voice! <small class="vi">Giọng con rõ lắm!</small>';
      this.score++;
      $('#gymScore').textContent = this.score;
      praise();
      this.render();
    },

    voiceMiss() {
      const r = this.round();
      if (!r || r.type !== 'qa') return;
      r.state.miss = (r.state.miss || 0) + 1;
      if (r.state.miss >= 3) this.render();
    },

    show() { const r = this.round(); if (r) { r.state.shown = true; this.render(); } },
    hint() { const r = this.round(); if (r) { r.state.hint = true; r.state.shown = true; this.render(); Speech.speak(r.hint); } },

    mic() {
      const r = this.round();
      if (!r || r.type !== 'qa') return;
      const btn = $('#micBtn');
      if (btn && btn.classList.contains('listening')) { Listener.stop(); return; }
      Speech.cancel(); Lesson.stopStudio();
      Sfx.playMicOn();
      const started = Listener.start({
        onResult: (alts) => {
          const res = Listener.judge(alts, { q: r.q, keywords: r.keywords || [], hint: r.hint });
          const tr = $('#transcript');
          if (res.ok) {
            r.state.done = true; r.state.shown = true;
            S.recordSpeak();
            r.state.note = `“${esc(res.text)}” ✅`;
            this.score++;
            $('#gymScore').textContent = this.score;
            Sfx.playSuccessFanfare(); praise();
            this.render();
          } else {
            if (tr) { tr.className = 'transcript try'; tr.innerHTML = `“${esc(res.text)}”<br><small class="vi">Gần đúng rồi! Thử nói: <b>${esc(r.hint)}</b></small>`; }
            Sfx.playGentleOops();
            this.voiceMiss();
          }
        },
        onError: (code) => {
          const b = $('#micBtn'); if (b) b.classList.remove('listening');
          const tr = $('#transcript');
          if (tr) tr.innerHTML = Listener.blocked || code === 'unsupported' || code === 'start-failed'
            ? '🎙️ Micro chưa dùng được – con dùng Phòng thu bên dưới nhé!'
            : "I didn't hear you. Try again! <small class=\"vi\">Mình chưa nghe thấy, thử lại nhé!</small>";
        },
        onEnd: () => { const b = $('#micBtn'); if (b) b.classList.remove('listening'); }
      });
      if (started && btn) { btn.classList.add('listening'); const tr = $('#transcript'); if (tr) { tr.className = 'transcript'; tr.innerHTML = 'Listening… <small class="vi">Đang nghe…</small>'; } }
    },

    next() {
      const r = this.round();
      if (r && r.type === 'qa') this.answered++;
      Listener.stop(); Lesson.stopStudio();
      this.i++;
      this.render();
      const b = $('#gymBody'); if (b) b.scrollTop = 0;
    },

    finish() {
      // Chống "cày" thưởng: chỉ 2 lượt Gym đầu tiên mỗi ngày có +1 Gold và +10 Studs; các lượt sau +2 Studs để luyện thêm
      const full = S.gymToday() < GYM_GOLD_PER_DAY;
      const studs = full ? 10 : 2, gold = full ? 1 : 0;
      S.addStuds(studs); if (gold) S.addGold(gold); S.recordGym();
      updateWallet();
      const tfTotal = this.rounds.filter((x) => x.type === 'tf').length;
      const tfRight = this.rounds.filter((x) => x.type === 'tf' && x.state && x.state.right).length;
      const qaTotal = this.rounds.filter((x) => x.type === 'qa').length;
      Sfx.playSuccessFanfare(); fx.confetti(50);
      $('#gymBody').innerHTML = `<div class="step"><div class="card lesson-done studs-top">
        <h3>💪 Gym Complete!</h3><span class="vi">Hoàn thành buổi luyện Nghe – Nói hôm nay!</span>
        <div class="reward-row">
          <span class="reward">👂 ${tfRight}/${tfTotal} True/False</span>
          <span class="reward">🎤 ${qaTotal} answers</span>
          <span class="reward"><i class="stud-icon"></i>+${studs} Studs</span>
          ${gold ? '<span class="reward"><i class="gold-icon"></i>+1 Gold</span>' : ''}
        </div>
        ${full ? '' : `<p class="vi gym-cap">🥇 Hôm nay con đã nhận đủ ${GYM_GOLD_PER_DAY} Gold từ Gym rồi. Luyện thêm vẫn rất tốt – nhưng để có thêm Gold, con hãy học bài mới hoặc vào Trạm bảo trì 🔧 nhé!</p>`}
        <p class="vi" style="margin-bottom:14px">Hôm nay con đã tập ${S.gymToday()} lượt. 🔥 Chuỗi ${S.streakDays()} ngày học liên tiếp – giữ lửa nhé!</p>
        <div class="btn-row center">
          <button class="brick-btn btn-purple" data-action="gym-again">${bi('🔁 One more round', 'Tập thêm một lượt')}</button>
          <button class="brick-btn btn-white" data-action="gym-exit" data-screen="map">${bi('🌍 Map', 'Bản đồ')}</button>
        </div></div></div>`;
      Speech.speak('Great workout! Your English muscles are getting stronger!');
    },

    close() {
      this.token++;
      Speech.cancel(); Listener.stop(); Lesson.stopStudio();
      Recorder.releaseAll(); overlay.hidden = true; overlay.innerHTML = '';
      render();
    }
  };

  /* =========================================================
     📝 BÀI KIỂM TRA KỸ NĂNG (Skill Check) – đo tiến bộ THẬT, chống "bấm cho qua"
     - Mở sau mỗi 6 bài mới (hoặc 14 ngày), ~8 phút, 4 phần: Nghe · Từ vựng · Ngữ pháp · Nói
     - Không gợi ý, không màu gạch, không báo đúng/sai cho tới cuối; thưởng theo ĐIỂM, chỉ lần kiểm tra đến hạn
     - Phần Nói: có nhận diện giọng thì chấm tự động; không có (iPad Màn hình chính) thì ghi âm để BỐ MẸ chấm 👍/👎
     ========================================================= */
  const CHECK_EVERY_LESSONS = 6, CHECK_EVERY_DAYS = 14;
  const SKILLS = { listen: ['👂', 'Nghe', 'Listening'], vocab: ['🔤', 'Từ vựng', 'Vocabulary'], grammar: ['🧱', 'Ngữ pháp', 'Grammar'], speak: ['🎤', 'Nói', 'Speaking'] };
  function checkStatus() {
    const done = S.lessonsDoneCount();
    const last = S.state.checks[S.state.checks.length - 1];
    if (done < 3) return { due: false, ready: false, need: 3 - done };
    if (!last) return { due: true, ready: true };
    const days = (Date.now() - last.date) / 86400000;
    const newL = done - (last.lessonsDone || 0);
    return { due: newL >= CHECK_EVERY_LESSONS || (days >= CHECK_EVERY_DAYS && newL >= 2), ready: true, newL, days: Math.floor(days) };
  }
  const checkPct = (c) => { const v = Object.keys(SKILLS).map((k) => c.scores[k]).filter((x) => typeof x === 'number'); return v.length ? Math.round(v.reduce((a, b) => a + b, 0) / v.length) : 0; };

  const Check = {
    token: 0,
    start() {
      const st = checkStatus();
      if (!st.ready) { toast('Learn a little more first!', `Học thêm ${st.need} bài nữa để làm Bài kiểm tra kỹ năng nhé!`, 'warm'); return; }
      closeModal();
      this.token++;
      this.rewarded = st.due;
      Speech.cancel(); Listener.stop();
      const lessons = [];
      ZONES.forEach((z) => z.lessons.forEach((l) => { if (S.isLessonDone(l.id)) lessons.push({ z, l }); }));
      const recent = lessons.slice(-12);
      const pool = shuffle(recent.length >= 4 ? recent : lessons);
      const words = shuffle([].concat(...pool.map((x) => x.l.words)));
      const items = [];
      // 👂 Nghe: 3 câu Đúng/Sai (chỉ nghe) + 2 câu nghe từ → chọn hình
      shuffle([].concat(...pool.map((x) => x.l.tf || []))).slice(0, 3).forEach((t) => items.push({ skill: 'listen', type: 'tf', t }));
      words.slice(0, 2).forEach((w) => items.push({ skill: 'listen', type: 'pic', w }));
      // 🔤 Từ vựng: nhìn hình + nghĩa → chọn từ tiếng Anh
      words.slice(2, 6).forEach((w) => items.push({ skill: 'vocab', type: 'word', w }));
      // 🧱 Ngữ pháp: lắp câu không màu, không gợi ý
      shuffle([].concat(...pool.map((x) => x.l.build))).slice(0, 3).forEach((b) => items.push({ skill: 'grammar', type: 'build', b }));
      // 🎤 Nói: trả lời câu hỏi đã học, không có câu mẫu
      shuffle([].concat(...pool.map((x) => x.l.talk.map((t) => Object.assign({ lessonTitle: x.l.title }, t))))).slice(0, 3).forEach((t) => items.push({ skill: 'speak', type: 'talk', t }));
      this.items = items.filter((it) => it.type !== 'pic' || it.w);
      this.i = 0; this.res = []; this.id = 'ck' + Date.now();
      this.pending = 0;
      overlay.hidden = false;
      overlay.innerHTML = `<div class="lesson-top">
          <button class="brick-btn btn-white btn-round" data-action="check-close" aria-label="Close">✕</button>
          <div style="text-align:center"><b class="en" style="font-size:22px">📝 Skill Check</b><div class="lesson-step-name">Bài kiểm tra kỹ năng – không gợi ý, làm thật bằng khả năng của con nhé!</div></div>
          <div class="lesson-earned">${speedChipHTML()}</div>
        </div>
        <div class="lesson-body" id="checkBody"></div>`;
      this.intro();
    },

    intro() {
      $('#checkBody').innerHTML = `<div class="step"><div class="card check-intro studs-top">
        <h3>📝 Skill Check</h3>
        <p class="vi">Bài kiểm tra ${this.items.length} câu, khoảng 8 phút: ${Object.values(SKILLS).map((s) => `${s[0]} ${s[1]}`).join(' · ')}.</p>
        <ul class="vi check-rules"><li>Không có gợi ý, không có màu gạch.</li><li>Kết quả hiện ở cuối bài – cứ bình tĩnh làm hết sức mình.</li><li>${this.rewarded ? 'Phần thưởng tính theo <b>điểm thật</b> của con.' : 'Đây là bài làm thêm – không có thưởng, chỉ để luyện tập.'}</li></ul>
        <button class="brick-btn btn-green btn-xl" data-action="check-go">${bi('Start ▶', 'Bắt đầu')}</button>
      </div></div>`;
    },

    item() { return this.items[this.i]; },

    render() {
      const it = this.item();
      if (!it) return this.finish();
      const body = $('#checkBody');
      const meter = `<div class="review-meter">${this.items.map((x, k) => `<i class="${k < this.i ? 'done' : k === this.i ? 'cur' : ''}"></i>`).join('')}</div>`;
      const head = (sk, en, vi) => `<div class="check-kicker">${SKILLS[sk][0]} ${SKILLS[sk][2]} · <span class="vi">${SKILLS[sk][1]}</span> — ${en}<small class="vi" style="display:block">${vi}</small></div>`;
      this.answered = false;
      let html = '';
      if (it.type === 'tf') {
        html = `${head('listen', 'True or False?', 'Nghe câu nói rồi chọn Đúng hay Sai (không hiện chữ)')}
          <button class="brick-btn btn-blue" data-action="check-say">${bi('🔊 Listen', 'Nghe')}</button>
          <div class="tf-row"><button class="tf-btn tf-true" data-action="check-pick" data-v="1" disabled><span>👍</span>True<small>Đúng</small></button>
          <button class="tf-btn tf-false" data-action="check-pick" data-v="0" disabled><span>👎</span>False<small>Sai</small></button><small class="vi tf-wait">👂 Nghe hết câu rồi mới chọn được</small></div>`;
      } else if (it.type === 'pic' || it.type === 'word') {
        const others = shuffle(Object.values(WORDS).filter((x) => x.zoneId === it.w.zoneId && x.id !== it.w.id && x.emoji !== it.w.emoji)).slice(0, 3);
        it.opts = shuffle([it.w].concat(others));
        html = it.type === 'pic'
          ? `${head('listen', 'Listen and choose the picture', 'Nghe từ tiếng Anh rồi chọn hình đúng')}<button class="brick-btn btn-blue" data-action="check-say">${bi('🔊 Listen', 'Nghe')}</button>
            <div class="opt-grid">${it.opts.map((o, k) => `<button class="opt-brick" data-action="check-pick" data-v="${k}" style="--oc:${BRICK_COLORS[k]};--ocd:${LG.shade(BRICK_COLORS[k], -0.3)};min-height:110px"><span class="o-emoji" style="font-size:48px">${o.emoji}</span></button>`).join('')}</div>`
          : `${head('vocab', 'Which English word?', 'Chọn từ tiếng Anh đúng với hình & nghĩa')}<div class="big-emoji">${it.w.emoji}</div><div class="q-vi">${esc(it.w.vi)}</div>
            <div class="opt-grid">${it.opts.map((o, k) => `<button class="opt-brick" data-action="check-pick" data-v="${k}" style="--oc:${BRICK_COLORS[k]};--ocd:${LG.shade(BRICK_COLORS[k], -0.3)};min-height:90px"><span class="o-word">${esc(o.en)}</span></button>`).join('')}</div>`;
      } else if (it.type === 'build') {
        it.bricks = it.bricks || shuffle(it.b.answer.concat((it.b.extra || []).filter((x) => it.b.answer.indexOf(x) === -1)).map((t, id) => ({ t, id })));
        it.placed = it.placed || [];
        html = `${head('grammar', 'Build the sentence', 'Chạm các viên gạch theo đúng thứ tự (có gạch gây nhiễu)')}
          <div class="card situation studs-top"><div class="s-vi">🗨️ ${esc(it.b.vi)}</div></div>
          <div class="baseplate" id="ckPlate">${it.placed.map((id) => `<button class="word-brick role-off" data-action="check-brick" data-id="${id}">${esc(it.bricks[id].t)}</button>`).join('') || '<div class="placeholder">⬇️</div>'}</div>
          <div class="tray-bricks">${it.bricks.filter((b) => it.placed.indexOf(b.id) === -1).map((b) => `<button class="word-brick role-off" data-action="check-brick" data-id="${b.id}">${esc(b.t)}</button>`).join('')}</div>
          <div class="step-foot"><button class="brick-btn btn-green btn-xl" data-action="check-build-done"${it.placed.length ? '' : ' disabled'}>${bi('✓ Done', 'Xong')}</button></div>`;
      } else {
        html = `${head('speak', 'Answer the question', 'Nghe câu hỏi rồi TỰ trả lời bằng một câu tiếng Anh (không có câu mẫu)')}
          <div class="talk-q">“${esc(it.t.q)}”</div>
          <button class="brick-btn btn-blue" data-action="check-say">${bi('🔊 Listen again', 'Nghe lại')}</button>
          <div class="mic-wrap"><button class="mic-btn" data-action="check-speak" id="ckMic">🎙️</button><div class="transcript" id="ckNote">Tap the mic and answer! <small class="vi">Chạm micro rồi trả lời to, rõ</small></div></div>
          ${Recorder.supported || Lesson.useMic() ? '' : `<div class="step-foot"><button class="brick-btn btn-white" data-action="check-skip">${bi('Skip (no microphone)', 'Bỏ qua – thiết bị không có micro')}</button></div>`}`;
      }
      body.innerHTML = `<div class="step">${meter}<div class="card check-card studs-top">${html}</div></div>`;
      if (it.type !== 'word' && it.type !== 'build') setTimeout(() => this.say(), 350);
    },

    say() {
      const it = this.item(); if (!it) return;
      const tk = this.token, at = this.i;
      const open = () => { if (tk !== this.token || this.i !== at) return; $$('[data-action="check-pick"]', overlay).forEach((b) => { b.disabled = false; }); const w = $('.tf-wait', overlay); if (w) w.remove(); };
      Speech.speak(it.type === 'tf' ? it.t.en : it.type === 'talk' ? it.t.q : it.w ? it.w.en.replace(/\.\.\./g, '') : '').then(() => setTimeout(open, 200));
      setTimeout(open, 9000);
    },

    record(ok, extra) {
      if (this.answered) return;
      this.answered = true;
      this.res.push(Object.assign({ skill: this.item().skill, ok }, extra || {}));
      Sfx.playBrickClick();
      const tk = this.token;
      setTimeout(() => { if (tk === this.token) { this.i++; this.render(); } }, 350);
    },

    pick(v) {
      const it = this.item();
      if (!it || this.answered) return;
      if (it.type === 'tf') this.record((v === 1) === it.t.ok);
      else this.record(it.opts[v] === it.w);
    },

    brick(id) {
      const it = this.item(); if (!it || it.type !== 'build') return;
      const k = it.placed.indexOf(id);
      if (k === -1) it.placed.push(id); else it.placed.splice(k, 1);
      Sfx.playBrickClick();
      this.render();
    },

    buildDone() {
      const it = this.item();
      const texts = it.placed.map((id) => it.bricks[id].t);
      this.record(texts.length === it.b.answer.length && texts.every((t, i) => t === it.b.answer[i]));
    },

    async speak() {
      const it = this.item(), tk = this.token;
      if (!it || this.answered || this.busy) return;
      this.busy = true;
      const btn = $('#ckMic');
      const note = $('#ckNote');
      let res;
      if (Lesson.useMic()) {
        // Có nhận diện giọng: chấm theo ý định (không có câu mẫu cho con xem)
        res = await new Promise((resolve) => {
          if (btn) btn.classList.add('listening');
          const ok = Listener.start({
            onResult: (alts) => resolve({ heard: true, judged: Listener.judge(alts, { q: it.t.q, keywords: it.t.keywords, hint: it.t.hint, wrong: it.t.choices.slice(1) }) }),
            onError: () => resolve(null),
            onEnd: () => {}
          });
          if (!ok) resolve(null);
        });
        if (btn) btn.classList.remove('listening');
      }
      if (!res) {
        // Ghi âm: bố mẹ sẽ nghe & chấm trong Góc Bố Mẹ
        res = await Lesson.voiceCheck('', (mode) => { if (btn) btn.classList.toggle('listening', mode !== 'idle'); if (note && mode === 'rec') note.innerHTML = 'Speak now… <small class="vi">Con nói đi – nói xong tự dừng</small>'; });
        res = res.ok ? { heard: true, clip: res.clip } : { heard: false };
      }
      this.busy = false;
      if (tk !== this.token) return;
      if (!res.heard) { Sfx.playGentleOops(); if (note) note.innerHTML = "I can't hear you! <small class=\"vi\">Mình chưa nghe thấy – nói TO và RÕ hơn nhé!</small>"; return; }
      S.recordSpeak();
      if (res.judged) this.record(res.judged.ok, { text: res.judged.text });
      else {
        this.pending++;
        if (res.clip) VoiceBook.add({ kind: 'check', checkId: this.id, title: '📝 Skill Check', text: it.t.q, blob: res.clip });
        this.record(null, { pending: true });
      }
    },

    skip() { this.record(null, { skipped: true }); },

    finish() {
      const scores = {};
      Object.keys(SKILLS).forEach((k) => {
        const r = this.res.filter((x) => x.skill === k && x.ok !== null);
        scores[k] = r.length ? Math.round((r.filter((x) => x.ok).length / r.length) * 100) : null;
      });
      const rec = { id: this.id, date: Date.now(), lessonsDone: S.lessonsDoneCount(), level: S.skillLevel(), scores, speakPending: this.pending, speakGrades: {}, rewarded: this.rewarded };
      S.addCheck(rec);
      const overall = checkPct(rec);
      let studs = 0, gold = 0;
      if (this.rewarded) { studs = Math.round(overall * 0.4); gold = overall >= 80 ? 2 : overall >= 60 ? 1 : 0; S.addStuds(studs); if (gold) S.addGold(gold); updateWallet(); }
      // Kết quả kiểm tra thấp → hạ cấp để con học chắc hơn (chế độ tự động)
      if (S.state.skill.auto !== false && overall < 50 && S.skillLevel() > 1) S.setSkillLevel(S.skillLevel() - 1, true);
      const prev = S.state.checks[S.state.checks.length - 2];
      Sfx.playSuccessFanfare(); fx.confetti(40);
      $('#checkBody').innerHTML = `<div class="step"><div class="card lesson-done studs-top">
        <h3>📝 Skill Check Complete!</h3><span class="vi">Con đã hoàn thành bài kiểm tra kỹ năng!</span>
        <div class="check-scores">${Object.keys(SKILLS).map((k) => {
          const v = scores[k], p = prev && prev.scores[k];
          const trend = typeof v === 'number' && typeof p === 'number' ? (v > p ? ' ⬆️' : v < p ? ' ⬇️' : ' ➡️') : '';
          return `<div class="check-score"><b>${SKILLS[k][0]} ${typeof v === 'number' ? v + '%' : (k === 'speak' && this.pending ? '⏳' : '—')}${trend}</b><small>${SKILLS[k][1]}</small></div>`;
        }).join('')}</div>
        ${this.pending ? `<p class="vi">🎤 ${this.pending} câu trả lời nói đã được ghi âm – bố mẹ sẽ nghe & chấm trong Góc Bố Mẹ.</p>` : ''}
        ${this.rewarded ? `<div class="reward-row"><span class="reward"><i class="stud-icon"></i>+${studs} Studs</span>${gold ? `<span class="reward"><i class="gold-icon"></i>+${gold} Gold</span>` : ''}</div>` : '<p class="vi">Bài làm thêm – không tính thưởng.</p>'}
        <div class="btn-row center"><button class="brick-btn btn-white" data-action="check-exit" data-screen="map">${bi('🌍 Map', 'Bản đồ')}</button></div>
      </div></div>`;
      Speech.speak('Great job! You finished your skill check!');
    },

    close() {
      this.token++;
      Speech.cancel(); Listener.stop(); Lesson.stopStudio();
      Recorder.releaseAll(); overlay.hidden = true; overlay.innerHTML = '';
      render();
    }
  };

  /* =========================================================
     🎙️ HÀNH TRÌNH NÓI MỖI NGÀY – đo thời gian NÓI THẬT (không phải số lần bấm)
     - Mục tiêu giây nói mỗi ngày theo cấp (60 / 90 / 120 giây) + chuỗi ngày đạt mục tiêu
     - Mốc tổng số phút nói → mở VẬT PHẨM BÍ MẬT trong Tủ đồ (không mua được bằng xu)
     - Talk Time: 3 câu hỏi mở mỗi ngày, khung câu giúp nói DÀI hơn, sao theo số giây nói
     ========================================================= */
  const TALK_GOAL = { 1: 60, 2: 90, 3: 120 };
  const JOURNEY = [5, 15, 30, 60, 120, 240, 480, 900];
  const JOURNEY_TITLES = { 5: ['🐣', 'Chú chim non', 'First Words'], 15: ['🗣️', 'Người kể chuyện nhí', 'Little Talker'], 30: ['🎤', 'Ca sĩ tiếng Anh', 'Mic Star'], 60: ['🦜', 'Vẹt thông thái', 'Chatty Parrot'], 120: ['🚀', 'Phi hành gia ngôn ngữ', 'Word Astronaut'], 240: ['🧙', 'Phù thủy từ vựng', 'Word Wizard'], 480: ['🏆', 'Nhà hùng biện', 'Super Speaker'], 900: ['👑', 'Vua tiếng Anh', 'English Legend'] };
  const talkGoalSec = () => TALK_GOAL[S.skillLevel()] || 60;
  const secretItems = () => [].concat(...Object.keys(LG.ITEMS).map((cat) => LG.ITEMS[cat].filter((it) => it.secret).map((it) => Object.assign({ cat }, it))));

  /** Mỗi lần con thực sự nói (Recorder/Listener báo về) → cộng giờ nói, kiểm tra mục tiêu ngày & mốc hành trình. */
  function onTalk(ms) {
    const before = S.talkMinTotal();
    S.addTalkMs(ms);
    const sec = S.talkSecToday(), goal = talkGoalSec(), k = S.todayKey();
    const got = S.state.talkGoal[k] || 0;
    if (got < 1 && sec >= goal) {
      S.state.talkGoal[k] = 1; S.addStuds(40); S.save(); updateWallet();
      setTimeout(() => { fx.confetti(50); Sfx.playSuccessFanfare(); toast(`🎤 Daily goal! ${goal}s`, `Hôm nay con đã nói đủ ${goal} giây tiếng Anh! +40 Studs · 🔥 ${S.talkStreak()} ngày liên tiếp`, 'good'); }, 400);
    } else if (got === 1 && sec >= goal * 2) {
      S.state.talkGoal[k] = 2; S.addGold(1); S.save(); updateWallet();
      setTimeout(() => toast('🥇 Double goal!', `Con nói gấp đôi mục tiêu hôm nay! +1 Gold`, 'good'), 400);
    }
    const after = S.talkMinTotal();
    JOURNEY.forEach((m) => {
      if (before < m && after >= m && S.state.journey.indexOf(m) === -1) {
        S.state.journey.push(m);
        const gifts = secretItems().filter((it) => it.milestone === m);
        gifts.forEach((it) => { if (!S.owns(it.id)) S.state.owned.push(it.id); });
        S.save();
        setTimeout(() => celebrateJourney(m, gifts), 1200);
      }
    });
    const meter = $('#talkMeter'); if (meter) meter.outerHTML = talkMeterHTML();
  }
  Recorder.onVoice = (ms) => onTalk(ms);
  Listener.onHeard = (text) => onTalk(String(text).trim().split(/\s+/).length * 420);

  function celebrateJourney(m, gifts) {
    const t = JOURNEY_TITLES[m] || ['⭐', 'Cột mốc mới', 'Milestone'];
    fx.confetti(80); Sfx.playSparkle();
    openModal(`<div style="text-align:center;display:grid;gap:10px;justify-items:center">
      <div style="font-size:56px">${t[0]}</div>
      <h2 class="en">${m} minutes of English!</h2><p class="vi">Con đã nói tiếng Anh tổng cộng <b>${m} phút</b> – danh hiệu mới: <b>${t[1]}</b> (${t[2]})!</p>
      ${gifts.map((it) => `<div class="card" style="display:grid;justify-items:center;gap:6px;background:#FFFBEB"><b>🎁 Secret item unlocked!</b>${['pet', 'ride', 'buddy', 'scene'].indexOf(it.cat) !== -1 ? LG.renderItemPreview(it.cat, it.id) : LG.renderMinifig({ [it.cat]: it.id })}<b>${esc(it.en)}</b><small class="vi">${esc(it.vi)} – đã vào Tủ đồ của con!</small></div>`).join('')}
      <button class="brick-btn btn-green" data-action="modal-close">${bi('Awesome! 🎉', 'Tuyệt quá!')}</button></div>`);
    Speech.speak(`Amazing! You have spoken English for ${m} minutes!`);
  }

  function talkMeterHTML() {
    const sec = S.talkSecToday(), goal = talkGoalSec(), pct = Math.min(100, Math.round((sec / goal) * 100));
    const total = S.talkMinTotal(), next = JOURNEY.find((m) => total < m);
    return `<div class="talk-meter" id="talkMeter">
      <div class="tm-row"><b>🎤 ${sec}/${goal}s</b><small class="vi">giây nói hôm nay${S.talkStreak() ? ` · 🔥 ${S.talkStreak()} ngày` : ''}</small></div>
      <div class="tm-bar"><i style="width:${pct}%"></i></div>
      <small class="vi">🗺️ Hành trình: ${total.toFixed(1)} phút${next ? ` · còn ${(next - total).toFixed(1)} phút tới 🎁 bí mật` : ' · 👑 hoàn thành!'}</small>
    </div>`;
  }

  /* ---------- Talk Time: 3 nhiệm vụ nói mở mỗi ngày ---------- */
  const Talk = {
    token: 0,
    todays() {
      const all = window.SpeakMissions || [];
      const lv = S.skillLevel(), k = S.todayKey();
      const pool = all.filter((m) => m.level === lv);
      const list = pool.length ? pool : all;
      if (!list.length) return [];
      const day = Math.floor(new Date(k + 'T00:00:00').getTime() / 86400000);
      const start = (day * 3) % list.length;
      return [0, 1, 2].map((i) => list[(start + i) % list.length]);
    },
    state() {
      const k = S.todayKey();
      if (!S.state.talkDay || S.state.talkDay.date !== k) S.state.talkDay = { date: k, best: {} };
      return S.state.talkDay;
    },
    doneCount() { const st = this.state(); return this.todays().filter((m) => (st.best[m.id] || 0) >= m.target).length; },
    start() {
      closeModal();
      this.list = this.todays();
      if (!this.list.length) { toast('Coming soon', 'Chưa có nhiệm vụ nói', 'warm'); return; }
      this.token++; this.i = 0;
      Speech.cancel(); Listener.stop();
      overlay.hidden = false;
      overlay.innerHTML = `<div class="lesson-top">
          <button class="brick-btn btn-white btn-round" data-action="talk-close" aria-label="Close">✕</button>
          <div style="text-align:center"><b class="en" style="font-size:22px">🎙️ Talk Time</b><div class="lesson-step-name">Nói mỗi ngày – nói càng DÀI, càng nhiều sao!</div></div>
          <div class="lesson-earned">${speedChipHTML()}</div>
        </div>
        <div class="lesson-body" id="talkBody"></div>`;
      this.render();
    },
    render() {
      const m = this.list[this.i];
      if (!m) return this.finish();
      const st = this.state(), best = st.best[m.id] || 0;
      const lv = S.skillLevel();
      this.cur = { rec: false, tried: best > 0, clip: null };
      const showModel = lv === 1 || best > 0;
      $('#talkBody').innerHTML = `<div class="step">
        <div class="review-meter">${this.list.map((x, k) => `<i class="${(st.best[x.id] || 0) >= x.target ? 'ok' : k === this.i ? 'cur' : ''}"></i>`).join('')}</div>
        <div class="card talk-mission studs-top">
          <div class="tmn-emoji">${m.emoji}</div>
          <button class="talk-q" data-action="tt-say">🔊 “${esc(m.q)}”<span class="vi">${esc(m.vi)}</span></button>
          <div class="frames"><small class="vi">🧱 Gạch câu giúp con nói dài hơn – chạm để nghe:</small>
            ${m.frames.map((f) => `<button class="frame-chip" data-action="tt-frame" data-t="${esc(f)}">${esc(f)}</button>`).join('')}</div>
          <div class="tt-target">🎯 Nói ít nhất <b>${m.target} giây</b> · ⭐ ${m.target}s · ⭐⭐ ${Math.round(m.target * 1.5)}s · ⭐⭐⭐ ${m.target * 2}s</div>
          <div class="tm-bar big"><i id="ttBar" style="width:${Math.min(100, (best / (m.target * 2)) * 100)}%"></i></div>
          <div id="ttStatus" class="vi">${best ? `Kỷ lục của con: <b>${best.toFixed(1)} giây</b> ${this.stars(m, best)}` : 'Chạm 🎤 rồi nói thật nhiều nhé! Nói xong im lặng một lúc, máy tự dừng.'}</div>
          <div class="btn-row center">
            <button class="mic-btn" data-action="tt-rec" id="ttMic" aria-label="Record">🎙️</button>
          </div>
          <div id="ttModel">${showModel ? this.modelHTML(m) : `<small class="vi">💡 Câu mẫu sẽ mở sau lần nói đầu tiên của con.</small>`}</div>
        </div>
        <div class="step-foot"><button class="brick-btn btn-white" data-action="tt-next">${bi(this.i + 1 < this.list.length ? 'Next ▶' : 'Finish ▶', this.i + 1 < this.list.length ? 'Câu tiếp' : 'Hoàn thành')}</button></div>
      </div>`;
      setTimeout(() => this.say(), 350);
    },
    modelHTML(m) { return `<button class="tt-model" data-action="say-text" data-text="${esc(m.model)}">💬 Example: ${esc(m.model)}<small class="vi">${esc(m.modelVi)}</small></button>`; },
    stars(m, sec) { const n = sec >= m.target * 2 ? 3 : sec >= m.target * 1.5 ? 2 : sec >= m.target ? 1 : 0; return n ? '⭐'.repeat(n) : ''; },
    say() { const m = this.list[this.i]; if (m) Speech.speak(m.q); },
    async rec() {
      const m = this.list[this.i], tk = this.token, cur = this.cur;
      if (!m || !cur) return;
      const mic = $('#ttMic'), status = $('#ttStatus'), bar = $('#ttBar');
      if (cur.rec) { cur.stop && cur.stop(); return; }
      if (!Recorder.supported) { toast('No microphone', 'Thiết bị chưa ghi âm được – con nói to theo câu mẫu nhé!', 'warm'); return; }
      Speech.cancel();
      cur.rec = true;
      if (mic) { mic.classList.add('listening'); mic.textContent = '⏹️'; }
      let timer;
      const stopNow = async () => {
        if (!cur.rec) return; cur.rec = false; clearInterval(timer);
        await Recorder.stop();
        if (tk !== this.token) return;
        if (mic) { mic.classList.remove('listening'); mic.textContent = '🎙️'; }
        const sec = (Recorder.voiceMs || 0) / 1000;
        if (!Recorder.heardVoice(300)) { Sfx.playGentleOops(); if (status) status.innerHTML = "I can't hear you! <small>Mình chưa nghe thấy – nói TO và RÕ hơn nhé!</small>"; return; }
        const st = this.state(), prev = st.best[m.id] || 0;
        const starsNow = this.stars(m, sec).length, starsPrev = this.stars(m, prev).length;
        if (sec > prev) { st.best[m.id] = Math.round(sec * 10) / 10; S.save(); }
        if (starsNow > starsPrev) {
          const studs = (starsNow - starsPrev) * 5; S.addStuds(studs); updateWallet();
          fx.confetti(20 * starsNow); Sfx.playSuccessFanfare();
          toast(`${'⭐'.repeat(starsNow)} ${sec.toFixed(1)}s!`, `Con đã nói ${sec.toFixed(1)} giây! +${studs} Studs`, 'good');
        } else if (sec < m.target) toast(`${sec.toFixed(1)}s – say more!`, 'Nói dài thêm nhé: dùng một viên gạch câu như "because…" hoặc "and then…"', 'warm');
        else praise();
        if (!prev && Recorder.lastBlob) VoiceBook.add({ kind: 'mission', title: '🎙️ Talk Time', text: m.q, blob: Recorder.lastBlob });
        const best = st.best[m.id];
        if (status) status.innerHTML = `Lần này: <b>${sec.toFixed(1)} giây</b> ${this.stars(m, sec)} · Kỷ lục: <b>${best.toFixed(1)}s</b> ${this.stars(m, best)}<br><small>🔊 Đang phát lại giọng con…</small>`;
        if (bar) bar.style.width = Math.min(100, (best / (m.target * 2)) * 100) + '%';
        const mb = $('#ttModel'); if (mb && !$('.tt-model', mb)) mb.innerHTML = this.modelHTML(m);
        await Recorder.play(Recorder.lastBlob);
        if (tk === this.token && status) status.innerHTML = status.innerHTML.replace(/<br><small>🔊[^<]*<\/small>/, '');
      };
      cur.stop = stopNow;
      try {
        await Recorder.start({ maxMs: 60000, autoStop: true, silenceMs: 2200, minVoiceMs: 600, onAuto: stopNow });
        Sfx.playMicOn();
        timer = setInterval(() => {
          const s2 = (Recorder.voiceMs || 0) / 1000;
          if (status) status.innerHTML = `🎤 Đang nghe… <b>${s2.toFixed(1)} giây</b> ${this.stars(m, s2)}`;
          if (bar) bar.style.width = Math.min(100, (s2 / (m.target * 2)) * 100) + '%';
        }, 200);
      } catch (e) {
        cur.rec = false; if (mic) { mic.classList.remove('listening'); mic.textContent = '🎙️'; }
        toast('Microphone is off', 'Chưa dùng được micro – hãy cho phép micro nhé', 'warm');
      }
    },
    next() { if (this.cur && this.cur.rec) return; this.i++; this.render(); },
    finish() {
      const done = this.doneCount();
      Sfx.playSuccessFanfare(); fx.confetti(40);
      $('#talkBody').innerHTML = `<div class="step"><div class="card lesson-done studs-top">
        <h3>🎙️ Talk Time ${done >= 3 ? 'Complete!' : 'Done for now!'}</h3><span class="vi">Hôm nay con đã hoàn thành ${done}/3 nhiệm vụ nói.</span>
        ${talkMeterHTML()}
        <div class="btn-row center"><button class="brick-btn btn-purple" data-action="talk-time">${bi('🔁 Practise again', 'Nói lại để phá kỷ lục')}</button>
        <button class="brick-btn btn-white" data-action="talk-exit" data-screen="map">${bi('🌍 Map', 'Bản đồ')}</button></div>
      </div></div>`;
    },
    close() { this.token++; if (this.cur && this.cur.rec) { this.cur.rec = false; Recorder.stop(); } Speech.cancel(); Recorder.releaseAll(); overlay.hidden = true; overlay.innerHTML = ''; render(); }
  };

  /* =========================================================
     📖 PICTURE STORY – Đọc tiếng Anh qua hình (từ vựng được THAY BẰNG HÌNH trong câu)
     Ý tưởng: nhìn hình → bật ra từ tiếng Anh, không dịch thầm qua tiếng Việt. Mỗi dòng có một nhân vật LEGO,
     từ vựng của bài hiện thành ô hình; con đọc to từng dòng rồi cả đoạn.
     Cấp 1: ô hình có chữ nhỏ gợi ý · Cấp 2: chỉ hình (đọc xong dòng mới hiện chữ) · Cấp 3: chỉ hình + đọc cả đoạn liền mạch
     ========================================================= */
  const Pic = {
    token: 0,
    lines(l) {
      const out = [];
      l.words.forEach((w) => {
        const core = w.en.replace(/\.\.\.|…|[?!]/g, '').replace(/\.$/, '').trim();
        const ex = String(w.ex || '');
        if (!core || !ex) return;
        const at = ex.toLowerCase().indexOf(core.toLowerCase());
        if (at === -1) return;
        out.push({ w, before: ex.slice(0, at), word: ex.substr(at, core.length), after: ex.slice(at + core.length), text: ex });
      });
      return out.slice(0, 6);
    },
    /** opts: { lesson, zone, container, onDone(score) } */
    start(opts) {
      this.token++;
      this.o = opts;
      this.L = this.lines(opts.lesson);
      if (this.L.length < 2) { opts.onDone(-1); return; }
      this.lv = S.skillLevel();
      this.done = this.L.map(() => false);
      this.phase = 'listen';
      this.cur = 0;
      this.render();
    },
    chipHTML(line, i) {
      const showWord = this.lv === 1 || this.done[i] || this.phase === 'listen-done';
      return `<span class="pic-chip role-${G.wordRole(line.w)}" style="${roleVars(G.wordRole(line.w), 'pc')}"><span class="pc-emoji">${line.w.emoji}</span>${showWord ? `<small class="pc-word">${esc(line.word)}</small>` : ''}</span>`;
    },
    render() {
      const z = this.o.zone, chars = [z.chars.a, z.chars.b];
      const lv = this.lv;
      const phaseTxt = {
        listen: ['🎧 Look and listen', 'Nhìn hình, nghe máy đọc mẫu cả đoạn'],
        lines: ['🗣️ Read line by line', 'Đọc to từng dòng – gặp HÌNH thì nói từ tiếng Anh của hình đó'],
        whole: ['🌟 Read the whole story!', 'Đọc liền cả đoạn thật tự tin – không cần dịch, nhìn hình là nói!']
      }[this.phase] || ['', ''];
      this.o.container().innerHTML = `<div class="step pic-read">
        <div class="step-head"><h2>📖 Picture Story</h2><span class="vi">Đọc tiếng Anh qua hình: mỗi HÌNH là một từ con vừa học. Nhìn hình là nói luôn bằng tiếng Anh nhé! ${lv === 1 ? '(Cấp 1: có chữ nhỏ dưới hình)' : '(chữ sẽ hiện sau khi con đọc xong dòng)'}</span></div>
        <div class="beat-banner">${phaseTxt[0]} <small class="vi">${phaseTxt[1]}</small></div>
        <div class="card pic-board studs-top">${this.L.map((ln, i) => {
          const ch = chars[i % 2];
          return `<div class="pic-line${this.phase === 'lines' && i === this.cur ? ' cur' : ''}${this.done[i] ? ' ok' : ''}" data-i="${i}">
            <span class="pic-who">${LG.renderMinifig(ch.fig)}<b>${esc(ch.name)}</b></span>
            <span class="pic-text">${esc(ln.before)}${this.chipHTML(ln, i)}${esc(ln.after)}</span>
            ${this.done[i] ? '<i class="pic-tick">✓</i>' : ''}
          </div>`;
        }).join('')}</div>
        <div class="step-foot" id="picFoot">${this.footHTML()}</div>
      </div>`;
    },
    footHTML() {
      const can = Recorder.supported || Lesson.useMic();
      if (this.phase === 'listen') return `<button class="brick-btn btn-blue btn-xl" data-action="pic-listen">${bi('🔊 Listen to the story', 'Nghe đọc mẫu')}</button>
        <button class="brick-btn btn-white" data-action="pic-start">${bi('🗣️ I can read it!', 'Con đọc luôn')}</button>`;
      if (this.phase === 'lines') return can ? `<button class="brick-btn btn-blue btn-sm" data-action="pic-line-say">${bi('🔊 Help', 'Nghe dòng này')}</button>
        <button class="mic-btn" data-action="pic-line-rec" id="picMic" aria-label="Read">🎙️</button>
        <small class="vi" id="picNote">Dòng ${this.cur + 1}/${this.L.length} – chạm 🎙️ rồi đọc to</small>
        ${!Lesson.speakRequired() ? `<button class="brick-btn btn-white btn-sm" data-action="pic-skip">${bi('Skip', 'Bỏ qua')}</button>` : ''}`
        : `<button class="brick-btn btn-green btn-xl" data-action="pic-finish">${bi('Next ▶', 'Tiếp tục')}</button>`;
      if (this.phase === 'whole') return `<button class="mic-btn" data-action="pic-whole-rec" id="picMic" aria-label="Read all">🎙️</button>
        <small class="vi" id="picNote">Chạm 🎙️ và đọc LIỀN cả đoạn (nói xong im lặng một lúc, máy tự dừng)</small>
        <button class="brick-btn btn-white btn-sm" data-action="pic-finish">${bi('Finish', 'Xong')}</button>`;
      return '';
    },
    async listen() {
      const tk = this.token;
      for (let i = 0; i < this.L.length; i++) {
        if (tk !== this.token) return;
        $$('.pic-line', overlay.hidden ? document : overlay).forEach((el, k) => el.classList.toggle('cur', k === i));
        await Speech.speak(this.L[i].text);
        await sleep(250);
      }
      if (tk !== this.token) return;
      this.startLines();
    },
    startLines() { Speech.cancel(); this.phase = 'lines'; this.cur = this.done.indexOf(false); if (this.cur === -1) return this.afterLines(); this.render(); },
    sayLine() { const ln = this.L[this.cur]; if (ln) Speech.speak(ln.text); this.helped = (this.helped || 0) + 1; },
    async recLine() {
      if (this.busy) return;
      const ln = this.L[this.cur], tk = this.token;
      if (!ln) return;
      this.busy = true;
      const mic = $('#picMic'), note = $('#picNote');
      const words = ln.text.split(/\s+/).length;
      const minMs = Math.min(2500, Math.max(600, words * 170));
      const res = await Lesson.voiceCheck(ln.text, (mode) => {
        if (mic) mic.classList.toggle('listening', mode !== 'idle');
        if (note && mode !== 'idle') note.textContent = 'Đang nghe con đọc…';
      }, { minVoiceMs: minMs, silenceMs: 1600, maxMs: 15000 });
      this.busy = false;
      if (tk !== this.token) return;
      // Ghi âm: cần thời lượng nói tương xứng độ dài câu (không chỉ "ừ" một tiếng)
      const longEnough = res.said !== undefined || !res.ok || (Recorder.voiceMs || 0) >= minMs;
      if (res.ok && longEnough) {
        this.done[this.cur] = true;
        Sfx.playBrickClick();
        this.o.earn && this.o.earn(2);
        const next = this.done.indexOf(false);
        if (next === -1) { this.render(); setTimeout(() => this.afterLines(), 500); return; }
        this.cur = next;
        this.render();
      } else {
        Sfx.playGentleOops();
        if (note) note.innerHTML = res.said ? `Mình nghe: “${esc(res.said)}” – đọc lại cả dòng nhé!` : 'Đọc TO, RÕ và đọc HẾT cả dòng nhé! Cần thì bấm 🔊 Help.';
      }
    },
    afterLines() {
      praise();
      if (this.lv >= 2 && (Recorder.supported || Lesson.useMic())) { this.phase = 'whole'; this.render(); Speech.speak('Great! Now read the whole story!'); }
      else this.finish();
    },
    async recWhole() {
      if (this.busy) return;
      this.busy = true;
      const tk = this.token, mic = $('#picMic'), note = $('#picNote');
      const total = this.L.reduce((a, ln) => a + ln.text.split(/\s+/).length, 0);
      if (mic) mic.classList.add('listening');
      try {
        await new Promise(async (resolve) => {
          await Recorder.start({ maxMs: 90000, autoStop: true, silenceMs: 2500, minVoiceMs: 1500, onAuto: async () => { await Recorder.stop(); resolve(); } });
          Sfx.playMicOn();
          const iv = setInterval(() => { if (!Recorder.isRecording()) { clearInterval(iv); return; } if (note) note.textContent = `🎤 Đang nghe… ${((Recorder.voiceMs || 0) / 1000).toFixed(1)} giây`; }, 200);
        });
      } catch (e) { /* micro lỗi */ }
      this.busy = false;
      if (mic) mic.classList.remove('listening');
      if (tk !== this.token) return;
      const sec = (Recorder.voiceMs || 0) / 1000, need = total * 0.22;
      if (sec >= need) {
        this.whole = true;
        fx.confetti(40); Sfx.playSuccessFanfare();
        this.o.earn && this.o.earn(5);
        if (Recorder.lastBlob) VoiceBook.add({ kind: 'story', lesson: this.o.lesson.id, title: '📖 ' + this.o.lesson.title, text: this.L.map((l) => l.text).join(' '), blob: Recorder.lastBlob });
        if (note) note.textContent = `Tuyệt vời! Con đọc ${sec.toFixed(1)} giây liền mạch! 🌟`;
        await Recorder.play(Recorder.lastBlob);
        if (tk === this.token) this.finish();
      } else {
        Sfx.playGentleOops();
        if (note) note.textContent = `Con mới đọc ${sec.toFixed(1)} giây – hãy đọc HẾT cả đoạn nhé!`;
      }
    },
    finish() {
      Speech.cancel();
      const n = this.done.filter(Boolean).length;
      this.o.onDone(this.L.length ? n / this.L.length : 1);
    },
    skip() { this.token++; this.o.onDone(-1); },
    stop() { this.token++; }
  };

  /* =========================================================
     🥁 BEAT TALK – Nói từ vựng theo nhịp nhạc (kiểu thử thách "say it on the beat")
     8 ô từ vựng (5 từ của bài + 3 từ ôn), nhạc trống chạy, ô sáng lần lượt theo nhịp – con đọc đúng nhịp.
     Vòng 1 🎧 nghe máy đọc mẫu · Vòng 2 🗣️ con đọc (có chữ) · Vòng 3 ⚡ nhanh hơn, xáo trộn, chỉ còn hình (tự nhớ từ)
     Micro nghe từng nhịp: nhịp nào con có đọc thì ô sáng ✓. Nhịp nhanh dần theo tháng & cấp độ.
     ========================================================= */
  const Beat = {
    token: 0,
    bpmFor(z) {
      const m = z && typeof z.month === 'number' ? z.month : 3;
      return 72 + (m - 1) * 4 + (S.skillLevel() - 1) * 5;
    },
    /** opts: { words, zone, container, title, onDone(stars), standalone } */
    start(opts) {
      this.token++;
      this.o = opts;
      this.round = 0;
      this.results = [];
      const base = opts.words.slice(0, 8);
      while (base.length < 8 && opts.words.length) base.push(opts.words[base.length % opts.words.length]);
      this.cards = base;
      this.bpm = this.bpmFor(opts.zone);
      this.renderIntro();
    },
    beatsOf(w) { return w.en.trim().split(/\s+/).length > 2 ? 2 : 1; },
    rounds() {
      return [
        { key: 'listen', icon: '🎧', en: 'Listen to the beat', vi: 'Nghe máy đọc theo nhịp – con lắc lư theo nhạc nhé!', bpm: this.bpm, showWord: true, rec: false, order: this.cards },
        { key: 'say', icon: '🗣️', en: 'Your turn – say it on the beat!', vi: 'Đến lượt con: ô nào sáng thì đọc từ đó THẬT TO, đúng nhịp', bpm: this.bpm, showWord: true, rec: true, order: this.cards },
        { key: 'fast', icon: '⚡', en: 'Faster! Pictures only!', vi: 'Nhanh hơn, xáo trộn, chỉ còn hình – con tự nhớ từ tiếng Anh!', bpm: this.bpm + 16, showWord: false, rec: true, order: shuffle(this.cards) }
      ];
    },
    el() { return this.o.container(); },
    gridHTML(r, lit = -1, hits = null) {
      return `<div class="beat-grid">${r.order.map((w, i) => `<div class="beat-card${i === lit ? ' lit' : ''}${hits && hits[i] === true ? ' hit' : hits && hits[i] === false ? ' miss' : ''}" data-i="${i}">
        <span class="bc-emoji">${w.emoji}</span>${r.showWord ? `<b class="bc-word">${esc(w.en.replace(/\.\.\./g, ''))}</b>` : '<b class="bc-word hidden-w">?</b>'}
        ${hits && hits[i] === true ? '<i class="bc-tick">✓</i>' : ''}</div>`).join('')}</div>`;
    },
    renderIntro() {
      const r = this.rounds()[this.round];
      this.r = r;
      this.el().innerHTML = `<div class="step beat">
        <div class="step-head"><h2>🥁 Beat Talk</h2><span class="vi">Nói từ vựng theo nhịp nhạc! ${this.o.title ? esc(this.o.title) + ' · ' : ''}Vòng ${this.round + 1}/3 · ${r.bpm} nhịp/phút</span></div>
        <div class="beat-banner">${r.icon} <b class="en">${r.en}</b><small class="vi">${r.vi}</small></div>
        <div id="beatStage">${this.gridHTML(r)}</div>
        <div class="beat-count" id="beatCount"></div>
        <div class="step-foot" id="beatFoot">
          <button class="brick-btn btn-red btn-xl" data-action="beat-go">${bi(`▶ Start round ${this.round + 1}`, 'Bắt đầu vòng ' + (this.round + 1))}</button>
          ${this.o.standalone || !Lesson.speakRequired() ? `<button class="brick-btn btn-white btn-sm" data-action="beat-skip">${bi('Skip', 'Bỏ qua')}</button>` : ''}
        </div>
      </div>`;
    },
    async go() {
      const r = this.r, tk = this.token;
      if (this.playing) return;
      this.playing = true;
      Speech.cancel();
      Sfx.unlock();
      const foot = $('#beatFoot'); if (foot) foot.innerHTML = '<small class="vi">🎵 Nhạc đang chạy…</small>';
      let recOk = false;
      if (r.rec && Recorder.supported) {
        try { await Recorder.start({ maxMs: 60000 }); recOk = true; } catch (e) { recOk = false; }
      }
      if (tk !== this.token) { if (recOk) Recorder.stop(); return; }
      const spb = 60 / r.bpm;
      const now = Sfx.now() || 0;
      const t0 = now + 0.35;
      const cardBeats = r.order.map((w) => this.beatsOf(w));
      const totalBeats = 4 + cardBeats.reduce((a, b) => a + b, 0) + 1;
      for (let b = 0; b < totalBeats; b++) {
        const d = t0 + b * spb - now;
        Sfx.playKick(d);
        Sfx.playHat(d + spb / 2);
        if (b % 2 === 1) Sfx.playClap(d);
      }
      const at = (beat) => (t0 + beat * spb - now) * 1000;
      const cnt = $('#beatCount');
      [0, 1, 2, 3].forEach((k) => setTimeout(() => { if (tk === this.token && cnt) cnt.textContent = ['1', '2', '3', 'Go! 🎤'][k]; }, at(k)));
      // Đo độ ồn nền (có tiếng trống) trong lúc đếm nhịp để không tính nhầm tiếng nhạc là tiếng con
      const floorSamples = [];
      const sampler = setInterval(() => { if (Recorder.isRecording()) floorSamples.push(Recorder.rms()); }, 40);
      const hits = r.order.map(() => (r.rec ? false : null));
      let beatIdx = 4;
      r.order.forEach((w, i) => {
        const start = beatIdx, len = cardBeats[i];
        beatIdx += len;
        setTimeout(() => {
          if (tk !== this.token) return;
          const stage = $('#beatStage');
          if (stage) stage.innerHTML = this.gridHTML(r, i, r.rec ? hits.map((h, k) => (k < i ? h : null)) : null);
          if (cnt) cnt.textContent = '';
          if (!r.rec) Speech.speak(w.en.replace(/\.\.\./g, ''), { rate: 1 });
          if (r.rec && recOk) {
            const sorted = floorSamples.slice().sort((a, b) => a - b);
            const p50 = sorted.length ? sorted[Math.floor(sorted.length * 0.5)] : 0.02;
            const thr = Math.min(0.15, Math.max(0.05, p50 * 2.5));
            let n = 0;
            const iv = setInterval(() => { if (Recorder.rms() > thr) n++; }, 40);
            setTimeout(() => { clearInterval(iv); hits[i] = n >= 2; }, len * spb * 1000 + 120);
          }
        }, at(start) - 60);
      });
      setTimeout(async () => {
        clearInterval(sampler);
        if (tk !== this.token) return;
        if (recOk) await Recorder.stop();
        this.playing = false;
        if (r.rec && !recOk) hits.fill(null);
        this.finishRound(hits);
      }, at(beatIdx) + 400);
    },
    finishRound(hits) {
      const r = this.r;
      const graded = hits.filter((h) => h !== null);
      const pct = graded.length ? graded.filter(Boolean).length / graded.length : 1;
      if (r.rec) this.results.push(pct);
      const stage = $('#beatStage'); if (stage) stage.innerHTML = this.gridHTML(Object.assign({}, r, { showWord: true }), -1, r.rec ? hits : null);
      const last = this.round >= 2;
      const msg = !r.rec ? 'Great listening! Now it\'s your turn.' : pct >= 1 ? 'Perfect beat! 🔥' : pct >= 0.75 ? 'Awesome rhythm!' : pct >= 0.5 ? 'Good! Say every word louder!' : 'Let\'s try again – say each word when it lights up!';
      if (r.rec) { if (pct >= 0.75) { Sfx.playSuccessFanfare(); fx.confetti(30); } else Sfx.playGentleOops(); }
      Speech.speak(msg.replace(/[🔥]/g, ''));
      const foot = $('#beatFoot');
      if (foot) foot.innerHTML = `<div class="beat-result">${r.rec ? `<b>${Math.round(pct * 100)}%</b> nhịp có tiếng con · ` : ''}${esc(msg)}</div>
        ${r.rec ? `<button class="brick-btn btn-white" data-action="beat-retry">${bi('🔁 Again', 'Thử lại vòng này')}</button>` : ''}
        <button class="brick-btn btn-green btn-xl" data-action="beat-next">${bi(last ? 'Finish ▶' : 'Next round ▶', last ? 'Hoàn thành' : 'Vòng tiếp theo')}</button>`;
      this.lastPct = pct;
    },
    retry() { if (this.r && this.r.rec) this.results.pop(); this.renderIntro(); },
    next() {
      if (this.round >= 2) return this.finish();
      this.round++;
      this.renderIntro();
    },
    finish() {
      const best = this.results.length ? Math.max(...this.results) : 0;
      const final = this.results.length ? this.results[this.results.length - 1] : 0;
      const score = Math.max(final, best * 0.9);
      const stars = score >= 0.95 ? 3 : score >= 0.75 ? 2 : score >= 0.5 ? 1 : 0;
      const done = this.o.onDone;
      if (done) done(stars);
    },
    skip() { this.token++; if (Recorder.isRecording()) Recorder.stop(); this.playing = false; if (this.o.onDone) this.o.onDone(-1); },
    stop() { this.token++; this.playing = false; if (Recorder.isRecording()) Recorder.stop(); }
  };

  /** Beat Talk độc lập (từ Bản đồ): ôn 8 từ đã học. Thưởng tối đa 3 lượt/ngày để tránh "cày". */
  function startBeatReview() {
    const learned = shuffle(S.learnedWordIds().filter((id) => WORDS[id])).map((id) => WORDS[id]);
    if (learned.length < 4) { toast('Learn a few words first!', 'Học xong 1 bài để có từ vựng chơi Beat Talk nhé!', 'warm'); return; }
    closeModal();
    Lesson.token++; Review.token++; Gym.token++; Check.token++; Talk.token++;
    Speech.cancel(); Listener.stop();
    overlay.hidden = false;
    overlay.innerHTML = `<div class="lesson-top">
        <button class="brick-btn btn-white btn-round" data-action="beat-close" aria-label="Close">✕</button>
        <div style="text-align:center"><b class="en" style="font-size:22px">🥁 Beat Talk</b><div class="lesson-step-name">Ôn từ đã học theo nhịp nhạc</div></div>
        <div class="lesson-earned">${speedChipHTML()}</div>
      </div>
      <div class="lesson-body" id="beatBody"></div>`;
    const z = WORDS[learned[0].id] ? ZONES.find((x) => x.id === learned[0].zoneId) : null;
    Beat.start({
      words: learned.slice(0, 8), zone: z, standalone: true, title: 'Review',
      container: () => $('#beatBody'),
      onDone: (stars) => {
        const k = S.todayKey(); S.state.beatDay = S.state.beatDay && S.state.beatDay.date === k ? S.state.beatDay : { date: k, n: 0 };
        const paid = stars > 0 && S.state.beatDay.n < 3;
        if (paid) { S.state.beatDay.n++; S.addStuds(stars * 4); S.save(); updateWallet(); }
        $('#beatBody').innerHTML = `<div class="step"><div class="card lesson-done studs-top"><h3>🥁 Beat Talk ${stars > 0 ? '⭐'.repeat(stars) : ''}</h3>
          <span class="vi">${stars >= 3 ? 'Đúng nhịp tuyệt đối!' : stars ? 'Con đọc theo nhịp giỏi lắm!' : 'Lần sau đọc to hơn theo từng ô sáng nhé!'}</span>
          ${paid ? `<div class="reward-row"><span class="reward"><i class="stud-icon"></i>+${stars * 4} Studs</span></div>` : stars > 0 ? '<p class="vi">Hôm nay con đã nhận đủ thưởng Beat Talk – chơi tiếp để luyện thôi nhé!</p>' : ''}
          ${talkMeterHTML()}
          <div class="btn-row center"><button class="brick-btn btn-red" data-action="beat-review">${bi('🔁 New words', 'Chơi với từ khác')}</button>
          <button class="brick-btn btn-white" data-action="beat-exit" data-screen="map">${bi('🌍 Map', 'Bản đồ')}</button></div></div></div>`;
      }
    });
  }

  /* =========================================================
     LEGO MYSTERY MISSION (Nhiệm vụ thám tử cuối mỗi Vùng đất)
     ========================================================= */
  const Mystery = {
    token: 0,
    start(zoneId) {
      const z = zoneById(zoneId);
      if (!z || !z.mystery) return;
      if (!mysteryOpen(z)) { toast('Locked!', `Học xong ${z.lessons.length} bài của vùng này để mở Nhiệm vụ thám tử nhé`, 'warm'); return; }
      closeModal();
      this.token++;
      Speech.cancel(); Listener.stop();
      this.z = z; this.m = z.mystery;
      this.heard = new Set(); this.showVi = new Set(); this.first = true; this.solved = false; this.wrong = new Set();
      this.opts = shuffle(this.m.options.map((o, i) => Object.assign({ ok: i === this.m.answer }, o)));
      overlay.hidden = false;
      overlay.innerHTML = `<div class="lesson-top">
          <button class="brick-btn btn-white btn-round" data-action="mystery-close" aria-label="Close">✕</button>
          <div style="text-align:center"><b class="en" style="font-size:22px">🕵️ LEGO Mystery Mission</b><div class="lesson-step-name">Nhiệm vụ thám tử – ${esc(z.name)}</div></div>
          <div class="lesson-earned"><span class="chip" style="box-shadow:0 4px 0 var(--card-edge)"><i class="stud-icon"></i><b id="mysStuds">0</b></span></div>
        </div>
        <div class="lesson-body" id="mysteryBody"></div>`;
      document.body.style.overflow = 'hidden';
      this.render();
      const tk = this.token;
      setTimeout(() => { if (tk === this.token) Speech.speak(this.m.intro.en, { pitch: 0.95 }); }, 450);
    },

    render() {
      const m = this.m, z = this.z;
      const body = $('#mysteryBody');
      if (!body) return;
      const allHeard = m.clues.every((_, i) => this.heard.has(i));
      body.innerHTML = `<div class="step mystery" style="${zoneStyle(z)}">
        <div class="card mystery-case studs-top">
          <div class="case-fig">${LG.renderMinifig(z.chars.b.fig, { cls: 'det-fig' })}<span class="det-glass">🔍</span></div>
          <div class="case-text">
            <div class="case-label">🗂️ CASE FILE · ${esc(z.short || z.name)}</div>
            <h2>${esc(m.title)}</h2><span class="vi">${esc(m.titleVi)}</span>
            <button class="intro-line" data-action="say-text" data-text="${esc(m.intro.en)}">🔊 ${esc(m.intro.en)}<span class="vi">${esc(m.intro.vi)}</span></button>
          </div>
        </div>
        <div class="clue-grid">${m.clues.map((c, i) => {
          const open = i === 0 || this.heard.has(i - 1);
          const heard = this.heard.has(i);
          return `<div class="clue-card ${heard ? 'heard' : open ? 'open' : 'locked'}">
            <div class="clue-num">🔎 Clue ${i + 1}<small class="vi"> · Manh mối ${i + 1}</small></div>
            ${heard
              ? `<button class="clue-text" data-action="mys-clue" data-i="${i}">🔊 ${esc(c.en)}</button>
                 ${this.showVi.has(i) ? `<div class="clue-vi vi">${esc(c.vi)}</div>` : c.vi ? `<button class="btn-mini-text" data-action="mys-vi" data-i="${i}">🇻🇳 Dịch nghĩa</button>` : ''}`
              : open
                ? `<button class="brick-btn btn-yellow" data-action="mys-clue" data-i="${i}">${bi('🔊 Listen to the clue', 'Nghe manh mối')}</button>`
                : '<div class="clue-lock">🔒<small class="vi">Nghe manh mối trước đã</small></div>'}
          </div>`;
        }).join('')}</div>
        ${allHeard ? `<div class="card mystery-q studs-top">
            <div class="q-title"><button data-action="say-text" data-text="${esc(m.q.en)}">🔊 ${esc(m.q.en)}</button><span class="vi">${esc(m.q.vi)}</span></div>
            <div class="opt-grid">${this.opts.map((o, k) => `<button class="opt-brick${this.wrong.has(k) ? ' wrong' : ''}" data-action="mys-pick" data-i="${k}" style="--oc:${BRICK_COLORS[k]};--ocd:${LG.shade(BRICK_COLORS[k], -0.3)}">
              <span class="o-emoji">${o.emoji}</span><span class="o-word">${esc(o.en)}</span>${o.vi ? `<small class="o-vi">${esc(o.vi)}</small>` : ''}</button>`).join('')}</div>
          </div>`
          : '<p class="talk-tip" style="font-size:15px">👂 Nghe lần lượt cả 3 manh mối – mỗi manh mối loại bớt một đáp án. Nghe xong sẽ mở câu hỏi cuối!</p>'}
        <div id="mysteryWin"></div>
      </div>`;
    },

    async clue(i) {
      const c = this.m.clues[i];
      if (!c) return;
      const tk = this.token;
      const isNew = !this.heard.has(i);
      this.heard.add(i);
      if (isNew) { Sfx.playBrickClick(); this.render(); }
      await Speech.speak(c.en, { pitch: 0.95 });
      if (tk !== this.token) return;
      if (isNew && this.m.clues.every((_, k) => this.heard.has(k))) {
        const q = $('.mystery-q', overlay);
        if (q) q.scrollIntoView({ behavior: 'smooth', block: 'center' });
        Speech.speak(this.m.q.en);
      }
    },

    pick(k, el) {
      if (this.solved) return;
      const o = this.opts[k];
      if (!o) return;
      Speech.speak(o.en);
      if (!o.ok) {
        this.first = false;
        this.wrong.add(k);
        el.classList.add('wrong');
        Sfx.playGentleOops();
        toast('Not this one! Check the clues again.', 'Chưa đúng – đọc lại manh mối xem đáp án này bị loại vì sao nhé!', 'warm');
        S.addMistake('mystery:' + this.z.id, `${this.m.q.en} → ${this.m.options[this.m.answer].en}`, this.m.titleVi);
        return;
      }
      this.solved = true;
      el.classList.add('right');
      $$('.mystery-q .opt-brick', overlay).forEach((b) => { b.style.pointerEvents = 'none'; });
      const stars = this.first ? 3 : 2;
      const firstTime = S.solveMystery(this.z.id, stars);
      const studs = firstTime ? 15 : 5;
      const gold = firstTime ? 2 : 0;
      S.addStuds(studs); if (gold) S.addGold(gold);
      updateWallet();
      $('#mysStuds').textContent = studs;
      Sfx.playSuccessFanfare(); fx.confetti(70);
      const r = el.getBoundingClientRect(); fx.floatText('+' + studs, r.left + r.width / 2, r.top);
      $('#mysteryWin').innerHTML = `<div class="card lesson-done studs-top">
        <h3>🏅 Case Closed!</h3><span class="vi">Phá án thành công!</span>
        <div style="font-size:40px;margin:8px 0">${starsHTML(stars)}</div>
        <button class="intro-line win-line" data-action="say-text" data-text="${esc(this.m.win.en)}">🔊 ${esc(this.m.win.en)}<span class="vi">${esc(this.m.win.vi)}</span></button>
        <div class="reward-row">
          <span class="reward"><i class="stud-icon"></i>+${studs} Studs</span>
          ${gold ? `<span class="reward"><i class="gold-icon"></i>+${gold} Gold</span>` : ''}
          <span class="reward">🕵️ Detective Stamp</span>
        </div>
        <div class="btn-row center">
          <button class="brick-btn btn-purple" data-action="mystery-exit" data-screen="passport">${bi('🛂 My Passport', 'Xem Hộ chiếu')}</button>
          <button class="brick-btn btn-white" data-action="mystery-exit" data-screen="map">${bi('🌍 Map', 'Bản đồ')}</button>
        </div>
      </div>`;
      const tk = this.token;
      setTimeout(() => { if (tk !== this.token) return; $('#mysteryWin').scrollIntoView({ behavior: 'smooth', block: 'center' }); Speech.speak(this.m.win.en); }, 500);
    },

    close() {
      this.token++;
      Speech.cancel();
      Recorder.releaseAll(); overlay.hidden = true; overlay.innerHTML = '';
      render();
    }
  };

  /* =========================================================
     ĐIỀU HƯỚNG & SỰ KIỆN
     ========================================================= */
  function go(screen) {
    App.screen = screen;
    if (screen !== 'parent') { App.parentOk = false; App.gate = null; }
    if (!overlay.hidden) { Lesson.token++; Review.token++; Mystery.token++; Gym.token++; Check.token++; Talk.token++; Beat.token++; Pic.token++; Speech.cancel(); Listener.stop(); Lesson.stopStudio(); Recorder.releaseAll(); overlay.hidden = true; overlay.innerHTML = ''; }
    closeModal();
    render();
    screenEl.scrollTop = 0;
  }

  function render() {
    $$('.dock-btn').forEach((b) => b.classList.toggle('active', b.dataset.screen === App.screen));
    updateWallet();
    ({ map: renderMap, workshop: renderWorkshop, diorama: renderDiorama, locker: renderLocker, passport: renderPassport, parent: renderParent })[App.screen]();
  }

  const actions = {
    'go': (el) => go(el.dataset.screen),
    'modal-close': () => closeModal(),
    'open-zone': (el) => openZone(el.dataset.zone),
    'start-lesson': (el) => { if (!overlay.hidden) { Lesson.token++; Review.token++; Mystery.token++; Gym.token++; Check.token++; Talk.token++; Beat.token++; Pic.token++; Lesson.stopStudio(); overlay.hidden = true; } Lesson.start(el.dataset.lesson, { force: el.dataset.force === '1' }); },
    'ws-open': (el) => { App.wsZone = el.dataset.zone; const z = zoneById(el.dataset.zone); if (z) S.state.settings.roadmap = z.stage; go('workshop'); },
    'ws-zone': (el) => { App.wsZone = el.dataset.zone; renderWorkshop(); },
    'review': (el) => { const zid = el.dataset.zone || null; if (!overlay.hidden) { Lesson.token++; Mystery.token++; Gym.token++; Check.token++; Talk.token++; Beat.token++; Pic.token++; Lesson.stopStudio(); } Review.start(zid); },
    'mystery': (el) => { if (!overlay.hidden) { Lesson.token++; Review.token++; Gym.token++; Speech.cancel(); Listener.stop(); Lesson.stopStudio(); } Mystery.start(el.dataset.zone); },
    'mystery-close': () => Mystery.close(),
    'mystery-exit': (el) => { Mystery.close(); go(el.dataset.screen); },
    'mys-clue': (el) => Mystery.clue(Number(el.dataset.i)),
    'mys-vi': (el) => { Mystery.showVi.add(Number(el.dataset.i)); Mystery.render(); },
    'mys-pick': (el) => Mystery.pick(Number(el.dataset.i), el),
    'pp-filter': (el) => { App.ppFilter = el.dataset.f; renderPassport(); },
    'pp-word': (el) => passportWord(el.dataset.id),
    'review-close': () => Review.close(),
    'review-exit': () => { Review.close(); go('diorama'); },
    'rv-say': () => Review.say(),
    'rv-pick': (el) => Review.pick(Number(el.dataset.i), el),
    'toggle-school': () => { const st = S.state.settings; if (SCHOOL_BOOKS[st.book]) { st.lastBook = st.book; st.book = 'none'; } else st.book = SCHOOL_BOOKS[st.lastBook] ? st.lastBook : 'gs3'; S.save(); renderMap(); },
    'stage-tab': (el) => { const v = el.dataset.stage; S.state.settings.roadmap = v === 'sgk' ? 'sgk' : Number(v); S.save(); Sfx.playBrickClick(); render(); screenEl.scrollTop = 0; },
    'gym': () => { if (!overlay.hidden) { Lesson.token++; Review.token++; Mystery.token++; Speech.cancel(); Listener.stop(); Lesson.stopStudio(); } Gym.start(); },
    'gym-say': () => Gym.say(),
    'gym-tf': (el) => Gym.pickTF(el.dataset.v === '1', el),
    'gym-show': () => Gym.show(),
    'gym-hint': () => Gym.hint(),
    'gym-mic': () => Gym.mic(),
    'gym-next': () => Gym.next(),
    'gym-close': () => Gym.close(),
    'grade-speak': (el) => {
      const c = S.state.checks.find((x) => x.id === el.dataset.check);
      if (!c) return;
      c.speakGrades = c.speakGrades || {};
      c.speakGrades[el.dataset.clip] = el.dataset.v === '1';
      const g = Object.values(c.speakGrades);
      c.scores.speak = Math.round((g.filter(Boolean).length / g.length) * 100);
      S.save(); fillCheckHistory();
    },
    'talk-time': () => { if (!overlay.hidden) { Lesson.token++; Review.token++; Mystery.token++; Gym.token++; Check.token++; Speech.cancel(); Listener.stop(); Lesson.stopStudio(); } Talk.start(); },
    'tt-say': () => Talk.say(),
    'beat-lesson': () => Lesson.beatLesson(),
    'pic-lesson': () => Lesson.picLesson(),
    'pic-listen': () => Pic.listen(),
    'pic-start': () => Pic.startLines(),
    'pic-line-say': () => Pic.sayLine(),
    'pic-line-rec': () => Pic.recLine(),
    'pic-whole-rec': () => Pic.recWhole(),
    'pic-finish': () => Pic.finish(),
    'pic-skip': () => Pic.skip(),
    'beat-go': () => Beat.go(),
    'beat-next': () => Beat.next(),
    'beat-retry': () => Beat.retry(),
    'beat-skip': () => Beat.skip(),
    'beat-review': () => startBeatReview(),
    'beat-close': () => { Beat.stop(); Recorder.releaseAll(); overlay.hidden = true; overlay.innerHTML = ''; render(); },
    'beat-exit': (el) => { Beat.stop(); Recorder.releaseAll(); overlay.hidden = true; overlay.innerHTML = ''; go(el.dataset.screen); },
    'tt-frame': (el) => Speech.speak(el.dataset.t.replace(/…|\.\.\./g, '')),
    'tt-rec': () => Talk.rec(),
    'tt-next': () => Talk.next(),
    'talk-close': () => Talk.close(),
    'talk-exit': (el) => { Talk.close(); go(el.dataset.screen); },
    'skill-check': () => { if (!overlay.hidden) { Lesson.token++; Review.token++; Mystery.token++; Gym.token++; Check.token++; Talk.token++; Beat.token++; Pic.token++; Speech.cancel(); Listener.stop(); Lesson.stopStudio(); } Check.start(); },
    'check-go': () => Check.render(),
    'check-say': () => Check.say(),
    'check-pick': (el) => Check.pick(Number(el.dataset.v)),
    'check-brick': (el) => Check.brick(Number(el.dataset.id)),
    'check-build-done': () => Check.buildDone(),
    'check-speak': () => Check.speak(),
    'check-skip': () => Check.skip(),
    'check-close': () => Check.close(),
    'check-exit': (el) => { Check.close(); go(el.dataset.screen); },
    'gym-exit': (el) => { Gym.close(); go(el.dataset.screen); },
    'gym-again': () => Gym.start(),
    'fact-vi': (el) => { const v = el.nextElementSibling; if (v) v.hidden = false; el.remove(); },
    'say-text': (el) => Speech.speak(el.dataset.text),

    // Bài học
    'lesson-close': () => Lesson.close(true),
    'lesson-exit': (el) => { Lesson.close(false); go(el.dataset.screen); },
    'lesson-next': () => Lesson.next(),
    'say-word': (el) => Lesson.discoverAction('say-word', Number(el.dataset.i), el),
    'say-slow': (el) => Lesson.discoverAction('say-slow', Number(el.dataset.i), el),
    'say-ex': (el) => Lesson.discoverAction('say-ex', Number(el.dataset.i), el),
    'reveal': (el) => Lesson.discoverAction('reveal', Number(el.dataset.i), el),
    'collect': (el) => Lesson.discoverAction('collect', Number(el.dataset.i), el),
    'panel-vi': (el) => { Lesson.c.viShown.add(Number(el.dataset.p)); Lesson.renderComic(); },
    'say-it': (el) => Lesson.sayIt(Number(el.dataset.i), el),
    'hear-me': (el) => Lesson.hearMe(Number(el.dataset.i)),
    'reflex-replay': () => Lesson.reflexSpeak(),
    'reflex-pick': (el) => Lesson.reflexPick(Number(el.dataset.i), el),
    'comic-play': () => Lesson.comicPlay(),
    'comic-ready': () => { Speech.cancel(); Lesson.c.playing = false; Lesson.c.phase = 'fill'; Lesson.renderComic(); },
    'comic-pick': (el) => Lesson.comicPick(Number(el.dataset.i), el),
    'say-panel': (el) => { if (!Lesson.c.playing) Lesson.speakPanel(Number(el.dataset.p), Lesson.token); },
    'build-check': (el) => Lesson.buildCheck(el),
    'build-hint': () => Lesson.buildHint(),
    'build-color': () => Lesson.buildColor(),
    'build-say': () => Lesson.buildSay(),
    'build-clear': () => { if (!Lesson.b.solved) { Lesson.b.placed = []; Lesson.renderBricks(); } },
    'build-next': () => { Lesson.b.si++; Lesson.setupSentence(); },
    'talk-say': () => Lesson.talkSay(),
    'talk-hint': () => { const say = Lesson.showHint(); if (say) Speech.speak(say); },
    'talk-mic': () => Lesson.talkMic(),
    'talk-fallback': () => { Listener.stop(); Lesson.t.mode = 'fallback'; Lesson.renderTalkMode(); },
    'talk-choose': () => { Listener.stop(); Lesson.stopStudio(); Lesson.t.mode = 'choose'; Lesson.renderTalkMode(); },
    'talk-to-mic': () => { Lesson.stopStudio(); Lesson.t.mode = 'mic'; Lesson.renderTalkMode(); },
    'talk-rec': () => Lesson.studioRec(),
    'talk-play': () => Lesson.vuPlay(() => Recorder.play(), 'you'),
    'studio-model': () => Lesson.studioModel(),
    'studio-rec': () => Lesson.studioRec(),
    'studio-play': () => Lesson.vuPlay(() => Recorder.play(), 'you'),
    'studio-compare': () => Lesson.studioCompare(),
    'branch-pick': (el) => Lesson.branchPick(el.dataset.kind, Number(el.dataset.i), el, false),
    'branch-mic': () => Lesson.branchMic(),
    'talk-rate': (el) => { Lesson.t.rating = Number(el.dataset.n); Sfx.playStudCollect(1); Lesson.renderTalkMode(); },
    'talk-pick': (el) => Lesson.talkPick(Number(el.dataset.i), el),
    'talk-next': () => { Lesson.t.ti++; Lesson.setupTalk(); },
    'bag-tap': () => Lesson.bagTap(),
    'qb-later': () => Lesson.finishLesson(),

    // Tủ đồ
    'speed-cycle': () => cycleSpeed(),
    'rv-clue': () => Review.clue(),
    'rv-speak': () => Review.speakWord(),
    'rv-reveal': () => Review.reveal(null, true),
    'rv-self': (el) => Review.sayResult(el.dataset.ok === '1'),
    'vb-play': async (el) => { const c = await VoiceBook.get(Number(el.dataset.id)); if (c) { Speech.cancel(); el.classList.add('rec-on'); await Recorder.play(c.blob); el.classList.remove('rec-on'); } },
    'vb-compare': async (el) => { const a = await VoiceBook.get(Number(el.dataset.a)), b = await VoiceBook.get(Number(el.dataset.b)); if (!a || !b) return; toast('First recording', 'Bản ghi đầu tiên', ''); await Recorder.play(a.blob); await sleep(600); toast('Latest recording', 'Bản ghi mới nhất', 'good'); await Recorder.play(b.blob); },
    'vb-clear': async () => { if (await confirmModal({ en: 'Delete all recordings?', vi: 'Xóa toàn bộ sổ giọng nói?', text: '<p>Các bản ghi giọng con sẽ bị xóa khỏi thiết bị này.</p>', ok: 'Delete', okVi: 'Xóa' })) { await VoiceBook.clear(); fillVoiceBook(); } },
    'locker-cat': (el) => { App.lockerCat = el.dataset.cat; renderLocker(); },
    'locker-item': (el) => lockerItem(el.dataset.id),
    'locker-mystery': (el) => { Sfx.playGentleOops(); const it = LG.ITEMS[App.lockerCat].find((x) => x.id === el.dataset.id); toast(it && it.secret ? '🎁 Secret!' : '❓ Mystery!', it && it.secret ? `Nói tiếng Anh tổng cộng ${it.milestone} phút (Talk Time, bài học, Gym…) để mở món bí mật này!` : 'Mua đủ đồ ở tầng thấp hơn để mở món này nhé!', 'warm'); },
    'fig-hello': () => { const f = $('#bigFig svg'); if (f) bounceEl(f); Speech.speak(`Hi! I'm ${S.state.profile.name}. I love building with LEGO!`, { pitch: 1.15 }); },
    'fig-random': () => {
      const av = {};
      Object.keys(LG.ITEMS).forEach((cat) => { const owned = LG.ITEMS[cat].filter((it) => S.owns(it.id)); av[cat] = pick(owned).id; });
      S.state.avatar = av; S.save(); Sfx.playBrickClick(); renderLocker(); updateWallet();
    },

    // Bố mẹ
    'gate-key': (el) => {
      const k = el.dataset.k, G = App.gate;
      if (k === 'del') G.input = G.input.slice(0, -1);
      else if (k === 'ok') {
        if (Number(G.input) === G.ans) { App.parentOk = true; Sfx.playSuccessFanfare(); renderParent(); return; }
        Sfx.playGentleOops(); toast('Not quite!', 'Chưa đúng – thử câu hỏi khác nhé', 'warm'); newGate();
      } else if (G.input.length < 4) G.input += k;
      renderParent();
    },
    'parent-lock': () => { App.parentOk = false; App.gate = null; renderParent(); },
    'cu-copy-prompt': async () => { await copyText(CU.promptText(), $('#promptBox')); toast('Prompt copied!', 'Đã sao chép Prompt – dán vào trợ lý AI và thêm nội dung SGK của con', 'good'); },
    'cu-sample': () => { const box = $('#unitJson'); box.value = CU.sampleText(); App.unitDraft = box.value; App.importReport = ''; $('#importReport').innerHTML = ''; toast('Sample pasted', 'Đã dán JSON mẫu – bấm Kiểm tra hoặc Nhập bài', 'good'); },
    'cu-check': () => { const res = CU.parse(readUnitDraft()); App.importReport = importReportHTML(res); $('#importReport').innerHTML = App.importReport; if (res.ok) Sfx.playBrickClick(); else Sfx.playGentleOops(); },
    'cu-import': () => importUnit(),
    'cu-copy': async (el) => { const u = S.state.customUnits.find((x) => x.id === el.dataset.id); if (u) { await copyText(JSON.stringify(u.data, null, 2)); toast('JSON copied!', 'Đã sao chép JSON của bài – có thể gửi cho bố mẹ khác', 'good'); } },
    'cu-delete': async (el) => {
      const u = S.state.customUnits.find((x) => x.id === el.dataset.id);
      if (!u) return;
      const ok = await confirmModal({ en: 'Delete this unit?', vi: `Xóa "${u.data.name}"?`, text: 'Vùng đất, mô hình và tiến độ học của bài này sẽ bị xóa khỏi thiết bị.', ok: 'Delete', okVi: 'Xóa', okClass: 'btn-red' });
      if (!ok) return;
      S.removeCustomUnit(u.id);
      CU.syncAll(S.state.customUnits);
      if (App.wsZone === u.id) App.wsZone = 'z1';
      toast('Deleted', 'Đã xóa bài nhập', 'good');
      renderParent();
    },
    'clear-mistakes': async () => { if (await confirmModal({ en: 'Clear the mistake list?', vi: 'Xóa danh sách lỗi hay gặp?', ok: 'Clear', okVi: 'Xóa', okClass: 'btn-red' })) { S.clearMistakes(); renderParent(); } },
    'toggle-sfx': () => { S.state.settings.sfx = S.state.settings.sfx === false; S.save(); applySettings(); renderParent(); Sfx.playBrickClick(); },
    'backup-download': () => {
      const blob = new Blob([S.exportJSON()], { type: 'application/json' });
      const a = document.createElement('a');
      a.href = URL.createObjectURL(blob);
      a.download = `lego-english-backup-${S.todayKey()}.json`;
      document.body.appendChild(a); a.click(); a.remove();
      setTimeout(() => URL.revokeObjectURL(a.href), 4000);
      toast('Backup ready!', 'Đã tạo file sao lưu', 'good');
    },
    'code-make': () => { $('#codeOut').value = S.toCode(); toast('Code created!', 'Đã tạo Mã Chuyển Máy – bấm Sao chép', 'good'); },
    'code-copy': async () => {
      const box = $('#codeOut');
      if (!box.value) box.value = S.toCode();
      try { await navigator.clipboard.writeText(box.value); }
      catch (e) { box.removeAttribute('readonly'); box.select(); document.execCommand('copy'); box.setAttribute('readonly', ''); }
      toast('Copied!', 'Đã sao chép mã – dán vào thiết bị kia', 'good');
    },
    'code-restore': async () => {
      const code = $('#codeIn').value;
      if (!code.trim()) { toast('Paste a code first', 'Hãy dán mã vào ô trước nhé', 'warm'); return; }
      const ok = await confirmModal({ en: 'Restore from code?', vi: 'Khôi phục từ Mã Chuyển Máy?', text: 'Tiến độ hiện tại trên thiết bị này sẽ được thay thế.', ok: 'Restore', okVi: 'Khôi phục', okClass: 'btn-blue' });
      if (!ok) return;
      try { await S.fromCode(code); afterRestore(); }
      catch (e) { toast('Invalid code', 'Mã không hợp lệ: ' + e.message, 'warm'); }
    },
    'reset-all': async () => {
      const ok = await confirmModal({ en: 'Reset ALL progress?', vi: 'Xóa TOÀN BỘ tiến độ học, mô hình và trang phục?', text: 'Nên tải file sao lưu trước. Thao tác này không thể hoàn tác.', ok: 'Reset', okVi: 'Xóa hết', okClass: 'btn-red' });
      if (!ok) return;
      await S.reset(); CU.syncAll(S.state.customUnits); applySettings(); updateWallet(); toast('Fresh start!', 'Đã xóa tiến độ', 'good'); renderParent();
    }
  };

  document.addEventListener('click', (e) => {
    const el = e.target.closest('[data-action]');
    if (!el || el.disabled) return;
    const fn = actions[el.dataset.action];
    if (!fn) return;
    App.lastActive = Date.now();
    if (['reflex-pick', 'comic-pick', 'talk-pick', 'rv-pick', 'collect', 'bag-tap', 'locker-item', 'build-check', 'talk-rate', 'gate-key', 'branch-pick', 'mys-pick', 'mys-clue', 'studio-rec', 'gym-tf'].indexOf(el.dataset.action) === -1) Sfx.playTap();
    fn(el, e);
  });

  modal.addEventListener('click', (e) => { if (e.target === modal && modal.dataset.dismiss === '1') closeModal(); });

  // iPad: đóng bàn phím ảo xong Safari hay để khung app bị đẩy lệch lên → kéo về đúng chỗ
  document.addEventListener('focusout', (e) => {
    if (e.target && e.target.matches && e.target.matches('input, textarea, select')) setTimeout(() => window.scrollTo(0, 0), 100);
  });

  document.addEventListener('input', (e) => { if (e.target && e.target.id === 'unitJson') App.unitDraft = e.target.value; });

  document.addEventListener('change', (e) => {
    const el = e.target.closest('[data-change]');
    if (!el) return;
    handleParentChange(el.dataset.change, el);
  });

  // Chặn pinch-zoom & double-tap zoom còn sót trên iOS Safari
  document.addEventListener('gesturestart', (e) => e.preventDefault());
  let lastTouchEnd = 0;
  document.addEventListener('touchend', (e) => {
    const now = Date.now();
    if (now - lastTouchEnd < 320 && !e.target.closest('input, textarea, select')) e.preventDefault();
    lastTouchEnd = now;
  }, { passive: false });
  ['pointerdown', 'keydown'].forEach((ev) => document.addEventListener(ev, () => { App.lastActive = Date.now(); }, { passive: true }));

  // Đếm thời gian học thực (chỉ khi app đang hiển thị và bé có thao tác trong 90 giây gần nhất)
  setInterval(() => {
    if (document.visibilityState === 'visible' && Date.now() - App.lastActive < 90000 && $('#splash').hidden) {
      S.addSeconds(15);
    }
  }, 15000);

  document.addEventListener('visibilitychange', () => {
    if (document.visibilityState === 'hidden') { S.saveNow(); Speech.cancel(); Listener.stop(); Lesson.stopStudio(); }
  });

  /* =========================================================
     KHỞI ĐỘNG
     ========================================================= */
  async function boot() {
    const splash = $('#splash');
    const startBtn = $('#startBtn');
    const unlockAll = () => { Sfx.unlock(); Speech.unlock(); };
    startBtn.addEventListener('click', () => {
      unlockAll();
      Sfx.playBrickClick();
      splash.classList.add('hide');
      setTimeout(() => { splash.hidden = true; }, 380);
      const name = S.state.profile.name;
      Speech.speak(S.lessonsDoneCount() ? `Welcome back, ${name}! Let's build!` : `Hello, ${name}! Welcome to LEGO English Builder!`);
    });
    // Mở khóa dự phòng ở bất kỳ cú chạm đầu tiên nào
    document.addEventListener('pointerdown', unlockAll, { once: true, capture: true });

    await S.load();
    CU.syncAll(S.state.customUnits);
    applySettings();
    render();

    if ('serviceWorker' in navigator && /^https?:$/.test(location.protocol)) {
      navigator.serviceWorker.register('./sw.js').catch(() => { /* offline cache không khả dụng */ });
    }
  }

  // Kiểm thử tự động: mở app với ?debug để truy cập Lesson/Gym
  if (/[?&]debug\b/.test(location.search)) window.__LEB = { Lesson, Gym };

  boot();
})();
