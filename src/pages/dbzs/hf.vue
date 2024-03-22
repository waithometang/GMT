<template>
  <div class="pj">
    <div class="head">
      <div class="head_name">
        <div class="head_name_icon">
          <img src="/static/talk_black@2x.png" alt="" />
        </div>
        回复 {{ pageData.pls ? pageData.pls : 0 }}
      </div>
      <div class="head_info">
        阅读
        {{ pageData.yds ? pageData.yds : 0 }}
      </div>
    </div>
    <div class="content">
      <div
        class="detail-reply"
        v-if="pageData.qbpl && pageData.qbpl.length !== 0"
      >
        <div
          class="reply-wrapper"
          v-for="(item, index) in pageData.qbpl"
          :key="index"
        >
          <div class="item-top">
            <div class="left-fyr">
              <img src="./images/msg-red.png" alt="" />
              {{ item.hfry }}
            </div>
            <div class="right-time">
              {{ item.hfsj }}
            </div>
          </div>
          <div class="item-content">
            {{ item.hfnr }}
          </div>
          <div class="icon">
            <div
              class="images"
              @click="lookOver(item.fileArr, index_1)"
              v-for="(item_1, index_1) in item.fileArr"
              :key="index_1"
            >
              <img :src="item_1" />
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="comment_base">
      <div class="comment_but" @click="publish">
        <div class="comment_but_icon">
          <img src="/static/talk_white@2x.png" alt="" />
        </div>
        点击回复
      </div>
      <div class="comment_input">
        <div class="comment_input_icon"></div>
        <div class="comment_input_content">
          <input
            type="text"
            v-model="value"
            placeholder="评论"
            id="inputs"
            ref="inputs"
          />
        </div>
        <div class="comment_input_but" @click="send">发送</div>
      </div>
    </div>
  </div>
</template>

<script>
import GmtSearchList from "@/components/GmtSearchList"
import { TjSqPj, GetShotPjList, DelSqPj } from "@/api/secondLevelPage"
export default {
  data () {
    return {
      publishState: false,
      pageIndex: 1,
      pageSize: 10,
      value: "",
      refreshing: false,
      listData: "",
      pageData: ""
    }
  },
  components: {
    GmtSearchList
  },
  methods: {
    publish () {
      this.publishState = true
      this.$nextTick(vm => {
        let dome = document.getElementById("inputs").focus()
      })
    },
    // 发表评价
    send () {
      if (!this.value) {
        this.changtoast("请输入评价内容", "error")
        return
      }
      var dbzsDlAsync = JSON.parse(sessionStorage.getItem("dbzsDlAsync"))
      this.$indicator.open("加载中...")
      this.$post("api/mlgm/dbzsHfpl", {
        yhid: dbzsDlAsync.yhid,
        token: dbzsDlAsync.token,
        topicId: this.$route.params.id,
        content: this.value
      }).then(res => {
        this.$indicator.close()
        if (res.data.success) {
          if (res.data.content) {
            dbzsDlAsync.token = res.data.content.token
            sessionStorage.setItem("dbzsDlAsync", JSON.stringify(dbzsDlAsync))
            this.$post("api/mlgm/dbzsHfpl", {
              yhid: dbzsDlAsync.yhid,
              token: dbzsDlAsync.token,
              topicId: this.$route.params.id,
              content: this.value
            }).then(res => {
              this.$indicator.close()
              if (res.data.success) {
                this.changtoast("回复成功")
                this.value = ""
                this.pageIndex = 1
                this.$router.go(0)
              } else {
                this.changtoast(res.data.message, "error")
              }
            })
          } else {
            this.changtoast("回复成功")
            this.value = ""
            this.pageIndex = 1
            this.$router.go(0)
          }
        } else {
          this.changtoast(res.data.message, "error")
        }
      })
    },
    // 删除评论
    deleteComment (item) {
      DelSqPj({
        id: item
      }).then(rps => {
        if (rps.data.success) {
          this.changtoast("删除成功")
          this.value = ""
          this.pageIndex = 1
          this.GetListData()
        } else {
          this.changtoast(rps.data.message, "error")
        }
      })
    },
    GetListData (done) {
      if (this.refreshing) return
      this.refreshing = true
      GetShotPjList({
        sqid: this.id,
        pageIndex: this.pageIndex,
        pageSize: this.pageSize
      }).then(rps => {
        this.refreshing = false
        if (rps.data.success) {
          if (this.pageIndex === 1) this.listData = rps.data.content
          else this.listData.push(...rps.data.content)
          this.pageIndex++
          if (done) done()
          if (
            rps.data.content.length < this.pageSize &&
            this.$refs["myScroller"]
          ) {
            this.$refs.myScroller.finishInfinite(true)
          }
        } else {
          this.$refs.myScroller.finishInfinite(true)
          this.changtoast(rps.data.message)
        }
      })
    }
  },
  created () {
    var dbzsDlAsync = JSON.parse(sessionStorage.getItem("dbzsDlAsync"))
    this.$indicator.open("加载中...")
    this.$post("api/mlgm/dbzsQbpl", { token: dbzsDlAsync.token, topicId: this.$route.params.id }).then(
      res => {
        this.$indicator.close()
        if (res.data.success) {
          this.pageData = res.data.content
        } else {
          this.changtoast(res.data.message, "error")
        }
      }
    )
  }
}
</script>

<style lang="scss" scoped>
@import './style/hf.scss';
</style>