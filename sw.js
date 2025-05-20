self.addEventListener('install', event => {
  event.waitUntil(
    caches.open('cyber-companion-v1').then(cache => {
      return cache.addAll([
        './index.html',
        './styles.css',
        './main.js',
        './manifest.json',
        './icon.png'
      ]);
    })
  );
});
self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request).then(response => response || fetch(event.request))
  );
});
