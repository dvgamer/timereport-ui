export const state = () => ({
  appName: 'DevOps',
  version: 'v1.1',
  loading: false,
  menu: 'full',
  api: false
})

export const mutations = {
  $page(state, val) {
    state.loading = val ? val : !state.loading
  },
  $api(state, val) {
    state.api = val ? val : !state.api
  },
  $menu(state, val) {
    state.menu = val
  },
  $api(state, val) {
    state.api = val ? val : !state.api
  }
}
