import Axios from './axios'
// 首页政策资讯
export function Syzczx () {
  let url = 'fapi/fb/Syzczx'
  return Axios ({
    url,
    config:{method:'get'}
  })
}

//fapi/fb/Dblbt 首页轮播图
export function Dblbt (settingData) {
  let url = 'fapi/fb/Dblbt'
  let data = settingData

  return Axios ({
    url,
    data
  })
}
// fapi/fb/RmhdList 获取首页最新动态
export function RmhdList(settingData) {
  let url = 'fapi/fb/RmhdList'
  let data = settingData

  return Axios ({
    url,
    data
  })
}

//fapi/qzhd/ZzzXx  找组织详情信息  参数id 
export function ZzzXx (settingData) {
  let url = 'fapi/qzhd/ZzzXx'
  let data = settingData

  return Axios ({
    url,
    data
  })
}

//fapi/fb/yyzxListArgs  找活动类别 
export function Hdfblb (settingData) {
  let url = 'fapi/fb/Hdfblb'
  let data = settingData

  return Axios ({
    url,
    data
  })
}

//fapi/fb/hdfbxx 活动详细
export function hdfbxx (settingData) {
  let url = 'fapi/fb/hdfbxx'
  let data = settingData

  return Axios ({
    url,
    data
  })
}

//fapi/qzhd/Tjyyzx 提交预约
export function Tjyyzx (settingData) {
  let url = 'fapi/qzhd/Tjyyzx'
  let data = settingData

  return Axios ({
    url,
    data
  })
}

//fapi/fb/HdfbxxTthd 活动规则
export function Hdgz (settingData) {
  let url = 'fapi/fb/HdfbxxTthd'
  let data = settingData

  return Axios ({
    url,
    data
  })
}

// /fapi/fb/HdfbTthdBm 活动报名
export function TtHdbm (settingData) {
  let url = 'fapi/fb/HdfbTthdBm'
  let data = settingData

  return Axios ({
    url,
    data
  })
}

// fapi/qzhd/yyzxxx    预约咨询详细   参数：id
export function yyzxx (settingData) {
  let url = 'fapi/qzhd/yyzxxx'
  let data = settingData

  return Axios ({
    url,
    data
  })
}

// fapi/qzhd/wxyList 找帮助列表
export function wxyList (settingData) {
  let url = 'fapi/qzhd/wxyList'
  let data = settingData

  return Axios ({
    url,
    data
  })
}

// fapi/qzhd/Tjsqrl 提交微心愿申请
export function Tjsqrl (settingData) {
  let url = 'fapi/qzhd/Tjsqrl'
  let data = settingData

  return Axios ({
    url,
    data
  })
}

//fapi/qzhd/Wxyxx 微心愿详细
export function Wxyxx (settingData) {
  let url = 'fapi/qzhd/Wxyxx'
  let data = settingData

  return Axios ({
    url,
    data
  })
}

// fapi/qzhd/Rlwxy   认领微心愿     参数：Id xm rllx lxdh
export function Rlwxy (settingData) {
  let url = 'fapi/qzhd/Rlwxy'
  let data = settingData

  return Axios ({
    url,
    data
  })
}

// fapi/qzhd/TjZxxx  发布提交信件
export function TjZxxx (settingData) {
  let url = 'fapi/qzhd/TjZxxx'
  let data = settingData

  return Axios ({
    url,
    data
  })
}

// fapi/qzhd/Zxxxnr    主席信箱内容   参数：id
export function Zxxxnr (settingData) {
  let url = 'fapi/qzhd/Zxxxnr'
  let data = settingData

  return Axios ({
    url,
    data
  })
}

//fapi/fb/Fbxx 发布详情   参数：id 
export function Fbxx (settingData) {
  let url = 'fapi/fb/Zczxxx'
  let data = settingData

  return Axios ({
    url,
    data
  })
}

// fapi/fb/Hdbm 活动报名
export function Hdbm (SettingData) {
  let url = 'fapi/fb/Hdbm'
  let data = SettingData

  return Axios ({
    url,
    data
  })
}

// fapi/fb/Ztqd 专题签到
export function Ztqd (SettingData) {
  let url = 'fapi/fb/Ztqd'
  let data = SettingData

  return Axios ({
    url,
    data
  })
}

// fapi/fb/PpgzList 品牌工作
export function PpgzList (SettingData) {
  let url = 'fapi/fb/PpgzList'
  let data = SettingData

  return Axios ({
    url,
    data
  })
}

// fapi/fb/PpgzYds 品牌工作阅读数增加
export function PpgzYds (SettingData) {
  let url = 'fapi/fb/PpgzYds'
  let data = SettingData

  return Axios ({
    url,
    data
  })
}

// fapi/fb/Ztfbxx 专题签到详情
export function Ztfbxx (SettingData) {
  let url = 'fapi/fb/Ztfbxx'
  let data = SettingData

  return Axios ({
    url,
    data
  }) 
}

// fapi/fb/Ppgzxx 品牌工作详情
export function Ppgzxx (SettingData) {
  let url = 'fapi/fb/Ppgzxx'
  let data = SettingData

  return Axios ({
    url,
    data
  })
}

//fapi/qzhd/YqfkXqsm  需求帮助页面顶部说明
export function YqfkXqsm (SettingData) {
  let url = 'fapi/qzhd/YqfkXqsm'
  let data = SettingData

  return Axios ({
    url,
    data
  })
}

//fapi/qzhd/YqfkSqxx  需求帮助提交申请
export function YqfkSqxx (SettingData) {
  let url = 'fapi/qzhd/YqfkSqxx'
  let data = SettingData

  return Axios ({
    url,
    data
  })
}

//fapi/qzhd/YqfkWdsqXq 申请详情接口
export function YqfkWdsqXq (SettingData) {
  let url = 'fapi/qzhd/YqfkWdsqXq'
  let data = SettingData

  return Axios ({
    url,
    data
  })
}