<template>
  <div class="loadingState">
    <div class="spinner" v-if="loadingStateData == 2">
      <mt-spinner type="triple-bounce" :size="38" color="yellow"></mt-spinner>
    </div>
    <div class="tost" v-else>{{title}}</div>
  </div>
</template>

<script>
export default {
  props: ["loadingStateData"],
  watch: {
    loadingStateData () {
      if (this.loadingStateData == 1) {
        this.title = '下拉加载更多'
      } if (this.loadingStateData == 3) {
        this.title = '没有更多数据'
      } if (this.loadingStateData == 4) {
        this.title = '( ⊙ o ⊙ )！出错了 请刷新页面'
      }
    }
  },
  data () {
    return {
      title: '下拉加载更多'
    }
  }
};
</script>

<style lang='scss' scoped type="text/css">
.loadingState {
  background: #ffffff;
  height: 80px;
  .spinner {
    height: 50px;
    width: 90px;
    margin: 15px 330px;
  }
  .tost {
    font-size: 30px;
    line-height: 80px;
    text-align: center;
    color: #cccc;
  }
}
.loadingState /deep/ .mint-spinner-triple-bounce-bounce1 {
  width: 28px !important;
  height: 28px !important;
}
</style>
