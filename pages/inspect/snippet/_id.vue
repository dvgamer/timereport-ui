<template>
  <div>
    <no-ssr>
      <slideout-panel v-show="true" />
    </no-ssr>
    <div class="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pb-2 mb-3 border-bottom">
      <h1 class="h2">Snippet</h1>
      <div class="btn-toolbar mb-2 mb-md-0">
        <b-button-group class="mr-2" size="sm">
          <b-button class="btn-outline-secondary"><i class="fa fa-floppy-o" /> SAVE</b-button>
          <b-button class="btn-outline-secondary" @click="onShowPanel"><i class="fa fa-folder-open-o" /> LOAD</b-button>
        </b-button-group>

        <b-button-group class="mr-2" size="sm">
          <b-button class="btn-outline-secondary" @click="$router.push('/inspect/snippet')"><i class="fa fa-back" /> BACK</b-button>
        </b-button-group>
      </div>
    </div>
    <div class="row">
      <div class="col">
        <iframe ref="code" frameborder="0" class="embed-responsive-item code-terminal border" width="100%" height="100%" :src="coding" />
        <!-- <no-ssr>
          <div class="code-placeholder border" slot="placeholder">
            <div class="code-loading">
              <spinner-socket size="75px"/>
            </div>
          </div>
          <codemirror class="code-terminal border" v-model="code" :options="cmOption"></codemirror>
        </no-ssr> -->
      </div>
    </div>
  </div>
</template>

<script>
import spinnerSocket from '~/components/loading/spinner-socket.vue'

export default {
  // components: {
  //   'spinner-socket': spinnerSocket
  // },
  head: {
    title: 'Snippets',
  },
  data () {
    return {
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
    }
  },
  async asyncData ({ params }) {
    let { id } = params
    let uri = 'javascript'
    if (id === 'create') {

    }
    return {
      coding: `/_/coding/${uri}`
    }
  },
  methods: {
    onShowPanel () {
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
.code-terminal {
  background-color: #3a4449;
  min-height: 400px;
  height: calc(100vh - 184px)
}
</style>
