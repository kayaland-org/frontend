<template>
  <div class="fund-about" v-if="aboutData">
    <p class="about-title">{{ $t('fundDetail.fundDetail_about_title') }}</p>
    <div class="about-main">
      <p class="about-discription" v-html="aboutData.content"></p>
      <div class="items-box" v-for="(item, index) in aboutData.items" :key="index">
        <p class="item-title" v-html="item.title"></p>
        <div class="item-mainbox" v-if="typeof item.itemMain === 'object'">
          <p v-for="(item_, i) in item.itemMain" v-html="item_" :key="i"></p>
        </div>
        <p class="item-content" v-else v-html="item.itemMain"></p>
      </div>
    </div>
  </div>
</template>

<script>
import descriptionsCn from '../../utils/funds-description-cn'
import descriptionsEn from '../../utils/funds-description-en'
export default {
  name: 'fund-about',
  props: ['fundAddress'],
  data () {
    return {
      aboutList: null,
      aboutData: null,
      lang: this.$i18n.locale
    }
  },
  watch: {
    '$i18n.locale': function (val, oldVal) {
      this.lang = val
      this.getTrueDiscription()
    }
  },
  mounted () {
    this.getTrueDiscription()
  },
  methods: {
    getTrueDiscription () {
      switch (this.lang) {
        case 'en':
          this.aboutList = descriptionsEn
          break
        case 'zh':
          this.aboutList = descriptionsCn
          break
      }
      this.aboutData = this.aboutList[this.$props.fundAddress]
    }
  }
}
</script>

<style lang="scss" scoped>

.fund-about {
  margin-top: 80px;
  >>>.link{
    padding: 0 4px;
    display: inline-block;
    color:#2B878C;
    text-decoration: underline;
  }
  .about-title {
    font-size: 18px;
    line-height: 18px;
    margin: 0 0 8px;
    font-weight: 600;
  }
  .about-main{
    .about-discription{
      font-size: 16px;
      line-height: 24px;
      color: #222222;
    }
    .items-box{
      margin-top: 30px;
      .item-title{
        font-size: 16px;
        line-height: 16px;
        font-weight: 500;
        padding-left: 10px;
        position: relative;
        margin: 0 0 8px;
        &:before{
          content:"-";
          position: absolute;
          font-size: 16px;
          line-height: 16px;
          left: 0;
          top: 0;
        }
      }
      .item-mainbox{
        p{
          font-size: 16px;
          line-height: 24px;
          padding-left: 12px;
          position: relative;
          margin-left: 16px;
          &:before{
            content:'';
            display: inline-block;
            width: 4px;
            height:4px;
            position:absolute;
            top: 10px;
            left: 3px;
            border-radius: 50%;
            background-color: #666666;
          }
        }
      }
      .item-content{
        font-size: 16px;
        line-height: 24px;
        font-weight: 400;
        color: #222222;
      }
    }
  }
}
</style>
