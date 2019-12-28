<template>
  <li v-if="item" class="nav-item pl-1">
    <nuxt-link v-if="!item.menu" class="nav-link" :to="item.route || '/'" active-class="active" :exact="item.exact" @click.native="onNuxtLink">
      <fa :icon="!item.loading ? item.icon : 'circle-o-notch'" :spin="item.loading" />
      <span v-text="item.name" />
    </nuxt-link>
    <a v-else href="#" class="nav-link" @click.prevent="onClick(item.menu, item.route)">
      <fa icon="chevron-left" class="mt-1 mr-1" :rotation="mainMenu === item.menu ? 270 : 180" />
      <span v-text="item.name" />
    </a>
  </li>
</template>
<script>
export default {
  props: {
    mainMenu: {
      type: String,
      default: () => 'default'
    },
    item: {
      type: Object,
      default: () => null
    },
    onClick: {
      type: Function,
      default: () => {}
    }
  },
  created () {
  },
  methods: {
    onNuxtLink () {
      this.$store.commit('expaned')
    }
  }
}
</script>
<style scoped>
.svg-inline--fa {
  transition: all ease-in-out .2s;
}
.nav-item {
  background-color: rgba(241, 241, 241, 0);
  border-right: #dfe0e1 solid 1px;
}
.nav-item:hover {
  background-color: rgba(241, 241, 241, 1) !important;
}
.fa-chevron-left {
  color: #8e8e8e;
}
</style>
