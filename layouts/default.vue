<template>
  <div class="main-panel">
    <b-navbar toggleable="md" type="dark" class="sticky-top bg-dark flex-md-nowrap p-0" :class="{ 'd-none': $store.state.menu === 'none' }">
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
    <no-ssr>
      <div class="container-fluid" :class="{ 'container-full': $store.state.menu === 'none' }">
        <div class="row">
          <navSidebar />
          <scrolly class="col-md-36 ml-sm-auto pt-3 px-4" :class="{ 'col-lg-29': $auth.loggedIn && $store.state.menu !== 'none' }">
            <scrolly-viewport class="scrolly-fixed pb-5">
              <div :class="{ 'd-none': $store.state.menu === 'none' }">
                <span v-if="isChecking" class="badge badge-socket badge-light float-right">
                  <fa icon="circle-notch" spin /> Health Check
                </span>
                <span v-if="!isChecking && !isOnline" class="badge float-right badge-danger">
                  <fa icon="close" /> Maintenance
                </span>
                <b-breadcrumb :items="breadcrumb" />
              </div>
              <nuxt />
            </scrolly-viewport>
            <scrolly-bar axis="y" />
          </scrolly>
        </div>
      </div>
    </no-ssr>
  </div>
</template>
<script>
import navSidebar from '~/components/nav-sidebar.vue'
import navUser from '~/components/nav-user.vue'
import navSearch from '~/components/nav-search.vue'

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
  computed: {
    isChecking () {
      return this.online.sock === 2 || this.online.api === 2
    },
    isOnline () {
      return this.online.sock === 1 && this.online.api === 1
    }
  },
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
      vm.online.api = 2
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
.container-full {
  height: 100vh !important;
}
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
