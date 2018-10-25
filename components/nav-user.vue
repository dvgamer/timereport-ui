<template>
<b-navbar-nav class="ml-auto">
  <b-nav-item href="#"><i class="fa fa-user"></i> Sing-In</b-nav-item>
  <b-nav-item-dropdown right>
    <template slot="button-content">
      <em>User</em>
    </template>
    <b-dropdown-item href="#">Profile</b-dropdown-item>
    <b-dropdown-item href="#">Signout</b-dropdown-item>
  </b-nav-item-dropdown>
</b-navbar-nav>
</template>
<script>

export default {
  methods: {
    onSearch () {
      console.log('search:')
    }
  }
}
</script>

<style>

</style>
