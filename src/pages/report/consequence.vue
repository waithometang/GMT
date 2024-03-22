<template>
  <div class="consequence">
    <div class="icon"><img :src="start ? '/static/report/cg.png' : '/static/report/xx.png'" alt=""></div>
    <div class="text1">{{start ? '提交成功' : '提交失败'}}</div>
    <div class="text2" v-if="start">咨询举报结果</div>
    <div class="text2" v-if="start">请拨打:0757-88285113</div>
    <div class="text2" v-if="!start">请刷新重试</div>
    <div class="base" @click="affirm">确定</div>
  </div>
</template>

<script>
export default {
  computed: {
    start () {
      return this.$route.params.start
    }
  },
  methods: {
    affirm () {
      this.$router.replace('/gyjb')
    }
  }
}
</script>

<style lang='scss' scoped>
@import './style/consequence.scss';
</style>