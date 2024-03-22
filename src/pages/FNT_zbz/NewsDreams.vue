<template>
  <div class="content"  ref="content" :style="styleData">
    <GmtSearchList url="fapi/qzhd/wxyList" :parms="{rl:1}" :pageSize="10">
      <template slot="item" slot-scope="listData" >
        <dreams :listData="listData.data" :type="'news'"/>
      </template>
    </GmtSearchList>
  </div>
</template>
<script>
import GmtSearchList from '@/components/GmtSearchList'
import dreams from './conponents/dreams'

export default {
  data () {
    return {
      styleData: {}
    }
  },
  components: {
    GmtSearchList,
    dreams
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