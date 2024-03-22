<!-- 随手拍列表 -->
<template>
  <div class="randomlySnapPictureList">
    <scroller :on-infinite="infinite" :on-refresh="refresh" ref="my_scroller">
      <div class="contentList">
        <div class="content" v-for="(item, index) in listData" :key="index">
          <div class="iamges" @click="lookOverParticulars(item)">
            <img v-if="item.imgUrl" :src="item.imgUrl">
            <img v-else src="/images/FirstLevelPage/tacitlyapprove.jpg">
          </div>
        </div>
      </div>
    </scroller>
  </div>
</template>

<script>
import { storage, disposeApiData } from "@/js/until";
import { GetShotList } from "@/api/secondLevelPages/ruralRevitalization";
export default {
  props: ["stateType"],
  watch: {
    stateType() {
      this.IsAll = false;
      this.pageIndex = 1;
      this.$refs.my_scroller.finishInfinite(false);
      this.listData = [];
    }
  },
  data() {
    return {
      pageIndex: 1, // 页数
      pageSize: 10, // 没页数量
      IsAll: false,
      listData: [] // 保存请求获取的数据
    };
  },
  computed: {
    longData() {
      return storage.fetch("longData").data;
    }
  },
  methods: {
    // 获取随手拍列表
    _GetShotList(done) {
      GetShotList({
        pageIndex: this.pageIndex,
        pageSize: this.pageSize,
        IsAll: this.IsAll,
        villageId: this.longData.id
      }).then(rps => {
        disposeApiData(rps, done, this);
      });
    },
    infinite(done) {
      this._GetShotList(done);
    },
    refresh(done) {
      this.pageIndex = 1;
      this.listData = [];
      this._GetShotList(done);
    },
    lookOverParticulars (item) {
      this.$router.push({
        path: '/randomlySnapPictureParticulars',
        query: {
          id: item.id
        }
      })
    }
  }
};
</script>

<style lang='scss' type="text/css" scoed>
@import "@/style/components//secondLevelPages/ruralRevitalization/randomlySnapPictureList.scss";
</style>
