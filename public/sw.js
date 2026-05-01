/* eslint-disable */
/* Minimal SW for offline-ish navigation and asset caching */

const CACHE_NAME = 'rr-pwa-v1'

const STATIC_ASSETS = [
  '/',
  '/docs/',
  '/manifest.webmanifest',
  '/logo-react-rescuer.webp',
]

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches
      .open(CACHE_NAME)
      .then((cache) => cache.addAll(STATIC_ASSETS))
      .then(() => self.skipWaiting())
  )
})

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches
      .keys()
      .then((keys) => Promise.all(keys.map((k) => (k === CACHE_NAME ? null : caches.delete(k)))))
      .then(() => self.clients.claim())
  )
})

const isHtml = (request) =>
  request.mode === 'navigate' || (request.headers.get('accept') || '').includes('text/html')

self.addEventListener('fetch', (event) => {
  const req = event.request
  if (req.method !== 'GET') return

  const url = new URL(req.url)
  if (url.origin !== self.location.origin) return

  // Don't cache Next data requests or API
  if (url.pathname.startsWith('/api')) return
  if (url.pathname.startsWith('/_next/data')) return

  // HTML: network-first (fresh content), fallback to cache
  if (isHtml(req)) {
    event.respondWith(
      fetch(req)
        .then((res) => {
          const copy = res.clone()
          caches.open(CACHE_NAME).then((cache) => cache.put(req, copy)).catch(() => {})
          return res
        })
        .catch(() => caches.match(req).then((cached) => cached || caches.match('/')))
    )
    return
  }

  // Assets: cache-first
  event.respondWith(
    caches.match(req).then((cached) => {
      if (cached) return cached
      return fetch(req).then((res) => {
        const copy = res.clone()
        caches.open(CACHE_NAME).then((cache) => cache.put(req, copy)).catch(() => {})
        return res
      })
    })
  )
})
