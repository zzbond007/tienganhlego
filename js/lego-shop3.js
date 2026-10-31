/* =========================================================
   lego-shop3.js – Bộ sưu tập Figure 🥇 Gold (đợt 3)
   - 24 món mua bằng Gold: 14 bạn đồng hành dạng figure, 7 thú cưng, 3 xe
   - Vẽ SVG có đổ bóng/gradient cho cảm giác "đồ chơi 3D", hình khối rõ để bé dễ nhận ra
   - Bạn đồng hành ở đây là SVG vẽ sẵn (chuỗi bắt đầu bằng "<"), không phải cấu hình minifig
   Nạp SAU lego-shop2.js.
   ========================================================= */
(function (global) {
  'use strict';
  const LG = global.LegoSvg;
  const PETS = LG.PETS, RIDES = LG.RIDES, BUDDIES = LG.BUDDIES;

  /* ---------------- Tiện ích vẽ ---------------- */
  const stops = (s) => s.map(([o, c, op]) => `<stop offset="${o}" stop-color="${c}"${op != null ? ` stop-opacity="${op}"` : ''}/>`).join('');
  /** Gradient tuyến tính (mặc định từ trên-trái xuống dưới-phải). */
  const lin = (id, s, x2 = 1, y2 = 1) => `<linearGradient id="${id}" x1="0" y1="0" x2="${x2}" y2="${y2}">${stops(s)}</linearGradient>`;
  /** Gradient tròn, điểm sáng lệch trên-trái → khối tròn trông nổi như đồ chơi nhựa. */
  const rad = (id, s, cx = '35%', cy = '30%', r = '75%') => `<radialGradient id="${id}" cx="${cx}" cy="${cy}" r="${r}">${stops(s)}</radialGradient>`;
  const defs = (...g) => `<defs>${g.join('')}</defs>`;
  const shadow = (cx, cy, rx, ry = 3) => `<ellipse cx="${cx}" cy="${cy}" rx="${rx}" ry="${ry}" fill="#0F172A" opacity=".14"/>`;
  const r1 = (v) => Math.round(v * 10) / 10;
  const sparkle = (cx, cy, s, fill) =>
    `<path d="M${cx} ${r1(cy - s)} L${r1(cx + s * 0.28)} ${r1(cy - s * 0.28)} L${r1(cx + s)} ${cy} L${r1(cx + s * 0.28)} ${r1(cy + s * 0.28)} L${cx} ${r1(cy + s)} L${r1(cx - s * 0.28)} ${r1(cy + s * 0.28)} L${r1(cx - s)} ${cy} L${r1(cx - s * 0.28)} ${r1(cy - s * 0.28)} Z" fill="${fill || '#fff'}"/>`;
  const eye = (cx, cy, r) => `<circle cx="${cx}" cy="${cy}" r="${r}" fill="#1B1B1B"/><circle cx="${r1(cx - r * 0.35)}" cy="${r1(cy - r * 0.35)}" r="${r1(r * 0.38)}" fill="#fff"/>`;

  /* =========================================================
     BẠN ĐỒNG HÀNH – FIGURE (khung 60 × 120, chân chạm y≈120)
     ========================================================= */
  const FIG = {};

  // 🐈‍⬛ Mèo đen khó tính – khoanh tay, mắt vàng
  FIG['buddy-black-cat'] = defs(rad('g3Cat', [[0, '#55555E'], [0.55, '#1E1E24'], [1, '#09090C']])) +
    shadow(30, 119, 20) +
    `<path d="M44 106 Q60 102 57 86 Q55 76 60 70" stroke="#16161B" stroke-width="6.5" fill="none" stroke-linecap="round"/>` +
    `<ellipse cx="21" cy="115" rx="8" ry="5" fill="url(#g3Cat)"/><ellipse cx="39" cy="115" rx="8" ry="5" fill="url(#g3Cat)"/>` +
    `<path d="M13 98 Q11 72 30 70 Q49 72 47 98 Q47 115 30 115 Q13 115 13 98 Z" fill="url(#g3Cat)"/>` +
    `<path d="M14 88 Q27 97 43 86" stroke="#25252C" stroke-width="9" fill="none" stroke-linecap="round"/>` +
    `<path d="M46 90 Q33 99 17 90" stroke="#2F2F38" stroke-width="9" fill="none" stroke-linecap="round"/>` +
    `<path d="M22 92.5 Q30 95.5 38 92.5" stroke="#000" stroke-opacity=".45" stroke-width="1" fill="none"/>` +
    `<polygon points="8,52 10,25 27,38" fill="#1E1E24"/><polygon points="52,52 50,25 33,38" fill="#1E1E24"/>` +
    `<polygon points="12.5,45 13.5,31 23,39" fill="#F4A6B8"/><polygon points="47.5,45 46.5,31 37,39" fill="#F4A6B8"/>` +
    `<ellipse cx="30" cy="54" rx="23" ry="19" fill="url(#g3Cat)"/>` +
    `<ellipse cx="21" cy="54" rx="6.2" ry="5.8" fill="#FFE11A" stroke="#C9A800" stroke-width=".6"/><ellipse cx="39" cy="54" rx="6.2" ry="5.8" fill="#FFE11A" stroke="#C9A800" stroke-width=".6"/>` +
    `<ellipse cx="21.6" cy="55.5" rx="1.7" ry="3.6" fill="#111"/><ellipse cx="38.4" cy="55.5" rx="1.7" ry="3.6" fill="#111"/>` +
    `<polygon points="13,45 29,45 29,53 13,48.8" fill="#1C1C22"/><polygon points="47,45 31,45 31,53 47,48.8" fill="#1C1C22"/>` +
    `<circle cx="18.6" cy="54" r="1.1" fill="#fff"/><circle cx="36" cy="54" r="1.1" fill="#fff"/>` +
    `<path d="M28.4 62 h3.2 l-1.6 1.9 z" fill="#F4A6B8"/><path d="M26.8 67 Q30 64.6 33.2 67" stroke="#F4A6B8" stroke-width="1.1" fill="none" stroke-linecap="round"/>` +
    `<path d="M12 61 l-7 -1 M12 64 l-7 2 M48 61 l7 -1 M48 64 l7 2" stroke="#6B7280" stroke-width=".7"/>` +
    `<ellipse cx="21" cy="42" rx="7" ry="3" fill="#fff" opacity=".12"/>`;

  // 🏛️ Nhà hiền triết Hy Lạp – tóc xoăn bạc, vòng nguyệt quế, cầm cuộn giấy và bút
  FIG['buddy-philosopher'] = defs(
    lin('g3Robe', [[0, '#FBF6E6'], [1, '#DCCDA6']]),
    lin('g3Sash', [[0, '#6B93C6'], [1, '#34557F']]),
    rad('g3Skin', [[0, '#FFE2C6'], [1, '#E9A97C']]),
    rad('g3Grey', [[0, '#FFFFFF'], [1, '#B8BCC4']])) +
    shadow(30, 119, 18) +
    `<rect x="19" y="106" width="6" height="10" fill="url(#g3Skin)"/><rect x="35" y="106" width="6" height="10" fill="url(#g3Skin)"/>` +
    `<ellipse cx="21" cy="117" rx="6.5" ry="2.8" fill="url(#g3Skin)"/><ellipse cx="39" cy="117" rx="6.5" ry="2.8" fill="url(#g3Skin)"/>` +
    `<path d="M14 119.5 h14 M32 119.5 h14" stroke="#7C4A1E" stroke-width="1.8" stroke-linecap="round"/><path d="M18 113 l7 2 M18 116 l7 -2 M35 113 l7 2 M35 116 l7 -2" stroke="#8B5A2B" stroke-width="1.3"/>` +
    `<path d="M16 56 Q30 52 44 56 L48 108 Q30 112 12 108 Z" fill="url(#g3Robe)" stroke="#C9B994" stroke-width=".8"/>` +
    `<path d="M13.2 103 Q30 107 46.8 103" stroke="#3C5F8F" stroke-width="2.6" fill="none"/><path d="M14 101 h3 v2.4 h3 v-2.4 h3 v2.4 h3 v-2.4 h3 v2.4 h3 v-2.4 h3 v2.4 h3 v-2.4 h3 v2.4 h3" stroke="#FBF6E6" stroke-width=".7" fill="none"/>` +
    `<path d="M41 54 Q49 58 47 74 L45 102 Q38 106 33 101 L36 76 Q30 66 21 59 L25 55 Q34 62 39 66 Z" fill="url(#g3Sash)" stroke="#2A4466" stroke-width=".7"/>` +
    `<path d="M15 62 Q5 62 8 48" stroke="url(#g3Skin)" stroke-width="6" fill="none" stroke-linecap="round"/><circle cx="15.5" cy="61" r="6" fill="url(#g3Robe)" stroke="#C9B994" stroke-width=".6"/>` +
    `<path d="M4.5 49.5 L14 35" stroke="#B88A4A" stroke-width="1.8" stroke-linecap="round"/><circle cx="8" cy="46" r="4" fill="url(#g3Skin)"/>` +
    `<g transform="rotate(-18 40 76)"><rect x="36" y="64" width="8" height="24" rx="2" fill="#F3E3B5" stroke="#B8954A" stroke-width=".8"/><ellipse cx="40" cy="64" rx="4" ry="1.6" fill="#E3CC8E" stroke="#B8954A" stroke-width=".6"/><ellipse cx="40" cy="88" rx="4" ry="1.6" fill="#E3CC8E" stroke="#B8954A" stroke-width=".6"/></g>` +
    `<circle cx="44" cy="76" r="4" fill="url(#g3Skin)"/>` +
    `<rect x="26" y="46" width="8" height="8" fill="url(#g3Skin)"/>` +
    `<circle cx="30" cy="36" r="12.5" fill="url(#g3Skin)"/>` +
    [[18.5, 31, 4.2], [20, 24.5, 4.4], [25.5, 20.5, 4.4], [32, 19.5, 4.4], [38, 22, 4.4], [41.5, 28, 4.2], [42.5, 34.5, 3.2], [17.5, 37, 3.2]].map(([x, y, r]) => `<circle cx="${x}" cy="${y}" r="${r}" fill="url(#g3Grey)" stroke="#A3A8B1" stroke-width=".5"/>`).join('') +
    `<path d="M18 27 Q30 17 42 27" stroke="#3F7D2A" stroke-width="1" fill="none"/>` +
    [[19, 26, -50], [22, 22.8, -35], [26, 20.8, -15], [34, 20.8, 15], [38, 22.8, 35], [41, 26, 50]].map(([x, y, a]) => `<ellipse cx="${x}" cy="${y}" rx="2.6" ry="1.2" fill="#5FA83C" stroke="#3F7D2A" stroke-width=".4" transform="rotate(${a} ${x} ${y})"/>`).join('') +
    [[19.5, 42, 4.5], [23.5, 47, 4.6], [30, 49.5, 5], [36.5, 47, 4.6], [40.5, 42, 4.5], [30, 45, 4]].map(([x, y, r]) => `<circle cx="${x}" cy="${y}" r="${r}" fill="url(#g3Grey)" stroke="#A3A8B1" stroke-width=".5"/>`).join('') +
    `<path d="M22.5 31 l5 -1 M32.5 30 l5 1" stroke="#9CA3AF" stroke-width="1.6" stroke-linecap="round"/>` +
    eye(25.5, 34, 1.7) + eye(34.5, 34, 1.7) +
    `<ellipse cx="30" cy="38" rx="2" ry="2.6" fill="#E39A6A"/>` +
    `<ellipse cx="26.6" cy="41" rx="3.6" ry="1.8" fill="url(#g3Grey)"/><ellipse cx="33.4" cy="41" rx="3.6" ry="1.8" fill="url(#g3Grey)"/>` +
    `<path d="M27 43.5 Q30 46.5 33 43.5 Z" fill="#7A2E1E"/>`;

  // 🤖 Robot rêu khổng lồ – giáp xanh trầy xước, mắt xanh phát sáng
  FIG['buddy-mech'] = defs(
    lin('g3Moss', [[0, '#7DAA5A'], [0.5, '#4E7F37'], [1, '#2F5521']]),
    lin('g3Iron', [[0, '#4B5056'], [1, '#1D2023']]),
    rad('g3Eye', [[0, '#E0FFFF'], [0.45, '#38E1F5'], [1, '#0E7490']], '50%', '50%', '50%')) +
    shadow(30, 119, 30) +
    `<rect x="15" y="78" width="6" height="34" rx="2" fill="url(#g3Iron)"/><rect x="39" y="78" width="6" height="34" rx="2" fill="url(#g3Iron)"/>` +
    `<circle cx="18" cy="96" r="4.6" fill="url(#g3Iron)"/><circle cx="42" cy="96" r="4.6" fill="url(#g3Iron)"/>` +
    `<path d="M7 120 L11 111 L25 111 L29 120 Z" fill="url(#g3Iron)"/><path d="M31 120 L35 111 L49 111 L53 120 Z" fill="url(#g3Iron)"/>` +
    `<rect x="-2" y="50" width="5" height="40" rx="2" fill="url(#g3Iron)"/><rect x="57" y="50" width="5" height="40" rx="2" fill="url(#g3Iron)"/>` +
    `<circle cx=".5" cy="70" r="3.4" fill="#2B2F33"/><circle cx="59.5" cy="70" r="3.4" fill="#2B2F33"/>` +
    `<path d="M-3 89 L-6 98 M.5 90 L.5 100 M4 89 L7 98 M56 89 L53 98 M59.5 90 L59.5 100 M63 89 L66 98" stroke="#2B2F33" stroke-width="2.2" stroke-linecap="round"/>` +
    `<rect x="14" y="70" width="32" height="12" rx="3" fill="url(#g3Moss)" stroke="#24401A" stroke-width=".8"/><rect x="18" y="80" width="24" height="4" fill="#1D2023"/>` +
    `<path d="M6 36 Q30 28 54 36 L52 70 Q30 78 8 70 Z" fill="url(#g3Moss)" stroke="#24401A" stroke-width=".9"/>` +
    `<path d="M8 52 Q30 58 52 52 M30 33 V74 M16 40 L16 50 M44 40 L44 50" stroke="#24401A" stroke-width=".8" fill="none"/>` +
    `<rect x="19" y="58" width="3" height="9" fill="#1D2023"/><rect x="38" y="58" width="3" height="9" fill="#1D2023"/>` +
    `<path d="M12 44 l5 -3 M40 62 l6 -2 M22 39 l3 3 M46 45 l-4 3 M25 66 l5 1 M35 48 l4 -3" stroke="#1A2E12" stroke-width="1" stroke-linecap="round"/>` +
    `<path d="M10 40 Q20 35 28 34" stroke="#fff" stroke-opacity=".25" stroke-width="2" fill="none" stroke-linecap="round"/>` +
    `<rect x="-6" y="30" width="16" height="22" rx="3.5" fill="url(#g3Moss)" stroke="#24401A" stroke-width=".9"/><rect x="50" y="30" width="16" height="22" rx="3.5" fill="url(#g3Moss)" stroke="#24401A" stroke-width=".9"/>` +
    `<path d="M-6 41 h16 M50 41 h16" stroke="#24401A" stroke-width=".7"/><path d="M-2 36 l4 3 M54 46 l5 -2" stroke="#1A2E12" stroke-width="1" stroke-linecap="round"/>` +
    [[-3, 33], [7, 33], [-3, 49], [7, 49], [53, 33], [63, 33], [53, 49], [63, 49]].map(([x, y]) => `<circle cx="${x}" cy="${y}" r=".9" fill="#1A2E12"/>`).join('') +
    `<ellipse cx="30" cy="34" rx="15" ry="3.4" fill="#1D2023"/>` +
    `<path d="M17 34 Q17 13 30 13 Q43 13 43 34 Z" fill="url(#g3Moss)" stroke="#24401A" stroke-width=".9"/>` +
    `<path d="M18 28 h24" stroke="#24401A" stroke-width=".7"/><path d="M21 19 Q25 15 29 14.6" stroke="#fff" stroke-opacity=".3" stroke-width="1.6" fill="none" stroke-linecap="round"/>` +
    `<circle cx="30" cy="22.5" r="8" fill="#38E1F5" opacity=".22"/><circle cx="30" cy="22.5" r="5" fill="#1D2023"/><circle cx="30" cy="22.5" r="3.6" fill="url(#g3Eye)"/><circle cx="28.8" cy="21.3" r="1" fill="#fff"/>`;

  // 💎 Bạn Pha Lê – thân giác cắt lấp lánh cầu vồng
  const CRY = 'url(#g3Cry)';
  FIG['buddy-crystal'] = defs(lin('g3Cry', [[0, '#FFFFFF', 0.97], [0.3, '#D9EEFF', 0.9], [0.55, '#F3DDFF', 0.9], [0.78, '#D9FFF3', 0.9], [1, '#BCD4FF', 0.95]])) +
    shadow(30, 119, 18) +
    `<path d="M20 106 L28 106 L27.5 119 L18.5 119 Z" fill="${CRY}" stroke="#9FB8D9" stroke-width=".8"/><path d="M32 106 L40 106 L41.5 119 L32.5 119 Z" fill="${CRY}" stroke="#9FB8D9" stroke-width=".8"/>` +
    `<path d="M14 62 L5 73 L4 90 L9.5 95 L14 84 Z" fill="${CRY}" stroke="#9FB8D9" stroke-width=".8"/><path d="M46 62 L55 73 L56 90 L50.5 95 L46 84 Z" fill="${CRY}" stroke="#9FB8D9" stroke-width=".8"/>` +
    `<path d="M5 73 L10 76 L9.5 95 M55 73 L50 76 L50.5 95" stroke="#fff" stroke-width=".7" fill="none"/>` +
    `<path d="M18 44 L25 33 L35 33 L42 44 L47 62 L47 97 L40 109 L20 109 L13 97 L13 62 Z" fill="${CRY}" stroke="#A3BEE6" stroke-width="1"/>` +
    `<path d="M18 44 L42 44 M18 44 L22 62 L13 62 M42 44 L38 62 L47 62 M22 62 L38 62 M22 62 L20 97 L13 97 M38 62 L40 97 L47 97 M20 97 L40 97 M20 97 L26 109 M40 97 L34 109 M25 33 L22 44 M35 33 L38 44" stroke="#fff" stroke-width=".9" fill="none" opacity=".95"/>` +
    `<polygon points="22,64 30,64 25,80" fill="#F9A8D4" opacity=".35"/><polygon points="34,72 39,66 39,88" fill="#67E8F9" opacity=".35"/><polygon points="22,84 30,92 21,95" fill="#FDE047" opacity=".35"/><polygon points="40,46 44,58 38,60" fill="#C4B5FD" opacity=".45"/><polygon points="14,64 20,64 15,80" fill="#86EFAC" opacity=".3"/>` +
    `<ellipse cx="25" cy="53" rx="1.7" ry="2.2" fill="#1B1B1B"/><ellipse cx="35" cy="53" rx="1.7" ry="2.2" fill="#1B1B1B"/>` +
    `<path d="M27 58 Q30 61 33 58" stroke="#1B1B1B" stroke-width="1.2" fill="none" stroke-linecap="round"/>` +
    `<circle cx="22" cy="57.5" r="1.6" fill="#F9A8D4" opacity=".55"/><circle cx="38" cy="57.5" r="1.6" fill="#F9A8D4" opacity=".55"/>` +
    sparkle(52, 40, 3.4, '#fff') + sparkle(8, 52, 2.4, '#E0F2FE') + sparkle(30, 26, 2, '#FDE68A');

  // ⛄ Người tuyết
  FIG['buddy-snowman'] = defs(rad('g3Snow', [[0, '#FFFFFF'], [0.7, '#EAF2FB'], [1, '#C5D6EA']])) +
    shadow(30, 119, 20) +
    `<path d="M18 66 L5 55 M10 59 L7 52 M42 66 L55 55 M50 59 L53 52" stroke="#7C4A1E" stroke-width="2" stroke-linecap="round" fill="none"/>` +
    `<circle cx="30" cy="100" r="19" fill="url(#g3Snow)" stroke="#B8CBE0" stroke-width=".8"/>` +
    `<circle cx="30" cy="69" r="14" fill="url(#g3Snow)" stroke="#B8CBE0" stroke-width=".8"/>` +
    `<circle cx="30" cy="41" r="12" fill="url(#g3Snow)" stroke="#B8CBE0" stroke-width=".8"/>` +
    `<circle cx="30" cy="64" r="1.8" fill="#2B2B2B"/><circle cx="30" cy="72" r="1.8" fill="#2B2B2B"/><circle cx="30" cy="94" r="2" fill="#2B2B2B"/><circle cx="30" cy="103" r="2" fill="#2B2B2B"/>` +
    `<rect x="17" y="51" width="26" height="6" rx="3" fill="#E3000B"/><rect x="34" y="54" width="6" height="15" rx="2" fill="#C2000A" transform="rotate(12 37 54)"/><path d="M35 66 l1 4 M37.5 66 l1 4" stroke="#fff" stroke-width=".8"/>` +
    `<path d="M18 38 Q18 25 30 25 Q42 25 42 38 Z" fill="#16A34A" stroke="#14532D" stroke-width=".8"/><rect x="17" y="35" width="26" height="4.5" rx="2" fill="#15803D"/><circle cx="30" cy="24" r="3.6" fill="#fff" stroke="#CBD5E1" stroke-width=".6"/>` +
    eye(26, 42, 1.7) + eye(34, 42, 1.7) +
    `<polygon points="29.5,45 31,46.6 39,48.4" fill="#FF7E14" stroke="#C2410C" stroke-width=".5" stroke-linejoin="round"/>` +
    `<circle cx="26" cy="49.5" r=".8" fill="#2B2B2B"/><circle cx="28.6" cy="50.6" r=".8" fill="#2B2B2B"/><circle cx="31.4" cy="50.6" r=".8" fill="#2B2B2B"/><circle cx="34" cy="49.5" r=".8" fill="#2B2B2B"/>` +
    `<circle cx="23" cy="46" r="1.6" fill="#F9A8D4" opacity=".6"/><circle cx="37" cy="46" r="1.6" fill="#F9A8D4" opacity=".6"/>`;

  // 👻 Ma nhỏ thân thiện
  FIG['buddy-ghost'] = defs(rad('g3Ghost', [[0, '#FFFFFF'], [0.75, '#EEF1FA'], [1, '#CDD4EA']])) +
    shadow(30, 118, 14, 2.5) +
    `<ellipse cx="9" cy="66" rx="5" ry="8.5" fill="url(#g3Ghost)" stroke="#C3CBE3" stroke-width=".8" transform="rotate(-35 9 66)"/>` +
    `<ellipse cx="51" cy="74" rx="5" ry="8" fill="url(#g3Ghost)" stroke="#C3CBE3" stroke-width=".8" transform="rotate(30 51 74)"/>` +
    `<path d="M12 104 L12 52 Q12 30 30 30 Q48 30 48 52 L48 104 Q44 111 40 104 Q36 97 32 104 Q28 111 24 104 Q20 97 16 104 Q14 107 12 104 Z" fill="url(#g3Ghost)" stroke="#C3CBE3" stroke-width=".9"/>` +
    `<ellipse cx="24" cy="57" rx="3.4" ry="4.6" fill="#1B1B1B"/><ellipse cx="36" cy="57" rx="3.4" ry="4.6" fill="#1B1B1B"/><circle cx="22.8" cy="55.2" r="1.3" fill="#fff"/><circle cx="34.8" cy="55.2" r="1.3" fill="#fff"/>` +
    `<circle cx="19" cy="64" r="2.4" fill="#F9A8D4" opacity=".6"/><circle cx="41" cy="64" r="2.4" fill="#F9A8D4" opacity=".6"/>` +
    `<ellipse cx="30" cy="66" rx="3.2" ry="3.8" fill="#1B1B1B"/><ellipse cx="30" cy="68" rx="2" ry="1.6" fill="#F472B6"/>` +
    `<path d="M18 40 Q22 34 28 33" stroke="#fff" stroke-width="2" fill="none" stroke-linecap="round"/>` +
    sparkle(50, 40, 2.6, '#C4B5FD') + sparkle(8, 88, 2, '#C4B5FD');

  // 🎃 Bạn Đầu Bí Ngô
  FIG['buddy-pumpkin'] = defs(
    rad('g3Pump', [[0, '#FFB15C'], [0.6, '#F97316'], [1, '#C2410C']]),
    lin('g3Cape', [[0, '#7C3AED'], [1, '#4C1D95']]),
    rad('g3Glow', [[0, '#FFF7C2'], [1, '#FFC93C']], '50%', '50%', '60%')) +
    shadow(30, 119, 18) +
    `<path d="M16 66 L44 66 L53 112 L7 112 Z" fill="url(#g3Cape)" stroke="#3B0F7A" stroke-width=".8"/>` +
    `<rect x="19" y="96" width="9" height="18" fill="#3F3F46"/><rect x="32" y="96" width="9" height="18" fill="#3F3F46"/>` +
    `<rect x="17" y="113" width="12" height="6" rx="2.5" fill="#1F1F23"/><rect x="31" y="113" width="12" height="6" rx="2.5" fill="#1F1F23"/>` +
    `<path d="M19 66 L41 66 L44 98 L16 98 Z" fill="#16A34A" stroke="#14532D" stroke-width=".8"/><path d="M30 66 V98" stroke="#14532D" stroke-width=".8"/><circle cx="30" cy="74" r="1.3" fill="#FFD500"/><circle cx="30" cy="82" r="1.3" fill="#FFD500"/><circle cx="30" cy="90" r="1.3" fill="#FFD500"/>` +
    `<path d="M19 69 Q10 76 12 88" stroke="#16A34A" stroke-width="6" fill="none" stroke-linecap="round"/><circle cx="12" cy="90" r="3.6" fill="#FFD02A"/>` +
    `<path d="M41 69 Q50 76 48 86" stroke="#16A34A" stroke-width="6" fill="none" stroke-linecap="round"/><circle cx="48" cy="88" r="3.6" fill="#FFD02A"/>` +
    `<path d="M43 90 Q48 84 53 90 L52 100 Q48 103 44 100 Z" fill="#F97316" stroke="#9A3412" stroke-width=".7"/><path d="M44 90 Q48 81 52 90" stroke="#3F3F46" stroke-width="1" fill="none"/>` +
    `<path d="M30 30 Q29 22 34 19" stroke="#15803D" stroke-width="3" fill="none" stroke-linecap="round"/><path d="M33 24 Q40 20 41 26 Q36 28 33 24 Z" fill="#22C55E"/>` +
    `<ellipse cx="20" cy="48" rx="11" ry="17" fill="url(#g3Pump)"/><ellipse cx="40" cy="48" rx="11" ry="17" fill="url(#g3Pump)"/><ellipse cx="30" cy="48" rx="12" ry="18" fill="url(#g3Pump)"/>` +
    `<path d="M24 31.5 Q20 48 24 64.5 M36 31.5 Q40 48 36 64.5" stroke="#C2410C" stroke-width="1" fill="none"/>` +
    `<polygon points="20.5,49 25,41.5 29.5,49" fill="url(#g3Glow)" stroke="#9A3412" stroke-width=".6"/><polygon points="30.5,49 35,41.5 39.5,49" fill="url(#g3Glow)" stroke="#9A3412" stroke-width=".6"/>` +
    `<path d="M19.5 53.5 Q30 63 40.5 53.5 Q30 58 19.5 53.5 Z" fill="url(#g3Glow)" stroke="#9A3412" stroke-width=".6"/>` +
    `<ellipse cx="22" cy="38" rx="4" ry="2.4" fill="#fff" opacity=".3"/>`;

  // ⚔️ Hiệp sĩ dũng cảm
  FIG['buddy-knight'] = defs(
    lin('g3Steel', [[0, '#F1F5F9'], [0.5, '#A8B3C1'], [1, '#64748B']], 1, 0.4),
    lin('g3Shield', [[0, '#3D8BE0'], [1, '#1E40AF']])) +
    shadow(30, 119, 20) +
    `<rect x="19" y="94" width="9" height="20" fill="url(#g3Steel)" stroke="#475569" stroke-width=".7"/><rect x="32" y="94" width="9" height="20" fill="url(#g3Steel)" stroke="#475569" stroke-width=".7"/>` +
    `<rect x="17" y="112" width="12" height="7" rx="2.5" fill="#475569"/><rect x="31" y="112" width="12" height="7" rx="2.5" fill="#475569"/>` +
    `<path d="M17 58 L43 58 L46 96 L14 96 Z" fill="url(#g3Steel)" stroke="#475569" stroke-width=".8"/>` +
    `<path d="M21 60 L39 60 L41 98 L19 98 Z" fill="#DC2626" stroke="#7F1D1D" stroke-width=".8"/><rect x="18" y="84" width="24" height="4" fill="#92400E"/><rect x="27.5" y="83.5" width="5" height="5" rx="1" fill="#FFD500"/>` +
    `<polygon points="30,65 32.2,70.2 37.8,70.4 33.4,73.8 35,79.2 30,76 25,79.2 26.6,73.8 22.2,70.4 27.8,70.2" fill="#FFD500" stroke="#B45309" stroke-width=".5"/>` +
    `<path d="M45 62 Q53 70 51 80" stroke="url(#g3Steel)" stroke-width="6.5" fill="none" stroke-linecap="round"/>` +
    `<rect x="49.5" y="34" width="3.6" height="40" rx="1" fill="url(#g3Steel)" stroke="#475569" stroke-width=".6"/><polygon points="49.5,34 53.1,34 51.3,29" fill="#E2E8F0" stroke="#475569" stroke-width=".6"/>` +
    `<rect x="44.5" y="73" width="13.6" height="3.4" rx="1.4" fill="#F59E0B" stroke="#92400E" stroke-width=".6"/><rect x="49.8" y="76" width="3" height="7" fill="#7C4A1E"/><circle cx="51.3" cy="84.5" r="2" fill="#F59E0B"/>` +
    `<circle cx="51" cy="80" r="3.6" fill="#94A3B8"/>` +
    `<path d="M15 62 Q8 68 10 76" stroke="url(#g3Steel)" stroke-width="6.5" fill="none" stroke-linecap="round"/>` +
    `<path d="M0 64 L20 64 L20 79 Q20 92 10 97 Q0 92 0 79 Z" fill="url(#g3Shield)" stroke="#FFD500" stroke-width="1.6"/>` +
    `<path d="M10 68 V92 M3 76 H17" stroke="#FFD500" stroke-width="2.6"/><path d="M3 67 Q6 66 9 66.5" stroke="#fff" stroke-opacity=".4" stroke-width="1.4" fill="none" stroke-linecap="round"/>` +
    `<path d="M30 19 Q38 6 48 10 Q42 12 40 20" fill="#E3000B" stroke="#991B1B" stroke-width=".7"/>` +
    `<path d="M17 56 L17 32 Q17 18 30 18 Q43 18 43 32 L43 56 Z" fill="url(#g3Steel)" stroke="#475569" stroke-width=".9"/>` +
    `<path d="M30 18 V31" stroke="#64748B" stroke-width="1.2"/>` +
    `<rect x="19.5" y="32" width="21" height="5" rx="2" fill="#1E293B"/><circle cx="25.5" cy="34.5" r="1.1" fill="#7DD3FC"/><circle cx="34.5" cy="34.5" r="1.1" fill="#7DD3FC"/>` +
    [[24, 43], [28, 43], [32, 43], [36, 43], [26, 47], [30, 47], [34, 47]].map(([x, y]) => `<circle cx="${x}" cy="${y}" r=".9" fill="#334155"/>`).join('') +
    `<path d="M20 24 Q23 20 27 19.5" stroke="#fff" stroke-opacity=".6" stroke-width="1.6" fill="none" stroke-linecap="round"/>`;

  // 🌋 Người đá dung nham
  FIG['buddy-lava-golem'] = defs(
    lin('g3Rock', [[0, '#5B504A'], [0.6, '#3A302C'], [1, '#221B19']]),
    rad('g3Core', [[0, '#FFF7AE'], [0.5, '#FFB020'], [1, '#EA580C']], '50%', '50%', '55%')) +
    shadow(30, 119, 26) +
    `<path d="M11 92 L27 92 L28 118 L10 118 Z" fill="url(#g3Rock)" stroke="#170F0D" stroke-width=".8"/><path d="M33 92 L49 92 L50 118 L32 118 Z" fill="url(#g3Rock)" stroke="#170F0D" stroke-width=".8"/>` +
    `<path d="M-4 50 L7 45 L11 60 L9 82 L-1 88 L-6 78 Z" fill="url(#g3Rock)" stroke="#170F0D" stroke-width=".8"/><path d="M64 50 L53 45 L49 60 L51 82 L61 88 L66 78 Z" fill="url(#g3Rock)" stroke="#170F0D" stroke-width=".8"/>` +
    `<path d="M-6 84 L4 82 L8 92 L2 99 L-6 96 Z" fill="url(#g3Rock)" stroke="#170F0D" stroke-width=".8"/><path d="M66 84 L56 82 L52 92 L58 99 L66 96 Z" fill="url(#g3Rock)" stroke="#170F0D" stroke-width=".8"/>` +
    `<path d="M6 46 L18 37 L42 37 L54 46 L56 78 L46 93 L14 93 L4 78 Z" fill="url(#g3Rock)" stroke="#170F0D" stroke-width=".9"/>` +
    `<circle cx="30" cy="63" r="10" fill="#FB923C" opacity=".3"/><path d="M30 54 L37 61 L33 72 L25 71 L22 61 Z" fill="url(#g3Core)"/>` +
    `<path d="M14 44 L20 52 L16 60 L22 66 M46 44 L40 51 L44 60 L38 66 M18 80 L24 76 L30 86 L36 77 L42 82 M2 58 L6 66 L3 74 M58 58 L54 66 L57 74 M14 98 L20 104 L17 112 M44 98 L40 105 L43 112" stroke="#FF8A1F" stroke-width="1.8" fill="none" stroke-linejoin="round" stroke-linecap="round"/>` +
    `<path d="M14 44 L20 52 L16 60 L22 66 M46 44 L40 51 L44 60 L38 66 M18 80 L24 76 L30 86 L36 77 L42 82" stroke="#FFE08A" stroke-width=".6" fill="none"/>` +
    `<path d="M19 38 L22 21 L38 21 L41 38 Z" fill="url(#g3Rock)" stroke="#170F0D" stroke-width=".9"/>` +
    `<rect x="23" y="27" width="5" height="3" rx="1" fill="#FFD23F"/><rect x="32" y="27" width="5" height="3" rx="1" fill="#FFD23F"/><path d="M25 34 Q30 36.4 35 34" stroke="#FF8A1F" stroke-width="1.4" fill="none" stroke-linecap="round"/>` +
    `<path d="M24 23 L27 22.5" stroke="#fff" stroke-opacity=".25" stroke-width="1.4" stroke-linecap="round"/>` +
    `<circle cx="12" cy="18" r="1.4" fill="#FB923C" opacity=".8"/><circle cx="50" cy="24" r="1.1" fill="#FDBA74" opacity=".8"/><circle cx="46" cy="14" r=".9" fill="#FB923C" opacity=".8"/>`;

  // ☁️ Tinh linh Mây – có cầu vồng và giọt mưa
  const CLOUD = [[18, 72, 12], [30, 63, 15], [42, 72, 12], [24, 82, 11], [36, 82, 11]];
  FIG['buddy-cloud'] = defs(rad('g3Cloud', [[0, '#FFFFFF'], [0.75, '#EDF5FF'], [1, '#C9DCF5']])) +
    shadow(30, 119, 16, 2.5) +
    `<g transform="translate(30 80) scale(1.35) translate(-30 -72)">` +
    ['#EF4444', '#F59E0B', '#FACC15', '#22C55E', '#3B82F6', '#8B5CF6'].map((c, i) => `<path d="M${6 + i * 2.4} 70 A${24 - i * 2.4} ${24 - i * 2.4} 0 0 1 ${54 - i * 2.4} 70" stroke="${c}" stroke-width="2.4" fill="none"/>`).join('') +
    CLOUD.map(([x, y, r]) => `<circle cx="${x}" cy="${y}" r="${r + 0.9}" fill="#B9CFEA"/>`).join('') +
    CLOUD.map(([x, y, r]) => `<circle cx="${x}" cy="${y}" r="${r}" fill="url(#g3Cloud)"/>`).join('') +
    `<path d="M24 70 Q25.5 68 27 70 M33 70 Q34.5 68 36 70" stroke="#1B1B1B" stroke-width="1.4" fill="none" stroke-linecap="round"/>` +
    `<path d="M27 75 Q30 78.5 33 75" stroke="#1B1B1B" stroke-width="1.3" fill="none" stroke-linecap="round"/>` +
    `<circle cx="21.5" cy="74" r="2" fill="#F9A8D4" opacity=".7"/><circle cx="38.5" cy="74" r="2" fill="#F9A8D4" opacity=".7"/></g>` +
    [[20, 110], [30, 115], [40, 110]].map(([x, y]) => `<path d="M${x} ${y - 5} Q${x + 3} ${y} ${x} ${y + 1.6} Q${x - 3} ${y} ${x} ${y - 5} Z" fill="#60A5FA" stroke="#2563EB" stroke-width=".5"/>`).join('');

  // 🐻 Gấu phi hành gia
  FIG['buddy-space-bear'] = defs(
    lin('g3Suit', [[0, '#FFFFFF'], [1, '#C8D2DE']]),
    rad('g3Bear', [[0, '#C68A55'], [1, '#7A4A22']]),
    rad('g3Visor', [[0, '#E0F2FE', 0.15], [1, '#7DD3FC', 0.45]])) +
    shadow(30, 119, 18) +
    `<rect x="18" y="90" width="10" height="22" rx="2" fill="url(#g3Suit)" stroke="#94A3B8" stroke-width=".7"/><rect x="32" y="90" width="10" height="22" rx="2" fill="url(#g3Suit)" stroke="#94A3B8" stroke-width=".7"/>` +
    `<rect x="16" y="111" width="13" height="8" rx="3" fill="#64748B"/><rect x="31" y="111" width="13" height="8" rx="3" fill="#64748B"/>` +
    `<rect x="44" y="60" width="9" height="22" rx="3" fill="#94A3B8"/>` +
    `<path d="M15 58 L45 58 L46 92 L14 92 Z" fill="url(#g3Suit)" stroke="#94A3B8" stroke-width=".8"/>` +
    `<rect x="22" y="66" width="16" height="11" rx="2" fill="#334155"/><circle cx="26" cy="71.5" r="1.8" fill="#EF4444"/><circle cx="30" cy="71.5" r="1.8" fill="#FACC15"/><circle cx="34" cy="71.5" r="1.8" fill="#22C55E"/>` +
    `<rect x="14" y="82" width="32" height="4" fill="#F97316"/>` +
    `<path d="M15 61 Q7 70 10 82" stroke="url(#g3Suit)" stroke-width="7" fill="none" stroke-linecap="round"/><circle cx="10" cy="84" r="3.6" fill="#64748B"/>` +
    `<path d="M45 61 Q53 66 54 56" stroke="url(#g3Suit)" stroke-width="7" fill="none" stroke-linecap="round"/><circle cx="54" cy="53" r="3.6" fill="#64748B"/>` +
    `<ellipse cx="30" cy="57" rx="15" ry="3.6" fill="#94A3B8"/>` +
    `<circle cx="20" cy="29" r="5" fill="url(#g3Bear)"/><circle cx="40" cy="29" r="5" fill="url(#g3Bear)"/><circle cx="20" cy="29" r="2.4" fill="#E8B88A"/><circle cx="40" cy="29" r="2.4" fill="#E8B88A"/>` +
    `<circle cx="30" cy="40" r="12.5" fill="url(#g3Bear)"/>` +
    `<ellipse cx="30" cy="45" rx="6.5" ry="4.8" fill="#EBC79E"/><ellipse cx="30" cy="42.5" rx="2.4" ry="1.7" fill="#2B1608"/><path d="M28 46.5 Q30 48.4 32 46.5" stroke="#2B1608" stroke-width="1" fill="none" stroke-linecap="round"/>` +
    eye(25, 37, 1.8) + eye(35, 37, 1.8) +
    `<circle cx="30" cy="38" r="19" fill="url(#g3Visor)" stroke="#94A3B8" stroke-width="1.4"/>` +
    `<path d="M16 32 Q18 23 26 20" stroke="#fff" stroke-width="2.2" fill="none" stroke-linecap="round" opacity=".85"/>`;

  // 🐧 Chim cánh cụt đầu bếp
  FIG['buddy-chef-penguin'] = defs(rad('g3Peng', [[0, '#4B5563'], [0.6, '#1F2937'], [1, '#0B0F17']])) +
    shadow(30, 119, 18) +
    `<ellipse cx="22" cy="116" rx="7" ry="3.4" fill="#FB923C" stroke="#C2410C" stroke-width=".6"/><ellipse cx="38" cy="116" rx="7" ry="3.4" fill="#FB923C" stroke="#C2410C" stroke-width=".6"/>` +
    `<ellipse cx="30" cy="84" rx="19" ry="29" fill="url(#g3Peng)"/>` +
    `<ellipse cx="30" cy="89" rx="12.5" ry="23" fill="#F8FAFC"/>` +
    `<path d="M18 82 L42 82 L40 104 Q30 108 20 104 Z" fill="#fff" stroke="#CBD5E1" stroke-width=".7"/><rect x="23" y="88" width="14" height="7" rx="2" fill="none" stroke="#E11D48" stroke-width="1"/>` +
    `<ellipse cx="11" cy="84" rx="5" ry="13" fill="url(#g3Peng)" transform="rotate(18 11 84)"/>` +
    `<path d="M47 66 L57 46" stroke="#B45309" stroke-width="2.4" stroke-linecap="round"/><ellipse cx="57.5" cy="43" rx="3.6" ry="5" fill="#D97706" transform="rotate(26 57.5 43)"/>` +
    `<ellipse cx="49" cy="76" rx="5" ry="12" fill="url(#g3Peng)" transform="rotate(-30 49 76)"/>` +
    `<ellipse cx="25" cy="55" rx="6" ry="6.6" fill="#F8FAFC"/><ellipse cx="35" cy="55" rx="6" ry="6.6" fill="#F8FAFC"/>` +
    eye(25.6, 55, 2) + eye(34.4, 55, 2) +
    `<path d="M26 61 Q30 58.6 34 61 Q30 66 26 61 Z" fill="#FB923C" stroke="#C2410C" stroke-width=".6"/>` +
    `<circle cx="20.5" cy="62" r="2" fill="#F9A8D4" opacity=".6"/><circle cx="39.5" cy="62" r="2" fill="#F9A8D4" opacity=".6"/>` +
    `<rect x="19" y="38" width="22" height="8" rx="2" fill="#fff" stroke="#CBD5E1" stroke-width=".8"/>` +
    `<circle cx="22" cy="31" r="7.6" fill="#fff" stroke="#CBD5E1" stroke-width=".8"/><circle cx="38" cy="31" r="7.6" fill="#fff" stroke="#CBD5E1" stroke-width=".8"/><circle cx="30" cy="27" r="9" fill="#fff" stroke="#CBD5E1" stroke-width=".8"/>` +
    `<path d="M19.5 38.6 h21" stroke="#fff" stroke-width="2"/>`;

  // 🦖 Khủng long bạo chúa
  FIG['buddy-trex'] = defs(
    lin('g3Rex', [[0, '#7AD15F'], [0.55, '#3FA535'], [1, '#22702A']]),
    lin('g3Belly', [[0, '#F7F3C2'], [1, '#D9CF84']])) +
    shadow(28, 119, 24) +
    `<path d="M14 88 Q-2 96 -6 112 Q6 104 20 100 Z" fill="url(#g3Rex)" stroke="#1E5E24" stroke-width=".8"/>` +
    `<path d="M15 90 L27 90 L28 114 L14 114 Z" fill="url(#g3Rex)" stroke="#1E5E24" stroke-width=".8"/><path d="M33 90 L45 90 L46 114 L32 114 Z" fill="url(#g3Rex)" stroke="#1E5E24" stroke-width=".8"/>` +
    `<path d="M10 120 L13 112 L29 112 L31 120 Z" fill="#2E8B33" stroke="#1E5E24" stroke-width=".8"/><path d="M30 120 L32 112 L48 112 L51 120 Z" fill="#2E8B33" stroke="#1E5E24" stroke-width=".8"/>` +
    `<path d="M12 120 l1 -2.4 M17 120 l.5 -2.4 M33 120 l.5 -2.4 M38 120 l.5 -2.4 M44 120 l.8 -2.4" stroke="#F8FAFC" stroke-width="1.4" stroke-linecap="round"/>` +
    `<ellipse cx="30" cy="78" rx="17" ry="20" fill="url(#g3Rex)" stroke="#1E5E24" stroke-width=".9" transform="rotate(-12 30 78)"/>` +
    `<ellipse cx="34" cy="80" rx="9" ry="14" fill="url(#g3Belly)" transform="rotate(-12 34 80)"/>` +
    `<path d="M38 66 Q45 66 47 71 M37 73 Q44 74 45 79" stroke="#2E8B33" stroke-width="3.6" fill="none" stroke-linecap="round"/><path d="M47 71 l1.6 1 M45 79 l1.6 .8" stroke="#F8FAFC" stroke-width="1.2" stroke-linecap="round"/>` +
    `<polygon points="14,62 10,58 16,58" fill="#F97316"/><polygon points="12,70 7,67 13,65" fill="#F97316"/><polygon points="12,79 7,77 12,73" fill="#F97316"/><polygon points="14,88 9,88 13,82" fill="#F97316"/>` +
    `<path d="M16 50 Q14 28 36 26 Q58 26 60 40 Q60 52 50 55 L32 58 Q18 58 16 50 Z" fill="url(#g3Rex)" stroke="#1E5E24" stroke-width=".9"/>` +
    `<path d="M30 49 Q44 52 59 46" stroke="#1E5E24" stroke-width="1.2" fill="none" stroke-linecap="round"/>` +
    `<path d="M36 49.8 l1.5 3 l1.5 -2.8 M42 50.6 l1.5 3 l1.5 -3 M48 49.8 l1.5 2.8 l1.5 -3.2 M54 48.2 l1.2 2.6 l1.4 -3" fill="#fff" stroke="#fff" stroke-width=".8" stroke-linejoin="round"/>` +
    `<ellipse cx="38" cy="36" rx="4.4" ry="4.8" fill="#fff"/>` + eye(39, 36.6, 2.4) +
    `<path d="M33 31 Q38 28.6 43 31" stroke="#1E5E24" stroke-width="1.4" fill="none" stroke-linecap="round"/>` +
    `<circle cx="55" cy="35" r=".9" fill="#1E5E24"/><circle cx="47" cy="44" r="2.2" fill="#F9A8D4" opacity=".6"/>` +
    `<path d="M22 34 Q27 28 34 28" stroke="#fff" stroke-opacity=".35" stroke-width="1.8" fill="none" stroke-linecap="round"/>`;

  // 🦁 Lân múa Trung thu (múa lân Việt Nam)
  FIG['buddy-lion-dance'] = defs(
    rad('g3Lion', [[0, '#FF5A5A'], [0.6, '#E3000B'], [1, '#990008']]),
    lin('g3Gold', [[0, '#FFF3A3'], [0.5, '#FFD500'], [1, '#D99A00']]),
    lin('g3LionBody', [[0, '#F43F3F'], [1, '#B4000A']], 1, 0)) +
    shadow(32, 119, 28) +
    `<path d="M10 62 Q32 52 62 60 L64 101 Q36 106 10 101 Z" fill="url(#g3LionBody)" stroke="#7F1D1D" stroke-width=".8"/>` +
    [0, 1, 2, 3].map((r) => [0, 1, 2, 3, 4].map((c) => `<path d="M${16 + c * 9 + (r % 2) * 4.5} ${68 + r * 8} q4.5 4 9 0" stroke="#FFD500" stroke-width="1" fill="none" opacity=".85"/>`).join('')).join('') +
    `<path d="M10 101 Q36 106 64 101" stroke="#FFD500" stroke-width="5" fill="none" stroke-dasharray="1.6 1.6"/>` +
    `<path d="M62 60 Q70 66 66 76" stroke="#FFD500" stroke-width="3" fill="none" stroke-linecap="round"/>` +
    `<rect x="14" y="103" width="7" height="12" fill="#FACC15"/><rect x="24" y="103" width="7" height="12" fill="#FACC15"/><rect x="42" y="103" width="7" height="12" fill="#FDE047"/><rect x="52" y="103" width="7" height="12" fill="#FDE047"/>` +
    `<path d="M14 111 h7 M24 111 h7 M42 111 h7 M52 111 h7" stroke="#E3000B" stroke-width="1.6"/>` +
    `<rect x="12.5" y="114.5" width="9.5" height="4.5" rx="2" fill="#1F1F23"/><rect x="22.5" y="114.5" width="9.5" height="4.5" rx="2" fill="#1F1F23"/><rect x="40.5" y="114.5" width="9.5" height="4.5" rx="2" fill="#1F1F23"/><rect x="50.5" y="114.5" width="9.5" height="4.5" rx="2" fill="#1F1F23"/>` +
    [[4, 34], [3, 44], [5, 54], [9, 62], [44, 30], [46, 40], [45, 52], [40, 60], [10, 24], [18, 19], [28, 18], [37, 21]].map(([x, y]) => `<circle cx="${x}" cy="${y}" r="4.2" fill="#fff" stroke="#E5E7EB" stroke-width=".5"/>`).join('') +
    `<path d="M5 42 Q4 20 24 20 Q44 20 44 42 Q44 56 24 58 Q5 56 5 42 Z" fill="url(#g3Lion)" stroke="#7F1D1D" stroke-width=".9"/>` +
    `<path d="M7 34 Q24 22 42 34" stroke="url(#g3Gold)" stroke-width="3" fill="none"/>` +
    `<path d="M24 20 Q22 11 25 7 Q28 12 26 20 Z" fill="url(#g3Gold)" stroke="#B45309" stroke-width=".6"/>` +
    `<circle cx="24" cy="27" r="3" fill="#E0F2FE" stroke="url(#g3Gold)" stroke-width="1.6"/>` +
    `<ellipse cx="15.5" cy="38" rx="5.4" ry="4.8" fill="#fff" stroke="#1B1B1B" stroke-width=".7"/><ellipse cx="32.5" cy="38" rx="5.4" ry="4.8" fill="#fff" stroke="#1B1B1B" stroke-width=".7"/>` +
    eye(16.5, 38.6, 2.6) + eye(31.5, 38.6, 2.6) +
    `<path d="M9.5 33.5 Q15.5 29.4 21.5 33.5 M26.5 33.5 Q32.5 29.4 38.5 33.5" stroke="url(#g3Gold)" stroke-width="2.6" fill="none" stroke-linecap="round"/>` +
    `<path d="M9 32 l-2 -3 M12 30.5 l-1 -3 M36 30.5 l1 -3 M39 32 l2 -3" stroke="#1B1B1B" stroke-width=".9" stroke-linecap="round"/>` +
    `<ellipse cx="24" cy="45" rx="4" ry="3" fill="url(#g3Gold)" stroke="#B45309" stroke-width=".6"/>` +
    `<path d="M10 49 Q24 46 38 49 Q36 59 24 60 Q12 59 10 49 Z" fill="#7F1D1D"/><path d="M11 49.5 Q24 46.8 37 49.5" stroke="#fff" stroke-width="1.6" stroke-dasharray="1.6 1.2"/>` +
    `<path d="M14 56 Q24 60 34 56 L33 62 Q24 66 15 62 Z" fill="url(#g3Gold)" stroke="#B45309" stroke-width=".6"/>` +
    `<path d="M15 64 l-1 5 M19 65 l-.5 6 M24 65.5 v6 M29 65 l.5 6 M33 64 l1 5" stroke="#fff" stroke-width="2.2" stroke-linecap="round"/>` +
    `<path d="M10 28 Q14 23 19 22" stroke="#fff" stroke-opacity=".45" stroke-width="1.6" fill="none" stroke-linecap="round"/>`;

  /** Gắn món vào kho bằng getter: mỗi lần vẽ đổi id gradient thành id riêng (g3Cat → g3Cat_12),
   *  tránh lỗi trình duyệt bỏ gradient khi SVG đầu tiên chứa id đó bị ẩn (display:none). */
  let uid = 0;
  const fresh = (svg) => { const n = ++uid; return svg.replace(/\bg3([A-Z][A-Za-z]*)/g, `g3$1_${n}`); };
  const install = (store, map) => Object.keys(map).forEach((id) =>
    Object.defineProperty(store, id, { get: () => fresh(map[id]), enumerable: true, configurable: true }));
  install(BUDDIES, FIG);

  /* =========================================================
     THÚ CƯNG (khung 64 × 56, chân chạm y≈52)
     ========================================================= */
  install(PETS, {
    // Nhím con cõng quả táo
    'pet-hedgehog': defs(rad('g3Hog', [[0, '#A97142'], [1, '#5C3517']])) +
      shadow(30, 52, 22, 2.4) +
      `<path d="M8 44 L6 38 L10 36 L7 30 L13 29 L11 22 L17 23 L17 16 L23 19 L25 12 L30 17 L34 11 L37 18 L42 14 L43 21 L48 20 L46 27 L50 30 L46 34 L50 40 L46 44 Z" fill="url(#g3Hog)" stroke="#3F230C" stroke-width=".8" stroke-linejoin="round"/>` +
      `<ellipse cx="46" cy="40" rx="12" ry="9.5" fill="#F3D9B1" stroke="#C49A6C" stroke-width=".8"/>` +
      `<circle cx="57.5" cy="39" r="2" fill="#2B1608"/>` + eye(47, 36.6, 1.8) +
      `<circle cx="51" cy="43" r="1.8" fill="#F9A8D4" opacity=".7"/><path d="M50 45.5 Q53 47 55 45" stroke="#2B1608" stroke-width=".9" fill="none" stroke-linecap="round"/>` +
      `<ellipse cx="16" cy="49.5" rx="4" ry="2.6" fill="#C49A6C"/><ellipse cx="38" cy="49.5" rx="4" ry="2.6" fill="#C49A6C"/>` +
      `<circle cx="25" cy="12" r="6" fill="#E3000B" stroke="#A30008" stroke-width=".6"/><path d="M25 6.5 Q26 3 28 2.5" stroke="#7C4A1E" stroke-width="1.2" fill="none"/><path d="M26 4.5 Q30 2 31 5 Q28 6 26 4.5 Z" fill="#22C55E"/><circle cx="23" cy="10" r="1.4" fill="#fff" opacity=".6"/>`,

    // Trứng khủng long đang nở
    'pet-dino-egg': defs(rad('g3Egg', [[0, '#FFFFFF'], [0.7, '#FFF4DB'], [1, '#E8D3A7']]), rad('g3Baby', [[0, '#9AE6A2'], [1, '#3FA535']])) +
      shadow(32, 52, 18, 2.4) +
      `<circle cx="32" cy="20" r="11" fill="url(#g3Baby)" stroke="#1E5E24" stroke-width=".8"/>` +
      eye(28, 18, 2) + eye(36, 18, 2) +
      `<path d="M28.5 24.5 Q32 27 35.5 24.5" stroke="#1E5E24" stroke-width="1.1" fill="none" stroke-linecap="round"/><circle cx="24.5" cy="23" r="1.7" fill="#F9A8D4" opacity=".7"/><circle cx="39.5" cy="23" r="1.7" fill="#F9A8D4" opacity=".7"/>` +
      `<path d="M23 12 Q32 2 41 12 L38 13 L35 9.5 L32 13 L29 9.5 L26 13 Z" fill="url(#g3Egg)" stroke="#C7A86B" stroke-width=".7" stroke-linejoin="round"/>` +
      `<path d="M15 32 L20 28 L24 33 L28 28 L32 33 L36 28 L40 33 L44 28 L49 32 Q52 50 32 52 Q12 50 15 32 Z" fill="url(#g3Egg)" stroke="#C7A86B" stroke-width=".8" stroke-linejoin="round"/>` +
      `<ellipse cx="24" cy="42" rx="3" ry="2.2" fill="#86C06A" opacity=".75"/><ellipse cx="38" cy="45" rx="2.4" ry="1.8" fill="#86C06A" opacity=".75"/><ellipse cx="41" cy="37" rx="1.8" ry="1.4" fill="#86C06A" opacity=".75"/>` +
      `<path d="M8 50 l3 -3 M54 48 l4 -2 M56 52 l3 0" stroke="#C7A86B" stroke-width="1.2" stroke-linecap="round"/>`,

    // Kỳ giông hồng (axolotl)
    'pet-axolotl': defs(rad('g3Axo', [[0, '#FFD3EA'], [0.7, '#F9A8D4'], [1, '#E879B0']])) +
      shadow(30, 52, 24, 2.4) +
      `<path d="M14 40 Q2 34 2 44 Q8 48 14 46 Z" fill="url(#g3Axo)" stroke="#C2588F" stroke-width=".8"/>` +
      `<ellipse cx="26" cy="42" rx="16" ry="8" fill="url(#g3Axo)" stroke="#C2588F" stroke-width=".8"/>` +
      `<ellipse cx="18" cy="49.5" rx="3" ry="2.4" fill="#F9A8D4" stroke="#C2588F" stroke-width=".6"/><ellipse cx="33" cy="49.5" rx="3" ry="2.4" fill="#F9A8D4" stroke="#C2588F" stroke-width=".6"/>` +
      `<path d="M37 21 L31 15 M36 25 L29 23 M37 29 L30 30 M55 21 L61 15 M56 25 L63 23 M55 29 L62 30" stroke="#DB2777" stroke-width="2.6" stroke-linecap="round"/>` +
      `<path d="M37 21 L31 15 M36 25 L29 23 M37 29 L30 30 M55 21 L61 15 M56 25 L63 23 M55 29 L62 30" stroke="#F472B6" stroke-width="1" stroke-linecap="round"/>` +
      `<ellipse cx="46" cy="30" rx="12" ry="10.5" fill="url(#g3Axo)" stroke="#C2588F" stroke-width=".8"/>` +
      eye(41.5, 28.5, 1.8) + eye(50.5, 28.5, 1.8) +
      `<path d="M42.5 34 Q46 37 49.5 34" stroke="#9D174D" stroke-width="1.1" fill="none" stroke-linecap="round"/><circle cx="39" cy="33" r="1.6" fill="#F472B6" opacity=".7"/><circle cx="53" cy="33" r="1.6" fill="#F472B6" opacity=".7"/>`,

    // Sứa phát sáng
    'pet-jellyfish': defs(rad('g3Jelly', [[0, '#F5F3FF', 0.95], [0.55, '#C4B5FD', 0.9], [1, '#7C3AED', 0.9]], '50%', '25%', '80%')) +
      shadow(32, 53, 14, 2) +
      `<circle cx="32" cy="22" r="20" fill="#A78BFA" opacity=".18"/>` +
      [[20, '#C084FC'], [26, '#67E8F9'], [32, '#C084FC'], [38, '#67E8F9'], [44, '#C084FC']].map(([x, c], i) => `<path d="M${x} 28 Q${x + (i % 2 ? 4 : -4)} 35 ${x} 41 Q${x + (i % 2 ? -4 : 4)} 46 ${x} 50" stroke="${c}" stroke-width="2.2" fill="none" stroke-linecap="round"/>`).join('') +
      `<path d="M14 28 Q14 6 32 6 Q50 6 50 28 Q47 31 44 28 Q41 31 38 28 Q35 31 32 28 Q29 31 26 28 Q23 31 20 28 Q17 31 14 28 Z" fill="url(#g3Jelly)" stroke="#7C3AED" stroke-width=".8"/>` +
      eye(27, 19, 1.8) + eye(37, 19, 1.8) +
      `<path d="M29.5 23 Q32 25.4 34.5 23" stroke="#4C1D95" stroke-width="1.1" fill="none" stroke-linecap="round"/><circle cx="23" cy="22.5" r="1.7" fill="#F9A8D4" opacity=".7"/><circle cx="41" cy="22.5" r="1.7" fill="#F9A8D4" opacity=".7"/>` +
      `<path d="M20 13 Q24 9 29 8.5" stroke="#fff" stroke-width="1.8" fill="none" stroke-linecap="round" opacity=".8"/>` +
      `<circle cx="54" cy="10" r="1.6" fill="none" stroke="#7DD3FC" stroke-width=".8"/><circle cx="57" cy="16" r="1.1" fill="none" stroke="#7DD3FC" stroke-width=".8"/><circle cx="9" cy="14" r="1.3" fill="none" stroke="#7DD3FC" stroke-width=".8"/>`,

    // Gấu trúc đỏ
    'pet-red-panda': defs(rad('g3Rp', [[0, '#E2753A'], [1, '#9C3A0E']])) +
      shadow(30, 52, 24, 2.4) +
      `<path d="M10 38 Q0 30 4 16 Q8 12 11 16 Q8 28 16 34 Z" fill="url(#g3Rp)" stroke="#6B2A08" stroke-width=".7"/>` +
      `<path d="M4.5 20 l5 1 M3.8 26 l5.6 .2 M6 31.5 l5.5 -1.5" stroke="#F3D9B1" stroke-width="2.6" stroke-linecap="round"/>` +
      `<ellipse cx="26" cy="38" rx="16" ry="10" fill="url(#g3Rp)" stroke="#6B2A08" stroke-width=".8"/>` +
      `<rect x="14" y="42" width="7" height="10" rx="3" fill="#3B1A0A"/><rect x="30" y="42" width="7" height="10" rx="3" fill="#3B1A0A"/>` +
      `<polygon points="34,17 35,6 43,12" fill="#9C3A0E" stroke="#6B2A08" stroke-width=".7"/><polygon points="58,17 57,6 49,12" fill="#9C3A0E" stroke="#6B2A08" stroke-width=".7"/><polygon points="36,14 36.6,9 40.5,12" fill="#F3D9B1"/><polygon points="56,14 55.4,9 51.5,12" fill="#F3D9B1"/>` +
      `<circle cx="46" cy="24" r="12.5" fill="url(#g3Rp)" stroke="#6B2A08" stroke-width=".8"/>` +
      `<ellipse cx="46" cy="29" rx="8" ry="5.6" fill="#FBF3E6"/><ellipse cx="40" cy="20.5" rx="2.6" ry="2" fill="#FBF3E6"/><ellipse cx="52" cy="20.5" rx="2.6" ry="2" fill="#FBF3E6"/>` +
      eye(41.5, 24.5, 1.9) + eye(50.5, 24.5, 1.9) +
      `<ellipse cx="46" cy="27.5" rx="2.2" ry="1.5" fill="#1B1B1B"/><path d="M44 30.5 Q46 32.2 48 30.5" stroke="#1B1B1B" stroke-width=".9" fill="none" stroke-linecap="round"/>`,

    // Trâu vàng may mắn
    'pet-golden-buffalo': defs(lin('g3Buf', [[0, '#FFF1A6'], [0.45, '#FFC928'], [1, '#C98A00']])) +
      shadow(30, 52, 24, 2.4) +
      `<path d="M8 32 Q2 36 4 44" stroke="#B07800" stroke-width="2" fill="none" stroke-linecap="round"/><path d="M3 43 l1.5 4 l2 -3.6 Z" fill="#B07800"/>` +
      `<ellipse cx="26" cy="36" rx="19" ry="12" fill="url(#g3Buf)" stroke="#A16B00" stroke-width=".8"/>` +
      `<rect x="12" y="42" width="7" height="10" rx="2" fill="url(#g3Buf)" stroke="#A16B00" stroke-width=".7"/><rect x="33" y="42" width="7" height="10" rx="2" fill="url(#g3Buf)" stroke="#A16B00" stroke-width=".7"/><path d="M12 50.5 h7 M33 50.5 h7" stroke="#7A5200" stroke-width="2"/>` +
      `<path d="M38 18 Q30 14 30 6 Q36 10 42 14 Z" fill="#FFF7E0" stroke="#A16B00" stroke-width=".7"/><path d="M58 18 Q66 14 66 6 Q60 10 54 14 Z" fill="#FFF7E0" stroke="#A16B00" stroke-width=".7"/>` +
      `<ellipse cx="48" cy="26" rx="12" ry="11" fill="url(#g3Buf)" stroke="#A16B00" stroke-width=".8"/>` +
      `<ellipse cx="48" cy="32" rx="7.5" ry="5" fill="#FFE7A3" stroke="#A16B00" stroke-width=".6"/><circle cx="45.5" cy="32" r="1.1" fill="#7A5200"/><circle cx="50.5" cy="32" r="1.1" fill="#7A5200"/>` +
      eye(43.5, 23.5, 1.8) + eye(52.5, 23.5, 1.8) +
      `<path d="M30 25 L32 28 L35 25 M20 28 L22 31 L25 28" stroke="#E3000B" stroke-width="1.2" fill="none"/>` +
      sparkle(14, 20, 2.6, '#FFF7CC') + sparkle(60, 40, 2, '#FFF7CC'),

    // Rùa pha lê – mai bằng đá quý
    'pet-crystal-turtle': defs(rad('g3Tur', [[0, '#9EE7E0'], [1, '#2C8F86']]), lin('g3Gem', [[0, '#F0F9FF'], [0.4, '#A5F3FC'], [0.7, '#C4B5FD'], [1, '#818CF8']])) +
      shadow(30, 52, 26, 2.4) +
      `<circle cx="54" cy="36" r="8" fill="url(#g3Tur)" stroke="#1F6F68" stroke-width=".8"/>` + eye(56, 34, 1.8) +
      `<path d="M54 40 Q57 41.6 60 39.6" stroke="#134E4A" stroke-width=".9" fill="none" stroke-linecap="round"/>` +
      `<rect x="12" y="44" width="9" height="8" rx="3" fill="url(#g3Tur)" stroke="#1F6F68" stroke-width=".7"/><rect x="36" y="44" width="9" height="8" rx="3" fill="url(#g3Tur)" stroke="#1F6F68" stroke-width=".7"/>` +
      `<path d="M6 44 L10 28 L20 18 L36 18 L46 28 L50 44 Z" fill="url(#g3Gem)" stroke="#6366F1" stroke-width=".9" stroke-linejoin="round"/>` +
      `<path d="M20 18 L24 30 L32 30 L36 18 M10 28 L24 30 M46 28 L32 30 M24 30 L18 44 M32 30 L38 44 M24 30 L28 44 L32 30" stroke="#fff" stroke-width=".9" fill="none"/>` +
      `<polygon points="24,30 32,30 28,44" fill="#F9A8D4" opacity=".35"/><polygon points="10,28 20,18 24,30" fill="#67E8F9" opacity=".3"/>` +
      `<rect x="4" y="43" width="48" height="4" rx="2" fill="url(#g3Tur)" stroke="#1F6F68" stroke-width=".6"/>` +
      sparkle(40, 14, 3, '#fff') + sparkle(14, 22, 2, '#E0F2FE')
  });

  /* =========================================================
     XE (khung 84 × 62)
     ========================================================= */
  install(RIDES, {
    // Mây bay thần kỳ
    'ride-magic-cloud': defs(rad('g3Ride', [[0, '#FFFFFF'], [0.7, '#FFF8E1'], [1, '#F2D27A']])) +
      `<ellipse cx="42" cy="61" rx="26" ry="2.6" fill="#0F172A" opacity=".1"/>` +
      `<path d="M4 44 Q-2 34 6 30 Q10 36 16 36" stroke="#F2D27A" stroke-width="3" fill="none" stroke-linecap="round"/>` +
      [[20, 42, 10], [34, 36, 13], [50, 36, 13], [64, 42, 10], [42, 46, 11], [28, 48, 9], [56, 48, 9]].map(([x, y, r]) => `<circle cx="${x}" cy="${y}" r="${r + 0.9}" fill="#E0B94A"/>`).join('') +
      [[20, 42, 10], [34, 36, 13], [50, 36, 13], [64, 42, 10], [42, 46, 11], [28, 48, 9], [56, 48, 9]].map(([x, y, r]) => `<circle cx="${x}" cy="${y}" r="${r}" fill="url(#g3Ride)"/>`).join('') +
      `<path d="M30 30 Q36 25 44 27" stroke="#fff" stroke-width="2.4" fill="none" stroke-linecap="round"/>` +
      `<path d="M74 34 h8 M76 42 h7 M73 50 h6" stroke="#FCD34D" stroke-width="1.6" stroke-linecap="round"/>` +
      sparkle(12, 24, 3, '#FDE68A') + sparkle(70, 22, 3.4, '#FDE68A') + sparkle(44, 14, 2.4, '#fff'),

    // Thuyền rồng
    'ride-dragon-boat': defs(lin('g3Boat', [[0, '#F43F3F'], [1, '#A30008']], 0, 1), lin('g3BoatG', [[0, '#FFF3A3'], [1, '#E0A800']])) +
      `<path d="M0 56 Q7 52 14 56 T28 56 T42 56 T56 56 T70 56 T84 56 L84 62 L0 62 Z" fill="#3D9BE0" opacity=".85"/>` +
      `<path d="M2 40 Q-2 30 6 26 Q6 34 12 38 Z" fill="url(#g3BoatG)" stroke="#B45309" stroke-width=".7"/>` +
      `<path d="M4 40 L72 40 L66 55 L14 55 Z" fill="url(#g3Boat)" stroke="#7F1D1D" stroke-width=".9"/>` +
      `<path d="M8 44 L69 44" stroke="url(#g3BoatG)" stroke-width="2.4"/>` +
      [16, 26, 36, 46, 56].map((x) => `<path d="M${x} 48 q3 3 6 0" stroke="#FFD500" stroke-width="1" fill="none"/>`).join('') +
      `<path d="M24 40 L18 58 M38 40 L32 58 M52 40 L46 58" stroke="#7C4A1E" stroke-width="1.8" stroke-linecap="round"/>` +
      `<path d="M66 41 Q70 26 76 20" stroke="url(#g3Boat)" stroke-width="7" fill="none" stroke-linecap="round"/>` +
      `<path d="M66 41 Q70 26 76 20" stroke="#FFD500" stroke-width="1.4" fill="none" stroke-dasharray="2 2"/>` +
      `<path d="M70 18 Q76 8 84 14 Q86 20 80 22 L72 24 Z" fill="url(#g3Boat)" stroke="#7F1D1D" stroke-width=".8"/>` +
      `<path d="M74 12 L70 4 L77 10 M78 11 L80 2 L81 11" stroke="url(#g3BoatG)" stroke-width="2" fill="none" stroke-linecap="round"/>` +
      `<circle cx="78" cy="15" r="2.2" fill="#fff"/><circle cx="78.6" cy="15.2" r="1.2" fill="#1B1B1B"/>` +
      `<path d="M74 22 Q70 28 72 32 M77 22 Q76 28 78 31" stroke="#FFD500" stroke-width="1.2" fill="none" stroke-linecap="round"/>` +
      `<path d="M30 40 L30 22" stroke="#7C4A1E" stroke-width="1.4"/><path d="M30 22 L42 26 L30 30 Z" fill="#FFD500" stroke="#B45309" stroke-width=".6"/>`,

    // Đĩa bay UFO
    'ride-ufo': defs(lin('g3Ufo', [[0, '#F8FAFC'], [0.5, '#B6C2D1'], [1, '#64748B']], 0, 1), rad('g3Dome', [[0, '#E0F7FF', 0.6], [1, '#38BDF8', 0.55]])) +
      `<path d="M30 46 L44 46 L60 62 L14 62 Z" fill="#FDE047" opacity=".32"/>` +
      `<ellipse cx="37" cy="61" rx="22" ry="2" fill="#0F172A" opacity=".1"/>` +
      `<circle cx="42" cy="22" r="6.6" fill="#86EFAC" stroke="#15803D" stroke-width=".7"/>` + eye(39.6, 21.6, 1.6) + eye(44.4, 21.6, 1.6) +
      `<path d="M40 25.5 Q42 27 44 25.5" stroke="#14532D" stroke-width=".9" fill="none" stroke-linecap="round"/><path d="M39 16 L36 9 M45 16 L48 9" stroke="#15803D" stroke-width="1.1"/><circle cx="36" cy="8.6" r="1.6" fill="#FACC15"/><circle cx="48" cy="8.6" r="1.6" fill="#FACC15"/>` +
      `<path d="M26 32 Q26 10 42 10 Q58 10 58 32 Z" fill="url(#g3Dome)" stroke="#7DD3FC" stroke-width="1"/>` +
      `<path d="M31 22 Q33 15 39 13" stroke="#fff" stroke-width="1.8" fill="none" stroke-linecap="round"/>` +
      `<ellipse cx="42" cy="38" rx="40" ry="10" fill="url(#g3Ufo)" stroke="#475569" stroke-width=".9"/>` +
      `<ellipse cx="42" cy="33" rx="22" ry="3.2" fill="#94A3B8"/>` +
      [[10, '#F87171'], [22, '#FACC15'], [36, '#4ADE80'], [50, '#60A5FA'], [62, '#F472B6'], [74, '#FACC15']].map(([x, c]) => `<circle cx="${x}" cy="${x < 20 || x > 68 ? 39 : 41.5}" r="2.4" fill="${c}" stroke="#fff" stroke-width=".6"/>`).join('') +
      `<ellipse cx="42" cy="46" rx="14" ry="3" fill="#475569"/>`
  });

  /* =========================================================
     DANH MỤC CỬA HÀNG – Gold (thang hiện có 30–120; món mới 30–150)
     Tên tiếng Anh đơn giản để bé đọc được: cat, snowman, ghost, knight…
     ========================================================= */
  const I = LG.ITEMS;
  I.buddy.push(
    { id: 'buddy-ghost', en: 'Friendly Ghost', vi: 'Ma nhỏ thân thiện', gold: 30 },
    { id: 'buddy-snowman', en: 'Snowman', vi: 'Người tuyết', gold: 35 },
    { id: 'buddy-pumpkin', en: 'Pumpkin Head', vi: 'Bạn Đầu Bí Ngô', gold: 40 },
    { id: 'buddy-black-cat', en: 'Grumpy Black Cat', vi: 'Mèo đen khó tính', gold: 45 },
    { id: 'buddy-chef-penguin', en: 'Chef Penguin', vi: 'Chim cánh cụt đầu bếp', gold: 50 },
    { id: 'buddy-cloud', en: 'Cloud Sprite', vi: 'Tinh linh Mây', gold: 55 },
    { id: 'buddy-knight', en: 'Brave Knight', vi: 'Hiệp sĩ dũng cảm', gold: 70 },
    { id: 'buddy-space-bear', en: 'Space Bear', vi: 'Gấu phi hành gia', gold: 75 },
    { id: 'buddy-philosopher', en: 'Greek Philosopher', vi: 'Nhà hiền triết Hy Lạp', gold: 85 },
    { id: 'buddy-trex', en: 'T-Rex', vi: 'Khủng long bạo chúa', gold: 95 },
    { id: 'buddy-crystal', en: 'Crystal Buddy', vi: 'Bạn Pha Lê', gold: 110 },
    { id: 'buddy-lava-golem', en: 'Lava Golem', vi: 'Người đá dung nham', gold: 120 },
    { id: 'buddy-mech', en: 'Mossy Mech', vi: 'Robot rêu khổng lồ', gold: 140 },
    { id: 'buddy-lion-dance', en: 'Lion Dancer', vi: 'Lân múa Trung thu', gold: 150 }
  );
  I.pet.push(
    { id: 'pet-hedgehog', en: 'Hedgehog', vi: 'Nhím con', gold: 30 },
    { id: 'pet-dino-egg', en: 'Dino Egg', vi: 'Trứng khủng long', gold: 35 },
    { id: 'pet-axolotl', en: 'Axolotl', vi: 'Kỳ giông hồng', gold: 40 },
    { id: 'pet-jellyfish', en: 'Glowing Jellyfish', vi: 'Sứa phát sáng', gold: 45 },
    { id: 'pet-red-panda', en: 'Red Panda', vi: 'Gấu trúc đỏ', gold: 50 },
    { id: 'pet-golden-buffalo', en: 'Golden Buffalo', vi: 'Trâu vàng', gold: 65 },
    { id: 'pet-crystal-turtle', en: 'Crystal Turtle', vi: 'Rùa pha lê', gold: 75 }
  );
  I.ride.push(
    { id: 'ride-magic-cloud', en: 'Magic Cloud', vi: 'Mây bay thần kỳ', gold: 60 },
    { id: 'ride-dragon-boat', en: 'Dragon Boat', vi: 'Thuyền rồng', gold: 90 },
    { id: 'ride-ufo', en: 'UFO', vi: 'Đĩa bay', gold: 110 }
  );
  ['buddy', 'pet', 'ride'].forEach((cat) => I[cat].forEach((it) => {
    if (it.price === undefined) it.price = 0;
    if (it.gold && !it.tier) it.tier = 'legendary';
  }));
})(window);
