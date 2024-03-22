<template>
<div class="policy">
  <div class="hread-img">
    <img src="static/FNT_IMAGES/zcxx1.png"/>
  </div>
  <div class="content" ref="content" :style="styleData">
    <GmtSearchList url="fapi/fb/ZczxList">
      <template slot="item" slot-scope="listData">
        <public-List-Tab :listData="listData.data" :listType="'PolicyInformation'" @public_list_click="goReply"></public-List-Tab>
      </template>
    </GmtSearchList>
  </div>
</div>
</template>

<script>
import GmtSearchList from '@/components/GmtSearchList'

export default {
  data () {
    return {
      styleData: {}
    }
  },
  components: {
    GmtSearchList
  },
  methods:{
    goReply(item){
      this.$router.push(`/fntxq/${item.id}`)
    }
  },
  mounted () {
    this.$nextTick(val => {
      this.styleData = {
        position: 'absolute',
        top: this.$refs.content.offsetTop +'px',
        bottom:0,
        left: 0,
        right: 0,
      }
    })
  },
}
</script>

<style lang="scss" scoped>
@import './style/index.scss';
</style>