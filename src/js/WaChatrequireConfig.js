import wx from 'weixin-js-sdk'
import { GetWechatConfig } from "@/api/GetWechatConfig";
import store from '@/store'
import { reportQuestion } from '@/js/until'


export function WaChatrequireConfig (WaChatConfigData) {
  let url = window.location.origin + window.location.pathname
  let code = '808'
  if (url.indexOf(code) != -1) {
    return
  }
  let u = navigator.userAgent;
  if (!!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/)) {
    IosWaChatConfig()
  } else {
    AndroidWaChatConfig(WaChatConfigData)
  }
}

let configRecord = {}
let signFail = true //签名失败

let retryMaxTimes = 1 //最大重试次数
let retryTimes = 0

//  ios 微信签名验证
function IosWaChatConfig () {
  //ios需要使用首次进入的url进行签名
  //签名失败后使用当前Url
  let url
  // if (signFail || !store.state.firstEntryUrl) {
  //   url =  encodeURI(window.location.origin + window.location.pathname)
  // }else{
  //   url =  encodeURI(store.state.firstEntryUrl)
  // }
  if (signFail) {
    url = encodeURI(store.state.firstEntryUrl)
  } else {
    url = encodeURI(window.location.origin + window.location.pathname)
    // url = encodeURI(window.location.href)
  }
  if (configRecord['config:' + url]) {
    return
  }
  GetWechatConfig({
    url
  }).then(rps => {
    configRecord['config:' + url] = 1
    signFail = true
    wx.config({
      debug: false, //是否开启调试模式, true为开启，false关闭
      appId: rps.data.content.appId, // 必填 公众号唯一标识
      timestamp: rps.data.content.timestamp, // 必填 生成签名的时间戳
      nonceStr: rps.data.content.nonceStr, // 必填 生成签名的随机串
      signature: rps.data.content.signature, // 必填 签名
      jsApiList: ["updateAppMessageShareData", "updateTimelineShareData", "onMenuShareTimeline", "onMenuShareAppMessage", "chooseImage", "uploadImage", "getLocation", "previewImage", 'getLocalImgData', 'downloadImage', "scanQRCode"], // 必填 需要调用的接口
    })
    wx.error(err => {
      configRecord['config:' + url] = 0
      signFail = false
      reportQuestion('验证ios签名失败，地址：' + url)
      if (retryTimes < retryMaxTimes) {
        retryTimes++
        IosWaChatConfig()
      }
      // console.log(err);
      // Vm.changtoast(err)
      // setTimeout(() => {
      //   IosWaChatConfig()
      // }, 10000);
    })
  })
}

// 安卓 微信签名验证
function AndroidWaChatConfig (WaChatConfigData) {
  if (WaChatConfigData) { // 有微信实例化参数
    wx.config({
      debug: false, //是否开启调试模式, true为开启，false关闭
      appId: WaChatConfigData.appId, // 必填 公众号唯一标识
      timestamp: WaChatConfigData.timestamp, // 必填 生成签名的时间戳
      nonceStr: WaChatConfigData.nonceStr, // 必填 生成签名的随机串
      signature: WaChatConfigData.signature, // 必填 签名
      jsApiList: ["updateAppMessageShareData", "updateTimelineShareData", "onMenuShareTimeline", "onMenuShareAppMessage", "chooseImage", "uploadImage", "getLocation", "previewImage", 'getLocalImgData', 'downloadImage', "scanQRCode"], // 必填 需要调用的接口
    })
    wx.error(err => {
      AndroidWaChatConfig()
    })
  } else { // 没有微信实例化参数
    let url = encodeURI(window.location.origin + window.location.pathname)
    if (sessionStorage.getItem('config:' + url)) {
      return
    }
    GetWechatConfig({
      url
    }).then(rps => {
      configRecord['config:' + url] = 1
      wx.config({
        debug: false, //是否开启调试模式, true为开启，false关闭
        appId: rps.data.content.appId, // 必填 公众号唯一标识
        timestamp: rps.data.content.timestamp, // 必填 生成签名的时间戳
        nonceStr: rps.data.content.nonceStr, // 必填 生成签名的随机串
        signature: rps.data.content.signature, // 必填 签名
        jsApiList: ["updateAppMessageShareData", "updateTimelineShareData", "onMenuShareTimeline", "onMenuShareAppMessage", "chooseImage", "uploadImage", "getLocation", "previewImage", 'getLocalImgData', "scanQRCode"], // 必填 需要调用的接口
      })
      wx.error(err => {
        configRecord['config:' + url] = 0
        reportQuestion('验证安卓签名失败，地址：' + url)
        // setTimeout(() => {
        //   AndroidWaChatConfig()
        // }, 10000);
      })
    })
  }
}