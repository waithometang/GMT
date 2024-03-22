<template>
  <div class="serve_ewm">
    <div @click="NewServe" class="topBut">
      新增服务二维码
    </div>
    <hr/>
    <div class="footEwm">
      <div class="footEwm_title">我的服务业二维码</div>
      <div class="footEwm_list">暂无二维码，请先新增绑定吧!</div>
    </div>
  </div>
</template>
<script>
export default {
  methods:{
    NewServe(){
      this.$router.push('/NewServe')
    }
  }
}
</script>
<style lang="scss" scoped>
@import "./style/index.scss";
</style>