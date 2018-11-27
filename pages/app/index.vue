<template>
<div>
  <div class="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pb-2 mb-3 border-bottom">
    <h1 class="h2">Application</h1>
    <div class="btn-toolbar mb-2 mb-md-0">
      <b-button-group class="mr-2" size="sm">
        <b-button class="btn-outline-secondary">Button 1</b-button>
        <b-button class="btn-outline-secondary">Button 2</b-button>
      </b-button-group>
    </div>
  </div>
  <div class="row">
    <div class="col-sm-24 mb-3">
    </div>
    <div class="col-sm-12 mb-3">
      <h6 class="border-bottom">IIS</h6>
      <ul class="stats">
        <li v-for="item in online" :key="item.key">
          <i class="fa fa-check-circle text-success" aria-hidden="true"></i>
          <span v-text="item.label"></span>
        </li>
      </ul>
      <h6 class="border-bottom">FTP</h6>
      <ul class="stats">
        <li v-for="item in ftp" :key="item.key">
          <i class="fa fa-check-circle text-success" aria-hidden="true"></i>
          <span v-text="item.label"></span>
        </li>
      </ul>
    </div>
  </div>
</div>
</template>

<script>

export default {
  head: {
    title: 'Application Dashboard'
  },
  async asyncData({ $api }) {
    let data = await $api.get('app')
    return data
  }
}
</script>

<style scoped>
ul.stats {
  padding-left: 10px;
}
ul.stats > li {
  display: block;
  font-weight: bold;
  font-size: 0.7rem;
  padding: 2px 0px;
}
ul.stats > li > i {
  font-size: .75rem;
}
.card {
  overflow: hidden;
}
.card-body {
  flex: 1 1 auto;
  padding: 1.25rem;
}
.card-body-icon {
  position: absolute;
  z-index: 0;
  top: -1.25rem;
  right: -1rem;
  opacity: 0.4;
  font-size: 5rem;
  -webkit-transform: rotate(15deg);
  transform: rotate(15deg);
}
</style>
