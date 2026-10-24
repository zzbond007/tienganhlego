# 🧱 LEGO English Builder

Ứng dụng web học tiếng Anh (từ vựng & giao tiếp) cho bé 9 tuổi – Lớp 4 / Cambridge Movers–Flyers.
Học xong mỗi bài → nhận mảnh ghép → lắp Bộ Mô Hình LEGO → đặt vào Sa bàn Thế giới của bé.

- 100% tĩnh, chạy offline (PWA), không quảng cáo, không thu thập dữ liệu.
- Tối ưu cho iPad Air (Safari, cả ngang & dọc), cài được ra Màn hình chính.

## Nội dung

| | |
|---|---|
| 10 Vùng đất × 3 bài | 150 từ/cụm từ (IPA, nghĩa, câu ví dụ, câu đố nghe) |
| 30 truyện Comic 4 khung | 60 câu lắp ráp · 60 tình huống luyện nói |
| 10 Bộ Mô Hình SVG × 12 mảnh | Minifigure: 45 món đồ mở khóa bằng Studs |
| Ôn tập SRS 1-3-7-14-30 ngày | Ánh xạ 20 Unit SGK *Tiếng Anh 4 Global Success* |
| 30 thử thách Snowball 3 tầng | 60 hội thoại rẽ nhánh · 10 LEGO Mystery Mission |

## Lộ trình 9 tháng (36 tuần)

Bản đồ có thanh chọn **🌱 Tháng 1–3 · 🌿 Tháng 4–6 · 🚀 Tháng 7–9 · 📘 SGK & Kho bài**. Mỗi tuần là một Vùng đất
(3 bài + 1 Mystery Mission), nhóm theo tháng; Xưởng lắp, Sa bàn và Hộ chiếu dùng chung thanh chọn này.

| Gói dữ liệu | Nội dung | Trạng thái |
|---|---|---|
| `js/curriculum-stage1.js` | Tuần 1–12: thói quen tự lập, ngôi nhà, việc nhà, gia đình, lớp học, môn học, sân chơi & cờ vua, ứng xử lịch sự, món Việt, siêu thị, 5 giác quan, sức khỏe | ✅ 36 bài · 180 từ |
| `js/curriculum-stage2.js` | Tuần 13–24: cây cối, bể cá thủy sinh, côn trùng, động vật & so sánh, dự báo thời tiết, vòng tuần hoàn nước, trang phục theo mùa, tái chế, vật liệu, chìm–nổi & nam châm, ánh sáng–bóng–âm thanh, tư duy lập trình | ✅ 36 bài · 180 từ |
| `js/curriculum-stage3.js` | Tuần 25–36: khu phố, hỏi đường & an toàn giao thông, nghề nghiệp, ước mơ, du lịch & cắm trại, quá khứ đơn (was/were, went/saw…), thám tử nhí, Hệ Mặt Trời, phát minh, lời mời & gợi ý, nêu ý kiến & tranh luận | ✅ 36 bài · 180 từ |

Mỗi bài ngoài 6 bước học còn có thẻ **💡 Real-Life / Science Fact**, 2 câu nghe Đúng/Sai và 1 câu hỏi đời sống cho
**🎧 Listening & Speaking Gym** (nút trên thẻ chào ở Bản đồ: 5 lượt nghe – nói, thưởng +10 Studs, +1 Gold; tối đa 2 Gold/ngày, các lượt sau vẫn luyện được và nhận +2 Studs).
**🧠 Bản v1.10 – Học thật, nhớ lâu: ôn trước học sau, quà bí mật theo kết quả học:**
- *Bỏ Beat Talk*: bé dùng để "cày" phút nói đổi quà, ít giá trị ghi nhớ từ.
- *🔧 Ôn trước – học sau*: có từ đến hạn ôn mà từ bài trước (hoặc từ đầu hôm nay) chưa ôn lượt nào → làm 1 lượt Trạm bảo trì
  (5 từ, ~3 phút) rồi mới vào bài. Bật/tắt trong Góc Bố Mẹ ("Ôn trước khi học bài mới", mặc định bật).
