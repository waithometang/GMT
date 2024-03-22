//”百年党史青年学“知识竞赛
<template>
  <div class="bndsqnxzsjs">
    <div class="bg">
      <div class="items">
        <div class="item" @click="toHdgz">
          <div class="item-left">
            <img src="./image/hdgz.png" alt="" />
          </div>
          <div class="item-right">
            <div class="title">活动规则</div>
            <div class="text">点击了解规则，奖品，领奖方式</div>
          </div>
        </div>
        <div class="item" @click="toCjhd">
          <div class="item-left">
            <img src="./image/cjhd.png" alt="" />
          </div>
          <div class="item-right">
            <div class="title">参加活动</div>
            <div class="text">参与机会只有一次</div>
          </div>
        </div>
        <div class="item" @click="toCjm">
          <div class="item-left">
            <img src="./image/cjm.png" alt="" />
          </div>
          <div class="item-right">
            <div class="title">我的抽奖码</div>
            <div class="text">一个抽奖码是一次中奖机会</div>
          </div>
        </div>
      </div>
      <!-- <div class="dialogbg" v-if="dialogShow">
        <div class="dialog">
          <van-icon name="cross" class="cross" @click="dialogShow = false" />
          <p class="message">
            您还未查看活动规则，参与机会只有一次，是否先看活动规则？
          </p>
          <div class="dialog-footer">
            <div class="dialog-btn" @click="zjCjhd">直接答题</div>
            <div class="dialog-btn btnr" @click="toHdgz">查看规则</div>
          </div>
        </div>
      </div> -->
    </div>
  </div>
</template>
<script>
import { CheckBegin } from "@/api/DsjsApi";

export default {
  data () {
    return {
      // dialogShow: false,//打开dialog
    }
  },
  methods: {
    // 活动规则 此部分暂时写死
    toHdgz () {
      this.$router.push("/bndsqnx/hdgz")
    },
    // 我的抽奖码
    toCjm () {
      this.$router.push("/bndsqnx/cjm")
    },
    // 参加答题
    toCjhd () {
      //1.检测是否关注

      //2.检测是实名认证

      //3.请求后台接口，检测是否可以答题
      CheckBegin().then(
        (t) => {// 成功
          this.$router.push("/bndsqnx/competition")
        },
        (f) => {// 失败
          switch (f.data.message) {
            case '本次活动您已答题，不可重复作答！':
              // 弹窗提示
              this.$dialog.alert({
                title: "温馨提示",
                message: `${f.data.message}`
              }).then(() => {
                this.$router.push("/bndsqnx/competition")
              })
              break;
            case '你暂未进行大学生信息认证!':
              // 弹窗提示
              this.$dialog.alert({
                title: "温馨提示",
                message: `${f.data.message}`
              }).then(() => {
                // 跳转到大学生认证页面
                this.$router.push("/bndsqnx/competition")
              })
              break;
            default:
              // 弹窗提示
              this.$dialog.alert({
                title: "温馨提示",
                message: `${f.data.message}`
              })
              break;
          }
        }
      );
    }
  },
}
</script>

<style lang="scss" scoped>
@import './style/index.scss';
</style>
