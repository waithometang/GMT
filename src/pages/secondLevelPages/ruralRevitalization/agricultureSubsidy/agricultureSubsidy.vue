<!-- 涉农补助 二级页面 -->
<template>
  <div class="agricultureSubsidy">
    <head-images :ButtomTageState="6"></head-images>
    <secondLevelNavigation :ButtomTageState="6"></secondLevelNavigation>
    <!-- <div class="content">
      <div class="nameTitle" v-for="(item,index) in 6" :key="index">
        <div class="type">行政给付</div>
        <div class="title">对推广使用林木良种营造防护林、特种用特种用特种用特种用</div>
      </div>
    </div> -->
  </div>
</template>

<script>
import HeadImages from "@/components/headImages";
import secondLevelNavigation from '@/components/secondLevelNavigation'
export default {
  components: {
    HeadImages,
    secondLevelNavigation
  }
};
</script>

<style lang='scss' type="text/css" scoped>
.agricultureSubsidy {
  padding-bottom: 10px;
  .content {
    background: #ffffff;
    .nameTitle {
      width: 699px;
      height: 89px;
      margin: 0 28px 0 23px;
      border-bottom: 1px dotted  #cccccc;
      display: flex;
      .type {
        height: 50px;
        width: 180px;
        margin: 20px 24px 19px 0;
        background: rgba(218, 234, 253, 1);
        border-radius: 10px;
        font-size: 28px;
        text-align: center;
        line-height: 50px;
        overflow: height;
        font-family: PingFang-SC-Medium;
        font-weight: 500;
        color: rgba(3, 128, 255, 1);
      }
      .title {
        max-height: 50px;
        width: 100%;
        margin-top: 20px;
        font-size: 28px;
        text-align: center;
        line-height: 50px;
        overflow: hidden;
        font-family: PingFang-SC-Heavy;
        font-weight: 800;
        color: rgba(51, 51, 51, 1);
      }
    }
  }
}
</style>
