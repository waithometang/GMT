import Vue from 'vue'
import Router from 'vue-router'
import store from '@/store'

// 测试路由
// const text = resolve => require(['@/pages/text'], resolve)
// 一级页面
const index = resolve => require(['@/pages/index_v6'], resolve)
const AreaSelection = resolve => require(['@/pages/AreaSelection'], resolve)
const AreaSelection2 = resolve => require(['@/pages/AreaSelection2'], resolve)
const indexHome = resolve => require(['@/pages/indexHome'], resolve)
const viewMore = resolve => require(['@/pages/viewMore'], resolve)
const pushParticulars = resolve => require(['@/pages/pushParticulars'], resolve)
const systemHelp = resolve => require(['@/pages/systemHelp'], resolve)
const systemHelpDetail = resolve =>
  require(['@/pages/systemHelpDetail'], resolve)
// 首页二级页面
const villageDirectConnection = resolve =>
  require([
    '@/pages/secondLevelPages/homePage/villageDirectConnection/villageDirectConnection'
  ], resolve)
const LeagueMemberdy = resolve =>
  require([
    '@/pages/secondLevelPages/homePage/villageDirectConnection/LeagueMember-dy'
  ], resolve)
const elementdy = resolve =>
  require([
    '@/pages/secondLevelPages/homePage/villageDirectConnection/element-dy'
  ], resolve)
const VillageRegulations = resolve =>
  require(['@/pages/secondLevelPages/homePage/VillageRegulations'], resolve)
const CommitteeMembers = resolve =>
  require([
    '@/pages/secondLevelPages/homePage/committeeMembers/committeeMembers'
  ], resolve)
const ListPages = resolve =>
  require(['@/pages/secondLevelPages/homePage/ListPages'], resolve)
const NotificationList = resolve =>
  require([
    '@/pages/secondLevelPages/homePage/NotificationAnnouncement/NotificationList'
  ], resolve)
const NotificationParticulars = resolve =>
  require([
    '@/pages/secondLevelPages/homePage/NotificationAnnouncement/NotificationParticulars'
  ], resolve)
const CommonPublishDetail = resolve =>
  require(['@/pages/secondLevelPages/CommonPublishDetail'], resolve)
const onlineAppointment = resolve =>
  require([
    '@/pages/secondLevelPages/homePage/onlineAppointment/onlineAppointment'
  ], resolve)
const deliberativeDemocracy = resolve =>
  require([
    '@/pages/secondLevelPages/homePage/deliberativeDemocracy/deliberativeDemocracy'
  ], resolve)
const deliberativeDemocracyDetails = resolve =>
  require([
    '@/pages/secondLevelPages/homePage/deliberativeDemocracy/deliberativeDemocracyDetails'
  ], resolve)
const recentNewsList = resolve =>
  require(['@/pages/secondLevelPages/homePage/recentNewsList'], resolve)
const FinancePublic = resolve =>
  require([
    '@/pages/secondLevelPages/homePage/trigeminy/FinancePublic'
  ], resolve)
const Funded = resolve =>
  require(['@/pages/secondLevelPages/homePage/trigeminy/Funded'], resolve)
const PovertyRelief = resolve =>
  require([
    '@/pages/secondLevelPages/homePage/trigeminy/PovertyRelief'
  ], resolve)
const Announcement = resolve =>
  require(['@/pages/secondLevelPages/homePage/trigeminy/Announcement'], resolve)
const examine = resolve =>
  require(['@/pages/secondLevelPages/homePage/trigeminy/examine'], resolve)
const particular = resolve =>
  require(['@/pages/secondLevelPages/homePage/trigeminy/particular'], resolve)
const ZbggContent = resolve =>
  require(['@/pages/secondLevelPages/homePage/trigeminy/ZbggContent'], resolve)
const VillageSupervision = resolve =>
  require(['@/pages/secondLevelPages/homePage/VillageSupervision'], resolve)
const TenderAnnouncement = resolve =>
  require(['@/pages/secondLevelPages/homePage/TenderAnnouncement'], resolve)
const TenderDetail = resolve =>
  require(['@/pages/secondLevelPages/homePage/TenderDetail'], resolve)
const AdvancedModelList = resolve =>
  require([
    '@/pages/secondLevelPages/party/AdvancedModel/AdvancedModelList'
  ], resolve)
const PublicService = resolve =>
  require(['@/components/FirstLevelPage/PublicService'], resolve)
const SelectCity = resolve =>
  require(['@/components/FirstLevelPage/SelectCity'], resolve)
const red_blackboard = resolve =>
  require(['@/components/secondLevelPages/party/red_blackboard'], resolve)
const Search_job = resolve => require(['@/components/Search_job'], resolve)
const ExternalLinks = resolve =>
  require(['@/pages/secondLevelPages/homePage/ExternalLinks'], resolve)
const memberListDetails = resolve =>
  require(['@/pages/secondLevelPages/memberListDetails'], resolve)
const Like = resolve =>
  require(['@/pages/secondLevelPages/homePage/Like/Like'], resolve)
const likeParticulars = resolve =>
  require(['@/pages/secondLevelPages/homePage/Like/likeParticulars'], resolve)
const yqbbsm = resolve =>
  require(['@/pages/secondLevelPages/cunjutong/yqbbsm'], resolve)
const yqbb = resolve =>
  require(['@/pages/secondLevelPages/cunjutong/yqbb'], resolve)
const yqbbxx = resolve =>
  require(['@/pages/secondLevelPages/cunjutong/yqbbxx'], resolve)
const yqfkzl = resolve =>
  require(['@/pages/secondLevelPages/cunjutong/yqfkzl'], resolve)
const fgtb = resolve =>
  require(['@/pages/secondLevelPages/cunjutong/fgtb'], resolve)
const cxjljc = resolve =>
  require(['@/pages/secondLevelPages/cunjutong/cxjljc'], resolve)

//党建二级页面
const ConditionIntro = resolve =>
  require([
    '@/pages/secondLevelPages/party/ConditionIntro/ConditionIntro'
  ], resolve)
const BranchPartyMember = resolve =>
  require([
    '@/pages/secondLevelPages/party/BranchPartyMember/BranchPartyMember'
  ], resolve)
const BranchPartyMemberDetails = resolve =>
  require([
    '@/pages/secondLevelPages/party/BranchPartyMember/BranchPartyMemberDetails_v1'
  ], resolve)
const NewestPracticalDetails = resolve =>
  require([
    '@/pages/secondLevelPages/party/NewestPractical/NewestPractical'
  ], resolve)
const Login = resolve =>
  require(['@/pages/secondLevelPages/party/partyMemberLogin/Login'], resolve)
const partyIssueList = resolve =>
  require([
    '@/pages/secondLevelPages/party/partyIssueList/partyIssueList'
  ], resolve)
const PartyProfile = resolve =>
  require([
    '@/pages/secondLevelPages/party/PartyProfile/PartyProfile-pages_v2'
  ], resolve)
const partyIssueListDetails = resolve =>
  require([
    '@/pages/secondLevelPages/party/partyIssueList/partyIssueListDetails'
  ], resolve)
const PartyDayList = resolve =>
  require([
    '@/pages/secondLevelPages/party/partyIssueList/PartyDayList'
  ], resolve)
const partymember = resolve =>
  require([
    '@/pages/secondLevelPages/party/partyIssueList/partymember'
  ], resolve)
const partyStudy = resolve =>
  require(['@/pages/secondLevelPages/party/partyStudy/partyStudy'], resolve)
const partyintegral = resolve =>
  require([
    '@/pages/secondLevelPages/party/partyintegral/partyintegral'
  ], resolve)
const ThemeEducation = resolve =>
  require([
    '@/pages/secondLevelPages/party/ThemeEducation/ThemeEducation'
  ], resolve)

// 乡村振兴二级页面
const agricultureDetails = resolve =>
  require([
    '@/pages/secondLevelPages/ruralRevitalization/agriculture110/agricultureDetails'
  ], resolve)
// const Agriculture_v1 = resolve => require(['@/pages/secondLevelPages/ruralRevitalization/agriculture110/agriculture_v1'], resolve)
const Agriculture_v2 = resolve =>
  require([
    '@/pages/secondLevelPages/ruralRevitalization/agriculture110/agriculture_v2'
  ], resolve)
const Qjfb_Tag = resolve =>
  require(['@/pages/secondLevelPages/homePage/Qjfb_Tag.vue'], resolve)
// const Agriculture = resolve => require(['@/pages/secondLevelPages/ruralRevitalization/agriculture110/agriculture'], resolve)
const AgricultureSubsidy = resolve =>
  require([
    '@/pages/secondLevelPages/ruralRevitalization/agricultureSubsidy/agricultureSubsidy'
  ], resolve)
const agricultureSubsidyApplication = resolve =>
  require([
    '@/pages/secondLevelPages/ruralRevitalization/agricultureSubsidy/agricultureSubsidy-Application'
  ], resolve)
const RuralTourism = resolve =>
  require([
    '@/pages/secondLevelPages/ruralRevitalization/ruralTourism/ruralTourism'
  ], resolve)
const touristAttractions = resolve =>
  require([
    '@/pages/secondLevelPages/ruralRevitalization/ruralTourism/touristAttractions'
  ], resolve)
const randomlySnapPicture = resolve =>
  require([
    '@/pages/secondLevelPages/ruralRevitalization/randomlySnapPicture/randomlySnapPicture'
  ], resolve)
const evaluate = resolve =>
  require([
    '@/pages/secondLevelPages/ruralRevitalization/randomlySnapPicture/evaluate'
  ], resolve)
const randomlySnapPictureParticulars = resolve =>
  require([
    '@/pages/secondLevelPages/ruralRevitalization/randomlySnapPicture/randomlySnapPictureParticulars'
  ], resolve)
const HousingManagement = resolve =>
  require([
    '@/pages/secondLevelPages/ruralRevitalization/HousingManagement/HousingManagement'
  ], resolve)
const revolutionDistrict = resolve =>
  require([
    '@/pages/secondLevelPages/ruralRevitalization/revolutionDistrict/revolutionDistrict'
  ], resolve)
const revolutionDistrictparticulars = resolve =>
  require([
    '@/pages/secondLevelPages/ruralRevitalization/revolutionDistrict/revolutionDistrictparticulars'
  ], resolve)
const HonorRoll = resolve =>
  require([
    '@/pages/secondLevelPages/ruralRevitalization/HonorRoll/HonorRoll'
  ], resolve)
const refuseSorting = resolve =>
  require([
    '@/pages/secondLevelPages/ruralRevitalization/refuseSorting/refuseSorting'
  ], resolve)
const publishList = resolve =>
  require([
    '@/pages/secondLevelPages/ruralRevitalization/ruralRevitalizationPublish/publishList'
  ], resolve)
const publishListDetails = resolve =>
  require([
    '@/pages/secondLevelPages/ruralRevitalization/ruralRevitalizationPublish/publishListDetails'
  ], resolve)

// 平安建设 页面路由
const rentOutApplication = resolve =>
  require([
    '@/pages/secondLevelPages/SafeConstruction/rentOutApplication/rentOutApplication'
  ], resolve)
const brainpowerGridding = resolve =>
  require([
    '@/pages/secondLevelPages/SafeConstruction/brainpowerGridding/brainpowerGridding'
  ], resolve)
const publicSecurity = resolve =>
  require([
    '@/pages/secondLevelPages/SafeConstruction/publicSecurity/publicSecurity'
  ], resolve)

//个人中心二级页面
const Certification = resolve =>
  require(['@/pages/secondLevelPages/PersonalCenter/Certification'], resolve)
const amendphone = resolve =>
  require(['@/pages/secondLevelPages/PersonalCenter/amendphone'], resolve)
const personalPublished = resolve =>
  require(['@/pages/secondLevelPages/PersonalCenter/myPublished'], resolve)
const amendPersonalPublished = resolve =>
  require([
    '@/pages/secondLevelPages/PersonalCenter/amendPersonalPublished'
  ], resolve)
