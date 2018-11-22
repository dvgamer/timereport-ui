<template>
<div class="row">
  <div class="col-36">
    <div class="row mt-5 pt-3">
      <div class="col-md-28 col-lg-24 col-login mx-auto">
        <form class="card" @submit.prevent="onSignIn" method="post">
          <div class="card-body p-0">
            <div class="row">
              <div class="col-xl-22 col-lg-20 col-md-16 d-none d-md-block">
                <div class="bg-login"></div>
              </div>
              <div class="col-xl-13 col-lg-15 col-md-19 col-sm-36 mt-3 mb-3">
                <h3 class="mb-3">Sign-In</h3>    
                <div class="form-group">
                  <label class="form-label">Email address</label>
                  <input ref="email" type="text" class="form-control" v-model="account.username" maxlength="30" placeholder="Enter email">
                </div>
                <div class="form-group">
                  <label class="form-label">Password</label>
                  <input ref="password" type="password" class="form-control" v-model="account.password" maxlength="12" placeholder="Password">
                </div>
                <div class="form-group">
                  <label class="custom-control custom-checkbox">
                    <input type="checkbox" class="custom-control-input" v-model="account.remember" />
                    <span class="custom-control-label">Remember me</span>
                  </label>
                </div>
                <div class="form-footer">
                  <button type="submit" class="btn btn-primary btn-block" :disabled="disabled.signin">Sign in</button>
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
  // middleware: 'signin',
  layout: 'guest',
  data () {
    const remember = this.$auth.$storage.getLocalStorage('login.remember', true)
    const isCache = remember && remember.saved
    return {
      disabled: {
        singin: false
      },
      account: {
        username: isCache ? remember.user : '',
        password: '',
        remember: isCache ? remember.saved : false
      }
    }
  },
  methods: {
    onSignIn () {
      let vm = this
      let data = {
        user: this.account.username,
        pass: this.account.password,
        saved: this.account.remember
      }
      this.disabled.singin = true
      this.$auth.loginWith('local', { data: data }).then(() => {
        vm.$auth.$storage.setLocalStorage('login.remember', { user: data.user, saved: data.saved }, true)
      }).catch(ex => {
        vm.$toast.error(`Fail!: ${ex.message}`)
      })
    }
  },
  created () {
    let vm = this
    let remember = this.$auth.$storage.getLocalStorage('login.remember', true)
    vm.$nextTick(() => {
      if (remember && remember.saved) {
        if (vm.$refs.password) vm.$refs.password.focus()
      } else {
        if (vm.$refs.email) vm.$refs.email.focus()
      }
    })
  }
}
</script>

<style scoped>
.bg-login {
  width: 100%;
  height: 100%;
  background-color: #efefe6;
  /* background-image: url('~assets/DevOps.png'); */
  background-size: cover;
  background-repeat: no-repeat;
  background-position: 15px;
}
@media (max-width: 767px) {
  .card {
    border: none;
  }
}
</style>
