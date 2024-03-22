<template>
  <div class="qrlogin">
    <div class="sqdl" v-if="hasSM">
      <div class="img">
        <img src="./image/授权.png" alt=""/>
      </div>
      <div class="title">即将授权登录第三方平台</div>
      <div class="btns">
        <div class="btn" @click="SetIsLogin(true)">登录</div>
        <div class="btn" @click="SetIsLogin(false)">取消</div>
      </div>
    </div>
    <div class="xxrz" v-else>
      <div class="img">
        <img src="./image/警告.png" alt=""/>
      </div>
      <div class="title">抱歉，您未进行实名认证，请实名认证后再登录</div>
      <div class="btns">
        <div class="btn" @click="tosmrz">前往认证个人信息</div>
      </div>
    </div>
  </div>
</template>
<script>
import wjutils from "@/js/WjSmrzUtil"
import {storage} from "@/js/until";
import { GetToken } from "@/js/until.js";
import {mapActions} from 'vuex'
import wx from 'weixin-js-sdk'

export default {
  data() {
    return {
      state:'',
      hasSM: true, // 是否实名
      callback_url:''
    }
  },
  created() {
    let that = this
    this.state = this.$route.params.state
    this.callback_url = this.getUrlParam('callback_url')
    if (this.state) {
      let appid = window.location.origin.indexOf('znzwoa') > 0 ? 'wx7f1250a7fce8cdc2' : 'wx6b289a6fc760eefc';
      let requireUrl = encodeURIComponent(window.location.origin+'/qrlogin')
      let scope = 'snsapi_base'
      window.location.replace(`https://open.weixin.qq.com/connect/oauth2/authorize?appid=${appid}&redirect_uri=${requireUrl}&response_type=code&scope=${scope}&state=${this.state+'|'+this.callback_url}#wechat_redirect`)
      return
    }
    GetToken(true).then(() => {
      let  arr = decodeURIComponent(this.getUrlParam('state')).split('|');
      that.state = arr[0]
      arr.length > 1 && (that.callback_url = arr[1])
      that.$showSubscribe().then(grxx =>{
        that.hasSM = grxx.hasSM
      })
    });
  },
  methods: {
    ...mapActions(['getGrxx']),
    getUrlParam(name) {
      var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
      var r = window.location.search.substr(1).match(reg);
      if (r != null) return decodeURI(r[2]); return null;
    },
    SetIsLogin(rst){
      let that = this
      if(rst) {
        this.$post('api/qrlogin/SetIsLogin', {State: this.state}).then(rps => {
          this.changtoast(rps.data.message,rps.data.message !='登录成功' ? "error":null);
          rps.data.message == '登录成功' && setTimeout(() => {
            that.callback_url ? (window.location.href=that.callback_url) : wx.closeWindow();
          },2000)
        });
      }else {
        wx.closeWindow();
      }
    },
    tosmrz() {
      storage.save('path', this.$route.fullPath);
      wjutils.gotoSMRZ(this, 'http://gmt.gaoming.gov.cn/smrz');
    }
  },
}
</script>

<style lang='scss' scoped>
@import './style/index.scss';
</style>
