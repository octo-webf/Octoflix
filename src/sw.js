importScripts('https://storage.googleapis.com/workbox-cdn/releases/4.3.1/workbox-sw.js');

workbox.core.skipWaiting()
workbox.core.clientsClaim()
workbox.googleAnalytics.initialize();

workbox.routing.registerRoute(
  new RegExp('/styles/'),
  new workbox.strategies.CacheFirst()
)
workbox.routing.registerRoute(
  new RegExp('*.jpg'),
  new workbox.strategies.CacheFirst()
)

self.addEventListener('push', (event) => {
  const title = 'Get Started With Workbox'
  const options = {
    body: event.data.text()
  }
  console.log(`Evènement push reçu avec le texte : "${event.data.text()}"`)

  event.waitUntil(self.registration.showNotification(title, options))
})
self.addEventListener('notificationclose', event => {
  const notification = event.notification
  const primaryKey = notification.data.primaryKey
  console.log('Closed notification: ' + primaryKey)
})


workbox.precaching.precacheAndRoute(self.__precacheManifest)

workbox.routing.registerRoute(/^https:\/\/tv.octo.com\/api\/v2*/, new workbox.strategies.StaleWhileRevalidate({ plugins: [new workbox.cacheableResponse.Plugin({ statuses: [ 0, 200 ] })] }), 'GET')
