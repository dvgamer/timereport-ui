<template>
  <b-navbar-nav v-if="$auth.loggedIn" class="ml-auto">
    <b-nav-item-dropdown no-caret class="user-dropdown">
      <template slot="button-content">
        <span class="user-avatar pr-3">
          <img class="rounded-circle" :src="gravatar($auth.user.mail, 32)" />
          <span class="user-info">
            <div class="name text-nowrap">{{ $auth.user.name }}</div>
            <div class="title text-nowrap">{{ $auth.user.title }}</div>
          </span>
          <fa icon="chevron-left" class="user-caret float-right" :rotation="270" />
        </span>
      </template>
      <b-dropdown-item to="/profile">Profile</b-dropdown-item>
      <b-dropdown-item @click="() => show = true">Sign-Out</b-dropdown-item>
    </b-nav-item-dropdown>
    <b-modal v-model="show" title="" :cancel-disabled="wait" :ok-disabled="wait"
      cancel-variant="danger" ok-variant="outline-secondary"
      :centered="true" :no-stacking="true" :no-fade="true">
      <p>Are you sure you want to sign-out of your account?</p>
      <span slot="modal-title">
        <fa :icon="['far','question-circle']" /> Confirm Sign-Out
      </span>
      <div slot="modal-cancel" style="padding: 0 1rem" @click="onSignOut">
        <fa :icon="!wait?'sign-out-alt':'circle-notch'" :spin="wait" /> <b v-text="wait?'Sign-out ...':'Yes.'" />
      </div>
      <div slot="modal-ok" style="padding: 0 1rem">
        <b>No, I Back.</b>
      </div>
    </b-modal>
  </b-navbar-nav>
</template>
<script>
import md5 from 'md5'

export default {
  data: () => ({
    show: false,
    wait: false
  }),
  methods: {
    gravatar (email, size = 80, defaultImg = 'retro', rating = 'g') {
      return (['//www.gravatar.com/avatar/', md5(email.trim().toLowerCase()), `?s=${size}`, `&d=${defaultImg}`, `&r=${rating}`]).join('')
    },
    onSearch () {
      console.log('search:')
    },
    async onSignOut () {
      this.wait = true
      const login = this.$auth.$storage.getLocalStorage('login.saved', true)
      if (!login.saved) {
        this.$auth.$storage.setLocalStorage('login.saved', null, true)
      } else {
        this.$auth.$storage.setLocalStorage('login.saved', Object.assign(login, { pass: '' }), true)
      }
      await this.$auth.logout()
      this.wait = false
    }
  },
  created () {
    // console.log('$auth', this.$auth)
  }
}
</script>

<style>
.user-caret {
  position: absolute;
  right: 10px;
  top: 20px;
}
.user-avatar {
  display: inline-block;
}
.user-avatar > img {
  display: inline-block;
  position: absolute;
  top: 7px;
  left: -35px;
  border: 2px solid #ffffffbd;
  width: 36px;
  height: 36px;
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
