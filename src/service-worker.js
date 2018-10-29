/*jshint esversion: 6 */
// Verbose logging even for the production
workbox.setConfig({
  debug: true
});
workbox.core.setLogLevel(workbox.core.LOG_LEVELS.debug);

// Modify SW update cycle
workbox.skipWaiting();
workbox.clientsClaim();

// PRECACHING

// We inject manifest here using "workbox-build" in workbox-build-inject.js
workbox.precaching.precacheAndRoute([]);

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

/** @type {Console} */
const logger = 'context' in console ? console.context('service-worker') : console;

self.addEventListener('fetch', event => {
  event.waitUntil(function() { 
    // If the request is of type POST, we want to check its response status. An added improvement would be to ensure
    // we only do this for requests to the eva backend, but we would need to figure out a way to load in the current environment endpoints here
    //
    if (event.request.method === 'POST') {
      /**
       * The original request, which we will eventually respond with
       * @type {Request}
       * */
      const originalRequest = event.request;

      /** We will fetch the exact same request and respond with it */
      const response = fetch(originalRequest);

      // We will look at the status of the response
      //
      response.then(res => {
          // If the backend responded with a 403, we want to notify the UI about it
          //
          if (res.status === 403) {
            // Get the client.

            clients.get(event.clientId).then((client) => {
              if (client) {
                client.postMessage({
                  channel: 'auth',
                  message: 'reauthorize'
                });
              }
            });
          }
        })
        .catch(error => {
          logger.error('Request error', error);
        });

      // Responding with the response of the original request
      //
      event.respondWith(response);
    }
  });
});
