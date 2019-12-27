// User Model
import { Model } from '@vuex-orm/core'

export default class App extends Model {
  static get entity () { return 'app' }
  static fields () {
    return {
      appName: this.attr(''),
      version: this.attr(''),
      expaned: this.attr(false),
      loading: this.attr(false),
      menu: this.attr('')
    }
  }
}
