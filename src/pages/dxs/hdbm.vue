<template>
  <div>
    <div v-show="!isShowDetail">
      <van-tabs v-model="active">
        <van-tab title="我要报名">
          <hdbmForm @submitSc="onsubmitSc" />
        </van-tab>
        <van-tab title="我的报名">
          <mylistCom @click="clickFn" ref="mylist" />
        </van-tab>
      </van-tabs>
    </div>
    <div v-if="isShowDetail" style="padding-top:50px;">
      <nav-bar
        :title="detailData.zt"
        left-text="返回"
        v-if="!id"
        left-arrow
        :fixed="true"
        @click-left="isShowDetail = false"
      />
      <hdbmForm :detailData="detailData" :readonly="true" @rzEv="onrzEv" />
    </div>
  </div>
</template>


<script>
import wjutils from "@/js/WjSmrzUtil";
import hdbmForm from "./hdbmForm";
import mylistCom from "./mybmlist";
import { NavBar } from "vant";
export default {
  components: {
    hdbmForm,
    mylistCom,
    NavBar
  },
  computed: {
    certToken() {
      return this.$route.query.certToken;
    },
    id() {
      return this.$route.query.id;
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
    }else if(this.id){
      this.detailData={id:this.id}
      this.isShowDetail=true
    }
  },
  methods: {
    onrzEv(item) {
      this.gotoRz(item.id);
    },
    gotoGetSmxx() {
      this.$indicator.open("加载中...");
      wjutils
        .getWjSmxx(
          this.certToken,
          this,
          window.location.origin + window.location.pathname,
          1
        )
        .then(
          res => {
            this.$post("api/zx/dxsbmrz", {
              id: sessionStorage.getItem("dxsbdRZtemp"),
              xm: res.xm,
              sfzh: res.sfzh
            }).then(res => {
              this.$indicator.close();
              sessionStorage.removeItem("dxsbdRZtemp");
              if (res.data.success) {
                this.$toast.success("认证成功");
                this.active = 1;
              } else {
                this.$alert(res.data.message)
              }
            });
          },
          rej => {
            this.changtoast(rej, "error");
          }
        );
    },
    gotoRz(id) {
      sessionStorage.setItem("dxsbdRZtemp", id.toString());
      this.gotoGetSmxx();
    },
    onsubmitSc(id) {
        this.active=1
        this.$refs.mylist && this.$refs.mylist.refresh()
    },
    clickFn(data) {
      this.detailData = data;
      this.isShowDetail = true;
    },
  }
};
</script>