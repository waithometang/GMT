<!-- 个人中心 -->
<template>
  <div class="PersonalHomePage">
    <div class="main">
      <div class="pages">
        <div class="HeadPortrait">
          <img :src="userimages ? userimages : defaultimages">
        </div>
        <div class="fot" @click="goto">
          <img src="/images/FirstLevelPage/GrIcon01.png">
          <span>{{longData.name}}[切换]</span>
        </div>
      </div>
    </div>
    <feature-list :ButtomTageState="ButtomTageState"></feature-list>
  </div>
</template>

<script>
import FeatureList from "@/components/FirstLevelPage/featureList";
import { storage } from "@/js/until";
import { GetAvatarUrl } from "@/api/FirstLevelPage";

export default {
  data() {
    return {
      changedtype: 0,
      defaultimages: "/images/yuangong-ling_02.png",
			longData:""
    };
  },
  components: {
    FeatureList
  },
  computed: {
    userimages() {
      return storage.fetch("userimages").data;
    },
    ButtomTageState() {
      return this.$store.state.ButtomTageState;
    }
  },
	created(){
		this.longData=storage.fetch("longData").data;
	},
	watch:{
    $route( to , from ){
      this.longData=storage.fetch("longData").data;
    }
	},
  methods: {
    goto() {
      this.$router.push({
        path: "/AreaSelection"
      });
    }
  }
};
</script>


<style scoped lang="scss" type="text/css">
@import "@/style/FirstLevelPage/PersonalHomePage.scss";
</style>
