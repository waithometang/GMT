<template>
  <div class="notification-pages">
    <div class="content">
      <div @click="more" class="images">
        <img src="/static/FNT_IMAGES/main/zxzc.png" />
      </div>
      <div class="title">
        <swiper class="swiImgs" :options="swiperOption">
          <swiper-slide class="swname" v-for="(item, index) in notification" :key="index">
            <div class="name" @click="checkParticulars(item[0])">
              <div class="tit">{{item[0].title}}</div>
              <div class="time">{{item[0].date}}</div>
            </div>
            <div class="name" v-if="item[1]" @click="checkParticulars(item[1])">
              <div class="tit">{{item[1].title}}</div>
              <div class="time">{{item[1].date}}</div>
            </div>
          </swiper-slide>
        </swiper>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: ["notification"],
  data() {
    return {
      swiperOption: {
        notNextTick: true,
        initialSlide: 0,
        autoplay: {
          delay: 1500,
          stopOnLastSlide: false,
          disableOnInteraction: false
        },
        speed: 800,
        loop: true,
        direction: "vertical"
      }
    };
  },
  methods: {
    checkParticulars(item) {
      this.$router.push(`/fntxq/${item.id}`);
    },
    more() {
      this.$router.push("/fntzczx");
    }
  }
};
</script>

<style lang='scss' scoped>
@import '../style/notification.scss';
</style>