<!-- 村规民约页面 -->
<template>
  <div class="VillageRegulations">
    <!-- 社区图片 -->
    <div class="headImages">
      <div class="swiperIcon">
        <swiper class="swiImgs" :options="swiperOption">
          <swiper-slide v-for="(item, index) in imagesData" :key="index" :class="{'swiper-no-swiping stop-swiping': imagesData.length <= 1}" >
            <img class="images" :src="SetImages(item)">
          </swiper-slide>
          <div class="swiper-pagination" slot="pagination"></div>
        </swiper>
      </div>
    </div>
    <!-- 选择-->
    <div v-if="this.$route.params.type == 3" class="select">
      <div @click="changeState(1)" :class="{'cor1': StateType == 1}">村居概况</div>
      <div @click="changeState(2)" :class="{'cor1': StateType == 2}">村大事记</div>
      <div @click="changeState(3)" :class="{'cor1': StateType == 3}">村规民约</div>
    </div>
    <!-- 村居概况 村规民约 -->
    <div v-if="StateType == 1 || StateType == 3" class="RegulationsContent">
      <div class="headline">
        <div class="title" v-if="name">{{name}}</div>
        <div class="timeNumber">
          <div class="timeNumber_li">
            <div class="images add">
              <img id="GMT_min_icon" src="/images/img_12.png">
            </div>
            {{fbr}}
          </div>
          <div class="timeNumber_li">
            <div class="images Number">
              <img id="GMT_min_icon" src="/images/img_11.png">
            </div>
            {{readed}} 阅读
          </div>
        </div>
      </div>
      <div class="Content" v-html="content"></div>
    </div>
    <!-- 村大事记 -->
    <div v-if="this.$route.params.type == 3 && StateType == 2" class="important">
      <GmtSearchList class="laye" url="api/Common/PulishList" :useSearch="false" :parms="{fblxId: 6, mkid:2, Vid:this.$route.params.vid}" >
        <template slot="item" slot-scope="listData">
          <GmtDefaultList :listData="listData.data" :mkid='mkid'></GmtDefaultList>
        </template>
      </GmtSearchList>
    </div>
  </div>
</template>

<script>
import { GetDescription } from "@/api/secondLevelPage.js";
import IndexHead from "@/components/headImages";
import { PublishUtil, ImageUtil } from "@/js/businessUntil";
import GmtCommonList from "@/components/GmtCommonList.vue";
import releaseContentList from "@/components/releaseContentList";
import GmtSearchList from "@/components/GmtSearchList.vue";
import GmtDefaultList from '@/components/GmtDefaultList'
import { Banner } from "@/api/FirstLevelPage";

export default {
  components: {
    IndexHead,
    GmtCommonList,
    releaseContentList,
    GmtSearchList,
    GmtDefaultList
  },
  data() {
    return {
      titleData: '村大事记',
      type: 1,
      content: "",
      name: "",
      editDate: "",
      readed: 0,
      fbr: "",
      listData: [],
      url: "/cjfb",
      pageIndex: 1, // 页数
      pageSize: 10, // 没页数量
      documenttitle: '村居概况',
      imagesData: [],
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
      mkid: 2
    };
  },
  computed: {
    StateType () {
      return this.$store.state.StateTypeData
    }
  },
  created() {
    this._GetDescription();
    this._GetBanner()
    let titletype = this.$route.params.type
    try {
      document.title = this.documenttitle
    } catch (error) {
      
    }
  },
  methods: {
    SetImages (item) {
      return 'http://gmt.gaoming.gov.cn' + item.slice(2, item.length)
    },
    // 获取轮播图
    _GetBanner () {
      Banner(this.$route.params.vid).then(rps => {
        if (rps.data.success) {
          this.imagesData = rps.data.content
          // this.$refs.mySwiper.update()
        } else {
          this.changtoast(rps.data.message, "error");
        }
      });
    },
    _GetDescription(item) {
      let type = ''
      if (item) {
        type = item
      } else {
        type = this.$route.params.type == '3' ? 0 : 1
      }
      GetDescription(type, this.$route.params.vid).then(rps => {
        if (rps.data.success) {
          this.content = rps.data.content.content;
          this.editDate = rps.data.content.editTime;
          this.readed = rps.data.content.readedCount;
          this.fbr = rps.data.content.fbr;
        }
      });
    },
    gotoRz(id) {
      this.$router.push(`/nrfbxx/2/${id}`);
    },
    changeState(item) {
      if (item == 2) {
        this.documenttitle = '村大事记'
      } else {
        if (item == 1) {
         this.documenttitle = '村居概况'
          this._GetDescription(0)
        } else {
          this.documenttitle = '村规民约'
          this._GetDescription(1)
        }
        document.title = this.documenttitle
        try {
        } catch (error) {
        }
      }
      this.$store.commit('SET_StateTypeData', item)
    },
    getImgUrl: ImageUtil.getDefaultImg
  }
};
</script>  

<style lang='scss'>
@import "@/style/pages/secondLevelPages/homePage/VillageRegulations.scss";
</style>
