import Axios from '@/api/axios'

// 获取 实名认证信息
export function RzxxDetail (SettingData) {
  let url = 'api/Member/RzxxDetail'
  let data = SettingData

  return Axios({
    url,
    data
  })
}


// 个人信息
// export function GetGrxx (SettingData) {
//   let url = 'api/Member/Grxx'
//   let data = SettingData

//   return Axios({
//     url,
//     data
//   })
// }


// 可选择自然村
export function Kxzzrc (SettingData) {
  let url = 'api/Member/Kxzzrc'
  let data = SettingData

  return Axios({
    url,
    data
  })
}


// 重新选择自然村
export function Cxxzcj (SettingData) {
  let url = 'api/Member/Cxxzcj'
  let data = SettingData

  return Axios({
    url,
    data
  })
}