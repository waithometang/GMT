import wx from 'weixin-js-sdk'
import { WaChatrequireConfig } from './WaChatrequireConfig'
import Vm from '@/main'

export function scanQRCode (WaChatConfigData) {
	let dome = new Promise (resolve => {
		let u = navigator.userAgent
		if (u.indexOf('Android') > -1 || u.indexOf('Linux') > -1) {
			WaChatrequireConfig(WaChatConfigData)
		}
		wx.ready(function () {
      wx.checkJsApi({
        jsApiList: ["scanQRCode"],
        success: function (rps) {
          if (rps.checkResult.scanQRCode == false) {
            Vm.changtoast('当前微信版本不支持该功能请升级', "error")
          }
        },
        fail: function (rps) {
        }
			})
			wx.scanQRCode({
				needResult: 1, // 默认为0，扫描结果由微信处理，1则直接返回扫描结果，
				scanType: ["qrCode"], // 可以指定扫二维码还是一维码，默认二者都有
				success: function (res) {
					var result = res.resultStr; // 当needResult 为 1 时，扫码返回的结果\
					resolve(result)
				}
			})
		})
	})
	return dome
}