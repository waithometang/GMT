<template>
    <div class="url-icon" @click="col">
      <div class="obscuration" @click="col"></div>
      <div class="icon" @click="col"><img :src="start() ? '/static/vote/hs-url.jpg' : '/static/vote/mgt-url.jpg'" alt=""></div>
    </div>
</template>
<script>
export default {
  data () {
    return {
      show_url: false
    }
  },
  methods: {
    col () {
      this.$store.commit('SetshowIcon', false)
    },
    start () {
      let url = window.location.href
      if (url.indexOf('gov') == -1) {
        return true
      } else {
        return false
      }
    }
  }
}
</script>
<style lang='scss' scoped>
  .url-icon {
    position: fixed;
    top: 0;
    bottom: 0;
    right: 0;
    left: 0;
    z-index: 2002;
    display: flex;
    align-items: center;
    justify-content: center;
    .obscuration {
      position: fixed;
      left: 0;
      top: 0;
      width: 100%;
      height: 100%;
      opacity: .5;
      background: #000;
      z-index: 2005;
      pointer-events: none;
    }
    .icon {
      height: 350px;
      width: 350px;
      z-index: 2006;
      img {
        height: 100%;
        width: 100%;
        pointer-events: all;
      }
    }
  }
</style>