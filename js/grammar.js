/* =========================================================
   grammar.js – Color-Coded Brick Grammar (Ngữ pháp theo Màu Gạch)
   Mỗi viên gạch chữ được tô màu CỐ ĐỊNH theo chức năng trong câu:
     who  – Xanh Dương #006CB7 : Chủ ngữ / Nhân vật (Who/What)
     act  – Đỏ        #E3000B : Động từ / Hành động (Action/Verb)
     obj  – Vàng      #FFD500 : Tân ngữ / Chi tiết bổ nghĩa (Object/Adjective) – chữ tối
     ctx  – Xanh Lá   #00A850 : Thời gian / Địa điểm / Lý do (Where/When/Why)
     soc  – Cam       #FF7E14 : Cụm từ giao tiếp lịch sự (Please, Excuse me, I'd love to...)
   Dữ liệu bài học có thể ghi đè vai trò (roles); nếu không, hàm role() tự đoán theo từ vựng.
   ========================================================= */
(function (global) {
  'use strict';

  const ROLES = {
    who: { key: 'who', color: '#006CB7', dark: '#004A80', ink: '#fff', en: 'Who / What', vi: 'Chủ ngữ – Ai/Cái gì', dot: '🔵' },
    act: { key: 'act', color: '#E3000B', dark: '#A30008', ink: '#fff', en: 'Action', vi: 'Động từ – Hành động', dot: '🔴' },
    obj: { key: 'obj', color: '#FFD500', dark: '#C7A300', ink: '#1E293B', en: 'Object / Detail', vi: 'Tân ngữ – Chi tiết', dot: '🟡' },
    ctx: { key: 'ctx', color: '#00A850', dark: '#007436', ink: '#fff', en: 'Where / When / Why', vi: 'Nơi chốn – Thời gian – Lý do', dot: '🟢' },
    soc: { key: 'soc', color: '#FF7E14', dark: '#C25A00', ink: '#fff', en: 'Polite words', vi: 'Giao tiếp lịch sự', dot: '🟠' }
  };
  const ORDER = ['who', 'act', 'obj', 'ctx', 'soc'];

  /* Cụm giao tiếp lịch sự (khớp ở ĐẦU viên gạch) */
  const SOCIAL = [
    'please', 'excuse me', 'sorry', 'thank you', 'thanks', 'no problem', "you're welcome", 'you are welcome',
    'could you', 'could i', 'can i', 'may i', 'would you like', "i'd like", 'i would like', "i'd love", 'i would love',
    'how about', "let's", 'let us', 'what about', 'in my opinion', 'i agree', "i don't think so", 'i think so',
    'what do you think', 'congratulations', 'hello', 'hi', 'goodbye', 'bye', 'yes,', 'no,', 'yes!', 'no!', 'oh', 'wow',
    'that sounds', 'sounds', 'see you', 'nice to meet', 'good morning', 'good afternoon', 'good evening', 'well done',
    'of course', 'sure', 'okay', 'ok', 'great idea', "you're right", 'at all'
  ];
  /* Gạch chỉ có MỘT trong các từ này (vd "please?") cũng là gạch lịch sự */
  const SOCIAL_ONLY = /^(please|thanks|sorry|sure|okay|ok|hello|hi|yes|no|wow|oh|congratulations)[\s,.!?]*$/;

  const WHO_FIRST = new Set(['i', 'you', 'he', 'she', 'we', 'they', 'it', "it's", 'its', "i'm", "you're", "he's", "she's", "we're", "they're",
    "i'll", "we'll", "you'll", "i've", "there's", 'there', 'this', 'that', 'these', 'those', 'who', 'what', "what's", 'which', 'whose',
    "who's", 'everyone', 'everybody', 'somebody', 'someone', 'nobody']);
  const SKIP_FIRST = new Set(['really', 'also', 'just', 'still', 'and', 'or', 'then']);
  const CTX_FIRST = new Set(['at', 'in', 'on', 'to', 'from', 'after', 'before', 'every', 'because', 'near', 'next', 'behind', 'between',
    'across', 'under', 'over', 'into', 'around', 'inside', 'outside', 'today', 'tonight', 'tomorrow', 'yesterday', 'now', 'then',
    'later', 'soon', 'early', 'late', 'last', 'this', 'when', 'where', 'why', 'how', 'always', 'usually', 'often', 'sometimes',
    'never', 'once', 'twice', 'here', 'during', 'until', 'since', 'by', 'along', 'straight']);
  const TIME_WORDS = /\b(o'?clock|half past|quarter|morning|afternoon|evening|night|monday|tuesday|wednesday|thursday|friday|saturday|sunday|weekend|week|month|year|summer|winter|spring|autumn|today|tomorrow|yesterday|always|usually|often|sometimes|never|every|early|late|in the future|ago)\b/;
  const AUX = new Set(['do', 'does', 'did', "don't", "doesn't", "didn't", 'can', "can't", 'could', 'would', 'will', "won't", 'should', "shouldn't",
    'must', 'may', 'might', 'shall', 'is', 'are', 'am', 'was', 'were', "isn't", "aren't", "wasn't", "weren't", 'be', 'been', 'have', 'has', 'had']);
  const VERBS = new Set(['wake', 'brush', 'get', 'have', 'has', 'catch', 'go', 'goes', 'went', 'play', 'plays', 'played', 'eat', 'eats', 'ate', 'drink', 'like',
    'likes', 'love', 'loves', 'want', 'wants', 'need', 'make', 'build', 'help', 'think', 'agree', 'take', 'took', 'turn', 'see', 'saw', 'look', 'come',
    'ride', 'swim', 'read', 'write', 'watch', 'watched', 'visit', 'visited', 'buy', 'bought', 'feel', 'put', 'open', 'close', 'find', 'found', 'lose',
    'lost', 'walk', 'run', 'fly', 'jump', 'sing', 'dance', 'draw', 'paint', 'cook', 'clean', 'wash', 'wear', 'pack', 'bring', 'borrow', 'send',
    'tell', 'say', 'ask', 'answer', 'try', 'learn', 'study', 'teach', 'work', 'works', 'live', 'lives', 'save', 'design', 'join', 'order', 'pay',
    'sleep', 'rest', 'listen', 'speak', 'talk', 'call', 'stop', 'start', 'finish', 'carry', 'give', 'gave', 'show', 'meet', 'met', 'sit', 'stand',
    'keep', 'fix', 'feed', 'win', 'won', 'know', 'become', 'travel', 'skate', 'roller', 'be', 'do', 'does', 'did', 'done', 'is', 'are', 'am', 'was', 'were',
    'come', 'leave', 'let', 'move', 'climb', 'collect', 'explore', 'happened', 'had', 'saw', 'forget']);

  function clean(text) {
    return String(text || '').toLowerCase().replace(/[’`]/g, "'").replace(/^[\s"“(¿¡]+/, '').trim();
  }

  const isVerb = (w) => AUX.has(w) || VERBS.has(w)
    || (/^[a-z]+(ing|ed)$/.test(w) && (VERBS.has(w.replace(/(ing|ed)$/, '')) || VERBS.has(w.replace(/(ing|ed)$/, 'e'))))
    // ngôi thứ 3 số ít: makes, washes, watches, tries → make, wash, watch, try (gạch nhiễu sai chia động từ vẫn là Action)
    || (/^[a-z]+s$/.test(w) && (VERBS.has(w.slice(0, -1)) || (/es$/.test(w) && VERBS.has(w.slice(0, -2))) || (/ies$/.test(w) && VERBS.has(w.slice(0, -3) + 'y'))));
  const firstWord = (text) => clean(text).split(/[\s,.!?]+/)[0];

  /** Đoán vai trò ngữ pháp của MỘT viên gạch chữ. */
  function role(text) {
    const raw = String(text || '').trim();
    if (raw === 'IT' || raw === 'IT.' || raw === 'PE' || raw === 'PE.') return 'obj';   // môn học viết hoa, không phải "it"
    const t = clean(text);
    if (!t) return 'obj';
    if (SOCIAL_ONLY.test(t)) return 'soc';
    for (const s of SOCIAL) {
      if (t === s || t.indexOf(s + ' ') === 0 || t.indexOf(s + ',') === 0 || t.indexOf(s + '!') === 0 || t.indexOf(s + '?') === 0 || t.indexOf(s + '.') === 0) return 'soc';
    }
    const parts = t.split(/[\s,.!?]+/).filter(Boolean);
    if (parts.length > 1 && SKIP_FIRST.has(parts[0])) return role(t.slice(t.indexOf(' ') + 1));
    const first = parts[0] || '';
    const second = parts[1] || '';
    if (first === 'to' && isVerb(second)) return 'act';
    if (first === 'what' && second === 'time') return 'ctx';
    if (first === 'how' && (second === 'often' || second === 'to' || second === 'much' || second === 'many')) return second === 'often' || second === 'to' ? 'ctx' : 'who';
    if (WHO_FIRST.has(first) && !(first === 'this' && TIME_WORDS.test(t)) && !(first === 'there' && t === 'there')) return 'who';
    if (CTX_FIRST.has(first) || TIME_WORDS.test(t)) return 'ctx';
    if (isVerb(first)) return 'act';
    return 'obj';
  }

  /** Vai trò của một từ vựng (Bước 1) – dựa trên từ loại, có thể ghi đè bằng w.role. */
  function wordRole(w) {
    if (!w) return 'obj';
    if (w.role && ROLES[w.role]) return w.role;
    const r = role(w.en);
    switch (w.pos) {
      case 'verb': return 'act';
      case 'noun': return r === 'ctx' ? 'ctx' : 'who';
      case 'adj': return 'obj';
      case 'prep': return 'ctx';
      case 'adv': return TIME_WORDS.test(clean(w.en)) || r === 'ctx' ? 'ctx' : 'obj';
      case 'phrase':
        if (r === 'soc' || r === 'ctx' || r === 'act') return r;
        if (/[?!.]$/.test(w.en.trim())) return 'soc';
        return r;
      default: return r;
    }
  }

  /** Mảng vai trò cho một câu gạch: ưu tiên roles khai báo, còn lại tự đoán.
   *  Cụm danh từ đứng TRƯỚC động từ đầu tiên là chủ ngữ ("Cats are cute" → Cats = Who). */
  function roles(bricks, declared) {
    const out = bricks.map((b, i) => (declared && ROLES[declared[i]] ? declared[i] : role(b)));
    const fixed = (i) => !!(declared && ROLES[declared[i]]);
    const firstAct = out.indexOf('act');
    if (firstAct > 0) {
      for (let i = 0; i < firstAct; i++) if (out[i] === 'obj' && !fixed(i)) out[i] = 'who';
    }
    // Câu hỏi: trợ động từ + [chủ ngữ] + động từ chính ("Where does | a pilot | work?")
    for (let i = 1; i < out.length - 1; i++) {
      if (out[i] === 'obj' && !fixed(i) && out[i - 1] === 'act' && AUX.has(firstWord(bricks[i - 1])) && out.slice(i + 1).indexOf('act') !== -1) out[i] = 'who';
    }
    return out;
  }

  function legendHTML(opts = {}) {
    const keys = opts.only ? ORDER.filter((k) => opts.only.indexOf(k) !== -1) : ORDER;
    return `<div class="role-legend${opts.compact ? ' compact' : ''}" aria-label="Brick colours">${keys.map((k) => {
      const r = ROLES[k];
      return `<span class="role-chip role-${k}"><i></i><b>${r.en}</b><small>${r.vi}</small></span>`;
    }).join('')}</div>`;
  }

  global.Grammar = { ROLES, ORDER, role, wordRole, roles, legendHTML };
})(window);
