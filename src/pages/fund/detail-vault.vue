<template>
  <div class="detail">
    <div class="detail-box">
      <div class="detail-main">
        <div class="detail-left">
          <div class="left-head">
            <div class="name">
              <img :src="require('../../assets/images/fund/'+fund.icon)" alt="" class="icon">
              <div class="title">
                <p class="abbreviation ">{{ fundName }} <span v-for="(tag, index) in splitType(fund.type)" class="tag" :key="index">{{ tag }}</span></p><br>
                <p class="fullname ">{{ fundFullName }}</p>
              </div>
            </div>
            <div class="head-right">
              <div class="address">
                <span class="addr" @click="toEtherscan(fund.address,'address')">{{ formatAccount(fund.address) }}</span>
                <span id="copy"
                      @click="copyAddress"
                      :data-clipboard-text="fund.address"
                      v-tooltip="{
                        content: copyTipContent,
                        show: showCopyTip,
                        trigger: 'manual',
                      }">
                 <svg-icon icon-class="icon_copy" class-name="icon"></svg-icon>
              </span>
              </div>
              <div class="metamask" @click="addToMetamask">
                <img src="../../assets/images/fund/metamask.png" alt="">{{ $t('common.common_addToMetamask') }}
              </div>
            </div>
          </div>
          <div class="left-price">
            <p class="price-title">{{ $t('fundDetail.fundDetail_price') }}</p>
            <div class="price-box">
              <span class="eth-price ">{{ fundPrice }}</span>
              <span class="eth-tag">{{ useCurrency.name }}</span>
              <span class="quote-change " v-if="!showMobileBuy" :class="fundChangeStatus==='up'?'green':'red'">{{fundChangeStatus==='up'?'+':''}}{{ fundChange }}% <svg-icon icon-class="ascend" class-name="icon ascend"></svg-icon>
                      <svg-icon icon-class="descend" class-name="icon descend"></svg-icon></span><br/>
              <span class="usd-price ">${{ fundPriceUsd }}</span>
              <span class="quote-change mobile" v-if="showMobileBuy" :class="fundChangeStatus==='up'?'green':'red'">{{fundChangeStatus==='up'?'+':''}}{{ fundChange }}% <svg-icon icon-class="ascend" class-name="icon ascend"></svg-icon>
                      <svg-icon icon-class="descend" class-name="icon descend"></svg-icon></span>
            </div>
            <p class="market-cap">
              <span class="cap-title">AUM:</span>
              <span class="cap-num ">${{ fundAum }}</span>
            </p>
          </div>
          <div class="detail-right" v-if="showMobileBuy">
            <div class="right-head">
              <div class="head-balance">
                <p class="title">{{ $t('fundDetail.fundDetail_balance') }}</p>
                <p class="balance " @click="unlock">{{ walletLocked ? $t('common.common_unlock') : fundBalance }} <span class="tag">{{ fundName }}</span></p>
              </div>
              <div class="trade-btn" :class="fund.tradeUrl===''?'disable':''" @click="fund.tradeUrl!==''?windowOpen(fund.tradeUrl):'javascript:;'">
                <svg-icon v-if="fund.tradeUrl!==''" icon-class="icon_trade" class-name="icon"></svg-icon>
                <svg-icon v-else icon-class="icon_trade_disable" class-name="icon"></svg-icon>
                <br/>
                <span class="text">{{ $t('common.common_trade') }}</span>
              </div>
            </div>
            <div class="fee-box" :class="showFee?'':'disable'">
              <p class="fee-title">
                <span class="head-name">
                  {{ $t('fundDetail.fundDetail_fee_title') }} <span> {{ $t('fundDetail.fundDetail_fee_description') }}</span>
                </span>
              </p>
              <div class="fee-main">
                <p class="fee-item" v-show="buyFee !== 0">
                  <span class="fee-name">{{ $t('common.common_buy') }}:</span>
                  <span class="fee-count ">{{buyFee}}%</span>
                </p>
                <p class="fee-item" v-show="redeemFee !== 0">
                  <span class="fee-name">{{ $t('common.common_redeem') }}:</span>
                  <span class="fee-count ">{{redeemFee}}%</span>
                </p>
                <p class="fee-item" v-show="managementFee !== 0">
                  <span class="fee-name">{{ $t('common.common_management') }}:</span>
                  <span class="fee-count ">{{managementFee}}%</span>
                </p>
                <p class="fee-item" v-show="performanceFee !== 0">
                  <span class="fee-name">{{ $t('common.common_performance') }}:</span>
                  <span class="fee-count ">{{performanceFee}}%</span>
                </p>
              </div>
            </div>
            <div class="trade-tabs">
              <div class="tabs-item" :class="tabActive==='buy'?' active':''" @click="tabActive='buy'">{{ $t('common.common_buy') }}</div>
              <div class="tabs-item" :class="tabActive==='redeem'?' active':''" @click="tabActive='redeem'">{{ $t('common.common_redeem') }}</div>
            </div>
            <div class="buy-tab" v-show="tabActive==='buy'">
              <div class="buy-now" :class="!showGroupBuy?'':'disable'">
                <div class="group-head" @click="showGroupBuy = false">
                  <span class="head-name">{{ $t('fundDetail.fundDetail_buyBox_title') }}</span>
                  <svg-icon icon-class="icon_arrow_normal.png" :class-name="showGroupBuy?'icon rotate':'icon'"></svg-icon>
                </div>
                <div class="count-box">
                  <p class="balance-box">{{ $t("fundDetail.fundDetail_balance") }}: <span @click="buyPrice = fundPayBalanceOriginal">{{ fundPayBalance }}</span></p>
                  <div class="input-box">
                    <div class="input-left ">
                      <input type="text" class="input" v-model="buyPrice" oninput="value=value.replace(/^\D*(\d*(?:\.\d{0,6})?).*$/g, '$1')">
                    </div>
                    <div class="input-right ">{{ useCurrency.name }}</div>
                  </div>
                  <p class="msg">{{ buyMsg }}</p>
                </div>
<!--                <i18n path="fundDetail.fundDetail_approve_msg" tag="p" class="approve-msg" :places="{ coin: useCurrency.name }"-->
<!--                      v-if="showApproveMsg">-->
<!--                  <span place="balance" @click="buyPrice = buyApproveBalance">{{buyApproveBalance}}</span>-->
<!--                  <span place="cancel" @click="buyApprove(0)">{{$t('fundDetail.fundDetail_approve_cancel')}}</span>-->
<!--                </i18n>-->
                <div class="amount-box">
                  <span class="title">{{ $t('common.common_amount') }}</span>
                  <div class="input-box">
                    <div class="input-left ">
                      <span class="count ">{{ buyAmount }}</span>
                    </div>
                    <div class="input-right ">{{ fundName }}</div>
                  </div>
                </div>
                <div class="redeem-box">
                  <div class="buy-box">
                    <div class="buy-btn" v-if="walletLocked" @click="unlock">{{ $t('common.common_unlock') }}</div>
                    <div class="buy-btn" v-if="!walletLocked" @click="handleBuy">{{ $t('common.common_buy') }}
                      <svg t="1603199966600" class="right" viewBox="0 0 1024 1024" version="1.1"
                           xmlns="http://www.w3.org/2000/svg" p-id="1149" width="12" height="12">
                        <path
                            d="M621.254 877.254l320-320c24.994-24.992 24.994-65.516 0-90.51l-320-320c-24.994-24.992-65.516-24.992-90.51
                        0-24.994 24.994-24.994 65.516 0 90.51L741.49 448 128 448c-35.346 0-64 28.654-64 64s28.654 64 64
                        64l613.49 0L530.744 786.746C518.248 799.242 512 815.622 512 832s6.248 32.758 18.744
                        45.254C555.738 902.248 596.26 902.248 621.254 877.254z"
                            p-id="1150" fill="#ffffff"></path>
                      </svg>
                      <svg-icon v-if="buyLoading" icon-class="loading" class-name="sellLoading"></svg-icon>
                    </div>
                    <p v-if="!walletLocked&&buyMinerFee!=='-'" class="miner-fee">{{$t('fundDetail.fundDetail_miner_fee')}}${{buyMinerFee}}</p>
                  </div>
                </div>
              </div>
            </div>
            <div class="redeem-tab" v-show="tabActive==='redeem'">
              <p class="redeem-title">{{ $t('common.common_amount') }}</p>
              <div class="redeem-main">
                <div class="main-left ">
                  <input type="text" class="input" v-model="sellAmount" oninput="value=value.replace(/[^\d.]/g,'')">
                  <p class="percant">
                    <span class="percant-item" :class="scaleBtn===0.25?'active':''" @click="calcSellAmount(0.25)">25%</span>
                    <span class="percant-item" :class="scaleBtn===0.5?'active':''" @click="calcSellAmount(0.5)">50%</span>
                    <span class="percant-item" :class="scaleBtn===0.75?'active':''" @click="calcSellAmount(0.75)">75%</span>
                    <span class="percant-item" :class="scaleBtn===1?'active':''" @click="calcSellAmount(1)">100%</span>
                  </p>
                  <p class="convert ">≈ {{ sellPrice }}</p>
                </div>
                <div class="main-right">
                  <span class="tag ">{{ fundName }}</span>
                  <span class="tag">{{ useCurrency.name }}</span>
                </div>
              </div>
              <div class="redeem-btn" v-if="walletLocked" @click="unlock">{{ $t('common.common_unlock') }}</div>
              <template v-else>
                <div class="redeem-btn" v-if="sellApproveState" @click="redeem">{{ $t('common.common_redeem') }}<svg-icon v-if="sellLoading" icon-class="loading" class-name="sellLoading"></svg-icon></div>
                <div class="redeem-btn" v-else @click="approve">{{ $t('common.common_approve') }}<svg-icon v-if="sellLoading" icon-class="loading" class-name="sellLoading"></svg-icon></div>
                <p v-if="sellApproveState&&sellMinerFee!=='-'" class="miner-fee">{{$t('fundDetail.fundDetail_miner_fee')}}${{sellMinerFee}}</p>
              </template>
            </div>
          </div>
          <fund-about :fundAddress="fund.address"/>
          <div class="left-asset">
            <p class="asset-title">{{ $t('fundDetail.fundDetail_assetAllocation') }}</p>
            <div class="asset-chart">
              <canvas id="pieChart" class="chart-dom"></canvas>
              <div class="table-box">
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
          </div>
          <div class="left-performance">
            <p class="performance-title">{{ $t('fundDetail.fundDetail_performanceChart') }}</p>
            <div class="performance-chart" ref="performanceChart"></div>
          </div>
        </div>
        <div class="detail-right" v-if="!showMobileBuy">
          <div class="right-head">
            <div class="head-balance">
              <p class="title">{{ $t('fundDetail.fundDetail_balance') }}</p>
              <p class="balance " @click="unlock">{{ walletLocked ? $t('common.common_unlock') : fundBalance }} <span class="tag">{{ fundName }}</span></p>
            </div>
            <div class="trade-btn" :class="fund.tradeUrl===''?'disable':''" @click="fund.tradeUrl!==''?windowOpen(fund.tradeUrl):'javascript:;'">
              <svg-icon v-if="fund.tradeUrl!==''" icon-class="icon_trade" class-name="icon"></svg-icon>
              <svg-icon v-else icon-class="icon_trade_disable" class-name="icon"></svg-icon>
              <br/>
              <span class="text">{{ $t('common.common_trade') }}</span>
            </div>
          </div>
          <div class="fee-box" :class="showFee?'':'disable'">
            <p class="fee-title">
              <span class="head-name">{{ $t('fundDetail.fundDetail_fee_title') }} <span> {{ $t('fundDetail.fundDetail_fee_description') }}</span></span>
