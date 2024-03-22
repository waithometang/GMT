<!-- 村民信箱数据列表 -->
<template>
  <div class="MailboxList">
    <div class="head">
      <div class="icon"></div>共{{count}}条公开信件 (上拉加载更多)
    </div>
    <div class="contentList">
      <scroller :on-infinite="infinite" :on-refresh="refresh" ref="my_scroller">
        <div class="list" v-for="(item, index) in initData" :key="index">
          <div class="content" @click="lockOverParticulars(item)">
            <div class="left">
              <div class="images">
                <img v-if="item.cover" :src="item.cover">
                <img v-else src="/images/FirstLevelPage/tacitlyapprove.jpg">
              </div>
            </div>
            <div class="right">
              <div class="title">{{item.title}}</div>
              <div class="IsAll">{{item.name == '' ? '匿名' : item.name}}</div>
              <div class="time">{{item.date}}</div>
            </div>
          </div>
        </div>
      </scroller>
    </div>
  </div>
</template>

<script>
import VueScroller from "vue-scroller";
import { OpenEmail, MyEmail, OpenEmailCount, MyEmailCount } from "@/api/secondLevelPages/homePage";
import { storage } from "@/js/until";

export default {
  props: ["ShowType"],
  components: {
    VueScroller
  },
  computed: {
    longData() {
      return storage.fetch("longData").data;
    }
  },
  data() {
    return {
      pageIndex: 1, // 页数
      pageSize: 10, // 没页数量
      initData: [], // 保存请求获取的数据
      count:0
    };
  },
  watch: {
    ShowType() {
      this.pageIndex = 1;
      this.$refs.my_scroller.finishInfinite(false);
      this.initData = [];
      if (this.ShowType == 0) {
        // this._GetOpenEmail();
        this._GetOpenEmailCount();
      } else {
        // this._GetMyEmail();
        this._GetMyEmailCount();
      }
    }
  },
  created() {
    this._GetOpenEmailCount();
  },
  methods: {
    // 获取公开信件列表
    _GetOpenEmail(done) {
      OpenEmail({
        pageIndex: this.pageIndex,
        pageSize: this.pageSize,
        villageId: this.longData.id
      }).then(rps => {
        if (done) {
          this.setInitData(rps, done);
        } else {
          this.setInitData(rps);
        }
      });
    },
    _GetOpenEmailCount(){
      OpenEmailCount({villageId: this.longData.id}).then(res=>{if(res.data.success) this.count=res.data.content})
    },
    _GetMyEmailCount(){
      MyEmailCount({villageId: this.longData.id}).then(res=>{if(res.data.success) this.count=res.data.content})
    },
    // 获取我的信件列表
    _GetMyEmail(done) {
      MyEmail({
        pageIndex: this.pageIndex,
        pageSize: this.pageSize,
        villageId: this.longData.id
      }).then(rps => {
        if (done) {
          this.setInitData(rps, done);
        } else {
          this.setInitData(rps);
        }
      });
    },
    // 处理接口返回的数据
    setInitData(rps, done) {
      if (rps.data.success) {
        this.pageIndex++;
        this.initData = this.initData.concat(rps.data.content);
        if (rps.data.content.length < 10) {
          if (done) {
            done(true);
          }
        } else {
          if (done) {
            done(true);
          }
        }
      } else {
        this.changtoast(rps.data.message, "error");
      }
    },
    // 上拉加载
    infinite(done) {
      if (this.ShowType == 0) {
        this._GetOpenEmail(done);
      }
      if (this.ShowType == 1) {
        this._GetMyEmail(done);
      }
    },
    // 下拉刷新
    refresh(done) {
      if (this.ShowType == 0) {
        this._GetOpenEmail(done);
        this._GetOpenEmailCount();
      }
      if (this.ShowType == 1) {
        this._GetMyEmail(done);
        this._GetMyEmailCount();
      }
    },
    lockOverParticulars (item) {
      this.$router.push({
        path: '/villageMailboxParticulars',
        query: {
          id: item.id
        }
      })
    }
  }
};
</script>

<style lang='scss' type="text/css" scoped>
@import "@/style/components/secondLevelPages/homePage/MailboxList.scss";
.MailboxList /deep/ ._v-container {
  position: relative;
  width: 100%;
}
</style>
