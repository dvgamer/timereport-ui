<template>
<div>
  <no-ssr>
    <slideout-panel v-show="true"></slideout-panel>
  </no-ssr>
  <div class="justify-content-between flex-wrap flex-md-nowrap align-items-center pb-2 mb-3 border-bottom">
    <b-form class="mb-2 mb-md-0" @submit.prevent="onBashEnter">
      <b-input-group size="sm">
        <b-input-group-prepend>
          <b-btn variant="outline-info"><i class="fa fa-folder-open-o"></i> LOAD</b-btn>
        </b-input-group-prepend>
        <b-form-input type="text" v-model="cmd.stdin" placeholder="bash"></b-form-input>
        <b-input-group-append>
          <b-button type="submit" class="btn-outline-success"><i class="fa fa-play"></i> RUN</b-button>
        </b-input-group-append>
      </b-input-group>
    </b-form>
  </div>
  <div class="row">
    <div class="col">
      <div class="code-console border p-2">
        <code v-html="codeHtml"></code>
      </div>
    </div>
  </div>
</div>
</template>

<script>
import moment from 'moment'
import spinnerSocket from '~/components/loading/spinner-socket.vue'

export default {
  components: {
    'spinner-socket': spinnerSocket
  },
  head: {
    title: 'Terminal',
  },
  data: () => ({
    cmd: {
      stdout: [],
      stdin: ''
    },
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
    ],
    cmOption: {
      tabSize: 4,
      styleActiveLine: true,
      lineNumbers: true,
      line: true,
      mode: 'powershell',
      lineWrapping: true,
      keyMap: "sublime",
      theme: "material"
    }
  }),
  watch: {
    bash () {
      if (this.bash.length > 200) this.bash.shift()
    }
  },
  computed: {
    codeHtml () {
      return this.cmd.stdout.join('<br>')
    }
  },
  methods: {
    getCmdFormat (msg, type) {
      let date = moment().format('YYYY-MM-DD HH:mm:ss.SSS')
      return `${date} ${type} ${msg}`
    },
    onBashEnter () {
      this.cmd.stdout = [ getCmdFormat(this.cmd.stdin, '›') ].concat(this.cmd.stdout)
      this.cmd.stdin = ''
      // this.$showPanel({
      //   component: "panel-1",
      //   cssClass: "panel-1",
      //   props: {}
      // })
    },
    onCmCursorActivity(codemirror) {
      console.log('onCmCursorActivity', codemirror)
    },
    onCmReady(codemirror) {
      console.log('onCmReady', codemirror)
    },
    onCmFocus(codemirror) {
      console.log('onCmFocus', codemirror)
    },
    onCmBlur(codemirror) {
      console.log('onCmBlur', codemirror)
    }
  },
  created () {
  }
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
.code-console {
  margin-top: 0px;
  margin-bottom: 0px;
  padding: 4px 16px;
  background-color: #3a4449 !important;
  color: #EAEAEA;
  min-height: 320px;
  height: calc(100vh - 170px) !important;
}
</style>
