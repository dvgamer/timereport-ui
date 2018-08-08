module.exports = {
  head: {
    title: 'DevOps Realtime',
    meta: [
      { charset: 'utf-8' },
      { 'http-equiv': 'X-UA-Compatible', content: 'IE=edge' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no' },
      { name: 'apple-mobile-web-app-capable', content: 'yes' },
      { name: 'apple-mobile-web-app-status-bar-style', content: 'black-translucent' },
      { name: 'MobileOptimized', content: 'width' },
      { name: 'HandheldFriendly', content: 'true' }
    ],
    script: [
      { src: 'https://unpkg.com/feather-icons/dist/feather.min.js' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
    ]
  },
  loading: { color: '#3B8070' },
  css: [
    './styles/index.scss',
    'bootstrap-vue/dist/bootstrap-vue.css'
  ],
  plugins: [
    { src: '~/plugins/socket.io.js', ssr: false },
    '~/plugins/vue-highcharts.js',
    '~/plugins/vue-bootstrap.js',
    '~/plugins/fontawesome.js'
  ],
  vendor: ['axios', '~/node_modules/vue-socket.io'],
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
  serverMiddleware: [ '~/api/index.js' ],
  axios: {
    baseURL: process.env.API_URL || 'http://localhost:3000/api'
  },
  env: {
    SOCKET_HOST_URL: process.env.SOCKET_HOST_URL || 'http://localhost:3001'
  }
}
