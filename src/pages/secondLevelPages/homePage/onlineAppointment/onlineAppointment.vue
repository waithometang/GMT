<!-- 网上约办 -->
<template>
  <div class="onlineAppointment">
    <top-tag :listData="listData" @SetStateType="GetStateType"></top-tag>
    <head-reminder v-if="false" :number="number" :typeName="typeName"></head-reminder>
    <appointment-list v-if="ShowType == 0"></appointment-list>
    <voice-appointment v-if="ShowType == 1" :WaChatConfigData="WaChatConfigData"></voice-appointment>
    <character-subscribe v-if="ShowType == 2"></character-subscribe>
  </div>
</template>

<script>
import TopTag from "@/components/TopTag";
import AppointmentList from "@/components/secondLevelPages/homePage/AppointmentList";
import voiceAppointment from "@/components/secondLevelPages/homePage/voiceAppointment";
import CharacterSubscribe from "@/components/secondLevelPages/homePage/CharacterSubscribe";
import headReminder from "@/components/headReminder";
import { GetWechatConfig } from "@/api/GetWechatConfig";
import {mapActions} from "vuex"

export default {
  components: {
    TopTag,
    AppointmentList,
    headReminder,
    voiceAppointment,
    CharacterSubscribe
  },
  data() {
    return {
      listData: ["我的预约", "语音预约", "文字预约"],
      number: 10,
      typeName: "我的预约",
      ShowType: 0,
      WaChatConfigData: ""
    };
  },
  created() {
    this.getGrxx (Grxx => {
      if(!Grxx || !Grxx.hasSM){
        this.changtoast('请先实名认证','info')
        this.$router.replace('Certification')
        return
      }
    })
    this._GetWechatConfig();
  },
  methods: {
    ...mapActions(['getGrxx']),
    // 顶部导航栏切换状态
    GetStateType(item) {
      this.ShowType = item;
    },
    // 获取微信sdk 初始化参数
    _GetWechatConfig() {
      var u = navigator.userAgent;
      var isAndroid = u.indexOf("Android") > -1 || u.indexOf("Linux") > -1; //g
      var isIOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/); //ios终端
      let url = "";
      if (isAndroid) {
        url = location.href;
      }
      if (isIOS) {
        url = location.href.split("#")[0]; //hash后面的部分如果带上ios中config会不对
      }
      GetWechatConfig({
        url: url
      }).then(rps => {
        if (rps.data.success) {
          this.WaChatConfigData = rps.data.content;
        } else {
          this.changtoast(rps.data.message, "error");
        }
      });
    }
  }
};
</script>

<style>
</style>
