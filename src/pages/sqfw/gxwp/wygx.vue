<template>
  <div class="container">
    <div class="head">
      <p>我的共享申请</p>
    </div>
    <div class="content" v-if="listData.length > 0">
      <div
        class="apply_list"
        v-for="(item, index) in listData"
        :key="index"
        @click="gotoGxsqxq(item.id)"
      >
        <div class="apply_list_head">
          <span class="title">{{ item.wpmc }}</span>
          <span class="wait" v-if="item.shzt === '待审核'">待审核</span>
          <span class="adopt" v-if="item.shzt === '审核通过'">审核通过</span>
          <span class="no_adopt" v-if="item.shzt === '审核不通过'"
            >审核不通过</span
          >
        </div>
        <div class="apply_list_item">
          <p class="apply_list_item_p">物品分类：{{ item.wpfl }}</p>
          <p class="apply_list_item_p">共享小屋：{{ item.gxxw }}</p>
          <p class="apply_list_item_p">申请时间：{{ item.sqsj }}</p>
        </div>
      </div>
    </div>
    <div class="content" v-else>
      <div class="no_data">
        <img src="../images/无数据.png" class="" />
        <p>暂无数据</p>
      </div>
    </div>
    <div class="btn" @click="gotoGxsq">
      <img src="../images/共享申请.png" />
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
  methods: {
    gotoGxsq() {
      this.$router.push(`/sqfw/gxwp/gxsq/${this.$route.params.vid}`)
    },
    gotoGxsqxq(id) {
      this.$router.push(`/sqfw/gxwp/gxsqxq/${id}`)
    }
  },
  created() {
    this.$indicator.open("加载中...")
    this.$post("api/PartyBuilding/gxsqList", { isAll: false }).then(res => {
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
@import "./style/wygx.scss";
</style>