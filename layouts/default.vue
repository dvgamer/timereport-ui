<template>
  <div class="main-panel">
    <b-navbar toggleable="md" type="dark" class="sticky-top bg-sticky flex-md-nowrap p-0" :class="{ 'd-none': $store.state.menu === 'none' }">
      <b-navbar-brand class="col-md-10 col-lg-7 d-md-block mr-0">
        <img class="d-inline-block align-top" src="~assets/icon-devops-agile.svg" alt="" width="32" height="32">
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
    <transition name="fade" mode="out-in">
      <div v-if="$store.state.wait" class="container-fluid">
        <div slot="placeholder" class="absolute-center">
          <div class="spinner-main">
            <svg width="64" height="64" viewBox="0 0 512 512">
              <path id="logo-1" class="logo-1" d="M164.245,244.022l-26.179-19.664,12.385-29.352,31.062,4.831,0.269,0.005a93.823,93.823,0,0,1,19.9-20.016l0.024-.076c-1.768-10.579-5.126-30.666-5.126-30.666l29.209-12.717s13.7,17.808,19.9,25.868l0.057,0.018a94.476,94.476,0,0,1,24.851.275l0.047-.011c6.457-7.723,21.062-25.2,21.062-25.2l28.668,13.894s-3.992,19.078-6.223,29.736l0.025,0.071a93.9,93.9,0,0,1,17.673,17.945l0.08,0.028,33.186-2.4,9.936,30.268-25.337,15.962-0.036.065a94.5,94.5,0,0,1-.187,25.32l0.09,0.081,25.3,15.717-9.747,30.33-34.214-2.26-0.1.033a93.823,93.823,0,0,1-17.848,17.51l0.006,0.186c1.621,10.149,5.111,31.987,5.111,31.987l-29.3,12.507L268.5,347.537l-0.079-.053a94.55,94.55,0,0,1-23.529-.12L244,348l-16.571,26.533L197.44,363.785l3.34-33.578,0.026-.966a93.861,93.861,0,0,1-16.853-16.507l-0.293-.03-32.83,4.849-12.159-29.445s17.905-13.238,26.132-19.319l0.018-.35a94.547,94.547,0,0,1-.38-24.228Zm92.893-52.164a63,63,0,1,1-63,63A63,63,0,0,1,257.138,191.858Z"/>
              <path id="logo-2" class="logo-1" d="M270.791,38.668V4.551L202.524,72.818l68.267,68.266v-40.96c66.046,5.69,120.036,53.445,136.176,115.923l32.215-34,29.28,27.055C448.4,116.024,368.322,44.8,270.791,38.684V38.668ZM472.6,273.067h37.122L441.458,204.8l-68.267,68.267H410.8l0.007,0.045A154.877,154.877,0,0,1,294.12,405.153l35.836,36.305-26.543,24.618C394.8,446.145,464.6,368.41,472.557,273.1ZM241.209,408.681v-35.49l68.267,68.267-68.267,68.266-0.05-39.251c-95.744-6.812-174.884-74.39-195.648-165.549l27.307,25.032,34.608-35.828A154.867,154.867,0,0,0,241.15,408.784M102.4,241.209c5.685-65.223,52.424-118.814,113.793-135.61L182.044,72.818l26.508-28.652C116.847,65.227,47.409,144.619,41.385,241.2l-0.228.012H2.276l68.267,68.267,68.267-68.267H102.4Z"/>
            </svg>
          </div>
        </div>
      </div>
      <div v-else>
        <div class="container-fluid" :class="{ 'container-full': $store.state.menu === 'none' }">
          <div class="row">
            <navSidebar />
            <div class="col-md-36 ml-sm-auto pt-3 px-4" :class="{ 'col-lg-29': $auth.loggedIn }">
              <div>
                <span class="badge float-right badge-danger d-none">
                  <fa icon="times" /> Maintenance
                </span>
                <b-breadcrumb :items="breadcrumb" />
              </div>
              <nuxt />
            </div>
          </div>
        </div>
      </div>
    </transition>
  </div>
</template>
<script>
import { display, version } from '~/package.json'
import MainMenu from '~/models/mainmenu'
import navSidebar from '~/components/nav-sidebar.vue'
import navUser from '~/components/nav-user.vue'
import navSearch from '~/components/nav-search.vue'
import hamburger from '~/components/mainmenu/hamburger.vue'

export default {
  components: {
    navSidebar,
    navUser,
    navSearch,
    hamburger
  },
  data: () => ({
    appName: display,
    version: `v${version}`,
    expaned: false,
    breadcrumb: [
      { text: 'Overview', active: true }
    ]
  }),
  async created () {
    try {
      const { data } = await this.$axios({ method: 'GET', url: '/api/main/menu' })
      MainMenu.insert({ data })
      this.$store.commit('initilize')
    } catch (ex) {
      console.log(ex)
    }
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
.logo-1 {
  fill: #495057;
  fill-rule: evenodd;
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
.spinner-main {
  margin: 0 0 5px 12px;
  -webkit-animation: spinner-border 5s linear infinite reverse;
  animation: spinner-border 5s linear infinite reverse;
}
.spinner-main, .spinner-text {
  color: #2a3f54;
}
</style>
