// 二级页面api接口封装
import Axios from './axios'
import { futimes } from 'fs'
import axios from './axios'

//获取镇街信息
export function Getzjxx () {
  let url =  `api/common/zjxx`
  return Axios({
    url,
    config:{method:'get'}
  })
}

//获取简介类信息
export function GetDescription (t,vid) {
  let url =  `api/VillageOpen/GetDescription/${t}/${vid}`
  return Axios({
    url,
    config:{method:'get'}
  })
}

// 两委成员
export function LwcyList (SettingData) {
  let url = 'api/VillageOpen/LwcyList'
  let data = SettingData

  return Axios({
    url,
    data
  })
}


// 村居发布列表
export function GetNewsList (SettingData) {
  let url = 'api/VillageOpen/GetNewsList'
  let data = SettingData

  return Axios({
    url,
    data
  })
}


// 直联代表列表
export function ZldbList (SettingData) {
  let url = 'api/VillageOpen/ZldbList'
  let data = SettingData

  return Axios({
    url,
    data
  })
}


// 联村日志列表
export function ZlrzList (SettingData) {
  let url = 'api/VillageOpen/ZlrzList'
  let data = SettingData

  return Axios({
    url,
    data
  })
}


// 联村日志详细
export function ZlrzXX (SettingData) {
  let url = 'api/VillageOpen/ZlrzXX'
  let data = SettingData

  return Axios({
    url,
    data
  })
}


// 联村日志点赞
export function ZlrzLike (SettingData) {
  let url = 'api/VillageOpen/ZlrzLike'
  let data = SettingData

  return Axios({
    url,
    data
  })
}

// 联村日志评论
export function ZlrzPl (SettingData) {
  let url = 'api/VillageOpen/ZlrzPl'
  let data = SettingData

  return Axios({
    url,
    data
  })
}

// 联村日志评论删除
export function ZlrzPlDel (SettingData) {
  let url = 'api/VillageOpen/ZlrzPlDel'
  let data = SettingData

  return Axios({
    url,
    data
  })
}

// 联村日志个人
export function ZlrzGr (SettingData) {
  let url = 'api/VillageOpen/ZlrzGr'
  let data = SettingData

  return Axios({
    url,
    data
  })
}

// 联村日志个人日志列表
export function ZlrzGrList (SettingData) {
  let url = 'api/VillageOpen/ZlrzGrList'
  let data = SettingData

  return Axios({
    url,
    data
  })
}

// 增加阅读人数
export function GetAddReaded (SettingData) {
  let url = 'api/Common/AddReaded'
  let data = SettingData

  return Axios ({
    url,
    data
  })
}


// 发布类型信息
export function GetFblx (id) {
  let url = 'api/Common/Fblx/'+id
  return Axios ({
    url,
    config:{method:'get'}
  })
}

// 发布详细
export function GetPulishDetail (SettingData) {
  let url = 'api/Common/PulishDetail'
  let data = SettingData

  return Axios ({
    url,
    data
  })
}

// 点赞 差评 
export function GetMark (SettingData) {
  let url = 'api/common/Mark'
  let data = SettingData

  return Axios ({
    url,
    data
  })
}

// 取消点赞或踩
export function GetUndoMark (SettingData) {
  let url = 'api/common/UndoMark'
  let data = SettingData

  return Axios ({
    url,
    data
  })
}

// 收藏
export function GetFavorite (SettingData) {
  let url = 'api/common/Favorite'
  let data = SettingData

  return Axios ({
    url,
    data
  })
}

// 取消收藏
export function GetUndoFavorite (SettingData) {
  let url = 'api/common/UndoFavorite'
  let data = SettingData

  return Axios ({
    url,
    data
  })
}

// 企业认证

export function GetQyrzSq (SettingData) {
  let url = 'api/member/QyrzSq'
  let data = SettingData

  return Axios ({
    url,
    data
  })
}

