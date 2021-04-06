<template>
  <div class="invite">
    <div class="invite-box" v-if="!inviteFlag">
      <p class="invite-code-title">{{$t('invite.invite_code_title')}}</p>
      <div class="input-box">
        <input type="text" class="invite-code" v-model="inviteCode">
        <div class="invite-bindbtn" @click="handleInvite">{{$t('invite.invite_code_setup')}}
          <svg-icon v-if="inviteLoading" icon-class="loading" class-name="right"></svg-icon>
          <svg v-else t="1603199966600" class="right" viewBox="0 0 1024 1024" version="1.1"
               xmlns="http://www.w3.org/2000/svg" p-id="1149" width="12" height="12">
            <path
                d="M621.254 877.254l320-320c24.994-24.992 24.994-65.516 0-90.51l-320-320c-24.994-24.992-65.516-24.992-90.51
                        0-24.994 24.994-24.994 65.516 0 90.51L741.49 448 128 448c-35.346 0-64 28.654-64 64s28.654 64 64
                        64l613.49 0L530.744 786.746C518.248 799.242 512 815.622 512 832s6.248 32.758 18.744
                        45.254C555.738 902.248 596.26 902.248 621.254 877.254z"
                p-id="1150" fill="#ffffff"></path>
          </svg>
        </div>
      </div>
      <p class="invite-err">{{inviteErr}}</p>
    </div>
    <div class="invite-box" v-else>
      <div class="my-invite">
        <div class="invite-left">
          <p class="my-invite-code">{{myInviteCode}}</p>
          <p class="my-invite-code-title">{{$t('invite.invite_code_mycode')}}</p>
          <div class="copy-btns">
            <span id="copy" class="copy-btn"
                  @click="copyInviteCode"
                  :data-clipboard-text="myInviteCode"
                  v-tooltip="{
                      content: copyTipContent,
                      show: showCopyTip,
                      trigger: 'manual',
                    }">
               <span>{{$t('invite.invite_code_copycode')}}</span>
            </span>
            <span id="copylink" class="copy-btn"
                  @click="copyShareLink"
                  :data-clipboard-text="inviteUrl"
                  v-tooltip="{
                      content: copyTipContent,
                      show: showCopyLinkTip,
                      trigger: 'manual',
                    }">
               <span>{{$t('invite.invite_code_copysharelink')}}</span>
            </span>
          </div>
        </div>
        <div class="invite-right">
          <vue-qrcode v-if="inviteUrl!==''" class="invite-qrcode" :value="inviteUrl" />
        </div>
      </div>
      <div class="my-invite invite-count">
        <div class="invite-left">
          <p class="my-invite-count">{{inviteLen}}</p>
          <p class="my-invite-count-title">{{$t('invite.invite_inviter_num')}}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import VueQrcode from 'vue-qrcode'
