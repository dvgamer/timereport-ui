<template>
  <div style="text-align:center;width: 100%;">
    <h1 class="title">
      {{ error.statusCode }}
    </h1>
    <h2 class="info">
      {{ error.message }}
    </h2>
    <nuxt-link v-if="error.statusCode === 404" class="button" to="/">
      Homepage
    </nuxt-link>
  </div>
</template>
<script>
export default {
  // eslint-disable-next-line
  props: [ 'error' ],
  layout: 'error-layout'
}
</script>

<style scoped>
.title
{
  margin-top: 15px;
  font-size: 5em;
}
.info
{
  font-weight: 300;
  color: #9aabb1;
  margin: 0;
}
.button
{
  margin-top: 50px;
}
</style>
