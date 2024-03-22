import wx from 'weixin-js-sdk'
import { GetWechatConfig } from "@/api/GetWechatConfig";


export function configAndSetShare(title, desc, link, imgUrl, that){
    weChatConfigShare(that)
    setWxShare(title, desc, link, imgUrl)
}


export function weChatConfigShare(that) {
    var u = navigator.userAgent;
    var isAndroid = u.indexOf("Android") > -1 || u.indexOf("Linux") > -1; //g
    var isIOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/); //ios终端
    let url = "";
    if (isAndroid) {
        url = location.href;
        console.log(url, '安卓实例')
    }
    if (isIOS) {
        url = location.href.split("#")[0] //hash后面的部分如果带上ios中config会不对
    }
    console.log('configUrl:'+url);
    
    GetWechatConfig({
        url: url
    }).then(rps => {
        if (rps.data.success) {
            wxConfig(rps.data.content)
        } else {
            that.changtoast(rps.data.message, "error")
        }
    });
    
}

function wxConfig(WaChatConfigData){
    wx.config({
        debug: false, //是否开启调试模式, true为开启，false关闭
        appId: WaChatConfigData.appId, // 必填 公众号唯一标识
        timestamp: WaChatConfigData.timestamp, // 必填 生成签名的时间戳
        nonceStr: WaChatConfigData.nonceStr, // 必填 生成签名的随机串
        signature: WaChatConfigData.signature, // 必填 签名
        jsApiList: ["updateAppMessageShareData","updateTimelineShareData","onMenuShareTimeline","onMenuShareAppMessage"], // 必填 需要调用的接口
    })
}


export function setWxShare(title, desc, link, imgUrl) {
    
    wx.ready(function(){
        let url = window.location.href
        // let query = url.split("#")[1]
        // let int = url.indexOf('html')
        // let http= url.substr(0,int+4)
        // let linkurl = http+'?#'+query
        link = link || url
        desc = desc || '高明通'
        desc = desc.replace(/(<.+?>)|(&nbsp;)/g,'')  //统一处理富文本
        console.log('link:'+link);
        // wx.updateAppMessageShareData({
        //     title, // 分享标题
        //     desc, // 分享描述
        //     link, // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
        //     imgUrl, // 分享图标
        //     success: function () {
        //         // 设置成功
        //         // console.log('设置分享朋友成功');
        //     },
        //     fail:function(){
        //         alert('分享功能失效')
        //     }
        // })
        wx.onMenuShareTimeline({
            title, // 分享标题
            link, // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
            imgUrl, // 分享图标
            success: function () {
                // 用户点击了分享后执行的回调函数
                // that.changtoast('成功分享到朋友圈', "success")
            }
        })
        // wx.updateTimelineShareData({
        //     title, // 分享标题
        //     link, // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
        //     imgUrl, // 分享图标
        //     success: function () {
        //         // 设置成功
        //         // console.log('设置分享朋友圈成功');

        //     }
        // })
        wx.onMenuShareAppMessage({
            title, // 分享标题
            desc, // 分享描述
            link, // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
            imgUrl, // 分享图标
            //type: '', // 分享类型,music、video或link，不填默认为link
            //dataUrl: '', // 如果type是music或video，则要提供数据链接，默认为空
            success: function () {
                // 用户点击了分享后执行的回调函数
                // that.changtoast('成功分享给朋友', "success")
            }
        });
    })
}