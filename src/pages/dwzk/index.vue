<template>
  <div class="index">
    <div class="head">
      <div class="icon">
        <!-- <img src="/static/zkbm/dwzpbanner.png" alt="" /> -->
        <img src="./image/dwzpbanner.png" alt="" />
      </div>
      <div class="category">
        <div class="category-tab" @click="wybmFn">
          <div class="tab-right"></div>
          <div class="tab-left">
            <div class="left-head">我要报考</div>
            <div class="left-base">点击进行报考</div>
          </div>
        </div>
        <div class="category-tab" @click="wycxFn">
          <div class="tab-right"></div>
          <div class="tab-left">
            <div class="left-head">点击查询</div>
            <div class="left-base">所有报考记录</div>
          </div>
        </div>
      </div>
    </div>
    <div class="inform">
      <notification :mkid="11" />
    </div>
    <div class="procedure">
      <div class="procedure-name">报考步骤</div>
      <div class="procedure-list">
        <div class="bar" v-for="(item, index) in listData" :key="index">
          <div class="icon-name">
            <div class="icon"><img :src="item.icon" alt="" /></div>
            <div class="name">{{ item.name }}</div>
          </div>
          <div class="procedure-bar">
            <div class="bar-icon">
              <img src="/static/ybmimages/jiantou_2.png" alt="" />
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="RecentNewsList">
      <!-- <div class="information-title">
        <div class="title-icon">信息发布</div>
        <div class="title-more" @click="viewMore">更多<div class="more-icon"></div></div>
      </div>
      <div class="information-list">
        <div class="information-tab" v-for="(item, index) in publishData" :key="index" @click="lookOver(item)">
          <div class="tab-head">{{item.title}}</div>
          <div class="tab-base">
            <div class="base-time">
              <div class="time-icon"></div>
              {{item.publishTime}}
            </div>
          </div>
        </div>
      </div> -->
      <recent-news :GMT_TageState="11" :showFbIds="showFbId"></recent-news>
    </div>
  </div>
</template>

<script>
import { Tzgg } from "@/api/FirstLevelPage"
import Notification from "@/components/FirstLevelPage/notification"
import RecentNews from "@/components/FirstLevelPage/recentNews"
export default {
  components: {
    Notification,
    RecentNews
  },
  data() {
    return {
      listData: [
        { name: "报考申请", icon: "/static/zkbm/bmsq.png" },
        { name: "资格审核", icon: "/static/zkbm/bmsh.png" },
        { name: "获取准考证", icon: "/static/zkbm/bmzkz.png" }
      ],
      publishData: "",
      tzggData: [],
      showFbId: { Id: 47, Name: "信息发布" }
    }
  },
  created() {
    this.$showSubscribe()
  },
  methods: {
    wybmFn() {
      this.$indicator.open("加载中...")
      this.$get("api/zkgl/ckeckcc").then(res => {
        this.$indicator.close()
        if (res.data.success) {
          let cont = res.data.content
          if (cont === -1) {
            this.$dialog.alert({
              title: "温馨提示",
              message: "电子政务股技术雇员招考报名将于4月19日上午8:30时开始"
            })
          } else if (cont === -2) {
            this.$router.push("/dwzk/wybm")
          } else {
            this.$router.push("/dwzk/xzgw/" + cont)
          }
        } else {
          this.changtoast(res.data.message, "error")
        }
      })
    },
    wycxFn() {
      this.$router.push("/dwzk/wdbm/list")
    },
    lookOver(item) {
      if (item.linkage) {
        window.location = item.linkage
      } else {
        this.$router.push(`/fbxq/${item.id}`)
      }
    },
    clickTzgg(item) {
      this.$router.push(`/tzggxq/${item.id}`)
    },
    examineList() {
      this.$router.push("/tzgg_list/11")
    },
    seeAbout() {
      this.$router.push(`/cx`)
    },
    viewMore() {
      this.$router.push(`/zxdt`)
    }
  }
}
</script>

<style lang='scss' scoped>
@import "./style/index.scss";
</style>