- *🎁 Quà bí mật mở bằng kết quả học* (không còn mở bằng số phút nói, không mua bằng xu):
  Micro Vàng – thuộc 5 từ · Vẹt Vàng – xong 10 bài · Mũ Phù thủy – thuộc 20 từ · Sân khấu Siêu sao – Skill Check ≥ 80% ·
  Ván trượt tên lửa – ôn 7 ngày liên tiếp · Vest Siêu sao – thuộc 50 từ · Phượng hoàng lửa – xong 40 bài · Thiên hà Ngôn từ – thuộc 100 từ.
  "Thuộc" = ôn đúng qua mốc 7 ngày. Món đã mở trước đây vẫn giữ nguyên. Phút nói vẫn được đo, chỉ đổi ra danh hiệu.
- *Góc Bố Mẹ*: thẻ "Từ cần ôn hôm nay" (kèm số lượt đã ôn & chuỗi ngày ôn), bảng tiến độ 8 quà bí mật.

**🥁 Bản v1.9.3 – Beat Talk chậm & chấm công bằng hơn, sửa nút micro bị "kẹt":**
- *Beat Talk*:
  - Nhịp chậm hơn nhiều (≈ 52–72 nhịp/phút, theo Tốc độ đọc – 🐌 Siêu chậm là chậm nhất).
  - Mỗi ô có 2–4 nhịp tùy độ dài cụm từ. Ô kế tiếp sáng viền nhạt để bé chuẩn bị.
  - Vòng "chỉ còn hình" chỉ nhanh hơn một chút (+6).
- *Chấm Beat Talk*:
  - Ghi âm lượng cả vòng rồi mới chấm; bé nói trễ ~0,5–0,9 giây sau khi ô sáng vẫn được tính.
  - Bỏ qua đúng những khoảnh khắc trống đánh, nên tiếng nhạc lọt micro không bị tính là giọng bé. Trống nhỏ lại khi bé nói.
  - Kết quả ghi "Con nói được x/8 ô"; ô chưa nghe rõ tô vàng nhạt (không đỏ).
  - Thêm nút 🐢 Chơi lại chậm hơn. Sao dễ đạt hơn (3⭐ từ 90%).
- *Nút micro không còn bị "kẹt"* (Picture Story và mọi chỗ đọc câu): khi iPad tắt nhận diện mà không báo gì, hoặc không báo dừng
  ghi âm, app tự kết thúc lượt ghi. Chạm 🎙️ lần nữa = đọc xong, dừng ghi.

**🎤 Bản v1.9.2 – Sửa lỗi "nói to mà không được ghi nhận", giọng mẫu chậm hơn:**
- *Lỗi chính*: tiếng "bíp" bật micro bị tính vào độ ồn nền → ngưỡng nghe bị đẩy lên rất cao, bé phải hét mới được tính;
  ồn nền còn bị chính giọng nói nhỏ kéo lên dần. Nay: bíp phát TRƯỚC khi ghi, ồn nền lấy mức thấp và có trần,
  ngưỡng 0.016–0.055. Nếu bộ đo trực tiếp không nhận tín hiệu (iPad tạm dừng âm thanh) → đo lại trên chính file ghi âm.
- *Chấm nhận diện giọng nói dễ hơn cho trẻ*: chấp nhận phát âm gần đúng (rula = ruler, favorite = favourite,
  số "2" = "two"); đọc theo câu mẫu chỉ cần khớp ~60% số từ (câu ≤ 3 từ: 50%). Máy chấm trượt 2 lần liền →
  tự chuyển sang ghi âm + phát lại giọng con (Role-Play: sau 3 lần chuyển sang Phòng thu).
- *Góc Bố Mẹ*: nút 🎤 Thử micro (đo 4 giây, báo độ to / ồn nền, phát lại) và giải thích cách chấm nói.
- *Giọng mẫu chậm hơn*: thêm mức 🐌 Siêu chậm, mặc định 🐢 Rất chậm (máy đang dùng được hạ một lần về Rất chậm);
  câu dài đọc theo từng cụm, nghỉ giữa các câu/dấu phẩy để bé kịp nghe và bắt chữ; Beat Talk không còn đọc tốc độ 1.0.

**📖 Bản v1.9 – Đọc tiếng Anh qua hình & nói theo nhịp:**
- *📖 Picture Story* (mỗi bài, ngay sau Bước 1): câu ví dụ của 5 từ vựng hiện thành bảng đọc, từ vựng được THAY BẰNG HÌNH,
  mỗi dòng có một nhân vật LEGO. Nghe mẫu → đọc to từng dòng (micro kiểm tra con đọc đủ dài) → Cấp 2–3 đọc liền cả đoạn
  (lưu vào Sổ giọng nói). Cấp 1 có chữ nhỏ dưới hình; Cấp 2–3 chỉ có hình, đọc xong dòng mới hiện chữ – luyện phản xạ
  nhìn hình nói tiếng Anh, không dịch qua tiếng Việt.
