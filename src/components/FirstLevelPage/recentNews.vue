<!--  首页最新动态 -->
<template>
  <!-- <div class="recentNews" v-if="showFbIds" :class="{'recentNews_action': GMT_IntShowBootom}" >
    <div class="hread_content">
      <div class="hread-title">
        <div></div>{{showFbIds.Name}}
        <div @click="goto(showFbIds)" class="more">更多<img src="/images/gengduo.png"/></div>
      </div>
      <div class="content">
        <GmtDefaultList :listData='listData' :mkid='mkId' :showYuDu='showFbIds.Id == 15 || showFbIds.Id == 3 ? false : true'></GmtDefaultList>
      </div>
    </div>
  </div> -->
  <div class='pushMessage' :class="{'pushMessage_action': GMT_TageState === 5 || homeType === '4'}" v-if="showFbIds">
    <div class="pushMessage_tab">
      <div class="pushMessage_tab_icon">
        {{showFbIds.Name}}
      </div>
      <div class="pushMessage_tab_name" @click="goto(showFbIds)">
        更多
        <img src="/static/double@2x.png" alt="">
      </div>
    </div>
    <div class="public_content">
      <GmtDefaultList :listData='listData' :mkid='mkId' :showYuDu='showFbIds.Id == 15 || showFbIds.Id == 3 ? false : true'/>
    </div>
  </div>
</template>

<script>
import GmtDefaultList from '@/components/GmtDefaultList'
import { GetPulishList } from '@/api/FirstLevelPage'
import { storage, session_Storage } from "@/js/until"
import { PublishUtil,ImageUtil } from "@/js/businessUntil"
import { GetAddReaded,GetFblx } from '@/api/secondLevelPage'

export default {
  props: {
    GMT_IntShowBootom: {
      type: Boolean,
      default: false
    },
    GMT_TageState: {
      type: Number
    },
    showFbIds: {
      type: Object,
      default: function () {
        return {}
      }
    },
  },
  components: {
    // loadingState,
    GmtDefaultList
  },
  computed: {
    userinfo () {
      return this.$store.state.userinfo
    },
    homeType () {
      return this.$route.params.type
    },
    mkId () {
      if(this.showFbIds.Id===25){ //党员实事特殊处理
        return 301
      }
      if (this.homeType) {
        return this.homeType*1
      } else {
        return this.GMT_TageState
      }
    },
    sessionStorage () {
      return session_Storage.fetch('ButtomTageState').data
    },
  },
  watch: {
    userinfo () {
      this.GetlistData()
    }
  },
  data () {
    return {
      listData: [],
      loadingStateData: 1,
      loading: false,
      pageIndex:0,
      titleData: 6,
      detailsUrl: '/nrfbxx'
    }
  },
  methods: {
    getImg:ImageUtil.getDefaultImg,
    GetGrade(id){
      return PublishUtil.getGrade(id)
    },
    // 查看更多
    goto(showFbIds) {
      if(showFbIds.Id===16){ //企业优惠政策，特殊处理
        this.$router.push('/qjfb_Tag/5/16/yh')
      }else{
        let vid=this.getVillageId()
        this.$router.push(`/nrfb/${showFbIds.Id}`+ (vid?('/'+vid):''))
      }
    },
    // 进入动态详情
    checkParticulars (item) {
      if (item.linkage) {
        GetAddReaded ({
          id: item.id,
          lb: 0
        })
        window.location.href = item.linkage
      } else {
        if(!this.GMT_TageState) return
        this.$router.push(`/nrfbxx/${this.GMT_TageState}/${item.id}`)
      }
    },
    getVillageId(){
      let vid=null
      if (this.$store.state.ButtomTageState==1) vid=this.$route.params.vid
      if(this.$store.state.ButtomTageState==2 || this.sessionStorage === 2) vid=this.$store.state.userinfo.id
      return vid
    },
    GetlistData () {
      GetPulishList ({
        mkId: this.mkId,
        fblxId: this.showFbIds.Id,
        vid:this.getVillageId(),
        addReaded:false,
        pageSize: 5
      }).then (rps => {
        if (rps.data.success) {
          this.listData = rps.data.content
        } else {
          if (rps.data.message) {
            this.changtoast(rps.data.message, "error");
          }
        }
      })
    }
  },
  created () {
    this.GetlistData()
  }
};
</script>

<style lang="scss" scoped type="text/css">
@import "@/style/FirstLevelPage/recentNews.scss";
@import "@/style/components/villagePublishList.scss";
</style>
