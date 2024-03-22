<template>
  <div class="needPhono">
    <div class="from">
      <div class="label">
        <span class="label_icon">*</span>
        <span class="label_item">物品名称</span>
      </div>
      <div class="input">
        <input
          type="text"
          v-model="wpmc"
          placeholder="请输入物品名称(10字以内)"
        />
      </div>
      <div class="label">
        <span class="label_icon">*</span>
        <span class="label_item">物品分类</span>
      </div>
      <selector
        v-model="wpfl"
        :columns="wpflxx"
        :readonly="false"
        :required="false"
        placeholder="请选择物品分类"
      />
      <div class="label">
        <span class="label_icon">*</span>
        <span class="label_item">是否需要归还</span>
      </div>
      <selector
        v-model="sfxygh"
        :columns="['是', '否']"
        :readonly="false"
        :required="false"
        placeholder="请选择是否需要归还"
      />
      <div class="label">
        <span class="label_icon">*</span>
        <span class="label_item">共享数量</span>
      </div>
      <div class="input">
        <input type="number" v-model="gxsl" placeholder="请输入共享数量" />
      </div>
      <div class="label">
        <span class="label_icon">*</span>
        <span class="label_item">共享时段</span>
      </div>
      <div class="datetime">
        <datetimeSelector type="datetime" v-model="gxsd1" :required="false" />
        <div class="zhi">至</div>
        <datetimeSelector type="datetime" v-model="gxsd2" :required="false" />
      </div>
      <div class="label">
        <span class="label_icon">*</span>
        <span class="label_item">物品描述</span>
      </div>
      <div class="textImages">
        <div class="text">
          <textarea placeholder="请输入物品描述" v-model="content"></textarea>
          <div class="tost">{{ content.length }}/100</div>
        </div>
        <div class="images">
          <ul>
            <li v-for="(item, index) in UploadPicturesSrc" :key="index">
              <img :src="item.src" />
              <div class="cloes" @click="remove(item)">
                <img src="/static/img_close.png" />
              </div>
            </li>
            <li @click="UploadPictures" v-if="UploadPicturesSrc.length < 9">
              <img src="/images/add.png" />
            </li>
            <div style="clear: both"></div>
          </ul>
        </div>
      </div>
      <div class="split"></div>
      <div class="label">
        <span class="label_icon">*</span>
        <span class="label_item">选择小屋</span>
      </div>
      <selector
        v-model="xzxw"
        :columns="xzxwArray"
        :readonly="false"
        :required="false"
      />
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
      <van-button type="primary" size="large" color="#56BEF3" @click="submit">
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
      sfxygh: "",
      gxsl: "",
      gxsd1: "",
      gxsd2: "",
      content: "",
      xzxw: "",
      xwdz: "",
      xwxx: [],
      wpflxx: [],
      publicity: false,
      popupVisible: false,
      listData: [],
      address: "",
      siteError: false,
      popupType: 0,
      sqsj: "",
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
      var list = {}
      this.xwxx.forEach(element => {
        if (element.xwmc === val) {
          list = element
        }
      })
      this.xwdz = list.xxdz
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
      if (this.wpmc == "") {
        this.changtoast("请输入物品名称！", "warning")
        return
      }
      if (this.wpmc.length>10) {
        this.changtoast("物品名称要10个字以内！", "warning")
        return
      }
      if (this.wpfl == "") {
        this.changtoast("请选择物品分类！", "warning")
        return
      }
      if (this.sfxygh == "") {
        this.changtoast("请选择是否需要归还！", "warning")
        return
      }
      if (this.gxsl == "") {
        this.changtoast("请输入共享数量！", "warning")
        return
      }
      if (this.gxsd1 == "" || this.gxsd2 == "") {
        this.changtoast("请选择共享时段！", "warning")
        return
      }
      if (this.content == "") {
        this.changtoast("请输入物品描述！", "warning")
        return
      }
      if (this.xzxw == "") {
        this.changtoast("请选择共享小屋！", "warning")
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
      this.$post("api/PartyBuilding/gxsqfb", {
        wpmc: this.wpmc,
        wpfl: this.wpfl,
        xygh: this.sfxygh,
        gxsl: this.gxsl,
        gxksrq: this.gxsd1,
        gxjsrq: this.gxsd2,
        wpms: this.content,
        MainId: this.UploadPicturesId,
        gxxw: this.xzxw,
        xxdz: this.xwdz,
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
    },
  },

  created() {
    this.$showSubscribe();
    wjutils.gotoSMRZIfNot(this)
    this.$indicator.open("加载中...")
    this.$post("api/PartyBuilding/fllXq").then(res => {
      this.$indicator.close()
      if (res.data.success) {
        this.xwxx = res.data.content.xwmcList
        this.wpflxx = res.data.content.wpflList
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