- *Hình thật, không dùng icon*: 131 ảnh chụp thật (Wikimedia Commons / Openverse, giấy phép mở) + 124 hình minh họa
  vẽ riêng kiểu tranh sách thiếu nhi (đồ vật, con vật, hành động đơn giản như xe đạp, cầu thang, ô…). Từ trừu tượng
  hoặc dễ nhầm (môn học, bệnh, địa điểm cần chữ mới nhận ra…) KHÔNG gắn hình để bé khỏi nhầm. 265 từ có hình;
  74/138 bài có bảng đọc (bài nào có ít nhất 2 từ có hình). Hình cũng hiện trên thẻ từ ở Bước 1 và Beat Talk.
  Nguồn ảnh & tác giả xem trong Góc Bố Mẹ → "📷 Nguồn ảnh từ vựng".
- *🥁 Beat Talk* (nút trên Bản đồ): 8 ô từ đã học sáng lần lượt theo nhịp trống; 3 vòng: nghe mẫu → con đọc theo nhịp →
  nhanh hơn, xáo trộn, chỉ còn hình. Micro chấm từng nhịp; nhịp nhanh dần theo tháng & cấp; thưởng tối đa 3 lượt/ngày.

**🎙️ Bản v1.8 – Hành trình nói mỗi ngày, chống "bấm cho qua", Tủ đồ bí ẩn:**
- *Đo thời gian NÓI thật* (giây có giọng nói, không tính bấm chọn). Mục tiêu mỗi ngày theo cấp: 60 / 90 / 120 giây
  (+40 Studs, gấp đôi mục tiêu +1 Gold), chuỗi ngày nói liên tiếp, biểu đồ 7 ngày trong Góc Bố Mẹ.
- *🎙️ Talk Time*: 3 câu hỏi mở mỗi ngày (90 nhiệm vụ, 3 cấp, 7 dạng: về bản thân, tả tranh, kể chuyện, nêu ý kiến,
  tưởng tượng, "Would you rather", thế giới LEGO). Gạch câu giúp nói dài hơn, sao theo số giây nói (⭐ mục tiêu,
  ⭐⭐ ×1,5, ⭐⭐⭐ ×2), phá kỷ lục mới được thêm thưởng. Bước 5 có thưởng "trả lời dài".
- *🗺️ Hành trình nói*: mốc 5 / 15 / 30 / 60 / 120 / 240 / 480 / 900 phút → danh hiệu + 🎁 vật phẩm bí mật (không mua được bằng xu).
- *Chống bấm cho qua*: phải nghe hết câu mới chọn được (Bước 2, Gym, Bài kiểm tra); chỉ thưởng khi đúng NGAY lần đầu;
  học lại bài đã xong chỉ nhận 30% xu (60% khi luyện lại để mở mảnh còn thiếu).
- *Tủ đồ v2*: 152 món trong 9 nhóm (thêm 🏞️ Phông nền: Hạ Long, vũ trụ, đáy biển…; nón lá, áo dài, xích lô, đèn ông sao…),
  giá ×5, 4 tầng – tầng sau hiện ❓ cho tới khi mua đủ món tầng trước; đồ Huyền thoại mua bằng Gold; 8 đồ 🎁 bí mật theo phút nói.

**📈 Bản v1.7 – Cấp độ thích ứng & Bài kiểm tra kỹ năng:**
- *3 cấp độ* (🌱 Làm quen → 🌿 Vững vàng → 🚀 Thành thạo). Bắt đầu ở Cấp 1: ngưỡng mảnh ghép 60%, câu mẫu hiện sẵn, gạch có màu,
  tiếng Việt hiện sẵn. Cấp 2: 65%, câu mẫu sau 1 gợi ý/lần nói đầu. Cấp 3: 70%, con tự nói trước. Tự lên cấp khi 5 bài gần nhất
  đúng ≥ 85% và ≥ 60% câu tự nói không gợi ý; xuống cấp khi < 55% (bố mẹ có thể chọn cấp cố định trong Góc Bố Mẹ).
