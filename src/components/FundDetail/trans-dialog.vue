<template>
  <div>
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
export default {
  name: 'trans-dialog',
  props: ['showTransDialog', 'dialogData'],
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
    }
  }
}
</script>

<style lang="scss" scoped>

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
</style>
