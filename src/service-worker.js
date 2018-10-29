/*jshint esversion: 6 */
// Let's have it locally. Run "workbox copyLibraries dist"
// importScripts('workbox-v3.0.0/workbox-sw.js');
// SETTINGS
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

addEventListener('fetch', event => {
  event.waitUntil(async function() {
    // Exit early if we don't have access to the client.
    // Eg, if it's cross-origin.
    if (!event.clientId) return;

    // Get the client.
    const client = await clients.get(event.clientId);
    // Exit early if we don't get the client.
    // Eg, if it closed.
    if (!client) return;

    // Send a message to the client.
    self.clients.matchAll().then(function (clients){
      clients.forEach(function(client){
        client.postMessage({
          msg: "Hey I just got a fetch from you!",
          url: event.request.url
        });
      });
    });
   
  }());
});

addEventListener('fetch', event => {
  event.waitUntil(async function() {
    // Exit early if we don't have access to the client.
    // Eg, if it's cross-origin.
    if (!event.clientId) return;

    // Get the client.
    const client = await clients.get(event.clientId);
    // Exit early if we don't get the client.
    // Eg, if it closed.
    if (!client) return;

    // Send a message to the client.
    self.clients.matchAll().then(function (clients){
      clients.forEach(function(client){
        client.postMessage({
          msg: "Hey I just got a fetch from you!",
          url: event.request.url
        });
      });
    });
   
  }());
});

self.addEventListener('fetch', event => {
  event.waitUntil(async function() {
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
            const client = await clients.get(event.clientId);
            // messageClient('auth', 'reauthorize', event.clientId)

            if (client) {
              client.postMessage({
                channel: 'auth',
                message: 'reauthorize'
              });
            }
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
