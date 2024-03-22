<!-- 网上约办 我的预约列表 -->
<template>
  <div class="AppointmentList">
    <div class="contentList">
      <div class="list"  v-for="(item, index) in 12" :key="index">
        <div class="content">
          <div class="left">
            <img src="/images/tacitlyapprove.jpg">
          </div>
          <div class="right">[2019-12-31]</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {

}
</script>

<style lang='scss' type="text/css" scoped>
@import '@/style/components/secondLevelPages/homePage/AppointmentList.scss';
</style>
