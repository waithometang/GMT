<template>
  <div class="Announcement">
    <div class="serch">
      <div>
        <input placeholder="请输入搜索内容" type="text">
        <img src="/images/secondLevelPages/search.png">
      </div>
    </div>
    <div class="main">
      <scroller :on-infinite="infinite" :on-refresh="refresh" ref="myScroller">
        <table>
          <tr>
            <td>标题</td>
            <td>机构</td>
          </tr>
          <tr @click="goto(item.fid)" v-for="(item,index) in listData" :key="index">
            <td>{{item.title}}</td>
            <td>{{item.org}}</td>
          </tr>
        </table>
      </scroller>
    </div>
  </div>
</template>
<script>
import { Summary } from "@/api/SanLian.js";
import { storage } from "@/js/until";
import {mapActions} from "vuex"

let refreshing = false;

export default {
  computed: {
    FBtype() {
      return this.$route.query.type;
    }
  },
  data() {
    return {
      listData: [],
      pageIndex: 1,
      pageSize: 10,
      orgCode: ''
    };
  },
  created () {
    this.getGrxx (Grxx => {
      this.orgCode = Grxx.orgCode
    })
  },
  methods: {
    ...mapActions(['getGrxx']),
    // 获取列表数据
    GetSummary(done) {
      if (refreshing) return;
      refreshing = true;
      Summary({
        type: this.FBtype,
        // orgCode: this.orgCode,
        villageId:storage.fetch("longData").data.id,
        pageIndex: this.pageIndex,
        pagesize: this.pagesize
      }).then(rps => {
        if (rps.data.success) {
          refreshing = false;
          if (this.pageIndex === 1) this.listData = rps.data.content;
          else this.listData.push(...rps.data.content);
          this.pageIndex++;
          if (done) done();
          console.log(rps.data.content.length)
          if (
            rps.data.content.length < this.pageSize &&
            this.$refs["myScroller"]
          ) {
            this.$refs.myScroller.finishInfinite(true);
          }
        } else {
          if(rps.data.message) this.changtoast(rps.data.message, "error");
          this.$refs.myScroller.finishInfinite(true);
        }
      });
    },
    // 上拉加载
    infinite(done) {
      this.GetSummary(done);
    },
    // 下拉刷新
    refresh(done) {
      this.pageIndex = 1;
      this.GetSummary(done);
      this.$refs.myScroller.finishInfinite(false);
    },
    // 页面跳转
    goto(fid) {
      let type = this.FBtype;
      if (type == "6" || type == "8" || type == "13") {
        this.$router.push({
          path: "/particular",
          query: { fid, type }
        });
      } else if (type == "9" || type == "10") {
        this.$router.push({
          path: "/ZbggContent",
          query: { fid }
        });
      } else {
        this.$router.push({
          path: "/examine",
          query: { fid, type }
        });
      }
    }
  }
};
</script>
<style lang="scss" scoped>
.Announcement {
  background: #ffffff;
  margin: 0;
  padding: 0;
  .serch {
    height: 60px;
    border-bottom: 1px solid;
    border-color: #ffffff;
    padding: 20px 20px 20px 20px;
    background: #ffffff;
    div {
      height: 60px;
      display: flex;
      background: #f4f4f4;
      border-radius: 15px 15px 15px 15px;
      input {
        border-radius: 15px 15px 15px 15px;
        width: 643px;
        border: none;
        margin-right: 7px;
        background: #f4f4f4;
        padding-left: 20px;
      }
      img {
        height: 35px;
        margin-top: 10px;
        margin-right: 22px;
      }
    }
  }
  .main {
    position: absolute;
    top: 80px;
    bottom: 0;
    left: 0;
    right: 0;
    width: 750px;
    table {
      width: 750px;
      font-size: 28px;
      tr:nth-child(2n) {
        background: #f4f4f4;
      }
      tr:first-child {
        width: 750px;
        height: 100px;
        font-weight: bold;
        background: #f4f4f4;
        td:first-child {
          width: 497px;
          border-right: 1px solid;
          border-color: #ffffff;
        }
        td:last-child {
          width: 250px;
        }
      }
      tr {
        width: 750px;
        text-align: center;
        td:first-child {
          width: 497px;
          border-right: 1px solid;
          border-bottom: 1px solid;
          border-color: #f4f4f4;
          padding: 10px 0px 10px 0px;
        }
        td:last-child {
          width: 250px;
          border-bottom: 1px solid;
          border-color: #f4f4f4;
          padding: 10px 0px 10px 0px;
        }
      }
    }
  }
}
</style>
