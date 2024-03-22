<!-- 我的反映 -->
<template>
  <div class="currentAffair scelloe">
    <GmtSearchList
      :url="url"
      :parms="{
        villageId: longData.id,
        IsAll: stateType === 1 ? true : false,
        fytd: fytd
      }"
      :pageSize="pageSize"
      :useSearch="false"
    >
      <template slot="item" slot-scope="listData">
        <div
          class="content"
          v-for="(item, index) in listData.data"
          :key="index"
        >
          <div
            class="iconTitle"
            :class="{ bor: index == listData.data.length - 1 }"
          >
            <div class="left">
              <img
                :src="
                  item.headPortrait
                    ? item.headPortrait
                    : '/images/yuangong-ling_01.png'
                "
              />
            </div>
            <div class="right">
              <div class="nameTitle">
                <div class="name">{{ item.name }}</div>
                <div class="title">{{ item.content }}</div>
              </div>
              <div class="icon">
                <div
                  class="images"
                  @click="lookOver(item_1, item.picture)"
                  v-for="(item_1, index_1) in item.picture"
                  :key="index_1"
                >
                  <img :src="item_1" />
                </div>
              </div>
              <div class="timecomment">
                {{ item.location }}
              </div>
              <div class="timecomment right">
                <div class="state">
                  {{ item.isPublic == 1 ? "公开" : "保密" }}
                </div>
                <div class="time">
                  {{ item.date }}
                </div>
                <div
                  class="evaluate"
                  v-if="item.kypj && stateType === 1"
                  @click="GotoeValuate(item)"
                >
                  <img src="@/images/evaluate.png" alt="" />
                  评价
                </div>
              </div>
              <div class="reply-list" v-if="item.reply">
                <div
                  class="reply-content"
                  :class="{
                    content_hide: item.reply.length && fullTextState < index
                  }"
                >
                  <span>回复内容:</span> {{ item.reply }}
                </div>
                <div
                  class="reply-content"
                  v-if="item.fwpj"
                  :class="{
                    content_hide: item.reply.length && fullTextState < index
                  }"
                >
                  <span>服务评价:</span> {{ item.fwpj }}
                </div>
                <div
                  class="fullText"
                  @click="showfullText(index)"
                  v-if="item.reply.length >= 40"
                >
                  {{ fullTextState >= index ? "收起" : "全文" }}
                </div>
              </div>
              <div class="operation_list">
                <div
                  class="operation_list_tab"
                  @click="LikeOrNegative(true, item)"
                >
                  <div class="operation_list_tab_icon">
                    <img
                      :src="
                        item.dzzt === 1
                          ? '/static/good@2x_red.png'
                          : '/static/good@2x.png'
                      "
                      alt=""
                    />
                  </div>
                  <div
                    class="operation_list_tab_name"
                    :class="{ operation_list_tab_name_action: item.dzzt === 1 }"
                  >
                    赞 {{ item.dzs ? item.dzs : 0 }}
                  </div>
                </div>
                <div
                  class="operation_list_tab"
                  @click="LikeOrNegative(false, item)"
                >
                  <div class="operation_list_tab_icon">
                    <img
                      :src="
                        item.dzzt === 2
                          ? '/static/bad@2x_red.png'
                          : '/static/bad@2x.png'
                      "
                      alt=""
                    />
                  </div>
                  <div
                    class="operation_list_tab_name"
                    :class="{ operation_list_tab_name_action: item.dzzt === 2 }"
                  >
                    踩 {{ item.cps ? item.cps : 0 }}
                  </div>
                </div>
                <div class="operation_list_tab">
                  <div class="operation_list_tab_icon">
                    <img src="/static/read@2x.png" alt="" />
                  </div>
                  <div class="operation_list_tab_name">
                    阅读 {{ item.yds ? item.yds : 0 }}
                  </div>
                </div>
                <div class="operation_list_tab" @click="comment(item)">
                  <div class="operation_list_tab_icon">
                    <img src="/static/talk_black@2x.png" alt="" />
                  </div>
                  <div class="operation_list_tab_name">评论 {{ item.pls }}</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </template>
    </GmtSearchList>
  </div>
</template>

<script>
import GmtSearchList from "@/components/GmtSearchList"
import { storage } from "@/js/until"
import { WcChatPreviewImage } from "@/js/WeChatpreviewImage"
import { GetCaseState } from "@/api/secondLevelPages/ruralRevitalization"
import { SqMark } from "@/api/secondLevelPage"

export default {
  props: {
    stateType: {
      type: Number
    },
    WaChatConfigData: {
      // type: Object
    }
  },
  components: {
    GmtSearchList
  },
  computed: {
    longData() {
      return storage.fetch("longData").data
    }
  },
  data() {
    return {
      url: "api/PeopleOpen/GetShotList",
      IsAll: false,
      pupopLook: false,
      imgSrc: [],
      pageSize: 3,
      pageIndex: 1,
      initialSlide: 0,
      caseInfo: "",
      caseInfoindex: 99999,
      fullTextState: -1,
      fytd: ""
    }
  },
  methods: {
    bigImg(item) {
      this.pupopLook = item
    },
    // 查看照片
    lookOver(item, data) {
      let url = "http://gmt.gaoming.gov.cn" + item
      let datas = []
      for (let index = 0; index < data.length; index++) {
        const element = data[index]
        let str = "http://gmt.gaoming.gov.cn" + element
        datas.push(str)
      }
      WcChatPreviewImage(url, datas, this.WaChatConfigData)
    },
    ViewProgress(item, index) {
      console.log(index)
      if (this.caseInfoindex == index) {
        this.caseInfoindex = 999999
      } else {
        this.caseInfoindex = index
      }
      GetCaseState({
        id: item
      }).then(rps => {
        if (rps.data.success) {
          this.caseInfo = rps.data.content.caseInfo
        } else {
          this.changtoast(rps.data.message, "error")
        }
      })
    },
    GotoeValuate(item) {
      this.$router.push(`/evaluate/${item.id}`)
    },
    showfullText(index) {
      if (this.fullTextState === index) {
        this.fullTextState = index - 1
      } else {
        this.fullTextState = index
      }
    },
    // 评论
    comment(item) {
      this.$router.push(
        `/pj/${item.id}/${item.dzs ? item.dzs : 0}/${item.cps ? item.cps : 0}/${
          item.yds ? item.yds : 0
        }/${item.pls ? item.pls : 0}`
      )
    },
    // 点赞 踩
    LikeOrNegative(item, dome) {
      this._GetMark(item, dome)
    },
    _GetMark(item, dome) {
      SqMark({
        id: dome.id,
        mkid: 203,
        IsGood: item
      }).then(rps => {
        if (rps.data.success) {
          dome.dzzt = rps.data.content.dzzt
          dome.dzs = rps.data.content.dzs
          dome.cps = rps.data.content.cps
          if (item) {
            let str = "您已点赞，目前已有" + rps.data.content.dzs + "人点赞"
            if (rps.data.content.dzzt) {
              this.changtoast(str)
            }
          }
        } else {
          this.changtoast(rps.data.message, "error")
        }
      })
    }
  },
  created() {
    if (this.$route.name === "livelihood") {
      this.fytd = "明城民生直通车"
    } else {
      this.fytd = "高明通"
    }
  }
}
</script>


<style lang="scss" type="text/css" scoped>
@import "./style/appeal.scss";
</style>
