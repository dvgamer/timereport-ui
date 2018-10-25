importScripts('/_nuxt/workbox.5c678697.js')



workbox.precaching.precacheAndRoute([
  {
    "url": "/_nuxt/20de481c22de6e5c5d32.js",
    "revision": "76a7e9747a0930233aa600b58de8f984"
  },
  {
    "url": "/_nuxt/2fb17601460d8c88e049.js",
    "revision": "1a1066aa088f36967c83225884dfabaa"
  },
  {
    "url": "/_nuxt/3eeeb8c4e99fa2c15631.js",
    "revision": "3e51f3f9fad245bc775dc946f01cc521"
  },
  {
    "url": "/_nuxt/77f99b970d257f3bf5cd.js",
    "revision": "9a8e4dd2905033f9ca4c3b84d04ed5c8"
  },
  {
    "url": "/_nuxt/79c227d9bc550465f8ce.js",
    "revision": "b2766c2f893a3b62e9bb0f0258f59730"
  },
  {
    "url": "/_nuxt/7a5392ddc9e9f5a4fbd3.js",
    "revision": "6d227a82c7bf5ce9ac25aacc340f8fff"
  },
  {
    "url": "/_nuxt/7b4fcc87dfeae967c77f.js",
    "revision": "5b399257383b65fc59dd596c32b4169a"
  },
  {
    "url": "/_nuxt/866ccc0b97797971b40c.js",
    "revision": "ed105426cc58b6410e6c3451fd22c962"
  },
  {
    "url": "/_nuxt/93ebde953b20bd142cd3.js",
    "revision": "fcf8ee62e4b01cc036aecd0c7bae0c2a"
  },
  {
    "url": "/_nuxt/96e52d5f771e202b9140.js",
    "revision": "47f37ff6fd326a8fba8d0f2957e3909f"
  },
  {
    "url": "/_nuxt/98e4a5fc1e92741a9405.js",
    "revision": "fbb34e8ab19396ee5251f5eac8e05f5d"
  },
  {
    "url": "/_nuxt/b9786bf568f70382dc8f.js",
    "revision": "abe51a4b5d9bcb72f7f89c0a987022c7"
  },
  {
    "url": "/_nuxt/bec3c9dec4f2f95ca467.js",
    "revision": "c14d34bfa92da62f305ac21a83ee31a5"
  },
  {
    "url": "/_nuxt/ca72de247d416c08ab14.js",
    "revision": "9edb5949eab6ef690b807173a7da3537"
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





