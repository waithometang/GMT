<template>
  <div class="publicityList" ref="publicityList" :style="styleData">
    <GmtSearchList url="api/qy/wdqycxfbList">
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
import GmtSearchList from '@/components/GmtSearchList'
import GmtDefaultList from '@/components/GmtDefaultList'

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
    GmtSearchList,
    GmtDefaultList
  },
  data () {
    return {
      styleData: {}
    }
  },
  methods: {
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
      this.$router.push(`/qyxcxqxg/${item.id}`)
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
  mounted () {
    this.$nextTick(rps => {
      setTimeout(() => {
        let dome = this.$refs.publicityList
        let domeTop =dome.offsetTop
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
