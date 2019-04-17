<template>
  <div>
    <div class="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pb-2 mb-3 border-bottom">
      <div class="mb-2">
        <h2 class="mb-0">Audit Logs</h2>
        <small>logging realtime fetech.</small>
      </div>
      
      <div class="btn-toolbar mb-2 mb-md-0">
        <b-button-group class="mr-2" size="sm">
          <b-button variant="outline-secondary" @click.prevent="onFullscreen">
            <fa :icon="!fullscreenToggle ? 'expand-arrows-alt' : 'compress-arrows-alt'" />
          </b-button>
        </b-button-group>
      </div>
    </div>
    <table class="table table-sm table-striped">
      <thead class="thead-light">
        <tr>
          <th class="text-center" scope="col" style="width: 40px;">Type</th>
          <th class="text-center" scope="col" style="width: 170px;">Date</th>
          <th class="text-center" scope="col" style="width: 100px;">Service</th>
          <th class="text-center" scope="col" style="width: 120px;">Functional</th>
          <th class="text-left" scope="col">Message</th>
          <th scope="col" style="width:25px;" />
        </tr>
      </thead>
      <tbody>
        <tr v-for="log in audit" :key="log._id" :class="showErrorLine(log)">
          <th class="text-center text-uppercase" scope="row">
            <fa :class="getTypeColor(log.status)" :icon="getTypeIcon(log.status)" /> 
          </th>
          <td class="text-center text-uppercase" v-text="getDateTime(log.created)" />
          <td class="text-center text-lowercase" v-text="log.app" />
          <td class="text-left text-lowercase" v-text="log.group" />
          <td>
            <input readonly type="text" :value="log.message">
          </td>
          <td class="text-right">
            <button type="buton" disabled class="btn btn-sm btn-icon">
              <fa icon="ellipsis-h" />
            </button>
          </td>
        </tr>
      </tbody>
    </table>
    <div class="overflow-auto">
      <b-pagination-nav :link-gen="getAuditPage" use-router no-prefetch size="sm" :number-of-pages="pagination" @click.native="onAuditData" />
    </div>
  </div>
</template>

<script>
import moment from 'moment'
import _ from 'lodash'

export default {
  head: {
    title: 'Audit',
  },
  data () {
    return {
      fullscreenToggle: false
    }
  },
  // computed: {
  //   fullscreenMode () {
  //     return process.client ? window.innerHeight == screen.height : false
  //   }
  // },
  async asyncData ({ $axios, query }) {
    let { data } = await $axios.post('/api/audit', query)
    return { audit: data.audit, pagination: Math.ceil(data.total / data.limit) }
  },
  methods: {
    onAuditData () {
      let vm = this
      this.$store.commit('$page', true)
      return _.debounce(async () => {
        let { data } = await vm.$axios.post('/api/audit', vm.$route.query)
        vm.audit = data.audit
        vm.pagination = Math.ceil(data.total / data.limit)
        vm.$store.commit('$page', false)
      }, 200)()
    },
    getAuditPage(pageNum) {
      return pageNum === 1 ? '/audit' : `/audit?page=${pageNum}`
    },
    getDateTime (datetime) {
      return moment(datetime).format('DD-MM-YYYY HH:mm:ss.SSS')
    },
    getTypeIcon (status) {
      if (status === 'error') {
        return 'times-circle'
      } else if (status === 'warn') {
        return 'exclamation-circle'
      } else if (status === 'info') {
        return 'info-circle'
      } else if (status === 'start') {
        return 'star-of-life'
      } else if (status === 'success') {
        return 'dot-circle'
      } else if (status === 'log') {
        return 'comment-dots'
      } else {
        return status
      }
    },
    getTypeColor (status) {
      if (status === 'error') {
        return 'text-danger'
      } else if (status === 'warn') {
        return 'text-warning'
      } else {
        return 'text-muted'
      }
    },
    showErrorLine (e) {
      return e.status === 'error' ? 'tr-danger' : ''
    },
    async onRefreshPage () {
      this.$store.commit('$page', true)
      let { data } = await this.$axios.post('/log/audit')
      this.$store.commit('$page', false)
      this.audit = data.audit
      this.pagination = Math.ceil(data.total / data.limit) 
    },
    onFullscreen () {
      if (!this.fullscreenToggle) {
        this.fullscreenToggle = true
        this.$store.commit('$menu', 'none')
      } else {
        this.fullscreenToggle = false
        this.$store.commit('$menu', 'full')
      }
    }
  }
}
</script>

<style scoped>
.btn-icon {
  padding: 0rem 0.2rem;
  margin-top: -2px;
}
table > tbody > tr > td > input[readonly] {
  border: none;
  outline: none;
  width: 100%;
  background-color: transparent;
  color: inherit;
}
.tr-danger td, .tr-danger input {
  color: #ec2c1e;
  font-weight: bold;
}
li.page-item {
  width: 25px;
}
.pagination-sm .page-link {
  text-align: center;
  padding: 0.25rem;
  font-size: 0.6825rem;
  line-height: 1.5;
}
</style>
