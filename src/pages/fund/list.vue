<template>
  <list-box :title="$t('fundList.fundList_title')" :sub-title="$t('fundList.fundList_subtitle')" :titleOutside="true">
    <template slot="content">
      <table class="list-table">
        <thead class="table-head">
          <tr>
            <th style="width: 70px">{{ $t('fundList.fundList_table_head_name') }}</th>
            <th style="width: 190px">{{ $t('fundList.fundList_table_head_aum') }}</th>
            <th style="width: 140px">{{ $t('fundList.fundList_table_head_price') }}</th>
            <th style="width: 220px">{{ $t('fundList.fundList_table_head_income') }}</th>
            <th style="width: 110px">{{ $t('fundList.fundList_table_head_sinceIInception') }}</th>
            <th style="width: 100px">{{ $t('fundList.fundList_table_head_market') }}</th>
          </tr>
        </thead>
        <tbody>
        <template v-if="fundsData.length === 0">
          <tr class="table-item">
            <td colspan="6" class="loading-box">
              <loading-or-error v-if="fundsData.length === 0" :is-loading="listLoading" :is-error="showErrText" @retry="getFundsName"/>
            </td>
          </tr>
        </template>
        <template v-else v-for="(item, index) in fundsData">
          <funds-list-item :key="index" :fund="item"/>
        </template>
        </tbody>
      </table>
    </template>
  </list-box>
</template>

