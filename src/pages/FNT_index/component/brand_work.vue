<template>
  <div class="brand_work">
    <swiper class="swiper_work" :options="swiperOption">
      <swiper-slide class="swipt_div" v-for="(item,index) in listData" :key="index">
        <img :src="item.fmtp" @click="look(item)"/>
      </swiper-slide>
      <div class="swiper-button-prev" slot="button-prev"></div>
      <div class="swiper-button-next" slot="button-next"></div>
    </swiper>
  </div>
</template>

<script>
import { PpgzList, PpgzYds } from '@/api/FNTApi'
export default {
  data() {
    return {
      swiperOption: {
        slidesPerView: 4,
        spaceBetween: 15,
        slidesPerGroup: 4,
        loop: true,
        loopFillGroupWithBlank: true,
        pagination: {
          el: ".swiper-pagination",
          clickable: true
        },
        navigation: {
          nextEl: ".swiper-button-next",
          prevEl: ".swiper-button-prev"
        }
      },
      listData: []
    };
  },
  methods: {
    getListData () {
      PpgzList({
        lx: '品牌工作'
      }).then (rps => {
        if(rps.data.success) {
          this.listData = rps.data.content
        } else {
          this.changtoast(rps.data.message, 'error')
        }
      })
    },

    look (item) {
      this.$router.push(`/fntxq/${item.id}/1`)
      // let url = item.ljdz
      // PpgzYds ({
      //   id: item.id
      // })
      // if (url) {
      //   if (url.indexOf('http') || url.indexOf('https')) {
      //     this.$router.push(url)
      //   } else {
      //     window.location.href = url
      //   }
      // }
    }
  },
  created () {
    this.getListData()
  }
};
</script>

<style lang="scss" scoped>
@import '../style/brand_work.scss';
</style>
