<template>
  <div class="PartyReport_index">
    <div class="PartyReport_select">
      <div
        :class="target === 1 ? 'target' : ''"
        class="PartyReport_select_list"
        @click="gotoXqfk"
      >
        需求反馈
      </div>
      <div
        :class="target === 2 ? 'target' : ''"
        class="PartyReport_select_list"
        @click="gotoWdfk"
      >
        我的反馈
      </div>
    </div>
    <div class="PartyReport_main">
      <xqfk v-if="target === 1" :target="target"></xqfk>
      <wdfk v-else-if="target === 2"></wdfk>
    </div>
  </div>
</template>
<script>
import Xqfk from "./xqfk"
import Wdfk from "./wdfk"
export default {
  data () {
    return {
      target: 1,
      listData: []
    }
  },
  components: {
    Xqfk,
    Wdfk
  },
  methods: {
    gotoXqfk () {
      this.target = 1
    },
    gotoWdfk () {
      this.target = 2
    }
  }
}
</script>
<style lang="scss" scoped>
@import './style/index.scss';
.PartyReport_select {
  padding-bottom: 0px !important;
}
/deep/ .MissiveList,
.blockserch {
  top: 111px !important;
  width: calc(100vw - 62px) !important;
  height: calc(100vh - 161px) !important;
}
/deep/ .existList {
  width: calc(100vw - 82px) !important;
  height: calc(100vh - 202px) !important;
}
</style>