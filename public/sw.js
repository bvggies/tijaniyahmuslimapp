// Dynamic cache version based on build timestamp
const BUILD_VERSION = new Date().getTime();
const CACHE_NAME = `tijaniyah-muslim-app-v${BUILD_VERSION}`;
const urlsToCache = [
  '/',
  '/prayer-times',
  '/qibla',
  '/duas',
  '/tasbih',
  '/quran',
  '/wazifa',
  '/lazim',
  '/zikr-jumma',
  '/journal',
  '/scholars',
  '/community',
  '/mosques',
  '/ai-noor',
  '/makkah-live',
  '/login',
  '/register',
  '/admin/login',
  '/admin/dashboard',
  '/manifest.json'
];

// Install event - cache resources and skip waiting
self.addEventListener('install', (event) => {
  console.log('Service Worker installing...');
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => {
        console.log('Opened cache');
        return cache.addAll(urlsToCache);
      })
      .then(() => {
        // Skip waiting to activate immediately
        return self.skipWaiting();
      })
  );
});

// Fetch event - serve from cache when offline
self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request)
      .then((response) => {
        // Return cached version or fetch from network
        if (response) {
          return response;
        }
        
        // Handle API requests gracefully
        if (event.request.url.includes('/api/')) {
          return new Response(JSON.stringify({ error: 'API not available' }), {
            status: 404,
            headers: { 'Content-Type': 'application/json' }
          });
        }
        
        return fetch(event.request).catch(() => {
          // Return a fallback page for navigation requests
          if (event.request.destination === 'document') {
            return caches.match('/');
          }
          return new Response('Network error', { status: 408 });
        });
      })
  );
});

// Activate event - clean up old caches and claim clients
self.addEventListener('activate', (event) => {
  console.log('Service Worker activating...');
  event.waitUntil(
    Promise.all([
      // Clean up old caches
      caches.keys().then((cacheNames) => {
        return Promise.all(
          cacheNames.map((cacheName) => {
            if (cacheName !== CACHE_NAME) {
              console.log('Deleting old cache:', cacheName);
              return caches.delete(cacheName);
            }
          })
        );
      }),
      // Claim all clients immediately
      self.clients.claim()
    ])
  );
});

// Background sync for prayer times
self.addEventListener('sync', (event) => {
  if (event.tag === 'prayer-times-sync') {
    event.waitUntil(
      // Update prayer times in background
      updatePrayerTimes()
    );
  }
});

// Push notification for prayer times
self.addEventListener('push', (event) => {
  const options = {
    body: event.data ? event.data.text() : 'Prayer time reminder',
    icon: '/icons/icon-192x192.png',
    badge: '/icons/badge-72x72.png',
    vibrate: [100, 50, 100],
    data: {
      dateOfArrival: Date.now(),
      primaryKey: 1
    },
    actions: [
      {
        action: 'explore',
        title: 'Open App',
        icon: '/icons/checkmark.png'
      },
      {
        action: 'close',
        title: 'Close',
        icon: '/icons/xmark.png'
      }
    ]
  };

  event.waitUntil(
    self.registration.showNotification('Tijaniyah Muslim App', options)
  );
});

// Handle notification clicks
self.addEventListener('notificationclick', (event) => {
  event.notification.close();

  if (event.action === 'explore') {
    event.waitUntil(
      clients.openWindow('/')
    );
  }
});

// Handle messages from the main thread
self.addEventListener('message', (event) => {
  if (event.data && event.data.type === 'SKIP_WAITING') {
    self.skipWaiting();
  }
  
  if (event.data && event.data.type === 'CACHE_INVALIDATE') {
    // Clear all caches and reload
    event.waitUntil(
      caches.keys().then((cacheNames) => {
        return Promise.all(
          cacheNames.map((cacheName) => caches.delete(cacheName))
        );
      }).then(() => {
        // Notify all clients to reload
        return self.clients.matchAll().then((clients) => {
          clients.forEach((client) => {
            client.postMessage({ type: 'RELOAD' });
          });
        });
      })
    );
  }
});

// Helper function to update prayer times
async function updatePrayerTimes() {
  try {
    // Since we don't have a real API, just log that sync was attempted
    console.log('Prayer times sync attempted - no API available');
    
    // In a real app, you would fetch from your API here
    // const response = await fetch('/api/prayer-times');
    // const data = await response.json();
    
    console.log('Prayer times sync completed (mock)');
  } catch (error) {
    console.error('Failed to update prayer times:', error);
  }
}
