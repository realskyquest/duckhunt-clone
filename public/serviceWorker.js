const cacheName = "duckhunt-clone-v1";
const filesToCache = [
  "./",
  "./manifest.json",
  "./index.html",
  "./assets/index.js",
  "./assets/phaser.js",
  "./js/neutralino.js",
  "./assets/flap.mp3",
  "./assets/quack.mp3",
  "./assets/shot.mp3",
  "./assets/background.png",
  "./assets/blood.png",
  "./assets/duck.png",
];

self.addEventListener("install", (installEvent) => {
  installEvent.waitUntil(
    caches.open(cacheName).then((cache) => {
      cache.addAll(filesToCache);
    })
  );
});

self.addEventListener("fetch", (fetchEvent) => {
  fetchEvent.respondWith(
    caches.match(fetchEvent.request).then((res) => {
      return res || fetch(fetchEvent.request);
    })
  );
});

self.addEventListener('activate', event => {
  const cacheWhitelist = [cacheName];
  event.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames.map(cacheName => {
          // Only delete caches of this app
          if (cacheWhitelist.indexOf(cacheName) === -1 && cacheName.startsWith('duckhunt-clone')) {
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
});

