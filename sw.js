// sw.js
const CACHE_NAME = 'hello-world-cache-v3';


// //保存新的缓存资源
// self.addEventListener('install', (event) => {
//     event.waitUntil(
//         caches.open(CACHE_NAME).then((cache) => {
//             return cache.addAll([
//                 '/',
//                 '/index.html',
//                 '/manifest.json',
//                 '/icons/192x192.png',
//                 '/icons/512x512.png'
//             ]);
//         })
//     );
// });

// //删除旧的缓存资源
// self.addEventListener('activate', (event) => {
//     const cacheWhitelist = [CACHE_NAME];
//     event.waitUntil(
//         caches.keys().then((cacheNames) => {
//             return Promise.all(
//                 cacheNames.map((cacheName) => {
//                     if (!cacheWhitelist.includes(cacheName)) {
//                         return caches.delete(cacheName);
//                     }
//                 })
//             );
//         })
//     );
// });



self.addEventListener('fetch', (event) => {
    event.respondWith(
        caches.match(event.request).then((cachedResponse) => {
            return cachedResponse || fetch(event.request);
        })
    );
});

// 监听推送事件
self.addEventListener('push', function(event) {
    const options = {
        body: '该吃药了！',
        icon: '/icons/192x192.png',
        vibrate: [200, 100, 200],
        tag: 'daily-reminder'
    };

    event.waitUntil(
        self.registration.showNotification('提醒', options)
    );
});


