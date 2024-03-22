<template>
  <div class="container">
    <div class="content_list" v-for="(item, index) in listData" :key="index">
      <div class="left_item">
        <img :src="item.fmtp" />
      </div>
      <div class="right_item">
        <p class="title">{{ item.xwmc }}</p>
        <p>{{ item.sssq }}</p>
        <p>电话:{{ item.lxdh }}</p>
        <p>地址:{{ item.xxdz }}</p>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      listData: []
    }
  },
  created() {
    this.$indicator.open("加载中...")
    this.$post("api/PartyBuilding/zzxqList").then(res => {
      this.$indicator.close()
      if (res.data.success) {
        this.listData = res.data.content
      } else {
        this.changtoast(res.data.message, "error")
      }
    })
  }
}
</script>
<style lang="scss" scoped>
@import "./style/zzxq.scss";
</style>