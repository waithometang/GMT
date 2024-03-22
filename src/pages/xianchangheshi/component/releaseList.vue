<template>
  <div class="releaseList" ref="releaseList" :style="styleData">
    <GmtSearchList url='api/Common/Grfblist'>
      <template slot="item" slot-scope="listData">
        <div class="GmtDefaultList-pages">
          <div class="list" v-for="(item, index) in listData.data" :key="index" @click="viewDetails(item)">
            <div class="list-left">
              <div class="list-title">
                <span v-if="item.publishGrade != null && issueClass && item.publishGrade >= 0">{{_GetGrade(item.publishGrade)}}</span>
                  {{item.title}}
              </div>
              <div class="list-icon" :class="{'not-images': !item.cover}">
                <div class="list-icon-li time">
                  <div class="icon">
                    <img src="/images/img_13.png" alt="">
                  </div>
                  <div class="name">{{item.publishTime || item.date || item.editTime}}</div>
                </div>
                <div class="list-icon-li" v-if="item.xsyd">
                  <div class="icon">
                    <img src="/images/img_11.png" alt="">
                  </div>
                  <div class="name">{{item.readedCount}}</div>
                </div>
                <div class="list-icon-li" v-if='item.kydz  && !item.linkage'>
                  <div class="icon">
                    <img src="/images/zan.png" alt="">
                  </div>
                  <div class="name">{{item.dzs?item.dzs:0}}</div>
                </div>
                <div class="list-icon-li" v-if='item.kyc'>
                  <div class="icon">
                    <img src="/images/cai.png" alt="">
                  </div>
                  <div class="name">{{item.cps?item.cps:0}}</div>
                </div>
              </div>
            </div>
            <div class="list-right" v-if="item.cover">
              <img :src="item.cover ? SetImages(item.cover) :'/images/FirstLevelPage/tacitlyapprove.jpg'" alt="">
            </div>
          </div>
        </div>
      </template>
    </GmtSearchList>
  </div>
</template>

<script>
// 父件传递渲染需要数据, 父件定义列表点击事件 跳转详情
import GmtSearchList from '@/components/GmtSearchList'
import { GetAddReaded,GetFblx } from '@/api/secondLevelPage'
import { PublishUtil,ImageUtil } from "@/js/businessUntil"
import { storage, session_Storage } from "@/js/until"
export default {
  props: {
    mkid: { // 发布类型 模块ID
      type: Number
    },
    // 显示发布登机
    issueClass: {
      type: Boolean,
      default: true
    }
  },
  components: {
    GmtSearchList
  },
  computed: {
    longData () {
      return storage.fetch('longData').data
    }
  },
  methods: {
    getImg:ImageUtil.getDefaultImg,
    // 获取发布等级
    _GetGrade (item) {
      switch (item) {
        case 0:
          return '区级发布'
          break;
        case 1:
          return '镇街发布'
          break;
        case 2:
          return '村居发布'
          break;
        case 5:
          return '两委发布'
          break;
        case 6:
          return '直联发布'
          break;
        case 7:
          return '实事发布'
          break;
        case 8:
          return '现场考核'
          break;
        default:
          return ''
          break;
      }
    },
    // 点击查看详情
    viewDetails (item) {
      if (item.linkage) {
        GetAddReaded ({
          id: item.id,
          lb: 0
        })
        let url = ''
        if (item.linkage.indexOf('?') === -1 ) {
          url = item.linkage + '?scene=4#wechat_redirect/'
        } else {
          url = item.linkage + '&scene=4#wechat_redirect/'
        }
        session_Storage.save('ButtomTageState', this.$store.state.ButtomTageState)
        window.location.href = url
      } else {
        if (item.contentType === 1) {
          this.$router.push(`/xgrelease/${item.mkid}/${item.id}`)
        } else {
          if (this.mkid) {
            let _mkid = this.mkid
            this.$router.push(`/nrfbxx/${_mkid}/${item.id}`)
          } else {
            this.$router.push(`/nrfbxx/${item.mkid || item.mk}/${item.id}`)
          }
        }
      }
    },
    // 设置图片
    SetImages (item) {
      if (item.indexOf('../') === 0) { // 自己上传的
        return '/gmt' + item.slice(2, item.length)
      } else {
        return item
      }
    }
  },
  data () {
    return {
      styleData: {}
    }
  },
  mounted () {
    this.$nextTick(function () {
      setTimeout(() => {
        let dome = this.$refs.releaseList
        let domeTop = dome.offsetTop
        this.styleData = {
          position: 'absolute',
          top: domeTop + "px",
          bottom: 0,
          left: 0,
          right: 0,
        }
      }, 100);
    })
  }
}
</script>

<style lang='scss' scoped type='text/css'>
@import '@/style/GmtDefaultList.scss';
</style>