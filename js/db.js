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
      gifts: [],            // [{ id, at, studs, gold, note }] – quà xu/Gold bố mẹ tặng (Góc Bố Mẹ)
      giftInbox: null,      // { studs, gold, notes: [] } – quà mới, bé chưa mở (hiện màn chúc mừng 1 lần)
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
  function openDB(timeoutMs = 8000) {
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

  /** Chạy promise nhưng bỏ cuộc sau ms (iPad đôi khi treo IndexedDB mãi không trả lời). */
  function withTimeout(promise, ms) {
    return new Promise((resolve, reject) => {
      const t = setTimeout(() => reject(new Error('timeout')), ms);
      promise.then((v) => { clearTimeout(t); resolve(v); }, (e) => { clearTimeout(t); reject(e); });
    });
  }

  const cnt = (o) => (o && typeof o === 'object' ? Object.keys(o).length : 0);

  /** Điểm "đã học được bao nhiêu" – chỉ gồm những thứ chỉ tăng chứ không giảm (không tính xu/Gold vì bé tiêu được). */
  function learnScore(s) {
    if (!s || typeof s !== 'object') return 0;
    const lessons = s.lessons && typeof s.lessons === 'object' ? Object.values(s.lessons).filter((l) => l && l.done).length : 0;
    const owned = Array.isArray(s.owned) ? s.owned.length : 0;
    return lessons * 100 + cnt(s.words) * 10 + cnt(s.mysteries) * 50 + cnt(s.daily) * 5 + cnt(s.reviewLog) * 5 +
      Math.max(0, owned - 14) * 20 + (Array.isArray(s.checks) ? s.checks.length : 0) * 5;
  }
  const progressScore = learnScore;
  /** Bản lưu "trống" = chưa học bài nào, chưa có từ nào. */
  function isBlank(s) {
    if (!s || typeof s !== 'object') return true;
    return cnt(s.lessons) === 0 && cnt(s.words) === 0;
  }
  /** "Dòng dữ liệu": mỗi lần bắt đầu từ trắng (máy mới / Xóa tiến độ) có createdAt mới. */
  const lineage = (s) => (s && Number(s.createdAt)) || 0;
  /** x có phải bản nối tiếp của y (phiên của x đã đọc bản y hoặc mới hơn y rồi mới học tiếp)? */
  const descends = (x, y) => (Number(x.sessionBase) || 0) >= (Number(y.savedAt) || 0);

  /** So 2 bản lưu, trả về bản nên GIỮ. Nguyên tắc: khi không chắc chắn, giữ bản có nhiều tiến độ học hơn. */
  function better(a, b) {
    if (!a || typeof a !== 'object') return b || null;
    if (!b || typeof b !== 'object') return a;
    const ta = Number(a.savedAt) || 0, tb = Number(b.savedAt) || 0;
    const [newer, older] = ta >= tb ? [a, b] : [b, a];
    if (lineage(a) === lineage(b)) {
      if ((Number(newer.savedAt) || 0) && descends(newer, older)) return newer;
    } else {
      // Bố mẹ chủ động Xóa tiến độ / Khôi phục SAU lần lưu cuối của bản kia → tôn trọng lựa chọn đó
      const act = Math.max(Number(newer.resetAt) || 0, Number(newer.importedAt) || 0);
      if (act > (Number(older.savedAt) || 0)) return newer;
    }
    const sa = learnScore(a), sb = learnScore(b);
    if (sa !== sb) return sa > sb ? a : b;
    return newer;
  }
  function pickBest(list) { return list.reduce((acc, x) => better(acc, x), null); }

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
    out.gifts = Array.isArray(saved.gifts) ? saved.gifts.filter((g) => g && typeof g === 'object').slice(-50) : [];
    out.giftInbox = saved.giftInbox && typeof saved.giftInbox === 'object' ? saved.giftInbox : null;
    out.journey = Array.isArray(saved.journey) ? saved.journey : [];
    out.reviewLog = saved.reviewLog && typeof saved.reviewLog === 'object' ? saved.reviewLog : {};
    out.lastReviewAt = Number(saved.lastReviewAt) || 0;
    out.talkDay = saved.talkDay && typeof saved.talkDay === 'object' ? saved.talkDay : null;
    out.savedAt = Number(saved.savedAt) || 0;
    out.resetAt = Number(saved.resetAt) || 0;
    out.sessionBase = Number(saved.sessionBase) || 0;
    out.importedAt = Number(saved.importedAt) || 0;
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

    _ready: false,          // chưa đọc xong dữ liệu đã lưu → KHÔNG được ghi
    _base: 0,               // savedAt của bản đã đọc lúc mở app / bản mình vừa ghi
    _override: false,       // bố mẹ chủ động Xóa / Khôi phục → được phép ghi đè
    _chain: Promise.resolve(),
    _ownWrites: new Set(),
    BACKUP_DAYS: 14,
    recovered: null,
    onAdopt: null,          // app.js gán: vẽ lại màn hình khi tìm thấy dữ liệu tốt hơn

    async _getDB() {
      if (this._db && !this._db._closed) return this._db;
      this._db = null;
      // Vừa mở thất bại (treo) → đừng chờ thêm 8 giây mỗi lần gọi; thử lại sau vài giây
      if (this._dbFailAt && Date.now() - this._dbFailAt < 4000) return null;
      if (!this._opening) this._opening = openDB(8000).then((db) => { this._dbFailAt = 0; return db; }, () => { this._dbFailAt = Date.now(); return null; });
      const db = await this._opening;
      this._opening = null;
      this._db = db;
      return db;
    },

    /** Đọc 1 khóa IDB. Trả về { ok, value }; ok=false nghĩa là KHÔNG ĐỌC ĐƯỢC (khác với "không có dữ liệu"). */
    async _idbRead(key) {
      for (let i = 0; i < 2; i++) {
        const db = await this._getDB();
        if (!db) return { ok: false };   // không mở được → không thử lại ngay
        try { return { ok: true, value: await withTimeout(idbGet(db, key), 5000) }; }
        catch (e) { try { db.close(); } catch (e2) { /* */ } this._db = null; }
      }
      return { ok: false };
    },

    async load() {
      const quick = lsGet(LS_SETTINGS);
      const fromLs = lsGet(LS_STATE);
      const r = await this._idbRead(STATE_KEY);
      this._idbOk = r.ok;
      let saved = pickBest([r.ok ? r.value : null, fromLs]);
      // Tìm trong các bản sao lưu: (1) bản chính trống → lấy bản sao lưu nhiều tiến độ nhất;
      // (2) bản chính là một "dòng dữ liệu" khác (bắt đầu lại từ trắng do lỗi đọc) mà ít tiến độ hơn → lấy lại bản đầy đủ.
      // Không đụng tới bản cùng dòng (để tôn trọng việc bố mẹ khôi phục về một ngày cũ hơn).
      {
        const blank = isBlank(saved) && !(saved && saved.resetAt);
        const copies = (await this.findCopies()).filter((c) => c.key !== STATE_KEY && c.key !== 'ls:state' && !isBlank(c.data) &&
          (blank || lineage(c.data) !== lineage(saved)));
        let best = null;
        copies.forEach((c) => { if (better(best ? best.data : saved, c.data) === c.data && (blank || learnScore(c.data) > learnScore(saved))) best = c; });
        if (best) {
          // Cất bản chính đang có (nếu có tiến độ) để không mất gì cả
          if (!isBlank(saved)) await this._stash('alt:' + Date.now(), JSON.parse(JSON.stringify(saved)));
          saved = best.data; this.recovered = { from: best.label };
        }
      }
      this.state = merge(defaults(), saved);
      if (quick) this.state.settings = Object.assign(this.state.settings, quick);
      const st = this.state.settings;
      if (!st.rateV3) { st.rate = Math.min(Number(st.rate) || 0.5, 0.5); st.rateV3 = true; }
      this._base = Number(saved && saved.savedAt) || 0;
      this.state.sessionBase = this._base;
      this._ready = true;
      try { if (navigator.storage && navigator.storage.persist) navigator.storage.persist().catch(() => {}); } catch (e) { /* */ }
      // IDB chưa đọc được → thử lại ở nền; nếu trong đó có bản tốt hơn thì dùng bản đó
      if (!this._idbOk) this._retryIdb(0);
      return this.state;
    },

    async _retryIdb(n) {
      if (this._idbOk || n > 6) return;
      await new Promise((res) => setTimeout(res, 3000 + n * 3000));
      const r = await this._idbRead(STATE_KEY);
      if (!r.ok) { this._retryIdb(n + 1); return; }
      this._idbOk = true;
      if (r.value && better(this.state, r.value) === r.value && r.value !== this.state) this._adopt(r.value);
    },

    /** Tìm thấy bản lưu tốt hơn bản đang dùng → chuyển sang bản đó (cất bản đang dùng vào kho phụ). */
    async _adopt(found) {
      const cur = JSON.parse(JSON.stringify(this.state));
      if (!isBlank(cur)) await this._stash('alt:' + Date.now(), cur);
      const keepSettings = this.state.settings;
      this.state = merge(defaults(), found);
      this.state.settings = Object.assign({}, this.state.settings, keepSettings);
      this._base = Number(found.savedAt) || 0;
      this.state.sessionBase = this._base;
      // Quà bố mẹ vừa tặng trên bản cũ (chưa có trong bản tìm thấy) → cộng sang bản mới, theo id nên không bị cộng hai lần
      let carried = 0;
      (Array.isArray(cur.gifts) ? cur.gifts : []).forEach((g) => {
        if (!g || !g.id) return;
        const hadInbox = !!this.state.giftInbox;
        if (this._applyGift({ id: g.id, at: Number(g.at) || 0, studs: Math.max(0, Number(g.studs) || 0), gold: Math.max(0, Number(g.gold) || 0), note: String(g.note || '') })) {
          carried++;
          if (!cur.giftInbox && !hadInbox) this.state.giftInbox = null;   // bé đã mở quà này rồi → không chúc mừng lại
        }
      });
      this.adopted = true;
      this._adopts = (this._adopts || 0) + 1;
      this._emit();
      if (typeof this.onAdopt === 'function') { try { this.onAdopt(); } catch (e) { /* */ } }
      if (carried) this.save();
    },

    async _stash(key, data) {
      const db = await this._getDB();
      if (!db) return;
      try { await withTimeout(idbPut(db, key, { day: todayKey(), at: Date.now(), data }), 5000); } catch (e) { /* */ }
    },

    onChange(fn) { this.listeners.push(fn); },
    _emit() { this.listeners.forEach((fn) => { try { fn(this.state); } catch (e) { /* */ } }); },

    save() {
      this._emit();
      if (!this._ready) return;
      clearTimeout(this._saveTimer);
      this._saveTimer = setTimeout(() => this.saveNow(), 250);
    },

    /** Lưu tuần tự (không bao giờ 2 lần lưu chạy chồng lên nhau). */
    saveNow() {
      clearTimeout(this._saveTimer);
      const run = this._chain.then(() => this._doSave()).catch(() => {});
      this._chain = run;
      return run;
    },

    /** Được phép ghi `snap` đè lên `existing` trong một kho không? */
    _mayOverwrite(existing, snap) {
      if (this._override || !existing || typeof existing !== 'object') return true;
      const t = Number(existing.savedAt) || 0;
      if (t && this._ownWrites.has(t)) return true;                       // chính bản mình vừa ghi
      if (lineage(existing) === lineage(snap) && descends(snap, existing)) return true;   // bản mình đã đọc rồi học tiếp
      // Kho đang chứa bản mình chưa từng đọc → chỉ ghi nếu bản của mình chắc chắn tốt hơn
      return better(existing, snap) === snap && learnScore(snap) >= learnScore(existing);
    },

    async _doSave() {
      if (!this._ready) return;   // chưa đọc xong dữ liệu cũ → không ghi
      const override = this._override;
      this.state.savedAt = Math.max(Date.now(), this._base + 1, (Number(this.state.savedAt) || 0) + 1);
      const snap = JSON.parse(JSON.stringify(this.state));
      lsSet(LS_SETTINGS, snap.settings);
      let conflict = null;

      const exLs = lsGet(LS_STATE);
      if (this._mayOverwrite(exLs, snap)) lsSet(LS_STATE, snap); else conflict = exLs;

      // IndexedDB: đọc bản đang có trước; KHÔNG đọc được thì KHÔNG ghi mù
      const r = await this._idbRead(STATE_KEY);
      let wroteIdb = false;
      if (r.ok) {
        this._idbOk = true;
        if (this._mayOverwrite(r.value, snap)) {
          const db = await this._getDB();
          if (db) { try { await withTimeout(idbPut(db, STATE_KEY, snap), 5000); wroteIdb = true; } catch (e) { /* */ } }
        } else conflict = better(conflict, r.value);
      }
      this._override = false;

      if (conflict && !override) {
        await this._adopt(conflict);   // giữ bản nhiều tiến độ hơn, cất bản đang dùng vào kho phụ
        return;
      }
      this._ownWrites.add(snap.savedAt);
      await this._dailyBackup(snap);
    },

    /* ---------- Sao lưu tự động hằng ngày (giữ 14 ngày, luôn giữ bản nhiều tiến độ nhất) ---------- */
    async _dailyBackup(snap) {
      if (isBlank(snap)) return;
      const day = todayKey();
      const db = await this._getDB();
      if (!db) return;
      try {
        const key = BACKUP_PREFIX + day;
        const ex = await withTimeout(idbGet(db, key), 5000);
        // Không bao giờ đè bản sao lưu của một "dòng dữ liệu" khác có nhiều tiến độ hơn
        let target = key;
        if (ex && ex.data && lineage(ex.data) !== lineage(snap) && learnScore(ex.data) > learnScore(snap)) target = key + ':' + lineage(snap);
        await withTimeout(idbPut(db, target, { day, at: Date.now(), data: snap }), 5000);
        if (this._lastBackupDay !== day) {
          this._lastBackupDay = day;
          await this._pruneBackups(db);
        }
      } catch (e) { /* không sao lưu được thì bỏ qua */ }
    },

    async _pruneBackups(db) {
      const all = await this.findCopies();
      const backups = all.filter((c) => c.key.indexOf(BACKUP_PREFIX) === 0);
      const days = Array.from(new Set(backups.map((c) => c.day))).sort().reverse();
      const keepDays = new Set(days.slice(0, this.BACKUP_DAYS));
      const best = backups.reduce((acc, c) => (!acc || learnScore(c.data) > learnScore(acc.data) ? c : acc), null);
      for (const c of backups) {
        if (keepDays.has(c.day) || (best && c.key === best.key)) continue;
        await idbDel(db, c.key);
      }
      const alts = all.filter((c) => c.key.indexOf('alt:') === 0).sort((x, y) => y.at - x.at);
      for (const c of alts.slice(10)) await idbDel(db, c.key);
    },

    /** MỌI bản lưu còn trong máy (chỉ đọc): bản chính IDB, bản localStorage, sao lưu hằng ngày, kho phụ. */
    async findCopies() {
      const out = [];
      const push = (key, label, data, at) => {
        if (!data || typeof data !== 'object') return;
        const lessons = data.lessons && typeof data.lessons === 'object' ? Object.values(data.lessons).filter((l) => l && l.done).length : 0;
        out.push({ key, label, data, at: at || Number(data.savedAt) || 0, day: todayKey(new Date(at || Number(data.savedAt) || 0)), score: learnScore(data),
          lessons, words: cnt(data.words), studs: Number(data.studs) || 0, gold: Number(data.goldBricks) || 0 });
      };
      push('ls:state', 'Bản lưu nhanh (localStorage)', lsGet(LS_STATE));
      const db = await this._getDB();
      if (db) {
        try {
          const keys = await withTimeout(idbKeys(db), 5000);
          for (const k of keys) {
            if (typeof k !== 'string') continue;
            const v = await withTimeout(idbGet(db, k), 5000);
            if (k === STATE_KEY) push(k, 'Bản lưu chính', v);
            else if (k.indexOf(BACKUP_PREFIX) === 0 && v && v.data) { push(k, 'Sao lưu ngày ' + v.day, v.data, v.at); out[out.length - 1].day = v.day; }
            else if (k.indexOf('alt:') === 0 && v && v.data) push(k, 'Bản cất giữ ' + todayKey(new Date(v.at)), v.data, v.at);
          }
        } catch (e) { /* */ }
      }
      return out;
    },

    /** Danh sách sao lưu (giữ cho tương thích): mọi bản trừ bản chính, nhiều tiến độ trước. */
    async listBackups() {
      return (await this.findCopies()).sort((a, b) => b.score - a.score || b.at - a.at);
    },

    /** Khôi phục một bản bất kỳ (bố mẹ chọn). Bản đang dùng được cất lại trước, nên luôn hoàn tác được. */
    async restoreCopy(key) {
      const c = (await this.findCopies()).find((x) => x.key === key);
      if (!c) throw new Error('Không tìm thấy bản lưu này');
      const cur = JSON.parse(JSON.stringify(this.state));
      if (!isBlank(cur)) await this._stash('alt:' + Date.now(), cur);
      return this.importObject(c.data);
    },
    async restoreBackup(day) { return this.restoreCopy(BACKUP_PREFIX + day); },

    /* ---------- Ví thưởng ---------- */
    addStuds(n) { this.state.studs = Math.max(0, this.state.studs + Math.round(n)); this.save(); },
    spendStuds(n) {
      if (this.state.studs < n) return false;
      this.state.studs -= n; this.save(); return true;
    },
    addGold(n) { this.state.goldBricks = Math.max(0, this.state.goldBricks + Math.round(n)); this.save(); },

    /* ---------- Quà bố mẹ tặng (Góc Bố Mẹ, sau Parent Gate) ----------
       Là một lần lưu bình thường: xu/Gold không nằm trong learnScore nên không ảnh hưởng các chốt chống mất dữ liệu.
       Nếu đúng lúc lưu app phát hiện bản nhiều tiến độ hơn và chuyển sang bản đó (_adopt), quà được cộng lại vào bản mới
       (nhận diện bằng id) để không mất và không bị cộng hai lần. */
    GIFT_MAX: { studs: 10000, gold: 300 },
    _applyGift(g) {
      const s = this.state;
      if (!Array.isArray(s.gifts)) s.gifts = [];
      if (s.gifts.some((x) => x && x.id === g.id)) return false;
      s.studs = Math.max(0, (Number(s.studs) || 0) + g.studs);
      s.goldBricks = Math.max(0, (Number(s.goldBricks) || 0) + g.gold);
      s.gifts.push(g);
      if (s.gifts.length > 50) s.gifts = s.gifts.slice(-50);
      const inbox = s.giftInbox && typeof s.giftInbox === 'object' ? s.giftInbox : { studs: 0, gold: 0, notes: [] };
      inbox.studs = (Number(inbox.studs) || 0) + g.studs;
      inbox.gold = (Number(inbox.gold) || 0) + g.gold;
      inbox.notes = (Array.isArray(inbox.notes) ? inbox.notes : []).concat(g.note ? [g.note] : []).slice(-5);
      s.giftInbox = inbox;
      return true;
    },
    async giftFromParent({ studs = 0, gold = 0, note = '' } = {}) {
      const g = {
        id: 'g' + Date.now().toString(36) + Math.random().toString(36).slice(2, 6),
        at: Date.now(),
        studs: Math.min(this.GIFT_MAX.studs, Math.max(0, Math.round(Number(studs) || 0))),
        gold: Math.min(this.GIFT_MAX.gold, Math.max(0, Math.round(Number(gold) || 0))),
        note: String(note || '').trim().slice(0, 80)
      };
      if (!g.studs && !g.gold) throw new Error('Chưa nhập số xu hoặc Gold');
      this._applyGift(g);
      this._emit();
      const adopts = this._adopts;
      await this.saveNow();
      // Trong lúc lưu app có thể đã chuyển sang bản lưu nhiều tiến độ hơn (_adopt đã cộng quà sang) → lưu lại ngay
      if (this._adopts !== adopts) { this._applyGift(g); this._emit(); await this.saveNow(); }
      return g;
    },
    /** Bé mở quà: trả về quà đang chờ và xóa khỏi hộp thư (xu/Gold đã cộng sẵn lúc bố mẹ tặng). */
    takeGiftInbox() {
      const b = this.state.giftInbox;
      if (!b || (!b.studs && !b.gold)) { if (b) { this.state.giftInbox = null; this.save(); } return null; }
      this.state.giftInbox = null; this.save();
      return b;
    },

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
      this.state.sessionBase = Number(data.savedAt) || 0;
      this.state.importedAt = Date.now();
      this._ready = true;
      this._override = true;
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
      this._override = true;
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
