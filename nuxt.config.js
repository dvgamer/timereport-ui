const config = {
  loading: { color: '#3B8070' },
  css: [
    './assets/scss/index.scss'
  ],
  modules: [
    '@nuxtjs/pwa',
  ],
  plugins: [
    { src: '~/plugins/socket.io.js', ssr: false },
    '~/plugins/vue-meta.js',
    '~/plugins/vue-highcharts.js'
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
        config.module.rules.push({
          test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
          loader: 'url-loader',
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
