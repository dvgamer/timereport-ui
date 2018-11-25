<template>
<div id="dashboard">
</div>
</template>

<script>

export default {
  head: {
    title: 'Dashboard'
  },
  components: {
  },
  created () {
    console.log('dashboard:', this.$auth.user)
  }
}
</script>

<style scoped>

</style>
