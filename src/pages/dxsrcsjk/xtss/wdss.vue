<template>
  <div class="PartyReport_record">
    <GmtSearchList url="api/Zx/dxsXtssList">
      <template slot="item" slot-scope="listData">
        <div
          class="PartyReport_record_item"
          v-for="(item, index) in listData.data"
          @click="goto(item)"
          :key="index"
        >
          <div class="item_font">
            <p class="bold">姓名：{{ item.xm }}</p>
            <p class="bold">联系电话：{{ item.lxfs }}</p>
            <p class="bold">申述内容：{{ item.nr }}</p>
          </div>
          <div class="item_shjg reviewed" v-if="item.shzt === '通过'">
            {{ item.shzt }}
          </div>
          <div class="item_shjg wait" v-else-if="item.shzt === '待审核'">
            {{ item.shzt }}
          </div>
          <div class="item_shjg no_reviewed" v-else-if="item.shzt === '不通过'">
            {{ item.shzt }}
          </div>
        </div>
      </template>
    </GmtSearchList>
  </div>
</template>
<script>
import GmtSearchList from "@/components/GmtSearchList.vue"
export default {
  components: {
    GmtSearchList
  },
  methods: {
    goto(item) {
      this.$router.push(`/xtss/xtssxq/${item.id}`)
    }
  }
}
</script>
<style lang="scss" scoped>
@import "./style/wdss.scss";
</style>