<template>
  <div class="needPhono">
    <BetterScroll>
      <template slot="BetterScroll">
        <div class="from">
          <span class="wait" v-if="listData.shzt === '待审核'">待审核</span>
          <span class="adopt" v-if="listData.shzt === '审核通过'"
            >审核通过</span
          >
          <span class="no_adopt" v-if="listData.shzt === '审核不通过'"
            >审核不通过</span
          >
          <div class="label">
            <span class="label_icon">*</span>
            <span class="label_item">申请人</span>
          </div>
          <div class="input">
            <input type="text" v-model="listData.sqry" :readonly="true" />
          </div>
          <div class="label">
            <span class="label_icon">*</span>
            <span class="label_item">申请时间</span>
          </div>
          <div class="input">
            <input type="text" v-model="listData.sqsj" :readonly="true" />
          </div>
          <div class="label">
            <span class="label_icon">*</span>
            <span class="label_item">物品名称</span>
          </div>
          <div class="input">
            <input type="text" v-model="listData.wpmc" :readonly="true" />
          </div>
          <div class="label">
            <span class="label_icon">*</span>
            <span class="label_item">物品分类</span>
          </div>
          <div class="input">
            <input type="text" v-model="listData.wpfl" :readonly="true" />
          </div>
          <div class="label">
            <span class="label_icon">*</span>
            <span class="label_item">是否需要归还</span>
          </div>
          <div class="input">
            <input type="text" v-model="listData.xygh" :readonly="true" />
          </div>
          <div class="label">
            <span class="label_icon">*</span>
            <span class="label_item">共享数量</span>
          </div>
          <div class="input">
            <input type="text" v-model="listData.gxsl" :readonly="true" />
          </div>
          <div class="label">
            <span class="label_icon">*</span>
            <span class="label_item">物品分类</span>
          </div>
          <div class="input">
            <input type="text" v-model="listData.wpfl" :readonly="true" />
          </div>
          <div class="label">
            <span class="label_icon">*</span>
            <span class="label_item">共享时段</span>
          </div>
          <div class="datetime">
            <datetimeSelector
              type="datetime"
              v-model="listData.gxksrq"
              :required="false"
              :readonly="true"
            />
            <div class="zhi">至</div>
            <datetimeSelector
              type="datetime"
              v-model="listData.gxjsrq"
              :required="false"
              :readonly="true"
            />
          </div>
          <div class="label">
            <span class="label_icon">*</span>
            <span class="label_item">物品描述</span>
          </div>
          <div class="input">
            <span class="textarea">{{ listData.wpms }}</span>
          </div>
          <div class="images">
            <ul>
              <li
                v-for="(item, index) in listData.file_urls"
                :key="index"
                @click="lookOver(item, listData.file_urls)"
              >
                <img :src="item" />
              </li>
              <div style="clear: both"></div>
            </ul>
          </div>
          <div class="split"></div>
          <div class="label">
            <span class="label_icon">*</span>
            <span class="label_item">选择小屋</span>
          </div>
          <div class="input">
            <input type="text" v-model="listData.gxxw" :readonly="true" />
          </div>
          <div class="label">
            <span class="label_item">小屋地址</span>
          </div>
          <div class="input">
            <input type="text" v-model="listData.xxdz" :readonly="true" />
          </div>
        </div>
      </template>
    </BetterScroll>
  </div>
</template>

<script>
import BetterScroll from "@/components/BetterScroll"
import Selector from "../component/selector"
import datetimeSelector from "../component/datetime"
import { WcChatPreviewImage } from "@/js/WeChatpreviewImage"
import { GetWechatConfig } from "@/api/GetWechatConfig"
export default {
  data() {
    return {
      listData: {},
      WaChatConfigData: ""
    }
  },
  components: {
    BetterScroll,
    Selector,
    datetimeSelector
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
    this.$post("api/PartyBuilding/gxsqXq", { id: this.$route.params.id }).then(
      res => {
        this.$indicator.close()
        if (res.data.success) {
          this.listData = res.data.content
        } else {
          this.changtoast(res.data.message, "error")
        }
      }
    )
  }
}
</script>

<style lang='scss' type="text/css" scoped>
@import "../style/wyfb.scss";
@import "@/style/components/secondLevelPages/ruralRevitalization/needPhono.scss";
.bigConfirm {
  /deep/ .van-dialog__message {
    text-align: left !important;
    span {
      color: #5dabff;
      cursor: pointer;
    }
  }
}
.textarea {
  width: 100%;
  font-size: 28px;
  font-weight: 400;
  color: #333333;
}
.wait {
  font-size: 28px;
  font-weight: bold;
  color: #898989;
}

.adopt {
  font-size: 28px;
  font-weight: bold;
  color: #56bef3;
}

.no_adopt {
  font-size: 28px;
  font-weight: bold;
  color: #d8392f;
}
/deep/ .van-cell,
.van-cell--clickable,
.van-field {
  padding: 0;
}
/deep/ .van-field__control {
  font-size: 28px;
}
/deep/ .van-hairline--bottom {
  display: none;
}
</style>
