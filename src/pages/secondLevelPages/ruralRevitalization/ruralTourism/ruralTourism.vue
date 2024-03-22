<!-- 乡村旅游 二级页面 -->
<template>
  <div class="RuralTourism">
    <div class="pages">
      <div @click="CutPages(1)">
        <img src="/images/secondLevelPages/TouristAttractions.png">
        旅游景点
      </div>
      <div @click="CutPages(2)">
        <img src="/images/secondLevelPages/eat.png">
        吃在高明
      </div>
      <div @click="CutPages(3)">
        <img src="/images/secondLevelPages/live.png">
        住在高明
      </div>
      <div @click="CutPages(4)">
        <img src="/images/secondLevelPages/line.png">
        行在高明
      </div>
      <div @click="CutPages(5)">
        <img src="/images/secondLevelPages/tourism.png">
        旅游动态
      </div>
      <div @click="CutPages(6)">
        <img src="/images/secondLevelPages/vr.png">
        VR景点
      </div>
    </div>
  </div>
</template>
<script>
export default {
  methods: {
    CutPages(item) {
      if (item == 1) {
        // 红黑榜
        this.$router.push({
          path: "/TouristAttractions",
          query: {}
        });
      }
    }
  }
};
</script>

<style scoped lang="scss">
.RuralTourism {
  margin: 0px;
  padding: 0px;
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: url("/images/secondLevelPages/bg_01.jpg");
  background-size: 100% 100%;
  text-align: center;
  .pages {
    width: 706px;
    height: 468px;
    margin: auto;
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    div:nth-child(2n) {
      margin-left: 24px;
    }
    div {
      width: 335px;
      height: 140px;
      background: rgba(255, 255, 255, 1);
      box-shadow: 0px 0px 20px 0px rgba(60, 205, 172, 0.35);
      border-radius: 10px;
      display: inline-block;
      text-align: center;
      line-height: 140px;
      font-size: 32px;
      margin-bottom: 24px;
      font-family: PingFang-SC-Bold;
      font-weight: bold;
      color: rgba(51, 51, 51, 1);
      img {
        width: 80px;
        height: 70px;
        vertical-align: middle;
      }
    }
  }
}
</style>
