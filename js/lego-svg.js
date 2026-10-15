/* =========================================================
   lego-svg.js – LegoSvgRenderer
   - Gạch LEGO chuẩn tỷ lệ (studs, highlight nhựa bóng, đổ bóng)
   - 10 Bộ Mô Hình Lớn (Master Set), mỗi bộ 12 nhóm <g id="part-n">
   - Minifigure + Tủ đồ, Túi mù (Polybag), Sa bàn Thế giới (Diorama)
   ========================================================= */
(function (global) {
  'use strict';

  /* ---------- Bảng màu LEGO ---------- */
  const C = {
    RED: '#E3000B', DRED: '#A30008', YEL: '#FFD500', BLU: '#006CB7', AZ: '#3D9BE0',
    GRN: '#00A850', DGRN: '#237841', TGRN: '#5A9E3A', OGRN: '#4A8A2E', ORG: '#FF7E14',
    WHT: '#F4F4F4', LGRY: '#A0A5A9', MGRY: '#8C9196', DGRY: '#6C6E68', BLK: '#2B2B2B',
    TAN: '#D9BB7B', BRN: '#7C4A1E', RBRN: '#A0522D', PURP: '#8E44AD', SKIN: '#FFD02A', GLASS: '#9FD3F7'
  };

  function shade(hex, f) {
    let c = String(hex).replace('#', '');
    if (c.length === 3) c = c.split('').map((x) => x + x).join('');
    const n = parseInt(c, 16);
    let r = (n >> 16) & 255, g = (n >> 8) & 255, b = n & 255;
    if (f < 0) { r = Math.round(r * (1 + f)); g = Math.round(g * (1 + f)); b = Math.round(b * (1 + f)); }
    else { r = Math.round(r + (255 - r) * f); g = Math.round(g + (255 - g) * f); b = Math.round(b + (255 - b) * f); }
    return '#' + ((1 << 24) | (r << 16) | (g << 8) | b).toString(16).slice(1);
  }

  const esc = (s) => String(s).replace(/[&<>"]/g, (m) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[m]));

  /* ---------- Primitives ---------- */
  function brick(x, y, w, h, c, studs) {
    const dark = shade(c, -0.32), light = shade(c, 0.45);
    let s = '';
    if (studs) {
      const n = Math.max(1, Math.round(w / 20));
      const step = w / n;
      for (let i = 0; i < n; i++) {
        const sx = x + step * (i + 0.5) - 6;
        s += `<rect x="${sx.toFixed(1)}" y="${y - 5}" width="12" height="6.5" rx="2" fill="${c}" stroke="${dark}" stroke-width=".8"/>`;
        s += `<rect x="${(sx + 2).toFixed(1)}" y="${y - 4}" width="4" height="1.6" rx=".8" fill="${light}" opacity=".85"/>`;
      }
    }
    s += `<rect x="${x}" y="${y}" width="${w}" height="${h}" rx="3" fill="${c}" stroke="${dark}" stroke-width="1"/>`;
    if (h > 8) s += `<rect x="${x + 1}" y="${y + h - 4}" width="${w - 2}" height="3" rx="1.5" fill="${dark}" opacity=".45"/>`;
    s += `<rect x="${x + 3}" y="${y + 2}" width="${Math.max(2, w - 6)}" height="${h > 10 ? 2.5 : 1.5}" rx="1.2" fill="#fff" opacity=".35"/>`;
    return s;
  }

  function wheel(cx, cy, r) {
    return `<circle cx="${cx}" cy="${cy}" r="${r}" fill="#1B1B1B" stroke="#000" stroke-width="1"/>` +
      `<circle cx="${cx}" cy="${cy}" r="${(r * 0.56).toFixed(1)}" fill="${C.LGRY}" stroke="${C.DGRY}" stroke-width="1"/>` +
      `<circle cx="${cx}" cy="${cy}" r="${(r * 0.2).toFixed(1)}" fill="${C.DGRY}"/>` +
      `<path d="M${cx - r * 0.7} ${cy - r * 0.35} A ${r * 0.8} ${r * 0.8} 0 0 1 ${cx - r * 0.1} ${cy - r * 0.78}" stroke="#fff" stroke-opacity=".35" stroke-width="2" fill="none"/>`;
  }

  function disc(cx, cy, r, c) {
    return `<circle cx="${cx}" cy="${cy}" r="${r}" fill="${c}" stroke="${shade(c, -0.35)}" stroke-width="1"/>` +
      (r > 4 ? `<ellipse cx="${(cx - r * 0.35).toFixed(1)}" cy="${(cy - r * 0.4).toFixed(1)}" rx="${(r * 0.32).toFixed(1)}" ry="${(r * 0.2).toFixed(1)}" fill="#fff" opacity=".45"/>` : '');
  }

  function ellipse(cx, cy, rx, ry, c) {
    return `<ellipse cx="${cx}" cy="${cy}" rx="${rx}" ry="${ry}" fill="${c}" stroke="${shade(c, -0.35)}" stroke-width="1"/>`;
  }

  function windowRect(x, y, w, h) {
    return `<rect x="${x}" y="${y}" width="${w}" height="${h}" rx="2" fill="${C.GLASS}" stroke="#2B4A63" stroke-width="2"/>` +
      `<path d="M${x + 3} ${y + h - 4} L${x + w * 0.45} ${y + 3} L${x + w * 0.62} ${y + 3} L${x + w * 0.18} ${y + h - 4} Z" fill="#fff" opacity=".45"/>`;
  }

  function door(x, y, w, h, c) {
    const d = shade(c, -0.3);
    return `<rect x="${x}" y="${y}" width="${w}" height="${h}" rx="3" fill="${c}" stroke="${d}" stroke-width="1.2"/>` +
      `<rect x="${x + 4}" y="${y + 5}" width="${w - 8}" height="${h * 0.38}" rx="2" fill="none" stroke="${d}" stroke-width="1.2"/>` +
      `<rect x="${x + 4}" y="${y + h * 0.5}" width="${w - 8}" height="${h * 0.42}" rx="2" fill="none" stroke="${d}" stroke-width="1.2"/>` +
      `<circle cx="${x + w - 7}" cy="${y + h * 0.48}" r="2.4" fill="${C.YEL}" stroke="${shade(C.YEL, -0.4)}" stroke-width=".6"/>`;
  }

  function poly(points, c) {
    return `<polygon points="${points}" fill="${c}" stroke="${shade(c, -0.35)}" stroke-width="1" stroke-linejoin="round"/>`;
  }

  function line(x1, y1, x2, y2, c, w) {
    return `<line x1="${x1}" y1="${y1}" x2="${x2}" y2="${y2}" stroke="${c}" stroke-width="${w || 2}" stroke-linecap="round"/>`;
  }

  function dome(cx, cy, r, c) {
    return `<path d="M${cx - r} ${cy} A ${r} ${r} 0 0 1 ${cx + r} ${cy} Z" fill="${c}" stroke="${shade(c, -0.35)}" stroke-width="1"/>` +
      `<path d="M${cx - r * 0.7} ${cy - r * 0.35} A ${r * 0.8} ${r * 0.8} 0 0 1 ${cx - r * 0.15} ${cy - r * 0.78}" stroke="#fff" stroke-opacity=".45" stroke-width="${Math.max(2, r * 0.08)}" fill="none" stroke-linecap="round"/>`;
  }

  function text(x, y, str, size, c) {
    return `<text x="${x}" y="${y}" font-family="Fredoka, Nunito, sans-serif" font-weight="700" font-size="${size}" fill="${c}" text-anchor="middle">${esc(str)}</text>`;
  }

  function parseFig(str) {
    const [hat, face, torso, legs, acc] = String(str).split('|');
    return { hat, face, torso, legs, acc };
  }

  function figPrim(x, y, s, cfg) {
    const conf = typeof cfg === 'string' ? parseFig(cfg) : cfg;
    return `<g transform="translate(${x} ${y}) scale(${s}) translate(12 4)">${minifigInner(conf)}</g>`;
  }

  function drawPrim(p) {
    switch (p[0]) {
      case 'b': return brick(p[1], p[2], p[3], p[4], p[5], true);
      case 't': return brick(p[1], p[2], p[3], p[4], p[5], false);
      case 'w': return wheel(p[1], p[2], p[3]);
      case 'c': return disc(p[1], p[2], p[3], p[4]);
      case 'e': return ellipse(p[1], p[2], p[3], p[4], p[5]);
      case 'win': return windowRect(p[1], p[2], p[3], p[4]);
      case 'door': return door(p[1], p[2], p[3], p[4], p[5]);
      case 'p': return poly(p[1], p[2]);
      case 'l': return line(p[1], p[2], p[3], p[4], p[5], p[6]);
      case 'dome': return dome(p[1], p[2], p[3], p[4]);
      case 'txt': return text(p[1], p[2], p[3], p[4], p[5]);
      case 'fig': return figPrim(p[1], p[2], p[3], p[4]);
      default: return '';
    }
  }

  function primBox(p) {
    switch (p[0]) {
      case 'b': return [p[1], p[2] - 6, p[1] + p[3], p[2] + p[4]];
      case 't': case 'win': case 'door': return [p[1], p[2], p[1] + p[3], p[2] + p[4]];
      case 'w': case 'c': return [p[1] - p[3], p[2] - p[3], p[1] + p[3], p[2] + p[3]];
      case 'e': return [p[1] - p[3], p[2] - p[4], p[1] + p[3], p[2] + p[4]];
      case 'dome': return [p[1] - p[3], p[2] - p[3], p[1] + p[3], p[2]];
      case 'l': { const w = (p[6] || 2) / 2; return [Math.min(p[1], p[3]) - w, Math.min(p[2], p[4]) - w, Math.max(p[1], p[3]) + w, Math.max(p[2], p[4]) + w]; }
      case 'p': {
        const pts = p[1].trim().split(/\s+/).map((xy) => xy.split(',').map(Number));
        const xs = pts.map((q) => q[0]), ys = pts.map((q) => q[1]);
        return [Math.min.apply(null, xs), Math.min.apply(null, ys), Math.max.apply(null, xs), Math.max.apply(null, ys)];
      }
      case 'txt': { const w = String(p[3]).length * p[4] * 0.62; return [p[1] - w / 2, p[2] - p[4], p[1] + w / 2, p[2] + 2]; }
      case 'fig': return [p[1], p[2], p[1] + 84 * p[3], p[2] + 128 * p[3]];
      default: return [0, 0, 0, 0];
    }
  }

  /* =========================================================
     MINIFIGURE
     ========================================================= */
  const ITEMS = {
    hat: [
      { id: 'none-hat', en: 'No Hat', vi: 'Không đội mũ', price: 0 },
      { id: 'cap-red', en: 'Red Cap', vi: 'Mũ lưỡi trai đỏ', price: 0 },
      { id: 'hair-brown', en: 'Brown Hair', vi: 'Tóc nâu', price: 0 },
      { id: 'hair-blonde', en: 'Ponytail', vi: 'Tóc đuôi ngựa', price: 20 },
      { id: 'cat-ears', en: 'Cat-Ear Hair', vi: 'Tóc tai mèo', price: 40 },
      { id: 'helmet-fire', en: 'Firefighter Helmet', vi: 'Mũ lính cứu hỏa', price: 40 },
      { id: 'chef-hat', en: 'Chef Hat', vi: 'Mũ đầu bếp', price: 40 },
      { id: 'cap-detective', en: 'Detective Hat', vi: 'Mũ thám tử', price: 50 },
      { id: 'hood-ninja', en: 'Ninja Hood', vi: 'Mũ trùm Ninja', price: 60 },
      { id: 'helmet-knight', en: 'Knight Helmet', vi: 'Mũ hiệp sĩ', price: 70 },
      { id: 'helmet-astro', en: 'Astronaut Helmet', vi: 'Mũ phi hành gia', price: 80 },
      { id: 'hat-wizard', en: 'Wizard Hat', vi: 'Mũ phù thủy', price: 90 },
      { id: 'crown', en: 'Royal Crown', vi: 'Vương miện', price: 120 }
    ],
    face: [
      { id: 'smile', en: 'Happy Smile', vi: 'Cười tươi', price: 0 },
      { id: 'grin', en: 'Big Grin', vi: 'Cười toe toét', price: 0 },
      { id: 'wink', en: 'Wink', vi: 'Nháy mắt', price: 20 },
      { id: 'freckles', en: 'Freckles', vi: 'Tàn nhang dễ thương', price: 25 },
      { id: 'surprised', en: 'Surprised', vi: 'Ngạc nhiên', price: 25 },
      { id: 'determined', en: 'Determined', vi: 'Quyết tâm', price: 30 },
      { id: 'cool', en: 'Cool Shades', vi: 'Kính râm sành điệu', price: 40 }
    ],
    torso: [
      { id: 'torso-red', en: 'Red Jacket', vi: 'Áo khoác đỏ', price: 0 },
      { id: 'torso-blue', en: 'Blue Shirt', vi: 'Áo sơ mi xanh', price: 0 },
      { id: 'torso-chef', en: 'Chef Jacket', vi: 'Áo đầu bếp', price: 40 },
      { id: 'torso-fire', en: 'Firefighter Suit', vi: 'Đồ lính cứu hỏa', price: 50 },
      { id: 'torso-detective', en: 'Detective Coat', vi: 'Áo khoác thám tử', price: 50 },
      { id: 'torso-ninja', en: 'Ninja Gi', vi: 'Võ phục Ninja', price: 60 },
      { id: 'torso-astro', en: 'Space Suit', vi: 'Bộ đồ phi hành gia', price: 70 },
      { id: 'torso-knight', en: 'Knight Armor', vi: 'Áo giáp hiệp sĩ', price: 70 },
      { id: 'torso-stars', en: 'Star Hoodie', vi: 'Áo ngôi sao', price: 80 }
    ],
    legs: [
      { id: 'legs-blue', en: 'Blue Jeans', vi: 'Quần jeans xanh', price: 0 },
      { id: 'legs-black', en: 'Black Pants', vi: 'Quần đen', price: 0 },
      { id: 'legs-white', en: 'White Pants', vi: 'Quần trắng', price: 20 },
      { id: 'legs-green', en: 'Green Pants', vi: 'Quần xanh lá', price: 20 },
      { id: 'legs-tan', en: 'Explorer Shorts', vi: 'Quần thám hiểm', price: 20 },
      { id: 'legs-red', en: 'Red Pants', vi: 'Quần đỏ', price: 25 }
    ],
    acc: [
      { id: 'none', en: 'Empty Hands', vi: 'Tay không', price: 0 },
      { id: 'book', en: 'Story Book', vi: 'Quyển sách', price: 20 },
      { id: 'pizza', en: 'Pizza Slice', vi: 'Miếng pizza', price: 25 },
      { id: 'magnifier', en: 'Magnifying Glass', vi: 'Kính lúp', price: 30 },
      { id: 'wrench', en: 'Wrench', vi: 'Cờ lê', price: 30 },
      { id: 'flag', en: 'Flag', vi: 'Lá cờ', price: 35 },
      { id: 'camera', en: 'Camera', vi: 'Máy ảnh', price: 40 },
      { id: 'guitar', en: 'Guitar', vi: 'Đàn guitar', price: 50 },
      { id: 'sword', en: 'Knight Sword', vi: 'Thanh kiếm hiệp sĩ', price: 60 },
      { id: 'lightsaber', en: 'Light Sword', vi: 'Thanh kiếm ánh sáng', price: 80 }
    ]
  };

  const LEGS = { 'legs-blue': '#1E5AA8', 'legs-black': C.BLK, 'legs-white': C.WHT, 'legs-green': C.DGRN, 'legs-tan': C.TAN, 'legs-red': '#C91A09' };

  const TORSOS = {
    'torso-red': { c: C.RED, deco: `<line x1="30" y1="47" x2="30" y2="79" stroke="#7A0006" stroke-width="1.4"/><rect x="34" y="56" width="7" height="5" rx="1" fill="#fff" opacity=".85"/>` },
    'torso-blue': { c: C.BLU, deco: `<polygon points="23,46 30,55 37,46" fill="#fff"/><circle cx="30" cy="62" r="1.3" fill="#fff"/><circle cx="30" cy="69" r="1.3" fill="#fff"/>` },
    'torso-chef': { c: C.WHT, deco: `<polygon points="22,46 30,52 38,46 36,50 30,56 24,50" fill="${C.RED}"/><circle cx="26" cy="60" r="1.6" fill="${C.LGRY}"/><circle cx="34" cy="60" r="1.6" fill="${C.LGRY}"/><circle cx="26" cy="68" r="1.6" fill="${C.LGRY}"/><circle cx="34" cy="68" r="1.6" fill="${C.LGRY}"/>` },
    'torso-fire': { c: C.BLK, deco: `<rect x="11" y="62" width="38" height="4" fill="${C.YEL}"/><rect x="10" y="71" width="40" height="4" fill="${C.YEL}"/><circle cx="30" cy="54" r="3.5" fill="${C.RED}"/>` },
    'torso-detective': { c: C.RBRN, deco: `<polygon points="20,46 30,62 26,79 18,79" fill="#7A3B1A"/><polygon points="40,46 30,62 34,79 42,79" fill="#7A3B1A"/><polygon points="28,48 32,48 31,62 29,62" fill="${C.DGRN}"/>` },
    'torso-ninja': { c: C.DGRN, deco: `<polygon points="18,46 24,46 40,79 34,79" fill="#173F28"/><rect x="9" y="70" width="42" height="5" fill="${C.BLK}"/><circle cx="36" cy="56" r="4" fill="${C.YEL}"/>` },
    'torso-astro': { c: C.WHT, deco: `<rect x="20" y="52" width="20" height="16" rx="2" fill="${C.BLU}"/><circle cx="25" cy="57" r="2" fill="${C.RED}"/><circle cx="31" cy="57" r="2" fill="${C.YEL}"/><circle cx="37" cy="57" r="2" fill="${C.GRN}"/><rect x="23" y="62" width="14" height="3" rx="1" fill="#fff"/>` },
    'torso-knight': { c: C.LGRY, deco: `<path d="M18 49 L42 49 L40 70 Q30 78 20 70 Z" fill="${C.MGRY}" stroke="${C.DGRY}"/><rect x="28" y="52" width="4" height="18" fill="${C.RED}"/><rect x="22" y="58" width="16" height="4" fill="${C.RED}"/>` },
    'torso-stars': { c: C.PURP, deco: `<polygon points="30,51 32.6,58 40,58 34,62.5 36.3,70 30,65.5 23.7,70 26,62.5 20,58 27.4,58" fill="${C.YEL}"/>` }
  };

  const FACES = {
    smile: `<ellipse cx="25" cy="28" rx="1.7" ry="2.3" fill="#1B1B1B"/><ellipse cx="35" cy="28" rx="1.7" ry="2.3" fill="#1B1B1B"/><path d="M24 34 Q30 39.5 36 34" stroke="#1B1B1B" stroke-width="1.7" fill="none" stroke-linecap="round"/>`,
    grin: `<ellipse cx="25" cy="27.5" rx="1.7" ry="2.3" fill="#1B1B1B"/><ellipse cx="35" cy="27.5" rx="1.7" ry="2.3" fill="#1B1B1B"/><path d="M22.5 32.5 Q30 42 37.5 32.5 Z" fill="#1B1B1B"/><path d="M24 33 L36 33 L35 35 L25 35 Z" fill="#fff"/>`,
    wink: `<path d="M22.8 28.4 Q25 26 27.2 28.4" stroke="#1B1B1B" stroke-width="1.7" fill="none" stroke-linecap="round"/><ellipse cx="35" cy="28" rx="1.7" ry="2.3" fill="#1B1B1B"/><path d="M24 34 Q31 39.5 37 33" stroke="#1B1B1B" stroke-width="1.7" fill="none" stroke-linecap="round"/>`,
    freckles: `<path d="M22 23.5 L27 23" stroke="#7A4A12" stroke-width="1.3" stroke-linecap="round"/><path d="M33 23 L38 23.5" stroke="#7A4A12" stroke-width="1.3" stroke-linecap="round"/><ellipse cx="25" cy="28" rx="1.7" ry="2.3" fill="#1B1B1B"/><ellipse cx="35" cy="28" rx="1.7" ry="2.3" fill="#1B1B1B"/><circle cx="21.5" cy="32" r=".8" fill="#C77A1A"/><circle cx="23.5" cy="33.5" r=".8" fill="#C77A1A"/><circle cx="38.5" cy="32" r=".8" fill="#C77A1A"/><circle cx="36.5" cy="33.5" r=".8" fill="#C77A1A"/><path d="M25.5 35 Q30 38.5 34.5 35" stroke="#1B1B1B" stroke-width="1.7" fill="none" stroke-linecap="round"/>`,
    surprised: `<ellipse cx="25" cy="27.5" rx="2.4" ry="3" fill="#fff" stroke="#1B1B1B" stroke-width="1.2"/><ellipse cx="35" cy="27.5" rx="2.4" ry="3" fill="#fff" stroke="#1B1B1B" stroke-width="1.2"/><circle cx="25" cy="28" r="1.2" fill="#1B1B1B"/><circle cx="35" cy="28" r="1.2" fill="#1B1B1B"/><ellipse cx="30" cy="36" rx="2.6" ry="3" fill="#1B1B1B"/>`,
    determined: `<path d="M21.5 23.5 L27.5 25.5" stroke="#1B1B1B" stroke-width="1.6" stroke-linecap="round"/><path d="M38.5 23.5 L32.5 25.5" stroke="#1B1B1B" stroke-width="1.6" stroke-linecap="round"/><ellipse cx="25" cy="28.5" rx="1.7" ry="2" fill="#1B1B1B"/><ellipse cx="35" cy="28.5" rx="1.7" ry="2" fill="#1B1B1B"/><path d="M25 35.5 Q30 37.5 35 34.5" stroke="#1B1B1B" stroke-width="1.7" fill="none" stroke-linecap="round"/>`,
    cool: `<rect x="20" y="24.5" width="9" height="6" rx="2" fill="#1B1B1B"/><rect x="31" y="24.5" width="9" height="6" rx="2" fill="#1B1B1B"/><rect x="28" y="25.5" width="4" height="1.6" fill="#1B1B1B"/><rect x="21.5" y="25.5" width="3" height="1.4" fill="#fff" opacity=".6"/><path d="M25 35 Q31 38.5 36 33.5" stroke="#1B1B1B" stroke-width="1.7" fill="none" stroke-linecap="round"/>`
  };

  const HATS = {
    'none-hat': { front: '' },
    'cap-red': { front: `<path d="M16 25 Q16 9.5 30 9.5 Q44 9.5 44 25 Z" fill="${C.RED}" stroke="${C.DRED}"/><path d="M40 23 L55 25.5 L55 28.5 L40 27.5 Z" fill="${C.RED}" stroke="${C.DRED}"/><circle cx="30" cy="10.5" r="2" fill="${C.DRED}"/><path d="M21 15 Q24 12 28 11.5" stroke="#fff" stroke-opacity=".5" stroke-width="2" fill="none" stroke-linecap="round"/>` },
    'hair-brown': { front: `<path d="M14 33 C13 14 20 8 30 8 C40 8 47 14 46 33 L42.5 31 C43 22 38 19 30 19 C25 19 22 21 19 24 L17.5 31 Z" fill="#6B3A12" stroke="#4A260A"/><path d="M20 14 Q25 10.5 31 10.5" stroke="#fff" stroke-opacity=".3" stroke-width="2" fill="none" stroke-linecap="round"/>` },
    'hair-blonde': {
      back: `<ellipse cx="48" cy="28" rx="5.5" ry="10" fill="#F2C23C" stroke="#C39418"/>`,
      front: `<path d="M14 31 C13 13 20 8 30 8 C40 8 47 13 46 31 L43 29 C43 21 38 18.5 30 18.5 C24 18.5 19 20.5 17 26 Z" fill="#F2C23C" stroke="#C39418"/><circle cx="44.5" cy="19" r="2.5" fill="${C.RED}"/>`
    },
    'cat-ears': { front: `<path d="M14 31 C13 14 20 9 30 9 C40 9 47 14 46 31 L43 29 C43 21 38 19 30 19 C22 19 17 21 17 29 Z" fill="${C.BLK}"/><polygon points="15,17 18,2 27,11" fill="${C.BLK}"/><polygon points="45,17 42,2 33,11" fill="${C.BLK}"/><polygon points="18,13 19.5,6 23.5,10.5" fill="#F7A1C4"/><polygon points="42,13 40.5,6 36.5,10.5" fill="#F7A1C4"/>` },
    'helmet-fire': { front: `<path d="M13 26 Q13 7 30 7 Q47 7 47 26 Z" fill="${C.RED}" stroke="${C.DRED}"/><ellipse cx="30" cy="26" rx="20" ry="3.5" fill="${C.DRED}"/><path d="M30 7 L30 25" stroke="${C.DRED}" stroke-width="2"/><circle cx="30" cy="16" r="4" fill="${C.YEL}" stroke="#B08A00"/><path d="M18 13 Q22 9.5 26 9" stroke="#fff" stroke-opacity=".45" stroke-width="2" fill="none" stroke-linecap="round"/>` },
    'chef-hat': { front: `<rect x="17" y="13" width="26" height="9" rx="2" fill="#fff" stroke="#CBD5E1"/><circle cx="22" cy="9" r="6.5" fill="#fff" stroke="#CBD5E1"/><circle cx="30" cy="5.5" r="7.5" fill="#fff" stroke="#CBD5E1"/><circle cx="38" cy="9" r="6.5" fill="#fff" stroke="#CBD5E1"/><rect x="17.5" y="12" width="25" height="5" fill="#fff"/>` },
    'cap-detective': { front: `<path d="M15 24 Q15 8 30 8 Q45 8 45 24 Z" fill="#8B5A2B" stroke="#5E3A17"/><path d="M15 24 L6 27 L15 27.5 Z" fill="#8B5A2B" stroke="#5E3A17"/><path d="M45 24 L54 27 L45 27.5 Z" fill="#8B5A2B" stroke="#5E3A17"/><path d="M17 17 L43 17" stroke="#5E3A17" stroke-width="1" stroke-dasharray="2 2"/><circle cx="30" cy="8.5" r="2" fill="#5E3A17"/>` },
    'hood-ninja': { front: `<path fill-rule="evenodd" d="M14 44 L14 20 Q14 8 30 8 Q46 8 46 20 L46 44 Z M18.5 23.5 L41.5 23.5 L41.5 31.5 L18.5 31.5 Z" fill="${C.DGRN}" stroke="#173F28"/><path d="M44 16 L54 12 L52 18 Z" fill="${C.DGRN}"/>` },
    'helmet-knight': { front: `<path d="M13.5 36 L13.5 20 Q13.5 7 30 7 Q46.5 7 46.5 20 L46.5 36 L41 36 L41 22.5 L19 22.5 L19 36 Z" fill="${C.LGRY}" stroke="${C.DGRY}"/><rect x="28" y="22" width="4" height="12" fill="${C.LGRY}" stroke="${C.DGRY}" stroke-width=".8"/><ellipse cx="30" cy="5" rx="6" ry="4" fill="${C.RED}"/><path d="M19 13 Q23 9.5 27 9" stroke="#fff" stroke-opacity=".5" stroke-width="2" fill="none" stroke-linecap="round"/>` },
    'helmet-astro': { front: `<path fill-rule="evenodd" d="M10.5 29 a19.5 19.5 0 1 0 39 0 a19.5 19.5 0 1 0 -39 0 Z M17 30 a13 12 0 1 0 26 0 a13 12 0 1 0 -26 0 Z" fill="${C.WHT}" stroke="${C.LGRY}"/><ellipse cx="30" cy="30" rx="13" ry="12" fill="#7CC4F2" opacity=".28"/><path d="M20 23 Q24 19 29 18.5" stroke="#fff" stroke-width="2.4" fill="none" stroke-linecap="round" opacity=".9"/><rect x="26" y="8.5" width="8" height="3" rx="1" fill="${C.BLU}"/>` },
    'hat-wizard': { front: `<polygon points="17,21 30,-2 43,21" fill="#2E3E9E" stroke="#1C2766"/><ellipse cx="30" cy="21" rx="17" ry="3.5" fill="#2E3E9E" stroke="#1C2766"/><polygon points="31,5 32,8 35,8 32.6,10 33.5,13 31,11 28.5,13 29.4,10 27,8 30,8" fill="${C.YEL}"/>` },
    'crown': { front: `<polygon points="16,19 16,7 21.5,12 26,3.5 30,11 34,3.5 38.5,12 44,7 44,19" fill="${C.YEL}" stroke="#B08A00"/><circle cx="30" cy="15" r="2.2" fill="${C.RED}"/><circle cx="22" cy="16" r="1.6" fill="${C.BLU}"/><circle cx="38" cy="16" r="1.6" fill="${C.GRN}"/>` }
  };

  const ACCS = {
    none: '',
    book: `<rect x="49" y="67" width="15" height="19" rx="1.5" fill="${C.RED}" stroke="${C.DRED}" transform="rotate(-10 56 76)"/><rect x="51" y="69" width="2" height="15" fill="#fff" opacity=".8" transform="rotate(-10 56 76)"/>`,
    pizza: `<polygon points="52,71 72,63 67,86" fill="#F5C26B" stroke="#C47F1A"/><polygon points="55,71 70,65.5 66.5,82" fill="${C.ORG}"/><circle cx="62" cy="70" r="2.2" fill="${C.RED}"/><circle cx="66" cy="76" r="2" fill="${C.RED}"/>`,
    magnifier: `<line x1="55" y1="80" x2="62" y2="66" stroke="#6B3A12" stroke-width="3.4" stroke-linecap="round"/><circle cx="65.5" cy="59" r="7.5" fill="#BFE6FF" fill-opacity=".7" stroke="#444" stroke-width="2.4"/><path d="M61.5 56 Q63 53.5 66 53.5" stroke="#fff" stroke-width="1.6" fill="none"/>`,
    wrench: `<path d="M54 82 L64 58" stroke="${C.LGRY}" stroke-width="4" stroke-linecap="round"/><path d="M60.5 55 a6 6 0 1 0 9 3 l-3.5 1 l-2-3 l1.5-3.4 Z" fill="${C.LGRY}" stroke="${C.DGRY}"/>`,
    flag: `<line x1="55" y1="84" x2="55" y2="34" stroke="${C.DGRY}" stroke-width="2.4" stroke-linecap="round"/><polygon points="55,34 73,40 55,47" fill="${C.RED}"/><polygon points="61.5,37.5 62.6,40.5 65.6,40.6 63.2,42.4 64.1,45.3 61.5,43.6 58.9,45.3 59.8,42.4 57.4,40.6 60.4,40.5" fill="${C.YEL}" transform="translate(-2 -1) scale(.95)"/>`,
    camera: `<rect x="50" y="68" width="18" height="12" rx="2" fill="#333" stroke="#111"/><rect x="53" y="65.5" width="6" height="3" rx="1" fill="#333"/><circle cx="59" cy="74" r="4" fill="#5B8BB5" stroke="#111" stroke-width="1.4"/><circle cx="65" cy="70.5" r="1.2" fill="${C.YEL}"/>`,
    guitar: `<line x1="52" y1="60" x2="63" y2="40" stroke="#6B3A12" stroke-width="3" stroke-linecap="round"/><ellipse cx="57" cy="70" rx="6" ry="6" fill="${C.ORG}" stroke="#A84F00" transform="rotate(30 57 70)"/><ellipse cx="51" cy="81" rx="8" ry="8.5" fill="${C.ORG}" stroke="#A84F00" transform="rotate(30 51 81)"/><circle cx="53.5" cy="76" r="2.2" fill="#3B2410"/>`,
    sword: `<line x1="55" y1="72" x2="55" y2="30" stroke="#D7DCE0" stroke-width="4" stroke-linecap="round"/><line x1="55" y1="70" x2="55" y2="32" stroke="#fff" stroke-width="1.2"/><line x1="48" y1="73" x2="62" y2="73" stroke="${C.YEL}" stroke-width="3.4" stroke-linecap="round"/><line x1="55" y1="74" x2="55" y2="86" stroke="#6B3A12" stroke-width="3.4" stroke-linecap="round"/>`,
    lightsaber: `<line x1="55" y1="68" x2="55" y2="26" stroke="#4FC3F7" stroke-width="6" stroke-linecap="round" opacity=".55"/><line x1="55" y1="68" x2="55" y2="27" stroke="#E0F7FF" stroke-width="2.4" stroke-linecap="round"/><rect x="52.5" y="68" width="5" height="17" rx="1.5" fill="${C.LGRY}" stroke="${C.DGRY}"/><rect x="52.5" y="72" width="5" height="2" fill="${C.BLK}"/>`
  };

  function minifigInner(cfg) {
    const parsed = typeof cfg === 'string' ? parseFig(cfg) : (cfg || {});
    const c = { hat: 'none-hat', face: 'smile', torso: 'torso-red', legs: 'legs-blue', acc: 'none' };
    Object.keys(parsed).forEach((k) => { if (parsed[k]) c[k] = parsed[k]; });
    const torso = TORSOS[c.torso] || TORSOS['torso-red'];
    const legC = LEGS[c.legs] || LEGS['legs-blue'];
    const legD = shade(legC, -0.3), tD = shade(torso.c, -0.3);
    const hat = HATS[c.hat] || HATS['none-hat'];
    let s = '';
    // Chân + hông
    s += `<rect x="8" y="80" width="44" height="8" rx="2" fill="${shade(legC, -0.12)}" stroke="${legD}"/>`;
    s += `<rect x="9" y="87" width="20" height="33" rx="2" fill="${legC}" stroke="${legD}"/><rect x="9" y="116" width="20" height="5" rx="1.5" fill="${legD}"/>`;
    s += `<rect x="31" y="87" width="20" height="33" rx="2" fill="${legC}" stroke="${legD}"/><rect x="31" y="116" width="20" height="5" rx="1.5" fill="${legD}"/>`;
    s += `<rect x="12" y="89" width="3" height="20" rx="1.5" fill="#fff" opacity=".25"/>`;
    // Tay
    s += `<path d="M14 47 L6.5 50 L2.5 73 L9.5 75.5 L14 57 Z" fill="${torso.c}" stroke="${tD}" stroke-linejoin="round"/>`;
    s += `<path d="M46 47 L53.5 50 L57.5 73 L50.5 75.5 L46 57 Z" fill="${torso.c}" stroke="${tD}" stroke-linejoin="round"/>`;
    // Thân
    s += `<polygon points="14,46 46,46 52,80 8,80" fill="${torso.c}" stroke="${tD}" stroke-linejoin="round"/>`;
    s += torso.deco;
    s += `<path d="M16 49 L22 49 L18 70" stroke="#fff" stroke-opacity=".22" stroke-width="2.5" fill="none" stroke-linecap="round"/>`;
    // Cổ + đầu
    if (hat.back) s += hat.back;
    s += `<rect x="24.5" y="42" width="11" height="5" rx="1" fill="${shade(C.SKIN, -0.1)}"/>`;
    s += `<rect x="24" y="12.5" width="12" height="6" rx="1.5" fill="${C.SKIN}" stroke="#C99A00" stroke-width=".8"/>`;
    s += `<rect x="16.5" y="16.5" width="27" height="27" rx="8" fill="${C.SKIN}" stroke="#C99A00" stroke-width="1"/>`;
    s += `<ellipse cx="22" cy="22" rx="3" ry="2" fill="#fff" opacity=".45"/>`;
    s += FACES[c.face] || FACES.smile;
    s += hat.front || '';
    // Phụ kiện + bàn tay
    s += ACCS[c.acc] || '';
    s += `<circle cx="5.5" cy="78" r="4.8" fill="${C.SKIN}" stroke="#C99A00"/><circle cx="5.5" cy="79" r="2" fill="#C99A00" opacity=".55"/>`;
    s += `<circle cx="54.5" cy="78" r="4.8" fill="${C.SKIN}" stroke="#C99A00"/><circle cx="54.5" cy="79" r="2" fill="#C99A00" opacity=".55"/>`;
    return s;
  }

  function renderMinifig(cfg, opts = {}) {
    const cls = opts.cls ? ' ' + opts.cls : '';
    return `<svg class="fig${cls}" viewBox="-12 -4 84 128" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">${minifigInner(cfg)}</svg>`;
  }

  /* =========================================================
     10 BỘ MÔ HÌNH LỚN (mỗi bộ 12 mảnh, khung 400x320)
     ========================================================= */
  const { RED, DRED, YEL, BLU, AZ, GRN, DGRN, TGRN, OGRN, ORG, WHT, LGRY, MGRY, DGRY, BLK, TAN, BRN, RBRN } = C;

  const MODELS = {
    z1: {
      name: 'City Clock Tower & Double-Decker Bus', vi: 'Tháp Đồng Hồ & Xe Buýt 2 Tầng',
      parts: [
        { n: 'Green Baseplate', vi: 'Tấm đế xanh lá', p: [['b', 8, 290, 384, 14, GRN]] },
        { n: 'Tower Base & Door', vi: 'Chân tháp & cửa', p: [['b', 50, 236, 110, 54, LGRY], ['door', 90, 250, 30, 40, BRN]] },
        { n: 'Bus Chassis & Wheels', vi: 'Khung gầm & bánh xe buýt', p: [['t', 192, 262, 186, 12, BLK], ['w', 232, 278, 15], ['w', 342, 278, 15]] },
        { n: 'Bus Lower Deck', vi: 'Tầng dưới xe buýt', p: [['b', 195, 214, 180, 48, RED], ['win', 204, 224, 28, 20], ['win', 238, 224, 28, 20], ['win', 272, 224, 28, 20], ['door', 308, 220, 24, 40, YEL], ['win', 340, 222, 28, 24], ['c', 370, 252, 4, YEL]] },
        { n: 'Tower Middle', vi: 'Thân tháp', p: [['b', 58, 176, 94, 60, TAN], ['win', 70, 190, 26, 32], ['win', 114, 190, 26, 32]] },
        { n: 'Bus Upper Deck', vi: 'Tầng trên xe buýt', p: [['b', 195, 166, 180, 48, RED], ['win', 204, 176, 30, 22], ['win', 242, 176, 30, 22], ['win', 280, 176, 30, 22], ['win', 318, 176, 30, 22], ['win', 352, 176, 18, 22]] },
        { n: 'Clock Face', vi: 'Mặt đồng hồ', p: [['b', 52, 112, 106, 64, LGRY], ['c', 105, 144, 25, WHT], ['l', 105, 144, 105, 126, BLK, 3], ['l', 105, 144, 118, 148, BLK, 3], ['c', 105, 144, 3, RED]] },
        { n: 'Bus Roof & Route Sign', vi: 'Mui xe & biển tuyến', p: [['t', 192, 158, 186, 9, DRED], ['t', 300, 146, 70, 13, BLK], ['txt', 335, 156.5, 'LINE 4', 10, YEL]] },
        { n: 'Tower Roof', vi: 'Mái tháp', p: [['p', '44,112 105,56 166,112', BLU]] },
        { n: 'Tower Flag', vi: 'Lá cờ trên tháp', p: [['l', 105, 58, 105, 28, DGRY, 3], ['p', '105,28 128,35 105,42', RED]] },
        { n: 'Street Lamp', vi: 'Cột đèn đường', p: [['l', 177, 290, 177, 206, BLK, 4], ['t', 169, 198, 16, 9, BLK], ['c', 177, 212, 5, YEL]] },
        { n: 'City Minifigure', vi: 'Nhân vật thành phố', p: [['fig', 8, 226, 0.5, 'cap-red|grin|torso-blue|legs-black|book']] }
      ]
    },
    z2: {
      name: 'Robotics Lab Set', vi: 'Phòng Thí Nghiệm Robot Sáng Tạo',
      parts: [
        { n: 'Lab Baseplate', vi: 'Tấm đế phòng lab', p: [['b', 8, 290, 384, 14, LGRY]] },
        { n: 'Lab Ground Floor', vi: 'Tầng trệt phòng lab', p: [['b', 24, 226, 196, 64, WHT], ['door', 100, 240, 36, 50, BLU]] },
        { n: 'Robot Feet', vi: 'Bàn chân robot', p: [['b', 252, 272, 46, 18, DGRY], ['b', 314, 272, 46, 18, DGRY]] },
        { n: 'Lab Windows & Lamp', vi: 'Cửa sổ & đèn lab', p: [['win', 36, 240, 52, 32], ['win', 150, 240, 58, 32], ['c', 118, 233, 4, YEL]] },
        { n: 'Robot Legs', vi: 'Chân robot', p: [['b', 262, 230, 26, 42, LGRY], ['b', 324, 230, 26, 42, LGRY]] },
        { n: 'Lab Upper Floor', vi: 'Tầng trên phòng lab', p: [['b', 24, 166, 196, 60, BLU], ['win', 38, 180, 40, 30], ['win', 100, 180, 40, 30], ['win', 162, 180, 44, 30]] },
        { n: 'Robot Body', vi: 'Thân robot', p: [['b', 246, 158, 122, 72, YEL], ['t', 272, 172, 70, 40, DGRY], ['c', 290, 192, 7, RED], ['c', 312, 192, 7, GRN], ['c', 334, 192, 7, AZ]] },
        { n: 'Robot Arms', vi: 'Tay robot', p: [['t', 224, 164, 22, 62, LGRY], ['t', 368, 164, 22, 62, LGRY], ['c', 235, 232, 9, DGRY], ['c', 379, 232, 9, DGRY]] },
        { n: 'Observatory Dome', vi: 'Mái vòm quan sát', p: [['dome', 122, 166, 66, WHT], ['l', 150, 128, 184, 98, DGRY, 7]] },
        { n: 'Robot Head', vi: 'Đầu robot', p: [['b', 274, 104, 66, 54, LGRY], ['c', 294, 128, 8, AZ], ['c', 320, 128, 8, AZ], ['t', 290, 144, 34, 5, BLK]] },
        { n: 'Antenna & Dish', vi: 'Ăng-ten & chảo vệ tinh', p: [['l', 307, 102, 307, 82, DGRY, 3], ['c', 307, 79, 6, RED], ['l', 40, 166, 40, 148, DGRY, 3], ['p', '24,152 56,140 52,152', WHT]] },
        { n: 'Scientist Minifigure', vi: 'Nhà khoa học nhí', p: [['fig', 194, 226, 0.5, 'hair-blonde|smile|torso-chef|legs-black|book']] }
      ]
    },
    z3: {
      name: 'Food Truck & Pizzeria Set', vi: 'Xe Tải Đồ Ăn & Quán Pizza',
      parts: [
        { n: 'Sidewalk Baseplate', vi: 'Tấm đế vỉa hè', p: [['b', 8, 290, 384, 14, TAN]] },
        { n: 'Pizzeria Walls', vi: 'Tường quán pizza', p: [['b', 22, 200, 156, 90, RBRN]] },
        { n: 'Truck Chassis & Wheels', vi: 'Gầm & bánh xe tải', p: [['t', 200, 262, 182, 12, BLK], ['w', 236, 278, 15], ['w', 348, 278, 15]] },
        { n: 'Door & Shop Window', vi: 'Cửa & tủ kính', p: [['door', 36, 236, 32, 54, BRN], ['win', 90, 226, 74, 40], ['t', 88, 266, 78, 6, WHT]] },
        { n: 'Truck Body', vi: 'Thùng xe tải', p: [['b', 200, 184, 140, 78, YEL]] },
        { n: 'Truck Cab', vi: 'Cabin xe tải', p: [['b', 340, 208, 42, 54, RED], ['win', 350, 216, 26, 22], ['c', 378, 252, 4, WHT]] },
        { n: 'Striped Awning', vi: 'Mái che sọc', p: [['p', '18,200 182,200 172,182 28,182', RED], ['p', '50,182 74,182 76,200 48,200', WHT], ['p', '98,182 122,182 124,200 96,200', WHT], ['p', '146,182 170,182 172,200 144,200', WHT]] },
        { n: 'Serving Window', vi: 'Quầy bán hàng', p: [['win', 214, 196, 98, 36], ['t', 208, 232, 112, 8, BRN], ['c', 232, 226, 5, ORG], ['c', 252, 226, 5, GRN]] },
        { n: 'Pizzeria Sign', vi: 'Biển hiệu quán', p: [['t', 22, 148, 156, 32, GRN], ['txt', 100, 171, 'PIZZA', 20, WHT]] },
        { n: 'Giant Rooftop Pizza', vi: 'Pizza khổng lồ trên nóc', p: [['t', 254, 172, 34, 12, DGRY], ['e', 271, 166, 36, 10, ORG], ['e', 256, 164, 5, 2.5, RED], ['e', 280, 168, 5, 2.5, RED], ['e', 272, 161, 4, 2, RED], ['e', 292, 163, 4, 2, RED]] },
        { n: 'Table & Snacks', vi: 'Bàn & đồ ăn vặt', p: [['l', 134, 276, 134, 290, DGRY, 4], ['t', 110, 270, 48, 7, WHT], ['e', 122, 266, 7, 3, ORG], ['c', 148, 263, 5, YEL]] },
        { n: 'Chef Minifigure', vi: 'Đầu bếp nhí', p: [['fig', 168, 226, 0.5, 'chef-hat|grin|torso-chef|legs-black|pizza']] }
      ]
    },
    z4: {
      name: 'Golden Dragon Dojo Set', vi: 'Võ Đường Rồng Vàng',
      parts: [
        { n: 'Garden Baseplate', vi: 'Tấm đế khu vườn', p: [['b', 8, 290, 384, 14, DGRN]] },
        { n: 'Stone Steps', vi: 'Bậc thềm đá', p: [['b', 30, 268, 220, 22, LGRY], ['b', 60, 252, 160, 16, LGRY]] },
        { n: 'Red Pillars', vi: 'Cột đỏ', p: [['t', 62, 180, 16, 72, RED], ['t', 202, 180, 16, 72, RED]] },
        { n: 'Sliding Doors', vi: 'Cửa trượt', p: [['b', 78, 186, 124, 66, TAN], ['t', 96, 200, 36, 52, WHT], ['t', 148, 200, 36, 52, WHT], ['l', 114, 200, 114, 252, BRN, 2], ['l', 166, 200, 166, 252, BRN, 2]] },
        { n: 'Lower Roof', vi: 'Mái tầng dưới', p: [['p', '28,186 252,186 228,160 52,160', BLK], ['l', 28, 186, 252, 186, YEL, 3]] },
        { n: 'Upper Floor', vi: 'Tầng trên', p: [['b', 88, 122, 104, 38, TAN], ['win', 106, 130, 28, 20], ['win', 146, 130, 28, 20]] },
        { n: 'Pagoda Roof', vi: 'Mái chùa cong', p: [['p', '62,122 218,122 192,92 88,92', BLK], ['l', 62, 122, 218, 122, YEL, 3], ['p', '132,92 140,70 148,92', YEL]] },
        { n: 'Paper Lanterns', vi: 'Đèn lồng giấy', p: [['l', 40, 186, 40, 196, BLK, 1.5], ['e', 40, 204, 7, 9, RED], ['l', 240, 186, 240, 196, BLK, 1.5], ['e', 240, 204, 7, 9, RED]] },
        { n: 'Dragon Body', vi: 'Thân rồng', p: [['c', 272, 264, 13, YEL], ['c', 296, 252, 15, YEL], ['c', 322, 236, 16, YEL], ['c', 346, 216, 16, YEL], ['c', 362, 192, 15, YEL]] },
        { n: 'Dragon Head', vi: 'Đầu rồng', p: [['p', '350,186 392,170 388,150 360,148 344,166', YEL], ['p', '360,150 350,128 370,150', ORG], ['p', '374,150 372,128 386,152', ORG], ['c', 372, 160, 4, BLK], ['p', '390,170 398,178 384,178', RED]] },
        { n: 'Dragon Wings', vi: 'Cánh rồng', p: [['p', '310,226 288,170 332,198', ORG], ['p', '336,210 334,148 362,186', ORG]] },
        { n: 'Ninja Minifigure', vi: 'Ninja nhí', p: [['fig', 0, 226, 0.5, 'hood-ninja|determined|torso-ninja|legs-green|sword']] }
      ]
    },
    z5: {
      name: 'Rescue Helicopter & Fire Station', vi: 'Trực Thăng Cứu Hộ & Trạm Cứu Hỏa',
      parts: [
        { n: 'Street Baseplate', vi: 'Tấm đế đường phố', p: [['b', 8, 290, 384, 14, DGRY]] },
        { n: 'Station Walls', vi: 'Tường trạm cứu hỏa', p: [['b', 18, 204, 184, 86, RED]] },
        { n: 'Garage Door', vi: 'Cửa gara', p: [['t', 32, 222, 92, 68, WHT], ['l', 32, 240, 124, 240, LGRY, 2], ['l', 32, 256, 124, 256, LGRY, 2], ['l', 32, 272, 124, 272, LGRY, 2]] },
        { n: 'Door & Window', vi: 'Cửa đi & cửa sổ', p: [['door', 150, 240, 34, 50, BRN], ['win', 144, 212, 46, 22]] },
        { n: 'Second Floor', vi: 'Tầng hai', p: [['b', 18, 144, 184, 60, RED], ['win', 30, 158, 42, 30], ['win', 88, 158, 42, 30], ['win', 146, 158, 42, 30]] },
        { n: 'Roof & FIRE Sign', vi: 'Mái & biển FIRE', p: [['t', 12, 132, 196, 12, BLK], ['t', 62, 110, 96, 22, YEL], ['txt', 110, 127, 'FIRE', 15, RED]] },
        { n: 'Siren Tower', vi: 'Tháp còi báo động', p: [['b', 176, 106, 24, 26, LGRY], ['dome', 188, 106, 10, AZ]] },
        { n: 'Helipad', vi: 'Bãi đáp trực thăng', p: [['t', 222, 274, 166, 16, BLK], ['txt', 305, 287, 'H', 14, YEL]] },
        { n: 'Helicopter Body', vi: 'Thân trực thăng', p: [['b', 272, 214, 96, 48, ORG], ['win', 336, 222, 28, 24], ['l', 268, 272, 372, 272, DGRY, 4], ['l', 290, 262, 290, 272, DGRY, 3], ['l', 350, 262, 350, 272, DGRY, 3]] },
        { n: 'Tail Boom & Rotor', vi: 'Đuôi & cánh quạt đuôi', p: [['t', 214, 226, 60, 12, ORG], ['p', '214,226 206,204 224,226', ORG], ['c', 212, 232, 8, LGRY]] },
        { n: 'Main Rotor', vi: 'Cánh quạt chính', p: [['t', 316, 202, 10, 12, DGRY], ['t', 248, 196, 148, 6, BLK]] },
        { n: 'Firefighter Minifigure', vi: 'Lính cứu hỏa nhí', p: [['fig', 122, 226, 0.5, 'helmet-fire|grin|torso-fire|legs-black|wrench']] }
      ]
    },
    z6: {
      name: 'Jurassic Safari Jeep & Dino Gate', vi: 'Cổng Khủng Long & Xe Jeep Thám Hiểm',
      parts: [
        { n: 'Jungle Baseplate', vi: 'Tấm đế rừng rậm', p: [['b', 8, 290, 384, 14, GRN]] },
        { n: 'Gate Pillars', vi: 'Chân cổng', p: [['b', 26, 200, 42, 90, BRN], ['b', 188, 200, 42, 90, BRN]] },
        { n: 'Jeep Chassis & Wheels', vi: 'Gầm & bánh xe jeep', p: [['t', 248, 258, 136, 12, BLK], ['w', 278, 276, 15], ['w', 356, 276, 15]] },
        { n: 'Torches', vi: 'Đuốc trên cổng', p: [['b', 22, 150, 50, 50, RBRN], ['b', 184, 150, 50, 50, RBRN], ['p', '39,150 47,128 55,150', ORG], ['p', '201,150 209,128 217,150', ORG], ['p', '43,150 47,138 51,150', YEL], ['p', '205,150 209,138 213,150', YEL]] },
        { n: 'Jeep Body', vi: 'Thân xe jeep', p: [['b', 252, 222, 128, 36, DGRN], ['t', 252, 238, 128, 6, YEL]] },
        { n: 'Gate Beam & Sign', vi: 'Xà cổng & biển tên', p: [['b', 14, 114, 228, 30, BRN], ['txt', 128, 135, 'DINO PARK', 16, YEL]] },
        { n: 'Roll Bar & Windshield', vi: 'Khung & kính chắn gió', p: [['l', 262, 222, 262, 186, BLK, 4], ['l', 262, 186, 320, 186, BLK, 4], ['l', 320, 186, 320, 222, BLK, 4], ['p', '336,222 352,194 358,196 344,222', '#9FD3F7']] },
        { n: 'Jungle Leaves', vi: 'Lá cây rừng', p: [['e', 30, 112, 22, 12, DGRN], ['e', 226, 112, 22, 12, DGRN], ['e', 128, 108, 32, 10, '#4FA34F']] },
        { n: 'T-Rex Body & Tail', vi: 'Thân & đuôi T-Rex', p: [['p', '96,214 62,238 70,246 104,228', TGRN], ['e', 128, 214, 40, 28, TGRN]] },
        { n: 'T-Rex Head', vi: 'Đầu T-Rex', p: [['b', 134, 158, 52, 32, TGRN], ['t', 142, 186, 46, 8, OGRN], ['p', '150,186 154,193 158,186', WHT], ['p', '166,186 170,193 174,186', WHT], ['c', 172, 168, 4.5, WHT], ['c', 173, 168, 2, BLK]] },
        { n: 'T-Rex Legs & Arms', vi: 'Chân & tay T-Rex', p: [['b', 104, 236, 20, 54, OGRN], ['b', 134, 236, 20, 54, OGRN], ['l', 158, 206, 170, 216, OGRN, 4]] },
        { n: 'Explorer Minifigure', vi: 'Nhà thám hiểm nhí', p: [['fig', 226, 226, 0.5, 'cap-detective|grin|torso-detective|legs-tan|camera']] }
      ]
    },
    z7: {
      name: 'Passenger Jet & Airport Tower', vi: 'Máy Bay Phản Lực & Đài Kiểm Soát',
      parts: [
        { n: 'Runway Baseplate', vi: 'Tấm đế đường băng', p: [['b', 8, 290, 384, 14, DGRY], ['t', 120, 296, 30, 3, WHT], ['t', 200, 296, 30, 3, WHT], ['t', 280, 296, 30, 3, WHT]] },
        { n: 'Tower Base', vi: 'Chân đài kiểm soát', p: [['b', 28, 214, 62, 76, WHT], ['door', 46, 248, 26, 42, BLU]] },
        { n: 'Landing Gear', vi: 'Càng hạ cánh', p: [['l', 190, 252, 190, 274, DGRY, 4], ['w', 190, 280, 9], ['l', 300, 252, 300, 274, DGRY, 4], ['w', 291, 280, 9], ['w', 309, 280, 9]] },
        { n: 'Tower Shaft', vi: 'Thân đài', p: [['b', 40, 134, 38, 80, WHT], ['l', 59, 150, 59, 200, LGRY, 2]] },
        { n: 'Jet Fuselage', vi: 'Thân máy bay', p: [['b', 142, 212, 214, 42, WHT], ['p', '356,212 392,240 356,254', WHT], ['t', 142, 240, 214, 5, BLU]] },
        { n: 'Control Cab', vi: 'Phòng điều khiển', p: [['b', 20, 92, 78, 42, BLU], ['win', 28, 100, 62, 24]] },
        { n: 'Jet Windows', vi: 'Cửa sổ máy bay', p: [['c', 172, 226, 4, AZ], ['c', 192, 226, 4, AZ], ['c', 212, 226, 4, AZ], ['c', 232, 226, 4, AZ], ['c', 252, 226, 4, AZ], ['c', 272, 226, 4, AZ], ['c', 292, 226, 4, AZ], ['c', 312, 226, 4, AZ], ['c', 332, 226, 4, AZ], ['p', '362,220 378,229 362,231', '#2B4A63']] },
        { n: 'Radar Roof', vi: 'Mái & radar', p: [['t', 16, 80, 86, 12, LGRY], ['l', 59, 80, 59, 62, DGRY, 3], ['e', 59, 58, 16, 5, WHT]] },
        { n: 'Jet Wings', vi: 'Cánh máy bay', p: [['p', '232,212 280,212 252,188 238,188', MGRY], ['p', '220,244 300,244 252,288 228,288', LGRY]] },
        { n: 'Tail Fin', vi: 'Đuôi máy bay', p: [['p', '142,212 174,212 150,164 130,164', RED], ['t', 126, 222, 26, 9, RED]] },
        { n: 'Jet Engines', vi: 'Động cơ phản lực', p: [['t', 236, 258, 40, 16, DGRY], ['e', 276, 266, 4, 8, BLK]] },
        { n: 'Pilot Minifigure', vi: 'Phi công nhí', p: [['fig', 92, 226, 0.5, 'hair-brown|cool|torso-blue|legs-black|flag']] }
      ]
    },
    z8: {
      name: 'Detective Office & Vintage Car', vi: 'Văn Phòng Thám Tử & Xe Cổ Điển',
      parts: [
        { n: 'Cobblestone Baseplate', vi: 'Tấm đế đường đá', p: [['b', 8, 290, 384, 14, DGRY]] },
        { n: 'Office Ground Floor', vi: 'Tầng trệt văn phòng', p: [['b', 18, 204, 176, 86, RBRN]] },
        { n: 'Car Chassis & Wheels', vi: 'Gầm & bánh xe cổ', p: [['t', 222, 262, 160, 10, BLK], ['w', 252, 276, 15], ['w', 350, 276, 15]] },
        { n: 'Door & Bay Window', vi: 'Cửa & cửa sổ lồi', p: [['door', 36, 232, 34, 58, DGRN], ['win', 96, 222, 82, 46], ['t', 92, 268, 90, 6, WHT]] },
        { n: 'Car Body', vi: 'Thân xe', p: [['b', 226, 230, 152, 32, DGRN], ['t', 226, 244, 152, 4, YEL]] },
        { n: 'Office Second Floor', vi: 'Tầng hai văn phòng', p: [['b', 18, 134, 176, 70, RBRN], ['win', 32, 148, 44, 40], ['win', 84, 148, 44, 40], ['win', 136, 148, 44, 40]] },
        { n: 'Car Cabin', vi: 'Khoang lái', p: [['b', 262, 196, 84, 34, DGRN], ['win', 272, 202, 30, 22], ['win', 308, 202, 30, 22]] },
        { n: 'Roof & Chimney', vi: 'Mái & ống khói', p: [['p', '10,136 202,136 176,104 36,104', BLK], ['b', 150, 82, 20, 24, RBRN]] },
        { n: 'Lights & Fenders', vi: 'Đèn & chắn bùn', p: [['dome', 252, 262, 18, BLK], ['dome', 350, 262, 18, BLK], ['e', 380, 246, 4, 7, YEL], ['e', 228, 246, 3, 6, RED]] },
        { n: 'Detective Sign', vi: 'Biển văn phòng thám tử', p: [['t', 28, 207, 84, 18, YEL], ['txt', 70, 220.5, 'DETECTIVE', 11, BLK]] },
        { n: 'Gas Street Lamp', vi: 'Đèn đường cổ', p: [['l', 206, 290, 206, 182, BLK, 4], ['t', 198, 172, 16, 10, BLK], ['c', 206, 188, 5, YEL]] },
        { n: 'Detective Minifigure', vi: 'Thám tử nhí', p: [['fig', 116, 226, 0.5, 'cap-detective|wink|torso-detective|legs-black|magnifier']] }
      ]
    },
    z9: {
      name: 'Space Shuttle & Lunar Rover', vi: 'Tàu Con Thoi & Xe Tự Hành Mặt Trăng',
      parts: [
        { n: 'Moon Baseplate', vi: 'Tấm đế mặt trăng', p: [['b', 8, 290, 384, 14, LGRY], ['e', 230, 297, 10, 3, MGRY], ['e', 330, 297, 7, 2, MGRY]] },
        { n: 'Launch Pad', vi: 'Bệ phóng', p: [['b', 30, 262, 180, 28, DGRY]] },
        { n: 'Rover Chassis & Wheels', vi: 'Gầm & bánh xe tự hành', p: [['t', 250, 262, 130, 10, DGRY], ['w', 268, 278, 13], ['w', 314, 278, 13], ['w', 362, 278, 13]] },
        { n: 'Launch Tower', vi: 'Tháp phóng', p: [['t', 36, 70, 20, 192, RED], ['l', 38, 90, 54, 110, DRED, 2], ['l', 54, 110, 38, 130, DRED, 2], ['l', 38, 150, 54, 170, DRED, 2], ['l', 54, 170, 38, 190, DRED, 2], ['l', 38, 210, 54, 230, DRED, 2], ['t', 56, 120, 28, 6, RED]] },
        { n: 'Rover Body', vi: 'Thân xe tự hành', p: [['b', 256, 232, 118, 30, WHT], ['win', 334, 238, 30, 16]] },
        { n: 'Fuel Tank', vi: 'Bồn nhiên liệu', p: [['dome', 138, 98, 20, ORG], ['t', 118, 96, 40, 166, ORG]] },
        { n: 'Solar Panel', vi: 'Tấm pin mặt trời', p: [['l', 290, 232, 290, 210, DGRY, 3], ['p', '262,210 318,210 326,194 270,194', BLU], ['l', 280, 194, 276, 210, '#9FD3F7', 1], ['l', 298, 194, 294, 210, '#9FD3F7', 1], ['l', 266, 202, 322, 202, '#9FD3F7', 1]] },
        { n: 'Orbiter Body', vi: 'Thân tàu con thoi', p: [['t', 84, 120, 34, 142, WHT], ['p', '84,120 101,82 118,120', WHT], ['p', '95,96 101,82 107,96', BLK], ['win', 93, 104, 16, 10]] },
        { n: 'Orbiter Wings', vi: 'Cánh tàu con thoi', p: [['p', '84,186 56,262 84,262', LGRY], ['t', 84, 252, 34, 10, BLK]] },
        { n: 'Rocket Booster', vi: 'Tên lửa đẩy', p: [['t', 160, 118, 18, 144, WHT], ['p', '160,118 169,98 178,118', WHT], ['t', 160, 250, 18, 12, DGRY]] },
        { n: 'Antenna & Dish', vi: 'Ăng-ten & chảo', p: [['l', 362, 232, 362, 208, DGRY, 3], ['p', '348,200 376,200 362,212', WHT], ['c', 362, 197, 3, RED]] },
        { n: 'Astronaut Minifigure', vi: 'Phi hành gia nhí', p: [['fig', 204, 226, 0.5, 'helmet-astro|grin|torso-astro|legs-white|flag']] }
      ]
    },
    z10: {
      name: 'Royal Knight Castle Masterpiece', vi: 'Lâu Đài Hiệp Sĩ Hoàng Gia',
      parts: [
        { n: 'Kingdom Baseplate', vi: 'Tấm đế vương quốc', p: [['b', 8, 290, 384, 14, GRN]] },
        { n: 'Outer Walls', vi: 'Tường thành ngoài', p: [['b', 18, 206, 96, 84, LGRY], ['b', 286, 206, 96, 84, LGRY]] },
        { n: 'Gate & Portcullis', vi: 'Cổng & song sắt', p: [['b', 114, 214, 172, 76, LGRY], ['dome', 200, 238, 28, BRN], ['t', 172, 238, 56, 52, BRN], ['l', 186, 226, 186, 290, DGRY, 2], ['l', 200, 222, 200, 290, DGRY, 2], ['l', 214, 226, 214, 290, DGRY, 2]] },
        { n: 'Left Tower', vi: 'Tháp trái', p: [['b', 18, 118, 96, 88, MGRY], ['win', 56, 140, 20, 32]] },
        { n: 'Right Tower', vi: 'Tháp phải', p: [['b', 286, 118, 96, 88, MGRY], ['win', 324, 140, 20, 32]] },
        { n: 'Royal Keep', vi: 'Tháp chính hoàng gia', p: [['b', 140, 110, 120, 104, LGRY], ['win', 186, 132, 28, 40]] },
        { n: 'Battlements', vi: 'Lỗ châu mai', p: [['b', 140, 96, 20, 14, LGRY], ['b', 173, 96, 20, 14, LGRY], ['b', 207, 96, 20, 14, LGRY], ['b', 240, 96, 20, 14, LGRY], ['b', 114, 200, 22, 14, LGRY], ['b', 264, 200, 22, 14, LGRY]] },
        { n: 'Tower Roofs', vi: 'Mái tháp nhọn', p: [['p', '10,118 66,50 122,118', BLU], ['p', '278,118 334,50 390,118', BLU]] },
        { n: 'Royal Flags', vi: 'Cờ hoàng gia', p: [['l', 66, 52, 66, 24, DGRY, 3], ['p', '66,24 90,31 66,38', YEL], ['l', 334, 52, 334, 24, DGRY, 3], ['p', '334,24 358,31 334,38', RED], ['l', 200, 96, 200, 58, DGRY, 3], ['p', '200,58 228,66 200,74', RED]] },
        { n: 'Knight Shields', vi: 'Khiên hiệp sĩ', p: [['c', 146, 252, 13, BLU], ['l', 146, 242, 146, 262, YEL, 3], ['l', 136, 252, 156, 252, YEL, 3], ['c', 254, 252, 13, RED], ['l', 254, 242, 254, 262, YEL, 3], ['l', 244, 252, 264, 252, YEL, 3]] },
        { n: 'Royal Banners', vi: 'Băng rôn hoàng gia', p: [['p', '58,178 74,178 74,200 66,194 58,200', RED], ['p', '326,178 342,178 342,200 334,194 326,200', BLU]] },
        { n: 'Knight Minifigure', vi: 'Hiệp sĩ nhí', p: [['fig', 226, 226, 0.5, 'helmet-knight|determined|torso-knight|legs-black|sword']] }
      ]
    }
  };

  /* =========================================================
     MÔ HÌNH CHUNG cho Vùng đất tùy chỉnh (Custom Unit) – "Builder Clubhouse" 12 mảnh theo màu vùng
     ========================================================= */
  function genericModel(color, name, vi) {
    const c = color || RED, d = shade(c, -0.3), l = shade(c, 0.45);
    return {
      name: name || 'Builder Clubhouse', vi: vi || 'Câu lạc bộ Thợ xây',
      parts: [
        { n: 'Green Baseplate', vi: 'Tấm đế xanh lá', p: [['b', 8, 290, 384, 14, GRN]] },
        { n: 'Ground Floor', vi: 'Tầng trệt', p: [['b', 96, 236, 208, 54, c], ['door', 182, 248, 36, 42, BRN]] },
        { n: 'Front Windows', vi: 'Cửa sổ tầng trệt', p: [['win', 112, 248, 50, 30], ['win', 238, 248, 50, 30]] },
        { n: 'Garden Path', vi: 'Lối đi vào nhà', p: [['t', 186, 290, 28, 6, TAN], ['t', 60, 280, 30, 10, LGRY], ['t', 312, 280, 30, 10, LGRY]] },
        { n: 'Second Floor', vi: 'Tầng hai', p: [['b', 106, 180, 188, 56, l]] },
        { n: 'Balcony Windows', vi: 'Cửa sổ ban công', p: [['win', 122, 192, 44, 32], ['win', 234, 192, 44, 32], ['t', 176, 218, 48, 8, WHT]] },
        { n: 'Big Roof', vi: 'Mái nhà lớn', p: [['p', '90,180 200,108 310,180', d]] },
        { n: 'Roof Sign', vi: 'Biển tên trên mái', p: [['t', 158, 150, 84, 20, YEL], ['txt', 200, 165, 'ENGLISH', 12, BLK]] },
        { n: 'Chimney & Flag', vi: 'Ống khói & lá cờ', p: [['b', 252, 122, 22, 40, RBRN], ['l', 200, 110, 200, 72, DGRY, 3], ['p', '200,72 226,80 200,88', c]] },
        { n: 'Left Tree', vi: 'Cây bên trái', p: [['t', 46, 236, 12, 54, BRN], ['c', 52, 222, 26, TGRN], ['c', 40, 238, 16, OGRN]] },
        { n: 'Right Tree & Flowers', vi: 'Cây bên phải & hoa', p: [['t', 342, 244, 10, 46, BRN], ['c', 347, 232, 22, TGRN], ['c', 320, 284, 5, RED], ['c', 332, 284, 5, YEL], ['c', 372, 284, 5, AZ]] },
        { n: 'Builder Minifigure', vi: 'Nhân vật thợ xây', p: [['fig', 22, 226, 0.5, 'cap-red|grin|torso-blue|legs-black|book']] }
      ]
    };
  }
  function registerModel(id, color, name, vi) { MODELS[id] = genericModel(color, name, vi); }
  function unregisterModel(id) { if (/^c\d+$/.test(id)) delete MODELS[id]; }

  function partSvg(part) { return part.p.map(drawPrim).join(''); }

  function partBox(part) {
    let x1 = Infinity, y1 = Infinity, x2 = -Infinity, y2 = -Infinity;
    part.p.forEach((p) => {
      const b = primBox(p);
      x1 = Math.min(x1, b[0]); y1 = Math.min(y1, b[1]); x2 = Math.max(x2, b[2]); y2 = Math.max(y2, b[3]);
    });
    return [x1, y1, x2, y2];
  }

  /**
   * Vẽ cả bộ mô hình.
   * states: mảng 12 phần tử (0 = khóa/bản vẽ, 1 = đã mở chờ lắp, 2 = đã lắp)
   * opts: { cls, target: idx, dropIn: idx|[idx], hideLocked, sparkle }
   */
  function renderModel(zoneId, states, opts = {}) {
    const m = MODELS[zoneId];
    if (!m) return '';
    const st = states || [];
    const drops = [].concat(opts.dropIn == null ? [] : opts.dropIn);
    let g = '';
    m.parts.forEach((part, i) => {
      const s = st[i] || 0;
      if (opts.hideLocked && s < 2) return;
      let cls = s === 2 ? 'assembled' : s === 1 ? 'ready' : 'locked';
      if (opts.target === i) cls += ' target';
      if (drops.indexOf(i) !== -1) cls += ' drop-in';
      g += `<g id="${zoneId}-part-${i + 1}" class="part ${cls}" data-part="${i}">${partSvg(part)}</g>`;
    });
    const shine = `<g class="shine" pointer-events="none">${[[60, 60], [200, 120], [340, 90], [120, 220], [300, 240]].map(([x, y]) =>
      `<polygon points="${x},${y - 12} ${x + 3},${y - 3} ${x + 12},${y} ${x + 3},${y + 3} ${x},${y + 12} ${x - 3},${y + 3} ${x - 12},${y} ${x - 3},${y - 3}" fill="#FFF7B0"/>`).join('')}</g>`;
    return `<svg class="model${opts.cls ? ' ' + opts.cls : ''}${opts.sparkle ? ' sparkle' : ''}" viewBox="0 0 400 320" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="${esc(m.name)}">${g}${shine}</svg>`;
  }

  /** Vẽ riêng một mảnh ghép (khung nhìn ôm sát mảnh). */
  function renderPart(zoneId, idx, opts = {}) {
    const m = MODELS[zoneId];
    if (!m || !m.parts[idx]) return '';
    const part = m.parts[idx];
    const [x1, y1, x2, y2] = partBox(part);
    const pad = 8;
    const w = Math.max(x2 - x1, 20) + pad * 2, h = Math.max(y2 - y1, 20) + pad * 2;
    return `<svg class="part-svg${opts.cls ? ' ' + opts.cls : ''}" viewBox="${x1 - pad} ${y1 - pad} ${w} ${h}" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMidYMid meet" aria-hidden="true"><g class="part assembled">${partSvg(part)}</g></svg>`;
  }

  /* =========================================================
     TÚI MÙ (Mystery Polybag)
     ========================================================= */
  function renderPolybag(color, stage = 0) {
    const c = color || C.RED, d = shade(c, -0.3), l = shade(c, 0.35);
    let teeth = '';
    for (let x = 20; x < 180; x += 10) teeth += `${x},30 ${x + 5},20 `;
    teeth += '180,30';
    let tears = '';
    if (stage >= 1) tears += `<path d="M40 30 L52 48 L46 60" stroke="#fff" stroke-width="3" fill="none" stroke-linecap="round"/>`;
    if (stage >= 2) tears += `<path d="M150 30 L140 52 L152 68 L144 80" stroke="#fff" stroke-width="3" fill="none" stroke-linecap="round"/>`;
    if (stage >= 3) tears += `<path d="M90 30 L100 56 L92 72" stroke="#fff" stroke-width="3.5" fill="none" stroke-linecap="round"/>`;
    return `<svg viewBox="0 0 200 240" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      <polygon points="20,30 ${teeth} 180,30 180,36 20,36" fill="${d}"/>
      <path d="M18 34 L182 34 L176 222 Q100 238 24 222 Z" fill="${c}" stroke="${d}" stroke-width="3"/>
      <path d="M34 50 Q30 130 40 200" stroke="${l}" stroke-width="10" fill="none" stroke-linecap="round" opacity=".5"/>
      <path d="M160 60 Q166 110 160 150" stroke="#fff" stroke-width="5" fill="none" stroke-linecap="round" opacity=".35"/>
      <circle cx="100" cy="122" r="48" fill="#fff" stroke="${d}" stroke-width="4"/>
      <text x="100" y="148" text-anchor="middle" font-family="Fredoka, Nunito, sans-serif" font-weight="700" font-size="72" fill="${c}">?</text>
      <rect x="44" y="184" width="112" height="24" rx="8" fill="${C.YEL}" stroke="${shade(C.YEL, -0.35)}" stroke-width="2"/>
      <text x="100" y="201" text-anchor="middle" font-family="Fredoka, Nunito, sans-serif" font-weight="700" font-size="13" fill="${C.BLK}">MYSTERY BAG</text>
      ${tears}
    </svg>`;
  }

  /* =========================================================
     SA BÀN THẾ GIỚI (Diorama 2.5D)
     ========================================================= */
  const DIO_SLOTS = [
    // hàng sau (nhỏ hơn – xa hơn)
    { x: 22, y: 128, s: 0.5 }, { x: 252, y: 128, s: 0.5 }, { x: 482, y: 128, s: 0.5 }, { x: 712, y: 128, s: 0.5 }, { x: 942, y: 128, s: 0.5 },
    // hàng trước
    { x: 12, y: 318, s: 0.57 }, { x: 250, y: 318, s: 0.57 }, { x: 488, y: 318, s: 0.57 }, { x: 726, y: 318, s: 0.57 }, { x: 964, y: 318, s: 0.57 }
  ];

  /**
   * zones: [{ id, name, color }], states: { z1: [...] }, dusty: { z1: true }, avatar: cfg
   */
  function renderDiorama({ zones, states, dusty, avatar, name }) {
    const W = 1200, H = 540;
    let s = `<svg class="dio" viewBox="0 0 ${W} ${H}" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="My LEGO World">`;
    s += `<defs>
      <linearGradient id="dioSky" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#7CC8F8"/><stop offset="1" stop-color="#D8F0FF"/></linearGradient>
      <pattern id="dioStuds" width="22" height="16" patternUnits="userSpaceOnUse"><ellipse cx="11" cy="8" rx="5.5" ry="3" fill="#000" opacity=".10"/><ellipse cx="11" cy="7" rx="5.5" ry="3" fill="#fff" opacity=".18"/></pattern>
    </defs>`;
    s += `<rect width="${W}" height="${H}" fill="url(#dioSky)"/>`;
    // Mặt trời & mây
    s += `<circle cx="1110" cy="60" r="34" fill="#FFE45C"/><circle cx="1110" cy="60" r="46" fill="#FFE45C" opacity=".25"/>`;
    s += [[140, 52], [470, 34], [820, 64]].map(([x, y]) =>
      `<g opacity=".95"><ellipse cx="${x}" cy="${y}" rx="44" ry="16" fill="#fff"/><ellipse cx="${x - 26}" cy="${y + 4}" rx="24" ry="12" fill="#fff"/><ellipse cx="${x + 28}" cy="${y + 5}" rx="26" ry="11" fill="#fff"/></g>`).join('');
    // Đồi xa
    s += `<path d="M0 230 Q160 150 330 210 T700 200 T1200 190 L1200 300 L0 300 Z" fill="#8BD17C"/>`;
    // Tấm đế lớn (phối cảnh)
    s += `<polygon points="0,250 1200,250 1200,${H} 0,${H}" fill="#00A850"/>`;
    s += `<polygon points="0,250 1200,250 1200,${H} 0,${H}" fill="url(#dioStuds)"/>`;
    // Đường phố giữa hai hàng
    s += `<rect x="0" y="296" width="1200" height="30" fill="#6C6E68"/>`;
    for (let x = 20; x < 1200; x += 80) s += `<rect x="${x}" y="309" width="40" height="5" rx="2" fill="#F4F4F4"/>`;
    s += `<rect x="0" y="292" width="1200" height="5" fill="#A0A5A9"/><rect x="0" y="325" width="1200" height="5" fill="#A0A5A9"/>`;

    const drawSlot = (z, i) => {
      const slot = DIO_SLOTS[i];
      const st = states[z.id] || [];
      const built = st.filter((x) => x === 2).length;
      const w = 400 * slot.s, h = 320 * slot.s;
      const dirty = dusty && dusty[z.id] && built > 0;
      let inner;
      if (built === 0) {
        inner = `<svg x="${slot.x}" y="${slot.y}" width="${w}" height="${h}" viewBox="0 0 400 320">
          <rect x="60" y="250" width="280" height="40" rx="6" fill="#FFD500" stroke="#C7A300" stroke-width="3"/>
          <g fill="#2B2B2B">${[0, 1, 2, 3, 4, 5].map((k) => `<polygon points="${74 + k * 46},250 ${94 + k * 46},250 ${80 + k * 46},290 ${60 + k * 46},290"/>`).join('')}</g>
          <rect x="190" y="150" width="20" height="100" fill="#8C9196"/>
          <rect x="120" y="96" width="160" height="60" rx="10" fill="#fff" stroke="#2B2B2B" stroke-width="4"/>
          <text x="200" y="124" text-anchor="middle" font-family="Fredoka, Nunito, sans-serif" font-weight="700" font-size="22" fill="#2B2B2B">COMING</text>
          <text x="200" y="148" text-anchor="middle" font-family="Fredoka, Nunito, sans-serif" font-weight="700" font-size="22" fill="#E3000B">SOON!</text>
        </svg>`;
      } else {
        inner = `<svg x="${slot.x}" y="${slot.y}" width="${w}" height="${h}" viewBox="0 0 400 320">${renderModel(z.id, st, { hideLocked: false }).replace(/^<svg[^>]*>/, '').replace(/<\/svg>$/, '')}</svg>`;
      }
      const plaqueY = slot.y + h - 4;
      let out = `<g class="dio-model${dirty ? ' dusty' : ''}" data-zone="${z.id}" data-slot="${i}"><g class="dio-inner">${inner}</g>`;
      out += `<rect x="${slot.x + w / 2 - 70}" y="${plaqueY}" width="140" height="22" rx="7" fill="#fff" stroke="${z.color}" stroke-width="3"/>`;
      out += `<text x="${slot.x + w / 2}" y="${plaqueY + 16}" text-anchor="middle" font-family="Fredoka, Nunito, sans-serif" font-weight="600" font-size="13" fill="#1E293B">${esc(z.short || z.name)} · ${built}/12</text>`;
      if (dirty) {
        out += `<g class="wrench-badge"><circle cx="${slot.x + w - 18}" cy="${slot.y + 22}" r="20" fill="#FF7E14" stroke="#fff" stroke-width="4"/><text x="${slot.x + w - 18}" y="${slot.y + 30}" text-anchor="middle" font-size="22">🔧</text></g>`;
        out += `<g opacity=".55" pointer-events="none">${[0, 1, 2, 3, 4].map((k) => `<circle cx="${slot.x + 30 + k * 36}" cy="${slot.y + 40 + (k % 2) * 30}" r="${3 + (k % 3)}" fill="#8B7355"/>`).join('')}</g>`;
      }
      // Hiệu ứng lấp lánh nếu hoàn thành và sạch bóng
      if (built === 12 && !dirty) {
        out += `<text x="${slot.x + 16}" y="${slot.y + 28}" font-size="22">✨</text>`;
      }
      out += `</g>`;
      return out;
    };

    zones.slice(0, 5).forEach((z, i) => { s += drawSlot(z, i); });
    // Nhân vật của bé đứng trên đường
    if (avatar) {
      s += `<g class="dio-fig" data-fig="me"><g transform="translate(1146 238) scale(0.62)">${'<g transform="translate(12 4)">' + minifigInner(avatar) + '</g>'}</g>`;
      s += `<rect x="1142" y="314" width="56" height="18" rx="6" fill="#FFD500" stroke="#C7A300" stroke-width="2"/><text x="1170" y="327" text-anchor="middle" font-family="Fredoka, Nunito, sans-serif" font-weight="700" font-size="11" fill="#1E293B">${esc(String(name || 'Me').slice(0, 9))}</text></g>`;
    }
    zones.slice(5, 10).forEach((z, i) => { s += drawSlot(z, i + 5); });
    s += `</svg>`;
    return s;
  }

  global.LegoSvg = {
    COLORS: C,
    MODELS,
    ITEMS,
    shade,
    renderModel,
    renderPart,
    renderMinifig,
    minifigInner,
    renderPolybag,
    renderDiorama,
    DIO_SLOTS,
    registerModel,
    unregisterModel,
    partCount: (zoneId) => (MODELS[zoneId] ? MODELS[zoneId].parts.length : 0)
  };
})(window);
