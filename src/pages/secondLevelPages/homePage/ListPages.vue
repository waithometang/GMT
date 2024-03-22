<template>
  <div class="listPages">
    <div class="head">
      <div class="icon"></div>共{{number}}条{{newsType.name}} (上拉加载更多)
    </div>
    <div class="listContent">
      <scroller :on-infinite="infinite" :on-refresh="refresh">
        <release-content-list :listData="initData"></release-content-list>
      </scroller>
    </div>
  </div>
</template>

<script>
import releaseContentList from "@/components/releaseContentList";
import VueScroller from "vue-scroller";
import { GetNewsList, GetNewsListCount } from "@/api/secondLevelPages/homePage";
import { storage } from '@/js/until'

export default {
  components: {
    releaseContentList,
    VueScroller
  },
  data() {
    return {
      number: 0,
      pageIndex: 1, // 页数
      pageSize: 10, // 没页数量
      initData: "" // 保存请求获取的数据
    };
  },
  computed: {
    longData () {
      return storage.fetch('longData').data
    },
    DataTypeId () {
      return this.$route.query.DataTypeId 
    },
    newsType () {
      if　(this.DataTypeId == '1001') {
        document.title = '村情动态'
        return {id:0, name: '村情动态'} // 村居动态
      }
      if (this.DataTypeId == '1002') {
        document.title = '三务公开'
        return {id:1, name: '三务公开'} // 三务公开
      }
      if (this.DataTypeId == '1005') {
        document.title = '政策宣传'
        return {id: 4, name: '政策宣传'} // 宣传学习
      }
      if (this.DataTypeId == '1006') {
        document.title = '务工信息'
        return {id: 5, name: '务工信息'} // 务工信息
      }
    }
  },
  mounted () {
    this._GetNewsListCount()
  },
  methods: {
    // 获取发布总条数
    _GetNewsListCount () {
      GetNewsListCount({
        newsType: this.newsType.id,
        villageId: this.longData.id
      }).then(rps => {
        console.log(rps)
        if (rps.data.success) {
          this.number = rps.data.content
        } else {
          this.changtoast(rps.data.message, 'error')
        }
      })
    },
    // 获取列表数据
    _GetNewsList(done) {
      GetNewsList({
        newsType: this.newsType.id,
        pageIndex: this.pageIndex,
        pageSize: this.pageSize,
        villageId: this.longData.id
      }).then (rps => {
        if (rps.data.success) {
          if (this.pageIndex == 1) { // 第一次请求
            this.initData = rps.data.content
            if (rps.data.content.length < 10) { // 数据加载完
              if (done) {
                done(true)
              }
            } 
            if (rps.data.content.length >= 10){ // 余有数据
              this.pageIndex++
                if (done) {
                  done()
              }
            }
          } else { // 上拉加载请求
            this.initData = this.initData.concat(rps.data.content)
            if (rps.data.content.length < 10) {
              if (done) {
                done(true)
              }
            }
            if (rps.data.content.length >= 10){
              this.pageIndex++
                if (done) {
                  done()
              }
            }
          }
        } else {
          this.changtoast(rps.data.message, 'error')
        }
      })
    },

    //  上拉加载
    infinite(done) {
      this._GetNewsList(done)
    },
    refresh(done) {
      this.pageIndex = 1
      setTimeout(() => {
        this._GetNewsList(done)
      }, 1000);   
    }
  }
};
</script>

<style lang='scss', type="text/css" scoped>
@import "@/style/pages/secondLevelPages/homePage/listPages.scss";
.listPages /deep/ ._v-container {
  position: relative;
}
</style>
