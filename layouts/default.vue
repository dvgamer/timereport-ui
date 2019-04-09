<template>
  <div class="main-panel">
    <b-navbar toggleable="md" type="dark" class="sticky-top bg-dark flex-md-nowrap p-0">
      <b-navbar-brand class="col-md-9 col-lg-7 d-md-block mr-0" to="/">
        <img class="d-inline-block align-top" src="~assets/icon-devops-agile.png" alt="" width="32" height="32">
        <span class="ml-2" v-text="appName">NAME</span><small class="version" v-text="version">v0.0</small>
      </b-navbar-brand>
      <b-container fluid>
        <b-collapse id="nav_collapse" is-nav>
          <nav-search />
          <!-- Right aligned nav items -->
          <nav-user />
        </b-collapse>
      </b-container>
    </b-navbar>
    <div class="container-fluid">
      <div class="row">
        <navSidebar />
        <no-ssr>
          <scrolly class="col-md-36 ml-sm-auto pt-3 px-4" :class="{ 'col-lg-29': $auth.loggedIn && $store.state.menu !== 'none' }">
            <scrolly-viewport class="scrolly-fixed pb-3">
              <span v-if="online.sock === 2" class="badge badge-socket badge-light float-right">
                <fa icon="circle-notch" spin /> Socket.io
              </span>
              <span v-else class="badge float-right" :class="online.sock === 1 ? 'badge-success' : 'badge-danger'">
                <fa :icon="online.sock === 1 ? 'check' : 'close'" /> Socket.io
              </span>
              <span v-if="online.api === 2" class="badge badge-api badge-light float-right mr-1">
                <fa icon="circle-notch" spin /> API
              </span>
              <span v-else class="badge float-right mr-1" :class="online.api === 1 ? 'badge-success' : 'badge-danger'">
                <fa :icon="online.api === 1 ? 'check' : 'close'" /> API
              </span>
              <b-breadcrumb :items="breadcrumb" />
              <nuxt />
            </scrolly-viewport>
            <scrolly-bar axis="y" />
          </scrolly>
        </no-ssr>
      </div>
    </div>
  </div>
</template>
<script>
import navSidebar from '~/components/nav-sidebar.vue'
import navUser from '~/components/nav-user.vue';
import navSearch from '~/components/nav-search.vue';

export default {
  components: {
    navSidebar,
    navUser,
    navSearch
  },
  sockets: {
    'connect' () {
      clearTimeout(this.timeout.sock)
      this.online.sock = 1
      this.updatedNetworkConnection()
    },
    'disconnect' () {
      clearTimeout(this.timeout.sock)
      this.online.sock = 0
      this.updatedNetworkConnection()
    },
    'sign-out|status' (data) {
    }
  },
  data: () => ({
    appName: 'DevOps',
    version: 'v1.1',
    timeout: { api: 0, sock: 0 },
    online: { api: 2, sock: 2 },
    breadcrumb: [
      { text: 'Home', active: true }
    ]
  }),
  created () {
    let vm = this
    this.$store.commit('$page', false)
    this.timeout.api = setTimeout(() => vm.online.api = 0, 5000)
    this.timeout.sock = setTimeout(() => vm.online.sock = 0, 5000)
    this.updatedNetworkConnection()
  },
  beforeMount () {
    // window.addEventListener('keydown', (e) => {
    //   if (e.keyCode >= 112 && e.keyCode <= 123) return e.preventDefault()
    // })
  },
  methods: {
    updatedNetworkConnection () {
      let vm = this
      vm.$axios.get('/api/status').then(data => {
        vm.online.api = data.status === 200 ? 1 : 0
        clearTimeout(vm.timeout.api)
      }).catch(ex => {
        vm.online.api = 0
        clearTimeout(vm.timeout.api)
      })
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
