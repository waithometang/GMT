<!-- 系统反馈 -->
<template>
  <div class="systemFeedback">
    <GmtSelectTab :TabData="TabData" :TabStateData="TabStateData" @changeTabState="SetTabState"></GmtSelectTab>
    <div class="systemFeedback-content" v-if="TabStateData == 1">
      <BetterScroll>
        <template slot="BetterScroll">
          <myFeedback :WaChatConfigData="WaChatConfigData"  @changeTabState="SetState"></myFeedback>
        </template>
      </BetterScroll>
    </div>
    <feedbackList v-else></feedbackList>
  </div>
</template>

<script>
import myFeedback from '@/components/secondLevelPages/PersonalCenter/myFeedback'
import feedbackList from '@/components/secondLevelPages/PersonalCenter/feedbackList'
import GmtSelectTab from '@/components/GmtSelectTab'
import { GetWechatConfig } from "@/api/GetWechatConfig";
import BetterScroll from '@/components/BetterScroll'

export default {
  components: {
    GmtSelectTab,
    myFeedback,
    feedbackList,
    BetterScroll
  },
  data () {
    return {
      TabData: [{name: '我的反馈', type: 0}, {name: '我要反馈', type: 1}],
      WaChatConfigData: ''
    }
  },
  computed: {
    TabStateData () {
      return this.$store.state.FbInfoTag
    }
  },
  methods: {
    SetTabState (item) {
      this.$store.commit('Set_FbInfoTag', item.type)
    },
    SetState (item) {
      this.$store.commit('Set_FbInfoTag', item)
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
        url = location.href.split("#")[0];
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
  },
  created () {
    this._GetWechatConfig()
  },
  beforeRouteEnter (to, from, next) {
    next(vm=>{
      if(from.name==='index'){
        vm.$store.commit('Set_FbInfoTag', 1)
      }
    })
  }
}
</script>

<style lang='scss' scoped>
.systemFeedback {
  .systemFeedback-content{
    position: absolute;
    top: 90px;
    bottom: 0;
    left: 0;
    right: 0;
  }
}
</style>
