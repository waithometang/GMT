<template>
  <div class="index" v-if="longData">
    <head-images :ButtomTageState="ButtomTageState" v-if="ButtomTageState != 5 && ButtomTageState != 4"></head-images>
    <keep-alive>
      <feature-list :ButtomTageState="ButtomTageState" v-if="ButtomTageState != 5 && ButtomTageState != 4 "></feature-list>
    </keep-alive>
    <personal-home-page v-if="ButtomTageState == 5"></personal-home-page>
    <keep-alive>
      <recent-news v-if="ButtomTageState == 1"></recent-news>
    </keep-alive>
    <keep-alive>
      <current-affair v-if="ButtomTageState == 2"></current-affair>
    </keep-alive>
    <keep-alive>
      <accurate-support v-if="ButtomTageState == 3"></accurate-support>
    </keep-alive>
    <randomly v-if="ButtomTageState == 4"></randomly>
    <bottom-tag></bottom-tag>
  </div>
</template>
<script>
import BottomTag from "@/components/BottomTag";
import HeadImages from "@/components/headImages";
import FeatureList from "@/components/FirstLevelPage/featureList";
import PersonalHomePage from "@/components/FirstLevelPage/PersonalHomePage";
import RecentNews from "@/components/FirstLevelPage/recentNews";
import CurrentAffair from "@/components/FirstLevelPage/currentAffair";
import AccurateSupport from "@/components/FirstLevelPage/accuratesupport";
import construction from "@/components/FirstLevelPage/construction";
import randomly from "@/pages/secondLevelPages/ruralRevitalization/randomlySnapPicture/randomlySnapPicture.vue";
import { storage } from "@/js/until";
// import { GetGrxx } from "@/api/Member.js";
import {mapActions} from "vuex"
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
    randomly
  },
  computed: {
    Grxx() {
      return JSON.parse(sessionStorage.getItem('_ss_grxx')) //个人信息，包括实名认证
    },
    ButtomTageState() {
      return this.$store.state.ButtomTageState;
    },
    longData() {
      return storage.fetch("longData").data;
    }
  },
  inject: ["reload"],
  methods: {
    ...mapActions(['getGrxx']),
    _GetGrxx() {  //获取实名认证信息
      let longData=storage.fetch("longData").data
      if (!longData) {
        this.$indicator.open("正在获取实名信息");
      }
      //根据实名信息的村居来选择当前村居（没有选择当前村居情况下）
      this.getGrxx().then(grxx => {
        this.$indicator.close()
        if (grxx.hasSM && grxx.id) {
          //有通过实名认证
          let data = {
            name: grxx.sscj,
            id: grxx.id,
            type: 1
          };
          storage.save("longData", data);
          this.$store.state.Main_wydsData=null  //清除阅读以便重新获取
          if(!longData || longData.id!=data.id) this.reload();
          return
        }
      //  if (!storage.fetch("longData").data) {
      //     this.$router.push({
      //       path: "/AreaSelection"
      //     })
      //   }
      });
    }
  },
  created() {
    console.log(this.Grxx , '看看实名认证')
    if (!this.Grxx) 
      this._GetGrxx()
    this.$store.commit ('SET_StateFlag', 1)
    this.$store.commit('SET_StateType', 1)
    this.$store.commit('SET_StateTypeData', 1)
    this.$store.commit('Set_party_stateType', 1)
    if(!this.$store.state.Main_wydsData) GetWyds(this)
  },
  beforeRouteEnter (to, from, next) {
    next(vm=>{
      if(from.name==='AreaSelection' && vm.$store.state.Temp_VillageIdChange){
        vm.$store.state.Temp_VillageIdChange=false
        vm.reload()
      }else if(from.name==='villagePublishList'){
        GetWyds(vm)
      }
    })
  }
};
</script>
