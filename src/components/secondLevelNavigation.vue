<!-- 含二级目录导航 -->
<template>
  <div class="secondLevelNavigation">
    <div class="listData" v-if="ButtomTageState == 6">
      <div class="contents" v-for="(item_1, index_1) in initData" :key="index_1">
        <div class="featureSecond" v-for="(item_2, index_2) in item_1" :key="index_2">
          <ul class="feature">
            <li
              class="iocnTitle"
              v-for="(item, index) in item_2"
              :key="index"
              @click="changePage(item, index_2)"
            >
              <div class="icon">
                <img :src="item.images">
              </div>
              <div class="title">{{item.title}}</div>
            </li>
            <div style="clear:both"></div>
          </ul>
          <ul class="second" v-if=" index_2 == showtag">
            <li>
              <div class="buttoms" @click="chekPage(1)">渔业管理发展</div>
            </li>
            <li>
              <div class="buttoms" @click="chekPage(2)">渔业转型升级</div>
            </li>
            <li>
              <div class="buttoms" @click="chekPage(3)">渔业油价补助</div>
            </li>
            <li>
              <div class="buttoms" @click="chekPage(4)">渔业互助保险</div>
            </li>
            <div style="clear:both"></div>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { getCatalogue } from "@/js/selectCatalogue";
export default {
  // props: ["ButtomTageState"],
  data() {
    return {
      showtag: 999,
      initData: [],
      ButtomTageState: 6
    };
  },
  methods: {
    // 获取图标名字
    changedInitData() {
      if (this.ButtomTageState == 6) {
        this.initData = getCatalogue(
          ["6001", "6002", "6003", "6004", "6005"],
          true
        );
        console.log(this.initData);
      }
    },
    // 涉农补助跳转
    changePage(item, index) {
      let id = 0;
      if (item.type == 6) {
        if (this.showtag != 999) {
          this.showtag = 999;
        } else {
          this.showtag = index;
        }
      } else {
        if (item.id == "6002") {
          id = 5;
        } else if (item.id == "6003") {
          id = 6;
        } else if (item.id == "6004") {
          id = 7;
        }
        this.$router.push({
          path: item.url,
          query: {
            lb: id
          }
        });
      }
    },
    chekPage(item) {
      this.$router.push({
        path: "/agricultureSubsidyApplication",
        query: {
          lb: item
        }
      });
    }
  },
  created() {
    this.changedInitData();
  }
};
</script>

<style lang='scss' scoped type="text/css">
.secondLevelNavigation {
  .listData {
    background: #ffffff;
    height: auto;
    overflow: hidden;
    padding-bottom: 20px;
    .contents {
      .featureSecond {
        width: 750px;
        .feature {
          height: auto;
          margin: 0px 15px;
          padding: 0px;
          list-style: none;
          .iocnTitle {
            float: left;
            width: 180px;
            .icon {
              height: 50px;
              width: 60px;
              margin-top: 36px;
              margin-bottom: 15px;
              margin-left: 64px;
              img {
                width: 60px;
                height: 50px;
              }
            }
            .title {
              text-align: center;
              height: 36px;
              overflow: hidden;
              font-size: 28px;
              font-family: PingFang-SC-Medium;
              font-weight: 500;
              color: rgba(0, 0, 0, 1);
              line-height: 36px;
              margin-bottom: 10px;
            }
          }
        }
        .second {
          list-style: none;
          height: auto;
          margin: 0px;
          padding: 0px;
          background: #cccccc;
          li {
            float: left;
            height: 100px;
            width: 50%;
            .buttoms {
              height: 74px;
              width: 300px;
              margin: 13px 25px;
              background: #409de2;
              border-radius: 10px;
              color: #ffffff;
              font-size: 30px;
              text-align: center;
              line-height: 74px;
            }
          }
        }
      }
    }
  }
}
</style>
