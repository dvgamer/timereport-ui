<template>
  <div class="main-panel">
    <b-navbar toggleable="md" type="dark" class="sticky-top bg-dark flex-md-nowrap p-0">
      <b-navbar-brand class="col-md-9 col-lg-7 d-md-block mr-0" to="/">
          <img class="d-inline-block align-top" src="~assets/icon-devops-agile.png" alt="" width="32" height="32">
          <span class="ml-2" v-text="appName">NAME</span><small class="version" v-text="version">v0.0</small>
        <b-navbar-toggle target="nav_collapse" class="pull-right"></b-navbar-toggle>
      </b-navbar-brand>
      <b-container fluid>
        <b-collapse is-nav id="nav_collapse">
          <nav-search/>
          <!-- Right aligned nav items -->
          <nav-user/>
        </b-collapse>
      </b-container>
    </b-navbar>
    <div class="container-fluid">
      <div class="row">
        <sidebar/>
        <div class="col-md-27 ml-sm-auto col-lg-29 pt-3 px-4 mb-3">
          <span v-if="online.socket === 2" class="badge badge-socket badge-light pull-right">
            <i class="fa fa-circle-o-notch fa-spin fa-fw"></i> Socket.io
          </span>
          <span v-else class="badge pull-right" :class="online.socket === 1 ? 'badge-success' : 'badge-danger'">
            <i class="fa" :class="online.socket === 1 ? 'fa-check' : 'fa-close'"></i> Socket.io
          </span>
          <span v-if="online.api === 2" class="badge badge-api badge-light pull-right mr-1">
            <i class="fa fa-circle-o-notch fa-spin fa-fw"></i> API
          </span>
          <span v-else class="badge pull-right mr-1" :class="online.api === 1 ? 'badge-success' : 'badge-danger'">
            <i class="fa" :class="online.api === 1 ? 'fa-check' : 'fa-close'"></i> API
          </span>
          <b-breadcrumb :items="breadcrumb"/>
          <nuxt/>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import sidebar from '~/components/sidebar.vue'
import navUser from '~/components/nav-user.vue';
import navSearch from '~/components/nav-search.vue';

export default {
  components: {
    sidebar,
    navUser,
    navSearch
  },
  sockets: {
    'connect_error' () {
      this.online.socket = 0
    },
    'connected' () {
      this.online.socket = 1
    }
  },
  data: () => ({
    appName: 'DevOps',
    version: 'v1.1',
    online: {
      api: 2,
      socket: 2 // 0=offline, 1=online, 2=wait
    },
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
  },
  beforeMount () {
    // window.addEventListener('keydown', (e) => {
    //   if (e.keyCode >= 112 && e.keyCode <= 123) return e.preventDefault()
    // })
  }
}
</script>

<style scoped>
.navbar-brand {
  font-size: 1.1rem;
  font-weight: bold;
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
