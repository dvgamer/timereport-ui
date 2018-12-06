<template>
  <highcharts :options="options" ref="high" :style="{ minHeight: height }"></highcharts>
</template>

<script>
export default {
  props: [ 'data', 'label', 'height' ],
  data () {
    return {
      options: {
        title: {
          text: 'ZIP Transfer / hours',
          x: -20 //center
        },
        xAxis: {
          minorTickLength: 0,
          tickLength: 0,
          minPadding: 0
        },
        yAxis: {
          title: {
            text: 'ZIP files'
          },
          plotLines: [{
            value: 0,
            width: 1,
            color: '#' + (Math.random() * 0xffffff | 0).toString(16)
          }],
          minPadding: 0
        },
        chart: {
          height: this.height,
          animation: false
        },
        legend: {
          layout: 'vertical',
          align: 'right',
          verticalAlign: 'middle',
          borderWidth: 0
        },
        credits: {
          enabled: false
        },
        series: [{
          showInLegend: false,
          name: 'files',
          data: this.data || [],
          label: this.label || []
        }]
      }
    }
  },
  methods: {
    update () {
      this.$refs.high.chart.credits.update({
        style: {
          color: '#' + (Math.random() * 0xffffff | 0).toString(16)
        }
      })
    }
  }
}
</script>

<style>

</style>
