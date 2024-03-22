<!--通知公告 -->
<template>
  <div class="publicNotification">
    <div class="publicNotification_content">
      <div class="publicNotification_content_icon" @click="changePages">
        <img src="/static/notice@2x.png" alt="">
      </div>
      <div class="publicNotification_content_tab">
        <swiper class="swiImgs" :options="swiperOption">
          <swiper-slide class="swname" v-for="(item, index) in listData" :key="index">
            <div class="publicNotification_content_tab_name" @click="checkParticulars(item[0])">
              <div class="content_tab_name_text">{{item[0].title}}</div>
              <div class="content_tab_name_time">{{item[0].date}}</div>
            </div>
            <div class="publicNotification_content_tab_name publicNotification_content_tab_name_margin" v-if="item[1]" @click="checkParticulars(item[1])">
              <div class="content_tab_name_text">{{item[1].title}}</div>
              <div class="content_tab_name_time">{{item[1].date}}</div>
            </div>
          </swiper-slide>
        </swiper>
      </div>
    </div>
  </div>
  <!-- <div class="notification-pages">
    <div class="content">
      <div class="images" @click="changePages">
        <img :src="homeType == '3' ? '/images/announcement.png' : '/images/FirstLevelPage/notification1.png'">
      </div>
      <div class="title">
        <swiper class="swiImgs" v-if="listData.length > 0" :options="swiperOption">
          <swiper-slide class="swname" v-for="(item, index) in listData" :key="index">
            <div class="name" @click="checkParticulars(item[0])">
              <div class="tit">{{item[0].title}}</div>
              <div class="time">{{item[0].date}}</div>
            </div>
            <div class="name" v-if="item[1]" @click="checkParticulars(item[1])">
              <div class="tit">{{item[1].title}}</div>
              <div class="time">{{item[1].date}}</div>
            </div>
          </swiper-slide>
        </swiper>
      </div>
    </div>
  </div> -->
</template>

<script>
import { Tzgg } from "@/api/FirstLevelPage";

export default {
  computed: {
    userinfo () {
      return this.$store.state.userinfo
    },
    homeType () {
      return this.$route.params.type
    },
    mk () {
      if(this.mkid){
        return this.mkid
      }else if (this.homeType) {
        return this.homeType
      } else {
        return this.$store.state.ButtomTageState
      }
    }
  },
  props: {
    mkid:{
      type: Number
    }
  },
  data() {
    return {
      swiperOption: {
        notNextTick: true,
        initialSlide: 0,
        autoplay: {
          delay: 1500,
          stopOnLastSlide: false,
          disableOnInteraction: false
        },
        speed: 800,
        direction: "vertical"
      },
      listData: ""
    };
  },
  watch: {
    userinfo () {
      if (this.$store.state.ButtomTageState != 4) {
        this._GetTzgg()
      }
    }
  },
  methods: {
    // 获取数据列表
    _GetTzgg() {
      if (this.$store.state.ButtomTageState == 4) {
      }
      let vid = this.$store.state.userinfo.id
      Tzgg(this.mk,vid).then(rps => {
        if (rps.data.success) {
          this.listData = rps.data.content;
        } else {
          if (rps.data.message) {
            this.changtoast(rps.data.message, "error");
          }
        }
      });
    },
    // 进入列表页面
    changePages ()  {
      let mk=this.mk
      this.$router.push({
        path: '/tzgg_list/'+mk
      })
    },
    // 查看详情
    checkParticulars (item) {
      if (item.linkage) {
        // let url = item.linkage + '&scene=4#wechat_redirect'
        // window.location.href = url
        window.location.href = item.linkage
      } else {
        this.$router.push(`/tzgg/${this.mk}/${item.id}`)
      }
    }
  },
  created() {
    if (!this.homeType || this.homeType == "3") {
      this._GetTzgg();
    }
  }
};
</script>

<style lang="scss" scoped type="text/css">
.notification-pages {
  background: #ffffff;
  margin-top: 20px;
  .content {
    width: 700px;
    height: 120px;
    margin: 0 25px;
    display: flex;
    .images {
      height: 120px;
      width: 100px;
      margin-right: 20px;
      img {
        width: 100px;
        height: 100px;
        margin-top: 10px;
      }
    }
    .title {
      width: 600px;
      height: 100px;
      margin: 10px 0;
      .swiImgs {
        margin: 0px;
        width: 600px;
        height: 100px;
        z-index: 0;
        .swname {
          width: 100%;
          .name {
            height: 50px;
            line-height: 50px;
            font-family: PingFang-SC-Medium;
            font-weight: 500;
            color: black;
            display: flex;
            .tit {
              float: left;
              font-size: 28px;
              width: 425px;
              margin-right: 20px;
              overflow: hidden;
            }
            .time {
              color: rgb(153, 153, 153);
              font-size: 22px;
              float: right;
              text-align: right;
              overflow: hidden;
            }
          }
          .name:active{
            background: #cccccc;
          }
        }
      }
    }
  }
}
</style>
