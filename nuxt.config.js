const config = {
  loading: { color: '#3B8070' },
  css: [
    './assets/font-awesome/css/font-awesome.min.css',
    './assets/scss/index.scss'
  ],
  modules: [
    '@nuxtjs/pwa',
  ],
  plugins: [
    '~/plugins/vue-meta.js',
    { src: '~/plugins/socket.io.js', ssr: false },
    { src: '~/node_modules/bootstrap/dist/js/bootstrap.js', ssr: false },
    '~/plugins/vue-highcharts.js'
  ],
  vendor: ['jquery', 'axios', '~/node_modules/vue-socket.io'],
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
  }
}

if (process.env.NODE_ENV === 'production') {
  config = Object.assign({
    serverMiddleware: [ '~/api/index.js' ],
    axios: {
      baseURL: process.env.API_URL || 'http://localhost:3000/api'
    },
    env: {
      SOCKET_HOST_URL: process.env.SOCKET_HOST_URL || 'http://localhost:3001'
    }
  }, config)
}
module.exports = config
