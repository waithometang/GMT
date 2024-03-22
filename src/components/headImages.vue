<template>
  <!-- <div class="headImages">
    <div class="swiperIcon">
      <swiper class="swiImgs" :options="swiperOption">
        <swiper-slide v-for="(item, index) in imagesData" :key="index" :class="{'swiper-no-swiping stop-swiping': imagesData.length <= 1}" >
          <img class="images" :src="item">
        </swiper-slide>
        <div class="swiper-pagination" slot="pagination"></div>
      </swiper>
    </div>
    <div class="siteIcon" v-if="false">
      <div class="icon">
        <img :src="userimages ? userimages : defaultimages">
      </div>
      <div class="site" @click="goto">
        <div class="min-icon">
          <img src="/images/FirstLevelPage/img_02.png">
        </div>
        <span>{{longData.name}}[切换]</span>
      </div>
    </div>
  </div> -->
  <div class="public_head_imgae">
    <swiper class="swiImgs" :options="swiperOption" ref="mySwiper">
      <swiper-slide :class="{'swiper-no-swiping stop-swiping': imagesData.length <= 1}" v-for="(item, index) in imagesData" :key="index">
        <img :src="item">
      </swiper-slide>
      <div class="swiper-pagination" slot="pagination"></div>
    </swiper>
    <div class="public_head_imgae_siteIcon" v-if="false">
      <div class="public_head_imgae_icon">
        <img :src="userimages ? userimages : defaultimages">
      </div>
      <div class="public_head_imgae_site" @click="goto">
        <div class="public_head_imgae_min-icon">
          <img src="/images/FirstLevelPage/img_02.png">
        </div>
        <span>{{userinfo.name}}[切换]</span>
      </div>
    </div>
  </div>
</template>

<script>
import Axios from "axios"; 
import { storage } from "@/js/until";
import { Banner, GetAvatarUrl, GetWeatherReport } from "@/api/FirstLevelPage";

export default {
  props: ["ButtomTageState"],
  computed: {
    longData() {
      return storage.fetch("longData").data;
    },
    vid(){
      return this.$route.params.vid
    },
    Token() {
      return storage.fetch("Token").data;
    },
    userimages() {
      return storage.fetch("userimages").data;
    },
    HeadImageBanner () {
      return this.$store.state.HeadImageBanner
    }
  },
  data() {
    return {
      defaultBenner: "/images/defaultBenner.jpg",
      imagesData: [],
      defaultimages: "/images/yuangong-ling_01.png",
      swiperOption: {
        //设定初始化时slide的索引
        initialSlide: 0,
        //自动播放
        autoplay:true,
        pagination: {
          el: '.swiper-pagination',
          clickable: true,
        },
        observer:true,
        noSwiping: true,
        noSwipingClass: "stop-swiping",
        autoplayDisableOnInteraction: true,
        //滑动速度
        speed: 800
      }
    };
  },
  watch: {
    ButtomTageState() {
      this._GetBanner();
    }
  },
  methods: {
    // 获取顶部图片
    _GetBanner() {
      if (this.ButtomTageState != 1) {
        this.imagesData = [];
        if (this.ButtomTageState == 2) { // 党建
          this.imagesData = ["/images/party-banner.jpg"];
          Banner(this.vid).then(rps => {
            if (rps.data.success) {
              if (rps.data.content.length > 0) {
                this.imagesData = rps.data.content;
                this.$store.commit('SetHeadImageBanner', rps.data.content)
              } else {
                this.imagesData = ["/images/defaultBenner.jpg"]
              }
            } else {
              this.changtoast(rps.data.message, "error");
            }
          });
        } else if (this.ButtomTageState == 3) { // 振新
          // this.imagesData = ['/images/country_banner.png']
          this.imagesData = ["/images/party-banner.jpg"];
        } else if (this.ButtomTageState == 4) {
          // this.imagesData = ["/images/FirstLevelPage/PA_banner.png"];
           this.imagesData = ['/images/country_banner.png']
        } else if (this.ButtomTageState == 5) {
          this.imagesData = ["/static/newEditionIndex/qiyebanner.png"]
        } else if (this.ButtomTageState == 6) {
          this.imagesData = ["/static/sy-banner.png"]
        }
        return;
      } else {
        if (this.HeadImageBanner) {
          this.imagesData = this.HeadImageBanner
          return
        }
      }
    },
    // 选择村居
    goto() {
      this.$router.push({
        path: "/AreaSelection"
      });
    },
    // 获取头像
    _GetAvatarUrl() {
      GetAvatarUrl({}).then(rps => {
        if (rps.data.success) {
          if (rps.data.content) {
            this.defaultimages = rps.data.content;
            storage.save("userimages", rps.data.content);
          }
        } else {
          this.changtoast(rps.dara.message, "error");
        }
      });
    },
  },
  created() {
    if (this.longData) {
      this._GetBanner();
    }
    if (this.Token) {
      this._GetAvatarUrl();
    }
  }
};
</script>

<style lang='scss' type="text/css" scpoed>
.headImages {
  height: 300px;
  .swiperIcon {
    height: 300px;
    width: 100%;
    .swiImgs {
      height: 300px;
      .images {
        width: 100%;
        height: 300px;
      }
    }
  }
  .headIcon {
    height: 300px;
    width: 100%;
    img {
      width: 100%;
      height: 300px;
    }
  }
  .siteIcon {
    position: relative;
    height: 120px;
    margin-top: -120px;
    z-index: 1;
    display: flex;
    .icon {
      height: 97px;
      width: 97px;
      margin-top: 3px;
      margin-bottom: 20px;
      margin-left: 40px;
      border: 5px solid;
      border-color: #ffffff;
      border-radius: 15px;
      img {
        width: 100%;
        height: 100%;
      }
    }
    .site {
      margin-left: 20px;
      display: flex;
      .min-icon {
        margin-top: 67px;
        height: 32px;
        width: 24px;
        margin-right: 17px;
        img {
          width: 100%;
          height: 100%;
          margin-bottom: 20px;
        }
      }
      span {
        margin-top: 60px;
        overflow: hidden;
        display: inline-block;
        margin-bottom: 20px;
        font-size: 32px;
        font-family: PingFang-SC-Heavy;
        font-weight: 800;
        color: rgba(242, 249, 255, 1);
      }
    }
  }
  .weather {
    position: absolute;
    top: 30px;
    left: 0;
    right: 0;
    z-index: 1;
    width: auto;
    display: flex;
    justify-content: flex-end;;
    align-items: center;
    .weather-tab {
      display: flex;
      justify-content: flex-end;;
      align-items: center;
      background: rgba(255, 255, 255, 1);
      box-shadow: 0px 0px 10px 0px rgba(31, 31, 31, 0.75);
      opacity: 0.6;
      border-radius: 31px;
      margin-right: 20px;
      padding: 5px 10px;
      span {
        font-size: 30px;
        font-family: PingFang-SC-Medium;
        font-weight: 500;
        color: rgba(0, 97, 180, 1);
      }
      img {
        width: 46px;
        height: 46px;
        margin-right: 10px;
      }
    }
  }
}
</style>
