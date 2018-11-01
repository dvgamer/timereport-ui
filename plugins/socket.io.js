import Vue from 'vue'
import VueSocketio from 'vue-socket.io'

export default ({ env, app }) => {
  console.log('socket:', env.SOCKET_HOST_URL)
  Vue.use(VueSocketio, env.SOCKET_HOST_URL, app.store)
}