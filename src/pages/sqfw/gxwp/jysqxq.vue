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
            <input type="text" v-model="listData.wpfl" />
          </div>
          <div class="label">
            <span class="label_icon">*</span>
            <span class="label_item">物品数量</span>
          </div>
          <div class="input">
            <input type="text" v-model="listData.jysl" />
          </div>
          <div class="label">
            <span class="label_icon">*</span>
            <span class="label_item">借用时段</span>
          </div>
          <div class="datetime noborder">
            <datetimeSelector
              type="datetime"
              v-model="listData.jyksrq"
              :required="false"
            />
            <div class="zhi">至</div>
            <datetimeSelector
              type="datetime"
              v-model="listData.jyjsrq"
              :required="false"
            />
          </div>
          <div class="split"></div>
          <div class="label">
            <span class="label_icon">*</span>
            <span class="label_item">选择小屋</span>
          </div>
          <div class="input">
            <input type="text" v-model="listData.gxxw" />
          </div>
          <div class="label">
            <span class="label_item">小屋地址</span>
          </div>
          <div class="input">
            <input type="text" v-model="listData.xxdz" />
          </div>
        </div>
        <div class="want-report" v-if="listData.yhghzt">
          <van-button
            type="primary"
            size="large"
            color="#56BEF3"
            @click="revert"
          >
            <span>我要归还</span>
          </van-button>
        </div>
      </template>
    </BetterScroll>
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
import { DatetimePicker } from "vant"
import { Dialog } from "vant"

