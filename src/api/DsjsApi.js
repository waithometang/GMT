import Axios from './axios'

// 获取题目信息 --后台处理好的随机10道题目
export function GetTmxx() {
  let url = 'api/dsjs/Tkxx'
  return Axios({
    url
  })
}

// 获取答题信息
export function GetDtxx() {
  let url = 'api/dsjs/Dtxx'
  return Axios({
    url
  })
}

// 检测是否开始接口
export function CheckBegin() {
  let url = 'api/dsjs/CheckBegin'
  return Axios({
    url
  })
}
// 提交答题
export function Wcdt(data) {
  let url = 'api/dsjs/Dtwc'
  return Axios({
    url,
    data
  })
}

// 获取我的抽奖码
export function GetCjm() {
  let url = 'api/dsjs/GetCjm'
  return Axios({
    url
  })
}
