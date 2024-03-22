<template>
  <!-- <transition name="fade"> -->
    <div class="img-view">
      <div class="img-layer"></div>
        <swiper class="swiImgs" @click="bigImg" :options="swiperOption" style="z-index:999999">
        <swiper-slide v-for="(item, index) in imgSrc" :key="index">
          <div class="img">
              <img :src="item" @click="bigImg">
          </div>
        </swiper-slide>
      </swiper>
      <div class="swiper-pagination"></div>
    </div>
  <!-- </transition> -->
</template>
<script>
export default {
  props: ['imgSrc', 'index'],
  data () {
    return {
    swiperOption: {
        autoplayDisableOnInteraction: true,
        speed: 800,
        initialSlide: this.index,
        pagination: {
          el: '.swiper-pagination',
        }
      }
    }
  },
  methods: {
    bigImg() {
      console.log(12)
    this.$emit('SETbigImg', false)
    }
  }
}
</script>
<style scoped lang='scss' type='text/css'>
/*动画*/
.fade-enter-active,
.fade-leave-active {
  transition: all .2s linear;
  transform: translate3D(0, 0, 0);
}
.fade-enter,
.fade-leave-active {
  transform: translate3D(100%, 0, 0);
}
.img-view /deep/ .swiper-pagination {
  z-index: 999999;
  top: 1017px;
  width: 100%;
  .swiper-pagination-bullet-active{
    background: #FFFFFF;
  }
  .swiper-pagination-bullet {
    width: 20px;
    height: 20px;
    margin-right: 15px;
  }
}
.img-view {
  position: absolute;
  top: 0;
  bottom: 0;
  right: 0;
  left: 0;
  .img-layer {
    position: fixed;
    z-index: 99999;
    top: 0;
    left: 0;
    background: rgba(0, 0, 0, 0.7);
    width: 100%;
    height: 100%;
    overflow: hidden;
  }
  .img {
    width: 100%;
    height: 700px;
    margin: 180px 0;
    z-index: 999999;
    display: flex;
    img {
      // max-width: 100%;
      width: 100%;
      height: 100%;
      z-index: 999999;
      margin: auto;
    }
  }
}

</style>