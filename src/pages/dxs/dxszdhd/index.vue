<template>
  <div>
    <div v-show="!isShowDetail">
      <van-tabs v-model="active" swipeable animated>
        <van-tab title="我要报名">
          <dxsxxtxCom />
        </van-tab>
        <van-tab title="我的报名">
          <dxsxxtxCom :isDetail="true" />
        </van-tab>
      </van-tabs>
    </div>
  </div>
</template>


<script>
import wjutils from "@/js/WjSmrzUtil";
import dxsxxtxCom from "./dxszdhd";
import { NavBar } from "vant";
export default {
  components: {
    dxsxxtxCom,
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
    // if (this.certToken && sessionStorage.getItem("dxsbdRZtemp")) {
    //   this.gotoGetSmxx();
    // }
  },
  methods: {
    onrzEv(item) {
      this.gotoRz(item.id);
    },
    // gotoGetSmxx() {
    //   this.$indicator.open("加载中...");
    //   wjutils
    //     .getWjSmxx(
    //       this.certToken,
    //       this,
    //       window.location.origin + window.location.pathname,
    //       1
    //     )
    //     .then(
    //       res => {
    //         this.$post("api/zx/dxsbmrz", {
    //           id: sessionStorage.getItem("dxsbdRZtemp"),
    //           xm: res.xm,
    //           sfzh: res.sfzh
    //         }).then(res => {
    //           this.$indicator.close();
    //           sessionStorage.removeItem("dxsbdRZtemp");
    //           if (res.data.success) {
    //             this.$toast.success("认证成功");
    //             this.active = 1;
    //           } else {
    //             this.$alert(res.data.message)
    //           }
    //         });
    //       },
    //       rej => {
    //         this.changtoast(rej, "error");
    //       }
    //     );
    // },
    // gotoRz(id) {
    //   sessionStorage.setItem("dxsbdRZtemp", id.toString());
    //   this.gotoGetSmxx();
    // },
    clickFn(data) {
      this.detailData = data;
      this.isShowDetail = true;
    },
  }
};
</script>