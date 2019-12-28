import VuexORM from '@vuex-orm/core'
import MainMenu from '../model/mainmenu'
// import Post from './Post'

// Create a new database instance.
const database = new VuexORM.Database()

// Register Models to the database.
database.register(MainMenu)
// database.register(Post)

export default { plugins: [VuexORM.install(database)] }
