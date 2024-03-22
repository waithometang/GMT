<template>
  <div class="messageBox">
    <div class="maike"></div>
    <div class="content">
      <div class="clos" @click="clos"><img src="/static/FNT_IMAGES/x.png" alt=""></div>
      <div class="headIcon"><img src="/static/FNT_IMAGES/gm.png" alt=""></div>
      <div class="name">高明通</div>
      <div class="title">长按下方二维码关注高明通公众号，获取权限</div>
      <div class="icon"><img src="/static/vote/mgt-url.jpg" alt=""></div>
    </div>
  </div>
</template>

<script>
export default {
  methods: {
    clos () {
      this.$emit('setclos')
    }
  }
}
</script>

<style lang='scss' scoped>
@import '../style/messageBox.scss';
</style>