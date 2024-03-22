<template>
  <div class="dbzs">
    <template v-if="isRepresent">
      <div class="select">
        <div
          @click="changeState(item.state)"
          :class="{ cor1: tagState === item.state }"
          v-for="(item, index) in tagData"
          :key="index"
        >
          {{ item.name }}
        </div>
      </div>
    </template>
    <div class="need-list" ref="needList">
      <template v-if="tagState === 1">
        <van-dropdown-menu class="van-dropdown-menu">
          <!-- <van-dropdown-item
            v-model="sszj"
            :options="zjData"
            @change="handleChangeZJ"
          /> -->
          <van-dropdown-item
            v-model="hfzt"
            :options="yjData"
            @change="handleChangeYJ"
          />
        </van-dropdown-menu>
      </template>
      <div class="bd-line"></div>
      <div
        v-if="tagState === 1 || tagState === 2"
        :class="
          tagState === 1 ? 'randomly-snap-picture' : 'randomly-snap-picture2'
        "
      >
        <randomly-snap-picture-list
          :stateType="tagState"
          :selectParams="selectParams"
          ref="mylist"
        ></randomly-snap-picture-list>
      </div>
      <yjfb v-else-if="tagState === 3" @finishedYjfb="() => changeState(2)" />
    </div>
  </div>
</template>

<script>
import yjfb from "./yjfb"
import wjutils from "@/js/WjSmrzUtil"
import randomlySnapPictureList from "./components/reportInformation"
import { GetWechatConfig } from "@/api/GetWechatConfig"
import { storage } from "@/js/until"
import { Getzjxx } from "@/api/secondLevelPage"
export default {
  data() {
    return {
      isRepresent: true, // 是否代表
      tagState: 1,
      tagData: [
        { name: "全部意见", state: 1 },
        { name: "我的意见", state: 2 },
        { name: "意见发布", state: 3 }
      ],
      WaChatConfigData: "",
      sszj: "", // 所选区域值
      zjData: [{ text: "全部", value: "" }], // 区域数据
      hfzt: "全部", // 回复的值
      yjData: [
        { text: "全部", value: "全部" },
        { text: "已回复", value: "已回复" },
        { text: "承诺回复", value: "承诺回复" },
        { text: "未作回应", value: "未作回应" }
      ], // 回复的数据
      selectParams: {
        sszj: "",
        hfzt: "全部"
      }
    }
  },
  components: {
    yjfb,
    randomlySnapPictureList
  },
  watch: {
    isRepresent() {
      if (!this.isRepresent) {
        this.$refs.needList.style.top = 0
      }
    }
  },
  mounted() {
    wjutils.gotoSMRZIfNot(this, this.init)
  },
  methods: {
    changeState(item) {
      this.tagState = item
    },
    handleChangeZJ(value) {
      this.selectParams.sszj = value
    },
    handleChangeYJ(value) {
      this.selectParams.hfzt = value
    },
    _Getzjxx() {
      Getzjxx().then(rps => {
        if (rps.data.success) {
          const res = rps.data.content
          let newArr = []
          res.map(element => {
            newArr.push({
              text: element.name,
              value: element.id
            })
          })
          this.zjData = [...this.zjData, ...newArr]
        } else {
          this.changtoast(rps.data.message, "error")
        }
      })
    },
    init() {
      this._Getzjxx()
      this.$indicator.open("加载中...")
      this.$post("/api/mlgm/sfdb").then(res => {
        this.$indicator.close()
        if (res.data.success) {
          this.isRepresent = !res.data.content.sfdb
        } else {
          this.changtoast(res.data.message, "error")
        }
      })
    }
  }
}
</script>

<style scoped lang="scss">
@import "@/style/FirstLevelPage/select.scss";
@import "./style/index.scss";
.need-list {
  position: absolute;
  top: 100px;
  bottom: 0;
  left: 0;
  right: 0;
}
.randomly-snap-picture {
  overflow-y: scroll;
  height: 83vh;
}
.randomly-snap-picture2 {
  overflow-y: scroll;
  height: 90vh;
}
// .van-dropdown-menu {
//   box-sizing: border-box;
//   border-bottom: 14px solid#F5F5F5;
// }
.dbzs .randomly-snap-picture /deep/ .MissiveList {
  top: 220px !important;
}
/deep/ .noList {
  padding-top: 0!important;
}
</style>