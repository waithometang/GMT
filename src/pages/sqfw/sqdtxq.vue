<template>
  <div class="NotificationParticularss">
    <BetterScroll>
      <template slot="BetterScroll">
        <div class="content-list">
          <div class="head">
            <div class="title">{{ listData.title }}</div>
            <div class="head-list">
              <div class="list-tab">
                <img id="GMT_min_icon" src="/images/img_13.png" alt="" />
                {{ listData.publishTime }}
              </div>
              <div class="list-tab">
                <img id="GMT_min_icon" src="/images/img_11.png" alt="" />
                {{ listData.readedCount }} 阅读
              </div>
            </div>
          </div>
          <div class="images-list">
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
        <div class="content" v-html="listData.content"></div>
      </template>
    </BetterScroll>
  </div>
</template>

<script>
import BetterScroll from "@/components/BetterScroll"
import { WcChatPreviewImage } from "@/js/WeChatpreviewImage"

export default {
  data() {
    return {
      listData: {
        title: "关于开展“迎国庆”文艺汇演活动，大家快来参与吧！",
        publishTime: "2020-05-06",
        readedCount: "889",
        imgUrls: [require("./images/webp.webp.jpg")],
        content:
          "为实施素质教育，贯彻教育方针，弘扬爱国主义旋律，铭记革命历史，继承光荣传统，弘扬名族精神，报效祖国。特举行“庆国庆文艺汇演”比赛。 通过此次活动让同学们得校园生活更丰富，从而激励同学们具有积极向上，乐观进取的精神，培养学生的爱国主义情操，培育民族精神，激发学生学习和开展文艺活动的兴趣，激活学生的创新思维，丰富学生的课余文化生活，在国庆节来临之际，特举办“xx之声----迎国庆”文艺汇演活动。"
      }
    }
  },
  components: {
    BetterScroll
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
  created() {}
}
</script>

<style lang='scss' type="text/css" scoped>
@import "@/style/pages/secondLevelPages/homePage/NotificationParticulars_v1.scss";
@import "./style/sqdtxq.scss";
</style>
