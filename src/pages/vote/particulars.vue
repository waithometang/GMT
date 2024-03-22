<template>
  <div class="particulars">
    <voteHead :state="0" :images="infoData.dbtp" :title="infoData.hdby" ref="voteHead"/>
    <div class="info">
      <div class="info-tab">
        <i class="info-tab-icon"></i>活动开始：{{infoData.tpkssj}}
      </div>
      <div class="info-tab">
        <i class="info-tab-icon"></i>活动截止：{{infoData.tpjzsj}}
      </div>
      <div class="info-tab">
        <i class="info-tab-icon" :style="{backgroundImage: 'url(/static/vote/gui.png)'}"></i>活动规则：{{infoData.hdgz}}
      </div>
    </div>
    <div class="content">
      <p>{{infoData.hdxq}}</p>
    </div>
    <div class="tost">
      由佛山市高明区政务服务数据管理局提供技术支持
    </div>
  </div>
</template>

<script>
import voteHead from './component/voteHead'
import { tphdxx } from  '@/api/secondLevelPage'
export default {
  components: {
    voteHead
  },
  computed: {
    infoData () {
      return this.$store.state.ruleInfo
    }
  },
  created () {
    if (!this.infoData) {
      tphdxx().then (rps => {
        if (rps.data.success) {
          this.$store.commit('SetruleInfo', rps.data.content)
        } else {
          this.changtoast(rps.data.message, 'error')
        }
      })
    }
  },
  activated () {
    this.$refs.voteHead.scroll()
  },
  deactivated () {
    this.$refs.voteHead.clos()
  },
  beforeRouteEnter (to, from, next) {
    next(vm => {
      vm.$store.commit('SetbuttomTab', 2)
    })
  }
}
</script>

<style lang='scss' scoped>
@import './style/particulars.scss';
</style>