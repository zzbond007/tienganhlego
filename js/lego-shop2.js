/* =========================================================
   lego-shop2.js – Cửa hàng LEGO mở rộng (đợt 2)
   - Mũ, khuôn mặt, trang phục, quần, phụ kiện, thú cưng, xe, bạn đồng hành mới
   - Nhóm mới 🖼️ Phông nền (scene): LG.SCENES[id](x, y, w, h) → SVG lấp đầy khung
   - Đồ BÍ MẬT (secret: true, milestone: phút luyện nói) – mở khóa khi bé nói đủ phút
   Nạp SAU lego-shop.js.
   ========================================================= */
(function (global) {
  'use strict';
  const LG = global.LegoSvg;
  const { HATS, FACES, TORSOS, LEGS, ACCS } = LG.PARTS;
  const C = LG.COLORS;
  const PETS = LG.PETS, RIDES = LG.RIDES, BUDDIES = LG.BUDDIES;

  const r1 = (v) => Math.round(v * 10) / 10;
  /** Ngôi sao 5 cánh (polygon). */
  function starPts(cx, cy, R, r) {
    const p = [];
    for (let i = 0; i < 10; i++) {
      const a = (-90 + i * 36) * Math.PI / 180, rr = i % 2 ? r : R;
      p.push(r1(cx + rr * Math.cos(a)) + ',' + r1(cy + rr * Math.sin(a)));
    }
    return p.join(' ');
  }
  const star = (cx, cy, R, r, fill, stroke) =>
    `<polygon points="${starPts(cx, cy, R, r)}" fill="${fill}"${stroke ? ` stroke="${stroke}" stroke-width=".8" stroke-linejoin="round"` : ''}/>`;
  const sparkle = (cx, cy, s, fill) =>
    `<path d="M${cx} ${r1(cy - s)} L${r1(cx + s * 0.28)} ${r1(cy - s * 0.28)} L${r1(cx + s)} ${cy} L${r1(cx + s * 0.28)} ${r1(cy + s * 0.28)} L${cx} ${r1(cy + s)} L${r1(cx - s * 0.28)} ${r1(cy + s * 0.28)} L${r1(cx - s)} ${cy} L${r1(cx - s * 0.28)} ${r1(cy - s * 0.28)} Z" fill="${fill || '#fff'}"/>`;
  /** Hoa 5 cánh nhỏ (hoa văn áo dài). */
  function flower(cx, cy, r, c, mid) {
    let s = '';
    for (let i = 0; i < 5; i++) {
      const a = (-90 + i * 72) * Math.PI / 180;
      s += `<circle cx="${r1(cx + r * Math.cos(a))}" cy="${r1(cy + r * Math.sin(a))}" r="${r1(r * 0.75)}" fill="${c}"/>`;
    }
    return s + `<circle cx="${cx}" cy="${cy}" r="${r1(r * 0.6)}" fill="${mid || '#fff'}"/>`;
  }

  /* =========================================================
     MŨ & TÓC MỚI
     ========================================================= */
  const HAIR_DARK = `<path d="M14 33 C13 14 20 8 30 8 C40 8 47 14 46 33 L42.5 31 C43 22 38 19 30 19 C25 19 22 21 19 24 L17.5 31 Z" fill="#3B2410" stroke="#24150A"/>`;
  Object.assign(HATS, {
    'hat-santa': { front: `<path d="M15 22 Q15 4 32 3 Q46 2 52 14 L47 17 Q43 10 41 22 Z" fill="${C.RED}" stroke="${C.DRED}"/><path d="M21 14 Q25 8 31 7" stroke="#fff" stroke-opacity=".4" stroke-width="2" fill="none" stroke-linecap="round"/><rect x="13" y="19" width="34" height="7.5" rx="3.75" fill="#fff" stroke="#CBD5E1"/><circle cx="51" cy="16" r="4.5" fill="#fff" stroke="#CBD5E1"/>` },
    'cap-graduation': { front: HAIR_DARK + `<path d="M17 23 L17 12 Q30 8 43 12 L43 23 Q30 19.5 17 23 Z" fill="${C.BLK}" stroke="#111"/><polygon points="30,0 55,7.5 30,15 5,7.5" fill="#333" stroke="#111" stroke-linejoin="round"/><path d="M14 7 L28 3" stroke="#fff" stroke-opacity=".25" stroke-width="1.6" stroke-linecap="round"/><circle cx="30" cy="7.5" r="1.6" fill="${C.YEL}"/><path d="M30 7.5 L49 10 L49 20" stroke="${C.YEL}" stroke-width="1.4" fill="none"/><rect x="47.3" y="19" width="3.4" height="6" rx="1" fill="${C.YEL}"/>` },
    'beanie-pompom': { front: `<path d="M15 24 Q15 7 30 7 Q45 7 45 24 Z" fill="${C.AZ}" stroke="${C.BLU}"/><path d="M17 15 Q30 11 43 15" stroke="${C.YEL}" stroke-width="3" fill="none"/><rect x="14" y="19" width="32" height="7.5" rx="2.5" fill="#2B7BC0" stroke="${C.BLU}"/><path d="M18 20 v5.5 M22 20 v5.5 M26 20 v5.5 M30 20 v5.5 M34 20 v5.5 M38 20 v5.5 M42 20 v5.5" stroke="${C.BLU}" stroke-width="1"/><circle cx="30" cy="5" r="5" fill="${C.YEL}" stroke="#B08A00"/><circle cx="28.3" cy="3.4" r="1.4" fill="#fff" opacity=".6"/>` },
    'non-la': { front: `<path d="M17.2 25 L17.2 38 Q19.5 45.6 30 45.8 Q40.5 45.6 42.8 38 L42.8 25" stroke="#E879B0" stroke-width="1.3" fill="none"/><polygon points="2,24 30,-2 58,24" fill="#F2D58A" stroke="#B8954A" stroke-linejoin="round"/><path d="M19.2 8 L40.8 8 M12.8 14 L47.2 14 M7.4 19 L52.6 19" stroke="#C9A65A" stroke-width=".9"/><path d="M30 -2 L18 24 M30 -2 L42 24" stroke="#fff" stroke-opacity=".35" stroke-width="1"/><ellipse cx="30" cy="24" rx="28" ry="3" fill="#E3C373" stroke="#B8954A"/><path d="M22 4 Q25 1 28 0" stroke="#fff" stroke-opacity=".6" stroke-width="1.6" fill="none" stroke-linecap="round"/>` },
    'cap-pilot': { front: `<path d="M14 36 L14 20 Q14 7 30 7 Q46 7 46 20 L46 36 Q43 38 42 34 L42 24 L18 24 L18 34 Q17 38 14 36 Z" fill="#8B5A2B" stroke="#5E3A17"/><path d="M30 7.5 L30 15" stroke="#5E3A17" stroke-width="1"/><path d="M19 12 Q23 9 27 8.5" stroke="#fff" stroke-opacity=".35" stroke-width="2" fill="none" stroke-linecap="round"/><rect x="14.5" y="14" width="31" height="4" rx="2" fill="#5E3A17"/><circle cx="23.5" cy="16" r="5" fill="${C.GLASS}" stroke="${C.DGRY}" stroke-width="2"/><circle cx="36.5" cy="16" r="5" fill="${C.GLASS}" stroke="${C.DGRY}" stroke-width="2"/><path d="M21 14.5 Q22.5 12.5 25 12.5 M34 14.5 Q35.5 12.5 38 12.5" stroke="#fff" stroke-width="1.2" fill="none"/>` },
    'hat-pharaoh': { front: `<path d="M16 25 Q16 8 30 8 Q44 8 44 25 L51 45 L42 45 L41 25 L19 25 L18 45 L9 45 Z" fill="#FFD500" stroke="#B08A00" stroke-linejoin="round"/><path d="M21 12 L39 12 M18.5 17 L41.5 17 M14 31 L18.8 31 M12 37 L18.6 37 M10.2 43 L18.4 43 M46 31 L41.2 31 M48 37 L41.4 37 M49.8 43 L41.6 43" stroke="#1E5AA8" stroke-width="2.2"/><rect x="16" y="21.5" width="28" height="4" rx="1" fill="#1E5AA8"/><path d="M28 13 Q27 5 30 4 Q33 5 32 13 Z" fill="${C.YEL}" stroke="#B08A00"/><circle cx="30" cy="7" r="1" fill="${C.RED}"/>` },
    'hair-rainbow': { front: `<path d="M14 33 C13 14 20 8 30 8 C40 8 47 14 46 33 L42.5 31 C43 22 38 19 30 19 C25 19 22 21 19 24 L17.5 31 Z" fill="#8E44AD" stroke="#5B2C6F"/><path d="M15.6 29 C15 14 21 9.6 30 9.6 C39 9.6 45 14 44.4 29" stroke="#E3000B" stroke-width="2.6" fill="none"/><path d="M18 23 C18 15 23 12.2 30 12.2 C37 12.2 42 15 42 23" stroke="#FF7E14" stroke-width="2.6" fill="none"/><path d="M20.8 19.5 C21.5 16 25 14.8 30 14.8 C35 14.8 38.5 16 39.2 19.5" stroke="#FFD500" stroke-width="2.6" fill="none"/><path d="M24 18.3 C26 17.4 34 17.4 36 18.3" stroke="#00A850" stroke-width="2" fill="none"/>${sparkle(44, 10, 3.2, '#fff')}` },
    'top-hat': { front: `<rect x="19" y="-3" width="22" height="23" rx="2" fill="${C.BLK}" stroke="#111"/><rect x="19" y="12" width="22" height="4.5" fill="${C.RED}"/><rect x="21.5" y="-1" width="3" height="12" rx="1.5" fill="#fff" opacity=".18"/><ellipse cx="30" cy="20.5" rx="17" ry="3.5" fill="${C.BLK}" stroke="#111"/>` },
    // BÍ MẬT – Mũ Phù Thủy Ngôn Từ
    'hat-word-wizard': { front: `<polygon points="15,22 38,-3 45,22" fill="#7C3AED" stroke="#4C1D95" stroke-linejoin="round"/><path d="M33 3 L23 20" stroke="#fff" stroke-opacity=".25" stroke-width="2" stroke-linecap="round"/><text x="28" y="19" font-family="Arial, sans-serif" font-weight="900" font-size="7" fill="#fff" text-anchor="middle">A</text><text x="35" y="13" font-family="Arial, sans-serif" font-weight="900" font-size="6" fill="${C.YEL}" text-anchor="middle">B</text><text x="37.5" y="7" font-family="Arial, sans-serif" font-weight="900" font-size="4.5" fill="#7FDBFF" text-anchor="middle">C</text><ellipse cx="30" cy="22" rx="18" ry="3.6" fill="#DB2777" stroke="#9D174D"/>${star(38, 0, 3.4, 1.5, C.YEL, '#B08A00')}${sparkle(50, 8, 3, '#FFE066')}${sparkle(11, 12, 2.4, '#C4B5FD')}` }
  });

  /* =========================================================
     KHUÔN MẶT MỚI
     ========================================================= */
  Object.assign(FACES, {
    'star-eyes': `${star(25, 28, 3.6, 1.6, C.YEL, '#B08A00')}${star(35, 28, 3.6, 1.6, C.YEL, '#B08A00')}<path d="M23 33.5 Q30 41 37 33.5 Z" fill="#1B1B1B"/><path d="M25.5 34 L34.5 34 L33.8 35.5 L26.2 35.5 Z" fill="#fff"/>`,
    sleepy: `<path d="M22.6 28 Q25 30.6 27.4 28" stroke="#1B1B1B" stroke-width="1.6" fill="none" stroke-linecap="round"/><path d="M32.6 28 Q35 30.6 37.4 28" stroke="#1B1B1B" stroke-width="1.6" fill="none" stroke-linecap="round"/><ellipse cx="30" cy="36" rx="1.8" ry="2" fill="#1B1B1B"/><circle cx="22" cy="33" r="1.8" fill="#F472B6" opacity=".45"/><circle cx="38" cy="33" r="1.8" fill="#F472B6" opacity=".45"/><text x="40" y="23.5" font-family="Arial, sans-serif" font-weight="900" font-size="5" fill="${C.BLU}" text-anchor="middle">z</text>`,
    laughing: `<path d="M22.5 29 L25 26 L27.5 29" stroke="#1B1B1B" stroke-width="1.7" fill="none" stroke-linecap="round" stroke-linejoin="round"/><path d="M32.5 29 L35 26 L37.5 29" stroke="#1B1B1B" stroke-width="1.7" fill="none" stroke-linecap="round" stroke-linejoin="round"/><path d="M22.5 32 Q30 43 37.5 32 Z" fill="#1B1B1B"/><path d="M25.5 37.2 Q30 34.6 34.5 37.2 Q30 40.5 25.5 37.2 Z" fill="#F472B6"/><circle cx="21" cy="32.5" r="2" fill="#F472B6" opacity=".5"/><circle cx="39" cy="32.5" r="2" fill="#F472B6" opacity=".5"/>`,
    mustache: `<ellipse cx="25" cy="27.5" rx="1.7" ry="2.3" fill="#1B1B1B"/><ellipse cx="35" cy="27.5" rx="1.7" ry="2.3" fill="#1B1B1B"/><path d="M30 32 Q26 30.5 23 32.5 Q20.5 34.5 19.5 33 Q20 37 24.5 36 Q28 35 30 33.5 Q32 35 35.5 36 Q40 37 40.5 33 Q39.5 34.5 37 32.5 Q34 30.5 30 32 Z" fill="#5E3A17"/><path d="M27 38.5 Q30 40.5 33 38.5" stroke="#1B1B1B" stroke-width="1.4" fill="none" stroke-linecap="round"/>`
  });

  /* =========================================================
     TRANG PHỤC MỚI
     ========================================================= */
  // Áo hoodie cầu vồng: sọc theo hình thang thân áo
  const RB = ['#E3000B', '#FF7E14', '#FFD500', '#00A850', '#3D9BE0', '#8E44AD'];
  let rainbowBands = '';
  for (let i = 0; i < 6; i++) {
    const y0 = 46 + i * 34 / 6, y1 = y0 + 34 / 6;
    const lx = (y) => r1(14 - 6 * (y - 46) / 34), rx = (y) => r1(46 + 6 * (y - 46) / 34);
    rainbowBands += `<polygon points="${lx(y0)},${r1(y0)} ${rx(y0)},${r1(y0)} ${rx(y1)},${r1(y1)} ${lx(y1)},${r1(y1)}" fill="${RB[i]}"/>`;
  }
  Object.assign(TORSOS, {
    'torso-aodai': {
      c: '#D3121B',
      deco: `<path d="M14 78 L46 78 L44 106 L16 106 Z" fill="#D3121B" stroke="#8F0A10" stroke-linejoin="round"/><path d="M30 80 L30 106" stroke="#8F0A10" stroke-width=".8" opacity=".6"/>` +
        `<rect x="24.5" y="44.5" width="11" height="4.5" rx="1.5" fill="#B00E16" stroke="#E3B400" stroke-width=".8"/><path d="M30 49 Q37 50 44 56" stroke="#E3B400" stroke-width="1.6" fill="none" stroke-linecap="round"/><circle cx="35" cy="50.8" r=".9" fill="#E3B400"/><circle cx="39.5" cy="52.6" r=".9" fill="#E3B400"/>` +
        flower(21, 58, 2.6, '#FFD84D', '#D3121B') + flower(33, 67, 3.2, '#FFD84D', '#D3121B') + flower(22, 92, 3, '#FFD84D', '#D3121B') + flower(38, 98, 2.2, '#FFD84D', '#D3121B') +
        `<path d="M25 72 Q29 68 27 63 M40 76 Q37 72 41 66" stroke="#E3B400" stroke-width="1" fill="none" stroke-linecap="round"/>`
    },
    'torso-lab': {
      c: C.WHT,
      deco: `<polygon points="23,46 37,46 33.5,80 26.5,80" fill="#60A5FA"/><polygon points="27,46 33,46 31.5,58 30,60 28.5,58" fill="${C.RED}"/><polygon points="22,46 27,46 28,64 23,58" fill="#E2E8F0" stroke="#CBD5E1" stroke-width=".8"/><polygon points="38,46 33,46 32,64 37,58" fill="#E2E8F0" stroke="#CBD5E1" stroke-width=".8"/><rect x="36" y="64" width="8" height="7" rx="1" fill="none" stroke="#CBD5E1" stroke-width="1"/><path d="M38 64 v-4 M40.5 64 v-5 M42.5 64 v-3.5" stroke-width="1.4" stroke-linecap="round" stroke="${C.BLU}"/><path d="M40.5 64 v-5" stroke="${C.RED}" stroke-width="1.4"/><rect x="15" y="57" width="8" height="5" rx="1" fill="#93C5FD"/><path d="M17 66 l2 4 h-4 Z" fill="#4ADE80" stroke="#15803D" stroke-width=".6"/>`
    },
    'torso-football': {
      c: '#1E5AA8',
      deco: `<polygon points="24,46 30,53 36,46" fill="#fff"/><polygon points="25.5,46 30,51 34.5,46" fill="#1E5AA8"/><path d="M14 46 L10 64 M46 46 L50 64" stroke="#fff" stroke-width="2.2"/><text x="30" y="72" font-family="Arial, sans-serif" font-weight="900" font-size="15" fill="#fff" text-anchor="middle">10</text><circle cx="39" cy="55" r="3.4" fill="#fff" stroke="${C.BLK}" stroke-width=".6"/><polygon points="39,53.6 40.3,54.6 39.8,56.1 38.2,56.1 37.7,54.6" fill="${C.BLK}"/>`
    },
    'torso-pilot': {
      c: '#8B5A2B',
      deco: `<polygon points="14,46 24,46 30,56 36,46 46,46 44,54 30,60 16,54" fill="#F4E6CC" stroke="#D9C4A0" stroke-linejoin="round"/><line x1="30" y1="60" x2="30" y2="80" stroke="#5E3A17" stroke-width="1.6"/><path d="M30 62 v16" stroke="${C.LGRY}" stroke-width="1" stroke-dasharray="1.5 1.5"/><path d="M33 64 Q37 62 40 63 L46 61 Q43 66 38 66 Q35 66 33 64 Z M33 64 Q29 62 26 63" fill="${C.YEL}" stroke="#B08A00" stroke-width=".6"/><circle cx="36" cy="64" r="1.6" fill="${C.RED}"/><rect x="16" y="66" width="9" height="7" rx="1" fill="#7A4A20" stroke="#5E3A17" stroke-width=".8"/>`
    },
    'torso-rainbow': {
      c: '#3D9BE0',
      deco: rainbowBands + `<polygon points="14,46 46,46 52,80 8,80" fill="none" stroke="#1F5F8B" stroke-linejoin="round"/><path d="M20 67 L40 67 L42.5 77 L17.5 77 Z" fill="#fff" opacity=".35"/><path d="M26 46 L25 56 M34 46 L35 56" stroke="#fff" stroke-width="1.4" stroke-linecap="round"/><circle cx="25" cy="57" r="1.4" fill="#fff"/><circle cx="35" cy="57" r="1.4" fill="#fff"/>`
    },
    'torso-astro-orange': {
      c: '#FF7E14',
      deco: `<rect x="20" y="52" width="20" height="18" rx="2" fill="#fff" stroke="#CBD5E1"/><circle cx="25" cy="57" r="2" fill="${C.RED}"/><circle cx="30" cy="57" r="2" fill="${C.YEL}"/><circle cx="35" cy="57" r="2" fill="${C.GRN}"/><rect x="23" y="62" width="14" height="5" rx="1" fill="${C.BLK}"/><rect x="24.5" y="63.5" width="7" height="2" fill="#4ADE80"/><rect x="12" y="49" width="7" height="5" fill="#fff"/><rect x="12" y="49" width="3.5" height="2.5" fill="${C.BLU}"/><path d="M12 51.7 h7" stroke="${C.RED}" stroke-width=".8"/><circle cx="43" cy="51.5" r="3" fill="${C.BLU}"/><path d="M41 52 Q43 49.5 45.2 51.5" stroke="#fff" stroke-width=".8" fill="none"/><rect x="9" y="73" width="42" height="4" fill="#C2410C"/>`
    },
    'torso-wizard': {
      c: '#3730A3',
      back: `<path d="M13 47 L47 47 L62 118 L-2 118 Z" fill="#4C1D95" stroke="#2E1065"/><path d="M8 110 L52 110" stroke="${C.YEL}" stroke-width="2" opacity=".7"/>`,
      deco: `<polygon points="21,46 30,62 39,46 36,46 30,57 24,46" fill="${C.YEL}"/><path d="M30 62 L30 80" stroke="${C.YEL}" stroke-width="2"/><rect x="9.5" y="70" width="41" height="4.5" fill="#7C3AED"/><rect x="27" y="69" width="6" height="6.5" rx="1" fill="${C.YEL}" stroke="#B08A00" stroke-width=".7"/>${star(19, 60, 3, 1.3, C.YEL)}${star(41, 58, 2.4, 1.1, '#C4B5FD')}<circle cx="22" cy="51" r=".9" fill="#fff"/><circle cx="43" cy="66" r=".9" fill="#fff"/><path d="M14 77 L46 77" stroke="#C4B5FD" stroke-width="1" stroke-dasharray="2 2"/>`
    },
    'torso-dragon': {
      c: '#B91C1C',
      back: `<path d="M16 54 L-6 22 L-3 36 L-11 36 L-4 48 L-11 52 L-1 60 L-7 68 L12 66 Z" fill="#EA580C" stroke="#9A3412" stroke-linejoin="round"/><path d="M14 56 L-4 28 M12 60 L-6 44 M12 63 L-3 60" stroke="#9A3412" stroke-width="1"/><path d="M44 54 L66 22 L63 36 L71 36 L64 48 L71 52 L61 60 L67 68 L48 66 Z" fill="#EA580C" stroke="#9A3412" stroke-linejoin="round"/><path d="M46 56 L64 28 M48 60 L66 44 M48 63 L63 60" stroke="#9A3412" stroke-width="1"/>`,
      deco: `<path d="M18 49 L42 49 L40 70 Q30 78 20 70 Z" fill="#E3B400" stroke="#B08A00"/><path d="M22 55 Q26 52 30 55 Q34 52 38 55 M22 61 Q26 58 30 61 Q34 58 38 61 M23 67 Q26.5 64 30 67 Q33.5 64 37 67" stroke="#B08A00" stroke-width="1.1" fill="none"/><ellipse cx="30" cy="57.5" rx="4.5" ry="3" fill="#FFF7CC" stroke="#B08A00" stroke-width=".8"/><ellipse cx="30" cy="57.5" rx="1.1" ry="2.6" fill="#B91C1C"/><polygon points="14,46 18,42 20,46" fill="#E3B400"/><polygon points="40,46 42,42 46,46" fill="#E3B400"/><rect x="9" y="74" width="42" height="4" fill="#7F1D1D"/>`
    },
    // BÍ MẬT – Bộ vest Siêu Sao Hùng Biện
    'torso-superstar': {
      c: '#6D28D9',
      back: `<path d="M13 47 L47 47 L61 118 L-1 118 Z" fill="#FFD500" stroke="#B08A00"/>${star(10, 104, 4, 1.8, '#fff')}${star(48, 96, 3.4, 1.5, '#fff')}${star(30, 112, 3, 1.3, '#7C3AED')}`,
      deco: `<polygon points="21,46 29,46 30,62 22,72 18,58" fill="#FFD500" stroke="#B08A00" stroke-width=".8"/><polygon points="39,46 31,46 30,62 38,72 42,58" fill="#FFD500" stroke="#B08A00" stroke-width=".8"/><polygon points="25,48 30,51 35,48 35,54 30,51 25,54" fill="${C.RED}"/>${star(30, 68, 6.5, 2.8, C.YEL, '#B08A00')}<circle cx="30" cy="68" r="1.6" fill="${C.RED}"/>${sparkle(14, 66, 2.6, '#fff')}${sparkle(46, 74, 2.2, '#fff')}${sparkle(44, 52, 1.8, '#FFE066')}`
    }
  });

  Object.assign(LEGS, { 'legs-orange': '#FF7E14', 'legs-camo': '#6B7B3A', 'legs-silver': '#BFC5CC', 'legs-sky': '#7CC4F2' });

  /* =========================================================
     PHỤ KIỆN MỚI (tay phải 54.5,78)
     ========================================================= */
  Object.assign(ACCS, {
    microphone: `<line x1="54.5" y1="85" x2="58" y2="66" stroke="${C.BLK}" stroke-width="4" stroke-linecap="round"/><rect x="54.5" y="64" width="7" height="3" rx="1" fill="${C.RED}" transform="rotate(10 58 65.5)"/><circle cx="58.5" cy="58.5" r="6" fill="${C.LGRY}" stroke="${C.DGRY}" stroke-width="1.2"/><path d="M53 58.5 h11 M58.5 53 v11 M54.5 55 l8 7 M62.5 55 l-8 7" stroke="${C.DGRY}" stroke-width=".6"/><path d="M55 56 Q56.5 53.8 59 53.6" stroke="#fff" stroke-width="1.3" fill="none" stroke-linecap="round"/><path d="M66 46 v-7 l5 -1.4 v7" stroke="${C.BLU}" stroke-width="1.3" fill="none"/><ellipse cx="64.8" cy="46.3" rx="1.8" ry="1.3" fill="${C.BLU}"/><ellipse cx="69.8" cy="45" rx="1.8" ry="1.3" fill="${C.BLU}"/>`,
    ukulele: `<line x1="56" y1="70" x2="66" y2="46" stroke="#7C4A1E" stroke-width="3" stroke-linecap="round"/><rect x="63.5" y="40" width="5" height="7" rx="1.2" fill="#5E3A17" transform="rotate(22 66 43.5)"/><ellipse cx="56.5" cy="74" rx="5" ry="5" fill="#E8A65A" stroke="#A8742F"/><ellipse cx="52" cy="83" rx="7" ry="7.4" fill="#E8A65A" stroke="#A8742F"/><circle cx="54.5" cy="77" r="2.2" fill="#3B2410"/><path d="M58 70 L64.5 48 M59.5 70.5 L66 48.5" stroke="#fff" stroke-width=".5" opacity=".8"/><rect x="47" y="85.5" width="8" height="2" rx="1" fill="#5E3A17" transform="rotate(-20 51 86.5)"/>`,
    telescope: `<line x1="50" y1="88" x2="54.5" y2="80" stroke="${C.DGRY}" stroke-width="2"/><line x1="52" y1="84" x2="60" y2="70" stroke="${C.BLU}" stroke-width="5" stroke-linecap="round"/><line x1="60" y1="70" x2="66.5" y2="58.5" stroke="${C.BLU}" stroke-width="7"/><line x1="59" y1="72" x2="61" y2="68.5" stroke="${C.YEL}" stroke-width="7.4"/><ellipse cx="67" cy="57.5" rx="4.4" ry="2.4" fill="${C.GLASS}" stroke="${C.YEL}" stroke-width="1.6" transform="rotate(-30 67 57.5)"/><path d="M57 72 L64 60" stroke="#fff" stroke-opacity=".35" stroke-width="1.4"/>${sparkle(68, 44, 3, C.YEL)}${sparkle(61, 48, 1.8, '#FFE066')}`,
    kite: `<path d="M55 78 Q50 56 61 33" stroke="${C.DGRY}" stroke-width=".9" fill="none"/><polygon points="61,6 70,18 61,33 52,18" fill="${C.RED}" stroke="${C.DRED}" stroke-linejoin="round"/><polygon points="61,6 70,18 61,18" fill="${C.YEL}"/><polygon points="52,18 61,18 61,33" fill="${C.BLU}"/><path d="M61 6 L61 33 M52 18 L70 18" stroke="#7A0006" stroke-width=".8"/><path d="M61 33 Q66 37 62 41 Q58 45 64 49" stroke="${C.DGRY}" stroke-width=".8" fill="none"/><path d="M63 37 l3 -1.5 l0 3 Z M60 44 l3 -1.5 l0 3 Z" fill="${C.GRN}"/>`,
    'bubble-wand': `<line x1="55" y1="84" x2="59.5" y2="62" stroke="#F472B6" stroke-width="2.4" stroke-linecap="round"/><circle cx="60.5" cy="57" r="5" fill="none" stroke="#DB2777" stroke-width="2"/><circle cx="60.5" cy="57" r="3.8" fill="#BFE6FF" opacity=".5"/><circle cx="65" cy="41" r="6" fill="#E0F4FF" fill-opacity=".5" stroke="#7DD3FC" stroke-width="1"/><path d="M62 38.5 Q63 36.5 65.5 36.2" stroke="#fff" stroke-width="1.3" fill="none"/><circle cx="55" cy="33" r="4" fill="#FCE7F3" fill-opacity=".5" stroke="#F9A8D4" stroke-width="1"/><circle cx="67.5" cy="27" r="2.8" fill="#EDE9FE" fill-opacity=".5" stroke="#C4B5FD" stroke-width="1"/><circle cx="59" cy="22" r="1.8" fill="none" stroke="#7DD3FC" stroke-width=".8"/>`,
    'star-lantern': `<line x1="54.5" y1="86" x2="58.5" y2="47" stroke="#7C4A1E" stroke-width="2.4" stroke-linecap="round"/><circle cx="60" cy="36" r="13" fill="#FFD500" opacity=".22"/>${star(60, 36, 12, 5.4, '#E3000B', '#A30008')}${star(60, 36.5, 6.5, 3, '#FFD84D')}<circle cx="60" cy="37" r="2" fill="#FFF7CC"/><path d="M50.3 43 l-1.5 6 M69.7 43 l1.5 6 M60 24 v-3" stroke="${C.YEL}" stroke-width="1.6" stroke-linecap="round"/><circle cx="48.6" cy="49.6" r="1.3" fill="${C.YEL}"/><circle cx="71.3" cy="49.6" r="1.3" fill="${C.YEL}"/>`,
    'spell-book': `<path d="M43 69 L55 73 L67 67 L67 82 L55 88 L43 84 Z" fill="#7C3AED" stroke="#4C1D95" stroke-linejoin="round"/><path d="M45 68 L55 71.5 L55 85 L45 81.5 Z" fill="#FFF7E6"/><path d="M65 66 L55 71.5 L55 85 L65 79.5 Z" fill="#FFF7E6"/><path d="M47 72 l6 2 M47 75 l6 2 M47 78 l5 1.7 M57 74 l6 -3 M57 77 l6 -3 M57 80 l5 -2.6" stroke="#A78BFA" stroke-width=".9"/><path d="M55 71.5 V85" stroke="#4C1D95" stroke-width=".8"/>${star(58, 58, 4.5, 2, C.YEL, '#B08A00')}${sparkle(66, 50, 3, '#C4B5FD')}${sparkle(50, 56, 2.4, '#F9A8D4')}<circle cx="62" cy="63" r="1" fill="#FFE066"/>`,
    'toy-robot': `<rect x="52.5" y="51" width="11" height="9.5" rx="2" fill="${C.LGRY}" stroke="${C.DGRY}"/><rect x="54.5" y="53.5" width="7" height="4" rx="2" fill="${C.BLK}"/><circle cx="56.5" cy="55.5" r="1.2" fill="#4FC3F7"/><circle cx="59.5" cy="55.5" r="1.2" fill="#4FC3F7"/><line x1="58" y1="51" x2="58" y2="46.5" stroke="${C.DGRY}" stroke-width="1.2"/><circle cx="58" cy="46" r="1.8" fill="${C.RED}"/><rect x="51" y="60.5" width="14" height="13" rx="2" fill="${C.WHT}" stroke="${C.DGRY}"/><circle cx="55" cy="66" r="1.4" fill="${C.RED}"/><circle cx="58" cy="66" r="1.4" fill="${C.YEL}"/><circle cx="61" cy="66" r="1.4" fill="${C.BLU}"/><rect x="65" y="61.5" width="3.5" height="9" rx="1.5" fill="${C.LGRY}" stroke="${C.DGRY}" stroke-width=".8"/><rect x="47.5" y="61.5" width="3.5" height="9" rx="1.5" fill="${C.LGRY}" stroke="${C.DGRY}" stroke-width=".8"/><rect x="53" y="73.5" width="4" height="4" fill="${C.DGRY}"/><rect x="59" y="73.5" width="4" height="4" fill="${C.DGRY}"/>`,
    // BÍ MẬT – Micro Vàng
    'golden-mic': `<circle cx="59" cy="58" r="11" fill="#FFD500" opacity=".2"/><line x1="54.5" y1="85" x2="58" y2="66" stroke="#B08A00" stroke-width="4.4" stroke-linecap="round"/><line x1="55" y1="82" x2="57.6" y2="68" stroke="#FFE066" stroke-width="1.4" stroke-linecap="round"/><rect x="54.5" y="64" width="7" height="3" rx="1" fill="${C.RED}" transform="rotate(10 58 65.5)"/><circle cx="58.5" cy="58.5" r="6.4" fill="#FFD500" stroke="#B08A00" stroke-width="1.2"/><path d="M52.5 58.5 h12 M58.5 52.5 v12 M54.2 54.2 l8.6 8.6 M62.8 54.2 l-8.6 8.6" stroke="#B08A00" stroke-width=".6"/><path d="M54.8 55.8 Q56.4 53.4 59 53.2" stroke="#fff" stroke-width="1.4" fill="none" stroke-linecap="round"/>${sparkle(68, 46, 3.4, '#FFE066')}${sparkle(48, 50, 2.4, '#FFE066')}${sparkle(66, 70, 2, '#fff')}<path d="M64 40 v-6 l5 -1.4 v6" stroke="#B08A00" stroke-width="1.3" fill="none"/><ellipse cx="62.8" cy="40.3" rx="1.8" ry="1.3" fill="#B08A00"/><ellipse cx="67.8" cy="39" rx="1.8" ry="1.3" fill="#B08A00"/>`
  });

  /* =========================================================
     🐶 THÚ CƯNG MỚI (khung 64×52, chạm đất y=52)
     ========================================================= */
  Object.assign(PETS, {
    hamster: `<circle cx="20" cy="26" r="5" fill="#E8A65A" stroke="#B07330"/><circle cx="20" cy="26" r="2.6" fill="#F7A1C4"/><circle cx="40" cy="25" r="5" fill="#E8A65A" stroke="#B07330"/><circle cx="40" cy="25" r="2.6" fill="#F7A1C4"/><ellipse cx="20" cy="50.5" rx="4" ry="2" fill="#F7A1C4"/><ellipse cx="40" cy="50.5" rx="4" ry="2" fill="#F7A1C4"/><ellipse cx="30" cy="38" rx="20" ry="13" fill="#E8A65A" stroke="#B07330"/><ellipse cx="31" cy="43" rx="12" ry="7.5" fill="#FFF1DC"/><ellipse cx="22" cy="31" rx="4" ry="2.4" fill="#fff" opacity=".4"/><circle cx="24.5" cy="34" r="2" fill="${C.BLK}"/><circle cx="37" cy="34" r="2" fill="${C.BLK}"/><circle cx="25.2" cy="33.3" r=".7" fill="#fff"/><circle cx="37.7" cy="33.3" r=".7" fill="#fff"/><ellipse cx="30.8" cy="37.5" rx="1.6" ry="1.1" fill="#E879B0"/><ellipse cx="20" cy="39" rx="3" ry="2" fill="#F472B6" opacity=".45"/><ellipse cx="41.5" cy="39" rx="3" ry="2" fill="#F472B6" opacity=".45"/><path d="M26 37 h-8 M26 38.5 l-7 2 M35.5 37 h8 M35.5 38.5 l7 2" stroke="#B07330" stroke-width=".6"/><ellipse cx="31" cy="45" rx="3" ry="4.2" fill="#5E3A17"/><path d="M31 41.5 v7" stroke="#D9BB7B" stroke-width="1"/><circle cx="27.5" cy="45.5" r="2.2" fill="#F7C99A" stroke="#B07330" stroke-width=".6"/><circle cx="34.5" cy="45.5" r="2.2" fill="#F7C99A" stroke="#B07330" stroke-width=".6"/>`,
    owl: `<polygon points="18,17 19,3 26,12" fill="#7C4A1E" stroke="#5E3A17" stroke-linejoin="round"/><polygon points="46,17 45,3 38,12" fill="#7C4A1E" stroke="#5E3A17" stroke-linejoin="round"/><ellipse cx="32" cy="31" rx="16" ry="19" fill="#9C6B3C" stroke="#6B4423"/><ellipse cx="17.5" cy="34" rx="5" ry="11" fill="#7C4A1E"/><ellipse cx="46.5" cy="34" rx="5" ry="11" fill="#7C4A1E"/><ellipse cx="32" cy="39" rx="10" ry="10.5" fill="#E9D3B0"/><path d="M26.5 35 l2 2 2 -2 M33.5 35 l2 2 2 -2 M29.5 41 l2 2 2 -2 M26 46 l2 1.6 2 -1.6 M34 46 l2 1.6 2 -1.6" stroke="#9C6B3C" stroke-width="1" fill="none"/><circle cx="25" cy="23" r="6.2" fill="#fff" stroke="${C.ORG}" stroke-width="1.6"/><circle cx="39" cy="23" r="6.2" fill="#fff" stroke="${C.ORG}" stroke-width="1.6"/><circle cx="26" cy="23.5" r="3.2" fill="${C.BLK}"/><circle cx="38" cy="23.5" r="3.2" fill="${C.BLK}"/><circle cx="27" cy="22.3" r="1.1" fill="#fff"/><circle cx="39" cy="22.3" r="1.1" fill="#fff"/><polygon points="29.6,27 34.4,27 32,32" fill="${C.ORG}" stroke="#A84F00" stroke-width=".7" stroke-linejoin="round"/><ellipse cx="27" cy="50.5" rx="3.5" ry="1.8" fill="${C.ORG}"/><ellipse cx="37" cy="50.5" rx="3.5" ry="1.8" fill="${C.ORG}"/><path d="M23 15 Q27 12.5 31 13" stroke="#fff" stroke-opacity=".3" stroke-width="2" fill="none" stroke-linecap="round"/>`,
    penguin: `<ellipse cx="17" cy="35" rx="4" ry="10" fill="#2B2B2B" transform="rotate(20 17 35)"/><ellipse cx="47" cy="35" rx="4" ry="10" fill="#2B2B2B" transform="rotate(-20 47 35)"/><ellipse cx="26" cy="50.5" rx="5" ry="2" fill="${C.ORG}"/><ellipse cx="38" cy="50.5" rx="5" ry="2" fill="${C.ORG}"/><ellipse cx="32" cy="31" rx="15" ry="19" fill="#2B2B2B" stroke="#111"/><ellipse cx="32" cy="38" rx="10" ry="12" fill="#fff"/><ellipse cx="25" cy="21" rx="3.4" ry="2.4" fill="#fff" opacity=".25"/><circle cx="27" cy="22" r="3.2" fill="#fff"/><circle cx="37" cy="22" r="3.2" fill="#fff"/><circle cx="27.6" cy="22.4" r="1.7" fill="${C.BLK}"/><circle cx="36.4" cy="22.4" r="1.7" fill="${C.BLK}"/><polygon points="29,26 35,26 32,30" fill="${C.ORG}" stroke="#A84F00" stroke-width=".7" stroke-linejoin="round"/><circle cx="23.5" cy="27.5" r="1.8" fill="#F472B6" opacity=".55"/><circle cx="40.5" cy="27.5" r="1.8" fill="#F472B6" opacity=".55"/><rect x="19" y="31" width="26" height="5" rx="2.5" fill="${C.RED}" stroke="${C.DRED}" stroke-width=".8"/><rect x="36" y="34" width="5.5" height="10" rx="1.5" fill="${C.RED}" stroke="${C.DRED}" stroke-width=".8"/><path d="M36.5 42 h4.5" stroke="#fff" stroke-width="1"/>`,
    fox: `<path d="M20 50 Q2 48 4 30 Q8 20 16 27 Q14 38 26 44 Z" fill="#F07B1E" stroke="#B5530A" stroke-linejoin="round"/><path d="M4.5 30 Q8 20.5 15.5 26.8 Q9.5 26.5 6.5 33.5 Z" fill="#fff"/><path d="M18 52 Q14 33 28 28 Q41 26 42 40 L44 52 Z" fill="#F07B1E" stroke="#B5530A" stroke-linejoin="round"/><path d="M34 31 Q44 33 42 47 Q36 45 33 37 Z" fill="#fff"/><rect x="35" y="44" width="5" height="8" rx="2" fill="#F07B1E" stroke="#B5530A" stroke-width=".8"/><rect x="35" y="49" width="5" height="3" rx="1" fill="#3B2410"/><polygon points="32,15 31,1 40,10" fill="#F07B1E" stroke="#B5530A" stroke-linejoin="round"/><polygon points="31.3,5 31,1 34.5,4.5" fill="#3B2410"/><polygon points="43,10 50,1 50,15" fill="#F07B1E" stroke="#B5530A" stroke-linejoin="round"/><polygon points="48,3.5 50,1 50,6" fill="#3B2410"/><circle cx="41" cy="19" r="10" fill="#F07B1E" stroke="#B5530A"/><path d="M45 15 Q55 18 59 22.5 Q54 27 46 27 Z" fill="#F07B1E" stroke="#B5530A" stroke-linejoin="round"/><path d="M41 23 Q50 26 58 23.5 Q53 28.5 45 28 Q41 27 41 23 Z" fill="#fff"/><circle cx="58.5" cy="22.5" r="2" fill="${C.BLK}"/><path d="M41.5 17.5 Q43.5 15.5 45.5 17.5" stroke="${C.BLK}" stroke-width="1.5" fill="none" stroke-linecap="round"/><circle cx="38" cy="23" r="1.8" fill="#F472B6" opacity=".5"/>`,
    'koi-pond': `<path d="M4 40 L8 52 L56 52 L60 40 Z" fill="${C.LGRY}" stroke="${C.DGRY}" stroke-linejoin="round"/><path d="M8 46 h48" stroke="${C.MGRY}" stroke-width="1"/><ellipse cx="32" cy="40" rx="28" ry="8" fill="${C.LGRY}" stroke="${C.DGRY}"/><circle cx="10" cy="38" r="2" fill="${C.MGRY}"/><circle cx="54" cy="38" r="2" fill="${C.MGRY}"/><circle cx="22" cy="46.5" r="2" fill="${C.MGRY}"/><circle cx="42" cy="46.5" r="2" fill="${C.MGRY}"/><ellipse cx="32" cy="40" rx="24" ry="5.8" fill="#7CCFE0"/><ellipse cx="22" cy="41" rx="6" ry="2.3" fill="#fff"/><polygon points="16.5,41 12.5,38.6 12.5,43.4" fill="#fff"/><circle cx="23" cy="40.6" r="1.5" fill="${C.ORG}"/><circle cx="20" cy="41.6" r="1" fill="${C.RED}"/><circle cx="26" cy="40.6" r=".6" fill="${C.BLK}"/><ellipse cx="38" cy="38.5" rx="5.5" ry="2.1" fill="${C.ORG}"/><polygon points="43,38.5 47,36.2 47,40.8" fill="${C.ORG}"/><circle cx="37" cy="38.2" r="1.2" fill="#fff"/><circle cx="34" cy="38.1" r=".6" fill="${C.BLK}"/><ellipse cx="46" cy="42.5" rx="7" ry="2.4" fill="#22C55E" stroke="#15803D" stroke-width=".8"/><path d="M46 42.5 L52 41" stroke="#15803D" stroke-width=".8"/><path d="M46 41 Q45 32 46 26" stroke="#15803D" stroke-width="1.6" fill="none"/><ellipse cx="46" cy="20" rx="2.8" ry="6.5" fill="#F9A8D4" stroke="#DB2777" stroke-width=".7" transform="rotate(-45 46 26)"/><ellipse cx="46" cy="20" rx="2.8" ry="6.5" fill="#F9A8D4" stroke="#DB2777" stroke-width=".7" transform="rotate(45 46 26)"/><ellipse cx="46" cy="20" rx="2.8" ry="6.5" fill="#F9A8D4" stroke="#DB2777" stroke-width=".7" transform="rotate(-20 46 26)"/><ellipse cx="46" cy="20" rx="2.8" ry="6.5" fill="#F9A8D4" stroke="#DB2777" stroke-width=".7" transform="rotate(20 46 26)"/><ellipse cx="46" cy="19.5" rx="2.8" ry="6.8" fill="#FBCFE8" stroke="#DB2777" stroke-width=".7"/><circle cx="46" cy="25" r="1.8" fill="${C.YEL}"/>`,
    'baby-elephant': `<path d="M11 34 Q5 37 5 43" stroke="#6B7785" stroke-width="2" fill="none" stroke-linecap="round"/><circle cx="5" cy="44" r="1.6" fill="#6B7785"/><ellipse cx="26" cy="36" rx="16" ry="12" fill="#9AA5B1" stroke="#6B7785"/><rect x="13" y="42" width="9" height="10" rx="3" fill="#9AA5B1" stroke="#6B7785"/><rect x="29" y="42" width="9" height="10" rx="3" fill="#9AA5B1" stroke="#6B7785"/><path d="M15 50.5 h5 M31 50.5 h5" stroke="#fff" stroke-width="1.4" stroke-linecap="round"/><path d="M50 30 Q60 32 60 22 Q60 16 56 14" stroke="#9AA5B1" stroke-width="6" fill="none" stroke-linecap="round"/><path d="M50 30 Q60 32 60 22 Q60 16 56 14" stroke="#6B7785" stroke-width="1" fill="none" stroke-dasharray="1 4"/><circle cx="56" cy="13.5" r="2.8" fill="#F9A8D4"/><circle cx="42" cy="24" r="12" fill="#9AA5B1" stroke="#6B7785"/><ellipse cx="33" cy="25" rx="9" ry="11" fill="#9AA5B1" stroke="#6B7785"/><ellipse cx="33" cy="25" rx="5.5" ry="7.5" fill="#F9A8D4"/><circle cx="46" cy="22" r="2" fill="${C.BLK}"/><circle cx="46.7" cy="21.3" r=".7" fill="#fff"/><circle cx="50" cy="28" r="2" fill="#F472B6" opacity=".5"/><path d="M40 12 L36 8 L36 16 Z M40 12 L44 8 L44 16 Z" fill="#F472B6" stroke="#DB2777" stroke-width=".7" stroke-linejoin="round"/><circle cx="40" cy="12" r="1.6" fill="#DB2777"/><circle cx="59" cy="7" r="1.6" fill="#7DD3FC"/><circle cx="62.5" cy="10" r="1.3" fill="#7DD3FC"/><circle cx="56" cy="5" r="1.1" fill="#7DD3FC"/>`,
    // BÍ MẬT – Vẹt Vàng Biết Nói
    'parrot-gold': `<rect x="26" y="42" width="4" height="10" fill="${C.BRN}"/><rect x="12" y="40" width="32" height="4" rx="2" fill="${C.BRN}"/><path d="M22 40 Q16 30 20 16 Q26 6 34 10 Q40 16 36 30 Q34 38 30 40 Z" fill="#FFD500" stroke="#B08A00"/><path d="M24 22 Q18 32 24 40" stroke="${C.ORG}" stroke-width="5" fill="none" stroke-linecap="round"/><path d="M28 40 L22 52 L31 45 Z" fill="${C.RED}"/><path d="M29 40 L28 51 L33 43 Z" fill="${C.BLU}"/><circle cx="31" cy="15" r="2.2" fill="#fff"/><circle cx="31.5" cy="15" r="1.1" fill="${C.BLK}"/><path d="M35 13 Q44 14 39 22 Q38 18 35 18 Z" fill="${C.BLK}"/><path d="M22 12 Q20 3 27 4" stroke="${C.RED}" stroke-width="3" fill="none" stroke-linecap="round"/><path d="M42 -2 h20 a3 3 0 0 1 3 3 v8 a3 3 0 0 1 -3 3 h-13 l-5 4 l1 -4 h-3 a3 3 0 0 1 -3 -3 v-8 a3 3 0 0 1 3 -3 Z" fill="#fff" stroke="#B08A00" stroke-width="1"/><text x="52" y="7.5" font-family="Arial, sans-serif" font-weight="900" font-size="7.5" fill="#B45309" text-anchor="middle">Hi!</text>${sparkle(8, 20, 3, '#FFD500')}${sparkle(46, 30, 2.4, '#FFE066')}${sparkle(12, 6, 2, '#FFE066')}`,
    // BÍ MẬT – Phượng Hoàng Lửa
    phoenix: `<circle cx="32" cy="28" r="22" fill="#FFD500" opacity=".22"/><path d="M28 30 Q10 26 3 6 Q13 13 17 10 Q19 19 30 23 Z" fill="${C.ORG}" stroke="#C2410C" stroke-linejoin="round"/><path d="M27 28 Q14 24 9 13 Q16 17 19 15 Q21 21 28 24 Z" fill="${C.YEL}"/><path d="M36 30 Q54 26 61 6 Q51 13 47 10 Q45 19 34 23 Z" fill="${C.ORG}" stroke="#C2410C" stroke-linejoin="round"/><path d="M37 28 Q50 24 55 13 Q48 17 45 15 Q43 21 36 24 Z" fill="${C.YEL}"/><path d="M28 38 Q20 50 8 52 Q22 53 30 47 Q31 53 36 52 Q34 47 34 40 Z" fill="${C.RED}" stroke="#991B1B" stroke-linejoin="round"/><path d="M30 42 Q24 49 16 51 Q25 51 31 46 Z" fill="${C.ORG}"/><ellipse cx="32" cy="32" rx="7" ry="10" fill="${C.RED}" stroke="#991B1B"/><ellipse cx="32" cy="35" rx="4" ry="5.5" fill="${C.ORG}"/><path d="M31 15 Q28 4 33 6 Q34 1 38 5 Q41 9 37 14 Z" fill="${C.YEL}" stroke="#C2410C" stroke-width=".7"/><circle cx="34" cy="19" r="6" fill="${C.RED}" stroke="#991B1B"/><circle cx="35.5" cy="18" r="1.6" fill="${C.BLK}"/><circle cx="36" cy="17.5" r=".55" fill="#fff"/><polygon points="39,17.5 45,19.5 39,21.5" fill="${C.YEL}" stroke="#B08A00" stroke-width=".6" stroke-linejoin="round"/>${sparkle(10, 32, 2.4, '#FFE066')}${sparkle(55, 34, 2.4, '#FFE066')}${sparkle(48, 46, 1.8, '#fff')}`
  });

  /* =========================================================
     🛹 XE MỚI (khung 84×62, chạm đất y=62)
     ========================================================= */
  function bikeWheel(cx, cy, r, c) {
    const col = c || C.BLK;
    let sp = '';
    for (let i = 0; i < 6; i++) {
      const a = i * Math.PI / 6;
      sp += `M${r1(cx - Math.cos(a) * (r - 1.5))} ${r1(cy - Math.sin(a) * (r - 1.5))} L${r1(cx + Math.cos(a) * (r - 1.5))} ${r1(cy + Math.sin(a) * (r - 1.5))} `;
    }
    return `<circle cx="${cx}" cy="${cy}" r="${r}" fill="none" stroke="${col}" stroke-width="3"/><path d="${sp.trim()}" stroke="${C.LGRY}" stroke-width=".8"/><circle cx="${cx}" cy="${cy}" r="2.4" fill="${C.DGRY}"/>`;
  }
  Object.assign(RIDES, {
    'xich-lo': `${bikeWheel(18, 51, 10)}${bikeWheel(68, 49, 12)}<path d="M32 40 L68 49 M50 48 L56 29 M44 30 L56 30" stroke="#237841" stroke-width="2.6" fill="none" stroke-linecap="round" stroke-linejoin="round"/><circle cx="50" cy="48" r="3.2" fill="${C.DGRY}"/><path d="M50 48 L54 52 M50 48 L46 44" stroke="${C.BLK}" stroke-width="2" stroke-linecap="round"/><rect x="50" y="25" width="12" height="4" rx="2" fill="${C.BLK}"/><path d="M6 46 L2 53 L11 53" stroke="${C.DGRY}" stroke-width="2.4" fill="none" stroke-linecap="round" stroke-linejoin="round"/><path d="M4 46 L6 27 Q8 20 16 20 L31 22 L33 46 Z" fill="#1E5AA8" stroke="#123E75" stroke-linejoin="round"/><rect x="8" y="33" width="23" height="6" rx="2" fill="${C.RED}" stroke="${C.DRED}" stroke-width=".8"/><path d="M4 27 Q8 5 31 12 L31 18 Q13 12 8.5 28 Z" fill="${C.YEL}" stroke="#B08A00" stroke-linejoin="round"/><path d="M10 20 Q14 13 22 12.5 M14 25 Q18 17 27 15.5" stroke="#B08A00" stroke-width=".9" fill="none"/><path d="M31 23 L44 23" stroke="${C.DGRY}" stroke-width="2.4" stroke-linecap="round"/><circle cx="18" cy="51" r="2" fill="${C.YEL}"/>`,
    hoverboard: `<ellipse cx="42" cy="58" rx="32" ry="4" fill="#22D3EE" opacity=".25"/><ellipse cx="18" cy="55" rx="7" ry="3" fill="#67E8F9" opacity=".6"/><ellipse cx="66" cy="55" rx="7" ry="3" fill="#67E8F9" opacity=".6"/><rect x="12" y="47" width="12" height="6" rx="2" fill="${C.DGRY}" stroke="#333"/><rect x="60" y="47" width="12" height="6" rx="2" fill="${C.DGRY}" stroke="#333"/><rect x="6" y="39" width="72" height="10" rx="5" fill="#7C3AED" stroke="#4C1D95"/><rect x="12" y="42.5" width="60" height="2.6" rx="1.3" fill="#22D3EE"/><rect x="10" y="40.5" width="22" height="1.6" rx=".8" fill="#fff" opacity=".4"/>${star(42, 44, 3, 1.3, C.YEL)}<path d="M0 34 h7 M2 40 h3 M0 46 h4" stroke="#67E8F9" stroke-width="1.6" stroke-linecap="round"/>`,
    sailboat: `<path d="M8 42 L76 42 L66 55 L18 55 Z" fill="${C.RED}" stroke="${C.DRED}" stroke-linejoin="round"/><rect x="11" y="44" width="62" height="3" fill="#fff"/><circle cx="30" cy="50" r="2" fill="${C.GLASS}" stroke="#2B4A63" stroke-width=".8"/><circle cx="42" cy="50" r="2" fill="${C.GLASS}" stroke="#2B4A63" stroke-width=".8"/><circle cx="54" cy="50" r="2" fill="${C.GLASS}" stroke="#2B4A63" stroke-width=".8"/><line x1="40" y1="42" x2="40" y2="3" stroke="${C.BRN}" stroke-width="2.6" stroke-linecap="round"/><polygon points="43,7 43,38 71,38" fill="#fff" stroke="${C.LGRY}" stroke-linejoin="round"/><path d="M43 18 L54 28 M43 28 L55 38" stroke="${C.AZ}" stroke-width="2" opacity=".6"/><polygon points="37,11 37,38 15,38" fill="${C.YEL}" stroke="#B08A00" stroke-linejoin="round"/><polygon points="40,2 51,5 40,8" fill="${C.BLU}"/><path d="M0 54 Q7 50 14 54 T28 54 T42 54 T56 54 T70 54 T84 54 L84 62 L0 62 Z" fill="#7CC4F2"/><path d="M0 58 Q7 55 14 58 T28 58 T42 58 T56 58 T70 58 T84 58 L84 62 L0 62 Z" fill="#3D9BE0"/><path d="M4 54 Q8 52 12 53 M46 54 Q50 52 54 53" stroke="#fff" stroke-width="1.2" fill="none" stroke-linecap="round"/>`,
    'hot-air-balloon': `<path d="M31 35 L34 49 M53 35 L50 49 M42 38 L42 49" stroke="#5E3A17" stroke-width="1"/><path d="M42 1 C64 1 66 24 50 38 L34 38 C18 24 20 1 42 1 Z" fill="${C.RED}" stroke="${C.DRED}"/><path d="M42 1 C52 1 55 24 47 38 L37 38 C29 24 32 1 42 1 Z" fill="${C.YEL}"/><path d="M42 1 C46 1 47.5 24 44 38 L40 38 C36.5 24 38 1 42 1 Z" fill="${C.BLU}"/><path d="M42 1 C64 1 66 24 50 38 L34 38 C18 24 20 1 42 1 Z" fill="none" stroke="${C.DRED}"/><path d="M23 18 Q42 23 61 18" stroke="#fff" stroke-width="1.6" fill="none" opacity=".7"/><path d="M28 9 Q30 5 34 3.5" stroke="#fff" stroke-width="2" fill="none" stroke-linecap="round" opacity=".55"/><path d="M34 38 L50 38 L48 43 L36 43 Z" fill="${C.DRED}"/><rect x="32" y="48" width="20" height="13" rx="2" fill="#A0652F" stroke="#5E3A17"/><path d="M32 52.5 h20 M32 57 h20 M37 48 v13 M42 48 v13 M47 48 v13" stroke="#7C4A1E" stroke-width=".7"/><rect x="31" y="47" width="22" height="3" rx="1.5" fill="#7C4A1E"/><path d="M8 26 q3 -3 6 0 q3 -3 6 0 M66 46 q2.4 -2.4 4.8 0 q2.4 -2.4 4.8 0" stroke="${C.DGRY}" stroke-width="1" fill="none"/>`,
    submarine: `<path d="M0 62 Q14 56 30 60 T60 58 T84 60 L84 62 Z" fill="${C.TAN}"/><path d="M70 62 Q66 54 70 48 M74 62 Q78 55 75 50" stroke="#22C55E" stroke-width="2" fill="none" stroke-linecap="round"/><rect x="32" y="18" width="18" height="13" rx="3" fill="${C.YEL}" stroke="#B08A00"/><path d="M46 18 L46 8 L54 8" stroke="${C.DGRY}" stroke-width="3" fill="none" stroke-linejoin="round"/><rect x="53" y="6" width="4" height="4.5" rx="1" fill="${C.GLASS}" stroke="${C.DGRY}" stroke-width=".8"/><polygon points="14,32 5,24 9,36" fill="${C.ORG}" stroke="#A84F00" stroke-linejoin="round"/><ellipse cx="42" cy="40" rx="32" ry="14" fill="${C.YEL}" stroke="#B08A00"/><path d="M14 44 Q42 52 70 44" stroke="${C.ORG}" stroke-width="3" fill="none"/><path d="M22 31 Q34 27 48 28" stroke="#fff" stroke-width="2" fill="none" stroke-linecap="round" opacity=".55"/><circle cx="30" cy="39" r="4.6" fill="${C.GLASS}" stroke="${C.DGRY}" stroke-width="2"/><circle cx="44" cy="39" r="4.6" fill="${C.GLASS}" stroke="${C.DGRY}" stroke-width="2"/><circle cx="58" cy="39" r="4.6" fill="${C.GLASS}" stroke="${C.DGRY}" stroke-width="2"/><rect x="5" y="37" width="6" height="6" rx="1" fill="${C.DGRY}"/><ellipse cx="4" cy="34" rx="2" ry="5" fill="${C.LGRY}" stroke="${C.DGRY}" stroke-width=".8"/><ellipse cx="4" cy="46" rx="2" ry="5" fill="${C.LGRY}" stroke="${C.DGRY}" stroke-width=".8"/><circle cx="73" cy="40" r="2" fill="#FFF7CC"/><circle cx="74" cy="22" r="2.2" fill="#E0F4FF" stroke="${C.AZ}" stroke-width=".8"/><circle cx="78" cy="14" r="3" fill="#E0F4FF" stroke="${C.AZ}" stroke-width=".8"/><circle cx="72" cy="7" r="1.8" fill="#E0F4FF" stroke="${C.AZ}" stroke-width=".8"/>`,
    // BÍ MẬT – Ván trượt tên lửa
    'rocket-board': `<path d="M22 40 L4 34 L11 41 L1 43 L11 45 L4 52 L22 47 Z" fill="${C.ORG}"/><path d="M22 41.5 L10 38 L14 42.5 L8 43.5 L14 45 L10 50 L22 46 Z" fill="${C.YEL}"/><rect x="20" y="38" width="24" height="10" rx="5" fill="${C.LGRY}" stroke="${C.DGRY}"/><path d="M44 38 Q54 43 44 48 Z" fill="${C.RED}" stroke="${C.DRED}"/><rect x="26" y="38.5" width="4" height="9" fill="${C.RED}"/><rect x="22" y="40" width="16" height="1.6" rx=".8" fill="#fff" opacity=".5"/><path d="M18 49 Q22 53 28 53 L74 53 Q80 53 83 49" stroke="#7C3AED" stroke-width="5" fill="none" stroke-linecap="round"/><path d="M30 53 L72 53" stroke="#22D3EE" stroke-width="1.2" stroke-dasharray="4 3"/>${star(60, 46, 4, 1.8, C.YEL, '#B08A00')}<circle cx="32" cy="58" r="4" fill="${C.BLK}"/><circle cx="32" cy="58" r="1.8" fill="#22D3EE"/><circle cx="70" cy="58" r="4" fill="${C.BLK}"/><circle cx="70" cy="58" r="1.8" fill="#22D3EE"/>${sparkle(76, 36, 3, '#FFD500')}${sparkle(52, 30, 2.2, '#FFE066')}`
  });

  /* =========================================================
     🧑‍🤝‍🧑 BẠN ĐỒNG HÀNH MỚI
     ========================================================= */
  Object.assign(BUDDIES, {
    'buddy-aodai': 'non-la|smile|torso-aodai|legs-white|star-lantern',
    'buddy-scientist': 'hair-brown|star-eyes|torso-lab|legs-black|magnifier',
    'buddy-footballer': 'hair-blonde|laughing|torso-football|legs-white|trophy',
    'buddy-pilot': 'cap-pilot|mustache|torso-pilot|legs-camo|none',
    'buddy-word-wizard': 'hat-wizard|laughing|torso-wizard|legs-purple|spell-book'
  });

  /* =========================================================
     🖼️ PHÔNG NỀN (scene) – SCENES[id](x, y, w, h)
     Vẽ trong <svg> con (overflow hidden) toạ độ cục bộ 0..w × 0..h
     ========================================================= */
  let gid = 0;
  const wrap = (x, y, w, h, inner) => `<svg x="${x}" y="${y}" width="${w}" height="${h}" overflow="hidden">${inner}</svg>`;
  function sky(w, h, top, bottom) {
    const id = 'lsg2-' + (++gid);
    return `<defs><linearGradient id="${id}" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="${top}"/><stop offset="1" stop-color="${bottom}"/></linearGradient></defs><rect x="0" y="0" width="${w}" height="${h}" fill="url(#${id})"/>`;
  }
  const cloud = (cx, cy, s, op) => `<g fill="#fff" opacity="${op || 0.9}"><ellipse cx="${r1(cx)}" cy="${r1(cy)}" rx="${r1(12 * s)}" ry="${r1(5 * s)}"/><circle cx="${r1(cx - 5 * s)}" cy="${r1(cy - 3 * s)}" r="${r1(5 * s)}"/><circle cx="${r1(cx + 3 * s)}" cy="${r1(cy - 5 * s)}" r="${r1(6.5 * s)}"/></g>`;
  const sun = (cx, cy, r, c) => `<circle cx="${r1(cx)}" cy="${r1(cy)}" r="${r1(r * 1.6)}" fill="${c || '#FFE066'}" opacity=".3"/><circle cx="${r1(cx)}" cy="${r1(cy)}" r="${r1(r)}" fill="${c || '#FFE066'}"/>`;
  const tree = (cx, gy, s) => `<rect x="${r1(cx - 2.5 * s)}" y="${r1(gy - 16 * s)}" width="${r1(5 * s)}" height="${r1(16 * s)}" rx="1" fill="#A0703C"/><circle cx="${r1(cx)}" cy="${r1(gy - 24 * s)}" r="${r1(11 * s)}" fill="#7CC46A"/><circle cx="${r1(cx - 7 * s)}" cy="${r1(gy - 18 * s)}" r="${r1(7 * s)}" fill="#6BB55A"/><circle cx="${r1(cx + 7 * s)}" cy="${r1(gy - 19 * s)}" r="${r1(7 * s)}" fill="#8BD178"/><circle cx="${r1(cx - 3 * s)}" cy="${r1(gy - 28 * s)}" r="${r1(3 * s)}" fill="#fff" opacity=".25"/>`;
  const pine = (cx, gy, s, snow) => `<rect x="${r1(cx - 2 * s)}" y="${r1(gy - 6 * s)}" width="${r1(4 * s)}" height="${r1(6 * s)}" fill="#8B5A2B"/><polygon points="${r1(cx - 12 * s)},${r1(gy - 6 * s)} ${r1(cx + 12 * s)},${r1(gy - 6 * s)} ${r1(cx)},${r1(gy - 24 * s)}" fill="#4F8F6A"/><polygon points="${r1(cx - 9 * s)},${r1(gy - 16 * s)} ${r1(cx + 9 * s)},${r1(gy - 16 * s)} ${r1(cx)},${r1(gy - 32 * s)}" fill="#5FA37A"/>` +
    (snow ? `<polygon points="${r1(cx - 4 * s)},${r1(gy - 25 * s)} ${r1(cx + 4 * s)},${r1(gy - 25 * s)} ${r1(cx)},${r1(gy - 32 * s)}" fill="#fff"/><path d="M${r1(cx - 11 * s)} ${r1(gy - 7 * s)} Q${r1(cx)} ${r1(gy - 10 * s)} ${r1(cx + 11 * s)} ${r1(gy - 7 * s)}" stroke="#fff" stroke-width="${r1(2 * s)}" fill="none"/>` : '');
  function palm(cx, gy, s, flip) {
    const f = flip ? -1 : 1, X = (d) => r1(cx + d * s * f), Y = (d) => r1(gy - d * s);
    return `<path d="M${X(-2)} ${Y(0)} Q${X(-4)} ${Y(20)} ${X(4)} ${Y(40)} L${X(8)} ${Y(39)} Q${X(1)} ${Y(20)} ${X(4)} ${Y(0)} Z" fill="#B88A55"/>` +
      `<path d="M${X(6)} ${Y(40)} Q${X(-10)} ${Y(46)} ${X(-18)} ${Y(32)} Q${X(-6)} ${Y(40)} ${X(6)} ${Y(40)} Z" fill="#5DBB63"/><path d="M${X(6)} ${Y(40)} Q${X(22)} ${Y(48)} ${X(28)} ${Y(32)} Q${X(16)} ${Y(41)} ${X(6)} ${Y(40)} Z" fill="#4CAF50"/><path d="M${X(6)} ${Y(40)} Q${X(0)} ${Y(56)} ${X(-12)} ${Y(50)} Q${X(0)} ${Y(50)} ${X(6)} ${Y(40)} Z" fill="#6CCB6F"/><path d="M${X(6)} ${Y(40)} Q${X(16)} ${Y(56)} ${X(26)} ${Y(48)} Q${X(14)} ${Y(49)} ${X(6)} ${Y(40)} Z" fill="#5DBB63"/>` +
      `<circle cx="${X(4)}" cy="${Y(37)}" r="${r1(2.4 * s)}" fill="#8B5A2B"/><circle cx="${X(8)}" cy="${Y(37.5)}" r="${r1(2.4 * s)}" fill="#7C4A1E"/>`;
  }
  const stars = (w, h, n, maxY, seed, c) => {
    let s = '', k = seed || 7;
    const rnd = () => { k = (k * 9301 + 49297) % 233280; return k / 233280; };
    for (let i = 0; i < n; i++) s += `<circle cx="${r1(rnd() * w)}" cy="${r1(rnd() * h * maxY)}" r="${r1(0.5 + rnd() * 1.1)}" fill="${c || '#fff'}" opacity="${r1(0.5 + rnd() * 0.5)}"/>`;
    return s;
  };
  const flowers = (w, y0, n, cols) => {
    let s = '';
    for (let i = 0; i < n; i++) {
      const fx = r1(w * (i + 0.5) / n + (i % 2 ? 4 : -4)), fy = r1(y0 + (i % 3) * 3);
      s += `<circle cx="${fx}" cy="${fy}" r="1.8" fill="${cols[i % cols.length]}"/><circle cx="${fx}" cy="${fy}" r=".7" fill="#FFE066"/>`;
    }
    return s;
  };
  function karst(cx, base, wd, ht, c, lean) {
    const k = lean || 1, l = r1(cx - wd / 2), rr = r1(cx + wd / 2), T = r1(base - ht);
    const P = (dx, dy) => r1(cx + dx * wd * k) + ' ' + r1(base - dy * ht);
    return `<path d="M${l} ${base} L${P(-0.45 * k, 0.55)} Q${P(-0.42, 0.95)} ${P(-0.1, 1)} Q${P(0.3, 1.02)} ${P(0.3, 0.72)} L${P(0.42, 0.45)} Q${P(0.55, 0.2)} ${rr} ${base} Z" fill="${c}"/>` +
      `<path d="M${P(-0.15, 0.8)} L${P(-0.2, 0.25)} M${P(0.12, 0.7)} L${P(0.15, 0.2)}" stroke="#000" stroke-opacity=".08" stroke-width="2" fill="none" stroke-linecap="round"/>` +
      `<ellipse cx="${r1(cx - wd * 0.08 * k)}" cy="${r1(T + 2.5)}" rx="${r1(wd * 0.26)}" ry="2.6" fill="#7FB07F" opacity=".75"/>` +
      `<ellipse cx="${r1(cx)}" cy="${r1(base + 3)}" rx="${r1(wd * 0.45)}" ry="1.6" fill="${c}" opacity=".35"/>`;
  }

  const SCENES = {
    'none-scene': () => '',
    'scene-park': (x, y, w, h) => {
      const g = r1(h * 0.8);
      let o = sky(w, h, '#CDEBFF', '#F2FBFF') + sun(w * 0.86, h * 0.13, 8) + cloud(w * 0.22, h * 0.12, 1) + cloud(w * 0.62, h * 0.22, 0.8);
      [[0.02, 0.1, 0.34], [0.13, 0.08, 0.26], [0.22, 0.12, 0.42], [0.36, 0.09, 0.3], [0.47, 0.11, 0.46], [0.6, 0.08, 0.32], [0.7, 0.12, 0.4], [0.84, 0.1, 0.3]].forEach(([a, b, c]) => {
        o += `<rect x="${r1(w * a)}" y="${r1(g - h * c)}" width="${r1(w * b)}" height="${r1(h * c)}" rx="1.5" fill="#C9D8EA" opacity=".85"/>`;
        for (let k = 0; k < 3; k++) o += `<rect x="${r1(w * a + w * b * 0.3)}" y="${r1(g - h * c + 5 + k * 9)}" width="${r1(w * b * 0.4)}" height="3" fill="#fff" opacity=".6"/>`;
      });
      o += `<rect x="0" y="${g}" width="${w}" height="${r1(h - g)}" fill="#BDE8A0"/><rect x="0" y="${g}" width="${w}" height="3" fill="#A6D98A"/><path d="M0 ${r1(h * 0.93)} Q${r1(w * 0.5)} ${r1(h * 0.86)} ${w} ${r1(h * 0.93)} L${w} ${r1(h * 0.98)} Q${r1(w * 0.5)} ${r1(h * 0.91)} 0 ${r1(h * 0.98)} Z" fill="#F1E3C2"/>`;
      o += tree(w * 0.08, g + 2, 1) + tree(w * 0.93, g + 2, 0.9) + flowers(w, g + 7, Math.max(3, Math.round(w / 30)), ['#F472B6', '#FFFFFF', '#FACC15']);
      return wrap(x, y, w, h, o);
    },
    'scene-beach': (x, y, w, h) => {
      const sea = r1(h * 0.6), g = r1(h * 0.8);
      let o = sky(w, h, '#BFE6FF', '#EAF7FF') + sun(w * 0.82, h * 0.16, 9, '#FFD54F') + cloud(w * 0.25, h * 0.14, 0.9) + cloud(w * 0.55, h * 0.08, 0.6);
      o += `<rect x="0" y="${sea}" width="${w}" height="${r1(g - sea + 4)}" fill="#8FD3EE"/><rect x="0" y="${sea}" width="${w}" height="3" fill="#B6E4F5"/>`;
      for (let i = 0; i < 4; i++) o += `<path d="M${r1(w * (0.1 + i * 0.24))} ${r1(sea + 6 + (i % 2) * 6)} q4 -3 8 0 q4 -3 8 0" stroke="#fff" stroke-width="1.2" fill="none" opacity=".8"/>`;
      o += `<path d="M0 ${g} Q${r1(w * 0.25)} ${r1(g - 4)} ${r1(w * 0.5)} ${g} T${w} ${g} L${w} ${h} L0 ${h} Z" fill="#FBE7B5"/>`;
      o += palm(w * 0.08, h * 0.9, 1) + `<line x1="${r1(w * 0.9)}" y1="${r1(h * 0.95)}" x2="${r1(w * 0.88)}" y2="${r1(h * 0.62)}" stroke="#8B5A2B" stroke-width="1.6"/><path d="M${r1(w * 0.88 - 16)} ${r1(h * 0.66)} Q${r1(w * 0.88)} ${r1(h * 0.5)} ${r1(w * 0.88 + 16)} ${r1(h * 0.66)} Z" fill="#F87171"/><path d="M${r1(w * 0.88 - 5)} ${r1(h * 0.66)} Q${r1(w * 0.88)} ${r1(h * 0.52)} ${r1(w * 0.88 + 5)} ${r1(h * 0.66)} Z" fill="#fff"/>`;
      o += `<path d="M${r1(w * 0.3)} ${r1(h * 0.95)} a3 3 0 0 1 6 0 Z" fill="#F9A8D4"/>${star(r1(w * 0.68), r1(h * 0.94), 3.2, 1.4, '#FB923C')}`;
      return wrap(x, y, w, h, o);
    },
    'scene-space': (x, y, w, h) => {
      const g = r1(h * 0.82);
      let o = sky(w, h, '#3B3F8C', '#6A5FB8') + stars(w, h, Math.round(w / 5), 0.8, 11);
      o += `<circle cx="${r1(w * 0.8)}" cy="${r1(h * 0.2)}" r="11" fill="#F9A8D4"/><ellipse cx="${r1(w * 0.8)}" cy="${r1(h * 0.2)}" rx="19" ry="4.5" fill="none" stroke="#FDE68A" stroke-width="2" transform="rotate(-18 ${r1(w * 0.8)} ${r1(h * 0.2)})"/><circle cx="${r1(w * 0.8 - 4)}" cy="${r1(h * 0.2 - 4)}" r="3" fill="#fff" opacity=".35"/>`;
      o += `<circle cx="${r1(w * 0.14)}" cy="${r1(h * 0.34)}" r="6" fill="#7DD3FC"/><path d="M${r1(w * 0.14 - 5)} ${r1(h * 0.34)} q5 -3 10 0" stroke="#4ADE80" stroke-width="2" fill="none"/>`;
      o += `<path d="M${r1(w * 0.3)} ${r1(h * 0.12)} l14 6" stroke="#fff" stroke-width="1.4" stroke-linecap="round" opacity=".7"/><circle cx="${r1(w * 0.3 + 15)}" cy="${r1(h * 0.12 + 6.5)}" r="1.8" fill="#FFE066"/>`;
      o += `<path d="M0 ${g} Q${r1(w * 0.3)} ${r1(g - 6)} ${r1(w * 0.6)} ${g} T${w} ${r1(g - 2)} L${w} ${h} L0 ${h} Z" fill="#C9CCD6"/>`;
      [[0.15, 0.9, 6], [0.45, 0.94, 4], [0.78, 0.88, 7], [0.92, 0.96, 3]].forEach(([a, b, r]) => { o += `<ellipse cx="${r1(w * a)}" cy="${r1(h * b)}" rx="${r}" ry="${r1(r * 0.45)}" fill="#A9AEBB"/>`; });
      return wrap(x, y, w, h, o);
    },
    'scene-jungle': (x, y, w, h) => {
      const g = r1(h * 0.8);
      let o = sky(w, h, '#E3F6D3', '#F6FDEB');
      o += `<path d="M0 ${r1(h * 0.62)} Q${r1(w * 0.2)} ${r1(h * 0.45)} ${r1(w * 0.4)} ${r1(h * 0.6)} T${r1(w * 0.8)} ${r1(h * 0.55)} T${w} ${r1(h * 0.6)} L${w} ${g} L0 ${g} Z" fill="#C5E5A5"/>`;
      for (let i = 0; i < 5; i++) {
        const vx = r1(w * (0.12 + i * 0.19)), vl = r1(h * (0.18 + (i % 3) * 0.08));
        o += `<path d="M${vx} 0 Q${r1(vx + 4)} ${r1(vl / 2)} ${vx} ${vl}" stroke="#6FAE4F" stroke-width="1.6" fill="none"/><ellipse cx="${r1(vx + 2)}" cy="${r1(vl * 0.5)}" rx="3" ry="1.6" fill="#7CC46A"/><ellipse cx="${vx}" cy="${vl}" rx="3.4" ry="1.8" fill="#7CC46A"/>`;
      }
      const leaf = (cx, cy, rx, ry, rot, c) => `<ellipse cx="${r1(cx)}" cy="${r1(cy)}" rx="${rx}" ry="${ry}" fill="${c}" transform="rotate(${rot} ${r1(cx)} ${r1(cy)})"/>`;
      o += leaf(4, h * 0.3, 22, 8, 50, '#7CC46A') + leaf(2, h * 0.55, 20, 7, 20, '#5FAE52') + leaf(w - 4, h * 0.32, 22, 8, -50, '#7CC46A') + leaf(w - 2, h * 0.56, 20, 7, -20, '#5FAE52');
      o += `<rect x="0" y="${g}" width="${w}" height="${r1(h - g)}" fill="#9CCB6E"/><rect x="0" y="${g}" width="${w}" height="3" fill="#86BB59"/>`;
      o += flowers(w, g + 8, Math.max(3, Math.round(w / 28)), ['#F87171', '#FB923C', '#F472B6']);
      o += `<g transform="translate(${r1(w * 0.86)} ${r1(h * 0.18)})"><ellipse cx="0" cy="0" rx="6" ry="2.4" fill="#FB923C"/><ellipse cx="0" cy="0" rx="2.4" ry="6" fill="#FB923C"/><circle r="1.8" fill="#FFE066"/></g>`;
      return wrap(x, y, w, h, o);
    },
    'scene-snow': (x, y, w, h) => {
      const g = r1(h * 0.8);
      let o = sky(w, h, '#D7E8F8', '#F3F8FD');
      o += `<polygon points="${r1(-w * 0.05)},${g} ${r1(w * 0.25)},${r1(h * 0.28)} ${r1(w * 0.55)},${g}" fill="#B9CCE3"/><polygon points="${r1(w * 0.25)},${r1(h * 0.28)} ${r1(w * 0.19)},${r1(h * 0.4)} ${r1(w * 0.23)},${r1(h * 0.38)} ${r1(w * 0.26)},${r1(h * 0.42)} ${r1(w * 0.3)},${r1(h * 0.38)} ${r1(w * 0.32)},${r1(h * 0.4)}" fill="#fff"/>`;
      o += `<polygon points="${r1(w * 0.4)},${g} ${r1(w * 0.72)},${r1(h * 0.18)} ${r1(w * 1.05)},${g}" fill="#A8BEDA"/><polygon points="${r1(w * 0.72)},${r1(h * 0.18)} ${r1(w * 0.65)},${r1(h * 0.33)} ${r1(w * 0.69)},${r1(h * 0.3)} ${r1(w * 0.72)},${r1(h * 0.35)} ${r1(w * 0.76)},${r1(h * 0.3)} ${r1(w * 0.8)},${r1(h * 0.34)}" fill="#fff"/>`;
      o += `<path d="M0 ${g} Q${r1(w * 0.3)} ${r1(g - 5)} ${r1(w * 0.6)} ${g} T${w} ${g} L${w} ${h} L0 ${h} Z" fill="#F8FBFF"/><path d="M0 ${r1(h * 0.93)} Q${r1(w * 0.5)} ${r1(h * 0.89)} ${w} ${r1(h * 0.94)}" stroke="#DCE7F5" stroke-width="3" fill="none"/>`;
      o += pine(w * 0.07, g + 3, 1, true) + pine(w * 0.94, g + 2, 0.85, true);
      o += stars(w, h, Math.round(w / 6), 0.95, 5, '#fff');
      o += `<g transform="translate(${r1(w * 0.82)} ${r1(h * 0.93)})"><circle r="5" fill="#fff" stroke="#CBD5E1"/><circle cy="-7" r="3.6" fill="#fff" stroke="#CBD5E1"/><polygon points="0,-7 4.5,-6.2 0,-5.4" fill="${C.ORG}"/><circle cx="-1.2" cy="-8" r=".6" fill="${C.BLK}"/></g>`;
      return wrap(x, y, w, h, o);
    },
    'scene-underwater': (x, y, w, h) => {
      const g = r1(h * 0.84);
      let o = sky(w, h, '#CFF1FB', '#9FD8EC');
      for (let i = 0; i < 4; i++) { const lx = r1(w * (0.1 + i * 0.27)); o += `<polygon points="${lx},0 ${r1(lx + w * 0.08)},0 ${r1(lx + w * 0.16)},${r1(h * 0.7)} ${r1(lx + w * 0.06)},${r1(h * 0.7)}" fill="#fff" opacity=".18"/>`; }
      [[0.12, 0.6, 3], [0.15, 0.45, 2], [0.86, 0.5, 2.6], [0.9, 0.36, 1.8], [0.55, 0.15, 2]].forEach(([a, b, r]) => { o += `<circle cx="${r1(w * a)}" cy="${r1(h * b)}" r="${r}" fill="#fff" fill-opacity=".35" stroke="#fff" stroke-width=".7"/>`; });
      o += `<g transform="translate(${r1(w * 0.78)} ${r1(h * 0.25)})"><ellipse rx="6" ry="3.6" fill="#FB923C"/><polygon points="5,0 10,-3.5 10,3.5" fill="#FB923C"/><path d="M-1 -3.4 v6.8" stroke="#fff" stroke-width="1.4"/><circle cx="-3" cy="-.8" r=".8" fill="${C.BLK}"/></g>`;
      o += `<path d="M0 ${g} Q${r1(w * 0.3)} ${r1(g - 4)} ${r1(w * 0.55)} ${g} T${w} ${g} L${w} ${h} L0 ${h} Z" fill="#F3DFAE"/>`;
      const weed = (sx, c, hh) => `<path d="M${r1(sx)} ${r1(g + 2)} Q${r1(sx - 5)} ${r1(g - hh * 0.3)} ${r1(sx)} ${r1(g - hh * 0.6)} T${r1(sx)} ${r1(g - hh)}" stroke="${c}" stroke-width="3" fill="none" stroke-linecap="round"/>`;
      o += weed(w * 0.05, '#5FB86A', 34) + weed(w * 0.1, '#7CC46A', 24) + weed(w * 0.92, '#5FB86A', 30) + weed(w * 0.96, '#7CC46A', 20);
      o += `<path d="M${r1(w * 0.18)} ${r1(g + 2)} l0 -10 m0 4 l-5 -5 m5 2 l5 -6" stroke="#F9A8D4" stroke-width="2.6" fill="none" stroke-linecap="round"/><path d="M${r1(w * 0.84)} ${r1(g + 2)} l0 -8 m0 3 l-4 -4 m4 1 l4 -5" stroke="#FB923C" stroke-width="2.6" fill="none" stroke-linecap="round"/>`;
      o += star(r1(w * 0.7), r1(h * 0.93), 3.6, 1.6, '#F87171') + `<path d="M${r1(w * 0.32)} ${r1(h * 0.94)} a3.2 3.2 0 0 1 6.4 0 Z" fill="#FBCFE8"/>`;
      return wrap(x, y, w, h, o);
    },
    'scene-halong': (x, y, w, h) => {
      const sea = r1(h * 0.66), g = r1(h * 0.84);
      let o = sky(w, h, '#FDE7D6', '#E3F2FB') + sun(w * 0.6, h * 0.2, 8, '#FDBA74') + cloud(w * 0.2, h * 0.12, 0.7, 0.8);
      o += karst(w * 0.12, sea, w * 0.14, h * 0.32, '#B7CDB9') + karst(w * 0.36, sea, w * 0.1, h * 0.24, '#B7CDB9', -1) + karst(w * 0.8, sea, w * 0.12, h * 0.36, '#B7CDB9');
      o += karst(w * 0.24, sea, w * 0.13, h * 0.42, '#97B79A') + karst(w * 0.66, sea, w * 0.11, h * 0.3, '#97B79A', -1) + karst(w * 0.93, sea, w * 0.1, h * 0.26, '#97B79A', -1);
      o += `<rect x="0" y="${sea}" width="${w}" height="${r1(h - sea)}" fill="#A9DCE6"/><rect x="0" y="${sea}" width="${w}" height="2" fill="#C8EAF0"/>`;
      for (let i = 0; i < 3; i++) o += `<path d="M${r1(w * (0.08 + i * 0.32))} ${r1(sea + 7 + (i % 2) * 5)} q4 -2 8 0" stroke="#fff" stroke-width="1" fill="none" opacity=".8"/>`;
      const bx = r1(w * 0.47), by = r1(sea + 6);
      o += `<path d="M${r1(bx - 9)} ${by} L${r1(bx + 9)} ${by} L${r1(bx + 6)} ${r1(by + 4)} L${r1(bx - 6)} ${r1(by + 4)} Z" fill="#8B5A2B"/><line x1="${bx}" y1="${by}" x2="${bx}" y2="${r1(by - 15)}" stroke="#5E3A17" stroke-width="1"/><path d="M${r1(bx + 0.5)} ${r1(by - 14)} Q${r1(bx + 9)} ${r1(by - 8)} ${r1(bx + 0.5)} ${r1(by - 1)} Z" fill="#E86A4A"/><path d="M${r1(bx - 0.5)} ${r1(by - 12)} Q${r1(bx - 7)} ${r1(by - 7)} ${r1(bx - 0.5)} ${r1(by - 2)} Z" fill="#F08B6B"/>`;
      o += `<rect x="0" y="${g}" width="${w}" height="${r1(h - g)}" fill="#C8A27A"/>`;
      for (let px = 0; px < w; px += 14) o += `<line x1="${px}" y1="${g}" x2="${px}" y2="${h}" stroke="#A88259" stroke-width="1"/>`;
      o += `<rect x="0" y="${g}" width="${w}" height="2.4" fill="#A88259"/>`;
      return wrap(x, y, w, h, o);
    },
    'scene-castle': (x, y, w, h) => {
      const g = r1(h * 0.8), cx = w * 0.5, s = Math.min(1.2, w / 150);
      let o = sky(w, h, '#DCD6FA', '#F4F2FF') + cloud(w * 0.15, h * 0.12, 0.8) + cloud(w * 0.86, h * 0.2, 0.7);
      o += `<path d="M0 ${r1(h * 0.66)} Q${r1(w * 0.25)} ${r1(h * 0.55)} ${r1(w * 0.5)} ${r1(h * 0.62)} T${w} ${r1(h * 0.6)} L${w} ${g} L0 ${g} Z" fill="#C7E6B4"/>`;
      const X = (d) => r1(cx + d * s), Y = (d) => r1(h * 0.66 - d * s);
      o += `<g opacity=".9"><rect x="${X(-30)}" y="${Y(28)}" width="${r1(60 * s)}" height="${r1(28 * s)}" fill="#D9DCE6" stroke="#B7BCCB"/>`;
      for (let i = 0; i < 6; i++) o += `<rect x="${X(-30 + i * 10.4)}" y="${Y(32)}" width="${r1(6 * s)}" height="${r1(4.5 * s)}" fill="#D9DCE6" stroke="#B7BCCB"/>`;
      [[-38, 44], [30, 44], [-8, 56]].forEach(([dx, th]) => {
        o += `<rect x="${X(dx)}" y="${Y(th)}" width="${r1(16 * s)}" height="${r1(th * s)}" fill="#E3E6EE" stroke="#B7BCCB"/><polygon points="${X(dx - 2)},${Y(th)} ${X(dx + 18)},${Y(th)} ${X(dx + 8)},${Y(th + 16)}" fill="#A5B4FC" stroke="#818CF8"/><line x1="${X(dx + 8)}" y1="${Y(th + 16)}" x2="${X(dx + 8)}" y2="${Y(th + 23)}" stroke="#6C6E68" stroke-width=".8"/><polygon points="${X(dx + 8)},${Y(th + 23)} ${X(dx + 14)},${Y(th + 21)} ${X(dx + 8)},${Y(th + 19)}" fill="#F87171"/><rect x="${X(dx + 6)}" y="${Y(th - 8)}" width="${r1(4 * s)}" height="${r1(6 * s)}" rx="${r1(2 * s)}" fill="#8B93B5"/>`;
      });
      o += `<path d="M${X(-7)} ${Y(0)} L${X(-7)} ${Y(10)} Q${X(0)} ${Y(18)} ${X(7)} ${Y(10)} L${X(7)} ${Y(0)} Z" fill="#B08968"/></g>`;
      o += `<rect x="0" y="${g}" width="${w}" height="${r1(h - g)}" fill="#AEDB93"/><rect x="0" y="${g}" width="${w}" height="3" fill="#97CC7A"/>` + flowers(w, g + 8, Math.max(3, Math.round(w / 30)), ['#F9A8D4', '#fff', '#C4B5FD']);
      return wrap(x, y, w, h, o);
    },
    'scene-rainbow': (x, y, w, h) => {
      const g = r1(h * 0.8), cx = r1(w * 0.5), R = Math.min(w * 0.46, h * 0.58);
      let o = sky(w, h, '#FCE4F1', '#EEF6FF');
      ['#FCA5A5', '#FDBA74', '#FDE68A', '#86EFAC', '#93C5FD', '#C4B5FD'].forEach((c, i) => {
        const r = r1(R - i * 5.5);
        o += `<path d="M${r1(cx - r)} ${g} A${r} ${r} 0 0 1 ${r1(cx + r)} ${g}" stroke="${c}" stroke-width="5.6" fill="none"/>`;
      });
      o += cloud(cx - R + 4, g - 4, 1.1, 1) + cloud(cx + R - 4, g - 4, 1.1, 1) + cloud(w * 0.2, h * 0.14, 0.7) + cloud(w * 0.82, h * 0.1, 0.6);
      o += `<path d="M0 ${r1(h * 0.84)} Q${r1(w * 0.2)} ${r1(h * 0.74)} ${r1(w * 0.42)} ${r1(h * 0.84)} Z" fill="#F9C6E0"/><path d="M${r1(w * 0.55)} ${r1(h * 0.84)} Q${r1(w * 0.8)} ${r1(h * 0.72)} ${w} ${r1(h * 0.82)} L${w} ${r1(h * 0.84)} Z" fill="#C9B8F5"/>`;
      o += `<rect x="0" y="${r1(h * 0.83)}" width="${w}" height="${r1(h * 0.17)}" fill="#BFF0D9"/>` + flowers(w, h * 0.9, Math.max(3, Math.round(w / 28)), ['#F472B6', '#A78BFA', '#FACC15']);
      o += sparkle(r1(w * 0.12), r1(h * 0.34), 3, '#fff') + sparkle(r1(w * 0.9), r1(h * 0.4), 2.6, '#fff') + sparkle(r1(w * 0.5), r1(h * 0.08), 2.4, '#FDE68A');
      return wrap(x, y, w, h, o);
    },
    'scene-volcano': (x, y, w, h) => {
      const sea = r1(h * 0.62), g = r1(h * 0.82), vx = w * 0.62;
      let o = sky(w, h, '#FFE8D1', '#FFF6EC');
      o += `<circle cx="${r1(vx - 4)}" cy="${r1(h * 0.12)}" r="7" fill="#D6D3D1" opacity=".8"/><circle cx="${r1(vx + 6)}" cy="${r1(h * 0.07)}" r="9" fill="#E7E5E4" opacity=".8"/><circle cx="${r1(vx + 16)}" cy="${r1(h * 0.04)}" r="6" fill="#E7E5E4" opacity=".7"/>`;
      o += `<polygon points="${r1(vx - w * 0.3)},${sea} ${r1(vx - 9)},${r1(h * 0.24)} ${r1(vx + 9)},${r1(h * 0.24)} ${r1(vx + w * 0.3)},${sea}" fill="#C8A58A"/><circle cx="${r1(vx)}" cy="${r1(h * 0.22)}" r="12" fill="#FB923C" opacity=".25"/><ellipse cx="${r1(vx)}" cy="${r1(h * 0.24)}" rx="9" ry="2.2" fill="#F97316"/><path d="M${r1(vx - 5)} ${r1(h * 0.25)} Q${r1(vx - 9)} ${r1(h * 0.32)} ${r1(vx - 13)} ${r1(h * 0.4)} M${r1(vx + 4)} ${r1(h * 0.25)} Q${r1(vx + 7)} ${r1(h * 0.3)} ${r1(vx + 8)} ${r1(h * 0.35)}" stroke="#FB923C" stroke-width="3" fill="none" stroke-linecap="round"/><circle cx="${r1(vx - 3)}" cy="${r1(h * 0.19)}" r="1.6" fill="#FDBA74"/><circle cx="${r1(vx + 4)}" cy="${r1(h * 0.17)}" r="1.2" fill="#FDBA74"/>`;
      o += `<path d="M${r1(vx - w * 0.22)} ${sea} Q${r1(vx - w * 0.15)} ${r1(h * 0.5)} ${r1(vx - w * 0.08)} ${r1(h * 0.52)} Q${r1(vx)} ${r1(h * 0.54)} ${r1(vx + w * 0.12)} ${r1(h * 0.5)} Q${r1(vx + w * 0.2)} ${r1(h * 0.52)} ${r1(vx + w * 0.26)} ${sea} Z" fill="#9BCB7C"/>`;
      o += `<rect x="0" y="${sea}" width="${w}" height="${r1(h - sea)}" fill="#8FD3EE"/>`;
      for (let i = 0; i < 3; i++) o += `<path d="M${r1(w * (0.06 + i * 0.33))} ${r1(sea + 6 + (i % 2) * 5)} q4 -2.4 8 0" stroke="#fff" stroke-width="1.1" fill="none" opacity=".8"/>`;
      o += `<path d="M0 ${r1(g + 2)} Q${r1(w * 0.5)} ${r1(g - 6)} ${w} ${r1(g + 2)} L${w} ${h} L0 ${h} Z" fill="#FBE7B5"/>` + palm(w * 0.1, h * 0.92, 0.95) + palm(w * 0.92, h * 0.94, 0.8, true);
      return wrap(x, y, w, h, o);
    },
    // BÍ MẬT – Sân khấu Siêu Sao
    'scene-stage': (x, y, w, h) => {
      const g = r1(h * 0.8);
      let o = sky(w, h, '#4C2E7A', '#6D4AA8');
      o += `<polygon points="${r1(w * 0.3)},0 ${r1(w * 0.36)},0 ${r1(w * 0.6)},${g} ${r1(w * 0.2)},${g}" fill="#FFF3B0" opacity=".22"/><polygon points="${r1(w * 0.64)},0 ${r1(w * 0.7)},0 ${r1(w * 0.82)},${g} ${r1(w * 0.42)},${g}" fill="#FFF3B0" opacity=".22"/>`;
      o += stars(w, h, Math.round(w / 8), 0.6, 21, '#FDE68A');
      const cw = Math.max(14, w * 0.14);
      o += `<path d="M0 0 L${r1(cw)} 0 Q${r1(cw * 0.6)} ${r1(h * 0.4)} ${r1(cw * 0.9)} ${g} L0 ${g} Z" fill="#DC2626"/><path d="M${r1(cw * 0.3)} 0 Q${r1(cw * 0.1)} ${r1(h * 0.4)} ${r1(cw * 0.35)} ${g} M${r1(cw * 0.65)} 0 Q${r1(cw * 0.4)} ${r1(h * 0.4)} ${r1(cw * 0.65)} ${g}" stroke="#991B1B" stroke-width="1.6" fill="none"/>`;
      o += `<path d="M${w} 0 L${r1(w - cw)} 0 Q${r1(w - cw * 0.6)} ${r1(h * 0.4)} ${r1(w - cw * 0.9)} ${g} L${w} ${g} Z" fill="#DC2626"/><path d="M${r1(w - cw * 0.3)} 0 Q${r1(w - cw * 0.1)} ${r1(h * 0.4)} ${r1(w - cw * 0.35)} ${g} M${r1(w - cw * 0.65)} 0 Q${r1(w - cw * 0.4)} ${r1(h * 0.4)} ${r1(w - cw * 0.65)} ${g}" stroke="#991B1B" stroke-width="1.6" fill="none"/>`;
      o += `<path d="M0 0 L${w} 0 L${w} 8 Q${r1(w * 0.75)} 14 ${r1(w * 0.5)} 8 Q${r1(w * 0.25)} 14 0 8 Z" fill="#B91C1C"/><path d="M0 8 Q${r1(w * 0.25)} 14 ${r1(w * 0.5)} 8 Q${r1(w * 0.75)} 14 ${w} 8" stroke="#FACC15" stroke-width="1.4" fill="none"/>`;
      o += `<rect x="0" y="${g}" width="${w}" height="${r1(h - g)}" fill="#B07A4A"/><rect x="0" y="${g}" width="${w}" height="3" fill="#FACC15"/>`;
      for (let px = 10; px < w; px += 18) o += `<line x1="${px}" y1="${r1(g + 3)}" x2="${px}" y2="${h}" stroke="#8B5A2B" stroke-width="1"/>`;
      for (let i = 0; i < Math.max(3, Math.round(w / 40)); i++) o += `<circle cx="${r1(w * (i + 0.5) / Math.max(3, Math.round(w / 40)))}" cy="${r1(g + 1.5)}" r="1.6" fill="#FFF7CC"/>`;
      o += sparkle(r1(w * 0.25), r1(h * 0.3), 3, '#FDE68A') + sparkle(r1(w * 0.76), r1(h * 0.24), 3.4, '#fff');
      return wrap(x, y, w, h, o);
    },
    // BÍ MẬT – Thiên hà Ngôn Từ
    'scene-galaxy': (x, y, w, h) => {
      const g = r1(h * 0.84);
      let o = sky(w, h, '#2E1A5E', '#5B3A9E');
      o += `<ellipse cx="${r1(w * 0.25)}" cy="${r1(h * 0.3)}" rx="${r1(w * 0.22)}" ry="16" fill="#F472B6" opacity=".22"/><ellipse cx="${r1(w * 0.72)}" cy="${r1(h * 0.42)}" rx="${r1(w * 0.25)}" ry="18" fill="#22D3EE" opacity=".18"/>`;
      o += stars(w, h, Math.round(w / 3.5), 0.85, 33);
      const gx = r1(w * 0.78), gy = r1(h * 0.16);
      o += `<g transform="translate(${gx} ${gy}) rotate(-20)"><ellipse rx="16" ry="5" fill="#C4B5FD" opacity=".5"/><ellipse rx="9" ry="3" fill="#E9D5FF" opacity=".8"/><circle r="2.6" fill="#fff"/></g>`;
      const L = ['A', 'B', 'C', 'Hi', '★'];
      const cols = ['#FDE68A', '#7FDBFF', '#F9A8D4', '#FFFFFF', '#FDE68A'];
      L.forEach((t, i) => {
        const lx = r1(w * (0.1 + i * 0.2)), ly = r1(h * (0.18 + (i % 2) * 0.22));
        o += `<text x="${lx}" y="${ly}" font-family="Fredoka, Nunito, Arial, sans-serif" font-weight="900" font-size="${i === 3 ? 9 : 11}" fill="${cols[i]}" text-anchor="middle" opacity=".9">${t}</text>`;
      });
      o += `<path d="M0 ${g} Q${r1(w * 0.5)} ${r1(g - 6)} ${w} ${g} L${w} ${h} L0 ${h} Z" fill="#7C5CC4"/><path d="M0 ${g} Q${r1(w * 0.5)} ${r1(g - 6)} ${w} ${g}" stroke="#C4B5FD" stroke-width="2" fill="none"/>`;
      [[0.1, 7], [0.3, 5], [0.72, 8], [0.9, 5]].forEach(([a, s]) => {
        const kx = r1(w * a), ky = r1(g + 4);
        o += `<polygon points="${r1(kx - s * 0.5)},${ky} ${kx},${r1(ky - s * 1.6)} ${r1(kx + s * 0.5)},${ky}" fill="#A5F3FC" stroke="#22D3EE" stroke-width=".8" opacity=".9"/>`;
      });
      o += sparkle(r1(w * 0.5), r1(h * 0.08), 3, '#fff') + sparkle(r1(w * 0.06), r1(h * 0.62), 2.4, '#FDE68A');
      return wrap(x, y, w, h, o);
    }
  };

  /* =========================================================
     DANH MỤC CỬA HÀNG (giá theo thang kinh tế mới)
     tier1 150–300 · tier2 400–900 · tier3 1000–2500 · tier4 3000–5000 / gold 20–40
     ========================================================= */
  const I = LG.ITEMS;
  const SECRET = (id, en, vi, milestone) => ({ id, en, vi, price: 0, secret: true, milestone });
  I.hat.push(
    { id: 'beanie-pompom', en: 'Pompom Beanie', vi: 'Mũ len quả bông', price: 180 },
    { id: 'hat-santa', en: 'Santa Hat', vi: 'Mũ ông già Noel', price: 250 },
    { id: 'top-hat', en: 'Top Hat', vi: 'Mũ chóp cao', price: 450 },
    { id: 'cap-graduation', en: 'Graduation Cap', vi: 'Mũ tốt nghiệp', price: 600 },
    { id: 'non-la', en: 'Conical Hat (Nón lá)', vi: 'Nón lá Việt Nam', price: 800 },
    { id: 'cap-pilot', en: 'Pilot Cap & Goggles', vi: 'Mũ phi công & kính', price: 1200 },
    { id: 'hair-rainbow', en: 'Rainbow Hair', vi: 'Tóc cầu vồng', price: 1800 },
    { id: 'hat-pharaoh', en: 'Pharaoh Headdress', vi: 'Mũ Pharaoh Ai Cập', price: 3500 },
    SECRET('hat-word-wizard', 'Word Wizard Hat', 'Mũ Phù thủy Ngôn từ', 30)
  );
  I.face.push(
    { id: 'sleepy', en: 'Sleepy', vi: 'Buồn ngủ', price: 150 },
    { id: 'mustache', en: 'Mustache', vi: 'Ria mép', price: 220 },
    { id: 'laughing', en: 'Laughing', vi: 'Cười sảng khoái', price: 280 },
    { id: 'star-eyes', en: 'Star Eyes', vi: 'Mắt ngôi sao', price: 900 }
  );
  I.torso.push(
    { id: 'torso-football', en: 'Football Kit', vi: 'Áo bóng đá số 10', price: 280 },
    { id: 'torso-rainbow', en: 'Rainbow Hoodie', vi: 'Áo hoodie cầu vồng', price: 300 },
    { id: 'torso-lab', en: 'Lab Coat', vi: 'Áo nhà khoa học', price: 650 },
    { id: 'torso-pilot', en: 'Pilot Jacket', vi: 'Áo khoác phi công', price: 1000 },
    { id: 'torso-astro-orange', en: 'Orange Flight Suit', vi: 'Bộ bay màu cam', price: 1500 },
    { id: 'torso-aodai', en: 'Red Áo Dài', vi: 'Áo dài đỏ hoa vàng', price: 2000 },
    { id: 'torso-wizard', en: 'Wizard Robe', vi: 'Áo choàng phù thủy', price: 3000 },
    { id: 'torso-dragon', en: 'Dragon Armor', vi: 'Giáp rồng có cánh', gold: 30 },
    SECRET('torso-superstar', 'Superstar Speaker Suit', 'Vest Siêu sao Hùng biện', 240)
  );
  I.legs.push(
    { id: 'legs-orange', en: 'Orange Pants', vi: 'Quần cam', price: 150 },
    { id: 'legs-sky', en: 'Sky Blue Pants', vi: 'Quần xanh da trời', price: 200 },
    { id: 'legs-camo', en: 'Olive Cargo Pants', vi: 'Quần túi hộp xanh rêu', price: 300 },
    { id: 'legs-silver', en: 'Silver Space Pants', vi: 'Quần bạc vũ trụ', price: 600 }
  );
  I.acc.push(
    { id: 'bubble-wand', en: 'Bubble Wand', vi: 'Que thổi bong bóng', price: 200 },
    { id: 'ukulele', en: 'Ukulele', vi: 'Đàn ukulele', price: 280 },
    { id: 'kite', en: 'Kite', vi: 'Con diều', price: 300 },
    { id: 'microphone', en: 'Microphone', vi: 'Micro hát hay', price: 700 },
    { id: 'telescope', en: 'Telescope', vi: 'Kính thiên văn', price: 900 },
    { id: 'star-lantern', en: 'Star Lantern', vi: 'Đèn ông sao', price: 1200 },
    { id: 'toy-robot', en: 'Toy Robot', vi: 'Robot đồ chơi', price: 2500 },
    { id: 'spell-book', en: 'Book of Spells', vi: 'Sách phép thuật', price: 4000 },
    SECRET('golden-mic', 'Golden Microphone', 'Micro Vàng', 5)
  );
  I.pet.push(
    { id: 'hamster', en: 'Hamster', vi: 'Chuột hamster', price: 300 },
    { id: 'penguin', en: 'Penguin', vi: 'Chim cánh cụt', price: 850 },
    { id: 'owl', en: 'Wise Owl', vi: 'Cú mèo thông thái', price: 900 },
    { id: 'fox', en: 'Little Fox', vi: 'Cáo nhỏ', price: 1400 },
    { id: 'koi-pond', en: 'Koi & Lotus Pond', vi: 'Hồ cá koi & hoa sen', price: 2200 },
    { id: 'baby-elephant', en: 'Baby Elephant', vi: 'Voi con', gold: 25 },
    SECRET('parrot-gold', 'Golden Talking Parrot', 'Vẹt Vàng biết nói', 15),
    SECRET('phoenix', 'Fire Phoenix', 'Phượng hoàng lửa', 480)
  );
  I.ride.push(
    { id: 'xich-lo', en: 'Cyclo (Xích lô)', vi: 'Xích lô Hà Nội', price: 900 },
    { id: 'sailboat', en: 'Sailboat', vi: 'Thuyền buồm', price: 1500 },
    { id: 'submarine', en: 'Yellow Submarine', vi: 'Tàu ngầm vàng', price: 2500 },
    { id: 'hot-air-balloon', en: 'Hot-Air Balloon', vi: 'Khinh khí cầu', price: 4500 },
    { id: 'hoverboard', en: 'Hoverboard', vi: 'Ván bay', gold: 35 },
    SECRET('rocket-board', 'Rocket Board', 'Ván trượt tên lửa', 120)
  );
  I.buddy.push(
    { id: 'buddy-footballer', en: 'Football Star', vi: 'Ngôi sao bóng đá', price: 800 },
    { id: 'buddy-scientist', en: 'Little Scientist', vi: 'Nhà khoa học nhí', price: 1200 },
    { id: 'buddy-pilot', en: 'Pilot Captain', vi: 'Cơ trưởng phi công', price: 1800 },
    { id: 'buddy-aodai', en: 'Áo Dài Friend', vi: 'Bạn mặc áo dài', price: 3000 },
    { id: 'buddy-word-wizard', en: 'Wizard of Words', vi: 'Phù thủy Ngôn từ', gold: 40 }
  );
  I.scene = [
    { id: 'none-scene', en: 'No Backdrop', vi: 'Không phông nền', price: 0 },
    { id: 'scene-park', en: 'City Park', vi: 'Công viên thành phố', price: 150 },
    { id: 'scene-beach', en: 'Sunny Beach', vi: 'Bãi biển nắng vàng', price: 250 },
    { id: 'scene-jungle', en: 'Jungle', vi: 'Rừng nhiệt đới', price: 300 },
    { id: 'scene-snow', en: 'Snowy Mountain', vi: 'Núi tuyết', price: 450 },
    { id: 'scene-underwater', en: 'Under the Sea', vi: 'Đáy đại dương', price: 700 },
    { id: 'scene-rainbow', en: 'Rainbow Land', vi: 'Xứ sở cầu vồng', price: 850 },
    { id: 'scene-castle', en: 'Fairy Castle', vi: 'Lâu đài cổ tích', price: 900 },
    { id: 'scene-halong', en: 'Hạ Long Bay', vi: 'Vịnh Hạ Long', price: 2000 },
    { id: 'scene-space', en: 'Outer Space', vi: 'Ngoài vũ trụ', price: 2500 },
    { id: 'scene-volcano', en: 'Volcano Island', vi: 'Đảo núi lửa', price: 3500 },
    SECRET('scene-stage', 'Superstar Stage', 'Sân khấu Siêu sao', 60),
    SECRET('scene-galaxy', 'Galaxy of Words', 'Thiên hà Ngôn từ', 900)
  ];

  // Độ hiếm cho đồ mới (thang giá mới). Đồ bí mật luôn là Huyền thoại.
  function tier2(it) {
    if (it.secret || it.gold) return 'legendary';
    if (it.price <= 300) return 'common';
    if (it.price <= 900) return 'rare';
    if (it.price <= 2500) return 'epic';
    return 'legendary';
  }
  Object.keys(I).forEach((cat) => I[cat].forEach((it) => {
    if (it.price === undefined) it.price = 0;
    if (!it.tier) it.tier = tier2(it);
  }));

  LG.SCENES = SCENES;
})(window);
