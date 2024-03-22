<template>
  <div class="container">
    <img src="../images/hdtz.jpg" />
    <div class="content">
      <div class="content_item">
        <span class="label">活动名称：</span>
        <span class="item">{{ data.hdmc }}</span>
      </div>
      <div class="content_item">
        <span class="label">主办方：</span>
        <span class="item">{{ data.zbf }}</span>
      </div>
      <div class="content_item">
        <span class="label">活动地点：</span>
        <span class="item">{{ data.hddd }}</span>
      </div>
      <div class="content_item">
        <span class="label">联系方式：</span>
        <span class="item">{{ data.lxfs }}</span>
      </div>
      <div class="content_item">
        <span class="label">活动时间：</span>
        <span class="item">{{ data.hdsj }}</span>
      </div>
    </div>
    <div class="split"></div>
    <div class="explain">
      <p>活动说明：</p>
      <span v-html="data.hdsm"></span>
    </div>
  </div>
</template>
<script>
export default {
  data () {
    return {
      data: {}
    }
  },
  created () {
    this.$indicator.open("加载中...")
    this.$post("api/ZX/hdxxMb", { id: this.$route.params.id }).then(
      res => {
        this.$indicator.close()
        if (res.data.success) {
          this.data = res.data.content
        } else {
          this.changtoast(res.data.message, "error")
        }
      }
    )
  }
}
</script>
<style lang="scss" scoped>
@import './style/hdtz.scss';
</style>