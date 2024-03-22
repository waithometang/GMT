// 三联平台api接口封装
import Axios from './axios'

// 公布表总概要
export function Summary(SettingData) {
  let url = 'api/sl/Summary'
  let data = SettingData

  return Axios({
    url,
    data
  })
}

// 公布表具体内容
export function Details(SettingData) {
  let url = 'api/sl/Detail'
  let data = SettingData

  return Axios({
    url,
    data
  })
}

// 公布表详细内容
export function XX(SettingData) {
  let url = 'api/sl/XX'
  let data = SettingData

  return Axios({
    url,
    data
  })
}


// 招标中标公告内容
export function Zbgg(SettingData) {
  let url = 'api/sl/Zbgg'
  let data = SettingData

  return Axios({
    url,
    data
  })
}


// // 招标中标公告列表
// export function ZbggList(SettingData) {
//   let url = 'api/sl/ZbggList'
//   let data = SettingData

//   return Axios({
//     url,
//     data
//   })
// }


// 所有镇街
export function Syzj(SettingData) {
  let url = 'api/sl/Syzj'
  let data = SettingData

  return Axios({
    url,
    data
  })
}

