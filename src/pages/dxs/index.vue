<template>
  <div>
    <div v-show="!isShowDetail">
      <van-tabs v-model="active">
        <van-tab title="填写信息">
          <dxsxxtxCom @submitSc="onsubmitSc" />
        </van-tab>
        <van-tab title="我的信息">
          <mylistCom @click="clickFn" ref="mylist" />
        </van-tab>
      </van-tabs>
    </div>
    <div v-if="isShowDetail" style="padding-top:50px;">
      <nav-bar
        :title="getRylx(detailData.rylx_id)"
        left-text="返回"
        left-arrow
        :fixed="true"
        @click-left="isShowDetail = false"
      />
      <dxsxxtxCom :detailData="detailData" @submitSc="onsubmitSc" :readonly="true" @rzEv="onrzEv" />
    </div>
  </div>
</template>


<script>
import wjutils from "@/js/WjSmrzUtil";
import dxsxxtxCom from "./dxsxxtx";
import mylistCom from "./mylist";
import { NavBar } from "vant";
export default {
  components: {
    dxsxxtxCom,
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
    onsubmitSc(obj) {
      if (!obj.isEdit) {
        this.gotoRz(obj.id);
      }else{
        this.active=1
        this.isShowDetail=false
      }

    },
    clickFn(data) {
      this.detailData = data;
      this.isShowDetail = true;
    },
    getRylx(lx) {
      if (lx===1) {
        return '高三毕业生（含中职应届毕业生）'
      }else if (lx===2) {
        return '在校大学生'
      }else{
        return '毕业五年内大学生'
      }
    }
  }
};
</script>