<template>
  <tr class="table-item">
      <td class="name " valign="top">
        <router-link :to="{path: '/fund/detail/'+fund.address}">{{ fund.symbol }}</router-link>
        <div class="tag-box">
          <span v-for="(tag, index) in splitType(fund.type)" class="tag" :key="index">{{ tag }}</span>
        </div>
      </td>
      <td class="aum" valign="top">
        <div class="aum-main">
          <p class="num ">${{ fund.aumUsd }}</p>
          <div class="symbol" v-if="fund.type !== 'VAULT'">
            <div class="symbol-item" v-for="(token, index_) in fund.tokens" :key="index_">
              <img :src="token.icon" alt="">
            </div>
          </div>
        </div>
      </td>
      <td class="price" valign="top">
        <div class="price-main">
          <p class="count ">{{ fund.price }} <span>{{ fund.useCurrencyName }}</span></p>
          <p class="price-num ">${{ fund.priceUsd }}</p>
        </div>
      </td>
      <td class="income" valign="top">
        <div class="income-main">
          <span class="income-item " :class="fund.changeDayStatus==='down'?'red':'green'">{{fund.changeDayStatus==='down'?'':'+'}}{{ fund.changeDay }}%</span>
          <span class="income-item " :class="fund.changeWeekStatus==='down'?'red':'green'">{{fund.changeWeekStatus==='down'?'':'+'}}{{ fund.changeWeek }}%</span>
          <span class="income-item " :class="fund.changeMonthStatus==='down'?'red':'green'">{{fund.changeMonthStatus==='down'?'':'+'}}{{ fund.changeMonth }}%</span>
        </div>
      </td>
      <td class="inception" valign="top">
        <div class="inception-main " :class="fund.sinceInceptionStatus==='down'?'red':'green'">{{fund.sinceInceptionStatus==='down'?'':'+'}}{{ fund.sinceInception }}%
          <svg-icon icon-class="ascend" class-name="icon ascend"></svg-icon>
          <svg-icon icon-class="descend" class-name="icon descend"></svg-icon></div>
      </td>
      <td class="market" valign="top">
        <div class="market-main">
          <router-link :to="{path: '/fund/detail/'+fund.address, query: {status: 'buy'}}">
            <div class="btn buy">
              <span class="point"></span>{{ $t('common.common_buy') }} <svg-icon icon-class="right" class-name="right"></svg-icon>
            </div>
          </router-link>
          <router-link :to="{path: '/fund/detail/'+fund.address, query: {status: 'redeem'}}">
            <div class="btn">{{ $t('common.common_redeem') }}</div>
          </router-link>
          <div class="btn" :class="fund.tradeUrl===''?'disable':''" @click="fund.tradeUrl!==''?windowOpen(fund.tradeUrl):'javascript:;'">{{ $t('common.common_trade') }}</div>
        </div>
      </td>
    </tr>
</template>

<script>
export default {
  name: 'funds-list-item',
  props: ['fund'],
  methods: {
    windowOpen (url) {
      window.open(url)
    },
    splitType (type) {
      return type.split(' ')
    }
  }
}
</script>