// 企业认证信息
export function GetQyrzxx (SettingData) {
  let url = 'api/member/Qyrzxx'
  let data = SettingData

  return Axios ({
    url,
    data
  })
}

// 提交企业反映
export function GetQyfy (SettingData) {
  let url = 'api/peopleopen/Qyfy'
  let data = SettingData

  return Axios ({
    url,
    data
  })
}

// 获取红黑榜数据
export function Gethhb (SettingData) {
  let url = 'api/common/hhb'
  let data = SettingData

  return Axios ({
    url,
    data
  })
}

// 获取红黑榜期次数据
export function GethhbQc (SettingData) {
  let url = 'api/common/hhbQc'
  let data = SettingData

  return Axios ({
    url,
    data
  })
}

// 获取两委成员 村居直联 党员积分 详细列表
export function Getryxx (SettingData) {
  let url = 'api/VillageOpen/ryxx'
  let data = SettingData

  return Axios ({
    url,
    data
  })
}

// 我的积分排行榜
export function Getwdjfph (SettingData) {
  let url = 'api/PartyBuilding/wdjfph'
  let data = SettingData

  return Axios ({
    url,
    data
  })
}

// 点赞
export function GetHotPulishList (SettingData) {
  let url = 'api/sy/HotPulishList'
  let data = SettingData

  return Axios ({
    url,
    data
  })
}

// 点赞详情
export function GetHotPulishxx (SettingData) {
  let url = 'api/sy/HotPulishxx'
  let data = SettingData

  return Axios ({
    url,
    data
  })
}

// 企业认证列表
export function GetQyrzList (SettingData) {
  let url = 'api/member/QyrzList'
  let data = SettingData

  return Axios ({
    url,
    data
  })
}

// 个人发布
export function GetGrfb (SettingData) {
  let url = 'api/Common/Grfb'
  let data = SettingData

  return Axios ({
    url,
    data
  })
}

// 获取个人发布列表
export function Grfblist (SettingData) {
  let url = 'api/Common/Grfblist'
  let data = SettingData

  return Axios ({
    url,
    data
  })
}

// 通用详情页发表评论
export function Getfbpl (SettingData) {
  let url = 'api/common/fbpl'
  let data = SettingData

  return Axios ({
    url,
    data
  })
}

// 获取通用详情页评论列表
export function GetPlList (SettingData) {
  let url = 'api/common/PlList'
  let data = SettingData

  return Axios ({
    url,
    data
  })
}

// 通用详情列表删除
export function GetPlDel  (SettingData) {
  let url = 'api/common/PlDel'
  let data = SettingData

  return Axios ({
    url,
    data
  })
}

// 发布系统反馈
export function Getxtfk (SettingData) {
  let url = 'api/system/xtfk'
  let data = SettingData

  return Axios ({
    url,
    data
  })
}

// 获取系统反馈列表
export function GetXtfkList (SettingData) {
  let url = 'api/system/XtfkList'
  let data = SettingData

  return Axios ({
    url,
    data
  })
}

// 获取党支部积分排行信息列表
export function Getjfph (SettingData) {
  let url = 'api/PartyBuilding/jfph'
  let data = SettingData

  return Axios ({
    url,
    data
  })
}

// 获取企业认证列表
export function GetQyYrzList (SettingData) {
  let url = 'api/member/QyYrzList'
  let data = SettingData

  return Axios ({
    url,
    data
  })
}

// 我的发布权限
export function GetWdfb (SettingData) {
  let url = 'api/villageopen/Wdfb'
  let data = SettingData

  return Axios ({
    url,
    data
  })
}

// 获取企业反映列表
export function GetQyfyList (SettingData) {
  let url = 'api/peopleopen/GetQyfyList'
  let data = SettingData

  return Axios ({
    url,
    data
  })
}

// 主题党日详情
export function Getztdrxx (SettingData) {
  let url = 'api/PartyBuilding/ztdrxx'
  let data = SettingData

  return Axios ({
    url,
    data
  })
}

