<!-- 我要举报 -->
<template>
  <div class="needPhono">
    <BetterScroll>
      <template slot="BetterScroll">
        <div class="from">
          <div class="input">
            <input type="text" v-model="name" placeholder="请输入你的姓名 (可不填)" />
            <div class="tost" v-if="name">(可不填)</div>
          </div>
          <div class="input">
            <input type="number" v-model="phone" placeholder="请输入你的手机号码 (必填)" />
            <div class="tost" v-if="phone">(必填)</div>
          </div>
        </div>
        <div class="textImages">
          <div class="text">
            <textarea placeholder="请输入环境黑点情况说明" v-model="content"></textarea>
            <div class="tost">{{content.length}}/200</div>
          </div>
          <div class="images">
            <ul>
              <li v-for="(item, index) in UploadPicturesSrc" :key="index" >
                <img :src="item.src" />
                <div class="cloes" @click="remove(item)">
                  <img src="/static/img_close.png" />
                </div>
              </li>
              <li @click="UploadPictures" v-if="UploadPicturesSrc.length < 9">
                <img src="/images/add.png" />
              </li>
              <div style="clear:both;"></div>
            </ul>
          </div>
        </div>
        <div class="stie-list">
          <div class="list-li list-li-action">
            <div class="li_left" @click="_popupVisible(1)">
              <img src="/images/weizhi.png" alt />
              <span>{{address ? address : '正在获取位置'}}</span>
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
        <div class="tips">
            &emsp;&emsp;<van-icon name="warning" />&nbsp;亲爱的市民，“环境黑点”随手拍的范围是精品路线路边环境和区内三沿一口区域，如高速路边、高速路出入口周边、省道、国道、县道路边和景区的周边区域，请各位市民在指定区域内拍摄环境黑点投稿，谢谢合作。
        </div>
        <div class="want-report">
          <van-button round type="info" size="large" color="rgba(255, 219, 37, 1)" @click="submit">
            <span>提交随手拍</span>
          </van-button>
        </div>
      </template>
    </BetterScroll>
    <mt-popup  v-model="popupVisible"  position="bottom">
      <TxMap v-if="popupType == 1" @setTxMAP="getTxMAP"/>
    </mt-popup>
  </div>
</template>

<script>
import { storage } from "@/js/until";
import { WeChatGetLocation } from "@/js/WeChatGetLocation";
import { WaChatUploadPictures } from "@/js/WaChatUploadPictures";
import { DelUpload } from "@/api/WaChatApi";
import { TxGeocode } from "@/api/secondLevelPages/ruralRevitalization";
import { mapActions } from "vuex";
import BetterScroll from "@/components/BetterScroll";
import TxMap from "@/components/secondLevelPages/ruralRevitalization/TxMap";
import wjutils from "@/js/WjSmrzUtil";

