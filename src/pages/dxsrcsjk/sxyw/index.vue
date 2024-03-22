<template>
  <div class="PartyReport_index">
    <div class="PartyReport_select">
      <div
        :class="target === 1 ? 'target' : ''"
        class="PartyReport_select_list"
        @click="gotoJgdwsx"
      >
        机关单位实习
      </div>
      <div
        :class="target === 2 ? 'target' : ''"
        class="PartyReport_select_list"
        @click="gotoQysx"
      >
        企业实习
      </div>
    </div>
    <div class="PartyReport_main">
      <GmtSearchList
        url="api/Zx/dxsList"
        :parms="{
          type: 0,
          hdywLb: hdywLb
        }"
      >
        <template slot="item" slot-scope="listData">
          <GmtDefaultList
            :showYuDu="true"
            :listData="listData.data"
            :mkid="2"
            :type="'sxxq'"
          ></GmtDefaultList>
        </template>
      </GmtSearchList>
    </div>
  </div>
</template>
<script>
import GmtSearchList from "@/components/GmtSearchList.vue"
import GmtDefaultList from "../components/GmtDefaultList"
import { PublishUtil } from "@/js/businessUntil"
import { GetAddReaded, GetFblx } from "@/api/secondLevelPage"
import { GetPulishList } from "@/api/FirstLevelPage"
import { storage } from "@/js/until"
export default {
  data() {
    return {
      target: 1,
      listData: [],
      hdywLb: 0
    }
  },
  computed: {
    longData() {
      return storage.fetch("longData").data
    }
  },
  components: {
    GmtSearchList,
    GmtDefaultList
  },
  methods: {
    gotoJgdwsx() {
      this.target = 1
      this.hdywLb = 0
    },
    gotoQysx() {
      this.target = 2
      this.hdywLb = 1
    }
  }
}
</script>
<style lang="scss" scoped>
@import "./style/index.scss";
.PartyReport_select {
  padding-bottom: 0px !important;
}
</style>