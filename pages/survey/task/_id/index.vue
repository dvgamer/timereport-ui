<template>
  <div>
    <b-form @submit.prevent="onSubmit" @reset.prevent="onReset">
      <div class="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pb-2 mb-3 border-bottom">
        <div v-if="taskKey">
          <h3>History Survey</h3>
          <small>by <b>{{ editor }}</b> at {{ getTaskDateTime }}</small>
        </div>
        <div v-else>
          <h3>{{ title }}</h3>
          <small>
            <span><b>Pass:</b> {{ getTaskSuccess }}</span>
            <span><b>Fail:</b> {{ getTaskProblem }}</span>
            <span :class="getTaskUncheck ? 'text-danger' : ''">{{ !getTaskUncheck ? '' : `(${getTaskUncheck} Uncheck)` }}</span>
          </small>
        </div>
        <div class="btn-toolbar mb-2 mb-md-0">
          <b-button-group class="mr-2 pt-2 pt-md-0" size="sm">
            <b-button
              type="button"
              size="ssm"
              :variant="tasks.length !== tasks.filter(e => e.selected).length ? 'outline-info' : 'outline-secondary'"
              @click="onCheckAll"
              v-text="tasks.length !== tasks.filter(e => e.selected).length ? 'Checked All' : 'Unchecked All'"
            />
          </b-button-group>
        </div>
      </div>
      <div class="row pb-5">
        <div class="col-sm-36">
          <div v-for="(e, i) in tasks" :key="e.nTaskDetailId">
            <b-form-group :label-for="'chkTaskList' + e.nTaskDetailId">
              <b-form-checkbox
                :id="'chkTaskList' + e.nTaskDetailId"
                v-model="e.selected"
                :disabled="e.problem"
                switch required
                class="tasklist"
                name="check-button"
                @change="onChange"
              >
                <b-button
                  class="problem"
                  type="button"
                  size="sm"
                  :variant="!e.problem ? 'outline-secondary' : 'outline-danger'"
                  @click="onReason(e)"
                  v-text="!e.problem ? 'Problem' : 'Cancel'"
                />
                <b class="checker-text"><span v-text="(i + 1) + '. ' + e.sSubject" /></b>
                <span class="checker-text d-none d-md-inline" v-text="e.sDetail" />
                <div v-if="e.problem">
                  <div>
                    <span class="badge badge-light">STATUS :</span>
                    <b-button
                      :class="[ 'status', e.status === 'FAIL' ? 'active' : '' ]"
                      type="button"
                      size="sm"
                      :variant="e.status === 'FAIL' ? 'outline-danger' : 'outline-secondary'"
                      @click.prevent="onStatus(e, 'FAIL')"
                      v-text="'FAIL'"
                    />
                    <b-button
                      :class="[ 'status', e.status === 'WARN' ? 'active' : '' ]"
                      type="button"
                      size="sm"
                      :variant="e.status === 'WARN' ? 'outline-warning' : 'outline-secondary'"
                      @click.prevent="onStatus(e, 'WARN')"
                      v-text="'WARN'"
                    />
                    <b-button
                      :class="[ 'status', e.status === 'INFO' ? 'active' : '' ]"
                      type="button"
                      size="sm"
                      :variant="e.status === 'INFO' ? 'outline-info' : 'outline-secondary'"
                      @click.prevent="onStatus(e, 'INFO')"
                      v-text="'INFO'"
                    />
                  </div>
                  <b-form-textarea
                    id="txtReason"
                    v-model="e.reason"
                    class="mt-3 reason"
                    :required="e.problem"
                    size="sm"
                    maxlength="500"
                    placeholder="Enter at least 5 characters"
                    rows="2"
                    @change="onChange"
                  />
                </div>
                <div v-else />
              </b-form-checkbox>
            </b-form-group>
          </div>
          <div v-if="tasks.length === 0" class="text-center">
            No Transaction
          </div>
        </div>
        <div class="col-md-36">
          <hr>
          <b-button type="submit" :disabled="submited" variant="primary" v-text="submited ? 'Approving...' : taskKey ? 'Save' : 'Submit'" />
          <b-button v-if="!taskKey" type="reset" :disabled="submited" variant="danger">Reset</b-button>
          <nuxt-link v-else tag="button" to="/history" type="button" class="btn btn-secondary">Back</nuxt-link>
        </div>
      </div>
    </b-form>
  </div>
</template>

