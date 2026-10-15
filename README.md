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
| `js/curriculum-stage2.js` | Tuần 13–24: khoa học tự nhiên hằng ngày | ⏳ |
| `js/curriculum-stage3.js` | Tuần 25–36: giao tiếp tự tin & thế giới | ⏳ |

Mỗi bài ngoài 6 bước học còn có thẻ **💡 Real-Life / Science Fact**, 2 câu nghe Đúng/Sai và 1 câu hỏi đời sống cho
**🎧 Listening & Speaking Gym** (nút trên thẻ chào ở Bản đồ: 5 lượt nghe – nói, thưởng +10 Studs, +1 Gold; tối đa 2 Gold/ngày, các lượt sau vẫn luyện được và nhận +2 Studs).
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
