<!-- 高明通全局通用确认框 -->
<template>
  <div class="Gmtpopup">
     <div class="Obscuration"></div>
     <div class="content">
       <div class="name">{{GmtpopupContent.name}}</div>
       <div class="title">{{GmtpopupContent.content}}</div>
       <div class="tab">
         <div class="tab-li tab-li-left" @click="cancel">{{GmtpopupContent.cancel}}</div>
         <div class="tab-li" @click="confirm">{{GmtpopupContent.confirm}}</div>
       </div>
     </div>
  </div>
</template>

<script>
export default {
  computed: {
    // 确认框内容
    GmtpopupContent () {
      return this.$store.state.GmtpopupContent
    }
  },
  methods: {
    // 失败回调
    cancel () {
      this.$store.state.GmtpopupCancel()
    },
    // 成功回调
    confirm () {
      this.$store.state.GmtpopupConfirm()
    },
  }
}
</script>

<style lang='scss' scoped>
@import '@/style/components/Gmtpopup.scss'
</style>
