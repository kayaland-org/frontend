<template>
  <router-view :web3Obj="$props.web3Obj" :walletLocked="$props.walletLocked" :defaultAccount="$props.defaultAccount"  @showBindWallet="showBindWallet" @hideBindWallet="hideBindWallet"/>
</template>

<script>
export default {
  name: 'index',
  props: ['walletLocked', 'defaultAccount', 'web3Obj'],
  methods: {
    showBindWallet () {
      this.$emit('showBindWallet')
    },
    hideBindWallet () {
      this.$emit('hideBindWallet')
    }
  }
}
</script>

<style scoped lang="scss">

</style>
