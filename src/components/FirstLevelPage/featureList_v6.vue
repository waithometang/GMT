<template>
  <div class="featureList" :class="{'featureList_action': ShowBottom}">
    <!-- 功能导航 -->
    <primaryNavigation
      v-if="this.ButtomTageState == 1 || this.ButtomTageState == 2 || this.ButtomTageState == 3"
      :MenuData="MenuData"
      :GMT_TageState="GMT_TageState"
    ></primaryNavigation>
    <!-- 通知公告 -->
    <keep-alive>
      <notification v-show="showNotification" ref="notification" />
    </keep-alive>
    <!-- 上云上平台调查 -->
    <div class="survey" v-if="homeType == 5" @click="() => this.$router.push('/sysptdc')">
      <div class="left">
        <img src="../../images/topicpage.png" alt />
      </div>
      <div class="right">
        <div class="up">上云上平台调查</div>
        <div class="down">高明区工业企业上云上平台信息化调查</div>
      </div>
    </div>
    <!-- 展示内容 -->
    <div class="RecentNewsList" v-if="getState() === 1">
      <div class="pushMessage">
        <div class="pushMessage_tab">
          <div class="pushMessage_tab_icon">最新动态</div>
          <div class="pushMessage_tab_name" @click="gotos">
            更多
            <img src="/static/double@2x.png" alt />
          </div>
        </div>
        <div class="public_content">
          <GmtDefaultList :listData="listData" />
        </div>
      </div>
    </div>
    <div class="RecentNewsList" v-if="getState() === 2">
      <div class="pushMessage">
        <div class="pushMessage_tab">
          <div class="pushMessage_tab_icon">{{ButtomTageState === 1?'最新动态':'企业动态'}}</div>
          <div class="pushMessage_tab_name" @click="goto">
            更多
            <img src="/static/double@2x.png" alt />
          </div>
        </div>
        <div class="public_content">
          <GmtDefaultList :listData="listData" v-if="ButtomTageState === 1" />
          <GmtDefaultList :mkid="5" v-else :listData="listData" />
        </div>
      </div>
    </div>
    <div
      class="RecentNewsList"
      v-if="getState() === 3"
      v-for="(item, index) in showFbIds"
      :key="index"
    >
      <recent-news :GMT_TageState="GMT_TageState" :showFbIds="item" v-if="item"></recent-news>
    </div>
  </div>
</template>

<script>
import Notification from "./notification";
import primaryNavigation from "./primaryNavigation_v5.1";
import VillageAffairs from "./VillageAffairs";
import RecentNews from "./recentNews";
import GmtDefaultList from "@/components/GmtDefaultList";
import { AppSetting } from "@/api/FirstLevelPage.js";
import {
  NotReadNumber,
  IndexZxdt,
  qyyhdt,
  SPulishList,
} from "@/api/secondLevelPage";
import { session_Storage } from "@/js/until";

