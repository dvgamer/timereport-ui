let config = {
  head: {
    titleTemplate: title => (title ? `${title} · ` : '') + 'DevOps'
  },
  loading: '~/components/loading/top-bar.vue',
  css: [
    './assets/scss/index.scss',
    'codemirror/lib/codemirror.css',
    'codemirror/addon/merge/merge.css',
    'codemirror/theme/material.css'
  ],
  modules: [
    [ 'bootstrap-vue/nuxt', { css: false } ],
    '@nuxtjs/axios',
    '@nuxtjs/font-awesome',
    '@nuxtjs/pwa'
  ],
  plugins: [
    '~/plugins/vue-api.js',
    '~/plugins/vue-installed.js',
    { src: '~/plugins/vue-component.js', ssr: false },
    { src: '~/plugins/vue-codemirror.js', ssr: false },
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
  }
}

if (process.env.NODE_ENV === 'production') {
  config = Object.assign({
    serverMiddleware: [ '~/api/index.js' ],
    axios: {
      baseURL: process.env.API_URL || 'http://localhost:3001/api'
    },
    env: {
      SOCKET_HOST_URL: process.env.SOCKET_HOST_URL || 'http://localhost:3001'
    }
  }, config)
}
module.exports = config
