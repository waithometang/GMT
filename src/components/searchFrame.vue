<template>
  <div class="searchFrame">
    <div class="serch">
      <div>
        <input placeholder="请输入搜索内容" type="text" v-model="key">
        <img src="/images/secondLevelPages/search.png">
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      key: ""
    };
  }
};
</script>

<style lang='scss' type='text/css' scoped>
.searchFrame {
  position: relative;
  overflow: hidden;
  background: #ffffff;
  .serch {
    height: 60px;
    border-bottom: 1px solid;
    border-color: #ffffff;
    padding: 20px 20px 20px 20px;
    background: #ffffff;
    div {
      height: 60px;
      display: flex;
      background: #f4f4f4;
      border-radius: 15px 15px 15px 15px;
      input {
        border-radius: 15px 15px 15px 15px;
        width: 643px;
        border: none;
        margin-right: 7px;
        background: #f4f4f4;
        padding-left: 20px;
      }
      img {
        height: 35px;
        margin-top: 10px;
        margin-right: 22px;
      }
    }
  }
}
</style>
