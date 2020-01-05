<template>
  <div>
    <div class="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pb-2 mb-3 border-bottom">
      <h1 class="h2">Dashboard</h1>
      <div class="btn-toolbar mb-2 mb-md-0">
        <b-button-group class="mr-2" size="sm">
          <b-button variant="outline-secondary">Button 1</b-button>
          <b-button variant="outline-secondary">Button 2</b-button>
        </b-button-group>
      </div>
    </div>
    <b-row>
      <b-col md="12" class="mb-2">
        <b-card>
          <b-card-title>
            <h4><fa icon="server" /> Summary Server</h4>
          </b-card-title>
          <b-card-body>
            <ul class="stats">
              <li class="d-flex">
                <fa icon="check-circle" class="text-success" />
                <span>Network and Services</span>
              </li>
              <li class="d-flex">
                <fa icon="times-circle" class="text-danger" />
                <span>LINE-BOT Heroku</span>
              </li>
              <li class="d-flex">
                <fa icon="minus-circle" class="text-warning" />
                <span>Database Connection</span>
              </li>
            </ul>
          </b-card-body>
        </b-card>
      </b-col>
      <b-col md="24" class="mb-2">
        <b-card>
          <b-card-title>
            <h4><fa icon="project-diagram" /> POS CMG</h4>
          </b-card-title>
          <b-card-body>
            <b-row class="d-flex panel-item">
              <b-col>asd</b-col>
              <b-col>asd</b-col>
              <b-col>asd</b-col>
              <b-col>asd</b-col>
            </b-row>
          </b-card-body>
        </b-card>
      </b-col>
    </b-row>
  </div>
</template>
<script>

export default {
  head: {
    title: 'Overview'
  },
  components: {
  },
  created () {
  }
}
</script>

<style scoped>
.stats {
  margin: 0px;
}
.stats li {
  margin-bottom: 3px;
}
.stats li > span {
  font-weight: bold;
}
.stats li > svg {
  margin: 3px;
}
</style>
