<template>
  <div class="main">
    <div class="img">
      <img src="./image/bg1.png" alt="" />
    </div>
    <div class="title">
      <p>电影票两张</p>
    </div>
    <div class="info">
      <p class="txt1">领奖方式</p>
      <p class="txt2">
        1.请凭借这个有效页面领取
        <br />
        2.领奖地址:高明区荷城街道沧江路88号文化广电<br />
        &nbsp;&nbsp; 旅游体育局3楼公共服务与艺术科 <br />
        3.时间截止至5月31日。
      </p>
    </div>
    <div class="dialogf" v-if="dialogShow">
      <div class="dialog">
        <van-icon name="cross" class="cross" @click="dialogShow = false" />
        <p class="txt3">请确认是否在现场拿到电影票？</p>
        <div class="dialog-footer">
          <div class="dialog-btn" @click="dialogShow = false">取消</div>
          <div class="dialog-btn btnr" @click="confirm">确认</div>
        </div>
      </div>
    </div>
    <div class="footer">
      <div class="btn1" v-if="!received" @click.prevent="dialogShow = true">
        领取
      </div>
      <div class="btn2" v-else>已领取</div>
    </div>
  </div>
</template>
<script>
export default {
  data () {
    return {
      dialogShow: false,
      received: '',
      twbh: '',
      plid: ''
    }
  },

  created () {
    this.twbh = this.$route.params.id
    this._GetState()
  },
  methods: {
    _GetState () {
      this.$post('/plcj/Plcj/Pllb', { twbh: this.twbh }).then(res => {
        if (res.data.content.djzt == '已兑奖') {
          this.received = true
        } else {
          this.received = false
        }
      })
    },
    confirm () {
      this.$post('/plcj/Plcj/Pldj', { twbh: this.twbh, plid: this.plid }).then(res => {
        this.received = true
      })
      this.dialogShow = false
      this.changtoast('领取成功')
    }
  },
}
</script>
<style lang='scss' scoped>
@import './style/ljtz.scss';
</style>