<template>
  <div class="container">
    <div class="content">
      <div class="iconTitle">
        <div class="left">
          <img
            :src="
              pageData.headPortrait
                ? pageData.headPortrait
                : '/images/yuangong-ling_01.png'
            "
          />
        </div>
        <div class="right">
          <div class="nameTitle">
            <div class="name">
              <span>{{ pageData.fbry }}</span>
            </div>
            <div class="time">{{ pageData.fbsj }}</div>
          </div>
        </div>
      </div>
      <div class="content_item">
        <div class="tag">
          <van-tag type="warning" color="#FEF4E8" text-color="#E39522">{{
            pageData.lb
          }}</van-tag>
        </div>
        <div class="title">{{ pageData.xqms }}</div>
        <div class="icon">
          <div
            class="images"
            :class="{ images_one: pageData.file_urls.length === 1 }"
            v-for="(item_1, index_1) in pageData.file_urls"
            :key="index_1"
          >
            <img :src="item_1" />
          </div>
        </div>
        <div class="information">
          <div class="information_label">联系电话</div>
          <div class="information_item">{{ pageData.lxdh }}</div>
        </div>
        <div class="information">
          <div class="information_label">有效时间</div>
          <div class="information_item">
            {{ pageData.yxjsrq }} 至 {{ pageData.yxksrq }}
          </div>
        </div>
        <div class="information">
          <div class="information_label">求助地址</div>
          <div class="information_item">{{ pageData.qzdd }}</div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      pageData: {}
    }
  },
  created() {
    this.$indicator.open("加载中...")
    this.$post("api/PartyBuilding/sqxqXq", { id: this.$route.params.id }).then(
      res => {
        this.$indicator.close()
        if (res.data.success) {
          this.pageData = res.data.content
        } else {
          this.changtoast(res.data.message, "error")
        }
      }
    )
  }
}
</script>
<style lang="scss" scoped>
@import "../style/xqxq.scss";
</style>