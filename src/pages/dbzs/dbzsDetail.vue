<template>
  <div class="dbzs-detail">
    <div class="detail-header">
      <div class="header-wrapper">
        <img src="./images/avatar.png" alt="" />
        <!-- :class="{ indent: detailData.shjg == '通过' }" -->
        <div class="title indent">
          {{ detailData.bt }}
          <span
            class="bt"
            :class="
              detailData.hfzt == '承诺回复'
                ? 'red'
                : detailData.hfzt == '已回复'
                ? 'yellow'
                : 'blue'
            "
            >{{ detailData.hfzt }}</span
          >
        </div>
      </div>
      <div class="representative">
        <img src="./images/icon.png" alt="" />
        {{ detailData.fyry }}
      </div>
      <div class="info">
        <div class="left">
          <img src="./images/book.png" alt="" />
          阅读 {{ detailData.yds || '0' }}
        </div>
        <div class="middle">
          <img src="./images/msg.png" alt="" />
          回复 {{ detailData.hfs || 0 }}
        </div>
        <div class="time">发表于：{{ detailData.fbsj }}</div>
      </div>
    </div>
    <div class="detail-content">
      <span v-html="detailData.fynr"></span>
    </div>
    <div class="detail-img">
      <div
        class="images"
        @click="lookOver(detailData.fileArr, index_1)"
        v-for="(item_1, index_1) in detailData.fileArr"
        :key="index_1"
      >
        <img :src="item_1" />
      </div>
    </div>
    <!-- 回复 -->
    <!-- <div
      :class="{
        'detail-reply': detailData.xqhf.length
      }"
    > -->
    <div
      class="detail-reply"
      v-if="detailData.xqhf && detailData.xqhf.length !== 0"
    >
      <div
        class="reply-wrapper"
        v-for="(item, index) in detailData.xqhf"
        :key="index"
      >
        <div class="item-top">
          <div class="left-fyr">
            <img src="./images/msg-red.png" alt="" />
            {{ item.hfry }}
          </div>
          <div class="right-time">
            {{ item.hfsj }}
          </div>
        </div>
        <div class="item-content">
          <span v-html="item.hfnr"></span>
        </div>
        <div class="icon">
          <div
            class="images"
            @click="lookOver(item.fileArr, index_1)"
            v-for="(item_1, index_1) in item.fileArr"
            :key="index_1"
          >
            <img :src="item_1" />
          </div>
          <!-- <div class="images">
            <img src="./images/background.png" />
          </div>
          <div class="images">
            <img src="./images/background.png" />
          </div>
          <div class="images">
            <img src="./images/background.png" />
          </div>
          <div class="images">
            <img src="./images/background.png" />
          </div> -->
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { ImagePreview } from "vant"

export default {
  props: ["id"],
  data () {
    return {
      detailData: {}
    }
  },
  created () {
    this.getDetailData()
  },
  methods: {
    getDetailData () {
      var dbzsDlAsync = JSON.parse(sessionStorage.getItem("dbzsDlAsync"))
      this.$indicator.open("加载中...")
      this.$post("/api/mlgm/dbzsxx", { token: dbzsDlAsync.token, topicId: this.$route.params.id }).then(
        res => {
          this.$indicator.close()
          if (res.data.success) {
            this.detailData = res.data.content
          } else {
            this.changtoast(res.data.message, "error")
          }
        }
      )
    },
    // 查看照片
    lookOver (imgList, index) {
      ImagePreview({
        images: imgList,
        startPosition: index,
        closeable: true
      })
    }
  }
}
</script>

<style scoped lang="scss">
@import './style/dbzsDetail.scss';
</style>