// 获取企业反应结果 
export function GetQyfyjg (SettingData) {
 let url = 'api/PeopleOpen/GetQyfyjg'
 let data = SettingData

 return Axios ({
   url,
   data
 })
}
// 获取企业反应评价 api/PeopleOpen/GetQyfypj
export function GetQyfypj (SettingData) {
  let url = 'api/PeopleOpen/GetQyfypj'
  let data = SettingData
 
  return Axios ({
    url,
    data
  })
 }
// 发送企业反应评价 api/PeopleOpen/Qyfypj
export function Qyfypj (SettingData) {
  let url = 'api/PeopleOpen/Qyfypj'
  let data = SettingData
 
  return Axios ({
    url,
    data
  })
 }

 // api/common/Grfbxx   个人发布信息详细
export function Grfbxx (SettingData) {
  let url = 'api/common/Grfbxx'
  let data = SettingData

  return Axios ({
    url,
    data
  })
}

// api/common/DelGrfb    删除个人发布，
export function DelGrfb (SettingData) {
  let url = 'api/common/DelGrfb'
  let data = SettingData

  return Axios ({
    url,
    data
  })
}

// api/common/EditGrfb     编辑个人发布
export function EditGrfb (SettingData) {
  let url = 'api/common/EditGrfb'
  let data = SettingData

  return Axios ({
    url,
    data
  })
}

// api/sms/SendCode  发送验证接口 
export function GetSendCode (SettingData) {
  let url = 'api/sms/SendCode'
  let data = SettingData

  return Axios ({
    url,
    data
  })
}

// api/PeopleOpen/Sqfyxx   个人诉求详细内容
export function GetSqfyxx (SettingData) {
  let url = 'api/PeopleOpen/Sqfyxx'
  let data = SettingData

  return Axios ({
    url,
    data
  })
}

// api/PeopleOpen/Sqfypj    诉求反映评价
export function GetSqfypj (SettingData) {
  let url = 'api/PeopleOpen/Sqfypj'
  let data = SettingData

  return Axios ({
    url,
    data
  })
}

// api/PeopleOpen/SqpjTag
export function GetSqpjTag (SettingData, config) {
  let url = 'api/PeopleOpen/SqpjTag'
  let data = SettingData

  return Axios({
    url,
    data,
    config
  })
}

//api/member/CxSmrzSq  撤消实名认证
export function CxSmrzSq (SettingData) {
  let url = 'api/member/CxSmrzSq'
  let data = SettingData

  return Axios ({
    url,
    data
  })
}

// 获取公众发布数据
export function publicListData (SettingData) {
  let url = 'api/Common/PulishList'
  let data = SettingData

  return Axios ({
    url,
    data
  })
}

// api/common/Khsx   考核事项
export function GetKhsx (SettingData) {
  let url = 'api/common/Khsx'
  let data = SettingData

  return Axios ({
    url,
    data
  })
}

// api/qy/qyrzsq 申请
export function Getqyrzsq (SettingData) {
  let url = 'api/qy/qyrzsq'
  let data = SettingData

  return Axios ({
    url,
    data
  })
}

//  api/qy/qyrzList 已认证列表
export function GetqyrzList (SettingData) {
  let url = 'api/qy/qyrzList'
  let data = SettingData

  return Axios ({
    url,
    data
  })
}

//  api/qy/yrzqyList  已认企业证列表
export function GetyrzqyList (SettingData) {
  let url = 'api/qy/yrzqyList'
  let data = SettingData

  return Axios ({
    url,
    data
  })
}

//api/qy/qyrzxx 认证详情
export function Getqyrzxx (SettingData) {
  let url = 'api/qy/qyrzxx'
  let data = SettingData

  return Axios ({
    url,
    data
  })
}

