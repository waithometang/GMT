<template>
  <div class="particulars">
    <voteHead
      :state="0"
      :images="infoData.dbtp"
      :title="infoData.hdby"
      ref="voteHead"
    />
    <div class="info">
      <div class="info-tab">
        <i class="info-tab-icon"></i>活动开始：{{ infoData.hdkssj }}
      </div>
      <div class="info-tab">
        <i class="info-tab-icon"></i>活动截止：{{ infoData.hdjssj }}
      </div>
      <div class="info-tab">
        <i
          class="info-tab-icon"
          :style="{ backgroundImage: 'url(/static/vote/gui.png)' }"
        ></i
        >活动规则：{{ infoData.hdgzjj }}
      </div>
    </div>
    <!-- <div class="content">
      <p v-html="infoData.hdgzxq"></p>
    </div> -->
    <div class="tost">由佛山市高明区政务服务数据管理局提供技术支持</div>
  </div>
</template>

<script>
import voteHead from './component/voteHead'
// import { tphdxx } from  '@/api/secondLevelPage'
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
      this.$indicator.open()
      this.$post('api/mlgm/BmzjTpList', {
        search: ''
      }).then(rps => {
        if (rps.data.success) {
          this.$indicator.close()
          this.$store.commit('SetruleInfo', rps.data.content.hdxx)
        } else {
          this.$indicator.close()
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