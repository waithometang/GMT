<!-- 首页导航 -->
<template>
  <!-- <div class="primaryNavigation">
    <div v-if="MenuData.length <=0 " class="loadingMenu">
      <div id="Loading">
        <div class="loader-inner ball-beat"></div>
      </div>
    </div>
    <div class="content" v-else :options="swiperOption" v-for="(item, index) in MenuData" :key="index" :class="{'swiper-no-swiping stop-swiping': MenuData.length == 1}">
      <div class="list" v-if="false">
        v-if="iitem.Id!==26 || sfdy"
        <div class="list-li" :class="{'list-li-action': item.length >= 4}" v-for="(iitem, index) in item" :key="index" @click="switchoverPages(iitem)">
          <div class="iconTetile">
            <div class="icon">
              <div class="number" v-if="wydsData && wydsData[iitem.Id]">{{wydsData[iitem.Id]}}</div>
              <img :src="iitem.images" alt>
            </div>
            <div class="tetile">{{iitem.title}}</div>
          </div>
        </div>
      </div>
      <ul class="list-ul">
        <li class="ul-li" v-for="(iitem, index) in item" :key="index" @click="switchoverPages(iitem)">
          <div class="iconTetile">
            <div class="icon">
              <div class="number" v-if="wydsData && wydsData[iitem.Id]">{{wydsData[iitem.Id]}}</div>
              <img :src="iitem.images" alt>
            </div>
            <div class="tetile">{{iitem.title}}</div>
          </div>
        </li>
        <div style="clear:both;"></div> 
      </ul>
    </div>
  </div> -->
  <div class="public_list_tag">
    <div class="public_note_Data" v-if="MenuData.length <= 0"></div>
    <div class="list_tag_list" v-else v-for="(item_1, index_1) in MenuData" :key="index_1">
      <ul>
        <li class="list_tag_list_tab" v-for="(item, index) in item_1" :key="index" @click="switchoverPages(item)">
          <div class="list_tab_icon">
            <img :class="{'list_tab_icon_qy': GMT_TageState === 5, 'list_tab_icon_index': GMT_TageState != 5}" :src="item.images" alt="">
          </div>
          <div class="list_tab_name">{{item.title}}</div>
          <div class="list_tab_number" v-if="item.redNumber > 0">{{item.redNumber >= 99 ? '99+' : item.redNumber}}</div>
        </li>
        <div style="clear:both;"></div>
      </ul>
    </div>
  </div>
</template>

<script>
import { storage, session_Storage } from "@/js/until"
import {mapActions} from "vuex"
import { UpdateReadRecord } from '@/api/secondLevelPage'
export default {
  props: {
    MenuData: {
      type: Array,
      default: function () {
        return []
      }
    },
    GMT_TageState: { // 模块id

    }
  },
  computed:{
    wydsData:{
      get(){
        return this.$store.state.Main_wydsData
      },
      set(val){
        this.$store.state.Main_wydsData=val
      }
    },
    userinfo(){
      return this.$store.state.userinfo
    },
    ButtomTageState () {
      return this.$store.state.ButtomTageState
    },
    homeType () {
      return this.$route.params.type
    }
  },
  data() {
    return {
      swiperOption: {
        //循环
        loop: true,
        noSwiping: true,
        noSwipingClass: "stop-swiping"
      },
      selectIndex: 0,
      sfdy:false   //是否党员
    };
  },
  methods: {
    ...mapActions(['getGrxx']),
    // 首页图标跳转
    switchoverPages(item) {
      if (item.redNumber) {
        item.redNumber = 0
        this.emptyredNumber(item.Id)
        UpdateReadRecord ({
          menuId: item.Id,
          vid: this.ButtomTageState === 2 ? this.userinfo.id : 0
        })
      }
      let urlVillageId=''
      if(this.userinfo.id) urlVillageId='/'+this.userinfo.id
      this.selectIndex = item.id
      switch (item.gnlx) {  //功能类型
        case 1:   //发布类
          this.$router.push(`/nrfb/${item.fblx_id}${urlVillageId}`)
          break;
        case 2:  //内部链接
          this.$router.push(item.linkage+urlVillageId)
          // if (this.ButtomTageState == 2) {
          //   this.$router.push(item.linkage+urlVillageId)
          // } else {
          //   this.$router.push(item.linkage)
          // }
          break;
        case 3:  //外部链接
          window.location.href = item.linkage
          break;
        case "5":
          this.$store.commit('Set_ButtomTageState', 4) // 底部导航状态
          this.$store.commit('Set_TopTagState', 1) // 诉求反映顶部导航状态
          break;
        default:
          break;
      }
    },
    // 清空阅读数
    emptyredNumber (item) {
      let NotReadNumberData = session_Storage.fetch('NotReadNumber').data
      let data = NotReadNumberData.data || []
      let key = NotReadNumberData.key || []
      data.filter(val => {
        if (val.id === item) {
          val.number = 0
        }
      })
      session_Storage.save('NotReadNumber', {data, key})
    }
  },
  destroyed: function() {
    this.selectIndex = 0;
  },
  created() {
    this.getGrxx().then(grxx=>this.sfdy=grxx.sfdy)
  },
  watch: {
    $route(to,from){
      this.selectIndex = 0;
    }
  }
}
</script>

<style  lang='scss' scoped type="text/css">
.primaryNavigation {
  width: 750px;
  background: rgba(255, 255, 255, 1);
  position: relative;
  .loadingMenu{
    min-height: 300px;
    #Loading {
      top: 50%;
      left: 50%;
      position: absolute;
      -webkit-transform: translateY(-50%) translateX(-50%);
      transform: translateY(-50%) translateX(-50%);
      z-index: 100;
    }

    @-webkit-keyframes ball-beat {
      50% {
        opacity: 0.2;
        -webkit-transform: scale(0.75);
        transform: scale(0.75);
      }

      100% {
        opacity: 1;
        -webkit-transform: scale(1);
        transform: scale(1);
      }
    }

    @keyframes ball-beat {
      50% {
        opacity: 0.2;
        -webkit-transform: scale(0.75);
        transform: scale(0.75);
      }

      100% {
        opacity: 1;
        -webkit-transform: scale(1);
        transform: scale(1);
      }
    }

    .ball-beat>div {
      background-color: red;
      width: 30px;
      height: 30px;
      border-radius: 100% !important;
      margin: 2px;
      -webkit-animation-fill-mode: both;
      animation-fill-mode: both;
      display: inline-block;
      -webkit-animation: ball-beat 0.7s 0s infinite linear;
      animation: ball-beat 0.7s 0s infinite linear;
    }

    .ball-beat>div:nth-child(2n-1) {
      -webkit-animation-delay: 0.35s !important;
      animation-delay: 0.35s !important;
    }
  }
  .content {
    height: auto;
    min-height: 150px;
    width: 750px;
    .list-ul {
      height: auto;
      margin: 0px 15px;
      padding: 0px;
      list-style: none;
      .ul-li {
        float: left;
        min-width: 180px;
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
        min-width: 180px;
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
      .list-li-action {
        max-width: 180px;
      }
      .action {
        background: #cccccc;
      }
    }
    .list :active{
      background: #cccccc;
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
