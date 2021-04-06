<template>
  <div id="app">
    <layout-header @showBindWallet="showBindWallet" @hideBindWallet="hideBindWallet" :walletLocked="walletLocked"
                   :defaultAccount="defaultAccount"/>
    <div class="layout-content">
      <router-view v-if="isRouterShow" @showBindWallet="showBindWallet" @hideBindWallet="hideBindWallet" :kaya="kaya"
                   :garden="garden"
                   :defaultAccount="defaultAccount" :web3Obj="web3Obj"
                   :walletLocked="walletLocked"></router-view>
    </div>
    <layout-footer :web3Obj="web3Obj"/>
    <div class="mask" v-show="showWallet || showAccount" @click="showWallet = false;showAccount = false"></div>
    <div class="select-wallet" v-show="showWallet">
      <div class="wallet-content">
        <span @click="hideBindWallet"><svg-icon icon-class="icon_close" class-name="close"></svg-icon></span>
        <div class="main">
          <div class="main-title">
            <img src="../../assets/images/home/wallet_account.png" alt="" class="icon">
            <p class="title">{{ $t('layout.layout_dialog_connect_title') }}</p>
            <p class="subtitle">{{ $t('layout.layout_dialog_connect_subtitle') }}</p>
          </div>
          <div class="wallet-list">
            <div class="item-box" @click="initMeatmask">
              <div class="item-content">
                <img src="../../assets/images/home/metamask.png" alt="">
                <div class="text">
                  <p class="title">{{ $t('layout.layout_dialog_connect_metamask') }}</p>
                  <p class="desc">{{ $t('layout.layout_dialog_connect_description') }}</p>
                </div>
              </div>
            </div>
            <div class="item-box" @click="initWalletConnect">
              <div class="item-content">
                <img src="../../assets/images/home/walletconnect.png" class="wallet-content" alt="">
                <div class="text">
                  <p class="title">{{ $t('layout.layout_dialog_connect_walletconnect') }}</p>
                  <p class="desc">{{ $t('layout.layout_dialog_connect_description') }}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="select-wallet" v-show="showAccount">
      <div class="wallet-content">
        <span @click="showAccount = false"><svg-icon icon-class="icon_close" class-name="close"></svg-icon></span>
        <div class="main">
          <div class="main-title">
            <img src="../../assets/images/home/wallet_account.png" class="icon" alt="">
            <p class="title">{{ $t('layout.layout_dialog_account_title') }}</p>
            <p class="subtitle">{{ $t('layout.layout_dialog_account_subtitle') }}</p>
          </div>
          <div class="account-data">
            <div class="data-main">
              <div class="balance">
                <p class="balance-title">{{ $t('layout.layout_dialog_account_balance') }}</p>
                <p class="balance-main">{{ kayaBalance }}</p>
              </div>
              <div class="btns">
                <div class="btn" @click="viewOnEtherscan">
                  {{ $t('common.common_viewOnEtherscan') }}
                  <svg-icon icon-class="icon_open" class-name="icon"></svg-icon>
                </div>
                <div class="btn" @click="signOut">
                  {{ $t('layout.layout_dialog_account_btn_signOut') }}
                  <svg-icon icon-class="icon_exit" class-name="icon w13"></svg-icon>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import LayoutHeader from './components/layout-header'
import Web3 from 'web3'
import WalletConnectProvider from '@walletconnect/web3-provider'
import LayoutFooter from './components/layout-footer'
import {globalConfig} from '../../utils/global-config'

