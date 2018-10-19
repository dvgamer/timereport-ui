import Vue from 'vue'

Vue.directive('dropdown', {
  inserted: el => {
    console.log(el)
  }
})
