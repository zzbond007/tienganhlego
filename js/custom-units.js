/* =========================================================
   custom-units.js – Custom Unit Importer (Trình nhập bài học cho Bố mẹ)
   Bố mẹ dán một đoạn JSON (có thể nhờ AI tạo từ SGK trên lớp) → thành một Vùng đất mới
   với đủ 6 bước học, Snowball, hội thoại rẽ nhánh, Mystery Mission và mô hình LEGO 12 mảnh.
   - parse(text): kiểm tra & chuẩn hóa, phần nào thiếu thì tự sinh từ từ vựng (kèm cảnh báo)
   - register(unit) / unregister(id) / syncAll(units): gắn vào Curriculum + LegoSvg
   ========================================================= */
(function (global) {
  'use strict';

  const FORMAT = 'lego-english-unit';
  const POS = ['verb', 'noun', 'adj', 'adv', 'phrase', 'prep'];
  const TONES = ['yes', 'no', 'idea', 'ask', 'calm'];
  const PALETTE = ['#8E44AD', '#0E7490', '#C2410C', '#BE185D', '#4D7C0F', '#1D4ED8', '#B45309', '#7C3AED'];
  const MAX_LESSONS = 4;
  const FIGS = {
    a: 'hair-blonde|smile|torso-blue|legs-blue|book',
    b: 'cap-red|grin|torso-red|legs-black|none'
  };

  /* ---------- Tiện ích làm sạch dữ liệu (chặn chèn HTML) ---------- */
  const str = (v, max = 240) => (typeof v === 'string' || typeof v === 'number' ? String(v) : '')
    .replace(/[<>]/g, '').replace(/\s+/g, ' ').trim().slice(0, max);
  const emo = (v, fallback) => {
    const s = str(v, 16).replace(/[&"'`=\\/]/g, '');
    return s || fallback;
  };
  const arr = (v) => (Array.isArray(v) ? v : []);
  const slug = (s) => String(s).toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
  const escRe = (s) => s.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  const core = (en) => en.replace(/\.\.\.|…/g, '').replace(/[?!.]+$/, '').trim();

  function hasText(s) { return typeof s === 'string' && s.trim().length > 0; }

  /** Kiểm tra & chuẩn hóa. Trả về { ok, data, errors[], warnings[] } – data ở dạng "thân thiện" đã đủ trường. */
  function parse(input) {
    const errors = [], warnings = [];
    let obj = input;
    if (typeof input === 'string') {
      let text = input.trim();
      // Cho phép dán cả khối ```json ... ``` do AI trả về
      const fence = text.match(/```(?:json)?\s*([\s\S]*?)```/i);
      if (fence) text = fence[1].trim();
      if (!text) return { ok: false, errors: ['Ô nhập đang trống – hãy dán đoạn JSON vào.'], warnings };
      try { obj = JSON.parse(text); } catch (e) {
        return { ok: false, errors: ['JSON không đúng cú pháp: ' + e.message + '. Hãy kiểm tra dấu phẩy, ngoặc kép và ngoặc nhọn.'], warnings };
      }
    }
    if (!obj || typeof obj !== 'object' || Array.isArray(obj)) return { ok: false, errors: ['JSON phải là một đối tượng { ... } mô tả 1 Unit.'], warnings };
    if (obj.format && obj.format !== FORMAT) warnings.push(`Trường "format" nên là "${FORMAT}".`);

    const name = str(obj.name, 60);
    if (!name) errors.push('Thiếu "name" (tên Unit, ví dụ "Unit 5: Things we can do").');
    let color = str(obj.color, 7);
    if (!/^#[0-9a-fA-F]{6}$/.test(color)) {
      if (obj.color) warnings.push('"color" phải có dạng #RRGGBB – đã chọn màu mặc định.');
      color = '';
    }
    const chars = obj.characters && typeof obj.characters === 'object' ? obj.characters : {};
    const data = {
      format: FORMAT,
      name,
      nameVi: str(obj.nameVi, 80),
      topic: str(obj.topic, 60) || name,
      topicVi: str(obj.topicVi, 80) || str(obj.nameVi, 80),
      icon: emo(obj.icon, '📘'),
      color,
      characters: { a: str(chars.a, 18) || 'Mia', b: str(chars.b, 18) || 'Leo' },
      lessons: []
    };

    const lessons = arr(obj.lessons);
    if (!lessons.length) errors.push('Thiếu "lessons" – cần 1 đến 4 bài học.');
    if (lessons.length > MAX_LESSONS) warnings.push(`Chỉ dùng ${MAX_LESSONS} bài đầu tiên (mỗi Vùng đất tối đa ${MAX_LESSONS} bài).`);
    const seen = new Set();

    lessons.slice(0, MAX_LESSONS).forEach((L, li) => {
      const tag = `Bài ${li + 1}`;
      if (!L || typeof L !== 'object') { errors.push(`${tag}: phải là một đối tượng { ... }.`); return; }
      const words = [];
      arr(L.words).forEach((w, wi) => {
        if (!w || !hasText(w.en) || !hasText(w.vi)) { warnings.push(`${tag}, từ ${wi + 1}: thiếu "en" hoặc "vi" – đã bỏ qua.`); return; }
        const en = str(w.en, 50);
        const id = slug(en);
        if (!id) { warnings.push(`${tag}: từ "${en}" không có chữ cái tiếng Anh – đã bỏ qua.`); return; }
        if (seen.has(id)) { warnings.push(`${tag}: từ "${en}" bị trùng – đã bỏ qua.`); return; }
        seen.add(id);
        const pos = POS.indexOf(w.pos) !== -1 ? w.pos : (en.indexOf(' ') !== -1 ? 'phrase' : 'noun');
        const ex = str(w.example, 140) || `I know the word "${en}".`;
        words.push({
          en, pos, ipa: str(w.ipa, 60), vi: str(w.vi, 80), emoji: emo(w.emoji, '🧱'),
          example: ex, exampleVi: str(w.exampleVi, 160) || (hasText(w.example) ? '' : `Mình biết từ "${en}".`),
          clue: str(w.clue, 140) || `It means "${str(w.vi, 80)}" in Vietnamese.`
        });
      });
      if (words.length < 3) { errors.push(`${tag}: cần ít nhất 3 từ vựng hợp lệ (có "en" và "vi"). Hiện có ${words.length}.`); return; }
      if (words.length > 8) { warnings.push(`${tag}: chỉ dùng 8 từ đầu tiên.`); words.length = 8; }

      const lesson = {
        title: str(L.title, 50) || `Lesson ${li + 1}`,
        titleVi: str(L.titleVi, 70) || `Bài ${li + 1}`,
        icon: emo(L.icon, '📘'),
        words
      };
      lesson.comic = cleanComic(L.comic, words, tag, warnings);
      lesson.build = cleanBuild(L.build, words, tag, warnings);
      lesson.talk = cleanTalk(L.talk, words, tag, warnings);
      lesson.snowball = cleanSnow(L.snowball, tag, warnings);
      lesson.comicChoice = cleanChoice(L.comicChoice, `${tag} – comicChoice`, warnings);
      lesson.talkChoice = cleanChoice(L.talkChoice, `${tag} – talkChoice`, warnings);
      data.lessons.push(lesson);
    });

    data.mystery = cleanMystery(obj.mystery, warnings);
    if (!errors.length && !data.lessons.length) errors.push('Không có bài học hợp lệ nào.');
    return { ok: errors.length === 0, data, errors, warnings };
  }

  /* ---------- Từng phần của bài học: hợp lệ thì giữ, thiếu thì tự sinh ---------- */
  function cleanComic(c, words, tag, warnings) {
    let panels = arr(c && c.panels).map((p) => ({
      who: p && p.who === 'b' ? 'b' : 'a',
      text: str(p && p.text, 140), vi: str(p && p.vi, 160), prop: emo(p && p.prop, '')
    })).filter((p) => p.text);
    let auto = false;
    if (panels.length < 2) {
      if (c) warnings.push(`${tag}: truyện tranh cần ít nhất 2 khung – đã tự tạo từ câu ví dụ.`);
      panels = words.slice(0, 4).map((w, i) => ({ who: i % 2 ? 'b' : 'a', text: w.example, vi: w.exampleVi, prop: w.emoji }));
      auto = true;
    }
    panels = panels.slice(0, 6);
    let blanks = auto ? [] : arr(c && c.blanks).map((b) => {
      const panel = Number(b && b.panel);
      const answer = str(b && b.answer, 60);
      let options = arr(b && b.options).map((o) => str(o, 60)).filter(Boolean);
      if (!panels[panel] || !answer || panels[panel].text.indexOf(answer) === -1) {
        warnings.push(`${tag}: chỗ trống "${answer}" không khớp đúng chữ trong khung ${panel} (khung đếm từ 0) – đã bỏ.`);
        return null;
      }
      if (options.indexOf(answer) === -1) options.unshift(answer);
      options = Array.from(new Set(options)).slice(0, 4);
      if (options.length < 2) options = autoOptions(answer, words);
      return { panel, answer, options };
    }).filter(Boolean);
    if (!blanks.length) {
      panels.forEach((p, i) => {
        if (blanks.length >= 2) return;
        const w = words.find((x) => p.text.toLowerCase().indexOf(core(x.en).toLowerCase()) !== -1 && core(x.en));
        if (!w) return;
        const at = p.text.toLowerCase().indexOf(core(w.en).toLowerCase());
        const answer = p.text.substr(at, core(w.en).length);
        blanks.push({ panel: i, answer, options: autoOptions(answer, words) });
      });
    }
    return { title: str(c && c.title, 60) || 'Comic Time', titleVi: str(c && c.titleVi, 80) || 'Truyện tranh', panels, blanks };
  }

  function autoOptions(answer, words) {
    const others = words.map((w) => core(w.en)).filter((x) => x && x.toLowerCase() !== answer.toLowerCase());
    return [answer].concat(others.slice(0, 2));
  }

  function cleanBuild(b, words, tag, warnings) {
    let out = arr(b).map((s) => {
      const bricks = arr(s && (s.bricks || s.a)).map((t) => str(t, 40)).filter(Boolean);
      if (bricks.length < 2) return null;
      return { vi: str(s.vi, 140) || 'Em hãy lắp câu tiếng Anh', bricks, extra: arr(s.extra || s.x).map((t) => str(t, 40)).filter((t) => t && bricks.indexOf(t) === -1).slice(0, 4) };
    }).filter(Boolean).slice(0, 4);
    if (!out.length) {
      if (b) warnings.push(`${tag}: "build" chưa hợp lệ – đã tự tạo câu lắp ráp từ câu ví dụ.`);
      out = words.slice(0, 2).map((w, i) => {
        const bricks = global.Curriculum.chunkSentence(w.example, 4);
        const other = words[(i + 2) % words.length];
        const extra = other.example.split(' ').filter((x) => bricks.join(' ').indexOf(x) === -1).slice(0, 2);
        return { vi: `Em muốn nói: ${w.exampleVi || w.vi}`, bricks, extra };
      }).filter((s) => s.bricks.length >= 2);
    }
    return out;
  }

  function cleanTalk(t, words, tag, warnings) {
    let out = arr(t).map((x) => {
      const q = str(x && x.q, 140);
      const hint = str(x && x.hint, 140);
      let choices = arr(x && x.choices).map((c) => str(c, 140)).filter(Boolean);
      if (!q || !hint) return null;
      if (choices.indexOf(hint) === -1 && !choices.length) choices = [hint];
      if (choices.length < 2) return null;
      let keywords = arr(x.keywords).map((k) => str(k, 80)).filter(Boolean).slice(0, 4);
      if (!keywords.length) keywords = hint.toLowerCase().replace(/[^a-z' ]/g, ' ').split(/\s+/).filter((w) => w.length > 3).slice(0, 2);
      return { q, vi: str(x.vi, 160), hint, keywords, choices: choices.slice(0, 4) };
    }).filter(Boolean).slice(0, 3);
    if (!out.length) {
      if (t) warnings.push(`${tag}: "talk" chưa hợp lệ – đã tự tạo câu hỏi luyện nói.`);
      out = words.slice(0, 2).map((w, i) => {
        const wrong = words.filter((x) => x !== w).slice(i, i + 2).map((x) => x.example);
        return {
          q: `Can you say a sentence with "${core(w.en)}"?`,
          vi: `Hãy nói một câu có "${core(w.en)}" (${w.vi}).`,
          hint: w.example,
          keywords: [core(w.en).split(' ').sort((a, b) => b.length - a.length)[0].toLowerCase()],
          choices: [w.example].concat(wrong)
        };
      });
    }
    return out;
  }

  function cleanSnow(sn, tag, warnings) {
    if (!sn) return null;
    const levels = arr(sn.levels).map((lv) => ({ bricks: arr(lv && lv.bricks).map((t) => str(t, 40)).filter(Boolean), vi: str(lv && lv.vi, 140) }));
    if (levels.length !== 3 || levels[0].bricks.length < 1 || levels[1].bricks.length < 2 || levels[2].bricks.length < 5) {
      warnings.push(`${tag}: "snowball" cần đúng 3 tầng (1 gạch → 3 gạch → 5+ gạch) – đã tự tạo.`);
      return null;
    }
    return { vi: str(sn.vi, 120), levels, extra: arr(sn.extra).map((t) => str(t, 40)).filter(Boolean).slice(0, 3) };
  }

  function cleanChoice(ch, tag, warnings) {
    if (!ch) return null;
    const options = arr(ch.options).map((o) => (o && hasText(o.en) ? {
      tone: TONES.indexOf(o.tone) !== -1 ? o.tone : 'calm',
      en: str(o.en, 140), vi: str(o.vi, 160),
      reply: str(o.reply, 140) || 'Great!', replyVi: str(o.replyVi, 160), emoji: emo(o.emoji, '🙂')
    } : null)).filter(Boolean).slice(0, 3);
    if (!hasText(ch.q) || options.length < 2) { warnings.push(`${tag}: cần "q" và ít nhất 2 lựa chọn – đã bỏ qua phần này.`); return null; }
    return { who: ch.who === 'a' ? 'a' : 'b', q: str(ch.q, 140), vi: str(ch.vi, 160), options };
  }

  function cleanMystery(m, warnings) {
    if (!m) return null;
    const clues = arr(m.clues).map((c) => (typeof c === 'string' ? { en: str(c, 160), vi: '' } : { en: str(c && c.en, 160), vi: str(c && c.vi, 180) })).filter((c) => c.en);
    const options = arr(m.options).map((o) => (typeof o === 'string' ? { en: str(o, 40), emoji: '❓', vi: '' } : { en: str(o && o.en, 40), emoji: emo(o && o.emoji, '❓'), vi: str(o && o.vi, 60) })).filter((o) => o.en);
    const answer = Number(m.answer);
    if (clues.length < 2 || options.length < 2 || !hasText(m.question) || !(answer >= 0 && answer < options.length)) {
      warnings.push('"mystery" chưa hợp lệ (cần ≥2 manh mối, ≥2 lựa chọn, "question" và "answer" là số thứ tự đáp án đúng, đếm từ 0) – app sẽ tự tạo câu đố.');
      return null;
    }
    return {
      title: str(m.title, 60) || 'Mystery Mission', titleVi: str(m.titleVi, 80),
      intro: str(m.intro, 200), introVi: str(m.introVi, 220),
      clues: clues.slice(0, 3), question: str(m.question, 140), questionVi: str(m.questionVi, 160),
      options: options.slice(0, 4), answer: Math.min(answer, 3), win: str(m.win, 160), winVi: str(m.winVi, 180)
    };
  }

  /** "Unit 5: Things we can do" → "U5 Things we can do" (cắt gọn theo từ, tối đa ~20 ký tự). */
  function shortName(name) {
    const s = name.replace(/^Unit\s*(\d+)\s*[:.\-–]?\s*/i, 'U$1 ').trim();
    if (s.length <= 20) return s;
    const cut = s.slice(0, 20);
    return cut.slice(0, cut.lastIndexOf(' ') > 8 ? cut.lastIndexOf(' ') : 20) + '…';
  }

  /* ---------- Chuyển sang định dạng gọn của Curriculum ---------- */
  function toRaw(id, d, idx = 0) {
    const color = d.color || PALETTE[(parseInt(id.slice(1), 10) || idx) % PALETTE.length];
    const shade = global.LegoSvg ? global.LegoSvg.shade : (c) => c;
    const branch = (ch) => (ch ? [ch.who, ch.q, ch.vi, ch.options.map((o) => [o.tone, o.en, o.vi, o.reply, o.replyVi, o.emoji])] : null);
    return {
      id, custom: true,
      name: d.name, vi: d.nameVi || d.name, short: shortName(d.name),
      topic: d.topic, topicVi: d.topicVi || '', color, dark: shade(color, -0.3), icon: d.icon,
      chars: { a: { name: d.characters.a, fig: FIGS.a }, b: { name: d.characters.b, fig: FIGS.b } },
      chatter: d.lessons[0].words.slice(0, 5).map((w) => [w.example, w.exampleVi]),
      lessons: d.lessons.map((L) => ({
        title: L.title, titleVi: L.titleVi, icon: L.icon,
        words: L.words.map((w) => [w.en, w.pos, w.ipa, w.vi, w.emoji, w.example, w.exampleVi, w.clue]),
        comic: {
          title: L.comic.title, titleVi: L.comic.titleVi,
          panels: L.comic.panels.map((p) => [p.who, p.text, p.vi, p.prop]),
          blanks: L.comic.blanks.map((b) => [b.panel, b.answer, b.options])
        },
        build: L.build.map((b) => ({ vi: b.vi, a: b.bricks, x: b.extra })),
        talk: L.talk.map((t) => ({ q: t.q, vi: t.vi, hint: t.hint, k: t.keywords, c: t.choices })),
        expert: {
          snow: L.snowball ? { vi: L.snowball.vi, l: L.snowball.levels.map((lv) => [lv.bricks, lv.vi]), x: L.snowball.extra } : null,
          cb: branch(L.comicChoice),
          tb: branch(L.talkChoice)
        }
      })),
      mystery: d.mystery ? {
        t: d.mystery.title, tv: d.mystery.titleVi, intro: [d.mystery.intro, d.mystery.introVi],
        clues: d.mystery.clues.map((c) => [c.en, c.vi]), q: [d.mystery.question, d.mystery.questionVi],
        o: d.mystery.options.map((o) => [o.en, o.emoji, o.vi]), a: d.mystery.answer, win: [d.mystery.win, d.mystery.winVi]
      } : null
    };
  }

  /* ---------- Gắn / gỡ khỏi app ---------- */
  function register(unit, idx) {
    const res = parse(unit.data);
    if (!res.ok) return null;
    const raw = toRaw(unit.id, res.data, idx);
    const zone = global.Curriculum.addZone(raw);
    global.LegoSvg.registerModel(unit.id, raw.color, 'Builder Clubhouse', `Câu lạc bộ Thợ xây – ${raw.short}`);
    return zone;
  }

  function unregister(id) {
    global.Curriculum.removeZone(id);
    global.LegoSvg.unregisterModel(id);
  }

  /** Đồng bộ danh sách Vùng đất tùy chỉnh với dữ liệu đã lưu (sau khi tải / khôi phục / xóa). */
  function syncAll(units) {
    global.Curriculum.ZONES.filter((z) => z.custom).map((z) => z.id).forEach(unregister);
    (units || []).forEach((u, i) => { try { register(u, i); } catch (e) { /* bỏ qua unit lỗi */ } });
  }

  /* ---------- Mẫu JSON & Prompt cho AI ---------- */
  const SAMPLE = {
    format: FORMAT,
    name: 'Unit 5: Things we can do',
    nameVi: 'Bài 5: Những việc chúng mình làm được',
    topic: 'Abilities', topicVi: 'Khả năng',
    icon: '🎨', color: '#8E44AD',
    characters: { a: 'Mia', b: 'Leo' },
    lessons: [{
      title: 'I Can Swim!', titleVi: 'Mình biết bơi!', icon: '🏊',
      words: [
        { en: 'swim', pos: 'verb', ipa: '/swɪm/', vi: 'bơi', emoji: '🏊', example: 'I can swim.', exampleVi: 'Mình biết bơi.', clue: 'You do this in the water.' },
        { en: 'dance', pos: 'verb', ipa: '/dɑːns/', vi: 'nhảy múa', emoji: '💃', example: 'She can dance well.', exampleVi: 'Bạn ấy nhảy giỏi.', clue: 'You move to the music.' },
        { en: 'cook', pos: 'verb', ipa: '/kʊk/', vi: 'nấu ăn', emoji: '🍳', example: 'My mum can cook noodles.', exampleVi: 'Mẹ mình biết nấu mì.', clue: 'You make food in the kitchen.' },
        { en: 'play the piano', pos: 'verb', ipa: '/pleɪ ðə piˈænəʊ/', vi: 'chơi đàn piano', emoji: '🎹', example: 'Can you play the piano?', exampleVi: 'Bạn có biết chơi đàn piano không?', clue: 'It has black and white keys.' }
      ],
      comic: {
        title: 'The Talent Show', titleVi: 'Buổi biểu diễn tài năng',
        panels: [
          { who: 'a', text: 'Leo, what can you do?', vi: 'Leo ơi, cậu làm được gì?', prop: '🎤' },
          { who: 'b', text: 'I can dance! Look at me!', vi: 'Tớ biết nhảy! Nhìn tớ này!', prop: '💃' },
          { who: 'a', text: 'Cool! I can play the piano.', vi: 'Hay quá! Tớ biết chơi đàn piano.', prop: '🎹' },
          { who: 'b', text: "Let's do the show together!", vi: 'Mình cùng biểu diễn nhé!', prop: '⭐' }
        ],
        blanks: [
          { panel: 1, answer: 'dance', options: ['dance', 'cook', 'swim'] },
          { panel: 2, answer: 'play the piano', options: ['play the piano', 'eat the piano', 'swim'] }
        ]
      },
      build: [
        { vi: 'Em muốn nói: Mình biết bơi.', bricks: ['I', 'can', 'swim.'], extra: ['cans', 'swims'] },
        { vi: 'Em muốn hỏi: Bạn có biết nấu ăn không?', bricks: ['Can', 'you', 'cook?'], extra: ['Do', 'cooks'] }
      ],
      talk: [
        { q: 'What can you do?', vi: 'Bạn làm được gì?', hint: 'I can swim.', keywords: ['can', 'swim|dance|cook|play|draw|sing'], choices: ['I can swim.', 'I am a piano.', 'It is Monday.'] }
      ],
      snowball: {
        vi: 'Khoe điều em làm được',
        levels: [
          { bricks: ['swim'], vi: 'bơi' },
          { bricks: ['I', 'can', 'swim.'], vi: 'Mình biết bơi.' },
          { bricks: ['I', 'can', 'swim', 'very well', 'in the pool.'], vi: 'Mình bơi rất giỏi ở bể bơi.' }
        ],
        extra: ['cans', 'swims']
      },
      comicChoice: {
        who: 'b', q: 'Do you want to dance with me in the show?', vi: 'Cậu có muốn nhảy cùng tớ trong buổi diễn không?',
        options: [
          { tone: 'yes', en: "Yes, I'd love to!", vi: 'Có, tớ rất thích!', reply: "Great! Let's practise!", replyVi: 'Tuyệt! Mình tập thôi!', emoji: '🤩' },
          { tone: 'no', en: "Sorry, I can't dance. How about singing?", vi: 'Xin lỗi, tớ không biết nhảy. Hát thì sao?', reply: 'Good idea! Let\'s sing!', replyVi: 'Ý hay! Mình hát nhé!', emoji: '🎤' }
        ]
      },
      talkChoice: {
        who: 'b', q: "Let's go swimming this afternoon!", vi: 'Chiều nay mình đi bơi nhé!',
        options: [
          { tone: 'yes', en: 'That sounds awesome!', vi: 'Nghe tuyệt quá!', reply: 'See you at the pool!', replyVi: 'Hẹn gặp ở bể bơi!', emoji: '🏊' },
          { tone: 'no', en: "I'd love to, but I'm busy. How about tomorrow?", vi: 'Mình rất muốn, nhưng mình bận. Mai nhé?', reply: 'Okay! Tomorrow, then!', replyVi: 'Được! Vậy mai nhé!', emoji: '📅' }
        ]
      }
    }],
    mystery: {
      title: 'The Secret Talent', titleVi: 'Tài năng bí mật',
      intro: 'Mia has a secret talent. Listen to the clues!', introVi: 'Mia có một tài năng bí mật. Nghe manh mối nhé!',
      clues: [
        { en: "Clue one: She doesn't do it in the water.", vi: 'Manh mối 1: Bạn ấy không làm việc đó dưới nước.' },
        { en: "Clue two: She doesn't do it in the kitchen.", vi: 'Manh mối 2: Bạn ấy không làm việc đó trong bếp.' },
        { en: 'Clue three: She uses black and white keys.', vi: 'Manh mối 3: Bạn ấy dùng các phím đen và trắng.' }
      ],
      question: "What is Mia's secret talent?", questionVi: 'Tài năng bí mật của Mia là gì?',
      options: [
        { en: 'swim', emoji: '🏊', vi: 'bơi' },
        { en: 'cook', emoji: '🍳', vi: 'nấu ăn' },
        { en: 'dance', emoji: '💃', vi: 'nhảy' },
        { en: 'play the piano', emoji: '🎹', vi: 'chơi piano' }
      ],
      answer: 3,
      win: 'Yes! Mia can play the piano!', winVi: 'Đúng rồi! Mia biết chơi đàn piano!'
    }
  };

  const PROMPT = `Bạn là giáo viên tiếng Anh tiểu học (ESL) giỏi. Hãy tạo bài học cho con tôi 9 tuổi (Lớp 4, trình độ Cambridge Movers–Flyers) dựa trên nội dung SGK dưới đây.

CHỈ trả về MỘT khối JSON hợp lệ (không giải thích thêm), đúng cấu trúc của MẪU ở cuối. Quy tắc:
1. "lessons": 1–4 bài học, mỗi bài 4–6 từ/cụm từ trong "words".
   - "pos" là một trong: verb, noun, adj, adv, phrase, prep. "ipa" theo giọng Anh. "emoji" là 1 biểu tượng.
   - "example" là câu ví dụ ngắn, tự nhiên (≤ 10 từ); "clue" là câu đố tiếng Anh đơn giản mô tả từ đó, KHÔNG chứa chính từ đó.
2. "comic": 4 khung hội thoại giữa 2 nhân vật ("who": "a" hoặc "b"). "blanks": 1–2 chỗ trống; "panel" đếm từ 0; "answer" phải xuất hiện NGUYÊN VĂN trong "text" của khung đó; "options" gồm đáp án đúng + 2 phương án sai.
3. "build": 2 câu lắp ráp; "bricks" là các viên gạch theo ĐÚNG thứ tự (mỗi gạch 1–3 từ, giữ dấu câu ở gạch cuối); "extra" là 2 gạch gây nhiễu.
4. "talk": 2 câu hỏi; "hint" là câu trả lời mẫu; "keywords" là từ khóa để chấm giọng nói (dùng "a|b" khi chấp nhận nhiều từ); "choices": phần tử ĐẦU TIÊN là câu đúng, 2 câu sau sai nghĩa nhưng vui nhộn.
5. "snowball": đúng 3 tầng – tầng 1 có 1 gạch (từ khóa), tầng 2 có 3 gạch (câu ngắn), tầng 3 có 5 gạch trở lên (câu giao tiếp tự nhiên, lịch sự, có please / Could I / Excuse me... khi phù hợp).
6. "comicChoice" và "talkChoice": một câu hỏi/lời mời và 2–3 cách đáp đều ĐÚNG ngữ pháp nhưng khác sắc thái; "tone" là một trong: yes (đồng ý hào hứng), no (từ chối lịch sự & đề xuất khác), idea (đưa ý khác), ask (hỏi thêm), calm (trả lời bình thường); "reply" là câu nhân vật đáp lại tương ứng.
7. "mystery": câu đố thám tử cuối Unit – 3 manh mối tiếng Anh (mỗi manh mối loại trừ dần các phương án), 4 "options", "answer" là số thứ tự đáp án đúng (đếm từ 0).
8. Mọi trường "...Vi" là nghĩa tiếng Việt tự nhiên, thân thiện với trẻ em. Không dùng nội dung bạo lực, thương hiệu hay thông tin cá nhân.

NỘI DUNG SGK CỦA CON (bố mẹ dán vào đây – tên Unit, từ vựng, mẫu câu):
[...]

MẪU JSON:
`;

  global.CustomUnits = {
    FORMAT, SAMPLE, PROMPT, MAX_LESSONS,
    parse, toRaw, register, unregister, syncAll,
    promptText: () => PROMPT + JSON.stringify(SAMPLE, null, 2),
    sampleText: () => JSON.stringify(SAMPLE, null, 2)
  };
})(window);
