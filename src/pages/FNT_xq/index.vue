<!-- 通用发布详情 -->
<template>
  <div class="NotificationParticularss">
    <div class="content-list">
      <div class="head">
        <div class="title">{{listData.fbbt}}</div>
        <div class="head-list">
          <div class="list-tab">
            <img id="GMT_min_icon" src="/static/FNT_IMAGES/img_12.png" alt="">
            {{listData.fbry}}
          </div>
          <div class="list-tab">
            <img id="GMT_min_icon" src="/static/FNT_IMAGES/img_13.png" alt="">
            {{listData.fbsj}}
          </div>
          <div class="list-tab">
            <img id="GMT_min_icon" src="/static/FNT_IMAGES/img_11.png" alt="">
            {{listData.ydcs}} 阅读
          </div>
        </div>
      </div>
      <div class="content" v-html="listData.zwnr" id="listDataContent"></div>
      <video v-if="isvideo" id="videos" class="videos" autoplay="autoplay" x5-playsinline="true" controls="controls">
        <source :src="listData.video" type="video/mp4">
      </video>
    </div>
  </div>
</template>

<script>
import { Fbxx, Ppgzxx } from "@/api/FNTApi"
export default {
  data() {
    return {
      listData: "",
      isvideo:false,
			RichTextDisposeSatae:false
    };
  },
  computed: {
    id() {
      return this.$route.params.id;
    },
    lx () {
      return this.$route.params.lx*1
    }
  },
  methods: {
    _GetDetailPages(){
      if (this.lx === 1) {
        Ppgzxx({
          id: this.id
        }).then(rps => {
          if (rps.data.success) {
            this.listData = rps.data.content
            if(rps.data.content.video){
              this.isvideo=true
            }
          } else {
            this.changtoast(rps.data.message, 'error')
          }
        })
      } else {
      Fbxx({
        id:parseInt(this.id)
      }).then(rps => {
        if (rps.data.success) {
          this.listData = rps.data.content
          if(rps.data.content.video){
            this.isvideo=true
          }
        } else {
          this.changtoast(rps.data.message, 'error')
        }
      })
      }
    },
  },
  created() {
    this._GetDetailPages();
    if (this.id === 1) {
      document.title = "品牌工作"
    }
  },
  updated: function  () {
    this.$nextTick(function(){
      if (!this.RichTextDisposeSatae) {
        this.RichTextDispose()
        this.RichTextDisposeSatae = true
      }
    })
  }
};
</script>

<style lang='scss' type="text/css" scoped>
@import './style/index.scss';
</style>
