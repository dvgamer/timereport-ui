<template>
  <div>
    <nav class="navbar navbar-dark sticky-top bg-dark flex-md-nowrap p-0">
      <nuxt-link class="navbar-brand col-md-9 col-lg-7 d-md-block mr-0" to="/">
        <img class="d-inline-block align-top" src="~assets/icon-devops-agile.png" alt="" width="32" height="32">
        DevOps
      </nuxt-link>
    </nav>

    <div class="container-fluid">
      <div class="row">
        <sidebar/>
        <main role="main" class="col-md-27 ml-sm-auto col-lg-29 pt-3 px-4 mb-3">
          <nuxt/>
        </main>
      </div>
    </div>
  </div>
</template>
<script>
import sidebar from '~/components/sidebar.vue'
export default {
  components: {
    sidebar
  }
}
</script>

<style>
.navbar-brand {
  font-size: 1.1rem;
  font-weight: bold;
}
</style>
