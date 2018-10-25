<template>
<nav class="col-md-9 col-lg-7 d-none d-md-block bg-light sidebar">
  <div class="sidebar-sticky" v-bar="{ preventParentScroll: true }">
    <div>
      <ul class="nav flex-column">
        <li class="nav-item" v-for="menu in $store.state.mainmenu.default" :key="$store.state.mainmenu.default.indexOf(menu)">
          <nuxt-link v-if="menu.route" class="nav-link" :to="menu.route" active-class="active" :exact="true">
            <i :class="menu.icon" aria-hidden="true"></i>
            {{menu.name}}
          </nuxt-link>
          <span v-else>{{menu.menu}}</span>
        </li>
      </ul>
      <h6 class="sidebar-heading d-flex justify-content-between align-items-center px-3 mt-2 mb-1 text-muted">
        <span>Services</span>
        <a class="d-flex align-items-center text-muted" href="#">
          <span data-feather="plus-circle"></span>
        </a>
      </h6>
    </div>
  </div>
</nav>
</template>
<script>
export default {
  data () {
    return {
      navService: [
        { name: 'Kafka Feed', route: '/kafka-feed', icon: 'fa fa-tasks' },
        { name: 'Inbound Transfer', route: '/inbound-transfer', icon: 'fa fa-file-text-o' }
      ]
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
</style>
