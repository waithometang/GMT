<template>
  <div class="content"  ref="content" :style="styleData">
    <GmtSearchList url="fapi/qzhd/ZxxxList" :parms="{isall: state === 1 ? true : false}" :pageSize="10">
      <template slot="item" slot-scope="listData" >
         <public-List-Tab :listData="listData.data" @public_list_click="goLetterDetal" :listType="'mailbox'" :whetherOpen="state === 1 ? true : false" />
      </template>
    </GmtSearchList>
  </div>
</template>
<script>
import GmtSearchList from '@/components/GmtSearchList'

export default {
  props: {
    state: {
      type: Number,
      default: 1
    }
  },
  data () {
    return {
      styleData: {}
    }
  },
  components: {
    GmtSearchList
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
  methods: {
    goLetterDetal (item) {
      this.$router.push(`/fntxxxq/${item.id}/${this.state}`)
    }
  }
}
</script>