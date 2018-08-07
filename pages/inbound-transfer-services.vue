<template>
<div>
  <div class="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pb-2 mb-3 border-bottom">
    <h1 class="h2">Inbound Transfer Services</h1>
    <div class="btn-toolbar mb-2 mb-md-0">
      <div class="btn-group mr-2">
        <button class="btn btn-sm btn-outline-secondary">Share</button>
        <button class="btn btn-sm btn-outline-secondary">Export</button>
      </div>
    </div>
  </div>
</div>
</template>

<script>
import axios from '~/plugins/axios.js'

export default {
  async asyncData () {
    let req = await axios({ url: '/inbound-transfer' })
    return { req: (req.status === 200 ? req.data : {}) }
  }
}
</script>

<style>

</style>
