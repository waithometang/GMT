<template>
  <div class="featureList" :class="{'featureList_action': ShowBottom}">
    <!-- 功能导航 -->
    <primaryNavigation :VillageId="VillageId" :MenuData="MenuData" :GMT_TageState="GMT_TageState"></primaryNavigation>
    <!-- 通知公告 -->
    <keep-alive>
      <notification v-if="GMT_content"/>
    </keep-alive>
    <!-- 远程教育 -->
    <selectstudy v-if="GMT_content"></selectstudy>
    <!-- 展示内容 -->
    <div class="RecentNewsList" v-for="(item, index) in showFbIds" :key="index">
      <recent-news :VillageId="VillageId" :GMT_TageState="GMT_TageState" :showFbIds="item" v-if="item"></recent-news>
    </div>
  </div>
</template>

<script>
import Notification from "./notification"
import primaryNavigation from "./primaryNavigation_v5.1"
import selectstudy from "./selectStudy"
import VillageAffairs from "./VillageAffairs"
import RecentNews from "./recentNews";

export default {
  props: {
    MenuData: {
      type: Array,
      default: function () {
        return []
      }
    },
    showFbIds: {
      type: Array,
      default: function () {
        return []
      }
    },
    GMT_TageState: {
      type: Number
    },
    VillageId: {
      type: String,
      default:''
    },
    GMT_IntShowNotification: {
      type: Boolean,
      default: false
    },
    GMT_content: {
      type: Boolean,
      default: false
    },
    ShowBottom: {
      type: Boolean,
      default: false
    }
  },
  components: {
    Notification,
    primaryNavigation,
    selectstudy,
    VillageAffairs,
    RecentNews
  },
  data () {
    return {
    }
  },
  computed: {
    // 动态展示内容图标
    imagesData() {
      return "/images/FirstLevelPage/development.png"
    },
  },
};
</script>

<style lang="scss" scoped type="text/css">
@import "@/style/FirstLevelPage/featureList.scss";
  .hread-title{
    font-size: 28px;
    display: flex;
    align-items: center;
    background: #ffffff;
    padding: 15px 0px 15px 28px;
    border-bottom: 1px solid;
    border-color: #f4f4f4;
    margin:20px 0px 0px 0px;
     div{
       height: 30px;
       width: 8px;
       background: #379dea;
       border-radius: 5px;
       margin-right: 22px;
     }
     .more{
      float: right;
      font-size: 28px;
      font-family: PingFang-SC-Medium;
      font-weight: 500;
      color: #999999;
      width: auto;
      background: #ffffff;
      display: flex;
      align-items: center;
      margin-left: auto;
        img{
          height: 30px;;
        }
     }
  }
  .featureList_action{
    // padding-bottom: 120px;
  }
</style>

