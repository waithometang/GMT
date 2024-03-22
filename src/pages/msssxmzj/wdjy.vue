<template>
  <div class="wdjy">
    <template v-if="showDetails">
      <div
        class="content-wrapper"
        v-for="(item, index) in wdjyList"
        :key="index"
      >
        <div class="content-item" @click="handleDetail(item)">
          <div class="left-img">
            <img src="./images/left-icon.png" alt="" />
          </div>
          <div class="right-info">{{ item.xmmc }}&nbsp;【{{ item.rq }}】</div>
        </div>
      </div>
    </template>
    <template v-else>
      <wyjy :wdjy="wdjy" @backFn="handleBackFn" />
    </template>
  </div>
</template>

<script>
import wyjy from './wyjy'
export default {
  data() {
    return {
      wdjyList: [],
      showDetails: true,
      wdjy: {}
    }
  },
  components: {
    wyjy
  },
  created() {
    this.getListData()
  },
  methods: {
    handleDetail(row) {
      // this.$emit('showDetails', row)
      this.wdjy = row
      this.showDetails = false
    },
    getListData() {
      this.$indicator.open('加载中...')
      this.$post('/api/gcjd/mssxlist').then(res => {
        this.$indicator.close()
        if (res.data.success) {
          this.wdjyList = res.data.content
        } else {
          this.changtoast(res.data.message, 'error')
        }
      })
    },
    handleBackFn() {
      this.showDetails = true
    }
  }
}
</script>

<style scoped lang="scss">
@import './style/wdjy.scss';
</style>