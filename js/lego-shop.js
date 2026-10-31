/* =========================================================
   lego-shop.js – Cửa hàng LEGO mở rộng cho nhân vật của bé
   - Thêm mũ, khuôn mặt, trang phục, quần, phụ kiện mới (giá cao hơn, có độ hiếm)
   - 3 nhóm mới: 🐶 Thú cưng (pet), 🛹 Xe (ride), 🧑‍🤝‍🧑 Bạn đồng hành (buddy)
   - Đồ Huyền thoại mua bằng 🥇 Gold Brick (kiếm được khi học giỏi, nói tốt)
   - renderScene(): nhân vật + bạn đồng hành + xe + thú cưng trong một khung hình
   Nạp SAU lego-svg.js.
   ========================================================= */
(function (global) {
  'use strict';
  const LG = global.LegoSvg;
  const { HATS, FACES, TORSOS, LEGS, ACCS } = LG.PARTS;
  const C = LG.COLORS;

  /* ---------------- Độ hiếm (theo giá) ---------------- */
  const TIERS = {
    common: { en: 'Common', vi: 'Thường', color: '#64748B' },
    rare: { en: 'Rare', vi: 'Hiếm', color: '#0284C7' },
    epic: { en: 'Epic', vi: 'Sử thi', color: '#7C3AED' },
    legendary: { en: 'Legendary', vi: 'Huyền thoại', color: '#D97706' },
    secret: { en: 'Secret', vi: 'Bí mật', color: '#DB2777' }
  };
  /* Kinh tế xu v1.8: giá cao hơn (×5) để đồ có giá trị, chia 4 tầng; tầng sau ẩn ❓ cho tới khi mua đủ món tầng trước */
  function tierOf(it) {
    if (it.secret) return 'secret';
    if (it.gold) return 'legendary';
    if (it.price <= 300) return 'common';
    if (it.price <= 900) return 'rare';
    if (it.price <= 2500) return 'epic';
    return 'legendary';
  }
  const TIER_NUM = { common: 1, rare: 2, epic: 3, legendary: 4 };

  /* ---------------- Mũ & tóc mới ---------------- */
  const HAIR = `<path d="M14 33 C13 14 20 8 30 8 C40 8 47 14 46 33 L42.5 31 C43 22 38 19 30 19 C25 19 22 21 19 24 L17.5 31 Z" fill="#6B3A12" stroke="#4A260A"/>`;
  Object.assign(HATS, {
    'party-hat': { front: HAIR + `<polygon points="20,17 30,-1 40,17" fill="${C.AZ}" stroke="${C.BLU}"/><circle cx="27" cy="9" r="1.6" fill="${C.YEL}"/><circle cx="33" cy="12" r="1.6" fill="${C.RED}"/><circle cx="30" cy="4.5" r="1.4" fill="${C.GRN}"/><circle cx="30" cy="-0.5" r="2.4" fill="${C.ORG}"/>` },
    headphones: { front: `<path d="M14 33 C13 14 20 8 30 8 C40 8 47 14 46 33 L42.5 31 C43 22 38 19 30 19 C25 19 22 21 19 24 L17.5 31 Z" fill="${C.BLK}"/><path d="M13 28 Q13 3 30 3 Q47 3 47 28" stroke="${C.RED}" stroke-width="3.4" fill="none"/><rect x="9" y="22" width="8" height="13" rx="3" fill="${C.RED}" stroke="${C.DRED}"/><rect x="43" y="22" width="8" height="13" rx="3" fill="${C.RED}" stroke="${C.DRED}"/>` },
    'bunny-ears': { front: `<ellipse cx="22" cy="6" rx="4.5" ry="9" fill="${C.WHT}" stroke="#CBD5E1" transform="rotate(-12 22 6)"/><ellipse cx="38" cy="6" rx="4.5" ry="9" fill="${C.WHT}" stroke="#CBD5E1" transform="rotate(12 38 6)"/><ellipse cx="22" cy="7" rx="2" ry="6" fill="#F7A1C4" transform="rotate(-12 22 7)"/><ellipse cx="38" cy="7" rx="2" ry="6" fill="#F7A1C4" transform="rotate(12 38 7)"/><path d="M14 31 C13 15 20 11 30 11 C40 11 47 15 46 31 L43 29 C43 22 38 20 30 20 C22 20 17 22 17 29 Z" fill="${C.WHT}" stroke="#CBD5E1"/>` },
    'hat-cowboy': { front: `<ellipse cx="30" cy="22" rx="23" ry="4.5" fill="#8B5A2B" stroke="#5E3A17"/><path d="M18 22 Q18 6 30 7 Q42 6 42 22 Z" fill="#A0652F" stroke="#5E3A17"/><path d="M18.5 18 L41.5 18" stroke="${C.RED}" stroke-width="2.4"/>` },
    'hat-pirate': { front: `<path d="M9 23 Q14 6 30 6 Q46 6 51 23 Q30 16 9 23 Z" fill="${C.BLK}" stroke="#111"/><path d="M12 21 Q30 14 48 21" stroke="#E3B400" stroke-width="1.6" fill="none"/><circle cx="30" cy="12" r="3" fill="#fff"/><rect x="28.3" y="14" width="3.4" height="2" fill="#fff"/><circle cx="29" cy="11.6" r=".7" fill="${C.BLK}"/><circle cx="31" cy="11.6" r=".7" fill="${C.BLK}"/>` },
    'helmet-viking': { front: `<path d="M15 18 Q5 14 6 2 Q11 12 17 13 Z" fill="${C.WHT}" stroke="#CBD5E1"/><path d="M45 18 Q55 14 54 2 Q49 12 43 13 Z" fill="${C.WHT}" stroke="#CBD5E1"/><path d="M14 26 Q14 8 30 8 Q46 8 46 26 Z" fill="${C.LGRY}" stroke="${C.DGRY}"/><rect x="13" y="23" width="34" height="4" rx="1" fill="${C.MGRY}"/><rect x="28.5" y="8" width="3" height="16" fill="${C.MGRY}"/>` },
    'crown-diamond': { front: `<polygon points="15,20 15,6 21,11.5 26,2 30,10 34,2 39,11.5 45,6 45,20" fill="#FFE066" stroke="#B08A00"/><polygon points="30,12 33,15.5 30,19 27,15.5" fill="#7FDBFF" stroke="#0284C7"/><circle cx="21" cy="16" r="2" fill="#F472B6"/><circle cx="39" cy="16" r="2" fill="#4ADE80"/><path d="M48 4 l1.2 2.6 2.6 1.2 -2.6 1.2 -1.2 2.6 -1.2 -2.6 -2.6 -1.2 2.6 -1.2 Z" fill="#fff"/><path d="M11 9 l.9 1.9 1.9 .9 -1.9 .9 -.9 1.9 -.9 -1.9 -1.9 -.9 1.9 -.9 Z" fill="#fff"/>` }
  });

  /* ---------------- Khuôn mặt mới ---------------- */
  Object.assign(FACES, {
    'heart-eyes': `<path d="M25 31 L21.4 27.4 A2.1 2.1 0 0 1 25 25 A2.1 2.1 0 0 1 28.6 27.4 Z" fill="${C.RED}"/><path d="M35 31 L31.4 27.4 A2.1 2.1 0 0 1 35 25 A2.1 2.1 0 0 1 38.6 27.4 Z" fill="${C.RED}"/><path d="M24 34.5 Q30 40 36 34.5" stroke="#1B1B1B" stroke-width="1.7" fill="none" stroke-linecap="round"/>`,
    tongue: `<ellipse cx="25" cy="27.5" rx="1.7" ry="2.3" fill="#1B1B1B"/><ellipse cx="35" cy="27.5" rx="1.7" ry="2.3" fill="#1B1B1B"/><path d="M23 33 Q30 40 37 33 Z" fill="#1B1B1B"/><ellipse cx="30" cy="37" rx="3" ry="2.6" fill="#F472B6"/>`
  });

  /* ---------------- Trang phục mới ---------------- */
  Object.assign(TORSOS, {
    'torso-vn': { c: '#DA251D', deco: `<polygon points="30,51 32.9,59.5 41.8,59.6 34.7,64.9 37.3,73.4 30,68.3 22.7,73.4 25.3,64.9 18.2,59.6 27.1,59.5" fill="#FFCD00"/>` },
    'torso-police': { c: '#1E3A8A', deco: `<polygon points="28,46 32,46 31.5,66 30,69 28.5,66" fill="${C.BLK}"/><polygon points="38,53 42,53 43.5,57 40,61 36.5,57" fill="${C.YEL}"/><rect x="17" y="52" width="8" height="5" rx="1" fill="#93C5FD"/>` },
    'torso-doctor': { c: C.WHT, deco: `<line x1="30" y1="47" x2="30" y2="80" stroke="#CBD5E1" stroke-width="1.4"/><path d="M22 47 Q19 62 27 64 Q35 62 34 50" stroke="${C.BLK}" stroke-width="1.6" fill="none"/><circle cx="27" cy="65" r="2.4" fill="${C.LGRY}"/><path d="M37 62 h7 M40.5 58.5 v7" stroke="${C.RED}" stroke-width="2.2"/>` },
    'torso-pirate': { c: C.WHT, deco: `<polygon points="14,46 22,46 26,80 8,80" fill="${C.BLK}"/><polygon points="46,46 38,46 34,80 52,80" fill="${C.BLK}"/><path d="M26 50 L34 50 M26 55 L34 55 M26 60 L34 60" stroke="${C.RED}" stroke-width="1.6"/><rect x="10" y="70" width="40" height="5" fill="${C.DRED}"/><rect x="27" y="69" width="6" height="7" fill="${C.YEL}"/>` },
    'torso-princess': { c: '#F7A1C4', deco: `<path d="M20 47 Q30 56 40 47" stroke="${C.YEL}" stroke-width="2" fill="none"/><circle cx="30" cy="54" r="2.4" fill="${C.PURP}"/><polygon points="8,80 52,80 49,71 11,71" fill="#E879B0"/><circle cx="18" cy="76" r="1.4" fill="#fff"/><circle cx="30" cy="76" r="1.4" fill="#fff"/><circle cx="42" cy="76" r="1.4" fill="#fff"/>` },
    'torso-dino': {
      c: C.TGRN,
      back: `<polygon points="10,52 14,40 19,48" fill="${C.ORG}"/><polygon points="41,48 46,40 50,52" fill="${C.ORG}"/><path d="M50 74 Q66 80 70 96 Q60 88 48 84 Z" fill="${C.TGRN}" stroke="#3F7A26"/>`,
      deco: `<ellipse cx="30" cy="66" rx="10" ry="12" fill="#C8E6A0"/><path d="M22 60 h16 M21.5 66 h17 M23 72 h14" stroke="#9BC46A" stroke-width="1.2"/>`
    },
    'torso-hero': {
      c: C.BLU,
      back: `<path d="M13 47 L47 47 L60 118 L0 118 Z" fill="${C.RED}" stroke="${C.DRED}"/>`,
      deco: `<polygon points="30,50 40,57.5 30,70 20,57.5" fill="${C.YEL}" stroke="${C.RED}" stroke-width="1.4"/><path d="M33.5 55 Q27 53.5 26.5 57 Q27 59.5 31 60 Q34 61 33 63.5 Q30 66 26 64" stroke="${C.RED}" stroke-width="2" fill="none" stroke-linecap="round"/><rect x="9" y="74" width="42" height="5" fill="${C.RED}"/>`
    },
    'torso-gold': { c: '#E3B400', deco: `<path d="M18 49 L42 49 L40 70 Q30 78 20 70 Z" fill="#FFD84D" stroke="#B08A00"/><polygon points="30,53 32.4,58.6 38.4,58.8 33.8,62.6 35.4,68.4 30,65 24.6,68.4 26.2,62.6 21.6,58.8 27.6,58.6" fill="#FFF7CC"/><path d="M14 50 L20 50" stroke="#fff" stroke-width="2" opacity=".6"/>` }
  });

  Object.assign(LEGS, { 'legs-purple': '#7E3FB0', 'legs-pink': '#F28DB8', 'legs-gold': '#E3B400' });

  /* ---------------- Phụ kiện mới (cầm ở tay phải) ---------------- */
  Object.assign(ACCS, {
    'ice-cream': `<polygon points="53,72 63,72 58,88" fill="#D9A55B" stroke="#A8742F"/><circle cx="58" cy="68" r="6" fill="#F7A1C4"/><circle cx="58" cy="61" r="4.6" fill="#FFF3C4"/><circle cx="58" cy="56.5" r="2" fill="${C.RED}"/>`,
    balloon: `<path d="M55 76 Q60 60 62 41" stroke="${C.DGRY}" stroke-width="1" fill="none"/><ellipse cx="62" cy="30" rx="9" ry="11" fill="${C.RED}"/><polygon points="60,40.5 64,40.5 62,43" fill="${C.DRED}"/><ellipse cx="59" cy="26" rx="2.4" ry="3.6" fill="#fff" opacity=".5"/>`,
    paintbrush: `<line x1="54" y1="84" x2="63" y2="57" stroke="${C.BRN}" stroke-width="3" stroke-linecap="round"/><rect x="61" y="53" width="5" height="5" fill="${C.LGRY}" transform="rotate(18 63 55)"/><path d="M62 53 Q64 44 68 46 Q67 51 65 54 Z" fill="${C.GRN}"/>`,
    umbrella: `<line x1="56" y1="80" x2="56" y2="36" stroke="${C.BLK}" stroke-width="2"/><path d="M56 80 q0 4 -4 4" stroke="${C.BLK}" stroke-width="2" fill="none"/><path d="M40 37 Q56 13 72 37 Q68 33 64 37 Q60 33 56 37 Q52 33 48 37 Q44 33 40 37 Z" fill="${C.AZ}" stroke="${C.BLU}"/>`,
    trophy: `<path d="M50 60 h16 v6 q0 9 -8 10 q-8 -1 -8 -10 Z" fill="${C.YEL}" stroke="#B08A00"/><path d="M50 62 q-5 0 -4 5 q1 4 5 4" stroke="#B08A00" stroke-width="1.6" fill="none"/><path d="M66 62 q5 0 4 5 q-1 4 -5 4" stroke="#B08A00" stroke-width="1.6" fill="none"/><rect x="55.5" y="76" width="5" height="5" fill="#B08A00"/><rect x="51" y="81" width="14" height="4" rx="1" fill="${C.BRN}"/>`,
    'magic-wand': `<line x1="54" y1="80" x2="61" y2="53" stroke="${C.BLK}" stroke-width="2.6" stroke-linecap="round"/><polygon points="62,41 64.4,47.6 71,47.6 65.6,51.6 67.6,58 62,54 56.4,58 58.4,51.6 53,47.6 59.6,47.6" fill="${C.YEL}" stroke="#B08A00"/><circle cx="68" cy="40" r="1.2" fill="#fff"/><circle cx="56" cy="42" r="1" fill="#fff"/>`
  });

  /* ---------------- 🐶 Thú cưng (khung 64×52, chạm đất y=52) ---------------- */
  const PETS = {
    'none-pet': '',
    goldfish: `<path d="M8 22 Q8 52 32 52 Q56 52 56 22 Z" fill="#BFE6FF" fill-opacity=".75" stroke="#7DB8DE" stroke-width="1.5"/><ellipse cx="32" cy="22" rx="24" ry="4" fill="#E0F4FF" stroke="#7DB8DE" stroke-width="1.5"/><path d="M10 34 Q32 30 54 34 L54 40 Q32 52 10 40 Z" fill="#7CC4F2" opacity=".5"/><ellipse cx="30" cy="38" rx="9" ry="6" fill="${C.ORG}"/><polygon points="38,38 46,32 46,44" fill="${C.ORG}"/><circle cx="25" cy="36.5" r="1.4" fill="${C.BLK}"/><circle cx="20" cy="28" r="1.4" fill="#fff" stroke="#7DB8DE" stroke-width=".6"/><circle cx="17" cy="24" r="1" fill="#fff" stroke="#7DB8DE" stroke-width=".6"/>`,
    bunny: `<ellipse cx="26" cy="38" rx="16" ry="12" fill="${C.WHT}" stroke="#CBD5E1"/><circle cx="11" cy="38" r="4" fill="#fff" stroke="#CBD5E1"/><circle cx="42" cy="28" r="10" fill="${C.WHT}" stroke="#CBD5E1"/><ellipse cx="38" cy="10" rx="3.6" ry="10" fill="${C.WHT}" stroke="#CBD5E1" transform="rotate(-10 38 10)"/><ellipse cx="46" cy="10" rx="3.6" ry="10" fill="${C.WHT}" stroke="#CBD5E1" transform="rotate(12 46 10)"/><ellipse cx="38" cy="11" rx="1.5" ry="7" fill="#F7A1C4" transform="rotate(-10 38 11)"/><ellipse cx="46" cy="11" rx="1.5" ry="7" fill="#F7A1C4" transform="rotate(12 46 11)"/><circle cx="46" cy="27" r="1.8" fill="${C.BLK}"/><circle cx="51" cy="31" r="1.6" fill="#F472B6"/><rect x="18" y="46" width="8" height="6" rx="3" fill="#fff" stroke="#CBD5E1"/><rect x="32" y="46" width="8" height="6" rx="3" fill="#fff" stroke="#CBD5E1"/>`,
    kitten: `<rect x="8" y="30" width="30" height="14" rx="7" fill="#FF9F43" stroke="#C46B12"/><rect x="11" y="42" width="5" height="10" rx="2" fill="#FF9F43" stroke="#C46B12"/><rect x="30" y="42" width="5" height="10" rx="2" fill="#FF9F43" stroke="#C46B12"/><path d="M9 34 Q0 28 6 14" stroke="#C46B12" stroke-width="4" fill="none" stroke-linecap="round"/><polygon points="35,18 36,5 43,13" fill="#FF9F43" stroke="#C46B12"/><polygon points="53,18 52,5 45,13" fill="#FF9F43" stroke="#C46B12"/><circle cx="44" cy="23" r="11" fill="#FF9F43" stroke="#C46B12"/><path d="M38 14 l2 5 M44 12.5 v5 M50 14 l-2 5" stroke="#C46B12" stroke-width="1.4"/><circle cx="40" cy="23" r="1.8" fill="${C.BLK}"/><circle cx="48" cy="23" r="1.8" fill="${C.BLK}"/><polygon points="43,27 45,27 44,28.5" fill="#E879B0"/><path d="M38 28 h-7 M38 30 l-6 2 M50 28 h7 M50 30 l6 2" stroke="#7C4A1E" stroke-width=".8"/>`,
    puppy: `<path d="M10 32 Q2 26 5 17" stroke="#8B5A2B" stroke-width="4" fill="none" stroke-linecap="round"/><rect x="10" y="27" width="34" height="16" rx="7" fill="#C68642" stroke="#8B5A2B"/><rect x="13" y="41" width="6" height="11" rx="2" fill="#C68642" stroke="#8B5A2B"/><rect x="34" y="41" width="6" height="11" rx="2" fill="#C68642" stroke="#8B5A2B"/><rect x="34" y="8" width="22" height="21" rx="7" fill="#C68642" stroke="#8B5A2B"/><rect x="47" y="18" width="12" height="9" rx="4" fill="#E8C08A"/><circle cx="57.5" cy="19.5" r="2.2" fill="${C.BLK}"/><circle cx="45" cy="15" r="2" fill="${C.BLK}"/><path d="M36 9 Q30 13 32 26 Q38 21 40 10 Z" fill="#7C4A1E"/><path d="M53 28 q2 4 -1 6" stroke="${C.RED}" stroke-width="2.4" fill="none" stroke-linecap="round"/><rect x="33" y="27" width="12" height="3" rx="1.5" fill="${C.RED}"/><circle cx="39" cy="31" r="1.8" fill="${C.YEL}"/>`,
    turtle: `<path d="M8 44 Q10 22 30 22 Q50 22 52 44 Z" fill="#4A8A2E" stroke="#2F5E1C"/><path d="M22 26 l8 6 8 -6 M18 36 l12 -4 12 4 M30 32 v12" stroke="#2F5E1C" stroke-width="1.6" fill="none"/><rect x="6" y="42" width="48" height="5" rx="2.5" fill="#86C06A"/><circle cx="56" cy="36" r="7" fill="#86C06A" stroke="#4A8A2E"/><circle cx="58" cy="34" r="1.5" fill="${C.BLK}"/><rect x="12" y="46" width="8" height="6" rx="2" fill="#86C06A" stroke="#4A8A2E"/><rect x="40" y="46" width="8" height="6" rx="2" fill="#86C06A" stroke="#4A8A2E"/>`,
    parrot: `<rect x="28" y="42" width="4" height="10" fill="${C.BRN}"/><rect x="14" y="40" width="32" height="4" rx="2" fill="${C.BRN}"/><path d="M24 40 Q18 30 22 16 Q28 6 36 10 Q42 16 38 30 Q36 38 32 40 Z" fill="${C.GRN}" stroke="${C.DGRN}"/><path d="M26 22 Q20 32 26 40" stroke="${C.BLU}" stroke-width="5" fill="none" stroke-linecap="round"/><path d="M30 40 L26 52 L34 44 Z" fill="${C.RED}"/><circle cx="33" cy="15" r="2" fill="#fff"/><circle cx="33.5" cy="15" r="1" fill="${C.BLK}"/><path d="M37 13 Q46 14 41 22 Q40 18 37 18 Z" fill="${C.YEL}" stroke="#B08A00"/><path d="M24 12 Q22 4 28 4" stroke="${C.RED}" stroke-width="3" fill="none" stroke-linecap="round"/>`,
    panda: `<ellipse cx="28" cy="38" rx="18" ry="13" fill="${C.WHT}" stroke="#CBD5E1"/><rect x="14" y="42" width="9" height="10" rx="3" fill="${C.BLK}"/><rect x="33" y="42" width="9" height="10" rx="3" fill="${C.BLK}"/><path d="M14 30 Q12 40 20 42 L22 32 Z" fill="${C.BLK}"/><circle cx="42" cy="22" r="13" fill="${C.WHT}" stroke="#CBD5E1"/><circle cx="32" cy="11" r="4.5" fill="${C.BLK}"/><circle cx="52" cy="11" r="4.5" fill="${C.BLK}"/><ellipse cx="37" cy="22" rx="3.6" ry="4.4" fill="${C.BLK}" transform="rotate(-20 37 22)"/><ellipse cx="47" cy="22" rx="3.6" ry="4.4" fill="${C.BLK}" transform="rotate(20 47 22)"/><circle cx="37.5" cy="21.5" r="1.2" fill="#fff"/><circle cx="46.5" cy="21.5" r="1.2" fill="#fff"/><ellipse cx="42" cy="28" rx="2.2" ry="1.5" fill="${C.BLK}"/><path d="M52 38 l8 -12" stroke="#4ADE80" stroke-width="3" stroke-linecap="round"/><path d="M58 28 l4 -3 M56 31 l5 0" stroke="#22C55E" stroke-width="2" stroke-linecap="round"/>`,
    'robo-dog': `<rect x="8" y="26" width="36" height="16" rx="3" fill="${C.LGRY}" stroke="${C.DGRY}"/><rect x="14" y="30" width="18" height="6" rx="2" fill="${C.AZ}"/><rect x="11" y="42" width="7" height="10" rx="1" fill="${C.DGRY}"/><rect x="34" y="42" width="7" height="10" rx="1" fill="${C.DGRY}"/><path d="M8 30 L2 20" stroke="${C.DGRY}" stroke-width="3" stroke-linecap="round"/><circle cx="2" cy="19" r="2.4" fill="${C.RED}"/><rect x="36" y="8" width="22" height="20" rx="4" fill="${C.WHT}" stroke="${C.DGRY}"/><rect x="40" y="13" width="15" height="7" rx="3" fill="${C.BLK}"/><circle cx="44" cy="16.5" r="2" fill="#4FC3F7"/><circle cx="51" cy="16.5" r="2" fill="#4FC3F7"/><polygon points="38,8 40,0 44,8" fill="${C.LGRY}" stroke="${C.DGRY}"/><polygon points="50,8 54,0 56,8" fill="${C.LGRY}" stroke="${C.DGRY}"/><rect x="43" y="23" width="9" height="2" rx="1" fill="${C.DGRY}"/>`,
    'baby-dragon': `<path d="M10 40 Q0 40 2 28 Q6 34 12 34" fill="#22C55E" stroke="#15803D"/><path d="M20 30 Q14 10 26 6 Q24 18 30 24 Z" fill="#86EFAC" stroke="#15803D"/><ellipse cx="28" cy="38" rx="17" ry="12" fill="#22C55E" stroke="#15803D"/><ellipse cx="30" cy="42" rx="9" ry="7" fill="#FDE68A"/><rect x="16" y="45" width="8" height="7" rx="3" fill="#22C55E" stroke="#15803D"/><rect x="32" y="45" width="8" height="7" rx="3" fill="#22C55E" stroke="#15803D"/><circle cx="46" cy="22" r="11" fill="#22C55E" stroke="#15803D"/><polygon points="40,13 41,4 45,12" fill="${C.YEL}"/><polygon points="49,12 53,4 53,14" fill="${C.YEL}"/><circle cx="49" cy="20" r="2.6" fill="#fff"/><circle cx="49.6" cy="20" r="1.4" fill="${C.BLK}"/><circle cx="54" cy="26" r=".9" fill="#15803D"/><path d="M57 26 Q62 24 63 28 Q60 27 58 29" fill="${C.ORG}"/>`,
    unicorn: `<path d="M8 30 Q0 34 4 46 Q8 38 12 36" fill="#F472B6"/><ellipse cx="28" cy="34" rx="18" ry="11" fill="${C.WHT}" stroke="#CBD5E1"/><rect x="13" y="40" width="6" height="12" rx="2" fill="${C.WHT}" stroke="#CBD5E1"/><rect x="36" y="40" width="6" height="12" rx="2" fill="${C.WHT}" stroke="#CBD5E1"/><rect x="13" y="49" width="6" height="3" fill="#C4B5FD"/><rect x="36" y="49" width="6" height="3" fill="#C4B5FD"/><path d="M38 28 L44 10 L56 14 L58 24 L50 26 L46 32 Z" fill="${C.WHT}" stroke="#CBD5E1"/><polygon points="47,11 50,-2 52,12" fill="#FFD84D" stroke="#B08A00"/><path d="M42 12 Q34 16 36 26" stroke="#F472B6" stroke-width="3" fill="none"/><path d="M44 11 Q38 18 40 26" stroke="#60A5FA" stroke-width="3" fill="none"/><path d="M40 14 Q33 22 38 30" stroke="#FACC15" stroke-width="3" fill="none"/><circle cx="51" cy="17" r="1.6" fill="${C.BLK}"/><circle cx="55" cy="21" r="1" fill="#F9A8D4"/>`
  };

  /* ---------------- 🛹 Xe (khung 84×62, chạm đất y=62) ---------------- */
  const wheel = (x, y, r) => `<circle cx="${x}" cy="${y}" r="${r}" fill="${C.BLK}"/><circle cx="${x}" cy="${y}" r="${r * 0.45}" fill="${C.LGRY}"/>`;
  const RIDES = {
    'none-ride': '',
    skateboard: `<path d="M6 50 Q10 54 16 54 L68 54 Q74 54 78 50" stroke="${C.ORG}" stroke-width="5" fill="none" stroke-linecap="round"/><path d="M20 52 L64 52" stroke="#fff" stroke-width="1.2" stroke-dasharray="4 3"/>${wheel(22, 58, 4)}${wheel(62, 58, 4)}`,
    bicycle: `${wheel(18, 48, 13)}${wheel(66, 48, 13)}<circle cx="18" cy="48" r="11" fill="none" stroke="${C.DGRY}" stroke-width="1"/><circle cx="66" cy="48" r="11" fill="none" stroke="${C.DGRY}" stroke-width="1"/><path d="M18 48 L34 28 L58 28 L66 48 M34 28 L42 48 L58 28 M42 48 L18 48" stroke="${C.RED}" stroke-width="3.4" fill="none" stroke-linejoin="round"/><path d="M58 28 L56 18 L64 16" stroke="${C.DGRY}" stroke-width="3" fill="none" stroke-linecap="round"/><rect x="27" y="22" width="14" height="4" rx="2" fill="${C.BLK}"/><circle cx="42" cy="48" r="4" fill="${C.DGRY}"/><rect x="58" y="34" width="10" height="8" rx="2" fill="${C.BRN}" opacity=".85"/>`,
    scooter: `${wheel(16, 52, 9)}${wheel(68, 52, 9)}<path d="M8 50 Q6 34 22 32 L34 32 L36 44 L60 44 Q62 30 70 26 L76 26 Q80 40 76 50 Z" fill="#2DD4BF" stroke="#0F766E"/><rect x="22" y="26" width="18" height="6" rx="3" fill="${C.BRN}"/><path d="M70 26 L68 10 M62 10 L74 10" stroke="${C.DGRY}" stroke-width="3" stroke-linecap="round"/><circle cx="77" cy="34" r="3" fill="${C.YEL}"/><rect x="44" y="36" width="12" height="8" rx="2" fill="#99F6E4"/>`,
    'go-kart': `${wheel(16, 52, 10)}${wheel(68, 52, 10)}<path d="M4 50 L8 38 L30 36 L38 26 L58 26 L64 38 L80 40 L80 50 Z" fill="${C.RED}" stroke="${C.DRED}"/><rect x="40" y="30" width="16" height="8" rx="2" fill="${C.BLK}"/><path d="M58 26 L54 14" stroke="${C.DGRY}" stroke-width="3"/><circle cx="54" cy="14" r="5" fill="none" stroke="${C.BLK}" stroke-width="2.4"/><circle cx="22" cy="43" r="6" fill="#fff"/><text x="22" y="46.5" font-size="9" font-weight="900" text-anchor="middle" fill="${C.RED}" font-family="Arial">7</text><rect x="2" y="30" width="12" height="4" rx="1" fill="${C.YEL}"/>`,
    jeep: `${wheel(18, 50, 11)}${wheel(66, 50, 11)}<path d="M4 50 L4 30 L18 28 L24 14 L56 14 L56 28 L80 30 L80 50 Z" fill="${C.OGRN}" stroke="#2F5E1C"/><rect x="28" y="18" width="11" height="9" rx="1" fill="${C.GLASS}"/><rect x="42" y="18" width="11" height="9" rx="1" fill="${C.GLASS}"/><rect x="2" y="36" width="80" height="5" fill="${C.TAN}"/><circle cx="78" cy="33" r="2.6" fill="${C.YEL}"/><rect x="62" y="8" width="16" height="4" rx="1" fill="${C.DGRY}"/><circle cx="66" cy="10" r="2" fill="${C.YEL}"/><circle cx="74" cy="10" r="2" fill="${C.YEL}"/>`,
    'race-car': `${wheel(16, 52, 10)}${wheel(70, 52, 10)}<path d="M2 50 L2 40 L20 36 L32 28 L48 28 L56 36 L84 40 L84 50 Z" fill="${C.BLU}" stroke="#004A80"/><rect x="0" y="24" width="10" height="16" rx="1" fill="${C.BLU}" stroke="#004A80"/><rect x="0" y="22" width="14" height="4" fill="${C.BLK}"/><path d="M34 30 L46 30 L50 36 L32 36 Z" fill="${C.GLASS}"/><path d="M20 44 L80 44" stroke="${C.YEL}" stroke-width="3"/><circle cx="62" cy="40" r="5" fill="#fff"/><text x="62" y="43.5" font-size="8" font-weight="900" text-anchor="middle" fill="${C.BLU}" font-family="Arial">1</text>`,
    rocket: `<path d="M30 54 L24 62 L36 58 Z" fill="${C.ORG}"/><path d="M42 54 L48 62 L36 58 Z" fill="${C.ORG}"/><path d="M30 56 Q36 66 42 56 Z" fill="${C.YEL}"/><path d="M36 0 Q50 14 48 50 L24 50 Q22 14 36 0 Z" fill="${C.WHT}" stroke="${C.LGRY}"/><path d="M36 0 Q44 7 46 14 L26 14 Q28 7 36 0 Z" fill="${C.RED}"/><circle cx="36" cy="26" r="6" fill="${C.GLASS}" stroke="${C.BLU}" stroke-width="2"/><path d="M24 36 L14 52 L24 50 Z M48 36 L58 52 L48 50 Z" fill="${C.RED}" stroke="${C.DRED}"/><rect x="26" y="50" width="20" height="5" rx="1" fill="${C.DGRY}"/><text x="36" y="45" font-size="6" font-weight="900" text-anchor="middle" fill="${C.BLU}" font-family="Arial">LEB</text>`
  };

  /* ---------------- 🧑‍🤝‍🧑 Bạn đồng hành (minifig thu nhỏ, hoặc robot) ---------------- */
  const BUDDIES = {
    'none-buddy': null,
    'buddy-hero': 'hair-brown|determined|torso-hero|legs-blue|none',
    'buddy-pirate': 'hat-pirate|grin|torso-pirate|legs-black|sword',
    'buddy-astro': 'helmet-astro|grin|torso-astro|legs-white|flag',
    'buddy-princess': 'crown|smile|torso-princess|legs-pink|magic-wand',
    'buddy-ninja': 'hood-ninja|determined|torso-ninja|legs-black|lightsaber',
    'buddy-wizard': 'hat-wizard|wink|torso-stars|legs-purple|magic-wand',
    'buddy-dino': 'hair-brown|tongue|torso-dino|legs-green|none',
    'buddy-robot': 'ROBOT'
  };
  const ROBOT = `<rect x="12" y="84" width="14" height="34" rx="2" fill="${C.LGRY}" stroke="${C.DGRY}"/><rect x="34" y="84" width="14" height="34" rx="2" fill="${C.LGRY}" stroke="${C.DGRY}"/><rect x="8" y="114" width="20" height="7" rx="2" fill="${C.DGRY}"/><rect x="32" y="114" width="20" height="7" rx="2" fill="${C.DGRY}"/><rect x="2" y="50" width="8" height="26" rx="3" fill="${C.LGRY}" stroke="${C.DGRY}"/><rect x="50" y="50" width="8" height="26" rx="3" fill="${C.LGRY}" stroke="${C.DGRY}"/><circle cx="6" cy="80" r="4.5" fill="${C.DGRY}"/><circle cx="54" cy="80" r="4.5" fill="${C.DGRY}"/><rect x="10" y="46" width="40" height="40" rx="5" fill="${C.WHT}" stroke="${C.DGRY}"/><rect x="17" y="54" width="26" height="16" rx="3" fill="${C.BLK}"/><rect x="20" y="58" width="5" height="8" fill="#4ADE80"/><rect x="27.5" y="61" width="5" height="5" fill="#FACC15"/><rect x="35" y="56" width="5" height="10" fill="#F87171"/><circle cx="20" cy="78" r="2.5" fill="${C.RED}"/><circle cx="30" cy="78" r="2.5" fill="${C.YEL}"/><circle cx="40" cy="78" r="2.5" fill="${C.BLU}"/><rect x="25" y="40" width="10" height="7" fill="${C.DGRY}"/><rect x="13" y="12" width="34" height="29" rx="6" fill="${C.LGRY}" stroke="${C.DGRY}"/><rect x="17" y="19" width="26" height="12" rx="6" fill="${C.BLK}"/><circle cx="24" cy="25" r="3.4" fill="#4FC3F7"/><circle cx="36" cy="25" r="3.4" fill="#4FC3F7"/><rect x="24" y="34" width="12" height="2.4" rx="1.2" fill="${C.DGRY}"/><line x1="30" y1="12" x2="30" y2="3" stroke="${C.DGRY}" stroke-width="2"/><circle cx="30" cy="2.5" r="3" fill="${C.RED}"/>`;
  function buddyInner(id) {
    const b = BUDDIES[id];
    if (!b) return '';
    // Chuỗi bắt đầu bằng "<" là figure SVG vẽ sẵn (lego-shop3.js)
    return b === 'ROBOT' ? ROBOT : b.charAt(0) === '<' ? b : LG.minifigInner(b);
  }

  /* ---------------- Danh mục cửa hàng ---------------- */
  const I = LG.ITEMS;
  I.hat.push(
    { id: 'party-hat', en: 'Party Hat', vi: 'Mũ tiệc', price: 60 },
    { id: 'headphones', en: 'DJ Headphones', vi: 'Tai nghe DJ', price: 90 },
    { id: 'bunny-ears', en: 'Bunny Ears', vi: 'Tai thỏ', price: 90 },
    { id: 'hat-cowboy', en: 'Cowboy Hat', vi: 'Mũ cao bồi', price: 120 },
    { id: 'hat-pirate', en: 'Pirate Hat', vi: 'Mũ cướp biển', price: 150 },
    { id: 'helmet-viking', en: 'Viking Helmet', vi: 'Mũ chiến binh Viking', price: 220 },
    { id: 'crown-diamond', en: 'Diamond Crown', vi: 'Vương miện kim cương', gold: 12 }
  );
  I.face.push(
    { id: 'tongue', en: 'Silly Tongue', vi: 'Lè lưỡi tinh nghịch', price: 50 },
    { id: 'heart-eyes', en: 'Heart Eyes', vi: 'Mắt trái tim', price: 70 }
  );
  I.torso.push(
    { id: 'torso-vn', en: 'Việt Nam Jersey', vi: 'Áo đội tuyển Việt Nam', price: 100 },
    { id: 'torso-police', en: 'Police Uniform', vi: 'Đồng phục cảnh sát', price: 150 },
    { id: 'torso-doctor', en: 'Doctor Coat', vi: 'Áo blouse bác sĩ', price: 150 },
    { id: 'torso-pirate', en: 'Pirate Vest', vi: 'Áo cướp biển', price: 180 },
    { id: 'torso-princess', en: 'Princess Dress', vi: 'Váy công chúa', price: 200 },
    { id: 'torso-dino', en: 'Dino Costume', vi: 'Bộ đồ khủng long', price: 260 },
    { id: 'torso-hero', en: 'Super Hero Cape', vi: 'Áo choàng siêu anh hùng', price: 350 },
    { id: 'torso-gold', en: 'Golden Armor', vi: 'Áo giáp vàng', gold: 10 }
  );
  I.legs.push(
    { id: 'legs-purple', en: 'Purple Pants', vi: 'Quần tím', price: 40 },
    { id: 'legs-pink', en: 'Pink Pants', vi: 'Quần hồng', price: 40 },
    { id: 'legs-gold', en: 'Golden Pants', vi: 'Quần vàng óng', price: 180 }
  );
  I.acc.push(
    { id: 'ice-cream', en: 'Ice Cream', vi: 'Cây kem', price: 50 },
    { id: 'balloon', en: 'Balloon', vi: 'Bóng bay', price: 60 },
    { id: 'paintbrush', en: 'Paintbrush', vi: 'Cọ vẽ', price: 70 },
    { id: 'umbrella', en: 'Umbrella', vi: 'Chiếc ô', price: 90 },
    { id: 'trophy', en: 'Gold Trophy', vi: 'Cúp vàng', price: 250 },
    { id: 'magic-wand', en: 'Magic Wand', vi: 'Đũa phép', price: 300 }
  );
  I.pet = [
    { id: 'none-pet', en: 'No Pet', vi: 'Chưa có thú cưng', price: 0 },
    { id: 'goldfish', en: 'Goldfish Bowl', vi: 'Bể cá vàng', price: 120 },
    { id: 'bunny', en: 'Bunny', vi: 'Thỏ trắng', price: 180 },
    { id: 'turtle', en: 'Turtle', vi: 'Rùa con', price: 200 },
    { id: 'kitten', en: 'Kitten', vi: 'Mèo con', price: 240 },
    { id: 'puppy', en: 'Puppy', vi: 'Cún con', price: 260 },
    { id: 'parrot', en: 'Parrot', vi: 'Vẹt nói tiếng Anh', price: 350 },
    { id: 'panda', en: 'Panda', vi: 'Gấu trúc', price: 450 },
    { id: 'robo-dog', en: 'Robo-Dog', vi: 'Chó robot', price: 600 },
    { id: 'baby-dragon', en: 'Baby Dragon', vi: 'Rồng con', gold: 8 },
    { id: 'unicorn', en: 'Unicorn', vi: 'Kỳ lân cầu vồng', gold: 15 }
  ];
  I.ride = [
    { id: 'none-ride', en: 'No Ride', vi: 'Chưa có xe', price: 0 },
    { id: 'skateboard', en: 'Skateboard', vi: 'Ván trượt', price: 150 },
    { id: 'bicycle', en: 'Bicycle', vi: 'Xe đạp', price: 250 },
    { id: 'scooter', en: 'Scooter', vi: 'Xe tay ga', price: 400 },
    { id: 'go-kart', en: 'Go-Kart', vi: 'Xe đua go-kart', price: 500 },
    { id: 'jeep', en: 'Safari Jeep', vi: 'Xe jeep thám hiểm', price: 700 },
    { id: 'race-car', en: 'Race Car', vi: 'Xe đua F1', price: 900 },
    { id: 'rocket', en: 'Space Rocket', vi: 'Tên lửa vũ trụ', gold: 20 }
  ];
  I.buddy = [
    { id: 'none-buddy', en: 'Solo', vi: 'Chưa có bạn đồng hành', price: 0 },
    { id: 'buddy-dino', en: 'Dino Kid', vi: 'Bạn mặc đồ khủng long', price: 300 },
    { id: 'buddy-hero', en: 'Super Hero', vi: 'Siêu anh hùng', price: 400 },
    { id: 'buddy-pirate', en: 'Pirate Captain', vi: 'Thuyền trưởng cướp biển', price: 450 },
    { id: 'buddy-princess', en: 'Princess', vi: 'Công chúa', price: 450 },
    { id: 'buddy-astro', en: 'Astronaut', vi: 'Phi hành gia', price: 500 },
    { id: 'buddy-ninja', en: 'Ninja Master', vi: 'Sư phụ Ninja', price: 600 },
    { id: 'buddy-wizard', en: 'Wizard', vi: 'Phù thủy tốt bụng', price: 700 },
    { id: 'buddy-robot', en: 'Robot Pal', vi: 'Bạn Robot', gold: 10 }
  ];
  // Nâng giá các món có từ trước (×5, làm tròn 10; Gold ×2) – món đã mua vẫn giữ nguyên
  Object.keys(I).forEach((cat) => I[cat].forEach((it) => {
    if (it.price === undefined) it.price = 0;
    if (!it.scaled) { if (it.price > 0) it.price = Math.round((it.price * 5) / 10) * 10; if (it.gold) it.gold *= 2; it.scaled = true; }
  }));
  /** Gọi sau khi mọi gói đồ đã nạp (lego-shop2…): gán tầng cho từng món. */
  /* Giá Gold (v1.12): Gold là phần thưởng cho học GIỎI (3 sao, ôn đúng, Skill Check) → món Gold là đồ quý nhất, giá 30–120. */
  const GOLD_PRICES = { 'baby-dragon': 30, 'buddy-robot': 35, 'torso-gold': 40, 'crown-diamond': 50, unicorn: 60, 'baby-elephant': 60, 'torso-dragon': 80, hoverboard: 90, rocket: 100, 'buddy-word-wizard': 120 };
  function finalizeShop() {
    Object.keys(LG.ITEMS).forEach((cat) => LG.ITEMS[cat].forEach((it) => {
      if (it.price === undefined) it.price = 0;
      if (it.gold && GOLD_PRICES[it.id]) it.gold = GOLD_PRICES[it.id];
      it.scaled = true; it.tier = tierOf(it); it.tierNum = it.secret ? 0 : (it.price || it.gold) ? TIER_NUM[it.tier] : 0;
    }));
  }
  /** Món này đã hiện trong Tủ đồ chưa? Tầng N (đồ mua bằng xu) mở khi con sở hữu đủ món tầng N-1 cùng nhóm.
   *  Trả về { visible, need, prevTier } – need = số món còn phải mua ở tầng trước. */
  function shopGate(cat, it, owns) {
    // Món mua bằng Gold luôn hiện: Gold là loại tiền riêng, không bắt bé phải mua đồ xu đắt trước mới thấy món Gold
    if (owns(it.id) || it.gold || !it.tierNum || it.tierNum <= 1) return { visible: true, need: 0 };
    const prev = LG.ITEMS[cat].filter((x) => x.tierNum === it.tierNum - 1);
    const want = Math.min(it.tierNum === 4 ? 1 : 2, prev.length);
    const have = prev.filter((x) => owns(x.id)).length;
    return { visible: have >= want, need: Math.max(0, want - have), prevTier: it.tierNum - 1 };
  }

  /* ---------------- Khung cảnh nhân vật (scene) ---------------- */
  /** Nhân vật + bạn đồng hành (trái) + xe (giữa trái) + thú cưng (phải). Chỉ có nhân vật → giống renderMinifig. */
  function renderScene(cfg, opts = {}) {
    const c = cfg || {};
    const pet = PETS[c.pet] ? c.pet : 'none-pet';
    const ride = RIDES[c.ride] ? c.ride : 'none-ride';
    const buddy = BUDDIES[c.buddy] ? c.buddy : 'none-buddy';
    let x0 = -12, x1 = 72, s = '';
    if (buddy !== 'none-buddy') x0 = ride !== 'none-ride' ? -176 : -90;
    else if (ride !== 'none-ride') x0 = -100;
    if (ride !== 'none-ride') s += `<g transform="translate(-98 60)">${RIDES[ride]}</g>`;
    if (buddy !== 'none-buddy') s += `<g transform="translate(${ride !== 'none-ride' ? -162 : -76} 13) scale(.88)">${buddyInner(buddy)}</g>`;
    s += LG.minifigInner(c);
    if (pet !== 'none-pet') { s += `<g transform="translate(70 70)">${PETS[pet]}</g>`; x1 = 136; }
    // 🏞️ Phông nền (lego-shop2.js) vẽ phía sau toàn bộ khung cảnh
    const SC = LG.SCENES || {};
    if (c.scene && c.scene !== 'none-scene' && typeof SC[c.scene] === 'function') {
      if (x1 - x0 < 140) { const pad = (140 - (x1 - x0)) / 2; x0 -= pad; x1 += pad; }
      s = `<g class="scene-bg">${SC[c.scene](x0, -4, x1 - x0, 128)}</g>` + s;
    }
    const cls = opts.cls ? ' ' + opts.cls : '';
    const wide = x1 - x0 > 90 ? ' fig-scene' : '';
    return `<svg class="fig${wide}${cls}" viewBox="${x0} -4 ${x1 - x0} 128" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">${s}</svg>`;
  }

  /** Ô xem trước cho thú cưng / xe / bạn đồng hành (vẽ riêng món đồ). */
  function renderItemPreview(cat, id) {
    if (cat === 'pet') return `<svg class="fig item-solo" viewBox="-4 -6 72 62" aria-hidden="true">${PETS[id] || ''}${id === 'none-pet' ? emptyMark() : ''}</svg>`;
    if (cat === 'ride') return `<svg class="fig item-solo" viewBox="-4 -4 92 70" aria-hidden="true">${RIDES[id] || ''}${id === 'none-ride' ? emptyMark() : ''}</svg>`;
    if (cat === 'scene') { const f = (LG.SCENES || {})[id]; return `<svg class="fig item-solo" viewBox="0 0 160 110" preserveAspectRatio="xMidYMid slice" aria-hidden="true">${typeof f === 'function' && id !== 'none-scene' ? f(0, 0, 160, 110) : emptyMark()}</svg>`; }
    if (cat === 'buddy') return `<svg class="fig" viewBox="-12 -4 84 128" aria-hidden="true">${buddyInner(id) || emptyMark(true)}</svg>`;
    return '';
  }
  function emptyMark(tall) {
    return `<circle cx="${tall ? 30 : 32}" cy="${tall ? 60 : 28}" r="18" fill="none" stroke="#CBD5E1" stroke-width="3" stroke-dasharray="6 5"/><path d="M${tall ? 22 : 24} ${tall ? 52 : 20} l16 16 M${tall ? 38 : 40} ${tall ? 52 : 20} l-16 16" stroke="#CBD5E1" stroke-width="3" stroke-linecap="round"/>`;
  }

  Object.assign(LG, { TIERS, tierOf, finalizeShop, shopGate, PETS, RIDES, BUDDIES, renderScene, renderItemPreview });
})(window);
