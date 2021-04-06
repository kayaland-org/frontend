<template>
  <div class="info">
    <div class="info-left">
      <div class="menu-item" :class="menuActive==='land'?'active':''">{{ $t('info.info_title') }}</div>
    </div>
    <div class="info-right">
      <p class="title" ref="kayaland">{{ $t('info.info_title') }}</p>
      <div class="content-box">
        <p>{{ $t('info.info_description_1') }}</p>

        <p>{{ $t('info.info_description_2') }}</p>

        <p><span class="strong">{{ $t('info.info_title') }}</span>{{ $t('info.info_kayaland_info') }}</p>

        <p>{{ $t('info.info_kayaItems_title') }}<br/>
          <span class="strong">{{ $t('info.info_kayaItems_kaya_title') }}({{ $t('info.info_kayaItems_comingSoon') }})</span>{{ $t('info.info_kayaItems_kaya_info') }} </p>

        <p><span class="strong">{{ $t('info.info_kayaItems_kayaFund_title') }}</span>{{ $t('info.info_kayaItems_kayaFund_info') }}</p>

        <p><span class="strong">{{ $t('info.info_kayaItems_kayaGarden_title') }}({{ $t('info.info_kayaItems_comingSoon') }})</span>{{ $t('info.info_kayaItems_kayaGarden_info') }}</p>

        <p><span class="strong">{{ $t('info.info_kayaItems_kayaFinance_title') }}({{ $t('info.info_kayaItems_comingSoon') }})</span>{{ $t('info.info_kayaItems_kayaFinance_info') }}</p>

        <p>{{ $t('info.info_end_1') }}</p>

        <p>{{ $t('info.info_end_2') }}</p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'info',
  data () {
    return {
      menuActive: 'land'
    }
  },
  mounted () {
  },
  methods: {},
  beforeDestroy () {
  }
}
</script>

<style scoped lang="scss">
.info {
  width: 100%;
  margin: 0 auto;
  padding: 0 10px;
  box-sizing: border-box;
  min-height: 80vh;
  display: flex;
  justify-content: space-between;
  margin-bottom: 100px;

  &-left {
    width: 145px;
    height: 30px;
    position: sticky;
    top: 130px;
    text-align: right;

    .menu-item {
      width: 100%;
      height: 16px;
      font-size: 16px;
      line-height: 20px;
      margin-bottom: 10px;
      color: #bbbbbb;
      font-weight: 500;
      cursor: pointer;

      &.active, &:hover {
        color: #222222;
        font-weight: 600;
      }
    }
  }

  &-right {
    width: 940px;
    padding: 60px;
    background-color: rgba(246, 247, 249, .6);
    box-sizing: border-box;

    .title {
      font-size: 36px;
      line-height: 36px;
      margin: 0 auto 22px;
      color: #333333;
      font-weight: 300;
    }

    .content-box {
      margin-bottom: 60px;
      font-size: 14px;
      line-height: 18px;
      color: #333333;
      font-weight: 400;

      &.mb0 {
        margin-bottom: 0;
      }

      p {
        margin: 0 auto 20px;
        .strong{
          color: #222222;
          font-weight: 600;
        }

        &.mb0 {
          margin-bottom: 0;
        }
      }

      img {
        width: 100%;
        margin: 0 auto 20px;
      }
    }
  }
}
@media screen and (max-width: 1160px) {
  .info {

    &-left {
      display: none;
    }
    &-right{
      width: 100%;
      padding: 60px 20px;
    }
  }
}
</style>
