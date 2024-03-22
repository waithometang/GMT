<template>
  <div class="container">
    <div class="head_img">
      <img src="./images/banner.png" />
    </div>
    <Grid :vid="$route.params.vid"></Grid>
    <div class="activity_announcement">
      <span @click="gotoPartyActivity_index"
        ><img src="./images/活动公告.png"
      /></span>
      <span @click="gotoPartyActivity_detail(hdgg.id)"> · {{ hdgg.hdbt }}</span>
    </div>
    <!-- 展示内容 -->
    <div class="RecentNewsList">
      <div class="pushMessage">
        <div class="pushMessage_tab">
          <div class="pushMessage_tab_icon2">
            <img src="./images/new.png" />
            <span>最新动态</span>
          </div>
          <div class="pushMessage_tab_name" @click="gotos">
            更多
            <img src="/static/double@2x.png" alt />
          </div>
        </div>
        <div class="public_content">
          <GmtDefaultList :listData="listData" :mkid="2" />
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import Grid from "./component/Grid"
// import GmtDefaultList from "./component/GmtDefaultList"
import GmtDefaultList from "@/components/GmtDefaultList"
import wjutils from "@/js/WjSmrzUtil"
import { GetPulishList } from "@/api/FirstLevelPage"
import { storage } from "@/js/until"
export default {
  data () {
    return {
      listData: [],
      hdgg: ""
    }
  },
  components: {
    Grid,
    GmtDefaultList
  },
  computed: {
    longData () {
      return storage.fetch("longData").data
    }
  },
  methods: {
    gotos () {
      this.$router.push(`/sqfw/sqdtlb/${this.$route.params.vid}`)
    },
    gotoPartyActivity_detail (id) {
      this.$router.push("/PartyActivity_detail?id=" + id)
    },
    gotoPartyActivity_index () {
      this.$router.push("/PartyActivity_index")
    },
    GetlistData () {
      //先有村居
      // if (!this.longData.id) {
      //   this.$router.push({
      //     path: "/AreaSelection"
      //   })
      //   return
      // }
      storage.save("longData", this.$route.params.vid)
      GetPulishList({
        fblxId: 3,
        vid: this.$route.params.vid,
        addReaded: false,
        pageSize: 5
      }).then(rps => {
        if (rps.data.success) {
          this.listData = rps.data.content
        } else {
          if (rps.data.message) {
            this.changtoast(rps.data.message, "error")
          }
        }
      })
    }
  },
  created () {
    this.GetlistData()
    this.$indicator.open("加载中...")
    this.$post("api/PartyBuilding/dyhdList", {
      hddt: 1,
      sssq: (this.sssq = storage.fetch("longData").data.name)
    }).then(res => {
      this.$indicator.close()
      if (res.data.success) {
        this.hdgg = res.data.content[0]
      } else {
        this.changtoast(res.data.message, "error")
      }
    })
    // this.$indicator.open("加载中...")
    // this.$showSubscribe().then(() => {
    //   wjutils.gotoSMRZIfNotInModual(this, "csbm1026").then(() => {
    //     console.log(window.location)
    //     if (window.location.search) {
    //       window.location.href =
    //         window.location.origin + window.location.pathname
    //     }
    //   })
    // })
  }
}
</script>
<style lang="scss" scoped>
@import './style/index.scss';
</style>