<template>
  <div class="select_Study">
    <div class="power" @click="goto(1)">企业办事</div>
    <div class="range" @click="goto(3)">我要反映</div>
  </div>
</template>
<script>
export default {
  methods : {
   goto(item) {
      if (item == 1) {
        window.location = "https://www.xuexi.cn/";
      } else if (item == 3) {
        window.location = "http://www.gdycjy.gov.cn/index.html";
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.select_Study {
  height: 120px;
  padding: 24px;
  margin-top: 20px;
  display: flex;
  background: #ffffff;
  div {
    width: 330px;
    display: flex;
    align-items: center;
    color: #ffffff;
    font-size: 36px;
    font-weight: 500;
    justify-content: center;
    &:last-child {
      margin-left: auto;
    }
  }
  .power {
    background-image: url("/images/partyStudy/img_02.png");
    background-size: 100% 100%;
  }
  .range {
    background: url("/images/partyStudy/img_03.png");
    background-size: 100% 100%;
  }
}
</style>
