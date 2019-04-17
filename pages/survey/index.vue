<template>
  <div>
    <div class="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pb-2 mb-3 border-bottom">
      <div class="mb-2">
        <h2 class="mb-0">Survey Overview</h2>
        <small>History group by date and lastet 100 rows.</small>
      </div>
      <div class="btn-toolbar mb-2 mb-md-0">
        <b-button-group class="mr-2" size="sm">
          <b-button variant="outline-secondary">Export</b-button>
        </b-button-group>
      </div>
    </div>
    <div class="row mt-3">
      <div class="col-md-12 mb-3">
        <div class="card">
          <div class="card-header">
            Survey Report
          </div>
          <div class="card-body">
            <li v-for="e in tasks" :key="e.nTaskId">
              <nuxt-link :to="'/survey/task/' + e.nTaskId">
                {{ e.sTitleName }}
              </nuxt-link>
            </li>
          </div>
        </div>
      </div>
      <div class="col-md-24">
        <div class="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pb-1 mb-1">
          <h4 class="mb-md-0">History <small class="text-muted" v-text="getToday()" /></h4>
          <div class="btn-toolbar mb-2 mb-md-0">
            <div class="btn-group btn-group-sm mr-2">
              <button type="button" class="btn btn-outline-primary" @click="previousWeek()"><fa icon="chevron-left" /></button>
              <button type="button" class="btn btn-outline-primary" @click="currentWeek()">Today</button>
              <button type="button" class="btn btn-outline-primary" :disabled="week === 0" @click="nextWeek()"><fa icon="chevron-right" /></button>
            </div>
          </div>
        </div>
        <div>
          <div v-if="getGroupHistory().length === 0" class="no-history">
            <span>No transaction</span>
          </div>
          <div v-for="(day, i) in getGroupHistory()" :key="i" class="group-history">
            <h5 v-text="parseDays(day)" />
            <div v-for="e in filterHistory(day)" :key="e.nRow" class="text-inline pb-2">
              <div v-if="e.confirmDelete">
                <button type="button" class="btn btn-sm btn-icon" @click.prevent="onDelete(e)">
                  <fa class="text-danger" icon="trash-alt" />
                </button>
                <button type="button" class="btn btn-sm btn-icon" @click.prevent="onDelete(e, false)">
                  <fa class="text-secondary" icon="times" />
                </button>
                <span class="delete-badge"><b>You want remove this "{{ e.sTitleName }}" survey task?</b></span>
              </div>
              <div v-else>
                <button v-if="isPermissionDelete()" type="button" class="btn btn-sm btn-icon d-none d-md-inline" @click.prevent="onDelete(e, true)">
                  <fa icon="trash-alt" />
                </button>
                <button v-if="isPermissionEdit()" type="button" class="btn btn-sm btn-icon d-none d-md-inline" @click.prevent="onEdit(e)">
                  <fa icon="edit" />
                </button>
                <span><fa :icon="getIcon(e)" :class="'text-'+getColor(e)" /></span>
                <b><a href="#" @click.prevent="onView(e)" v-text="e.sTitleName" /></b>
                <b v-text="toTime(e.dCreated)" /><br class="d-block d-md-none">
                <b-badge v-if="e.nFail > 0" variant="danger" v-text="'Fail ' + e.nFail" />
                <b-badge v-if="e.nWarn > 0" variant="warning" v-text="'Warning ' + e.nWarn" />
                <b-badge v-if="e.nInfo > 0" variant="info" v-text="'Info ' + e.nInfo" />
                <small v-text="'by ' + e.sName" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import moment from 'moment'

export default {
  head: {
    title: 'Survey',
  },
  data: () => ({
    history: [],
    tasks: [],
    week: 0,
    editor: false
  }),
  async asyncData ({ $axios }) {
    let { data } = await $axios.post('/api/survey/task/history')
    return data
  },
  created () {
  },
  methods: {
    async getWeek () {
      let { data } = await this.$axios.post('/api/survey/task/history', { week: this.week })
      this.history = data.history
    },
    async previousWeek () {
      this.week--
      await this.getWeek()
    },
    async currentWeek () {
      this.week = 0
      await this.getWeek()
    },
    async nextWeek () {
      this.week++
      await this.getWeek()
    },
    getToday () {
      return moment().add(this.week - 1, 'week').format('[at] DD-MM-YYYY') + moment().add(this.week, 'week').format(' [to] DD-MM-YYYY')
    },
    toTime (datetime) {
      return moment(datetime).format('[at] HH:mm')
    },
    isPermissionDelete () {
      return this.$auth.user && this.$auth.user.user_level >= 2
    },
    isPermissionEdit() {
      return this.$auth.user && this.$auth.user.user_level >= 1
    },
    parseDays (day) {
      return moment(day).calendar(null, {
        sameDay: '[Today]',
        lastDay: '[Yesterday]',
        lastWeek: 'dddd',
        sameElse: 'DD MMM YYYY'
      })
    },
    filterHistory (day) {
      return this.history.filter(e => day === moment(e.dCreated).format('YYYY-MM-DD')).sort(() => 1)
    },
    getGroupHistory () {
      let group = this.history.map(e => moment(e.dCreated).format('YYYY-MM-DD'))
      return ([ ...new Set(group) ]).sort(() => 1)
    },
    getIcon (e) {
      if (e.nFail > 0) {
        return 'times-circle'
      } else if (e.nWarn > 0) {
        return 'exclamation-circle'
      } else if (e.nInfo > 0) {
        return 'info-circle'
      } else if (e.nPass > 0) {
        return 'check-circle'
      }
    },
    getColor (e) {
      if (e.nFail > 0) {
        return 'danger'
      } else if (e.nWarn > 0) {
        return 'warning'
      } else if (e.nInfo > 0) {
        return 'info'
      } else if (e.nPass > 0) {
        return 'success'
      }
    },
    onView (e) {
      if (!this.editor) this.$router.push({ name: 'survey-version-id', params: { id: e.sKey } })
    },
    onEdit (e) {
      this.editor = true
      this.$router.push({ name: 'survey-task-id-edit', params: { id: e.nTaskId, edit: e.sKey } })
    },
    onDelete (e, confirmDelete) {
      e.confirmDelete = confirmDelete
      if (confirmDelete === undefined) {
        let vm = this
        this.editor = true
        let index = -1
        let item = this.history.filter((a, i) => {
          if (a.sKey === e.sKey) index = i
          return a.sKey === e.sKey
        })
        // console.log(index, item)
        // if (item.length > 1) return this.$toast.error(`${item.length} Tasks can't remove.`)
        this.history.splice(item, 1)
        vm.$axios.delete('/api/survey/task/' + e.sKey).then(() => {
          vm.$toast.success('Task Delete')
          // vm.$router.go()
        }).catch(ex => {
          vm.$toast.error(ex.message)
        })
      } else {
        this.$forceUpdate()
      }
    }
  }
}
</script>
<style scoped>
.group-history {
  padding-bottom: 10px;
}
.text-inline {
  padding: 3px 9px;
}
.btn-icon {
  padding: 0rem 0.2rem;
  margin-top: -2px;
}
.delete-badge {
  border: #e0e0e0 solid 1px;
  padding: 3px 6px;
  border-radius: 3px;
}
</style>

