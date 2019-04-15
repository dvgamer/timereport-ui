import Vue from 'vue'
// import { VueSlideoutPanel } from 'vue2-slideout-panel'
import Gravatar from 'vue-gravatar'
import { Scrolly, ScrollyViewport, ScrollyBar } from './vue-scrolly'
import VueElementLoading from 'vue-element-loading'

Vue.component('VueElementLoading', VueElementLoading)
Vue.component('scrolly', Scrolly)
Vue.component('scrolly-viewport', ScrollyViewport)
Vue.component('scrolly-bar', ScrollyBar)
Vue.component('v-gravatar', Gravatar)
// Vue.component('slideout-panel', VueSlideoutPanel)

const elemKeydown = (element, $elem, settings, event) => {
  const isTab = event.which == 9
  const isRevTab = isTab && event.shiftKey
  const isEnter = event.which == 13
  const isIgnore = false // $fld.is(".enter-ignore")
  const isKeyOff = false // $fld.is(".tab-keyoff")
  if (isTab && isKeyOff) return
  if (isTab || (settings.enterKey && isEnter && !isIgnore)) {
    event.preventDefault()
    if (isRevTab) focusPrev($elem); else focusNext($elem)
  }
}

const focusPrev = pool => {
  if (pool.length < 1) return
  let a = document.activeElement
  if (!a || pool.indexOf(a) == -1) {
    pool[0].focus()
    return
  }
  let i = pool.indexOf(a)
  pool[i > 0 ? (i - 1) : (pool.length - 1)].focus()
}
const focusNext = pool => {
  let a = document.activeElement
  if (!a || pool.indexOf(a) == -1) {
    pool[0].focus()
    return
  }

  let i = pool.indexOf(a)
  pool[i < pool.length - 1 ? i + 1 : 0].focus()
}

const elementFind = (el, tagname) => {
  for (const e of el.getElementsByTagName(tagname)) {
    if (e.hasAttribute('tabindex')) el.$elem.push(e)
  }
}

Vue.directive('tabindex', {
  bind: (el) => {
  },
  inserted: (el, binding) => {
    el.$elem = []
    const settings = { enterKey: !!binding.modifiers.enter } // v-if="!activate || !enabled" 
    elementFind(el, 'input')
    elementFind(el, 'button')
    el.$elem.sort((a, b) => { return a.tabIndex > b.tabIndex ? 1 : -1 })

    for (const element of el.$elem) {
      element.addEventListener('keydown', e => elemKeydown.bind(this, element, el.$elem, settings, e).apply())
    }
  },
  unbind: (el) => {
    for (const element of el.$elem) {
      element.removeEventListener('keydown', e => elemKeydown.bind(this, element, el.$elem, {}, e).apply())
    }
  }
})