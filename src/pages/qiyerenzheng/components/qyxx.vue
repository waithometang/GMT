<template>
  <div class="attestationFrom">
    <div class="listFrom">
      <div class="listFrom_name">企业信息</div>
      <div class="listFrom_input">
        <div class="listFrom_input_tab">
          <div class="listFrom_input_tab_name">信用代码:</div>
          <div class="listFrom_input_tab_input">
            <input
              v-model="xydm"
              readonly
              type="text"
              placeholder="请输入统一社会信用代码"
            />
          </div>
        </div>
        <div class="listFrom_input_tab">
          <div class="listFrom_input_tab_name">企业名称:</div>
          <div class="listFrom_input_tab_input">
            <input
              v-model="qymc"
              type="text"
              readonly
              placeholder="请输入企业名称"
            />
          </div>
        </div>
        <div class="listFrom_input_tab">
          <div class="listFrom_input_tab_name">法人代表:</div>
          <div class="listFrom_input_tab_input">
            <input
              v-model="frdb"
              type="text"
              readonly
              placeholder="请输入法人名称"
            />
          </div>
        </div>
        <div class="listFrom_input_tab">
          <div class="listFrom_input_tab_name">法人身份证号码:</div>
          <div class="listFrom_input_tab_input">
            <input
              v-model="qydz"
              readonly
              type="text"
              placeholder="请输入法人身份证号码"
            />
          </div>
        </div>
      </div>
    </div>
    <div class="listFrom listFrommargin">
      <div class="listFrom_name">我的信息</div>
      <div class="listFrom_input">
        <div class="listFrom_input_tab">
          <div class="listFrom_input_tab_name">身份号码:</div>
          <div class="listFrom_input_tab_input">
            <input
              v-model="sfzhm"
              type="text"
              readonly
              placeholder="公民身份证号码"
            />
          </div>
        </div>
        <div class="listFrom_input_tab">
          <div class="listFrom_input_tab_name">姓名:</div>
          <div class="listFrom_input_tab_input">
            <input type="text" v-model="xm" readonly placeholder="请输入姓名" />
          </div>
        </div>
        <div class="listFrom_input_tab">
          <div class="listFrom_input_tab_name">联系电话:</div>
          <div class="listFrom_input_tab_input">
            <input
              type="text"
              v-model="tel"
              readonly
              placeholder="请输入联系电话"
            />
          </div>
        </div>
        <div class="listFrom_input_tab">
          <div class="listFrom_input_tab_name">认证状态:</div>
          <div class="listFrom_input_tab_input">
            <input type="text" v-model="rzzt" readonly />
          </div>
        </div>
      </div>
    </div>
    <div class="unbound" @click="unbound">解除绑定</div>
  </div>
</template>

<script>
import { Getqyrzxx, Getjcbd } from '@/api/secondLevelPage'
export default {
  name: '',
  components: {

  },
  props: ['id'],
  data () {
    return {
      xydm: '',
      qymc: '',
      frdb: '',
      qydz: '',
      sfzhm: '',
      xm: '',
      tel: '',
      rzzt: '',
    };
  },
  computed: {

  },
  watch: {

  },
  created () {
    this._Getqyrzxx()
  },
  mounted () {

  },
  methods: {
    // 获取详情
    _Getqyrzxx () {
      this.$indicator.open("")
      Getqyrzxx({
        id: this.id
      }).then(rps => {
        this.$indicator.close()
        if (rps.data.success) {
          let data = rps.data.content
          this.xydm = data.xydm
          this.qymc = data.qymc
          this.frdb = data.frdb
          this.qydz = data.qydz
          this.sfzhm = data.sfzhm
          this.xm = data.xm
          this.tel = data.tel
          this.rzzt = data.rzzt
        } else {
          this.changtoast(rps.data.message, "error")
        }
      })
    },
    // 解除绑定
    unbound () {
      Getjcbd({
        id: this.id
      }).then(rps => {
        if (rps.data.success) {
          this.$router.push(`/qyrz`)
          this.changtoast('解除成功')
        } else {
          this.changtoast(rps.data.message, 'error')
        }
      })
    },
  },
};
</script>

<style scoped lang="scss">
@import '../style/attestationFrom.scss';
</style>
