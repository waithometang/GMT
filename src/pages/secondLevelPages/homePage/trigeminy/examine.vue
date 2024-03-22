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
            <td v-for="(item, index) in titleData" :key="index">{{item.desc}}</td>
          </tr>
          <tr @click="goto(item.fid)" v-for="(item,index) in listData" :key="index">
            <td v-for="(iitem, ii) in titleData" :key="ii">{{item[iitem.field]}}</td>
          </tr>
        </table>
      </scroller>
    </div>
  </div>
</template>
<script>
import { Details } from "@/api/SanLian.js";
let refreshing = false;
export default {
  computed: {
    FBtype() {
      return this.$route.query.type;
    },
    fid() {
      return this.$route.query.fid;
    }
  },
  data() {
    return {
      titleData: [],
      listData: [],
      pageIndex: 1,
      pageSize: 10
    };
  },
  created() {
    this.GetDetails();
  },
  methods: {
    // 获取数据列表
    GetDetails(done) {
      if (!this.fid) {
        return;
      }
      if (refreshing){
        if (done) {
          done()
        }
        return
      };
      refreshing = true;
      Details({
        fid: this.fid,
        type: this.FBtype,
        pageIndex: this.pageIndex,
        pageSize: this.pageSize
      }).then(res => {
        let that=this
        if (res.data.success) {
          refreshing = false;
          that.titleData = JSON.parse(res.data.content.titleData);
          console.log(res.data.content.data)
          if (that.pageIndex === 1) that.listData = res.data.content.data;
          else that.listData.push(...res.data.content.data);
          that.pageIndex++;
          if (done) done();
          if (
            res.data.content.data.length < that.pageSize &&
            that.$refs["myScroller"]
          ) {
            that.$refs["myScroller"].finishInfinite(true);
          }
        } else {
          that.changtoast(res.data.message, "error");
          that.$refs["myScroller"].finishInfinite(true);
        }
      });
    },
    // 上拉加载
    infinite(done) {
      this.GetDetails(done);
    },
    // 下拉刷新
    refresh(done) {
      this.pageIndex = 1;
      this.GetDetails(done);
      this.$refs.myScroller.finishInfinite(false);
    },
    // 页面跳转
    goto(fid) {
      this.$router.push({
        path: "/particular",
        query: { fid, type: this.FBtype }
      });
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
    width: 750px;
    position: absolute;
    top: 100px;
    left: 0;
    right: 0;
    bottom: 0px;
    table {
      width: 750px;
      font-size: 28px;
      tr:nth-child(2n) {
        background: #f4f4f4;
      }
      tr:first-child {
        width: 100%;
        height: 90px;
        font-weight: bold;
        background: #f4f4f4;
        td:first-child {
          border-right: 1px solid;
          border-color: #ffffff;
        }
        td:last-child {
          border-left: 1px solid;
          border-color: #ffffff;
        }
      }
      tr {
        width: 750px;
        text-align: center;
        td {
          width: 33%;
        }
        td:first-child {
          border-right: 1px solid;
          border-bottom: 1px solid;
          border-color: #f4f4f4;
          width: 13%;
          padding: 10px 0px 10px 0px;
        }
        td:nth-child(2) {
          width: 43%;
        }
        td:last-child {
          border-bottom: 1px solid;
          border-color: #f4f4f4;
          padding: 10px 0px 10px 0px;
        }
      }
    }
  }
}
</style>
