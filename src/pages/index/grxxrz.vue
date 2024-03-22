<template>
  <div v-if="hasRZ">
    <h1>您已经通过认证</h1>
  </div>
</template>

<script>
import wjutils from "@/js/WjSmrzUtil";
import { GetToken } from "@/js/until.js";
import {mapActions} from "vuex";

export default {
  data() {
    return {
      hasRZ: false,
    };
  },
  methods: {
    ...mapActions(['getGrxx']),
    /*通过正则获取url中的参数*/
    getUrlParam(name) {
    var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
    var r = window.location.search.substr(1).match(reg);
    if (r != null) return decodeURI(r[2]); return null;
    },
    SetIsLogin(WechatState){
      if (!WechatState) {
        this.hasRZ = true
        return
      }
      this.$post('api/MemberLogin/SetIsLogin',{State:WechatState}).then(res => {
              this.$indicator.close()
              if(res.data.success){
                  this.hasRZ = true;
              }else{
                  this.changtoast(res.data.message,'error')
              }
          })
    }
  },
  created() {
    let that = this
    let initCode = this.$route.params.initcode
    if (initCode) {
        let appid = ''
        let Url = window.location.origin+'/grxxrz'
        let requireUrl = encodeURIComponent(Url)
        if (Url.indexOf('znzwoa') > 0) {
          appid = 'wx7f1250a7fce8cdc2'  //厚实appId
        } else {
          appid = 'wx6b289a6fc760eefc'  //高明通appId 
        }
        let scope = 'snsapi_base'
        window.location.replace(`https://open.weixin.qq.com/connect/oauth2/authorize?appid=${appid}&redirect_uri=${requireUrl}&response_type=code&scope=${scope}&state=${initCode}#wechat_redirect`)
        return
    }
    GetToken(true).then(() => {
      let WechatState = this.getUrlParam('state')
      that.getGrxx(true).then((grxx) => {
        if (grxx.hasWJ && grxx.sfgz) {
          this.$indicator.open('加载中...')
          that.SetIsLogin(WechatState)
        } else {
          if (!grxx.sfgz) {
            WechatState && that.$post('api/MemberLogin/SetIsLogin',{State:WechatState})
            that.$showSubscribe();
          } else {
            WechatState && that.$post('api/MemberLogin/SetIsLogin',{State:WechatState})
            wjutils.gotoSMRZIfNot(that,()=>{
              that.hasRZ=true
            });
          }
        }
      });
    });
  },
};
</script>