<template>
  <div>
    <div class="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pb-2 mb-3 border-bottom">
      <h1 class="h2">Inbound Transfer Services</h1>
      <div class="btn-toolbar mb-2 mb-md-0">
        <div class="btn-group mr-2">
          <button class="btn btn-sm btn-outline-secondary">Share</button>
          <button class="btn btn-sm btn-outline-secondary" @click="clickButton">Export</button>
        </div>
      </div>
    </div>
    <div class="row">
      <div class="col-lg-26">
        <chart-upload-minutes :data="minutes.data" ref="chartupload"></chart-upload-minutes>
      </div>
      <div class="col-lg-10">
        <table class="table table-sm">
          <thead>
            <tr>
              <th class="text-center" scope="col">#</th>
              <th scope="col">Sequence</th>
              <th class="text-center" scope="col">Total</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(file, index) in zip" :key="index">
              <th class="text-center" scope="row" v-text="index+1"></th>
              <td v-text="file.sTable"></td>
              <td class="text-center" v-text="file.nTotal"></td>
            </tr>
            <tr v-if="zip.length == 0">
              <th class="text-center" colspan="3"><b>Loading...</b></th>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
    <hr>
    <div class="row">
      <div class="col-md-12">
        <div class="card bg-success p-2 pl-4">
          <div class="counter counter-lg text-left pl-20">
            <span class="counter-number" v-text="total.complete">0</span>
            <div class="counter-label text-uppercase">Completed <small>(current day)</small></div>
          </div>
        </div>
      </div>
      <div class="col-md-12">
        <div class="card bg-warning p-2 pl-4">
          <div class="counter counter-lg text-left pl-20">
            <span class="counter-number" v-text="total.wait">0</span>
            <div class="counter-label text-uppercase">Task Wait <small>(total)</small></div>
          </div>
        </div>
      </div>
      <div class="col-md-12">
        <div class="card bg-danger p-2 pl-4">
          <div class="counter counter-lg text-left pl-20">
            <span class="counter-number" v-text="total.fail">0</span>
            <div class="counter-label text-uppercase">Fail <small>(last 7 day)</small></div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
// import ChartUploadMinutes from '../components/chartjs/upload-minutes'

export default {
  head: {
    title: 'InboundTransfer Service',
  },
  sockets: {
    'inbound-realtime-graph' (data) {
    },
    'inbound-realtime-queue' (data) {
      this.zip = data
    },
    'inbound-realtime-status' (data) {
      this.total.wait = data.wait
      this.total.fail = data.fail
      this.total.complete = data.complete
    }
  },
  asyncData() {
    return new Promise((resolve) => {
      setTimeout(function () {
        resolve({})
      }, 1000)
    })
  },
  // components: { ChartUploadMinutes },
  data () {
    return {
      total: {
        wait: 0,
        fail: 0,
        complete: 0
      },
      zip: [],
      minutes: {
        data: [40, 20, 12, 39, 10, 40, 39, 80, 40, 20, 12, 11],
        label: []
      }
    }
  },
  methods: {
    clickButton () {
      this.$refs.chartupload.update()
    }
  },
  created () {
    // vm.$socket.on('inbound-realtime-queue', data => {
    //   console.log('queue', data)
    // })
    // vm.$socket.on('inbound-realtime-graph', data => {
    //   console.log('graph', data)
    // })
    // vm.$socket.on('inbound-realtime-status', data => {
    //   console.log('status', data)
    // })
  }
}
</script>

<style>
.card {
  color: #FFF;
}
.counter-lg .counter-number-group, .counter-lg>.counter-number {
    font-size: 40px;
}
.counter .counter-number-group, .counter>.counter-number {
    color: #FFF;
}
</style>
