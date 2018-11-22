<template>
  <div class="row mt-5">
    <div class="col-md-28 col-lg-24 col-login mx-auto">
      <form class="card" action="" method="post">
        <div class="card-body p-0">
          <div class="row">
            <div class="col-xl-22 col-lg-20 col-md-16 d-none d-md-block bg-login">
              
            </div>
            <div class="col-xl-14 col-lg-16 col-md-20 p-4 mt-5 mb-5">
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
                <button type="submit" @click.prevent="onSignIn" class="btn btn-primary btn-block" :disabled="disabled.signin">Sign in</button>
              </div>
            </div>
          </div>
        </div>
      </form>
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
    let remember = this.$auth.$storage.getLocalStorage('login.remember', true)
    this.$nextTick(() => {
      if (remember && remember.saved) {
        // vm.$refs.password.focus()
      } else {
        // vm.$refs.email.focus()
      }
    })
  }
}
</script>

<style scoped>
.bg-login {
  background-color: #999;
  background-size: 240px 240px;
  background-repeat: no-repeat;
  background-position: center;
}
</style>