//api/wechat/BusinessLicenseOrc 百度识别营业执照
export function BusinessLicenseOrc (SettingData) {
  let url = 'api/wechat/BusinessLicenseOrc'
  let data = SettingData

  return Axios ({
    url,
    data
  })
}

// api/qy/jcbd    解除绑定
export function Getjcbd  (SettingData) {
  let url = 'api/qy/jcbd'
  let data = SettingData

  return Axios ({
    url,
    data
  })
}

// api/qy/qyzpfb 企业招聘列表
export function Getqyzpfb (SettingData) {
  let url = 'api/qy/qyzpfb'
  let data = SettingData

  return Axios ({
    url,
    data
  })
}

// api/qy/wdzpfbxx 企业招聘列表
export function Getwdzpfbxx(SettingData) {
  let url = 'api/qy/wdzpfbxx'
  let data = SettingData

  return Axios ({
    url,
    data
  })
}

// api/qy/qyzpfbList 企业招聘信息列表
export function qyzpfbList (SettingData) {
  let url = 'api/qy/qyzpfbList'
  let data = SettingData

  return Axios ({
    url,
    data
  })
}

// api/qy/qycxfb 企业宣传发布
export function Getqycxfb(SettingData) {
  let url = 'api/qy/qycxfb'
  let data = SettingData

  return Axios ({
    url,
    data
  })
}

// api/qy/qycxfb 企业宣传发布
export function Getqycxfbxx(SettingData) {
  let url = 'api/qy/qycxfbxx'
  let data = SettingData

  return Axios ({
    url,
    data
  })
}

// api/qy/qbzpxx 下拉选择
export function qbzpxx (SettingData) {
  let url = 'api/qy/qbzpxx'
  let data = SettingData
  return Axios ({
    url,
    data,
    config:{method:'get'}
  })
}

// api/qy/qycxxx    企业宣传编辑页面
export function qycxxx (SettingData) {
  let url = 'api/qy/qycxxx'
  let data = SettingData
  return Axios ({
    url,
    data,
  })
}
// api/qy/qycxedit  企业宣传编辑
export function qycxedit (SettingData) {
  let url = 'api/qy/qycxedit'
  let data = SettingData
  return Axios ({
    url,
    data,
  })
}

// api/member/sfgwry    是否公务员
export function sfgwry (SettingData) {
  let url = 'api/member/sfgwry'
  let data = SettingData

  return Axios ({
    url,
    data
  })
}

// api/member/GwySmrzSq
export function GwySmrzSq (SettingData) {
  let url = 'api/member/GwySmrzSq'
  let data = SettingData

  return Axios ({
    url,
    data
  })
}

// api/common/NotReadNumber 未阅读数
export function NotReadNumber (SettingData) {
  let url = 'api/common/NotReadNumber'
  let data = SettingData

  return Axios ({
    url,
    data
  })
}

// api/common/UpdateReadRecord 跟新阅读数记录时间
export function UpdateReadRecord (SettingData) {
  let url = 'api/common/UpdateReadRecord'
  let data = SettingData

  return Axios ({
    url,
    data
  })
}

//api/sy/ZxdtList  最新动态列表
export function ZxdtList (SettingData) {
  let url = 'api/sy/ZxdtList'
  let data = SettingData

  return Axios ({
    url,
    data
  })
}

//api/PeopleOpen/TjSqPj    提交评论
export function TjSqPj (SettingData) {
  let url = 'api/PeopleOpen/TjSqPj'
  let data = SettingData

  return Axios ({
    url,
    data
  })
}

//  api/PeopleOpen/GetShotPjList   评价列表
export function GetShotPjList (SettingData) {
  let url = 'api/PeopleOpen/GetShotPjList'
  let data = SettingData

  return Axios ({
    url,
    data
  })
}

// api/PeopleOpen/DelSqPj   删除评论
export function DelSqPj (SettingData) {
  let url = 'api/PeopleOpen/DelSqPj'
  let data = SettingData

  return Axios ({
    url,
    data
  })
}

