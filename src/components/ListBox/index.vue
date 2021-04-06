<template>
  <div class="list-box">
    <div class="title-outside" v-if="titleOutside&&title">
      <p class="title">{{ title }}</p>
      <p class="sub-title" v-if="subTitle">{{ subTitle }}</p>
    </div>
    <div class="container">
      <div class="container-main">
        <div class="list-head" v-if="!titleOutside&&title">
          <div class="head-left">
            <p class="title">{{ title }}</p>
            <p class="sub-title" v-if="subTitle">{{ subTitle }}</p>
          </div>
          <div class="head-right" v-if="moreLink">
            <router-link :to="{path: moreLink}">
              {{ $t('fundList.fundList_more') }}
            </router-link>
          </div>
        </div>
        <div class="content">
          <slot name="content" class="content"></slot>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'index',
  props: {
    'title': {
      type: String,
      default: undefined
    },
    'subTitle': {
      type: String,
      default: undefined
    },
    'moreLink': {
      type: String,
      default: undefined
    },
    'titleOutside': {
      type: Boolean,
      default: false
    }
  }
}
</script>

<style lang="scss" scoped>
.list-box{
  width: 100%;
  margin: 60px auto 0;
  .title-outside{
    .title{
      font-size: 24px;
      line-height: 24px;
      color: #222222;
      font-weight: 600;
      margin: 60px 0 6px;
    }
    .sub-title{
      font-weight: 400;
      font-size: 14px;
      line-height: 14px;
      margin: 0 0 20px;
    }
  }
  .container {
    width: 100%;
    background-color: #F6F7F9;
    box-sizing: border-box;
    padding: 14px;
    border-radius: 20px;

    &-main {
      width: 100%;
      background-color: #ffffff;
      box-sizing: border-box;
      border-radius: 12px;
      padding: 30px;
      .list-head{
        width: 100%;
        padding: 0 0 20px;
        border-bottom: 1px dashed #DDDDDD;
        display: flex;
        justify-content: space-between;
        align-items: flex-end;
        margin-bottom: 20px;
        .head-left{
          p{
            margin: 0;
            &.title{
              font-size: 28px;
              line-height: 28px;
              font-weight: 600;
              color: #222222;
            }
            &.sub-title{
              font-size: 14px;
              line-height: 14px;
              color: #888888;
              font-weight: 400;
              margin-top: 5px;
            }
          }
        }
        .head-right{
          font-size: 14px;
          line-height: 14px;
          color: #999999;
          font-weight: 600;
          position: relative;
          display: inline-block;
          padding-right: 12px;
          cursor: pointer;
          a{
            color: #999999;
          }
          &:after{
            content: '';
            display: inline-block;
            position: absolute;
            right: 0;
            top: 4px;
            width: 5px;
            height: 5px;
            border-top: 2px solid #999999;
            border-right: 2px solid #999999;
            transform: rotate(45deg);
          }
        }
      }
    }
  }
}

@media screen and (max-width: 1160px) {
  .container-main{
    padding: 15px!important;
  }
  .content{
    width: 100%;
    overflow-x: auto;
  }
}
</style>
