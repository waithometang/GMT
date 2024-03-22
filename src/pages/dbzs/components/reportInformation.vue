<template>
  <div class="currentAffair">
    <GmtSearchList
      :url="url"
      :parms="listparams"
      :pageSize="pageSize"
      :useSearch="stateType === 1 ? true : false"
      :report="true"
    >
      <div class="nocontent" slot="empty">
        <span>没有更多数据</span>
      </div>
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
              <img :src="require('../images/avatar.png')" />
            </div>
            <div class="right">
              <div class="nameTitle" @click="handleGoDetail(item.tzid)">
                <div class="name">
                  <div class="place-project">
                    <div class="place-name">
                      {{ item.bt }}
                      <span
                        class="bt"
                        :class="
                          item.hfzt == '承诺回复'
                            ? 'red'
                            : item.hfzt == '已回复'
                            ? 'yellow'
                            : 'blue'
                        "
                        >{{ item.hfzt }}
                      </span>
                    </div>
                  </div>
                </div>
                <div class="title">
                  <div
                    class="con"
                    :class="{
                      text_hidden:
                        OverflowState != index && item.fbnr.length >= 60
                    }"
                  >
                    <span v-html="item.fbnr"></span>
                  </div>
                </div>
                <div
                  class="fullText"
                  @click="SetContentOverflow(index, $event)"
                  v-if="item.fbnr.length >= 60"
                >
                  {{ OverflowState === index ? '收起' : '全文' }}
                </div>
              </div>
              <div class="icon">
                <div
                  class="images"
                  @click="lookOver(item.fileArr, index_1, $event)"
                  v-for="(item_1, index_1) in item.fileArr"
                  :key="index_1"
                >
                  <img :src="item_1" />
                </div>
              </div>
              <!-- v-if="stateType === 1" -->
              <div class="timecomment">
                <img src="../images/icon.png" />{{ item.fbr }}
              </div>
              <div class="reply-wrapper" v-if="item.hf">
                <div class="reply-info">
                  <div
                    :class="{
                      text_hidden:
                        replayState != index && item.hf.hfnr.length >= 60
                    }"
                  >
                    <span>{{ item.hf.hfry }}：</span>
                    <span v-html="item.hf.hfnr"></span>
                  </div>
                  <div
                    class="fullText"
                    @click="replyContentOverflow(index, $event)"
                    v-if="item.hf.hfnr.length >= 60"
                  >
                    {{ replayState === index ? '收起' : '全文' }}
                  </div>
                </div>
              </div>
              <div class="right">
                <div class="time">{{ item.date }}</div>
                <div class="read-number">
                  <img src="../images/book.png" alt="" />
                  阅读 {{ item.yds || '0' }}
                </div>
                <div class="reply-num" @click="comment(item.tzid)">
                  <img src="../images/msg.png" alt="" />
                  回复 {{ item.hfs || '0' }}
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
import { ImagePreview } from "vant"

export default {
  props: {
    stateType: {
      type: Number
    },
    selectParams: {
      type: Object
    }
  },
  data () {
    return {
      url: "/api/mlgm/dbzslist",
      IsAll: false,
      listparams: {
        IsAll: this.stateType === 1 ? true : false,
        yhid: JSON.parse(sessionStorage.getItem("dbzsDlAsync")).yhid,
        ...this.selectParams
      },
      pageSize: 3,
      pageIndex: 1,
      OverflowState: -1,
      replayState: -1,
      token: ''
    }
  },
  watch: {
    selectParams: {
      handler: function (value) {
        this.listparams = {
          token: this.token,
          IsAll: this.stateType === 1 ? true : false,
          ...value
        }
      },
      deep: true
    },
    stateType (val) {
      if (val === 1) {
        this.listparams = {
          token: this.token,
          IsAll: true,
          yhid: JSON.parse(sessionStorage.getItem("dbzsDlAsync")).yhid,
          ...this.selectParams
        }
      } else if (val === 2) {
        this.listparams = {
          token: this.token,
          IsAll: false,
          yhid: JSON.parse(sessionStorage.getItem("dbzsDlAsync")).yhid,
          yjId: "",
          zjId: ""
        }
      }
    }
  },
  components: {
    GmtSearchList
  },
  methods: {
    // 全文/收起
    SetContentOverflow (index, e) {
      if (this.OverflowState === index) {
        this.OverflowState = -1
      } else {
        this.OverflowState = index
      }
      e.stopPropagation()
    },
    // 回复全文/收起
    replyContentOverflow (index, e) {
      if (this.replayState === index) {
        this.replayState = -1
      } else {
        this.replayState = index
      }
      e.stopPropagation()
    },
    // 查看照片
    lookOver (imgList, index, e) {
      ImagePreview({
        images: imgList,
        startPosition: index,
        closeable: true
      })
      e.stopPropagation()
    },
    // 跳到详情页
    handleGoDetail (id) {
      // 通过传id
      // this.$router.push(`/dbzsDetail/${id}`)
      // 通过传数据
      this.$router.push({
        path: `/dbzsDetail/${id}`
      })
    },
    // 评论
    comment (id) {
      this.$router.push({
        path: `/dbzsReply/${id}`
      })
    }
  },
  created () {
    var dbzsDlAsync = JSON.parse(sessionStorage.getItem("dbzsDlAsync"))
    this.token = dbzsDlAsync.token
    this.listparams.token = dbzsDlAsync.token
  }
}
</script>

<style scoped lang="scss">
@import '../style/reportInformation.scss';
</style>