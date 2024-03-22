<template>
  <div class="qyewmxq">
    <div class="container">
      <!-- 二维码 -->
      <div class="ercode">
        <qrcode-vue :value="listData.ewm" :size="180" level="H"></qrcode-vue>
      </div>
      <div class="title">{{ listData.qymc }}-{{ listData.bmmc }}</div>
      <div class="line"></div>
      <div class="item">
        <div class="xx">
          <span></span>
          企业信息
        </div>
        <div class="mc">
          <div class="left">企业名称：</div>
          <div class="right">{{ listData.qymc }}</div>
        </div>
        <div class="bm">
          <div class="left">企业部门：</div>
          <div class="right">{{ listData.bmmc }}</div>
        </div>
        <div class="bm">
          <div class="left">登记人数：</div>
          <div class="right">{{ personList.length || 0 }}</div>
        </div>
        <!-- <div class="xx">
          <span></span>
          登记名单
        </div> -->
      </div>
      <a
        download="登记表.xlsx"
        :href="djbUrl"
        class="btn"
        v-if="personList.length > 0"
      >
        <img src="../img/download.png" alt="" />
        <div class="export">导出登记名单</div>
      </a>
      <!-- <div class="btn" @click="download" v-if="personList.length > 0">
        <img src="../img/download.png" alt="" />
        <div class="export">导出登记名单</div>
      </div> -->
      <!-- <div class="member">
        <div
          class="member_item"
          v-for="(item, index) in personList"
          :key="index"
        >
          {{ item }}
        </div>
      </div> -->
    </div>
  </div>
</template>

<script>
import QrcodeVue from 'qrcode.vue'
// import { downLoadByUrl } from '@/js/until.js'

export default {
  name: '',
  components: {
    QrcodeVue
  },
  props: {},
  data () {
    return {
      listData: {
        ewm: '',
        qymc: '',
        bmmc: '',
      },
      personList: []
    };
  },
  computed: {
    list () {
      return JSON.parse(this.$route.query.data)
    },
    djbUrl () {
      return `api/qy/DownLoadBmb?bmid=${this.list.id}&qyid=${this.list.qyid}`
    }
  },
  watch: {

  },
  created () {
    // 正式的
    // ewm: `http://gmt.gaoming.gov.cn/`
    // 测试的
    // ewm: `http://gmt.znzwoa.com/`
    // 本地
    // ewm: `http://192.168.0.121:8080/`
    this.listData.ewm = `http://gmt.gaoming.gov.cn/qyymdj?bmid=${this.list.id}&qyid=${this.list.qyid}`
    this.listData.bmmc = this.list.bmmc
    this.listData.qymc = this.list.qymc

    this._getDjrsList()
  },
  mounted () {
    // setTimeout(() => {
    //   this.$router.push(`/qyymdj?bmid=${this.list.id}&qyid=${this.list.qyid}`)
    // }, 2000)
  },
  methods: {
    _getDjrsList () {
      this.$indicator.open()
      this.$post('api/qy/qyjzmRyList', {
        qyid: this.list.qyid,
        bmid: this.list.id
      }).then(res => {
        console.log(res);
        this.$indicator.close()
        if (res.data.success) {
          this.personList = res.data.content || []
        } else {
          this.changtoast(res.data.message, 'error')
        }
      })
    },

    // download () {
    //   console.log(this.list)
    //   let that = this
    //   this.$indicator.open('下载中...')
    //   downLoadByUrl(`api/qy/DownLoadBmb?bmid=${this.list.id}&qyid=${this.list.qyid}`, '登记名单.xlsx',
    //     () => {
    //       that.$indicator.close()
    //     },
    //     err => {
    //       that.changtoast(err, 'error')
    //     })
    // }
  },
};
</script>

<style scoped lang="scss">
@import '../style/qyewmxq.scss';
</style>
