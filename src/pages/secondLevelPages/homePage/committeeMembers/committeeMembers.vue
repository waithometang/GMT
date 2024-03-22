<!-- 两委成员 二级页面 -->
<template>
  <div class="CommitteeMembers">
    <GmtSelectTab :TabData="TabData" :TabStateData="StateFlag" @changeTabState="changeState" v-if="StateFlag == 1"></GmtSelectTab>
    <div class="CommitteeMembers-pages" v-if="StateFlag == 0">
      <BetterScroll>
        <template slot="BetterScroll">
          <GmtSelectTab :TabData="TabData" :TabStateData="StateFlag" @changeTabState="changeState"></GmtSelectTab>
          <memberList :listData="listData" @changePages="changePages" :showTel="true"></memberList>
        </template>
      </BetterScroll>
    </div>
    <div class="month" v-if="StateFlag == 1">
      <GmtSearchList :url='url' :pageSize="3" :parms='{ mkid:201, vid: this.$route.params.vid }'>
        <template slot="item" slot-scope="listData">
          <!-- <GmtDefaultList :listData="listData.data" :mkid="201"></GmtDefaultList> -->
          <listParticulars :listData="listData.data" :userInfoType="1"></listParticulars>
        </template>
      </GmtSearchList>
    </div>
    <div class="release" v-if="showGrxx" @click="Gotorelease()">发布</div>
  </div>
</template>
<script>
import BetterScroll from "@/components/BetterScroll";
import GmtSearchList from '@/components/GmtSearchList'
import GmtSelectTab from '@/components/GmtSelectTab'
import GmtDefaultList from '@/components/GmtDefaultList'
import memberList from '@/components/secondLevelPages/homePage/memberList'
import listParticulars from '@/components/secondLevelPages/homePage/listParticulars'
import { LwcyList, GetNewsList } from "@/api/secondLevelPage.js"
import {mapActions} from "vuex"
export default {
  components: {
    GmtSearchList,
    memberList,
    GmtSelectTab,
    GmtDefaultList,
    BetterScroll,
    listParticulars
  },
  computed: {
    StateFlag () {
      return this.$store.state.StateFlag
    }
  },
  data() {
    return {
      listData: [],
      mygtListData: [],
      villageId: 0,
      // url: 'api/Common/PulishList',
      url: 'api/common/PycPulishList',
      TabData: [{name: '两委成员', type: 0}, {name: '工作动态', type: 1}],
      showGrxx: false,
    };
  },
  methods: {
    ...mapActions(['GetuserInfo']),
    changeState(item) {
      this.$store.commit ('SET_StateFlag', item.type)
    },
    viewMonth(id) {
      this.$router.push(`/nrfbxx/2/${id}`);
    },
    // 查看两位成员详情
    changePages (item) {
      this.$router.push('/memberListDetails/1/' + item.id)
    },
    // 显示发布图标
    shouPublished () {
      this.GetuserInfo().then(rps => {
        if (rps.lwfb) {
          this.showGrxx = true
        }
      })
    },
    // 跳转发布页面
    Gotorelease () {
      this.$router.push({
        path: `/release/0`
        // path: `/personalPublished/${this.$route.params.vid}`
      })
    }
  },
  created() {
    this.shouPublished()
    this.villageId = this.$route.params.vid;
    LwcyList({
      villageId: this.villageId
    }).then(res => {
      if (res.data.success && res.data.content) {
        this.listData = res.data.content;
      } else {
        this.changtoast(res.data.message);
      }
      return 
    })
  },
  beforeRouteEnter(to, from, next) {
    next(vm=>{
      if(from.name==='index'){
        vm.$store.commit ('SET_StateFlag', 0)
      }
    })
  }
};
</script>

<style lang="scss" scoped>
@import "@/style/FirstLevelPage/select.scss";
.CommitteeMembers {
  margin: 0;
  padding: 0;
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  overflow: scroll;
  background: #fafafa;
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
  .month {
    position: absolute;
    width: 100%;
    height: 100%;
    .item {
      padding-left: 22px;
      padding-right: 22px;
      width: 706px;
      height: 80px;
      background: rgba(255, 255, 255, 0.7);
      display: flex;
      align-items: center;
      img:first-child {
        width: 30px;
        height: 30px;
        margin-right: 20px;
      }
      span {
        font-size: 28px;
        font-family: MicrosoftYaHei;
        font-weight: 400;
        color: rgba(51, 51, 51, 1);
        width: 455px;
        height: auto;
        padding: 20px 0;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
        display: inline-block;
        margin-right: 20px;
      }
      div {
        float: right;
        display: flex;
        align-items: center;
        span {
          margin: 0;
          font-size: 24px;
          font-family: MicrosoftYaHei;
          color: rgba(102, 102, 102, 1);
          margin-right: 20px;
          width: 140px;
          height: auto;
          padding: 20px 0;
        }
        img {
          float: right;
          height: 30px;
        }
      }
    }
    div:nth-child(2n) {
      background: none;
    }
  }
}
</style>
