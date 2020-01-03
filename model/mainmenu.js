// User Model
import { Model } from '@vuex-orm/core'

export default class MainMenu extends Model {
  static get entity () { return 'mainmenu' }
  static fields () {
    return {
      permission: this.attr(0),
      header: this.attr(''),
      divider: this.attr(''),
      group: this.attr(''),
      name: this.attr(''),
      route: this.attr(''),
      icon: this.attr(''),
      size: this.attr(''),
      exact: this.attr(false)
    }
  }
}
