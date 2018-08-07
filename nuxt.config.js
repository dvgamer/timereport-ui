module.exports = {
  /*
  ** Headers of the page
  */
  head: {
    title: 'DevOps Admin',
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
  /*
  ** Customize the progress bar color
  */
  loading: { color: '#3B8070' },
  css: [
    './styles/index.scss',
    'bootstrap-vue/dist/bootstrap-vue.css'
  ],
  plugins: [
    '~/plugins/socket.io.js',
    '~/plugins/bootstrap-vue.js',
    '~/plugins/fontawesome.js'
  ],
  vendor: ['axios','socket.io-client'],
  build: {
    /*
    ** Run ESLint on save
    */
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
  serverMiddleware: [
    // API middleware
    '~/api/index.js'
  ],
  axios: {
    baseURL: process.env.API_URL || 'http://localhost:3002/api'
  },
  env: {
    SOCKET_HOST_URL: process.env.SOCKET_HOST_URL || 'http://localhost:3002'
  }
}
