<template>
  <div class="message">
    <div class="obscuration"></div>
    <div class="content">
      <div class="icon">
        <img :src="state === 1 ? '/static/vote/cg.png' : '/static/vote/sb.png'" alt="">
      </div>
      <div class="text">{{message}}</div>
      <div class="but" @click="clickBut"><div class="text-but">确定</div></div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    message: {
      type: String,
      default: ''
    },
    state: {
      type: Number,
      default: 1
    }
  },
  methods: {
    clickBut () {
      this.$store.commit('SetmessageBut', false)
    }
  },
}
</script>

<style lang='scss' scoped>
@import '../style/message.scss';
</style>