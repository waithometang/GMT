<template>
  <div class="wyzp">
    <div class="public_top_select">
      <div class="public_top_select_tab" v-for="(item,index) in tabData" :key="index" :class="{'public_top_select_tab_action': tabDataState === item.type}" @click="setTabDataState(item.type)">{{item.name}}</div>
    </div>
    <issueRecruit v-if="tabDataState === 1" @setTab="setTabDataState"/>
    <infoList v-if="tabDataState === 0" />
  </div>
</template>

<script>
import GmtSelectTab from '@/components/GmtSelectTab'
import issueRecruit from './component/issueRecruit'
import infoList from './component/infoList'
import { mapActions } from 'vuex'
export default {
  components: {
    GmtSelectTab,
    issueRecruit,
    infoList
  },
  data () {
    return {
      tabData: [{name: '我的招聘', type: 0}, {name: '我要招聘', type: 1}],
      tabDataState: 1
    }
  },
  methods: {
    ...mapActions(['getGrxx']),
    setTabDataState (item) {
      this.tabDataState = item
    }
  },
  beforeRouteEnter(to, from, next) {
    next(vm => {
      vm.getGrxx().then (val => {
        if (!val.hasQY) {
          vm.$router.replace('/qyrz/1')
          return
        }
      })
      if (from.name === 'qyzpxq') {
        vm.tabDataState = 0
      }
    })    
  }
}
</script>

<style lang='scss' scoped>

</style>