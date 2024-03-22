// 二级页面 首页全部Api 接口
import Axios from '@/api/axios'

// 获取 村居动态 三务公开 务工信息 宣传学习 村大事记 list
export function GetNewsList (SettingData) {
  let url = 'api/VillageOpen/GetNewsList'
  let data = SettingData

  return Axios({
    url,
    data
  })
}
// 获取 村居动态 三务公开 务工信息 宣传学习 list 内容
export function DetailPages (SettingData) {
  let url =  'api/VillageOpen/GetNewSingle'
  let data = SettingData

  return Axios({
    url,
    data
  })
}

// 获取发布总条数
export function GetNewsListCount (SettingData) {
  let url = 'api/VillageOpen/GetNewsListCount'
  let data = SettingData

  return Axios ({
    url,
    data
  })
}

// 获取 公开信件
export function OpenEmail (SettingData) {
  let url = 'api/PeopleOpen/OpenEmail'
  let data = SettingData

  return Axios({
    url,
    data
  })
}
// 获取 我的信件
export function MyEmail (SettingData) {
  let url = 'api/PeopleOpen/MyEmail'
  let data = SettingData

  return Axios({
    url,
    data
  })
}
// 获取 公开信件总数
export function OpenEmailCount (SettingData) {
  let url = 'api/PeopleOpen/OpenEmailCount'
  let data = SettingData

  return Axios({
    url,
    data
  })
}
// 获取 我的信件总数
export function MyEmailCount (SettingData) {
  let url = 'api/PeopleOpen/MyEmailCount'
  let data = SettingData

  return Axios({
    url,
    data
  })
}

// 群众上传图片
export function GetMedia (Settingdata) {
  let url = 'api/Wechat/GetMedia'
  let data= Settingdata

  return Axios({
    url,
    data
  })
}

// 发布信件
export function PeopleSendEmail (SettingData) {
  let url = 'api/PeopleOpen/PeopleSendEmail'
  let data = SettingData

  return Axios ({
    url,
    data
  })
}

// 查看信件内容

export function EmailDetail (SettingData) {
  let url = 'api/PeopleOpen/EmailDetail'
  let data= SettingData

  return Axios({
    url,
    data
  })
}

// 通知公告列表
export function TzggList (SettingData) {
  let url = 'api/VillageOpen/TzggList'
  let data = SettingData

  return Axios({
    url,
    data
  })
}

// 通知公告详细
export function TzggXX (SettingData) {
  let url = 'api/VillageOpen/TzggXX'
  let data = SettingData

  return Axios({
    url,
    data
  })
}

// 获取协商民主列表
export function GetVillageDeliberationList (SettingData) {
  let url = 'api/VillageOpen/GetVillageDeliberationList'
  let data = SettingData

  return Axios({
    url,
    data
  })
}


// 获取协商民主详细内容
export function GetVillageDeliberation (SettingData) {
  let url = 'api/VillageOpen/GetVillageDeliberation'
  let data = SettingData

  return Axios({
    url,
    data
  })
}


// 获取协商民主制度
export function XSZD (SettingData) {
  let url = 'api/VillageOpen/XSZD'
  let data = SettingData

  return Axios({
    url,
    data
  })
}