<!-- 最新动态列表 -->
<template>
  <div class="NotificationList">
    <div class="contentList recentNewsList">
      <GmtSearchList
        url="api/VillageOpen/GetLastNewsList"
        :useSearch="true"
        :parms="{VillageId:this.longData.id}"
      >
        <template slot="item" slot-scope="listData">
          <release-content-list :GMT_FBLB="0" :url="url" :listData="listData.data"></release-content-list>
        </template>
      </GmtSearchList>
    </div>
  </div>
</template>

<script>
import releaseContentList from "@/components/releaseContentList";
import GmtSearchList from "@/components/GmtSearchList.vue";
import { storage, disposeApiData } from "@/js/until";
export default {
  components: {
    releaseContentList,
    GmtSearchList
  },
  data() {
    return {
      url: "cjfb",
      titleData: 6,
      stopInfinite: false,
      listData: [],
      pageIndex: 1,
      pageSize: 10 //
    };
  },
  computed: {
    longData() {
      return storage.fetch("longData").data;
    }
  }
};
</script>

<style lang='scss' type="text/css" scoped>
@import "@/style/pages/secondLevelPages/homePage/NotificationList.scss";
</style>
