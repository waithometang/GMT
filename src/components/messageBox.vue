<template>
  <div class="messageBox">
    <div class="maike"></div>
    <div class="content">
      <div class="clos" @click="clos"><img src="/static/FNT_IMAGES/x.png" alt=""></div>
      <div v-if="sfgz">
        <div class="headIcon"><img src="/static/FNT_IMAGES/gm.png" alt=""></div>
        <div class="name">高明通</div>
        <div class="title">投票成功，请关注高明通，竞猜结束后，如投票的队伍最终获胜则将有一次抽奖机会。</div>
        <div class="icon"><img src="/static/vote/mgt-url.jpg" alt=""></div>
      </div>
      <div v-else>
        <div class="headIcon"><img src="/static/tpcg.png" alt=""></div>
        <div class="bord">投票成功</div>
        <div class="title">竞猜结束后，如投票的队伍最终获胜<br/>则将有一次抽奖机会</div>
        <button class="but"  @click="clos">确定</button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props:["sfgz"],
  methods: {
    clos () {
      this.$emit('setclos')
    }
  }
}
</script>

<style lang='scss' scoped>
@import '@/pages/FNT_index/style/messageBox.scss';
.messageBox{
  position: fixed;
  .bord{
    font-weight:bold;
    text-align: center;
  }
}
</style>