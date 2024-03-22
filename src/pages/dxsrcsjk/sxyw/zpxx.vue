<template>
  <div class="container">
    <img src="../images/zpsxs.png" />
    <div class="content">
      <div class="content_item">
        <span class="label">招募单位：</span>
        <span class="item">{{ data.zmdw }}</span>
      </div>
      <div class="content_item">
        <span class="label">招募对象：</span>
        <span class="item">{{ data.zmdx }}</span>
      </div>
      <div class="content_item">
        <span class="label">招募人数：</span>
        <span class="item">{{ data.zmrs }}人</span>
      </div>
      <div class="content_item">
        <span class="label">工作时间：</span>
        <span class="item">{{ data.gzsj }}</span>
      </div>
      <div class="content_item">
        <span class="label">工作地点：</span>
        <span class="item">{{ data.gzdd }}</span>
      </div>
      <div class="content_item">
        <span class="label">实习时长：</span>
        <span class="item">{{ data.sxsc }}</span>
      </div>
      <div class="content_item">
        <span class="label">实习待遇：</span>
        <span class="item">{{ data.sxdy }}</span>
      </div>
      <div class="split"></div>
      <div class="explain">
        <p>具体要求：</p>
        <span v-html="data.jtyq"></span>
      </div>
      <div class="explain">
        <p>报名方式：</p>
        <span v-html="data.bmfs"></span>
      </div>
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
    this.$post("api/ZX/zpxxMb", { id: this.$route.params.id }).then(
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
@import './style/zpxx.scss';
</style>