importScripts('/_nuxt/workbox.5c678697.js')

workbox.precaching.precacheAndRoute([
  {
    "url": "/_nuxt/08cdc0460aed76e47aa9.js",
    "revision": "24bcff5bca8275ffa642fc667519be42"
  },
  {
    "url": "/_nuxt/3bf65eaf53c840ebc634.js",
    "revision": "bba058e93cd6c21524d6b41484ba07e1"
  },
  {
    "url": "/_nuxt/650e28a687f08af155e1.js",
    "revision": "8de33127cd4e02c8c375d7b62424d0cb"
  },
  {
    "url": "/_nuxt/661dbb82c7742d15b8f8.js",
    "revision": "fedfd3d7010e10ebc91f348bd1221e5c"
  },
  {
    "url": "/_nuxt/6bd9b4ac468fe1ea3a0d.js",
    "revision": "812b8559f824fb25233c7e4a25fb4693"
  },
  {
    "url": "/_nuxt/719042130408f5efd71d.js",
    "revision": "b68d264f5223a71eb9dcd18f3ad143d2"
  },
  {
    "url": "/_nuxt/71a028f7540521566e5e.js",
    "revision": "8db932b36218718fc5395e7a014a1e63"
  },
  {
    "url": "/_nuxt/8d8c81d4cda6d8b07ae5.js",
    "revision": "592a1c1be346c8a9a41dd3427447ae89"
  },
  {
    "url": "/_nuxt/8dd0917fc744178c747e.js",
    "revision": "2fc8a03ca5c7396b150f6bf9d91d7a38"
  },
  {
    "url": "/_nuxt/92bb7df1c2919fd9f69e.js",
    "revision": "00a607066c5eb8838c2b7dbd0c99f081"
  },
  {
    "url": "/_nuxt/9cdecfc4a6b6774b8863.js",
    "revision": "2f2b56d73913c63f65c94336bc26acf3"
  },
  {
    "url": "/_nuxt/a9dcef75780a727ab506.js",
    "revision": "6dedec726b86d5f1aad07d088e99f910"
  },
  {
    "url": "/_nuxt/aa11188649fb231a753b.js",
    "revision": "ca66c6424173052d4f4f0577b6a1f664"
  },
  {
    "url": "/_nuxt/bac0376bd85f9a8823b9.js",
    "revision": "a5078b5d3d837ec594981893e17cf77d"
  },
  {
    "url": "/_nuxt/cdc46786f7b870b3b188.js",
    "revision": "57aa85ac961451b160d7298ae8a578f9"
  },
  {
    "url": "/_nuxt/d0dd781f90e2459691a6.js",
    "revision": "18366a93b98caebe795d1c308fbdd012"
  },
  {
    "url": "/_nuxt/dea10f9344c4fe825532.js",
    "revision": "32bddeeb983e677fae078e92e46347c0"
  },
  {
    "url": "/_nuxt/fb270ce35816592d3fdf.js",
    "revision": "12cff33fcda1221a36a221137bda00b5"
  },
  {
    "url": "/_nuxt/ff9cc0806777c5ef2b8e.js",
    "revision": "f6d28db50a8621de9dc425220a672b40"
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
