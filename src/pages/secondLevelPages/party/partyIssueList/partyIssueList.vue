<!-- 党建发布类型 通用列表 -->
<template>
  <div class="partyIssueList">
    <gmt-search-list :url="url" :parms="{villageId:this.$route.params.vid ,mkid:3,fblxId:this.publishType}">
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
    </gmt-search-list>
  </div> 
</template>

<script>
import GmtSearchList from "@/components/GmtSearchList";
import releaseContentList from "@/components/releaseContentList";
import GmtDefaultList from '@/components/GmtDefaultList'
import { GetAddReaded,GetFblx } from '@/api/secondLevelPage'
import { PublishUtil,ImageUtil } from "@/js/businessUntil"
import { storage, session_Storage } from "@/js/until"
export default {
  components: {
    GmtSearchList, 
    releaseContentList,
    GmtDefaultList
  },
  data() {
    return {
      title:'',
      listData: [],
      url: "api/PartyBuilding/ztdrList",
      detailsUrl: '/djfbxq',
    };
  },
  computed: {
    publishType() {
      return this.$route.params.publishType;
    }
  },
  methods: {
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
    // 点击查看详情
    viewDetails (item) {
      if (item.linkage) {
        GetAddReaded ({
          id: item.id,
          lb: 0
        })
        if (item.linkage.indexOf('?') === -1 ) {
          url = item.linkage + '?/&scene=4#wechat_redirect/'
        } else {
          url = item.linkage + '&scene=4#wechat_redirect/'
        }
        session_Storage.save('ButtomTageState', this.$store.state.ButtomTageState)
        // window.location.href = item.linkage
        window.location.href = url
      } else {
        this.$router.push(`/djfbxq/${this.publishType}/${item.id}`)
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
  },
  created() {
    switch (this.publishType) {
      case '4':
        this.title = '主题党日'
        break;
    
      default:
        break;
    }
    document.title = this.title
  }
};
</script>

<style lang='scss' scoped type='text/css'>
@import '@/style/GmtDefaultList.scss';
</style>
