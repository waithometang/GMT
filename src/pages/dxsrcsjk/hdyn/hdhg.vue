<!--发布类列表通用页面-->
<template>
  <div>
    <div class="banner">
      <img src="../images/活动回顾.png" />
    </div>
    <GmtSearchList
      url="/api/Zx/dxsList"
      :parms="{
        type: 3
      }"
    >
      <template slot="item" slot-scope="listData">
        <GmtDefaultList
          :showYuDu="false"
          :listData="listData.data"
          :mkid="2"
          :type="'hdhgxq'"
        ></GmtDefaultList>
      </template>
    </GmtSearchList>
  </div>
</template>
<script>
import GmtSearchList from "@/components/GmtSearchList.vue"
import { PublishUtil } from "@/js/businessUntil"
import { GetAddReaded, GetFblx } from "@/api/secondLevelPage"
// import GmtDefaultList from "./component/GmtDefaultList"
import GmtDefaultList from "../components/GmtDefaultList"
import { GetPulishList } from "@/api/FirstLevelPage"
import { storage } from "@/js/until"

export default {
  data() {
    return {
      listData: []
    }
  },
  methods: {},
  created() {},
  components: {
    GmtSearchList,
    GmtDefaultList
  }
}
</script>
<style lang="scss" scoped>
@import "@/style/components/villagePublishList.scss";
.banner {
  width: 100%;
  img {
    width: 100%;
  }
}
/deep/ .blockserch {
  top: 410px !important;
}
</style>
