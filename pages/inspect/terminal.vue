<template>
  <div>
    <no-ssr>
      <slideout-panel v-show="true" />
    </no-ssr>
    <div class="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pb-2 mb-3 border-bottom">
      <h2 class="h2">Terminal</h2>
      <div class="btn-toolbar mb-2 mb-md-0">
        <b-button-group class="mr-2" size="sm">
          <b-btn variant="outline-info"><i class="fa fa-folder-open-o" /> LOAD</b-btn>
          <b-btn class="btn-outline-success"><i class="fa fa-play" /></b-btn>
        </b-button-group>
      </div>
    </div>
    <div class="row">
      <div class="col">
        <div class="code-console border p-2">
          <code>
            <span class="cmd">
              <!-- eslint-disable-next-line -->
              <span class="type" v-html="`${getLogTime('YYYY-MM-DD HH:mm:ss')}.xxx ` + (cmd.process ? '…' :'›')" />
              <!-- eslint-disable-next-line -->
              <span class="msg" v-html="cmd.process ? '' : toHtml(cmd.stdin) + (cmd.dash ? '_' : '')" />
            </span>
          </code>
          <!-- eslint-disable-next-line -->
          <code v-html="codeHtml" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import moment from 'moment'
import spinnerSocket from '~/components/loading/spinner-socket.vue'

let iDash = 0
let T_CMD = 0
let T_INFO = 1
let T_DEBUG = 2
let T_RUN = 3
let T_FAIL = 4

export default {
  // components: {
  //   'spinner-socket': spinnerSocket
  // },
  head: {
    title: 'Terminal',
  },
  data: () => ({
    cmd: {
      keyEvent: true,
      dash: false,
      process: false,
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
  computed: {
    codeCompile () {
      return this.getCmdFormat(this.cmd.stdin, T_CMD)
    },
    codeHtml () {
      return this.cmd.stdout.join('')
    }
  },
  beforeMount () {
    window.addEventListener('keydown', this.eventTerminalKey)
    window.addEventListener('paste', this.eventTerminalPaste)

  },
  created () {
    iDash = setInterval((() => { this.cmd.dash = !this.cmd.dash }).bind(this), 500)
  },
  destroyed () {
    clearInterval(iDash)
    window.removeEventListener('keydown', this.eventTerminalKey)
    window.removeEventListener('paste', this.eventTerminalPaste)
  },
  methods: {
    async axiosCompiler () {
      let vm = this
      return new Promise((resolve, reject) => {
        setTimeout(() => {
          vm.cmdWriteLog(T_FAIL, `'${vm.cmd.stdin}' is not recognized as command.`)
          resolve()
        }, 500)
      })
    },
    onEnter () {
      if (this.cmd.stdin.trim()) {
        this.cmd.process = true
        this.axiosCompiler().catch((ex => {
          this.cmdWriteLog(T_FAIL, `<span class="text-danger">${ex.message}</span>`)
        }).bind(this))
      }
    },
    onSave () {
      console.log('saved.')
    },
    onClear () {
      this.cmd.stdout = []
    },
    eventTerminalKey (e) {
      if (!this.cmd.keyEvent) return
      let IsKey = [ 'Enter', 'Backspace', 'Space' ].indexOf(e.code) === -1
      let IsFn = e.altKey || e.metaKey || (e.keyCode >= 112 && e.keyCode <= 123)

      if (e.key.charCodeAt() > 126 || IsFn || (e.keyCode < 48 && IsKey)) return e.preventDefault()

      if (e.code === 'Backspace') {
        this.cmd.stdin = this.cmd.stdin.slice(0, this.cmd.stdin.length - 1)
      } else if (e.code === 'Enter') {
          if (!this.cmd.process) this.onEnter()
          return e.preventDefault()
      } else {
        if (!e.ctrlKey) {
           this.cmd.stdin += e.key
        } else if (e.code === 'KeyS') {
          this.onSave()
          return e.preventDefault()
        } else if (e.code === 'KeyL') {
          this.onClear()
          return e.preventDefault()
        } else if (e.code === 'KeyA') {
          return e.preventDefault()
        } else if (e.code === 'KeyC') {
          this.cmd.stdin = ''
        }
      }
    },
    eventTerminalPaste (e) {
      if (!this.cmd.keyEvent || !e.clipboardData) return

      let data = e.clipboardData.getData('text').trim()
      this.cmd.stdin = data
    },
    toHtml (text) {
      return text.replace(/ /g, '&nbsp')
    },
    cmdWriteLog (type, msg) {
      this.cmd.stdout = [ this.getCmdFormat(msg, type) ].concat(this.cmd.stdout)
      this.cmd.stdin = ''
      this.cmd.process = false
    },
    getCmdFormat (msg, type) {
      let color = ''
      switch (type) {
        case T_CMD: type = '›'; color = 'text-light'; break
        case T_INFO: type = '―'; color = 'text-info'; break
        case T_DEBUG: type = '…'; color = 'text-muted'; break
        case T_FAIL: type = '‼'; color = 'text-danger'; break
        default: type = '·'; color = 'text-warning'; break
      }
      return `<p class="cmd"><span class="date">${this.getLogTime()}</span> <span class="type ${color}">${type}</span> <span class="msg">${msg}</span></p>`
    },
    getLogTime (format) {
      return moment().format(format ? format :'YYYY-MM-DD HH:mm:ss.SSS')
    }
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
.cmd-console:focus {
  outline: none !important;
}
.code-console {
  margin-top: 0px;
  margin-bottom: 0px;
  padding: 4px 16px;
  background-color: #3a4449 !important;
  color: #EAEAEA;
  min-height: 320px;
  height: calc(100vh - 185px) !important;
  overflow-y: scroll;
  overflow-x: none;
  code {
    color: #EAEAEA;
    font-size: 12px;
    font-family: 'Consolas';
    p {
      margin: 0px;
    }
    .type, .date {
      color: #96a0ab;
      font-weight: bold;
    }
    // .cmd {
    //   .type {
    //   }
    //   .msg {
        
    //   }
    // }
  }
}
</style>
