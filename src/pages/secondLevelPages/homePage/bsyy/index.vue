<template>
  <div>
    <div class="main" v-show="showForm">
      <form ref="myForm" :action="formAction" method="post" style="display:none;">
        <input name="idcard" type="text" :value="sfzh" />
        <input name="name" type="text" :value="xm" />
        <input name="tel" type="text" :value="tel" />
        <input name="openid" type="text" :value="openid" />
      </form>
      <div class="top">
        <div class="from">
          <!-- <div class="item">
          <div class="title">个人头像</div>
          <div class="input">
            <img :src="headPortrait" />
          </div>
          </div>-->
          <div class="item item-action">
            <div class="title">身份证</div>
            <div class="input">
              <input v-model="sfzh" type="text" placeholder="请输入身份证"/>
            </div>
          </div>
          <div class="item item-action">
            <div class="title">姓&nbsp;&nbsp;&nbsp;&nbsp;名</div>
            <div class="input">
              <input v-model="xm" type="text" placeholder="请输入姓名"/>
            </div>
            <div class="input_tab_but"></div>
          </div>

          <div class="item item-action">
            <div class="title">手机号</div>
            <div class="input">
              <input placeholder="请输入手机号" maxlength="11" v-model="tel" type="text" :disabled="hasSend" />
            </div>
            <div class="input_tab_but"></div>
          </div>
        </div>
        <!-- <div class="item item-action note">
          <div class="note_name">短信验证码:</div>
          <div class="note_input">
            <input type="text" maxlength="4" v-model="code" placeholder="请输入验证码" />
          </div>
          <div class="note_but">
            <span
              @click="sendCodeFn"
              :class="{'static': !(this.tel && codeTime === 0) }"
            >{{codeTime === 0 ? "获取验证码" : codeTime + 's重发'}}</span>
          </div>
        </div> -->
        <div class="live"></div>
        <div class="village">
          <span class="guishu">认证状态</span>
          <span class="tishi">{{Rzzt}}</span>
        </div>
      </div>
      <div class="bottom">
        <div class="fasong" @click="gotoBsyyFn" :class="{'action': islong}">
          <div>前往预约</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import wjutils from "@/js/WjSmrzUtil";
import {IdentityCodeValid,regPhone,regChinese} from "@/js/commonUtils";

