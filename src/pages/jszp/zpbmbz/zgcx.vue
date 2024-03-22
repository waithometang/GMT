<template>
  <div class="zgcx">
    <div class="zgcxPages" v-if="show">
      <img src="/static/ybmimages/dengdai.png" />
      <div class="tip">
        <p class="title">预报名提交成功</p>
        <p class="item">
          考生报名信息填写和修改仅限在报名期间（2021年5月6日9：00至5月8日16：00）进行。请务必确保填报信息与报考职位条件一致，如不符合报考职位条件将审核无法通过。预计2021年5月12日16:00起可查询审核结果。报考期间请持续关注“高明通”，后续招考信息将通过“高明通”推送。
        </p>
        <!-- <p>
          审核结果将会通过微信推送，也可进入我的报名进行查询进度，请耐心等待和保持关注高明通。
        </p> -->
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
import publicProgressBar from "@/components/publicProgressBar";
export default {
  computed: {
    bmid () {
      return this.$route.params.bmid;
    }
  },
  data () {
    return {
      show: false,
      zt: "",
      rq: "",
      jg: "",
      bz: ""
    };
  },
  methods: {
    nextStep () {
      this.$router.push("/jszp");
    },
    jxbmFn () {
      this.$router.push(`txxx`);
    }
  },
  mounted () {
    this.$parent.setStep(1)
  },
  created () {
    this.show = true;
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
  },
};
</script>
<style lang="scss" scoped>
@import '../../zkbm/style/zgcx.scss';
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
.tip {
  .title {
    font-size: 36px !important;
    font-weight: bold !important;
  }
  .item{
    text-indent: 2em;
    padding: 0 30px;
  }
  // p:last-child {
  //   font-size: 24px !important;
  //   color: #898989;
  //   padding: 0 20px;
  // }
}
</style>