- *📝 Bài kiểm tra kỹ năng* sau mỗi 6 bài mới (hoặc 14 ngày): 15 câu – Nghe (Đúng/Sai, nghe chọn hình), Từ vựng, Ngữ pháp
  (lắp câu không màu), Nói (tự trả lời, không câu mẫu). Không gợi ý, không báo đúng/sai giữa chừng, thưởng theo điểm thật và chỉ
  cho bài đến hạn. Phần Nói không có nhận diện giọng thì ghi âm để bố mẹ chấm 👍/👎. Góc Bố Mẹ lưu lịch sử điểm từng kỹ năng.

**🛠️ Bản v1.6 – khắc phục theo báo cáo đánh giá 20/10/2026:**
- *Chấm nói theo ý định* (`Listener.judge`): chấp nhận câu trả lời ngắn tự nhiên ("Yes, I do.", "At six o'clock."),
  từ chối câu giống phương án sai; từ khóa chỉ gồm từ mang nghĩa. Kiểm định: 276/276 câu mẫu đạt, 550/552 phương án sai bị loại
  (2 câu còn lại là lời từ chối lời mời hợp lý).
- *Phương án nhiễu hợp lý* (cùng chủ đề, sai chi tiết) thay cho câu vô lý ở cả 4 gói; 10 vùng SGK có thêm dữ liệu Gym.
- *Tự nói trước, xem mẫu sau*: câu mẫu trong Phòng thu ẩn cho tới khi con tự nói; gợi ý 3 mức (từ khóa → nửa câu → cả câu),
  dùng hết gợi ý thì không có Gold.
- *Ngưỡng thành thạo 70%*: dưới ngưỡng chỉ mở một nửa mảnh ghép, có nút "Luyện lại" để mở nốt.
- *Bước 4*: tháng 1–2 có màu vai trò, từ tháng 3 tắt màu (🎨 để xem); sửa bộ đoán vai trò (makes/washes → động từ);
  lắp xong phải đọc to câu (câu thường & Snowball tầng 3).
- *Ôn tập chủ động*: 2/5 câu ở Trạm bảo trì là "nhìn hình + nghe câu đố → tự nói từ".
- *Giảm dần tiếng Việt*: từ tháng 4, lời thoại Comic bấm 🇻🇳 mới hiện nghĩa.
- *🎙️ Sổ giọng nói* trong Góc Bố Mẹ (so sánh bản đầu – bản mới nhất); thống kê tách *từ vựng* và *mẫu câu*.
- *Importer*: bắt buộc câu ví dụ; thiếu phần nào thì báo "⚠️ chất lượng thấp" thay vì "Hợp lệ"; sửa gạch nhiễu bị cắt lỗi.
- Nhãn "giọng mẫu (máy đọc)" thay cho "bản xứ"; Góc Bố Mẹ giải thích giới hạn chấm nói khi mở từ Màn hình chính.

**🛍️ Cửa hàng nhân vật (Tủ đồ):** xem v1.8 bên trên – 152 món, 9 nhóm – mũ & tóc, khuôn mặt, trang phục, quần, phụ kiện, 🐶 thú cưng,
🛹 xe, 🧑‍🤝‍🧑 bạn đồng hành. Độ hiếm: Thường (≤ 80 Studs) · Hiếm (≤ 250) · Sử thi (≤ 600) · ⭐ Huyền thoại (đến 900 Studs
hoặc mua bằng 🥇 Gold Brick: vương miện kim cương, áo giáp vàng, rồng con, kỳ lân, tên lửa, bạn Robot). Thú cưng, xe và
bạn đồng hành xuất hiện cùng nhân vật ở Bản đồ, Tủ đồ và Hộ chiếu.

**🐢 Tốc độ đọc:** 4 mức Rất chậm / Chậm (mặc định) / Vừa / Tự nhiên; đổi nhanh bằng nút 🐢 trên thanh bài học & Gym.

**🎤 Bắt buộc luyện nói (mặc định BẬT, tắt được trong Góc Bố Mẹ):**
- Bước 1 – mỗi từ: 🔊 nghe → 🎤 *Say it!* nói to → app phát lại giọng con rồi giọng mẫu → mới thu được gạch (nói được: +2 Studs thay vì +1).
  Máy tự dừng ghi khi con nói xong. Nếu 3 lần không nghe thấy tiếng, con vẫn được thu gạch để không bị kẹt.
