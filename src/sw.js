// Let's have it locally. Run "workbox copyLibraries dist"
importScripts('workbox-v3.0.0/workbox-sw.js');

// SETTINGS

// Verbose logging even for the production
workbox.setConfig({ debug: true });
workbox.core.setLogLevel(workbox.core.LOG_LEVELS.debug);

// Modify SW update cycle
workbox.skipWaiting();
workbox.clientsClaim();

// PRECACHING

// We inject manifest here using "workbox-build" in workbox-build-inject.js
workbox.precaching.precacheAndRoute([
  {
    "url": "0.index.js",
    "revision": "8acfc74c6a48584e7799f9d5b949f325"
  },
  {
    "url": "assets/icon/android-icon-144x144.png",
    "revision": "7a11cb68378262184377a4c77d202cda"
  },
  {
    "url": "assets/icon/android-icon-192x192.png",
    "revision": "0f882d624ae536b5b004ecb7dcb719cb"
  },
  {
    "url": "assets/icon/android-icon-36x36.png",
    "revision": "7226392317bdf678dc1483093c8cc895"
  },
  {
    "url": "assets/icon/android-icon-48x48.png",
    "revision": "24c6dab69274a9276cf03f5ba1f4fb0a"
  },
  {
    "url": "assets/icon/android-icon-72x72.png",
    "revision": "861b834deeefa3b3c4072567ccaa5fe8"
  },
  {
    "url": "assets/icon/android-icon-96x96.png",
    "revision": "bc0ee5518ccca23d55024f212d2b7746"
  },
  {
    "url": "assets/icon/apple-icon-114x114.png",
    "revision": "847154dd8bbdb2e90d516eab8db06123"
  },
  {
    "url": "assets/icon/apple-icon-120x120.png",
    "revision": "c64b0b11ed6a49003e59a5d309b47824"
  },
  {
    "url": "assets/icon/apple-icon-144x144.png",
    "revision": "7a11cb68378262184377a4c77d202cda"
  },
  {
    "url": "assets/icon/apple-icon-152x152.png",
    "revision": "67ab8b40a30e5b29de0cfab7fd792ef8"
  },
  {
    "url": "assets/icon/apple-icon-180x180.png",
    "revision": "11d3cacf48cc772a61fcf7eaa5ba0237"
  },
  {
    "url": "assets/icon/apple-icon-57x57.png",
    "revision": "a55c0ebdeb40e21d14a239995aab6f3e"
  },
  {
    "url": "assets/icon/apple-icon-60x60.png",
    "revision": "a52fffde474d89e2104a5871538ac53d"
  },
  {
    "url": "assets/icon/apple-icon-72x72.png",
    "revision": "861b834deeefa3b3c4072567ccaa5fe8"
  },
  {
    "url": "assets/icon/apple-icon-76x76.png",
    "revision": "e2b5310a67646c0922533c7d377a429c"
  },
  {
    "url": "assets/icon/apple-icon-precomposed.png",
    "revision": "24820ac96dfac68ec90211c7b56e49c6"
  },
  {
    "url": "assets/icon/apple-icon.png",
    "revision": "24820ac96dfac68ec90211c7b56e49c6"
  },
  {
    "url": "assets/icon/favicon-16x16.png",
    "revision": "cd975b64fd102830af00a0b8d8755b9c"
  },
  {
    "url": "assets/icon/favicon-32x32.png",
    "revision": "17fc1cd596e4ac4769de7a2d3d7e0065"
  },
  {
    "url": "assets/icon/favicon-96x96.png",
    "revision": "bc0ee5518ccca23d55024f212d2b7746"
  },
  {
    "url": "assets/icon/favicon.ico",
    "revision": "3ff657c99464aaedc4102447c07871e9"
  },
  {
    "url": "assets/icon/ms-icon-144x144.png",
    "revision": "7a11cb68378262184377a4c77d202cda"
  },
  {
    "url": "assets/icon/ms-icon-150x150.png",
    "revision": "552cf0c0c5d2daf6e6a7b7205c6534e1"
  },
  {
    "url": "assets/icon/ms-icon-310x310.png",
    "revision": "856b129c3a9b7ba6daeaf188e66e8581"
  },
  {
    "url": "assets/icon/ms-icon-70x70.png",
    "revision": "38611f8085977b0f188d40f55caa5c1d"
  },
  {
    "url": "hammer.min.js",
    "revision": "084aa824c6e6f64cf28551d070abe00c"
  },
  {
    "url": "humans.txt",
    "revision": "d41d8cd98f00b204e9800998ecf8427e"
  },
  {
    "url": "index.html",
    "revision": "679f1a4104ef8bfcd5ffe8e2831afa8b"
  },
  {
    "url": "index.js",
    "revision": "57d9b1050f5ea95e8d7264bea7dae3b7"
  },
  {
    "url": "manifest.json",
    "revision": "d41d8cd98f00b204e9800998ecf8427e"
  },
  {
    "url": "robots.txt",
    "revision": "d41d8cd98f00b204e9800998ecf8427e"
  },
  {
    "url": "styles.css",
    "revision": "a23a12408e3c28d1a3edec889e58cacf"
  }
]);

