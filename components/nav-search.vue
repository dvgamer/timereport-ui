<template>
<b-nav-form @submit.prevent="onSearch">
  <div class="form-group form-icon">
    <b-form-input size="sm" type="text" placeholder="Search" style="width:260px;"/>
    <i class="fa fa-search"></i>
  </div>
</b-nav-form>
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

</style>
