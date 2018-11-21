import Vue from 'vue'
import { VueSlideoutPanel } from 'vue2-slideout-panel'

Vue.component('slideout-panel', VueSlideoutPanel)

Vue.directive('focus', {
  inserted: (el) => {
    el.focus()
  },
  update: (el) => {
    Vue.nextTick(() => {
      el.focus()
    })
  }
})
