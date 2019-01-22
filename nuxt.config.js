const pkg = require('./package')

let config = {
  head: {
    titleTemplate: title => (title ? `${title} · ` : '') + 'DevOps'
  },
  workbox: {
    // Workbox options
  },
  meta: [
    { charset: 'utf-8' },
    { name: 'application-name', content: 'DevOps-UI' },
    { name: 'description', content: pkg.description, id: 'desc' },
    { name: 'viewport', content: 'width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no' },
    { 'http-equiv': 'X-UA-Compatible', content: 'IE=edge' },
    { name: 'apple-mobile-web-app-capable', content: 'yes' },
    { name: 'apple-mobile-web-app-status-bar-style', content: 'black-translucent' },
    { name: 'MobileOptimized', content: 'width' },
    { name: 'HandheldFriendly', content: 'true' }
  ],
  icons: { },
  manifest: {
    name: 'DevOps-UI',
    lang: 'en',
    dir: 'rtl',
    description: pkg.description,
    short_name: 'DevOps',
    icons: [
      { src: '/icon-120.png', sizes: '64x64' },
      { src: '/icon-144.png', sizes: '128x128' },
      { src: '/icon-144.png', sizes: '144x144' }
    ], 
    scope: '/',
    start_url: '/',
    display: 'fullscreen',
    orientation: 'portrait',
    theme_color: '#ffffff',
    background_color: '#ffffff',
    screenshots: [
      {
        src: '/images/640x480.jpg',
        sizes: '640x480',
        type: 'image/jpeg'
      },
      {
        src: '/images/1280x920.jpg',
        sizes: '1280x920',
        type: 'image/jpeg'
      }
    ],
    browser_action: {
      default_icon: '/icon-120.png',
      default_popup: '/'
    }
  },
  // link: [
  //   { rel: 'icon', type: 'image/png', href: '/icon-32.png' },
  //   { rel: 'apple-touch-icon', sizes: '114x114', href: '/icon-114.png' },
  //   { rel: 'apple-touch-icon', sizes: '72x72', href: '/icon-72.png' },
  //   { rel: 'apple-touch-icon', sizes: '57x57', href: '/icon-57.png' },
  //   { rel: 'apple-touch-startup-image', type: 'image/png', href: '/icon-512.png' }
  // ],
  router: {
    middleware: ['auth']
  },
  loading: '~/components/loading/top-bar.vue',
  css: [
    './assets/scss/index.scss',
    // 'codemirror/lib/codemirror.css',
    // 'codemirror/addon/merge/merge.css',
    // 'codemirror/theme/material.css'
  ],
  modules: [
    [ 'bootstrap-vue/nuxt', { css: false } ],
    '@nuxtjs/axios',
    '@nuxtjs/auth',
    '@nuxtjs/font-awesome',
    '@nuxtjs/pwa'
  ],
  plugins: [
    '~/plugins/vue-api.js',
    '~/plugins/vue-installed.js',
    { src: '~/plugins/vue-component.js', ssr: false },
  //   { src: '~/plugins/vue-codemirror.js', ssr: false },
    { src: '~/plugins/socket.io.js', ssr: false }
  ],
  vendor: [ 'axios', 'moment', '~/node_modules/vue-socket.io' ],
  build: {
    extend (config, { isDev, isClient }) {
      if (isDev && isClient) {
        config.module.rules.push({
          enforce: 'pre',
          test: /\.(js|vue)$/,
          loader: 'eslint-loader',
          exclude: /(node_modules)/
        })
      }
    }
  },
  auth: {
    strategies: {
      local: {
        endpoints: {
          login: {
            url: '/auth/login',
            method: 'post',
            propertyName: 'token'
          },
          logout: {
            url: '/auth/logout',
            method: 'post'
          },
          user: {
            url: '/auth/user',
            method: 'get',
            propertyName: 'user'
          }
        }
      }
    },
    redirect: {
      login: '/sign-in',
      logout: '/sign-in',
      home: '/'
    }
  },
  axios: { baseURL: process.env.AXIOS_BASE_URL || 'http://10.0.80.52:25081/' },
  env: {
    dev: process.env.NODE_ENV !== 'production',
    baseURL: process.env.AXIOS_BASE_URL || 'http://10.0.80.52:25081/',
    SOCKET_HOST_URL: process.env.SOCKET_HOST ? `http://${process.env.SOCKET_HOST}:${process.env.SOCKET_PORT}` : 'http://10.0.80.52:25082'
  }
}

if (process.env.NODE_ENV === 'production') {
  config = Object.assign({
    serverMiddleware: [ '~/api/index.js', '~/api/authication/index.js', '~/api/socket-io.js' ]
  }, config)
}
console.log(config)
module.exports = config
