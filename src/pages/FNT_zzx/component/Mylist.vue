<template>
  <div class="list">
    <GmtSearchList url="fapi/qzhd/yyzxList" :parms="{isAll: false}" :pageSize="10">
      <template slot="item" slot-scope="listData">
        <public-List-Tab :listData="listData.data" :listType="'consult'" @public_list_click="goReply"></public-List-Tab>
      </template>
    </GmtSearchList>
  </div>
</template>
<script>
import GmtSearchList from '@/components/GmtSearchList'
  export default {
    components: {
      GmtSearchList
    },
    data() {
      return {
        value: ''
      }
    },
    methods: {
      goReply(item) {
        // this.$router.push(`/zx_reply?id=${item.id}&type=2`)
        this.$router.push(`/fntzzxxq/${item.id}/2`)
      },
      clickSearch() {
      }
    }
  }
</script>
