/**微信sdk相关接口 授权相关接口 */
import Axios from '@/api/axios.js'

import OriginAxios from 'axios'


export  function GetWechatConfig (SettingData) {
  let url = 'api/Wechat/GetWechatConfig'
  let data = SettingData

  return Axios ({
    url,
    data
  })
}

// 通过授权获取token    直接使用原生的axios请求
export function LoginOfficialAccount (SettingData) {
  let url = '/api/MemberLogin/LoginOfficialAccount'
  let data = SettingData
  
  return OriginAxios ({
    url,
    data,
    method:'post'
  })
}