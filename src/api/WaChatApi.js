/** 微信jssdk 相关接口*/
import Axios from '@/api/axios'
import fliexAxios from '@/api/fileAxios'
// 上传图片  多张
export function GetMediaList (Settingdata) {
  let url = 'api/Wechat/GetMediaList'
  let data= Settingdata

  return Axios({
    url,
    data
  })
}

// 上传图片 多张 返回对象
export function GetMediaToMainId (Settingdata) {
  let url = 'api/Wechat/GetMediaToMainId'
  let data= Settingdata

  return Axios({
    url,
    data,
    config: {
      timeout: 12000
    }
  })
}

// 删除图片
export function DelUpload (Settingdata) {
  let url = 'api/wechat/DelUpload'
  let data = Settingdata
  
  return Axios ({
    url,
    data
  })
}

// 群众上传图片 单张 识别身份证验证
export function GetMedia (Settingdata) {
  let url = 'api/Wechat/GetMedia'
  let data= Settingdata

  return Axios({
    url,
    data
  })
}

// orc身份证识别
export function IdCardOrcById (Settingdata) {
  let url = 'api/wechat/IdCardOrcById'
  let data = Settingdata

  return Axios ({
    url,
    data
  })
}

// orc营业执照识别 api/wechat/Bizlicense
export function Bizlicense (Settingdata) {
  let url = 'api/wechat/Bizlicense'
  let data = Settingdata
  return Axios ({
    url,
    data
  })
}


export function BusinessLicenseOrc (Settingdata) {
  let url = 'api/wechat/BusinessLicenseOrc'
  let data = Settingdata

  return Axios ({
    url,
    data
  })
}

// 微信上传图片 文件流
export function UploadToMainId (Settingdata) {
  let url = 'api/Wechat/UploadToMainId'
  let data = Settingdata
  
  return fliexAxios ({
    url,
    data
  })
}