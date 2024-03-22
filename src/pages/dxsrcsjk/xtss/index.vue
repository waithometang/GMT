<template>
  <div class="PartyReport_index">
    <div class="PartyReport_select">
      <div
        :class="target === 1 ? 'target' : ''"
        class="PartyReport_select_list"
        @click="gotoXtss"
      >
        系统申述
      </div>
      <div
        :class="target === 2 ? 'target' : ''"
        class="PartyReport_select_list"
        @click="gotoWdss"
      >
        我的申述
      </div>
    </div>
    <div class="PartyReport_main">
      <xtss v-if="target === 1" :target="target"></xtss>
      <wdss v-else-if="target === 2"></wdss>
    </div>
  </div>
</template>
<script>
import Xtss from "./xtss"
import Wdss from "./wdss"
export default {
  data() {
    return {
      target: 1,
      listData: []
    }
  },
  components: {
    Xtss,
    Wdss
  },
  methods: {
    gotoXtss() {
      this.target = 1
    },
    gotoWdss() {
      this.target = 2
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