- Bước 5 – phải thử nói (micro chấm điểm) hoặc ghi âm có tiếng trong Phòng thu mới mở được phần chọn câu; câu đã nói được +1 Gold.
- Hội thoại tự chọn & Gym "Quick Response": phải ghi âm câu trả lời mới sang bước tiếp.
- Trên iPad mở từ Màn hình chính (không có nhận diện giọng nói), app dùng ghi âm + nhận biết có tiếng nói (đo độ lớn âm thanh),
  rồi cho con nghe lại giọng mình so với giọng mẫu. Góc Bố Mẹ hiển thị số lần con đã nói hôm nay và tổng cộng.
10 Vùng đất gốc nằm ở tab **📘 SGK & Kho bài**; School Sync hỗ trợ cả *Tiếng Anh 3* và *Tiếng Anh 4 Global Success*.

Gói giai đoạn tự đăng ký bằng `window.CurriculumStages.push({ stage, zones })` và phải nạp trước `js/curriculum.js`
(thêm thẻ `<script>` trong `index.html` và đường dẫn vào `CORE_ASSETS` của `sw.js`).

## Cơ chế sư phạm chuyên sâu (Expert ESL Add-on)

1. **Color-Coded Brick Grammar** – gạch chữ (Bước 1 & Bước 4) luôn mang màu theo chức năng câu:
   🔵 Chủ ngữ (Who/What) · 🔴 Động từ (Action) · 🟡 Tân ngữ/Chi tiết · 🟢 Nơi chốn/Thời gian/Lý do · 🟠 Cụm giao tiếp lịch sự.
   Vai trò được tự đoán (`js/grammar.js`); dữ liệu có thể ghi đè bằng mảng `r` / `roles`.
2. **Snowball Sentence Upgrade** – cuối Bước 4: Level 1 (1 gạch) → Level 2 (3 gạch) → Level 3 (5+ gạch, câu lịch sự).
   Lắp xong Level 3: nhân đôi Studs, gạch hóa vàng, +1 Gold Brick (lần đầu).
3. **Branching Dialogue & Mystery** – Bước 3 và Bước 5 có 2–3 cách đáp đều đúng ngữ pháp nhưng khác sắc thái
   (đồng ý hào hứng / từ chối lịch sự & đề xuất…); nhân vật phản ứng khác nhau. Học xong cả Vùng đất mở
   **LEGO Mystery Mission**: nghe 3 manh mối tiếng Anh, loại trừ để giải câu đố.
4. **Shadowing Voice Studio** – `MediaRecorder` + `AnalyserNode`: cột gạch LEGO nhảy theo giọng bé khi ghi âm;
   nút **Compare Voice** phát giọng mẫu rồi phát ngay giọng bé.
5. **My Passport & Custom Unit Importer** – tab 🛂 Hộ chiếu: gạch từ vựng đổi chất liệu theo hộp SRS
   (Nhựa → Bạc → Vàng → Kim Cương) và con dấu khi hoàn thành Vùng đất. Trong Góc Bố Mẹ, dán JSON
   (có sẵn Prompt mẫu để nhờ AI soạn từ SGK) để thêm Vùng đất mới không cần sửa code.

### Định dạng JSON của Custom Unit (tóm tắt)

```json
{
  "format": "lego-english-unit",
  "name": "Unit 5: Things we can do", "nameVi": "…", "icon": "🎨", "color": "#8E44AD",
  "characters": { "a": "Mia", "b": "Leo" },
  "lessons": [{
    "title": "…", "titleVi": "…", "icon": "🏊",
    "words": [{ "en": "swim", "pos": "verb", "ipa": "/swɪm/", "vi": "bơi", "emoji": "🏊",
                "example": "I can swim.", "exampleVi": "Mình biết bơi.", "clue": "You do this in the water." }],
    "comic":  { "panels": [{ "who": "a", "text": "…", "vi": "…", "prop": "🎤" }], "blanks": [{ "panel": 1, "answer": "…", "options": ["…"] }] },
    "build":  [{ "vi": "…", "bricks": ["I", "can", "swim."], "extra": ["cans"] }],
    "talk":   [{ "q": "…", "vi": "…", "hint": "…", "keywords": ["can", "swim|dance"], "choices": ["đúng", "sai", "sai"] }],
    "snowball":    { "vi": "…", "levels": [{ "bricks": ["swim"] }, { "bricks": ["I", "can", "swim."] }, { "bricks": ["I", "can", "swim", "very well", "in the pool."] }] },
    "comicChoice": { "who": "b", "q": "…", "options": [{ "tone": "yes", "en": "…", "reply": "…" }, { "tone": "no", "en": "…", "reply": "…" }] },
    "talkChoice":  { "…": "giống comicChoice" }
  }],
  "mystery": { "title": "…", "clues": [{ "en": "…", "vi": "…" }], "question": "…", "options": [{ "en": "…", "emoji": "…" }], "answer": 3, "win": "…" }
}
```

