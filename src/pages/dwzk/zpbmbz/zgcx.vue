<template>
  <div class="zgcx">
    <div class="zgcxPages" v-if="show">
      <img src="/static/ybmimages/dengdai.png" />
      <div>
        <p>请耐心等候结果通知。</p>
        <span>
          审查后会以高明通发送审查结果消息
          <br />也可在此查看审查结果
        </span>
      </div>
      <!-- <div v-else>
        <p v-html="jg=='不通过' ?'资格审查不通过！<br/>如有疑问请咨询0769-88888888' : '资格审查已通过！' "></p>
        <div class="Item">
          <span>审查时间:</span>
          <span>{{rq}}</span>
        </div>
        <div class="Item">
          <span>备注::</span>
          <span>{{bz}}</span>
        </div>
      </div> -->
      <!-- <div class="base">
        <div class="base-tab">
          <div class="public-long-but" @click="nextStep">点击返回首页</div>
        </div>
      </div>-->
      <div class="floot-but">
        <div class="base">
          <div class="base-tab">
            <div class="public-long-but" @click="nextStep">点击返回首页</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import publicProgressBar from "@/components/publicProgressBar"
export default {
  computed: {
    bmid() {
      return this.$route.params.bmid
    }
  },
  data() {
    return {
      show: false,
      zt: "",
      rq: "",
      jg: "",
      bz: ""
    }
  },
  methods: {
    nextStep() {
      this.$router.push("/dwzk")
    },
    jxbmFn() {
      this.$router.push(`/xxtxxx`)
    }
  },
  mounted() {
    this.$parent.setStep(1)
  },
  created() {
    this.show = true
    // Zgscjg(this.bmid).then(rps => {
    //   if (rps.data.success) {
    //     this.zt = rps.data.content.zt;
    //     this.rq = rps.data.content.rq;
    //     this.jg = rps.data.content.jg;
    //     this.bz = rps.data.content.bz;
    //     this.show = true;
    //   } else {
    //   }
    // });
  }
}
</script>
<style lang="scss" scoped>
@import "../style/zgcx.scss";
.floot-but {
  width: 100%;
  .base {
    padding-left: 20vw !important;
    width: auto !important;
    .base-tab {
      width: 60vw !important;
    }
  }
}
</style>