<template>
  <div class="indexHome">
    <BetterScroll>
      <template slot="BetterScroll">
        <!-- 顶部图片 -->
        <HeadImages  :ButtomTageState="this.GMT_type" :GMT_HeadImageData="GMT_HeadImageData" :GMT_IntShowSiteIcon="true"></HeadImages>
        <!-- 图标导航栏 -->
        <FeatureList :MenuData="MenuData" :VillageId="VillageId" :GMT_TageState="GMT_type" :showFbIds="showFbIds"></FeatureList>
      </template>
    </BetterScroll>
  </div>
</template>
<script>
import HeadImages from "@/components/headImages"
import BetterScroll from "@/components/BetterScroll";
import FeatureList from "@/components/FirstLevelPage/featureList_v6"
import { AppSetting } from "@/api/FirstLevelPage.js";
import { storage } from "@/js/until";
import { GetWyds } from "@/js/businessUntil.js";
  
export default {
  components: {
    HeadImages,
    FeatureList,
    BetterScroll
  },
  computed: {
    GMT_type () {
      return (this.$route.params.type)*1
    },
    longData(){
      return storage.fetch("longData").data
    }
  },
  methods: {
    init(){
      //先有村居
      if (!this.longData.id) {
        this.$router.push({
          path: "/AreaSelection"
        })
        return
      }
      this.VillageId=this.longData.id.toString()
      AppSetting(this.GMT_type).then(res=>{
        if(res.data.success){
          this.MenuData=res.data.content.menus
          this.showFbIds = res.data.content.showFbIds
          this.WydsMenuIds = res.data.content.fblIds
          // if (res.data.content.Banners && this.GMT_type == 5) {
          //   this.$store.commit('SetHeadImageBanner', rps.data.content)
          // }
          this.getWdWyds()
        }else{
          this.changtoast(res.data.message,'error')
        }
      })
      return this.$store.state.ButtomTageState;
    },
    getWdWyds(){
      GetWyds(this,this.GMT_type,this.WydsMenuIds)
    },
    goBack () {
      this.$router.push({
        path: '/index'
      })
    }
  },
  data () {
    return {
      /**顶部图片 */
      GMT_HeadImageData: ['/images/Pages_5.1/banner01.jpg', '/images/Pages_5.1//banner02.jpg', '/images/Pages_5.1//banner03.jpg', '/images/Pages_5.1//banner04.jpg'],
      GMT_TageState: 2,
      MenuData:[],
      showFbIds: [],
      VillageId:''
    }
  },
  created() {
    // this.init()
    switch (this.GMT_type) {
      case 2:
        document.title='村情通'
        break;
      case 3:
        document.title='智慧党建'
        break;
      case 4:
        document.title='乡村振兴'
        break;
    }
  },
  beforeRouteEnter (to, from, next) {
    next(vm=>{
      if(from.name==='CommonPublishList'){
        vm.getWdWyds()
      }
    })
  },
}
</script>

<style>
.indexHome{
  height: 100vh;
  /* background: #f2f9ff;   */
  background: #ffffff;
}
</style>
