<!-- 村居直联 二级页面 -->
<template>
  <div class="GroupLianVillage">
    <GmtSelectTab :TabData="TabData" :TabStateData="StateType" @changeTabState="changedState" v-if="StateType == 1"></GmtSelectTab>
    <div class="LeagueMember" v-show="StateType == 0">
      <BetterScroll>
        <template slot="BetterScroll">
          <GmtSelectTab :TabData="TabData" :TabStateData="StateType" @changeTabState="changedState"></GmtSelectTab>
          <memberList :listData="dblist" @changePages="goto"></memberList>
        </template>
      </BetterScroll>
    </div>
    <div class="GMT_search"  v-if="StateType == 1">
      <GmtSearchList :url='url' :parms='{ fblxId: 5, mkid:202, vid: this.$route.params.vid }'>
        <template slot="item" slot-scope="listData">
          <!-- <GmtDefaultList :listData="listData.data" :mkid="202"></GmtDefaultList> -->
          <listParticulars :listData="listData.data" :userInfoType="2"></listParticulars>
        </template>
      </GmtSearchList>
    </div>
    <div class="release" v-if="showGrxx" @click="Gotorelease()">发布</div>
  </div>
</template>
<script>
import BetterScroll from "@/components/BetterScroll"
import GmtDefaultList from '@/components/GmtDefaultList'
import memberList from '@/components/secondLevelPages/homePage/memberList'
import listParticulars from '@/components/secondLevelPages/homePage/listParticulars'
import GmtSelectTab from '@/components/GmtSelectTab'
import GmtSearchList from '@/components/GmtSearchList'
import { ZldbList } from "@/api/secondLevelPage.js";
import { storage } from "@/js/until";
import {mapActions} from "vuex"

export default {
  components: {
    GmtDefaultList,
    GmtSearchList,
    memberList,
    GmtSelectTab,
    BetterScroll,
    listParticulars
  },
  data() {
    return {
      villageId: 0,
      dblist: [],
      listData: [],
      TabData: [{name: '村居直联', type: 0}, {name: '直联日志', type: 1}],
      // url: 'api/Common/PulishList',
      url: 'api/common/PycPulishList',
      showGrxx: false,
    };
  },
  computed: {
    StateType () {
      return this.$store.state.StateType
    },
    longData () {
      return storage.fetch('longData').data
    }
  },
  methods: {
    ...mapActions(['GetuserInfo']),
    changedState(item) {
      this.$store.commit('SET_StateType', item.type)
    },
    goto(item) {
      let id = item.id
      this.$router.push({
        path: "/LeagueMemberdy",
        query: { id }
      });
    },
    // 显示发布图标
    shouPublished () {
      this.GetuserInfo().then(rps => {
        if (rps.zlfb) {
          this.showGrxx = true
        }
      })
    },
    // 跳转发布页面
    Gotorelease () {
      this.$router.push({
        path:`/release/1`
        // path:`/personalPublished/${this.$route.params.vid}`
      })
    }
  },
  created() {
    this.shouPublished()
    this.villageId = this.$route.params.vid
    let parms = { villageid: this.villageId };
    ZldbList(parms).then(res => {
      if (res.data.success) {
        this.dblist = res.data.content;
      } else {
        this.changtoast(res.data.message);
      }
    });
  },
  beforeRouteEnter(to, from, next) {
    next(vm=>{
      if(from.name==='index'){
        vm.$store.commit ('SET_StateType', 0)
      }
    })
  }
};
</script>


<style scoped lang="scss">
@import "@/style/FirstLevelPage/select.scss";
.GroupLianVillage {
  margin: 0;
  padding: 0;
  background:#ffffff;
  height: 100%;
  width: 100%;
  overflow-x: hidden;
  .release {
    position: fixed;
    bottom: 50%;
    right: 30px;
    background:rgba(58,154,240,1);
    height: 80px;
    width: 80px;
    display: flex;
    align-items: center;
    justify-content: center;
    overflow: hidden;
    border-radius:50%;
    font-size:30px;
    color:rgba(255,255,255,1);
    z-index: 999;
  }
  .LeagueMember {
    margin-top: 20px;
    margin-left: 20px;
    margin-right: 20px;
    .list-tab{
      display: flex;
      align-items: center;
      padding:10px 0;
      margin-bottom: 20px;
      border: 1px solid #cccccc;
      border-radius: 20px;
      .tab-icon {
        width: 120px;
        height: 120px;
        margin: 0 20px;
        flex: 0 0 120px;
        display: flex;
        align-items: center;
        img{
          height: 100%;
          width: 100%;
          border-radius: 50%;
        }
      }
      .tab-content{
        flex: 1;
        margin-right: 20px;
        display: flex;
        flex-direction: column;
        .name {
          font-size: 28px;
          font-family: MicrosoftYaHei;
          font-weight: bold;
          color: rgba(51, 51, 51, 1);
        }
        .title {
          margin-top: 10px;
          font-size: 24px;
          font-family: MicrosoftYaHei;
          font-weight: bold;
          color: rgba(102, 102, 102, 1);
        }
        .swiper-content {
          margin-top: 10px;
          min-height: 50px;
          max-height: 100px;
          overflow: hidden;
          .swiImgs {
            height: 100px;
            overflow: hidden;
          }
          .swiper-title{
            overflow: hidden;
            text-overflow: ellipsis;
            display:-webkit-box; //作为弹性伸缩盒子模型显示。
            -webkit-box-orient:vertical; //设置伸缩盒子的子元素排列方式--从上到下垂直排列
            -webkit-line-clamp:1; //显示的行
            font-size: 28px;
            color: rgba(51, 51, 51, 1);
          }
          .swiper-title-top {
            margin-top: 10px;
          }
        }
      }
    }
  }
  .GMT_search {
    position: absolute;
    top: 100px;
    bottom: 0;
    left: 0;
    right: 0;
  }
}
</style>