import InviteAbi from '../../utils/contracts/invite_abi.json'
import Clipboard from 'clipboard'
export default {
  name: 'Invite',
  components: {
    VueQrcode
  },
  props: ['web3Obj', 'defaultAccount', 'walletLocked'],
  data () {
    return {
      baseUrl: '',
      inviteAddress: '0x29ce32fd3507b40dd4ed72109ff15d38b77d80d1',
      inviteContract: null,
      inviteCode: '',
      myInviteCode: undefined,
      inviteUrl: '',
      inviteFlag: false,
      multiplier: 12543,
      sourceString: '96LRDSTEFANZH823BQYJ4CKPGXU5MVW7',
      sourceLength: 32,
      inviteLen: 0,
      inviteStatus: false,
      inviteErr: '',
      copyTipContent: 'Copied',
      showCopyTip: false,
      showCopyLinkTip: false,
      inviteLoading: false
    }
  },
  watch: {
    'walletLocked': function (val, oldVal) {
      if (!val) {
        this.checkInviteStatus()
      } else {
      }
    }
  },
  async mounted () {
    this.baseUrl = window.location.origin
    this.inviteCode = this.$route.query.inviteCode ? this.$route.query.inviteCode.toUpperCase() : ''
    this.inviteContract = new this.$props.web3Obj.eth.Contract(InviteAbi, this.inviteAddress)
    this.checkInviteStatus()
    this.$EventBus.$on('changeLang', () => {
      if (this.inviteErr !== '') {
        if (this.inviteCode === '') {
          this.inviteErr = this.$t('invite.invite_code_error_1')
        } else if (!Number.isInteger(this.deCodeID(this.inviteCode))) {
          this.inviteErr = this.$t('invite.invite_code_error_2')
        } else {
          this.inviteErr = ''
        }
      }
    })
    if (this.inviteCode !== '') {
      setTimeout(() => {
        let inviteBoxTop = document.querySelector('.invite').offsetTop
        window.scrollTo(0, inviteBoxTop - 400)
      }, 500)
    }
  },
  methods: {
    enCodeID (userId) {
      let num = parseInt(userId)
      num *= this.multiplier
      let code = ''
      while (num > 0) {
        let mod = num % this.sourceLength
        num = (num - mod) / this.sourceLength
        code = this.sourceString.substr(mod, 1) + code
      }
      return code
    },
    deCodeID (code) {
      let userId = 0
      code = code.toUpperCase()
      for (let i = 0; i < code.length; i++) {
        let str = code.substr(i, 1)
        let num = this.sourceString.indexOf(str)
        userId += num * Math.pow(this.sourceLength, (code.length - 1 - i))
      }
      userId /= this.multiplier
      return userId
    },
    async checkInviteStatus () {
      if (this.$props.walletLocked) {
        this.inviteFlag = false
        return
      }
      try {
        let isWhite = await this.inviteContract.methods.whiteListed(this.$props.defaultAccount).call()
        let userId
        if (isWhite) {
          this.inviteFlag = true
          userId = await this.inviteContract.methods.userIndex(this.$props.defaultAccount).call()
          this.myInviteCode = this.enCodeID(userId)
          await this.getInviteLength()
          if (this.inviteFlag) {
            await this.getInviteLength()
            this.inviteUrl = `${this.baseUrl}/#/?inviteCode=${this.myInviteCode}`
          }
          return
        }
        var inviter = await this.inviteContract.methods.inviter(this.$props.defaultAccount).call()
        if (inviter === '0x0000000000000000000000000000000000000000') {
          this.inviteFlag = false
        } else {
          this.inviteFlag = true
          userId = await this.inviteContract.methods.userIndex(this.$props.defaultAccount).call()
          this.myInviteCode = this.enCodeID(userId)
        }
        if (this.inviteFlag) {
          await this.getInviteLength()
          this.inviteUrl = `${this.baseUrl}/#/?inviteCode=${this.myInviteCode}`
        }
      } catch (err) {
        console.error(err)
        throw err
      }
    },
    async handleInvite () {
      if (this.inviteLoading) return
      if (this.$props.walletLocked) {
        this.$emit('showBindWallet')
        return
      }
      if (this.inviteCode === '') {
        this.inviteErr = this.$t('invite.invite_code_error_1')
        return
      } else if (!Number.isInteger(this.deCodeID(this.inviteCode))) {
        this.inviteErr = this.$t('invite.invite_code_error_2')
        return
      } else {
        this.inviteErr = ''
      }
      this.inviteLoading = true
      let inviteUser = await this.inviteContract.methods.indexs(this.deCodeID(this.inviteCode)).call()
      await this.inviteContract.methods.setInviteUser(inviteUser).send({
        from: this.$props.defaultAccount
      }, (error, transactionHash) => {
        this.inviteLoading = false
        if (error) {
          console.log(error)
          return false
        }
      })
      await this.checkInviteStatus()
    },
    async getInviteLength () {
      let inviteLen = await this.inviteContract.methods.getInviteCount(this.$props.defaultAccount).call()
      this.inviteLen = inviteLen
    },
    copyInviteCode () {
      let clipboard = new Clipboard('#copy')
      clipboard.on('success', e => {
        this.showCopyTip = true
        setTimeout(() => {
          this.showCopyTip = false
        }, 2000)
        clipboard.destroy()
      })
      clipboard.on('error', e => {
        clipboard.destroy()
      })
    },
    copyShareLink () {
      let clipboard = new Clipboard('#copylink')
      clipboard.on('success', e => {
        this.showCopyLinkTip = true
        setTimeout(() => {
          this.showCopyLinkTip = false
        }, 2000)
        clipboard.destroy()
      })
      clipboard.on('error', e => {
        clipboard.destroy()
      })
    }
  },
  beforeDestroy () {
    this.$EventBus.$off('changeLang')
  }
}
</script>

