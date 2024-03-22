<template>
  <div class="currentAffair scelloe">
    <GmtSearchList
      :url="url"
      :parms="listparams"
      :pageSize="pageSize"
      :useSearch="false"
      :report="true"
    >
      <div class="nocontent" slot="empty">
        <!-- <img src="../images/无数据.png" alt /> -->
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
            @click="handleGoDetail(item.gcxxid)"
          >
            <div class="left">
              <!-- <img
                :src="
                  item.headPortrait
                    ? item.headPortrait
                    : require('../images/avatur.png')
                "
              /> -->
              <img
                :src="
                  item.headPortrait == '施工队'
                    ? require('../images/sgd.png')
                    : require('../images/jl.png')
                "
              />
            </div>
            <div class="right">
              <div class="nameTitle">
                <div class="name">
                  <div class="place-project">{{ item.name }}</div>
                  <!-- <span class="name-span">{{ item.name }}</span> -->
                </div>
                <div class="title">{{ item.content }}</div>
              </div>
              <div class="icon">
                <div
                  class="images"
                  @click="lookOver(item.picture, index_1, $event)"
                  v-for="(item_1, index_1) in item.picture"
                  :key="index_1"
                >
                  <img :src="item_1" />
                </div>
              </div>
              <!-- <div class="timecomment">
                <img src="../images/location.png" />{{ item.location }}
              </div> -->
              <div class="timecomment right">
                <div class="read-number">
                  <img src="../images/book.png" alt="" />
                  阅读 {{ item.yds || '0' }}
                </div>
                <div class="time">{{ item.date }}</div>
              </div>
            </div>
          </div>
        </div>
      </template>
    </GmtSearchList>
  </div>
</template>

<script>
import GmtSearchList from '@/components/GmtSearchList'
import { storage } from '@/js/until'
import { WcChatPreviewImage } from '@/js/WeChatpreviewImage'
import { GetCaseState } from '@/api/secondLevelPages/ruralRevitalization'
import { SqMark } from '@/api/secondLevelPage'
import { ImagePreview } from 'vant'

export default {
  props: {
    stateType: {
      type: Number
    },
    WaChatConfigData: {
      // type: Object
    },
    gcxxid: {
      type: Number
    }
  },
  components: {
    GmtSearchList
  },
  computed: {
    longData() {
      return storage.fetch('longData').data
    }
  },
  created() {
    if (this.gcxxid) {
      this.listparams.pid = this.gcxxid
    }
  },
  data() {
    return {
      url: '/api/gcjd/gczklist',
      IsAll: false,
      listparams: { IsAll: this.stateType === 1 ? true : false },
      pupopLook: false,
      imgSrc: [],
      pageSize: 3,
      pageIndex: 1,
      initialSlide: 0,
      caseInfo: '',
      caseInfoindex: 99999,
      fullTextState: -1
    }
  },
  methods: {
    // 跳转详情
    handleGoDetail(id) {
      this.$router.push(`/projectdetail/${id}`)
    },
    bigImg(item) {
      this.pupopLook = item
    },
    searchArea(params) {
      //updateListData
      params.IsAll = this.stateType === 1 ? true : false
      this.listparams = params
    },
    // 查看照片
    lookOver(imgList, index, e) {
      ImagePreview({
        images: imgList,
        startPosition: index,
        closeable: true
      })
      e.stopPropagation()
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
          this.changtoast(rps.data.message, 'error')
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
    HxmFn(item) {
      this.$router.push(`/mlgm/jbhjhd/hxm?id=${item.id}`)
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
            let str = '您已点赞，目前已有' + rps.data.content.dzs + '人点赞'
            if (rps.data.content.dzzt) {
              this.changtoast(str)
            }
          }
        } else {
          this.changtoast(rps.data.message, 'error')
        }
      })
    }
  }
}
</script>


<style lang="scss" type="text/css" scoped>
@import '../style/reportInformation.scss';
</style>
