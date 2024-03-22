<template>
  <div class="featureList">
    <!-- 村居业务 -->
    <!-- 功能导航 -->
    <keep-alive>
      <primaryNavigation :ButtomTageState="ButtomTageState"></primaryNavigation>
    </keep-alive>
    <!-- 展示内容 -->
    <div class="content" v-if="ButtomTageState == 1">
      <div class="hread" @click="goto">
        <img :src="imagesData">
        <span>更多 <img src="/images/gengduo.png" /></span>
      </div>
      <div class="fot">
        <img src="/images/FirstLevelPage/img_01.jpg">
      </div>
    </div>
  </div>
</template>

<script>
import Notification from "./notification";
import primaryNavigation from "./primaryNavigation";
import VillageAffairs from "./VillageAffairs";

export default {
  props: ["ButtomTageState"],
  components: {
    Notification,
    VillageAffairs,
    primaryNavigation
  },
  computed: {
    // 动态展示内容图标
    imagesData() {
      if (this.ButtomTageState == 1) {
        return "/images/FirstLevelPage/development.png"
      }
      if (this.ButtomTageState == 2) {
        return "/images/FirstLevelPage/development02.png"
      }
      if (this.ButtomTageState == 3) {
        return "/images/FirstLevelPage/GMLQ.png"
      }
      if (this.ButtomTageState == 4) {
        return "/images/FirstLevelPage/development04.png"
      }
      if (this.ButtomTageState == 6) {
        return "/images/FirstLevelPage/apply.png"
      }
    }
  },
  methods: {
    // 查看更多
    goto() {
      if (this.ButtomTageState == 1) {
        this.$router.push({
          path: "/recentNewsList"
        });
      }
    }
  }
};
</script>

<style lang="scss" scoped type="text/css">
@import "@/style/FirstLevelPage/featureList.scss";
</style>

