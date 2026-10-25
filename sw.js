/* LEGO English Builder – Service Worker
 * Cache toàn bộ app để học offline 100%. Dùng đường dẫn tương đối để chạy được trong sub-path GitHub Pages.
 */
const VERSION = 'leb-v1.12.0';
const CORE_CACHE = VERSION + '-core';
const RUNTIME_CACHE = VERSION + '-runtime';

const CORE_ASSETS = [
  './',
  './index.html',
  './manifest.json',
  './css/styles.css',
  './js/audio.js',
  './js/db.js',
  './js/lego-svg.js',
  './js/lego-shop.js',
  './js/lego-shop2.js',
  './js/grammar.js',
  './js/expert-data.js',
  './js/curriculum-stage1.js',
  './js/curriculum-stage2.js',
  './js/curriculum-stage3.js',
  './js/word-photos.js',
  './js/curriculum.js',
  './js/custom-units.js',
  './js/app.js',
  './icons/icon.svg',
  './icons/icon-180.png',
  './icons/icon-192.png',
  './icons/icon-512.png'
];

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CORE_CACHE)
      .then((cache) => cache.addAll(CORE_ASSETS))
      .then(() => self.skipWaiting())
  );
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys()
      .then((keys) => Promise.all(keys.filter((k) => !k.startsWith(VERSION)).map((k) => caches.delete(k))))
      .then(() => self.clients.claim())
  );
});

function isFontRequest(url) {
  return url.hostname === 'fonts.googleapis.com' || url.hostname === 'fonts.gstatic.com';
}

self.addEventListener('fetch', (event) => {
  const req = event.request;
  if (req.method !== 'GET') return;
  const url = new URL(req.url);

  // Google Fonts: stale-while-revalidate (cache cả phản hồi opaque để dùng offline)
  if (isFontRequest(url)) {
    event.respondWith(
      caches.open(RUNTIME_CACHE).then(async (cache) => {
        const cached = await cache.match(req);
        const network = fetch(req).then((res) => {
          if (res && (res.ok || res.type === 'opaque')) cache.put(req, res.clone());
          return res;
        }).catch(() => cached);
        return cached || network;
      })
    );
    return;
  }

  if (url.origin !== self.location.origin) return;

  // Điều hướng trang: network-first để nhận bản mới, rơi về cache khi offline
  if (req.mode === 'navigate') {
    event.respondWith(
      fetch(req).then((res) => {
        const copy = res.clone();
        caches.open(CORE_CACHE).then((c) => c.put('./index.html', copy));
        return res;
      }).catch(() => caches.match('./index.html', { ignoreSearch: true }))
    );
    return;
  }

  // Tài nguyên tĩnh: network-first (luôn nhận bản mới khi có mạng), hết 3 giây hoặc offline → dùng cache
  event.respondWith((async () => {
    const cached = await caches.match(req, { ignoreSearch: true });
    const network = fetch(req).then((res) => {
      if (res && res.ok) {
        const copy = res.clone();
        caches.open(CORE_CACHE).then((c) => c.put(req, copy));
      }
      return res;
    });
    if (!cached) return network;
    const timeout = new Promise((resolve) => setTimeout(() => resolve(cached), 3000));
    try {
      return await Promise.race([network.catch(() => cached), timeout]);
    } catch (e) {
      return cached;
    }
  })());
});
