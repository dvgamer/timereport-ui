<template>
  <div class="row">
    <div class="col-36">
      <div class="row mt-5 pt-3">
        <div class="col-36 col-lg-32 col-xl-30 col-login mx-auto">
          <form v-tabindex class="card" method="post" @submit.prevent="onSignIn">
            <div class="card-body p-0">
              <div class="row">
                <div class="col-xl-22 col-lg-20 col-md-16 d-none d-md-block">
                  <div class="bg-login">
                    <div class="sign-navbar navbar-brand d-none d-md-block" to="/sign-in">
                      <img class="d-inline-block align-top" src="~assets/icon-devops-agile.png" alt="" width="32" height="32">
                      <span class="ml-2" v-text="$store.state.appName">NAME</span><small class="version" v-text="$store.state.version">v0.0</small>
                    </div>
                  </div>
                </div>
                <div class="col-xl-13 col-lg-15 col-md-19 col-sm-36 mt-3 mb-3 panel-sign">
                  <div class="d-none d-md-block" style="height: 24px;" />
                  <transition name="fade">
                    <no-ssr>
                      <div slot="placeholder">
                        <div class="dimmer-layout" />
                        <div class="dimmer-content">
                          <i class="fa fa-circle-o-notch fa-spin fa-3x fa-fw" />
                        </div>
                      </div>
                    </no-ssr>
                  </transition>
                  <div class="mb-3 mt-2">
                    <button v-if="!activate || !enabled" :disabled="sing_out" type="button" class="btn btn-warning btn-sm btn-logout pull-right" @click="onSignOut" />
                    <h3 class="mb-0">Sign-In</h3>
                    <small>central.co.th</small>
                  </div>
                  <div v-if="activate && enabled">
                    <div class="form-group">
                      <label class="form-label">Email address</label>
                      <input ref="email" v-model="account.username" :readonly="account.sing" type="text" tabindex="1" class="form-control" maxlength="30" placeholder="Enter email">
                    </div>
                    <div class="form-group">
                      <label class="form-label">Password</label>
                      <input ref="password" v-model="account.password" :readonly="account.sing" tabindex="2" type="password" class="form-control" maxlength="12" placeholder="Password">
                    </div>
                    <div class="form-group">
                      <label class="custom-control custom-checkbox">
                        <input v-model="account.saved" :disabled="account.sing" tabindex="3" type="checkbox" class="custom-control-input">
                        <span class="custom-control-label">Remember me</span>
                      </label>
                    </div>
                    <div class="form-footer">
                      <button type="submit" tabindex="4" class="btn btn-primary btn-block" :disabled="account.sing">{{ account.btn_sign }}</button>
                    </div>
                    <small>
                      <b><div v-if="!!account.error" class="pt-3 text-danger text-nowrap text-center" v-text="account.error" /></b>
                    </small>
                  </div>
                  <div v-else class="text-center">
                    <div class="avatar-thumbnail">
                      <v-gravatar class="rounded-circle" :email="account.username" :size="160" default-img="retro" />
                    </div>
                    <h5 class="pt-3">Walcome, {{ account.username }}</h5>
                    <div v-if="!enabled"><b class="text-danger">Your Account is Suspended.</b><br>Please contact administrator.</div>
                    <div v-else><b class="text-danger">Your Account is Inactivate.</b><br>Please wait a moment...</div>
                  </div>
                </div>
              </div>
            </div>
          </form>
        </div>
      </div>
      <div class="row mt-3">
        <div class="col-md-28 col-lg-24 mx-auto">
          <footer class="footer">
            <div class="content text-center">
              <p>
                <strong>{{ $store.state.appName }}</strong> {{ $store.state.version }} by <a href="https://mr.touno.io">Kananek T.</a> The source code is licensed
                <a href="http://opensource.org/licenses/mit-license.php">MIT</a>. <br class="d-block d-sm-none">The website content is licensed.
              </p>
            </div>
          </footer>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  auth: false,
  layout: 'guest',
  middleware: 'signin',
  head: {
    title: 'Sign In'
  },
  sockets: {
    'sign-in|status' (data) {
      const login = this.$auth.$storage.getLocalStorage('login.saved', true)
      if (login && login.user === data.mail) {
        this.enabled = data.enabled
        if (data.activate) {
          this.onAuth(login.user, login.pass, login.saved, true)
        }
      }
    }
  },
  async asyncData ({ $axios }) {
    const { data } = await $axios.post('/auth/recheck')
    if (data.error) return {}

    return data
  },
  data () {
    return {
      sing_out: false,
      activate: true,
      enabled: true,
      account: {
        sign: false,
        error: '',
        btn_sign: 'Sign-In',
        username: '',
        password: '',
        saved: false
      }
    }
  },
  async created () {
    if (this.$auth.loggedIn) this.$router.push('/')
    this.updatedInputFocus()
    // let vm = this
    // if (!vm.$auth.loggedIn) {
    //   const login = this.$auth.$storage.getLocalStorage('login.saved', true)
    //   if (login) {
    //     let { data } = await vm.$axios.post('/auth/recheck', { user: login.user })
    //     if (!data.error) {
    //       vm.activate = data.activate
    //       vm.enabled = data.enabled
    //     }
    //   }
    //   this.updatedInputFocus()
    // } else {
    //   this.$router.push('/')
    // }
  },
  methods: {
    async onAuth (user, pass, saved, noerr = false) {
      let vm = this
      vm.account.sing = true
      try {
        console.log('local:', { user, pass, saved })
        let data = await vm.$auth.loginWith('local', { data: { user, pass, saved } })
        console.log('loginWith:', data)
        console.log('$auth', this.$auth)
      } catch (ex) {
        console.log('catch:', noerr, ex)
        if (!noerr) {
          vm.account.sing = false
          vm.account.btn_sign = `Sign-In`
          vm.account.error = `${ex.message == 'Network Error' ? 'OFFLINE' : 'Email or Password worng.'}`
        }
      }

      if (vm.$auth.loggedIn) {
        vm.account.btn_sign = `Hi, Welcome Back.`
        vm.$auth.$storage.setLocalStorage('login.saved', { user, pass, saved }, true)
        vm.$router.go()
      } else {
        if (!noerr) {
          vm.account.sing = false
          vm.account.btn_sign = `Sign-In`
          vm.account.error = 'Email or Password worng.'
        }

        let { data } = await vm.$axios.post('/auth/recheck', { user })
        if (!data.error) {
          vm.activate = data.activate
          vm.enabled = data.enabled
        } else {
          vm.account.sing = false
          vm.account.btn_sign = `Sign-In`
          vm.account.error = data.error
          vm.$auth.$storage.setLocalStorage('login.saved', {}, true)
        }
      }
    },
    async onSignOut () {
      this.sing_out = true
      this.$auth.$storage.setLocalStorage('login.saved', null, true)
      this.$router.go()
    },
    async onSignIn () {
      let vm = this
      let { username, password, saved } = this.account

      if (!/\w{5,}@central.co.th$/ig.test(username)) {
        vm.account.sing = false
        vm.account.btn_sign = `Sign-In`
        vm.account.error = `Domain name not central.co.th`
        return
      }

      if (password.length <= 3) {
        vm.account.sing = false
        vm.account.btn_sign = `Sign-In`
        vm.account.error = `Password worng.`
        return
      }

      vm.$auth.$storage.setLocalStorage('login.saved', { user: username, pass: password, saved: saved }, true)
      vm.account.sing = true
      vm.account.btn_sign = `Signing LDAP...`
      vm.account.error = ''
      try {
        if (!username) {
          vm.$refs.email.focus()
          throw new Error('Username is empty.')
        }
        if (!password) {
          vm.$refs.password.focus()
          throw new Error('Password is empty.')
        }
        await vm.onAuth(username, password, saved)
      } catch (ex) {
        vm.account.sing = false
        vm.account.btn_sign = `Sign-In`
        vm.account.error = `${ex.message == 'Network Error' ? 'OFFLINE' : ex.message}`
      }
    },
    updatedInputFocus () {
      let vm = this
      const login = this.$auth.$storage.getLocalStorage('login.saved', true)

      if (login && login.saved) {
        vm.account.username = login.user
        vm.account.saved = login.saved
      }

      vm.$nextTick(() => {
        if (login && login.saved) {
          if (vm.$refs.password) vm.$refs.password.focus()
        } else {
          if (vm.$refs.email) vm.$refs.email.focus()
        }
      })
    }
  }
}
</script>

