<!-- 通用发布详情 -->
<template>
  <div
    class="NotificationParticularss"
    :class="{ 'NotificationParticularss-action': listData.kydz }"
  >
    <BetterScroll>
      <template slot="BetterScroll">
        <div class="content-list">
          <div class="head">
            <div class="title">{{ listData.title }}</div>
            <div class="head-list">
              <div class="list-tab">
                <img id="GMT_min_icon" src="/images/img_12.png" alt="" />
                {{ listData.fbry }}
              </div>
              <div class="list-tab">
                <img id="GMT_min_icon" src="/images/img_13.png" alt="" />
                {{ listData.fbsj }}
              </div>
              <!-- <div class="list-tab">
                <img id="GMT_min_icon" src="/images/img_11.png" alt="" />
                {{ listData.readedCount }} 阅读
              </div> -->
            </div>
          </div>
          <div
            class="content"
            v-html="listData.content"
            id="listDataContent"
          ></div>
          <div
            class="images-list"
            v-if="listData.contentType == 1 && listData.imgUrls"
          >
            <div
              class="images-list-tab"
              v-for="(item, index) in listData.imgUrls"
              :key="index"
              @click="loveImages(item, listData.imgUrls)"
            >
              <img id="GMT_min_icon" class="images-tab" :src="item" alt="" />
            </div>
          </div>
        </div>
      </template>
    </BetterScroll>
  </div>
</template>

<script>
import BetterScroll from "@/components/BetterScroll"
import {
  GetPulishDetail,
  GetMark,
  GetFavorite,
  GetUndoMark,
  GetUndoFavorite,
  Getfbpl,
  GetPlList,
  GetPlDel
} from "@/api/secondLevelPage.js"
import { WaChatrequireShare } from "@/js/WaChatrequireShare"
import { WcChatPreviewImage } from "@/js/WeChatpreviewImage"

export default {
  data() {
    return {
      listData: {},
      IsLike: false,
      IsNegative: false,
      Isshouc: false,
      dzzt: 0,
      CommentsListData: [],
      CommentsContent: "",
      pageIndex: 1,
      CommentsContentTab: false,
      moreLoading: false, // 数据加载完毕
      RichTextDisposeSatae: false
    }
  },
  components: {
    BetterScroll
  },
  computed: {
    id() {
      return this.$route.params.id
    },
    mkid() {
      return this.$route.params.mkid
    },
    titleData() {
      return this.$route.params.titleData
    }
  },
  methods: {
    // 查看图片
    loveImages(item, data) {
      let url = "http://gmt.gaoming.gov.cn" + item
      let datas = []
      for (let index = 0; index < data.length; index++) {
        const element = data[index]
        let str = "http://gmt.gaoming.gov.cn" + element
        datas.push(str)
      }
      WcChatPreviewImage(url, datas)
    }
  },
  created() {
    this.$indicator.open("加载中...")
    this.$post("/api/Zx/dxsXq", { type: 3, id: this.$route.params.id }).then(
      res => {
        this.$indicator.close()
        if (res.data.success) {
          this.listData = res.data.content
        } else {
          this.changtoast(res.data.message, "error")
        }
      }
    )
  },
  updated: function () {
    this.$nextTick(function () {
      if (!this.RichTextDisposeSatae) {
        this.RichTextDispose()
        this.RichTextDisposeSatae = true
      }
    })
  }
}
</script>

<style lang='scss' type="text/css" scoped>
@import "@/style/pages/secondLevelPages/homePage/NotificationParticulars_v1.scss";
</style>