<script>
import moment from 'moment'
export default {
  head: {
    title: 'Task',
  },
  data: () => ({
    taskKey: null,
    editor: 'Guest',
    submited: false,
    current: moment(),
    problem: 0,
    title: 'Survey',
    tasks: []
  }),
  computed: {
    getTaskDateTime () {
      return moment(this.taskKey, 'YYYYMMDDHHmmssSSS').format('DD MMMM YYYY HH:mm:ss')
    },
    getDateTime () {
      return this.current.format('DD MMMM YYYY HH:mm:ss')
    },
    getTaskUncheck () {
      return this.tasks.length - this.getTaskSuccess - this.getTaskProblem
    },
    getTaskSuccess () {
      return this.tasks.filter(e => e.selected).length
    },
    getTaskProblem () {
      return this.problem
    }
  },
  async asyncData ({ redirect, params, $axios }) {
    if (params.checkin) {
      let sKey = parseInt(params.checkin)
      if (sKey == NaN) return redirect('/survey')

      let { data } = await $axios('/api/survey/task/edit/' + params.id)
      if (!data.records) return redirect('/survey')
      
      return { editor: data.editor, tasks: data.records, taskKey: params.id }
    } else {
      let { data } = await $axios('/api/survey/task/detail/' + params.id)
      return { title: data.title, tasks: data.tasks, taskKey: null }
    }
  },
  created () {
    if (!this.taskKey) {
      setInterval((() => {
        this.current = moment()
      }).bind(this), 500)
      if (process.client) {
        let survey = window.localStorage.getItem('survey.tasks')
        if (survey) {
          survey = JSON.parse(survey)
          if (this.tasks.length === survey.length && survey.filter(s => s.reason !== '' || s.selected).length > 0) this.tasks = survey
          this.getProblemUpdate()
        }
      }
    }
  },
  methods: {
    onSave () {
      if (!this.taskKey && process.client && this.tasks) {
        this.$nextTick((() => {
          window.localStorage.setItem('survey.tasks', JSON.stringify(this.tasks))
        }).bind(this))
      }
    },
    onCheckAll () {
      let checkAll = this.tasks.length ===  this.tasks.filter(e => e.selected).length
      if (checkAll) return this.onReset()
      
      this.problem = 0
      for (const e of this.tasks) {
        this.$set(this.tasks, this.tasks.indexOf(e), Object.assign(e, {
          selected: true,
          problem: false,
          reason: '',
          status: ''
        }))
      }
      this.$forceUpdate()
      this.onSave()
    },
    onReset () {
      if (!this.taskKey) {
        this.problem = 0
        for (const e of this.tasks) {
          this.$set(this.tasks, this.tasks.indexOf(e), Object.assign(e, {
            selected: false,
            problem: false,
            reason: '',
            status: ''
          }))
        }
        this.$forceUpdate()
        if (process.client && this.tasks) window.localStorage.removeItem('survey.tasks')
      }
    },
    onSubmit () {
      let vm = this
      let data = vm.tasks.map(e => {
        return {
          nTaskDetailId: e.nTaskDetailId,
          nOrder: e.nOrder,
          sSubject: e.sSubject,
          selected: e.selected,
          status: e.problem ? e.status : '',
          problem: e.problem || false,
          reason: e.problem ? e.reason : ''
        }
      })
      this.submited = true
      vm.$axios.post('/api/history/submit', {
        key: vm.taskKey,
        username: vm.$auth.user.user_name,
        name: vm.$auth.user.name,
        tasks: vm.tasks
      }).then(({ data }) => {
        if (data.success) {
          if (!this.taskKey) {
            vm.$toast.success('Thanks.')
            vm.onReset()
          } else {
            vm.$toast.success('Task Updated.')
            vm.$router.push('/history')
          }
        } else {
          vm.$toast.error('Error API')
        }
        this.submited = false
      }).catch(ex => {
        vm.$toast.error(ex.message)
        this.submited = false
      })
    },
    onReason (e) {
      e.selected = false
      e.problem = !e.problem
      if (!e.status) e.status = e.problem ? 'FAIL' : ''
      if (!e.problem) e.status = ''
      this.$forceUpdate()

      this.problem = 0
      for (const i of this.tasks) {
        this.problem += i.problem ? 1 : 0
      }
      if (this.taskKey) return
      this.onSave()
    },
    onChange () {
      this.$forceUpdate()
      if (this.taskKey) return
      this.onSave()
    },
    onStatus (e, text) {
      e.status = text
      this.$forceUpdate()
      if (this.taskKey) return
      this.onSave()
    },
    getProblemUpdate () {
      this.problem = 0
      for (const i of this.tasks) {
        this.problem += i.problem ? 1 : 0
      }
      this.$forceUpdate()
    }
  }
}
</script>

<style>
.checker-text {
  font-family: "Segoe UI";
  font-size: 13px;
}
button.status {
  width: 40px;
  padding: 0px;
  font-size: 10px;
  font-weight: bold;
}
button[type=submit] {
  min-width: 120px;
}
</style>
