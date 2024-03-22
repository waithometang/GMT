<template>
  <div class="voteHead">
    <div class="inform">
      <div class="icon"><img :src="`/static/vote/laba.gif?${Math.random()}`" alt=""></div>
      <div class="inform-title">
        <div class="title" ref="title">{{title}}</div>
      </div>
    </div>
    <div class="headImage">
      <img :src="images" alt="">
    </div>
  </div>
</template>
<script>
export default {
  props: {
    state: {
      type: Number,
      default: 1
    },
    images: {
      type: String,
      default: '/static/vote/banner.png'
    },
    title: {
      type: String,
      default: ''
    }
  },
  data () {
    return {
      countDownDome: ''
    }
  },
  methods: {
    clos () {
      clearInterval(this.countDownDome)
    },
    scroll () {
      let dome = this.$refs.title
        this.countDownDome =  setInterval(() => {
        let dome = this.$refs.title
        if (dome) {
          if (dome.scrollWidth >= dome.clientWidth) {
            dome.scrollLeft = dome.scrollLeft + 2
            if (dome.scrollLeft + dome.clientWidth === dome.scrollWidth) {
              dome.scrollLeft = 0
            }
          } else {
            clearInterval(this.countDownDome)
          }
        } else {
          clearInterval(this.countDownDome)
        }
      }, 100)
    }
  },
  mounted () {
    this.$nextTick(val => {
      this.scroll()
    })
  },
}
</script>

<style lang="scss" scoped>
@import '../style/voteHead.scss';
</style>