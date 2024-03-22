<!-- 诉求反映 -->
<template>
  <div class="randomlySnapPicture">
    <GmtSelectTab :TabData="structArray" :TabStateData="stateType" @changeTabState="changestateType"></GmtSelectTab>
		<!-- 我的反映 -->
		<Myreflect v-show="stateType == 1" :WaChatConfigData="WaChatConfigData"></Myreflect>
    <!-- 我要反映 -->
    <reflectList v-show="stateType == 0" @GetTab="SetTab" :WaChatConfigData="WaChatConfigData"></reflectList>
    <!-- 企业认证 -->
    <enterpriseCertification  v-if="stateType == 2"></enterpriseCertification>
  </div>
</template>
<script>
import reflectList from '@/components/secondLevelPages/PersonalCenter/reflectList'
import Myreflect from '@/components/secondLevelPages/PersonalCenter/Myreflect_v1'
import GmtSelectTab from '@/components/GmtSelectTab.vue'
import enterpriseCertification from '@/pages/secondLevelPages/PersonalCenter/companiesList'
import BetterScroll from '@/components/BetterScroll'
import {mapActions} from "vuex"
// import { GetWechatConfig } from "@/api/GetWechatConfig";
import { session_Storage } from '@/js/until'

export default {
  components: {
    reflectList,
    Myreflect,
    GmtSelectTab,
    enterpriseCertification,
    BetterScroll
  },
  data() {
    return {
      stateType: 0,
      WaChatConfigData: "",
      // structArray: [{name: '结果查询', type: 0}, {name: '我要反映', type: 1}, {name: '企业认证', type: 2}]
      structArray: [{name: '企业反映', type: 0}, {name: '结果查询', type: 1}]
    };
  },
  computed: {
    state () {
      return this.$route.params.state
    },
    Grxx () {
      return JSON.parse(sessionStorage.getItem('_ss_grxx')) 
    },
    sessionStorage () {
      return session_Storage.fetch('qyTagState').data
    }
  },
  methods: {
    ...mapActions(['getGrxx']),
    changestateType(item){
      this.stateType = item.type
    },
    SetTab (item) {
      this.stateType = item
    },
    // 获取微信sdk 初始化参数
    _GetWechatConfig() {
      var u = navigator.userAgent;
      var isAndroid = u.indexOf("Android") > -1 || u.indexOf("Linux") > -1; //g
      var isIOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/); //ios终端
      let url = "";
      if (isAndroid) {
        url = location.href;
      }
      if (isIOS) {
        url = location.href.split("#")[0];
      }
      GetWechatConfig({
        url: url
      }).then(rps => {
        if (rps.data.success) {
          this.WaChatConfigData = rps.data.content;
        } else {
          this.changtoast(rps.data.message, "error");
        }
      });
    },
    userinfo () {
      this.getGrxx().then(userinfo => {
        console.log(userinfo)
        if (!userinfo.hasQY) {
          let that = this
          this.showConfirm({
            content: {
              name: '提示',
              content: '本功能为企业等市场主体向政府反映企业服务方面的情况，请先进行“企业认证”',
              cancel:'直接反映',
              confirm: '企业认证'
            },
            success: function () {
              that.$router.replace ({
                path: '/enterpriseCertification/1'
              })
              that.$store.commit('Set_GmtpopupState', false)
            },
            fail: function () {
              that.$store.commit('Set_GmtpopupState', false)
            }
          })
        }
      })
    }
  },
beforeRouteEnter (to, from, next) {
    next(vm=>{
      if (from.name==='enterpriseCertification') {
        vm.stateType = 2
      }
      if (!from.name && vm.sessionStorage) {
        vm.stateType = 1
        console.log(1234)
      }
    })
  },
  created () {
    // this._GetWechatConfig()
    if (this.stateType == 0) {
      document.title = '企业反映'
    } else if (this.stateType == 1){
      document.title = '结果查询'
    }else if (this.stateType == 2){
      document.title = '企业认证'
    }
  },
  destroyed () {
    this.$store.commit('Set_GmtpopupState', false)
    if (this.sessionStorage) {
      session_Storage.remove('qyTagState')
    }
  }
};
</script>

<style lang='scss' type="text/css" scoped>
@import "@/style/FirstLevelPage/select.scss";
.randomlySnapPicture {
  .content-list{
    position: absolute;
    top: 90px;
    bottom: 0;
    left: 0;
    right: 0;
    overflow: hidden;
  }
}
</style>