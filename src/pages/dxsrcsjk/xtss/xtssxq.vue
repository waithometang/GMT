<template>
  <div class="container">
    <div class="content">
      <!-- <p class="title">{{ data.zt }}招聘</p> -->
      <div class="content_item">
        <span class="label">姓名：</span>
        <span class="item">{{ data.xm }}</span>
      </div>
      <div class="content_item">
        <span class="label">联系方式：</span>
        <span class="item">{{ data.lxdh }}</span>
      </div>
    </div>
    <div class="information">
      <p class="label">申述内容：</p>
      <p class="item" v-html="data.nr"></p>
    </div>
    <div class="icon">
      <div
        class="images"
        @click="lookOver(item, data.file_urls)"
        v-for="(item, index) in data.file_urls"
        :key="index"
      >
        <img :src="item" />
      </div>
    </div>
  </div>
</template>
<script>
import { WcChatPreviewImage } from "@/js/WeChatpreviewImage"
import { GetWechatConfig } from "@/api/GetWechatConfig"
export default {
  data() {
    return {
      data: {},
      WaChatConfigData: ""
    }
  },
  methods: {
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
    // 查看照片
    lookOver(item, data) {
      let url = "http://gmt.gaoming.gov.cn" + item
      let datas = []
      for (let index = 0; index < data.length; index++) {
        const element = data[index]
        let str = "http://gmt.gaoming.gov.cn" + element
        datas.push(str)
      }
      WcChatPreviewImage(url, datas, this.WaChatConfigData)
    }
  },
  created() {
    this._GetWechatConfig()
    this.$indicator.open("加载中...")
    this.$post("api/Zx/dxsXtssList", {
      xq: true,
      id: this.$route.params.id
    }).then(res => {
      this.$indicator.close()
      if (res.data.success) {
        this.data = res.data.content
      } else {
        this.changtoast(res.data.message, "error")
      }
    })
  }
}
</script>
<style lang="scss" scoped>
@import "./style/xtssxq.scss";
</style>