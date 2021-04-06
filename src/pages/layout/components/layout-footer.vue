<template>
  <div class="layout-footer">
    <div class="footer-content">
      <div class="block-box">
        <p :class="lastBlock==='-'?'':'success'">Latest Block: {{lastBlock}}</p>
        <p :class="gasPrice==='-'?'':'success'">Gas Price: {{gasPrice}} GWEI</p>
      </div>
      <div class="content-btns">
        <div class="left">
          <img class="left-item" @click="windowOpen('https://app.uniswap.org/#/swap')" src="@/assets/images/home/icon_uniswap.png" alt="">
          <img class="left-item" @click="windowOpen('https://1inch.exchange/')" src="@/assets/images/home/icon_1inch.png" alt="">
          <img class="left-item" @click="windowOpen('https://pools.balancer.exchange/#/')" src="@/assets/images/home/icon_balancer.png" alt="">
          <img class="left-item" @click="windowOpen('https://www.coingecko.com')" src="@/assets/images/home/icon_CoinGecko.png" alt="">
        </div>
        <div class="right">
          <div class="links">
            <span class="link-item" @click="windowOpen('https://github.com/kayaland-org/smart-recipe')">{{ $t('layout.layout_footer_contract') }}</span>
            <span class="link-item" @click="windowOpen('https://discord.gg/yGSRDqS')">{{ $t('layout.layout_footer_discord') }}</span>
            <span class="link-item" @click="windowOpen('https://github.com/kayaland-org')">{{ $t('layout.layout_footer_github') }}</span>
          </div>
          <div class="icons">
            <a href="mailto:info@kayaland.org"><img src="../../../assets/images/home/mail.png" alt=""></a>
            <i @click="windowOpen('https://t.me/joinchat/OF-TzBsQOTukkcRDup811A')"><img src="../../../assets/images/home/telegram.png" class="ml20" alt=""></i>
            <i @click="windowOpen('https://twitter.com/kayaland_org')"><img src="../../../assets/images/home/twitter.png" class="ml20" alt=""></i>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import {BigNumber} from 'bignumber.js'
export default {
  name: 'layout-footer',
  props: ['web3Obj'],
  data () {
    return {
      lastBlock: '-',
      gasPrice: '-'
    }
  },
  mounted () {
    this.getLastBlock()
    this.getGasPrice()
  },
  methods: {
    windowOpen (url) {
      window.open(url)
    },
    getLastBlock () {
      this.web3Obj.eth.getBlockNumber().then(block => {
        this.lastBlock = block
      }).catch(err => {
        // console.log(err)
        this.lastBlock = '-'
      })
    },
    getGasPrice () {
      this.web3Obj.eth.getGasPrice().then(price => {
        this.gasPrice = new BigNumber(this.web3Obj.utils.fromWei(price, 'gwei')).integerValue(BigNumber.ROUND_DOWN)
      }).catch(err => {
        // console.log(err)
        this.gasPrice = '-'
      })
    }
  }
}
</script>

<style scoped lang="scss">
.layout-footer{
  width: 1160px;
  padding: 0 20px 0 10px;
  margin: 100px auto 0;
  box-sizing: border-box;
  .footer-content{
    width: 100%;
    padding: 0;
    margin: 0 auto;
    box-sizing: border-box;
    .block-box{
      width: 100%;
      display: block;
      border-bottom: 1px dashed #dddddd;
      padding-bottom: 16px;
      p{
        display: inline-block;
        padding-left: 16px;
        position: relative;
        font-size: 14px;
        font-weight: 400;
        color: #999999;
        line-height: 14px;
        margin: 0;
        margin-right: 32px;
        &:before{
          display: inline-block;
          content: '';
          position: absolute;
          width: 10px;
          height:10px;
          left: 0;
          top: 2px;
          background-color: #EB5654;
          border-radius: 50%;
        }
        &.success{
          &:before{
            background-color: #00B464;
          }
        }
      }
    }
    .content-btns{
      width: 100%;
      padding: 48px 0 40px;
      background-color: #FFFFFF;
      display: flex;
      justify-content: space-between;
      border-radius: 8px;
      box-sizing: border-box;
      .left{
        width: 308px;
        height: 76px;
        box-sizing: border-box;
        padding: 15px 30px;
        display: flex;
        justify-content: space-between;
        border: 1px dashed #DDDDDD;
        border-radius: 8px;

        .left-item{
          height: 100%;
          cursor: pointer;
        }
      }
      .right{
        padding: 0;
        .links{
          .link-item{
            cursor: pointer;
            margin-right: 32px;
            font-size: 16px;
            line-height: 16px;
            color: #222222;
            font-weight: 400;
            &:last-child{
              margin-right: 0;
            }
          }
        }
        .icons{
          margin-top: 30px;
          a:first-child{
            img{
              height: 16px;
            }
          }
          img{
            height: 18px;
            cursor: pointer;
            &.ml20{
              margin-left: 16px;
            }
          }
        }
      }
    }
  }
}
@media screen and (max-width: 1160px) {
  .layout-footer{
    width: 100%;
    margin-top: 60px;
    .footer-content{
      .content-btns{
        flex-wrap: wrap;
        padding-bottom: 20px;
        .left{
          width: 100%;
        }
        .right{
          padding: 20px;
        }
      }
    }
  }
}
</style>
