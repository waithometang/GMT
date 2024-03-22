import wx from 'weixin-js-sdk'
import { GetMediaToMainId } from '@/api/WaChatApi'
import { WaChatrequireConfig } from './WaChatrequireConfig'
import Vm from '@/main'

/**
 *  微信sdk上传图片
 * @param {sdk 实例化参数} WaChatConfigData
 */
let number = ''
let source = []
export function WaChatUploadPictures (
  WaChatConfigData,
  mainId,
  counts,
  onlyAlbum
) {
  // if (!WaChatConfigData) {
  //   return Promise.reject(10)
  // }
  if (window.location.host === 'localhost:8081')
    return Promise.resolve({
      mainId: 'ta20062905411258',
      urlData: [{ id: 1, src: '/static/newEditionIndex/qiyebanner.png' }]
    }) //测试数据
  return new Promise((resolve, reject) => {
    number = counts || 1
    if (onlyAlbum) {
      source = ['album']
    } else {
      source = ['album', 'camera']
    }
    console.log(source)
    // let u = navigator.userAgent;
    // if (u.indexOf("Android") > -1 || u.indexOf("Linux") > -1) {
    //   WaChatrequireConfig(WaChatConfigData);
    // }
    WaChatrequireConfig(WaChatConfigData)
    wx.ready(function () {
      // 判断调用接口是否支持
      wx.checkJsApi({
        jsApiList: [
          'chooseImage',
          'uploadImage',
          'getLocalImgData',
          'downloadImage'
        ],
        success: function (rps) {
          // 以键值对的形势返回， true可用接口， false不可用
          if (
            rps.checkResult.chooseImage == false ||
            rps.checkResult.uploadImage == false ||
            rps.checkResult.getLocalImgData == false
          ) {
            Vm.changtoast('当前微信版本不支持该功能请升级', 'error')
          }
        },
        fail: function (rps) {}
      })
      // 拍照或从手机相册获取照片
      wx.chooseImage({
        count: number, // 默认9
        sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
        sourceType: source, // 可以指定来源是相册还是相机，默认二者都有
        success: function (res) {
          let localIds = res.localIds // 返回选定照片的本地ID列表，localId可以作为img标签的src属性显示图片
          let mediaIds = []
          Promise.all(localIds.map(lid => asyncUploadWx(lid, mediaIds))).then(
            () => {
              _GetMediaList(mediaIds, mainId, resolve)
            },
            () => {
              Vm.changtoast('上传失败', 'error')
            }
          )
        },
        fail: function (rps) {}
      })
    })
  })
}

// 上传单张图片
function asyncUploadWx (localId, medialds) {
  return new Promise((resolve, reject) => {
    wx.uploadImage({
      localId: localId.toString(), // 需要上传的图片的本地ID，由chooseImage接口获得
      isShowProgressTips: 1, // 默认为1，显示进度提示
      success: function (res) {
        //res.serverId 返回图片的服务器端ID
        medialds.push(res.serverId)
        resolve()
      },
      fail: function (rps) {
        console.log(rps)
        Vm.$indicator.close()
        reject()
      }
    })
  })
}
// 上传图片到服务器
function _GetMediaList (MediaIds, mainId, resolve) {
  // Vm.$store.commit('SetpublicMessage', '上传失败')
  mainId = mainId || ''
  GetMediaToMainId({
    MediaIds,
    mainId
  }).then(rps => {
    Vm.$indicator.close() // 关闭loading提示
    if (rps.data.success) {
      resolve(rps.data.content)
    } else {
      Vm.$indicator.close() // 关闭loading提示
      Vm.changtoast(rps.data.message, 'error')
    }
  })
}