// 诉求点赞 差评 
export function SqMark (SettingData) {
  let url = 'api/common/SqMark'
  let data = SettingData

  return Axios ({
    url,
    data
  })
}

//api/peopleopen/GetSqxx  诉求详细内容
export function GetSqxx (SettingData) {
  let url ='api/peopleopen/GetSqxx'
  let data = SettingData

  return Axios ({
    url,
    data
  })
}

// api/Common/PulishList 首页最新动态
export function IndexZxdt (SettingData) {
  let url = 'api/Common/PulishList'
  let data = SettingData

  return Axios ({
    url,
    data
  })
}

// api/qy/PulishList 企业优惠展示
export function qyyhdt (SettingData) {
  let url = 'api/qy/PulishList'
  let data = SettingData

  return Axios ({
    url,
    data
  })
}

// api/Common/SPulishList 主题教育展示
export function SPulishList (SettingData) {
  let url = 'api/Common/SPulishList'
  let data = SettingData

  return Axios ({
    url,
    data
  })
}

// api/sy/tphdxx  投票活动详细信息
export function tphdxx (SettingData) {
  let url = 'api/sy/tphdxx'
  let data = SettingData

  return Axios ({
    url,
    data
  })
}

// api/sy/tpxxList   投票列表
export function tpxxList (SettingData) {
  let url = 'api/sy/tpxxList'
  let data = SettingData

  return Axios ({
    url,
    data
  })
}

// api/sy/tp   参数： id---作品id
export function tp (SettingData) {
  let url = 'api/sy/tp'
  let data = SettingData

  return Axios ({
    url,
    data
  })
}

//api/sy/pxbxx 排行榜信息
export function pxbxx (SettingData) {
  let url = 'api/sy/pxbxx'
  let data = SettingData

  return Axios ({
    url,
    data
  })
}

// api/sy/pxbList  下面的排行榜列表
export function pxbList (SettingData) {
  let url = 'api/sy/pxbList'
  let data = SettingData

  return Axios ({
    url,
    data
  })
}

// api/sy/tpnrxx   投票详细页  参数：id
export function tpnrxx (SettingData) {
  let url = 'api/sy/tpnrxx'
  let data = SettingData

  return Axios ({
    url,
    data
  })
}

// api/sy/tpxq 投票详情
export function tpxq (SettingData) {
  let url = 'api/sy/tpxq'
  let data = SettingData

  return Axios ({
    url,
    data
  })
}

// api/sy/tpcj  投票抽奖接口，返回是否中奖
export function tpcj (SettingData) {
  let url = 'api/sy/tpcj'
  let data = SettingData

  return Axios ({
    url,
    data
  })
}

// api/sy/djzjlxdh  登记中奖电话号码
export function djzjlxdh (SettingData) {
  let url = 'api/sy/djzjlxdh'
  let data = SettingData

  return Axios ({
    url,
    data
  })
}

// api/member/xggrxx   修改个人信息
export function xggrxx (SettingData) {
  let url = 'api/member/xggrxx'
  let data = SettingData

  return Axios ({
    url,
    data
  })
}

// api/villageopen/gyjb 公益举报
export function gyjb (SettingData) {
  let url = 'api/villageopen/gyjb'
  let data = SettingData

  return Axios ({
    url,
    data
  })
}

// api/ld/sjtj // 数据统计
export function sjtj (SettingData) {
  let url = 'api/ld/sjtj'
  let data = SettingData

  return Axios ({
    url,
    data
  })
}

// api/sy/jchdxx
export function jchdxx (SettingData) {
  let url = 'api/sy/jchdxx'
  let data = SettingData

  return Axios ({
    url,
    data
  })
}

// api/sy/jchdtpxq
export function jchdtpxq (SettingData) {
  let url = 'api/sy/jchdtpxq'
  let data = SettingData

  return Axios({
    url,
    data
  })
}


