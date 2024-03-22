<template>
  <div class="txewm" :class="{'txewm-action':!listData.sfzj}" v-if="listData">
    <div class="txewm_pages" v-if="listData.sfzj">
      <!-- <div class="txewm_title">个体工商户口罩申购二维码</div> -->
      <div class="txewm_img">
        <qrcode-vue v-show="listData.sfzj" :value="listData.ewm" :size="250" foreground="black" level="H"></qrcode-vue>
      </div>
      <div class="txewm_item">
        <div class="txewm_list">
          <span>中奖事项： {{listData.zqrq}}个体工商户口罩申购</span>
        </div>
        <div class="txewm_list">
          <span>个体户名称：{{listData.xm}}</span>
        </div>
        <div class="txewm_list">
          <span>证件号码：{{listData.sx}}</span>
        </div>
        <div class="txewm_list">
          <span>中奖结果：{{listData.jg}}</span>
        </div>
        <div class="txewm_list">
          <span>领取状态： {{listData.lqzt}}</span>
        </div>
      </div>
      <div class="txewm-info" v-if="listData.sfzj">
        {{listData.lqsm}}
      </div>
      <div class="txewm-but" v-if="$route.params.flag && listData.lqzt === '未领取'" @click="setState">领取核销</div>
    </div>
    <div class="losing-lottery" v-else>
      <div class="head head-action"></div>
      <div class="middle">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;温馨提醒：你所提交的资料不符合个体工商户口罩预约申购规则，请您重新提交准确资料进行预约，谢谢。</div>
      <p>如有疑问，请联系：</p>
      <p>区市场监管局信用风险监管科</p>
      <p>88662626，88822413</p>
      <!-- <div class="middle">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;如有疑问，请联系:区市场监管局信用风险监管科 88662626，88822413。</div> -->
    </div>
  </div>
</template>
<script>
import QrcodeVue from 'qrcode.vue'
import { Dialog } from 'vant';
import { gthkzewm, gthkzzjhx, gthkzewmbyid } from '@/api/secondLevelPage';

export default {
  data () {
    return {
      listData: '',
    }
  },
  components: {
    QrcodeVue,
  },
  methods: {
    setState () {
      Dialog.confirm({
				title: '提示',
				message: '请确认已与中签人核对信息'
			}).then(() => {
        gthkzzjhx({
          flag: this.$route.params.flag
        }).then (rps => {
          if (rps.data.success) {
            // this.changtoast('核销成功')
            this.listData.lqzt = '已领取'
            Dialog.alert({
              title: '温馨提示',
              confirmButtonText:'确定',
              confirmButtonColor:'#00bede',
              message: '核销成功'
            }).then(() => {});
          } else {
            this.changtoast(rps.data.message, 'error')
          }
        })
      })
    }
  },
  created () {
    if (this.$route.query.id || this.$route.query.mdid) {
      this.$indicator.open('加载中...')
      gthkzewmbyid({
        id: this.$route.query.id,
        mdid: this.$route.query.mdid
      }).then(rps => {
        if (rps.data.success) {
          this.listData = rps.data.content
        } else {
          if (rps.data.errorCode === 420) {
            Dialog.alert({
              title: '温馨提示',
              confirmButtonText:'知道了',
              confirmButtonColor:'#00bede',
              message: rps.data.message
            }).then(() => {
              WeixinJSBridge.call('closeWindow')
            });
            return
          }
          this.changtoast(rps.data.message, 'error')
        }
      })
    } else {
      this.$indicator.open('加载中...')
      gthkzewm({
        flag: this.$route.params.flag
      }).then (rps => {
        if (rps.data.success) {
          this.listData = rps.data.content
        } else {
          if (rps.data.errorCode === 420) {
            Dialog.alert({
              title: '温馨提示',
              confirmButtonText:'知道了',
              confirmButtonColor:'#00bede',
              message: rps.data.message
            }).then(() => {
              WeixinJSBridge.call('closeWindow')
            });
            return
          }
          this.changtoast(rps.data.message, 'error')
        }
      })
    }
  }
}
</script>
<style lang="scss" scoped>
@import "./style/txewm.scss";
.txewm {
  height: 100vh;
}
</style>