const submit = resolve =>
  require(['@/pages/secondLevelPages/PersonalCenter/submit'], resolve)
const SelectVillagers = resolve =>
  require(['@/pages/secondLevelPages/PersonalCenter/SelectVillagers'], resolve)
const likeCollect = resolve =>
  require(['@/pages/secondLevelPages/PersonalCenter/likeCollect'], resolve)
const enterpriseCertification = resolve =>
  require([
    '@/pages/secondLevelPages/PersonalCenter/enterpriseCertification'
  ], resolve)
const enterpriseReflect = resolve =>
  require([
    '@/pages/secondLevelPages/PersonalCenter/enterpriseReflect'
  ], resolve)
const systemFeedback = resolve =>
  require(['@/pages/secondLevelPages/personalCenter/systemFeedback'], resolve)
const CommonPublishList = resolve =>
  require(['@/pages/secondLevelPages/CommonPublishList'], resolve)

//0505新页面
const gbfy = resolve =>
  require(['@/pages/secondLevelPages/cunjutong/gbfy.vue'], resolve)
const cjds = resolve =>
  require(['@/pages/secondLevelPages/cunjutong/cjds.vue'], resolve)
const sbxs = resolve =>
  require(['@/pages/secondLevelPages/cunjutong/sbxs.vue'], resolve)
const gbx = resolve =>
  require(['@/pages/secondLevelPages/cunjutong/gbx.vue'], resolve)
const jdt = resolve =>
  require(['@/pages/secondLevelPages/cunjutong/jdt.vue'], resolve)

//三清三拆
const sqsc = resolve => require(['@/pages/sanqingsanchai/index'], resolve)
const xchs = resolve => require(['@/pages/xianchangheshi/index'], resolve)
const release = resolve => require(['@/pages/xianchangheshi/release'], resolve)
const xgrelease = resolve =>
  require(['@/pages/xianchangheshi/examineRelease'], resolve)
const zzphb = resolve => require(['@/pages/zzphb/zzphb'], resolve)
const rjhjzz = resolve => require(['@/pages/rjhjzz/rjhjzz'], resolve)

// 企业改版
const qyzp = resolve => require(['@/pages/woyaozhaopin/index'], resolve)
const qyzpxq = resolve => require(['@/pages/woyaozhaopin/particulars'], resolve)
const qyrz = resolve => require(['@/pages/qiyerenzheng/index'], resolve)
const qyrzForm = resolve =>
  require(['@/pages/qiyerenzheng/attestationFrom'], resolve)
const qyxc = resolve => require(['@/pages/qiyexuanchuan/index'], resolve)
const qyxcxq = resolve =>
  require(['@/pages/qiyexuanchuan/particulars'], resolve)
const qyxcxqxg = resolve =>
  require(['@/pages/qiyexuanchuan/modification'], resolve)
const zgz = resolve => require(['@/pages/zhaogongzuo/index'], resolve)

// 实名认证改版
const smrz = resolve => require(['@/pages/shimingrenzheng/index'], resolve)
const gwyrz = resolve => require(['@/pages/shimingrenzheng/gwyrz'], resolve)

//办事预约
const bsyyinit = resolve =>
  require(['@/pages/secondLevelPages/homePage/bsyy'], resolve)

// 改版
const zxdt = resolve => require(['@/pages/zuixindongtai/index'], resolve)
const pj = resolve => require(['@/pages/pingjia/index'], resolve)
const zxdtxq = resolve =>
  require(['@/pages/zuixindongtai/particulars'], resolve)

// 主题教育
const ztjy = resolve => require(['@/pages/zhutijiaoy/particulars'], resolve)

// 投票
const vote = resolve => require(['@/pages/vote/index'], resolve)
// 子路由
const homePage = resolve => require(['@/pages/vote/homePage'], resolve)
const particulars = resolve => require(['@/pages/vote/particulars'], resolve)
const ranking = resolve => require(['@/pages/vote/ranking'], resolve)
const voteParticlars = resolve =>
  require(['@/pages/vote/voteParticlars'], resolve)
const draw = resolve => require(['@/pages/vote/draw'], resolve)

//公益举报
const gyjb = resolve => require(['@/pages/report/index'], resolve)
const gyjbjg = resolve => require(['@/pages/report/consequence'], resolve)
// 妇女通
const fntIndex = resolve => require(['@/pages/FNT_index/index'], resolve)
const fntZzz = resolve => require(['@/pages/FNT_zzz/index'], resolve)
const fntZzzxx = resolve => require(['@/pages/FNT_zzz/particulars'], resolve)
const fntZhd = resolve => require(['@/pages/FNT_zhd/index'], resolve)
const fntZhdxq = resolve => require(['@/pages/FNT_zhd/particulars'], resolve)
const fntZhdbm = resolve => require(['@/pages/FNT_zhd/apply'], resolve)
const fntTtbm = resolve => require(['@/pages/FNT_zhd/group'], resolve)
const fntzzx = resolve => require(['@/pages/FNT_zzx/index'], resolve)
const fntzzxxq = resolve => require(['@/pages/FNT_zzx/particulars'], resolve)
const fntQd = resolve => require(['@/pages/fnt_qd/index'], resolve)
const fntQdxq = resolve => require(['@/pages/fnt_qd/particulars'], resolve)
const fntQdbm = resolve => require(['@/pages/fnt_qd/apply'], resolve)
const fntZbz = resolve => require(['@/pages/FNT_zbz/index'], resolve)
const fntZbzrl = resolve => require(['@/pages/FNT_zbz/wishClaim'], resolve)
const fntZbzsq = resolve => require(['@/pages/FNT_zbz/wishApply'], resolve)
const fntZbzsqxq = resolve =>
  require(['@/pages/FNT_zbz/wishParticulars'], resolve)
const fntapply = resolve => require(['@/pages/FNT_zbz/apply'], resolve)
const NewsDreams = resolve => require(['@/pages/FNT_zbz/NewsDreams'], resolve)
const fntxx = resolve => require(['@/pages/FNT_xx/index'], resolve)
const fntxxxq = resolve => require(['@/pages/FNT_xx/particulars'], resolve)
const fntxq = resolve => require(['@/pages/FNT_xq/index'], resolve)
const fntzczx = resolve => require(['@/pages/FNT_zczx/index'], resolve)
const fntxqbz = resolve => require(['@/pages/FNT_xqbz/index'], resolve)
const fntxqbzxx = resolve => require(['@/pages/FNT_xqbz/fntxqbzxx'], resolve)

// 数据统计
const sjtj = resolve => require(['@/pages/sjtj/sjtj'], resolve)
// const sjgk = resolve => require(['@/pages/sjtj/sjgk'], resolve)

// 竞猜
const jc = resolve => require(['@/pages/jingcai/jingcai'], resolve)

// 改版
const newIndex = resolve =>
  require(['@/pages/newEditionIndex/newEditionIndex'], resolve)
const hd = resolve => require(['@/pages/hd/hd'], resolve)
const wd = resolve => require(['@/pages/wd/wd'], resolve)
const gd = resolve => require(['@/pages/gd/gd'], resolve)
const hdxq = resolve => require(['@/pages/particulars/particulars'], resolve)

//疫情二维码
const ewm = resolve => require(['@/pages/ewm/index'], resolve)
const cxjl = resolve => require(['@/pages/cxjl/cxjl'], resolve)
const hcjlxq = resolve => require(['@/pages/hcjl/hcjlxq'], resolve)
const hcjl = resolve => require(['@/pages/hcjl/hcjl'], resolve)
const jcdj = resolve => require(['@/pages/jcdj/jcdj'], resolve)
const fgdj = resolve => require(['@/pages/fgdj/fgdj'], resolve)
const fgdjList = resolve => require(['@/pages/fgdj/fgdjList'], resolve)
const fgdjIndex = resolve => require(['@/pages/fgdj/fgdjIndex'], resolve)
const txewm = resolve => require(['@/pages/ewm/txewm'], resolve)
// const lqewm = resolve => require(['@/pages/ewm/lqewm'], resolve)
// const grewm = resolve => require(['@/pages/ewm/grewm'], resolve)
const wdzjz = resolve => require(['@/pages/ewm/wdzjz'], resolve)

// 疫情
const fgsb = resolve => require(['@/pages/fugongshenbao/fgsb'], resolve)
const fgsbList = resolve => require(['@/pages/fugongshenbao/fgsbList'], resolve)
const fgsbindex = resolve => require(['@/pages/fugongshenbao/index'], resolve)

//健康打卡
const jkdk = resolve => require(['@/pages/jkdk/jkdk'], resolve)
const dkxx = resolve => require(['@/pages/jkdk/dkxx'], resolve)
const wdbj = resolve => require(['@/pages/jkdk/wdbj'], resolve)
const bjxx = resolve => require(['@/pages/jkdk/bjxx'], resolve)
const xsxx = resolve => require(['@/pages/jkdk/xsxx'], resolve)
const xzcy = resolve => require(['@/pages/jkdk/xzcy'], resolve)
const dkjl = resolve => require(['@/pages/jkdk/dkjl'], resolve)
const dkxq = resolve => require(['@/pages/jkdk/dkxq'], resolve)

// 个体口罩申报
const gthkzsb = resolve => require(['@/pages/gthkzsb/gthkzsb'], resolve)
const sblist = resolve => require(['@/pages/gthkzsb/components/list'], resolve)
const sbfrom = resolve => require(['@/pages/gthkzsb/components/from'], resolve)

//停车优惠
const tcyh = resolve => require(['@/pages/tcyh/tcyh'], resolve)

//服务业专区
// const serve = resolve => require(['@/pages/serve_ewm/index'], resolve)
// const NewServe = resolve => require(['@/pages/serve_ewm/NewServe_ewm'], resolve)
// const Download_ewm = resolve => require(['@/pages/serve_ewm/Download_ewm'], resolve)
// const Record_ewm = resolve => require(['@/pages/serve_ewm/Record_ewm'], resolve)
// const RecorDetails_ewm = resolve => require(['@/pages/serve_ewm/RecorDetails_ewm'], resolve)
// const Register_ewm = resolve => require(['@/pages/serve_ewm/Register_ewm'], resolve)

//创文问卷调查
const questionnaire_index = resolve =>
  require(['@/pages/questionnaire/index'], resolve)
const questionnaire = resolve =>
  require(['@/pages/questionnaire/questionnaire'], resolve)
const questionnaire_rule = resolve =>
  require(['@/pages/questionnaire/questionnaire_rule'], resolve)
const questionnaire_theme = resolve =>
  require(['@/pages/questionnaire/questionnaire_theme'], resolve)
const questionnaire_issue = resolve =>
  require(['@/pages/questionnaire/questionnaire_issue'], resolve)
const questionnaire_lottery = resolve =>
  require(['@/pages/questionnaire/questionnaire_lottery'], resolve)
const questionnaire_Ranking = resolve =>
  require(['@/pages/questionnaire/questionnaire_Ranking'], resolve)
const questionnaire_receive = resolve =>
  require(['@/pages/questionnaire/questionnaire_receive'], resolve)

//党员报道
const PartyReport_index = resolve =>
  require(['@/pages/PartyReport/PartyReport_index'], resolve)
const PartyReport_message = resolve =>
  require(['@/pages/PartyReport/PartyReport_message'], resolve)
const PartyReport_record = resolve =>
  require(['@/pages/PartyReport/PartyReport_record'], resolve)

//社区活动
const PartyActivity_detail = resolve =>
  require(['@/pages/PartyActivity/PartyActivity_detail'], resolve)
const PartyActivity_gotoPic = resolve =>
  require(['@/pages/PartyActivity/PartyActivity_gotoPic'], resolve)

//大学报道
const dxs = resolve => require(['@/pages/dxs/dxs.vue'], resolve)
const dxsxxtx = resolve => require(['@/pages/dxs'], resolve)
//评论抽奖

const plcj = resolve => require(['@/pages/plcj/plcj'], resolve)
const ljtz = resolve => require(['@/pages/plcj/ljtz'], resolve)

