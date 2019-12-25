const pkg = require('../package.json')

export const state = () => ({
  appName: pkg.display,
  version: `v${pkg.version}`,
  expaned: false,
  loading: false,
  menu: 'full'
})

export const mutations = {
  expaned (state) {
    state.expaned = !state.expaned
  },
  $page (state, val) {
    state.loading = val !== undefined ? val : !state.loading
  },
  $api (state, val) {
    state.api = val || !state.api
  },
  $menu (state, val) {
    state.menu = val
  }
}