export default {
  props: ["WaChatConfigData"],
  data() {
    return {
      name: "",
      showPersonal: false,
      showUser: false,
      phone: "",
      content: "",
      publicity: false,
      popupVisible: false,
      listData: [],
      address: "",
      siteError: false,
      popupType: 0,
    };
  },
  components: {
    BetterScroll,
    TxMap,
  },
  watch: {
    content() {
      if (this.content.length > 200) {
        this.content = this.content.substring(0, 200);
      }
    },
  },
  computed: {
    longData() {
      return storage.fetch("longData").data;
    },
    UploadPicturesSrc() {
      return this.$store.state.UploadPicturesSrc;
    },
    UploadPicturesId() {
      return this.$store.state.MainIdData;
    },
    WaChetLatitude() {
      return this.$store.state.WaChetLatitude;
    },
    WaChetLongitude() {
      return this.$store.state.WaChetLongitude;
    },
  },
  destroyed: function () {
    this.$store.commit("SetUploadPicturesSrc", "");
    this.$store.commit("SetMainIdData", "");
  },
  methods: {
    ...mapActions(["getGrxx"]),
    // 提交举报
    submit() {
      if (!/^1[3456789]\d{9}$/.test(this.phone)) {
        if (this.phone) {
          this.changtoast("手机号码有误", "warning");
        } else {
          this.changtoast("请输入手机号码", "warning");
        }
        return;
      }
      if (this.content == "") {
        this.changtoast("请输入内容详情...", "warning");
        return;
      }
      let mess;
      if (this.phone) {
        mess = "是否确认发送环境黑点随手拍，发送后内容则不可修改";
      } else {
        mess =
          "本次随手拍没有填写联系手机，工作人员将无法对随手拍进行进一步的沟通了解，可能导致问题无法办理成功，是否还继续提交？";
      }
      let that = this;
      this.$dialog
        .confirm({
          title: "您的环境黑点随手拍已提交成功！",
          message: "请等待后台审核发布<br>发布后将以微信推送方式告知您！",
          confirmButtonText: "确定",
          cancelButtonText: "取消",
        })
        .then(() => {
          this._PublishShot();
        })
        .catch(() => {});
    },
    _PublishShot() {
      this.$indicator.open("正在提交数据，请稍等...");
      this.$post("api/mlgm/jbhjhd", {
        title: this.content,
        name: this.name,
        Mobile: this.phone,
        villageId: this.longData.id,
        mainId: this.UploadPicturesId,
        lat: this.WaChetLatitude,
        lng: this.WaChetLongitude,
        isAll: false,
        Addr: this.address,
      }).then((rps) => {
        this.$indicator.close();
        if (rps.data.success) {
          this.$store.commit("SetUploadPicturesSrc", ""); // 清空记录的图片路径
          this.$store.commit("SetMainIdData", ""); // 清空记录的图片id
          this.changtoast("发送成功，等待工作人员处理！", "success");
          this.$store.commit("Set_TopTagState", 1);
          // this.$router.go(-1)
          this.$router.push({
            name: "mlgmjbhjhd",
            params: {
              id: 2,
            },
          });
        } else {
          this.MessageBox({
            content: rps.data.message,
            success: function () {},
            failStata: false,
          });
        }
      });
    },
    // 选取图片 9张
    UploadPictures() {
      let amount = 9 - this.UploadPicturesSrc.length;
      WaChatUploadPictures(this.WaChatConfigData, amount);
    },
    _popupVisible(item) {
      if (item === 1) {
        if (!this.WaChetLatitude && !this.WaChetLongitude) {
          return;
        }
      }
      this.popupType = item;
      this.popupVisible = true;
    },
    // 重新获取位置
    shuaxin() {
      this.address = "";
      WeChatGetLocation(this.WaChatConfigData, this);
    },
    // 删除图片
    remove(item) {
      DelUpload({
        id: item.id,
      }).then((rps) => {
        if (rps.data.success) {
          this.changtoast("删除成功");
        } else {
          this.changtoast(rps.data.message, "error");
        }
      });
      let newUploadPicturesSrc = this.UploadPicturesSrc.filter((rps) => {
        return rps.id != item.id;
      });
      this.$store.commit("SetUploadPicturesSrc", newUploadPicturesSrc);
    },
    Set_address(item) {
      (this.address = item.title), (this.popupVisible = false);
    },
    getTxMAP(item) {
      this.address = item.poiname;
      this.popupVisible = false;
    },
    getLoca() {
      WeChatGetLocation(this.WaChatConfigData, this);
      this.getGrxx().then((Grxx) => {
        if (Grxx.hasSM) {
          this.name = Grxx.mz;
          this.phone = Grxx.tel;
        }
      });
    },
    showProtocol() {
      setTimeout(() => {
        document
          .getElementById("grzcD")
          .addEventListener("click", this.showGrzc);
        document
          .getElementById("fwzcD")
          .addEventListener("click", this.showYhzc);
      }, 1000);
      this.$dialog
        .confirm({
          title: "温馨提示",
          message:
            '&emsp;&emsp;感谢你信任并使用“高明通”综合服务平台，根据相关法律法规，我们将在充分保障您的知情权且获得您的明确授权后收集、使用您的个人信息。<br>&emsp;&emsp;请您务必仔细阅读<span id="grzcD">《个人信息保护政策》</span>和<span id="fwzcD">《用户服务协议》</span>，并确保您已全部了解关于您个人信息的收集使用规则。',
          confirmButtonText: "同意",
          confirmButtonColor: "#5DABFF",
          className: "bigConfirm clause",
          cancelButtonText: "暂不同意",
        })
        .then(() => {
          localStorage.setItem("readprotocol", "1");
          this.getLoca();
        })
        .catch(() => {
          window.location.href = "/randomlySnapPicture/1";
        });
    },
    showGrzc() {
      this.showPersonal = true;
    },
    showYhzc() {
      this.showUser = true;
    },
  },

  // 初始化获取经纬度
  created() {
    this.$showSubscribe()
    wjutils.gotoSMRZIfNot(this)
    this.getLoca();
    this.shuaxin()
  },
};
</script>

<style lang='scss' type="text/css" scoped>
@import "./style/wantToReport.scss";
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
</style>
