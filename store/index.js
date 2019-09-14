export const state = () => ({
  appName: 'DevOps',
  version: 'v1.1',
  loading: false,
  menu: 'full',
  expaned: false,
  api: false
})

export const mutations = {
  expaned(state) {
    state.expaned = !state.expaned
  },
  $page(state, val) {
    state.loading = val !== undefined ? val : !state.loading
  },
  $api(state, val) {
    state.api = val ? val : !state.api
  },
  $menu(state, val) {
    state.menu = val
  }
}
