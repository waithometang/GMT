<template>
  <div class="dkxq">
    <div class="diamonds">
      <div class="diamonds-title">基本信息</div>
      <div class="diamonds-name">姓&nbsp;&nbsp;&nbsp;&nbsp;名:&nbsp;&nbsp;&nbsp;&nbsp;{{listData.xm}}</div>
      <div class="diamonds-name">身份证号:&nbsp;&nbsp;&nbsp;&nbsp;{{listData.sfzh}}</div>
      <div class="diamonds-name">打卡人姓名:&nbsp;&nbsp;{{listData.dkr_xm}}</div>
      <div class="diamonds-name">打卡人手机:&nbsp;&nbsp;{{listData.dkr_lxdh}}</div>
      <div class="diamonds-name">打卡时间:&nbsp;&nbsp;&nbsp;&nbsp;{{listData.dksj}}</div>
      <!-- <div class="diamonds-name">关&nbsp;&nbsp;&nbsp;&nbsp;系:&nbsp;&nbsp;&nbsp;&nbsp;{{listData.gx}}</div> -->
    </div>
    <div class="diamonds">
      <div class="diamonds-title">目前所在地区</div>
      <div class="diamonds-name">{{listData.szdq}}</div>
    </div>
    <div class="diamonds">
      <div class="diamonds-title">前14天是否从湖北返回广东</div>
      <div class="diamonds-name">{{listData.sfhbfg}}</div>
    </div>
    <div class="diamonds">
      <div class="diamonds-title">前14天是否接触过从湖北返回广东人员</div>
      <div class="diamonds-name">{{listData.sfjchbfgry}}</div>
    </div>
    <div class="diamonds">
      <div class="diamonds-title">是否在进行医学观察</div>
      <div class="diamonds-name">{{listData.sfyxgc}}</div>
    </div>
    <div class="diamonds">
      <div class="diamonds-title">是否有异常临床表现</div>
      <div class="diamonds-name">{{listData.sfyclcbx}}</div>
    </div>
    <div class="diamonds">
      <div class="diamonds-title">备注</div>
      <div class="diamonds-name">{{listData.bz}}</div>
    </div>
  </div>
</template>

<script>
import { dktjxx } from '@/api/secondLevelPage';

export default {
  data () {
    return {
      listData: ''
    }
  },
  created () {
    dktjxx({
      id: this.$route.params.id
    }).then (rps => {
      if (rps.data.success) {
        this.listData = rps.data.content
      } else {
        this.changtoast(rps.data.message, 'error')
      }
    })
  }
}
</script>

<style lang='scss' scoped>
@import './style/dkxq.scss';
</style>