export default {
  name: 'layout',
  components: {LayoutFooter, LayoutHeader},
  data () {
    return {
      web3Obj: null,
      web3Provider: null,
      showWallet: false,
      walletLocked: true,
      listenWallet: null,
      defaultAccount: '',
      networkId: '',
      kaya: null,
      garden: null,
      showAccount: false,
      kayaBalance: 0,
      chainId: null,
      isRouterShow: true
    }
  },
  created () {
    if (document.body.clientWidth < 1160 && window.ethereum) {
      this.initMeatmask()
    } else {
      this.initWeb3()
    }
  },
  provide () {
    return {
      reload: this.reload
    }
  },
  mounted () {
  },
  methods: {
    async reload () {
      this.isRouterShow = false
      await this.$nextTick()
      this.isRouterShow = true
    },
    initWeb3 () {
      this.web3Obj = process.env.NODE_ENV === 'production' ? new Web3(globalConfig.rpcUrls[0]) : new Web3(globalConfig.rpcUrls[1])
    },
    initMeatmask () {
      // Modern dapp browsers...
      if (window.ethereum) {
        this.web3Provider = window.ethereum
        try {
          // Request account access
          window.ethereum.enable()
        } catch (error) {
          // User denied account access...
          console.error('User denied account access')
        }
      } else if (window.web3) {
        this.web3Provider = window.web3.currentProvider
      } else {
        this.web3Provider = process.env.NODE_ENV === 'production' ? new Web3.providers.HttpProvider(globalConfig.rpcUrls[0]) : new Web3.providers.HttpProvider(globalConfig.rpcUrls[1])
      }
      this.web3Obj = new Web3(this.web3Provider)
      try {
        window.ethereum.on('chainChanged', (_chainId) => {
          this.getAccount()
        })
        window.ethereum.on('accountsChanged', (account) => {
          if (account.length > 0) {
            this.reload()
            this.defaultAccount = account[0]
            this.walletLocked = false
            this.hideBindWallet()
          } else {
            this.defaultAccount = ''
            this.walletLocked = true
            this.initWeb3()
            this.reload()
          }
        })
      } catch (err) {
        console.log(err)
      }
      this.getAccount()
    },
    async initWalletConnect () {
      const provider = new WalletConnectProvider({
        infuraId: 'fa286342ff5146009df60eec241035c8' // Required
      })

      //  Enable session (triggers QR Code modal)
      await provider.enable()
      //  Create Web3
      this.web3Obj = new Web3(provider)
      this.getAccount()
      this.reload()
      provider.on('close', (code, reason) => {
        this.defaultAccount = ''
        this.walletLocked = true
        this.initWeb3()
        this.reload()
      })
      provider.on('chainChanged', (chainId) => {
        this.getAccount()
      })
      provider.on('accountsChanged', (accounts) => {
        this.getAccount()
      })
    },
    getAccount () {
      this.web3Obj.eth.getAccounts((error, result) => {
        if (!error) {
          if (result[0]) {
            this.reload()
            this.defaultAccount = result[0]
            this.walletLocked = false
            this.hideBindWallet()
          } else {
            this.defaultAccount = ''
            this.walletLocked = true
            this.initWeb3()
            this.reload()
          }
        }
      })
    },
    viewOnEtherscan () {
      this.web3Obj.eth.net.getId().then(res => {
        switch (res) {
          case 1:
            window.open(`https://etherscan.io/address/${this.defaultAccount}`)
            break
          case 42:
            window.open(`https://kovan.etherscan.io/address/${this.defaultAccount}`)
            break
        }
      })
    },
    signOut () {
      this.walletLocked = true
      this.showAccount = false
      this.initWeb3()
      this.reload()
    },
    showBindWallet () {
      if (this.walletLocked) {
        this.showWallet = true
      } else {
        this.showAccount = true
      }
    },
    hideBindWallet () {
      this.showWallet = false
    }
  },
  beforeDestroy () {
  }
}
</script>
<style lang="scss">
html, body {
  margin: 0;
  padding: 0;
}

* {
  font-family: -apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Oxygen, Ubuntu, Cantarell, Fira Sans, Droid Sans, Helvetica Neue, sans-serif;
}

a {
  text-decoration: none;
}

a:link {
  text-decoration: none;
}

a:visited {
  text-decoration: none;
}

a:hover {
  text-decoration: none;
}

a:active {
  text-decoration: none;
}

a:focus {
  text-decoration: none;
}

#app {
  width: 100%;
  padding-top: 68px;
}

.layout-content {
  width: 100%;
  max-width: 1160px;
  min-width: 1160px;
  margin: 0 auto;
  box-sizing: border-box;
  padding: 10px;
}

.mask {
  width: 100%;
  height: 100%;
  background-color: #FFFFFF;
  opacity: .9;
  position: fixed;
  top: 0;
  left: 0;
  z-index: 998;
}

