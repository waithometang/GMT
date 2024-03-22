<template>
  <div class="zxdt" v-if="tabState >= 0">
    <div class="public_head_imgae public_top_select_action">
      <img class="public_head_imgae_icon" src="/static/banner@2x.png" alt="">
    </div>
    <div class="public_top_select">
      <div class="public_top_select_tab" v-for="(item,index) in tabData" :key="index" :class="{'public_top_select_tab_action': tabState === item.type}" @click="setTabState(item)">{{item.name}}</div>
    </div>
    <div class="content" ref="content" :style="styleData">
      <div class="content_list" v-if="tabState >= 0">
        <publishList @skipExternal="skipExternal" v-if="tabState >= 0"/>
      </div>
    </div>
  </div>
</template>

<script>
import publishList from './components/publishList'
import { session_Storage } from "@/js/until"

export default {
  data () {
    return {
      tabData: [{name: '区级发布', type: 0}, {name: '镇街发布', type: 1}, {name: '村居发布', type: 2}, {name: '群众反映', type: 9}],
      styleData: {},
    }
  },
  components: {
    publishList
  },
  computed: {
    tabState () {
      return this.$store.state.zxdtTagStata
    }
  },
  methods: {
    setTabState (item) {
      this.$store.commit('SetzxdtTagStata', item.type)
    },
    skipExternal () {
      session_Storage.save('tabState', this.tabState)
    }
  },
  mounted () {
    this.$nextTick(rps => {
      setTimeout(() => {
        let dome = this.$refs.content
        let domeTop =dome.offsetTop
        this.styleData = {
          position: 'absolute',
          top: domeTop + "px",
          bottom: 0,
          left: 0,
          right: 0,
        }
      }, 100);
    })
  },
  beforeRouteEnter (to, from, next) {
    next (vm => {
      let state = session_Storage.fetch('tabState').data
      if (state) {
        vm.$store.commit('SetzxdtTagStata', state)
      }
    })
  },
  beforeRouteLeave (to, from, next) {
    if (to.name != 'CommonPublishDetail' && to.name != 'zxdtxq' && to.name != 'pj') {
      session_Storage.remove('tabState')
      this.$store.commit('SetzxdtTagStata', 0)
    }
    next()
  }
}
</script>

<style lang='scss' scoped>
.zxdt {
  .content{
    .content_list {
      padding: 0 10px;
    }
  }
}
</style>