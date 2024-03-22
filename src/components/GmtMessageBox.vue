<template>
  <div class="GmtMessageBox">
    <div class="maike" @click="cancel"></div>
    <div class="content">
      <div class="message_box">
        <div class="message_box__header">
          <img class="heade_icon" src="/images/tost.png" alt="">
          提示
        </div>
        <div class="message_box_content">{{GmtMessageBoxContent}}</div>
        <div class="message_box_but">
          <div class="tab" @click="cancel" v-if="failStata">取消</div>
          <div class="tab action" @click="confirm">确认</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  computed: {
    GmtMessageBoxContent () {
      return this.$store.state.GmtMessageBoxContent
    },
    failStata () {
      console.log(this.$store.state.failStata)
      return this.$store.state.failStata
    }
  },
  methods: {

    cancel () {
      this.$store.commit('Set_GmtMessageBox', false)
    },

    confirm () {
      this.$store.commit('Set_GmtMessageBox', false)
      this.$store.state.GmtMessageBoxCancel()
    }
  }
}
</script>

<style lang='scss' scoped type="text/css">
.GmtMessageBox{
    .maike{
    position: fixed;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    opacity: .5;
    background: #000;
    z-index: 2001;
  }
  .content {
    position: fixed;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    text-align: center;
    z-index: 2009;
    display: flex;
    align-items: center;
    .message_box {
      width: 80%;
      margin: auto;
      padding-bottom: 10px;
      vertical-align: middle;
      background-color: #fff;
      border-radius: 4px;
      border: 1px solid #ebeef5;
      font-size: 18px;
      -webkit-box-shadow: 0 2px 12px 0 rgba(0,0,0,.1);
      box-shadow: 0 2px 12px 0 rgba(0,0,0,.1);
      text-align: left;
      overflow: hidden;
      -webkit-backface-visibility: hidden;
      backface-visibility: hidden;
      .message_box__header{
        display: flex;
        align-items: center;
        position: relative;
        padding: 30px 30px 20px;
        font-size: 36px;
        color: #303133;
        .heade_icon{
          height: 50px;
          width: 50px;
          margin-right: 20px;
          flex: 0 0 auto;
        }
      }
      .message_box_content {
        padding: 20px 30px;
        color: #606266;
        font-size: 28px;
        display: flex;
        align-items: center;
        line-height: 48px;
      }
      .message_box_but{
        display: flex;
        justify-content: space-between;
        padding: 10px 30px;
        .tab {
          flex: 1;
          padding: 18px 0;
          text-align: center;
          font-size: 24px;
          background: #fff;
          border: 1px solid #dcdfe6;
          color: #606266;
          border-radius: 3px;
        }
        .action{
          color: #fff;
          background-color: #409EFF;
          border-color: #409EFF;
          margin-left: 20px;
        }
        .tab:active{
          background: #cccccc;
        }
      }
    }
  }
}
</style>
