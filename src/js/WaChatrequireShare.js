import { WaChatrequireConfig } from './WaChatrequireConfig'
import wx from 'weixin-js-sdk'


/**
 *  微信分享重构
 * @param {sdk 实例化参数} WaChatConfigData 
 */
export function WaChatrequireShare(title, desc, link_url, imgUrl, cb) {
  console.log('看看传入的', imgUrl)
  let u = navigator.userAgent
  if (u.indexOf('Android') > -1 || u.indexOf('Linux') > -1) {
    WaChatrequireConfig()
  }
  wx.ready(function () {
    let url = window.location.href
    let link = ''
    let iconUrl = ''
    if (url.indexOf('gov') == -1) {
      link = 'http://gmt.znzwoa.com/' + link_url // 公司服务器
      iconUrl = 'http://gmt.znzwoa.com' + imgUrl // 公司服务器
    } else {
      link = 'http://gmt.gaoming.gov.cn/' + link_url // 高明服务器
      iconUrl = 'http://gmt.gaoming.gov.cn' + imgUrl // 高明服务器
    }
    desc = desc || '高明通'
    desc = desc.replace(/(<.+?>)|(&nbsp;)/g, '')  //统一处理富文本
    imgUrl = imgUrl ? iconUrl : 'http://gmt.gaoming.gov.cn/images/logo.png'
    wx.onMenuShareTimeline({
      title, // 分享标题
      link, // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
      imgUrl, // 分享图标
      success: function () {
        // 用户点击了分享后执行的回调函数
        cb && cb('朋友圈')
      },
      fail: function (rps) {
        alert(rps.errMsg)
      }
    })

    wx.onMenuShareAppMessage({
      title, // 分享标题
      desc, // 分享描述
      link, // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
      imgUrl, // 分享图标
      //type: '', // 分享类型,music、video或link，不填默认为link
      //dataUrl: '', // 如果type是music或video，则要提供数据链接，默认为空
      success: function () {
        // 用户点击了分享后执行的回调函数
        cb && cb('微信好友')
      },
      fail: function (rps) {
        alert(rps.errMsg)
      }
    });
  })
}