<!--              <svg-icon icon-class="icon_arrow_normal.png" :class-name="showGroupBuy?'icon rotate':'icon'"></svg-icon>-->
            </p>
            <div class="fee-main">
              <p class="fee-item" v-show="buyFee !== 0">
                <span class="fee-name">{{ $t('common.common_buy') }}:</span>
                <span class="fee-count ">{{buyFee}}%</span>
              </p>
              <p class="fee-item" v-show="redeemFee !== 0">
                <span class="fee-name">{{ $t('common.common_redeem') }}:</span>
                <span class="fee-count ">{{redeemFee}}%</span>
              </p>
              <p class="fee-item" v-show="managementFee !== 0">
                <span class="fee-name">{{ $t('common.common_management') }}:</span>
                <span class="fee-count ">{{managementFee}}%</span>
              </p>
              <p class="fee-item" v-show="performanceFee !== 0">
                <span class="fee-name">{{ $t('common.common_performance') }}:</span>
                <span class="fee-count ">{{performanceFee}}%</span>
              </p>
            </div>
          </div>
          <div class="trade-tabs">
            <div class="tabs-item" :class="tabActive==='buy'?' active':''" @click="tabActive='buy'">{{ $t('common.common_buy') }}</div>
            <div class="tabs-item" :class="tabActive==='redeem'?' active':''" @click="tabActive='redeem'">{{ $t('common.common_redeem') }}</div>
          </div>
          <div class="buy-tab" v-show="tabActive==='buy'">
            <div class="buy-now" :class="!showGroupBuy?'':'disable'">
              <div class="group-head" @click="showGroupBuy = false">
                <span class="head-name">{{ $t('fundDetail.fundDetail_buyBox_title') }}</span>
                <svg-icon icon-class="icon_arrow_normal.png" :class-name="showGroupBuy?'icon rotate':'icon'"></svg-icon>
              </div>
              <div class="count-box">
                <p class="balance-box">{{ $t("fundDetail.fundDetail_balance") }}: <span @click="buyPrice = fundPayBalanceOriginal">{{ fundPayBalance }}</span></p>
                <div class="input-box">
                  <div class="input-left ">
                    <input type="text" class="input" v-model="buyPrice" oninput="value=value.replace(/^\D*(\d*(?:\.\d{0,6})?).*$/g, '$1')">
                  </div>
                  <div class="input-right ">{{ useCurrency.name }}</div>
                </div>
                <p class="msg">{{ buyMsg }}</p>
              </div>
<!--              <i18n path="fundDetail.fundDetail_approve_msg" tag="p" class="approve-msg" :places="{ coin: useCurrency.name }"-->
<!--                    v-if="showApproveMsg">-->
<!--                <span place="balance" @click="buyPrice = buyApproveBalance">{{buyApproveBalance}}</span>-->
<!--                <span place="cancel" @click="buyApprove(0)">{{$t('fundDetail.fundDetail_approve_cancel')}}</span>-->
<!--              </i18n>-->
              <div class="amount-box">
                <span class="title">{{ $t('common.common_amount') }}</span>
                <div class="input-box">
                  <div class="input-left ">
                    <span class="count ">{{ buyAmount }}</span>
                  </div>
                  <div class="input-right ">{{ fundName }}</div>
                </div>
              </div>
              <div class="redeem-box">
                <div class="buy-box">
                  <div class="buy-btn" v-if="walletLocked" @click="unlock">{{ $t('common.common_unlock') }}</div>
                  <div class="buy-btn" v-if="!walletLocked" @click="handleBuy">{{ $t('common.common_buy') }}
                    <svg t="1603199966600" class="right" viewBox="0 0 1024 1024" version="1.1"
                         xmlns="http://www.w3.org/2000/svg" p-id="1149" width="12" height="12">
                      <path
                          d="M621.254 877.254l320-320c24.994-24.992 24.994-65.516 0-90.51l-320-320c-24.994-24.992-65.516-24.992-90.51
                        0-24.994 24.994-24.994 65.516 0 90.51L741.49 448 128 448c-35.346 0-64 28.654-64 64s28.654 64 64
                        64l613.49 0L530.744 786.746C518.248 799.242 512 815.622 512 832s6.248 32.758 18.744
                        45.254C555.738 902.248 596.26 902.248 621.254 877.254z"
                          p-id="1150" fill="#ffffff"></path>
                    </svg>
                    <svg-icon v-if="buyLoading" icon-class="loading" class-name="sellLoading"></svg-icon>
                  </div>
                  <p v-if="!walletLocked&&buyMinerFee!==0" class="miner-fee">{{$t('fundDetail.fundDetail_miner_fee')}}${{buyMinerFee}}</p>
                </div>
              </div>
            </div>
          </div>
          <div class="redeem-tab" v-show="tabActive==='redeem'">
            <p class="redeem-title">{{ $t('common.common_amount') }}</p>
            <div class="redeem-main">
              <div class="main-left ">
                <input type="text" class="input" v-model="sellAmount" oninput="value=value.replace(/[^\d.]/g,'')">
                <p class="percant">
                  <span class="percant-item" :class="scaleBtn===0.25?'active':''" @click="calcSellAmount(0.25)">25%</span>
                  <span class="percant-item" :class="scaleBtn===0.5?'active':''" @click="calcSellAmount(0.5)">50%</span>
                  <span class="percant-item" :class="scaleBtn===0.75?'active':''" @click="calcSellAmount(0.75)">75%</span>
                  <span class="percant-item" :class="scaleBtn===1?'active':''" @click="calcSellAmount(1)">100%</span>
                </p>
                <p class="convert ">≈ {{ sellPrice }}</p>
              </div>
              <div class="main-right">
                <span class="tag ">{{ fundName }}</span>
                <span class="tag">{{ useCurrency.name }}</span>
              </div>
            </div>
            <div class="redeem-btn" v-if="walletLocked" @click="unlock">{{ $t('common.common_unlock') }}</div>
            <template v-else>
              <div class="redeem-btn" v-if="sellApproveState" @click="redeem">{{ $t('common.common_redeem') }}<svg-icon v-if="sellLoading" icon-class="loading" class-name="sellLoading"></svg-icon></div>
              <div class="redeem-btn" v-else @click="approve">{{ $t('common.common_approve') }}<svg-icon v-if="sellLoading" icon-class="loading" class-name="sellLoading"></svg-icon></div>
              <p v-if="sellApproveState&&sellMinerFee!==0" class="miner-fee">{{$t('fundDetail.fundDetail_miner_fee')}}${{sellMinerFee}}</p>
            </template>
          </div>
        </div>
      </div>
    </div>
    <div class="mask" v-if="showTransDialog"></div>
    <div class="trans-dialog" v-if="showTransDialog">
      <div class="dialog-main">
        <div class="dialog-title">{{ dialogData.type }} <span @click="showTransDialog = false"><svg-icon icon-class="icon_close" class-name="close"></svg-icon></span></div>
        <div class="dialog-content">
          <div class="icon-box" :class="dialogData.status==='loading'||dialogData.status==='success'?'green':'gray'">
            <svg-icon v-if="dialogData.status==='loading'" icon-class="loading" class-name="icon"></svg-icon>
            <svg-icon v-if="dialogData.status==='error'" icon-class="icon_error" class-name="icon"></svg-icon>
            <svg-icon v-if="dialogData.status==='success'" icon-class="icon_complete" class-name="icon"></svg-icon>
          </div>
          <p class="text">{{ dialogData.msg }}</p>
        </div>
        <div class="dialog-btns">
          <div class="view-btn disable" v-if="dialogData.transAddr===''"><span>{{ $t('common.common_viewOnEtherscan') }}</span><svg-icon icon-class="icon_open" class-name="icon"></svg-icon></div>
          <div class="view-btn" v-else @click="toEtherscan(dialogData.transAddr,'tx')"><span>{{ $t('common.common_viewOnEtherscan') }}</span><svg-icon icon-class="icon_open" class-name="icon"></svg-icon></div>
          <div class="close-btn" @click="showTransDialog = false">{{ $t('common.common_close') }}</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Chart from 'chart.js'
import Clipboard from 'clipboard'
import {BigNumber} from 'bignumber.js'
import {createChart} from 'lightweight-charts'
import {funds, smartRecipe, tokens as tokenList} from '../../utils/contracts/fund'
import {globalConfig} from '../../utils/global-config'
import parseTime from '../../utils'
import ERC20_ABI from '../../utils/contracts/erc20.json'
import FundAbout from '../../components/FundDetail/fund-about'
import Controller from '../../utils/contracts/controller.json'
import Strategies from '../../utils/contracts/strategies.json'
import {getExchangheRate} from '../../utils/fund-functions'
import vaultTokens from '../../utils/vault-tokens'

