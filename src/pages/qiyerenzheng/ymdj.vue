<template>
  <div class="qyrz">
    <div class="content">
      <div class="content_name">我的疫苗接种意愿登记</div>
      <div class="content_tab" v-if="hasYmdj">
        <div class="content_tab_name content_tab_name_no">
          暂无疫苗登记, 请先扫码进行疫苗登记吧
        </div>
      </div>
      <div v-else class="card">
        <div class="item">
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
  </div>
</template>

<script>
export default {
  name: '',
  components: {

  },
  props: {

  },
  data () {
    return {
      hasYmdj: false,
      qymc: '',
      qybm: '',
      sfzhm: '',
      xm: '',
      tel: ''
    };
  },
  computed: {

  },
  watch: {

  },
  created () {
    this._getYmData()

  },
  mounted () {

  },
  methods: {
    _getYmData () {
      this.$indicator.open()
      this.$post('api/qy/jzryxx').then(res => {
        this.$indicator.close()
        if (res.data.success) {
          if (!res.data.content) {
            this.hasYmdj = true
          } else {
            let data = res.data.content
            this.xm = data.member_name
            this.qymc = data.qymc
            this.sfzhm = data.member_sfzh
            this.tel = data.member_lxdh
            this.qybm = data.bmmc
          }
        } else {
          this.changtoast(res.data.message, 'error')
        }
      })
    }
  },
};
</script>

<style scoped lang="scss">
@import './style/index.scss';
</style>
