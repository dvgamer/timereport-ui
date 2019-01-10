<template>
<div class="col-lg-7 d-none d-lg-block bg-light sidebar">
  <div class="sidebar-sticky">
    <transition name="slide">
      <ul v-if="!mainToggle" class="nav flex-column">
        <li v-if="mainMenu != 'default'" class="nav-item" style="margin-bottom:20px;">
          <a class="nav-link" href="#" @click.prevent="backMenu()">
            <i class="fa fa-chevron-left" aria-hidden="true"></i> Back
          </a>
        </li>
        <h5 class="sidebar-heading d-flex justify-content-between align-items-center px-3 mt-2 mb-1 text-muted">
          <span v-text="mainMenu == 'default' ? 'mainmenu' : mainMenu"></span>
          <span class="d-flex align-items-center text-muted"><i class="fa fa-circle-o"></i></span>
        </h5>
        <div v-for="menu in $store.state.mainmenu[mainMenu]" :key="$store.state.mainmenu[mainMenu].indexOf(menu)">
          <li v-if="!menu.group" class="nav-item pl-2">
            <nuxt-link v-if="!menu.menu" class="nav-link" :to="menu.route" active-class="active" :exact="menu.exact">
              <i :class="!menu.loading ? menu.icon : 'fa fa-circle-o-notch fa-spin fa-fw'" aria-hidden="true"></i>
              {{menu.name}}
            </nuxt-link>
            <a v-else href="#" class="nav-link dropdown-toggle" @click.prevent="nextMenu(menu.menu, menu.route)">
              <i :class="menu.icon" aria-hidden="true"></i>
              {{menu.name}}
            </a>
          </li>
          <div v-else>
            <h6 class="sidebar-heading d-flex justify-content-between align-items-center px-3 mt-2 mb-1 text-muted">
              <span v-text="menu.group"></span>
            </h6>
            <li v-for="sub in menu.items" :key="menu.items.indexOf(sub)" class="nav-item pl-2">
              <nuxt-link v-if="sub.route" class="nav-link" :to="sub.route" active-class="active" :exact="sub.exact">
                <i :class="!sub.loading ? sub.icon : 'fa fa-circle-o-notch fa-spin fa-fw'" aria-hidden="true"></i>
                {{sub.name}}
              </nuxt-link>
              <a v-else href="#" class="nav-link dropdown-toggle" @click.prevent="nextMenu(sub.menu)">
                <i :class="sub.icon" aria-hidden="true"></i>
                {{sub.name}}
              </a>
            </li>
          </div>
        </div>
      </ul>
      <!-- <h6 class="sidebar-heading d-flex justify-content-between align-items-center px-3 mt-2 mb-1 text-muted">
        <span>Services</span>
        <a class="d-flex align-items-center text-muted" href="#">
          <i class="fa fa-circle-o"></i>
        </a>
      </h6> -->
    </transition>
  </div>
</div>
</template>
<script>
export default {
  data () {
    return {
      mainToggle: false,
      mainStack: [ ],
      mainMenu: 'default'
    }
  },
  methods: {
    toggleSidebar () {
      let vm = this
      vm.mainToggle = true
      setTimeout(() => vm.mainToggle = false, 100);
    },
    nextMenu (name, route) {
      this.mainStack.push(this.mainMenu)
      this.mainMenu = name
      this.toggleSidebar()
      // if (route) this.$router.push({ path: route })
    },
    backMenu () {
      let vm = this
      this.mainMenu = this.mainStack.pop()
      this.toggleSidebar()
    }
  },
  created () {
    this.mainMenu = this.$store.getters['mainmenu/getMainMenu'](this.$route.path)
    if (this.mainMenu !== 'default') this.mainStack.push('default')
    // console.log(this)
  }
}
</script>
<style scoped>
.nav-item a {
  text-overflow: ellipsis;
  overflow: hidden;
  white-space: nowrap;
}
.slide-leave-active, .slide-enter-active {
  transition: all .1s;
} 
.slide-leave {
  transform: translate(0px, 0px);
  opacity: 1;
} 
.slide-leave-to {
  transform: translate(0px, 5px);
  opacity: 0;
}

.slide-enter {
  transform: translate(0px, -5px);
  opacity: 0;
}
.slide-enter-to {
  transform: translate(0px, 0px);
  opacity: 1;
}

</style>