export default {
  props: {
    ShowBottom: {
      type: Boolean,
      default: false,
    },
  },
  components: {
    Notification,
    primaryNavigation,
    VillageAffairs,
    RecentNews,
    GmtDefaultList,
  },
  data() {
    return {
      pageIndex: 1,
      pageSize: 5,
      listData: [],
      GMT_TageState: 1,
      MenuData: [],
      showFbIds: [],
      WydsMenuIds: [], //要显示未阅读数的菜单
    };
  },
  computed: {
    ButtomTageState() {
      return this.$store.state.ButtomTageState;
    },
    homeType() {
      return this.$route.params.type;
    },
    vid() {
      return this.$store.state.userinfo.id;
    },
    showNotification() {
      if (this.homeType) {
        if (this.homeType == 3) {
          return true;
        } else {
          return false;
        }
      } else {
        if (this.ButtomTageState == 1 || this.ButtomTageState == 2) {
          return true;
        } else {
          return false;
        }
      }
    },
  },
  watch: {
    ButtomTageState() {
      this.getAppSetting();
      if (this.ButtomTageState === 1 || this.ButtomTageState === 3) {
        this.listData = [];
        this.getZxdtList();
      }
    },
  },
  created() {
    this.getZxdtList();
    this.getAppSetting();
  },
  methods: {
    // 查看更多
    goto() {
      if (this.ButtomTageState === 1) {
        this.$router.push("/zxdt");
      } else {
        this.$router.push("/qjfb_Tag/5/16/yh");
      }
    },
    // 查看更多 主题教育
    gotos() {
      this.$router.push("/ztjy");
    },
    // 获取最新动态列表
    getZxdtList() {
      let mkid = "";
      if (this.homeType === "6") {
        SPulishList({
          pageIndex: this.pageIndex,
          pageSize: this.pageSize,
          mkId: 6,
        }).then((rps) => {
          if (rps.data.success) {
            this.listData = rps.data.content;
          } else {
            this.changtoast(rps.data.message, "error");
          }
        });
      } else {
        if (this.ButtomTageState === 1) {
          IndexZxdt({
            mkId: 1,
            fblxId: 15,
            pageIndex: this.pageIndex,
            pageSize: this.pageSize,
          }).then((rps) => {
            if (rps.data.success) {
              this.listData = rps.data.content;
            } else {
              this.changtoast(rps.data.message, "error");
            }
          });
        } else if (this.ButtomTageState === 3) {
          SPulishList({
            pageIndex: this.pageIndex,
            pageSize: this.pageSize,
            mkId: 5,
          }).then((rps) => {
            if (rps.data.success) {
              this.listData = rps.data.content;
            } else {
              this.changtoast(rps.data.message, "error");
            }
          });
        }
      }
    },
    // 获取为阅读数
    getNotReadNumber(item, menus, state) {
      NotReadNumber({
        MenuIds: item,
        vid: this.vid,
      }).then((rps) => {
        if (rps.data.success) {
          // 记录请求数据
          let NotReadNumberData = session_Storage.fetch("NotReadNumber").data;
          let data = NotReadNumberData.data || [];
          let key = NotReadNumberData.key || [];
          data.push(...rps.data.content);
          key.push(state);
          session_Storage.save("NotReadNumber", { data, key });
          // 处理未阅读数
          this.disposeReadNumber(rps.data.content, menus);
        } else {
          this.changtoast(rps.data.message, "error");
        }
      });
    },
    // 处理未阅读数据
    disposeReadNumber(item, menus) {
      let data = item;
      let menusData = menus;
      for (let index = 0; index < menus.length; index++) {
        const element = menus[index];
        for (let indexs = 0; indexs < element.length; indexs++) {
          const dome = element[indexs];
          let ReadNumber = data.filter((val) => {
            return val.id === dome.Id;
          });
          if (ReadNumber.length > 0) {
            menusData[index][indexs].redNumber = ReadNumber[0].number;
          }
        }
      }
      this.MenuData = menusData;
    },
    // 获取图标名字
    getAppSetting() {
      this.MenuData = [];
      this.showFbIds = [];
      let stateType = "";
      if (this.ButtomTageState == 3) {
        stateType = 5;
        this.GMT_TageState = 5;
      } else {
        stateType = this.ButtomTageState;
        this.GMT_TageState = this.ButtomTageState;
      }
      if (this.homeType) {
        stateType = this.homeType;
      }
      AppSetting(stateType).then((res) => {
        if (res.data.success) {
          this.showFbIds = res.data.content.showFbIds;
          this.WydsMenuIds = res.data.content.fblIds;
          if (res.data.content.Banners) {
            this.$store.commit("SetindexBenner", res.data.content.Banners);
          }
          if (res.data.content.fblIds.length >= 1) {
            let NotReadNumberData = session_Storage.fetch("NotReadNumber").data;
            let data = NotReadNumberData.data || [];
            let key = NotReadNumberData.key || [];
            let state = key.filter((val) => {
              return val === stateType;
            });
            if (state.length <= 0) {
              this.getNotReadNumber(
                res.data.content.fblIds,
                res.data.content.menus,
                stateType
              );
            } else {
              this.disposeReadNumber(data, res.data.content.menus);
            }
          } else {
            this.MenuData = res.data.content.menus;
          }
        } else {
          if (res.data.message) {
            this.changtoast(res.data.message, "error");
          }
        }
      });
    },
    // 判断页面状态
    getState() {
      if (this.homeType) {
        if (this.homeType === "6") {
          return 1;
        } else {
          return 3;
        }
      } else {
        if (this.ButtomTageState === 1 || this.ButtomTageState === 3) {
          return 2;
        } else {
          return 3;
        }
      }
    },
  },
};
</script>

<style lang="scss" scoped type="text/css">
@import "@/style/FirstLevelPage/featureList.scss";
</style>

