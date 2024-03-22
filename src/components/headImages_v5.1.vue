<template>
  <!-- <div class="headImages">
    <div class="swiperIcon">
      <swiper class="swiImgs" :options="swiperOption" ref="mySwiper">
        <swiper-slide :class="{'swiper-no-swiping stop-swiping': HeadImageBanner.length <= 1}" v-for="(item, index) in HeadImageBanner" :key="index">
          <img class="images" :src="item">
        </swiper-slide>
        <div class="swiper-pagination" slot="pagination"></div>
      </swiper>
    </div>
    <div class="siteIcon" v-if="ButtomTageState == 2">
      <div class="icon">
        <img :src="userimages ? userimages : defaultimages">
      </div>
      <div class="site" @click="goto">
        <div class="min-icon">
          <img src="/images/FirstLevelPage/img_02.png">
        </div>
        <span>{{userinfo.name}}[切换]</span>
      </div>
    </div>
    <div class="weathers" v-if="WeatherData" @click="lookover">
      <div class="weather-tabs">
        <img :src="SetWeatherInfo(WeatherInfo)" v-if="SetWeatherInfo(WeatherInfo)">
        <span>{{WeatherData[0]}}℃ ~ {{WeatherData[1]}}</span>
      </div>
    </div>
  </div> -->
  <div class="public_head_imgae">
    <swiper class="swiImgs" :options="swiperOption" ref="mySwiper">
      <swiper-slide :class="{'swiper-no-swiping stop-swiping': HeadImageBanner.length <= 1}" v-for="(item, index) in HeadImageBanner" :key="index">
        <img v-if="ButtomTageState === 1" :src="item.Url" alt="" @click="clickIcon(item)">
        <img v-else :src="item" alt="">
      </swiper-slide>
      <div class="swiper-pagination" slot="pagination"></div>
    </swiper>
    <div class="public_head_imgae_siteIcon" v-if="ButtomTageState == 2">
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
import { Banner, GetAvatarUrl, GetWeatherReport, GetWeather } from "@/api/FirstLevelPage";

export default {
  props: {
    GMT_HeadImageData: {
      type: Array,
      default: function () {
        return []
      }
    },
    GMT_IntShowWeather: {
      type: Boolean,
      default: false
    },
    GMT_IntShowSiteIcon: {
      type: Boolean,
      default: false
    }
  },
  computed: {
    userinfo () {
      return this.$store.state.userinfo
    },
    Token() {
      return storage.fetch("Token").data;
    },
    userimages() {
      return storage.fetch("userimages").data;
    },
		ButtomTageState() {
		  return this.$store.state.ButtomTageState;
    },
    HeadImageBanner () {
      if (this.ButtomTageState == 2) {
        return this.$store.state.HeadImageBanner
      } else if (this.ButtomTageState == 1) {
        return this.$store.state.indexBenner
      } else {
        return this.GMT_HeadImageData
      }
    }
  },
  data() {
    return {
      imagesData: ["/images/defaultBenner.jpg"],
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
      },
      WeatherData: '',
      WeatherInfo: ''
    };
  },
  watch: {
    ButtomTageState () {
      if (this.ButtomTageState == 2) {
        this._GetBanner()
      }
    },
    userinfo () {
      this._GetBanner()
    }
  },
  methods: {
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
          if (rps.dara.message) {
            this.changtoast(rps.dara.message, "error");
          }
        }
      });
    },
    // 获取轮播图
    _GetBanner () {
      Banner(this.userinfo.id).then(rps => {
        if (rps.data.success) {
          this.$store.commit('SetHeadImageBanner', rps.data.content)
          this.$refs.mySwiper.update()
        } else {
          this.changtoast(rps.data.message, "error");
        }
      });
    },
    // 获取天气
    _GetWeather () {
      GetWeather({},
        {method: 'get'}
      ).then(rps => {
        let _data = JSON.parse(rps.data.content)
        if (_data.error_code === 0) {
          this.WeatherData = _data.result.future[0].temperature.split('/')
          this.WeatherInfo = _data.result.realtime.info
        }
      })
    },
    // 设置天气图标
    SetWeatherInfo (item) {
      switch (item) {
        case '多云':
          return '/images/FirstLevelPage/cloudy1.png'
          break;
        case '阴':
          return '/images/FirstLevelPage/overcast1.png'
          break;
        case '晴':
          return '/images/FirstLevelPage/sun1.png'
          break;
        case '小雨':
          return '/images/FirstLevelPage/light_rain1.png'
          break;
        case '中雨':
          return '/images/FirstLevelPage/light_rain_xl1.png'
          break;
        case '大雨':
          return '/images/FirstLevelPage/light_rain_xxl1.png'
          break;
        case '暴雨':
          return '/images/FirstLevelPage/light_rain_xxl1.png'
          break;
        case '雷阵雨':
          return '/images/FirstLevelPage/thundershower1.png'
          break;
        default:
        return ''
          break;
      }
    },
    clickIcon (item) {
      if (item.Link) {
        if (item.Link.indexOf('http') != -1) {
          window.location.href = item.Link
        } else {
          this.$router.push(item.Link)
        }
      }
    },
    lookover () {
      window.location.href = 'http://www.sunhero.cn/GaoMingweixin/weixinPage/todayWether.html?scene=4#wechat_redirect'
    }
  },
  created() {
    this._GetWeather()
    if (this.ButtomTageState === 2) {
      this._GetBanner()
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
    .swiper-pagination {
      text-align: right;
      left: 20px !important;
      right: 20px !important;
      width: auto !important;
      .swiper-pagination-bullet {
        height: 20px;
        width: 20px;
      }
      .swiper-pagination-bullet{
        background:#ffffff;
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
      margin-left: 20px;
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
  .weathers {
    position: absolute;
    top: 30px;
    left: 0;
    right: 0;
    z-index: 1;
    width: auto;
    display: flex;
    justify-content: flex-end;;
    align-items: center;
    .weather-tabs {
      display: flex;
      justify-content: flex-end;;
      align-items: center;
      background: rgba(255, 255, 255, 1);
      box-shadow: 0px 0px 10px 0px rgba(31, 31, 31, 0.75);
      opacity: 0.4;
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