Chỉ `name` và `lessons[].words` (≥ 3 từ có `en` + `vi`) là bắt buộc – phần thiếu sẽ được tự tạo từ từ vựng.
Mẫu đầy đủ & Prompt cho AI nằm trong `js/custom-units.js` (nút **Copy AI Prompt** / **Dán JSON mẫu** trong Góc Bố Mẹ).

## Triển khai lên GitHub Pages

1. Tạo repo mới, đẩy toàn bộ thư mục này lên nhánh `main`.
2. Repo → **Settings → Pages** → Source: *Deploy from a branch* → `main` / `/ (root)`.
3. Mở `https://<username>.github.io/<repo-name>/` trên iPad → nút Chia sẻ → **Thêm vào MH chính**.

Mọi đường dẫn đều tương đối (`./`) nên chạy được trong sub-path của GitHub Pages.

**Khi phát hành bản mới:** tăng `VERSION` trong `sw.js` (ví dụ `leb-v1.1.1`) để dọn cache cũ.

## Chạy thử trên máy

Cần một web server tĩnh bất kỳ (Service Worker không chạy với `file://`), ví dụ:

```bash
npx http-server . -p 8080
```

## Cấu trúc

```
index.html      Khung giao diện, meta PWA cho iPadOS
manifest.json   Cấu hình PWA (standalone, orientation: any)
sw.js           Service Worker – cache để học offline
css/styles.css  Giao diện gạch LEGO 3D, responsive iPad
js/audio.js     SoundEngine (Web Audio), TTS US/UK, nhận diện giọng nói, ghi âm
js/db.js        IndexedDB + localStorage, SRS, sao lưu JSON / Mã Chuyển Máy
js/lego-svg.js  Gạch LEGO, 10 mô hình (+ mô hình chung cho bài tùy chỉnh), Minifigure, túi mù, sa bàn
js/grammar.js   Color-Coded Brick Grammar – đoán vai trò ngữ pháp của từng viên gạch
js/expert-data.js Snowball 3 tầng, hội thoại rẽ nhánh (30 bài), 10 LEGO Mystery Mission
js/curriculum-stage1.js Lộ trình 9 tháng – Giai đoạn 1 (Tuần 1–12)
js/curriculum.js Dữ liệu 10 vùng đất gốc, Comic, ánh xạ SGK Lớp 3 & 4, chuẩn hóa & đăng ký Vùng đất
js/custom-units.js Custom Unit Importer: kiểm tra JSON, tự bổ sung phần thiếu, Prompt mẫu cho AI
js/app.js       Điều hướng, bài học 6 bước, xưởng lắp, sa bàn, tủ đồ, hộ chiếu, mystery, góc bố mẹ
icons/          Icon PWA (PNG + SVG)
```

## Ghi chú cho bố mẹ

- **Góc Bố Mẹ** được bảo vệ bằng một phép tính; trong đó có thống kê phút học, từ hay nhầm, lịch ôn, cài đặt giọng đọc, sao lưu và **Custom Unit Importer**. Bài nhập được lưu trên thiết bị, đi kèm file sao lưu/Mã Chuyển Máy và được giữ lại khi "Xóa toàn bộ tiến độ".
- Trên iPad, nhận diện giọng nói đôi khi bị chặn khi mở app từ Màn hình chính. App tự chuyển sang **Ghi âm nghe lại + Tự chấm sao + Chọn câu trả lời**, nên bé không bao giờ bị kẹt. Có thể chọn chế độ này cố định trong Cài đặt.
- Bảng nối Unit SGK là gợi ý theo chủ đề gần nhất — bố mẹ nên đối chiếu với lịch học thực tế của lớp.