<style lang="scss" scoped>
.table-item{
  &:last-child{
    td{
      border-bottom: none;
    }
  }
  .loading-box{
    text-align: center!important;
    .loading{
      width: 50px;
      line-height: 50px;
    }
    .err-text{
      margin: 50px auto;
      font-size: 16px;
      line-height: 50px;
      color: #FA4D56;
      span{
        cursor: pointer;
        text-decoration: underline;
      }
    }
  }
  td{
    padding: 30px 0;
    border-bottom: 1px dashed #DDDDDD;
    color: #222222;
    padding-right: 2px;
    font-weight: 400;
    background-color: #ffffff;
    &.name{
      font-size: 16px;
      line-height: 16px;
      width: 60px;
      a{
        color: #222222;
        height: 16px;
        display: inline-block;
      }
      .tag-box{
        max-width: 70px;
        .tag{
          background-color: rgba(43, 135, 140, 0.12);
          display: inline-block;
          padding: 2px 4px;
          color: #2B878C;
          font-size: 12px;
          line-height: 12px;
          font-weight: 500;
          border-radius: 2px;
          margin-top: 8px;
          margin-right: 10px;
        }
      }
    }
    &.aum{
      .aum-main{
        .num{
          margin: -4px 0 10px;
        }
        .symbol{
          display: flex;
          justify-content: left;
          width: fit-content;
          border-radius: 16px;
          padding: 5px 4px;
          background-color: #f6f7f9;
          .symbol-item{
            width: 22px;
            height: 22px;
            border-radius: 50%;
            background-color: #ffffff;
            margin-right: 1px;
            img{
              width: 22px;
              height: 22px;
            }
            &:last-child{
              margin-right: 0;
            }
          }
        }
      }
    }
    &.price{
      width: 150px;
      .price-main{
        p{
          margin: 0;
          &.count{
            font-weight: 600;
            font-size: 20px;
            line-height: 20px;
            margin-bottom: 6px;
            span{
              display: inline-block;
              padding: 0 4px;
              border: 1px solid #222222;
              color: #222222;
              font-size: 12px;
              line-height: 14px;
              vertical-align: 3px;
              border-radius: 2px;
              height: 16px;
              box-sizing: border-box;
            }
          }
          &.price-num{
            font-weight: 400;
            font-size: 16px;
            line-height: 20px;
          }
        }
      }
    }
    &.income{
      width: 210px;
      .income-main{
        .income-item{
          font-weight: 400;
          font-size: 14px;
          line-height: 14px;
          position: relative;
          padding-right: 8px;
          display: inline-block;
          vertical-align: super;
          &.red{
            color: #FA4D56;
          }
          &.green{
            color: #00B464;
          }
          &:after{
            content: '/';
            display: inline-block;
            color: rgba(34, 34, 34, .2);
            position: absolute;
            right: 0;
            top: 0;
            font-size: 12px;
          }
          &:last-child{
            padding-right: 0;
            &:after{
              display: none;
            }
          }
        }
      }
    }
    &.inception{
      width: 116px;
      .inception-main{
        margin: 0;
        font-size: 14px;
        line-height: 14px;
        font-weight: 500;
        .icon {
          width: 12px;
          height: 12px;
          margin-left: 6px;
          display: none;
          vertical-align: baseline;
        }
        &.red{
          color: #FA4D56;
          .descend {
            display: inline-block;
          }
        }
        &.green{
          color: #00B464;
          .ascend {
            display: inline-block;
          }
        }
        span{}
      }
    }
    &.market{
      .market-main{
        display: flex;
        justify-content: flex-end;
        flex-wrap: wrap;
        .btn{
          padding: 13px;
          border: 1px solid #DDDDDD;
          border-radius: 8px;
          margin-left: 8px;
          font-weight: 600;
          font-size: 14px;
          line-height: 14px;
          color: #222222;
          cursor: pointer;
          &.disable{
            opacity: 0.6;
            cursor: auto;
          }
          &.buy{
            color: #2b878c;
            border-color: #2b878c;
            min-width: 70px;
            .point{
              width: 6px;
              height: 6px;
              border-radius: 50%;
              background-color: #2b878c;
              display: inline-block;
              vertical-align: middle;
              margin-right: 4px;
            }
            .right{
              width: 12px;
              height: 12px;
              vertical-align: unset;
              margin-left: 12px;
            }
          }
        }
      }
    }
    &:last-child{
      text-align: right;
      padding-right: 0;
    }
  }
}
@media screen and (max-width: 1160px) {
  .table-item{
    td{
      &.name{
        font-size: 16px;
        line-height: 16px;
        width: 60px;
        a{
          color: #222222;
          height: 16px;
          display: inline-block;
        }
        .tag-box{
          max-width: 70px;
          .tag{
            background-color: rgba(43, 135, 140, 0.12);
            display: inline-block;
            padding: 2px 4px;
            color: #2B878C;
            font-size: 12px;
            line-height: 12px;
            font-weight: 500;
            border-radius: 2px;
            margin-top: 8px;
            margin-right: 10px;
          }
        }
      }
      &.aum{
        .aum-main{
          .num{
            margin: -4px 0 10px;
          }
          .symbol{
            display: flex;
            justify-content: left;
            width: fit-content;
            border-radius: 16px;
            padding: 5px 4px;
            background-color: #f6f7f9;
            .symbol-item{
              width: 22px;
              height: 22px;
              border-radius: 50%;
              background-color: #ffffff;
              margin-right: 1px;
              img{
                width: 22px;
                height: 22px;
              }
              &:last-child{
                margin-right: 0;
              }
            }
          }
        }
      }
      &.price{
        width: 150px;
        .price-main{
          p{
            margin: 0;
            &.count{
              font-weight: 600;
              font-size: 20px;
              line-height: 20px;
              margin-bottom: 6px;
              span{
                display: inline-block;
                padding: 0 4px;
                border: 1px solid #222222;
                color: #222222;
                font-size: 12px;
                line-height: 14px;
                vertical-align: 3px;
                border-radius: 2px;
                height: 16px;
                box-sizing: border-box;
              }
            }
            &.price-num{
              font-weight: 400;
              font-size: 16px;
              line-height: 20px;
            }
          }
        }
      }
      &.income{
        width: 210px;
        .income-main{
          .income-item{
            font-weight: 400;
            font-size: 14px;
            line-height: 14px;
            position: relative;
            padding-right: 8px;
            display: inline-block;
            vertical-align: super;
            &.red{
              color: #FA4D56;
            }
            &.green{
              color: #00B464;
            }
            &:after{
              content: '/';
              display: inline-block;
              color: rgba(34, 34, 34, .2);
              position: absolute;
              right: 0;
              top: 0;
              font-size: 12px;
            }
            &:last-child{
              padding-right: 0;
              &:after{
                display: none;
              }
            }
          }
        }
      }
      &.inception{
        width: 116px;
        .inception-main{
          margin: 0;
          font-size: 14px;
          line-height: 14px;
          font-weight: 500;
          .icon {
            width: 12px;
            height: 12px;
            margin-left: 6px;
            display: none;
            vertical-align: baseline;
          }
          &.red{
            color: #FA4D56;
            .descend {
              display: inline-block;
            }
          }
          &.green{
            color: #00B464;
            .ascend {
              display: inline-block;
            }
          }
          span{}
        }
      }
      &.market{
        .market-main{
          display: flex;
          justify-content: flex-end;
          flex-wrap: wrap;
          .btn{
            padding: 13px;
            border: 1px solid #DDDDDD;
            border-radius: 8px;
            font-weight: 600;
            font-size: 14px;
            line-height: 14px;
            color: #222222;
            cursor: pointer;
            margin-bottom: 6px;
            width: 100px;
            box-sizing: border-box;
            margin-left: 0;
            text-align: center;
            &.disable{
              opacity: 0.6;
              cursor: auto;
            }
            &.buy{
              color: #2b878c;
              border-color: #2b878c;
              min-width: 70px;
              text-align: left;
              .point{
                width: 6px;
                height: 6px;
                border-radius: 50%;
                background-color: #2b878c;
                display: inline-block;
                vertical-align: middle;
                margin-right: 4px;
                margin-top: -4px;
              }
              .right{
                width: 12px;
                height: 12px;
                vertical-align: unset;
                margin-left: 12px;
              }
            }
          }
        }
      }
      &:last-child{
        position: sticky;
        right: 0;
        z-index: 2;
      }
    }
  }
}
</style>
