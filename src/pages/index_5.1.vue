<template>
  <div class="index">
    <head-images :GMT_IntShowWeather="true" :GMT_HeadImageData="GMT_HeadImageData"  v-if="ButtomTageState == 1"></head-images>
    <keep-alive>
      <feature-list :ShowBottom="true" :GMT_TageState="GMT_TageStates" v-if="ButtomTageState == 1" :GMT_content="true" :MenuData="MenuData" :showFbIds="showFbIds"></feature-list>
    </keep-alive>
    <!-- 最新动态 -->
    <keep-alive>
      <!-- <recent-news v-if="ButtomTageState == 1" :GMT_TageState="1" :showFbIds="showFbIds"></recent-news> -->
    </keep-alive>
    <!-- 走进高明
    <zoujin v-if="ButtomTageState == 2"></zoujin> -->
    <!-- 我要办事 -->
    <PublicService v-if="ButtomTageState == 4"></PublicService>
    <!-- 诉求反映 -->
    <randomly v-if="ButtomTageState == 3"></randomly>
    <!-- 个人中心 -->
    <personal-home-page v-if="ButtomTageState == 5"></personal-home-page>
    <bottom-tag :isblack="1"></bottom-tag>
  </div>
</template>
<script>
import BottomTag from "@/components/BottomTag_v5.1";
import HeadImages from "@/components/headImages_v5.1";
import zoujin from "@/pages/secondLevelPages/zoujin/zoujin";
import FeatureList from "@/components/FirstLevelPage/featureList_v5.1";
import PersonalHomePage from "@/components/FirstLevelPage/PersonalHomePage";
import RecentNews from "@/components/FirstLevelPage/recentNews";
import CurrentAffair from "@/components/FirstLevelPage/currentAffair";
import AccurateSupport from "@/components/FirstLevelPage/accuratesupport";
import construction from "@/components/FirstLevelPage/construction";
import randomly from "@/pages/secondLevelPages/ruralRevitalization/randomlySnapPicture/randomlySnapPicture.vue";
import PublicService from "@/components/FirstLevelPage/PublicService.vue"
import { AppSetting } from "@/api/FirstLevelPage.js";
import { GetWyds } from "@/js/businessUntil.js";

export default {
  components: {
    BottomTag,
    FeatureList,
    HeadImages,
    RecentNews,
    CurrentAffair,
    AccurateSupport,
    construction,
    PersonalHomePage,
    randomly,
    PublicService,
    zoujin
  },
  data () {
    return {
      /** 顶部图片显示内容*/
      GMT_HeadImageData: ['/images/Pages_5.1/banner01.jpg', '/images/Pages_5.1//banner02.jpg', '/images/Pages_5.1//banner03.jpg', '/images/Pages_5.1//banner04.jpg'],
      /** 图标导航显示码*/
      GMT_TageStates: 1 ,
      MenuData: [],
      showFbIds: [],
      WydsMenuIds:[]  //要显示未阅读数的菜单
    }
  },
  watch: {	
    ButtomTageState () {
      switch (this.ButtomTageState) {
        case 1:
          this.GMT_TageStates = 1
        break;
        default:
          break;
      }
    }
  },
  computed: {
    ButtomTageState() {
      return this.$store.state.ButtomTageState;
    },
  },
  inject: ["reload"],
  methods:{
    getWdWyds(){
      GetWyds(this,1,this.WydsMenuIds)
    }
  },
  created() {
    if (!this.$route.params.type) {
      return
    }
    let that = this
    AppSetting(1).then(res=>{
      if(res.data.success){
        that.MenuData=res.data.content.menus
        that.showFbIds = res.data.content.showFbIds
        that.WydsMenuIds = res.data.content.fblIds
        if(!this.$store.state.Main_wydsData) this.getWdWyds()
      }else{
          if (res.data.message) {
            this.changtoast(res.data.message, "error");
          }
      }
    })
    this.$store.commit ('SET_StateFlag', 1)
    this.$store.commit('SET_StateType', 1)
    this.$store.commit('SET_StateTypeData', 1)
    this.$store.commit('Set_party_stateType', 1)
  },
  beforeRouteEnter (to, from, next) {
    next(vm=>{
      if(from.name==='CommonPublishList'){
        vm.getWdWyds()
      }
    })
  }
};
</script>
