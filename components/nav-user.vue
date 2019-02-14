<template>
  <b-navbar-nav v-if="$auth.loggedIn" class="ml-auto">
    <b-nav-item-dropdown right>
      <template slot="button-content">
        <span class="user-avatar">
          <v-gravatar class="rounded-circle" :email="$auth.user.mail" :size="32" default-img="retro" />
          <span class="user-info">
            <div class="name text-nowrap">{{ $auth.user.name }}</div>
            <div class="title text-nowrap">{{ $auth.user.title }}</div>
          </span>
        </span>
      </template>
      <b-dropdown-item href="#">Setting</b-dropdown-item>
      <b-dropdown-item href="#">Sign-Out</b-dropdown-item>
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
.user-avatar {
  display: inline-block;
}
.user-avatar > img {
  display: inline-block;
  position: absolute;
  top: 10px;
  left: -30px;
}
.user-info {
  color: #CDCDCD;
}
.user-info .name {
  width: 160px;
  font-size: 1rem;
  line-height: 1.3rem;
}
.user-info .title {
  width: 160px;
  font-size: .7rem;
  line-height: .7rem;
}
.navbar-nav .dropdown-toggle:after {
  margin-left: 0.655em !important;
  vertical-align: 1.155em !important;
}
</style>
