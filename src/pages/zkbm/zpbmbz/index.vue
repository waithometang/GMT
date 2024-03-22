<template>
  <div class="xxbmbz">
    <div class="head">
      <publicProgressBar :state="step" :tagData="tagData" />
    </div>
    <div class="container">
      <transition name="fade-transform" mode="out-in">
        <router-view />
      </transition>
    </div>
  </div>
</template>

<script>
import publicProgressBar from "@/components/publicProgressBar";
export default {
  components: {
    publicProgressBar
  },
  data() {
    return {
      step: 0,
      tagData: ["报考申请", "资格审查", "获取准考证号"]
    };
  },
  methods: {
    setStep(step){
      this.step=step
    }
  }
};
</script>

<style scoped lang="scss">
.xxbmbz {
  background: #f5f5f5;
  height: 100vh;
  .head {
    padding: 30px;
    background: #ffffff;
  }
  .container{
    position: fixed;
    overflow-y: scroll;
    bottom: 0px;
    width: 100%;
    height: calc(100vh - 180px);
  }
}
/deep/ .van-skeleton{
  background: #ffffff;
  padding-bottom: 35px !important;
}
/deep/ .van-cell{
  font-size:28px;
}

</style>
