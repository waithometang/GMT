<template>
  <div class="PartyReport_record">
    <template v-if="ifNull">
      <div class="no_message">暂无信息</div>
    </template>
    <template v-else>
      <p class="title">您的抽奖号码是</p>
      <p class="number">{{ pageData.bmbh }}</p>
      <div class="item">
        <p>
          <span>报名主题：</span>
          <span>{{ pageData.bmzt }}</span>
        </p>
        <p>
          <span>姓&nbsp;&nbsp;名：</span>
          <span>{{ pageData.xm }}</span>
        </p>
        <p>
          <span>联系方式：</span>
          <span>{{ pageData.lxfs }}</span>
        </p>
        <p>
          <span>身份证号：</span>
          <span>{{ pageData.sfzh }}</span>
        </p>
      </div>
    </template>
  </div>
</template>
<script>
export default {
  data() {
    return {
      pageData: {},
      ifNull: true
    }
  },
  methods: {},
  created() {
    var id = 0
    if (this.$route.params.id) {
      id = this.$route.params.id
    } else {
      id = this.$route.params.data.id
    }
    this.$indicator.open("加载中...")
    this.$post("api/zx/dxshdynwdbm", {
      hdid: id
    }).then(res => {
      this.$indicator.close()
      if (res.data.success) {
        if (res.data.content == null) {
          this.ifNull = true
        } else {
          this.ifNull = false
          this.pageData = res.data.content
        }
      } else {
        this.changtoast(res.data.message, "error")
      }
    })
  }
}
</script>
<style lang="scss" scoped>
@import "./style/mybmlist.scss";
</style>