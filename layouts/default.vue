<template>
  <div class="main-panel">
    <b-navbar toggleable="md" type="dark" class="sticky-top bg-sticky flex-md-nowrap p-0" :class="{ 'd-none': $store.state.menu === 'none' }">
      <b-navbar-brand class="col-md-10 col-lg-7 d-md-block mr-0">
        <img class="d-inline-block align-top" src="~assets/icon-devops-agile.png" alt="" width="32" height="32">
        <span class="ml-2" v-text="appName" /><small class="version" v-text="version" />
        <hamburger class="float-right d-block d-lg-none" :active="expaned" @update:active="value => expaned = value" />
      </b-navbar-brand>
      <b-container fluid>
        <b-collapse id="nav_collapse" is-nav>
          <nav-search />
          <!-- Right aligned nav items -->
          <nav-user />
        </b-collapse>
      </b-container>
    </b-navbar>
    <div class="container-fluid" :class="{ 'container-full': $store.state.menu === 'none' }">
      <div class="row">
        <!-- <navSidebar /> -->
        <div class="col-md-36 ml-sm-auto pt-3 px-4" :class="{ 'col-lg-29': $auth.loggedIn }"><!--  && $store.state.menu !== 'none' -->
          <div>
            <!-- <span class="badge badge-socket badge-light float-right">
              <fa icon="circle-notch" spin /> Health Check
            </span>
            <span class="badge float-right badge-danger">
              <fa icon="close" /> Maintenance
            </span> -->
            <b-breadcrumb :items="breadcrumb" />
          </div>
          <nuxt />
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { display, version } from '../package.json'
// import MainMenu from '../model/mainmenu'
// import navSidebar from '~/components/nav-sidebar.vue'
import navUser from '~/components/nav-user.vue'
import navSearch from '~/components/nav-search.vue'
import hamburger from '~/components/mainmenu/HamburgerButton.vue'

export default {
  components: {
    // navSidebar,
    navUser,
    navSearch,
    hamburger
  },
  data: () => ({
    appName: display,
    version: `v${version}`,
    expaned: false,
    breadcrumb: [
      { text: 'Admin', href: '#' },
      { text: 'Manage', href: '#' },
      { text: 'Library', active: true }
    ]
  }),
  created () {
    // let vm = this
    // this.$store.commit('$page', false)
    // this.timeout.api = setTimeout(() => vm.online.api = 0, 5000)
    // this.timeout.sock = setTimeout(() => vm.online.sock = 0, 5000)
    // this.updatedNetworkConnection()
  },
  async beforeMount () {
    try {
      const { data } = await this.$axios({ method: 'GET', url: '/api/mainmenu' })
      console.log('beforeMount', data)
    } catch (ex) {
      this.$auth.$storage.setLocalStorage('login.saved', null, true)
      await this.$auth.logout()
    }
    // MainMenu.insert({ data })
    // window.addEventListener('keydown', (e) => {
    //   if (e.keyCode >= 112 && e.keyCode <= 123) return e.preventDefault()
    // })
  },
  methods: {
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
