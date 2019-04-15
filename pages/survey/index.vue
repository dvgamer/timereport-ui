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
      <div class="col-12">
        <div class="card">
          <div class="card-header">
            Survey
          </div>
          <div class="card-body">
            asd
          </div>
        </div>
      </div>
      <div class="col-md-24">
        <div class="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pb-1 mb-1">
          <h5 class="h5 mb-md-0">History <small class="text-muted">at 11-12-2018</small></h5>
          <div class="btn-toolbar mb-2 mb-md-0">
            <div class="btn-group btn-group-sm mr-2">
              <button type="button" class="btn btn-outline-primary"><fa icon="chevron-left" /></button>
              <button type="button" class="btn btn-outline-primary">Today</button>
              <button type="button" class="btn btn-outline-primary" disabled><fa icon="chevron-right" /></button>
            </div>
          </div>
        </div>
        <div>
          <div v-for="(day, i) in getGroupHistory()" :key="i" class="group-history">
            <h5 v-text="parseDays(day)" />
            <div v-for="e in filterHistory(day)" :key="e.nRow" class="text-inline">
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
                <button v-if="isPermissionDelete()" type="button" class="btn btn-sm btn-icon" @click.prevent="onDelete(e, true)">
                  <fa icon="trash-alt" />
                </button>
                <button type="button" class="btn btn-sm btn-icon" @click.prevent="onEdit(e)">
                  <fa icon="edit" />
                </button>
                <span><fa :icon="getIcon(e)" :class="'text-'+getColor(e)" /></span>
                <b><a href="#" @click.prevent="onView(e)" v-text="e.sTitleName" /></b>
                <b v-text="toTime(e.dCreated, i)" />
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
    editor: false
  }),
  async asyncData ({ $axios }) {
    let { data } = await $axios('/api/survey/task/history')
    return { history: data }
  },
  created () {
  },
  methods: {
    toTime (datetime, i) {
      return (i > 0 ? moment(datetime).format('[at] HH:mm') : moment(datetime).fromNow())
    },
    isPermissionDelete () {
      return this.$auth.user && this.$auth.user.user_level >= 2
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
          vm.$forceUpdate()
          // vm.$router.go()
        }).catch(ex => {
          vm.$toast.error(ex.message)
        })
      } else {
        e.confirmDelete = confirmDelete
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