// RUNTIME CACHING

// Google fonts
workbox.routing.registerRoute(
  new RegExp('https://fonts.(?:googleapis|gstatic).com/(.*)'),
  workbox.strategies.staleWhileRevalidate({
    cacheName: 'googleapis',
    plugins: [
      new workbox.expiration.Plugin({
        maxEntries: 30
      })
    ]
  })
);

// API with network-first strategy
workbox.routing.registerRoute(
  /(http[s]?:\/\/)?([^\/\s]+\/)timeline/,
  workbox.strategies.networkFirst()
);

// API with cache-first strategy
workbox.routing.registerRoute(
  /(http[s]?:\/\/)?([^\/\s]+\/)favorites/,
  workbox.strategies.cacheFirst()
);

// PUSH NOTIFICATIONS

// Receive push and show a notification
self.addEventListener('push', function (event) {
  console.log('[Service Worker]: Received push event', event);

  var notificationData = {};

  if (event.data.json()) {
    notificationData = event.data.json().notification; // "notification node is specific for @angular/service-worker
  } else {
    notificationData = {
      title: 'Something Has Happened',
      message: 'Something you might want to check out',
      icon: '/assets/images/logo.png'
    };
  }

  self.registration.showNotification(notificationData.title, notificationData);
});

// Custom notification actions
self.addEventListener('notificationclick', function (event) {
  console.log('[Service Worker]: Received notificationclick event');

  event.notification.close();

  if (event.action == 'opentweet') {
    console.log('[Service Worker]: Performing action opentweet');

    event.waitUntil(
      clients.openWindow(event.notification.data).then(function (windowClient) {
        // do something with the windowClient.
      })
    );
  } else {
    console.log('[Service Worker]: Performing default click action');

    // This looks to see if the current is already open and
    // focuses if it is
    event.waitUntil(

      clients.matchAll({
        includeUncontrolled: true,
        type: 'window'
      })
        .then(function (clientList) {
          for (var i = 0; i < clientList.length; i++) {
            var client = clientList[i];
            if (client.url == '/' && 'focus' in client)
              return client.focus();
          }
          if (clients.openWindow)
            return clients.openWindow('/');
        }));
  }
});

// BACKGROUND SYNC

// Registering a route for retries
workbox.routing.registerRoute(
  /(http[s]?:\/\/)?([^\/\s]+\/)post-tweet/,
  workbox.strategies.networkOnly({
    plugins: [
      new workbox.backgroundSync.Plugin('tweetsQueue', {
        maxRetentionTime: 24 * 60 // Retry for max of 24 Hours
      })
    ]
  }),
  'POST'
);

// GOOGLE ANALYTICS

workbox.googleAnalytics.initialize({
  parameterOverrides: {
    dimension1: 'offline'
  }
});
