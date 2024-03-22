<template>
  <div class="xxbmbz">
    <div class="head">
        <div class="public-classify-tab">
          <router-link active-class="classify-tab-action" :to="item.to" exact v-for="(item, index) in listData" :key="index">
          <div class="classify-tab">{{item.name}}</div>
          </router-link>
        </div>
    </div>
    <div class="container">
      <transition name="fade-transform" mode="out-in">
        <keep-alive>
          <router-view />
        </keep-alive>
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
      tabState:1,
      listData: [
        { name: "基本信息", state: 1, to:'/zkbm/jbxx' },
        { name: "证明材料", state: 2, to:'/zkbm/zmcl' },
        { name: "进度结果", state: 3, to:'/zkbm/jdjg' }
      ],
    };
  },
  created () {
    let _search = window.location.search
    this.listData.forEach(m=>{
      m.to+=_search
    })
  },
  methods: {
    setStep(step){
      this.step=step
    }
  }
};
</script>

<style scoped lang="scss">
.public-classify-tab {
  display: flex;
  align-items: center;
  justify-content: space-between;
  .classify-tab {
    flex: 0 0 auto;
    border:1px solid rgba(54, 76, 74, 1);
    border-radius:10px;
    font-size:28px;
    padding: 9px 50px;
    font-weight:500;
    color:rgba(54,76,74,1);
  }
  .classify-tab-action {
    .classify-tab{
      background:#FFC501;
      color:rgba(51,51,51,1);
      border:1px solid #FFC501;
    }
  }
  .classify-tab:active {
    background: #e7b200;
  }
}

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
    height: calc(100vh - 130px);
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
