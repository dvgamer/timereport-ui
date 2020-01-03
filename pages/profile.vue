<template>
<div>
  <b-card class="mt-2 mb-3">
    <b-card-title>
      <h1 class="h2">{{ $auth.user.display_name }} <small>({{ $auth.user.title }})</small></h1>
    </b-card-title>
    <b-card-sub-title>
      {{ $auth.user.company }}
    </b-card-sub-title>
    <b-card-body>
      <b>E-Mail: </b> {{ $auth.user.mail }}<br>
      <b>Department: </b> {{ $auth.user.department }}<br>
      <b>Office Name: </b> {{ $auth.user.office_name }}<br>
      <b>Tel. </b> {{ $auth.user.telephone_no }}<br>
      <b>user_level: </b> {{ $auth.user.user_level }}<br>
      <b>lasted: </b> {{ $auth.user.lasted }}<br>
    </b-card-body>
  </b-card>
  <b-card class="mb-3" title="Account">
    <b-card-body>

    </b-card-body>
  </b-card>
  <b-card class="mb-3" title="Session">
    <b-card-body>

    </b-card-body>
  </b-card>
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
