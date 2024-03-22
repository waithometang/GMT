<!-- 村居四大业务 -->
<template>
  <div class="VillageAffairs">
    <div class="list">
      <div class="list-li" :class="{'action': selectIndex == 1}">
        <div  class="content" @click="gotoPage('lwcys', 1)">
          <div class="icon">
            <img src="/images/FirstLevelPage/Home_icon04.png" alt>
          </div>
          <div class="tetile">两委成员</div>
        </div>
      </div>
      <div class="list-li" :class="{'action': selectIndex == 2}">
        <div class="content" @click="gotoPage('cjzl', 2)">
          <div class="icon">
            <img src="/images/FirstLevelPage/Home_icon12.png" alt>
          </div>
          <div class="tetile">村居直联</div>
        </div>
      </div>
      <div class="list-li" :class="{'action': selectIndex == 3}">
        <div class="content" @click="gotoPage('cjgk/3', 3)">
          <div class="icon">
            <img src="/images/FirstLevelPage/Home_icon03.png" alt>
          </div>
          <div class="tetile">村居概况</div>
        </div>
      </div>
      <div class="list-li" :class="{'action': selectIndex == 4}">
        <div class="content" @click="gotoPage('cjgk/4', 4)">
          <div class="icon">
            <img src="/images/FirstLevelPage/Home_icon09.png" alt>
          </div>
          <div class="tetile">村规民约</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { storage } from "@/js/until";

export default {
  data() {
    return {
      selectIndex: 0
    };
  },
  methods: {
    gotoPage(url, item) {
      let vid=storage.fetch("longData").data.id
      this.$router.push(`/${url}/${vid}`);
      this.selectIndex = item;
    }
  },
  destroyed: function() {
    this.selectIndex = 0;
  },
  watch: {
    $route(to,from){
      this.selectIndex = 0;
    }
  }
};
</script>

<style lang='scss' scoped type="text/css">
.VillageAffairs {
  position: relative;
  width: 750px;
  height: auto;
  background: rgba(255, 255, 255, 1);
  margin-bottom: 20px;
  .list {
    height: auto;
    list-style: none;
    margin: 0px 15px;
    display: flex;
    flex-wrap: wrap;
    .list-li {
      float: left;
      min-width: 180px;
      max-width: 180px;
      height: auto;
      .content {
        height: auto;
        margin: 36px 0;
        .icon {
          width: 60px;
          height: 50px;
          margin: 0 auto;
          margin-bottom: 20px;
          img {
            height: 100%;
            width: 100%;
          }
        }
        .tetile {
          height: auto;
          width: 100%;
          overflow: hidden;
          text-align: center;
          font-size: 28px;
          font-weight: 500;
          color: rgba(0, 0, 0, 1);
        }
      }
    }
    .action {
      background: #cccccc;
    }
  }
}
</style>
