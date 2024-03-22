<template>
  <div class="txewm" :class="{'txewm-action':!listData.sfzj}" v-if="listData">
    <div class="txewm_pages" v-if="listData.sfzj">
      <div class="txewm_img">
        <qrcode-vue v-show="listData.sfzj" :value="listData.ewm" :size="250" foreground="black" level="H"></qrcode-vue>
      </div>
      <div class="txewm_item">
        <div class="txewm_list">
          <span>中奖事项：{{listData.sx}}</span>
        </div>
        <div class="txewm_list">
          <span>中奖人姓名：{{listData.xm}}</span>
        </div>
        <div class="txewm_list">
          <span>中奖结果：{{listData.jg}}</span>
        </div>
        <div class="txewm_list">
          <span>领取状态：{{listData.lqzt}}</span>
        </div>
      </div>
      <div class="txewm-info" v-if="listData.sfzj">
        您已中签{{listData.sx}}，请于<span>3月11日到3月18日{{listData.sszj}}{{listData.sssq}}党群服务中心</span>，凭本微信通知出示电子二维码领取口罩1包
      </div>
      <div class="txewm-but" v-if="$route.params.flag && listData.lqzt === '未领取'" @click="setState">领取核销</div>
    </div>
    <div class="losing-lottery" v-else>
      <div class="head"></div>
      <div class="middle">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;感谢您关注高明通，后续即将推出更多活动和民生服务，“高明通、通民心”，解决您的需求就是我们的追求，让我们共同创造高明美好生活！</div>
    </div>
  </div>
</template>
<script>
import QrcodeVue from 'qrcode.vue'
import { Dialog } from 'vant';
import { kzewm, kzzjhx } from '@/api/secondLevelPage';

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
				message: '请已经对中奖人信息确认'
			}).then(() => {
        kzzjhx({
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
    this.$indicator.open('加载中...')
    kzewm({
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
</script>
<style lang="scss" scoped>
@import "./style/txewm.scss";
.txewm {
  height: 100vh;
}
</style>