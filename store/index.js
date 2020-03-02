import VuexORM from '@vuex-orm/core'
import MainMenu from '~/models/mainmenu'
// import Post from './Post'

// Create a new database instance.
const database = new VuexORM.Database()

// Register Models to the database.
database.register(MainMenu)

export const plugins = [
  VuexORM.install(database)
]

export const state = () => ({
  wait: true,
  loading: false,
  menu: 'main'
})

export const mutations = {
  initilize (state, value) {
    state.wait = value || false
  },
  loading (state, value) {
    state.wait = value || false
  },
  menuToggle (state, value) {
    state.menu = value || 'main'
  }
}
