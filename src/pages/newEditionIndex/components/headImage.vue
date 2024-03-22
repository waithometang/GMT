<template>
  <div class="head_imgae">
    <swiper class="swiImgs" :options="swiperOption" ref="mySwiper">
      <swiper-slide :class="{'swiper-no-swiping stop-swiping': headImageData.length <= 1}" v-for="(item, index) in headImageData" :key="index">
        <img :src="item" alt="">
      </swiper-slide>
      <div class="swiper-pagination" slot="pagination" v-if="headImageData.length > 1"></div>
    </swiper>
  </div>
</template>

<script>
export default {
  data () {
    return {
      headImageData: ['/static/newEditionIndex/banner1.png'],
      swiperOption: {
        //设定初始化时slide的索引
        initialSlide: 0,
        //自动播放
        autoplay:true,
        pagination: {
          el: '.swiper-pagination',
          clickable: true,
        },
        observer:true,
        noSwiping: true,
        noSwipingClass: "stop-swiping",
        autoplayDisableOnInteraction: true,
        //滑动速度
        speed: 800
      },
    }
  }
}
</script>

<style lang='scss' scoped>
@import '../style/headImages.scss';
</style>