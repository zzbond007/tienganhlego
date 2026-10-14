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

  function applySettings() {
    const st = S.state.settings;
    Sfx.enabled = st.sfx !== false;
    Speech.setAccent(st.accent);
    Speech.rate = Number(st.rate) || 0.9;
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
  function findNextLesson() {
    for (const z of ZONES) {
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
  function renderMap() {
    const st = S.state;
    const next = findNextLesson();
    const due = S.dueWordIds().filter((id) => WORDS[id]).length;
    const book = st.settings.book;
    const lessonsDone = S.lessonsDoneCount();

    let school = '';
    if (book === 'gs4') {
      const units = SCHOOL_BOOKS.gs4.units;
      const cur = units.find((u) => u.unit === Number(st.settings.schoolUnit)) || units[0];
      const L = window.Curriculum.lesson(cur.lesson);
      const Z = window.Curriculum.zone(L.zoneId);
      school = `<div class="card school-panel studs-top">
        <div class="school-row">
          <button class="toggle on" data-action="toggle-school" aria-label="Học Cùng Lớp 4"></button>
          <label>📘 School Sync – Học Cùng Lớp 4<small class="vi" style="display:block;font-size:13px">${esc(SCHOOL_BOOKS.gs4.name)}</small></label>
          <select class="select-lg" data-change="school-unit" aria-label="Unit">
            ${units.map((u) => `<option value="${u.unit}"${u.unit === cur.unit ? ' selected' : ''}>Unit ${u.unit}: ${esc(u.title)}</option>`).join('')}
          </select>
        </div>
        <div class="school-result">
          <span class="pill blue">Unit ${cur.unit} → Zone ${Z.id.slice(1)} · ${esc(L.title)}</span>
          <span class="vi">Ôn đúng chủ đề tuần này trên lớp: <b>${esc(L.titleVi)}</b></span>
          <button class="brick-btn btn-blue btn-sm" data-action="start-lesson" data-lesson="${L.id}" data-force="1">${bi('▶ Practise now', 'Ôn ngay')}</button>
        </div>
      </div>`;
    } else {
      school = `<div class="card school-panel studs-top"><div class="school-row">
        <button class="toggle" data-action="toggle-school" aria-label="Học Cùng Lớp 4"></button>
        <label>📘 School Sync – Học Cùng Lớp 4<small class="vi" style="display:block;font-size:13px">Bật để chọn đúng Unit sách Tiếng Anh 4 Global Success bé đang học trên lớp.</small></label>
      </div></div>`;
    }

    const hour = new Date().getHours();
    const greet = hour < 12 ? ['Good morning', 'Chào buổi sáng'] : hour < 18 ? ['Good afternoon', 'Chào buổi chiều'] : ['Good evening', 'Chào buổi tối'];

    screenEl.innerHTML = `<div class="screen-inner">
      <div class="card hero studs-top">
        <div>${LG.renderMinifig(st.avatar, { cls: 'hero-fig' })}</div>
        <div>
          <h2>${greet[0]}, ${esc(st.profile.name)}! 👋</h2>
          <p class="vi">${greet[1]}, ${esc(st.profile.name)}! Hôm nay mình học tiếng Anh và lắp LEGO nhé.</p>
          <p style="margin-top:8px;font-weight:800">🧱 ${lessonsDone}/${CUR.totalLessons()} lessons · 🏆 ${ZONES.filter((z) => S.zoneProgress(z.id).complete).length}/${ZONES.length} sets · 🔤 ${S.learnedWordIds().filter((id) => WORDS[id]).length} words</p>
        </div>
        <div class="hero-actions">
          ${next ? `<button class="brick-btn btn-red" data-action="start-lesson" data-lesson="${next.id}">${bi('▶ Next lesson: ' + esc(next.title), 'Bài tiếp theo: ' + esc(next.titleVi))}</button>`
            : `<button class="brick-btn btn-green" data-action="go" data-screen="diorama">${bi('🏆 All lessons done!', 'Đã học hết – xem Sa bàn')}</button>`}
          ${due ? `<button class="brick-btn btn-orange" data-action="review" data-zone="">${bi(`🔧 Tune-up time (${due})`, `Trạm bảo trì: ${due} từ cần ôn`)}</button>` : ''}
          ${(() => { const mz = ZONES.find((z) => mysteryOpen(z) && !(S.mystery(z.id) || {}).done); return mz ? `<button class="brick-btn btn-purple" data-action="mystery" data-zone="${mz.id}">${bi('🕵️ Mystery Mission!', 'Nhiệm vụ thám tử: ' + esc(mz.short || mz.name))}</button>` : ''; })()}
          ${S.totalReadyParts() ? `<button class="brick-btn btn-blue" data-action="go" data-screen="workshop">${bi(`🧱 ${S.totalReadyParts()} parts to build`, 'Mảnh ghép đang chờ lắp')}</button>` : ''}
        </div>
      </div>
      ${school}
      <h3 class="section-title">🌍 LEGO World Map <span class="vi">Bản đồ ${ZONES.length} Vùng đất LEGO – chạm vào vùng đất để học${ZONES.length > BUILTIN_COUNT ? ' (✏️ = bài bố mẹ nhập)' : ''}</span></h3>
      <div class="zone-grid">
        ${ZONES.map((z, zi) => {
          const prog = S.zoneProgress(z.id);
          const doneL = z.lessons.filter((l) => S.isLessonDone(l.id)).length;
          const dueN = zoneDueIds(z.id).length;
          const schoolHere = book === 'gs4' && (SCHOOL_BOOKS.gs4.units.find((u) => u.unit === Number(st.settings.schoolUnit)) || {}).lesson;
          const isSchool = schoolHere && schoolHere.indexOf(z.id + 'l') === 0;
          const mys = S.mystery(z.id);
          return `<button class="zone-card${z.custom ? ' custom' : ''}" data-action="open-zone" data-zone="${z.id}" style="${zoneStyle(z)}">
            <div class="zone-top"><div class="zone-num">${z.custom ? z.icon : zi + 1}</div><div><h3>${esc(z.name)}</h3><small>${esc(z.vi)}</small></div></div>
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
        }).join('')}
      </div>
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
      <div class="zone-sheet-head"><div class="zone-num">${z.custom ? z.icon : ZONES.indexOf(z) + 1}</div>
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
    if (!zoneById(App.wsZone)) App.wsZone = 'z1';
    const zid = App.wsZone;
    const z = window.Curriculum.zone(zid);
    const m = LG.MODELS[zid];
    const prog = S.zoneProgress(zid);
    const next = z.lessons.find((l, i) => !S.isLessonDone(l.id) && lessonUnlocked(z, i));
    screenEl.innerHTML = `<div class="screen-inner">
      <div class="screen-head"><div><h2>🧱 Brick Workshop</h2><span class="vi">Xưởng lắp ráp – Sách hướng dẫn lắp từng bước (Building Instructions)</span></div></div>
      <div class="zone-chips">${ZONES.map((zz, i) => {
        const p = S.zoneProgress(zz.id);
        return `<button class="zone-chip${zz.id === zid ? ' active' : ''}" style="${zoneStyle(zz)}" data-action="ws-zone" data-zone="${zz.id}"><i></i>${zz.custom ? '✏️' : i + 1 + '.'} ${esc(zz.short)} <span class="cnt">${p.assembled}/12${p.ready ? ' · 🧰' + p.ready : ''}</span></button>`;
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
    screenEl.innerHTML = `<div class="screen-inner">
      <div class="screen-head"><div><h2>🏙️ My LEGO World</h2><span class="vi">Sa bàn Thế giới LEGO của bé – chạm vào mô hình hoặc nhân vật để nghe nói chuyện!</span></div>
        <div class="btn-row"><span class="pill green">🏆 ${built}/${ZONES.length} sets</span><span class="pill yellow">🥇 ${S.state.goldBricks} Gold</span></div></div>
      ${dueTotal ? `<div class="card studs-top" style="--stud-c:#FFEDD5;background:#FFF7ED;box-shadow:0 6px 0 #FED7AA;margin-bottom:18px;display:flex;align-items:center;gap:14px;flex-wrap:wrap">
          <span style="font-size:36px">🔧</span><div style="flex:1;min-width:200px"><b class="en" style="font-size:20px">Some models are dusty!</b><br><span class="vi">Có ${dueTotal} từ đến hạn ôn (1-3-7-14-30 ngày). Chạm vào mô hình có cờ lê 🔧 để siết ốc, lau bụi và nhận Gạch Vàng!</span></div>
          <button class="brick-btn btn-orange" data-action="review" data-zone="">${bi('🔧 Fix all', 'Bảo trì ngay')}</button></div>` : ''}
      <div class="dio-wrap" id="dioWrap">${LG.renderDiorama({ zones: ZONES.slice(0, BUILTIN_COUNT), states, dusty, avatar: S.state.avatar, name: S.state.profile.name })}</div>
      <div class="dio-legend">${ZONES.map((z) => {
        const p = S.zoneProgress(z.id), d = zoneDueIds(z.id).length;
        return `<div class="card item" style="${zoneStyle(z)}"><span class="dot"></span><div style="flex:1"><b>${esc(z.short)}</b><small>${p.complete ? '✅ Complete' : `🧱 ${p.assembled}/12 built`}${d ? ` · 🔧 ${d} due` : ''}</small></div>
          ${d ? `<button class="brick-btn btn-orange btn-sm" data-action="review" data-zone="${z.id}">🔧</button>` : p.ready ? `<button class="brick-btn btn-blue btn-sm" data-action="ws-open" data-zone="${z.id}">🧱</button>` : ''}</div>`;
      }).join('')}</div>
    </div>`;

    const wrap = $('#dioWrap');
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
    { key: 'acc', en: 'Accessories', vi: 'Phụ kiện' }
  ];

  function renderLocker() {
    const st = S.state;
    const cat = App.lockerCat;
    const items = LG.ITEMS[cat];
    screenEl.innerHTML = `<div class="screen-inner">
      <div class="screen-head"><div><h2>🧑‍🚀 Minifigure Locker</h2><span class="vi">Tủ đồ nhân vật – dùng LEGO Studs kiếm được khi học để mở khóa trang phục!</span></div>
        <span class="chip" style="box-shadow:0 4px 0 var(--card-edge)"><i class="stud-icon"></i><b>${st.studs}</b><small>Studs</small></span></div>
      <div class="locker">
        <div class="card fig-stage studs-top">
          <div id="bigFig">${LG.renderMinifig(st.avatar, { cls: 'fig-big' })}</div>
          <div class="name-tag">${esc(st.profile.name)}</div>
          <div class="btn-row center">
            <button class="brick-btn btn-blue btn-sm" data-action="fig-hello">${bi('👋 Say hi', 'Chào bạn')}</button>
            <button class="brick-btn btn-yellow btn-sm" data-action="fig-random">${bi('🎲 Random', 'Ngẫu nhiên')}</button>
          </div>
          <small class="vi">Tên nhân vật đổi trong Góc Bố Mẹ.</small>
        </div>
        <div>
          <div class="cat-tabs">${CATS.map((c) => `<button class="cat-tab${c.key === cat ? ' active' : ''}" data-action="locker-cat" data-cat="${c.key}">${c.en}<small>${c.vi}</small></button>`).join('')}</div>
          <div class="item-grid">${items.map((it) => {
            const owned = S.owns(it.id);
            const equipped = st.avatar[cat] === it.id;
            const cfg = Object.assign({}, st.avatar, { [cat]: it.id });
            const cant = !owned && st.studs < it.price;
            return `<button class="item${owned ? ' owned' : ''}${equipped ? ' equipped' : ''}${cant ? ' cant' : ''}" data-action="locker-item" data-id="${it.id}">
              ${LG.renderMinifig(cfg)}
              <b>${esc(it.en)}</b><small>${esc(it.vi)}</small>
              <span class="price">${equipped ? '✓ Wearing' : owned ? 'Owned' : `<i class="stud-icon"></i>${it.price}`}</span>
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
    if (S.state.studs < it.price) {
      Sfx.playGentleOops();
      toast(`You need ${it.price - S.state.studs} more studs!`, `Cần thêm ${it.price - S.state.studs} nút xu – học bài để kiếm thêm nhé!`, 'warm');
      return;
    }
    const ok = await confirmModal({ en: `Unlock ${it.en}?`, vi: `Mở khóa "${it.vi}"?`, text: `<div style="display:flex;justify-content:center">${LG.renderMinifig(Object.assign({}, S.state.avatar, { [cat]: id }))}</div><p style="text-align:center">Giá: <b>${it.price}</b> LEGO Studs (con đang có ${S.state.studs})</p>`, ok: 'Unlock!', okVi: 'Mở khóa' });
    if (!ok) return;
    if (S.buy(id, it.price)) {
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

    const stampHTML = ZONES.map((z, zi) => {
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

    const zonesHTML = ZONES.map((z) => {
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
        <div class="pp-photo">${LG.renderMinifig(st.avatar, { cls: 'pp-fig' })}</div>
        <div class="pp-info">
          <div class="pp-kicker">LEGO BUILDER PASSPORT · HỘ CHIẾU THỢ XÂY</div>
          <h3>${esc(st.profile.name)}</h3>
          <div class="pp-meta"><span>No. <b>${passNo}</b></span><span>🔤 <b>${learned.length}</b>/${CUR.totalWords()} bricks</span><span>🏅 <b>${stamps}</b>/${ZONES.length} stamps</span><span>🕵️ <b>${detectives}</b> mysteries</span><span>⭐ <b>${supers}</b> super builds</span></div>
          <div class="pp-mrz">P&lt;LEGO&lt;${esc(String(st.profile.name).toUpperCase().replace(/[^A-Z0-9]/g, '<'))}&lt;&lt;${passNo.replace('-', '')}&lt;&lt;&lt;</div>
        </div>
      </div>

      <h3 class="section-title">🏅 Zone Stamps <span class="vi">Con dấu Vùng đất – học xong cả vùng để đóng dấu; 🕵️ = đã phá án Mystery, ⭐ = câu Super Builder</span></h3>
      <div class="stamp-grid">${stampHTML}</div>

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
        <div class="card stat"><b>${learned}</b><span>Từ đã học</span><small>/ ${CUR.totalWords()} words & phrases</small></div>
        <div class="card stat"><b>${mastered}</b><span>Từ đã thuộc</span><small>Đã qua mốc ôn 7 ngày</small></div>
        <div class="card stat"><b>${S.lessonsDoneCount()}/${CUR.totalLessons()}</b><span>Bài học xong</span><small>Lessons completed</small></div>
        <div class="card stat"><b>${ZONES.filter((z) => S.zoneProgress(z.id).complete).length}/${ZONES.length}</b><span>Mô hình hoàn thành</span><small>LEGO sets built</small></div>
        <div class="card stat"><b>${ZONES.filter((z) => (S.mystery(z.id) || {}).done).length}/${ZONES.filter((z) => z.mystery).length}</b><span>Mystery đã giải</span><small>Detective missions</small></div>
        <div class="card stat"><b>${Object.values(S.state.snow).filter((v) => v >= 3).length}</b><span>Câu Super Builder</span><small>Snowball Level 3</small></div>
      </div>

      <h3 class="section-title">⏱️ Số phút học 7 ngày qua <span class="vi">Minutes per day</span></h3>
      <div class="card"><div class="bars">${days.map((d, i) => `<div class="bar-col${i === 6 ? ' today' : ''}"><span>${Math.round(d.seconds / 60)}</span><div class="bar" style="height:${Math.max(3, (d.seconds / maxSec) * 120)}px"></div><small>${d.date.toLocaleDateString('vi-VN', { weekday: 'short' })}</small></div>`).join('')}</div></div>

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
          <div class="setting-row"><label>Tốc độ đọc<small>Speech speed</small></label><select class="select-lg" data-change="rate">${[[0.75, 'Chậm – Slow'], [0.9, 'Vừa – Normal'], [1, 'Nhanh – Natural']].map(([v, t]) => `<option value="${v}"${Number(st.settings.rate) === v ? ' selected' : ''}>${t}</option>`).join('')}</select></div>
          <div class="setting-row"><label>Hiệu ứng âm thanh<small>Brick click & fanfare</small></label><button class="toggle${st.settings.sfx !== false ? ' on' : ''}" data-action="toggle-sfx" aria-label="SFX"></button></div>
          <div class="setting-row"><label>Chế độ luyện nói<small>${Listener.supported ? 'Trình duyệt có hỗ trợ nhận diện giọng nói' : 'Trình duyệt không hỗ trợ nhận diện – dùng Ghi âm & Chọn câu'}</small></label><select class="select-lg" data-change="micMode"><option value="auto"${st.settings.micMode === 'auto' ? ' selected' : ''}>🎙️ Tự động (Micro chấm điểm)</option><option value="fallback"${st.settings.micMode === 'fallback' ? ' selected' : ''}>🎤 Ghi âm nghe lại + Chọn câu</option></select></div>
          <div class="setting-row"><label>Bộ sách Lớp 4<small>School book</small></label><select class="select-lg" data-change="book"><option value="none"${book === 'none' ? ' selected' : ''}>Không – học theo Vùng đất</option><option value="gs4"${book === 'gs4' ? ' selected' : ''}>Tiếng Anh 4 – Global Success</option></select></div>
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

      ${book === 'gs4' ? `<h3 class="section-title">📘 Học Cùng Lớp 4 – ${esc(SCHOOL_BOOKS.gs4.name)} <span class="vi">Mỗi Unit trên lớp được nối với bài LEGO có chủ đề & mẫu câu gần nhất</span></h3>
        <div class="card" style="overflow-x:auto"><table class="map-table"><thead><tr><th>Unit SGK</th><th>Bài học LEGO</th><th>Trạng thái</th><th></th></tr></thead><tbody>
          ${SCHOOL_BOOKS.gs4.units.map((u) => { const L = window.Curriculum.lesson(u.lesson); const Z = window.Curriculum.zone(L.zoneId); return `<tr><td><b>Unit ${u.unit}</b>: ${esc(u.title)}</td><td>Zone ${Z.id.slice(1)} · ${esc(L.title)}<br><small class="vi">${esc(L.titleVi)}</small></td><td>${S.isLessonDone(L.id) ? starsHTML(S.lesson(L.id).stars) : '—'}</td><td><button class="brick-btn btn-blue btn-sm" data-action="start-lesson" data-lesson="${L.id}" data-force="1">▶</button></td></tr>`; }).join('')}
        </tbody></table></div>` : ''}
      <p class="vi" style="margin-top:24px;text-align:center">🔐 Không quảng cáo · Không thu thập dữ liệu · Mọi tiến độ chỉ lưu trên thiết bị này (IndexedDB).</p>
    </div>`;
  }

  async function handleParentChange(key, el) {
    const st = S.state.settings;
    if (key === 'name') { S.state.profile.name = (el.value || 'Builder').trim().slice(0, 16) || 'Builder'; S.save(); updateWallet(); toast('Saved!', 'Đã lưu tên', 'good'); }
    if (key === 'accent') { st.accent = el.value; S.save(); applySettings(); Speech.speak('Hello! This is my new voice.'); }
    if (key === 'rate') { st.rate = Number(el.value); S.save(); applySettings(); Speech.speak('This is my reading speed.'); }
    if (key === 'micMode') { st.micMode = el.value; S.save(); }
    if (key === 'book') { st.book = el.value; S.save(); renderParent(); }
    if (key === 'school-unit') { st.schoolUnit = Number(el.value); S.save(); renderMap(); }
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
    return `<div class="import-report ok"><b>${done ? '✅ Đã nhập' : '✅ Hợp lệ'}: ${esc(d.icon)} ${esc(d.name)}</b><span class="vi">${d.lessons.length} bài · ${nW} từ vựng${d.mystery ? ' · có Mystery' : ' · Mystery tự tạo'}</span>
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
      overlay.hidden = true; overlay.innerHTML = '';
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
      Speech.cancel(); Listener.stop(); this.stopStudio();
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
      this.d = { heard: new Set(), revealed: new Set(), collected: new Set() };
      this.d.roles = words.map((w) => G.wordRole(w));
      const roles = this.d.roles;
      this.body().innerHTML = `<div class="step">
        <div class="step-head"><h2>🧱 Brick Discovery</h2><span class="vi">Bấm 🔊 nghe (🐢 nghe chậm từng chữ), đoán nghĩa qua hình rồi chạm để xem nghĩa. Nghe xong mới thu thập được viên gạch!</span></div>
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
            <button class="brick-btn btn-yellow btn-sm collect-btn" data-action="collect" data-i="${i}" disabled>${bi('＋ Collect brick', 'Nghe trước rồi thu thập')}</button>
          </div>`).join('')}
        </div>
        <div class="tray">
          <div class="tray-label">My Brick Tray<small>Khay gạch của em</small></div>
          ${words.map((w, i) => `<div class="tray-slot" data-slot="${i}"></div>`).join('')}
          <button class="brick-btn btn-green" data-action="lesson-next" id="discNext" disabled>${bi('Next ▶', 'Tiếp tục')}</button>
        </div>
      </div>`;
    },

    discoverAction(act, i, el) {
      const w = this.l.words[i];
      const card = $(`.word-card[data-i="${i}"]`, overlay);
      const markHeard = () => {
        this.d.heard.add(i);
        const btn = $('.collect-btn', card);
        if (btn && !this.d.collected.has(i)) { btn.disabled = false; btn.innerHTML = bi('＋ Collect brick', 'Thu thập vào khay'); }
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
        this.earn(1, el);
        if (this.d.collected.size === this.l.words.length) {
          $('#discNext').disabled = false;
          praise();
          Speech.speak('Great! You collected all the bricks!');
        }
      }
    },

    /* ---------- Bước 2: Sound-to-Brick Reflex ---------- */
    reflex() {
      this.r = { rounds: shuffle(this.l.words).map((w, i) => ({ w, mode: i < 3 ? 'word' : 'clue' })), i: 0, filled: 0 };
      this.renderReflex();
    },

    renderReflex() {
      const R = this.r;
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
            <div class="opt-grid">${R.opts.map((w, k) => `<button class="opt-brick" data-action="reflex-pick" data-i="${k}" style="--oc:${BRICK_COLORS[k]};--ocd:${LG.shade(BRICK_COLORS[k], -0.3)}">
              <span class="o-emoji">${w.emoji}</span><span class="o-word">${esc(w.en)}</span></button>`).join('')}</div>
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
      Speech.speak(round.mode === 'word' ? round.w.en.replace(/\.\.\./g, '') : round.w.clue, { pitch: 0.95 })
        .then(() => { if (fig) fig.classList.remove('talking'); });
    },

    reflexPick(k, el) {
      const R = this.r, round = R.rounds[R.i];
      const w = R.opts[k];
      if (!round || el.classList.contains('right')) return;
      if (w === round.w) {
        $$('.opt-brick', overlay).forEach((b) => { b.style.pointerEvents = 'none'; });
        el.classList.add('right');
        Sfx.playBrickClick();
        this.answered(R.first, true);
        if (R.first) { S.recordAnswer(w.id, true); this.combo++; }
        const mult = !R.first ? 1 : this.combo >= 4 ? 3 : this.combo >= 2 ? 2 : 1;
        this.earn(2 * mult, el);
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
      this.c = { phase: 'listen', played: false, playing: false, blankIdx: 0, filled: {}, first: true, opts: null, branchPicked: null };
      this.renderComic();
    },

    panelHTML(p, i) {
      const C = this.c, cm = this.l.comic;
      const name = this.z.chars[p.who].name;
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
        <div class="panel-bubble-wrap"><button class="bubble from-${p.who}" data-action="say-panel" data-p="${i}"><span class="who">${esc(name)} 🔊</span><span class="line">${line}</span>${showVi ? `<span class="vi-line">${esc(p.vi)}</span>` : ''}</button></div>
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
        this.earn(3, el);
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
      B.first = true; B.hinted = false; B.solved = false; B.goldUp = false;
      const lvl = s.level;
      const situ = lvl
        ? `<div class="card situation snow studs-top"><div class="s-vi">🗨️ ${esc(s.situ || '')}${s.situ ? ': ' : ''}${esc(s.vi)}</div><div class="s-en">${[
          '', 'Level 1 · Find the KEY brick! · Tìm viên gạch từ khóa',
          'Level 2 · Build a short sentence! · Lắp câu ngắn',
          'Level 3 · Build a long, polite sentence – double studs! · Lắp câu dài, lịch sự – nhân đôi nút xu!'][lvl]}</div></div>`
        : `<div class="card situation studs-top"><div class="s-vi">🗨️ ${esc(s.vi)}</div><div class="s-en">How do you say it in English? · Em nói bằng tiếng Anh thế nào?</div></div>`;
      this.body().innerHTML = `<div class="step">
        <div class="step-head"><h2>${lvl ? '⛄ Snowball Challenge' : '🔧 Sentence Brick Builder'}</h2><span class="vi">Chạm hoặc kéo các viên gạch chữ lên tấm đế xanh để lắp thành câu hoàn chỉnh. Màu gạch cho biết vai trò của từ trong câu – cẩn thận gạch gây nhiễu nhé!</span></div>
        ${lvl ? this.snowHTML(lvl) : `<div class="builder-count">Sentence ${s.n}/${B.normal} · Câu ${s.n}${this.l.snowball ? ' · sau đó: ⛄ Snowball 3 tầng' : ''}</div>`}
        ${situ}
        ${G.legendHTML({ compact: true })}
        <div id="builderArea"><div class="baseplate${lvl === 3 ? ' super' : ''}" id="plate"></div><div class="tray-bricks" id="trayB"></div></div>
        <div class="step-foot" id="buildFoot">
          <button class="brick-btn btn-yellow" data-action="build-hint">${bi('💡 Hint', 'Gợi ý')}</button>
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
      const brickEl = (b, extra = '', k = 0) => `<button class="word-brick role-${b.r}${extra}" data-bid="${b.id}"${extra.indexOf('gold-up') !== -1 ? ` style="animation-delay:${k * 0.12}s"` : ''}>${esc(b.t)}</button>`;
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
      if (k === -1) Speech.speak(this.b.bricks[id].t, { rate: 0.95 });
    },

    placeAt(id, idx) {
      if (this.b.solved) return;
      const P = this.b.placed;
      const cur = P.indexOf(id);
      if (cur !== -1) { P.splice(cur, 1); if (cur < idx) idx--; }
      P.splice(Math.max(0, Math.min(idx, P.length)), 0, id);
      Sfx.playBrickClick();
      this.renderBricks();
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
        $('#buildFoot').innerHTML = `<button class="brick-btn btn-blue" data-action="say-text" data-text="${esc(sentence)}">${bi('🔊 Listen', 'Nghe lại')}</button>`
          + (last ? `<button class="brick-btn btn-green btn-xl" data-action="lesson-next">${bi('Next ▶', 'Tiếp tục')}</button>`
            : `<button class="brick-btn btn-green btn-xl" data-action="build-next">${nextLabel}</button>`);
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

    setupTalk() {
      const T = this.t;
      this.stopStudio();
      if (T.ti >= this.l.talk.length) { this.setupTalkBranch(); return; }
      const item = this.l.talk[T.ti];
      T.first = true; T.attempts = 0; T.done = false; T.mode = this.useMic() ? 'mic' : 'fallback'; T.rating = 0; T.choiceOpts = null; T.branch = false;
      this.studio = { state: 'idle', text: item.hint };
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
          <button class="brick-btn btn-white btn-sm" data-action="talk-choose">${bi('👆 Choose an answer', 'Chọn câu trả lời')}</button>
        </div>
        <p class="talk-tip">Cần đúng ≥ 70% từ khóa là được khen nhé! Micro không dùng được? Chọn "Voice Studio" hoặc "Chọn câu trả lời".</p>`;
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
          const res = Listener.score(alts, item.keywords, item.hint);
          const pct = Math.round(res.score * 100);
          const bar = $('#matchBar'); if (bar) bar.style.width = pct + '%';
          const trEl = $('#transcript');
          if (res.score >= 0.7) {
            if (trEl) { trEl.className = 'transcript good'; trEl.innerHTML = `“${esc(res.text)}” ✅ ${pct}%`; }
            this.talkSuccess(true, $('#micBtn'));
          } else {
            T.attempts++;
            if (T.first) { this.answered(true, false); T.first = false; S.addMistake(`talk:${this.l.id}:${T.ti}`, item.hint, item.vi); }
            if (trEl) { trEl.className = 'transcript try'; trEl.innerHTML = `“${esc(res.text)}” · ${pct}%<br><small class="vi">Gần đúng rồi! Thử nói: <b>${esc(item.hint)}</b></small>`; }
            Sfx.playGentleOops();
            encourage();
            this.showHint();
            if (T.attempts >= 2) toast('Try choosing the answer!', 'Thử chọn câu trả lời bên dưới nhé!', 'warm');
          }
        },
        onError: (code) => {
          const b = $('#micBtn'); if (b) b.classList.remove('listening');
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

    showHint() {
      const item = this.l.talk[this.t.ti];
      const hb = $('#hintBox');
      if (hb) hb.innerHTML = `<div class="hint-box">💡 ${esc(item.hint)}</div>`;
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
      this.earn(5, el);
      if (spoken || (T.rating === 3 && T.first)) this.earnGold(1, el);
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
      T.branch = true; T.branchPicked = null; T.done = false;
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
        $('#studioBox').innerHTML = `<p class="talk-tip" style="margin:18px 0 0">🎧 Luyện nói lại câu con vừa chọn trong Phòng thu (không bắt buộc)</p>${this.studioHTML()}`;
        $('#branchFoot').innerHTML = `<div class="step-foot"><button class="brick-btn btn-green btn-xl" data-action="lesson-next">${bi('Open my reward! 🎁', 'Mở phần thưởng')}</button></div>`;
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
      return `<div class="card studio studs-top">
        <div class="studio-head"><b class="en">🎧 Shadowing Voice Studio</b><span class="vi">① Nghe giọng mẫu bản xứ → ② Ghi âm giọng con (gạch LEGO nhảy theo giọng) → ③ Compare Voice: nghe mẫu rồi nghe ngay giọng con</span></div>
        <button class="studio-line" data-action="studio-model">🔊 “${esc(st.text)}”</button>
        ${Recorder.supported ? vu : ''}
        <div class="cmp-strip" id="cmpStrip"><span class="cmp native">🔊 Native</span><span class="cmp-vs">VS</span><span class="cmp you">🎤 You</span></div>
        <div class="btn-row center">
          <button class="brick-btn btn-blue btn-sm" data-action="studio-model">${bi('🔊 Native model', 'Nghe giọng mẫu')}</button>
          ${Recorder.supported ? `<button class="brick-btn ${rec === 'recording' ? 'btn-orange' : 'btn-red'} btn-sm${rec === 'recording' ? ' rec-on' : ''}" data-action="studio-rec">${bi(rec === 'recording' ? '⏹️ Stop' : rec === 'done' ? '🎤 Record again' : '🎤 Record', rec === 'recording' ? 'Đang ghi – chạm để dừng' : 'Ghi âm giọng con')}</button>` : ''}
          ${rec === 'done' ? `<button class="brick-btn btn-white btn-sm" data-action="studio-play">${bi('▶ My voice', 'Giọng của con')}</button>
            <button class="brick-btn btn-purple btn-sm" data-action="studio-compare">${bi('🆚 Compare Voice', 'So sánh giọng')}</button>` : ''}
        </div>
        ${Recorder.supported ? '' : '<p class="talk-tip">Thiết bị này chưa hỗ trợ ghi âm – con nghe giọng mẫu rồi nói to theo nhé!</p>'}
      </div>`;
    },

    refreshStudio() {
      if (this.t && this.t.branch) {
        const box = $('#studioBox');
        if (box) box.innerHTML = `<p class="talk-tip" style="margin:18px 0 0">🎧 Luyện nói lại câu con vừa chọn trong Phòng thu (không bắt buộc)</p>${this.studioHTML()}`;
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
      if (Recorder.isRecording()) Recorder.stop();
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
      if (!st || st.state === 'recording') return;
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
          st.state = 'done';
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
          this.t.mode = 'choose';
          this.renderTalkMode('🎤 Chưa ghi âm được (có thể chưa cấp quyền micro). Con nói to câu trả lời rồi chọn câu đúng nhé!');
        } else {
          this.refreshStudio();
          toast('Microphone is off', 'Chưa ghi âm được – hãy cho phép dùng micro nhé', 'warm');
        }
      }
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
      U.newly = S.unlockParts(this.z.id, this.l.parts);
      const acc = this.stats.total ? this.stats.correct / this.stats.total : 1;
      const stars = acc >= 0.9 ? 3 : acc >= 0.7 ? 2 : 1;
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
        ${lootParts.length ? '' : '<p class="vi" style="margin-top:10px">Con đã có đủ mảnh ghép của bài này – đây là nút xu thưởng thêm cho lần ôn lại!</p>'}`;
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
        </div>
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
      const types = ['listen', 'meaning', 'translate'];
      this.items = items.map((it, i) => Object.assign(it, { type: types[i % 3] }));
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
      overlay.hidden = true; overlay.innerHTML = '';
      render();
    }
  };

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
      overlay.hidden = true; overlay.innerHTML = '';
      render();
    }
  };

  /* =========================================================
     ĐIỀU HƯỚNG & SỰ KIỆN
     ========================================================= */
  function go(screen) {
    App.screen = screen;
    if (screen !== 'parent') { App.parentOk = false; App.gate = null; }
    if (!overlay.hidden) { Lesson.token++; Review.token++; Mystery.token++; Speech.cancel(); Listener.stop(); Lesson.stopStudio(); overlay.hidden = true; overlay.innerHTML = ''; }
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
    'start-lesson': (el) => { if (!overlay.hidden) { Lesson.token++; Review.token++; Mystery.token++; Lesson.stopStudio(); overlay.hidden = true; } Lesson.start(el.dataset.lesson, { force: el.dataset.force === '1' }); },
    'ws-open': (el) => { App.wsZone = el.dataset.zone; go('workshop'); },
    'ws-zone': (el) => { App.wsZone = el.dataset.zone; renderWorkshop(); },
    'review': (el) => { const zid = el.dataset.zone || null; if (!overlay.hidden) { Lesson.token++; Mystery.token++; Lesson.stopStudio(); } Review.start(zid); },
    'mystery': (el) => { if (!overlay.hidden) { Lesson.token++; Review.token++; Speech.cancel(); Listener.stop(); Lesson.stopStudio(); } Mystery.start(el.dataset.zone); },
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
    'toggle-school': () => { S.state.settings.book = S.state.settings.book === 'gs4' ? 'none' : 'gs4'; S.save(); renderMap(); },
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
    'reflex-replay': () => Lesson.reflexSpeak(),
    'reflex-pick': (el) => Lesson.reflexPick(Number(el.dataset.i), el),
    'comic-play': () => Lesson.comicPlay(),
    'comic-ready': () => { Speech.cancel(); Lesson.c.playing = false; Lesson.c.phase = 'fill'; Lesson.renderComic(); },
    'comic-pick': (el) => Lesson.comicPick(Number(el.dataset.i), el),
    'say-panel': (el) => { if (!Lesson.c.playing) Lesson.speakPanel(Number(el.dataset.p), Lesson.token); },
    'build-check': (el) => Lesson.buildCheck(el),
    'build-hint': () => Lesson.buildHint(),
    'build-clear': () => { if (!Lesson.b.solved) { Lesson.b.placed = []; Lesson.renderBricks(); } },
    'build-next': () => { Lesson.b.si++; Lesson.setupSentence(); },
    'talk-say': () => Lesson.talkSay(),
    'talk-hint': () => { Lesson.showHint(); Speech.speak(Lesson.l.talk[Lesson.t.ti].hint); },
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
    'locker-cat': (el) => { App.lockerCat = el.dataset.cat; renderLocker(); },
    'locker-item': (el) => lockerItem(el.dataset.id),
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
    if (['reflex-pick', 'comic-pick', 'talk-pick', 'rv-pick', 'collect', 'bag-tap', 'locker-item', 'build-check', 'talk-rate', 'gate-key', 'branch-pick', 'mys-pick', 'mys-clue', 'studio-rec'].indexOf(el.dataset.action) === -1) Sfx.playTap();
    fn(el, e);
  });

  modal.addEventListener('click', (e) => { if (e.target === modal && modal.dataset.dismiss === '1') closeModal(); });

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

  boot();
})();
