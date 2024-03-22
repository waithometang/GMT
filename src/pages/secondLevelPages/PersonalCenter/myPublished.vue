<template>
  <div class="myPublished">
    <GmtSelectTab :TabData="TabData" :TabStateData="TabStateData" @changeTabState="changeTabState"></GmtSelectTab>
    <div class="content">
      <personalPublished v-if="TabStateData == 1" @changTabStateData="SetTabStateData"></personalPublished>
      <personalPublishedList v-if="TabStateData == 0"></personalPublishedList>
    </div>
  </div>
</template>

<script>
import GmtSelectTab from "@/components/GmtSelectTab"
import personalPublished from './personalPublished'
import personalPublishedList from './personalPublishedList'
export default {
  components: {
    GmtSelectTab,
    personalPublished,
    personalPublishedList
  },
  data () {
    return {
      TabData: [{name: '我的发布', type:0}, {name: '我要发布', type: 1}],
    }
  },
  computed: {
    TabStateData () {
      return this.$store.state.FbInfoTag
    }
  },
  methods: {
    changeTabState (item) {
      this.$store.commit('Set_FbInfoTag', item.type)
    },
    SetTabStateData (item) {
      this.$store.commit('Set_FbInfoTag', item)
    }
  },
  beforeRouteEnter (to, from, next) {
    next(vm=>{
      if(from.name==='index' || from.name==='CommitteeMembers' || from.name === 'villageDirectConnection' || from.name === 'partyintegral'){
        vm.$store.commit('Set_FbInfoTag', 1)
      } else if (from.name === 'amendPersonalPublished') {
        vm.$store.commit('Set_FbInfoTag', 0)
        vm.$store.commit("SetUploadPicturesSrc", '')
        vm.$store.commit("SetMainIdData",'')
      }
    })
  }
}
</script>

<style lang='scss' scoped type="text/css">
 .content {
    position: absolute;
    top: 92px;
    bottom: 0;
    right: 0;
    left: 0;
    background: #fafafa;
 }
</style>
