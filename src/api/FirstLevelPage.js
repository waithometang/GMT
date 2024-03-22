// 一级页面api接口封装
import Axios from './axios'

// 获取镇街 村居信息
export function EntrancePageApi(SettingData) {
  let url = '/api/VillageManager/GetVillageOrganization'
  let data = SettingData

  return Axios({
    url,
    data
  })
}
// 通过授权获取token
export function LoginOfficialAccount(SettingData) {
  let url = '/api/MemberLogin/LoginOfficialAccount'
  let data = SettingData

  return Axios({
    url,
    data
  })
}

// 首页Banner图
export function Banner(vid) {
  let url = `/api/VillageOpen/Banner/${vid}`

  return Axios({
    url,
    config:{method:'get'}
  })
}

// 获取头像
export function GetAvatarUrl(SettingData) {
  let url = '/api/MemberLogin/GetAvatarUrl'
  let data = SettingData
  return Axios({
    url,
    data
  })
}

// 通知公告
export function Tzgg(mk, vid) {
  let url = "/api/VillageOpen/Tzgg"
  url = url + '/' + mk
  if(vid) url=url+'/'+vid
  return Axios({
    url,
    config:{method:'get'}
  })
}

// 获取村居首页最新动态数据
export function RecenNews(vid,page) {
  let url = `/api/VillageOpen/GetLastNews/${vid}/${page}`
  return Axios({
    url,
    config:{method:'get'}
  })
}

//首页最新实事列表
export function LastPracticalJobList(SettingData) {
  let url = 'api/PartyBuilding/LastPracticalJobList'
  let data = SettingData

  return Axios({
    url,
    data
  })
}

// 获取天气预报信息
export function GetWeatherReport (SettingData) {
  let url = ''
  let data = SettingData

  return Axios ({
    url,
    data
  })
} 


export function AppSetting(mklx) {
  return Axios({
    url:'api/Common/AppSetting/'+mklx,
    config:{method:'get'}
  })
}


//所有模块-未阅读数
export function WydsApi(SettingData) {
  let url = 'api/Common/Wyds'
  let data = SettingData

  return Axios({
    url,
    data
  })
}

// 获取发布类
export function GetPulishList (SettingData) {
  let url = 'api/Common/PulishList'
  let data = SettingData

  return Axios({
    url,
    data
  })
}

export function Getysgn (SettingData) {
  let url = 'api/Common/ysgn'
  let data = SettingData

  return Axios ({
    url,
    data
  })
}
//获取发布标签
export function GetFbTag (tag) {
  let url = 'api/Common/GetFbTag/'+tag

  return Axios({
    url,
    config:{method:'get'}
  })
}

// 获取天气
export function GetWeather (SettingData, config) {
  let url = 'api/VillageOpen/Weather'
  let data = SettingData

  return Axios ({
    url,
    data,
    config
  })
}