<template>
  <div class="col-lg-7 sidebar" :class="$store.state.menu !== 'none' ? 'd-none d-lg-block' : 'd-none'">
    <div class="sidebar-sticky">
      <div class="nav flex-column">
        <h5 class="sidebar-heading d-flex justify-content-between align-items-center px-3 mt-2 mb-1 text-muted">
          <span v-text="'mainmenu'" />
          <span class="d-flex align-items-center text-muted"><fa icon="circle-notch" /></span>
        </h5>
        <div v-for="menu in getMenuPermission()" :key="menu['$id']" class="sub-item">
          <h6 v-if="menu.divider" class="sidebar-heading pt-3 pb-1 text-muted border-bottom mx-3 mb-0" v-text="menu.divider" />
          <a v-if="menu.header" href="#" class="nav-link" @click.prevent="onExpand(menu.group)">
            <fa class="ml-2" icon="circle" style="width:.4em" />
            <span class="ml-2" v-text="menu.header" />
            <fa icon="chevron-left" class="mt-1 mr-1 float-right" :rotation="180" />
          </a>
          <div :ref="menu.group" v-if="!isMain(menu.group) && menu.header" class="group-drop pl-3" :class="{ 'd-none' : $store.state.menu !== menu.group }">
            <menu-item v-for="sub in getMenuPermission(menu.group)" :key="sub['$id']" :item="sub" />
          </div>
          <menu-item v-if="isMain(menu.group) && !menu.divider && !menu.header" :item="menu" />
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
      mainStack: []
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
    onExpand (name) {
      this.$store.commit('menuToggle', this.$store.state.menu === name ? 'main' : name)
    },
    getMenuPermission (name = 'main') {
      return MainMenu.all().filter(e => e.permission <= this.$auth.user.user_level && (e.group === name || e.header))
    },
    isMain (name) {
      return name === 'main'
    }
  }
}
</script>
<style scoped>
.sidebar {
  background-color: #FFF;
}
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