export default {
  computed: {
    certToken() {
      return this.$route.query.certToken;
    },
    type() {
      return this.$route.query.type;
    }
  },
  data() {
    return {
      sfzh: "",
      code: "",
      xm: "",
      formAction: "http://xzfw.gaoming.gov.cn/wechat/gTyuyue/yuyueInit",
      tel: "",
      openid: "",
      showForm: false,
      ishsouw: false,
      Rzzt: "未认证",
      Sfzhm: "",
      Name: "",
      hasSend: false,
      islong: false,
      codeTime: 0
    };
  },
  mounted() {
    this.showLoading()
    this.$showSubscribe().then(res=>{
      this.showLoading()
      this.getRzxx()
    })
  },
  methods: {
    showLoading() {
      this.$indicator.open({
        text: "加载中...",
        spinnerType: "fading-circle"
      });
    },
    gotoGetTxz(){
      sessionStorage.setItem('wjfallbackurl','/bsyyinit')
      this.$router.replace('/ewm')
    },
    gotoGetSmxx() {
      wjutils
        .getWjSmxx(
          this.certToken,
          this,
          window.location.origin + window.location.pathname
        )
        .then(
          res => {
            this.sfzh = res.sfzh;
            this.xm = res.xm;
            this.showForm = true;
            this.$indicator.close();
          },
          rej => {
            this.changtoast(rej, "error");
          }
        );
    },
    sendCodeFn() {
      if (this.codeTime > 0) return;
      this.getVaildCode();
    },
    getVaildCode() {
      if (!this.tel) {
        this.changtoast("请输入手机号码", "error");
        return;
      }
      this.codeTime = 60;
      let dome = setInterval(() => {
        if (this.codeTime > 0) {
          this.codeTime--;
        } else {
          clearInterval(dome);
        }
      }, 1000);
      this.hasSend = true;
      this.$post("api/sms/SendCode_Bsyy", { mobile: this.tel }).then(res => {
        if (res.data.success) {
        } else {
          this.changtoast(res.data.message, "error");
          this.codeTime = 0;
          this.hasSend = false;
        }
      });
    },
    getRzxx() {
      if (this.certToken) this.gotoGetSmxx();
      else
        this.$post("api/zx/txzinfo").then(res => {
          if (res.data.success) {
            this.$indicator.open({
              text: "加载中...",
              spinnerType: "fading-circle"
            });
            if (res.data.content.hasRz) {
              let _data = res.data.content;
              this.openid= _data.openid;
              if(!this.type){
                this.chooseRzry(_data)
              }else{
                this.sfzh = _data.sfzh;
                this.xm = _data.xm;
                this.tel = _data.tel;
                this.gotoBsyy()
              }
            } else {
              this.$dialog
                .confirm({
                  title: "温馨提示",
                  message: "您尚未办理通行证，请先办理通行证",
                  confirmButtonText: "前往办理",
                  confirmButtonColor: "#2E3092",
                  className: "bigConfirm",
                  cancelButtonText: "退出"
                })
                .then(() => {
                  // this.gotoGetSmxx()
                  this.gotoGetTxz()
                })
                .catch(() => {
                  WeixinJSBridge.call("closeWindow");
                });
            }
          } else {
            this.changtoast(res.data.message, "error");
          }
        });
    },
    chooseRzry(_data){
      this.$dialog
          .confirm({
            title: "温馨提示",
            message: `是否使用(${_data.xm})的个人信息进行预约?`,
            confirmButtonText: "前往预约",
            confirmButtonColor: "#2E3092",
            className: "bigConfirm",
            cancelButtonText: "退出"
          })
          .then(() => {
              this.sfzh = _data.sfzh;
              this.xm = _data.xm;
              this.tel = _data.tel;
              this.openid = _data.openid;
              this.gotoBsyy()
          })
          .catch(() => {
            // this.$indicator.close()
            // this.showForm=true
            WeixinJSBridge.call("closeWindow");
          });
    },
    gotoBsyy(){
      if (this.type == "1") {
        this.formAction =
          "http://xzfw.gaoming.gov.cn/wechat/gTyuyue/chooseView";
      } else if (this.type == "2") {
        this.formAction =
          "http://xzfw.gaoming.gov.cn/wechat/gTyuyue/yuyueList";
      }
      this.$nextTick(() => {
        this.$refs.myForm.submit();
      });
    },
    gotoBsyyFn(){
      if(!IdentityCodeValid(this.sfzh)){
        this.$dialog.alert({title:"提示",message:"请输入正确的身份证号"});
      } else if(!regChinese(this.xm)){
        this.$dialog.alert({title:"提示",message:"请输入正确的姓名"});
        // this.changtoast("请输入正确的姓名", "error");
      } else if(!regPhone(this.tel)){
        // this.changtoast("请输入正确的手机号码", "error");
        this.$dialog.alert({title:"提示",message:"请输入正确的手机号码"});
      } else{
        this.gotoBsyy()
      }
    },
    registerFn() {
      if (!this.tel) {
        this.changtoast("请输入手机号码", "error");
        return;
      }
      this.$indicator.open({
        text: "提交中...",
        spinnerType: "fading-circle"
      });
      this.$post("api/member/Smrz2", {
        xm: this.xm,
        sfzh: this.sfzh,
        tel: this.tel,
        code: this.code
      }).then(res => {
        if (res.data.success) {
          this.openid = res.data.content.openid;
          this.$nextTick(() => {
            this.$refs.myForm.submit();
          });
        } else {
          this.changtoast(res.data.message, "error");
        }
      });
    }
  }
};
</script>
<style lang="scss" scoped>
@import "@/Style/Certification.scss";
.main {
  background: #ffffff !important;
  .live {
    height: 20px;
    background: #f4f4f4;
  }
  .village {
    margin-top: 0px !important;
  }
}
.top {
  // background: #ffffff !important;
  padding-top:15px;
  .from {
    border-bottom: 1px solid;
    border-color: #cccccc;
    padding: 5px 20px 0px 20px !important;
    margin: 0px 2px;
  }
}
.item-action {
  .input {
    padding-left: 30px;
  }
}
.note {
  padding: 20px 22px 20px 22px;
  border-bottom: 1px solid;
  // width: 650px;
  border-color: #cccccc;
  overflow: hidden;
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin: 0;
  .note_name {
    flex: 0 0 auto;
    font-size: 30px;
  }
  .note_input {
    flex: 1;
    font-size: 30px;
    display: flex;
    align-items: center;
    justify-content: center;
    input {
      border: none;
      background: none;
      height: 40px;
      width: 180px;
      float: right;
      margin: 0;
      padding: 0;
      font-size: 30px;
    }
  }
  .note_but {
    flex: 0 0 auto;
    font-size: 28px;
    display: flex;
    align-items: center;
    span {
      display: flex;
      padding: 8px 20px;
      border-radius: 10px;
      background: #febc2d;
      color: #ffffff;
      border: 1px solid #ffffff;
    }
    .static {
      background: #febc2d;
    }
  }
}
</style>