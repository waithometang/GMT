<template>
  <div class="currentAffair scelloe">
    <GmtSearchList
      :url="url"
      :parms="{ villageId: longData.id, IsAll: stateType === 1 ? true : false }"
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
            @click="gotoDetails(item.id)"
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
                <div class="name">
                  <span>{{ item.fbry }}</span>
                  <template v-if="stateType !== 1">
                    <span class="wait" v-if="item.shzt === '待审核'"
                      >待审核</span
                    >
                    <span class="adopt" v-if="item.shzt === '审核通过'"
                      >审核通过</span
                    >
                    <span class="no_adopt" v-if="item.shzt === '审核不通过'"
                      >审核不通过</span
                    >
                  </template>
                </div>
                <div class="time">{{ item.fbsj }}</div>
              </div>
            </div>
          </div>
          <div class="content_item">
            <div class="tag" @click="gotoDetails(item.id)">
              <van-tag type="warning" color="#FEF4E8" text-color="#E39522">{{
                item.lb
              }}</van-tag>
            </div>
            <div class="title" @click="gotoDetails(item.id)">
              {{ item.xqms }}
            </div>
            <div class="icon">
              <div
                class="images"
                :class="{ images_one: item.file_urls.length === 1 }"
                @click="lookOver(item_1, item.file_urls)"
                v-for="(item_1, index_1) in item.file_urls"
                :key="index_1"
              >
                <img :src="item_1" />
              </div>
            </div>
            <div class="timecomment">
              <img src="../images/地点.png" />{{ item.qzdd }}
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
      url: "api/PartyBuilding/sqxqList",
      IsAll: false,
      pupopLook: false,
      imgSrc: [],
      pageSize: 3,
      pageIndex: 1,
      initialSlide: 0,
      caseInfo: "",
      caseInfoindex: 99999,
      fullTextState: -1
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
    showfullText(index) {
      if (this.fullTextState === index) {
        this.fullTextState = index - 1
      } else {
        this.fullTextState = index
      }
    },
    gotoDetails(id) {
      this.$router.push(`/sqfw/xqxq/${id}`)
    }
  }
}
</script>


<style lang="scss" type="text/css" scoped>
@import "../style/appeal.scss";
</style>
