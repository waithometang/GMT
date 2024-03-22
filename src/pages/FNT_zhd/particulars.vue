<template>
  <div class="activity_detail" v-if="listData">
    <div class="hread" v-if="listData.headImgs.length > 0">
      <swiper class="hread-img" :options="swiperOption">
        <swiper-slide class="hread-img" v-for="(item,index) in listData.headImgs" :key="index">
          <img :src="item" />
        </swiper-slide>
        <div class="swiper-pagination" slot="pagination"></div>
      </swiper>
    </div>
    <div class="title">{{listData.fbbt}}</div>
    <div class="hr"></div>
    <div class="items">
      <div class="list">
        <div class="left">主办单位：</div>
        <div class="right">{{listData.zzdw}}</div>
      </div>
      <div class="list">
        <div class="left">承办单位</div>
        <div class="right">{{listData.cbdw}}</div>
      </div>
      <div class="list">
        <div class="left">活动进展：</div>
        <div class="right">{{listData.hdjz}}</div>
      </div>
      <div class="list">
        <div class="left">活动地点：</div>
        <div class="right">{{listData.hddd}}</div>
      </div>
      <div class="list">
        <div class="left">活动人数：</div>
        <div class="right">{{listData.hdrs}}</div>
      </div>
      <div class="list">
        <div class="left">报名时间：</div>
        <div
          class="right"
        >{{listData.bmrq1}} {{listData.bmsj1}} 至 {{listData.bmrq2}} {{listData.bmsj2}}</div>
      </div>
      <div class="list">
        <div class="left">活动时间：</div>
        <div
          class="right"
        >{{listData.hdrq1}} {{listData.hdsj1}} 至{{listData.hdrq2}} {{listData.hdsj2}}</div>
      </div>
    </div>
    <div class="hr"></div>
    <div class="content">
      <div class="content-title">
        <div></div>活动介绍
      </div>
      <div class="content-text" v-html="listData.zwnr"></div>
      <div class="content-images" v-if="false">
        <ul class="images-list">
          <li class="images-tab" @click="previewImages"><img class="tab-icon" :src="listData.fmtp" alt=""></li>
          <div style="clear:both;"></div>
        </ul>
      </div>
    </div>
    <div class="base" v-if="listData.hdjz === '报名中'"><div class="but" @click="apply">报名</div></div>
  </div>
</template>
<script>
import { hdfbxx } from "@/api/FNTApi";
import { WcChatPreviewImage } from '@/js/WeChatpreviewImage'

export default {
  data() {
    return {
      swiperOption: {
        pagination: {
          el: ".swiper-pagination"
        }
      },
      listData: "",
      isvideo: false
    };
  },
  computed: {
    id() {
      return this.$route.params.id;
    }
  },
  methods: {
    init() {
      this.$indicator.open('数据加载中')
      hdfbxx({
        id: parseInt(this.id)
      }).then(rps => {
        this.$indicator.close()
        if (rps.data.success) {
          this.listData = rps.data.content;
          if (rps.data.content.video) {
            this.isvideo = true;
          }
        } else {
          this.changtoast(rps.data.message);
        }
      });
    },
    previewImages () {
      let url =`${window.location.protocol}//${window.location.host}${this.listData.fmtp}` 
      WcChatPreviewImage(url, [url])
    },
    apply () {
      if(this.listData.bmlx==3){
        this.$router.push(`/fntTtbm/${this.id}`)
      }else{
       this.$router.push(`/fntZhdbm/${this.id}/${this.listData.bmlx}`) 
      }
      
    }
  },
  created() {
    this.init();
  }
};
</script>
<style lang="scss" scoped>
@import './style/particulars.scss';
</style>