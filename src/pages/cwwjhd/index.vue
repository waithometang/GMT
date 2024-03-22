<template>
  <div>
    <div v-show="!isShowDetail">
      <van-tabs v-model="active">
        <van-tab title="填写信息">
          <sysptdcCom @submitSc="onsubmitSc" />
        </van-tab>
        <van-tab title="我的填报">
          <mylistCom @click="clickFn" ref="mylist" />
        </van-tab>
      </van-tabs>
    </div>
    <div v-if="isShowDetail" style="padding-top:50px;">
      <nav-bar
        title="详情"
        left-text="返回"
        left-arrow
        :fixed="true"
        @click-left="isShowDetail = false"
      />
      <sysptdcCom :detailData="detailData" @submitSc="onsubmitSc" :readonly="true" />
    </div>
  </div>
</template>


<script>
import wjutils from "@/js/WjSmrzUtil";
import sysptdcCom from "./cwwjhd";
import mylistCom from "./mylist";
import { NavBar } from "vant";
export default {
  components: {
    sysptdcCom,
    mylistCom,
    NavBar
  },
  computed: {
    certToken() {
      return this.$route.query.certToken;
    }
  },
  data() {
    return {
      isShowDetail: false,
      active: 0,
      detailData: {}
    };
  },
  created() {
    if (this.certToken && sessionStorage.getItem("dxsbdRZtemp")) {
      this.gotoGetSmxx();
    }
  },
  methods: {
    onsubmitSc(obj) {
      this.active=1
    },
    clickFn(data) {
      this.detailData = data;
      this.$nextTick(()=>{
        this.isShowDetail = true;
      })
    },
  }
};
</script>