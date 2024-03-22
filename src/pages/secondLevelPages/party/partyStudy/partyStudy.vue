<!-- 党员学习 -->
<template>
  <div class="partyStudy">
    <div class="hread">
      <img src="/images/partyStudy/img_01.jpg">
    </div>
    <div class="select_Study">
      <div class="power" @click="goto(1)">学习强国</div>
      <div class="range" @click="goto(3)">远程教学</div>
    </div>
    <div class="hread-title">
      <div></div>党员学习
      <div @click="goto(item)" class="more">
        更多
        <img src="/images/gengduo.png">
      </div>
    </div>
    <div class="item">
      <div
        class="list"
        v-for="(item,index) in listData"
        :key="index"
        @click="checkParticulars(item)"
      >
        <div class="imgs">
          <img v-if="item.cover" :src="item.cover">
          <img v-else src="/images/FirstLevelPage/tacitlyapprove.jpg">
        </div>
        <div class="font">
          <span class="title_font">{{item.title}}</span>
          <div class="def">
            <span>
              <img src="/images/img_13.png">
              {{item.publishTime}}
            </span>
            <span>
              <img src="/images/img_11.png">
              {{item.readedCount}}阅读
            </span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>


<script>
(function () {
  var isPageHide = false
  window.addEventListener('pageshow', function () {
    if (isPageHide) {
      window.location.reload()
    }
  });
  window.addEventListener('pagehide', function () {
   isPageHide = true
  })
})(window)

import { GetPulishList } from "@/api/FirstLevelPage.js";
import { storage } from "@/js/until";
import { GetAddReaded } from '@/api/secondLevelPage'

export default {
  data() {
    return {
      // url: "api/Common/PulishList",
      listData: [],
      pageIndex: 1,
      pagesize: 10
    };
  },
  components: {},
  computed: {
    publishType() {
      return this.$route.params.publishType;
    },
    villageId() {
      return this.$route.params.vid;
    }
  },
  methods: {
    checkParticulars(item) {
      if (item.linkage) {
        GetAddReaded ({
          id: item.id,
          lb: 1
        }).then (rps => {

        })
        window.location.href = item.linkage
      }else {
        let url = "/djfbxq/" + item.id;
        this.$router.push(url);
      }
    },
    goto(item) {
      if (item == 1) {
        window.location = "https://www.xuexi.cn/";
      } else if (item == 3) {
        window.location = "http://www.gdycjy.gov.cn/index.html";
      } else{
        this.$router.push({
          path: "/djfb/1/"+storage.fetch("longData").data.id
        });
      }
    },
    init() {
      GetPulishList({
        pageIndex: this.pageIndex,
        vid: this.villageId,
        mkid: 3,
        fblxId:1,
        pagesize: this.pagesize
      }).then(rps => {
        console.log(rps);
        if (rps.data.success) {
          this.listData = rps.data.content;
        } else {
          this.changtoast(rps.data.message, "error");
        }
      });
    }
  },
  created() {
    this.init();
  }
};
</script>

<style lang="scss" scoped>
.partyStudy {
  margin: 0;
  padding: 0;
  .hread {
    width: 100%;
    height: 300px;
    img {
      width: 100%;
      height: 100%;
    }
  }
  .select_Study {
    height: 120px;
    padding: 24px;
    display: flex;
    background: #ffffff;
    div {
      width: 330px;
      display: flex;
      align-items: center;
      color: #ffffff; 
      font-size: 36px;
      font-weight: 500;
      justify-content: center;
      &:last-child {
        margin-left: auto;
      }
    }
    .power {
      background-image: url("/images/partyStudy/img_02.png");
      background-size: 100% 100%;
    }
    .range {
      background: url("/images/partyStudy/img_03.png");
      background-size: 100% 100%;
    }
  }
  .hread-title {
    font-size: 28px;
    display: flex;
    align-items: center;
    margin-top: 20px;
    background: #ffffff;
    padding: 15px 0px 15px 28px;
    border-bottom: 1px solid;
    border-color: #f4f4f4;
    div {
      height: 30px;
      width: 8px;
      background: #379dea;
      border-radius: 5px;
      margin-right: 22px;
    }
    .more {
      font-size: 3.733vw;
      color: #999999;
      width: auto;
      background: #ffffff;
      margin-left: auto;
      vertical-align: middle;
      display: flex;
      align-items: center;
      img {
        height: 30px;
      }
    }
  }
  .item {
    overflow-y: scroll;
    padding: 0px 24px 0px 24px;
    background: #ffffff;
    overflow-x: hidden;
    .list {
      padding: 30px 0px 30px 0px;
      display: flex;
      width: 702px;
      border-bottom: 1px dotted  #cccccc;
      .imgs {
        width: 174px;
        height: 134px;
        margin-right: 20px;
        img {
          width: 100%;
          height: 100%;
        }
      }
      .font {
        // line-height: 75px;
        // display: grid;
        height: 134px;
        .title_font {
          width: 480px;
          font-size: 28px;
          font-weight: 800;
          display: block;
          color: rgba(51, 51, 51, 1);
          overflow: hidden;
          white-space: nowrap;
          text-overflow: ellipsis;
        }
        .def {
          font-size: 24px;
          font-weight: 400;
          color: rgba(153, 153, 153, 1);
          display: flex;
          align-items: center;
          margin: 0;
          height: 26px;
          position: relative;
          top: 50%;
          width: 400px;
          justify-content: space-between;
          span {
            display: flex;
            align-items: center;
            img {
              width: 26px;
              height: 26px;
              margin-right: 10px;
            }
          }
        }
      }
    }
  }
}
</style>
