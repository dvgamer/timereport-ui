importScripts('/_nuxt/workbox.5c678697.js')

workbox.precaching.precacheAndRoute([
  {
    "url": "/_nuxt/0503bdbc0b506a3ce4e8.js",
    "revision": "130ebd10560dda94037cd602292dac02"
  },
  {
    "url": "/_nuxt/13e8b06e3b47e1abb1d5.js",
    "revision": "37c5e35220173cf5ab806cd8ce89c8b9"
  },
  {
    "url": "/_nuxt/2eaf12242766d49e99f9.js",
    "revision": "808d74fc411bf43a10c20c614fa2f8fa"
  },
  {
    "url": "/_nuxt/3619ae21292d017aa7d6.js",
    "revision": "2363f19244711a10136b673df06dc093"
  },
  {
    "url": "/_nuxt/4e0fbe035c759954ad14.js",
    "revision": "a5cf4c12b20f920a185c3f25476c9572"
  },
  {
    "url": "/_nuxt/68a1fcc7694b17608d92.js",
    "revision": "03689ec15da255ee9c70becefa0578f9"
  },
  {
    "url": "/_nuxt/690a46f39a30d479d7e8.js",
    "revision": "42048232041775683a13029235f3423a"
  },
  {
    "url": "/_nuxt/71914790770826a205fa.js",
    "revision": "c927150d8d28e44a1f472812864ba228"
  },
  {
    "url": "/_nuxt/77a1c42a0313029d50ee.js",
    "revision": "640e927226a6254ec3fbdee0a508fef9"
  },
  {
    "url": "/_nuxt/99fe10a4267a65639751.js",
    "revision": "b54c5b990d3e1a5a2b43febe55222a87"
  },
  {
    "url": "/_nuxt/9a065f1efefa953452cb.js",
    "revision": "b991d8d458e108b3d75cfcbe4798c16c"
  },
  {
    "url": "/_nuxt/bab4d878aa99a476b964.js",
    "revision": "240b992b803608b65aa58cbac673b8d6"
  },
  {
    "url": "/_nuxt/bac0376bd85f9a8823b9.js",
    "revision": "a5078b5d3d837ec594981893e17cf77d"
  },
  {
    "url": "/_nuxt/e324ce25293f7168568b.js",
    "revision": "53ed292558c30854e80ff4dd7e39a0ff"
  },
  {
    "url": "/_nuxt/e5a2084ef1f11a4be337.js",
    "revision": "310cb7a09918734aef36c4535d651acb"
  },
  {
    "url": "/_nuxt/ee35fca7a6bae84e44a9.js",
    "revision": "13cb33dd49cf13e6c5a7b19f67b70cc4"
  },
  {
    "url": "/_nuxt/f742d1bc50c2b65a177d.js",
    "revision": "21567409360e6c6a9b981c41f98abc77"
  },
  {
    "url": "/_nuxt/fbd20d0ec235cad79e20.js",
    "revision": "277d678432d529f47b037eebe46b56a3"
  },
  {
    "url": "/_nuxt/fef01b181555fe4c2395.js",
    "revision": "2467c326940cc73f52fd2783de0e519f"
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
