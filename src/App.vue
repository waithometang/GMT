<template>
  <!--  @touchmove.prevent -->
  <div id="app">
    <div :class="{ baseTabShow: $route.meta.baseTab }">
      <template v-if="isRouterAlive">
        <keep-alive>
          <router-view v-if="$route.meta.keepAlive" />
        </keep-alive>
        <router-view v-if="!$route.meta.keepAlive" />
      </template>
    </div>
    <!-- 全局加载Loading -->
    <Gmtpopup v-if="GmtpopupState"></Gmtpopup>
    <GmtMessageBox v-if="GmtMessageBox"></GmtMessageBox>
    <publicBaseTab v-if="$route.meta.baseTab" />
  </div>
</template>

<script>
import { WaChatrequireConfig } from "@/js/WaChatrequireConfig";
import { storage, session_Storage } from "@/js/until";
import { mapActions } from "vuex";
import Gmtpopup from '@/components/Gmtpopup';
import GmtMessageBox from '@/components/GmtMessageBox';
import publicBaseTab from '@/components/publicBaseTab';

// 全局监听ios软键盘收起事件
document.body.addEventListener('focusout', () => { //软键盘关闭事件
  var u = navigator.userAgent, app = navigator.appVersion
  var isIOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/) //ios终端
  if (isIOS) {
    window.scrollTo(0, 0) // ios软件键盘收起 页面回弹
  }
})

export default {
  name: "App",
  components: {
    Gmtpopup,
    GmtMessageBox,
    publicBaseTab
  },
  computed: {
    GmtLoadingState () {
      return this.$store.state.GmtLoadingState
    },
    GmtpopupState () {
      return this.$store.state.GmtpopupState
    },
    GmtMessageBox () {
      return this.$store.state.GmtMessageBox
    }
  },
  mounted () {
    let that = this
    that.$store.state.firstEntryUrl = window.location.origin
    this.$nextTick(() => {
      setTimeout(() => {
        let u = navigator.userAgent
        if (!!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/)) {
          WaChatrequireConfig()
        }
      }, 1000)
    })
    // if(window.location.search.indexOf('person=0')===-1) this._GetGrxx()

    //首次进入的url
    // that.$store.state.firstEntryUrl = window.location.origin
    // setTimeout(() => {
    //   // that.$store.state.firstEntryUrl=window.location.origin+window.location.pathname
    //   that.$store.state.firstEntryUrl=window.location.href
    // }, 500);
    // this._GetGrxx()
    if (storage.fetch('longData').data) {
      this.$store.commit('Set_userinfo', storage.fetch('longData').data)
    }
    //监听 hashchange 事件
    window.addEventListener('hashchange', function () {
      //为当前导航页附加一个 tag
      this.history.replaceState('hasHash', '', '');
    }, false);
    window.addEventListener('popstate', function (e) {
      if (e.state) {
        //侦测是用户触发的后退操作, dosomething
        //这里刷新当前 url
        // this.location.reload();
      }
    }, false);
  },
  provide () {
    return {
      reload: this.reload
    }
  },
  data () {
    return {
      isRouterAlive: true,
      sfgz: false
    }
  },
  methods: {
    ...mapActions(['getGrxx', 'GetuserInfo']),
    _GetGrxx () {  //获取实名认证信息
      //根据实名信息的村居来选择当前村居（没有选择当前村居情况下）
      this.getGrxx(true).then(grxx => {
        if (grxx.hasSM && grxx.id) {
          //有通过实名认证
          let data = {
            name: grxx.sscj,
            id: grxx.id,
            type: 1
          }
          if (!grxx.isGwy) {
            storage.save("longData", data)
          }
          this.$store.commit('Set_userinfo', storage.fetch('longData').data)
        }
      })
    },
    reload () {
      this.isRouterAlive = false
      //清空状态管理中数据
      this.$store.state.HeadImageBanner = null
      this.$nextTick(function () {
        this.isRouterAlive = true
      })
    },
    // 获取用户发布权限
    _GetuserInfo () {
      this.GetuserInfo(true).then(rps => { // dyfb lwfb zlfb
        if (rps.dyfb || rps.lwfb || rps.zlfb || rps.zxkhfb) {
          this.showGrxx = true
        } else {
          this.showGrxx = false
        }
      })
    },
  }
};
</script>

<style>
body {
  padding: 0px;
  margin: 0px;
  background: #ffffff;
}
[v-cloak] {
  display: none !important;
}
.baseTabShow {
  padding-bottom: 120px;
}
.bigConfirm .van-dialog__confirm {
  font-weight: 600 !important;
}
.clause .van-dialog__header {
  font-weight: 900 !important;
}
.clause .van-dialog__message {
  text-align: left !important;
}
.clause .van-dialog__message span {
  color: #5dabff;
  cursor: pointer;
}
</style>
