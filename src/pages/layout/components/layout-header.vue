<template>
  <div>
    <header id="headscroll" class="layout-header" :style="{top: `${headerTop}px`}"
            :class="showHeader?'header-slidein':'header-slideout'">
      <div class="content">
        <router-link to="/">
          <img src="../../../assets/images/home/logo.png" alt="" class="logo">
        </router-link>
        <svg t="1611512306059" class="icon menu-btn" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg"
             p-id="1329" width="32" height="32" v-if="showMobileMenu" @click="handleMobileMenu">
          <path
              d="M954.88 237.056H69.12a43.52 43.52 0 1 1 0-87.04h885.248c24.064 0 43.52 19.456 43.52 43.52s-18.944
            43.52-43.008 43.52zM954.88 555.52H69.12a43.52 43.52 0 1 1 0-87.04h885.248c24.064 0 43.52 19.456 43.52
            43.52s-18.944 43.52-43.008 43.52zM954.88 874.496H69.12a43.52 43.52 0 1 1 0-87.04h885.248c24.064 0 43.52
            19.456 43.52 43.52 0.512 24.064-18.944 43.52-43.008 43.52z"
              fill="#666666" p-id="1330"></path>
        </svg>
        <nav class="memus" v-show="showMobileMenuMain">
          <router-link to="/" @click.native="handleMobileMenu" class="item" :class="$route.name==='index' ? 'active' : ''">
            <span>{{ $t('layout.layout_header_home') }}</span>
          </router-link>
          <router-link to="/fund" @click.native="handleMobileMenu" class="item" :class="$route.name==='list'||$route.name==='detail' ? 'active' : ''">
            <span>{{ $t('layout.layout_header_kayaFund') }}</span>
          </router-link>
          <router-link to="/info" @click.native="handleMobileMenu" class="item" :class="$route.name==='info' ? 'active' : ''">
            <span>{{ $t('layout.layout_header_info') }}</span>
          </router-link>
          <div class="item language">
            <span>{{ language === 'en' ? $t('common.common_english') : $t('common.common_chinese') }}</span>
            <svg-icon icon-class="icon_arrow_normal.png" class="icon"></svg-icon>
            <div class="select-box">
              <div class="select-item" @click="changeLang('zh')">{{ $t('common.common_chinese') }}</div>
              <div class="select-item" @click="changeLang('en')">{{ $t('common.common_english') }}</div>
            </div>
          </div>
          <div class="wallet" @click="showBindWallet">
            {{ walletLocked ? $t('layout.layout_header_unlock') : formatAccount(defaultAccount) }}
            <img src="../../../assets/images/home/wallet.png" alt="" class="icon">
          </div>
        </nav>
      </div>
    </header>
    <div class="mask" v-show="showMobileMenu&&showMobileMenuMain" @click="showMobileMenuMain = false"></div>
  </div>
</template>

<script>

