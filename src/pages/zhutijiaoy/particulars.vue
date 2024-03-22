<!--发布类列表通用页面-->
<template>
  <div>
    <GmtSearchList url="api/Common/SPulishList" :parms="{mkid: 6}" >
      <template slot="item" slot-scope="listData">
        <GmtDefaultList :listData="listData.data"></GmtDefaultList>
      </template>
    </GmtSearchList>
  </div>
</template>
<script>
(function () {
  var isPageHide = false
  window.addEventListener('pageshow', function () {
    if (isPageHide) {
      window.location.reload()
    }
  });
  window.addEventListener('pagehide', function () {
   isPageHide = true
  })
})(window)

import GmtSearchList from "@/components/GmtSearchList.vue"
import GmtDefaultList from '@/components/GmtDefaultList'

export default {
  data() {
    return {
      mkid:0
    };
  },
  components: {
    GmtSearchList,
    GmtDefaultList
  }
};
</script>
<style lang="scss" scoped>
@import "@/style/components/villagePublishList.scss";
</style>
