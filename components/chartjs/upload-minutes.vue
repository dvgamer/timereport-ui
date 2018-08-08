<template>
  <highcharts :options="options" ref="high"></highcharts>
</template>

<script>
export default {
  props: [ 'data' ],
  data () {
    return {
      options: {
        title: {
          text: 'Monthly Average Temperature',
          x: -20 //center
        },
        xAxis: {
          categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec' ]
        },
        yAxis: {
          title: {
            text: 'Total XML files'
          },
          plotLines: [{
            value: 0,
            width: 1,
            color: '#808080'
          }]
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
          name: 'Tokyo',
          data: [7.0, 6.9, 9.5, 14.5, 18.2, 21.5, 25.2, 26.5, 23.3, 18.3, 13.9, 9.6]
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