<script>
import {funds, smartRecipe} from '../../utils/contracts/fund'
import {useCurrency, useTradeExact} from '../../utils/trade'
import {getExchangheRate, getFundData, updatePaths} from '../../utils/fund-functions'
import ListBox from '../../components/ListBox'
import FundsListItem from '../../components/Funds/funds-list-item'
import LoadingOrError from '../../components/LoadingOrError'
import {defaultFundsData} from '../../utils/handle-funds'
export default {
  name: 'list',
  data: () => ({
    fundsData: [],
    defaultCount: 1,
    listLoading: true,
    showErrText: false,
    loadingListen: 0,
    cache: []
  }),
  props: ['web3Obj', 'walletLocked', 'defaultAccount'],
  components: {ListBox, FundsListItem, LoadingOrError},
  created () {
    this.fundsData = defaultFundsData
  },
  mounted () {
    this.smartContract = new this.$props.web3Obj.eth.Contract(smartRecipe.abi, smartRecipe.address)
    this.getFundsName()
  },
  methods: {
    async getFundsName () {
      this.listLoading = true
      this.showErrText = false
      this.loadingListen = setTimeout(() => {
        if (this.listLoading) {
          this.listLoading = false
          this.showErrText = true
        }
      }, 30000)
      for (let i = 0; i < this.fundsData.length; i++) {
        this.fundsData[i].contract = new this.$props.web3Obj.eth.Contract(funds[i].abi, funds[i].address)
        this.fundsData[i].useCurrency.exchangeRate = await getExchangheRate(this.fundsData[i].useCurrency.coinGeckoId, 'usd')
        if (!this.$props.walletLocked) {
          this.fundsData[i].defaultAccount = this.$props.defaultAccount
        }
        getFundData(this.fundsData[i], this.$props.web3Obj, this.$props.walletLocked).then(newData => {
          this.$set(this.fundsData[i], 1, Object.assign({}, this.fundsData[i], newData))
          if (!this.fundsData[i].useStorage && this.fundsData[i].type === 'ETF') {
            updatePaths(this.fundsData[i], this.$props.web3Obj)
          }
        })
      }
    },
    async handlePath (funds) {
      if (!(localStorage.getItem('allPathIn') || localStorage.getItem('allPathOut'))) {
        await this.getPath(funds)
      } else {
        for (let i = 0; i < funds.length; i++) {
          funds[i].pathsIn = JSON.parse(localStorage.getItem('allPathIn'))[i]
          funds[i].pathsOut = JSON.parse(localStorage.getItem('allPathOut'))[i]
        }
        this.getPath(funds)
      }
    },
    async getPath (funds) {
      let allPathIn = []
      let allPathOut = []
      let isNewest = true
      for (let i = 0; i < funds.length; i++) {
        let pathsIn = await this.getPathsIn(funds[i].tokens, funds[i].useCurrency)
        let pathsOut = await this.getPathsOut(funds[i].tokens, funds[i].useCurrency)
        funds[i].pathsIn = pathsIn
        allPathIn.push(pathsIn)
        funds[i].pathsOut = pathsOut
        allPathOut.push(pathsOut)
        if (localStorage.getItem('allPathIn') && localStorage.getItem('allPathOut')) {
          if (!(JSON.stringify(pathsIn) === JSON.stringify(JSON.parse(localStorage.getItem('allPathIn'))[i]) && JSON.stringify(pathsOut) === JSON.stringify(JSON.parse(localStorage.getItem('allPathOut'))[i]))) {
            isNewest = false
          }
        } else {
          isNewest = false
        }
      }
      if (!isNewest) {
        localStorage.setItem('allPathIn', JSON.stringify(allPathIn))
        localStorage.setItem('allPathOut', JSON.stringify(allPathOut))
        this.getFundsPrice(funds)
      }
    },
    async getPathsIn (tokens, currency) {
      let currencyA = await useCurrency(currency.name.toLowerCase() === 'eth' ? 'eth' : currency.id, this.$props.web3Obj)
      let TradeExactArr = tokens.map(async (token) => {
        let currencyB = await useCurrency(token.address, this.$props.web3Obj)
        return useTradeExact(currencyA, currencyB, '1', 'in').then(result => result).catch(e => undefined)
      })
      let tradeArr = await Promise.all(TradeExactArr)
      return tradeArr.map((trade, index) => {
        if (trade) {
          let itemPath = trade.route.path.map(token => {
            return token.address
          })
          return itemPath
        } else {
          return [currency.id, currency.id]
        }
      })
    },
    async getPathsOut (tokens, currency) {
      let currencyA = await useCurrency(currency.name.toLowerCase() === 'eth' ? 'eth' : currency.id, this.$props.web3Obj)
      let TradeExactArr = tokens.map(async (token) => {
        let currencyB = await useCurrency(token.address, this.$props.web3Obj)
        return useTradeExact(currencyB, currencyA, '1', 'in').then(result => result).catch(e => undefined)
      })
      let tradeArr = await Promise.all(TradeExactArr)
      return tradeArr.map((trade, index) => {
        if (trade) {
          let itemPath = trade.route.path.map(token => {
            return token.address
          })
          return itemPath
        } else {
          return [currency.id, currency.id]
        }
      })
    },
    catchError (err) {
      this.listLoading = false
      this.showErrText = true
      clearTimeout(this.loadingListen)
      console.error(err)
    },
    getTimeZone () {
      let timeZone = (0 - new Date().getTimezoneOffset() / 60)
      return timeZone >= 0 ? `+${timeZone}` : timeZone
    },
    windowOpen (url) {
      window.open(url)
    },
    stringifyCircularHandler (key, value) {
      if (typeof value === 'object' && value !== null) {
        if (this.cache.indexOf(value) !== -1) {
          // Circular reference found, discard key
          return
        }
        // Store value in our collection
        this.cache.push(value)
      }
      return value
    },
    splitType (type) {
      return type.split(' ')
    }
  }
}
</script>

<style scoped lang="scss">
.list-table{
  .table-head{
    th{
      border-bottom: 1px dashed #dddddd;
      text-align: left;
      padding: 0;
      padding-bottom: 20px;
      font-weight: 500;
      color: #222222;
      font-size: 16px;
      line-height: 16px;
      background-color: #ffffff;
      &:last-child{
        text-align: right;
        width: 300px!important;
      }
    }
  }
}
@media screen and (max-width: 1160px) {
  .list-table{
    table-layout: fixed;
    width: 100%;
    border-collapse: collapse;
    box-sizing: border-box;
    .table-head{
      th{
        border-bottom: 1px dashed #dddddd;
        text-align: left;
        padding: 0;
        padding-bottom: 20px;
        font-weight: 500;
        color: #222222;
        font-size: 16px;
        line-height: 16px;
        background-color: #ffffff;
        &:last-child{
          text-align: right;
          position: sticky;
          width: 100px!important;
          right: 0;
          z-index: 2;
        }
      }
    }
  }
}
</style>