export default {
  name: 'detail',
  components: {FundAbout},
  data: () => ({
    fixConfig: 6,
    fund: null,
    fundIndex: null,
    fundContract: null,
    smartContract: null,
    fundName: '',
    fundFullName: '',
    fundAum: '',
    fundOriginalPrice: null,
    fundPrice: null,
    fundPriceUsd: null,
    fundChange: null,
    fundChangeStatus: 'up',
    fundTokens: [],
    fundTokensCopy: [],
    fundBalance: 0,
    fundBalanceOriginal: 0,
    fundCap: 0,
    fundPayBalance: 0,
    fundPayBalanceOriginal: 0,
    buyAmount: 0,
    buyPrice: 0,
    sellAmount: 0,
    sellPrice: 0,
    sellPriceOriginal: 0,
    sellLoading: false,
    buyLoading: false,
    sellApproveState: true,
    buyApproveState: true,
    tabActive: 'buy',
    showGroupBuy: false,
    showFee: true,
    buyFee: 0,
    redeemFee: 0,
    managementFee: 0,
    performanceFee: 0,
    loaded: false,
    chartData: null,
    options: null,
    pieChart: null,
    scaleBtn: 0,
    CoinGeckoClient: null,
    copyTipContent: 'Copied',
    showCopyTip: false,
    buyMsg: '',
    ethToUsd: 0,
    lastTime: 0,
    showTransDialog: false,
    dialogData: {
      type: '',
      status: 'loading',
      transAddr: '',
      msg: ''
    },
    useCurrency: '',
    usePathsIn: null,
    usePathsOut: null,
    showMobileBuy: false,
    buyMinerFee: 0,
    sellMinerFee: 0,
    buyApproveBalance: 0,
    showApproveMsg: false
  }),
  props: ['web3Obj', 'defaultAccount', 'walletLocked'],
  created () {
    this.fund = funds.filter((item) => {
      return item.address === this.$route.params.address
    })[0]
    this.fundIndex = funds.indexOf(this.fund)
    this.tabActive = this.$route.query.status ? this.$route.query.status : 'buy'
    this.fundBalance = new BigNumber(0).toFixed(globalConfig.fixedConfig)
    if (document.body.clientWidth < 1160) {
      this.showMobileBuy = true
    }
    window.addEventListener('resize', () => {
      if (document.body.clientWidth < 1160) {
        this.showMobileBuy = true
      } else {
        this.showMobileBuy = false
      }
    })
  },
  watch: {
    'walletLocked': function (val, oldVal) {
      if (!val) {
        this.initFundData()
      } else {
      }
    },
    'buyPrice': function (val, oldVal) {
      this.checkApproveMsg(val)
      if (this.lastTime === 0) {
        this.lastTime = setTimeout(() => {
          this.checkAmout(val)
        }, 200)
      } else {
        clearTimeout(this.lastTime)
        this.lastTime = setTimeout(() => {
          this.checkAmout(val)
        }, 200)
      }
    },
    'sellAmount': function (val, oldVal) {
      if (this.lastTime === 0) {
        this.lastTime = setTimeout(() => {
          if (new BigNumber(val).comparedTo(new BigNumber(this.fundBalance)) === 1) {
            this.sellAmount = this.fundBalance
          }
          this.calcToWeth(this.sellAmount)
        }, 200)
      } else {
        clearTimeout(this.lastTime)
        this.lastTime = setTimeout(() => {
          if (new BigNumber(val).comparedTo(new BigNumber(this.fundBalance)) === 1) {
            this.sellAmount = this.fundBalance
          }
          this.calcToWeth(this.sellAmount)
        }, 200)
      }
    }
  },
  async mounted () {
    if (this.fund) {
      this.fundContract = new this.$props.web3Obj.eth.Contract(this.fund.abi, this.fund.address)
      this.smartContract = new this.$props.web3Obj.eth.Contract(smartRecipe.abi, smartRecipe.address)
      this.useCurrency = this.fund.useCurrency
      this.initFundData()
    }
    this.sellPrice = new BigNumber(0).toFixed(globalConfig.fixedConfig)
    this.$EventBus.$on('changeLang', () => {
      this.checkAmout(this.buyPrice)
    })
  },
  methods: {
    initFundData () {
      this.getFundName()
      this.getFundFullName()
      this.getTokens()
      this.getBuyFee()
      this.getRedeemFee()
      this.getManagementFee()
      this.getPerformanceFee()
      this.getFundPrice()
      // this.buyApprove(0)
      this.getAum()
      if (!this.$props.walletLocked) {
        this.getfundBalance()
        // this.getSellApproveState()
        this.getBuyApproveState()
        this.getPayBalance()
      } else {
        this.fundBalance = new BigNumber(0).toFixed(globalConfig.fixedConfig)
      }
      this.drawPerformanceChart()
    },
    getPayBalance () {
      if (this.fund.useCurrency.name === 'ETH') {
        this.web3Obj.eth.getBalance(this.defaultAccount).then(res => {
          this.fundPayBalance = new BigNumber(res).dividedBy(10 ** this.useCurrency.decimals).toFixed(globalConfig.fixedConfig)
          this.fundPayBalanceOriginal = new BigNumber(res).dividedBy(10 ** this.useCurrency.decimals)
        })
      } else {
        let contract = new this.web3Obj.eth.Contract(ERC20_ABI, this.useCurrency.id)
        contract.methods.balanceOf(this.defaultAccount).call().then(res => {
          this.fundPayBalance = new BigNumber(res).dividedBy(10 ** this.useCurrency.decimals).toFixed(globalConfig.fixedConfig)
          this.fundPayBalanceOriginal = new BigNumber(res).dividedBy(10 ** this.useCurrency.decimals)
        })
      }
    },
    getFundName () {
      this.fundContract.methods.symbol().call().then(res => {
        this.fundName = res.replace(/\"/g, '')
      })
    },
    getTokens () {
      let tokensData = vaultTokens[this.fund.address]
      this.getTokenPrice(tokensData)
      this.getTokensAsync()
    },
    async getTokensAsync () {
      let controllerAddr = await this.fundContract.methods.getController().call()
      let controllerContract = new this.$props.web3Obj.eth.Contract(Controller, controllerAddr)
      let strategiesAddr = await controllerContract.methods.strategies(this.fund.address).call()
      let strategiesContract = new this.$props.web3Obj.eth.Contract(Strategies, strategiesAddr)
      let tokens = await strategiesContract.methods.getTokens().call()
      let weights = await strategiesContract.methods.getWeights().call()
      let allWeights = 0
      for (let i in weights) {
        allWeights += parseInt(weights[i])
      }
      let tokensData = []
      for (let i = 0; i < tokens.length; i++) {
        let addr = tokens[i].toLowerCase()
        let tokenData = {...{address: addr}, ...tokenList[addr], ...{percentage: allWeights === 0 ? 0 : weights[i] / allWeights * 100}}
        tokensData.push(tokenData)
      }
      this.getTokenPrice(tokensData)
    },
    getTokenPrice (tokens) {
      let ids = ''
      for (let i = 0; i < tokens.length; i++) {
        if (i === 0) {
          ids += tokens[i].id
        } else {
          ids += `,${tokens[i].id}`
        }
      }
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
    async getBuyMinerFee () {
      let ethToUsd = await getExchangheRate('ethereum', 'usd')
      let contract = new this.web3Obj.eth.Contract(ERC20_ABI, this.useCurrency.id)
      contract.methods.allowance(this.$props.defaultAccount, this.fund.address).call().then(async res => {
        let res_ = new BigNumber(res)
        let usdBalance = new BigNumber(this.fundPayBalanceOriginal).times(new BigNumber(10 ** this.useCurrency.decimals))
        let estimateData = res_.comparedTo(usdBalance) === 1 ? usdBalance.toFixed() : res_.toFixed()
        let approveAmount = new BigNumber(2).pow(new BigNumber(256)).minus(1).toFixed()
        let gasPrice = await this.$props.web3Obj.eth.getGasPrice()
        if (res_.comparedTo(0) === 0) {
          let gas = await contract.methods.approve(this.fund.address, approveAmount).estimateGas({from: this.$props.defaultAccount}).then(result => result).catch(console.log)
          this.buyMinerFee = new BigNumber(gas).times(new BigNumber(gasPrice)).dividedBy(1e18).times(new BigNumber(ethToUsd)).toFixed(globalConfig.usdFixedConfig)
        } else {
          this.fundContract.methods.joinPool(estimateData).estimateGas({from: this.$props.defaultAccount}).then(async gas => {
            this.buyMinerFee = new BigNumber(gas).times(new BigNumber(gasPrice)).dividedBy(1e18).times(new BigNumber(ethToUsd)).toFixed(globalConfig.usdFixedConfig)
          }).catch(err => {
            console.log(err)
            this.buyMinerFee = 0
          })
        }
      })
    },
    async getSellMinerFee () {
      let ethToUsd = await getExchangheRate('ethereum', 'usd')
      let sellToken = new BigNumber(this.fundBalanceOriginal).times(new BigNumber(10 ** this.useCurrency.decimals))
      this.fundContract.methods.exitPool(sellToken.toFixed())
        .estimateGas({from: this.$props.defaultAccount}).then(async gas => {
          let gasPrice = await this.$props.web3Obj.eth.getGasPrice()
          this.sellMinerFee = new BigNumber(gas).times(new BigNumber(gasPrice)).dividedBy(1e18).times(new BigNumber(ethToUsd)).toFixed(globalConfig.usdFixedConfig)
        }).catch(err => {
          this.sellMinerFee = 0
        })
    },
    checkAmout (price) {
      if (new BigNumber(price).comparedTo(1) === -1) {
        this.buyMsg = `${this.$t('fundDetail.fundDetail_operationError_1_1', [this.useCurrency.name])}`
      } else if (new BigNumber(price).comparedTo(new BigNumber(this.fundPayBalanceOriginal)) === 1) {
        this.buyMsg = `${this.$t('fundDetail.fundDetail_operationError_3')}`
      } else {
        this.buyMsg = ''
      }
      this.getBuyApproveState()
      this.fundContract.methods.calcTokenToKf(new BigNumber(price).times(new BigNumber(10 ** this.useCurrency.decimals)).toFixed()).call().then(res => {
        this.buyAmount = new BigNumber(res).dividedBy(10 ** this.fund.decimals).times(new BigNumber(1).minus(new BigNumber(this.buyFee).dividedBy(100))).toFixed(globalConfig.fixedConfig)
      })
    },
    getFundFullName () {
      this.fundContract.methods.name().call().then(res => {
        this.fundFullName = res.replace(/\"/g, '')
      })
    },
    getBuyFee () {
      this.fundContract.methods.getFee(0).call().then(res => {
        this.buyFee = new BigNumber(res[0]).dividedBy(new BigNumber(res[1])).times(new BigNumber(100)).toNumber()
      })
    },
    getRedeemFee () {
      this.fundContract.methods.getFee(1).call().then(res => {
        this.redeemFee = new BigNumber(res[0]).dividedBy(new BigNumber(res[1])).times(new BigNumber(100)).toNumber()
      })
    },
    async getManagementFee () {
      this.fundContract.methods.getFee(2).call().then(res => {
        this.managementFee = new BigNumber(res[0]).dividedBy(new BigNumber(res[1])).times(new BigNumber(100)).toNumber()
      })
    },
    async getPerformanceFee () {
      this.fundContract.methods.getFee(3).call().then(res => {
        this.performanceFee = new BigNumber(res[0]).dividedBy(new BigNumber(res[1])).times(new BigNumber(100)).toNumber()
      })
    },
    getFundPrice (amount) {
      let amount_ = amount ? new BigNumber(amount).times(10 ** this.fund.decimals).toFixed() : new BigNumber(10 ** this.fund.decimals).toFixed()
      this.fundContract.methods.calcKfToToken(amount_).call().then(token => {
        if (amount) {
          this.buyPrice = new BigNumber(token).dividedBy(new BigNumber(10 ** this.useCurrency.decimals)).toFixed(globalConfig.fixedConfig)
        } else {
          this.fundOriginalPrice = token
          this.fundPrice = new BigNumber(token).dividedBy(new BigNumber(10 ** this.useCurrency.decimals)).toFixed(globalConfig.fixedConfig)
          this.axios.get(`${globalConfig.coinGeckoBaseUrl}/simple/price`, {params: {ids: this.useCurrency.coinGeckoId, vs_currencies: 'usd'}}).then(data => {
            if (data.status === 200) {
              this.ethToUsd = data.data[this.useCurrency.coinGeckoId].usd
              this.fundPriceUsd = new BigNumber(token).dividedBy(new BigNumber(10 ** this.useCurrency.decimals)).times(new BigNumber(data.data[this.useCurrency.coinGeckoId].usd)).toFixed(globalConfig.usdFixedConfig)
              this.fundChange = new BigNumber(0).toFixed(globalConfig.percentFixedConfig)
              this.fundChangeStatus = 'up'
              this.axios.get(`${globalConfig.historyDataBaseUrl}/beast/initial_price/${this.getTimeZone()}/${this.fund.address}/D1`).then(res => {
                if (res.status === 200 && res.data) {
                  let historyData = new BigNumber(res.data.price).dividedBy(new BigNumber(10 ** res.data.currencyPrecision)).times(new BigNumber(res.data.rate)).toFixed()
                  let nowPrice = new BigNumber(this.fundOriginalPrice).dividedBy(new BigNumber(10 ** this.useCurrency.decimals)).times(new BigNumber(this.ethToUsd)).toFixed()
                  this.fundChange = new BigNumber(nowPrice).minus(historyData).dividedBy(historyData).times(100).toFixed(globalConfig.percentFixedConfig)
                  if (new BigNumber(this.fundChange).comparedTo(0) >= 0) {
                    this.fundChangeStatus = 'up'
                  } else {
                    this.fundChangeStatus = 'down'
                  }
                }
              })
            }
          })
        }
      }).catch(err => {
        this.buyMsg = amount ? this.$t('fundDetail.fundDetail_operationError_4') : ''
        console.log(err)
      })
    },
    getAum () {
      this.fundContract.methods.totalSupply().call().then(total => {
        this.fundContract.methods.calcKfToToken(total).call().then(res => {
          this.axios.get(`${globalConfig.coinGeckoBaseUrl}/simple/price`, {params: {ids: this.useCurrency.coinGeckoId, vs_currencies: 'usd'}}).then(data => {
            if (data.status === 200) {
              this.fundAum = new BigNumber(res).dividedBy(new BigNumber(10 ** this.useCurrency.decimals)).times(new BigNumber(data.data[this.useCurrency.coinGeckoId].usd)).toFixed(globalConfig.usdFixedConfig)
            }
          })
        })
      })
    },
    getfundBalance () {
      this.fundContract.methods.balanceOf(this.$props.defaultAccount).call().then(res => {
        this.fundBalance = new BigNumber(res).dividedBy(new BigNumber(10 ** this.useCurrency.decimals)).toFixed(globalConfig.fixedConfig)
        this.fundBalanceOriginal = new BigNumber(res).dividedBy(new BigNumber(10 ** this.useCurrency.decimals))
        if (!this.$props.walletLocked) {
          this.getBuyMinerFee()
          this.getSellMinerFee()
        }
      })
    },
    calcToWeth (val) {
      if (new BigNumber(val).comparedTo(0) === 0) {
        this.sellPrice = new BigNumber(val).dividedBy(new BigNumber(1e18)).toFixed(globalConfig.fixedConfig)
        this.sellPriceOriginal = new BigNumber(val)
      } else {
        this.fundContract.methods.calcKfToToken(new BigNumber(val).times(new BigNumber(10 ** this.fund.decimals)).toFixed()).call().then(res => {
          this.sellPrice = new BigNumber(res).dividedBy(new BigNumber(10 ** this.useCurrency.decimals)).times(new BigNumber(1).minus(new BigNumber(this.redeemFee).dividedBy(100))).toFixed(globalConfig.fixedConfig)
          this.sellPriceOriginal = new BigNumber(res)
        })
      }
    },
    buyNow () {
      if (!this.buyLoading) {
        this.buyLoading = true
        if (this.buyMsg.length !== 0) return false
        let contract = new this.web3Obj.eth.Contract(ERC20_ABI, this.useCurrency.id)
        contract.methods.allowance(this.$props.defaultAccount, this.fund.address).call().then(res => {
          let res_ = new BigNumber(res)
          let lastApprove = res_.minus(new BigNumber(this.buyPrice).times(10 ** this.useCurrency.decimals))
          if (res_.comparedTo(new BigNumber(0)) === 0 || lastApprove.comparedTo(new BigNumber(0)) === -1) {
            this.buyApproveState = false
            this.buyApprove()
          } else {
            this.buyApproveState = true
            this.fundContract.methods.joinPool(new BigNumber(this.buyPrice).times(new BigNumber(10 ** this.useCurrency.decimals)).toFixed()).estimateGas({from: this.$props.defaultAccount}).then(async gas => {
              this.fundContract.methods.joinPool(new BigNumber(this.buyPrice).times(new BigNumber(10 ** this.useCurrency.decimals)).toFixed())
                .send({from: this.$props.defaultAccount})
                .on('transactionHash', (hash) => {
                  this.dialogData = {
                    type: this.$t('common.common_buy'),
                    status: 'loading',
                    transAddr: hash,
                    msg: this.$t('fundDetail.fundDetail_transaction_status_submit')
                  }
                  this.showTransDialog = true
                })
                .on('confirmation', function (confirmationNumber, receipt) {
                })
                .on('receipt', (receipt) => {
                  console.log(receipt)
                  // receipt example
                  this.dialogData.status = 'success'
                  this.dialogData.msg = this.$t('fundDetail.fundDetail_transaction_status_success')
                  this.buyPrice = 0
                  this.buyAmount = 0
                  this.initFundData()
                  this.buyLoading = false
                  setTimeout(() => {
                    this.buyMsg = ''
                  }, 210)
                })
                .on('error', err => {
                  this.dialogData.status = 'error'
                  this.dialogData.msg = this.$t('fundDetail.fundDetail_transaction_status_error')
                  this.buyLoading = false
                  console.log(err)
                })
            }).catch(error => {
              this.buyMsg = this.$t('fundDetail.fundDetail_operationError_4')
              console.log(error)
            })
          }
        })
      }
    },
    getSellApproveState () {
      if (this.fund.useCurrency.name === 'ETH') {
        this.sellApproveState = true
      } else {
        let contract = new this.web3Obj.eth.Contract(ERC20_ABI, this.useCurrency.id)
        contract.methods.allowance(this.$props.defaultAccount, this.fund.address).call().then(res => {
          let res_ = new BigNumber(res)
          if (res_.comparedTo(new BigNumber(0)) !== 1) {
            this.sellApproveState = false
          } else {
            this.sellApproveState = true
          }
        })
      }
    },
    getBuyApproveState () {
      if (this.fund.useCurrency.name === 'ETH') {
        this.buyApproveState = true
      } else {
        let contract = new this.web3Obj.eth.Contract(ERC20_ABI, this.useCurrency.id)
        contract.methods.allowance(this.$props.defaultAccount, this.fund.address).call().then(res => {
          let res_ = new BigNumber(res)
          this.buyApproveBalance = res_.dividedBy(10 ** this.useCurrency.decimals).toFixed(this.useCurrency.decimals)
          let lastApprove = new BigNumber(this.buyPrice).comparedTo(0) !== -1 ? res_.minus(new BigNumber(this.buyPrice).times(10 ** this.useCurrency.decimals)) : null
          if (res_.comparedTo(new BigNumber(0)) === 1 && (lastApprove && lastApprove.comparedTo(0) !== -1)) {
            this.buyApproveState = true
          } else {
            this.buyApproveState = false
          }
          this.checkApproveMsg(this.buyPrice)
        })
      }
    },
    handleBuy () {
      if (this.buyLoading) return false
      if (new BigNumber(this.buyPrice).comparedTo(1) === -1) {
        this.buyMsg = `${this.$t('fundDetail.fundDetail_operationError_1_1', [this.useCurrency.name])}`
      } else if (new BigNumber(this.buyPrice).comparedTo(new BigNumber(this.fundPayBalanceOriginal)) === 1) {
        this.buyMsg = `${this.$t('fundDetail.fundDetail_operationError_3')}`
      } else {
        this.buyMsg = ''
      }
      if (this.buyMsg !== '') return false
      this.buyLoading = true
      this.getBuyMinerFee()
      let approveContract = new this.web3Obj.eth.Contract(ERC20_ABI, this.useCurrency.id)
      approveContract.methods.allowance(this.$props.defaultAccount, this.fund.address).call().then(async res => {
        let res_ = new BigNumber(res)
        let approveAmount = new BigNumber(2).pow(new BigNumber(256)).minus(1).toFixed()
        this.buyApproveBalance = res_.dividedBy(10 ** this.useCurrency.decimals).toFixed(this.useCurrency.decimals)
        if (res_.dividedBy(10 ** this.useCurrency.decimals).comparedTo(0) === 0) {
          let gas = await approveContract.methods.approve(this.fund.address, approveAmount).estimateGas({from: this.$props.defaultAccount}).then(result => result).catch(console.log)
          let calcGas = new BigNumber(gas).times(new BigNumber(10000).plus(new BigNumber(1000))).div(new BigNumber(10000)).toFixed(0)
          approveContract.methods.approve(this.fund.address, approveAmount).estimateGas({from: this.$props.defaultAccount}).then(async gas => {
            approveContract.methods.approve(this.fund.address, approveAmount)
              .send({from: this.$props.defaultAccount, gas: calcGas})
              .on('receipt', (receipt) => {
                this.toBuy()
              })
              .on('error', err => {
                this.buyLoading = false
                // this.buyError(err)
              })
          }).catch(err => {
            this.buyError(err)
          })
        } else {
          let lastApprove = res_.minus(new BigNumber(this.buyPrice).times(10 ** this.useCurrency.decimals))
          let approveAmount = 0
          if (lastApprove.comparedTo(new BigNumber(0)) === -1) {
            this.buyApproveState = false
            let gas = await approveContract.methods.approve(this.fund.address, approveAmount).estimateGas({from: this.$props.defaultAccount}).then(result => result).catch(console.log)
            let calcGas = new BigNumber(gas).times(new BigNumber(10000).plus(new BigNumber(1000))).div(new BigNumber(10000)).toFixed(0)
            approveContract.methods.approve(this.fund.address, approveAmount).estimateGas({from: this.$props.defaultAccount}).then(async gas => {
              approveContract.methods.approve(this.fund.address, approveAmount)
                .send({from: this.$props.defaultAccount, gas: calcGas})
                .on('receipt', (receipt) => {
                  this.buyLoading = false
                  this.handleBuy()
                })
                .on('error', err => {
                  this.buyLoading = false
                  // this.buyError(err)
                })
            }).catch(err => {
              this.buyError(err)
            })
          } else {
            this.toBuy()
          }
        }
      })
    },
    toBuy () {
      this.getBuyMinerFee()
      this.fundContract.methods.joinPool(new BigNumber(this.buyPrice).times(new BigNumber(10 ** this.useCurrency.decimals)).toFixed())
        .send({from: this.$props.defaultAccount})
        .on('transactionHash', (hash) => {
          this.dialogData = {
            type: this.$t('common.common_buy'),
            status: 'loading',
            transAddr: hash,
            msg: this.$t('fundDetail.fundDetail_transaction_status_submit')
          }
          this.showTransDialog = true
        })
        .on('confirmation', function (confirmationNumber, receipt) {
        })
        .on('receipt', (receipt) => {
          console.log(receipt)
          // receipt example
          this.dialogData.status = 'success'
          this.dialogData.msg = this.$t('fundDetail.fundDetail_transaction_status_success')
          this.buyPrice = 0
          this.buyAmount = 0
          this.initFundData()
          this.buyLoading = false
          this.getBuyMinerFee()
          setTimeout(() => {
            this.buyMsg = ''
          }, 210)
        })
        .on('error', err => {
          this.dialogData.status = 'error'
          this.dialogData.msg = this.$t('fundDetail.fundDetail_transaction_status_error')
          this.buyLoading = false
          console.log(err)
        })
    },
    buyError (err) {
      this.buyLoading = false
      this.buyMsg = this.$t('fundDetail.fundDetail_operationError_4')
      console.log(err)
    },
    checkApproveMsg (val) {
      if (this.$props.walletLocked || new BigNumber(this.buyApproveBalance).comparedTo(0) !== 1) {
        this.showApproveMsg = false
      } else if (new BigNumber(val).comparedTo(new BigNumber(this.buyApproveBalance)) === 1) {
        this.showApproveMsg = true
      } else {
        this.showApproveMsg = false
      }
    },
    buyApprove (num) {
      if (!this.buyLoading) {
        this.buyLoading = true
        let contract = new this.web3Obj.eth.Contract(ERC20_ABI, this.useCurrency.id)
        let approveAmount = num === 0 ? new BigNumber(0).toFixed() : new BigNumber(2).pow(new BigNumber(256)).minus(1).toFixed()
        contract.methods.approve(this.fund.address, approveAmount).estimateGas({from: this.$props.defaultAccount}).then(async gas => {
          let calcGas = new BigNumber(gas).times(new BigNumber(10000).plus(new BigNumber(1000))).div(new BigNumber(10000)).toFixed(0)
          contract.methods.approve(this.fund.address, approveAmount)
            .send({from: this.$props.defaultAccount, gas: calcGas})
            .on('transactionHash', (hash) => {
              this.dialogData = {
                type: this.$t('common.common_approve'),
                status: 'loading',
                transAddr: hash,
                msg: this.$t('fundDetail.fundDetail_transaction_status_submit')
              }
              this.showTransDialog = true
            })
            .on('confirmation', function (confirmationNumber, receipt) {
            })
            .on('receipt', (receipt) => {
              // receipt example
              this.buyApproveState = true
              this.buyLoading = false
              this.dialogData.status = 'success'
              this.dialogData.msg = this.$t('fundDetail.fundDetail_transaction_status_success')
              this.initFundData()
              if (!this.$props.walletLocked) {
                this.getBuyMinerFee()
                this.getSellMinerFee()
                this.getBuyApproveState()
              }
            })
            .on('error', err => {
              this.buyApproveState = false
              this.buyLoading = false
              this.dialogData.status = 'error'
              this.dialogData.msg = this.$t('fundDetail.fundDetail_transaction_status_error')
              console.log(err)
            })
        }).catch(console.log)
      }
    },
    approve () {
      if (!this.sellLoading) {
        this.sellLoading = true
        let contract = new this.web3Obj.eth.Contract(ERC20_ABI, this.useCurrency.id)
        let approveAmount = new BigNumber(2).pow(new BigNumber(256)).minus(1).toFixed()
        contract.methods.approve(this.fund.address, approveAmount).estimateGas({from: this.$props.defaultAccount}).then(async gas => {
          let calcGas = new BigNumber(gas).times(new BigNumber(10000).plus(new BigNumber(1000))).div(new BigNumber(10000)).toFixed(0)
          contract.methods.approve(this.fund.address, approveAmount)
            .send({from: this.$props.defaultAccount, gas: calcGas})
            .on('transactionHash', (hash) => {
              this.dialogData = {
                type: this.$t('common.common_approve'),
                status: 'loading',
                transAddr: hash,
                msg: this.$t('fundDetail.fundDetail_transaction_status_submit')
              }
              this.showTransDialog = true
            })
            .on('confirmation', function (confirmationNumber, receipt) {
            })
            .on('receipt', (receipt) => {
              // receipt example
              this.sellApproveState = true
              this.sellLoading = false
              this.dialogData.status = 'success'
              this.dialogData.msg = this.$t('fundDetail.fundDetail_transaction_status_success')
            })
            .on('error', err => {
              this.sellApproveState = false
              this.sellLoading = false
              this.dialogData.status = 'error'
              this.dialogData.msg = this.$t('fundDetail.fundDetail_transaction_status_error')
              console.log(err)
            })
        })
      }
    },
    calcSellAmount (scale) {
      this.scaleBtn = scale
      this.sellAmount = new BigNumber(this.fundBalance).times(new BigNumber(scale)).toNumber().toFixed(globalConfig.fixedConfig)
    },
    redeem () {
      if (new BigNumber(this.sellAmount).comparedTo(new BigNumber(0)) === 1 && !this.sellLoading) {
        this.sellApproveState = true
        this.sellLoading = true
        let sellToken = this.scaleBtn === 1 ? new BigNumber(this.fundBalanceOriginal).times(new BigNumber(10 ** this.fund.decimals)) : new BigNumber(this.sellAmount).times(new BigNumber(10 ** this.fund.decimals))
        this.fundContract.methods.exitPool(sellToken.toFixed())
          .send({from: this.$props.defaultAccount})
          .on('transactionHash', (hash) => {
            this.showTransDialog = true
            this.dialogData = {
              type: this.$t('common.common_redeem'),
              status: 'loading',
              transAddr: hash,
              msg: this.$t('fundDetail.fundDetail_transaction_status_submit')
            }
          })
          .on('confirmation', function (confirmationNumber, receipt) {
          })
          .on('receipt', (receipt) => {
            // receipt example
            this.sellLoading = false
            this.dialogData.status = 'success'
            this.dialogData.msg = this.$t('fundDetail.fundDetail_transaction_status_success')
            this.scaleBtn = ''
            this.sellAmount = 0
            this.sellPrice = new BigNumber(0).dividedBy(new BigNumber(10 ** this.useCurrency.decimals)).toFixed(globalConfig.fixedConfig)
            this.initFundData()
          })
          .on('error', (err) => {
            this.sellLoading = false
            this.dialogData.status = 'error'
            this.dialogData.msg = this.$t('fundDetail.fundDetail_transaction_status_error')
            this.initFundData()
            console.log(err)
          })
      }
    },
    unlock () {
      if (this.$props.walletLocked) {
        this.$emit('showBindWallet')
      }
    },
    drawPie () {
      if (this.pieChart) {
        this.pieChart.destroy()
        this.pieChart = null
      }
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
    },
    drawPerformanceChart () {
      this.axios.get(`${globalConfig.historyDataBaseUrl}/beast/chart/${this.getTimeZone()}/${this.fund.address}`).then(res => {
        if (res.status === 200) {
          this.$refs.performanceChart.innerHTML = ''
          let chartWidth = window.getComputedStyle(this.$refs.performanceChart).getPropertyValue('width')
          let resData = res.data
          const chart = createChart(this.$refs.performanceChart, {
            width: parseInt(chartWidth),
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
            areaSeriesData.push({time: parseTime(resData[i].ts, '{y}-{m}-{d}'), value: resData[i].close})
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
    },
    copyAddress () {
      let clipboard = new Clipboard('#copy')
      clipboard.on('success', e => {
        this.showCopyTip = true
        setTimeout(() => {
          this.showCopyTip = false
        }, 2000)
        clipboard.destroy()
      })
      clipboard.on('error', e => {
        clipboard.destroy()
      })
    },
    toEtherscan (addr, type) {
      let chainId = process.env.NODE_ENV === 'production' ? 1 : 42
      switch (chainId) {
        case 1:
          window.open(`https://etherscan.io/${type}/${addr}`)
          break
        case 42:
          window.open(`https://kovan.etherscan.io/${type}/${addr}`)
          break
      }
    },
    addToMetamask () {
      let web3 = this.$props.web3Obj
      if (this.$props.walletLocked) {
        this.unlock()
        return false
      }
      try {
        // wasAdded is a boolean. Like any RPC method, an error may be thrown.
        web3.currentProvider.sendAsync({
          method: 'metamask_watchAsset',
          params: {
            'type': 'ERC20',
            'options': {
              'address': this.fund.address,
              'symbol': this.fundName,
              'decimals': this.fund.decimals,
              'image': require(`../../assets/images/fund/${this.fund.icon}`)
            }
          }
        }, console.log)
      } catch (error) {
        console.log(error)
      }
    },
    formatAccount (account) {
      return `${account.substring(0, 6)}...${account.substring(account.length - 4)}`
    },
    windowOpen (url) {
      window.open(url)
    },
    splitType (type) {
      return type.split(' ')
    }
  },
  beforeDestroy () {
    this.$EventBus.$off('changeLang')
    clearInterval(this.handleListen)
  }
}
</script>

<style scoped lang="scss">
.detail {
  width: 100%;
  padding: 0;
  margin: 0 auto;
  box-sizing: border-box;
  >>>.miner-fee{
    margin: 8px 0 0;
    font-size: 14px;
    line-height: 22px;
    color: #888888;
  }
  >>>.approve-msg{
    font-size: 14px;
    color: #666666;
    line-height: 22px;
    margin: 4px 0;
    span{
      color: #2B878C;
      text-decoration: underline;
      cursor: pointer;
    }
  }

  &-box {
    width: 100%;
    box-sizing: border-box;
    padding: 14px;
    border-radius: 20px;
    background-color: #f6f7f9;
    margin-top: 60px;

    .detail-main {
      width: 100%;
      box-sizing: border-box;
      padding: 30px;
      background-color: #ffffff;
      border-radius: 12px;
      display: flex;
      justify-content: space-between;
      align-items: stretch;

      .detail-left {
        width: 730px;
        box-sizing: border-box;
        padding-right: 30px;
        border-right: 1px dashed #DDDDDD;

        .left-head {
          display: flex;
          justify-content: space-between;
          align-items: baseline;

          .name {
            display: flex;
            justify-content: start;
            align-items: center;
            margin-right: 20px;

            .icon {
              width: 38px;
              height: 38px;
              border-radius: 50%;
              margin-right: 6px;
              vertical-align: bottom;
              //cursor: pointer;
              box-shadow: 0px 2px 4px 0px rgba(0, 0, 0, 0.16);
            }
            p{
              margin: 0;
              display: inline-block;
              &.abbreviation{
                font-size: 16px;
                line-height: 16px;
                font-weight: 500;
                color: #222222;
                .tag{
                  background-color: rgba(43, 135, 140, 0.12);
                  display: inline-block;
                  padding: 2px 4px;
                  color: #2B878C;
                  font-size: 12px;
                  line-height: 12px;
                  font-weight: 500;
                  border-radius: 2px;
                  margin-left: 4px;
                  vertical-align: top;
                }
              }
              &.fullname{
                font-size: 14px;
                line-height: 14px;
                font-weight: 400;
                color: #999999;
              }
            }
          }
          .head-right{
            display: flex;
            justify-content: space-between;
            width: 280px;
            align-items: flex-end;
          }

          .address {
            display: inline-block;
            height: 14px;

            .addr {
              color: #999999;
              font-size: 14px;
              line-height: 14px;
              font-weight: 400;
              margin-right: 10px;
              display: inline-block;
              width: 100px;
              overflow: hidden;
              white-space: nowrap;
              text-overflow: ellipsis;
              cursor: pointer;
            }
            #copy{
              line-height: 14px;
              display: inline-block;
              height: 14px;
              vertical-align: -8px;
            }
            .icon {
              width: 14px;
              height: 14px;
              cursor: pointer;
              vertical-align: 8px;
            }
          }

          .metamask {
            display: inline-block;
            font-size: 12px;
            line-height: 28px;
            color: #222222;
            font-weight: 500;
            cursor: pointer;
            margin-bottom: -6px;

            img {
              width: 28px;
              margin-right: 10px;
              vertical-align: top;
            }
          }
        }

        .left-price {
          margin-top: 30px;

          .price-title {
            margin: 0;
            font-size: 14px;
            line-height: 14px;
            font-weight: 400;
            color: #888888;
          }

          .price-box {
            margin-top: 6px;

            .eth-price {
              font-size: 32px;
              line-height: 32px;
              font-weight: 600;
              color: #222222;
              margin-right: 4px;
            }

            .eth-tag {
              display: inline-block;
              border: 1px solid #222222;
              border-radius: 4px;
              padding: 4px 8px;
              font-size: 14px;
              line-height: 14px;
              color: #222222;
              font-weight: 400;
              margin-right: 20px;
              vertical-align: 6px;
            }

            .quote-change {
              font-size: 16px;
              line-height: 16px;
              font-weight: 500;
              vertical-align: 6px;

              .icon {
                width: 16px;
                height: 16px;
                margin-left: 6px;
                display: none;
              }

              &.red {
                color: #FA4D56;

                .descend {
                  display: inline-block;
                }
              }

              &.green {
                color: #00B464;

                .ascend {
                  display: inline-block;
                }
              }
            }

            .usd-price {
              margin-top: 6px;
              font-size: 14px;
              line-height: 14px;
              font-weight: 400;
              color: #222222;
            }
          }

          .market-cap {
            margin: 20px 0 0;
            font-size: 14px;
            line-height: 14px;

            .cap-title {
              font-weight: 500;
              color: #2B878C;
            }

            .cap-num {
              font-weight: 600;
              color: #222222;
            }
          }
        }

        .left-asset {
          margin-top: 80px;

          .asset-title {
            font-size: 18px;
            line-height: 18px;
            margin: 0;
            font-weight: 600;
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

        .left-performance {
          margin-top: 60px;

          .performance-title {
            margin: 0;
            font-size: 18px;
            line-height: 18px;
            font-weight: 600;
            color: #222222;
          }

          .performance-chart {
            margin-top: 30px;
            width: 100%;
          }
        }
      }

      .detail-right {
        width: 350px;
        box-sizing: border-box;
        padding-left: 30px;

        .right-head {
          width: 100%;
          display: flex;
          justify-content: space-between;

          .head-balance {
            .title {
              font-size: 14px;
              line-height: 14px;
              color: #888888;
              font-weight: 400;
              margin: 0;
            }

            .balance {
              margin: 2px 8px 0 0;
              font-size: 24px;
              font-weight: 600;
              color: #222222;
              cursor: pointer;

              .tag {
                padding: 5px 13px;
                border-radius: 4px;
                border: 1px solid #222222;
                font-size: 14px;
                line-height: 14px;
                vertical-align: 4px;
                display: inline-block;
                box-sizing: border-box;
                margin-left: 4px;
              }
            }
          }

          .trade-btn {
            display: inline-block;
            text-align: center;
            cursor: pointer;
            &.disable{
              color: #999999;
              border-color: #bbbbbb;
              cursor: auto;
              .text {
                color: #999999;
              }
            }

            .icon {
              width: 24px;
              height: 24px;
            }

            .text {
              margin-top: 6px;
              font-size: 14px;
              line-height: 14px;
              color: #2B878C;
            }
          }
        }
        .fee-box{
          padding: 13px 20px;
          border: 1px dashed #dddddd;
          margin-top: 20px;
          border-radius: 8px;
          &.disable {
            height: 40px;
            border: 1px dashed #DDDDDD;
            overflow: hidden;
            padding: 13px 20px;

            .fee-title {
              .head-name {
                color: rgba(34, 34, 34, .6);
              }

              .icon {
                transform: rotate(0);
                -webkit-transform: rotate(0);
                -moz-transform: rotate(0);
                -o-transform: rotate(0);
                -ms-transform: rotate(0);
                opacity: .6;
              }
            }
          }
          .fee-title{
            display: flex;
            justify-content: space-between;
            cursor: pointer;
            margin-top: 0;
            margin-bottom: 20px;

            .head-name {
              font-size: 14px;
              line-height: 14px;
              color: #222222;
              font-weight: 600;
              span{
                font-size: 12px;
                color: #666666;
              }
            }

            .icon {
              width: 8px;
              height: 8px;
              margin-top: 4px;
              opacity: 1;
              transform: rotate(180deg);
              -webkit-transform: rotate(180deg);
              -moz-transform: rotate(180deg);
              -o-transform: rotate(180deg);
              -ms-transform: rotate(180deg);
            }
          }
          .fee-main{
            .fee-item{
              display: flex;
              justify-content: space-between;
              font-size: 14px;
              line-height: 14px;
              margin-bottom: 8px;
              &:last-child{
                margin-bottom: 0;
              }
              .fee-name{
                color: #888888;
              }
              .fee-count{
                color: #222222;
              }
            }
          }
        }

        .trade-tabs {
          width: 100%;
          display: flex;
          justify-content: space-between;
          margin-top: 30px;

          .tabs-item {
            width: 150px;
            box-sizing: border-box;
            padding-left: 12px;
            font-size: 16px;
            line-height: 16px;
            position: relative;
            color: #bbbbbb;
            padding-bottom: 6px;
            border-bottom: 2px solid #FFFFFF;
            font-weight: 600;
            cursor: pointer;

            &:before {
              content: '';
              display: inline-block;
              background-color: #CCCCCC;
              width: 6px;
              height: 6px;
              position: absolute;
              top: 6px;
              left: 0;
              border-radius: 50%;
            }

            &.active {
              color: #2B878C;
              border-color: #2B878C;

              &:before {
                background-color: #2B878C;
              }
            }
          }
        }

        .group-buy, .buy-now {
          width: 100%;
          background: #FFFFFF;
          border-radius: 8px;
          border: 1px dashed #222222;
          box-sizing: border-box;
          padding: 20px;
          margin-top: 20px;

          &.disable {
            height: 40px;
            border: 1px dashed #DDDDDD;
            overflow: hidden;
            padding: 13px 20px;

            .group-head {
              .head-name {
                color: rgba(34, 34, 34, .6);
              }

              .icon {
                transform: rotate(0);
                -webkit-transform: rotate(0);
                -moz-transform: rotate(0);
                -o-transform: rotate(0);
                -ms-transform: rotate(0);
                opacity: .6;
              }
            }
          }

          .group-head {
            display: flex;
            justify-content: space-between;
            cursor: pointer;

            .head-name {
              font-size: 14px;
              line-height: 14px;
              color: #222222;
              font-weight: 600;
            }

            .icon {
              width: 8px;
              height: 8px;
              margin-top: 4px;
              opacity: 1;
              transform: rotate(180deg);
              -webkit-transform: rotate(180deg);
              -moz-transform: rotate(180deg);
              -o-transform: rotate(180deg);
              -ms-transform: rotate(180deg);
            }
          }

          .count-box {
            margin-top: 30px;
            //display: flex;
            //justify-content: space-between;
            //align-items: flex-end;
            .input-box {
              display: flex;
              justify-content: space-between;
              align-items: center;

              .input-left {
                width: 60%;
                .input {
                  width: 98%;
                  height: 40px;
                  font-size: 22px;
                  line-height: 40px;
                  color: #121212;
                  border-radius: 8px;
                  background-color: #F6F7F9;
                  font-weight: 600;
                  padding-left: 8px;
                  outline-color: invert;
                  outline-style: none;
                  outline-width: 0px;
                  border: none;
                  border-style: none;
                  text-shadow: none;
                  -webkit-appearance: none;
                  -webkit-user-select: text;
                  outline-color: transparent;
                  box-shadow: none;
                }
              }

              .input-right {
                box-sizing: border-box;
                padding: 5px 13px;
                font-size: 14px;
                line-height: 14px;
                color: #222222;
                border: 1px solid #222222;
                border-radius: 4px;
              }

            }
            .msg{
              color: #EB5654;
              margin-top: 0;
              margin-bottom: 0;
              font-size: 14px;
              line-height: 16px;
              height: 22px;
            }

            .count-left {

              .count {
                margin-top: 4px;
                font-size: 22px;
                line-height: 22px;
                color: #222222;
                font-weight: 600;
              }
            }

            .count-right {
              box-sizing: border-box;
              padding: 5px 0;
              font-size: 14px;
              line-height: 14px;
              color: #222222;
              text-align: center;
              border: 1px solid #222222;
              border-radius: 4px;
              width: 44px;
            }
          }

          .balance-box{
            margin: 0 0 8px;
            span{
              cursor: pointer;
            }
          }
          .amount-box {
            width: 100%;
            box-sizing: border-box;
            margin-top: 20px;
            padding-bottom: 20px;
            border-bottom: 1px dashed #eeeeee;

            .title {
              font-size: 12px;
              line-height: 12px;
              color: #222222;
              font-weight: 400;
              display: inline-block;
              width: 100%;
              margin-bottom: 6px;
            }

            .input-box {
              display: flex;
              justify-content: space-between;
              align-items: center;

              .input-left {
                width: 60%;
                .count {
                  margin-top: 4px;
                  font-size: 22px;
                  line-height: 22px;
                  color: #222222;
                  font-weight: 600;
                }
                .input {
                  width: 98%;
                  height: 40px;
                  font-size: 22px;
                  line-height: 40px;
                  color: #121212;
                  border-radius: 8px;
                  background-color: #F6F7F9;
                  font-weight: 600;
                  padding-left: 8px;
                  outline-color: invert;
                  outline-style: none;
                  outline-width: 0px;
                  border: none;
                  border-style: none;
                  text-shadow: none;
                  -webkit-appearance: none;
                  -webkit-user-select: text;
                  outline-color: transparent;
                  box-shadow: none;
                }
              }

              .input-right {
                box-sizing: border-box;
                padding: 5px 13px;
                font-size: 14px;
                line-height: 14px;
                color: #222222;
                border: 1px solid #222222;
                border-radius: 4px;
              }
            }
            .msg{
              color: #EB5654;
              margin-top: 0;
              margin-bottom: 0;
              font-size: 14px;
              line-height: 16px;
              height: 32px;
            }
          }

          .redeem-box {
            margin-top: 30px;

            .top-text {
              .text {
                display: inline-block;
                font-size: 14px;
                line-height: 14px;
                color: #2B878C;
                font-weight: 600;
                position: relative;

                &:last-child {
                  padding-left: 12px;
                  color: #222222;

                  &:after {
                    display: inline-block;
                    position: absolute;
                    content: '/';
                    top: 0;
                    left: 2px;
                    color: #222222;
                    font-size: 10px;
                  }
                }
              }
            }

            .prograss-box {
              width: 100%;
              padding: 5px;
              background-color: #f6f7f9;
              border-radius: 12px;
              box-sizing: border-box;
              margin-top: 12px;

              .prograss-main {
                width: 100%;
                height: 10px;
                background-color: #FFFFFF;
                border-radius: 12px;
                box-shadow: 0px 2px 4px 0px rgba(0, 0, 0, 0.12);
                position: relative;

                span {
                  position: absolute;
                  height: 10px;
                  width: 10%;
                  left: 0;
                  top: 0;
                  background-color: #2B878C;
                  border-radius: 12px;
                }
              }
            }

            .redeem-main {
              margin-top: 14px;
              display: flex;
              justify-content: space-between;

              .main-left {
                .count {
                  font-size: 18px;
                  font-weight: 600;
                  line-height: 20px;
                  color: #222222;
                  margin: 0;

                  span {
                    font-weight: 500;
                  }
                }

                .estimate {
                  font-weight: 400;
                  margin: 2px 0 0;
                  font-size: 12px;
                  line-height: 14px;
                  color: #222222;
                }
              }

              .main-right {
                display: inline-block;
                padding: 13px;
                border: 1px solid #DDDDDD;
                cursor: pointer;
                font-size: 14px;
                line-height: 14px;
                font-weight: 500;
                border-radius: 8px;
              }
            }
          }

          .buy-box {
            margin-top: 40px;

            .buy-desc {
              font-size: 14px;
              line-height: 16px;
              color: #222222;
              font-weight: 300;
            }

            .buy-btn {
              margin-top: 20px;
              width: 100%;
              background-color: #2B878C;
              color: #FFFFFF;
              border-radius: 8px;
              height: 40px;
              text-align: center;
              padding-top: 8px;
              box-sizing: border-box;
              cursor: pointer;

              .right {
                width: 12px;
                margin-left: 12px;
                vertical-align: middle;
              }

              .sellLoading{
                width: 14px;
                height: 14px;
                margin-left: 4px;
              }
              &.disable{
                background-color: #DDDDDD;
                cursor: auto;
              }
            }
          }
        }

        .redeem-tab {
          width: 100%;
          background: #FFFFFF;
          border-radius: 8px;
          border: 1px dashed #222222;
          box-sizing: border-box;
          padding: 20px;
          margin-top: 20px;

          .redeem-title {
            font-weight: 400;
            color: #222222;
            line-height: 14px;
            font-size: 14px;
            margin: 0;
          }

          .redeem-main {
            margin-top: 6px;
            display: flex;
            justify-content: space-between;

            .main-left {
              width: 80%;
              flex: 1 1 auto;

              .input {
                width: 100%;
                height: 40px;
                font-size: 22px;
                line-height: 40px;
                color: #121212;
                border-radius: 8px;
                background-color: #F6F7F9;
                font-weight: 600;
                padding-left: 8px;
                outline-color: invert;
                outline-style: none;
                outline-width: 0px;
                border: none;
                border-style: none;
                text-shadow: none;
                -webkit-appearance: none;
                -webkit-user-select: text;
                outline-color: transparent;
                box-shadow: none;
                box-sizing: border-box;
              }

              .percant {
                margin: 12px 0 0;
                display: flex;
                justify-content: space-between;

                .percant-item {
                  width: 44px;
                  text-align: center;
                  border: 1px solid #DDDDDD;
                  border-radius: 4px;
                  box-sizing: border-box;
                  padding: 5px 0;
                  font-size: 12px;
                  color: #999999;
                  line-height: 12px;
                  cursor: pointer;

                  &.active {
                    border-color: #2B878C;
                    color: #2B878C;
                  }
                }
              }

              .convert {
                margin: 20px 0 0;
                font-size: 24px;
                line-height: 24px;
                color: #222222;
                font-weight: 600;
              }
            }

            .main-right {
              text-align: right;

              .tag {
                height: 24px;
                text-align: center;
                border-radius: 4px;
                border: 1px solid #222222;
                margin: 0;
                display: inline-block;
                box-sizing: border-box;
                margin-top: 8px;
                padding: 5px 8px;
                font-size: 14px;
                line-height: 14px;

                &:last-child {
                  margin-top: 70px;
                }
              }
            }
          }

          .redeem-btn {
            margin-top: 40px;
            width: 100%;
            background-color: #2B878C;
            color: #FFFFFF;
            border-radius: 8px;
            height: 40px;
            text-align: center;
            padding-top: 8px;
            box-sizing: border-box;
            cursor: pointer;
            .sellLoading{
              width: 14px;
              height: 14px;
            }
          }
        }
      }
    }
  }
  .mask {
    width: 100vw;
    height: 100vh;
    background-color: #FFFFFF;
    opacity: .9;
    position: fixed;
    top: 0;
    left: 0;
    z-index: 998;
  }
  .trans-dialog{
    width: 408px;
    padding: 14px;
    background-color: #F6F7F9;
    position: fixed;
    top: 30vh;
    left: 50%;
    margin-left: -204px;
    z-index: 999;
    border-radius: 20px;
    box-sizing: border-box;
    .dialog-main{
      width: 100%;
      background-color: #ffffff;
      padding: 30px;
      box-sizing: border-box;
      border-radius: 12px;
      .dialog-title{
        position: relative;
        text-align: center;
        font-size: 28px;
        line-height: 28px;
        font-weight: 600;
        color: #222222;
        .close{
          width: 20px;
          height: 20px;
          position: absolute;
          top: 0;
          right: 0;
          cursor: pointer;
        }
      }
      .dialog-content{
        padding: 80px 0;
        text-align: center;
        .icon-box{
          width: 80px;
          height: 80px;
          border-radius: 50%;
          box-sizing: border-box;
          padding: 27px;
          margin: 0 auto;
          .icon{
            width: 26px;
            height: 26px;
          }
          &.gray{
            background-color: #F6F7F9;
          }
          &.green{
            background-color: #2B878C;
          }
        }
        .text{
          font-size: 18px;
          line-height: 18px;
          text-align: center;
          font-weight: 400;
          color: #999999;
          padding: 0;
          margin: 12px 0 0;
        }
      }
      .dialog-btns{
        width: 100%;
        display: flex;
        justify-content: space-between;
        .view-btn{
          width: 228px;
          height: 40px;
          display: flex;
          justify-content: space-between;
          border-radius: 8px;
          padding: 13px 15px;
          background-color: #2B878C;
          box-sizing: border-box;
          cursor: pointer;
          &.disable{
            opacity: .4;
            cursor: auto;
          }
          span{
            font-size: 14px;
            line-height: 14px;
            color: #ffffff;
            display: inline-block;
            height: 14px;
          }
          .icon{
            width: 12px;
            height: 12px;
          }
        }
        .close-btn{
          width: 80px;
          height: 40px;
          box-sizing: border-box;
          padding: 13px 21px;
          color: #2B878C;
          border: 1px solid #2B878C;
          font-size: 14px;
          line-height: 14px;
          border-radius: 8px;
          cursor: pointer;
        }
      }
    }
  }
}
@media screen and (max-width: 1160px) {
  .detail {
    &-box {
      .detail-main {
        padding: 15px;
        .detail-left {
          width: 100%;
          box-sizing: border-box;
          padding-right: 0;
          border-right: none;

          .left-head {
            flex-wrap: wrap;
            .name {
              width: 100%;
              margin-right: 0;

              .icon {
                width: 38px;
                height: 38px;
                border-radius: 50%;
                margin-right: 6px;
                vertical-align: bottom;
                //cursor: pointer;
                box-shadow: 0px 2px 4px 0px rgba(0, 0, 0, 0.16);
              }
              p{
                margin: 0;
                display: inline-block;
                &.abbreviation{
                  font-size: 16px;
                  line-height: 16px;
                  font-weight: 500;
                  color: #222222;
                  .tag{
                    background-color: rgba(43, 135, 140, 0.12);
                    display: inline-block;
                    padding: 2px 4px;
                    color: #2B878C;
                    font-size: 12px;
                    line-height: 12px;
                    font-weight: 500;
                    border-radius: 2px;
                    margin-left: 4px;
                    vertical-align: top;
                  }
                }
                &.fullname{
                  font-size: 14px;
                  line-height: 14px;
                  font-weight: 400;
                  color: #999999;
                }
              }
            }
            .head-right{
              display: flex;
              justify-content: space-between;
              flex-wrap: wrap;
              align-items: center;
              width: 100%;
            }

            .address {
              display: inline-block;
              height: 14px;
              width: 48%;

              .addr {
                width: 105px;
                margin-top: 10px;
                overflow: auto;
                white-space: nowrap;
                text-overflow: clip;
              }
              #copy{
                line-height: 14px;
                display: inline-block;
                height: 14px;
                vertical-align: -8px;
              }
              .icon {
                width: 14px;
                height: 14px;
                cursor: pointer;
                vertical-align: 8px;
              }
            }

            .metamask {
              display: inline-block;
              font-size: 12px;
              line-height: 28px;
              color: #222222;
              font-weight: 500;
              cursor: pointer;
              margin-bottom: 0;
              margin-top: 20px;

              img {
                width: 28px;
                margin-right: 10px;
                vertical-align: top;
              }
            }
          }

          .left-price {
            margin-top: 30px;

            .price-title {
              margin: 0;
              font-size: 14px;
              line-height: 14px;
              font-weight: 400;
              color: #888888;
            }

            .price-box {
              margin-top: 6px;

              .eth-price {
                font-size: 32px;
                line-height: 32px;
                font-weight: 600;
                color: #222222;
                margin-right: 4px;
              }

              .eth-tag {
                display: inline-block;
                border: 1px solid #222222;
                border-radius: 4px;
                padding: 4px 8px;
                font-size: 14px;
                line-height: 14px;
                color: #222222;
                font-weight: 400;
                margin-right: 20px;
                vertical-align: 6px;
              }

              .quote-change {
                font-size: 16px;
                line-height: 16px;
                font-weight: 500;
                vertical-align: 6px;
                &.mobile{
                  display: inline-block;
                  vertical-align: baseline;
                  margin-left: 12px;
                }

                .icon {
                  width: 16px;
                  height: 16px;
                  margin-left: 6px;
                  display: none;
                }

                &.red {
                  color: #FA4D56;

                  .descend {
                    display: inline-block;
                  }
                }

                &.green {
                  color: #00B464;

                  .ascend {
                    display: inline-block;
                  }
                }
              }

              .usd-price {
                margin-top: 6px;
                font-size: 14px;
                line-height: 14px;
                font-weight: 400;
                color: #222222;
              }
            }

            .market-cap {
              margin: 20px 0 0;
              font-size: 14px;
              line-height: 14px;

              .cap-title {
                font-weight: 500;
                color: #2B878C;
              }

              .cap-num {
                font-weight: 600;
                color: #222222;
              }
            }
          }

          .left-asset {
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
              .table-box{
                width: 100%;
                overflow-x: auto;
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
          }

          .left-performance {
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
        }

        .detail-right {
          width: 100%;
          box-sizing: border-box;
          padding-left: 0;
          margin-top: 30px;

          .right-head {
            width: 100%;
            display: flex;
            justify-content: space-between;

            .head-balance {
              .title {
                font-size: 14px;
                line-height: 14px;
                color: #888888;
                font-weight: 400;
                margin: 0;
              }

              .balance {
                margin: 2px 8px 0 0;
                font-size: 24px;
                font-weight: 600;
                color: #222222;
                cursor: pointer;

                .tag {
                  padding: 5px 13px;
                  border-radius: 4px;
                  border: 1px solid #222222;
                  font-size: 14px;
                  line-height: 14px;
                  vertical-align: 4px;
                  display: inline-block;
                  box-sizing: border-box;
                  margin-left: 4px;
                }
              }
            }

            .trade-btn {
              display: inline-block;
              text-align: center;
              cursor: pointer;
              &.disable{
                color: #999999;
                border-color: #bbbbbb;
                cursor: auto;
                .text {
                  color: #999999;
                }
              }

              .icon {
                width: 24px;
                height: 24px;
              }

              .text {
                margin-top: 6px;
                font-size: 14px;
                line-height: 14px;
                color: #2B878C;
              }
            }
          }
          .fee-box{
            padding: 13px 20px;
            border: 1px dashed #dddddd;
            margin-top: 20px;
            border-radius: 8px;
            &.disable {
              height: 40px;
              border: 1px dashed #DDDDDD;
              overflow: hidden;
              padding: 13px 20px;

              .fee-title {
                .head-name {
                  color: rgba(34, 34, 34, .6);
                }

                .icon {
                  transform: rotate(0);
                  -webkit-transform: rotate(0);
                  -moz-transform: rotate(0);
                  -o-transform: rotate(0);
                  -ms-transform: rotate(0);
                  opacity: .6;
                }
              }
            }
            .fee-title{
              display: flex;
              justify-content: space-between;
              cursor: pointer;
              margin-top: 0;
              margin-bottom: 20px;

              .head-name {
                font-size: 14px;
                line-height: 14px;
                color: #222222;
                font-weight: 600;
                span{
                  font-size: 12px;
                  color: #666666;
                }
              }

              .icon {
                width: 8px;
                height: 8px;
                margin-top: 4px;
                opacity: 1;
                transform: rotate(180deg);
                -webkit-transform: rotate(180deg);
                -moz-transform: rotate(180deg);
                -o-transform: rotate(180deg);
                -ms-transform: rotate(180deg);
              }
            }
            .fee-main{
              .fee-item{
                display: flex;
                justify-content: space-between;
                font-size: 14px;
                line-height: 14px;
                margin-bottom: 8px;
                &:last-child{
                  margin-bottom: 0;
                }
                .fee-name{
                  color: #888888;
                }
                .fee-count{
                  color: #222222;
                }
              }
            }
          }

          .trade-tabs {
            width: 100%;
            display: flex;
            justify-content: space-between;
            margin-top: 30px;

            .tabs-item {
              width: 150px;
              box-sizing: border-box;
              padding-left: 12px;
              font-size: 16px;
              line-height: 16px;
              position: relative;
              color: #bbbbbb;
              padding-bottom: 6px;
              border-bottom: 2px solid #FFFFFF;
              font-weight: 600;
              cursor: pointer;

              &:before {
                content: '';
                display: inline-block;
                background-color: #CCCCCC;
                width: 6px;
                height: 6px;
                position: absolute;
                top: 6px;
                left: 0;
                border-radius: 50%;
              }

              &.active {
                color: #2B878C;
                border-color: #2B878C;

                &:before {
                  background-color: #2B878C;
                }
              }
            }
          }

          .group-buy, .buy-now {
            width: 100%;
            background: #FFFFFF;
            border-radius: 8px;
            border: 1px dashed #222222;
            box-sizing: border-box;
            padding: 20px;
            margin-top: 20px;

            &.disable {
              height: 40px;
              border: 1px dashed #DDDDDD;
              overflow: hidden;
              padding: 13px 20px;

              .group-head {
                .head-name {
                  color: rgba(34, 34, 34, .6);
                }

                .icon {
                  transform: rotate(0);
                  -webkit-transform: rotate(0);
                  -moz-transform: rotate(0);
                  -o-transform: rotate(0);
                  -ms-transform: rotate(0);
                  opacity: .6;
                }
              }
            }

            .group-head {
              display: flex;
              justify-content: space-between;
              cursor: pointer;

              .head-name {
                font-size: 14px;
                line-height: 14px;
                color: #222222;
                font-weight: 600;
              }

              .icon {
                width: 8px;
                height: 8px;
                margin-top: 4px;
                opacity: 1;
                transform: rotate(180deg);
                -webkit-transform: rotate(180deg);
                -moz-transform: rotate(180deg);
                -o-transform: rotate(180deg);
                -ms-transform: rotate(180deg);
              }
            }

            .count-box {
              margin-top: 30px;
              display: flex;
              justify-content: space-between;
              align-items: flex-end;
              flex-wrap: wrap;

              .count-left {

                .count {
                  margin-top: 4px;
                  font-size: 22px;
                  line-height: 22px;
                  color: #222222;
                  font-weight: 600;
                }
              }

              .count-right {
                box-sizing: border-box;
                padding: 5px 0;
                font-size: 14px;
                line-height: 14px;
                color: #222222;
                text-align: center;
                border: 1px solid #222222;
                border-radius: 4px;
                width: 44px;
              }
            }

            .amount-box {
              width: 100%;
              box-sizing: border-box;
              margin-top: 20px;
              padding-bottom: 20px;
              border-bottom: 1px dashed #eeeeee;

              .title {
                font-size: 12px;
                line-height: 12px;
                color: #222222;
                font-weight: 400;
                display: inline-block;
                width: 100%;
                margin-bottom: 6px;
              }

              .input-box {
                display: flex;
                justify-content: space-between;
                align-items: center;

                .input-left {
                  width: 60%;
                  .input {
                    width: 98%;
                    height: 40px;
                    font-size: 22px;
                    line-height: 40px;
                    color: #121212;
                    border-radius: 8px;
                    background-color: #F6F7F9;
                    font-weight: 600;
                    padding-left: 8px;
                    outline-color: invert;
                    outline-style: none;
                    outline-width: 0px;
                    border: none;
                    border-style: none;
                    text-shadow: none;
                    -webkit-appearance: none;
                    -webkit-user-select: text;
                    outline-color: transparent;
                    box-shadow: none;
                  }
                }

                .input-right {
                  box-sizing: border-box;
                  padding: 5px 13px;
                  font-size: 14px;
                  line-height: 14px;
                  color: #222222;
                  border: 1px solid #222222;
                  border-radius: 4px;
                }
              }
              .msg{
                color: #EB5654;
                margin-top: 0;
                margin-bottom: 0;
                font-size: 14px;
                line-height: 16px;
                height: 32px;
              }
            }

            .redeem-box {
              margin-top: 30px;

              .top-text {
                .text {
                  display: inline-block;
                  font-size: 14px;
                  line-height: 14px;
                  color: #2B878C;
                  font-weight: 600;
                  position: relative;

                  &:last-child {
                    padding-left: 12px;
                    color: #222222;

                    &:after {
                      display: inline-block;
                      position: absolute;
                      content: '/';
                      top: 0;
                      left: 2px;
                      color: #222222;
                      font-size: 10px;
                    }
                  }
                }
              }

              .prograss-box {
                width: 100%;
                padding: 5px;
                background-color: #f6f7f9;
                border-radius: 12px;
                box-sizing: border-box;
                margin-top: 12px;

                .prograss-main {
                  width: 100%;
                  height: 10px;
                  background-color: #FFFFFF;
                  border-radius: 12px;
                  box-shadow: 0px 2px 4px 0px rgba(0, 0, 0, 0.12);
                  position: relative;

                  span {
                    position: absolute;
                    height: 10px;
                    width: 10%;
                    left: 0;
                    top: 0;
                    background-color: #2B878C;
                    border-radius: 12px;
                  }
                }
              }

              .redeem-main {
                margin-top: 14px;
                display: flex;
                justify-content: space-between;

                .main-left {
                  .count {
                    font-size: 18px;
                    font-weight: 600;
                    line-height: 20px;
                    color: #222222;
                    margin: 0;

                    span {
                      font-weight: 500;
                    }
                  }

                  .estimate {
                    font-weight: 400;
                    margin: 2px 0 0;
                    font-size: 12px;
                    line-height: 14px;
                    color: #222222;
                  }
                }

                .main-right {
                  display: inline-block;
                  padding: 13px;
                  border: 1px solid #DDDDDD;
                  cursor: pointer;
                  font-size: 14px;
                  line-height: 14px;
                  font-weight: 500;
                  border-radius: 8px;
                }
              }
            }

            .buy-box {
              margin-top: 40px;

              .buy-desc {
                font-size: 14px;
                line-height: 16px;
                color: #222222;
                font-weight: 300;
              }

              .buy-btn {
                margin-top: 20px;
                width: 100%;
                background-color: #2B878C;
                color: #FFFFFF;
                border-radius: 8px;
                height: 40px;
                text-align: center;
                padding-top: 8px;
                box-sizing: border-box;
                cursor: pointer;

                .right {
                  width: 12px;
                  margin-left: 12px;
                  vertical-align: middle;
                }

                .sellLoading{
                  width: 14px;
                  height: 14px;
                  margin-left: 4px;
                }
                &.disable{
                  background-color: #DDDDDD;
                  cursor: auto;
                }
              }
            }
          }

          .redeem-tab {
            width: 100%;
            background: #FFFFFF;
            border-radius: 8px;
            border: 1px dashed #222222;
            box-sizing: border-box;
            padding: 20px;
            margin-top: 20px;

            .redeem-title {
              font-weight: 400;
              color: #222222;
              line-height: 14px;
              font-size: 14px;
              margin: 0;
            }

            .redeem-main {
              margin-top: 6px;
              display: flex;
              justify-content: space-between;

              .main-left {
                width: 80%;
                flex: 1 1 auto;

                .input {
                  width: 100%;
                  height: 40px;
                  font-size: 22px;
                  line-height: 40px;
                  color: #121212;
                  border-radius: 8px;
                  background-color: #F6F7F9;
                  font-weight: 600;
                  padding-left: 8px;
                  outline-color: invert;
                  outline-style: none;
                  outline-width: 0px;
                  border: none;
                  border-style: none;
                  text-shadow: none;
                  -webkit-appearance: none;
                  -webkit-user-select: text;
                  outline-color: transparent;
                  box-shadow: none;
                  box-sizing: border-box;
                }

                .percant {
                  margin: 12px 0 0;
                  display: flex;
                  justify-content: space-between;

                  .percant-item {
                    width: 44px;
                    text-align: center;
                    border: 1px solid #DDDDDD;
                    border-radius: 4px;
                    box-sizing: border-box;
                    padding: 5px 0;
                    font-size: 12px;
                    color: #999999;
                    line-height: 12px;
                    cursor: pointer;

                    &.active {
                      border-color: #2B878C;
                      color: #2B878C;
                    }
                  }
                }

                .convert {
                  margin: 20px 0 0;
                  font-size: 24px;
                  line-height: 24px;
                  color: #222222;
                  font-weight: 600;
                }
              }

              .main-right {
                text-align: right;

                .tag {
                  height: 24px;
                  text-align: center;
                  border-radius: 4px;
                  border: 1px solid #222222;
                  margin: 0;
                  display: inline-block;
                  box-sizing: border-box;
                  margin-top: 8px;
                  padding: 5px 8px;
                  font-size: 14px;
                  line-height: 14px;

                  &:last-child {
                    margin-top: 70px;
                  }
                }
              }
            }

            .redeem-btn {
              margin-top: 40px;
              width: 100%;
              background-color: #2B878C;
              color: #FFFFFF;
              border-radius: 8px;
              height: 40px;
              text-align: center;
              padding-top: 8px;
              box-sizing: border-box;
              cursor: pointer;
              .sellLoading{
                width: 14px;
                height: 14px;
              }
            }
          }
        }
      }
    }
    .mask {
      width: 100vw;
      height: 100vh;
      background-color: #FFFFFF;
      opacity: .9;
      position: fixed;
      top: 0;
      left: 0;
      z-index: 998;
    }
    .trans-dialog{
      width: 90%;
      padding: 14px;
      background-color: #F6F7F9;
      position: fixed;
      top: 20vh;
      left: 5%;
      margin-left: 0;
      z-index: 999;
      border-radius: 20px;
      box-sizing: border-box;
      .dialog-main{
        width: 100%;
        background-color: #ffffff;
        padding: 10px;
        box-sizing: border-box;
        border-radius: 12px;
        .dialog-title{
          position: relative;
          text-align: center;
          font-size: 28px;
          line-height: 28px;
          font-weight: 600;
          color: #222222;
          .close{
            width: 20px;
            height: 20px;
            position: absolute;
            top: 0;
            right: 0;
            cursor: pointer;
          }
        }
        .dialog-content{
          padding: 80px 0;
          text-align: center;
          .icon-box{
            width: 80px;
            height: 80px;
            border-radius: 50%;
            box-sizing: border-box;
            padding: 27px;
            margin: 0 auto;
            .icon{
              width: 26px;
              height: 26px;
            }
            &.gray{
              background-color: #F6F7F9;
            }
            &.green{
              background-color: #2B878C;
            }
          }
          .text{
            font-size: 18px;
            line-height: 18px;
            text-align: center;
            font-weight: 400;
            color: #999999;
            padding: 0;
            margin: 12px 0 0;
          }
        }
        .dialog-btns{
          width: 100%;
          display: flex;
          justify-content: space-between;
          .view-btn{
            max-width: 178px;
            height: 40px;
            display: flex;
            justify-content: space-between;
            border-radius: 8px;
            padding: 13px 15px;
            background-color: #2B878C;
            box-sizing: border-box;
            cursor: pointer;
            &.disable{
              opacity: .4;
              cursor: auto;
            }
            span{
              font-size: 14px;
              line-height: 14px;
              color: #ffffff;
              display: inline-block;
              height: 14px;
            }
            .icon{
              width: 12px;
              height: 12px;
            }
          }
          .close-btn{
            width: 80px;
            height: 40px;
            box-sizing: border-box;
            padding: 13px 21px;
            color: #2B878C;
            border: 1px solid #2B878C;
            font-size: 14px;
            line-height: 14px;
            border-radius: 8px;
            cursor: pointer;
          }
        }
      }
    }
  }
}
</style>
