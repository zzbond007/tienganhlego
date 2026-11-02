/* =========================================================
   db.js – Lưu trữ Local-First
   - IndexedDB (kho chính) + localStorage (cấu hình nhanh & bản sao dự phòng)
   - Spaced Repetition 1-3-7-14-30 ngày
   - Sao lưu / Khôi phục bằng file JSON hoặc Mã Chuyển Máy (Base64)
   ========================================================= */
(function (global) {
  'use strict';

  const DB_NAME = 'lego-english-builder';
  const DB_STORE = 'kv';
  const STATE_KEY = 'state';
  const LS_STATE = 'leb-state-mirror';
  const LS_SETTINGS = 'leb-settings';
  const CODE_PREFIX = 'LEB1:';
  const BACKUP_PREFIX = 'backup:';
  const DAY = 24 * 60 * 60 * 1000;
  const SRS_INTERVALS = [1, 3, 7, 14, 30]; // ngày
  const PARTS_PER_SET = 12;

  function todayKey(d = new Date()) {
    const y = d.getFullYear();
    const m = String(d.getMonth() + 1).padStart(2, '0');
    const dd = String(d.getDate()).padStart(2, '0');
    return `${y}-${m}-${dd}`;
  }

  /** Mốc đầu ngày (để ôn tập theo ngày, không theo giờ). */
  function startOfDay(ts) {
    const d = new Date(ts);
    d.setHours(0, 0, 0, 0);
    return d.getTime();
  }

  function defaults() {
    return {
      version: 1,
      createdAt: Date.now(),
      profile: { name: 'Builder' },
      studs: 30,
      goldBricks: 0,
      lessons: {},          // { z1l1: { done, stars, accuracy, plays, completedAt } }
      parts: {},            // { z1: [0..2 x12] } 0=khóa, 1=đã mở (trong khay), 2=đã lắp
      words: {},            // { wordId: { stage, due, correct, wrong, learnedAt, lastReview } }
      mistakes: {},         // { key: { text, vi, count, last } }
      daily: {},            // { 'YYYY-MM-DD': giây học }
      avatar: { hat: 'cap-red', face: 'smile', torso: 'torso-red', legs: 'legs-blue', acc: 'none', pet: 'none-pet', ride: 'none-ride', buddy: 'none-buddy', scene: 'none-scene' },
      owned: ['none-hat', 'cap-red', 'hair-brown', 'smile', 'grin', 'torso-red', 'torso-blue', 'legs-blue', 'legs-black', 'none', 'none-pet', 'none-ride', 'none-buddy', 'none-scene'],
      polished: {},         // { z1: timestamp lần bảo trì gần nhất }
      mysteries: {},        // { z1: { done, stars, at } } – LEGO Mystery Mission
      gym: {},              // { 'YYYY-MM-DD': số lượt Listening & Speaking Gym }
      speak: {},            // { 'YYYY-MM-DD': số lần con đã nói/ghi âm có tiếng (luyện nói) }
      skill: { level: 1, auto: true, recent: [], changedAt: 0 },  // Cấp độ thích ứng 1–3 + 8 bài gần nhất
      checks: [],           // Lịch sử Bài kiểm tra kỹ năng
      talk: {},             // { 'YYYY-MM-DD': số mili-giây con thực sự NÓI (đo bằng nhận biết giọng) }
      talkGoal: {},         // { 'YYYY-MM-DD': 1 | 2 } đã nhận thưởng mục tiêu nói (1 = đạt, 2 = gấp đôi)
      journey: [],          // các mốc phút nói đã đạt (danh hiệu – không còn đổi ra quà)
      reviewLog: {},        // { 'YYYY-MM-DD': số lượt ôn tập (Trạm bảo trì) đã hoàn thành }
      lastReviewAt: 0,      // thời điểm hoàn thành lượt ôn gần nhất (để "ôn trước khi học bài mới")
      talkDay: null,        // { date, best: { missionId: giây } } – Nhiệm vụ nói hôm nay
      snow: {},             // { z1l1: 3 } – tầng Snowball cao nhất đã lắp (1..3)
      branches: {},         // { 'z1l1:cb': ['yes','no'] } – các hướng hội thoại bé đã thử
      customUnits: [],      // [{ id: 'c1', addedAt, data: {...JSON bố mẹ nhập} }]
      settings: {
        accent: 'en-US',
        rate: 0.5,
        rateV2: true,
        sfx: true,
        book: 'none',       // 'none' | 'gs4'
        schoolUnit: 1,
        micMode: 'auto',    // 'auto' | 'fallback'
        speakMode: 'required' // 'required' (phải nói mới qua) | 'optional'
      }
    };
  }

  /* ---------- IndexedDB tối giản ---------- */
  /** Mở IndexedDB. iPad/Safari đôi khi treo lệnh open mãi không trả lời → giới hạn thời gian chờ. */
  function openDB(timeoutMs = 4000) {
    return new Promise((resolve, reject) => {
      if (!global.indexedDB) { reject(new Error('no-idb')); return; }
      const timer = setTimeout(() => reject(new Error('idb-timeout')), timeoutMs);
      const done = (fn) => (v) => { clearTimeout(timer); fn(v); };
      resolve = done(resolve); reject = done(reject);
      let req;
      try { req = indexedDB.open(DB_NAME, 1); } catch (e) { reject(e); return; }
      req.onupgradeneeded = () => {
        const db = req.result;
        if (!db.objectStoreNames.contains(DB_STORE)) db.createObjectStore(DB_STORE);
      };
      req.onsuccess = () => {
        const db = req.result;
        // Safari có thể đóng kết nối khi app chạy nền → đánh dấu để mở lại ở lần lưu sau
        db.onclose = () => { db._closed = true; };
        db.onversionchange = () => { try { db.close(); } catch (e) { /* */ } db._closed = true; };
        resolve(db);
      };
      req.onerror = () => reject(req.error);
      // 'blocked' chỉ là chờ tab khác – không bỏ cuộc ngay, để hết thời gian chờ quyết định
    });
  }

  function idbGet(db, key) {
    return new Promise((resolve, reject) => {
      let tx;
      try { tx = db.transaction(DB_STORE, 'readonly'); } catch (e) { reject(e); return; }
      const r = tx.objectStore(DB_STORE).get(key);
      r.onsuccess = () => resolve(r.result);
      r.onerror = () => reject(r.error);
    });
  }

  function idbPut(db, key, value) {
    return new Promise((resolve, reject) => {
      let tx;
      try { tx = db.transaction(DB_STORE, 'readwrite'); } catch (e) { reject(e); return; }
      tx.objectStore(DB_STORE).put(value, key);
      tx.oncomplete = () => resolve();
      tx.onerror = () => reject(tx.error);
      tx.onabort = () => reject(tx.error);
    });
  }

  function idbKeys(db) {
    return new Promise((resolve, reject) => {
      let tx;
      try { tx = db.transaction(DB_STORE, 'readonly'); } catch (e) { reject(e); return; }
      const st = tx.objectStore(DB_STORE);
      const r = st.getAllKeys ? st.getAllKeys() : null;
      if (!r) { resolve([]); return; }
      r.onsuccess = () => resolve(r.result || []);
      r.onerror = () => reject(r.error);
    });
  }

  function idbDel(db, key) {
    return new Promise((resolve) => {
      let tx;
      try { tx = db.transaction(DB_STORE, 'readwrite'); } catch (e) { resolve(); return; }
      tx.objectStore(DB_STORE).delete(key);
      tx.oncomplete = () => resolve();
      tx.onerror = () => resolve();
      tx.onabort = () => resolve();
    });
  }

  /** Điểm "có tiến độ" của một bản lưu: dùng để không bao giờ ghi đè dữ liệu thật bằng dữ liệu trống. */
  function progressScore(s) {
    if (!s || typeof s !== 'object') return 0;
    const n = (o) => (o && typeof o === 'object' ? Object.keys(o).length : 0);
    const owned = Array.isArray(s.owned) ? s.owned.length : 0;
    return n(s.lessons) * 100 + n(s.words) * 10 + n(s.daily) * 5 + n(s.reviewLog) * 5 +
      (Number(s.goldBricks) || 0) * 10 + Math.max(0, owned - 14) * 20 + Math.max(0, (Number(s.studs) || 0) - 30);
  }
  /** Bản lưu "trống" = chưa học bài nào, chưa có từ nào, chưa có ngày học nào. */
  function isBlank(s) {
    if (!s || typeof s !== 'object') return true;
    const n = (o) => (o && typeof o === 'object' ? Object.keys(o).length : 0);
    return n(s.lessons) === 0 && n(s.words) === 0 && n(s.daily) === 0;
  }
  /** Chọn bản lưu tốt nhất: bản ghi gần nhất (savedAt); bản cũ không có savedAt → bản nhiều tiến độ hơn. */
  function pickBest(list) {
    const c = list.filter((x) => x && typeof x === 'object');
    if (!c.length) return null;
    return c.sort((a, b) => {
      const ta = Number(a.savedAt) || 0, tb = Number(b.savedAt) || 0;
      if (ta && tb && ta !== tb) return tb - ta;
      return progressScore(b) - progressScore(a);
    })[0];
  }

  function lsGet(key) {
    try { const v = localStorage.getItem(key); return v ? JSON.parse(v) : null; } catch (e) { return null; }
  }
  function lsSet(key, val) {
    try { localStorage.setItem(key, JSON.stringify(val)); } catch (e) { /* đầy bộ nhớ / chế độ riêng tư */ }
  }

  /** Gộp dữ liệu đã lưu với cấu trúc mặc định (an toàn khi nâng cấp phiên bản). */
  function merge(base, saved) {
    if (!saved || typeof saved !== 'object') return base;
    const out = Object.assign({}, base, saved);
    out.profile = Object.assign({}, base.profile, saved.profile || {});
    out.avatar = Object.assign({}, base.avatar, saved.avatar || {});
    out.settings = Object.assign({}, base.settings, saved.settings || {});
    // Bản cũ đọc nhanh (0.75 / 0.9 / 1) → thang mới chậm hơn cho iPad (chỉ một lần)
    if (saved.settings && !saved.settings.rateV2) {
      const r = Number(saved.settings.rate) || 0.9;
      out.settings.rate = r >= 1 ? 0.8 : r <= 0.75 ? 0.5 : 0.65;
      out.settings.rateV2 = true;
    }
    ['lessons', 'parts', 'words', 'mistakes', 'daily', 'polished', 'mysteries', 'snow', 'branches', 'gym', 'speak', 'talk', 'talkGoal'].forEach((k) => {
      out[k] = Object.assign({}, saved[k] || {});
    });
    out.customUnits = Array.isArray(saved.customUnits)
      ? saved.customUnits.filter((u) => u && typeof u.id === 'string' && u.data && typeof u.data === 'object')
      : [];
    out.owned = Array.from(new Set([].concat(base.owned, Array.isArray(saved.owned) ? saved.owned : [])));
    out.studs = Math.max(0, Number(saved.studs) || 0);
    out.goldBricks = Math.max(0, Number(saved.goldBricks) || 0);
    out.skill = Object.assign({}, base.skill, saved.skill || {});
    out.skill.recent = Array.isArray(out.skill.recent) ? out.skill.recent.slice(-8) : [];
    out.checks = Array.isArray(saved.checks) ? saved.checks.slice(-40) : [];
    out.journey = Array.isArray(saved.journey) ? saved.journey : [];
    out.reviewLog = saved.reviewLog && typeof saved.reviewLog === 'object' ? saved.reviewLog : {};
    out.lastReviewAt = Number(saved.lastReviewAt) || 0;
    out.talkDay = saved.talkDay && typeof saved.talkDay === 'object' ? saved.talkDay : null;
    out.savedAt = Number(saved.savedAt) || 0;
    out.resetAt = Number(saved.resetAt) || 0;
    return out;
  }

  function utf8ToB64(str) {
    const bytes = new TextEncoder().encode(str);
    let bin = '';
    for (let i = 0; i < bytes.length; i += 0x8000) bin += String.fromCharCode.apply(null, bytes.subarray(i, i + 0x8000));
    return btoa(bin);
  }
  function b64ToUtf8(b64) {
    const bin = atob(b64);
    const bytes = new Uint8Array(bin.length);
    for (let i = 0; i < bin.length; i++) bytes[i] = bin.charCodeAt(i);
    return new TextDecoder().decode(bytes);
  }

  const Store = {
    state: defaults(),
    _db: null,
    _saveTimer: null,
    listeners: [],
    SRS_INTERVALS,
    PARTS_PER_SET,
    DAY,
    todayKey,
    progressScore,
    isBlank,

    _ready: false,          // chưa đọc xong dữ liệu đã lưu → KHÔNG được ghi (tránh ghi đè bằng dữ liệu trống)
    _storedScore: 0,        // tiến độ của bản lưu tốt nhất đã đọc/ghi – chặn ghi đè bằng bản trống
    _allowBlankWrite: false,
    _lastBackupDay: '',
    BACKUP_DAYS: 7,

    async _getDB() {
      if (this._db && !this._db._closed) return this._db;
      this._db = null;
      try { this._db = await openDB(); } catch (e) { this._db = null; }
      return this._db;
    },

    async load() {
      // Cấu hình nhanh từ localStorage (có ngay, kể cả khi IDB chậm)
      const quick = lsGet(LS_SETTINGS);
      let fromIdb = null;
      const db = await this._getDB();
      if (db) {
        try { fromIdb = await idbGet(db, STATE_KEY); } catch (e) { fromIdb = null; }
      }
      const fromLs = lsGet(LS_STATE);
      // Đọc cả 2 bản (IndexedDB + localStorage) rồi chọn bản mới nhất – trước đây luôn ưu tiên IDB
      // nên khi IDB ghi hỏng (Safari mất kết nối lúc chạy nền) app quay về tiến độ cũ.
      let saved = pickBest([fromIdb, fromLs]);
      // Cả 2 bản đều trống/mất nhưng còn bản sao lưu tự động có tiến độ (và bố mẹ không chủ động xóa) → tự khôi phục
      if (isBlank(saved) && !(saved && saved.resetAt)) {
        const backups = await this.listBackups();
        const best = backups.find((b) => !isBlank(b.data));
        if (best) { saved = best.data; this.recovered = { from: best.day }; }
      }
      this.state = merge(defaults(), saved);
      if (quick) this.state.settings = Object.assign(this.state.settings, quick);
      // v1.9.2: bé phản ánh giọng mẫu vẫn nhanh → hạ một lần về "Rất chậm" (bố mẹ chỉnh lại được trong Cài đặt)
      const st = this.state.settings;
      if (!st.rateV3) { st.rate = Math.min(Number(st.rate) || 0.5, 0.5); st.rateV3 = true; }
      this._storedScore = Math.max(progressScore(fromIdb), progressScore(fromLs), progressScore(saved));
      this._ready = true;
      // Xin trình duyệt giữ dữ liệu lâu dài (Safari/Chrome có thể tự xóa dữ liệu web khi máy đầy bộ nhớ)
      try { if (navigator.storage && navigator.storage.persist) navigator.storage.persist().catch(() => {}); } catch (e) { /* */ }
      if (this.recovered) await this.saveNow();
      return this.state;
    },

    onChange(fn) { this.listeners.push(fn); },
    _emit() { this.listeners.forEach((fn) => { try { fn(this.state); } catch (e) { /* */ } }); },

    save() {
      this._emit();
      if (!this._ready) return;
      clearTimeout(this._saveTimer);
      this._saveTimer = setTimeout(() => this.saveNow(), 250);
    },

    async saveNow() {
      clearTimeout(this._saveTimer);
      if (!this._ready) return;   // chưa đọc xong dữ liệu cũ → không ghi
      // Lưới an toàn: không bao giờ ghi bản trống đè lên bản đã có tiến độ (trừ khi bố mẹ chủ động Xóa/Khôi phục)
      if (!this._allowBlankWrite && isBlank(this.state) && this._storedScore > 0) return;
      this._allowBlankWrite = false;
      this.state.savedAt = Date.now();
      const snapshot = JSON.parse(JSON.stringify(this.state));
      this._storedScore = progressScore(snapshot);
      lsSet(LS_SETTINGS, snapshot.settings);
      lsSet(LS_STATE, snapshot);
      let db = await this._getDB();
      if (db) {
        try { await idbPut(db, STATE_KEY, snapshot); }
        catch (e) {
          // Kết nối IDB bị đóng (iPad chạy nền) → mở lại và thử 1 lần nữa
          this._db = null; db = await this._getDB();
          if (db) { try { await idbPut(db, STATE_KEY, snapshot); } catch (e2) { /* đã có bản sao localStorage */ } }
        }
      }
      await this._dailyBackup(snapshot);
    },

    /* ---------- Sao lưu tự động hằng ngày (giữ 7 ngày gần nhất trong máy) ---------- */
    async _dailyBackup(snapshot) {
      if (isBlank(snapshot)) return;
      const day = todayKey();
      const db = await this._getDB();
      if (!db) return;
      try {
        await idbPut(db, BACKUP_PREFIX + day, { day, at: Date.now(), data: snapshot });
        if (this._lastBackupDay !== day) {
          this._lastBackupDay = day;
          const keys = (await idbKeys(db)).filter((k) => typeof k === 'string' && k.indexOf(BACKUP_PREFIX) === 0).sort();
          const old = keys.slice(0, Math.max(0, keys.length - this.BACKUP_DAYS));
          for (const k of old) await idbDel(db, k);
        }
      } catch (e) { /* không sao lưu được thì bỏ qua */ }
    },

    /** Danh sách bản sao lưu tự động, mới nhất trước: [{ day, at, data, score }]. */
    async listBackups() {
      const db = await this._getDB();
      if (!db) return [];
      try {
        const keys = (await idbKeys(db)).filter((k) => typeof k === 'string' && k.indexOf(BACKUP_PREFIX) === 0).sort().reverse();
        const out = [];
        for (const k of keys) {
          const b = await idbGet(db, k);
          if (b && b.data) out.push({ day: b.day, at: b.at, data: b.data, score: progressScore(b.data) });
        }
        return out;
      } catch (e) { return []; }
    },

    async restoreBackup(day) {
      const b = (await this.listBackups()).find((x) => x.day === day);
      if (!b) throw new Error('Không tìm thấy bản sao lưu');
      return this.importObject(b.data);
    },

    /* ---------- Ví thưởng ---------- */
    addStuds(n) { this.state.studs = Math.max(0, this.state.studs + Math.round(n)); this.save(); },
    spendStuds(n) {
      if (this.state.studs < n) return false;
      this.state.studs -= n; this.save(); return true;
    },
    addGold(n) { this.state.goldBricks = Math.max(0, this.state.goldBricks + Math.round(n)); this.save(); },

    /* ---------- Bài học ---------- */
    lesson(id) { return this.state.lessons[id] || null; },
    isLessonDone(id) { return !!(this.state.lessons[id] && this.state.lessons[id].done); },
    completeLesson(id, { stars = 1, accuracy = 0 } = {}) {
      const prev = this.state.lessons[id] || { plays: 0, stars: 0 };
      const firstTime = !prev.done;
      this.state.lessons[id] = {
        done: true,
        stars: Math.max(prev.stars || 0, stars),
        accuracy: Math.max(prev.accuracy || 0, accuracy),
        plays: (prev.plays || 0) + 1,
        completedAt: prev.completedAt || Date.now(),
        lastPlayed: Date.now()
      };
      this.save();
      return firstTime;
    },
    lessonsDoneCount() { return Object.values(this.state.lessons).filter((l) => l.done).length; },

    /* ---------- Mảnh ghép mô hình ---------- */
    parts(zoneId) {
      if (!this.state.parts[zoneId]) this.state.parts[zoneId] = new Array(PARTS_PER_SET).fill(0);
      return this.state.parts[zoneId];
    },
    unlockParts(zoneId, idxs) {
      const p = this.parts(zoneId);
      const newly = [];
      idxs.forEach((i) => { if (p[i] === 0) { p[i] = 1; newly.push(i); } });
      this.save();
      return newly;
    },
    assemblePart(zoneId, idx) {
      const p = this.parts(zoneId);
      if (p[idx] !== 1) return false;
      p[idx] = 2;
      this.save();
      return true;
    },
    zoneProgress(zoneId) {
      const p = this.parts(zoneId);
      return {
        assembled: p.filter((x) => x === 2).length,
        unlocked: p.filter((x) => x >= 1).length,
        ready: p.filter((x) => x === 1).length,
        total: p.length,
        complete: p.every((x) => x === 2)
      };
    },
    totalReadyParts() {
      return Object.keys(this.state.parts).reduce((s, z) => s + this.state.parts[z].filter((x) => x === 1).length, 0);
    },

    /* ---------- Từ vựng & Spaced Repetition ---------- */
    word(id) { return this.state.words[id] || null; },

    /** Ghi nhận trả lời trong bài học (thống kê, không đổi lịch ôn). */
    recordAnswer(wordId, correct) {
      const w = this.state.words[wordId] || { stage: 0, due: 0, correct: 0, wrong: 0 };
      if (correct) w.correct++; else w.wrong++;
      this.state.words[wordId] = w;
      this.save();
    },

    /** Khi hoàn thành bài: từ mới bước vào lịch ôn – ôn lần 1 sau 1 ngày. */
    learnWord(wordId) {
      const w = this.state.words[wordId] || { stage: 0, due: 0, correct: 0, wrong: 0 };
      if (!w.stage) {
        w.stage = 1;
        w.learnedAt = Date.now();
        w.due = startOfDay(Date.now()) + SRS_INTERVALS[0] * DAY;
      }
      this.state.words[wordId] = w;
      this.save();
    },

    /** Trạm bảo trì: đúng → lên bậc (3, 7, 14, 30 ngày); sai → lùi 1 bậc, ôn lại sau 1 ngày. */
    reviewWord(wordId, correct) {
      const w = this.state.words[wordId];
      if (!w || !w.stage) return;
      const now = Date.now();
      if (correct) {
        w.correct++;
        w.stage = Math.min(SRS_INTERVALS.length + 1, w.stage + 1);
        const interval = SRS_INTERVALS[Math.min(w.stage - 1, SRS_INTERVALS.length - 1)];
        w.due = startOfDay(now) + interval * DAY;
      } else {
        w.wrong++;
        w.stage = Math.max(1, w.stage - 1);
        w.due = startOfDay(now) + SRS_INTERVALS[0] * DAY;
      }
      w.lastReview = now;
      this.save();
    },

    isDue(wordId, now = Date.now()) {
      const w = this.state.words[wordId];
      return !!(w && w.stage && w.due <= now);
    },

    dueWordIds(now = Date.now()) {
      return Object.keys(this.state.words).filter((id) => this.isDue(id, now));
    },

    learnedWordIds() { return Object.keys(this.state.words).filter((id) => this.state.words[id].stage > 0); },
    masteredWordIds() { return Object.keys(this.state.words).filter((id) => this.state.words[id].stage >= 4); },

    /** Lịch ôn sắp tới: { 'YYYY-MM-DD': [wordId...] } trong N ngày. */
    upcoming(days = 7) {
      const out = {};
      const end = startOfDay(Date.now()) + (days + 1) * DAY;
      Object.keys(this.state.words).forEach((id) => {
        const w = this.state.words[id];
        if (!w.stage || w.due >= end) return;
        const key = w.due <= Date.now() ? todayKey() : todayKey(new Date(w.due));
        (out[key] = out[key] || []).push(id);
      });
      return out;
    },

    polish(zoneId) { this.state.polished[zoneId] = Date.now(); this.save(); },

    /** Hộp SRS 1..5 → cấp gạch trong Hộ chiếu: Nhựa (1) → Bạc (2) → Vàng (3–4) → Kim Cương (5). */
    wordBox(wordId) {
      const w = this.state.words[wordId];
      return w && w.stage ? Math.min(5, w.stage) : 0;
    },
    wordTier(wordId) {
      const b = this.wordBox(wordId);
      return b === 0 ? 'none' : b === 1 ? 'plastic' : b === 2 ? 'silver' : b <= 4 ? 'gold' : 'diamond';
    },

    /* ---------- Mystery Mission & Snowball & Hội thoại rẽ nhánh ---------- */
    mystery(zoneId) { return this.state.mysteries[zoneId] || null; },
    solveMystery(zoneId, stars) {
      const prev = this.state.mysteries[zoneId];
      const first = !(prev && prev.done);
      this.state.mysteries[zoneId] = { done: true, stars: Math.max(stars, (prev && prev.stars) || 0), at: (prev && prev.at) || Date.now() };
      this.save();
      return first;
    },
    snowLevel(lessonId) { return this.state.snow[lessonId] || 0; },
    setSnow(lessonId, level) {
      const first = level > (this.state.snow[lessonId] || 0);
      if (first) { this.state.snow[lessonId] = level; this.save(); }
      return first;
    },
    tryBranch(key, tone) {
      const list = this.state.branches[key] || [];
      const first = list.indexOf(tone) === -1;
      if (first) { list.push(tone); this.state.branches[key] = list; this.save(); }
      return first;
    },

    /* ---------- Bài học tùy chỉnh (Custom Unit Importer) ---------- */
    nextCustomId() {
      let n = 1;
      const used = new Set(this.state.customUnits.map((u) => u.id));
      while (used.has('c' + n)) n++;
      return 'c' + n;
    },
    addCustomUnit(id, data) {
      this.state.customUnits = this.state.customUnits.filter((u) => u.id !== id).concat([{ id, addedAt: Date.now(), data }]);
      this.save();
    },
    /** Xóa bài tùy chỉnh và toàn bộ tiến độ gắn với nó (để không còn từ "ma" trong lịch ôn). */
    removeCustomUnit(id) {
      const st = this.state;
      st.customUnits = st.customUnits.filter((u) => u.id !== id);
      const pre = id + '-', lpre = id + 'l';
      Object.keys(st.words).forEach((k) => { if (k.indexOf(pre) === 0) delete st.words[k]; });
      Object.keys(st.lessons).forEach((k) => { if (k.indexOf(lpre) === 0 && /^\d+$/.test(k.slice(lpre.length))) delete st.lessons[k]; });
      Object.keys(st.snow).forEach((k) => { if (k.indexOf(lpre) === 0) delete st.snow[k]; });
      Object.keys(st.branches).forEach((k) => { if (k.indexOf(lpre) === 0) delete st.branches[k]; });
      Object.keys(st.mistakes).forEach((k) => { if (k.indexOf(':' + lpre) !== -1 || k.indexOf('word:' + pre) === 0) delete st.mistakes[k]; });
      delete st.parts[id]; delete st.polished[id]; delete st.mysteries[id];
      this.save();
    },

    /* ---------- Lỗi hay gặp ---------- */
    addMistake(key, text, vi) {
      const m = this.state.mistakes[key] || { text, vi: vi || '', count: 0 };
      m.count++; m.last = Date.now(); m.text = text; if (vi) m.vi = vi;
      this.state.mistakes[key] = m;
      this.save();
    },
    topMistakes(n = 15) {
      return Object.entries(this.state.mistakes)
        .map(([key, m]) => Object.assign({ key }, m))
        .sort((a, b) => b.count - a.count || b.last - a.last)
        .slice(0, n);
    },
    clearMistakes() { this.state.mistakes = {}; this.save(); },

    /* ---------- Thời gian học ---------- */
    addSeconds(sec) {
      const k = todayKey();
      this.state.daily[k] = (this.state.daily[k] || 0) + sec;
      this.save();
    },
    lastDays(n = 7) {
      const out = [];
      for (let i = n - 1; i >= 0; i--) {
        const d = new Date(); d.setDate(d.getDate() - i);
        const k = todayKey(d);
        out.push({ key: k, date: d, seconds: this.state.daily[k] || 0 });
      }
      return out;
    },
    totalSeconds() { return Object.values(this.state.daily).reduce((a, b) => a + b, 0); },
    gymToday() { return this.state.gym[todayKey()] || 0; },
    recordGym() { const k = todayKey(); this.state.gym[k] = (this.state.gym[k] || 0) + 1; this.save(); },
    /* ---------- Cấp độ thích ứng ----------
       Ghi kết quả mỗi bài (độ chính xác, tỉ lệ câu nói KHÔNG cần gợi ý). Chế độ tự động: 5 bài gần nhất
       trung bình ≥ 85% chính xác và ≥ 60% câu tự nói → lên cấp; < 55% → xuống cấp. Trả về 'up' | 'down' | null. */
    skillLevel() { return Math.min(3, Math.max(1, Number(this.state.skill.level) || 1)); },
    recordLessonSkill(entry) {
      const sk = this.state.skill;
      sk.recent = (sk.recent || []).concat([Object.assign({ date: Date.now() }, entry)]).slice(-8);
      let change = null;
      const last = sk.recent.slice(-5);
      const sinceChange = sk.recent.filter((r) => r.date > (sk.changedAt || 0)).length;
      if (sk.auto !== false && last.length >= 5 && sinceChange >= 5) {
        const acc = last.reduce((a, r) => a + r.acc, 0) / last.length;
        const free = last.reduce((a, r) => a + (r.free || 0), 0) / last.length;
        if (acc >= 0.85 && free >= 0.6 && sk.level < 3) { sk.level++; change = 'up'; }
        else if (acc < 0.55 && sk.level > 1) { sk.level--; change = 'down'; }
        if (change) sk.changedAt = Date.now();
      }
      this.save();
      return change;
    },
    setSkillLevel(level, auto) { const sk = this.state.skill; sk.level = Math.min(3, Math.max(1, level)); sk.auto = !!auto; sk.changedAt = Date.now(); this.save(); },
    addCheck(rec) { this.state.checks.push(rec); this.state.checks = this.state.checks.slice(-40); this.save(); },

    /* ---------- ⏱️ Thời gian nói thật ---------- */
    addTalkMs(ms) { if (!(ms > 0)) return; const k = todayKey(); this.state.talk[k] = (this.state.talk[k] || 0) + Math.round(ms); this.save(); },
    talkSecToday() { return Math.round((this.state.talk[todayKey()] || 0) / 1000); },
    talkSecOn(key) { return Math.round((this.state.talk[key] || 0) / 1000); },
    talkMinTotal() { return Object.keys(this.state.talk).reduce((a, k) => a + (this.state.talk[k] || 0), 0) / 60000; },
    /** Số ngày liên tiếp (tính cả hôm nay nếu đã đạt) con đạt mục tiêu nói. */
    talkStreak() {
      let n = 0; const d = new Date();
      if (!this.state.talkGoal[todayKey()]) d.setDate(d.getDate() - 1);
      for (;;) { if (!this.state.talkGoal[todayKey(d)]) break; n++; d.setDate(d.getDate() - 1); }
      return n;
    },
    /** Hoàn thành một lượt ôn tập (Trạm bảo trì). */
    recordReview() { const k = todayKey(); this.state.reviewLog[k] = (this.state.reviewLog[k] || 0) + 1; this.state.lastReviewAt = Date.now(); this.save(); },
    /** Số ngày liên tiếp có ôn tập (tính tới hôm nay, hoặc hôm qua nếu hôm nay chưa ôn). */
    reviewStreak() {
      let n = 0; const d = new Date();
      if (!this.state.reviewLog[todayKey()]) d.setDate(d.getDate() - 1);
      for (;;) { if (!this.state.reviewLog[todayKey(d)]) break; n++; d.setDate(d.getDate() - 1); }
      return n;
    },
    /** Lần gần nhất con chơi/hoàn thành một bài học. */
    lastLessonAt() { return Object.values(this.state.lessons).reduce((a, l) => Math.max(a, l.lastPlayed || l.completedAt || 0), 0); },
    todayKey(d) { return todayKey(d || new Date()); },

    speakToday() { return this.state.speak[todayKey()] || 0; },
    speakTotal() { return Object.keys(this.state.speak).reduce((a, k) => a + (this.state.speak[k] || 0), 0); },
    recordSpeak() { const k = todayKey(); this.state.speak[k] = (this.state.speak[k] || 0) + 1; this.save(); },
    /** Số ngày học liên tiếp (tính đến hôm nay, hoặc hôm qua nếu hôm nay chưa học). */
    streakDays() {
      let count = 0;
      const d = new Date();
      if (!this.state.daily[todayKey(d)]) d.setDate(d.getDate() - 1);
      while (this.state.daily[todayKey(d)] > 0) {
        count++;
        d.setDate(d.getDate() - 1);
      }
      return count;
    },

    /* ---------- Nhân vật ---------- */
    owns(itemId) { return this.state.owned.indexOf(itemId) !== -1; },
    buy(itemId, price) {
      if (this.owns(itemId)) return true;
      if (!this.spendStuds(price)) return false;
      this.state.owned.push(itemId);
      this.save();
      return true;
    },
    /** Đồ Huyền thoại: trả bằng Gold Brick. */
    buyWithGold(itemId, gold) {
      if (this.owns(itemId)) return true;
      if (this.state.goldBricks < gold) return false;
      this.state.goldBricks -= gold;
      this.state.owned.push(itemId);
      this.save();
      return true;
    },
    equip(slot, itemId) { this.state.avatar[slot] = itemId; this.save(); },

    /* ---------- Sao lưu / Khôi phục ---------- */
    exportObject() {
      return { app: 'lego-english-builder', exportedAt: new Date().toISOString(), data: JSON.parse(JSON.stringify(this.state)) };
    },
    exportJSON() { return JSON.stringify(this.exportObject(), null, 2); },

    validate(obj) {
      const data = obj && obj.app === 'lego-english-builder' ? obj.data : obj;
      if (!data || typeof data !== 'object') throw new Error('Dữ liệu không hợp lệ');
      if (typeof data.lessons !== 'object' || typeof data.words !== 'object') throw new Error('Thiếu dữ liệu bài học/từ vựng');
      return data;
    },

    async importObject(obj) {
      const data = this.validate(obj);
      this.state = merge(defaults(), data);
      this._ready = true;
      this._allowBlankWrite = true;
      await this.saveNow();
      this._emit();
    },

    async importJSON(text) { return this.importObject(JSON.parse(text)); },

    toCode() { return CODE_PREFIX + utf8ToB64(JSON.stringify(this.exportObject())); },

    async fromCode(code) {
      const raw = String(code || '').trim().replace(/\s+/g, '');
      if (raw.indexOf(CODE_PREFIX) !== 0) throw new Error('Mã không đúng định dạng (phải bắt đầu bằng LEB1:)');
      const json = b64ToUtf8(raw.slice(CODE_PREFIX.length));
      return this.importObject(JSON.parse(json));
    },

    async reset() {
      const keepSettings = this.state.settings;
      const keepUnits = this.state.customUnits;   // bài học bố mẹ nhập là nội dung, không phải tiến độ
      this.state = defaults();
      this.state.settings = keepSettings;
      this.state.customUnits = keepUnits;
      this.state.resetAt = Date.now();   // bố mẹ chủ động xóa → không tự khôi phục từ bản sao lưu
      this._allowBlankWrite = true;
      await this.saveNow();
      this._emit();
    }
  };

  /* ---------- 🎙️ Sổ giọng nói: lưu vài bản ghi mỗi bài để bố mẹ nghe tiến bộ theo tuần ----------
     IndexedDB riêng (leb-voice), tối đa MAX bản ghi (xóa bản cũ nhất), mỗi bản ghi vài giây (~30–80 KB). */
  const VoiceBook = {
    MAX: 120,
    _db: null,
    _open() {
      if (this._db) return Promise.resolve(this._db);
      return new Promise((resolve, reject) => {
        if (!global.indexedDB) { reject(new Error('no-idb')); return; }
        let req;
        try { req = indexedDB.open('leb-voice', 1); } catch (e) { reject(e); return; }
        req.onupgradeneeded = () => { const db = req.result; if (!db.objectStoreNames.contains('clips')) db.createObjectStore('clips', { keyPath: 'id', autoIncrement: true }); };
        req.onsuccess = () => { this._db = req.result; resolve(this._db); };
        req.onerror = () => reject(req.error);
      });
    },
    async add(rec) {
      try {
        if (!rec || !rec.blob || !rec.blob.size) return;
        const db = await this._open();
        await new Promise((res, rej) => { const tx = db.transaction('clips', 'readwrite'); tx.objectStore('clips').add(Object.assign({ date: Date.now() }, rec)); tx.oncomplete = res; tx.onerror = () => rej(tx.error); });
        const all = await this.list();
        if (all.length > this.MAX) {
          const tx = db.transaction('clips', 'readwrite');
          all.slice(this.MAX).forEach((c) => tx.objectStore('clips').delete(c.id));
        }
      } catch (e) { /* không lưu được thì bỏ qua – không ảnh hưởng bài học */ }
    },
    /** Mới nhất trước. */
    async list() {
      try {
        const db = await this._open();
        return await new Promise((res, rej) => {
          const tx = db.transaction('clips', 'readonly');
          const rq = tx.objectStore('clips').getAll();
          rq.onsuccess = () => res((rq.result || []).sort((a, b) => b.date - a.date));
          rq.onerror = () => rej(rq.error);
        });
      } catch (e) { return []; }
    },
    async get(id) { return (await this.list()).find((c) => c.id === id) || null; },
    async clear() {
      try { const db = await this._open(); await new Promise((res) => { const tx = db.transaction('clips', 'readwrite'); tx.objectStore('clips').clear(); tx.oncomplete = res; tx.onerror = res; }); } catch (e) { /* */ }
    }
  };

  global.Store = Store;
  global.VoiceBook = VoiceBook;
})(window);
