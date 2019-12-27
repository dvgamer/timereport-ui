<template>
  <div class="main-panel">
    <b-navbar toggleable="md" type="dark" class="d-block d-md-none sticky-top bg-dark flex-md-nowrap p-0">
      <b-navbar-brand class="col" to="/sign-in">
        <img class="d-inline-block align-top" src="~assets/icon-devops-agile.png" alt="" width="32" height="32">
        <span class="ml-2" v-text="appName || 'appName'" /><small class="version" v-text="version || 'v0.0'" />
      </b-navbar-brand>
    </b-navbar>
    <div class="container">
      <nuxt />
    </div>
  </div>
</template>
<script>
import { display, version } from '../package.json'

export default {
  data: () => ({
    appName: display,
    version: `v${version}`
  }),
  methods: {
    // getAppName () {
    //   return App.query().first().appName
    // },
    // getVersion () {
    //   return App.query().first().version
    // }
  }
}
</script>

<style scoped>
.navbar-brand {
  font-size: 1.1rem;
  font-weight: bold;
  margin-right: 0px;
  cursor: default;
}
.breadcrumb {
  padding: 0px;
  font-size: 11px;
  background-color: transparent;
}

.badge {
  text-align: left;
  padding: 0.25em 0.6em;
}

.badge > i.fa.fa-circle-o-notch {
  height: .9em;
  font-weight: bold;
}
</style>
