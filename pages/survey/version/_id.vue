<template>
  <div>
    <div class="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pb-2 mb-3 border-bottom">
      <div class="mb-2">
        <h2 class="mb-0">History Version</h2>
        <small>by <b>{{ editor }}</b> at {{ getTaskDateTime }}</small>
      </div>
      <div class="btn-toolbar mb-2 mb-md-0">
        <b-button-group class="mr-2" size="sm">
          <nuxt-link v-if="$auth.loggedIn" to="/survey" variant="outline-secondary">Back</nuxt-link>
        </b-button-group>
      </div>
    </div>
    <div class="row">
      <div class="col-sm-36">
        <div v-for="(e, i) in getLastVersion()" :key="e.nTaskDetailId">
          <b-form-group :label-for="'chkTaskList' + e.nTaskDetailId">
            <fa :class="'text-'+getColor(e)" :icon="getIcon(e)" />
            <b class="history-text"><span v-text="(i + 1) + '. ' + e.sSubject" /></b>
            <small>at {{ parseDate(e.dCreated) }} {{ e.nVersion !== 1 ? 'updated' : 'submited' }} by {{ e.sName }}</small>
            <div class="history-text d-none d-md-block ml-35" v-html="e.sDetail" />
            <pre v-if="e.problem" class="ml-35" v-html="e.reason" />
            <div v-if="e.nVersion !== 1" class="history-detail">
              <div v-for="d in getDetailVersion(e.nTaskDetailId)" :key="d.nVersion">
                <div v-if="e.nVersion != d.nVersion">
                  <fa :class="'text-'+getColor(d)" :icon="getIcon(d)" />
                  {{ parseDate(d.dCreated) }} {{ d.nVersion !== 1 ? 'updated' : 'submited' }} by {{ d.sName }}
                  <pre v-if="d.problem" v-html="d.reason" />
                </div>
              </div>
            </div>
          </b-form-group>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import moment from 'moment'
export default {
  auth: false,
  data: () => ({
    taskKey: null,
    editor: 'Guest',
    tasks: []
  }),
  computed: {
    getTaskDateTime () {
      return moment(this.taskKey, 'YYYYMMDDHHmmssSSS').format('DD MMMM YYYY HH:mm:ss')
    }
  },
  async asyncData ({ redirect, params, $axios }) {
    let sKey = parseInt(params.id)
    if (isNaN(sKey)) return redirect('/survey')

    let { data } = await $axios('/api/survey/task/version/' + params.id)
    if (!data.records) return redirect('/survey')
    
    return { editor: data.editor, tasks: data.records, taskKey: params.id }
  },
  methods: {
    getIcon (e) {
      if (e.status === 'FAIL') {
        return 'times-circle'
      } else if (e.status === 'WARN') {
        return 'exclamation-circle'
      } else if (e.status === 'INFO') {
        return 'info-circle'
      } else if (e.status === 'PASS') {
        return 'check-circle'
      }
    },
    getColor (e) {
      if (e.status === 'FAIL') {
        return 'danger'
      } else if (e.status === 'WARN') {
        return 'warning'
      } else if (e.status === 'INFO') {
        return 'info'
      } else if (e.status === 'PASS') {
        return 'success'
      }
    },
    parseDate (date) {
      return moment(date).format('DD MMM YYYY HH:mm:ss')
    },
    getLastVersion () {
      let nTask = []
      return this.tasks.filter(e => {
        if (nTask.indexOf(e.nTaskDetailId) === -1) {
          nTask.push(e.nTaskDetailId)
          return true
        } else {
          return false
        }
      })
    },
    getDetailVersion (nTaskDetailId) {
      return this.tasks.filter(e => e.nTaskDetailId === nTaskDetailId)
    }
  }
}
</script>

<style>
.history-text {
  font-family: "Segoe UI";
  font-size: 14px;
}
.history-detail {
  font-family: "Segoe UI";
  font-size: 12px;
  color: #525252;
  padding-left: 20px;
}
.history-detail svg {
  width: 14px !important;
}
.text-fail {
  color: #ca3232
}
.text-pass {
  color: #4caf50
}
.ml-35 {
  margin-left: 20px;
}
</style>
