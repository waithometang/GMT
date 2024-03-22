// 默认参数
export let CommonParams = {}

// 默认配置
export let CommonOption = {
  // baseURL: 'http://localhost:8080/', // 开发环境
  baseURL:'/', // 测试环境
  method: 'post',
  headers: {
    'Content-Type': 'application/json'
  },
  timeout: 60000
}

// 表单配置
export let formOption = {
  // baseURL: 'http://localhost:8080/', // 开发环境
  baseURL:'/', // 测试环境
  method: 'post',
  headers: {
    'Content-Type': 'multipart/form-data'
  },
  timeout: 60000
}