import { LoginOfficialAccount } from '@/api/GetWechatConfig'
import Vm from '@/main'
// 缓存管理
export const storage = {
  save(key, value) {
    let saveTime = new Date().getTime()
    let data = JSON.stringify(value)
    let savaData = JSON.stringify({ data, saveTime })
    localStorage.setItem(key, savaData)
  },
  fetch(key, exp) {
    // code: 1正常 2 没有获取到数据 3数据过期
    let data = JSON.parse(localStorage.getItem(key))
    if (data) {
      data.data = JSON.parse(data.data)
    }

    let returnData = null
    if (data) {
      data.code = 1
      returnData = data
    } else {
      returnData = { data: '', code: 2 }
    }
    if (exp && returnData.code != 2) {
      let fetchTime = new Date().getTime()
      let saveTime = returnData.saveTime
      let countTime = fetchTime - saveTime
      let returnTime = exp - countTime
      if (countTime >= exp) {
        // 信息过期
        return { data: '', code: 3, returnTime }
      } else {
        returnData.returnTime = returnTime
        return returnData
      }
    } else {
      return returnData
    }
  },
  remove(key) {
    localStorage.removeItem(key)
  }
}

// sessionStorage 缓存管理
export const session_Storage = {
  save (key, value) {
    let saveTime = new Date().getTime()
    let data = JSON.stringify(value)
    let saveData = JSON.stringify({data, saveTime})
    sessionStorage.setItem(key, saveData)
  },
  fetch(key, exp) {
    // code: 1正常 2 没有获取到数据 3数据过期
    let data = JSON.parse(sessionStorage.getItem(key))
    if (data) {
      data.data = JSON.parse(data.data)
    }

    let returnData = null
    if (data) {
      data.code = 1
      returnData = data
    } else {
      returnData = { data: '', code: 2 }
    }
    if (exp && returnData.code != 2) {
      let fetchTime = new Date().getTime()
      let saveTime = returnData.saveTime
      let countTime = fetchTime - saveTime
      let returnTime = exp - countTime
      if (countTime >= exp) {
        // 信息过期
        return { data: '', code: 3, returnTime }
      } else {
        returnData.returnTime = returnTime
        return returnData
      }
    } else {
      return returnData
    }
  },
  remove(key) {
    sessionStorage.removeItem(key)
  }
}

/**
 *
 *  统一处理下拉加载上拉刷新 Api返回数据
 */
export function disposeApiData(rps, done, that) {
  if (rps.data.success) {
    let initData = rps.data.content
    if (that.pageIndex === 1) that.listData = initData
    else that.listData = that.listData.concat(initData)
    that.pageIndex++
    if (done) done()
    if (initData.length < that.pageSize) {
      that.$refs.my_scroller.finishInfinite(true)
    }
  } else {
    if (done) {
      done(true)
    }
    that.changtoast(rps.data.message, 'error')
  }
}

var GetTokenPromise = null

// 获取用户Token
export function GetToken(retake) {
  if(retake){
    if (!storage.fetch('Token').data && GetTokenPromise) {  //正在获取
      return GetTokenPromise
    }
    storage.remove('Token')
    InitGetTokenPromise()
  }else if(GetTokenPromise==null){
    InitGetTokenPromise()
  }
  return GetTokenPromise
}

function InitGetTokenPromise(){
  GetTokenPromise=new Promise(resolve=>{
    let Token=storage.fetch('Token').data
    if(Token){
      resolve(Token)
      return
    }
    let Url = window.location.href
    let assetsSubDirectory = false // 是否开发环境
    if(process && process.env && process.env.NODE_ENV === 'development') assetsSubDirectory = true
    if (assetsSubDirectory) {
      let testTkoen = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJodHRwOi8vc2NoZW1hcy54bWxzb2FwLm9yZy93cy8yMDA1LzA1L2lkZW50aXR5L2NsYWltcy9uYW1lIjoiMzIxNDQiLCJleHAiOjE1NzkwMjYwMTB9.M99pxE8ldqcpiXn6FzbYjcWbVJjj92h7ZLVoPrdzShA'
      storage.save('Token', testTkoen)
      resolve(testTkoen)
    } else {
      let ua = navigator.userAgent.toLowerCase()
      let WechatCode = getUrlParam('code')
      let WechatState = getUrlParam('state')
      if (WechatState) { // 有获取到微信授权code
        LoginOfficialAccount({
          code: WechatCode
        }).then(rps => {
          // storage.save('userimages', rps.data.content.avatarUrl)
          storage.save('Token', rps.data.content.token)
          resolve(rps.data.content.token)
        })
      } else { // 没有获取到微信授权
        let requireUrl = encodeURIComponent(Url)
        let appid = ''
        if (Url.indexOf('znzwoa') > 0) {
          appid = 'wx7f1250a7fce8cdc2'  //厚实appId
        } else {
          appid = 'wx6b289a6fc760eefc'  //高明通appId 
        }
        let scope = 'snsapi_base'
        let state = 'Wechat'
        window.location.replace(`https://open.weixin.qq.com/connect/oauth2/authorize?appid=${appid}&redirect_uri=${requireUrl}&response_type=code&scope=${scope}&state=${state}#wechat_redirect`)
      }
    }
  })
}

/*通过正则获取url中的参数*/
function getUrlParam(name) {
  var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
  var r = window.location.search.substr(1).match(reg);
  if (r != null) return decodeURI(r[2]); return null;
}


//检查是否选择了村居
export function HasVid(callbackUrl) {
  if (!callbackUrl) {
    return
  }
  let vidData=storage.fetch('longData').data
  if (vidData && vidData.id) {
    callbackUrl=callbackUrl.replace(/\{vid\}/,vidData.id)
    Vm.$router.push(callbackUrl)
  }else{
    Vm.$router.push('/AreaSelection2?cb='+callbackUrl)
  }
}


export function downLoadByUrl(url,filename,completeCallback,failCallback){
  var xhr = new XMLHttpRequest();
  //GET请求,请求路径url,async(是否异步)
  xhr.open('GET', url, true);
  //设置请求头参数的方式,如果没有可忽略此行代码
  xhr.setRequestHeader("Authorization", 'Bearer '+ storage.fetch('Token').data)
  //设置响应类型为 blob
  xhr.responseType = 'blob';
  //关键部分
  xhr.onload = function (e) {
      //如果请求执行成功
      if (this.status == 200) {
          completeCallback && completeCallback()
          let blob = this.response;
          if (blob.type == 'text/plain') {
            let reader = new FileReader();
            reader.readAsText(blob,"utf8");
            reader.onload = function(){
                // console.log(this.result);
                failCallback && failCallback(this.result)
            }
          }else{
            openDownloadDialog(blob,filename)
            //释放之前创建的URL对象
            window.URL.revokeObjectURL(url);
          }
          
      }
  };
  //发送请求
  xhr.send();
}

export function openDownloadDialog(url, saveName) {
  if (typeof url == 'object' && url instanceof Blob) {
      url = URL.createObjectURL(url); // 创建blob地址
  }
  var aLink = document.createElement('a');
  aLink.href = url;
  aLink.download = saveName || ''; // HTML5新增的属性，指定保存文件名，可以不要后缀，注意，file:///模式下不会生效
  var event;
  if (window.MouseEvent) event = new MouseEvent('click');
  else {
      event = document.createEvent('MouseEvents');
      event.initMouseEvent('click', true, false, window, 0, 0, 0, 0, 0, false, false, false, false, 0, null);
  }
  aLink.dispatchEvent(event);
}

export function reportQuestion(content){
  Vm.$post('/api/system/question',{name: content})
}