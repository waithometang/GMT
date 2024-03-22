import { getCertToken, GetSMXX } from "@/api/secondLevelPage";
import {storage} from '@/js/until'

const wjKey = "wjxxSession";

let utils = {
  getWjSmxx(cert, vm, callbackUrl, vailtime) {
    if(!vailtime) vailtime = 3600000 //1小时内有效
    let wjxx = storage.fetch(wjKey,vailtime)   
    if(window.location.hostname==='localhost'){
      //测试数据
      vm.$indicator.close();
      return Promise.resolve({xm:'杨过',sfzh:'130101200001012239'})
    }
    if (wjxx.data) {
      vm.$indicator.close();
      return Promise.resolve(JSON.parse(wjxx.data))
    }
    if (cert) {
      return this.getSmxx(cert);
    } else {
      return this.gotoSMRZ(vm,callbackUrl);
    }
  },
  getSmxx(cert) {
    if(window.location.hostname==='localhost'){
      //测试数据
      return Promise.resolve({xm:'杨过',sfzh:'130101200001012239'})
    }
    return new Promise((resolve, reject) => {
      GetSMXX({ cert }).then(rps => {
        if (rps.data.success) {
          let data = { xm: rps.data.content.xm, sfzh: rps.data.content.sfzh };
          storage.save(wjKey, JSON.stringify(data));
          resolve(data);
        } else {
          reject(rps.data.message);
        }
      });
    });
  },
  gotoSMRZ(vm,callbackUrl) {
    return new Promise(resolve => {
      vm.$indicator.open("数据加载中");
      callbackUrl = callbackUrl || window.location.href
      getCertToken(callbackUrl).then(res => {
        vm.$indicator.close();
        if (res.data.success) {
          window.location.href =
            "https://rz.weijing.gov.cn/authgzh/auth?certToken=" +
            res.data.content.cert;
        } else {
          vm.changtoast(res.data.message, "error");
        }
      });
    });
  },
  gotoSMRZIfNot(vm,callback) {  //如果未实名认证则跳转至认证
    vm.$store.dispatch('getGrxx').then(grxx=>{
      if (grxx.hasWJ) {
        callback && callback()
      }else{
        this.getWjSmxx(vm.$route.query.certToken,vm,window.location.origin + window.location.pathname,1)
        .then(
          res => {
            callback && callback()
          },
          rej => {
            this.changtoast(rej, "error");
          }
        );
      }
    })
  },
  gotoSMRZIfNotInModual(vm,moduleKey) {  //如果本模块未实名认证则跳转至认证
    let wjxx = storage.fetch('face' + moduleKey)   
    if(wjxx.data){
      return Promise.resolve(wjxx.data)
    }
    return new Promise((resolve, reject) =>{
      this.getWjSmxx(vm.$route.query.certToken,vm,window.location.origin + window.location.pathname,1)
        .then(
          res => {
            storage.save('face' + moduleKey,res)
            resolve(res)
          },
          rej => {
            this.changtoast(rej, "error")
            reject()
          }
        )
    })
  }
};

export default utils;
