<template>
  <div class="activity_detail" v-if="listData">
    <div class="title">{{listData.fbbt}}</div>
    <div class="items">
      <div class="list">
        <div class="left">组织单位：</div>
        <div class="right">{{listData.zzdw}}</div>
      </div>
      <div class="list">
        <div class="left">会议/活动进展：</div>
        <div class="right">{{listData.hdjz}}</div>
      </div>
      <div class="list">
        <div class="left">活动地点：</div>
        <div class="right">{{listData.hddd}}</div>
      </div>
      <div class="list">
        <div class="left">签到时间</div>
        <div class="right" >{{listData.qdrq1}} {{listData.qdsj1}} 至 {{listData.qdrq2}} {{listData.qdsj2}}</div>
      </div>
    </div>
    <div class="base"><div class="but" @click="apply">我要签到</div></div>
  </div>
</template>
<script>
import { Ztfbxx } from "@/api/FNTApi";
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
      Ztfbxx({
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
      this.$router.push(`/fntQdbm/${this.id}`)
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