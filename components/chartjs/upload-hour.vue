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
          text: 'XML Transfer Rate',
          x: -20 //center
        },
        xAxis: {
          minorTickLength: 0,
          tickLength: 0,
          minPadding: 0
        },
        yAxis: {
          title: {
            text: 'Total XML files'
          },
          plotLines: [{
            value: 0,
            width: 1,
            color: '#808080'
          }],
          minPadding: 0
        },
        chart: {
          type: 'column',
          height: this.height,
          animation: false
        },
        tooltip: {
          valueSuffix: '°C'
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
