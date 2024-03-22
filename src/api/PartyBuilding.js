import Axios from './axios';

//实事发布
export function PracticalJobPublish (SettingData) {
  let url =  'api/PartyBuilding/PublishPracticalJob'
  let data = SettingData

  return Axios({
    url,
    data
  },true)
}
//党员实事列表
export function GetPracticalJobList (SettingData) {
  let url =  'api/PartyBuilding/GetPracticalJobList'
  let data = SettingData

  return Axios({
    url,
    data
  })
}
//最新实事列表
export function LastPracticalJobList (SettingData) {
  let url =  'api/PartyBuilding/LastPracticalJobList'
  let data = SettingData

  return Axios({
    url,
    data
  })
}
//最新实事详细
export function Dyssxx (SettingData) {
  let url =  'api/PartyBuilding/Dyssxx'
  let data = SettingData

  return Axios({
    url,
    data
  })
}
//先进典型一级页面
export function Xjdx (SettingData) {
  let url =  'api/PartyBuilding/Xjdx'
  let data = SettingData

  return Axios({
    url,
    data
  })
}
//实事点赞
export function Dyssdz (SettingData) {
  let url =  'api/PartyBuilding/dyssdz'
  let data = SettingData

  return Axios({
    url,
    data
  })
}
//党员列表
export function GetPartyMemberList (SettingData) {
  let url =  'api/PartyBuilding/GetPartyMemberList'
  let data = SettingData

  return Axios({
    url,
    data
  })
}

//党员详细
export function GetPartyMemberInfo (SettingData) {
  let url =  'api/PartyBuilding/GetPartyMemberInfo'
  let data = SettingData

  return Axios({
    url,
    data
  })
}

// 获取头像
export function GetAvatarUrl (SettingData) {
  let url =  'api/MemberLogin/GetAvatarUrl'
  let data = SettingData
  return Axios({
    url,
    data
  })
}

// 实名认证
export function SmrzSq (SettingData) {
  let url =  'api/member/SmrzSq'
  let data = SettingData
  return Axios({
    url,
    data
  })
}

// 获取党建发布列表详情
export function GetPublish (SettingData) {
  let url =  'api/PartyBuilding/GetPublish'
  let data = SettingData
  return Axios({
    url,
    data
  })
}

// 获取主题党日 列表详情
export function Getztdrxx (SettingData) {
  let url = 'api/PartyBuilding/ztdrxx'
  let data = SettingData

  return Axios ({
    url,
    data
  })
}

// 获取党建发布类型列表
export function GetPublishList (SettingData) {
  let url = 'api/PartyBuilding/GetPublishList'
  let data = SettingData

  return Axios ({
    url,
    data
  })
}

// 获取党建概况内容
export function GetDjgk (SettingData) {
  let url = 'api/PartyBuilding/Djgk'
  let data = SettingData

  return Axios ({
    url,
    data
  })
}

// 获取注意教育类别
export function GetZtjylb (SettingData) {
  let url = 'api/PartyBuilding/Ztjylb'
  let data = SettingData

  return Axios ({
    url,
    data
  })
}

// 获取党支部信息

export function Getdzbxx (SettingData) {
  let url = 'api/PartyBuilding/dzbxx'
  let data = SettingData

  return Axios ({
    url,
    data
  })
}