/** 乡村振兴 api文件 */
import Axios from '@/api/axios'

// 发布随手拍
export function PublishShot(SettingData) {
  let url = 'api/PeopleOpen/PublishShot'
  let data = SettingData
  return Axios({
    url,
    data
  })
}


// 获取随手拍列表
export function GetShotList(SettingData) {
  let url = 'api/PeopleOpen/GetShotList'
  let data = SettingData

  return Axios({
    url,
    data
  })
}

// 查看进度
export function GetCaseState (SettingData) {
  let url = 'api/PeopleOpen/GetCaseState'
  let data = SettingData

  return Axios({
    url,
    data
  })
}

// 经纬度转换
export function TxGeocode (SettingData) {
  let url = 'api/VillageOpen/TxGeocode'
  let data = SettingData

  return Axios({
    url,
    data
  })
}


// 获取随手拍详细
export function GetShotDetail(SettingData) {
  let url = 'api/PeopleOpen/GetShotDetail'
  let data = SettingData

  return Axios({
    url,
    data
  })
}

// 涉农补贴 详情
export function Snbt (SettingData) {
  let url = 'api/xczx/Snbt'
  let data = SettingData

  return Axios({
    url,
    data
  })
}

// 涉农补贴 申请
export function Snbtsq (SettingData) {
  let url = 'api/xczx/SnbtSq'
  let data = SettingData

  return Axios({
    url,
    data
  })
}

// 技术指导发布列表
export function GetJszdList (SettingData) {
  let url = 'api/zx/Jszd'
  let data = SettingData

  return Axios({
    url,
    data
  })
}
// 农技专家发布列表详情 
export function GetJszdxx (SettingData) {
  let url = 'api/zx/Jszdxx'
  let data = SettingData

  return Axios ({
    url,
    data
  })
}

// 获取指导类别
export function GetJszdlb (SettingData) {
  let url = 'api/zx/Jszdlb'
  let data = SettingData

  return Axios ({
    url,
    data
  })
}

// 乡村振兴发布列表详情
export function Getfbxx (SettingData) {
  let url = 'api/zx/fbxx'
  let data = SettingData

  return Axios ({
    url,
    data
  })
}

// 乡村振兴发布列表
export function GetFbList (SettingData) {
  let url = 'api/zx/fb'
  let data = SettingData

  return Axios ({
    url,
    data
  })
}

// 我的点赞和收藏
export function Wdjl (SettingData) {
  let url = 'api/common/Wdjl'
  let data = SettingData

  return Axios ({
    url,
    data
  })
}