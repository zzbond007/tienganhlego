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

## Triển khai lên GitHub Pages

1. Tạo repo mới, đẩy toàn bộ thư mục này lên nhánh `main`.
2. Repo → **Settings → Pages** → Source: *Deploy from a branch* → `main` / `/ (root)`.
3. Mở `https://<username>.github.io/<repo-name>/` trên iPad → nút Chia sẻ → **Thêm vào MH chính**.

Mọi đường dẫn đều tương đối (`./`) nên chạy được trong sub-path của GitHub Pages.

**Khi phát hành bản mới:** tăng `VERSION` trong `sw.js` (ví dụ `leb-v1.0.1`) để dọn cache cũ.

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
js/lego-svg.js  Gạch LEGO, 10 mô hình, Minifigure, túi mù, sa bàn
js/curriculum.js Dữ liệu 10 vùng đất, Comic, ánh xạ SGK
js/app.js       Điều hướng, bài học 6 bước, xưởng lắp, sa bàn, tủ đồ, góc bố mẹ
icons/          Icon PWA (PNG + SVG)
```

## Ghi chú cho bố mẹ

- **Góc Bố Mẹ** được bảo vệ bằng một phép tính; trong đó có thống kê phút học, từ hay nhầm, lịch ôn, cài đặt giọng đọc và sao lưu.
- Trên iPad, nhận diện giọng nói đôi khi bị chặn khi mở app từ Màn hình chính. App tự chuyển sang **Ghi âm nghe lại + Tự chấm sao + Chọn câu trả lời**, nên bé không bao giờ bị kẹt. Có thể chọn chế độ này cố định trong Cài đặt.
- Bảng nối Unit SGK là gợi ý theo chủ đề gần nhất — bố mẹ nên đối chiếu với lịch học thực tế của lớp.