export default {
  name: 'layout-header',
  props: ['walletLocked', 'defaultAccount'],
  data () {
    return {
      web3Provider: null,
      showWallet: false,
      beforeScrollTop: 0,
      showHeader: true,
      showGameBox: false,
      listenBodyTop: null,
      headerTop: 0,
      language: 'en',
      showMobileMenu: false,
      showMobileMenuMain: false
    }
  },
  mounted () {
    if (localStorage.getItem('kayaLanguage')) {
      this.language = localStorage.getItem('kayaLanguage')
      this.$i18n.locale = localStorage.getItem('kayaLanguage')
    } else {
      localStorage.setItem('kayaLanguage', this.language)
    }
    this.$nextTick(() => {
      setTimeout(() => {
        this.loadGTM()
      }, 5000)
    })
    this.listenBodyTop = setInterval(() => {
      var bodyTop = document.getElementsByTagName('body')[0].style.top
      this.headerTop = parseInt(bodyTop) > 0 ? 40 : 0
    }, 1000)
    this.addScrollListen()
    if (document.body.clientWidth < 1160) {
      this.showMobileMenu = true
      this.showMobileMenuMain = false
    } else {
      this.showMobileMenu = false
      this.showMobileMenuMain = true
    }
    window.addEventListener('resize', () => {
      if (document.body.clientWidth < 1160) {
        this.showMobileMenu = true
        this.showMobileMenuMain = false
      } else {
        this.showMobileMenu = false
        this.showMobileMenuMain = true
      }
    })
  },
  methods: {
    showBindWallet () {
      this.$emit('showBindWallet')
      this.handleMobileMenu()
    },
    formatAccount (account) {
      return `${account.substring(0, 6)}...${account.substring(account.length - 4)}`
    },
    loadGTM () {
      if (window.location.href.indexOf('kayaland.org') >= 0 && window.location.href.indexOf('test') === -1) {
        let script = document.createElement('script')
        let code = `(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
})(window,document,'script','dataLayer','GTM-NCC5G8D');`
        try {
          script.appendChild(document.createTextNode(code))
        } catch (ex) {
          script.text = code
        }
        document.getElementsByTagName('head')[0].appendChild(script)

        let noscript = document.createElement('noscript')
        let iframe = document.createElement('iframe')
        iframe.src = 'https://www.googletagmanager.com/ns.html?id=GTM-NCC5G8D'
        iframe.height = '0'
        iframe.width = '0'
        iframe.style.display = 'none'
        iframe.style.visibility = 'hidden'
        document.getElementsByTagName('body')[0].appendChild(noscript)
        document.getElementsByTagName('noscript')[0].appendChild(iframe)
      }
    },
    changeLang (lang_) {
      this.$i18n.locale = lang_
      this.language = lang_
      localStorage.setItem('kayaLanguage', lang_)
      this.handleMobileMenu()
      this.$EventBus.$emit('changeLang')
    },
    addScrollListen () {
      window.scrollTo(0, window.scrollTop)
      window.addEventListener('scroll', this.handleScroll)
      window.addEventListener('resize', () => {
        if (document.body.clientWidth < 1160) {
          this.handleScroll()
        } else {
          document.querySelector('#headscroll').style.margin = '0 auto'
        }
      })
    },
    handleScroll () {
      let scrollTop = '-' + window.pageXOffset + 'px'
      if (document.body.clientWidth < 1160) {
        let flag = navigator.userAgent.match(/(phone|pad|pod|iPhone|iPod|ios|iPad|Android|Mobile|BlackBerry|IEMobile|MQQBrowser|JUC|Fennec|wOSBrowser|BrowserNG|WebOS|Symbian|Windows Phone)/i)
        if (!flag) {
          document.querySelector('#headscroll').style.marginLeft = scrollTop
        }
      }
    },
    handleMobileMenu () {
      if (this.showMobileMenu) this.showMobileMenuMain = !this.showMobileMenuMain
    }
  },
  beforeDestroy () {
    this.$EventBus.$off('changeLang')
    clearInterval(this.listenBodyTop)
  }
}
</script>

<style scoped lang="scss">
.layout {
  &-header {
    height: 68px;
    width: 100%;
    background-color: #ffffff;
    position: fixed;
    top: 0;
    z-index: 99;

    &.header-slidein {
      top: 0;
      transition: top 200ms linear
    }

    &.header-slideout {
      top: -68px;
      transition: top 200ms linear
    }

    .content {
      width: 1160px;
      padding: 0 10px;
      margin: 0 auto;
      height: 100%;
      display: flex;
      justify-content: space-between;
      box-sizing: border-box;

      .logo {
        height: 42px;
        //width: 70px;
        margin-top: 13px
      }

      .menu-btn{
        display: none;
      }
      .memus {
        height: 100%;
        display: flex;
        align-items: center;

        .item {
          margin: 0 15px;
          color: #666666;
          font-size: 16px;
          line-height: 69px;
          font-weight: 600;
          text-decoration: none;
          position: relative;

          &:hover {
            color: #222222;
          }

          &.active {
            color: #222222;
          }

          .icon {
            width: 9px;
            height: 6px;
            margin-left: 6px;
            vertical-align: .18em;
          }

          .games-box {
            width: 100vw;
            height: 132px;
            position: fixed;
            left: 0;
            top: 69px;
            z-index: 9;
            background: #FFFFFF;
            cursor: default;
            box-shadow: 0px 12px 12px -8px rgba(183, 186, 186, 0.16);

            .box-main {
              width: 1200px;
              padding: 0 20px;
              height: 100%;
              margin: 0 auto;
              box-sizing: border-box;
              display: flex;
              justify-content: center;

              a {
                text-decoration: none;
              }

              .game-item {
                height: 132px;
                padding: 20px 0;
                margin: 0 25px;
                box-sizing: border-box;
                cursor: pointer;

                img {
                  width: 70px;
                  margin: 0;
                }

                .name {
                  height: 16px;
                  font-size: 16px;
                  line-height: 16px;
                  text-align: center;
                  margin: 0;
                  font-weight: 600;
                  color: #222222;
                  margin-top: -24px;
                  text-decoration: none;
                }
              }
            }
          }

          &.language {
            padding: 13px 12px;
            border-radius: 8px;
            border: 1px dashed #DDDDDD;
            line-height: 14px;
            cursor: pointer;

            .select-box {
              width: 100%;
              position: absolute;
              display: none;
              background: #FFFFFF;
              border-radius: 8px;
              border: 1px dashed #DDDDDD;
              box-sizing: border-box;
              padding: 10px 12px;
              top: 40px;
              left: 0;
              cursor: auto;

              .select-item {
                font-size: 14px;
                line-height: 14px;
                padding: 3px 0;
                cursor: pointer;

                &:first-child {
                  margin-bottom: 6px;
                }
              }
            }

            &:hover {
              .icon {
                transform: rotate(180deg);
                -webkit-transform: rotate(180deg);
                -moz-transform: rotate(180deg);
                -o-transform: rotate(180deg);
                -ms-transform: rotate(180deg);
              }

              .select-box {
                display: block;
              }
            }
          }
        }

        .wallet {
          font-size: 16px;
          line-height: 24px;
          font-weight: 600;
          color: #ffffff;
          background-color: #EB5654;
          padding: 8px 12px;
          border-radius: 8px;
          margin-left: 25px;
          cursor: pointer;
          box-sizing: border-box;

          .icon {
            width: 24px;
            height: 24px;
            margin-left: 14px;
            vertical-align: bottom;
          }
        }
      }
    }
  }
}

