export const state = () => ({
  appName: 'DevOps',
  version: 'v1.1',
  loading: false
})

export const mutations = {
  setWait(state, val) {
    state.loading = val ? val : !state.loading
  }
}
