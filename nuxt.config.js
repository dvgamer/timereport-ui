let config = {
  head: {
    titleTemplate: title => (title ? `${title} · ` : '') + 'DevOps'
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
    cookie: false,
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
  axios: { baseURL: process.env.AXIOS_BASE_URL || 'http://localhost:3001/' },
  env: {
    dev: process.env.NODE_ENV !== 'production',
    baseURL: process.env.AXIOS_BASE_URL || 'http://localhost:3001/',
    SOCKET_HOST_URL: process.env.SOCKET_HOST ? `http://${process.env.SOCKET_HOST}:${process.env.SOCKET_PORT}` : 'http://localhost:3010'
  }
}

if (process.env.NODE_ENV === 'production') {
  config = Object.assign({
    serverMiddleware: [ '~/api/index.js', '~/api/auth/index.js', '~/api/socket-io.js' ]
  }, config)
}
module.exports = config
