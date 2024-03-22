<template>
  <div class="needPhono">
    <BetterScroll>
      <template slot="BetterScroll">
        <div class="from">
          <div class="label">
            <span class="label_icon">*</span>
            <span class="label_item">发布人</span>
          </div>
          <div class="input">
            <input type="text" v-model="name" placeholder="请输入发布人姓名" />
          </div>
          <div class="label">
            <span class="label_icon">*</span>
            <span class="label_item">联系电话</span>
          </div>
          <div class="input">
            <input type="number" v-model="phone" placeholder="请输入联系电话" />
          </div>
          <div class="label">
            <span class="label_icon">*</span>
            <span class="label_item">需求主题</span>
          </div>
          <selector
            v-model="theme"
            :columns="[
              '志愿服务',
              '扶贫助困(微心愿)',
              '健康卫生',
              '和睦邻里',
              '环境整治',
              '文体活动',
              '政策宣传',
              '知识讲座',
              '其他'
            ]"
            :readonly="false"
            :required="false"
            placeholder="请选择需求主题"
          />
          <div class="label">
            <span class="label_item">有效时间</span>
          </div>
          <div class="datetime">
            <datetimeSelector
              type="datetime"
              v-model="yxsj1"
              :required="false"
            />
            <div class="zhi">至</div>
            <datetimeSelector
              type="datetime"
              v-model="yxsj2"
              :required="false"
            />
          </div>
          <div class="label">
            <span class="label_icon">*</span>
            <span class="label_item">求助描述</span>
          </div>
          <div class="textImages">
            <div class="text">
              <textarea
                placeholder="请输入求助描述"
                v-model="content"
              ></textarea>
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
        </div>
        <div class="stie-list">
          <div class="list-li list-li-action">
            <div class="li_left" @click="_popupVisible(1)">
              <img src="/images/weizhi.png" alt />
              <span>{{ address ? address : "正在获取位置" }}</span>
            </div>
            <div class="li_middle" @click="shuaxin()">
              <img src="/images/shuaxin.png" alt />
            </div>
            <div class="li_middle" @click="_popupVisible(1)">
              <img src="/images/more.png" alt />
            </div>
          </div>
          <!-- <div class="list-li" @click="_popupVisible(2)">
            <img class="list-li-icon" src="/images/renwu.png" alt />
            <div class="list-li-content">{{Opentitle}}</div>
            <img class="list-li-icon" src="/images/more.png" alt />
          </div>-->
        </div>
        <div class="want-report">
          <van-button
            type="primary"
            size="large"
            color="#56BEF3"
            @click="submit"
          >
            <span>提交</span>
          </van-button>
        </div>
      </template>
    </BetterScroll>
    <mt-popup v-model="popupVisible" position="bottom">
      <TxMap v-if="popupType == 1" @setTxMAP="getTxMAP" />
    </mt-popup>
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

export default {
  props: ["WaChatConfigData"],
  data() {
    return {
      showPersonal: false,
      showUser: false,
      name: "",
      phone: "",
      theme: "",
      yxsj1: "",
      yxsj2: "",
      content: "",
      publicity: false,
      popupVisible: false,
      listData: [],
      address: "",
      siteError: false,
      popupType: 0
    }
  },
  components: {
    BetterScroll,
    TxMap,
    Selector,
    datetimeSelector,
    DatetimePicker
  },
  watch: {
    content() {
      if (this.content.length > 100) {
        this.content = this.content.substring(0, 100)
      }
    }
  },
  computed: {
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
      if (this.name == "") {
        this.changtoast("请输入发布人姓名！", "warning")
        return
      }
      if (!/^1[3456789]\d{9}$/.test(this.phone)) {
        if (this.phone) {
          this.changtoast("手机号码有误！", "warning")
        } else {
          this.changtoast("请输入手机号码！", "warning")
        }
        return
      }
      if (this.theme == "") {
        this.changtoast("请选择需求主题！", "warning")
        return
      }
      if (this.content == "") {
        this.changtoast("请输入求助描述！", "warning")
        return
      }
      let that = this
      this.$dialog
        .confirm({
          title: "您的需求发布已提交成功！",
          message: "请等待后台审核！",
          confirmButtonText: "确定",
          cancelButtonText: "取消"
        })
        .then(() => {
          this._PublishShot()
        })
        .catch(() => {})
    },
    _PublishShot() {
      this.$indicator.open("正在提交数据，请稍等...")
      this.$post("api/PartyBuilding/sqxqfb", {
        fbry: this.name,
        lxdh: this.phone,
        lb: this.theme,
        yxksrq: this.yxsj1,
        yxjsrq: this.yxsj2,
        xqms: this.content,
        qzdd: this.address,
        MainId: this.UploadPicturesId,
        lat: this.WaChetLatitude,
        lng: this.WaChetLongitude,
        isAll: false
      }).then(rps => {
        this.$indicator.close()
        if (rps.data.success) {
          this.$store.commit("SetUploadPicturesSrc", "") // 清空记录的图片路径
          this.$store.commit("SetMainIdData", "") // 清空记录的图片id
          this.changtoast("提交成功，等待工作人员处理！", "success")
          this.$store.commit("Set_TopTagState", 1)
          // this.$router.go(-1)
          this.$router.go(0)
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
    _popupVisible(item) {
      if (item === 1) {
        if (!this.WaChetLatitude && !this.WaChetLongitude) {
          return
        }
      }
      this.popupType = item
      this.popupVisible = true
    },
    // 重新获取位置
    shuaxin() {
      this.address = ""
      WeChatGetLocation(this.WaChatConfigData, this)
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
    Set_address(item) {
      ;(this.address = item.title), (this.popupVisible = false)
    },
    getTxMAP(item) {
      this.address = item.poiname
      this.popupVisible = false
    },
    getLoca() {
      WeChatGetLocation(this.WaChatConfigData, this)
      this.getGrxx().then(Grxx => {
        if (Grxx.hasSM) {
          this.name = Grxx.mz
          this.phone = Grxx.tel
        }
      })
    },
    showProtocol() {
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
    showGrzc() {
      this.showPersonal = true
    },
    showYhzc() {
      this.showUser = true
    }
  },

  // 初始化获取经纬度
  created() {
    this.$showSubscribe()
    // this.$indicator.open('加载中...')
    // this.$showSubscribe().then(() => {
    //   wjutils.gotoSMRZIfNotInModual(this, "csbm1026").then(() => {
    //     if (window.location.search) {
    //       window.location.href = window.location.origin + window.location.pathname
    //     }
    //   })
    // });
    wjutils.gotoSMRZIfNot(this)
    this.getLoca()
    this.shuaxin()
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
