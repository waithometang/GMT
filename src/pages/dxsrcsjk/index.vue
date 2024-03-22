<template>
  <div class="container">
    <div class="head_img">
      <img src="./images/mcdxs.png" />
    </div>
    <!-- <div class="notice_bar">
      <van-notice-bar left-icon="volume-o" :text="text" @click="navClickFn" />
    </div> -->
    <div class="content">
      <van-row>
        <van-col span="8" @click="gotoXxyz">
          <div class="content_icon">
            <img src="./images/信息认证.png" />
          </div>
        </van-col>
        <van-col span="8" @click="gotoHdyn">
          <div class="content_icon">
            <img src="./images/活动有你.png" />
          </div>
        </van-col>
        <van-col span="8" @click="gotoSxyw">
          <div class="content_icon">
            <img src="./images/实习有我.png" />
          </div>
        </van-col>
      </van-row>
      <van-row>
        <van-col span="8" @click="gotoGmdxsrcllz">
          <div class="content_icon">
            <img src="./images/人才联络站.png" />
          </div>
        </van-col>
        <van-col span="8">
          <div class="content_icon" @click="gotoRczc">
            <img src="./images/人才政策.png" />
          </div>
        </van-col>
        <van-col span="8" @click="gotoXstw">
          <div class="content_icon">
            <img src="./images/线上团委.png" />
          </div>
        </van-col>
      </van-row>
      <van-row>
        <van-col span="8" @click="gotoBybd">
          <div class="content_icon">
            <img src="./images/毕业报到.png" />
          </div>
        </van-col>
        <van-col span="8" @click="gotoJgsydwqyxqfk">
          <div class="content_icon">
            <img src="./images/机关事业单位企业需求反馈.png" />
          </div>
        </van-col>
        <van-col span="8" @click="gotoXtss">
          <div class="content_icon">
            <img src="./images/系统申诉.png" />
          </div>
        </van-col>
      </van-row>
    </div>
  </div>
</template>
<script>
import { NoticeBar } from "vant"
export default {
  data() {
    return {
      text: ""
    }
  },
  components: {
    "van-notice-bar": NoticeBar
  },
  methods: {
    navClickFn() {},
    gotoXxyz() {
      this.$router.push({
        path: "/dxs"
      })
    },
    gotoHdyn() {
      // this.changtoast("活动尚未开始！", "warning");
      this.$router.push({
        path: "/hdyn"
      })
    },
    gotoSxyw() {
      this.$router.push({
        path: "/sxyw"
      })
    },
    gotoGmdxsrcllz() {
      this.$router.push({
        path: "/gmdxsrcllz"
      })
    },
    gotoRczc() {
      window.location.href =
        "http://www.gaoming.gov.cn/gzjg/zfgzbm/qrzsbj/rcgzzl/"
      // this.$router.push({
      //   path: "/rczc"
      // })
    },
    gotoXstw() {
      window.location.href = "http://gmt.gaoming.gov.cn/gqt/wxindex.html#/"
    },
    gotoBybd() {
      window.location.href = "https://www.fsrlzy.cn/"
    },
    gotoJgsydwqyxqfk() {
      this.$router.push({
        path: "/jgsydwqyxqfk"
      })
    },
    gotoXtss() {
      this.$router.push({
        path: "/xtss"
      })
    }
  },
  created() {
    // this.$indicator.open("加载中...")
    // this.$post("api/Zx/dxsTzggList").then(res => {
    //   this.$indicator.close()
    //   if (res.data.success) {
    //     this.text = res.data.content.title
    //   } else {
    //     this.changtoast(res.data.message, "error")
    //   }
    // })
  }
}
</script>
<style lang="scss" scoped>
img {
  display: block;
}
.head_img {
  width: 100%;
  img {
    width: 100%;
  }
}
.content {
  .content_icon {
    img {
      width: 100%;
      height: 100%;
    }
  }
}
</style>
