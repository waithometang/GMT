<template>
  <div class="randomlySnapPicture">
    <div class="select">
      <div
        @click="changeState(item.state)"
        :class="{ cor1: tagState === item.state }"
        v-for="(item, index) in tagData"
        :key="index"
      >
        {{ item.name }}
      </div>
    </div>
    <div class="need-list">
      <randomly-snap-picture-list
        :stateType="tagState"
        v-if="tagState !== 3"
        :WaChatConfigData="WaChatConfigData"
      ></randomly-snap-picture-list>
      <want-to-release
        v-else
        :WaChatConfigData="WaChatConfigData"
        @changeState="SetState"
      ></want-to-release>
    </div>
  </div>
</template>
<script>
import randomlySnapPictureList from "../component/appeal"
import wantToRelease from "./wyfb"
import { GetWechatConfig } from "@/api/GetWechatConfig"
import { storage } from "@/js/until"

export default {
  components: {
    randomlySnapPictureList,
    wantToRelease
  },
  data() {
    return {
      tagState: 1,
      shoaPage: false,
      WaChatConfigData: "",
      tagData: [
        { name: "需求发布", state: 1 },
        { name: "我的发布", state: 2 },
        { name: "我要发布", state: 3 }
      ]
    }
  },
  computed: {
    longData() {
      return storage.fetch("longData").data
    },
    state() {
      return parseInt(this.$route.params.state)
    }
  },
  methods: {
    changeState(item) {
      this.tagState = item
      switch (item) {
        case 1:
          document.title = "需求发布"
          break
        case 2:
          document.title = "我的发布"
          break
        case 3:
          document.title = "我要发布"
          break
        default:
          break
      }
    },
    // 获取微信sdk 初始化参数
    _GetWechatConfig() {
      var u = navigator.userAgent
      var isAndroid = u.indexOf("Android") > -1 || u.indexOf("Linux") > -1 //g
      var isIOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/) //ios终端
      let url = ""
      if (isAndroid) {
        url = location.href
      }
      if (isIOS) {
        url = location.href.split("#")[0] //hash后面的部分如果带上ios中config会不对
      }
      GetWechatConfig({
        url: url
      }).then(rps => {
        if (rps.data.success) {
          this.WaChatConfigData = rps.data.content
        } else {
          this.changtoast(rps.data.message, "error")
        }
      })
    },
    SetState(item) {
      this.stateType = item
    },
    // 判断是否有实名认证
    SetGrxx() {
      let that = this
      let Grxx = JSON.parse(sessionStorage.getItem("_ss_grxx"))
      let content =
        Grxx.smrzzt === "认证中" ? "实名认证中,请等待" : "请先实名认证"
      let cancel = Grxx.smrzzt === "认证中" ? "返 回" : "取消"
      let confirm = Grxx.smrzzt === "认证中" ? "查看详情" : "确认"
      if (!Grxx.hasSM) {
        if (Grxx.smrzzt === "认证中") {
          that.changtoast("认证审核中")
          that.$router.replace({
            path: "/Certification"
          })
          return
        }
        this.showConfirm({
          content: {
            name: "提示",
            content: content,
            cancel: cancel,
            confirm: confirm
          },
          success: function () {
            that.$router.replace({
              path: "/Certification"
            })
            that.$store.commit("Set_GmtpopupState", false)
          },
          fail: function () {
            that.$store.commit("Set_GmtpopupState", false)
            that.$router.replace({
              path: "/index"
            })
          }
        })
      }
    }
  },
  created() {
    this._GetWechatConfig()
    this.tagState = 1
    switch (this.state) {
      case 1:
        document.title = "需求发布"
        break
      case 2:
        document.title = "我的发布"
        break
      case 3:
        document.title = "我要发布"
        break
      default:
        break
    }
  },
  destroyed() {
    this.$store.commit("Set_GmtpopupState", false)
  },
  beforeRouteEnter(to, from, next) {
    next(vm => {
      if (from.name === "evaluate") {
        vm.$store.commit("Set_TopTagState", 1)
      }
      vm.shoaPage = true
    })
  }
}
</script>

<style lang='scss' type="text/css" scoped>
@import "@/style/FirstLevelPage/select.scss";
@import "@/style/pages/secondLevelPages/ruralRevitalization/randomlySnapPicture.scss";
.randomlySnapPicture {
  .need-list {
    position: absolute;
    top: 90px;
    bottom: 0;
    left: 0;
    right: 0;
    overflow: hidden;
  }
}
</style>