Vue.use(Router)
let router = new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'rootindex',
      component: newIndex,
      redirect: '/index',
      meta: {
        title: '高明通',
        baseTab: true,
        baseTabState: 1,
        keepAlive: true,
        record: '高明通'
      }
    },
    {
      path: '/index',
      name: 'index',
      component: newIndex,
      meta: {
        title: '高明通',
        baseTab: true,
        baseTabState: 1,
        keepAlive: true,
        record: '高明通'
      }
    },
    //评论抽奖
    {
      path: '/plcj/:id',
      name: 'plcj',
      component: plcj,
      meta: {
        title: '评论抽奖',
        record: '评论抽奖'
      }
    },
    {
      path: '/ljtz/:id',
      name: 'ljtz',
      component: ljtz,
      meta: {
        title: '领奖通知',
        record: '领奖通知'
      }
    },
    // {
    //   path: '/text',
    //   name: 'text',
    //   component: text,
    //   meta: {
    //     title: '测试路由'
    //   }
    // },
    {
      path: '/systemHelp',
      name: 'systemHelp',
      component: systemHelp,
      meta: {
        title: '系统帮助',
        record: '系统帮助'
      }
    },
    {
      path: '/systemHelpDetail/:type', // 类型
      name: 'systemHelpDetail',
      component: systemHelpDetail,
      meta: {
        title: '系统帮助',
        record: '系统帮助'
      }
    },
    {
      path: '/pushParticulars/:id/:lx',
      name: 'pushParticulars',
      component: pushParticulars,
      meta: {
        title: '诉求反映',
        record: '诉求反映'
      }
    },
    {
      path: '/AreaSelection',
      name: 'AreaSelection',
      component: AreaSelection,
      meta: {
        title: '村居选择',
        record: '村居选择'
      }
    },
    {
      path: '/AreaSelection2',
      name: 'AreaSelection2',
      component: AreaSelection2,
      meta: {
        record: '村居选择',
        title: '村居选择'
      }
    },
    {
      path: '/indexHome/:type/:vid?',
      name: 'indexHome',
      component: indexHome
    },
    {
      path: '/viewMore/:vid?',
      name: 'viewMore',
      component: viewMore,
      meta: {
        title: '查看更多',
        record: '查看更多'
      }
    },
    // 首页二级页面
    {
      path: '/ListPages',
      name: 'ListPages',
      component: ListPages,
      meta: {
        title: '村情动态',
        record: '村情动态'
      }
    },
    {
      path: '/cjzl/:vid',
      name: 'villageDirectConnection',
      component: villageDirectConnection,
      meta: {
        title: '村居直联',
        record: '村居直联'
      }
    },
    {
      path: '/LeagueMemberdy',
      name: 'LeagueMemberdy',
      component: LeagueMemberdy,
      meta: {
        title: '村居直联代表',
        record: '村居直联代表'
      }
    },
    {
      path: '/elementdy',
      name: 'elementdy',
      component: elementdy,
      meta: {
        title: '村居直联日志',
        record: '村居直联日志'
      }
    },
    {
      path: '/lwcys/:vid',
      name: 'CommitteeMembers',
      component: CommitteeMembers,
      meta: {
        title: '两委成员',
        record: '两委成员'
      }
    },
    {
      path: '/cjgk/:type/:vid',
      name: 'VillageRegulations',
      component: VillageRegulations,
      meta: {
        title: '' // 村居概况
      }
    },
    {
      path: '/nrfb/:id/:vid?',
      name: 'CommonPublishList',
      component: CommonPublishList,
      meta: {
        title: '' // 通用发布列表
      }
    },
    {
      path: '/nrfbxx/:mkid/:id',
      name: 'CommonPublishDetail',
      component: CommonPublishDetail,
      meta: {
        title: '' // 详情
      }
    },
    {
      path: '/tzgg_list/:mk',
      name: 'NotificationList',
      component: NotificationList,
      meta: {
        title: '通知公告',
        record: '通知公告'
      }
    },
    {
      path: '/hhb/:vid',
      name: 'red_blackboard',
      component: red_blackboard,
      meta: {
        title: '红黑榜',
        record: '红黑榜'
      }
    },
    {
      path: '/Zgz/:type',
      name: 'Search_job',
      component: Search_job,
      meta: {
        record: '找工作',
        title: '找工作'
      }
    },
    {
      path: '/tzgg/:mk/:id',
      name: 'NotificationParticulars',
      component: NotificationParticulars,
      meta: {
        record: '通知公告',
        title: '通知公告' // 详情页面
      }
    },
    {
      path: '/onlineAppointment',
      name: 'onlineAppointment',
      component: onlineAppointment,
      meta: {
        record: '网上约办',
        title: '网上约办'
      }
    },
    {
      path: '/deliberativeDemocracy',
      name: 'deliberativeDemocracy',
      component: deliberativeDemocracy,
      meta: {
        record: '协商民主',
        title: '协商民主'
      }
    },
    {
      path: '/deliberativeDemocracyDetails',
      name: 'deliberativeDemocracyDetails',
      component: deliberativeDemocracyDetails,
      meta: {
        record: '协商民主',
        title: '协商民主' // 详情
      }
    },
    {
      path: '/recentNewsList',
      name: 'recentNewsList',
      component: recentNewsList,
      meta: {
        record: '最新动态',
        title: '最新动态'
      }
    },
    {
      path: '/TenderAnnouncement/:vid?',
      name: 'TenderAnnouncement',
      component: TenderAnnouncement,
      meta: {
        record: '招投标公告',
        title: '招投标公告',
        keepAlive: true
      }
    },
    {
      path: '/PublicService/:type',
      name: 'PublicService',
      component: PublicService,
      meta: {
        title: ''
      }
    },
    {
      path: '/Wblj/:type',
      name: 'ExternalLinks',
      component: ExternalLinks,
      meta: {
        title: '' // 缴费 坐车
      }
    },
    {
      path: '/memberListDetails/:statetype/:id', // statetype: 两委成员 = 1, 直联代表 = 2,党员 = 3 id: 成员id
      name: 'memberListDetails',
      component: memberListDetails,
      meta: {
        title: '' // <!-- 两位成员 直连代表 党员 详情 -->
      }
    },
    {
      path: '/SelectCity',
      name: 'SelectCity',
      component: SelectCity,
      meta: {
        record: '城市选择',
        title: '城市选择'
      }
    },
    {
      path: '/TenderDetail/:fid',
      name: 'TenderDetail',
      component: TenderDetail
    },
    // 党建二级页面路由
    {
      path: '/ConditionIntro/:type/:vid',
      name: 'ConditionIntro',
      component: ConditionIntro,
      meta: {
        record: '党建情况',
        title: '党建情况'
      }
    },
    {
      path: '/djgk/:vid',
      name: 'PartyProfile',
      component: PartyProfile,
      meta: {
        record: '党建情况',
        title: '党建概况'
      }
    },
    {
      path: '/BranchPartyMember/:vid',
      name: 'BranchPartyMember',
      component: BranchPartyMember,
      meta: {
        record: '党员信息',
        title: '党员信息'
      }
    },
    // {
    //   path: '/dyjf/:vid',
    //   name: 'partyintegral',
    //   component: partyintegral,
    //   meta: {
    //     title: '党员实事',
    //   }
    // },
    {
      path: '/BranchPartyMemberDetails',
      name: 'BranchPartyMemberDetails',
      component: BranchPartyMemberDetails,
      meta: {
        record: '支部党员',
        title: '支部党员' // 详情
      }
    },
    {
      path: '/zxss/:vid',
      name: 'NewestPracticalDetails',
      component: NewestPracticalDetails,
      meta: {
        record: '最新实事',
        title: '最新实事'
      }
    },
    {
      path: '/Login',
      name: 'Login',
      component: Login,
      meta: {
        record: '党员登陆',
        title: '党员登陆'
      }
    },
    {
      path: '/partyStudy/:publishType/:vid',
      name: 'partyStudy',
      component: partyStudy,
      meta: {
        record: '党员学习',
        title: '党员学习'
      }
    },
    {
      path: '/djfb/:publishType/:vid',
      name: 'partyIssueList',
      component: partyIssueList // 党建列表
    },
    {
      path: '/djfbxq/:publishType/:id',
      name: 'partyIssueListDetails',
      component: partyIssueListDetails,
      meta: {
        title: '' // 党建发布列表详情
      }
    },
    {
      path: '/ztdr/:id',
      name: 'PartyDayList',
      component: PartyDayList,
      meta: {
        record: '主题党日',
        title: '主题党日' // 主题党日列表详情
      }
    },
    {
      path: '/zbdy/:id',
      name: 'partymember',
      component: partymember,
      meta: {
        record: '支部党员',
        title: '支部党员' // 主题党日列表详情
      }
    },
    {
      path: '/ztjy/:publishType/:vid',
      name: 'ThemeEducation',
      component: ThemeEducation,
      meta: {
        record: '主题教育',
        title: '主题教育' // 主题教育列表
      }
    },
    {
      path: '/AdvancedModelList/:vid',
      name: 'AdvancedModelList',
      component: AdvancedModelList,
      meta: {
        record: '动态播报',
        title: '动态播报'
      }
    },
    {
      path: '/Like',
      name: 'Like',
      component: Like,
      meta: {
        record: '点赞',
        title: '点赞'
      }
    },
    {
      path: '/likeParticulars/:mk/:id/:lx', // mk: 模块 lx: 类别
      name: 'likeParticulars',
      component: likeParticulars,
      meta: {
        title: '' // 点赞详情
      }
    },

    // 乡村振兴二级页面路由
    {
      path: '/Agriculture/:vid?',
      name: 'Agriculture_v2',
      component: Agriculture_v2,
      meta: {
        record: '技术指导',
        title: '技术指导'
      }
    },
    {
      path: '/qjfb_Tag/:mkid/:lxid/:tag',
      name: 'Qjfb_Tag',
      component: Qjfb_Tag // 区级发布---带标签
    },
    {
      path: '/jszdxq/:id',
      name: 'agricultureDetails',
      component: agricultureDetails,
      meta: {
        record: '技术指导',
        title: '技术指导' // 详情
      }
    },
    {
      path: '/AgricultureSubsidy/:vid?',
      name: 'AgricultureSubsidy',
      component: AgricultureSubsidy,
      meta: {
        record: '涉农补助',
        title: '涉农补助'
      }
    },
    {
      path: '/agricultureSubsidyApplication',
      name: 'agricultureSubsidyApplication',
      component: agricultureSubsidyApplication,
      meta: {
        record: '涉农补助申请',
        title: '涉农补助申请'
      }
    },
    {
      path: '/RuralTourism',
      name: 'RuralTourism',
      component: RuralTourism,
      meta: {
        record: '全域旅游',
        title: '全域旅游'
      }
    },
    {
      path: '/touristAttractions',
      name: 'touristAttractions',
      component: touristAttractions,
      meta: {
        record: '旅游景点',
        title: '旅游景点'
      }
    },
    {
      path: '/randomlySnapPicture/:state', // state: 1我的诉求 2我要诉求
      name: 'randomlySnapPicture',
      component: randomlySnapPicture,
      meta: {
        record: '我的反映',
        title: '我的反映'
      }
    },
    {
      path: '/randomlySnapPictureParticulars',
      name: 'randomlySnapPictureParticulars',
      component: randomlySnapPictureParticulars,
      meta: {
        record: '我的反映',
        title: '我的反映' // 详情
      }
    },
    {
      path: '/evaluate/:id',
      name: 'evaluate',
      component: evaluate,
      meta: {
        record: '我的反映',
        title: '我的反映'
      }
    },
    {
      path: '/HousingManagement',
      name: 'HousingManagement',
      component: HousingManagement,
      meta: {
        record: '建房管控',
        title: '建房管控'
      }
    },
    {
      path: '/revolutionDistrict',
      name: 'revolutionDistrict',
      component: revolutionDistrict,
      meta: {
        record: '革命老区',
        title: '革命老区'
      }
    },
    {
      path: '/revolutionDistrictparticulars',
      name: 'revolutionDistrictparticulars',
      component: revolutionDistrictparticulars,
      meta: {
        record: '革命老区',
        title: '革命老区' // 申请
      }
    },
    {
      path: '/HonorRoll',
      name: 'HonorRoll',
      component: HonorRoll,
      meta: {
        record: '红黑榜',
        title: '红黑榜'
      }
    },
    {
      path: '/refuseSorting',
      name: 'refuseSorting',
      component: refuseSorting,
      meta: {
        record: '垃圾分类',
        title: '垃圾分类'
      }
    },
    {
      path: '/xczxfb/:type', // 参数：发布类型：type: 0:垃圾分类，2：涉农政策，标题：titleData
      name: 'publishList',
      component: publishList,
      meta: {
        title: '' // 乡村振兴发布
      }
    },
    {
      path: '/xczxfbxq/:id',
      name: 'publishListDetails',
      component: publishListDetails,
      meta: {
        title: '' // 乡村振兴发布详情
      }
    },
    // 平安建设 页面路由
    {
      path: '/rentOutApplication',
      name: 'rentOutApplication',
      component: rentOutApplication,
      meta: {
        record: '出租申报',
        title: '出租申报'
      }
    },
    {
      path: '/brainpowerGridding',
      name: 'brainpowerGridding',
      component: brainpowerGridding,
      meta: {
        record: '智能网格',
        title: '智能网格'
      }
    },
    {
      path: '/publicSecurity',
      name: 'publicSecurity',
      component: publicSecurity,
      meta: {
        record: '群防群治',
        title: '群防群治'
      }
    },
    {
      path: '/FinancePublic',
      name: 'FinancePublic',
      component: FinancePublic,
      meta: {
        record: '财务公开',
        title: '财务公开'
      }
    },
    {
      path: '/Funded',
      name: 'Funded',
      component: Funded,
      meta: {
        record: '三资管理',
        title: '三资管理'
      }
    },
    {
      path: '/PovertyRelief',
      name: 'PovertyRelief',
      component: PovertyRelief,
      meta: {
        record: '惠农资金',
        title: '惠农资金'
      }
    },
    {
      path: '/Announcement',
      name: 'Announcement',
      component: Announcement,
      meta: {
        record: '公告',
        title: '公告'
      }
    },
    {
      path: '/examine',
      name: 'examine',
      component: examine,
      meta: {
        record: '查看',
        title: '查看'
      }
    },
    {
      path: '/particular',
      name: 'particular',
      component: particular,
      meta: {
        record: '详细',
        title: '详细'
      }
    },
    {
      path: '/ZbggContent',
      name: 'ZbggContent',
      component: ZbggContent,
      meta: {
        record: '公告内容',
        title: '公告内容'
      }
    },
    {
      path: '/VillageSupervision/:vid',
      name: 'VillageSupervision',
      component: VillageSupervision,
      meta: {
        record: '村务监督',
        title: '村务监督'
      }
    },
    // 个人中心二级页面路由
    {
      path: '/Certification',
      name: 'Certification',
      component: Certification,
      meta: {
        record: '实名认证',
        title: '实名认证',
        keepAlive: true
      }
    },
    {
      path: '/amendphone',
      name: 'amendphone',
      component: amendphone,
      meta: {
        record: '手机号码修改',
        title: '手机号码修改'
      }
    },
    {
      path: '/personalPublished/:vid?', // 村居id
      name: 'personalPublished',
      component: personalPublished,
      meta: {
        record: '我的发布',
        title: '我的发布'
      }
    },
    {
      path: '/amendPersonalPublished/:mkid/:id',
      name: 'amendPersonalPublished',
      component: amendPersonalPublished,
      meta: {
        record: '我的发布',
        title: '我的发布'
      }
    },
    {
      path: '/likeCollect/:state', // state 1:我的点赞 2:我的收藏,
      name: 'likeCollect',
      component: likeCollect,
      meta: {
        title: ''
      }
    },
    {
      path: '/enterpriseCertification/:state/:id?', // state 1: 认证 2: 查看认证信息, id: 认证id
      name: 'enterpriseCertification',
      component: enterpriseCertification,
      meta: {
        record: '企业认证',
        title: '企业认证'
      }
    },
    {
      path: '/systemFeedback',
      name: 'systemFeedback',
      component: systemFeedback,
      meta: {
        record: '系统反馈',
        title: '系统反馈'
      }
    },
    {
      path: '/enterpriseReflect/:state/:vid?', // state: 1:企业反映 2: 我要反映
      name: 'enterpriseReflect',
      component: enterpriseReflect,
      meta: {
        title: ''
      }
    },

    {
      path: '/submit',
      name: 'submit',
      component: submit,
      meta: {
        record: '提交成功',
        title: '提交成功'
      }
    },
    {
      path: '/SelectVillagers',
      name: 'SelectVillagers',
      component: SelectVillagers,
      meta: {
        record: '选择村民小组/经联社',
        title: '选择村民小组/经联社'
      }
    },
    {
      path: '/gbfy',
      name: 'gbfy',
      component: gbfy,
      meta: {
        record: '干部风魂',
        title: '干部风魂'
      }
    },
    {
      path: '/cjds',
      name: 'cjds',
      component: cjds,
      meta: {
        record: '村居大事',
        title: '村居大事'
      }
    },
    {
      path: '/sbxs',
      name: 'sbxs',
      component: sbxs,
      meta: {
        record: '身边小事',
        title: '身边小事'
      }
    },
    {
      path: '/gbx',
      name: 'gbx',
      component: gbx,
      meta: {
        record: '赶帮学',
        title: '赶帮学'
      }
    },
    {
      path: '/jdt',
      name: 'jdt',
      component: jdt,
      meta: {
        record: '监督台',
        title: '监督台'
      }
    },
    {
      path: '/sqsc/:vid?',
      name: 'sqsc',
      component: sqsc,
      meta: {
        record: '人居环境整治',
        title: '人居环境整治'
      }
    },
    {
      path: '/xchs/:fblxid/:vid',
      name: 'xchs',
      component: xchs,
      meta: {
        record: '现场核实',
        title: '现场核实'
      }
    },
    {
      path: '/release/:releaseState?', // 发布状态
      name: 'release',
      component: release,
      meta: {
        title: ''
      }
    },
    {
      path: '/xgrelease/:mkid/:id',
      name: 'xgrelease',
      component: xgrelease,
      meta: {
        record: '修改发布',
        title: '修改发布'
      }
    },
    {
      path: '/zzphb',
      name: 'zzphb',
      component: zzphb,
      meta: {
        record: '整治排行榜',
        title: '整治排行榜'
      }
    },
    {
      path: '/rjhjzz/:fblxid/:vid',
      name: 'rjhjzz',
      component: rjhjzz,
      meta: {
        record: '人居环境整治',
        title: '人居环境整治'
      }
    },
    {
      path: '/qyzp',
      name: 'qyzp',
      component: qyzp,
      meta: {
        record: '企业招聘',
        title: '企业招聘'
      }
    },
    {
      path: '/qyzpxq/:id',
      name: 'qyzpxq',
      component: qyzpxq,
      meta: {
        record: '企业招聘',
        title: '企业招聘'
      }
    },
    {
      path: '/qyrz/:type?',
      name: 'qyrz',
      component: qyrz,
      meta: {
        record: '企业认证',
        title: '企业认证'
      }
    },
    {
      path: '/qyrzForm/:id?/:type?',
      name: 'qyrzForm',
      component: qyrzForm,
      meta: {
        record: '企业认证',
        title: '企业认证'
      }
    },
    {
      path: '/qyxc',
      name: 'qyxc',
      component: qyxc,
      meta: {
        record: '企业宣传',
        title: '企业宣传'
      }
    },
    {
      path: '/qyxcxqxg/:id',
      name: 'qyxcxqxg',
      component: qyxcxqxg,
      meta: {
        record: '企业宣传',
        title: '企业宣传'
      }
    },
    {
      path: '/qyxcxq/:id',
      name: 'qyxcxq',
      component: qyxcxq,
      meta: {
        record: '企业宣传',
        title: '企业宣传'
      }
    },
    {
      path: '/qylb/:id',
      name: 'qylb',
      component: resolve => require(['@/pages/qiyerenzheng/qytab'], resolve),
      meta: {
        record: '高明厚实',
        title: '高明厚实'
      }
    },
    {
      path: '/qyewmxq',
      name: 'qyewmxq',
      component: resolve => require(['@/pages/qiyerenzheng/components/qyewmxq'], resolve),
      meta: {
        record: '企业二维码',
        title: '企业二维码'
      }
    },
    {
      path: '/qyymdj',
      name: 'qyymdj',
      component: resolve => require(['@/pages/qiyerenzheng/qyymdj'], resolve),
      meta: {
        record: '企业疫苗接种人员登记',
        title: '企业疫苗接种人员登记'
      }
    },
    {
      path: '/ymyy',
      name: 'ymyy',
      component: resolve => require(['@/pages/qiyerenzheng/ymyy'], resolve),
      meta: {
        record: '疫苗预约',
        title: '疫苗预约'
      }
    },
    {
      path: '/ymyytc/',
      name: 'ymyytc',
      component: resolve => require(['@/pages/qiyerenzheng/ymyytc'], resolve),
      meta: {
        record: '疫苗预约',
        title: '疫苗预约'
      }
    },
    {
      path: '/ymdj',
      name: 'ymdj',
      component: resolve => require(['@/pages/qiyerenzheng/ymdj'], resolve),
      meta: {
        record: '疫苗接种登记',
        title: '疫苗接种登记'
      }
    },
    {
      path: '/xzgz',
      name: 'zgz',
      component: zgz,
      meta: {
        record: '找工作',
        title: '找工作'
      }
    },
    {
      path: '/smrz',
      name: 'smrz',
      component: smrz,
      meta: {
        record: '实名认证',
        title: '实名认证'
      }
    },
    {
      path: '/gwyrz',
      name: 'gwyrz',
      component: gwyrz,
      meta: {
        record: '公务员认证',
        title: '公务员认证'
      }
    },
    {
      path: '/zxdt',
      name: 'zxdt',
      component: zxdt,
      meta: {
        record: '最新动态',
        title: '最新动态'
      }
    },
    {
      path: '/pj/:id/:dzs/:cps/:yds/:pls',
      name: 'pj',
      component: pj,
      meta: {
        record: '评价',
        title: '评价'
      }
    },
    {
      path: '/zxdtxq/:id',
      name: 'zxdtxq',
      component: zxdtxq,
      meta: {
        record: '群众反映',
        title: '群众反映'
      }
    },
    {
      path: '/yqfkzl',
      name: 'yqfkzl',
      component: yqfkzl,
      meta: {
        record: '高明战疫',
        title: '高明战疫'
      }
    },
    {
      path: '/fgtb',
      name: 'fgtb',
      component: fgtb,
      meta: {
        record: '复工填报',
        title: '复工填报'
      }
    },
    {
      path: '/cxjljc',
      name: 'cxjljc',
      component: cxjljc,
      meta: {
        title: ''
      }
    },
    {
      path: '/yqbbsm',
      name: 'yqbbsm',
      component: yqbbsm,
      meta: {
        record: '疫情报备',
        title: '疫情报备'
      }
    },
    {
      path: '/yqbb',
      name: 'yqbb',
      component: yqbb,
      meta: {
        record: '疫情报备',
        title: '疫情报备'
      }
    },
    {
      path: '/yqbbxx/:id',
      name: 'yqbbxx',
      component: yqbbxx,
      meta: {
        record: '详情',
        title: '详情'
      }
    },
    {
      path: '/ztjy',
      name: 'ztjy',
      component: ztjy,
      meta: {
        record: '最新动态',
        title: '最新动态'
      }
    },
    {
      path: '/vote',
      component: vote,
      children: [
        {
          path: '/',
          name: 'homePage',
          component: homePage,
          meta: {
            record: '投票活动',
            title: '投票活动',
            keepAlive: true
          }
        },
        {
          path: '/particulars',
          name: 'particulars',
          component: particulars,
          meta: {
            record: '投票活动',
            title: '投票活动',
            keepAlive: true
          }
        },
        {
          path: '/ranking',
          name: 'ranking',
          component: ranking,
          meta: {
            record: '投票活动',
            title: '投票活动',
            keepAlive: true
          }
        },
        {
          path: '/voteParticlars/:id',
          name: 'voteParticlars',
          component: voteParticlars,
          meta: {
            record: '投票活动',
            title: '投票活动'
          }
        }
      ]
    },
    {
      path: '/draw/:id/:hdid?',
      name: 'draw',
      component: draw
    },
    {
      path: '/gyjb',
      name: 'gyjb',
      component: gyjb,
      meta: {
        record: '公益投诉举报',
        title: '公益投诉举报'
      }
    },
    {
      path: '/gyjbjg/:start',
      name: 'gyjbjg',
      component: gyjbjg,
      meta: {
        record: '投诉举报结果',
        title: '投诉举报结果'
      }
    },
    {
      path: '/fntIndex',
      name: 'fntIndex',
      component: fntIndex,
      meta: {
        record: '妇女之家',
        title: '妇女之家'
      }
    },
    {
      path: '/fntZzz',
      name: 'fntZzz',
      component: fntZzz,
      meta: {
        record: '找组织',
        title: '找组织'
      }
    },
    {
      path: '/fntZzzxx/:id/:type',
      name: 'fntZzzxx',
      component: fntZzzxx,
      meta: {
        title: ''
      }
    },
    {
      path: '/fntZhd',
      name: 'fntZhd',
      component: fntZhd,
      meta: {
        record: '找活动',
        titleL: '找活动'
      }
    },
    {
      path: '/fntZhdxq/:id',
      name: 'fntZhdxq',
      component: fntZhdxq,
      meta: {
        record: '找活动',
        title: '找活动'
      }
    },
    {
      path: '/fntZhdbm/:id/:isduble',
      name: 'fntZhdbm',
      component: fntZhdbm,
      meta: {
        record: '我要报名',
        title: '我要报名'
      }
    },
    {
      path: '/fntTtbm/:id',
      name: 'fntTtbm',
      component: fntTtbm,
      meta: {
        record: '团体报名',
        title: '团体报名'
      }
    },
    {
      path: '/fntzzx',
      name: 'fntzzx',
      component: fntzzx,
      meta: {
        record: '找咨询',
        title: '找咨询'
      }
    },
    {
      path: '/fntzzxxq/:id/:state?',
      name: 'fntzzxxq',
      component: fntzzxxq,
      meta: {}
    },
    {
      path: '/fntQd',
      name: 'fntQd',
      component: fntQd,
      meta: {
        record: '专题签到',
        title: '专题签到'
      }
    },
    {
      path: '/fntQdxq/:id',
      name: 'fntQdxq',
      component: fntQdxq,
      meta: {
        record: '专题签到',
        title: '专题签到'
      }
    },
    {
      path: '/fntQdbm/:id',
      name: 'fntQdbm',
      component: fntQdbm,
      meta: {
        record: '专题签到',
        title: '专题签到'
      }
    },
    {
      path: '/bsyyinit',
      name: 'bsyyinit',
      component: bsyyinit,
      meta: {
        record: '办事预约',
        title: '办事预约'
      }
    },
    {
      path: '/fntZbz',
      name: 'fntZbz',
      component: fntZbz,
      meta: {
        record: '找帮助',
        title: '找帮助'
      }
    },
    {
      path: '/fntZbzrl',
      name: 'fntZbzrl',
      component: fntZbzrl,
      meta: {
        record: '微心愿认领',
        title: '微心愿认领'
      }
    },
    {
      path: '/fntZbzsq',
      name: 'fntZbzsq',
      component: fntZbzsq,
      meta: {
        record: '微心愿申请',
        title: '微心愿申请'
      }
    },
    {
      path: '/fntZbzsqxq/:id/:isme',
      name: 'fntZbzsqxq',
      component: fntZbzsqxq,
      meta: {
        record: '微心愿详情',
        title: '微心愿详情'
      }
    },
    {
      path: '/fntapply/:id',
      name: 'fntapply',
      component: fntapply,
      meta: {
        record: '我要认领',
        title: '我要认领'
      }
    },
    {
      path: '/NewsDreams',
      name: 'NewsDreams',
      component: NewsDreams,
      meta: {
        record: '最新认领',
        title: '最新认领'
      }
    },
    {
      path: '/fntxx',
      name: 'fntxx',
      component: fntxx,
      meta: {
        record: '主席信箱',
        title: '主席信箱'
      }
    },
    {
      path: '/fntxxxq/:id/:bottonType',
      name: 'fntxxxq',
      component: fntxxxq,
      meta: {
        record: '主席信箱',
        title: '主席信箱'
      }
    },
    {
      path: '/fntxq/:id/:lx?',
      name: 'fntxq',
      component: fntxq,
      meta: {
        record: '政策资讯',
        title: '政策资讯'
      }
    },
    {
      path: '/fntzczx',
      name: 'fntzczx',
      component: fntzczx,
      meta: {
        record: '政策资讯',
        title: '政策资讯'
      }
    },
    {
      path: '/fntxqbz',
      name: 'fntxqbz',
      component: fntxqbz,
      meta: {
        record: '疫情下特殊群体的需求',
        title: '疫情下特殊群体的需求'
      }
    },
    {
      path: '/fntxqbzxx/:id',
      name: 'fntxqbzxx',
      component: fntxqbzxx,
      meta: {
        record: '申请详细',
        title: '申请详细'
      }
    },
    {
      path: '/fntzxdt/:t?',
      component: resolve => require(['@/pages/FNT_xx/zxdt'], resolve),
      meta: {
        record: '最新动态',
        title: '最新动态'
      }
    },
    {
      path: '/sjtj',
      name: 'sjtj',
      component: sjtj,
      meta: {
        record: '数据统计',
        title: '数据统计'
      }
    },
    // {
    //   path: '/sjgk',
    //   name: 'sjgk',
    //   component: sjgk,
    //   meta: {
    //     title: '数据概况'
    //   }
    // },
    {
      path: '/jc',
      name: 'jc',
      component: jc,
      meta: {
        record: '竞猜',
        title: '竞猜'
      }
    },
    {
      path: '/newIndex',
      name: 'newIndex',
      component: newIndex,
      meta: {
        title: '高明通',
        baseTab: true,
        record: '高明通',
        baseTabState: 1
      }
    },
    {
      path: '/hd',
      name: 'hd',
      component: hd,
      meta: {
        title: '互动',
        baseTab: true,
        record: '互动',
        baseTabState: 2
      }
    },
    {
      path: '/gd',
      name: 'gd',
      component: gd,
      meta: {
        title: '更多',
        baseTab: true,
        record: '更多',
        baseTabState: 3
      }
    },
    {
      path: '/wd',
      name: 'wd',
      component: wd,
      meta: {
        title: '我的',
        record: '我的',
        baseTab: true,
        baseTabState: 4
      }
    },
    {
      path: '/hdxq/:mkid',
      name: 'hdxq',
      component: hdxq,
      meta: {
        title: ''
      }
    },
    {
      path: '/ewm',
      name: 'ewm',
      component: ewm,
      meta: {
        record: '获取电子通行证',
        title: ' 获取电子通行证'
      }
    },
    {
      path: '/txewm',
      name: 'txewm',
      component: txewm,
      meta: {
        record: '粤康码',
        title: '粤康码'
      }
    },
    // {
    //   path: '/lqewm/:flag?',
    //   name: 'lqewm',
    //   component: lqewm,
    //   meta: {
    //     title: '领取口罩二维码'
    //   }
    // },
    // {
    //   path: '/grewm/:flag?',
    //   name: 'grewm',
    //   component: grewm,
    //   meta: {
    //     title: '个体工商户口罩申购二维码'
    //   }
    // },
    {
      path: '/wdzjz',
      name: 'wdzjz',
      component: wdzjz,
      meta: {
        record: '我的证件照',
        title: '我的证件照'
      }
    },
    {
      path: '/fgsbindex',
      name: 'fgsbindex',
      component: fgsbindex,
      meta: {
        record: '企业口罩申购',
        title: '企业口罩申购'
      },
      children: [
        {
          path: '/',
          name: 'fgsb',
          component: fgsb
        },
        {
          path: '/fgsbList',
          name: 'fgsbList',
          component: fgsbList,
          meta: {
            record: '企业口罩申购',
            title: '企业口罩申购'
          }
        }
      ]
    },
    {
      path: '/fgsbxx/:id',
      name: 'fgsb',
      component: fgsb,
      meta: {
        record: '企业口罩申购',
        title: '企业口罩申购'
      }
    },
    {
      path: '/cxjl',
      name: 'cxjl',
      component: cxjl,
      meta: {
        record: '我的出行',
        title: '我的出行'
      }
    },
    {
      path: '/hcjl',
      name: 'hcjl',
      component: hcjl,
      meta: {
        record: '核查记录',
        title: '核查记录'
      }
    },
    {
      path: '/hcjlxq/:rq',
      name: 'hcjlxq',
      component: hcjlxq,
      meta: {
        record: '我的核查',
        title: '我的核查'
      }
    },
    {
      path: '/jcdj/:flag?',
      name: 'jcdj',
      component: jcdj,
      meta: {
        record: '检查登记',
        title: '检查登记'
      }
    },
    {
      path: '/fgdj',
      name: 'fgdj',
      component: fgdj,
      meta: {
        record: '返岗直通车',
        title: '返岗直通车'
      }
    },
    {
      path: '/fgdjxx/:id',
      name: 'fgdj',
      component: fgdj,
      meta: {
        record: '返岗直通车',
        title: '返岗直通车'
      }
    },
    {
      path: '/fgdjIndex',
      name: 'fgdjIndex',
      component: fgdjIndex,
      meta: {
        record: '返岗直通车',
        title: '返岗直通车'
      },
      children: [
        {
          path: '/',
          name: 'fgdj',
          component: fgdj,
          meta: {
            record: '返岗直通车',
            title: '返岗直通车'
          }
        },
        {
          path: '/fgdjList',
          name: 'fgdjList',
          component: fgdjList,
          meta: {
            record: '返岗直通车',
            title: '返岗直通车'
          }
        }
      ]
    },
    {
      path: '/dkxx/:id',
      name: 'dkxx',
      component: dkxx,
      meta: {
        record: '填写打卡信息',
        title: '填写打卡信息'
      }
    },
    {
      path: '/jkdk',
      name: 'jkdk',
      component: jkdk,
      meta: {
        record: '健康打卡',
        title: '健康打卡'
      }
    },
    {
      path: '/wdbj',
      name: 'wdbj',
      component: wdbj,
      meta: {
        record: '我的班级',
        title: '我的班级'
      }
    },
    {
      path: '/bjxx',
      name: 'bjxx',
      component: bjxx,
      meta: {
        record: '三年2班',
        title: '三年2班'
      }
    },
    {
      path: '/xsxx/:date',
      name: 'xsxx',
      component: xsxx,
      meta: {
        record: '学生打卡详细',
        title: '学生打卡详细'
      }
    },
    {
      path: '/xzcy',
      name: 'xzcy',
      component: xzcy,
      meta: {
        record: '新增成员',
        title: '新增成员'
      }
    },
    {
      path: '/dkjl',
      name: 'dkjl',
      component: dkjl,
      meta: {
        record: '打卡记录',
        title: '打卡记录'
      }
    },
    {
      path: '/dkxq/:id',
      name: 'dkxq',
      component: dkxq,
      meta: {
        record: '学生打卡信息详情',
        title: '学生打卡信息详情'
      }
    },
    {
      path: '/gthkzsb',
      name: 'gthkzsb',
      component: gthkzsb,
      children: [
        { path: '/', name: 'sbfrom', component: sbfrom },
        { path: '/sblist', name: 'sblist', component: sblist }
      ],
      meta: {
        record: '个体户口罩抽签申购',
        title: '个体户口罩抽签申购'
      }
    },
    {
      path: '/tcyh',
      name: 'tcyh',
      component: tcyh,
      meta: {
        record: '停车优惠',
        title: '停车优惠'
      }
    },

    //大学生人才信息平台
    {
      path: '/dxsrcsjk',
      name: 'dxsrcsjk',
      component: resolve => require(['@/pages/dxsrcsjk'], resolve),
      meta: {
        title: '大学生人才信息平台',
        record: '大学生人才信息平台'
      }
    },
    {
      path: '/hdyn',
      name: 'hdyn',
      component: resolve => require(['@/pages/dxsrcsjk/hdyn'], resolve),
      meta: {
        title: '活动有你',
        record: '活动有你'
      }
    },
    {
      path: '/bndsqnx',
      name: 'bndsqnx',
      component: resolve => require(['@/pages/bndsqnxzsjs/index'], resolve),
      meta: {
        title: '百年党史青知赛',
        record: '百年党史青知赛'
      }
    },
    {
      path: '/bndsqnx/hdgz',
      name: 'hdgz',
      component: resolve => require(['@/pages/bndsqnxzsjs/hdgz'], resolve),
      meta: {
        title: '活动规则',
        record: '活动规则'
      }
    },
    {
      path: '/bndsqnx/cjm',
      name: 'cjm',
      component: resolve => require(['@/pages/bndsqnxzsjs/cjm'], resolve),
      meta: {
        title: '我的抽奖码',
        record: '我的抽奖码'
      }
    },
    {
      path: '/bndsqnx/competition',
      name: 'competition',
      component: resolve => require(['@/pages/bndsqnxzsjs/competition'], resolve),
      meta: {
        title: '开始答题',
        record: '开始答题'
      }
    },
    {
      path: '/hdtz/:id',
      component: resolve => require(['@/pages/dxsrcsjk/hdyn/hdtz'], resolve),
      meta: {
        title: '活动通知',
        record: '活动通知'
      }
    },
    {
      path: '/hdyn/syymw',
      name: 'syymw',
      component: resolve => require(['@/pages/dxsrcsjk/hdyn/syymw'], resolve),
      meta: {
        title: '明撑大学生·笋野益埋我',
        record: '明撑大学生·笋野益埋我'
      }
    },
    {
      path: '/hdyn/syymw/:id',
      name: 'syymwjg',
      component: resolve => require(['@/pages/dxsrcsjk/hdyn/syymw'], resolve),
      meta: {
        title: '明撑大学生·笋野益埋我',
        record: '明撑大学生·笋野益埋我'
      }
    },
    {
      path: '/hdyn/hdhg',
      component: resolve => require(['@/pages/dxsrcsjk/hdyn/hdhg'], resolve),
      meta: {
        title: '活动回顾',
        record: '活动回顾'
      }
    },
    {
      path: '/hdyn/hdxq/:id',
      component: resolve => require(['@/pages/dxsrcsjk/hdyn/hdhgxq'], resolve),
      meta: {
        title: '活动详情',
        record: '活动详情'
      }
    },
    {
      path: '/sxyw',
      name: 'sxyw',
      component: resolve => require(['@/pages/dxsrcsjk/sxyw'], resolve),
      meta: {
        title: '实习有我',
        record: '实习有我'
      }
    },
    {
      path: '/zpxx/:id',
      name: 'zpxx',
      component: resolve => require(['@/pages/dxsrcsjk/sxyw/zpxx'], resolve),
      meta: {
        title: '招聘信息',
        record: '招聘信息'
      }
    },
    {
      path: '/sxxq/:id',
      name: 'sxxq',
      component: resolve => require(['@/pages/dxsrcsjk/sxyw/sxxq'], resolve),
      meta: {
        title: '实习详情',
        record: '实习详情'
      }
    },
    {
      path: '/jgsydwqyxqfk',
      name: 'jgsydwqyxqfk',
      component: resolve => require(['@/pages/dxsrcsjk/jgsydwqyxqfk'], resolve),
      meta: {
        title: '机关事业单位、企业需求反馈',
        record: '机关事业单位、企业需求反馈'
      }
    },
    {
      path: '/jgsydwqyxqfk/xqfkxq/:id',
      component: resolve =>
        require(['@/pages/dxsrcsjk/jgsydwqyxqfk/xqfkxq'], resolve),
      meta: {
        record: '需求反馈详情',
        title: '需求反馈详情'
      }
    },
    {
      path: '/xtss',
      name: 'xtss',
      component: resolve => require(['@/pages/dxsrcsjk/xtss'], resolve),
      meta: {
        title: '系统申诉',
        record: '系统申诉'
      }
    },
    {
      path: '/xtss/xtssxq/:id',
      component: resolve => require(['@/pages/dxsrcsjk/xtss/xtssxq'], resolve),
      meta: {
        record: '系统申诉详情',
        title: '系统申诉详情'
      }
    },
    {
      path: '/dxs',
      name: 'dxs',
      component: dxs,
      meta: {
        title: '信息认证',
        record: '信息认证'
      }
    },
    {
      path: '/dxsxxtx/:type',
      name: 'dxsxxtx',
      component: dxsxxtx,
      meta: {
        title: ''
      }
    },
    {
      path: '/dxszdhd',
      name: 'dxszdhd',
      component: resolve => require(['@/pages/dxs/dxszdhd'], resolve),
      meta: {
        record: '2020年暑假走读高明活动报名',
        title: '2020年暑假走读高明活动报名'
      }
    },
    {
      path: '/dxs/hdbm',
      name: 'dxshdbm',
      component: resolve => require(['@/pages/dxs/hdbm.vue'], resolve),
      meta: {
        record: '大学生暑假实习活动',
        title: '大学生暑假实习活动'
      }
    },
    {
      path: '/dxs/lqqr/:id',
      name: 'dxshdbmlqqr',
      component: resolve => require(['@/pages/dxs/lqqr.vue'], resolve),
      meta: {
        record: '大学生暑假实习活动',
        title: '大学生暑假实习活动'
      }
    },
    {
      path: '/dxs/zpxx/:id',
      component: resolve => require(['@/pages/dxs/zpxx'], resolve),
      meta: {
        record: '招聘信息',
        title: '招聘信息'
      }
    },
    {
      path: '/qrlogin/:state?',
      name: 'qrlogin',
      component: resolve => require(['@/pages/qrlogin'], resolve),
      meta: {
        title: '平台登录',
        record: '平台登录'
      }
    },
    // {
    //   path: '/serve',
    //   name: 'serve',
    //   component: serve,
    //   meta: {
    //     title: '服务业专区'
    //   }
    // },
    // {
    //   path: '/NewServe',
    //   name: 'NewServe',
    //   component: NewServe,
    //   meta: {
    //     title: '新增服务二维码'
    //   }
    // },
    // {
    //   path: '/Download_ewm',
    //   name: 'Download_ewm',
    //   component: Download_ewm,
    //   meta: {
    //     title: '下载二维码'
    //   }
    // },
    // {
    //   path: '/Record_ewm',
    //   name: 'Record_ewm',
    //   component: Record_ewm,
    //   meta: {
    //     title: '扫码人员记录'
    //   }
    // },
    // {
    //   path: '/RecorDetails_ewm',
    //   name: 'RecorDetails_ewm',
    //   component: RecorDetails_ewm,
    //   meta: {
    //     title: '扫码人员记录详情'
    //   }
    // },
    // {
    //   path: '/Register_ewm',
    //   name: 'Register_ewm',
    //   component: Register_ewm,
    //   meta: {
    //     title: '来访登记'
    //   }
    // },
    {
      path: '/questionnaire_in*',
      name: 'questionnaire_index',
      component: questionnaire_index,
      children: [
        {
          path: '/',
          name: 'questionnaire',
          component: questionnaire,
          meta: {
            record: '文明高明',
            title: '文明高明'
          }
        },
        {
          path: '/questionnaire_rule',
          name: 'questionnaire_rule',
          component: questionnaire_rule,
          meta: {
            record: '活动规则',
            title: '活动规则'
          }
        },
        {
          path: '/questionnaire_theme',
          name: 'questionnaire_theme',
          component: questionnaire_theme,
          meta: {
            record: '参加活动',
            title: '参加活动'
          }
        },
        {
          path: '/questionnaire_issue',
          name: 'questionnaire_issue',
          component: questionnaire_issue,
          meta: {
            record: '答题赢积分',
            title: '答题赢积分'
          }
        },
        {
          path: '/questionnaire_Ranking',
          name: 'questionnaire_Ranking',
          component: questionnaire_Ranking,
          meta: {
            record: '积分排行榜',
            title: '积分排行榜'
          }
        }
      ],
      meta: {
        record: '文明高明',
        title: '文明高明'
      }
    },
    {
      path: '/questionnaire_lottery/:sdsc/:fzdh',
      name: 'questionnaire_lottery',
      component: questionnaire_lottery,
      meta: {
        record: '抽红包',
        title: '抽红包'
      }
    },
    {
      path: '/questionnaire_receive',
      name: 'questionnaire_receive',
      component: questionnaire_receive,
      meta: {
        record: '文明高明创文问卷有奖活动',
        title: '文明高明创文问卷有奖活动'
      }
    },
    {
      path: 'PartyReport_index_m',
      name: 'PartyReport_index_m',
      component: PartyReport_index,
      children: [
        {
          path: '/PartyReport_index/:vid?',
          name: 'PartyReport_message',
          component: PartyReport_message,
          meta: {
            record: '党员报到',
            title: '党员报到'
          }
        },
        {
          path: '/PartyReport_record/:vid?',
          name: 'PartyReport_record',
          component: PartyReport_record,
          meta: {
            record: '报到记录',
            title: '报到记录'
          }
        }
      ]
    },
    {
      path: '/PartyActivity_index_m',
      name: 'PartyActivity_index_m',
      component: resolve =>
        require(['@/pages/PartyActivity/PartyActivity_index'], resolve),
      children: [
        {
          path: '/PartyActivity_index/:vid?',
          name: 'PartyActivity_list',
          component: resolve =>
            require(['@/pages/PartyActivity/PartyActivity_list'], resolve),
          meta: {
            record: '社区活动',
            title: '社区活动'
          }
        },
        {
          path: '/PartyActivity_mylist/:vid?',
          name: 'PartyActivity_mylist',
          component: resolve =>
            require(['@/pages/PartyActivity/PartyActivity_mylist'], resolve),
          meta: {
            record: '社区活动',
            title: '社区活动'
          }
        }
      ]
    },
    {
      path: '/PartyActivity_detail',
      name: 'PartyActivity_detail',
      component: PartyActivity_detail,
      meta: {
        record: '活动详情',
        title: '活动详情'
      }
    },
    {
      path: '/PartyActivity_gotoPic/:id?',
      name: 'PartyActivity_gotoPic',
      component: PartyActivity_gotoPic,
      meta: {
        record: '上传活动',
        title: '上传活动'
      }
    },
    {
      path: '/zkbm',
      component: resolve => require(['@/pages/zkbm/index.vue'], resolve),
      meta: {
        record: '单位招聘服务平台',
        title: '单位招聘服务平台'
      }
    },
    {
      path: '/zkbm/zpbmbz',
      component: resolve => require(['@/pages/zkbm/zpbmbz/index.vue'], resolve),
      meta: {
        record: '单位报考',
        title: '单位报考'
      },
      children: [
        {
          path: '/zkbm/txxx',
          name: 'bmbzxxtxxx',
          component: resolve => require(['@/pages/zkbm/zpbmbz/txxx'], resolve),
          meta: {
            record: '填写信息',
          }
        },
        {
          path: '/zkbm/jtcy',
          name: 'zkbmjtcy',
          component: resolve => require(['@/pages/zkbm/zpbmbz/jtcy'], resolve),
          meta: {
            title: '家庭成员'
          }
        },
        {
          path: '/zkbm/sczl',
          name: 'zpbmbzsczl',
          component: resolve => require(['@/pages/zkbm/zpbmbz/sczl'], resolve),
          meta: {
            title: '上传资料'
          }
        },
        {
          path: '/zkbm/zgcx',
          name: 'zpbmbzzgcx',
          component: resolve => require(['@/pages/zkbm/zpbmbz/zgcx'], resolve),
          meta: {
            title: '单位报考'
          }
        }
      ]
    },
    {
      path: '/zkbm/wybm',
      component: resolve => require(['@/pages/zkbm/wybm'], resolve),
      meta: {
        record: '我要报名',
        title: '我要报名'
      }
    },
    {
      path: '/zkbm/xzgw/:id',
      component: resolve => require(['@/pages/zkbm/xzgw'], resolve),
      meta: {
        record: '选择岗位',
        title: '选择岗位'
      }
    },
    {
      path: '/zkbm/shjg',
      component: resolve => require(['@/pages/zkbm/wdbm/zkshjg'], resolve),
      meta: {
        record: '审核结果',
        title: '审核结果'
      }
    },
    {
      path: '/zkbm/wdbm/list',
      component: resolve => require(['@/pages/zkbm/wdbm/list'], resolve),
      meta: {
        record: '单位报考',
        title: '单位报考'
      }
    },
    {
      path: '/zkbm/wdbm',
      component: resolve => require(['@/pages/zkbm/wdbm/index'], resolve),
      meta: {
        record: '单位报考',
        title: '单位报考'
      },
      children: [
        {
          path: '/zkbm/jbxx',
          name: 'zkbmtxxx',
          component: resolve => require(['@/pages/zkbm/zpbmbz/txxx'], resolve),
          meta: {
            title: '填写信息'
          }
        },
        {
          path: '/zkbm/zmcl',
          name: 'zkbmsczl',
          component: resolve => require(['@/pages/zkbm/wdbm/zmcl'], resolve),
          meta: {
            title: '上传资料'
          }
        },
        {
          path: '/zkbm/jdjg',
          name: 'zkbmzgcx',
          component: resolve => require(['@/pages/zkbm/wdbm/jdjg'], resolve),
          meta: {
            title: '单位报考'
          }
        }
      ]
    },
    {
      path: '/jszp',
      component: resolve => require(['@/pages/jszp/index.vue'], resolve),
      meta: {
        record: '教师招聘服务平台',
        title: '教师招聘服务平台'
      }
    },
    {
      path: '/jszp/zpbmbz',
      component: resolve => require(['@/pages/jszp/zpbmbz/index.vue'], resolve),
      meta: {
        record: '教师招聘',
        title: '教师招聘'
      },
      children: [
        {
          path: '/jszp/txxx',
          name: 'jszpbzxxtxxx',
          component: resolve => require(['@/pages/jszp/zpbmbz/txxx'], resolve),
          meta: {
            title: '填写信息'
          }
        },
        {
          path: '/jszp/xzlx',
          name: 'jszpxzlx',
          component: resolve => require(['@/pages/jszp/zpbmbz/xzlx'], resolve),
          meta: {
            title: '选择报考类型'
          }
        },
        {
          path: '/jszp/jtcy',
          name: 'jszpjtcy',
          component: resolve => require(['@/pages/jszp/zpbmbz/jtcy'], resolve),
          meta: {
            title: '家庭成员'
          }
        },
        {
          path: '/jszp/sczl',
          name: 'jszpbzsczl',
          component: resolve => require(['@/pages/jszp/zpbmbz/sczl'], resolve),
          meta: {
            title: '上传资料'
          }
        },
        {
          path: '/jszp/zgcx',
          name: 'jszpbzzgcx',
          component: resolve => require(['@/pages/jszp/zpbmbz/zgcx'], resolve),
          meta: {
            title: '教师招聘'
          }
        }
      ]
    },
    {
      path: '/jszp/ydgg',
      component: resolve => require(['@/pages/jszp/ydgg'], resolve),
      meta: {
        record: '阅读公告',
        title: '阅读公告'
      }
    },
    {
      path: '/jszp/mstz',
      component: resolve => require(['@/pages/jszp/mstz'], resolve),
      meta: {
        record: '面试通知',
        title: '面试通知'
      }
    },
    {
      path: '/jszp/wybm',
      component: resolve => require(['@/pages/jszp/wybm'], resolve),
      meta: {
        record: '我要报名',
        title: '我要报名'
      }
    },
    {
      path: '/jszp/ydxz',
      component: resolve => require(['@/pages/jszp/ydxz'], resolve),
      meta: {
        record: '阅读细则',
        title: '阅读细则'
      }
    },
    {
      path: '/jszp/xzbmb',
      name: 'jszpxzbmb',
      component: resolve => require(['@/pages/jszp/xzbmb'], resolve),
      meta: {
        record: '下载报名表',
        title: '下载报名表'
      }
    },
    {
      path: '/jszp/xzzkz',
      name: 'jszpxzzkz',
      component: resolve => require(['@/pages/jszp/xzzkz'], resolve),
      meta: {
        record: '下载准考证',
        title: '下载准考证'
      }
    },
    {
      path: '/jszp/jgcx',
      name: 'jszpcjcx',
      component: resolve => require(['@/pages/jszp/cjcx'], resolve),
      meta: {
        record: '成绩查询',
        title: '成绩查询'
      }
    },
    {
      path: '/zkcjcx',
      name: 'zkcjcx',
      component: resolve => require(['@/pages/jszp/zkcjcx'], resolve),
      meta: {
        record: '中考成绩查询',
        title: '中考成绩查询'
      }
    },
    {
      path: '/jszp/shjg',
      component: resolve => require(['@/pages/jszp/wdbm/zkshjg'], resolve),
      meta: {
        record: '审核结果',
        title: '审核结果'
      }
    },
    {
      path: '/jszp/wdbm/list',
      component: resolve => require(['@/pages/jszp/wdbm/list'], resolve),
      meta: {
        record: '教师招聘',
        title: '教师招聘'
      }
    },
    {
      path: '/zpzl',
      component: resolve => require(['@/pages/zkbm/zpzl'], resolve),
      meta: {
        record: '高明区招聘专栏',
        title: '高明区招聘专栏'
      }
    },
    {
      path: '/jszp/wdbm',
      component: resolve => require(['@/pages/jszp/wdbm/index'], resolve),
      meta: {
        record: '教师招聘',
        title: '教师招聘'
      },
      children: [
        {
          path: '/jszp/jbxx',
          name: 'jszptxxx',
          component: resolve => require(['@/pages/jszp/zpbmbz/txxx'], resolve),
          meta: {
            title: '填写信息'
          }
        },
        {
          path: '/jszp/zmcl',
          name: 'jszpsczl',
          component: resolve => require(['@/pages/jszp/wdbm/zmcl'], resolve),
          meta: {
            title: '上传资料'
          }
        },
        {
          path: '/jszp/jdjg',
          name: 'jszpzgcx',
          component: resolve => require(['@/pages/jszp/wdbm/jdjg'], resolve),
          meta: {
            title: '教师招聘'
          }
        }
      ]
    },
    {
      path: '/mlgm',
      name: '美丽高明首页',
      component: resolve => require(['@/pages/mlgm/mlgm'], resolve),
      meta: {
        record: '美丽高明',
        title: '美丽高明'
      }
    },
    {
      path: '/mlgm/jpty/jplxzqmd',
      name: '精品路线中签名单',
      component: resolve => require(['@/pages/mlgm/jpty/jplxzqmd'], resolve),
      meta: {
        title: '精品路线中签名单'
      }
    },
    {
      path: '/mlgm/tpdb',
      name: '投票打榜',
      component: resolve => require(['@/pages/mlgm/tpdb/tpdb'], resolve),
      meta: {
        title: '投票打榜'
      }
    },
    {
      path: '/mlgm/cstg',
      name: '参赛投稿',
      component: resolve => require(['@/pages/mlgm/cstg/cstg'], resolve),
      meta: {
        title: '参赛投稿'
      }
    },
    {
      path: '/mlgm/cstghxm',
      name: '参赛投稿核销码',
      component: resolve =>
        require(['@/pages/mlgm/component/cstghxm'], resolve),
      meta: {
        title: '核销码'
      }
    },
    {
      path: '/mlgm/cstg/:id',
      name: '参赛投稿详情',
      component: resolve =>
        require(['@/pages/mlgm/component/cstgDetails'], resolve),
      meta: {
        title: '参赛投稿详情'
      }
    },
    {
      path: '/mlgm/qtcstg/:id/:call?',
      name: '他人参赛投稿详情',
      component: resolve =>
        require(['@/pages/mlgm/component/qtcstgDetails'], resolve),
      meta: {
        title: '参赛投稿详情'
      }
    },
    {
      path: '/mlgm/qtjplxxq/:id/:call?',
      name: '精品路线详情',
      component: resolve => require(['@/pages/mlgm/zhtp/jplxDetails'], resolve),
      meta: {
        title: '精品路线详情'
      }
    },
    {
      path: '/mlgm/wdcstg',
      name: '我的参赛投稿',
      component: resolve => require(['@/pages/mlgm/wdcstg/wdcstg'], resolve),
      meta: {
        title: '我的参赛投稿'
      }
    },
    // {
    //     path: '/mlgm/chb',
    //     name: '参赛投稿抽红包',
    //     component: resolve => require(['@/pages/mlgm/component/Luck'], resolve)
    // },
    {
      path: '/mlgm/scjfx',
      name: 'mlgmscjfx',
      component: resolve => require(['@/pages/mlgm/scjfx/scjfx'], resolve),
      meta: {
        title: '上传加分项'
      }
    },
    {
      path: '/mlgm/jbhjhd',
      component: resolve => require(['@/pages/mlgm/jbhjhd/index'], resolve),
      name: 'mlgmjbhjhd',
      meta: {
        title: '环境黑点随手拍'
      }
    },
    {
      path: '/mlgm/jbhjhd/wantToReport',
      component: resolve =>
        require(['@/pages/mlgm/jbhjhd/wantToReport'], resolve),
      meta: {
        title: '我要随手拍'
      }
    },
    {
      path: '/mlgm/jbhjhd/hxm',
      component: resolve => require(['@/pages/mlgm/jbhjhd/hxm'], resolve),
      meta: {
        title: '核销码'
      }
    },
    {
      path: '/mlgm/jpty',
      component: resolve => require(['@/pages/mlgm/jpty/index'], resolve),
      meta: {
        title: '精品体验'
      }
    },
    {
      path: '/mlgm/jpty/jptyxq/:id',
      name: 'jptyjptyxq',
      component: resolve => require(['@/pages/mlgm/jpty/jptyxq'], resolve),
      meta: {
        title: '精品体验详情'
      }
    },
    {
      path: '/mlgm/jpty/wyyyty',
      component: resolve => require(['@/pages/mlgm/jpty/wyyyty'], resolve),
      meta: {
        title: '我要预约体验'
      }
    },
    {
      path: '/mlgm/shjg',
      component: resolve => require(['@/pages/mlgm/shjg'], resolve),
      meta: {
        title: '审核结果'
      }
    },
    {
      path: '/mlgm/zhtp',
      component: resolve => require(['@/pages/mlgm/zhtp/index'], resolve),
      meta: {
        title: '精品路线'
      }
    },
    {
      path: '/mlgm/votenew',
      component: resolve => require(['@/pages/mlgm/vote/index'], resolve),
      children: [
        {
          path: '/',
          name: 'homePage',
          component: resolve =>
            require(['@/pages/mlgm/vote/homePage'], resolve),
          meta: {
            title: '投票活动',
            keepAlive: true
          }
        },
        {
          path: '/mlgm/vote/particulars',
          name: 'particulars',
          component: resolve =>
            require(['@/pages/mlgm/vote/particulars'], resolve),
          meta: {
            title: '投票活动',
            keepAlive: true
          }
        },
        {
          path: '/mlgm/vote/ranking',
          name: 'ranking',
          component: resolve => require(['@/pages/mlgm/vote/ranking'], resolve),
          meta: {
            title: '投票活动',
            keepAlive: true
          }
        },
        {
          path: '/mlgm/vote/voteParticlars/:id',
          name: 'voteParticlars',
          component: resolve =>
            require(['@/pages/mlgm/vote/voteParticlars'], resolve),
          meta: {
            title: '投票活动'
          }
        }
      ]
    },
    {
      path: '/mlgm/voteResults',
      name: 'voteResults',
      component: resolve => require(['@/pages/mlgm/vote/voteResults'], resolve),
      meta: {
        title: '抽红包'
      }
    },
    {
      path: '/sysptdc',
      component: resolve => require(['@/pages/cwwjhd/index'], resolve),
      meta: {
        record: '工业企业上云平台信息化调查',
        title: '工业企业上云平台信息化调查'
      }
    },
    {
      path: '/gmdxsrcllz',
      component: resolve => require(['@/pages/dxsrcllz/index'], resolve),
      meta: {
        record: '高明全国大学生人才联络站',
        title: '高明全国大学生人才联络站'
      }
    },

    {
      path: '/project',
      name: 'Project',
      component: resolve => require(['@/pages/project'], resolve),
      meta: {
        record: '工程监督',
        title: '工程监督'
      }
    },
    {
      path: '/projectdetail/:id',
      name: 'ProjectDetail',
      component: resolve =>
        require(['@/pages/project/ProgressDetail'], resolve),
      meta: {
        title: '工程监督'
      }
    },
    // 百村足球赛
    {
      path: '/bczqs/csbm',
      name: 'bczqscsbm',
      component: resolve => require(['@/pages/bczqs/csbm'], resolve),
      meta: {
        record: '参赛报名',
        title: '参赛报名'
      }
    },
    {
      path: '/grxxrz/:initcode?',
      name: 'grxxrz',
      component: resolve => require(['@/pages/index/grxxrz'], resolve),
      meta: {
        record: '个人身份认证',
        title: '个人身份认证'
      }
    },
    {
      path: '/bczqs',
      name: 'Bczqs',
      component: resolve => require(['@/pages/bczqs/bczqs.vue'], resolve),
      meta: {
        record: '百村足球赛',
        title: '百村足球赛'
      }
    },
    {
      path: '/bczqs/qdjjDetail',
      name: 'QdjjDetail',
      component: resolve => require(['@/pages/bczqs/qdjjDetail.vue'], resolve),
      meta: {
        title: '球队简介'
      }
    },
    {
      path: '/bczqs/matchresult',
      name: 'MatchResult',
      component: resolve => require(['@/pages/bczqs/matchresult.vue'], resolve),
      meta: {
        title: '赛程结果'
      }
    },
    {
      path: '/bczqs/jfpm',
      name: 'Jfpm',
      component: resolve => require(['@/pages/bczqs/jfpm'], resolve),
      meta: {
        title: '积分排名'
      }
    },
    {
      path: '/bczqs/championguess',
      name: 'MatchResult',
      component: resolve =>
        require(['@/pages/bczqs/championguess.vue'], resolve),
      meta: {
        title: '冠军竞猜'
      }
    },
    {
      path: '/bczqs/qygs',
      name: 'Qygs',
      component: resolve => require(['@/pages/bczqs/qygs.vue'], resolve),
      meta: {
        title: '球员公示'
      }
    },
    {
      path: '/msss',
      name: 'Msssxmzj',
      component: resolve => require(['@/pages/msssxmzj'], resolve),
      meta: {
        record: '民生实事项目建议征集',
        title: '民生实事项目建议征集'
      }
    },
    {
      path: '/dbzsLogin',
      name: 'DbzsLogin',
      component: resolve => require(['@/pages/dbzs/login'], resolve),
      meta: {
        record: '高明人大代表之声登录',
        title: '高明人大代表之声登录'
      }
    },
    {
      path: '/dbzs',
      name: 'Dbzs',
      component: resolve => require(['@/pages/dbzs'], resolve),
      meta: {
        record: '代表之声',
        title: '代表之声'
      }
    },
    {
      path: '/dbzsDetail/:id',
      name: 'DbzsDetail',
      component: resolve => require(['@/pages/dbzs/dbzsDetail'], resolve),
      props: true,
      meta: {
        title: '代表之声'
      }
    },
    {
      path: '/dbzsReply/:id',
      name: 'DbzsReply',
      component: resolve => require(['@/pages/dbzs/hf'], resolve),
      props: true,
      meta: {
        title: '回复'
      }
    },
    {
      path: '/aedmap',
      name: 'AEDmap',
      component: resolve => require(['@/pages/aedmap/index'], resolve),
      props: true,
      meta: {
        record: 'AED',
        title: 'AED'
      }
    },
    {
      path: '/hsjcmap',
      name: 'AEDmap',
      component: resolve => require(['@/pages/hsjcmap/index'], resolve),
      props: true,
      meta: {
        record: '核酸检测点',
        title: '核酸检测点'
      }
    },
    // 社区服务
    {
      path: '/sqfw/:vid?',
      name: 'Sqfw',
      component: resolve => require(['@/pages/sqfw/index'], resolve),
      props: true,
      meta: {
        record: '社区服务',
        title: '社区服务'
      }
    },
    {
      path: '/sqfw/sqdtlb/:vid?',
      name: 'Sqdtlb',
      component: resolve => require(['@/pages/sqfw/sqdtlb'], resolve),
      props: true,
      meta: {
        title: '社区动态'
      }
    },
    {
      path: '/sqfw/sqdtxq',
      name: 'Sqdtxq',
      component: resolve => require(['@/pages/sqfw/sqdtxq'], resolve),
      props: true,
      meta: {
        title: '动态详情'
      }
    },
    {
      path: '/sqfw/xqfb/:vid?',
      name: 'Xqfb',
      component: resolve => require(['@/pages/sqfw/xqfb/index'], resolve),
      props: true,
      meta: {
        title: '需求发布'
      }
    },
    {
      path: '/sqfw/xqxq/:id',
      name: 'Xqxq',
      component: resolve => require(['@/pages/sqfw/xqfb/xqxq'], resolve),
      props: true,
      meta: {
        title: '需求详情'
      }
    },
    {
      path: '/sqfw/gxwp/:vid?',
      name: 'Gxwp',
      component: resolve => require(['@/pages/sqfw/gxwp'], resolve),
      props: true,
      meta: {
        title: '共享物品'
      }
    },
    {
      path: '/sqfw/gxwp/gxsq/:vid?',
      name: 'Gxsq',
      component: resolve => require(['@/pages/sqfw/gxwp/gxsq'], resolve),
      props: true,
      meta: {
        title: '共享申请'
      }
    },
    {
      path: '/sqfw/gxwp/gxsqxq/:id',
      name: 'Gxsq',
      component: resolve => require(['@/pages/sqfw/gxwp/gxsqxq'], resolve),
      props: true,
      meta: {
        title: '共享申请详情'
      }
    },
    {
      path: '/sqfw/gxwp/jysq/:vid?',
      name: 'Jysq',
      component: resolve => require(['@/pages/sqfw/gxwp/jysq'], resolve),
      props: true,
      meta: {
        title: '借用申请'
      }
    },
    {
      path: '/sqfw/gxwp/jysqxq/:id',
      name: 'Jysq',
      component: resolve => require(['@/pages/sqfw/gxwp/jysqxq'], resolve),
      props: true,
      meta: {
        title: '借用申请详情'
      }
    },
    {
      path: '/dwzk',
      component: resolve => require(['@/pages/dwzk/index.vue'], resolve),
      meta: {
        record: '单位招考',
        title: '单位招考'
      }
    },
    {
      path: '/dwzk/zpbmbz',
      component: resolve => require(['@/pages/dwzk/zpbmbz/index.vue'], resolve),
      meta: {
        title: '单位报考'
      },
      children: [
        {
          path: '/dwzk/txxx',
          name: 'bmbzxxtxxx',
          component: resolve => require(['@/pages/dwzk/zpbmbz/txxx'], resolve),
          meta: {
            title: '填写信息'
          }
        },
        {
          path: '/dwzk/jtcy',
          name: 'dwzkjtcy',
          component: resolve => require(['@/pages/dwzk/zpbmbz/jtcy'], resolve),
          meta: {
            title: '家庭成员'
          }
        },
        {
          path: '/dwzk/sczl',
          name: 'zpbmbzsczl',
          component: resolve => require(['@/pages/dwzk/zpbmbz/sczl'], resolve),
          meta: {
            title: '上传资料'
          }
        },
        {
          path: '/dwzk/zgcx',
          name: 'zpbmbzzgcx',
          component: resolve => require(['@/pages/dwzk/zpbmbz/zgcx'], resolve),
          meta: {
            title: '单位报考'
          }
        }
      ]
    },
    {
      path: '/dwzk/wybm',
      component: resolve => require(['@/pages/dwzk/wybm'], resolve),
      meta: {
        record: '我要报名',
        title: '我要报名'
      }
    },
    {
      path: '/dwzk/xzgw/:id',
      component: resolve => require(['@/pages/dwzk/xzgw'], resolve),
      meta: {
        title: '选择岗位'
      }
    },
    {
      path: '/dwzk/shjg',
      component: resolve => require(['@/pages/dwzk/wdbm/zkshjg'], resolve),
      meta: {
        title: '审核结果'
      }
    },
    {
      path: '/dwzk/wdbm/list',
      component: resolve => require(['@/pages/dwzk/wdbm/list'], resolve),
      meta: {
        title: '单位报考'
      }
    },
    {
      path: '/dwzk/wdbm',
      component: resolve => require(['@/pages/dwzk/wdbm/index'], resolve),
      meta: {
        title: '单位报考'
      },
      children: [
        {
          path: '/dwzk/jbxx',
          name: 'dwzktxxx',
          component: resolve => require(['@/pages/dwzk/zpbmbz/txxx'], resolve),
          meta: {
            title: '填写信息'
          }
        },
        {
          path: '/dwzk/zmcl',
          name: 'dwzksczl',
          component: resolve => require(['@/pages/dwzk/wdbm/zmcl'], resolve),
          meta: {
            title: '上传资料'
          }
        },
        {
          path: '/dwzk/jdjg',
          name: 'dwzkzgcx',
          component: resolve => require(['@/pages/dwzk/wdbm/jdjg'], resolve),
          meta: {
            title: '单位报考'
          }
        }
      ]
    },
    {
      path: '/dwzk/xzbmb',
      name: 'dwzkxzbmb',
      component: resolve => require(['@/pages/dwzk/xzbmb'], resolve),
      meta: {
        title: '下载报名表'
      }
    },
    {
      path: '/dwzk/xzzkz',
      name: 'dwzkxzzkz',
      component: resolve => require(['@/pages/dwzk/xzzkz'], resolve),
      meta: {
        title: '下载准考证'
      }
    },
    {
      path: '/livelihood/:state',
      name: 'livelihood',
      component: randomlySnapPicture,
      meta: {
        record: '我的反映',
        title: '我的反映'
      }
    }
  ],

  scrollBehavior (to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition
    } else {
      return { x: 0, y: 0 }
    }
  }
})

router.beforeEach((to, from, next) => {
  // requireAuth 需要登录添加字段
  if (to.meta.record) {
    store.dispatch('AddVisitTime', to.meta.record)
  }
  if (to.matched.some(record => record.meta.requireAuth)) {
    // 判断该路由是否需要登录权限
    if (true) {
      // 页面需要登录时
      next({
        path: '/login',
        query: { redirect: to.fullPath } // 将跳转的路由path作为参数，登录成功后跳转到该路由
      })
    } else {
      next()
    }
  } else {
    next()
  }
  /* 路由发生变化修改页面title */
  if (to.meta.title) {
    let mapper = store.state.documentTitle[to.meta.title]
    if (mapper) {
      document.title = mapper
    } else {
      document.title = to.meta.title
    }
  }
  next()
})
export default router
