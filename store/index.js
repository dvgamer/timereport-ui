import VuexORM from '@vuex-orm/core'
import App from '../model/app'
// import Post from './Post'

// Create a new database instance.
const database = new VuexORM.Database()

// Register Models to the database.
database.register(App)
// database.register(Post)

export default { plugins: [VuexORM.install(database)] }
