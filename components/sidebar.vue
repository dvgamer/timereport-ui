<template>
<nav class="col-md-9 col-lg-7 d-none d-md-block bg-light sidebar">
  <div class="sidebar-sticky" v-bar="{ preventParentScroll: true }">
    <div>
      <ul class="nav flex-column">
        <li class="nav-item" v-for="nav in navItems" :key="navItems.indexOf(nav)">
          <nuxt-link class="nav-link" :to="nav.route" active-class="active" :exact="true">
            <i :class="nav.icon" aria-hidden="true"></i>
            {{nav.name}}
          </nuxt-link>
        </li>
      </ul>
      <h6 class="sidebar-heading d-flex justify-content-between align-items-center px-3 mt-2 mb-1 text-muted">
        <span>Services</span>
        <a class="d-flex align-items-center text-muted" href="#">
          <span data-feather="plus-circle"></span>
        </a>
      </h6>
      <ul class="nav flex-column">
        <li class="nav-item" v-for="nav in navService" :key="navService.indexOf(nav)">
          <nuxt-link class="nav-link" :to="nav.route" active-class="active" :exact="true">
            <i :class="nav.icon" aria-hidden="true"></i>
            {{nav.name}}
          </nuxt-link>
        </li>
      </ul>
      <h6 class="sidebar-heading d-flex justify-content-between align-items-center px-3 mt-2 mb-1 text-muted">
        <span>SSIS</span>
        <a class="d-flex align-items-center text-muted" href="#">
          <span data-feather="plus-circle"></span>
        </a>
      </h6>
      <ul class="nav flex-column">
        <li class="nav-item" v-for="nav in navSSIS" :key="navSSIS.indexOf(nav)">
          <nuxt-link class="nav-link" :to="nav.route" active-class="active" :exact="true">
            <i :class="nav.icon" aria-hidden="true"></i>
            {{nav.name}}
          </nuxt-link>
        </li>
      </ul>

      <h6 class="sidebar-heading d-flex justify-content-between align-items-center px-3 mt-2 mb-1 text-muted">
        <span>Schedule</span>
        <a class="d-flex align-items-center text-muted" href="#">
          <span data-feather="plus-circle"></span>
        </a>
      </h6>
      <ul class="nav flex-column">
        <li class="nav-item" v-for="nav in navSchedule" :key="navSchedule.indexOf(nav)">
          <nuxt-link class="nav-link" :to="nav.route" active-class="active" :exact="true">
            <i :class="nav.icon" aria-hidden="true"></i>
            {{nav.name}}
          </nuxt-link>
        </li>
      </ul>

      <h6 class="sidebar-heading d-flex justify-content-between align-items-center px-3 mt-5 mb-1 text-muted">
        <span>Saved reports</span>
        <a class="d-flex align-items-center text-muted" href="#">
          <span data-feather="plus-circle"></span>
        </a>
      </h6>
      <ul class="nav flex-column mb-2">
        <li class="nav-item">
          <a class="nav-link" href="#">
            <span data-feather="file-text"></span>
            Current month
          </a>
        </li>
        <li class="nav-item">
          <a class="nav-link" href="#">
            <span data-feather="file-text"></span>
            Last quarter
          </a>
        </li>
        <li class="nav-item">
          <a class="nav-link" href="#">
            <span data-feather="file-text"></span>
            Social engagement
          </a>
        </li>
        <li class="nav-item">
          <a class="nav-link" href="#">
            <span data-feather="file-text"></span>
            Year-end sale
          </a>
        </li>
      </ul>
    </div>
  </div>
</nav>
</template>
<script>
export default {
  data () {
    return {
      navItems: [
        { name: 'Dashboard', route: '/', icon: 'fa fa-home' }
      ],
      navService: [
        { name: 'Kafka Feed', route: '/kafka-feed', icon: 'fa fa-tasks' },
        { name: 'Inbound Transfer', route: '/inbound-transfer', icon: 'fa fa-file-text-o' }
      ],
      navSSIS: [
        { name: 'SSIS Staging', route: '/ssis-staging', icon: 'fa fa-file-o' }
      ],
      navSchedule: [
        { name: 'File FCCR', route: '/file-fccr', icon: 'fa fa-file-o' }
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
