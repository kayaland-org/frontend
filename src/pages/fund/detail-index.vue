<template>
<!--  <router-view :web3Obj="$props.web3Obj" :walletLocked="$props.walletLocked" :defaultAccount="$props.defaultAccount"-->
<!--               @showBindWallet="showBindWallet" @hideBindWallet="hideBindWallet"/>-->
  <detail-etf v-if="fund.type==='ETF'" :web3Obj="$props.web3Obj" :walletLocked="$props.walletLocked" :defaultAccount="$props.defaultAccount"
              @showBindWallet="showBindWallet" @hideBindWallet="hideBindWallet"/>
  <detail-vault v-else-if="fund.address !== '0x18e9BE45B0E917b5648Eb6716ECE2dE87474E535'" :web3Obj="$props.web3Obj" :walletLocked="$props.walletLocked" :defaultAccount="$props.defaultAccount"
                @showBindWallet="showBindWallet" @hideBindWallet="hideBindWallet"/>
  <detail-vault-copy v-else-if="fund.address === '0x18e9BE45B0E917b5648Eb6716ECE2dE87474E535'" :web3Obj="$props.web3Obj" :walletLocked="$props.walletLocked" :defaultAccount="$props.defaultAccount"
                @showBindWallet="showBindWallet" @hideBindWallet="hideBindWallet"/>
</template>

<script>
import detailEtf from './detail-etf'
import detailVault from './detail-vault'
import detailVaultCopy from './detail-vault-copy'
import {funds} from '../../utils/contracts/fund'
export default {
  name: 'index',
  props: ['walletLocked', 'defaultAccount', 'web3Obj'],
  components: {detailEtf, detailVault, detailVaultCopy},
  data () {
    return {
      fund: null
    }
  },
  created () {
    this.fund = funds.filter((item) => {
      return item.address === this.$route.params.address
    })[0]
  },
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
