<!-- 语音预约 -->
<template>
  <div class="voiceAppointment">
    <div class="title">
      <p>按住下面图标开始录音，松开按钮结束录音。</p>
      <p>点击发送后您的语音预约将发送给处理人员。</p>
      <p>办事轻轻松松，快来用高明通呼叫您的专属办理人员吧。</p>
    </div>
    <div class="voicea-fu">
      <div
        class="voicea-frame"
        :class="{action: showAction}"
        @touchstart="touchstart()"
        @touchend="touchend()"
      >
        <img class="voicea-img" src="/images/secondLevelPages/img_06.png">
      </div>
      <div class="istrue" v-if="StartRecordId" @click="playVoice">
        <div class="preview">
          <img class="preview-img"  src="/images/secondLevelPages/img_05.png">&nbsp;听一听我的预约语音
        </div>
      </div>
    </div>
    <div class="action" @click="submit" v-if="StartRecordId">
      <div class="but-action">发送预约信息</div>
    </div>
  </div>
</template>

<script>
import { WeChatStartRecord } from "@/js/WeChatStartRecord";
import { storage } from "@/js/until";

export default {
  props: ["WaChatConfigData"],
  data() {
    return {
      showAction: false,
      time: 60,
      stopRecord: false,
      stopVoice: false
    };
  },
  computed: {
    StartRecordId() {
      return this.$store.state.StartRecordId;
    },
    luying () {
      return storage.fetch('luying').data
    }
  },
  created () {
    if (!this.luying) {
      this._WeChatStartRecord(1)
    }
  },
  methods: {
    // 按中录音按钮触发
    touchstart() {
      this.showAction = true;
      this.time = 60;
      this.stopRecord = false
      this.settime(60);
      this._WeChatStartRecord(1);
      this.changtoast("开始录音");
    },
    // 松开录音按钮触发
    touchend() {
      this.showAction = false;
      if (this.stopRecord) {
        this.changtoast("录制时间超过60秒, 请重新录制", "warning");
      } else {
        this._WeChatStartRecord(2);
        this.changtoast("录音结束");
      }
    },
    // 按下录音按钮是触发倒计时60s 超时自动停止录音
    settime() {
      if (this.showAction) {
        console.log("开始计时");
        if (this.time == 0) {
          this.showAction = false;
          this.stopRecord = true;
        } else {
          this.time--;
          setTimeout(() => {
            this.settime();
          }, 1000);
        }
      }
    },
    // 播放录音
    playVoice() {
      if (this.stopVoice) {
        this._WeChatStartRecord(4);
        this.stopVoice = false;
      } else {
        this._WeChatStartRecord(3);
        this.stopVoice = true;
      }
    },
    // 提交录制的语音信息
    submit() {
      this._WeChatStartRecord(5);
    },
    // 调起微信录音相关接口
    _WeChatStartRecord(item) {
      WeChatStartRecord(this.WaChatConfigData, item, this);
    }
  }
};
</script>

<style lang='scss' type='text/css' scoped>
@import "@/style/components/secondLevelPages/homePage/voiceAppointment.scss";
</style>
