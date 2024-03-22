<template>
  <div class="index">
    <div class="index_head">
      <BetterScroll>
        <template slot="BetterScroll">
          <head-images :GMT_IntShowWeather="true" :GMT_HeadImageData="GMT_HeadImageData"  v-if="ButtomTageState < 4"></head-images>
          <keep-alive>
            <feature-list :ShowBottom="true" v-if="ButtomTageState < 4"></feature-list>
          </keep-alive>
          <personal-home-page v-if="ButtomTageState == 4"></personal-home-page>
        </template>
      </BetterScroll>
    </div>
    <bottom-tag :isblack="1"></bottom-tag>
    <div class="release" v-if="showGrxx && ButtomTageState == 2" @click="Gotorelease()">发布</div>
  </div>
</template>
<script>
import BetterScroll from "@/components/BetterScroll";
import BottomTag from "@/components/BottomTag_v6";
import HeadImages from "@/components/headImages_v5.1";
import zoujin from "@/pages/secondLevelPages/zoujin/zoujin";
import FeatureList from "@/components/FirstLevelPage/featureList_v6";
import PersonalHomePage from "@/components/FirstLevelPage/PersonalHomePage";
import { AppSetting } from "@/api/FirstLevelPage.js";
import { GetWyds } from "@/js/businessUntil.js";
import { session_Storage } from '@/js/until'
import { mapActions } from 'vuex'

export default {
  components: {
    BottomTag,
    FeatureList,
    HeadImages,
    PersonalHomePage,
    BetterScroll
  },
  data () {
    return {
      /** 顶部图片显示内容*/
      GMT_HeadImageData: ['/static/banner2@2x.png','/images/imageshome_banner_1ss.jpg', '/images/home_banner_zx.jpg', '/images/Home_banner_3.jpg', '/images/home_banner_4s.jpg'],
      MenuData: [],
      showFbIds: [],
      WydsMenuIds:[],  //要显示未阅读数的菜单
      showGrxx: false
    }
  },
  computed: {
    ButtomTageState() {
      return this.$store.state.ButtomTageState;
    },
    sessionStorage () {
      return session_Storage.fetch('ButtomTageState').data
    },
    userinfo () {
      return this.$store.state.userinfo.id
    }
  },
  watch: {
    ButtomTageState () {
      if (this.ButtomTageState === 1) {
        this.GMT_HeadImageData = ['/static/banner2@2x.png','/images/imageshome_banner_1ss.jpg', '/images/home_banner_zx.jpg', '/images/Home_banner_3.jpg', '/images/home_banner_4s.jpg']
      }
      if (this.ButtomTageState === 3) {
        this.GMT_HeadImageData = ['/images/enterprise_banner.jpg']
      }
    },
    userinfo () {
      this._GetuserInfo()
    }
  },
  inject: ["reload"],
  methods:{
    ...mapActions(['GetuserInfo']),
    getWdWyds(){
      GetWyds(this,1,this.WydsMenuIds)
    },
    // 跳转发布页面
    Gotorelease () {
      this.$router.push({
        path: `/release`
        // path: `/personalPublished`
      })
    },
    _GetuserInfo (item) {
      this.GetuserInfo().then(rps => { // dyfb lwfb zlfb
        if (rps.dyfb || rps.lwfb || rps.zlfb || rps.zxkhfb) {
          this.showGrxx = true
        } else {
          this.showGrxx = false
        }
      })
    }
  },
  created() {
    this._GetuserInfo ()
    this.$store.commit('SET_StateTypeData', 1)
    this.$store.commit('Set_party_stateType', 1)
    if (this.sessionStorage) {
      this.$store.commit("Set_ButtomTageState", this.sessionStorage)
    }
    session_Storage.remove('ButtomTageState')
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
<style lang="scss" scoped type="text/css">
.index {
  min-height: 100vh;
  background: #ffffff;
  .index_head {
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    padding-bottom:120px; 
  }
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
}
</style>

