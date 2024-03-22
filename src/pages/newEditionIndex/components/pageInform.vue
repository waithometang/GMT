<template>
  <div class="pageInform">
    <div class="page-content">
      <div class="page-inform-left" @click="gotoList"><i></i></div>
      <div class="page-inform-right">
        <swiper class="swiImgs" :options="swiperOption">
          <swiper-slide class="swname" v-for="(item, index) in listData" :key="index">
            <div class="inform-right-tab" @click="clickSlide(item)">
              <div class="inform-right-name">{{item.title}}</div>
              <div class="inform-fight-time">{{item.date}}</div>
            </div>
          </swiper-slide>
        </swiper>
      </div>
    </div>
  </div>
</template>

<script>
import { Tzgg } from '@/api/FirstLevelPage';

export default {
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
        direction: "vertical"
      },
      listData: ""
    };
  },
  methods: {
    gotoList(){
      this.$router.push('tzgg_list/2')
    },
    getListData () {
      Tzgg(1,this.$store.state.userinfo.id).then(res => {
        if (res.data.success) {
          this.listData = this.flatten(res.data.content)
        } else {
          this.changtoast(res.data.message, 'error')
        }
      })
    },
    flatten (arr) {
      return [].concat( ...arr.map(x => Array.isArray(x) ? this.flatten(x) : x) )
    },
    clickSlide (item) {
      if (item.linkage) {
        window.location.href=item.linkage
      }else{
        this.$router.push(`/tzgg/1/${item.id}`)
      }
    }
  },
  created () {
    this.getListData()
  }
}
</script>

<style lang='scss' scoped>
@import '../style/pageInform.scss';
</style>