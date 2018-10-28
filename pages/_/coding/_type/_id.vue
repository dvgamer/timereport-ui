<template>
<div class="embed-fullscreen">
  <no-ssr>
    <div class="code-placeholder" slot="placeholder">
      <div class="code-loading"><spinner-socket size="75px"/></div>
    </div>
    <codemirror class="code-terminal" v-model="code" :options="cmOption"></codemirror>
  </no-ssr>
</div>
</template>
<script>
import spinnerSocket from '~/components/loading/spinner-socket.vue'
// import { vueSlideoutPanelService as slidePanel } from 'vue2-slideout-panel'

// const panel1Handle = slidePanel.show({
//   component : 'your-component-name',
//   props: {
//     //any data you want passed to your component
//   }
// })

export default {
  layout: 'embed',
  components: {
    'spinner-socket': spinnerSocket
  },
  async asyncData ({ params }) {
    let { type, id } = params
    let mode = 'text/javascript'
    return {
      cmOption: {
        tabSize: 4,
        styleActiveLine: true,
        lineNumbers: true,
        line: true,
        mode: !id ? type || 'text/javascript' : mode,
        lineWrapping: true,
        keyMap: "sublime",
        theme: "material"
      }
    }
  },
  data: () => ({
    code: ''
  }),
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
  },
  created () {
  }
}
</script>

<style>
.embed-fullscreen, .code-terminal, .CodeMirror-wrap, .code-loading {
  width: calc(100vw);
  height: calc(100vh);
}
.code-terminal > .CodeMirror-wrap {
  font-family: 'Consolas', monospace;
  font-size: .78rem;
}
.code-loading {
  background-color: #3a4449;
  color: rgba(233, 237, 237, 1);
  padding: 1px;
}
</style>
