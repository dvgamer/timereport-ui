let config = {
  head: {
    titleTemplate: title => `${title ? `${title} · ` : ''}DevOps`
  },
  meta: [
    { charset: 'utf-8' },
    { name: 'application-name', content: 'DevOps-UI' },
    { name: 'description', content: 'pkg.description', id: 'desc' },
    { name: 'viewport', content: 'width=device-width, user-scalable=no' },
    { 'http-equiv': 'X-UA-Compatible', content: 'IE=edge' },
    { name: 'apple-mobile-web-app-capable', content: 'yes' },
    { name: 'apple-mobile-web-app-status-bar-style', content: 'black-translucent' },
    { name: 'apple-mobile-web-app-title', content: 'DevOps-UI' },
    { name: 'author', content: 'Mr. Kananek T.' },
    { name: 'MobileOptimized', content: 'width' },
    { name: 'HandheldFriendly', content: 'true' }
  ],
  icons: {
    sizes: [ 16, 120, 144 ]
  },
  manifest: {
    name: 'DevOps',
    lang: 'en',
    dir: 'rtl',
    description: '',
    short_name: 'DevOps',
    icons: [
      { src: '/icon-16.png', sizes: '16x16' },
      { src: '/icon-120.png', sizes: '120x120' },
      { src: '/icon-144.png', sizes: '144x144' }
    ], 
    scope: '/',
    start_url: '/sign-in',
    display: 'fullscreen',
    orientation: 'portrait',
    theme_color: '#ffffff',
    background_color: '#ffffff',
    browser_action: {
      default_icon: '/icon-16.png',
      default_popup: '/'
    }
  },
  workbox: {
    // Workbox options
  },
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
    'nuxt-fontawesome',
    'bootstrap-vue/nuxt',
    '@nuxtjs/axios',
    '@nuxtjs/auth',
    '@nuxtjs/pwa'
  ],
  bootstrapVue: { bootstrapCSS: false },
  plugins: [
    '~/plugins/vue-api.js',
    './plugins/vue-toast.js',
    '~/plugins/vue-installed.js',
    { src: '~/plugins/vue-component.js', ssr: false },
  //   { src: '~/plugins/vue-codemirror.js', ssr: false },
    { src: '~/plugins/socket.io.js', ssr: false }
  ],
  vendor: [ 'moment', '~/node_modules/vue-socket.io' ],
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
  fontawesome: {
    component: 'fa',
    imports: [
      { icons: ['fas'], set: '@fortawesome/free-solid-svg-icons' }
    ]
  },
  axios: { baseURL: process.env.AXIOS_BASE_URL || 'http://10.0.80.52:25081/' },
  env: {
    dev: process.env.NODE_ENV !== 'production',
    baseURL: process.env.AXIOS_BASE_URL || 'http://10.0.80.52:25081/',
    SOCKET_HOST_URL: process.env.SOCKET_HOST ? `http://${process.env.SOCKET_HOST}:${process.env.SOCKET_PORT}` : 'http://10.0.80.52:25082'
  }
}

module.exports = config
