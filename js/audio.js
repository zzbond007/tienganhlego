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
    rate: 0.9,
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
      this._slowId++;
      if (this.supported) { try { synth.cancel(); } catch (e) { /* */ } }
    },

    /**
     * Đọc một câu. Trả về Promise khi đọc xong.
     * opts.rate, opts.onWord(index) – karaoke theo từ (dùng boundary event, có dự phòng hẹn giờ).
     */
    speak(text, opts = {}) {
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
        await this.speak(words[i], { rate: 0.62 });
        await new Promise((r) => setTimeout(r, 160));
      }
      if (opts.onWord) opts.onWord(-1);
      // Đọc lại cả cụm ở tốc độ chậm vừa
      if (id === this._slowId && words.length > 1) {
        await this.speak(text, { rate: 0.7 });
      }
    }
  };

  /* ---------------- Listener (Speech Recognition) ---------------- */
  const SR = global.SpeechRecognition || global.webkitSpeechRecognition || null;

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
      if (global.Recorder && global.Recorder._stream) global.Recorder.release();
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
        .replace(/[’`]/g, "'")
        .replace(/\bp\.\s?e\.?/g, 'pe')
        .replace(/[^a-z0-9'\s-]/g, ' ')
        .replace(/-/g, ' ')
        .replace(/\s+/g, ' ')
        .trim();
    },

    /**
     * Chấm điểm độ khớp (0..1).
     * keywords: mảng; mỗi phần tử có thể là "a|b|c" (khớp 1 trong các lựa chọn).
     * Điểm = max(tỉ lệ từ khóa đúng, tỉ lệ từ trùng với câu gợi ý).
     */
    score(transcripts, keywords = [], hint = '') {
      const list = Array.isArray(transcripts) ? transcripts : [transcripts];
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
        if (ctx.state === 'suspended' && ctx.resume) ctx.resume();
        if (this._an && this._anStream === this._stream) return;
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
    _vad(opts) {
      clearInterval(this._vadTimer);
      this.voiceMs = this._an ? 0 : null;
      if (!this._an) return;
      const STEP = 50, buf = new Uint8Array(this._an.fftSize);
      let floor = 0.012, lastVoice = 0, started = Date.now();
      this._vadTimer = setInterval(() => {
        if (!this._an || !this.isRecording()) { clearInterval(this._vadTimer); return; }
        this._an.getByteTimeDomainData(buf);
        let sum = 0;
        for (let i = 0; i < buf.length; i++) { const v = (buf[i] - 128) / 128; sum += v * v; }
        const rms = Math.sqrt(sum / buf.length);
        const now = Date.now();
        // Ngưỡng thích nghi với tiếng ồn nền trong 400 ms đầu
        if (now - started < 400 && rms < 0.025) floor = Math.max(floor, rms);
        if (rms > Math.max(0.03, floor * 2.5)) { this.voiceMs += STEP; lastVoice = now; }
        // Tự dừng khi con đã nói xong (im lặng sau khi có tiếng) – tiện cho bé, không cần bấm Dừng
        if (opts.autoStop && this.voiceMs >= (opts.minVoiceMs || 300) && now - lastVoice > (opts.silenceMs || 1100)) {
          clearInterval(this._vadTimer);
          if (opts.onAuto) opts.onAuto('silence');
        }
      }, STEP);
    },
    /** Đã nghe thấy giọng con chưa? (true nếu không đo được – không chặn bé vì lỗi thiết bị) */
    heardVoice(minMs = 300) { return this.voiceMs === null || this.voiceMs >= minMs; },

    /** start({ maxMs, autoStop, silenceMs, onAuto(reason) }) */
    async start(opts = {}) {
      if (!this.supported) throw new Error('unsupported');
      if (!this._stream) this._stream = await navigator.mediaDevices.getUserMedia({ audio: true });
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
        this._rec.onstop = () => {
          if (this._url) URL.revokeObjectURL(this._url);
          const blob = new Blob(this._chunks, { type: this._rec.mimeType || 'audio/mp4' });
          this._url = URL.createObjectURL(blob);
          // Nhả micro ngay: iPad thoát chế độ đàm thoại (loa to, hết rè) và tắt chấm cam trên thanh trạng thái
          this.release();
          resolve(this._url);
        };
        this._rec.stop();
      });
    },

    isRecording() { return !!(this._rec && this._rec.state === 'recording'); },

    play() {
      if (!this._url) return Promise.resolve();
      return new Promise((resolve) => {
        const a = new Audio(this._url);
        a.onended = resolve; a.onerror = resolve;
        a.play().catch(resolve);
      });
    },

    release() {
      if (this._stream) { this._stream.getTracks().forEach((t) => t.stop()); this._stream = null; }
      if (this._anSrc) { try { this._anSrc.disconnect(); } catch (e) { /* */ } }
      this._an = null; this._anStream = null; this._anSrc = null;
    }
  };

  Speech.init();

  global.SoundEngine = SoundEngine;
  global.Sfx = new SoundEngine();
  global.Speech = Speech;
  global.Listener = Listener;
  global.Recorder = Recorder;
})(window);
