<template>
  <div class="attestationFrom">
    <div class="listFrom">
      <div class="listFrom_name">企业信息<span>(仅需确认，无需填写)</span></div>
      <div class="listFrom_input">
        <div class="listFrom_input_tab">
          <div class="listFrom_input_tab_name">企业名称:</div>
          <div class="listFrom_input_tab_input">
            <input v-model="qymc" readonly type="text" />
          </div>
        </div>
        <div class="listFrom_input_tab">
          <div class="listFrom_input_tab_name">企业部门:</div>
          <div class="listFrom_input_tab_input">
            <input v-model="qybm" type="text" readonly />
          </div>
        </div>
        <div class="listFrom_input_tab">
          <div class="listFrom_input_tab_name">企业代码:</div>
          <div class="listFrom_input_tab_input">
            <input v-model="qydm" type="text" readonly />
          </div>
        </div>
      </div>
    </div>
    <div class="listFrom listFrommargin">
      <div class="listFrom_name">我的信息<span>(仅需确认，无需填写)</span></div>
      <div class="listFrom_input">
        <div class="listFrom_input_tab">
          <div class="listFrom_input_tab_name">身份号码:</div>
          <div class="listFrom_input_tab_input">
            <input v-model="sfzhm" type="text" readonly />
          </div>
        </div>
        <div class="listFrom_input_tab">
          <div class="listFrom_input_tab_name">姓名:</div>
          <div class="listFrom_input_tab_input">
            <input type="text" v-model="xm" readonly />
          </div>
        </div>
        <div class="listFrom_input_tab">
          <div class="listFrom_input_tab_name">联系电话:</div>
          <div class="listFrom_input_tab_input">
            <input type="text" v-model="tel" readonly />
          </div>
        </div>
      </div>
    </div>
    <div class="but" @click="confirm">确认报名</div>
    <!-- 对话框 -->
    <transition name="fade">
      <div class="overlay" v-show="showDialog">
        <div class="dialog">
          <div class="icon" @click="close">
            <img src="./img/close.png" alt="" />
          </div>
          <div class="title">是否确认报名</div>
          <div class="btn_item">
            <div class="btn" @click="cancel">取消</div>
            <div class="btn active" @click="submit">确定</div>
          </div>
        </div>
      </div>
    </transition>
  </div>
</template>

<script>
import wjutils from "@/js/WjSmrzUtil"
import { mapActions } from 'vuex'
import { session_Storage, storage } from "@/js/until";

export default {
  name: '',
  components: {

  },
  props: {

  },
  data () {
    return {
      qymc: '',
      qybm: '',
      sfzhm: '',
      xm: '',
      tel: '',
      qydm: '',
      showDialog: false
    };
  },
  computed: {
    bmid () {
      return parseInt(this.$route.query.bmid)
    },
    qyid () {
      return parseInt(this.$route.query.qyid)
    }

  },
  watch: {

  },
  created () {
    this.$showSubscribe().then(() => {
      wjutils.gotoSMRZIfNot(this, this.init)
    })
  },
  mounted () {

  },
  methods: {
    ...mapActions(['getGrxx']),
    _getList () {
      this.$indicator.open()
      this.$post('api/qy/qybmxx', {
        bmid: this.bmid,
        qyid: this.qyid
      }).then(res => {
        this.$indicator.close()
        if (res.data.success) {
          if (res.data.content.ydj) {
            this.changtoast('您已登记，页面跳转中...')
            setTimeout(() => {
              this.$router.push(`/ymyy?bmid=${this.bmid}&qyid=${this.qyid}`)
            }, 2000)
          }
          this.qymc = res.data.content.qymc
          this.qybm = res.data.content.bmmc
          this.qydm = res.data.content.qydm
        } else {
          this.changtoast(res.data.message, 'error')
        }
      })
    },
    init () {
      this.getGrxx().then(Grxx => {
        if (!Grxx.hasSM) {
          storage.save('path', this.$route.fullPath)
          wjutils.gotoSMRZ(this, 'http://gmt.gaoming.gov.cn/smrz')
        } else {
          let data = JSON.parse(window.sessionStorage.getItem('_ss_grxx'))
          this.sfzhm = data.sfzh
          this.xm = data.mz
          this.tel = data.tel
          this._getList()
        }
      })
    },
    confirm () {
      this.showDialog = true
    },
    submit () {
      this.$indicator.open()
      this.$post('api/qy/jzrydj', {
        bmid: this.bmid,
        qyid: this.qyid,
        sfzh: this.sfzhm,
        name: this.xm,
        mobile: this.tel
      }).then(res => {
        this.showDialog = false
        this.$indicator.close()
        if (res.data.success) {
          this.changtoast('报名成功,页面跳转中...')
          setTimeout(() => {
            this.$router.push(`/ymyy?bmid=${this.bmid}&qyid=${this.qyid}`)
          }, 2000)
        } else {
          this.changtoast(res.data.message, 'error')
        }
      })
    },
    close () {
      this.showDialog = false
    },
    cancel () {
      this.showDialog = false
    }
  },
};
</script>

<style scoped lang="scss">
@import './style/attestationFrom.scss';
.attestationFrom {
  background-color: #fff;
  .but {
    position: absolute;
    bottom: 80px;
    left: 28px;
    margin: 0;
  }
  .overlay {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    display: flex;
    align-items: center;
    justify-content: center;
    background: rgba(0, 0, 0, 0.4);
    z-index: 99;

    .dialog {
      width: 600px;
      height: 322px;
      background: #ffffff;
      border-radius: 10px;
      padding: 0 35px;
      text-align: center;
      box-sizing: border-box;

      .icon {
        float: right;
        margin-top: 16px;
        margin-right: -10px;

        img {
          width: 22px;
          height: 22px;
        }
      }

      .title {
        font-size: 30px;
        font-family: PingFang SC;
        font-weight: bold;
        color: #333333;
        margin-top: 50px;
        margin-bottom: 95px;
      }

      .btn_item {
        font-size: 30px;
        font-family: PingFang SC;
        font-weight: bold;
        color: #379cea;
        display: flex;
        justify-content: space-between;
        .btn {
          width: 254px;
          height: 80px;
          line-height: 80px;
          border: 1px solid #379cea;
          border-radius: 10px;
          &.active {
            color: #fff;
            background: #65b7f3;
          }
        }
      }
    }
  }
}
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s;
}
.fade-enter,
.fade-leave-to {
  opacity: 0;
}
</style>