// 办事预约 人员信息绑定
export function RyxxBd (SettingData) {
  let url = 'api/tjj/RyxxBd'
  let data = SettingData

  return Axios({
    url,
    data
  })
}

// 企业复工申请
export function qyfgtj (SettingData) {
  let url = 'api/qy/qyfgtj'
  let data = SettingData

  return Axios ({
    url,
    data
  })
}

// 企业复工申请列表
export function qyfglist (SettingData) {
  let url = 'api/qy/qyfglist'
  let data = SettingData

  return Axios ({
    url,
    data
  })
}

// 企业复工申请详情
export function qyfgxx (SettingData) {
  let url = 'api/qy/qyfgxx'
  let data = SettingData

  return Axios ({
    url,
    data
  })
}

export function qyztctj (SettingData) {
  let url = 'api/qy/qyztctj'
  let data = SettingData

  return Axios ({
    url,
    data
  })
}
export function qyztclist (SettingData) {
  let url = 'api/qy/qyztclist'
  let data = SettingData

  return Axios ({
    url,
    data
  })
}
export function qyztcxx (SettingData) {
  let url = 'api/qy/qyztcxx'
  let data = SettingData

  return Axios ({
    url,
    data
  })
}

//通行证提交
export function txztj (SettingData) {
  let url = 'api/zx/txztj'
  let data = SettingData

  return Axios ({
    url,
    data
  })
}


// 发布类型信息
export function VillageData () {
  let url = 'api/Common/VillageData'
  return Axios ({
    url,
    config:{method:'get'}
  })
}

// api/zx/txhcxx  检查下面展示 的信息 参数： ewm
export function txhcxx (SettingData) {
  let url = 'api/zx/txhcxx'
  let data = SettingData

  return Axios ({
    url,
    data
  })
}
// 提交核查
export function txhc (SettingData) {
  let url = 'api/zx/txhc'
  let data = SettingData

  return Axios ({
    url,
    data
  })
}
//我的通行证二唯码
export function txzewm (SettingData) {
  let url = 'api/zx/txzewm'
  let data = SettingData

  return Axios ({
    url,
    data
  })
}
// 核查记录
export function hcjl (SettingData) {
  let url = 'api/zx/hcjl'
  let data = SettingData

  return Axios ({
    url,
    data
  })
}
// 核查记录
export function cxjl (SettingData) {
  let url = 'api/zx/cxjl'
  let data = SettingData

  return Axios ({
    url,
    data
  })
}

export function txzxx (SettingData) {
  let url = 'api/zx/txzxx'
  let data = SettingData

  return Axios ({
    url,
    data
  })
}

export function hctjxxjl (SettingData) {
  let url = 'api/zx/hctjxxjl'
  let data = SettingData

  return Axios ({
    url,
    data
  })
}


export function getCert (SettingData) {
  let url = 'api/zx/getCert'
  let data = SettingData

  return Axios ({
    url,
    data
  })
}

export function getCertToken (callbackUrl) {
  let url = 'api/zx/getCertToken'
  return Axios ({
    url,
    data:{ url:callbackUrl }
  })
}

export function GetSMXX (SettingData) {
  let url = 'api/zx/GetSMXX'
  let data = SettingData

  return Axios ({
    url,
    data
  })
}

export function GetWJSMXX (SettingData) {
  let url = 'api/zx/GetWJSMXX'
  let data = SettingData

  return Axios ({
    url,
    data
  })
}


export function dktj (SettingData) {
  let url = 'api/yq/dktj'
  let data = SettingData

  return Axios ({
    url,
    data
  })
}

export function adddkry (SettingData) {
  let url = 'api/yq/adddkry'
  let data = SettingData

  return Axios ({
    url,
    data
  })
}

export function jkdksy (SettingData) {
  let url = 'api/yq/jkdksy'
  let data = SettingData

  return Axios ({
    url,
    data
  })
}

export function dkryxx (SettingData) {
  let url = 'api/yq/dkryxx'
  let data = SettingData

  return Axios ({
    url,
    data
  })
}

