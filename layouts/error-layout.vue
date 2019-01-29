<template>
<div class="main-panel">
  <b-navbar toggleable="md" type="dark" class="sticky-top bg-dark flex-md-nowrap p-0">
    <b-navbar-brand class="col" to="/sign-in">
      <img class="d-inline-block align-top" src="~assets/icon-devops-agile.png" alt="" width="32" height="32">
      <span class="ml-2" v-text="$store.state.appName">NAME</span><small class="version" v-text="$store.state.version">v0.0</small>
    </b-navbar-brand>
  </b-navbar>
  <div class="container">
    <nuxt/>
  </div>
</div>
</template>
<script>
export default {
  created () {
    this.$store.commit('$page', false)
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
