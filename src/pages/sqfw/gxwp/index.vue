<template>
  <div class="container">
    <div class="head_img">
      <img src="../images/共享物品banner.png" />
    </div>
    <div class="tabs">
      <van-tabs v-model="active" title-active-color="#56BEF3" swipeable>
        <van-tab title="住宅小区">
          <zzxq></zzxq>
        </van-tab>
        <van-tab title="小屋物品">
          <xwwp></xwwp>
        </van-tab>
        <van-tab title="我要共享">
          <wygx></wygx>
        </van-tab>
        <van-tab title="物品借用">
          <wpjy></wpjy>
        </van-tab>
      </van-tabs>
    </div>
  </div>
</template>
<script>
import Zzxq from "./zzxq"
import Xwwp from "./xwwp"
import Wygx from "./wygx"
import Wpjy from "./wpjy"
export default {
  data() {
    return {
      active: 0
    }
  },
  components: {
    Zzxq,
    Xwwp,
    Wygx,
    Wpjy
  }
}
</script>
<style lang="scss" scoped>
.container {
  width: 100%;
  .head_img {
    width: 100%;
    height: 260px;
    img {
      width: 100%;
    }
  }
}
/deep/ .van-tabs__line {
  background-color: #3a98fe;
}
/deep/ .van-tabs__wrap {
  height: 100px;
  border-bottom: 12px solid #f4f4f4;
}
/deep/ .van-tabs__content {
  height: calc(100vh - 372px);
  overflow: hidden;
  overflow-y: scroll;
}
</style>