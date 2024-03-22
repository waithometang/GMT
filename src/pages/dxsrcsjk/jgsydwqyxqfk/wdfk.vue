<template>
  <div class="PartyReport_record">
    <GmtSearchList url="api/Zx/dxsDwxqList">
      <template slot="item" slot-scope="listData">
        <div
          class="PartyReport_record_item"
          v-for="(item, index) in listData.data"
          @click="goto(item)"
          :key="index"
        >
          <div class="item_font">
            <p class="bold dwmc">{{ item.dw }}</p>
            <p class="bold">报名主题：{{ item.zt }}</p>
            <p class="bold">发布时间：{{ item.fbsj }}</p>
          </div>
          <div class="item_shjg reviewed" v-if="item.shzt === '通过'">
            {{ item.shzt }}&nbsp;>
          </div>
          <div class="item_shjg wait" v-else-if="item.shzt === '待审核'">
            {{ item.shzt }}&nbsp;>
          </div>
          <div class="item_shjg no_reviewed" v-else-if="item.shzt === '不通过'">
            {{ item.shzt }}&nbsp;>
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
    goto (item) {
      this.$router.push(`/jgsydwqyxqfk/xqfkxq/${item.id}`)
    }
  }
}
</script>
<style lang="scss" scoped>
@import './style/wdfk.scss';
</style>