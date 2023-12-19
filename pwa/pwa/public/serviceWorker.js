let CACHE_NAME = "my-site-cache-v1";
const urlsToCache = ["/", "/index.html"];


self.addEventListener("install", function (event) {
  // Perform install steps
  event.waitUntil(
    caches.open(CACHE_NAME).then(function (cache) {
      console.log("Opened cache");
      return cache.addAll(urlsToCache);
    })
  );
});

self.addEventListener("fetch", function (event) {
  event.respondWith(
    caches.match(event.request).then(function (response) {
      // If the resource is found in the cache, return it
      if (response) {
        return response;
      }

      // If the resource is not found in the cache, fetch it from the network
      return fetch(event.request)
        .then(function (networkResponse) {
          // Check if the response is valid and if it's a successful response (status 200)
          if (!networkResponse || networkResponse.status !== 200) {
            return networkResponse; // You can customize this part based on your requirements
          }

          // Clone the response to store it in the cache
          var responseToCache = networkResponse.clone();

          // Open the cache and store the fetched response
          caches.open(CACHE_NAME).then(function (cache) {
            cache.put(event.request, responseToCache);
          });

          // Return the network response to the page
          return networkResponse;
        })
        .catch(function (error) {
          console.error("Fetch failed:", error);
          // You can customize the fallback behavior here if the fetch fails
          // For example, you can return a custom offline page
        });
    })
  );
});


self.addEventListener("install", function (event) {
  // Perform install steps
  event.waitUntil(
    caches.open(CACHE_NAME).then(function (cache) {
      console.log("Opened cache");
      return cache.addAll(urlsToCache);
    })
  );
  self.skipWaiting();
});
