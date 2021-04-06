<template>
  <div class="basic-head">
    <div class="head">
      <div class="name">
        <img :src="require('../../assets/images/fund/'+fundData.icon)" alt="" class="icon">
        <div class="title">
          <p class="abbreviation ">{{ fundData.symbol }} <span v-for="(tag, index) in splitType(fundData.type)" class="tag" :key="index">{{ tag }}</span></p><br>
          <p class="fullname ">{{ fundData.fullName }}</p>
        </div>
      </div>
      <div class="head-right">
        <div class="address">
          <span class="addr" @click="toEtherscan(fundData.address,'address')">{{ fundData.address }}</span>
          <span id="copy"
                @click="copyAddress"
                :data-clipboard-text="fundData.address"
                v-tooltip="{
                        content: 'Copied',
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
    <div class="price">
      <p class="price-title">{{ $t('fundDetail.fundDetail_price') }}</p>
      <div class="price-box">
        <span class="eth-price ">{{ fundData.price }}</span>
        <span class="eth-tag">{{ fundData.useCurrency.name }}</span>
        <span class="quote-change " :class="fundData.changeDayStatus==='up'?'green':'red'">{{fundData.changeDayStatus==='up'?'+':''}}{{ fundData.changeDay }}% <svg-icon icon-class="ascend" class-name="icon ascend"></svg-icon>
                      <svg-icon icon-class="descend" class-name="icon descend"></svg-icon></span><br/>
        <span class="usd-price ">${{ fundData.priceUsd }}</span>
      </div>
      <p class="market-cap">
        <span class="cap-title">AUM:</span>
        <span class="cap-num ">${{ fundData.aumUsd }}</span>
      </p>
    </div>
  </div>
</template>

<script>
import Clipboard from 'clipboard'

export default {
  name: 'fund-basic',
  props: ['fundData', 'web3Obj'],
  data () {
    return {
      showCopyTip: false
    }
  },
  mounted () {
    console.log(this.$props.fundData)
  },
  methods: {
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
    addToMetamask () {
      let web3 = this.$props.web3Obj
      try {
        // wasAdded is a boolean. Like any RPC method, an error may be thrown.
        web3.currentProvider.sendAsync({
          method: 'metamask_watchAsset',
          params: {
            'type': 'ERC20',
            'options': {
              'address': this.$props.fundData.address,
              'symbol': this.$props.fundData.symbol,
              'decimals': 18,
              'image': require(`../../assets/images/fund/${this.$props.fundData.icon}`)
            }
          }
        }, console.log)
      } catch (error) {
        console.log(error)
      }
    },
    splitType (type) {
      return type.split(' ')
    }
  }
}
</script>

<style lang="scss" scoped>
.basic-head{
  .head {
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
      width: 380px;
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
        width: 200px;
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

  .price {
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
}

</style>
