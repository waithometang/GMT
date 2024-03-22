<template>
  <div class="qyewmxq">
    <div class="container">
      <!-- 二维码 -->
      <!-- <div class="ercode">
        <qrcode-vue :value="listData.ewm" :size="180" level="H"></qrcode-vue>
      </div>
      <div class="title">请出示二维码到对应的疫苗接种点接种</div> -->

      <!-- <div class="item">
        <div class="xx">
          <span></span>
          接种信息
        </div>
        <div class="mc">
          <div class="left">接种地点：</div>
          <div class="right">荷城街道社区医院</div>
        </div>
        <div class="bm">
          <div class="left">接种时间：</div>
          <div class="right">2021-03-26 9:00-17:30</div>
        </div>
      </div> -->
      <div class="item">
        <div class="xx">
          <span></span>
          企业信息
          <!-- <p>(仅需确认，无需填写)</p> -->
        </div>
        <div class="mc">
          <div class="left">企业名称：</div>
          <div class="right">{{ qymc }}</div>
        </div>
        <div class="bm">
          <div class="left">企业部门：</div>
          <div class="right">{{ qybm }}</div>
        </div>
      </div>
      <div class="item">
        <div class="xx">
          <span></span>
          我的信息
          <!-- <p>(仅需确认，无需填写)</p> -->
        </div>
        <div class="mc">
          <div class="left">身份号码：</div>
          <div class="right">{{ sfzhm }}</div>
        </div>
        <div class="bm">
          <div class="left">姓 名：</div>
          <div class="right">{{ xm }}</div>
        </div>
        <div class="bm">
          <div class="left">联系电话：</div>
          <div class="right">{{ tel }}</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import QrcodeVue from 'qrcode.vue'

export default {
  name: '',
  components: {
    QrcodeVue
  },
  props: {},
  data () {
    return {
      listData: {
        ewm: 'http://baidu.com/' // 测试二维码
      },
      qymc: '',
      qybm: '',
      sfzhm: '',
      xm: '',
      tel: ''
    };
  },
  computed: {
    bmid () {
      return parseInt(this.$route.query.bmid)
    },
    qyid () {
      return parseInt(this.$route.query.qyid)
    }
  },
  watch: {

  },
  created () {
    this._getData()
  },
  mounted () {
  },
  methods: {
    _getData () {
      this.$indicator.open()
      this.$post('api/qy/jzryxx', {
        bmid: this.bmid,
        qyid: this.qyid
      }).then(res => {
        this.$indicator.close()
        if (res.data.success) {
          let data = res.data.content
          console.log(data);
          this.xm = data.member_name
          this.qymc = data.qymc
          this.sfzhm = data.member_sfzh
          this.tel = data.member_lxdh
          this.qybm = data.bmmc
        } else {
          this.changtoast(res.data.message, 'error')
        }
      })
    }
  },
};
</script>

<style scoped lang="scss">
@import './style/ymyy.scss';
</style>
