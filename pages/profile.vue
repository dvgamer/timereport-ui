<template>
<b-row>
  <b-col md="22" class="mb-3">
    <b-card>
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
        <b>lasted: </b> {{ $auth.user.lasted }}<br>
      </b-card-body>
    </b-card>
  </b-col>
  <b-col md="14" class="mb-3">
    <b-card :title="`Level : ${getLevel()}`">
      <b-card-body>

      </b-card-body>
    </b-card>
  </b-col>
  <b-col md="36" class="mb-3">
    <b-card title="Session">
      <b-card-body>

      </b-card-body>
    </b-card>
  </b-col>
</b-row>
</template>

<script>

export default {
  head: {
    title: 'Profile'
  },
  methods: {
    getLevel () {
      switch (this.$auth.user.user_level) {
        case 1: return 'User'
        case 2: return 'Support'
        case 3: return 'Senior Support'
        case 4: return 'Quality Analyst'
        case 5: return 'Senior Quality Analyst'
        case 6: return 'Developer'
        case 7: return 'Senior Developer'
        case 8: return 'Admin'
        case 9: return 'Systems'
      }
    }
  }
}
</script>

<style>

</style>
