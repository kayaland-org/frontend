<template>
  <div class="performance">
    <p class="performance-title">{{ $t('fundDetail.fundDetail_performanceChart') }}</p>
    <div class="performance-chart" ref="performanceChart"></div>
  </div>
</template>

<script>
import {globalConfig} from '../../utils/global-config'
import {createChart} from 'lightweight-charts'
import parseTime from '../../utils'

export default {
  name: 'fund-performance',
  props: ['fundData'],
  mounted () {
    this.drawPerformanceChart()
  },
  methods: {
    drawPerformanceChart () {
      this.axios.get(`${globalConfig.historyDataBaseUrl}/beast/chart/${this.getTimeZone()}/${this.$props.fundData.address}`).then(res => {
        if (res.status === 200) {
          this.$refs.performanceChart.innerHTML = ''
          let resData = res.data
          const chart = createChart(this.$refs.performanceChart, {
            width: 660,
            height: 300,
            rightPriceScale: {
              scaleMargins: {
                top: 0.3,
                bottom: 0.25
              },
              borderVisible: false
            },
            layout: {
              backgroundColor: '#ffffff',
              textColor: '#dddddd'
            },
            grid: {
              vertLines: {
                color: '#dddddd'
              },
              horzLines: {
                color: '#dddddd'
              }
            },
            localization: {
              locale: 'en-US'
            }
          })
          let areaSeries = chart.addAreaSeries({
            topColor: 'rgba(255,255,255, 0.04)',
            bottomColor: 'rgba(255,255,255, 0.04)',
            lineColor: '#aaaaaa',
            lineWidth: 2
          })
          let volumeSeries = chart.addHistogramSeries({
            color: '#26a69a',
            priceFormat: {
              type: 'volume'
            },
            priceScaleId: '',
            scaleMargins: {
              top: 0.8,
              bottom: 0
            }
          })
          let areaSeriesData = []
          let volumeSeriesData = []
          for (let i = 0; i < resData.length; i++) {
            areaSeriesData.push({time: parseTime(resData[i].ts, '{y}-{m}-{d}'), value: resData[i].price})
            volumeSeriesData.push({
              time: parseTime(resData[i].ts, '{y}-{m}-{d}'),
              value: resData[i].tradeVolume,
              color: resData[i].close >= resData[i].open ? '#00B464' : '#FA4D56'})
          }
          areaSeries.setData(areaSeriesData)
          volumeSeries.setData(volumeSeriesData)
        }
      })
    },
    getTimeZone () {
      let timeZone = (0 - new Date().getTimezoneOffset() / 60)
      return timeZone >= 0 ? `+${timeZone}` : timeZone
    }
  }
}
</script>

<style lang="scss" scoped>
.performance {
  margin-top: 60px;

  .performance-title {
    margin: 0;
    font-size: 16px;
    line-height: 16px;
    font-weight: 600;
    color: #222222;
  }

  .performance-chart {
    margin-top: 30px;
    width: 100%;
  }
}
</style>
