<template>
  <div class="fund-item">
    <div class="item-head">
      <div class="head-left">
        <img :src="require('../../assets/images/fund/'+fund.icon)" alt="" class="fund-icon">
        <div class="text">
          <router-link :to="{path: '/fund/detail/'+fund.address}">
            <span class="name ">{{ fund.symbol ? fund.symbol : '' }}</span>
          </router-link>
          <span class="quote-change " :class="fund.changeDayStatus==='down'?'red':'green'">
                      {{ fund.changeDayStatus === 'down' ? '' : '+' }}{{ fund.changeDay ? fund.changeDay : '' }}% <svg-icon
              icon-class="ascend"
              class-name="icon ascend"></svg-icon>
                      <svg-icon icon-class="descend" class-name="icon descend"></svg-icon>
                    </span>
        </div>
      </div>
      <div class="head-right">
        <img v-for="(token, index_) in fund.tokens" :key="index_" :src="token.icon" alt="">
      </div>
    </div>
    <div class="item-balance-box">
      <p class="balance" @click="unlock"><span class="unlock">{{
          walletLocked ? $t('common.common_unlock') : fund.balance
        }}</span> <span
          class="tag ">{{ fund.symbol ? fund.symbol : '' }}</span></p>
      <span class="balance-convert" v-if="walletLocked">{{
          `&nbsp;`
        }}</span>
      <span class="balance-convert " v-if="!walletLocked">{{
          '$' + `${fund.balanceUsd}`
        }}</span>
    </div>
    <div class="item-btn-box">
      <router-link :to="{path: '/fund/detail/'+fund.address, query: {status: 'buy'}}">
        <div class="btn buy">
          <span class="point"></span>{{ $t('common.common_buy') }}
          <svg-icon icon-class="right" class-name="right"></svg-icon>
        </div>
      </router-link>
      <router-link :to="{path: '/fund/detail/'+fund.address, query: {status: 'redeem'}}">
        <div class="btn">{{ $t('common.common_redeem') }}</div>
      </router-link>
      <div class="btn" :class="fund.tradeUrl===''?'disable':''"
           @click="fund.tradeUrl!==''?windowOpen(fund.tradeUrl):'javascript:;'">{{ $t('common.common_trade') }}
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'funds-dashboard-item',
  props: ['fund', 'walletLocked'],
  methods: {
    unlock () {
      if (this.$props.walletLocked) {
        this.$emit('unlock')
      }
    },
    windowOpen (url) {
      window.open(url)
    }
  }
}
</script>

<style lang="scss" scoped>
.fund-item {
  width: 340px;
  margin-top: 20px;
  background: #FFFFFF;
  border-radius: 8px;
  border: 1px dashed #DDDDDD;
  box-sizing: border-box;
  padding: 20px;
  &:nth-child(3n-1) {
    margin: 20px 14px 0;
  }

  .item-head {
    display: flex;
    justify-content: space-between;

    .head-left {
      display: flex;
      justify-content: start;
      align-items: center;
      height: 32px;

      .fund-icon {
        width: 32px;
        height: 32px;
        border-radius: 50%;
        overflow: hidden;
        margin-right: 4px;
        box-shadow: 0px 2px 4px 0px rgba(0, 0, 0, 0.16);
      }

      .text {
        //margin-top: -6px;
        width: 100px;
        display: grid;

        a {
          line-height: 14px;
          display: inline-block;
          height: 14px;
        }

        .name {
          font-size: 14px;
          line-height: 14px;
          color: #222222;
          font-weight: 500;
          display: inline-block;
          width: 100%;
        }

        .quote-change {
          font-size: 12px;
          line-height: 12px;
          font-weight: 500;
          display: inline-block;
          margin-top: 2px;

          .icon {
            width: 12px;
            height: 12px;
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
      }
    }

    .head-right {
      background-color: #f6f7f9;
      box-sizing: border-box;
      height: 32px;
      padding: 5px;
      position: relative;
      display: block;
      border-radius: 16px;
      text-align: left;

      img {
        width: 22px;
        height: 22px;
        background-color: #FFFFFF;
        border-radius: 50%;
        margin-right: -5px;
        margin-left: -5px;
        display: inline;

        &:first-child {
          margin-left: 5px;
        }

        &:last-child {
          margin-right: 5px;
        }
      }

      .item {
        width: 22px;
        height: 22px;
        border-radius: 50%;
        //position: absolute;
        //top: 5px;
        margin-left: -6px;
        margin-right: -6px;
        display: inline;
        background-color: #FFFFFF;
        margin-top: -5px;
      }
    }
  }

  .item-balance-box {
    margin-top: 20px;

    .balance {
      font-size: 32px;
      line-height: 32px;
      color: #222222;
      font-weight: 600;
      margin: 0;

      .unlock {
        cursor: pointer;
      }

      .tag {
        padding: 5px 8px;
        font-size: 14px;
        line-height: 14px;
        display: inline-block;
        font-weight: 400;
        border-radius: 4px;
        border: 1px solid #222222;
        vertical-align: 6px;
      }
    }

    .balance-convert {
      margin-top: 6px;
      font-size: 14px;
      line-height: 14px;
      font-weight: 400;
    }
  }

  .item-btn-box {
    display: flex;
    justify-content: space-between;
    margin-top: 20px;

    .btn {
      padding: 13px;
      border: 1px solid #DDDDDD;
      border-radius: 8px;
      margin-left: 8px;
      font-weight: 600;
      color: #222222;
      cursor: pointer;

      &.disable {
        opacity: .6;
        cursor: auto;
      }

      &.buy {
        color: #2b878c;
        border-color: #2b878c;
        width: 106px;
        margin-left: 0;

        .point {
          width: 6px;
          height: 6px;
          border-radius: 50%;
          background-color: #2b878c;
          display: inline-block;
          vertical-align: middle;
          margin-right: 4px;
        }

        .right {
          width: 12px;
          height: 12px;
          vertical-align: unset;
          margin-left: 12px;
          margin-top: 4px;
          float: right;
        }
      }
    }
  }
}
@media screen and (max-width: 1160px) {
  .fund-item {
    width: 100%;
    padding: 10px;
    &:nth-child(3n-1) {
      margin: 20px 0 0;
    }
    .item-btn-box {
      .btn {
        &.buy {
          width: auto!important;
        }
      }
    }
  }
}
</style>
