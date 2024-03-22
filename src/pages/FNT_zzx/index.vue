<template>
  <div class="main">
    <div class="button-tab">
      <div class="button-nor button-nor-margin" :class="{'on': bottonType == 1}" @click="BottonType(1)">大家的咨询</div>
      <div class="button-nor button-nor-margin" :class="{'on': bottonType == 2}" @click="BottonType(2)">我的咨询</div>
      <div class="button-nor" :class="{'on': bottonType == 3}" @click="BottonType(3)">我要咨询</div>
    </div>
    <div class="lsit-tab" ref="listTab" :style="styleData">
      <publicList v-if="bottonType === 1" />
      <Mylist v-if="bottonType === 2"/>
      <issueFrom @childFn="parentFn" v-if="bottonType === 3" />
    </div>
  </div>
</template>

<script>
import Mylist from './component/Mylist';
import publicList from './component/publicList';
import issueFrom from './component/issueFrom';

export default {
  data () {
    return {
      bottonType: 0,
      styleData: {}
    }
  },
  components: {
    Mylist,
    publicList,
    issueFrom
  },
  mounted () {
    this.$nextTick(val => {
      this.styleData = {
        position: 'absolute',
        top: this.$refs.listTab.offsetTop +'px',
        bottom:0,
        left: 0,
        right: 0,
      }
    })
  },
  methods: {
    BottonType (item) {
      this.bottonType = item
    },
    parentFn() {
      this.bottonType = 2
    },
  },
  beforeRouteEnter (to, from, next) {
    next(val => {
      let state = from.params.state*1
      if (state === 1) {
        val.bottonType = 1
      } else if (state === 2) {
        val.bottonType = 2
      } else {
        val.bottonType = 1
      }
    })
  }
}
</script>

<style lang='scss' scoped>
@import './style/index.scss';
</style>