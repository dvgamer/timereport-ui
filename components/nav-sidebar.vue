<template>
  <div class="col-lg-7 d-none d-lg-block bg-light sidebar">
    <div class="sidebar-sticky">
      <div class="nav flex-column">
        <no-ssr>
          <h5 slot="placeholder" class="sidebar-heading d-flex justify-content-between align-items-center px-3 mt-2 mb-1 text-muted">
            <span>LOADING...</span>
            <span class="d-flex align-items-center text-muted"><fa icon="circle-notch" spin /></span>
          </h5>
          <h5 class="sidebar-heading d-flex justify-content-between align-items-center px-3 mt-2 mb-1 text-muted">
            <span v-text="'mainmenu'" />
            <span class="d-flex align-items-center text-muted"><fa icon="circle-notch" /></span>
          </h5>
          <transition name="slide">
            <scrolly v-if="mainToggle" class="sidebar-scroll">
              <scrolly-viewport>
                <div v-for="(mainItem, i) in getMenuPermission('default')" :key="i" class="sub-item" :class="{ 'sub-active': mainMenu === mainItem.menu }">
                  <h6 v-if="mainItem.group" class="sidebar-heading pt-3 pb-1 text-muted border-bottom mx-3 mb-0" v-text="mainItem.group" />
                  <menu-item v-else :main-menu="mainMenu" :item="mainItem" :on-click="toggleMenu" />
                  <div v-if="mainMenu === mainItem.menu">
                    <div v-for="(subItem, l) in getMenuPermission(mainMenu)" :key="i + '-' + l">
                      <menu-item v-if="!subItem.group" class="pl-3" :main-menu="mainMenu" :item="subItem" :on-click="toggleMenu" />
                    </div>
                  </div>
                </div>
              </scrolly-viewport>
              <scrolly-bar axis="y" />
            </scrolly>
          </transition>
        </no-ssr>
      </div>
    </div>
  </div>
</template>
<script>
import menuItem from './mainmenu/menu-item.vue'

export default {
  components: {
    menuItem
  },
  data () {
    return {
      mainToggle: false,
      mainStack: [ ],
      mainMenu: 'default'
    }
  },
  created () {
    let vm = this
    this.getterMenu().catch(ex => {
      console.log(ex)
      vm.mainToggle = true
    })
  },
  methods: {
    getMenuPermission (group) {
      return this.$store.state.mainmenu[group].filter(e => !e.permission || e.permission <= this.$auth.user.user_level)
    },
    async getterMenu () {
      for (const key in this.$store.state.mainmenu) {
        for (const e of this.$store.state.mainmenu[key].filter(e => e.menu && e.api)) {
          let { data } = await this.$axios.get(e.api)
          for (const item of data) {
            this.$store.commit('mainmenu/add', {
              menu: e.menu,
              item: {
                permission: item['nLevelPermission'],
                name: item['sMenu'],
                route: `/survey/task/${item['nTaskId']}`,
                icon: item['sFaIcon'],
                exact: true
              }
            })
          }
        }
      }
      this.mainMenu = this.$store.getters['mainmenu/getMainMenu'](this.$route.path)
      this.$forceUpdate()
      this.mainToggle = true
    },
    toggleMenu (name, route) {
      if (this.mainMenu === name) {
        this.backMenu()
      } else {
        this.nextMenu(name)
      }
    },
    nextMenu (name) {
      this.mainMenu = name
    },
    backMenu () {
      this.mainMenu = 'default'
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
