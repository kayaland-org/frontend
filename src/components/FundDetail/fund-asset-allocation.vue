<template>
  <div class="asset-box">
    <p class="asset-title">{{ $t('fundDetail.fundDetail_assetAllocation') }}</p>
    <div class="asset-chart">
      <canvas id="pieChart" class="chart-dom"></canvas>
      <table class="chart-table">
        <thead class="table-head">
        <tr>
          <th width="120">{{ $t('fundDetail.fundDetail_table_head_holding') }}</th>
          <th width="140">{{ $t('fundDetail.fundDetail_table_head_price') }}</th>
          <th width="120">{{ $t('fundDetail.fundDetail_table_head_allocation') }}</th>
          <th width="80">{{ $t('fundDetail.fundDetail_table_head_24h') }}</th>
          <th>{{ $t('fundDetail.fundDetail_table_head_change') }}</th>
        </tr>
        </thead>
        <tbody>
        <tr class="table-item" v-for="(item, index) in fundTokens" :key="index">
          <td class="holding " valign="center"><img :src="item.icon" alt="">{{ item.name }}</td>
          <td class="price " valign="center">${{ item.priceUsd }}</td>
          <td class="allocation " valign="center">{{ item.percentage }}%</td>
          <td class="change24h " :class="item.change24h>=0?'green':'red'" valign="center">{{ item.change24hStatus==='up'?'+':'' }}{{ item.change24h }}%</td>
          <td class="change" valign="center">
            <img :src="item.trend" alt="">
          </td>
        </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
import Chart from 'chart.js'
import {BigNumber} from 'bignumber.js'
import {globalConfig} from '../../utils/global-config'

export default {
  name: 'fund-asset-allocation',
  props: ['fundData', 'web3Obj'],
  data () {
    return {
      fundTokens: null
    }
  },
  mounted () {
    this.getTokensPercentage(this.$props.fundData.tokens)
  },
  methods: {
    getTokensPercentage (tokens) {
      let promiseTokenPercentage = []
      for (let i = 0; i < tokens.length; i++) {
        promiseTokenPercentage.push(this.fundData.contract.methods.getTokenWeight(tokens[i].address).call())
      }
      Promise.all(promiseTokenPercentage).then(data => {
        let counts = []
        let sum = 0
        for (let i = 0; i < data.length; i++) {
          let count = new BigNumber(data[i]).dividedBy(new BigNumber(1e18)).toNumber()
          sum += count
          counts.push(count)
        }
        for (let j = 0; j < counts.length; j++) {
          tokens[j].percentage = new BigNumber(counts[j]).dividedBy(new BigNumber(sum)).times(new BigNumber(100)).toNumber()
        }
        this.getTokenPrice(tokens)
      })
    },
    getTokenPrice (tokens) {
      let ids = tokens.map(token => token.id).join(',')
      this.axios.get(`${globalConfig.coinGeckoBaseUrl}/simple/price`, {params: {ids: ids, vs_currencies: 'usd', include_24hr_change: true}}).then(async res => {
        if (res.status === 200) {
          for (let i = 0; i < tokens.length; i++) {
            tokens[i].priceUsd = new BigNumber(1).times(new BigNumber(res.data[tokens[i].id].usd)).toFixed(globalConfig.usdFixedConfig)
            tokens[i].change24h = new BigNumber(1).times(new BigNumber(res.data[tokens[i].id].usd_24h_change)).toFixed(globalConfig.percentFixedConfig)
            tokens[i].change24hStatus = new BigNumber(1).times(new BigNumber(res.data[tokens[i].id].usd_24h_change)).comparedTo(new BigNumber(0)) !== -1 ? 'up' : 'down'
          }
          this.fundTokens = JSON.parse(JSON.stringify(tokens))
          this.drawPie()
        }
      })
    },
    drawPie () {
      let ctx2 = document.getElementById('pieChart')
      let label = []
      let datas = []
      for (let i = 0; i < this.fundTokens.length; i++) {
        label.push(`${this.fundTokens[i].name}-${this.fundTokens[i].percentage}%`)
        datas.push(this.fundTokens[i].percentage)
      }
      this.pieChart = new Chart(ctx2, {
        type: 'doughnut',
        data: {
          datasets: [{
            backgroundColor: ['#5856D6', '#FF9500', '#FF3B30', '#007AFF', '#4CD9CA', '#7ED321', '#C7C7CC', '#424A5F'],
            data: datas
          }],
          labels: label
        },
        options: {
          legend: {
            position: 'left'
          },
          animation: {
            animateRotate: false
          },
          tooltips: {
            callbacks: {
              label: function (tooltipItem, data) {
                let label = data.labels[tooltipItem.index].split('-')[0]
                label += `: ${data.datasets[tooltipItem.datasetIndex].data[tooltipItem.index]}%`
                return label
              }
            }
          }
        }

      })
    }
  }
}
</script>

<style lang="scss" scoped>
.asset-box {
  margin-top: 80px;

  .asset-title {
    font-size: 16px;
    line-height: 16px;
    margin: 0;
  }

  .asset-chart {
    width: 100%;
    margin-top: 30px;

    .chart-dom {
      height: 164px;
    }

    .chart-table {
      margin-top: 30px;
      width: 100%;

      .table-head {
        th {
          border-bottom: 1px dashed #DDDDDD;
          text-align: left;
          padding-bottom: 12px;
          font-weight: 400;
          color: #222222;
          font-size: 14px;
          line-height: 14px;

          &:last-child {
            text-align: right;
          }
        }
      }

      .table-item {
        td {
          padding: 13px 0;
          color: #888888;
          padding-right: 20px;
          font-weight: 400;
          font-size: 14px;
          &.holding{
            img{
              height: 30px;
              vertical-align: middle;
              margin-right: 8px;
            }
          }
          &.change24h{
            &.red {
              color: #FA4D56;
            }

            &.green {
              color: #00B464;
            }
          }

          &:last-child {
            text-align: right;
            padding-right: 0;

            img {
              height: 28px;
            }
          }
        }
      }
    }
  }
}
</style>
