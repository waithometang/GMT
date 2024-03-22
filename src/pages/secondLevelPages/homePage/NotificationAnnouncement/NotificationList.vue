<!-- 通知公告列表 -->
<template>
  <div class="NotificationList">
    <div class="head">
      <img :src="GetBanner()" alt="">
    </div>
    <div class="contentList">
      <GmtSearchList url="api/VillageOpen/TzggList" :useSearch="true" :parms="{VillageId:this.longData.id,mk:this.mk}" >
        <template slot="item" slot-scope="listData">
            <div class="GmtDefaultList-pages">
              <div class="list" v-for="(item, index) in listData.data" :key="index" @click="viewDetails(item)">
                <div class="list-left">
                  <div class="list-title">
                    <span v-if="item.publishGrade != null">{{_GetGrade(item.publishGrade)}}</span>
                      {{item.title}}
                  </div>
                  <div class="list-icon" :class="{'not-images': !item.cover}">
                    <div class="list-icon-li time">
                      <div class="icon">
                        <img src="/images/img_13.png" alt="">
                      </div>
                      <div class="name">{{item.publishTime || item.date || item.editTime}}</div>
                    </div>
                    <div class="list-icon-li" v-if="item.xsyd">
                      <div class="icon">
                        <img src="/images/img_11.png" alt="">
                      </div>
                      <div class="name">{{item.readedCount}}</div>
                    </div>
                    <div class="list-icon-li" v-if='item.kydz  && !item.linkage'>
                      <div class="icon">
                        <img src="/images/zan.png" alt="">
                      </div>
                      <div class="name">{{item.dzs?item.dzs:0}}</div>
                    </div>
                    <div class="list-icon-li" v-if='item.kyc'>
                      <div class="icon">
                        <img src="/images/cai.png" alt="">
                      </div>
                      <div class="name">{{item.cps?item.cps:0}}</div>
                    </div>
                  </div>
                </div>
                <div class="list-right" v-if="item.cover">
                  <img :src="item.cover ? SetImages(item.cover) :'/images/FirstLevelPage/tacitlyapprove.jpg'" alt="">
                </div>
              </div>
            </div>
        </template>
      </GmtSearchList>
    </div>
  </div>
</template>

<script>
import headImages from "@/components/headImages";
import GmtSearchList from "@/components/GmtSearchList.vue";
import releaseContentList from "@/components/releaseContentList";
import { storage } from "@/js/until";

let refreshFlag = false; //是否正在刷新

export default {
  components: {
    headImages,
    releaseContentList,
    GmtSearchList
  },
  data() {
    return {
      url: '',
      stopInfinite: false,
      listData: [],
      pageIndex: 1,
      pageSize: 10 //
    };
  },
  created(){
    this.url="/tzgg/"+this.mk
  },
  computed: {
    longData() {
      return storage.fetch("longData").data;
    },
    mk(){
      return this.$route.params.mk
    }
  },
  methods: {
    GetBanner(){
      if (this.mk=='11') {
        return '/static/zkbm/tzggb.png'
      }else{
        return '/images/tzgg.jpg'
      }
    },
    _GetGrade (item) {
      switch (item) {
        case 0:
          return '区级发布'
          break;
        case 1:
          return '镇街发布'
          break;
        case 2:
          return '村居发布'
          break;
        case 5:
          return '两委发布'
          break;
        case 6:
          return '直联发布'
          break;
        case 7:
          return '实事发布'
          break;
        default:
          return ''
          break;
      }
    },
  viewDetails (item) {
      if (item.linkage) {
        // let url = item.linkage + '&scene=4#wechat_redirect'
        // window.location.href = url
        window.location.href = item.linkage
      } else {
        this.$router.push(`/tzgg/${this.mk}/${item.id}`)
      }
    },
    // 设置图片
    SetImages (item) {
      if (item.indexOf('../') === 0) { // 自己上传的
        return '/gmt' + item.slice(2, item.length)
      } else {
        return item
      }
    }
  }
};
</script>

<style lang='scss' type="text/css" scoped>
@import "@/style/pages/secondLevelPages/homePage/NotificationList.scss";
@import '@/style/GmtDefaultList.scss';
.head{
  width:100vw !important;
  img{
    width:100% !important;
    height: auto !important;
  }
}
</style>
