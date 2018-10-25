<template>
  <div>
    <b-navbar toggleable="md" type="dark" class="sticky-top bg-dark flex-md-nowrap p-0">
      <b-navbar-brand class="col-md-9 col-lg-7 d-md-block mr-0" to="/">
          <img class="d-inline-block align-top" src="~assets/icon-devops-agile.png" alt="" width="32" height="32">
          <span class="ml-2" v-text="appName">NAME</span><small class="version" v-text="version">v0.0</small>
        <b-navbar-toggle target="nav_collapse" class="pull-right"></b-navbar-toggle>
      </b-navbar-brand>
      <b-container fluid>
        <b-collapse is-nav id="nav_collapse">
          <b-nav-form @submit.prevent="onSearch">
            <div class="form-group form-icon">
              <b-form-input size="sm" type="text" placeholder="Search"/>
              <i class="fa fa-search"></i>
            </div>
          </b-nav-form>
          <!-- Right aligned nav items -->
          <b-navbar-nav class="ml-auto">

            <b-nav-item href="#"><i class="fa fa-user"></i> Sing-In</b-nav-item>
            <b-nav-item-dropdown right>
              <template slot="button-content">
                <em>User</em>
              </template>
              <b-dropdown-item href="#">Profile</b-dropdown-item>
              <b-dropdown-item href="#">Signout</b-dropdown-item>
            </b-nav-item-dropdown>
          </b-navbar-nav>
        </b-collapse>
      </b-container>
    </b-navbar>

    <div class="container-fluid">
      <div class="row">
        <sidebar/>
        <main role="main" class="col-md-27 ml-sm-auto col-lg-29 pt-3 px-4 mb-3">
          <b-breadcrumb :items="breadcrumb"/>
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
  },
  data: () => ({
    appName: 'DevOps',
    version: 'v1.1',
    breadcrumb: [
      {
        text: 'Home',
        active: true
      }
    ]
  }),
  methods: {
    onSearch () {
      console.log('search:')
    }
  }
}
</script>

<style>
.navbar-brand {
  font-size: 1.1rem;
  font-weight: bold;
}
</style>
