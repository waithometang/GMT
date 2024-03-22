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
      if (this.homeType) {
        return this.homeType
      } else {
        return this.$store.state.ButtomTageState
      }
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
      this.$router.push({
        path: `/tzgg/${this.mk}/${item.id}`
      })
    }
  },
  created() {
    if (!this.homeType || this.homeType == "3") {
      this._GetTzgg();
    }
  }
}
</script>