<style scoped lang="scss">
.invite{
  &-box{
    .invite-code-title{
      font-size: 16px;
      font-weight: 500;
      color: #222222;
      line-height: 16px;
      margin-bottom: 8px;
    }
    .input-box{
      display: flex;
      .invite-code{
        width: 280px;
        height: 40px;
        font-size: 22px;
        line-height: 40px;
        color: #121212;
        border-radius: 8px;
        background-color: #F6F7F9;
        font-weight: 600;
        padding-left: 8px;
        outline-color: invert;
        outline-style: none;
        outline-width: 0px;
        border: none;
        border-style: none;
        text-shadow: none;
        -webkit-appearance: none;
        -webkit-user-select: text;
        outline-color: transparent;
        box-shadow: none;
      }
      .invite-bindbtn{
        width: 138px;
        margin-left: 8px;
        background-color: #2B878C;
        color: #FFFFFF;
        border-radius: 8px;
        height: 40px;
        text-align: left;
        padding: 13px 20px;
        box-sizing: border-box;
        cursor: pointer;
        font-size: 14px;
        line-height: 14px;

        .right {
          width: 12px;
          margin-top: 2px;
          vertical-align: middle;
          float: right;
          height: 12px
        }

        .sellLoading{
          width: 14px;
          height: 14px;
          margin-left: 4px;
        }
      }
    }
    .invite-err{
      color: #EB5654;
      margin-bottom: 0;
      font-size: 14px;
      line-height: 16px;
      height: 16px;
      margin-top: 8px;
    }
    .my-invite{
      display: flex;
      margin-top: 40px;
      width: 100%;
      &.invite-count{
        margin-top: 0;
        .my-invite-count{
          margin-top: 20px;
          font-size: 32px;
          line-height: 32px;
          color: #222222;
          font-weight: 600;
        }
      }
      .invite-left{
        //width: 200px;
        p{
          margin: 0;
          padding: 0;
          display: inline-block;
          width: 100%;
          &.my-invite-code{
            font-size: 32px;
            line-height: 32px;
            font-weight: 600;
            color: #2B878C;
          }
          &.my-invite-code-title, &.my-invite-count-title{
            margin-top: 6px;
            font-weight: 400;
            color: #888888;
            font-size: 16px;
            line-height: 16px;
          }
        }
        .copy-btns{
          margin-top: 10px;
          .copy-btn{
            font-size: 16px;
            margin-top: 10px;
            line-height: 16px;
            font-weight: 400;
            color: #2B878C;
            display: inline-block;
            cursor: pointer;
            padding: 12px 20px;
            border: 1px solid #2B878C;
            border-radius: 8px;
            margin-right: 8px;
            span{
              line-height: 16px;
            }
          }
        }
      }
      .invite-right{
        .invite-qrcode{
          width: 160px;
          height: 160px;
          border-radius: 8px;
          margin-left: 100px;
        }
      }
    }
  }
}
@media screen and (max-width: 1160px) {
  .invite {
    &-box {
      .input-box{
        .invite-code{
          width: 60%;
        }
        .invite-bindbtn{
          width: 36%;
        }
      }
      .my-invite{
        display: inline-block;
        margin-top: 0;
        .invite-right{
          margin-top: 20px;
          .invite-qrcode{
            margin-left: 0;
          }
        }
      }
    }
  }
}
</style>
