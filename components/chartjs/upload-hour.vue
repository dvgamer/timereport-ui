<template>
  <highcharts ref="high" :options="options" :style="{ minHeight: height }" />
</template>

<script>
const nFormater = (n) => n.value > 900 ? (n.value / 1000).toFixed(n.value % 1000 == 0 ? 0 : 1) + 'k': n.value

export default {
  props: {
    data: {
      type: Object,
      default: () => {}
    },
    label: {
      type: String,
      default: ''
    },
    height: {
      type: String,
      default: ''
    }
  },
  data () {
    return {
      options: {
        chart: {
          height: this.height,
          polar: false,
          width: null,
          inverted: false,
          borderWidth: 0,
          plotBorderWidth: 0
        },
        plotOptions: {
          series: {
            pointPadding: 1,
            groupPadding: 1,
            borderWidth: 0,
            shadow: false,
            animation: true,
            dataLabels: {
              formatter: () => nFormater(this),
              style: {
                color: 'Tahoma',
                fontSize: '9px',
                fontWeight: 'normal',
                textOutline: '0px 0px contrast'
              },
              enabled: false
            }
          }
        },
        title: {
          text: 'ZIP Transfer / hours'
        },
        subtitle: {
          text: ''
        },
        yAxis: [
          {
            labels: { formatter: () => nFormater(this) },
            title: {
              text: 'ZIP files',
              style: `{ 'color:  '#666666' }`
            },
            type: 'linear',
            opposite: false,
            reversed: false
          }
        ],
        xAxis: [
          {
            lables: { formatter: () => nFormater(this) },
            reversed: false,
            opposite: false,
            type: 'category',
            title: {
              text: '7 days age.'
            }
          }
        ],
        colors: [
          '#ffa726'
        ],
        legend: {
          layout: 'horizontal',
          enabled: false,
          y: 0,
          x: 0,
          align: 'center',
          verticalAlign: 'bottom',
          floating: false,
          borderWidth: 0,
          borderRadius: 0
        },
        tooltip: {
          borderWidth: 0,
          borderRadius: 0,
          borderColor: null,
          enabled: true,
          shared: true
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