.select-wallet {
  width: 100%;
  height: 524px;
  box-sizing: border-box;
  padding: 0 20px;
  background: #FFFFFF;
  box-shadow: 12px 0 12px 12px rgba(183, 186, 186, 0.16);
  position: fixed;
  bottom: 0;
  left: 0;
  z-index: 999;

  .wallet-content {
    width: 100%;
    padding: 0;
    height: 100%;
    margin: 0 auto;
    position: relative;
    box-sizing: border-box;

    .main {
      width: 1160px;
      margin: 0 auto;
      height: 100%;
      box-sizing: border-box;
      padding-top: 100px;
      display: flex;
      justify-content: space-between;

      .main-title {
        width: 350px;
        flex: 1 1 auto;

        .icon {
          width: 50px;
          height: 50px;
          margin-bottom: 12px;
        }

        p {
          margin: 0;

          &.title {
            font-size: 30px;
            line-height: 30px;
            color: #121212;
            font-weight: 600;
            margin-bottom: 6px;
          }

          &.subtitle {
            font-size: 14px;
            line-height: 14px;
            color: #222222;
            font-weight: 600;
          }
        }
      }

      .wallet-list {
        width: 100%;
        flex: 0;

        .item-box {
          width: 420px;
          height: 152px;
          box-sizing: border-box;
          padding: 16px;
          background-color: #f6f7f9;
          border-radius: 20px;
          cursor: pointer;

          &:first-child {
            margin-bottom: 20px;
          }

          .item-content {
            width: 100%;
            height: 100%;
            box-sizing: border-box;
            padding: 20px;
            background-color: #FFFFFF;
            border-radius: 20px;
            display: flex;
            justify-content: space-between;

            img {
              width: 80px;
              height: 80px;
              padding: 0;
            }

            .text {
              flex: 1;
              padding: 15px 20px;

              .title {
                margin: 0;
                font-size: 30px;
                line-height: 30px;
                font-weight: 600;
                color: #121212;
                margin-bottom: 6px;
              }

              .desc {
                margin: 0;
                font-size: 14px;
                line-height: 14px;
                color: #121212;
                font-weight: 400;
              }
            }
          }
        }
      }

      .account-data {
        width: 807px;
        height: 237px;
        box-sizing: border-box;
        background-color: #F6F7F9;
        border-radius: 20px;
        padding: 16px;

        .data-main {
          width: 100%;
          height: 100%;
          background-color: #ffffff;
          box-sizing: border-box;
          padding: 30px;
          border-radius: 20px;

          .balance {
            width: 100%;
            padding-bottom: 20px;
            border-bottom: 1px dashed #CCCCCC;

            .balance-title {
              font-size: 14px;
              line-height: 14px;
              color: #999999;
              font-weight: 500;
              margin: 0;
              margin-bottom: 10px;
            }

            .balance-main {
              font-size: 40px;
              line-height: 40px;
              color: #121212;
              margin: 0;
              font-weight: 600;
            }
          }

          .btns {
            padding: 20px 0;

            .btn {
              padding: 13px;
              background-color: #2B878C;
              font-size: 14px;
              line-height: 14px;
              color: #ffffff;
              display: inline-block;
              cursor: pointer;
              border-radius: 8px;
              font-weight: 600;

              &:first-child {
                margin-right: 12px;
              }

              .icon {
                width: 12px;
                height: 12px;
                margin-left: 6px;

                &.w13 {
                  width: 13px;
                  height: 13px;
                }
              }
            }
          }
        }
      }
    }

    .close {
      width: 20px;
      height: 20px;
      position: absolute;
      top: 40px;
      right: 10px;
      cursor: pointer;
    }
  }
}

.tip-box {
  position: fixed;
  top: 200px;
  left: 50%;
  width: 800px;
  margin-left: -400px;
  z-index: 999;

  img {
    width: 100%;
  }

  .icon {
    width: 20px;
    height: 20px;
    position: absolute;
    right: 16px;
    top: 16px;
    cursor: pointer;
  }
}

.tooltip {
  display: block !important;
  z-index: 10000;

  .tooltip-inner {
    background: black;
    color: white;
    border-radius: 16px;
    padding: 5px 10px 4px;
  }

  .tooltip-arrow {
    width: 0;
    height: 0;
    border-style: solid;
    position: absolute;
    margin: 5px;
    border-color: black;
    z-index: 1;
  }

  &[x-placement^="top"] {
    margin-bottom: 5px;

    .tooltip-arrow {
      border-width: 5px 5px 0 5px;
      border-left-color: transparent !important;
      border-right-color: transparent !important;
      border-bottom-color: transparent !important;
      bottom: -5px;
      left: calc(50% - 5px);
      margin-top: 0;
      margin-bottom: 0;
    }
  }

  &[x-placement^="bottom"] {
    margin-top: 5px;

    .tooltip-arrow {
      border-width: 0 5px 5px 5px;
      border-left-color: transparent !important;
      border-right-color: transparent !important;
      border-top-color: transparent !important;
      top: -5px;
      left: calc(50% - 5px);
      margin-top: 0;
      margin-bottom: 0;
    }
  }

  &[x-placement^="right"] {
    margin-left: 5px;

    .tooltip-arrow {
      border-width: 5px 5px 5px 0;
      border-left-color: transparent !important;
      border-top-color: transparent !important;
      border-bottom-color: transparent !important;
      left: -5px;
      top: calc(50% - 5px);
      margin-left: 0;
      margin-right: 0;
    }
  }

  &[x-placement^="left"] {
    margin-right: 5px;

    .tooltip-arrow {
      border-width: 5px 0 5px 5px;
      border-top-color: transparent !important;
      border-right-color: transparent !important;
      border-bottom-color: transparent !important;
      right: -5px;
      top: calc(50% - 5px);
      margin-left: 0;
      margin-right: 0;
    }
  }

  &[aria-hidden='true'] {
    visibility: hidden;
    opacity: 0;
    transition: opacity .15s, visibility .15s;
  }

  &[aria-hidden='false'] {
    visibility: visible;
    opacity: 1;
    transition: opacity .15s;
  }
}