export function dkqkList (SettingData) {
  let url = 'api/yq/dkqkList'
  let data = SettingData

  return Axios({
    url,
    data
  })
}

export function dkjlsh (SettingData) {
  let url = 'api/yq/dkjlsh'
  let data = SettingData

  return Axios({
    url,
    data
  })
}

export function dkjlshall (SettingData) {
  let url = 'api/yq/dkjlshall'
  let data = SettingData

  return Axios({
    url,
    data
  })
}

export function wdtkjltj (SettingData) {
  let url = 'api/yq/wdtkjltj'
  let data = SettingData

  return Axios({
    url,
    data
  })
}

export function bjjrdktj (SettingData) {
  let url = 'api/yq/bjjrdktj'
  let data = SettingData

  return Axios({
    url,
    data
  })
}

export function bjlsdktj (SettingData) {
  let url = 'api/yq/bjlsdktj'
  let data = SettingData

  return Axios({
    url,
    data
  })
}

export function dktjxx (SettingData) {
  let url = 'api/yq/dktjxx'
  let data = SettingData

  return Axios({
    url,
    data
  })
}

export function dkjcbd (SettingData) {
  let url = 'api/yq/dkjcbd'
  let data = SettingData

  return Axios({
    url,
    data
  })
}


export function haswjimg (SettingData) {
  let url = 'api/yq/haswjimg'
  let data = SettingData

  return Axios({
    url,
    data
  })
}


export function getCertAgain (SettingData) {
  let url = 'api/zx/getCertAgain'
  let data = SettingData

  return Axios({
    url,
    data
  })
}


export function getWdzjz (SettingData) {
  let url = 'api/yq/wdzjz'
  let data = SettingData

  return Axios({
    url,
    data
  })
}

export function bjjrdkList (SettingData) {
  let url = 'api/yq/bjjrdkList'
  let data = SettingData

  return Axios({
    url,
    data
  })
}

export function kzsb (SettingData) {
  let url = 'api/yq/kzsb'
  let data = SettingData

  return Axios({
    url,
    data
  })
}


export function zqjgList (SettingData) {
  let url = 'api/yq/zqjgList'
  let data = SettingData

  return Axios({
    url,
    data
  })
}

export function ydxxList () {
  let url =  `api/yq/ydxxList`
  return Axios({
    url,
    config:{method:'get'}
  })
}

export function kzewm (SettingData) {
  let url = 'api/yq/kzewm'
  let data = SettingData

  return Axios({
    url,
    data
  })
}

export function kzzjhx (SettingData) {
  let url = 'api/yq/kzzjhx'
  let data = SettingData

  return Axios({
    url,
    data
  })
}

export function gthkzewm (SettingData) {
  let url = 'api/yq/gthkzewm'
  let data = SettingData

  return Axios({
    url,
    data
  })
}

export function gthkzzjhx (SettingData) {
  let url = 'api/yq/gthkzzjhx'
  let data = SettingData

  return Axios({
    url,
    data
  })
}

export function gthkzewmbyid (SettingData) {
  let url = 'api/yq/gthkzewmbyid'
  let data = SettingData

  return Axios({
    url,
    data
  })
}

//党员报道
export function dybd (SettingData) {
  let url = 'api/PartyBuilding/dybd'
  let data = SettingData

  return Axios({
    url,
    data
  })
}

//党员报道
export function dybdInit () {
  let url = 'api/PartyBuilding/dybdInit'

  return Axios({
    url
  })
}

//党员报道详细
export function dybdxx (SettingData) {
  let url = 'api/PartyBuilding/dybdxx'
  let data = SettingData

  return Axios({
    url,
    data
  })
}

//党员报道详细
export function cwwjFzsz (SettingData) {
  let url = 'cwwj/yjhd/Fzsz'
  let data = SettingData

  return Axios({
    url,
    data
  })
}

