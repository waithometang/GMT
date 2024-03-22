<!-- 百村足球赛参赛报名 -->
<template>
  <div class="randomlySnapPicture">
    <div class="select">
      <div @click="changeState(item.state)" :class="{'cor1': tagState === item.state}" v-for="(item, index) in tagData" :key="index">{{item.name}}</div>
    </div>
    <div class="need-list">
      <wybm v-if="tagState === 1" @finishedBM="finishedBM" :bmxx="bmxx"></wybm>
      <wdqd v-if="tagState === 2" @showDetails="showDetails"></wdqd>
    </div>
  </div>
</template>
<script>
import wybm from "./wybm"
import wdqd from "./wdqd"
import wjutils from "@/js/WjSmrzUtil";
export default {
  components: {
    wybm,wdqd
  },
  data() {
    return {
      tagState: 1,
      bmxx:{},
      tagData: [{name: '我要报名', state: 1}, {name: '我的球队', state: 2}]
    };
  },
  methods: {
    finishedBM(){
      this.changeState(2)
    },
    showDetails(bmxx){
      this.bmxx=bmxx
      this.changeState(1)
    },
    changeState(item) {
      switch (item) {
        case 1:
          document.title = '我要报名'
          break;
        case 2:
          this.bmxx={}
          document.title = '我的球队'
          break;
        default:
          break;
      }
      this.tagState = item
    }
  },
  created () {
    switch (this.state) {
      case 1:
        document.title = '我要报名'
        break;
      case 2:
        document.title = '我的球队'
        break;
      default:
        break;
    }
    this.$indicator.open('加载中...')
    this.$showSubscribe().then(() => {
      wjutils.gotoSMRZIfNotInModual(this, "csbm1026").then(() => {
        if (window.location.search) {
          window.location.href = window.location.origin + window.location.pathname
        }
      })
    });
  },
};
</script>

<style lang='scss' type="text/css" scoped>
@import "@/style/FirstLevelPage/select.scss";
.need-list {
  position: absolute;
  top: 100px;
  bottom: 0;
  left: 0;
  right: 0;
  overflow-y: scroll;
}
</style>