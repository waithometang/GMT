import { storage } from '@/js/until'
import Axios from '@/api/axios'


export default {
  showToast({
    commit
  }, msg) {
    var type = Object.prototype.toString.call(msg)
    // 判断参数是否是字符串或数组
    if (type == '[object String]' || type == '[object Number]') {
      dos(commit, msg)
    } else {
      if (msg.startFun) {
        msg.startFun()
      }
      dos(commit, msg.message, msg.endFun)
    }
  },
  setLoading({
    commit
  }, show) {
    commit('SetLoading', show)
  },
  alertConfirm({
    commit
  }, setting) {
    commit('changeShowConfirm', true)
    commit('changeConfirmTitle', setting.title || '')
    commit('changeConfirmText', setting.content || '')
    commit('changeConfirmSucceed', setting.succeed || function () {})
    commit('changeConfirmFail', setting.fail || function () {})
    commit('changeConfirmFailText', setting.failText || '取消')
    commit('changeConfirmSucceedText', setting.succeedText || '确定')
    commit('changeConfirmHideCancel', setting.hideCancel || false)
  },

  GmtMessageBox ({
    commit
  },setting) {
    commit('Set_GmtMessageBox', true)
    commit('Set_GmtMessageBoxContent', setting.content)
    commit('Set_GmtMessageBoxCancel', setting.success || function () {})
    if (setting.failStata != null || setting.failStata != '') {
      commit('Set_failStata', setting.failStata)
    }
  },

  voteMessage ({
    commit
  },setting) {
    commit('SetvoteMessage', true)
    commit('SetvoteContent', setting.id)
    commit('Setincrease', setting.success)
  },

  setPMToken({
    commit
  }, val) {
    commit('SET_PMToken', val)
    storage.save('PMToken', val)
  },
  getPMToken({
    commit
  }) {
    return storage.fetch('PMToken').data
    // return commit('GET_PMToken',val)
  },
  setToken({
    commit
  }, val) {
    commit('SET_Token', val)
    storage.save('Token', val)
  },
  setPermission({
    commit
  }, val) {
    commit('SET_Permission', val)
    storage.save('Permission', val)
  },
  getPermission({
    commit
  }) {
    return storage.fetch('Permission').data
    // return commit('GET_Permission',val)
  },
  getVillageId() {
    return storage.fetch('longData').data.id
  },
  getGrxx({
    state
  }, retake) {
    if (retake){
      // state.Grxx=null
      sessionStorage.removeItem('_ss_grxx')
      initGrxxPromise(state)
    }
    else if (GetGrxxPromise == null)
      initGrxxPromise(state)
    return GetGrxxPromise
  },
  getZhxx({
    state
  }){
    return new Promise(resolve => {
      let url = 'api/Member/Zhxx'
      Axios({
        url
      }).then(res => {
        let rtn;
        if (res && res.data && res.data.success) {
          rtn = res.data.content
        } else {
          rtn = {}
        }
        resolve(rtn)
      })
    })
  },
  alertConfirm ({commit}, setting) {
    commit('Set_GmtpopupState', true)
    commit('Set_GmtpopupContent', setting.content)
    commit('Set_GmtpopupCancel', setting.fail || function () {} )
    commit('Set_GmtpopupConfirm', setting.success || function () {} )
  },
  GetuserInfo ({state, commit}, retake) {
    if (retake) { // 清空仓储数据重新获取
      commit('Set_FbInfo', '')
      if (retake == 'get') {
        GetFbInfo (state, commit)
      } else {
        PostFbInfo (state, commit)
      }
    } else {
      GetFbInfo (state, commit)
    }
    return GetFbInfoPromise
  },
  AddVisitTime({commit}, mk) {
    Axios({
      url:'/api/common/AddVisitTime',
      method: 'POST',
      data: {
        mk
      }
    })
  }
}


var GetGrxxPromise = null

function initGrxxPromise(state) {
  GetGrxxPromise = new Promise(resolve => {
    let _ss_grxx=sessionStorage.getItem('_ss_grxx')
    if(_ss_grxx){
      resolve(JSON.parse(_ss_grxx))
      return
    }
    let url = 'api/Member/Grxx'
    Axios({
      url
    }).then(res => {
      let rtn;
      if (res && res.data && res.data.success) {
        rtn = res.data.content
      } else {
        rtn = {
          hasSM: false
        }
      }
      state.Grxx=rtn
      sessionStorage.setItem('_ss_grxx',JSON.stringify(rtn))
      resolve(rtn)
    })
  })
}

var GetFbInfoPromise = null

// 查询发布权限 get请求
function GetFbInfo (state, commit) {
  let userInfo = storage.fetch("longData").data
  GetFbInfoPromise = new Promise (resolve => {
    if (state.FbInfo) {
      resolve(state.FbInfo)
      return
    }
    if(!userInfo.id) {
      resolve({})
      return
    }
    let url = `api/villageopen/Wdfb/${userInfo.id}`
    Axios ({
      url,
      config:{method:'get'}
    }).then (rps => {
      let rtn
      if (rps.data.success) {
        rtn = rps.data.content
      }
      commit('Set_FbInfo', rtn)
      resolve(rtn)
    })
  })
}

// 查询发布权限 post 请求
function PostFbInfo (state, commit) {
  let userInfo = storage.fetch("longData").data
  GetFbInfoPromise = new Promise (resolve => {
    if (state.FbInfo) {
      resolve(state.FbInfo)
      return
    }
    let url = `api/villageopen/Wdfb/${userInfo.id}`
    Axios ({
      url,
    }).then (rps => {
      let rtn
      if (rps.data.success) {
        rtn = rps.data.content
      }
      commit('Set_FbInfo', rtn)
      resolve(rtn)
    })
  })
}

function dos(commit, msg, endFun) {
  commit('SET_showToast', true)
  commit('Set_toastMsg', msg)
  setTimeout(() => {
    commit('SET_showToast', false)
    if (endFun) {
      endFun()
    }
  }, 1500)
}
