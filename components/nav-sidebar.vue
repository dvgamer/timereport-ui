<template>
  <div class="col-lg-7 bg-light sidebar" :class="$store.state.menu !== 'none' ? (!$store.state.expaned ? 'd-none d-lg-block' : '') : 'd-none'">
    <div class="sidebar-sticky">
      <div class="nav flex-column">
        <h5 class="sidebar-heading d-flex justify-content-between align-items-center px-3 mt-2 mb-1 text-muted">
          <span v-text="'mainmenu'" />
          <span class="d-flex align-items-center text-muted"><fa icon="circle-notch" /></span>
        </h5>
        <div v-for="menu in getMenuPermission()" :key="menu['$id']" class="sub-item">
          <h6 v-if="menu.divider" class="sidebar-heading pt-3 pb-1 text-muted border-bottom mx-3 mb-0" v-text="menu.divider" />
          <menu-item v-else :item="menu" />
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import MainMenu from '../model/mainmenu'
import menuItem from './mainmenu/menu.vue'

export default {
  components: {
    menuItem
  },
  data () {
    return {
      mainToggle: false,
      mainStack: [],
      menu: 'default'
    }
  },
  async created () {
    // try {
    //   const { data } = await this.$axios({ method: 'GET', url: '/api/main/menu' })
    //   MainMenu.insert({ data })
    // } catch (ex) {
    //   this.$auth.$storage.setLocalStorage('login.saved', null, true)
    //   await this.$auth.logout()
    // }
    // const vm = this
    // this.getterMenu().catch(ex => {
    //   console.log(ex)
    //   vm.mainToggle = true
    // })
  },
  methods: {
    getMenuPermission () {
      return MainMenu.all().filter(e => e.permission <= this.$auth.user.user_level)
    }
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
.nav {
  margin-left: 1px;
}
.sub-item {
  border-left: 3px solid transparent;
}
.sub-active {
  border-left-color: #007bff !important;
}
</style>
