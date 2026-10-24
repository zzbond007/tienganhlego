/* =========================================================
   audio.js – SoundEngine (Web Audio SFX tự tổng hợp)
              Speech (Text-to-Speech US/UK + chế độ chậm + karaoke)
              Listener (SpeechRecognition + chấm điểm khớp từ khóa)
              Recorder (Thu âm nghe lại – dự phòng cho iPad Safari)
   ========================================================= */
(function (global) {
  'use strict';

  /* ---------------- SoundEngine ---------------- */
  class SoundEngine {
    constructor() {
      this.ctx = null;
      this.master = null;
      this.enabled = true;
      this.volume = 0.7;
    }

    /** Gọi trong cú chạm đầu tiên (user gesture) để Safari cho phép phát âm thanh. */
    unlock() {
      try {
        if (!this.ctx) {
          const AC = global.AudioContext || global.webkitAudioContext;
          if (!AC) return;
          this.ctx = new AC();
          this.master = this.ctx.createGain();
          this.master.gain.value = this.volume;
          this.master.connect(this.ctx.destination);
        }
        if (this.ctx.state === 'suspended') this.ctx.resume();
        // Phát một buffer im lặng – mẹo cổ điển để mở khóa iOS
        const buf = this.ctx.createBuffer(1, 1, 22050);
        const src = this.ctx.createBufferSource();
        src.buffer = buf;
        src.connect(this.ctx.destination);
        src.start(0);
      } catch (e) { /* bỏ qua */ }
    }

    _ready() {
      if (!this.enabled) return false;
      if (!this.ctx) this.unlock();
      if (!this.ctx) return false;
      if (this.ctx.state === 'suspended') this.ctx.resume();
      return true;
    }

    _tone({ freq = 440, freq2 = null, type = 'sine', dur = 0.15, vol = 0.4, delay = 0, attack = 0.005 }) {
      const t0 = this.ctx.currentTime + delay;
      const osc = this.ctx.createOscillator();
      const g = this.ctx.createGain();
      osc.type = type;
      osc.frequency.setValueAtTime(freq, t0);
      if (freq2) osc.frequency.exponentialRampToValueAtTime(freq2, t0 + dur);
      g.gain.setValueAtTime(0.0001, t0);
      g.gain.exponentialRampToValueAtTime(vol, t0 + attack);
      g.gain.exponentialRampToValueAtTime(0.0001, t0 + dur);
      osc.connect(g); g.connect(this.master);
      osc.start(t0); osc.stop(t0 + dur + 0.05);
    }

    _noise({ dur = 0.05, vol = 0.5, delay = 0, filterFreq = 2500, q = 1.5, type = 'bandpass' }) {
      const t0 = this.ctx.currentTime + delay;
      const len = Math.max(1, Math.floor(this.ctx.sampleRate * dur));
      const buf = this.ctx.createBuffer(1, len, this.ctx.sampleRate);
      const data = buf.getChannelData(0);
      for (let i = 0; i < len; i++) data[i] = (Math.random() * 2 - 1) * Math.pow(1 - i / len, 3);
      const src = this.ctx.createBufferSource();
      src.buffer = buf;
      const f = this.ctx.createBiquadFilter();
      f.type = type; f.frequency.value = filterFreq; f.Q.value = q;
      const g = this.ctx.createGain();
      g.gain.setValueAtTime(vol, t0);
      g.gain.exponentialRampToValueAtTime(0.0001, t0 + dur);
      src.connect(f); f.connect(g); g.connect(this.master);
      src.start(t0); src.stop(t0 + dur + 0.02);
    }

    /** Tiếng "Tách / Clack" giòn của hai viên gạch nhựa ABS. */
    playBrickClick() {
      if (!this._ready()) return;
      this._noise({ dur: 0.035, vol: 0.9, filterFreq: 3200, q: 2.2 });
      this._tone({ freq: 1800, freq2: 900, type: 'square', dur: 0.03, vol: 0.12 });
      this._noise({ dur: 0.05, vol: 0.55, delay: 0.045, filterFreq: 1900, q: 3 });
      this._tone({ freq: 620, freq2: 380, type: 'triangle', dur: 0.06, vol: 0.18, delay: 0.045 });
    }

    /** Tiếng bấm nút nhẹ. */
    playTap() {
      if (!this._ready()) return;
      this._noise({ dur: 0.025, vol: 0.5, filterFreq: 2600, q: 2 });
      this._tone({ freq: 900, freq2: 700, type: 'triangle', dur: 0.04, vol: 0.12 });
    }

    /** Tiếng "Ting!" cao vút khi nhặt xu LEGO. */
    playStudCollect(n = 1) {
      if (!this._ready()) return;
      const count = Math.min(n, 6);
      for (let i = 0; i < count; i++) {
        const d = i * 0.07;
        this._tone({ freq: 1568, type: 'square', dur: 0.06, vol: 0.10, delay: d });
        this._tone({ freq: 2093, type: 'sine', dur: 0.22, vol: 0.22, delay: d + 0.05 });
        this._tone({ freq: 3136, type: 'sine', dur: 0.15, vol: 0.06, delay: d + 0.05 });
      }
    }

    /** Hợp âm chiến thắng vui nhộn. */
    playSuccessFanfare() {
      if (!this._ready()) return;
      const notes = [523.25, 659.25, 783.99, 1046.5];
      notes.forEach((f, i) => {
        this._tone({ freq: f, type: 'triangle', dur: 0.18, vol: 0.28, delay: i * 0.1 });
        this._tone({ freq: f * 2, type: 'sine', dur: 0.12, vol: 0.06, delay: i * 0.1 });
      });
      [523.25, 659.25, 783.99, 1046.5].forEach((f) => {
        this._tone({ freq: f, type: 'triangle', dur: 0.7, vol: 0.16, delay: 0.42, attack: 0.02 });
      });
      this._tone({ freq: 2093, type: 'sine', dur: 0.5, vol: 0.08, delay: 0.45 });
    }

    /** Âm nhẹ nhàng, khích lệ khi chọn nhầm – không chói tai. */
    playGentleOops() {
      if (!this._ready()) return;
      this._tone({ freq: 440, freq2: 392, type: 'sine', dur: 0.18, vol: 0.22 });
      this._tone({ freq: 392, freq2: 330, type: 'sine', dur: 0.26, vol: 0.18, delay: 0.16 });
    }

    /** Tiếng mảnh ghép rơi xuống khớp vào mô hình. */
    playSnap() {
      if (!this._ready()) return;
      this._tone({ freq: 300, freq2: 900, type: 'sine', dur: 0.12, vol: 0.12 });
      this._noise({ dur: 0.04, vol: 1, delay: 0.13, filterFreq: 3000, q: 2 });
      this._tone({ freq: 220, freq2: 140, type: 'triangle', dur: 0.1, vol: 0.3, delay: 0.13 });
      this._noise({ dur: 0.04, vol: 0.6, delay: 0.19, filterFreq: 2200, q: 3 });
    }

    /** Tiếng xé túi mù. */
    playTear(strength = 1) {
      if (!this._ready()) return;
      this._noise({ dur: 0.12 + strength * 0.08, vol: 0.5 + strength * 0.15, filterFreq: 4200, q: 0.6, type: 'highpass' });
      this._noise({ dur: 0.08, vol: 0.4, delay: 0.06, filterFreq: 1500, q: 1 });
    }

    /** Tiếng vút (bay ra). */
    playWhoosh() {
      if (!this._ready()) return;
      this._noise({ dur: 0.35, vol: 0.35, filterFreq: 900, q: 0.8 });
      this._tone({ freq: 300, freq2: 1200, type: 'sine', dur: 0.3, vol: 0.06 });
    }

    /** Tiếng combo tăng dần. */
    playCombo(level = 2) {
      if (!this._ready()) return;
      const base = 660 + level * 60;
      [0, 1, 2].forEach((i) => this._tone({ freq: base * Math.pow(1.26, i), type: 'square', dur: 0.08, vol: 0.08, delay: i * 0.06 }));
    }

    /** Tiếng "bíp bíp" khi micro bắt đầu nghe. */
    playMicOn() {
      if (!this._ready()) return;
      this._tone({ freq: 880, type: 'sine', dur: 0.09, vol: 0.2 });
      this._tone({ freq: 1320, type: 'sine', dur: 0.12, vol: 0.2, delay: 0.1 });
    }

    /** Tiếng lấp lánh khi đánh bóng mô hình. */
    playSparkle() {
      if (!this._ready()) return;
      for (let i = 0; i < 6; i++) this._tone({ freq: 1800 + Math.random() * 1600, type: 'sine', dur: 0.15, vol: 0.08, delay: i * 0.06 });
    }
  }

  /* ---------------- Speech (TTS) ---------------- */
  const synth = global.speechSynthesis || null;

  const Speech = {
    supported: !!(synth && global.SpeechSynthesisUtterance),
    accent: 'en-US',
    rate: 0.65,
    voices: [],
    _voice: null,
    _unlocked: false,
    _token: 0,

    init() {
      if (!this.supported) return;
      const load = () => {
        this.voices = synth.getVoices() || [];
        this._voice = this._pickVoice();
      };
      load();
      if (typeof synth.addEventListener === 'function') synth.addEventListener('voiceschanged', load);
      else synth.onvoiceschanged = load;
    },

    setAccent(acc) {
      this.accent = acc === 'en-GB' ? 'en-GB' : 'en-US';
      this._voice = this._pickVoice();
    },

    _pickVoice() {
      const list = this.voices.filter((v) => /^en[-_]/i.test(v.lang));
      if (!list.length) return null;
      const want = this.accent.toLowerCase().replace('_', '-');
      const same = list.filter((v) => v.lang.toLowerCase().replace('_', '-') === want);
      // Ưu tiên các giọng tự nhiên trên iPad/Mac/Chrome
      const preferred = want === 'en-gb'
        ? ['Daniel', 'Serena', 'Kate', 'Arthur', 'Martha', 'Google UK English Female', 'Microsoft Libby', 'Microsoft Sonia']
        : ['Samantha', 'Ava', 'Allison', 'Nicky', 'Susan', 'Google US English', 'Microsoft Aria', 'Microsoft Jenny', 'Microsoft Zira'];
      const pool = same.length ? same : list;
      for (const name of preferred) {
        const v = pool.find((x) => x.name.indexOf(name) !== -1);
        if (v) return v;
      }
      return pool.find((v) => v.localService) || pool[0];
    },

    /** Mở khóa speechSynthesis trên Safari (phải gọi trong user gesture). */
    unlock() {
      if (!this.supported || this._unlocked) return;
      try {
        const u = new SpeechSynthesisUtterance(' ');
        u.volume = 0; u.rate = 1;
        synth.speak(u);
        this._unlocked = true;
      } catch (e) { /* bỏ qua */ }
    },

    _slowId: 0,

    cancel() {
      this._token++;
      this._chain++;
      this._slowId++;
      if (this.supported) { try { synth.cancel(); } catch (e) { /* */ } }
    },

    /**
     * Đọc một câu. Trả về Promise khi đọc xong.
     * opts.rate, opts.onWord(index) – karaoke theo từ (dùng boundary event, có dự phòng hẹn giờ).
     */
    speak(text, opts = {}) {
      // Câu dài / nhiều câu: đọc từng cụm (tách ở dấu chấm, hỏi, than, phẩy) và NGHỈ giữa các cụm
      // để bé kịp nghe và bắt chữ. Karaoke vẫn đánh dấu đúng từ.
      const clean = String(text || '').replace(/_{2,}/g, 'blank').trim();
      const chunks = opts.noChunk ? [clean] : (clean.match(/[^.!?,;:]+[.!?,;:]*["”’)]*\s*/g) || [clean]).map((c) => c.trim()).filter(Boolean)
        .reduce((acc, c) => { const last = acc[acc.length - 1]; if (last && /(^|\s)(Mr|Mrs|Ms|Dr|St|a\.m|p\.m)\.$/i.test(last)) acc[acc.length - 1] = last + ' ' + c; else acc.push(c); return acc; }, []);
      if (chunks.length < 2) return this._speakOne(clean, opts);
      const chain = ++this._chain;
      const onWord = typeof opts.onWord === 'function' ? opts.onWord : null;
      return (async () => {
        let offset = 0;
        for (let k = 0; k < chunks.length; k++) {
          if (chain !== this._chain) return;
          const c = chunks[k], n = c.split(/\s+/).filter(Boolean).length, off = offset;
          await this._speakOne(c, Object.assign({}, opts, { onWord: onWord ? (i) => { if (i >= 0 && chain === this._chain) onWord(off + i); } : null }));
          offset += n;
          if (k < chunks.length - 1 && chain === this._chain) {
            const slow = (opts.rate || this.rate) <= 0.7;
            await new Promise((r) => setTimeout(r, /[.!?]["”’)]*$/.test(c) ? (slow ? 550 : 350) : (slow ? 300 : 150)));
          }
        }
        if (onWord && chain === this._chain) onWord(-1);
      })();
    },

    _chain: 0,

    _speakOne(text, opts = {}) {
      const clean = String(text || '').replace(/_{2,}/g, 'blank').trim();
      const words = clean.split(/\s+/).filter(Boolean);
      const rate = opts.rate || this.rate;
      const onWord = typeof opts.onWord === 'function' ? opts.onWord : null;
      const token = ++this._token;

      // Thời lượng ước tính (dùng cho dự phòng)
      const estPerWord = words.map((w) => (180 + w.replace(/[^a-z]/gi, '').length * 62) / rate);
      const estTotal = estPerWord.reduce((a, b) => a + b, 0) + 400;

      return new Promise((resolve) => {
        let finished = false;
        let boundarySeen = false;
        let fallbackTimers = [];
        const finish = () => {
          if (finished) return;
          finished = true;
          fallbackTimers.forEach(clearTimeout);
          if (onWord && token === this._token) onWord(-1);
          resolve();
        };

        const runFallbackKaraoke = () => {
          if (!onWord) return;
          let t = 0;
          words.forEach((w, i) => {
            fallbackTimers.push(setTimeout(() => { if (!boundarySeen && token === this._token) onWord(i); }, t));
            t += estPerWord[i];
          });
        };

        if (!this.supported || !words.length) {
          runFallbackKaraoke();
          fallbackTimers.push(setTimeout(finish, words.length ? estTotal : 50));
          return;
        }

        try { synth.cancel(); } catch (e) { /* */ }

        // Bảng vị trí ký tự → chỉ số từ
        const starts = [];
        let pos = 0;
        words.forEach((w) => { const i = clean.indexOf(w, pos); starts.push(i); pos = i + w.length; });

        const u = new SpeechSynthesisUtterance(clean);
        u.lang = this.accent;
        if (this._voice) u.voice = this._voice;
        u.rate = rate;
        u.pitch = opts.pitch || 1.05;
        u.onboundary = (ev) => {
          if (!onWord || token !== this._token) return;
          if (ev.name && ev.name !== 'word') return;
          boundarySeen = true;
          let idx = 0;
          for (let i = 0; i < starts.length; i++) if (starts[i] <= ev.charIndex) idx = i;
          onWord(idx);
        };
        u.onend = finish;
        u.onerror = finish;

        // Safari đôi khi cần một nhịp trễ nhỏ sau cancel()
        setTimeout(() => {
          if (token !== this._token) return finish();
          try { synth.speak(u); } catch (e) { finish(); }
          // Nếu trình duyệt không bắn boundary trong 700ms → dùng karaoke hẹn giờ
          fallbackTimers.push(setTimeout(() => { if (!boundarySeen && !finished) runFallbackKaraoke(); }, 700));
          // An toàn: iOS có lúc không bắn onend
          fallbackTimers.push(setTimeout(finish, estTotal * 1.6 + 2500));
        }, 60);
      });
    },

    /** Giọng chậm: đọc TỪNG CHỮ một, nghỉ giữa các chữ. */
    async speakSlow(text, opts = {}) {
      const words = String(text || '').split(/\s+/).filter(Boolean);
      const id = ++this._slowId;
      for (let i = 0; i < words.length; i++) {
        if (id !== this._slowId) return;
        if (opts.onWord) opts.onWord(i);
        await this.speak(words[i], { rate: Math.min(0.6, this.rate * 0.85) });
        await new Promise((r) => setTimeout(r, 160));
      }
      if (opts.onWord) opts.onWord(-1);
      // Đọc lại cả cụm ở tốc độ chậm vừa
      if (id === this._slowId && words.length > 1) {
        await this.speak(text, { rate: Math.min(0.7, this.rate) });
      }
    }
  };

  /* ---------------- Listener (Speech Recognition) ---------------- */
  const SR = global.SpeechRecognition || global.webkitSpeechRecognition || null;
  const NUM_WORDS = { 0: 'zero', 1: 'one', 2: 'two', 3: 'three', 4: 'four', 5: 'five', 6: 'six', 7: 'seven', 8: 'eight', 9: 'nine', 10: 'ten',
    11: 'eleven', 12: 'twelve', 13: 'thirteen', 14: 'fourteen', 15: 'fifteen', 16: 'sixteen', 17: 'seventeen', 18: 'eighteen', 19: 'nineteen',
    20: 'twenty', 30: 'thirty', 40: 'forty', 50: 'fifty', 60: 'sixty', 70: 'seventy', 80: 'eighty', 90: 'ninety', 100: 'one hundred' };

  const Listener = {
    supported: !!SR,
    blocked: false,         // true khi bị từ chối quyền / dịch vụ không khả dụng (vd: iPad PWA standalone)
    _rec: null,
    _active: false,

    /** start({ onResult(alternatives[]), onError(code), onEnd() }) */
    start(handlers = {}) {
      if (!this.supported || this.blocked) { handlers.onError && handlers.onError('unsupported'); return false; }
      this.stop();
      // iPad: micro đang bị Recorder giữ sẽ làm SpeechRecognition lỗi 'audio-capture' → nhả ra trước
      if (global.Recorder && (global.Recorder._base || global.Recorder._stream)) global.Recorder.releaseAll();
      let rec;
      try { rec = new SR(); } catch (e) { this.blocked = true; handlers.onError && handlers.onError('unsupported'); return false; }
      rec.lang = Speech.accent || 'en-US';
      rec.interimResults = false;
      rec.continuous = false;
      rec.maxAlternatives = 4;
      let gotResult = false;
      rec.onresult = (ev) => {
        gotResult = true;
        const alts = [];
        for (let i = 0; i < ev.results.length; i++) {
          for (let j = 0; j < ev.results[i].length; j++) alts.push(ev.results[i][j].transcript);
        }
        if (this.onHeard && alts[0]) { try { this.onHeard(alts[0]); } catch (e) { /* */ } }
        handlers.onResult && handlers.onResult(alts);
      };
      rec.onerror = (ev) => {
        const code = ev.error || 'error';
        if (code === 'not-allowed' || code === 'service-not-allowed' || code === 'audio-capture') this.blocked = true;
        handlers.onError && handlers.onError(code);
      };
      rec.onend = () => {
        this._active = false;
        if (!gotResult) handlers.onEnd && handlers.onEnd(false);
        else handlers.onEnd && handlers.onEnd(true);
      };
      try {
        rec.start();
        this._rec = rec; this._active = true;
        // Tự dừng sau 8 giây để bé không bị kẹt
        clearTimeout(this._timer);
        this._timer = setTimeout(() => this.stop(), 8000);
        return true;
      } catch (e) {
        this.blocked = true;
        handlers.onError && handlers.onError('start-failed');
        return false;
      }
    },

    stop() {
      clearTimeout(this._timer);
      if (this._rec) { try { this._rec.stop(); } catch (e) { /* */ } }
      this._rec = null; this._active = false;
    },

    /** Chuẩn hóa câu để so khớp. */
    normalize(s) {
      return String(s || '').toLowerCase()
        // Bỏ dấu tiếng Việt thay vì xóa chữ: "Hà Nội" → "ha noi", "Đà Nẵng" → "da nang"
        .normalize('NFD').replace(/[\u0300-\u036f]/g, '').replace(/đ/g, 'd')
        .replace(/[’`]/g, "'")
        .replace(/\bp\.\s?e\.?/g, 'pe')
        .replace(/[^a-z0-9'\s-]/g, ' ')
        .replace(/-/g, ' ')
        .replace(/\b\d+\b/g, (n) => NUM_WORDS[n] || n)   // máy nhận diện hay ghi số: "2 cats" = "two cats"
        .replace(/\s+/g, ' ')
        .trim();
    },

    /** Hai từ "nghe giống nhau" – chấp nhận lỗi phát âm nhỏ của bé / lỗi nghe nhầm của máy
     *  (ruler ~ rula, pencil ~ pencils, elephant ~ elefant). Từ ngắn (≤ 3 chữ) phải đúng. */
    similar(a, b) {
      if (a === b) return true;
      if (!a || !b) return false;
      const strip = (w) => w.replace(/'s$/, '').replace(/(es|s)$/, '');
      if (strip(a) === strip(b)) return true;
      const key = (w) => strip(w).replace(/ph/g, 'f').replace(/ck/g, 'k').replace(/(.)\1+/g, '$1').replace(/r$/, '').replace(/[aeiouy]+$/, '');
      if (Math.min(a.length, b.length) >= 4 && key(a) === key(b)) return true;
      const m = Math.min(a.length, b.length);
      if (m < 4) return false;
      const maxD = m >= 7 ? 2 : 1;
      if (Math.abs(a.length - b.length) > maxD) return false;
      // Levenshtein có giới hạn
      let prev = Array.from({ length: b.length + 1 }, (_, j) => j);
      for (let i = 1; i <= a.length; i++) {
        const cur = [i];
        let rowMin = i;
        for (let j = 1; j <= b.length; j++) {
          cur[j] = Math.min(prev[j] + 1, cur[j - 1] + 1, prev[j - 1] + (a[i - 1] === b[j - 1] ? 0 : 1));
          rowMin = Math.min(rowMin, cur[j]);
        }
        if (rowMin > maxD) return false;
        prev = cur;
      }
      return prev[b.length] <= maxD;
    },

    /** Thay các từ máy nghe được bằng từ gần giống trong câu mẫu/từ khóa, để chấm theo ý chứ không bắt lỗi chính tả. */
    snap(raw, vocabText) {
      const vocab = [...new Set(this.normalize(vocabText).split(' ').filter((w) => w.length > 1))];
      return this.normalize(raw).split(' ').map((w) => (vocab.indexOf(w) !== -1 ? w : vocab.find((v) => this.similar(w, v)) || w)).join(' ');
    },

    /**
     * Chấm điểm độ khớp (0..1).
     * keywords: mảng; mỗi phần tử có thể là "a|b|c" (khớp 1 trong các lựa chọn).
     * Điểm = max(tỉ lệ từ khóa đúng, tỉ lệ từ trùng với câu gợi ý).
     */
    /**
     * Chấm câu trả lời NÓI theo ý định (thay cho đếm từ khóa rời):
     *  item = { q, keywords, hint, wrong: [các phương án sai] }
     *  ✔ câu đủ ý: chứa từ khóa của MỌI nhóm (nhóm = từ mang nghĩa, có từ đồng nghĩa)
     *  ✔ câu trả lời ngắn tự nhiên: "Yes, I do." cho câu hỏi Yes/No; "At six o'clock." / "A cat." cho câu hỏi Wh-
     *    (≤ 5 từ và chứa nhóm từ khóa nội dung – nhóm cuối)
     *  ✔ nói lại gần trọn câu mẫu (≥ 80% từ)
     *  ✘ câu giống phương án sai hơn giống câu mẫu → không đạt (chặn câu vô lý kiểu "I eat my bed.")
     *  Trả về { ok, score (0..1), text, reason: 'full'|'short'|'model'|'wrong'|'partial' }
     */
    judge(transcripts, item = {}) {
      const kws = item.keywords || [];
      const vocab = [item.hint || '', kws.join(' ').replace(/\|/g, ' '), (item.wrong || []).join(' ')].join(' ');
      const list = (Array.isArray(transcripts) ? transcripts : [transcripts]).filter(Boolean).map((t) => this.snap(t, vocab));
      const words = (s) => this.normalize(s).split(' ').filter((w) => w.length > 1);
      const overlap = (a, b) => { const A = words(a), B = new Set(words(b)); return A.length ? A.filter((w) => B.has(w)).length / A.length : 0; };
      const sim = (a, b) => Math.min(overlap(a, b), overlap(b, a));
      const groupHit = (t, k) => String(k).split('|').some((alt) => { const x = this.normalize(alt); return x && t.indexOf(' ' + x + ' ') !== -1; });
      // Câu trả lời ngắn Yes/No: phải đúng "chiều" với câu mẫu (câu mẫu "No, ..." thì "Yes, it does." là sai)
      const shortYN = (t) => /^ ?(yes|yeah|yep|sure|of course|i do|i can|i am|i did)\b/.test(t) ? 'yes'
        : /^ ?(no|nope|not really|never|i don't|i can't|i'm not|i didn't)\b/.test(t) ? 'no'
        : /^ ?(sometimes|usually|often|always)\b/.test(t) ? 'any' : '';
      const hintPol = item.hint ? (shortYN(' ' + this.normalize(item.hint) + ' ') === 'any' ? '' : shortYN(' ' + this.normalize(item.hint) + ' ')) : '';
      const yesNoQ = /^(do|does|did|is|are|am|was|were|can|could|will|would|have|has|should|shall|may)\b/i.test(String(item.q || '').trim());
      let best = { ok: false, score: 0, text: list[0] || '', reason: 'partial' };
      for (const raw of list) {
        const t = ' ' + this.normalize(raw) + ' ';
        const n = words(raw).length;
        const hit = kws.map((k) => groupHit(t, k));
        const kw = kws.length ? hit.filter(Boolean).length / kws.length : 0;
        const ov = item.hint ? overlap(item.hint, raw) : 0;
        const wrongSim = Math.max(0, ...(item.wrong || []).map((w) => sim(w, raw)));
        let r;
        if (wrongSim >= 0.6 && wrongSim > sim(item.hint || '', raw)) r = { ok: false, score: 0.2, reason: 'wrong' };
        else if (kws.length && kw === 1) r = { ok: true, score: 1, reason: 'full' };
        else if (yesNoQ && shortYN(t) && (!hintPol || shortYN(t) === hintPol || shortYN(t) === 'any')) r = { ok: true, score: 0.9, reason: 'short' };
        else if (!yesNoQ && kws.length && n <= 5 && hit[kws.length - 1]) r = { ok: true, score: 0.9, reason: 'short' };
        else if (ov >= 0.8) r = { ok: true, score: 0.95, reason: 'model' };
        else r = { ok: false, score: Math.min(0.69, Math.max(kw, ov) * 0.69), reason: 'partial' };
        if (r.ok && !best.ok || r.score > best.score) best = Object.assign(r, { text: raw });
      }
      return best;
    },

    score(transcripts, keywords = [], hint = '') {
      const vocab = hint + ' ' + keywords.join(' ').replace(/\|/g, ' ');
      const list = (Array.isArray(transcripts) ? transcripts : [transcripts]).filter(Boolean).map((t) => this.snap(t, vocab));
      let best = 0, bestText = list[0] || '';
      for (const raw of list) {
        const t = ' ' + this.normalize(raw) + ' ';
        let kw = 0;
        if (keywords.length) {
          let hit = 0;
          keywords.forEach((k) => {
            const ok = String(k).split('|').some((alt) => {
              const a = this.normalize(alt);
              return a && t.indexOf(' ' + a + ' ') !== -1;
            });
            if (ok) hit++;
          });
          kw = hit / keywords.length;
        }
        let ov = 0;
        if (hint) {
          const hw = this.normalize(hint).split(' ').filter((w) => w.length > 1);
          const tw = new Set(this.normalize(raw).split(' '));
          if (hw.length) ov = hw.filter((w) => tw.has(w)).length / hw.length;
        }
        const s = Math.max(kw, ov);
        if (s > best) { best = s; bestText = raw; }
      }
      return { score: best, text: bestText };
    }
  };

  /* ---------------- Recorder (Thu âm nghe lại + Sóng âm cho Phòng thu Shadowing) ---------------- */
  const Recorder = {
    supported: !!(global.navigator && navigator.mediaDevices && navigator.mediaDevices.getUserMedia && global.MediaRecorder),
    _stream: null,
    _rec: null,
    _chunks: [],
    _url: null,
    _ctx: null,
    _an: null,
    _anStream: null,
    _buf: null,

    /** Gắn AnalyserNode vào luồng micro (không nối ra loa → không bị hú). */
    _attachAnalyser() {
      try {
        const AC = global.AudioContext || global.webkitAudioContext;
        if (!AC || !this._stream) return;
        // Dùng chung AudioContext với hiệu ứng âm thanh (iPad giới hạn số AudioContext)
        let ctx = (global.Sfx && global.Sfx.ctx) || this._ctx;
        if (!ctx) ctx = this._ctx = new AC();
        if (ctx.state !== 'running' && ctx.resume) { try { const p = ctx.resume(); if (p && p.catch) p.catch(() => {}); } catch (e) { /* */ } }   // iPad: 'suspended' hoặc 'interrupted'
        // Mỗi lần ghi tạo nút nguồn mới: nút cũ có thể ngừng nhận dữ liệu khi micro được giữ mở lâu
        if (this._anSrc) { try { this._anSrc.disconnect(); } catch (e) { /* */ } }
        const src = ctx.createMediaStreamSource(this._stream);
        const an = ctx.createAnalyser();
        an.fftSize = 512;
        an.smoothingTimeConstant = 0.55;
        src.connect(an);
        this._an = an; this._anStream = this._stream; this._anSrc = src;
        this._buf = new Uint8Array(an.frequencyBinCount);
      } catch (e) { this._an = null; }
    },

    /** Mức âm lượng theo n dải tần giọng nói (≈ 90 Hz – 4 kHz), mỗi giá trị 0..1. null nếu không có dữ liệu. */
    levels(n = 10) {
      if (!this._an || !this.isRecording()) return null;
      this._an.getByteFrequencyData(this._buf);
      const binHz = (this._an.context.sampleRate || 48000) / this._an.fftSize;
      const lo = Math.max(1, Math.floor(90 / binHz));
      const hi = Math.min(this._buf.length - 1, Math.ceil(4000 / binHz));
      const span = (hi - lo + 1) / n;
      const out = [];
      for (let k = 0; k < n; k++) {
        const a = lo + Math.floor(k * span);
        const b = Math.max(a + 1, lo + Math.floor((k + 1) * span));
        let sum = 0;
        for (let i = a; i < b; i++) sum += this._buf[i];
        const v = sum / (b - a) / 255;
        out.push(Math.min(1, Math.max(0, (v - 0.1) * 1.9)));
      }
      return out;
    },

    hasRecording() { return !!this._url; },

    /* ---- Nhận biết giọng nói (VAD đơn giản theo độ lớn âm thanh) ----
       voiceMs: tổng thời gian có tiếng nói trong lần ghi gần nhất (ms); null = không đo được (không có Analyser). */
    voiceMs: null,
    peak: 0,
    _floor: 0.01,
    /* Ngưỡng nghe giọng (v1.9.2 – sửa lỗi "nói to mà không ghi nhận"):
       - Bản cũ đo ồn nền trong 250 ms đầu – đúng lúc loa phát tiếng "bíp" báo bật micro → ồn nền bị tính rất to,
         ngưỡng bị đẩy lên gấp 3 lần (tới 0.2) → bé phải hét mới được tính. Ồn nền còn bị kéo lên dần bởi chính
         những đoạn nói nhỏ (cuối từ, phụ âm) → càng nói ngưỡng càng cao.
       - Bản mới: tiếng bíp phát trước khi ghi, chỉ bỏ 150 ms đầu (tiếng chạm), ồn nền lấy mức THẤP (tụt nhanh, tăng rất chậm) và bị chặn trần, ngưỡng nằm
         trong khoảng 0.016 – 0.055; chỉ tính đoạn có tiếng liên tục ≥ 150 ms; "đủ to" tính tương đối theo ồn nền. */
    _thr(floor) { return Math.max(0.016, Math.min(0.055, floor * 2.6)); },
    _peakNeed(floor) { return Math.max(0.03, Math.min(0.07, floor * 4)); },
    _vad(opts) {
      clearInterval(this._vadTimer);
      this.voiceMs = this._an ? 0 : null;
      this.peak = 0; this._floor = 0.01; this._liveMax = 0;
      if (!this._an) return;
      const STEP = 50, buf = new Uint8Array(this._an.fftSize);
      const SKIP = 150, cal = [];
      let floor = 0.01, calibrated = false, lastVoice = 0, run = 0;
      const started = Date.now();
      this._vadTimer = setInterval(() => {
        if (!this._an || !this.isRecording()) { clearInterval(this._vadTimer); return; }
        this._an.getByteTimeDomainData(buf);
        let sum = 0;
        for (let i = 0; i < buf.length; i++) { const v = (buf[i] - 128) / 128; sum += v * v; }
        const rms = Math.sqrt(sum / buf.length);
        this._liveMax = Math.max(this._liveMax, rms);
        const now = Date.now();
        if (now - started < SKIP) { cal.push(rms); return; }
        if (!calibrated) {
          calibrated = true;
          // Lấy mức thấp nhất của đoạn đầu (bỏ qua tiếng bíp / tiếng chạm), chặn trần để không đẩy ngưỡng lên cao
          const sorted = cal.concat([rms]).sort((x, y) => x - y);
          floor = Math.min(0.02, sorted[0] || 0.01);
        }
        const thr = this._thr(floor);
        if (rms > thr) {
          run++;
          if (run === 3) this.voiceMs += 3 * STEP; else if (run > 3) this.voiceMs += STEP;
          if (run >= 3) { lastVoice = now; this.peak = Math.max(this.peak, rms); }
        } else {
          run = 0;
          // Ồn nền: tụt nhanh khi yên lặng hơn, tăng rất chậm (không để đoạn nói nhỏ kéo ngưỡng lên)
          floor = rms < floor ? floor * 0.7 + rms * 0.3 : Math.min(0.02, floor * 0.985 + rms * 0.015);
        }
        this._floor = floor;
        // Tự dừng khi con đã nói xong (im lặng sau khi có tiếng) – tiện cho bé, không cần bấm Dừng
        if (opts.autoStop && this.voiceMs >= (opts.minVoiceMs || 300) && now - lastVoice > (opts.silenceMs || 1300)) {
          clearInterval(this._vadTimer);
          if (opts.onAuto) opts.onAuto('silence');
        }
      }, STEP);
    },

    /** Đo lại trên CHÍNH file ghi âm (sau khi dừng). Dùng khi bộ đo trực tiếp không nhận được dữ liệu
     *  (iPad có lúc tạm dừng AudioContext khi chuyển chế độ micro/loa) – bé nói thật thì file ghi âm có tiếng. */
    async _offlineVoice(blob) {
      const ctx = (global.Sfx && global.Sfx.ctx) || this._ctx;
      if (!ctx || !ctx.decodeAudioData || !blob || !blob.arrayBuffer || !blob.size) return null;
      try {
        const ab = await blob.arrayBuffer();
        const audio = await Promise.race([
          new Promise((res, rej) => { const p = ctx.decodeAudioData(ab, res, rej); if (p && p.then) p.then(res, rej); }),
          new Promise((res) => setTimeout(() => res(null), 2500))
        ]);
        if (!audio) return null;
        this._decoded = audio;
        const data = audio.getChannelData(0), sr = audio.sampleRate, hop = Math.round(sr * 0.05);
        const frames = [];
        for (let i = Math.round(sr * 0.15); i + hop <= data.length; i += hop) {
          let sum = 0;
          for (let j = i; j < i + hop; j++) sum += data[j] * data[j];
          frames.push(Math.sqrt(sum / hop));
        }
        if (!frames.length) return { voiceMs: 0, peak: 0, floor: 0.01 };
        const sorted = frames.slice().sort((x, y) => x - y);
        const floor = Math.min(0.02, sorted[Math.floor(sorted.length * 0.15)]);
        const thr = this._thr(floor);
        let run = 0, ms = 0, peak = 0;
        frames.forEach((r) => {
          if (r > thr) { run++; if (run === 3) ms += 150; else if (run > 3) ms += 50; if (run >= 3) peak = Math.max(peak, r); } else run = 0;
        });
        return { voiceMs: ms, peak, floor };
      } catch (e) { return null; }
    },

    /** Âm lượng tức thời (RMS 0..1) của micro khi đang ghi – dùng cho nút Thử micro. */
    rms() {
      if (!this._an || !this.isRecording()) return 0;
      const buf = this._tdBuf || (this._tdBuf = new Uint8Array(this._an.fftSize));
      if (buf.length !== this._an.fftSize) this._tdBuf = new Uint8Array(this._an.fftSize);
      this._an.getByteTimeDomainData(this._tdBuf);
      let sum = 0;
      for (let i = 0; i < this._tdBuf.length; i++) { const v = (this._tdBuf[i] - 128) / 128; sum += v * v; }
      return Math.sqrt(sum / this._tdBuf.length);
    },
    /** Đã nghe thấy giọng con chưa? (true nếu không đo được – không chặn bé vì lỗi thiết bị) */
    heardVoice(minMs = 300) { return this.voiceMs === null || (this.voiceMs >= minMs && (this.peak || 0) >= this._peakNeed(this._floor || 0.01)); },

    /** start({ maxMs, autoStop, silenceMs, onAuto(reason) }) */
    async start(opts = {}) {
      if (!this.supported) throw new Error('unsupported');
      if (this._base && !this._base.getAudioTracks().some((t) => t.readyState === 'live')) this.release(true);
      if (!this._base) {
        // iOS 17+: phát giọng mẫu ra loa ngoài khi micro đang mở
        try { if (navigator.audioSession) navigator.audioSession.type = 'play-and-record'; } catch (e) { /* */ }
        // Không chờ mãi nếu iPad không trả lời xin quyền micro
        this._base = await Promise.race([
          navigator.mediaDevices.getUserMedia({ audio: true }),
          new Promise((_, rej) => setTimeout(() => rej(new Error('mic-timeout')), 15000))
        ]);
      }
      // iPad mở từ Màn hình chính hỏi quyền micro MỖI LẦN gọi getUserMedia → giữ luồng micro gốc (_base) mở cho cả
      // buổi học, chỉ nhả khi đóng bài / Gym hoặc khi app chạy nền (releaseAll). Mỗi lần ghi dùng một bản sao track
      // (clone không cần xin quyền lại) để MediaRecorder và bộ đo âm lượng luôn nhận dữ liệu mới.
      this._hold = true;
      // Tiếng "bíp" phát TRƯỚC khi bắt đầu ghi: không lọt vào phần đo ồn nền, bé nghe bíp xong là nói
      if (opts.beep !== false && global.Sfx && global.Sfx.playMicOn) {
        try { global.Sfx.playMicOn(); } catch (e) { /* */ }
        await new Promise((r) => setTimeout(r, 260));
      }
      this._dropClone();
      try {
        this._stream = new MediaStream(this._base.getAudioTracks().map((t) => t.clone()));
        this._clone = true;
      } catch (e) { this._stream = this._base; this._clone = false; }
      this._attachAnalyser();
      this._chunks = [];
      let mime = '';
      ['audio/mp4', 'audio/webm;codecs=opus', 'audio/webm', 'audio/aac'].some((m) => {
        if (global.MediaRecorder.isTypeSupported && MediaRecorder.isTypeSupported(m)) { mime = m; return true; }
        return false;
      });
      this._rec = mime ? new MediaRecorder(this._stream, { mimeType: mime }) : new MediaRecorder(this._stream);
      this._rec.ondataavailable = (e) => { if (e.data && e.data.size) this._chunks.push(e.data); };
      this._rec.start();
      this._vad(opts);
      clearTimeout(this._timer);
      this._timer = setTimeout(() => {
        if (!this._rec || this._rec.state !== 'recording') return;
        if (opts.onAuto) opts.onAuto('max'); else this._rec.stop();
      }, opts.maxMs || 10000);
    },

    stop() {
      return new Promise((resolve) => {
        clearTimeout(this._timer);
        clearInterval(this._vadTimer);
        if (!this._rec || this._rec.state === 'inactive') {
          this.release();
          resolve(this._url);
          return;
        }
        let ended = false;
        // iPad có lúc không bắn "onstop" → sau 2 giây tự hoàn tất để app không bị treo
        const guard = setTimeout(() => { if (!ended && this._rec) this._rec.onstop(); }, 2000);
        this._rec.onstop = () => {
          if (ended) return; ended = true; clearTimeout(guard);
          if (this._url) URL.revokeObjectURL(this._url);
          const blob = new Blob(this._chunks, { type: this._rec.mimeType || 'audio/mp4' });
          this.lastBlob = blob; this._decoded = null;
          this._url = URL.createObjectURL(blob);
          this.release();   // giữ micro nếu đang trong buổi học (_hold), tránh iPad hỏi quyền lại
          const report = () => {
            // Báo thời gian nói thật cho app (chỉ khi thật sự có tiếng nói)
            if (this.onVoice && this.voiceMs >= 250 && (this.peak || 0) >= this._peakNeed(this._floor || 0.01)) { try { this.onVoice(this.voiceMs); } catch (e) { /* */ } }
            resolve(this._url);
          };
          // Bộ đo trực tiếp "câm" (không nhận được tín hiệu nào) hoặc chưa nghe thấy giọng → đo lại trên file ghi âm
          const liveDead = this.voiceMs !== null && (this._liveMax || 0) < 0.002;
          if (this.voiceMs === null || liveDead || !this.heardVoice(250)) {
            this._offlineVoice(blob).then((off) => {
              if (off && (liveDead || this.voiceMs === null || off.voiceMs > (this.voiceMs || 0))) {
                this.voiceMs = off.voiceMs; this.peak = off.peak; this._floor = off.floor;
              } else if (liveDead && !off) this.voiceMs = null;   // không đo được → không chặn bé vì lỗi thiết bị
              report();
            });
          } else report();
        };
        this._rec.stop();
      });
    },

    /** Kết thúc buổi học: nhả hẳn micro (tắt chấm cam, iPad về chế độ loa thường). */
    releaseAll() {
      this._hold = false;
      if (this._rec && this._rec.state === 'recording') { try { this._rec.stop(); } catch (e) { /* */ } }
      this.release(true);
      try { if (navigator.audioSession) navigator.audioSession.type = 'auto'; } catch (e) { /* */ }
    },

    isRecording() { return !!(this._rec && this._rec.state === 'recording'); },

    /** Phát lại giọng con. Dùng Web Audio (AudioContext đã được mở khóa bằng thao tác chạm) vì iPad hay chặn
     *  thẻ <audio> phát sau một chuỗi await; có khuếch đại nhẹ vì khi micro mở iPad phát nhỏ hơn. */
    play(blob) {
      const b = blob || this.lastBlob;
      if (!b) return Promise.resolve();
      const ctx = global.Sfx && global.Sfx.ctx;
      const viaElement = () => new Promise((resolve) => {
        const url = blob ? URL.createObjectURL(b) : this._url;
        const a = new Audio(url);
        const done = () => { if (blob) URL.revokeObjectURL(url); resolve(); };
        a.onended = done; a.onerror = done;
        a.play().catch(done);
      });
      if (!ctx || !ctx.decodeAudioData || !b.arrayBuffer) return viaElement();
      return (async () => {
        try {
          if (ctx.state === 'suspended') await ctx.resume();
          let audio = !blob && this._decoded;
          if (!audio) {
            const ab = await b.arrayBuffer();
            audio = await new Promise((res, rej) => { const p = ctx.decodeAudioData(ab, res, rej); if (p && p.then) p.then(res, rej); });
            if (!blob) this._decoded = audio;
          }
          await new Promise((resolve) => {
            const src = ctx.createBufferSource();
            const g = ctx.createGain();
            g.gain.value = 1.8;
            src.buffer = audio;
            src.connect(g); g.connect(ctx.destination);
            src.onended = resolve;
            src.start(0);
            setTimeout(resolve, audio.duration * 1000 + 400);
          });
        } catch (e) { await viaElement(); }
      })();
    },

    /** Nhả micro. Trong buổi học (_hold) chỉ dừng ghi, giữ luồng micro; force = nhả hẳn. */
    release(force) {
      if (this.isRecording()) { try { this._rec.stop(); } catch (e) { /* */ } }
      this._dropClone();
      if (this._hold && !force) return;
      if (this._base) { this._base.getTracks().forEach((t) => t.stop()); this._base = null; }
    },

    _dropClone() {
      if (this._anSrc) { try { this._anSrc.disconnect(); } catch (e) { /* */ } }
      this._an = null; this._anStream = null; this._anSrc = null;
      if (this._stream && this._clone) this._stream.getTracks().forEach((t) => t.stop());
      this._stream = null; this._clone = false;
    }
  };

  Speech.init();
  // App chạy nền / tắt màn hình → nhả micro
  if (global.document) document.addEventListener('visibilitychange', () => { if (document.hidden) Recorder.releaseAll(); });

  global.SoundEngine = SoundEngine;
  global.Sfx = new SoundEngine();
  global.Speech = Speech;
  global.Listener = Listener;
  global.Recorder = Recorder;
})(window);
