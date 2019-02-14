importScripts('/_nuxt/workbox.4c4f5ca6.js')

workbox.precaching.precacheAndRoute([
  {
    "url": "/_nuxt/072fa4f34316776f066c.js",
    "revision": "d0145b6fe0c767ca8b21e19b9c610113"
  },
  {
    "url": "/_nuxt/14ac009ac7295a45693c.js",
    "revision": "a800877b3adb00802cadbf9f5890da70"
  },
  {
    "url": "/_nuxt/23379c1fa581da4a81af.js",
    "revision": "9c0de4002f3e77f23bde90985c8393bb"
  },
  {
    "url": "/_nuxt/3ceb0137ae0580906e31.js",
    "revision": "a5848eb6d416b0bf6ac6aaeeaa7c7811"
  },
  {
    "url": "/_nuxt/406ff422f1e6e4f4f1b0.js",
    "revision": "91b0c2e0ef6e9ba94fd73474b0da12ca"
  },
  {
    "url": "/_nuxt/612d3dc8d62868c04ad1.js",
    "revision": "1629e5ada417fc0e8fb9870ade15239f"
  },
  {
    "url": "/_nuxt/6265ee2987bfa31e5d1c.js",
    "revision": "2f4e5a93c282ccf71c48f4875b5f7ca8"
  },
  {
    "url": "/_nuxt/6cef2977cd990fea6e21.js",
    "revision": "c901f43a629aac1fec5bfdf1def25b5b"
  },
  {
    "url": "/_nuxt/961f87c875e5e169ed4e.js",
    "revision": "a188f17ff454582a86dd50aa9808b5e4"
  },
  {
    "url": "/_nuxt/a3bd2ab4a275fbd9cdd3.js",
    "revision": "268ca88d482a61012455d442f9c553cd"
  },
  {
    "url": "/_nuxt/b48c7681f8f9013e733d.js",
    "revision": "10572eea7a3044c2c9af004eee2e57a3"
  },
  {
    "url": "/_nuxt/b7589922d82c328436a0.js",
    "revision": "a914ef5302b491040c9c5154f3b1cca5"
  },
  {
    "url": "/_nuxt/c36bd24acea7d0b3c22d.js",
    "revision": "42ce9c62da596e1c5f21098e232bb27f"
  },
  {
    "url": "/_nuxt/e1f389064fdcbb20b8e4.js",
    "revision": "5af407a5848f2fc4968ddee061e2041e"
  },
  {
    "url": "/_nuxt/e41fb8be59415cd69d44.js",
    "revision": "8adaca1fa8377c92139e131b019a7c7c"
  },
  {
    "url": "/_nuxt/e4a1f8855d95a8818317.js",
    "revision": "ffcaba7f707a35ae26ed108fd24dc50e"
  },
  {
    "url": "/_nuxt/ec6b7eb5c7d357e1d5c5.js",
    "revision": "9161ce1b3dc8fad8b3f7680b36b33e46"
  },
  {
    "url": "/_nuxt/ec7fd8348a54745f60f2.js",
    "revision": "c10e2abcbc4c2ffce706ccde35b6029a"
  },
  {
    "url": "/_nuxt/fd28affc8369354d60b8.js",
    "revision": "3035ed3843525231ce64f27829900e45"
  }
], {
  "cacheId": "devops-ui",
  "directoryIndex": "/",
  "cleanUrls": false
})

workbox.clientsClaim()
workbox.skipWaiting()

workbox.routing.registerRoute(new RegExp('/_nuxt/.*'), workbox.strategies.cacheFirst({}), 'GET')

workbox.routing.registerRoute(new RegExp('/.*'), workbox.strategies.networkFirst({}), 'GET')
