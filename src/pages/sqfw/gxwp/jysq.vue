<template>
  <div class="needPhono">
    <div class="from">
      <div class="label">
        <span class="label_icon">*</span>
        <span class="label_item">选择小屋</span>
      </div>
      <selector
        v-model="xzxw"
        :columns="xzxwArray"
        :readonly="false"
        :required="false"
        placeholder="请选择小屋"
      />
      <div class="label">
        <span class="label_icon">*</span>
        <span class="label_item">物品名称</span>
      </div>
      <selector
        v-model="wpmc"
        :columns="wpmcArray"
        :readonly="wpmcReadonly"
        :required="false"
        placeholder="请选择物品名称"
      />
      <div class="label">
        <span class="label_icon">*</span>
        <span class="label_item">物品分类</span>
      </div>
      <div class="input">
        <input
          type="text"
          v-model="wpfl"
          :readonly="true"
          placeholder="请输入物品分类"
        />
      </div>
      <div class="label">
        <span class="label_icon">*</span>
        <span class="label_item"
          >物品数量<span v-if="sysl !== ''">(剩余{{ sysl }})</span></span
        >
      </div>
      <div class="input">
        <input type="number" v-model="wpsl" placeholder="请输入物品数量" />
      </div>
      <div class="label">
        <span class="label_icon">*</span>
        <span class="label_item">借用时段</span>
      </div>
      <div class="datetime">
        <datetimeSelector type="datetime" v-model="jysd1" :required="false" />
        <div class="zhi">至</div>
        <datetimeSelector type="datetime" v-model="jysd2" :required="false" />
      </div>
      <!-- <div class="split"></div> -->
      <div class="label">
        <span class="label_item">小屋地址</span>
      </div>
      <div class="input">
        <input
          type="text"
          v-model="xwdz"
          placeholder="暂未获取地址"
          :readonly="true"
        />
      </div>
    </div>
    <div class="want-report">
      <van-button
        type="primary"
        size="large"
        color="#56BEF3"
        @click="submit"
        :disabled="sysl === 0 ? true : false"
      >
        <span>提交申请</span>
      </van-button>
    </div>
  </div>
</template>

<script>
import { storage } from "@/js/until"
import { WeChatGetLocation } from "@/js/WeChatGetLocation"
import { WaChatUploadPictures } from "@/js/WaChatUploadPictures"
import { DelUpload } from "@/api/WaChatApi"
import { TxGeocode } from "@/api/secondLevelPages/ruralRevitalization"
import { mapActions } from "vuex"
import BetterScroll from "@/components/BetterScroll"
import TxMap from "@/components/secondLevelPages/ruralRevitalization/TxMap"
import wjutils from "@/js/WjSmrzUtil"
import Selector from "../component/selector"
import datetimeSelector from "../component/datetime"
import { DatetimePicker, Dialog } from "vant"

