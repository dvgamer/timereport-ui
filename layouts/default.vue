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
          <nav-search/>
          <!-- Right aligned nav items -->
          <nav-user/>
        </b-collapse>
      </b-container>
    </b-navbar>

    <div class="container-fluid">
      <div class="row">
        <sidebar/>
        <main role="main" class="col-md-27 ml-sm-auto col-lg-29 pt-3 px-4 mb-3">
          <span v-if="online.socket === 2" class="badge badge-socket badge-light pull-right">
            <i class="fa fa-circle-o-notch fa-spin fa-fw"></i> Socket.io
          </span>
          <a v-else href="#" class="badge pull-right" @click.prevent="onCheckStatus('socket')" :class="online.socket === 1 ? 'badge-success' : 'badge-danger'">
            <i class="fa" :class="online.socket === 1 ? 'fa-check' : 'fa-close'"></i> Socket.io
          </a>
          <span v-if="online.api === 2" class="badge badge-api badge-light pull-right mr-1">
            <i class="fa fa-circle-o-notch fa-spin fa-fw"></i> API
          </span>
          <a v-else href="#" class="badge pull-right mr-1" @click.prevent="onCheckStatus('api')" :class="online.api === 1 ? 'badge-success' : 'badge-danger'">
            <i class="fa" :class="online.api === 1 ? 'fa-check' : 'fa-close'"></i> API
          </a>
          <b-breadcrumb :items="breadcrumb"/>
          <nuxt/>
        </main>
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
  data: () => ({
    appName: 'DevOps',
    version: 'v1.1',
    online: {
      api: 1,
      socket: 1 // 0=offline, 1=online, 2=wait
    },
    breadcrumb: [
      {
        text: 'Home',
        active: true
      }
    ]
  }),
  methods: {
    onCheckStatus (name) {
      let vm = this
      vm.online[name] = 2
      setTimeout(() => {
        vm.online[name] = 0
      }, 2000)
    },
    onSearch () {
      console.log('search:')
    }
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
