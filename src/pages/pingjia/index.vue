<template>
  <div class="pj">
    <div class="head">
      <div class="head_name">
        <div class="head_name_icon"><img src="/static/talk_black@2x.png" alt=""></div>
        评论 {{pls ? pls : 0}}
      </div>
      <div class="head_info">赞 {{dzs ? dzs : 0}} | 踩 {{cps ? cps : 0}} | 阅读 {{yds ? yds : 0}}</div>
    </div>
    <div class="content">
      <scroller :on-infinite= 'infinite' :on-refresh="refresh" ref="myScroller">
        <div class="comment_list">
          <div class="comment_list_tab" v-for="(item, index) in listData" :key="index">
            <div class="comment_list_tab_left">
              <img :src="item.head" alt="">
            </div>
            <div class="comment_list_tab_right">
              <div class="comment_list_tab_right_head">
                <div class="name">{{item.nickname}}</div>
                <div class="time">{{item.date}}</div>
              </div>
              <div class="comment_list_tab_right_content" :class="{'comment_list_tab_right_content_action': !item.isMy}">{{item.nr}}</div>
              <div class="comment_list_tab_right_delete" @click="deleteComment(item.id)" v-if="item.isMy">删除</div>
            </div>
          </div>
        </div>
      </scroller>
    </div>
    <div class="comment_base">
      <div class="comment_but" @click="publish" v-if="!publishState">
        <div class="comment_but_icon"><img src="/static/talk_white@2x.png" alt=""></div>
        点击发表评论
      </div>
      <div class="comment_input" v-if="publishState">
        <div class="comment_input_icon"></div>
        <div class="comment_input_content">
          <input type="text" v-model="value" placeholder="评论" id="inputs" ref="inputs">
        </div>
        <div class="comment_input_but" @click="send">发送</div>
      </div>
    </div>

  </div>
</template>

<script>
import GmtSearchList from '@/components/GmtSearchList'
import { TjSqPj, GetShotPjList, DelSqPj } from '@/api/secondLevelPage'
export default {
  data () {
    return {
      publishState: false,
      styleData: {},
      pageIndex: 1,
      pageSize: 10,
      value: '',
      refreshing: false,
      listData: ''
    }
  },
  components: {
    GmtSearchList
  },
  computed: {
    id () {
      return this.$route.params.id
    },
    dzs () {
      return this.$route.params.dzs || 0
    },
    cps () {
      return this.$route.params.cps || 0
    },
    yds () {
      return this.$route.params.yds || 0
    },
    pls () {
      return this.$route.params.pls || 0
    }
  },
  methods: {
    publish () {
      this.publishState = true
      this.$nextTick(vm => {
        let dome = document.getElementById('inputs').focus()
      })
    },
    // 发表评价
    send () {
      if (!this.value) {
        this.changtoast('请输入评价内容')
        return
      }
      TjSqPj ({
        sqid: this.id,
        nr: this.value
      }).then (rps => {
        if (rps.data.success) {
          this.changtoast('评价成功')
          this.value = ''
          this.pageIndex = 1
          this.GetListData()
        } else {
          this.changtoast(rps.data.message, 'error')
        }
      })
    },
    // 删除评论
    deleteComment (item) {
      DelSqPj ({
        id: item
      }).then(rps => {
        if (rps.data.success) {
          this.changtoast('删除成功')
          this.value = ''
          this.pageIndex = 1
          this.GetListData()
        } else {
          this.changtoast(rps.data.message, 'error')
        }
      })
    },
    // 上拉加载事件
    infinite (done) {
      this.GetListData(done)
    },
    // 下拉刷新事件
    refresh(done) {
      this.pageIndex = 1
      this.GetListData(done)
      this.$refs.myScroller.finishInfinite(false)
    },
    GetListData (done) {
      if(this.refreshing) return
      this.refreshing = true
      GetShotPjList ({
        sqid: this.id,
        pageIndex: this.pageIndex,
        pageSize: this.pageSize
      }).then (rps => {
        this.refreshing = false
        if (rps.data.success) {
          if(this.pageIndex===1) this.listData=rps.data.content;
          else this.listData.push(...rps.data.content)
          this.pageIndex++
          if(done) done()
          if (rps.data.content.length < this.pageSize && this.$refs['myScroller']) {
            this.$refs.myScroller.finishInfinite(true)
          }
        } else {
          this.$refs.myScroller.finishInfinite(true)
          this.changtoast(rps.data.message)
        }
      })
    }
  }
}
</script>

<style lang="scss" scoped>
@import './style/index.scss';
</style>