// Listly Service Worker
// Handles push notifications when the app is closed or in background

importScripts('https://www.gstatic.com/firebasejs/10.12.0/firebase-app-compat.js');
importScripts('https://www.gstatic.com/firebasejs/10.12.0/firebase-messaging-compat.js');

firebase.initializeApp({
  apiKey: "AIzaSyBQft5tmfB2vpAd6khTikxH53fYjbLwI60",
  authDomain: "listly-ba9f1.firebaseapp.com",
  projectId: "listly-ba9f1",
  storageBucket: "listly-ba9f1.firebasestorage.app",
  messagingSenderId: "242129231985",
  appId: "1:242129231985:web:9de53fe0d9d3662362bbd0"
});

const messaging = firebase.messaging();

// Show notification when app is in background or closed
messaging.onBackgroundMessage(payload => {
  const { title, body } = payload.notification;
  self.registration.showNotification(title, {
    body: body,
    icon: 'https://dangamble6.github.io/listly/icon.png',
    badge: 'https://dangamble6.github.io/listly/icon.png',
    vibrate: [100, 50, 100],
    requireInteraction: false,
    data: { url: 'https://dangamble6.github.io/listly' }
  });
});

// Open app when notification is tapped
self.addEventListener('notificationclick', event => {
  event.notification.close();
  event.waitUntil(
    clients.matchAll({ type: 'window', includeUncontrolled: true }).then(clientList => {
      // If app is already open, focus it
      for (const client of clientList) {
        if (client.url.includes('dangamble6.github.io/listly') && 'focus' in client) {
          return client.focus();
        }
      }
      // Otherwise open it
      return clients.openWindow('https://dangamble6.github.io/listly');
    })
  );
});

self.addEventListener('install', () => self.skipWaiting());
self.addEventListener('activate', event => event.waitUntil(clients.claim()));
