<!-- 农技110 二级页面 v1 -->
<template>
  <div class="agriculture">
    <head-images :ButtomTageState="6"></head-images>
    <div class="listData" style="position: absolute; top: auto; width: 100%; height: 100%;">
      <GmtSearchList :url="url" :parms="{villageId: longData.id}">
        <template slot="item" slot-scope="listData">
          <releaseContentList :listData="listData.data" :url='detailsUrl'></releaseContentList>
        </template>
      </GmtSearchList>
      <!-- <div class="guidance" v-for="(item, index) in 7" :key="index">
        <div class="nameIcon">
          <div class="images">
            <img src="/images/FirstLevelPage/default.jpg">
          </div>
          <div class="titleTime">
            <div class="title">规模猪场如何合理的淘汰母猪规模猪场如何合理的淘汰母猪规模猪场如何合理的淘汰母猪</div>
            <div class="time">
              <div class="icon">
                <img src="/images/FirstLevelPage/time.png">
              </div>2018-08-14
            </div>
          </div>
        </div>
      </div> -->
    </div>
  </div>
</template>

<script>
import HeadImages from "@/components/headImages";
import GmtSearchList from  '@/components/GmtSearchList'
import releaseContentList from '@/components/releaseContentList'
import { storage } from '@/js/until'
export default {
  components: {
    HeadImages,
    GmtSearchList,
    releaseContentList,
  },
  data () {
    return {
      url: 'api/zx/Jszd',
      detailsUrl: '/jszdxq'

    }
  },
  computed: {
    longData () {
      return storage.fetch('longData').data
    }
  },
  methods: {
  }
};
</script>

<style lang="scss" scoped type="text/css">
@import "@/style/pages/secondLevelPages/agriculture110/agriculture.scss";
</style>
