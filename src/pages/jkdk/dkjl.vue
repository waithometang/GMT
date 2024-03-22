<template>
  <div class="jkdk">
    <GmtSearchList url="api/yq/dkqkList" :useSearch="false">
      <template slot="item" slot-scope="listData">
        <div class="head-info">累计打卡次数：{{zcs}}  累计打卡天数：{{zts}}</div>
        <div class="jkdk-tab">
          <div class="tab-th">
            <div class="name">姓名</div>
            <div class="data">打卡日期</div>
            <div class="num">打卡次数</div>
            <div class="case">健康情况</div>
          </div>
          <div class="tab-th tab-tr" v-for="(item,index) in listData.data" :key="index">
            <div class="name">{{item.xm}}</div>
            <div class="data">{{item.rq}}</div>
            <div class="num">{{item.cs}}次</div>
            <div class="case">{{item.qk}}</div>
          </div>
        </div>
      </template>
    </GmtSearchList>
  </div>
</template>

<script>
import GmtSearchList from '@/components/GmtSearchList';
import { wdtkjltj } from '@/api/secondLevelPage';

export default {
  data () {
    return {
      zcs: 0,
      zts: 0
    }
  },
  components: {
    GmtSearchList
  },
  created () {
    this.$indicator.open()
    wdtkjltj ().then(rps => {
      this.$indicator.close()
      if (rps.data.success) {
        this.zcs = rps.data.content.zcs
        this.zts = rps.data.content.zts
      } else {
        this.changtoast(rps.data.message, 'error')
      }
    })
  }
}
</script>

<style lang='scss' scoped>
@import './style/jkdk.scss';
</style>