
const CACHE_NAME = 'nelson-gpt-v1';
const URLS_TO_CACHE = [
  '/',
  '/index.html',
  '/manifest.json',
  '/icons/icon-192x192.png',
  '/icons/icon-512x512.png'
];

// Install service worker and cache initial resources
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => {
        return cache.addAll(URLS_TO_CACHE);
      })
  );
});

// Activate service worker and clean up old caches
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys()
      .then((cacheNames) => {
        return Promise.all(
          cacheNames.map((cacheName) => {
            if (cacheName !== CACHE_NAME) {
              return caches.delete(cacheName);
            }
            return null;
          })
        );
      })
  );
});

// Network-first strategy with fallback to cache
self.addEventListener('fetch', (event) => {
  event.respondWith(
    fetch(event.request)
      .then((response) => {
        // Clone the response to store it in cache
        const responseToCache = response.clone();
        
        // Cache the fetched response for future offline use
        caches.open(CACHE_NAME)
          .then((cache) => {
            // Only cache successful responses from same origin
            if (response.ok && event.request.url.startsWith(self.location.origin)) {
              cache.put(event.request, responseToCache);
            }
          });
        
        return response;
      })
      .catch(() => {
        // If network request fails, try to serve from cache
        return caches.match(event.request)
          .then((cachedResponse) => {
            if (cachedResponse) {
              return cachedResponse;
            }
            
            // If resource not in cache and network is unavailable, return offline page
            if (event.request.mode === 'navigate') {
              return caches.match('/');
            }
            
            return new Response('Network error occurred', {
              status: 408,
              headers: new Headers({
                'Content-Type': 'text/plain'
              })
            });
          });
      })
  );
});

// Handle push notifications
self.addEventListener('push', (event) => {
  if (!event.data) return;
  
  const notification = event.data.json();
  
  const options = {
    body: notification.body,
    icon: '/icons/icon-192x192.png',
    badge: '/icons/badge-96x96.png',
    data: {
      url: notification.url || '/'
    }
  };
  
  event.waitUntil(
    self.registration.showNotification(notification.title, options)
  );
});

// Handle notification click
self.addEventListener('notificationclick', (event) => {
  event.notification.close();
  
  event.waitUntil(
    clients.matchAll({ type: 'window' })
      .then((clientList) => {
        if (clientList.length > 0) {
          let client = clientList[0];
          for (let i = 0; i < clientList.length; i++) {
            if (clientList[i].focused) {
              client = clientList[i];
            }
          }
          return client.focus();
        }
        return clients.openWindow(event.notification.data.url);
      })
  );
});
