<template>
<div>
  <div class="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pb-2 mb-3 border-bottom">
    <h1 class="h2">Terminal</h1>
    <div class="btn-toolbar mb-2 mb-md-0">
      <b-button-group class="mr-2" size="sm">
        <b-button class="btn-outline-success"><i class="fa fa-play"></i> RUN</b-button>
      </b-button-group>
      <b-button-group class="mr-2" size="sm">
        <b-button class="btn-outline-secondary"><i class="fa fa-edit"></i> EDIT</b-button>
        <b-button class="btn-outline-secondary"><i class="fa fa-plus"></i> ADD</b-button>
      </b-button-group>
    </div>
  </div>
  <div class="row">
    <div class="col-12">
      <b-table class="script-lists" :small="true" striped hover
        :sort-by.sync="sortBy" :sort-desc.sync="sortDesc" :items="items" :fields="fields">
      </b-table>
      <b-pagination :total-rows="totalRows" :per-page="perPage" v-model="currentPage" class="my-0" />
    </div>
    <div class="col-24">

    </div>
  </div>
</div>
</template>

<script>

export default {
  head: {
    title: 'Terminal',
  },
  data: () => ({
    sortBy: 'no',
    sortDesc: false,
    currentPage: 1,
    perPage: 20,
    totalRows: 120,
    fields: [
      { key: 'no', sortable: false },
      { key: 'filename', sortable: true },
    ],
    items: [
      { no: 1, filename: 'Dickerson Macdonald' },
      { no: 2, filename: 'Larsen Shaw' },
      { no: 3, filename: 'Geneva Wilson' },
      { no: 4, filename: 'Jami Carney' }
    ]
  })
}
</script>

<style lang="scss">
.script-lists {
  a {
    padding: 0.2rem 0rem;
    > div {
      font-size: 9px;
    }
  }
  
}
.table th {
  border-top: none;
  outline: none;
}
</style>
