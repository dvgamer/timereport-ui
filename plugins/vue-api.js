import Vue from 'vue'
import * as axios from 'axios'

export default (ctx) => {
  let { env, store, route } = ctx

  let _axios = axios.create({
    baseURL: env.baseURL
  })
  let _api = async (method, url, body) => {
    let res = []
    try {
      store.commit('$api', true)
      let ax = await _axios[method](url, body)

      if (!(ax.data instanceof Array) || ax.data.error) throw new Error(ax.data.error)
      if (ax.status !== 200) throw new Error(ax.statusText) 
      res = ax.data
    } catch (ex) {
      console.log('ERROR-API::', ex.message)
      res = []
    }
    store.commit('$api', false)
    return res
  }

  ctx.$api = {
    async get ( url, data) {
      let res = await _api('get', url, data)
      return res
    },
    async post () {
      let data = await _api('post', url, data)
      return res
    }
  }

  // Vue.use(VueSocketio, 'http://localhost:5000', app.store)
}

// export default 