export default {
  props: ["WaChatConfigData"],
  data() {
    return {
      showPersonal: false,
      showUser: false,
      name: "",
      sqsj: "",
      wpmc: "",
      wpfl: "",
      wpsl: "",
      jysd1: "",
      jysd2: "",
      content: "",
      xzxw: "",
      xwdz: "",
      xwxx: [],
      wpflxx: [],
      wpmcArray: [],
      wpxx: [],
      sysl: "",
      wpmcReadonly: true,
      publicity: false,
      popupVisible: false,
      listData: [],
      address: "",
      siteError: false,
      popupType: 0,
      sqsj: ""
    }
  },
  components: {
    BetterScroll,
    TxMap,
    Selector,
    datetimeSelector,
    DatetimePicker,
    Dialog
  },
  watch: {
    content() {
      if (this.content.length > 100) {
        this.content = this.content.substring(0, 100)
      }
    },
    xzxw(val) {
      this.wpmcReadonly = false
      this.wpmcArray = []
      this.wpmc = ""
      this.wpfl = ""
      var list = {}
      this.xwxx.forEach(element => {
        if (element.xwmc === val) {
          list = element
        }
      })
      this.xwdz = list.xxdz
      this.wpxx = list.wpxx
      list.wpxx.forEach(wpxx => {
        this.wpmcArray.push(wpxx.wpmc)
      })
    },
    wpmc(val) {
      this.wpxx.forEach(element => {
        if (element.wpmc === val) {
          this.wpfl = element.wpfl
          this.sysl = element.sysl
        }
      })
    }
  },
  computed: {
    xzxwArray() {
      var array = []
      this.xwxx.forEach(element => {
        array.push(element.xwmc)
      })
      return array
    },
    longData() {
      return storage.fetch("longData").data
    },
    UploadPicturesSrc() {
      return this.$store.state.UploadPicturesSrc
    },
    UploadPicturesId() {
      return this.$store.state.MainIdData
    },
    WaChetLatitude() {
      return this.$store.state.WaChetLatitude
    },
    WaChetLongitude() {
      return this.$store.state.WaChetLongitude
    }
  },
  destroyed: function () {
    this.$store.commit("SetUploadPicturesSrc", "")
    this.$store.commit("SetMainIdData", "")
  },
  methods: {
    ...mapActions(["getGrxx"]),
    // 提交
    submit() {
      if (this.xzxw == "") {
        this.changtoast("请选择共享小屋！", "warning")
        return
      }
      if (this.wpmc == "") {
        this.changtoast("请输入物品名称！", "warning")
        return
      }
      if (this.wpsl == "") {
        this.changtoast("请输入物品数量！", "warning")
        return
      }
      if (this.wpsl > this.sysl) {
        this.changtoast("物品剩余数量不足！", "warning")
        return
      }
      if (this.jysd1 == "" || this.jysd2 == "") {
        this.changtoast("请选择借用时段！", "warning")
        return
      }
      Dialog.alert({
        message: `<img style="width: 50px;height: 50px;" src="/static/report/cg.png" /><p style="font-weight: bold;font-size: 18px;margin-top:5px;margin-bottom:5px;">提交成功</p><p style="font-size: 13px;margin-bottom:0;">提交成功后，请留意高明通的推送消息</p>`
      }).then(() => {
        this._PublishShot()
      })
    },
    _PublishShot() {
      this.$indicator.open("正在提交数据，请稍等...")
      this.$post("api/PartyBuilding/wpjyfb", {
        wpmc: this.wpmc,
        wpfl: this.wpfl,
        jysl: this.wpsl,
        jyksrq: this.jysd1,
        jyjsrq: this.jysd2,
        gxxw: this.xzxw,
        xxdz: this.xwdz
      }).then(rps => {
        this.$indicator.close()
        if (rps.data.success) {
          this.$store.commit("SetUploadPicturesSrc", "") // 清空记录的图片路径
          this.$store.commit("SetMainIdData", "") // 清空记录的图片id
          this.changtoast("发送成功，等待工作人员处理！", "success")
          this.$store.commit("Set_TopTagState", 1)
          this.$router.push(`/sqfw/gxwp/${this.$route.params.vid}`)
        } else {
          this.MessageBox({
            content: rps.data.message,
            success: function () {},
            failStata: false
          })
        }
      })
    },
    // 选取图片 9张
    UploadPictures() {
      let amount = 9 - this.UploadPicturesSrc.length
      WaChatUploadPictures(this.WaChatConfigData, amount)
    },
    // 删除图片
    remove(item) {
      DelUpload({
        id: item.id
      }).then(rps => {
        if (rps.data.success) {
          this.changtoast("删除成功")
        } else {
          this.changtoast(rps.data.message, "error")
        }
      })
      let newUploadPicturesSrc = this.UploadPicturesSrc.filter(rps => {
        return rps.id != item.id
      })
      this.$store.commit("SetUploadPicturesSrc", newUploadPicturesSrc)
    }
  },

  created() {
    this.$showSubscribe()
    wjutils.gotoSMRZIfNot(this)
    this.$indicator.open("加载中...")
    this.$post("api/PartyBuilding/fllXq").then(res => {
      this.$indicator.close()
      if (res.data.success) {
        this.xwxx = res.data.content.xwmcList
        if (Object.keys(this.$route.query).length !== 0) {
          this.xzxw = this.$route.query.gxxw
          setTimeout(() => {
            this.wpmc = this.$route.query.wpmc
          }, 100)
        }
      } else {
        this.changtoast(res.data.message, "error")
      }
    })
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
