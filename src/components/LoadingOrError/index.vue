<template>
  <div class="loading-box" v-if="isError || isLoading">
    <svg-icon v-if="isLoading" icon-class="loading_gray" class-name="loading"></svg-icon>
    <p v-if="isError" class="err-text">{{ $t('common.common_network_err_1')}}<span @click="retry">{{ $t('common.common_network_err_2')}}</span>{{ $t('common.common_network_err_3')}}</p>
  </div>
</template>

<script>
export default {
  name: 'index',
  props: {
    'isLoading': {
      type: Boolean,
      default: true
    },
    'isError': {
      type: Boolean,
      default: false
    }
  },
  methods: {
    retry () {
      this.$emit('retry')
    }
  }
}
</script>

<style lang="scss" scoped>
.loading-box {
  width: 100%;
  margin-top: 60px;
  text-align: center;

  .loading {
    width: 50px;
    height: 50px;
  }
  .err-text{
    margin: 0;
    height: 51px;
    font-size: 16px;
    line-height: 50px;
    color: #FA4D56;
    span{
      cursor: pointer;
      text-decoration: underline;
    }
  }
}
</style>
