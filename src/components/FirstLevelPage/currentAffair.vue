<!-- 最新实事 -->
<template>
  <div class="currentAffair">
    <div class="hread-title">
      <div></div>公告公示
      <div @click="goto(1)" class="more">更多<img src="/images/gengduo.png"/></div>
    </div>
    <div class="content">
      <releaseContentList :GMT_FBLB="1" :listData="listData_1" :url='detailsUrl'></releaseContentList>
      <loading-state :loadingStateData="2" v-if="!loadingState_1"></loading-state>
    </div>
    <div class="hread-title">
      <div></div>制度文件
      <div @click="goto(2)" class="more">更多<img src="/images/gengduo.png"/></div>
    </div>
    <div class="content">
      <releaseContentList :GMT_FBLB="1" :listData="listData" :url='detailsUrl'></releaseContentList>
      <!-- <loading-state :loadingStateData="2" v-if="!loadingState"></loading-state> -->
    </div>
  </div>
</template>
<script>
import releaseContentList from '@/components/releaseContentList'
import { GetPublishList } from '@/api/PartyBuilding'
import { storage } from "@/js/until";
// import loadingState from '@/components/loadingState'

export default {
  components: {
    releaseContentList,
    // loadingState
  },
  data () {
    return {
      publishType: 2, // 发布类型 制度文件 
      publishType_1: 3, // 发布类型 公告公示
      pageIndex: 1, // 页码
      pageSize: 5, // 数量
      listData: [], // 制度文件 数据
      listData_1: [], // 公告公示 数据 
      loadingState: false,
      loadingState_1: false,
      detailsUrl: '/djfbxq'
    }
  },
  computed: {
    longdata () {
      return storage.fetch('longData').data
    }
  },
  methods: {
    _GetPublishList () {
      GetPublishList ({
        villageId: this.longdata.id,
        pageIndex: this.pageIndex,
        pageSize: this.pageSize,
        publishType: this.publishType
      }).then (rps => {
        if (rps.data.success) {
          this.listData = rps.data.content
          this.loadingState = true
        } else {
          this.changtoast(rps.data.message, "error");
        }
      })
     GetPublishList ({
        villageId: this.longdata.id,
        pageIndex: this.pageIndex,
        pageSize: this.pageSize,
        publishType: this.publishType_1
      }).then (rps => {
        if (rps.data.success) {
          this.loadingState_1= true
          this.listData_1 = rps.data.content
        } else {
          this.changtoast(rps.data.message, "error");
        }
      })
    },
    // 查看更多
    goto(item) {
      if(item==2){
        this.$router.push({
          path: "/djfb/2/933"
        });
      }
      else{
        this.$router.push({
          path: "/djfb/3/933"
        });
      }
  }
  },
  created () {
    this._GetPublishList()
  },

}
</script>


<style lang="scss" scoped type="text/css">
@import "@/style/FirstLevelPage/currentAffair.scss";
</style>
