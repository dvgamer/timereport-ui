<template>
<div>
  <div class="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pb-2 mb-3 border-bottom">
    <h1 class="h2">Dashboard</h1>
    <div class="btn-toolbar mb-2 mb-md-0">
      <b-button-group class="mr-2" size="sm">
        <b-button class="btn-outline-secondary">Button 1</b-button>
        <b-button class="btn-outline-secondary">Button 2</b-button>
      </b-button-group>
      <b-dropdown id="ddown1" text="Dropdown Button" right>
        <b-dropdown-item>First Action</b-dropdown-item>
        <b-dropdown-item>Second Action</b-dropdown-item>
        <b-dropdown-item>Third Action</b-dropdown-item>
        <b-dropdown-divider></b-dropdown-divider>
        <b-dropdown-item>Something else here...</b-dropdown-item>
        <b-dropdown-item disabled>Disabled action</b-dropdown-item>
      </b-dropdown>
    </div>
  </div>
</div>
</template>

<script>

export default {
  head: {
    title: 'Dashboard',
  },
  components: {
  }
}
</script>

<style>

</style>