@media screen and (max-width: 1160px) {
  .layout {
    &-header {
      height: 52px;
      z-index: 999!important;
      box-shadow: 0px 12px 12px -8px rgba(183, 186, 186, 0.16);
      .content {
        width: 100%;
        padding: 0 10px;
        margin: 0 auto;
        height: 100%;
        display: inline-block;

        .logo {
          height: 32px;
          margin-top: 10px;
        }

        .menu-btn{
          display: inline-block;
          float: right;
          margin-top: 10px;
        }
        .memus {
          height: auto;
          display: flex;
          align-items: center;
          flex-wrap: wrap;
          width: 100%;
          background-color: #ffffff;
          box-shadow: 0px 12px 12px -8px rgba(183, 186, 186, 0.16);

          .item {
            margin: 0 15px;
            color: #666666;
            font-size: 16px;
            line-height: 42px;
            font-weight: 600;
            text-decoration: none;
            position: relative;
            width: 100%;

            &:hover {
              color: #222222;
            }

            &.active {
              color: #222222;
            }

            .icon {
              width: 9px;
              height: 6px;
              margin-left: 6px;
              vertical-align: .18em;
              float: right;
              margin-top: 6px;
            }

            .games-box {
              width: 100vw;
              height: 132px;
              position: fixed;
              left: 0;
              top: 69px;
              z-index: 9;
              background: #FFFFFF;
              cursor: default;
              box-shadow: 0px 12px 12px -8px rgba(183, 186, 186, 0.16);

              .box-main {
                width: 1200px;
                padding: 0 20px;
                height: 100%;
                margin: 0 auto;
                box-sizing: border-box;
                display: flex;
                justify-content: center;

                a {
                  text-decoration: none;
                }

                .game-item {
                  height: 132px;
                  padding: 20px 0;
                  margin: 0 25px;
                  box-sizing: border-box;
                  cursor: pointer;

                  img {
                    width: 70px;
                    margin: 0;
                  }

                  .name {
                    height: 16px;
                    font-size: 16px;
                    line-height: 16px;
                    text-align: center;
                    margin: 0;
                    font-weight: 600;
                    color: #222222;
                    margin-top: -24px;
                    text-decoration: none;
                  }
                }
              }
            }

            &.language {
              padding: 13px 12px;
              border-radius: 8px;
              border: 1px dashed #DDDDDD;
              line-height: 14px;
              cursor: pointer;

              .select-box {
                width: 100%;
                position: absolute;
                display: none;
                background: #FFFFFF;
                border-radius: 8px;
                border: 1px dashed #DDDDDD;
                box-sizing: border-box;
                padding: 10px 12px;
                top: 40px;
                left: 0;
                cursor: auto;

                .select-item {
                  font-size: 14px;
                  line-height: 14px;
                  padding: 3px 0;
                  cursor: pointer;

                  &:first-child {
                    margin-bottom: 6px;
                  }
                }
              }

              &:hover {
                .icon {
                  transform: rotate(180deg);
                  -webkit-transform: rotate(180deg);
                  -moz-transform: rotate(180deg);
                  -o-transform: rotate(180deg);
                  -ms-transform: rotate(180deg);
                }

                .select-box {
                  display: block;
                }
              }
            }
          }

          .wallet {
            font-size: 16px;
            line-height: 24px;
            font-weight: 600;
            color: #ffffff;
            background-color: #EB5654;
            padding: 8px 12px;
            border-radius: 8px;
            margin-left: 15px;
            margin-top: 8px;
            cursor: pointer;
            box-sizing: border-box;
            margin-bottom: 10px;

            .icon {
              width: 24px;
              height: 24px;
              margin-left: 14px;
              vertical-align: bottom;
            }
          }
        }
      }
    }
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
}

</style>