export default {
  props: ["WaChatConfigData"],
  data () {
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
      publicity: false,
      popupVisible: false,
      listData: [],
      address: "",
      siteError: false,
      popupType: 0,
      state: false,
      picture: [
        {
          src: require("../images/webp.webp.jpg")
        },
        {
          src: require("../images/webp.webp.jpg")
        },
        {
          src: require("../images/webp.webp.jpg")
        },
        {
          src: require("../images/webp.webp.jpg")
        },
        {
          src: require("../images/webp.webp.jpg")
        }
      ]
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
    content () {
      if (this.content.length > 100) {
        this.content = this.content.substring(0, 100)
      }
    }
  },
  computed: {
    longData () {
      return storage.fetch("longData").data
    },
    UploadPicturesSrc () {
      return this.$store.state.UploadPicturesSrc
    },
    UploadPicturesId () {
      return this.$store.state.MainIdData
    },
    WaChetLatitude () {
      return this.$store.state.WaChetLatitude
    },
    WaChetLongitude () {
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
    submit () {
      // if (this.wpmc == "") {
      //   this.changtoast("请输入物品名称！", "warning")
      //   return
      // }
      // if (this.wpfl == "") {
      //   this.changtoast("请选择物品分类！", "warning")
      //   return
      // }
      // if (this.gxsd1 == "" || this.gxsd2 == "") {
      //   this.changtoast("请选择共享时段！", "warning")
      //   return
      // }
      // if (this.content == "") {
      //   this.changtoast("请输入物品描述！", "warning")
      //   return
      // }
      // if (this.xzxw == "") {
      //   this.changtoast("请选择共享小屋！", "warning")
      //   return
      // }
      // let mess
      // if (this.phone) {
      //   mess = "是否确认发送环境黑点随手拍，发送后内容则不可修改"
      // } else {
      //   mess =
      //     "本次随手拍没有填写联系手机，工作人员将无法对随手拍进行进一步的沟通了解，可能导致问题无法办理成功，是否还继续提交？"
      // }
      // const img = require("../images/借用申请.png")
      // let that = this
      // this.$dialog({
      //   message: '<img style="width:100px;height:100px;" src="' + img + '">'
      // })
      Dialog.alert({
        message: `<img style="width: 50px;height: 50px;" src="/static/report/cg.png" /><p style="font-weight: bold;font-size: 18px;margin-top:5px;margin-bottom:5px;">提交成功</p><p style="font-size: 13px;margin-bottom:0;">提交成功后，请留意高明通的推送消息</p>`
      }).then(() => {
        this._PublishShot()
      })
    },
    _PublishShot () {
      this.$indicator.open("正在提交数据，请稍等...")
      this.$post("api/mlgm/jbhjhd", {
        title: this.content,
        name: this.name,
        Mobile: this.phone,
        villageId: this.longData.id,
        mainId: this.UploadPicturesId,
        lat: this.WaChetLatitude,
        lng: this.WaChetLongitude,
        isAll: false,
        Addr: this.address
      }).then(rps => {
        this.$indicator.close()
        if (rps.data.success) {
          this.$store.commit("SetUploadPicturesSrc", "") // 清空记录的图片路径
          this.$store.commit("SetMainIdData", "") // 清空记录的图片id
          this.changtoast("发送成功，等待工作人员处理！", "success")
          this.$store.commit("Set_TopTagState", 1)
          // this.$router.go(-1)
          this.$router.push({
            name: "mlgmjbhjhd",
            params: {
              id: 2
            }
          })
        } else {
          this.MessageBox({
            content: rps.data.message,
            success: function () { },
            failStata: false
          })
        }
      })
    },
    // 选取图片 9张
    UploadPictures () {
      let amount = 9 - this.UploadPicturesSrc.length
      WaChatUploadPictures(this.WaChatConfigData, amount)
    },
    _popupVisible (item) {
      if (item === 1) {
        if (!this.WaChetLatitude && !this.WaChetLongitude) {
          return
        }
      }
      this.popupType = item
      this.popupVisible = true
    },
    // 重新获取位置
    shuaxin () {
      this.address = ""
      WeChatGetLocation(this.WaChatConfigData, this)
    },
    // 删除图片
    remove (item) {
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
    Set_address (item) {
      ; (this.address = item.title), (this.popupVisible = false)
    },
    getTxMAP (item) {
      this.address = item.poiname
      this.popupVisible = false
    },
    getLoca () {
      WeChatGetLocation(this.WaChatConfigData, this)
      this.getGrxx().then(Grxx => {
        if (Grxx.hasSM) {
          this.name = Grxx.mz
          this.phone = Grxx.tel
        }
      })
    },
    showProtocol () {
      setTimeout(() => {
        document
          .getElementById("grzcD")
          .addEventListener("click", this.showGrzc)
        document
          .getElementById("fwzcD")
          .addEventListener("click", this.showYhzc)
      }, 1000)
      this.$dialog
        .confirm({
          title: "温馨提示",
          message:
            '&emsp;&emsp;感谢你信任并使用“高明通”综合服务平台，根据相关法律法规，我们将在充分保障您的知情权且获得您的明确授权后收集、使用您的个人信息。<br>&emsp;&emsp;请您务必仔细阅读<span id="grzcD">《个人信息保护政策》</span>和<span id="fwzcD">《用户服务协议》</span>，并确保您已全部了解关于您个人信息的收集使用规则。',
          confirmButtonText: "同意",
          confirmButtonColor: "#5DABFF",
          className: "bigConfirm clause",
          cancelButtonText: "暂不同意"
        })
        .then(() => {
          localStorage.setItem("readprotocol", "1")
          this.getLoca()
        })
        .catch(() => {
          window.location.href = "/randomlySnapPicture/1"
        })
    },
    showGrzc () {
      this.showPersonal = true
    },
    showYhzc () {
      this.showUser = true
    },
    revert () {
      this.$indicator.open('加载中...')
      this.$post('api/PartyBuilding/wpjyGhqr', { id: this.$route.params.id }).then(res => {
        this.$indicator.close()
        if (res.data.success) {
          this.$router.push(`/sqfw/gxwp/${this.$route.query.vid}`)
        } else {
          this.changtoast(res.data.message, 'error')
        }
      })
    }
  },
  created () {
    this.$indicator.open("加载中...")
    this.$post("api/PartyBuilding/wpjyXq", { id: this.$route.params.id }).then(
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
@import '../style/wyfb.scss';
@import '@/style/components/secondLevelPages/ruralRevitalization/needPhono.scss';
.bigConfirm {
  /deep/ .van-dialog__message {
    text-align: left !important;
    span {
      color: #5dabff;
      cursor: pointer;
    }
  }
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
