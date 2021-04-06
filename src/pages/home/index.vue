<template>
  <div class="home-box">
    <list-box :title="$t('home.home_dashboard_title')" >
      <template slot="content">
        <div class="fund-balance">
          <p class="fund-title">{{ $t('home.home_dashboard_kayaFund') }}</p>
          <div class="fund-box">
            <loading-or-error v-if="fundsData.length === 0" :is-loading="listLoading" :is-error="showErrText" @retry="getFundsName"/>
            <dashboard-item v-for="(item) in fundsData" :fund="item" :key="item.address" :walletLocked="walletLocked" @unlock="unlock"/>
          </div>
        </div>
      </template>
    </list-box>
    <list-box >
      <template slot="content">
        <div class="intro-box">
          <p class="intro">{{ $t('home.home_intro_1') }}</p>
          <p class="intro">{{ $t('home.home_intro_2') }}</p>
        </div>
      </template>
    </list-box>
    <list-box :title="$t('fundList.fundList_title')" :sub-title="$t('fundList.fundList_subtitle')" :more-link="'/fund/list'">
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
    <list-box :title="$t('invite.invite_title')" >
      <template slot="content">
        <invite  :web3Obj="$props.web3Obj" :defaultAccount="$props.defaultAccount" :walletLocked="$props.walletLocked"  @showBindWallet="unlock"/>
      </template>
    </list-box>
    <div class="home"></div>
  </div>
</template>

<script>
import {funds, smartRecipe} from '../../utils/contracts/fund'
import {
  getFundData,
  getExchangheRate,
  updatePaths
} from '../../utils/fund-functions'
import {defaultFundsData} from '../../utils/handle-funds'
import ListBox from '../../components/ListBox'
import LoadingOrError from '../../components/LoadingOrError'
import DashboardItem from '../../components/Funds/funds-dashboard-item'
import FundsListItem from '../../components/Funds/funds-list-item'
import Invite from '../../components/Invite/index'

export default {
  name: 'index',
  props: ['kaya', 'garden', 'walletLocked', 'defaultAccount', 'web3Obj'],
  inject: ['reload'],
  components: {FundsListItem, ListBox, LoadingOrError, DashboardItem, Invite},
  data () {
    return {
      myKaya: 0,
      totalSupply: 0,
      harvest: 0,
      listening: null,
      fundsData: [],
      smartContract: null,
      ethToUsd: 0,
      listLoading: true,
      showErrText: false,
      loadingListen: 0,
      cache: []
    }
  },
  created () {
    this.fundsData = defaultFundsData
  },
  mounted () {
    this.smartContract = new this.$props.web3Obj.eth.Contract(smartRecipe.abi, smartRecipe.address)
    this.getFundsName()
  },
  watch: {
    'walletLocked': function (val, oldVal) {
      if (!val) {
        this.getFundsName()
      } else {
      }
    }
  },
  methods: {
    reloadFun () {
      this.reload()
    },
    unlock () {
      if (this.$props.walletLocked) {
        this.$emit('showBindWallet')
      }
    },
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
        }).catch(console.log)
      }
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
          return
        }
        this.cache.push(value)
      }
      return value
    },
    splitType (type) {
      return type.split(' ')
    }
  },
  beforeDestroy () {
    clearTimeout(this.loadingListen)
  }
}
</script>

<style scoped lang="scss">
.home-box {
  width: 100%;
}

.fund-balance {
  margin-top: 30px;

  .fund-title {
    margin: 0;
    font-size: 16px;
    line-height: 16px;
    color: #222222;
    font-weight: 500;
  }

  .fund-box {
    display: flex;
    justify-content: start;
    flex-wrap: wrap;
  }
}
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

.intro-box{
  width: 100%;
  box-sizing: border-box;
  margin: 0 auto 0;
  .intro {
    font-weight: 400;
    margin: 0 0 20px;
    font-size: 22px;
    line-height: 28px;
    color: #222222;
    text-align: justify;
    &:last-child{
      margin-bottom: 0;
    }
  }
}

.home {
  min-height: 760px;
  width: 100%;
  padding: 80px 44px 0;
  margin: 0 auto;
  box-sizing: border-box;
  background-image: url("../../assets/images/home/pic_bg.png");
  background-repeat: no-repeat;
  background-size: 100% auto;
  background-position-y: bottom;
  background-position-x: 20px;
}

@media screen and (max-width: 1160px) {
  .intro-box {
    width: 100%;
    padding: 0;
    margin-top: 0;
    .intro{
      font-size: 18px;
      line-height: 24px;
      text-align: justify;
    }
  }
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
  .home {
    min-height: 260px;
    width: 100%;
    padding: 80px 22px 0;
    margin: 0 auto;
    background-position-x: 5px;
  }
}
</style>
