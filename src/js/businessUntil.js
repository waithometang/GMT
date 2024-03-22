import { storage } from "@/js/until";
const Grades = ["区级发布","镇街发布","村居发布","党员发布"]
const PublishType = ["村情动态","三务公开","村务公开","党务公开","政策宣传","务工信息","每月沟通","联村日志","村大事记"]
const DjPublishType = ["主题教育","党员学习","制度文件","公示公告"]
import { WydsApi } from "@/api/FirstLevelPage";
// 发布等级
export const PublishUtil = {
  getGrade(typeid) {
    return Grades[typeid]
  },
  getTypeName(typeid){
    return PublishType[typeid]
  },
  getDjTypeName(typeid){
    return DjPublishType[typeid]
  }
}

const defaultImg = "/images/FirstLevelPage/tacitlyapprove.jpg" 
// 发布等级
export const ImageUtil = {
  getDefaultImg(url) {
    if(url) return url
    return defaultImg
  }
}

export function GetWyds(that,lb,menuIds) {//获取未阅读数
    return   //暂时屏蔽此功能
    if(!menuIds || menuIds.length===0) return
    var vid=null
    if(lb!==1) vid=storage.fetch("longData").data.id
    WydsApi({vid,lb,menuIds}).then(res=>{
      if(res.data.success){
        let wyds=that.$store.state.Main_wydsData || {}
        that.$store.state.Main_wydsData=Object.assign(wyds,res.data.content)
      }else{
        if(res.data.message) {
          that.changtoast(res.data.message,'error')
        }
      }
    })
}