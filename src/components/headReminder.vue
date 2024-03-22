<!-- 列表顶部提示 -->
<template>
  <div class="headReminder">
    <div class="head">
      <div class="icon"></div>共{{number}}条{{typeName}} (上拉加载更多)
    </div>
  </div>
</template>

<script>
export default {
  props: ['number', 'typeName']
};
</script>

<style lang='scss' type='text/css' scoped>
.headReminder {
  background: #f4f4f4;
  .head {
    height: 50px;
    background: #f4f4f4;
    display: flex;
    font-size: 26px;
    text-align: left;
    line-height: 50px;
    font-family: MicrosoftYaHei;
    font-weight: 400;
    color: rgba(101, 101, 101, 1);
    .icon {
      width: 6px;
      height: 24px;
      margin-top: 13px;
      margin-left: 22px;
      margin-right: 22px;
      background: rgba(24, 130, 214, 1);
      border-radius: 1px;
    }
  }
}
</style>
