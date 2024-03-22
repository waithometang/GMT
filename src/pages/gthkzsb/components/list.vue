<template>
  <div class="list">
    <div class="tab" v-for="(item, index) in listData" :key="index">
      <div class="tab-head">中签结果：{{item.jg}}</div>
      <div class="tab-middle" @click="check(item)">
        <div class="middle-tab">经营者姓名：{{item.xm}}</div>
        <div class="middle-tab">领取门店：{{item.yd}}</div>
        <div class="middle-tab">门店地址：{{item.dz}}</div>
        <!-- <div class="middle-tab">可购买日期：{{item.rq}}</div> -->
      </div>
    </div>
  </div>
</template>

<script>
import { zqjgList } from '@/api/secondLevelPage';

export default {
  data(){
    return {
      listData:[]
    }
  },
  methods: {
    check(item) {
      this.$router.push(`/grewm?id=${item.id}`)
    }
  },
  created(){
    zqjgList({}).then(rps => {
				this.$indicator.close()
				if (rps.data.success) {
          this.listData=rps.data.content
				} else {
					this.changtoast(rps.data.message, 'error')
				}
			})
  }
}
</script>

<style lang='scss' scoped>
@import '../style/list.scss';
</style>