import Vue from 'vue'
import VueSocketIO from 'vue-socket.io'
const store = require('../store')

export default ({ env, app }) => {
  Vue.use(new VueSocketIO({
    debug: true,
    connection: env.SOCKET_HOST_URL,
    vuex: {
      store,
      actionPrefix: '__io_',
      mutationPrefix: '__io_'
    }
}))



}