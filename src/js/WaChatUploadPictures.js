import wx from 'weixin-js-sdk'
import { GetMediaToMainId } from "@/api/WaChatApi"
import { WaChatrequireConfig } from './WaChatrequireConfig'
import Vm from '@/main'

/**
 *  微信sdk上传图片
 * @param {sdk 实例化参数} WaChatConfigData 
 */
let number = ''
export function WaChatUploadPictures(WaChatConfigData, counts) {
  number = counts || 1
  let u = navigator.userAgent
  // if (u.indexOf('Android') > -1 || u.indexOf('Linux') > -1) {
  //   WaChatrequireConfig(WaChatConfigData)
  // }
  WaChatrequireConfig(WaChatConfigData)
  wx.ready(function () {
    // 判断调用接口是否支持
    wx.checkJsApi({
      jsApiList: ["chooseImage", "uploadImage", 'getLocalImgData', 'downloadImage'],
      success: function (rps) {
        // console.log(rps)
        // 以键值对的形势返回， true可用接口， false不可用
        if (rps.checkResult.chooseImage == false || rps.checkResult.uploadImage == false || rps.checkResult.getLocalImgData == false) {
          Vm.changtoast('当前微信版本不支持该功能请升级', "error")
        }
      },
      fail: function (rps) {
      }
    })
    // 拍照或从手机相册获取照片
    wx.chooseImage({
      count: number, // 默认9
      sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
      sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
      success: function (res) {
        var localIds = res.localIds // 返回选定照片的本地ID列表，localId可以作为img标签的src属性显示图片
        // setLocalImgData(localIds)
        syncUpload(localIds)
      },
      fail: function (rps) {
      }
    })
  })
}

// 路径转为base64格式的数据
function setLocalImgData (localIds) {
  Vm.$indicator.open("正在上传图片，请稍等...")
  var localId = localIds.pop()
  wx.getLocalImgData({
    localId: localId.toString(),
    success: function (res) {
      const localData = res.localData
      let imageBase64 = ''
      if (localData.indexOf('data:image') == 0) {
        //苹果的直接赋值，默认生成'data:image/jpegbase64,'的头部拼接
        imageBase64 = localData
      } else {
        //此处是安卓中的唯一得坑！在拼接前需要对localData进行换行符的全局替换
        //此时一个正常的base64图片路径就完美生成赋值到img的src中了
        imageBase64 = 'data:image/jpegbase64,' + localData.replace(/\n/g, '')
      }
      let Medialds = Vm.$store.state.MedialdsList
      Medialds.push(base64ToBlob(imageBase64))
      Vm.$store.commit('SetMedialdsList', Medialds)
      if (localIds.length > 0) {
        setLocalImgData(localIds)
      } else {
        _GetMediaList(Medialds)
      }
    },
    fail: function (rps) {
      // console.log(rps)
      Vm.$indicator.close()
    }
  })
}

// 上传多张图片
function syncUpload(localIds) {
  // Vm.$indicator.open("正在上传图片，请稍等...")
  var localId = localIds.pop()
  wx.uploadImage({
    localId: localId.toString(), // 需要上传的图片的本地ID，由chooseImage接口获得
    isShowProgressTips: 1, // 默认为1，显示进度提示
    success: function (res) {
      //res.serverId 返回图片的服务器端ID
      let Medialds = Vm.$store.state.MedialdsList || []
      Medialds.push(res.serverId)
      Vm.$store.commit('SetMedialdsList', Medialds)
      if (localIds.length > 0) {
        syncUpload(localIds)
      } else {
        _GetMediaList(Medialds)
      }
    },
    fail: function (rps) {
      console.log(rps)
      Vm.$indicator.close()
    }
  })
}

// 上传图片到服务器
function _GetMediaList(item) {
  // let mainId = Vm.$store.state.MainIdData
  // fileAxios (item, mainId).then (rps=>{
  //   Vm.$indicator.close()
  //   Vm.$store.commit('SetMedialdsList', []) // 清空选中图片id
  //   let urlData = ''
  //   let UploadPicturesSrc = Vm.$store.state.UploadPicturesSrc
  //   if (rps.data.success) {
  //     Vm.changtoast('图片上传成功')
  //     if (UploadPicturesSrc.length > 0) {
  //       urlData = UploadPicturesSrc.concat(rps.data.content.urlData)
  //     } else {
  //       urlData = rps.data.content.urlData
  //     }
  //     Vm.$store.commit('SetUploadPicturesSrc', urlData) // 记录返回的图片路径
  //     Vm.$store.commit('SetMainIdData', rps.data.content.mainId) // 记录返回的图片id
  //   } else {
  //     Vm.changtoast(rps.data.message, "error")
  //   }
  // },rej=>{
  //   Vm.$indicator.close()
  //   Vm.changtoast('上传失败','error')
  // })
  Vm.$store.commit('SetpublicMessage', '上传失败')
  GetMediaToMainId ({
    MediaIds: item,
    mainId: Vm.$store.state.MainIdData
  }).then(rps => {
    Vm.$indicator.close() // 关闭loading提示
    Vm.$store.commit('SetMedialdsList', []) // 清空本次选中记录
    let urlData = ''
    let UploadPicturesSrc = Vm.$store.state.UploadPicturesSrc
    if (rps.data.success) {
      if (UploadPicturesSrc.length > 0) {
        urlData = UploadPicturesSrc.concat(rps.data.content.urlData)
      } else {
        urlData = rps.data.content.urlData
      }
      Vm.$store.commit('SetUploadPicturesSrc', urlData) // 记录返回的图片路径
      Vm.$store.commit('SetMainIdData', rps.data.content.mainId) // 记录返回的图片id
    } else {
      Vm.$indicator.close() // 关闭loading提示
      Vm.changtoast(rps.data.message, "error")
    }
  })
}

// base64 转二进制
function base64ToBlob(dataurl) {
  let arr = dataurl.split(',')
  let mime = arr[0].match(/:(.*?)/)[1]
  let bstr = atob(arr[1])
  let n = bstr.length
  let u8arr = new Uint8Array(n)
  while (n--) {
    u8arr[n] = bstr.charCodeAt(n)
  }
  let src = new Blob([u8arr], { type: mime })
  return src
}