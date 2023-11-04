const cacheName = "duck-hunt-clone-v1";
const filesToCache = [
  "./",
  "./index.html",
  "./assets/index.js",
  "./assets/phaser.js",
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
