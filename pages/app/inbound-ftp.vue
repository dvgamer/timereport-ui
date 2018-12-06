<template>
  <div>
    <div class="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pb-2 mb-3 border-bottom">
      <h1 class="h2">InboundFTP Services</h1>
      <div class="btn-toolbar mb-2 mb-md-0">
        <div class="btn-group mr-2">
          <button class="btn btn-sm btn-outline-secondary">Share</button>
          <button class="btn btn-sm btn-outline-secondary" @click="clickButton">Export</button>
        </div>
      </div>
    </div>
    <div class="row">
      <div class="col-md-24">
        <div class="card table-card card-status">
          <div class="card-body">
            <div class="row">
              <div class="col-md-14">
                <i class="fa fa-check-circle text-muted"></i>
                <div class="files-status">COMPLETED <small>(CURRENT DAY)</small></div>
                <div class="files-count"><span v-html="toTextNumber(total.complete)"></span> <small>file(s)</small></div>
              </div>
              <div class="col-md-12">
                <i class="fa fa-clock-o text-muted"></i>
                <div class="files-status">TASK WAIT <small>(TOTAL)</small></div>
                <div class="files-count"><span v-html="toTextNumber(total.wait)"></span> <small>file(s)</small></div>
              </div>
              <div class="col-md-10">
                <i class="fa fa-times-circle text-muted"></i>
                <div class="files-status">FAIL <small>(LAST 7 DAY)</small></div>
                <div class="files-count"><span v-html="toTextNumber(total.fail)"></span> <small>file(s)</small></div>
              </div>
            </div>
          </div>
        </div>
        <hr>
      </div>
      <div class="col-md-12">
        <div class="card card-seq">
          <div class="card-header bg-info">
            <h3 class="card-title"><i class="fa fa-clock-o"></i> Sequence Transfer <small>(WAIT)</small></h3>
          </div>
          <table class="table table-sm card-table">
            <colgroup>
              <col class="text-center"/>
              <col class="text-left"/>
              <col class="text-right"/>
            </colgroup>
            <tbody>
              <tr v-for="(file, index) in zip" :key="index">
                <th class="text-center" scope="row" v-text="index+1"></th>
                <td v-text="file.sTable"></td>
                <th v-if="file.nTotal > 0" class="text-center" :class="file.nTotal < 90 ? 'text-warning' : 'text-danger'" v-text="file.nTotal"></th>
                <th v-else class="text-center text-success"><i class="fa fa-check" aria-hidden="true"></i></th>
              </tr>
              <tr v-if="zip.length == 0">
                <th class="text-center" colspan="3"><b>Loading...</b></th>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
      <!-- <div class="col-lg-26">
        <chart-upload-hour :data="hour.data" ref="chartupload"></chart-upload-hour>
      </div> -->
        <!-- <table class="table table-sm">
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
      </div> -->
    </div>
    <hr>
    <div class="row">
      <div class="col-lg-18">
        <chart-upload-hour :data="hour.data" :label="hour.label" :height="200" ref="chartupload"></chart-upload-hour>
      </div>
      <div class="col-lg-18">
        <chart-upload-hour :data="hour.data" :label="hour.label" :height="200" ref="chartupload"></chart-upload-hour>
      </div>
    </div>
  </div>
</template>

<script>
import ChartUploadHour from '~/components/chartjs/upload-hour'

let graphData = (array = []) => {
  let data = []
  let label = []
  let hNext = -1
  for (let i = array.length -1; i >= 0; i--) {
    let { sHour, aa } = array[i]
    let hour = parseInt(sHour)

    hNext = hour
    label.push(hour)
    data.push(aa)

    if (hNext > 0) {
      for (let l = hour + 1; l <= hNext; l++) {
        label.push(hour)
        data.push(0)
      }
    }
  }
  return { data, label }
}

export default {
  head: {
    title: 'InboundFTP Service',
  },
  sockets: {
    'app-inbound-transfer|panel-graph-hour' (data) {
      console.log('app-inbound-transfer|panel-graph-hour', data)
    },
    'app-inbound-transfer|panel-sequence' (data) {
      this.zip = data
    },
    'app-inbound-transfer|panel-status' (data) {
      this.total.wait = data.wait
      this.total.fail = data.fail
      this.total.complete = data.complete
    }
  },
  async asyncData({ $api }) {
    let data = await $api.get('app/inbound-transfer')
    return {
      zip: data.sequence,
      total: data.status,
      hour: graphData(data.graph)
    }
  },
  components: { ChartUploadHour },
  data () {
    return {
      total: {
        wait: 0,
        fail: 0,
        complete: 0
      },
      zip: [
        { sTable: 'SaleT1CAccum', nTotal: 0 },
        { sTable: 'ActualSale', nTotal: 0 },
        { sTable: 'T1CSaleMember', nTotal: 0 },
        { sTable: 'Daily', nTotal: 0 },
        { sTable: 'FullInvoice', nTotal: 0 },
        { sTable: 'StaffPurchase', nTotal: 0 },
        { sTable: 'Number', nTotal: 0 },
        { sTable: 'Time', nTotal: 0 },
        { sTable: 'Others', nTotal: 0 }
      ],
      hour: {
        data: [],
        label: []
      }
    }
  },
  methods: {
    toTextNumber (val) {
      return val >= 900 ? (val / 1000).toFixed(1) + 'k' : val
    },
    clickButton () {
      this.$refs.chartupload.update()
    }
  }
}
</script>

<style lang="scss">
.card-status {
  .card-body {
    padding: 0 1.25rem;
    i.fa {
      margin-top: 7px;
      font-size: 2.2rem;
      position: absolute;
    }
  }
  .row > div {
    padding: 1em 1.2em;
  }
  div.files-count {
    font-size: 1.5rem;
    padding-left: 2.4rem;
    margin: 0px;
    
    > small {
      font-size: .8rem;
    }
  }
  div.files-status {
    padding-left: 2.4rem;
    font-weight: bold;
  }
}

.card-seq {
  .card-header h3 {
    margin-bottom: 0px;
    color: #FFF;
  }
  .card-table {
    margin-bottom: 0px;
  }
}
</style>
