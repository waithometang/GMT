<template>
  <div class="fnt_qd">
    <GmtSearchList url="fapi/fb/ZtfbList" :useSearch="false" :parms="{lx: lxs}" :pageSize="10">
      <template slot="item" slot-scope="listData">
        <public-List-Tab :listData="listData.data" :listType="'list'" @public_list_click="goReply" :if_img="false"></public-List-Tab>
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
      lxs: "专题发布",
    };
  },
  methods: {
    goReply (item) {
      this.$router.push(`/fntQdxq/${item.id}`)
    }
  },
};
</script>

<style lang='scss' scoped>
@import './style/index.scss';
</style>