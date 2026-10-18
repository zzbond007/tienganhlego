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
    if (torso.back) s += torso.back;   // áo choàng / gai lưng vẽ phía sau
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


  /* =========================================================
     MẪU MÔ HÌNH THEO CHỦ ĐỀ cho Lộ trình 9 Tháng (mỗi mẫu 12 mảnh, đổi màu theo Vùng đất)
     Dữ liệu tuần chọn mẫu bằng model: ['bedroom', 'Tên EN', 'Tên VI']
     ========================================================= */
  const GLS = C.GLASS;
  const P = (n, vi, p) => ({ n, vi, p });
  const TEMPLATES = {
    bedroom: (c, d, l, fig) => [
      P('Wooden Floor', 'Sàn gỗ', [['b', 8, 290, 384, 14, TAN]]),
      P('Bedroom Wall', 'Bức tường phòng ngủ', [['t', 16, 110, 368, 180, l]]),
      P('Bedroom Window', 'Cửa sổ phòng ngủ', [['win', 230, 130, 90, 58], ['t', 224, 186, 102, 8, WHT]]),
      P('Bed Frame', 'Khung giường', [['b', 30, 248, 170, 42, BRN]]),
      P('Mattress & Pillow', 'Đệm & gối', [['t', 34, 232, 162, 16, WHT], ['e', 58, 228, 20, 9, WHT]]),
      P('Cozy Blanket', 'Chăn ấm', [['t', 84, 226, 112, 22, c]]),
      P('Bedside Lamp', 'Đèn ngủ đầu giường', [['b', 206, 256, 34, 34, RBRN], ['l', 223, 256, 223, 226, DGRY, 3], ['p', '211,226 235,226 229,208 217,208', YEL]]),
      P('Wall Clock', 'Đồng hồ treo tường', [['c', 120, 160, 18, WHT], ['l', 120, 160, 120, 148, BLK, 2], ['l', 120, 160, 130, 164, BLK, 2]]),
      P('Bookshelf', 'Giá sách', [['b', 332, 214, 50, 76, BRN]]),
      P('Story Books', 'Sách truyện', [['t', 338, 224, 8, 22, RED], ['t', 348, 224, 8, 22, BLU], ['t', 358, 224, 8, 22, YEL], ['t', 338, 256, 30, 6, GRN]]),
      P('School Bag', 'Cặp sách', [['b', 294, 262, 30, 28, BLU], ['t', 299, 268, 20, 6, YEL]]),
      P('Minifigure', 'Nhân vật', [['fig', 246, 226, 0.5, fig]])
    ],
    kitchen: (c, d, l, fig) => [
      P('Tiled Floor', 'Sàn gạch', [['b', 8, 290, 384, 14, MGRY]]),
      P('Kitchen Wall', 'Tường bếp', [['t', 16, 110, 368, 180, l]]),
      P('Kitchen Window', 'Cửa sổ bếp', [['win', 50, 128, 80, 56]]),
      P('Counter & Cupboards', 'Kệ bếp & tủ', [['b', 24, 232, 180, 58, WHT], ['t', 34, 250, 70, 32, c], ['t', 114, 250, 80, 32, c]]),
      P('Sink & Tap', 'Bồn rửa & vòi nước', [['t', 44, 224, 60, 8, LGRY], ['l', 96, 224, 96, 206, DGRY, 3], ['l', 96, 206, 84, 206, DGRY, 3]]),
      P('Clean Plates', 'Chồng bát đĩa sạch', [['t', 116, 220, 36, 6, WHT], ['t', 116, 214, 36, 6, AZ]]),
      P('Rice Cooker', 'Nồi cơm điện', [['b', 162, 208, 32, 24, WHT], ['dome', 178, 208, 15, c]]),
      P('Stove', 'Bếp nấu', [['b', 212, 236, 100, 54, DGRY], ['e', 236, 232, 13, 4, BLK], ['e', 288, 232, 13, 4, BLK]]),
      P('Cooking Pot', 'Nồi nấu canh', [['b', 266, 206, 40, 26, RED], ['l', 306, 214, 318, 214, DGRY, 3]]),
      P('Fridge', 'Tủ lạnh', [['b', 322, 150, 62, 140, WHT], ['l', 326, 200, 380, 200, LGRY, 2], ['t', 372, 164, 4, 26, DGRY], ['t', 372, 212, 4, 40, DGRY]]),
      P('Spice Shelf', 'Kệ gia vị', [['t', 170, 160, 130, 6, BRN], ['b', 180, 140, 20, 20, ORG], ['b', 208, 140, 20, 20, GRN], ['b', 236, 140, 20, 20, YEL]]),
      P('Minifigure', 'Nhân vật', [['fig', 140, 226, 0.5, fig]])
    ],
    picnic: (c, d, l, fig) => [
      P('Grass Baseplate', 'Tấm đế cỏ', [['b', 8, 290, 384, 14, GRN]]),
      P('Tree Trunk', 'Thân cây', [['t', 40, 170, 22, 120, BRN]]),
      P('Tree Leaves', 'Tán lá', [['c', 51, 150, 46, TGRN], ['c', 22, 176, 22, OGRN], ['c', 84, 172, 24, OGRN]]),
      P('Sunshine', 'Ông mặt trời', [['c', 350, 50, 24, YEL]]),
      P('Fluffy Cloud', 'Đám mây', [['e', 250, 60, 36, 14, WHT], ['e', 226, 64, 20, 10, WHT]]),
      P('Picnic Blanket', 'Thảm dã ngoại', [['p', '120,288 330,288 300,262 150,262', c], ['l', 170, 262, 160, 288, WHT, 3], ['l', 225, 262, 225, 288, WHT, 3], ['l', 280, 262, 290, 288, WHT, 3]]),
      P('Picnic Basket', 'Giỏ dã ngoại', [['b', 196, 240, 46, 26, RBRN], ['l', 200, 240, 219, 226, BRN, 3], ['l', 219, 226, 238, 240, BRN, 3]]),
      P('Fruit Snacks', 'Trái cây ăn nhẹ', [['c', 266, 256, 7, RED], ['c', 283, 256, 7, ORG], ['c', 170, 256, 6, GRN]]),
      P('Flying Kite', 'Diều bay', [['p', '300,90 320,110 300,140 280,110', RED], ['l', 300, 140, 342, 232, DGRY, 1.5]]),
      P('Flowers', 'Khóm hoa', [['l', 360, 290, 360, 272, DGRN, 2], ['c', 360, 270, 6, c], ['l', 374, 290, 374, 276, DGRN, 2], ['c', 374, 274, 6, YEL], ['l', 386, 290, 386, 270, DGRN, 2], ['c', 386, 268, 6, RED]]),
      P('Parent Minifigure', 'Bố/Mẹ', [['fig', 96, 226, 0.5, 'hair-brown|smile|torso-stars|legs-white|none']]),
      P('Kid Minifigure', 'Bé', [['fig', 322, 226, 0.5, fig]])
    ],
    classroom: (c, d, l, fig) => [
      P('Classroom Floor', 'Sàn lớp học', [['b', 8, 290, 384, 14, TAN]]),
      P('Classroom Wall', 'Tường lớp học', [['t', 16, 100, 368, 190, l]]),
      P('Board Frame', 'Khung bảng', [['t', 104, 120, 192, 90, BRN]]),
      P('Blackboard', 'Bảng đen', [['t', 110, 126, 180, 78, DGRN], ['txt', 200, 172, 'A B C', 24, WHT]]),
      P('Wall Clock', 'Đồng hồ', [['c', 340, 140, 18, WHT], ['l', 340, 140, 340, 128, BLK, 2], ['l', 340, 140, 350, 144, BLK, 2]]),
      P("Teacher's Desk", 'Bàn giáo viên', [['b', 30, 240, 100, 50, BRN]]),
      P('Globe', 'Quả địa cầu', [['c', 60, 214, 16, AZ], ['p', '52,206 66,204 70,214 58,220', GRN], ['l', 60, 230, 60, 238, DGRY, 3]]),
      P('Books on the Desk', 'Sách trên bàn', [['t', 90, 228, 30, 6, RED], ['t', 92, 222, 26, 6, BLU]]),
      P('Student Desk 1', 'Bàn học sinh 1', [['t', 190, 250, 70, 8, c], ['l', 196, 258, 196, 290, DGRY, 3], ['l', 254, 258, 254, 290, DGRY, 3]]),
      P('Student Desk 2', 'Bàn học sinh 2', [['t', 290, 250, 70, 8, c], ['l', 296, 258, 296, 290, DGRY, 3], ['l', 354, 258, 354, 290, DGRY, 3]]),
      P('Crayons & Pencil Case', 'Bút màu & hộp bút', [['t', 300, 242, 30, 8, d], ['t', 216, 240, 4, 10, RED], ['t', 222, 240, 4, 10, BLU], ['t', 228, 240, 4, 10, YEL]]),
      P('Minifigure', 'Nhân vật', [['fig', 138, 226, 0.5, fig]])
    ],
    school: (c, d, l, fig) => [
      P('Green Baseplate', 'Tấm đế xanh', [['b', 8, 290, 384, 14, GRN]]),
      P('Ground Floor', 'Tầng trệt', [['b', 80, 236, 240, 54, c], ['door', 182, 250, 36, 40, BRN]]),
      P('Ground Windows', 'Cửa sổ tầng trệt', [['win', 96, 248, 56, 28], ['win', 248, 248, 56, 28]]),
      P('Upper Floor', 'Tầng trên', [['b', 90, 184, 220, 52, l]]),
      P('Upper Windows', 'Cửa sổ tầng trên', [['win', 104, 196, 40, 26], ['win', 180, 196, 40, 26], ['win', 256, 196, 40, 26]]),
      P('School Roof', 'Mái trường', [['p', '76,184 200,140 324,184', d]]),
      P('Bell Tower', 'Tháp chuông', [['b', 180, 104, 40, 36, WHT], ['p', '174,104 200,80 226,104', RED]]),
      P('Tower Clock', 'Đồng hồ tháp', [['c', 200, 122, 10, YEL], ['l', 200, 122, 200, 115, BLK, 2]]),
      P('School Sign', 'Biển tên trường', [['t', 160, 164, 80, 16, WHT], ['txt', 200, 176, 'SCHOOL', 11, BLK]]),
      P('Flagpole', 'Cột cờ', [['l', 362, 290, 362, 140, DGRY, 3], ['p', '362,140 394,150 362,160', RED], ['txt', 374, 154, '★', 10, YEL]]),
      P('Schoolyard Tree', 'Cây sân trường', [['t', 36, 230, 12, 60, BRN], ['c', 42, 214, 26, TGRN]]),
      P('Minifigure', 'Nhân vật', [['fig', 318, 226, 0.5, fig]])
    ],
    playground: (c, d, l, fig) => [
      P('Grass Baseplate', 'Tấm đế cỏ', [['b', 8, 290, 384, 14, GRN]]),
      P('Slide Ladder', 'Thang cầu trượt', [['l', 40, 290, 58, 190, RED, 4], ['l', 70, 290, 88, 190, RED, 4], ['l', 46, 262, 76, 262, RED, 3], ['l', 50, 238, 80, 238, RED, 3], ['l', 54, 214, 84, 214, RED, 3]]),
      P('Slide Platform', 'Bục cầu trượt', [['t', 54, 184, 54, 8, BLU]]),
      P('Slide Chute', 'Máng trượt', [['p', '104,184 116,184 190,286 172,290', YEL]]),
      P('Swing Frame', 'Khung xích đu', [['l', 232, 290, 246, 170, c, 5], ['l', 332, 290, 318, 170, c, 5], ['l', 240, 170, 324, 170, DGRY, 5]]),
      P('Swing Seat', 'Ghế xích đu', [['l', 270, 172, 270, 250, DGRY, 2], ['l', 294, 172, 294, 250, DGRY, 2], ['t', 264, 250, 36, 6, RED]]),
      P('Chess Table', 'Bàn cờ vua', [['t', 344, 262, 44, 6, BRN], ['l', 366, 268, 366, 290, DGRY, 3], ['t', 352, 256, 28, 6, WHT], ['t', 352, 256, 7, 6, BLK], ['t', 366, 256, 7, 6, BLK]]),
      P('Football', 'Quả bóng', [['c', 210, 282, 8, WHT], ['c', 210, 282, 3, BLK]]),
      P('Sunshine', 'Ông mặt trời', [['c', 360, 48, 22, YEL]]),
      P('Little Tree', 'Cây nhỏ', [['t', 14, 220, 10, 70, BRN], ['c', 19, 206, 18, TGRN]]),
      P('Kite', 'Con diều', [['p', '150,60 166,76 150,100 134,76', ORG], ['l', 150, 100, 186, 150, DGRY, 1.5]]),
      P('Minifigure', 'Nhân vật', [['fig', 182, 226, 0.5, fig]])
    ],
    busstop: (c, d, l, fig) => [
      P('Pavement', 'Vỉa hè', [['b', 8, 290, 384, 14, LGRY]]),
      P('Shelter Roof', 'Mái chờ xe buýt', [['t', 50, 176, 150, 10, c]]),
      P('Shelter Poles', 'Cột mái chờ', [['l', 60, 186, 60, 290, DGRY, 4], ['l', 190, 186, 190, 290, DGRY, 4]]),
      P('Glass Panel', 'Vách kính', [['t', 62, 190, 126, 60, GLS]]),
      P('Bench', 'Ghế chờ', [['t', 80, 256, 90, 8, BRN], ['l', 90, 264, 90, 290, DGRY, 3], ['l', 160, 264, 160, 290, DGRY, 3]]),
      P('Bus Stop Sign', 'Biển trạm xe buýt', [['l', 230, 290, 230, 170, DGRY, 3], ['c', 230, 164, 15, d], ['txt', 230, 169, 'BUS', 10, WHT]]),
      P('Bus Body', 'Thân xe buýt', [['b', 270, 206, 124, 72, YEL], ['win', 280, 216, 30, 24], ['win', 318, 216, 30, 24], ['win', 356, 216, 30, 24]]),
      P('Bus Wheels', 'Bánh xe buýt', [['w', 300, 282, 12], ['w', 366, 282, 12]]),
      P('Recycling Bin', 'Thùng rác phân loại', [['b', 10, 256, 30, 34, GRN], ['t', 12, 250, 26, 6, DGRN]]),
      P('Friend in Line', 'Bạn xếp hàng 1', [['fig', 66, 226, 0.5, 'hair-blonde|smile|torso-red|legs-blue|book']]),
      P('Friend in Line 2', 'Bạn xếp hàng 2', [['fig', 110, 226, 0.5, 'cap-red|grin|torso-blue|legs-black|none']]),
      P('Minifigure', 'Nhân vật', [['fig', 154, 226, 0.5, fig]])
    ],
    cafe: (c, d, l, fig) => [
      P('Street Baseplate', 'Tấm đế phố', [['b', 8, 290, 384, 14, LGRY]]),
      P('Restaurant Wall', 'Tường quán ăn', [['b', 40, 172, 240, 118, WHT]]),
      P('Door & Window', 'Cửa ra vào & cửa sổ', [['door', 190, 226, 40, 64, BRN], ['win', 60, 204, 100, 50]]),
      P('Roof Edge', 'Mép mái', [['t', 34, 164, 252, 10, d]]),
      P('Striped Awning', 'Mái hiên sọc', [['p', '30,174 290,174 280,198 40,198', c], ['p', '82,174 108,174 106,198 84,198', WHT], ['p', '160,174 186,174 186,198 160,198', WHT], ['p', '238,174 264,174 262,198 240,198', WHT]]),
      P('Shop Sign', 'Biển hiệu', [['t', 100, 132, 120, 30, YEL], ['txt', 160, 153, 'PHO', 18, RED]]),
      P('Outdoor Table', 'Bàn ngoài trời', [['t', 300, 250, 80, 8, RBRN], ['l', 340, 258, 340, 290, DGRY, 4]]),
      P('Bowl of Noodles', 'Bát phở', [['e', 324, 245, 14, 6, WHT], ['e', 324, 242, 11, 3, ORG]]),
      P('Drinks', 'Đồ uống', [['t', 352, 232, 10, 16, ORG], ['t', 366, 232, 10, 16, GRN]]),
      P('Red Lantern', 'Đèn lồng đỏ', [['l', 300, 112, 300, 130, DGRY, 2], ['e', 300, 142, 12, 14, RED], ['t', 296, 154, 8, 6, YEL]]),
      P('Plant Pot', 'Chậu cây', [['t', 12, 262, 24, 28, RBRN], ['c', 24, 250, 14, TGRN]]),
      P('Minifigure', 'Nhân vật', [['fig', 236, 226, 0.5, fig]])
    ],
    shop: (c, d, l, fig) => [
      P('Street Baseplate', 'Tấm đế phố', [['b', 8, 290, 384, 14, LGRY]]),
      P('Shop Building', 'Tòa nhà siêu thị', [['b', 30, 176, 300, 114, WHT]]),
      P('Roof Stripe', 'Viền mái', [['t', 24, 168, 312, 10, c]]),
      P('Big Sign', 'Biển hiệu lớn', [['t', 90, 136, 180, 30, c], ['txt', 180, 157, 'SUPERMARKET', 13, WHT]]),
      P('Glass Doors', 'Cửa kính', [['t', 150, 220, 60, 70, GLS], ['l', 180, 220, 180, 290, WHT, 2]]),
      P('Fruit Shelf', 'Kệ trái cây', [['win', 44, 200, 90, 60], ['t', 48, 226, 82, 4, BRN], ['c', 58, 220, 5, RED], ['c', 72, 220, 5, ORG], ['c', 86, 220, 5, GRN], ['t', 100, 214, 8, 12, YEL], ['t', 112, 214, 8, 12, AZ]]),
      P('Milk Shelf', 'Kệ sữa', [['win', 226, 200, 90, 60], ['t', 230, 226, 82, 4, BRN], ['t', 236, 212, 10, 14, WHT], ['t', 250, 212, 10, 14, WHT], ['c', 276, 220, 5, YEL], ['c', 292, 220, 5, RED]]),
      P('Open Sign', 'Biển "Mở cửa"', [['t', 156, 206, 48, 12, YEL], ['txt', 180, 215, 'OPEN', 9, RED]]),
      P('Shopping Trolley', 'Xe đẩy hàng', [['p', '334,240 390,240 382,270 342,270', MGRY], ['w', 346, 280, 6], ['w', 376, 280, 6], ['l', 334, 240, 328, 226, DGRY, 3]]),
      P('Groceries', 'Hàng hóa trong xe', [['c', 350, 236, 7, ORG], ['t', 362, 224, 10, 14, AZ], ['c', 378, 236, 6, GRN]]),
      P('Bushes', 'Bụi cây', [['c', 46, 282, 10, TGRN], ['c', 66, 282, 10, OGRN], ['c', 110, 282, 10, TGRN]]),
      P('Minifigure', 'Nhân vật', [['fig', 276, 226, 0.5, fig]])
    ],
    garden: (c, d, l, fig) => {
      const posts = [];
      for (let x = 20; x <= 380; x += 40) posts.push(['t', x, 228, 8, 62, WHT]);
      return [
        P('Grass Baseplate', 'Tấm đế cỏ', [['b', 8, 290, 384, 14, GRN]]),
        P('Garden Fence', 'Hàng rào vườn', [['t', 8, 240, 384, 6, WHT]].concat(posts)),
        P('Apple Tree Trunk', 'Thân cây táo', [['t', 60, 170, 20, 120, BRN]]),
        P('Apple Tree Leaves', 'Tán cây táo', [['c', 70, 148, 50, TGRN]]),
        P('Red Apples', 'Những quả táo đỏ', [['c', 50, 140, 7, RED], ['c', 92, 160, 7, RED], ['c', 72, 118, 7, RED]]),
        P('Flower Bed', 'Luống hoa', [['l', 180, 290, 180, 262, DGRN, 3], ['c', 180, 258, 8, c], ['l', 204, 290, 204, 268, DGRN, 3], ['c', 204, 264, 8, YEL], ['l', 290, 290, 290, 264, DGRN, 3], ['c', 290, 260, 8, RED], ['l', 314, 290, 314, 270, DGRN, 3], ['c', 314, 266, 8, d]]),
        P('Busy Bee', 'Chú ong', [['e', 220, 120, 9, 6, YEL], ['l', 218, 114, 218, 126, BLK, 2], ['e', 222, 111, 6, 4, WHT]]),
        P('Butterfly', 'Bươm bướm', [['e', 300, 110, 10, 7, c], ['e', 316, 110, 10, 7, c], ['l', 308, 102, 308, 118, BLK, 2]]),
        P('Singing Bird', 'Chim hót', [['e', 340, 168, 12, 8, AZ], ['p', '352,166 360,168 352,171', ORG], ['txt', 362, 150, '♪', 20, BLK]]),
        P('Sunshine', 'Ông mặt trời', [['c', 362, 44, 20, YEL]]),
        P('Fruit Basket', 'Giỏ trái cây', [['b', 120, 262, 40, 28, RBRN], ['c', 130, 256, 7, YEL], ['c', 148, 256, 7, RED]]),
        P('Minifigure', 'Nhân vật', [['fig', 226, 226, 0.5, fig]])
      ];
    },
    clinic: (c, d, l, fig) => [
      P('Green Baseplate', 'Tấm đế xanh', [['b', 8, 290, 384, 14, GRN]]),
      P('Clinic Wall', 'Tường phòng khám', [['b', 60, 172, 220, 118, WHT]]),
      P('Clinic Roof', 'Mái phòng khám', [['t', 54, 162, 232, 12, c]]),
      P('Red Cross Sign', 'Biển chữ thập đỏ', [['t', 150, 118, 40, 40, WHT], ['t', 164, 124, 12, 28, RED], ['t', 156, 132, 28, 12, RED]]),
      P('Clinic Door', 'Cửa phòng khám', [['door', 150, 226, 40, 64, AZ]]),
      P('Clinic Windows', 'Cửa sổ phòng khám', [['win', 76, 196, 56, 40], ['win', 208, 196, 56, 40]]),
      P('Ambulance Body', 'Thân xe cứu thương', [['b', 290, 222, 104, 54, WHT], ['t', 290, 240, 104, 8, RED]]),
      P('Ambulance Light', 'Đèn & dấu thập', [['t', 300, 208, 14, 8, AZ], ['t', 352, 250, 6, 18, RED], ['t', 346, 256, 18, 6, RED]]),
      P('Ambulance Wheels', 'Bánh xe cứu thương', [['w', 312, 282, 11], ['w', 372, 282, 11]]),
      P('Little Tree', 'Cây nhỏ', [['t', 18, 220, 10, 70, BRN], ['c', 23, 206, 18, TGRN]]),
      P('First Aid Kit', 'Hộp sơ cứu', [['b', 96, 268, 30, 22, RED], ['t', 108, 272, 6, 14, WHT], ['t', 104, 276, 14, 6, WHT]]),
      P('Minifigure', 'Nhân vật', [['fig', 196, 226, 0.5, fig]])
    ]
  };
  /* ---------- Mẫu mô hình Giai đoạn 2 (Khoa học Tự nhiên) & Giai đoạn 3 (Thế giới) ---------- */
  const PNK = '#F4A7B9', SAND = '#E9D29A', NIGHT = '#1E2A4A', PALE = '#FFF3B0';
  Object.assign(TEMPLATES, {
    greenhouse: (c, d, l, fig) => [
      P('Grass Baseplate', 'Tấm đế cỏ', [['b', 8, 290, 384, 14, GRN]]),
      P('Soil Bed', 'Luống đất', [['b', 44, 264, 170, 26, BRN]]),
      P('Little Sprouts', 'Mầm cây nhỏ', [['l', 60, 264, 60, 250, TGRN, 3], ['e', 60, 248, 6, 3, TGRN], ['l', 90, 264, 90, 244, TGRN, 3], ['e', 90, 242, 7, 3, TGRN]]),
      P('Sunflower', 'Hoa hướng dương', [['l', 150, 264, 150, 172, DGRN, 4], ['e', 138, 222, 11, 5, TGRN], ['e', 162, 202, 11, 5, TGRN], ['c', 150, 162, 17, YEL], ['c', 150, 162, 7, BRN]]),
      P('Greenhouse Glass', 'Nhà kính', [['t', 232, 170, 150, 120, GLS], ['p', '224,170 307,122 390,170', GLS]]),
      P('Greenhouse Frame', 'Khung nhà kính', [['l', 307, 122, 307, 290, WHT, 3], ['l', 232, 170, 382, 170, WHT, 3], ['l', 232, 230, 382, 230, WHT, 2]]),
      P('Tomato Plant', 'Cây cà chua', [['l', 270, 290, 270, 214, DGRN, 3], ['e', 270, 210, 13, 8, TGRN], ['c', 262, 236, 6, RED], ['c', 279, 252, 6, RED]]),
      P('Flower Pot', 'Chậu cây', [['b', 326, 262, 40, 28, RBRN], ['c', 346, 252, 14, OGRN]]),
      P('Watering Can', 'Bình tưới', [['b', 10, 268, 30, 22, c], ['l', 40, 272, 52, 260, c, 4]]),
      P('Sunshine', 'Ông mặt trời', [['c', 60, 60, 24, YEL], ['l', 60, 26, 60, 16, YEL, 3], ['l', 94, 60, 104, 60, YEL, 3], ['l', 84, 36, 92, 28, YEL, 3]]),
      P('Rain Cloud', 'Mây mưa', [['e', 180, 72, 34, 14, WHT], ['e', 158, 78, 18, 10, WHT], ['l', 168, 92, 164, 104, AZ, 2], ['l', 184, 92, 180, 104, AZ, 2], ['l', 200, 90, 196, 102, AZ, 2]]),
      P('Minifigure', 'Nhân vật', [['fig', 186, 226, 0.5, fig]])
    ],
    aquarium: (c, d, l, fig) => [
      P('Wooden Floor', 'Sàn gỗ', [['b', 8, 290, 384, 14, TAN]]),
      P('Tank Stand', 'Kệ bể cá', [['b', 56, 252, 288, 38, BRN]]),
      P('Tank Water', 'Nước trong bể', [['t', 60, 112, 280, 140, AZ], ['l', 60, 112, 60, 252, WHT, 3], ['l', 340, 112, 340, 252, WHT, 3]]),
      P('Gravel', 'Sỏi đáy bể', [['t', 60, 234, 280, 18, SAND], ['c', 90, 238, 4, MGRY], ['c', 180, 240, 3, MGRY], ['c', 316, 238, 4, MGRY]]),
      P('Driftwood', 'Lũa', [['p', '104,234 168,200 182,206 124,234', BRN]]),
      P('Water Plants', 'Cây thủy sinh', [['l', 226, 234, 220, 168, TGRN, 4], ['l', 242, 234, 250, 158, DGRN, 4], ['l', 300, 234, 294, 180, TGRN, 4]]),
      P('Aquarium Rock', 'Đá trang trí', [['e', 286, 228, 22, 12, DGRY]]),
      P('Orange Fish', 'Cá cam', [['e', 150, 152, 16, 9, ORG], ['p', '134,152 122,143 122,161', ORG], ['c', 158, 150, 2, BLK]]),
      P('Yellow Fish', 'Cá vàng', [['e', 262, 130, 12, 7, YEL], ['p', '274,130 284,123 284,137', YEL], ['c', 256, 129, 2, BLK]]),
      P('Air Bubbles', 'Bọt khí', [['c', 108, 186, 4, WHT], ['c', 112, 166, 3, WHT], ['c', 106, 146, 2, WHT]]),
      P('Filter & Light', 'Máy lọc & đèn', [['t', 56, 102, 288, 10, DGRY], ['t', 306, 114, 14, 60, LGRY]]),
      P('Minifigure', 'Nhân vật', [['fig', 346, 226, 0.5, fig]])
    ],
    meadow: (c, d, l, fig) => [
      P('Grass Baseplate', 'Tấm đế cỏ', [['b', 8, 290, 384, 14, GRN]]),
      P('Tree Trunk', 'Thân cây', [['t', 30, 150, 22, 140, BRN]]),
      P('Tree Leaves', 'Tán lá', [['c', 41, 128, 40, TGRN]]),
      P('Beehive', 'Tổ ong', [['l', 84, 150, 84, 160, BRN, 2], ['e', 84, 178, 16, 20, YEL], ['l', 70, 172, 98, 172, ORG, 2], ['l', 70, 184, 98, 184, ORG, 2]]),
      P('Busy Bees', 'Những chú ong', [['e', 116, 168, 6, 4, YEL], ['l', 114, 164, 114, 172, BLK, 1.5], ['e', 134, 190, 6, 4, YEL], ['l', 132, 186, 132, 194, BLK, 1.5]]),
      P('Big Leaf', 'Chiếc lá to', [['e', 250, 252, 40, 13, TGRN], ['l', 212, 252, 288, 252, DGRN, 2]]),
      P('Ladybird', 'Bọ rùa', [['dome', 252, 248, 10, RED], ['c', 248, 244, 2, BLK], ['c', 256, 244, 2, BLK]]),
      P('Anthill', 'Tổ kiến', [['p', '300,290 330,252 360,290', RBRN], ['c', 318, 284, 2, BLK], ['c', 340, 278, 2, BLK]]),
      P('Earthworm', 'Giun đất', [['e', 160, 285, 14, 4, PNK], ['e', 178, 283, 6, 3, PNK]]),
      P('Meadow Flowers', 'Hoa đồng cỏ', [['l', 372, 290, 372, 270, DGRN, 3], ['c', 372, 266, 7, c], ['l', 388, 290, 388, 274, DGRN, 3], ['c', 388, 270, 6, YEL]]),
      P('Butterfly', 'Bươm bướm', [['e', 300, 140, 12, 8, c], ['e', 318, 140, 12, 8, c], ['l', 309, 132, 309, 148, BLK, 2]]),
      P('Minifigure', 'Nhân vật', [['fig', 186, 226, 0.5, fig]])
    ],
    safari: (c, d, l, fig) => [
      P('Savanna Baseplate', 'Tấm đế thảo nguyên', [['b', 8, 290, 384, 14, SAND]]),
      P('Acacia Trunk', 'Thân cây keo', [['t', 60, 190, 10, 100, BRN]]),
      P('Acacia Canopy', 'Tán cây keo', [['e', 65, 184, 52, 14, OGRN]]),
      P('Giraffe Body', 'Thân hươu cao cổ', [['e', 160, 236, 26, 14, YEL], ['l', 144, 246, 144, 290, YEL, 4], ['l', 174, 246, 174, 290, YEL, 4], ['c', 154, 232, 3, BRN], ['c', 166, 240, 3, BRN]]),
      P('Giraffe Neck', 'Cổ hươu cao cổ', [['l', 178, 230, 196, 170, YEL, 7], ['e', 200, 166, 10, 7, YEL], ['c', 188, 200, 3, BRN]]),
      P('Elephant Body', 'Thân voi', [['e', 282, 250, 36, 24, LGRY], ['t', 258, 262, 12, 28, LGRY], ['t', 292, 262, 12, 28, LGRY]]),
      P('Elephant Head', 'Đầu voi', [['c', 318, 240, 16, LGRY], ['l', 328, 250, 332, 282, LGRY, 6], ['e', 308, 236, 10, 14, MGRY]]),
      P('Waterhole', 'Vũng nước', [['e', 225, 288, 34, 5, AZ]]),
      P('Safari Jeep', 'Xe jeep safari', [['b', 344, 262, 50, 22, c], ['w', 356, 286, 6], ['w', 384, 286, 6]]),
      P('Hot Sun', 'Mặt trời nóng', [['c', 350, 50, 24, ORG]]),
      P('Flying Birds', 'Đàn chim', [['txt', 250, 72, 'v  v', 16, BLK]]),
      P('Ranger Minifigure', 'Kiểm lâm', [['fig', 90, 226, 0.5, fig]])
    ],
    weather: (c, d, l, fig) => [
      P('Grass Baseplate', 'Tấm đế cỏ', [['b', 8, 290, 384, 14, GRN]]),
      P('Weather Hut', 'Trạm thời tiết', [['b', 40, 222, 110, 68, WHT], ['door', 82, 246, 28, 44, c]]),
      P('Hut Roof', 'Mái trạm', [['p', '32,222 95,184 158,222', d]]),
      P('Weather Vane', 'Chong chóng gió', [['l', 95, 184, 95, 146, DGRY, 2], ['p', '95,146 119,152 95,158', RED], ['txt', 95, 142, 'N', 10, BLK]]),
      P('Thermometer', 'Nhiệt kế', [['t', 188, 182, 14, 88, WHT], ['t', 192, 212, 6, 58, RED], ['c', 195, 272, 9, RED]]),
      P('Wind Cups', 'Máy đo gió', [['l', 250, 290, 250, 192, DGRY, 3], ['l', 230, 192, 270, 192, DGRY, 2], ['c', 230, 192, 6, c], ['c', 270, 192, 6, c]]),
      P('Rain Gauge', 'Ống đo mưa', [['t', 288, 250, 20, 40, GLS], ['t', 288, 272, 20, 18, AZ]]),
      P('Forecast Screen', 'Màn hình dự báo', [['t', 318, 180, 72, 50, DGRY], ['c', 342, 200, 8, YEL], ['e', 364, 212, 14, 7, WHT], ['l', 354, 230, 354, 290, DGRY, 3]]),
      P('Rainbow', 'Cầu vồng', [['dome', 200, 108, 60, RED], ['dome', 200, 108, 50, YEL], ['dome', 200, 108, 40, AZ], ['dome', 200, 108, 30, '#E0F2FE']]),
      P('Fluffy Cloud', 'Đám mây', [['e', 310, 80, 34, 14, WHT], ['e', 288, 86, 18, 10, WHT]]),
      P('Sunshine', 'Ông mặt trời', [['c', 60, 60, 20, YEL]]),
      P('Minifigure', 'Nhân vật', [['fig', 140, 226, 0.5, fig]])
    ],
    watercycle: (c, d, l, fig) => [
      P('Seabed', 'Đáy biển', [['b', 8, 290, 384, 14, BLU]]),
      P('Blue Sea', 'Biển xanh', [['t', 8, 260, 170, 30, AZ]]),
      P('Big Mountain', 'Ngọn núi', [['p', '200,290 300,150 400,290', MGRY]]),
      P('Snowy Top', 'Đỉnh núi tuyết', [['p', '280,178 300,150 320,178', WHT]]),
      P('River', 'Dòng sông', [['p', '306,204 318,208 184,290 164,290', AZ]]),
      P('Hot Sun', 'Mặt trời nóng', [['c', 60, 60, 26, YEL]]),
      P('Evaporation Arrows', 'Mũi tên bốc hơi', [['l', 84, 248, 84, 176, WHT, 2], ['p', '78,180 84,168 90,180', WHT], ['l', 124, 248, 124, 186, WHT, 2], ['p', '118,190 124,178 130,190', WHT]]),
      P('Rain Cloud', 'Mây mưa', [['e', 222, 80, 50, 20, WHT], ['e', 190, 86, 26, 14, WHT], ['e', 254, 88, 26, 13, WHT]]),
      P('Raindrops', 'Giọt mưa', [['l', 200, 106, 196, 120, AZ, 2], ['l', 218, 106, 214, 120, AZ, 2], ['l', 236, 106, 232, 120, AZ, 2], ['l', 254, 106, 250, 120, AZ, 2]]),
      P('Sailing Boat', 'Thuyền buồm', [['p', '40,258 100,258 92,270 48,270', c], ['l', 70, 258, 70, 224, BRN, 2], ['p', '70,226 92,250 70,250', WHT]]),
      P('Jumping Fish', 'Cá nhảy', [['e', 150, 252, 8, 4, ORG], ['p', '142,252 136,248 136,256', ORG]]),
      P('Minifigure', 'Nhân vật', [['fig', 184, 226, 0.5, fig]])
    ],
    boutique: (c, d, l, fig) => [
      P('Street Baseplate', 'Tấm đế phố', [['b', 8, 290, 384, 14, LGRY]]),
      P('Shop Wall', 'Tường cửa hàng', [['b', 44, 172, 296, 118, l]]),
      P('Shop Sign', 'Biển hiệu', [['t', 120, 138, 148, 26, c], ['txt', 194, 156, 'SEASONS', 12, WHT]]),
      P('Awning', 'Mái hiên', [['p', '38,172 346,172 336,192 48,192', d]]),
      P('Shop Window', 'Tủ kính', [['win', 58, 202, 150, 70]]),
      P('Summer T-shirt', 'Áo phông mùa hè', [['p', '80,214 96,208 108,214 116,224 108,228 108,256 84,256 84,228 76,224', RED]]),
      P('Raincoat', 'Áo mưa', [['p', '132,210 150,210 158,258 124,258', YEL]]),
      P('Winter Sweater', 'Áo len mùa đông', [['p', '166,214 196,214 202,252 162,252', BLU]]),
      P('Shop Door', 'Cửa ra vào', [['door', 236, 222, 40, 68, BRN]]),
      P('Hat Stand', 'Giá treo mũ', [['l', 300, 290, 300, 222, DGRY, 3], ['e', 300, 216, 16, 6, RED], ['dome', 300, 214, 10, RED]]),
      P('Umbrella', 'Ô dù', [['p', '6,232 42,232 24,214', AZ], ['l', 24, 232, 24, 272, BLK, 2]]),
      P('Minifigure', 'Nhân vật', [['fig', 316, 226, 0.5, fig]])
    ],
    recycling: (c, d, l, fig) => [
      P('Grass Baseplate', 'Tấm đế cỏ', [['b', 8, 290, 384, 14, GRN]]),
      P('Paper Bin', 'Thùng giấy', [['b', 20, 240, 50, 50, BLU], ['txt', 45, 270, 'PAPER', 8, WHT]]),
      P('Plastic Bin', 'Thùng nhựa', [['b', 78, 240, 50, 50, YEL], ['txt', 103, 270, 'PLASTIC', 7, BLK]]),
      P('Glass Bin', 'Thùng thủy tinh', [['b', 136, 240, 50, 50, DGRN], ['txt', 161, 270, 'GLASS', 8, WHT]]),
      P('Things to Recycle', 'Đồ cần tái chế', [['t', 34, 218, 22, 12, WHT], ['t', 98, 214, 10, 18, AZ], ['t', 158, 212, 8, 20, GLS]]),
      P('Recycling Sign', 'Biển tái chế', [['l', 200, 290, 200, 196, DGRY, 3], ['c', 200, 180, 20, GRN], ['txt', 200, 188, '♻', 22, WHT]]),
      P('Little Tree', 'Cây non', [['l', 230, 290, 230, 258, DGRN, 3], ['c', 230, 252, 9, TGRN]]),
      P('Truck Body', 'Thùng xe tái chế', [['b', 246, 226, 108, 50, c]]),
      P('Truck Cab', 'Ca-bin xe', [['t', 352, 240, 40, 36, LGRY], ['win', 362, 246, 22, 14]]),
      P('Truck Wheels', 'Bánh xe', [['w', 272, 282, 11], ['w', 362, 282, 11]]),
      P('Happy Planet', 'Trái Đất vui vẻ', [['c', 320, 70, 26, AZ], ['e', 312, 64, 10, 8, GRN], ['e', 330, 82, 8, 6, GRN]]),
      P('Minifigure', 'Nhân vật', [['fig', 190, 226, 0.5, fig]])
    ],
    workshop: (c, d, l, fig) => [
      P('Wooden Floor', 'Sàn gỗ', [['b', 8, 290, 384, 14, TAN]]),
      P('Workshop Wall', 'Tường xưởng', [['t', 16, 110, 368, 180, l]]),
      P('Tool Board', 'Bảng treo dụng cụ', [['t', 40, 130, 160, 80, RBRN]]),
      P('Metal Tools', 'Dụng cụ kim loại', [['l', 70, 150, 70, 192, BRN, 4], ['t', 62, 144, 18, 10, LGRY], ['l', 110, 150, 110, 194, LGRY, 4], ['p', '140,150 190,150 190,166 140,166', LGRY]]),
      P('Workbench', 'Bàn làm việc', [['b', 30, 240, 200, 20, BRN], ['l', 40, 260, 40, 290, BRN, 5], ['l', 220, 260, 220, 290, BRN, 5]]),
      P('Glass Jar', 'Lọ thủy tinh', [['t', 52, 210, 26, 30, GLS]]),
      P('Metal Can', 'Lon kim loại', [['t', 92, 214, 22, 26, MGRY]]),
      P('Paper Roll', 'Cuộn giấy', [['e', 144, 230, 18, 10, WHT]]),
      P('Plastic Box', 'Hộp nhựa', [['b', 176, 218, 44, 22, c]]),
      P('Wooden Chair', 'Ghế gỗ', [['t', 262, 196, 48, 8, BRN], ['l', 264, 240, 264, 200, BRN, 4], ['l', 306, 240, 306, 200, BRN, 4], ['t', 260, 240, 50, 8, BRN], ['l', 266, 248, 266, 290, BRN, 4], ['l', 304, 248, 304, 290, BRN, 4]]),
      P('Window', 'Cửa sổ', [['win', 300, 130, 70, 50]]),
      P('Minifigure', 'Nhân vật', [['fig', 330, 226, 0.5, fig]])
    ],
    lab: (c, d, l, fig) => [
      P('Lab Floor', 'Sàn phòng thí nghiệm', [['b', 8, 290, 384, 14, LGRY]]),
      P('Lab Table', 'Bàn thí nghiệm', [['b', 20, 240, 250, 18, WHT], ['l', 30, 258, 30, 290, DGRY, 4], ['l', 260, 258, 260, 290, DGRY, 4]]),
      P('Water Tank', 'Bể nước thí nghiệm', [['t', 40, 168, 150, 72, GLS]]),
      P('Tank Water', 'Nước trong bể', [['t', 40, 196, 150, 44, AZ]]),
      P('Floating Boat', 'Thuyền nổi', [['p', '64,196 98,196 92,206 70,206', YEL]]),
      P('Floating Apple', 'Quả táo nổi', [['c', 132, 198, 8, RED], ['l', 132, 190, 134, 184, BRN, 2]]),
      P('Sinking Stone', 'Hòn đá chìm', [['e', 162, 234, 12, 6, DGRY]]),
      P('Big Magnet', 'Nam châm lớn', [['t', 210, 186, 40, 8, RED], ['t', 210, 194, 10, 32, RED], ['t', 240, 194, 10, 32, RED], ['t', 210, 222, 10, 8, LGRY], ['t', 240, 222, 10, 8, LGRY]]),
      P('Paper Clips', 'Kẹp giấy', [['l', 210, 236, 222, 236, MGRY, 2], ['l', 238, 236, 250, 236, MGRY, 2], ['l', 214, 232, 220, 232, MGRY, 2]]),
      P('Sink or Float Chart', 'Bảng Chìm hay Nổi', [['t', 290, 128, 92, 60, WHT], ['txt', 336, 152, 'SINK?', 11, BLU], ['txt', 336, 174, 'FLOAT?', 11, RED]]),
      P('Beaker', 'Cốc thí nghiệm', [['p', '292,240 314,240 310,290 296,290', GLS], ['t', 296, 266, 14, 24, GRN]]),
      P('Scientist Minifigure', 'Nhà khoa học', [['fig', 330, 226, 0.5, fig]])
    ],
    lighthouse: (c, d, l, fig) => [
      P('Sea Baseplate', 'Tấm đế biển', [['b', 8, 290, 384, 14, BLU]]),
      P('Rocky Island', 'Đảo đá', [['p', '150,290 190,250 330,250 370,290', DGRY]]),
      P('Lighthouse Tower', 'Thân hải đăng', [['p', '220,250 270,250 260,130 230,130', WHT], ['p', '224,220 266,220 264,200 226,200', RED], ['p', '228,172 262,172 261,152 229,152', RED]]),
      P('Lamp Room', 'Phòng đèn', [['t', 226, 108, 38, 22, GLS], ['p', '222,108 268,108 245,90', RED]]),
      P('Right Light Beam', 'Tia sáng phải', [['p', '264,112 398,84 398,138', PALE]]),
      P('Left Light Beam', 'Tia sáng trái', [['p', '226,112 120,84 120,138', PALE]]),
      P('Moon & Stars', 'Trăng & sao', [['c', 52, 50, 18, PALE], ['txt', 110, 44, '✦', 12, YEL], ['txt', 160, 60, '✦', 10, YEL]]),
      P('Little Boat', 'Thuyền nhỏ', [['p', '40,276 100,276 92,288 48,288', c], ['l', 70, 276, 70, 246, BRN, 2], ['p', '70,248 90,270 70,270', WHT]]),
      P('Tree & Shadow', 'Cây & bóng cây', [['e', 346, 252, 24, 3, BLK], ['t', 318, 214, 8, 36, BRN], ['c', 322, 206, 14, TGRN]]),
      P('Fog Bell', 'Chuông báo sương', [['dome', 196, 250, 10, YEL], ['txt', 178, 236, '♪', 14, BLK]]),
      P('Seagull', 'Mòng biển', [['txt', 330, 70, 'v', 18, BLK]]),
      P('Minifigure', 'Nhân vật', [['fig', 272, 186, 0.5, fig]])
    ],
    robotlab: (c, d, l, fig) => [
      P('Tech Floor', 'Sàn phòng máy', [['b', 8, 290, 384, 14, MGRY]]),
      P('Lab Wall', 'Tường phòng máy', [['t', 16, 110, 368, 180, l]]),
      P('Window', 'Cửa sổ', [['win', 250, 128, 90, 50]]),
      P('Computer Desk', 'Bàn máy tính', [['b', 30, 240, 170, 16, WHT], ['l', 40, 256, 40, 290, DGRY, 4], ['l', 190, 256, 190, 290, DGRY, 4]]),
      P('Monitor & Code', 'Màn hình & mã lệnh', [['t', 60, 170, 100, 64, DGRY], ['t', 66, 176, 88, 52, NIGHT], ['l', 74, 188, 120, 188, GRN, 3], ['l', 82, 200, 140, 200, YEL, 3], ['l', 82, 212, 112, 212, WHT, 3], ['t', 104, 234, 12, 6, DGRY]]),
      P('Tablet', 'Máy tính bảng', [['t', 160, 224, 32, 14, BLK], ['t', 162, 226, 28, 10, AZ]]),
      P('Robot Body', 'Thân robot', [['b', 262, 236, 50, 40, LGRY], ['c', 287, 256, 6, c]]),
      P('Robot Head', 'Đầu robot', [['b', 270, 206, 34, 24, LGRY], ['c', 280, 218, 4, AZ], ['c', 294, 218, 4, AZ], ['l', 287, 200, 287, 190, DGRY, 2], ['c', 287, 188, 3, RED]]),
      P('Robot Wheels', 'Bánh xe robot', [['w', 274, 282, 8], ['w', 300, 282, 8]]),
      P('Charging Station', 'Trạm sạc', [['b', 340, 250, 40, 40, DGRY], ['txt', 360, 276, '⚡', 16, YEL]]),
      P('Code Arrow Cards', 'Thẻ lệnh mũi tên', [['t', 220, 282, 16, 8, YEL], ['txt', 228, 289, '→', 9, BLK], ['t', 240, 282, 16, 8, GRN], ['txt', 248, 289, '↑', 9, BLK]]),
      P('Minifigure', 'Nhân vật', [['fig', 200, 226, 0.5, fig]])
    ],
    town: (c, d, l, fig) => [
      P('Street Baseplate', 'Tấm đế phố', [['b', 8, 290, 384, 14, LGRY]]),
      P('Library Walls', 'Tường thư viện', [['b', 18, 192, 112, 98, TAN]]),
      P('Library Columns', 'Cột thư viện', [['t', 30, 214, 8, 76, WHT], ['t', 60, 214, 8, 76, WHT], ['t', 90, 214, 8, 76, WHT], ['t', 116, 214, 8, 76, WHT]]),
      P('Library Roof', 'Mái thư viện', [['p', '12,192 74,152 136,192', c], ['txt', 74, 184, 'LIBRARY', 9, WHT]]),
      P('Post Office', 'Bưu điện', [['b', 146, 210, 92, 80, RED], ['door', 176, 244, 30, 46, WHT]]),
      P('Post Office Sign', 'Biển bưu điện', [['t', 156, 214, 72, 16, YEL], ['txt', 192, 226, 'POST', 10, RED]]),
      P('Postbox', 'Hòm thư', [['t', 244, 252, 16, 38, RED], ['dome', 252, 252, 8, RED]]),
      P('Pharmacy', 'Hiệu thuốc', [['b', 270, 200, 112, 90, WHT]]),
      P('Green Cross', 'Chữ thập xanh', [['t', 320, 208, 10, 26, GRN], ['t', 312, 216, 26, 10, GRN]]),
      P('Pharmacy Windows', 'Cửa sổ hiệu thuốc', [['win', 282, 244, 40, 30], ['win', 332, 244, 40, 30]]),
      P('Street Lamp', 'Đèn đường', [['l', 140, 290, 140, 200, BLK, 3], ['c', 140, 196, 6, YEL]]),
      P('Minifigure', 'Nhân vật', [['fig', 226, 226, 0.5, fig]])
    ],
    crossing: (c, d, l, fig) => [
      P('Road Baseplate', 'Tấm đế mặt đường', [['b', 8, 290, 384, 14, DGRY]]),
      P('Pavement', 'Vỉa hè', [['t', 8, 230, 384, 12, LGRY]]),
      P('Zebra Crossing', 'Vạch qua đường', [['t', 150, 250, 100, 6, WHT], ['t', 150, 264, 100, 6, WHT], ['t', 150, 278, 100, 6, WHT]]),
      P('Traffic Light Pole', 'Cột đèn giao thông', [['l', 120, 230, 120, 140, BLK, 4], ['t', 108, 110, 24, 60, BLK]]),
      P('Traffic Lights', 'Đèn tín hiệu', [['c', 120, 122, 7, RED], ['c', 120, 140, 7, '#5A4A00'], ['c', 120, 158, 7, '#164D2A']]),
      P('Walking Light', 'Đèn cho người đi bộ', [['l', 262, 230, 262, 182, BLK, 3], ['t', 254, 160, 16, 22, BLK], ['c', 262, 171, 5, GRN]]),
      P('Car Body', 'Thân ô tô', [['b', 270, 242, 100, 30, c], ['p', '290,242 350,242 340,224 300,224', c], ['win', 304, 228, 32, 12]]),
      P('Car Wheels', 'Bánh ô tô', [['w', 292, 278, 10], ['w', 350, 278, 10]]),
      P('Bicycle', 'Xe đạp', [['w', 36, 276, 12], ['w', 76, 276, 12], ['l', 36, 276, 56, 256, AZ, 2], ['l', 56, 256, 76, 276, AZ, 2], ['l', 56, 256, 64, 246, BLK, 2]]),
      P('Safety Sign', 'Biển báo an toàn', [['l', 30, 230, 30, 172, DGRY, 3], ['p', '14,172 46,172 30,146', YEL], ['txt', 30, 168, '!', 14, BLK]]),
      P('Crossing Guard Sign', 'Biển STOP', [['l', 380, 230, 380, 190, DGRY, 3], ['c', 380, 182, 12, RED], ['txt', 380, 186, 'STOP', 6, WHT]]),
      P('Minifigure', 'Nhân vật', [['fig', 186, 166, 0.5, fig]])
    ],
    firestation: (c, d, l, fig) => [
      P('Street Baseplate', 'Tấm đế phố', [['b', 8, 290, 384, 14, LGRY]]),
      P('Station Building', 'Tòa nhà trạm cứu hộ', [['b', 22, 172, 220, 118, RED]]),
      P('Garage Door', 'Cửa gara', [['t', 40, 212, 80, 78, WHT], ['l', 40, 232, 120, 232, LGRY, 2], ['l', 40, 252, 120, 252, LGRY, 2], ['l', 40, 272, 120, 272, LGRY, 2]]),
      P('Open Garage', 'Gara mở', [['t', 140, 212, 80, 78, DGRY]]),
      P('Station Sign', 'Biển tên', [['t', 60, 182, 140, 20, WHT], ['txt', 130, 197, 'RESCUE TEAM', 11, RED]]),
      P('Watch Tower', 'Tháp canh', [['b', 200, 122, 40, 50, DRED]]),
      P('Alarm Bell', 'Chuông báo động', [['dome', 220, 146, 10, YEL]]),
      P('Fire Engine', 'Xe cứu hỏa', [['b', 250, 236, 104, 40, RED], ['t', 350, 220, 34, 56, RED], ['win', 356, 228, 22, 14]]),
      P('Ladder', 'Thang', [['t', 256, 224, 90, 6, LGRY], ['l', 270, 224, 270, 230, WHT, 2], ['l', 300, 224, 300, 230, WHT, 2], ['l', 330, 224, 330, 230, WHT, 2]]),
      P('Engine Wheels', 'Bánh xe', [['w', 274, 282, 11], ['w', 360, 282, 11]]),
      P('Fire Hydrant', 'Trụ nước cứu hỏa', [['t', 4, 262, 14, 28, RED], ['dome', 11, 262, 7, RED]]),
      P('Hero Minifigure', 'Người hùng', [['fig', 158, 226, 0.5, fig]])
    ],
    rocket: (c, d, l, fig) => [
      P('Launch Baseplate', 'Bãi phóng', [['b', 8, 290, 384, 14, DGRY]]),
      P('Launch Pad', 'Bệ phóng', [['b', 140, 270, 120, 20, LGRY]]),
      P('Rocket Body', 'Thân tên lửa', [['t', 180, 130, 40, 140, WHT]]),
      P('Nose Cone', 'Mũi tên lửa', [['p', '180,130 220,130 200,82', RED]]),
      P('Rocket Fins', 'Cánh tên lửa', [['p', '180,228 158,270 180,270', RED], ['p', '220,228 242,270 220,270', RED]]),
      P('Round Window', 'Cửa sổ tròn', [['c', 200, 162, 10, AZ], ['c', 200, 162, 6, GLS], ['t', 180, 196, 40, 10, c]]),
      P('Launch Tower', 'Tháp phóng', [['t', 262, 110, 12, 160, MGRY], ['t', 220, 150, 42, 6, MGRY], ['l', 262, 140, 274, 170, DGRY, 2], ['l', 274, 180, 262, 210, DGRY, 2]]),
      P('Smoke Clouds', 'Khói phóng', [['e', 146, 284, 26, 10, WHT], ['e', 254, 284, 26, 10, WHT]]),
      P('Moon', 'Mặt Trăng', [['c', 70, 60, 22, PALE], ['c', 62, 54, 4, LGRY], ['c', 78, 68, 3, LGRY]]),
      P('Stars', 'Những vì sao', [['txt', 122, 50, '★', 12, YEL], ['txt', 330, 40, '★', 14, YEL], ['txt', 360, 92, '★', 10, YEL]]),
      P('Dream Flag', 'Lá cờ ước mơ', [['l', 40, 290, 40, 222, DGRY, 2], ['p', '40,222 70,232 40,242', RED], ['txt', 50, 236, '★', 8, YEL]]),
      P('Astronaut Minifigure', 'Phi hành gia nhí', [['fig', 300, 226, 0.5, fig]])
    ],
    campsite: (c, d, l, fig) => [
      P('Grass Baseplate', 'Tấm đế cỏ', [['b', 8, 290, 384, 14, GRN]]),
      P('Mountain', 'Ngọn núi', [['p', '120,290 232,110 344,290', MGRY]]),
      P('Snowy Peak', 'Đỉnh tuyết', [['p', '212,142 232,110 252,142', WHT]]),
      P('Tent', 'Lều trại', [['p', '24,290 86,200 148,290', c], ['p', '74,290 86,242 98,290', d]]),
      P('Campfire', 'Lửa trại', [['l', 196, 288, 222, 280, BRN, 4], ['l', 222, 288, 196, 280, BRN, 4], ['p', '201,280 209,254 217,280', ORG], ['p', '205,280 209,266 213,280', YEL]]),
      P('Pine Tree', 'Cây thông', [['t', 352, 240, 8, 50, BRN], ['p', '332,250 356,188 380,250', DGRN]]),
      P('Small Pine', 'Cây thông nhỏ', [['t', 302, 252, 6, 38, BRN], ['p', '286,258 305,212 324,258', DGRN]]),
      P('Little Lake', 'Hồ nhỏ', [['e', 262, 288, 24, 5, AZ]]),
      P('Backpack', 'Ba lô', [['b', 156, 264, 24, 26, RED], ['t', 160, 270, 16, 6, YEL]]),
      P('Sunshine', 'Ông mặt trời', [['c', 60, 60, 22, YEL]]),
      P('Trail Sign', 'Biển chỉ đường', [['l', 384, 290, 384, 252, BRN, 3], ['t', 360, 244, 32, 10, WHT]]),
      P('Camper Minifigure', 'Bạn cắm trại', [['fig', 226, 226, 0.5, fig]])
    ],
    station: (c, d, l, fig) => [
      P('Platform', 'Sân ga', [['b', 8, 262, 384, 28, MGRY], ['t', 8, 286, 384, 4, BRN]]),
      P('Station Roof', 'Mái nhà ga', [['t', 20, 140, 360, 12, c]]),
      P('Pillars', 'Cột nhà ga', [['l', 40, 152, 40, 262, DGRY, 4], ['l', 360, 152, 360, 262, DGRY, 4]]),
      P('Station Sign', 'Biển nhà ga', [['t', 150, 158, 100, 20, WHT], ['txt', 200, 173, 'STATION', 11, BLK]]),
      P('Station Clock', 'Đồng hồ nhà ga', [['c', 200, 124, 14, WHT], ['l', 200, 124, 200, 114, BLK, 2], ['l', 200, 124, 208, 124, BLK, 2]]),
      P('Carriage', 'Toa tàu', [['b', 170, 230, 116, 52, c], ['win', 180, 240, 30, 20], ['win', 220, 240, 30, 20], ['win', 254, 240, 26, 20]]),
      P('Engine', 'Đầu tàu', [['b', 290, 224, 100, 58, RED], ['win', 302, 234, 30, 20], ['c', 380, 262, 6, YEL]]),
      P('Train Wheels', 'Bánh tàu', [['w', 196, 286, 9], ['w', 260, 286, 9], ['w', 316, 286, 9], ['w', 370, 286, 9]]),
      P('Bench', 'Ghế chờ', [['t', 48, 246, 64, 8, BRN], ['l', 56, 254, 56, 262, DGRY, 3], ['l', 104, 254, 104, 262, DGRY, 3]]),
      P('Suitcase', 'Va li', [['b', 122, 240, 30, 22, ORG], ['t', 130, 234, 14, 4, BLK]]),
      P('Hanging Lamp', 'Đèn treo', [['l', 120, 152, 120, 170, BLK, 2], ['dome', 120, 180, 10, YEL]]),
      P('Traveller Minifigure', 'Hành khách', [['fig', 64, 198, 0.5, fig]])
    ],
    museum: (c, d, l, fig) => [
      P('Plaza Baseplate', 'Quảng trường', [['b', 8, 290, 384, 14, LGRY]]),
      P('Front Steps', 'Bậc thềm', [['t', 60, 272, 280, 18, WHT], ['t', 80, 258, 240, 14, WHT]]),
      P('Museum Hall', 'Sảnh bảo tàng', [['b', 80, 172, 240, 86, l]]),
      P('Stone Columns', 'Cột đá', [['t', 100, 182, 14, 76, WHT], ['t', 148, 182, 14, 76, WHT], ['t', 238, 182, 14, 76, WHT], ['t', 286, 182, 14, 76, WHT]]),
      P('Roof Triangle', 'Mái tam giác', [['p', '70,172 200,112 330,172', d]]),
      P('Museum Sign', 'Biển bảo tàng', [['txt', 200, 162, 'MUSEUM', 14, WHT]]),
      P('Big Door', 'Cửa lớn', [['door', 182, 208, 36, 50, BRN]]),
      P('Banner', 'Băng rôn', [['l', 30, 290, 30, 188, DGRY, 2], ['t', 30, 188, 28, 46, RED], ['txt', 44, 214, 'DINO', 7, WHT]]),
      P('Dino Body', 'Thân khủng long', [['e', 360, 250, 24, 12, MGRY], ['l', 348, 260, 348, 290, MGRY, 4], ['l', 370, 260, 370, 290, MGRY, 4]]),
      P('Dino Neck & Tail', 'Cổ & đuôi khủng long', [['l', 380, 246, 390, 222, MGRY, 5], ['c', 392, 218, 6, MGRY], ['l', 338, 252, 322, 266, MGRY, 4]]),
      P('Flag on Top', 'Lá cờ', [['l', 200, 112, 200, 88, DGRY, 2], ['p', '200,88 222,95 200,102', RED]]),
      P('Visitor Minifigure', 'Khách tham quan', [['fig', 132, 194, 0.5, fig]])
    ],
    detective: (c, d, l, fig) => [
      P('Office Floor', 'Sàn văn phòng', [['b', 8, 290, 384, 14, BRN]]),
      P('Office Wall', 'Tường văn phòng', [['t', 16, 110, 368, 180, l]]),
      P('Clue Board', 'Bảng manh mối', [['t', 30, 128, 150, 90, TAN], ['l', 52, 146, 122, 150, RED, 2], ['l', 122, 150, 160, 196, RED, 2]]),
      P('Photos & Pins', 'Ảnh & ghim', [['t', 40, 140, 24, 18, WHT], ['t', 110, 144, 24, 18, WHT], ['t', 148, 190, 24, 18, WHT], ['c', 52, 140, 3, RED], ['c', 122, 144, 3, RED], ['c', 160, 190, 3, RED]]),
      P('Night Window', 'Cửa sổ đêm', [['t', 258, 128, 94, 64, NIGHT], ['c', 330, 148, 8, PALE], ['l', 305, 128, 305, 192, WHT, 3]]),
      P('Desk', 'Bàn làm việc', [['b', 200, 240, 150, 18, BRN], ['l', 210, 258, 210, 290, BRN, 4], ['l', 340, 258, 340, 290, BRN, 4]]),
      P('Desk Lamp', 'Đèn bàn', [['l', 220, 240, 232, 210, DGRY, 3], ['p', '222,212 248,206 244,196 226,200', GRN]]),
      P('Case Files', 'Hồ sơ vụ án', [['t', 256, 230, 34, 10, YEL], ['t', 260, 224, 30, 6, c]]),
      P('Magnifying Glass', 'Kính lúp', [['c', 312, 230, 10, GLS], ['l', 319, 237, 332, 236, BRN, 3]]),
      P('Footprints', 'Dấu chân', [['e', 60, 286, 5, 3, DGRY], ['e', 80, 280, 5, 3, DGRY], ['e', 100, 286, 5, 3, DGRY], ['e', 120, 280, 5, 3, DGRY]]),
      P('Safe', 'Két sắt', [['b', 30, 250, 46, 40, MGRY], ['c', 53, 270, 6, DGRY]]),
      P('Detective Minifigure', 'Thám tử', [['fig', 150, 226, 0.5, fig]])
    ],
    observatory: (c, d, l, fig) => [
      P('Hill Baseplate', 'Ngọn đồi', [['b', 8, 290, 384, 14, OGRN]]),
      P('Observatory Base', 'Chân đài thiên văn', [['b', 120, 222, 160, 68, WHT]]),
      P('Silver Dome', 'Mái vòm bạc', [['dome', 200, 222, 70, LGRY]]),
      P('Telescope', 'Kính thiên văn', [['t', 196, 152, 8, 70, DGRY], ['l', 204, 172, 252, 122, DGRY, 8]]),
      P('Door', 'Cửa ra vào', [['door', 184, 246, 32, 44, c]]),
      P('The Sun', 'Mặt Trời', [['c', 40, 50, 24, YEL]]),
      P('Planet Earth', 'Trái Đất', [['c', 110, 82, 16, AZ], ['e', 106, 78, 7, 5, GRN]]),
      P('Saturn', 'Sao Thổ', [['e', 322, 72, 28, 5, TAN], ['c', 322, 72, 15, ORG]]),
      P('The Moon', 'Mặt Trăng', [['c', 158, 42, 9, LGRY]]),
      P('Mars', 'Sao Hỏa', [['c', 372, 40, 10, RED]]),
      P('Twinkling Stars', 'Sao lấp lánh', [['txt', 262, 40, '★', 12, YEL], ['txt', 362, 140, '★', 10, YEL], ['txt', 70, 140, '✦', 10, YEL]]),
      P('Stargazer Minifigure', 'Nhà thiên văn nhí', [['fig', 300, 226, 0.5, fig]])
    ],
    hangar: (c, d, l, fig) => [
      P('Runway Baseplate', 'Đường băng', [['b', 8, 290, 384, 14, LGRY]]),
      P('Hangar', 'Nhà chứa máy bay', [['dome', 130, 290, 118, l]]),
      P('Hangar Inside', 'Bên trong nhà chứa', [['dome', 130, 290, 88, DGRY]]),
      P('Plane Body', 'Thân máy bay', [['e', 290, 252, 70, 14, WHT], ['c', 312, 248, 3, AZ], ['c', 324, 248, 3, AZ], ['c', 336, 248, 3, AZ]]),
      P('Wings & Tail', 'Cánh & đuôi', [['p', '270,252 322,252 294,278', c], ['p', '222,252 234,222 246,252', c]]),
      P('Propeller', 'Cánh quạt', [['l', 362, 236, 362, 268, BLK, 3], ['c', 360, 252, 4, DGRY]]),
      P('Plane Wheels', 'Bánh máy bay', [['l', 276, 262, 276, 278, DGRY, 2], ['w', 276, 282, 7], ['l', 320, 262, 320, 278, DGRY, 2], ['w', 320, 282, 7]]),
      P('Light Bulb Idea', 'Bóng đèn ý tưởng', [['c', 60, 76, 24, YEL], ['t', 52, 100, 16, 14, MGRY]]),
      P('Big Gear', 'Bánh răng', [['c', 362, 80, 18, MGRY], ['c', 362, 80, 7, LGRY]]),
      P('Stone Wheel', 'Bánh xe đá', [['c', 30, 270, 18, BRN], ['c', 30, 270, 5, TAN]]),
      P('Blueprint', 'Bản thiết kế', [['t', 190, 122, 80, 40, BLU], ['l', 200, 132, 258, 132, WHT, 1], ['l', 200, 142, 240, 152, WHT, 1]]),
      P('Inventor Minifigure', 'Nhà phát minh nhí', [['fig', 110, 226, 0.5, fig]])
    ],
    partyhall: (c, d, l, fig) => [
      P('Garden Baseplate', 'Tấm đế vườn', [['b', 8, 290, 384, 14, GRN]]),
      P('Party Roof', 'Mái lều tiệc', [['p', '40,170 200,110 360,170', c]]),
      P('Tent Posts', 'Cột lều', [['l', 50, 170, 50, 290, WHT, 4], ['l', 350, 170, 350, 290, WHT, 4]]),
      P('Party Banner', 'Băng rôn tiệc', [['txt', 200, 158, 'PARTY', 14, WHT]]),
      P('Bunting Flags', 'Dây cờ', [['l', 50, 180, 350, 180, DGRY, 1], ['p', '64,180 80,180 72,194', RED], ['p', '112,180 128,180 120,194', YEL], ['p', '160,180 176,180 168,194', BLU], ['p', '208,180 224,180 216,194', GRN], ['p', '256,180 272,180 264,194', ORG], ['p', '304,180 320,180 312,194', RED]]),
      P('Party Table', 'Bàn tiệc', [['b', 140, 250, 120, 14, WHT], ['l', 150, 264, 150, 290, DGRY, 3], ['l', 250, 264, 250, 290, DGRY, 3]]),
      P('Birthday Cake', 'Bánh sinh nhật', [['b', 180, 226, 40, 24, PNK], ['t', 176, 222, 48, 6, WHT], ['l', 200, 222, 200, 210, YEL, 2], ['c', 200, 207, 3, ORG]]),
      P('Gift Boxes', 'Hộp quà', [['b', 270, 262, 30, 28, RED], ['l', 285, 262, 285, 290, YEL, 3], ['b', 304, 270, 24, 20, BLU]]),
      P('Balloons', 'Bóng bay', [['l', 90, 262, 96, 212, DGRY, 1], ['e', 96, 200, 12, 15, RED], ['l', 90, 262, 80, 218, DGRY, 1], ['e', 78, 206, 12, 15, YEL]]),
      P('Music Speaker', 'Loa nhạc', [['b', 10, 246, 30, 44, BLK], ['c', 25, 262, 8, DGRY], ['c', 25, 280, 5, DGRY]]),
      P('Invitation Card', 'Thiệp mời', [['t', 232, 238, 22, 12, WHT], ['txt', 243, 247, '♥', 8, RED]]),
      P('Host Minifigure', 'Chủ nhà', [['fig', 104, 226, 0.5, fig]])
    ],
    stage: (c, d, l, fig) => [
      P('Hall Floor', 'Sàn hội trường', [['b', 8, 290, 384, 14, BRN]]),
      P('Stage Platform', 'Sân khấu', [['b', 30, 240, 340, 20, RBRN]]),
      P('Back Curtain', 'Rèm sau', [['t', 40, 110, 320, 130, DRED]]),
      P('Side Curtains', 'Rèm hai bên', [['p', '40,110 90,110 70,240 40,240', RED], ['p', '310,110 360,110 360,240 330,240', RED]]),
      P('Debate Banner', 'Băng rôn tranh biện', [['t', 120, 116, 160, 22, YEL], ['txt', 200, 132, 'MINI DEBATE', 12, BLK]]),
      P('Spotlight', 'Đèn sân khấu', [['p', '200,140 160,240 240,240', PALE]]),
      P('Left Podium', 'Bục trái', [['b', 96, 196, 52, 44, BLU], ['txt', 122, 222, 'AGREE', 7, WHT]]),
      P('Right Podium', 'Bục phải', [['b', 252, 196, 52, 44, c], ['txt', 278, 222, 'DISAGREE', 6, WHT]]),
      P('Microphones', 'Micro', [['l', 122, 196, 122, 176, DGRY, 2], ['c', 122, 174, 4, BLK], ['l', 278, 196, 278, 176, DGRY, 2], ['c', 278, 174, 4, BLK]]),
      P('Golden Trophy', 'Cúp vàng', [['t', 190, 228, 20, 12, YEL], ['dome', 200, 226, 10, YEL]]),
      P('Audience Chairs', 'Ghế khán giả', [['t', 60, 276, 30, 14, DGRY], ['t', 110, 276, 30, 14, DGRY], ['t', 260, 276, 30, 14, DGRY], ['t', 310, 276, 30, 14, DGRY]]),
      P('Speaker Minifigure', 'Bạn tranh biện', [['fig', 154, 176, 0.5, fig]])
    ]
  });

  TEMPLATES.house = (c, d, l, fig) => {
    const g = genericModel(c).parts;
    g[11] = P('Minifigure', 'Nhân vật', [['fig', 22, 226, 0.5, fig]]);
    return g;
  };

  /** Đăng ký mô hình theo mẫu chủ đề (dùng cho các tuần của Lộ trình 9 Tháng). */
  function registerTemplate(id, template, color, name, vi, fig) {
    const make = TEMPLATES[template] || TEMPLATES.house;
    const c = color || RED;
    MODELS[id] = { name: name || 'LEGO Set', vi: vi || 'Bộ mô hình', parts: make(c, shade(c, -0.3), shade(c, 0.45), fig || 'cap-red|grin|torso-blue|legs-black|book') };
  }

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

    zones = zones.slice(0, 14);
    const n = zones.length;
    const backN = n <= 10 ? 5 : Math.ceil(n / 2);
    let slots = DIO_SLOTS;
    if (n > 10) {
      // > 10 mô hình: chia đều 2 hàng, thu nhỏ cho vừa (chừa chỗ bên phải cho nhân vật của bé)
      const sc = Math.min(0.57, (1125 / backN - 10) / 400);
      const w = 400 * sc, h = 320 * sc;
      const gap = backN > 1 ? (1125 - backN * w) / (backN - 1) : 0;
      slots = [];
      for (let i = 0; i < n; i++) {
        const row = i < backN ? 0 : 1, k = row ? i - backN : i;
        slots.push({ x: 8 + k * (w + gap), y: row ? 505 - h : 274 - h, s: sc });
      }
    }
    const drawSlot = (z, i) => {
      const slot = slots[i];
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

    zones.slice(0, backN).forEach((z, i) => { s += drawSlot(z, i); });
    // Nhân vật của bé đứng trên đường
    if (avatar) {
      s += `<g class="dio-fig" data-fig="me"><g transform="translate(1146 238) scale(0.62)">${'<g transform="translate(12 4)">' + minifigInner(avatar) + '</g>'}</g>`;
      s += `<rect x="1142" y="314" width="56" height="18" rx="6" fill="#FFD500" stroke="#C7A300" stroke-width="2"/><text x="1170" y="327" text-anchor="middle" font-family="Fredoka, Nunito, sans-serif" font-weight="700" font-size="11" fill="#1E293B">${esc(String(name || 'Me').slice(0, 9))}</text></g>`;
    }
    zones.slice(backN).forEach((z, i) => { s += drawSlot(z, i + backN); });
    s += `</svg>`;
    return s;
  }

  global.LegoSvg = {
    COLORS: C,
    MODELS,
    ITEMS,
    PARTS: { HATS, FACES, TORSOS, LEGS, ACCS },
    shade,
    renderModel,
    renderPart,
    renderMinifig,
    minifigInner,
    renderPolybag,
    renderDiorama,
    DIO_SLOTS,
    registerModel,
    registerTemplate,
    TEMPLATES,
    unregisterModel,
    partCount: (zoneId) => (MODELS[zoneId] ? MODELS[zoneId].parts.length : 0)
  };
})(window);
