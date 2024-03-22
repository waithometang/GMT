<template>
  <div class="wedreams">
    <div class="button-tab">
      <div class="button-nor button-nor-margin" :class="{'on': bottonType == 1}" @click="BottonType(1)">我要认领</div>
      <div class="button-nor button-nor-margin" :class="{'on': bottonType == 2}" @click="BottonType(2)">我的认领</div>
    </div>
    <div class="content"  ref="content" :style="styleData">
      <GmtSearchList url="fapi/qzhd/wxyList" :useSearch="false" :parms="{rl:this.bottonType+1}" :pageSize="10">
        <template slot="item" slot-scope="listData" >
          <dreams :listData="listData.data" :type="'claim'" :bot="bottonType==1 ? false : true"/>
        </template>
      </GmtSearchList>
    </div>
  </div>
</template>
<script>
import GmtSearchList from '@/components/GmtSearchList'
import dreams from './conponents/dreams'
export default {
  data() {
    return {
      styleData: {}
    }
  },
  components: {
    GmtSearchList,
    dreams
  },
  computed: {
    bottonType () {
      return this.$store.state.fntrlState
    }
  },
  mounted () {
    this.$nextTick(val => {
      this.styleData = {
        position: 'absolute',
        top: this.$refs.content.offsetTop +'px',
        bottom: 0,
        left: 0,
        right: 0,
      }
    })
  },
  methods: {
    BottonType (item) {
      // this.bottonType = item
      this.$store.commit('SetfntrlState', item)
    }
  }
};
</script>
<style lang="scss" scoped>
@import './style/wedreams.scss';
</style>
