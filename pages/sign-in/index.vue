<template>
<div class="row">
  <div class="col-36">
    <div class="row mt-5 pt-3">
      <div class="col-36 col-lg-32 col-xl-30 col-login mx-auto">
        <form v-tabindex class="card" @submit.prevent="onSignIn" method="post">
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
                <div class="d-none d-md-block" style="height: 24px;"></div>
                <no-ssr>
                  <div slot="placeholder">
                    <div class="dimmer-layout"></div>
                    <div class="dimmer-content"><i class="fa fa-circle-o-notch fa-spin fa-3x fa-fw"></i></div>
                  </div>
                </no-ssr>
                <div class="mb-3 mt-2">
                  <h3 class="mb-0">Sign-In</h3>
                  <small>central.co.th</small>
                </div>
                <div class="form-group">
                  <label class="form-label">Email address</label>
                  <input :readonly="account.sing" ref="email" type="text" tabindex="1" class="form-control" v-model="account.username" maxlength="30" placeholder="Enter email">
                </div>
                <div class="form-group">
                  <label class="form-label">Password</label>
                  <input :readonly="account.sing" ref="password" tabindex="2" type="password" class="form-control" v-model="account.password" maxlength="12" placeholder="Password">
                </div>
                <div class="form-group">
                  <label class="custom-control custom-checkbox">
                    <input :disabled="account.sing" tabindex="3" type="checkbox" class="custom-control-input" v-model="account.remember" />
                    <span class="custom-control-label">Remember me</span>
                  </label>
                </div>
                <div class="form-footer">
                  <button type="submit" tabindex="4" class="btn btn-primary btn-block" :disabled="account.sing">{{account.btn_sign}}</button>
                </div>
                <small><b><div v-if="!!account.error" class="pt-3 text-danger text-nowrap text-center" v-text="account.error"></div></b></small>
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
              <strong>DevOps</strong> by <a href="https://dvgamerr.github.io">T. Kananek</a>. The source code is licensed
              <a href="http://opensource.org/licenses/mit-license.php">MIT</a>. The website content is licensed.
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
  layout: 'guest',
  head: {
    title: 'Sign In'
  },
  data () {
    return {
      account: {
        sign: false,
        error: '',
        btn_sign: 'Sign-In',
        username: '',
        password: '',
        remember: false
      }
    }
  },
  methods: {
    async onSignIn () {
      let vm = this
      let { username, password, remember } = this.account
      let data = 
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

        await vm.$auth.loginWith('local', {
          data: { user: username, pass: password, saved: remember }
        })
        console.log('$auth:', vm.$auth.loggedIn, vm.$auth.user)
        vm.account.btn_sign = `Hi, Welcome Back.`
        vm.$auth.$storage.setLocalStorage('login.remember', { user: username, saved: remember }, true)
      } catch (ex) {
        vm.account.sing = false
        vm.account.btn_sign = `Sign-In`
        vm.account.error = `${ex.message == 'Network Error' ? 'OFFLINE' : ex.message}`
      }
    }
  },
  created () {
    let vm = this
    if (!vm.$auth.loggedIn) {
      const remember = this.$auth.$storage.getLocalStorage('login.remember', true)
      const isCache = remember && remember.saved
      if (isCache) {
        vm.account.username = remember.user
        vm.account.remember = remember.saved
      }
      vm.$nextTick(() => {
        if (isCache) {
          if (vm.$refs.password) vm.$refs.password.focus()
        } else {
          if (vm.$refs.email) vm.$refs.email.focus()
        }
      })
    } else {
      console.log('$auth:', vm.$auth.loggedIn, vm.$auth.user)
    }
  }
}
</script>

<style scoped>
.sign-navbar {
  height: 48px;
  background-color: rgba(0, 0, 0, 0.02);
  box-shadow: none;
  padding: 12px;
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
  background-color: #efefe6;
  /* background-image: url('~assets/DevOps.png'); */
  background-size: cover;
  background-repeat: no-repeat;
  background-position: 15px;
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
  height: 100%;
  vertical-align: middle;
  margin-top: 130px;
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
