<!-- 首页导航 -->
<template>
  <div class="primaryNavigation">
    <swiper :options="swiperOption">
      <swiper-slide v-for="(item, index) in initData" :key="index" :class="{'swiper-no-swiping stop-swiping': initData.length == 1}" >
        <div class="content">
          <div class="list" v-if="false">
            <div class="list-li" v-for="(item, index) in item" :key="index" @click="switchoverPages(item)" v-if="shouPublished(item)">
              <div class="iconTetile">
                <div class="icon">
                  <div class="number" v-if="wydsData && wydsData[item.id]">{{wydsData[item.id]}}</div>
                  <img :src="item.images" alt>
                </div>
                <div class="tetile">{{item.title}}</div>
              </div>
            </div>
          </div>
          <ul class="list-ul" v-if="true">
            <li class="ul-li" v-for="(item, index) in item" :key="index" @click="switchoverPages(item)" v-if="shouPublished(item)">
              <div class="iconTetile">
                <div class="icon">
                  <div class="number" v-if="wydsData && wydsData[item.id]">{{wydsData[item.id]}}</div>
                  <img :src="item.images" alt>
                </div>
                <div class="tetile">{{item.title}}</div>
              </div>
            </li>
            <div style="clear:both;"></div> 
          </ul>
        </div>
      </swiper-slide>
    </swiper>
  </div>
</template>

<script>
import { getCatalogue } from "@/js/selectCatalogue";
import { storage } from "@/js/until";
import { mapActions } from 'vuex'


export default {
  props: ["ButtomTageState"],
  computed:{
    wydsData:{
      get(){
        return this.$store.state.Main_wydsData
      },
      set(val){
        this.$store.state.Main_wydsData=val
      }
    },
    FbInfo () {
      return this.$store.state.FbInfo
    }
  },
  data() {
    return {
      swiperOption: {
        //循环
        loop: false,
        pagination: {
          el: ".swiper-pagination",
          clickable: true
        },
        noSwiping: true,
        noSwipingClass: "stop-swiping"
      },
      initData: [],
      selectIndex: 0
    };
  },
  methods: {
    ...mapActions(['GetuserInfo', 'getGrxx']),
    // 首页图标跳转
    switchoverPages(item) {
      switch (item.type) {
        case "1":
          if (item.id === '5001') {
            this.getGrxx().then (val => {
              if (val.hasSM) {
                if (val.isGwy) {
                  this.$router.push('/gwyrz')
                } else {
                  this.$router.push('/Certification')
                }
              } else {
                if (val.smrzzt === '认证中' || val.smrzzt === '已撤消') {
                  this.$router.push('/Certification')
                } else {
                  this.$router.push('/smrz')
                }
              }
            })
          } else{
            this.$router.push(item.url);
          }
          break;
        case "3":
          window.location.href = item.url;
          break;
        case "4":
          this.$router.push(`${item.url}/${storage.fetch("longData").data.id}`);
          break;
        case "5":
          this.$store.commit('Set_ButtomTageState', 3) // 底部导航状态
          this.$store.commit('Set_TopTagState', 1) // 诉求反映顶部导航状态
          break;
        default:
          break;
      }
    },
    shouPublished (item) {
      let show = false 
      if (item.id === '5007') {
        if (this.FbInfo.dyfb || this.FbInfo.lwfb || this.FbInfo.zlfb || this.FbInfo.zxkhfb) {
          show = true
        }
      } else {
        show = true
      }
      return show
    },
    // 获取图标名字
    changedInitData() {
      if (this.ButtomTageState == 1) {
        this.initData = getCatalogue([
          "1001",  "1002", "1011", "1004", "1005", "1006", "1009", "1012"
        ])
      }
      if (this.ButtomTageState == 2) {
        this.initData = getCatalogue([
          "2001", "2002", "2003", "2014", "2004", "2007", "2008", "2005", "2013", "2011", "2010", "2016"
        ]);
      }
      if (this.ButtomTageState == 3) {
        this.initData = getCatalogue([
          "3005", "3006", "3010", "3011"
        ]);
      }
      if (this.ButtomTageState == 4) {
        this.initData = getCatalogue([
					"5004","5006", "5005", "5001", "5003","5007","5008", "5009"
        ]);
        this.getGrxx().then (val => {
          if(val.right>99) 
            this.initData[0].push({ images: "/static/23@2x.png", title: '数据统计', url: '/sjtj', type: '1', id: '50091' })
        })
      }
    }
  },
  destroyed: function() {
    this.selectIndex = 0;
  },
  created() {
    this.changedInitData()
  },
  watch: {
    ButtomTageState() {
      this.changedInitData();
    },
    $route(to,from){
      this.selectIndex = 0;
    }
  }
};
</script>

<style  lang='scss' scoped type="text/css">
.primaryNavigation {
  width: 750px;
  background: rgba(255, 255, 255, 1);
  position: relative;
  .content {
    height: auto;
    width: 750px;
    .list-ul {
      height: auto;
      margin: 0px 15px;
      padding: 0px;
      list-style: none;
      .ul-li {
        float: left;
        min-width: 240px;
        height: auto;
        .iconTetile {
          height: auto;
          margin: 25px 0;
          .icon {
            width: 60px;
            height: 50px;
            margin: 0 auto;
            margin-bottom: 20px;
            .number {
              width: 40px;
              height: 40px;
              border-radius: 50%;
              position: absolute;
              text-align: center;
              line-height: 40px;
              float: right;
              background: #FF8F03;
              color: #ffffff;
              margin-left: 40px;
              margin-top: -25px;
              font-size: 22px;
            }
            img {
              height: 100%;
              width: 100%;
            }
          }
          .tetile {
            height: auto;
            width: 100%;
            overflow: hidden;
            text-align: center;
            font-size: 28px;
            font-weight: 500;
            color: rgba(0, 0, 0, 1);
          }
        }
      }
      .ul-li:active {
        background: #cccccc;
      }
    }
    .list {
      height: auto;
      margin: 0px 15px;
      padding: 0px;
      list-style: none;
      display: flex;
      flex-wrap: wrap;
      .list-li {
        flex: 1;
        min-width: 240px;
        max-width: 240px;
        height: auto;
        .iconTetile {
          height: auto;
          margin: 25px 0;
          .icon {
            width: 60px;
            height: 50px;
            margin: 0 auto;
            margin-bottom: 20px;
            .number {
              width: 40px;
              height: 40px;
              border-radius: 50%;
              position: absolute;
              text-align: center;
              line-height: 40px;
              float: right;
              background: #FF8F03;
              color: #ffffff;
              margin-left: 40px;
              margin-top: -25px;
              font-size: 22px;
            }
            img {
              height: 100%;
              width: 100%;
            }
          }
          .tetile {
            height: auto;
            width: 100%;
            overflow: hidden;
            text-align: center;
            font-size: 28px;
            // font-family: PingFang-SC-Medium;
            font-weight: 500;
            color: rgba(0, 0, 0, 1);
          }
        }
      }
      .list-li:active{
        background: #cccccc;
      }
      .action {
        background: #cccccc;
      }
    }
  }
}
.featureList /deep/ .swiper-container {
  background: #ffffff;
}
.featureList /deep/ .swiper-pagination-bullet {
  width: 0.21rem;
  height: 0.21rem;
}
</style>
