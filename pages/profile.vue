<template>
  <div>
    <div class="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pb-2 mb-3 border-bottom">
      <h1 class="h2">Profile</h1>
    </div>
    <div class="row">
      <div class="offset-sm-6 col-sm-24">
        <b>name: </b> {{ $auth.user.name }}<br>
        <b>mail: </b> {{ $auth.user.mail }}<br>
        <b>title: </b> {{ $auth.user.title }}<br>
        <b>company: </b> {{ $auth.user.company }}<br>
        <b>department: </b> {{ $auth.user.department }}<br>
        <b>office_name: </b> {{ $auth.user.office_name }}<br>
        <b>description: </b> {{ $auth.user.description }}<br>
        <b>display_name: </b> {{ $auth.user.display_name }}<br>
        <b>telephone_no: </b> {{ $auth.user.telephone_no }}<br>
        <b>user_name: </b> {{ $auth.user.user_name }}<br>
        <b>user_type: </b> {{ $auth.user.user_type }}<br>
        <b>lasted: </b> {{ $auth.user.lasted }}<br>
        <b>created: </b> {{ $auth.user.created }}<br>
      </div>
    </div>
  </div>
</template>

<script>

export default {
  head: {
    title: 'Profile'
  },
  components: {
  }
}
</script>

<style>

</style>
