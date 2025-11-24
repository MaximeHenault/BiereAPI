const CACHE_NAME = "biere-api-cache-v1";

const FILES_TO_CACHE = [
  "/BiereAPI/",
  "/BiereAPI/index.html",
  "/BiereAPI/styles.css",
  "/BiereAPI/app.js",
  "/BiereAPI/manifest.json"
];

self.addEventListener("install", event => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => cache.addAll(FILES_TO_CACHE))
  );
});

self.addEventListener("fetch", event => {
  event.respondWith(
    caches.match(event.request).then(response => response || fetch(event.request))
  );
});
