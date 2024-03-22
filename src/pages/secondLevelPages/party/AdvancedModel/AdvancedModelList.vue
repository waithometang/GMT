
<!-- 先进典型 列表页 -->
<template>
  <!-- <div v-if="hasNoData">暂无数据</div> -->
  <div class="AdvancedModelList">
    <div class="head_video">
      <video id="videos" class="videos" poster="/images/img_04.jpg"  playsinline webkit-playsinline autoplay="autoplay"  x5-playsinline="true" controls="controls">
        <source v-if="videoSrc" :src="videoSrc" type="video/mp4">
      </video>
    </div>
    <div class="Works">
      <div class="Works_title">{{title}}</div>
      <div class="Works_content" :class="{'Works_content_overflow': showmores}">{{content}}</div>
      <div class="mores" @click="showmore" v-if="content.length >= 90">更多</div>
    </div>
    <div class="hread-title">
      <div></div>经验做法
      <div @click="goto()" class="more">
        更多
        <img src="/images/gengduo.png">
      </div>
    </div>
    <div class="roll_list">
      <div class="roll_list_list" v-for="(item, index) in listData" @click="goto(item)" :key="index">
        <div class="roll_list_images">
          <img :src="item.cover ? item.cover : images">
        </div>
        <div class="roll_list_content">
          <div class="content_title">{{item.title}}</div>
          <div class="def">
            <span>
              <img src="/images/img_13.png">
              {{item.publishTime}}
            </span>
            <span>
              <img src="/images/img_11.png">
              {{item.readedCount}}阅读
            </span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
(function () {
  var isPageHide = false
  window.addEventListener('pageshow', function () {
    if (isPageHide) {
      window.location.reload()
    }
  });
  window.addEventListener('pagehide', function () {
   isPageHide = true
  })
})(window)

import { Xjdx } from "@/api/PartyBuilding";
import { GetAddReaded, publicListData } from '@/api/secondLevelPage'

export default {
  data () {
    return {
      title:'',
      content:'',
      listData:[],
      hasNoData:false,
      videoSrc: '',
      images: '/static/mr-icon.png',
      showmores: true
    }
  },
  created() {
    this.getpublicListData()
    Xjdx({villageId:this.$route.params.vid}).then(res=>{
      if(res.data.success){
        if(!res.data.content) this.hasNoData=true
        else{
          this.title=res.data.content.title
          this.content=res.data.content.content
          if(res.data.content.videoUrl)
            this.videoSrc=window.location.origin+res.data.content.videoUrl
        }
      }else{
        this.changtoast(res.data.message,'error')
      }
    })
  },
  methods : {
    goto(item){
      if(!item){
        this.$router.push({
          path:"/nrfb/31/"+this.$route.params.vid
        })
      }else{
        if (item.linkage) {
          GetAddReaded ({
            id: item.id,
            lb: 1
          }).then (rps => {

          })
          window.location.href = item.linkage
        } else {
          this.$router.push({
           path:"/nrfbxx/3/"+item.id
          })
        }
      }
    },
    getpublicListData () {
      publicListData ({
        fblxId: 31,
        mkId: 3,
        pageSize: 5,
      }).then (rps => {
        if (rps.data.success) {
          this.listData = rps.data.content
        } else {
          this.changtoast(rps.data.message, 'error')
        }
      })
    },
    showmore () {
      this.showmores = !this.showmores
    }
  }
}
</script> 

<style lang='scss' scoped type="text/css">
@import '@/style/pages/secondLevelPages/party/AdvancedModelList.scss';
</style>