<style scoped>
.avatar-thumbnail {
  height: 160px;
}
.avatar-thumbnail > img {
  width: 160px;
  height: 160px;
  background-color: #ccc;
}
.sign-navbar {
  height: 48px;
  background-color: rgba(0, 0, 0, 0.3);
  box-shadow: none;
  padding: 9px 0 0 12px;
}
.navbar-brand {
  font-size: 1.1rem;
  font-weight: bold;
  margin-right: 0px;
  cursor: default;
  color: #fff;
}
.breadcrumb {
  padding: 0px;
  font-size: 11px;
  background-color: transparent;
}

.bg-login {
  width: 100%;
  height: 100%;
  /* background-color: #efefe6; */
  background-image: url('~assets/photo-1430165558479-de3cf8cf1478.jpg');
  background-size: cover;
  background-repeat: no-repeat;
  background-position: 0px;
}
.panel-sign {
  height: 380px;
}
.dimmer-layout {
  position: absolute;
  top: 0px;
  left: 0px;
  background-color: #fff;
  width: calc(100% + 19px);
  height: calc(100% + 30px);
  z-index: 1;
  opacity: 0.7;
  margin: -15px -14px;
}
.dimmer-content {
  z-index: 2;
  position: absolute;
  margin: auto;
  width: 100%;
  text-align: center;
  left: 0px;
  vertical-align: middle;
  margin-top: 130px;
}
.btn-logout {
  font-weight: bold;
  font-size: 0.65rem;
}
.card {
  box-shadow: #f3f2f2 2px 2px 2px 2px;
}
@media (max-width: 767px) {
  .card {
    border: none;
    box-shadow: none;
  }
  .panel-sign {
    height: auto;
  }
}
</style>