@media screen and (max-width: 1160px) {
  #app {
    width: 100%;
    padding-top: 42px;
  }
  .layout-content {
    max-width: 100%;
    min-width: 100%;
  }
  .select-wallet {
    width: 100%;
    height: 344px;
    box-sizing: border-box;
    padding: 0 20px;
    background: #FFFFFF;
    box-shadow: 12px 0 12px 12px rgba(183, 186, 186, 0.16);
    position: fixed;
    bottom: 0;
    left: 0;
    z-index: 999;

    .wallet-content {
      width: 100%;
      padding: 0;
      height: 100%;
      margin: 0 auto;
      position: relative;
      box-sizing: border-box;

      .main {
        width: 100%;
        margin: 0 auto;
        height: 100%;
        box-sizing: border-box;
        padding-top: 30px;
        display: flex;
        justify-content: space-between;
        flex-wrap: wrap;

        .main-title {
          width: 100%;
          flex: 1 1 auto;

          .icon {
            width: 40px;
            height: 40px;
            margin-bottom: 6px;
          }

          p {
            margin: 0;

            &.title {
              font-size: 20px;
              line-height: 20px;
              color: #121212;
              font-weight: 600;
              margin-bottom: 6px;
            }

            &.subtitle {
              font-size: 14px;
              line-height: 14px;
              color: #222222;
              font-weight: 600;
            }
          }
        }

        .wallet-list {
          width: 100%;
          flex: auto;
          margin-top: 0;

          .item-box {
            width: 100%;
            height: 82px;
            box-sizing: border-box;
            padding: 10px;
            background-color: #f6f7f9;
            border-radius: 10px;
            cursor: pointer;

            &:first-child {
              margin-bottom: 10px;
            }

            .item-content {
              width: 100%;
              height: 100%;
              box-sizing: border-box;
              padding: 10px;
              background-color: #FFFFFF;
              border-radius: 10px;
              display: flex;
              justify-content: space-between;

              img {
                width: 40px;
                height: 40px;
                padding: 0;
              }

              .text {
                flex: 1;
                padding: 0 14px;

                .title {
                  margin: 0;
                  font-size: 18px;
                  line-height: 18px;
                  font-weight: 600;
                  color: #121212;
                  margin-bottom: 6px;
                }

                .desc {
                  margin: 0;
                  font-size: 12px;
                  line-height: 12px;
                  color: #121212;
                  font-weight: 400;
                }
              }
            }
          }
        }

        .account-data {
          width: 100%;
          height: 166px;
          box-sizing: border-box;
          background-color: #F6F7F9;
          border-radius: 10px;
          padding: 8px;

          .data-main {
            width: 100%;
            height: 100%;
            background-color: #ffffff;
            box-sizing: border-box;
            padding: 10px;
            border-radius: 10px;

            .balance {
              width: 100%;
              padding-bottom: 10px;
              border-bottom: 1px dashed #CCCCCC;

              .balance-title {
                font-size: 14px;
                line-height: 14px;
                color: #999999;
                font-weight: 500;
                margin: 0;
                margin-bottom: 10px;
              }

              .balance-main {
                font-size: 30px;
                line-height: 30px;
                color: #121212;
                margin: 0;
                font-weight: 600;
              }
            }

            .btns {
              padding: 18px 0;
              display: flex;
              justify-content: space-between;

              .btn {
                padding: 12px;
                background-color: #2B878C;
                font-size: 14px;
                line-height: 14px;
                color: #ffffff;
                display: inline-block;
                cursor: pointer;
                border-radius: 8px;
                font-weight: 600;

                &:first-child {
                  margin-right: 12px;
                }

                .icon {
                  width: 12px;
                  height: 12px;
                  margin-left: 6px;

                  &.w13 {
                    width: 13px;
                    height: 13px;
                  }
                }
              }
            }
          }
        }
      }

      .close {
        width: 20px;
        height: 20px;
        position: absolute;
        top: 40px;
        right: 10px;
        cursor: pointer;
      }
    }
  }
}
</style>
