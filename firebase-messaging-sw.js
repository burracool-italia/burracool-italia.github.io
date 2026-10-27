// Service worker delle notifiche (versione web). Riceve le notifiche anche a pagina chiusa.
importScripts('https://www.gstatic.com/firebasejs/10.13.2/firebase-app-compat.js');
importScripts('https://www.gstatic.com/firebasejs/10.13.2/firebase-messaging-compat.js');

firebase.initializeApp({
  apiKey: 'AIzaSyD4154B1UkaJrO3qwrJZxr_pWITCa7Fh_4',
  authDomain: 'gestionale-burraco-30ef8.firebaseapp.com',
  projectId: 'gestionale-burraco-30ef8',
  storageBucket: 'gestionale-burraco-30ef8.firebasestorage.app',
  messagingSenderId: '313151671762',
  appId: '1:313151671762:web:5313cdc183d136fcd08c0b',
});

// Con il messaggio "notification" inviato dal server, il browser mostra da solo la notifica.
firebase.messaging();

// Toccando la notifica si apre (o si riporta in primo piano) l'app.
self.addEventListener('notificationclick', function (event) {
  event.notification.close();
  event.waitUntil(
    clients.matchAll({ type: 'window', includeUncontrolled: true }).then(function (lista) {
      for (const c of lista) {
        if ('focus' in c) return c.focus();
      }
      if (clients.openWindow) return clients.openWindow('/burraco-web/');
    })
  );
});
