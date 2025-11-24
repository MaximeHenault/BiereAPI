const CACHE_NAME = 'my-blank-pwa-cache-v1';

const RESOURCES_TO_CACHE = [
  '/BiereAPI/',
  '/BiereAPI/index.html',
  '/BiereAPI/styles.css',
  '/BiereAPI/app.js'
];

self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => cache.addAll(RESOURCES_TO_CACHE))
  );
});

self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(keys =>
      Promise.all(
        keys.map(key => {
          if (key !== CACHE_NAME) return caches.delete(key);
        })
      )
    )
  );
});

self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request).then(cachedResponse => {
      if (cachedResponse) return cachedResponse;

      return fetch(event.request)
        .then(networkResponse => {
          if (!networkResponse || networkResponse.status !== 200) return networkResponse;

          const cloned = networkResponse.clone();
          caches.open(CACHE_NAME).then(cache => {
            cache.put(event.request, cloned);
          });

          return networkResponse;
        })
        .catch(() => {
          // Optionnel : page offline
        });
    })
  );
});
