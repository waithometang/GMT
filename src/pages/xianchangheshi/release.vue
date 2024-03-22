<template>
  <div class="release">
    <GmtSelectTab :TabData="TabData" :TabStateData="TabStateData" @changeTabState="setTabStateData"/>
    <ReleaseFrom v-if="TabStateData === 1" />
    <ReleaseList v-if="TabStateData === 0" />
  </div>
</template>

<script>
import GmtSelectTab from '@/components/GmtSelectTab'
import ReleaseFrom from './component/releaseFrom'
import ReleaseList from './component/releaseList'

export default {
  components: {
    GmtSelectTab,
    ReleaseFrom,
    ReleaseList
  },
  data () {
    return {
      TabData: [{name: '我的发布', type: 0}, {name: '我要发布', type: 1}],
    }
  },
  computed: {
    TabStateData () {
      return this.$store.state.FbInfoTag
    },
    releaseState () {
      return this.$route.params.releaseState*1
    }
  },
  methods: {
    setTabStateData (item) {
      this.$store.commit('Set_FbInfoTag', item.type)
    }
  },
  created () {
    if (this.releaseState === 3) {
      document.title = '现场考核发布'
    } else {
      document.title = '我的发布'
    }
  },
  beforeRouteEnter (to, from, next) {
    next(vm=>{
      if(from.name==='index' || from.name==='CommitteeMembers' || from.name === 'villageDirectConnection' || from.name === 'partyintegral'){
        vm.$store.commit('Set_FbInfoTag', 1)
      }
     if (from.name === 'xgrelease') {
        vm.$store.commit('Set_FbInfoTag', 0)
        vm.$store.commit("SetUploadPicturesSrc", '')
        vm.$store.commit("SetMainIdData",'')
      }
    })
  }
}
</script>

<style lang='scss' scoped>
.release {
  background: #ffffff;
}
</style>