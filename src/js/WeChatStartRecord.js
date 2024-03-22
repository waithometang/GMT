/** 微信jssdk 录音封装*/
import wx from 'weixin-js-sdk'
import Vm from '@/main'
import { storage } from "@/js/until";

/**
 * 
 *
 * @export WeChatStartRecord jssdk录音 播放
 * startRecord： 开始录音， stopRecord：停止录音，onVoiceRecordEnd：监听录音自动停止
 * playVoice： 播放录音， pauseVoice：暂停播放，stopVoice： 停止播放，uploadVoice： 上传录音
 */
export function WeChatStartRecord(WaChatConfigData, index, thats) {
  wx.config({
    debug: false, //是否开启调试模式, true为开启，false关闭
    appId: WaChatConfigData.appId, // 必填 公众号唯一标识
    timestamp: WaChatConfigData.timestamp, // 必填 生成签名的时间戳
    nonceStr: WaChatConfigData.nonceStr, // 必填 生成签名的随机串
    signature: WaChatConfigData.signature, // 必填 签名
    jsApiList: ["startRecord", "stopRecord", "playVoice", "pauseVoice", "stopVoice", "uploadVoice"], // 必填 需要调用的接口
  })
  wx.ready(function () {
    wx.checkJsApi({
      jsApiList: ["startRecord", "stopRecord", "playVoice", "pauseVoice", "stopVoice", "uploadVoice"],
      success: function (rps) {
        if (rps.checkResult.startRecord == false) {
          alert('开始录音接口不支持')
        }
        if (rps.checkResult.stopRecord == false) {
          alert('停止录音接口不支持')
        }
        if (rps.checkResult.playVoice == false) {
          alert('播放录音不支持')
        }
        if (rps.checkResult.pauseVoice == false) {
          alert('暂停播放不支持')
        }
        if (rps.checkResult.stopVoice == false) {
          alert('停止播放录音不支持')
        }
        if (rps.checkResult.uploadVoice == false) {
          alert('上传录音不支持')
        }
      },
      fail: function (rps) {
        alert('验证接口失败')
        alert(rps.errMsg)
        console.log(rps.errMsg, '验证接口失败')
      }
    })
    if (index == 1) {
      // 手指按下开始录音
      startRecord()
    }
    if (index == 2) {
      // 手指抬起结束录音
      stopRecord()
    }
    // 开始播放录音
    if (index == 3) {
      playVoice()
    }
    // 停止播放录音
    if (index == 4) {
      stopVoice()
    }
    if (index == 5) {
      // 上传录音
      uploadVoice()
    }
  })
}

/**
 *  开始开启微信录音
 */
function startRecord() {
  wx.startRecord({
    success: function (rps) {
      if (!storage.fetch('luying').data) {
        storage.save('luying', true)
        setTimeout(() => {
          stopRecord(1)
        }, 500);
      }
    }
  })
}

/**
 *停止录音 返回录音结果
 *
 */
function stopRecord(item) {
  wx.stopRecord({
    success: function (res) {
      var localId = res.localId
      if (!item) {
        Vm.$store.commit('SetStartRecordId', localId)
      }
    }
  })
}
/**
 *上传录音
 */
function uploadVoice() {
  wx.uploadVoice({
    localId: Vm.$store.state.StartRecordId, // 需要上传的音频的本地ID，由stopRecord接口获得
    isShowProgressTips: 1, // 默认为1，显示进度提示
    success: function (res) {
      var serverId = res.serverId; // 返回音频的服务器端ID
    }
  })
}

/**
 *开始播放录音
 *
 */
function playVoice() {
  wx.playVoice({
    localId: Vm.$store.state.StartRecordId // 需要播放的音频的本地ID，由stopRecord接口获得
  })
}

/**
 *停止播放录音
 *
 */
function stopVoice() {
  wx.stopVoice({
    localId: Vm.$store.state.StartRecordId // 需要播放的音频的本地id 有stopRecord接口获得
  })
}