<template>
  <div class="main">
    <div class="content">
      <div class="hread" v-if="headImgs.length >= 1">
        <swiper class="swiImgs" :options="swiperOption" ref="mySwiper">
          <swiper-slide :class="{'swiper-no-swiping stop-swiping': headImgs.length <= 1}" v-for="(item, index) in headImgs" :key="index">
            <img :src="item.Url" alt="" @click="look(item)">
          </swiper-slide>
          <div class="swiper-pagination" slot="pagination"></div>
        </swiper>
      </div>
      <notification :notification="notification"></notification>
      <div class="main_function" v-if="AppTabData.length > 0">
        <div class="tab_list" v-for="(item, index) in AppTabData" :key="index">
          <ul class="list">
            <li class="tab" v-for="(item_1, index_1) in item" :key="index_1" @click="switchoverPages(item_1)">
              <img :src="item_1.images" alt="">
              <div class="number" v-if="item_1.redNumber > 0">{{item_1.redNumber >= 99 ? '99+' : item_1.redNumber}}</div>
            </li>
            <div style="clear:both;"></div>
          </ul>
        </div>
      </div>
      <div class="main_server">
        <div class="main_title">
          <img src="/static/FNT_IMAGES/main/server.png" />
          <span @click="gotoactivity"> 更多 <img src="/static/FNT_IMAGES/gengduo.png" /> </span>
        </div>
        <GmtDefaultList :listData='listData' :mkid='7' />
      </div>
      <div class="main_server">
        <div class="main_title">
          <img src="/static/FNT_IMAGES/main/work.png" />
        </div>
        <brandWork />
      </div>
    </div>
    <messageBox v-if="showMessage" @setclos="setMessage"/>
  </div>
</template>

<script>
import notification from "./component/notification";
import brandWork from "./component/brand_work";
import messageBox from './component/messageBox';
import GmtDefaultList from '@/components/GmtDefaultList'
import { GetPulishList } from '@/api/FirstLevelPage';
import { Syzczx, RmhdList } from "@/api/FNTApi";
import { AppSetting } from "@/api/FirstLevelPage.js";
import { NotReadNumber, IndexZxdt, qyyhdt, SPulishList } from '@/api/secondLevelPage';
import { session_Storage } from '@/js/until';
import { UpdateReadRecord } from '@/api/secondLevelPage'
import { mapActions } from 'vuex'
export default {
  components: {
    notification,
    brandWork,
    GmtDefaultList,
    messageBox
  },
  data() {
    return {
      AppTabData: [],
      WaChatConfigData: "",
      notification: "",
      listData: [],
      headImgs: [],
      ButtomTageState: 1,
      stateType: 7,
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
      showMessage: false
    };
  },
  beforeRouteEnter(to, from, next) {
    next(vm => {
      vm.setMessage()
    })
  },
  created() {
    this._GetSyzczx();
    this.getListData();
    this.getAppSetting();
  },
  methods: {
    ...mapActions(['getGrxx']),
    _GetSyzczx() {
      Syzczx().then(rps => {
        if (rps.data.success) {
          this.notification = rps.data.content;
        } else {
          this.changtoast(rps.data.message, 'error')
        }
      });
    },
    changeTagState (item) {
      this.ButtomTageState = item
      if (item === 2) {
        this.$router.push('/index')
        this.$store.commit('Set_ButtomTageState', 4)
      }
    },
    setMessage () {
      this.getGrxx(true).then (val => {
        if (!val.sfgz) {
          this.showMessage = true
        } else {
          this.showMessage = false
        }
      })
    },
    // 处理未阅读数据
    disposeReadNumber (item,menus) {
      let data = item
      let menusData = menus
      for (let index = 0; index < menus.length; index++) {
        const element = menus[index]
        for (let indexs = 0; indexs < element.length; indexs++) {
          const dome = element[indexs]
          let ReadNumber = data.filter(val => {
            return val.id === dome.Id
          })
          if (ReadNumber.length > 0) {
            (menusData[index])[indexs].redNumber = ReadNumber[0].number
          }
        }
      }
      this.AppTabData = menusData
    },
    // 获取为阅读数
    getNotReadNumber (item, menus, state) {
      NotReadNumber({
        MenuIds: item,
        vid: this.vid
      }).then(rps => {
        if (rps.data.success) {
          // 记录请求数据
          let NotReadNumberData = session_Storage.fetch('NotReadNumber').data
          let data = NotReadNumberData.data || []
          let key = NotReadNumberData.key || []
          data.push(...rps.data.content)
          key.push(state)
          session_Storage.save('NotReadNumber', {data, key})
          // 处理未阅读数
          this.disposeReadNumber(rps.data.content, menus)
        } else {
          this.changtoast(rps.data.message, 'error')
        }
      })
    },
    getAppSetting () {
      AppSetting(7).then (rps => {
        if (rps.data.success) {
          this.headImgs = rps.data.content.Banners
          if (rps.data.content.fblIds.length >= 1) {
          let NotReadNumberData = session_Storage.fetch('NotReadNumber').data
          let data = NotReadNumberData.data || []
          let key = NotReadNumberData.key || []
          let state = key.filter(val => {
            return val === this.stateType
          })
          if (state.length <= 0) {
            this.getNotReadNumber(rps.data.content.fblIds, rps.data.content.menus, this.stateType)
          } else {
            this.disposeReadNumber (data, rps.data.content.menus)
          }
        } else {
         this.AppTabData = rps.data.content.menus
        }
        } else {

        }
      })
    },
    getListData () {
      GetPulishList({
        fblxId: 33,
        mkId: 7,
        pageIndex: 1,
        pageSize: 5,
      }).then (rps => {
        if (rps.data.success) {
          this.listData = rps.data.content
        } else {
          this.changtoast(rps.data.message, 'error')
        }
      })
    },
    goReply (item) {
      this.$router.push(`/fntZhdxq/${item.id}`)
    },
    gotoactivity() {
      this.$router.push("/fntzxdt");
    },
    switchoverPages (item) {
      if (item.redNumber) {
        item.redNumber = 0
        let NotReadNumberData = session_Storage.fetch('NotReadNumber').data
        let data = NotReadNumberData.data || []
        let key = NotReadNumberData.key || []
        data.filter(val => {
          if (val.id === item.Id) {
            val.number = 0
          }
        })
        session_Storage.save('NotReadNumber', {data, key})
        UpdateReadRecord ({
          menuId: item.Id,
          vid: this.ButtomTageState === 2 ? this.$store.state.userinfo.id : 0
        })
      }
      this.$router.push(`${item.linkage}`)
    },
    look (item) {
      let url = item.Link
      if (url) {
        if (url.indexOf('https') === -1 && url.indexOf('http') === -1) {
          this.$router.push(url)
        } else {
          window.location.href = url
        }
      }
    }
  }
};
</script>

<style lang='scss' scoped>
@import "./style/index.scss";
.main /deep/ .swiper-pagination {
  text-align: right;
  left: 20px !important;
  right: 20px !important;
  width: auto !important;
}
.main /deep/ .swiper-pagination-bullet {
  height: 20px !important;
  width: 20px !important;
}
.main /deep/ .swiper-pagination-bullet{
  background:#ffffff !important;
}
</style>