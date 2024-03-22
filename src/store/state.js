export default {
  documentTitle:{},
  Main_wydsData:'', //未阅读数
  showToast: false, // 控制提示框显示隐藏
  toastMsg: '', // 提示框内容
  setIphoneShareUrl: '', // 记录进入程序的第一个路径
  StateType: 0, // 记录村居直联成员 导航栏状态
  StateFlag: 0, // 记录两委成员 导航栏状态
  StateTypeData: 1 ,// 记录村居概况 导航栏状态
  HeadImageBanner: '', // 记录首页banner
  ButtomTageState: 1, // 记录一级页面底部导航栏状态 默认首页
  UploadPicturesSrc: [], // 记录居民信箱上传图片的路径
  MedialdsList: [], // 记录上传多张图片 选中的图片id
  MainIdData: '', // 记录上传的图片id
  StartRecordId: '', // 记录微信录音接口返回的的数据
  WaChetLatitude: 0, // 记录微信定位位置
  WaChetLongitude: 0, // 记录微信定位位置
  TxGeocodeData: '', // 记录腾讯地图返回数据
  TopTagState: 2, // 记录诉求反映顶部状态
  party_stateType: 1, // 记录党建概况导航状态
  userinfo: '',// 记录用户信息 所属村居
  GmtLoadingState: false,
  GmtpopupState: false,
  GmtpopupContent: {
    name: '提示',
    content: '',
    cancel: '取 消',
    confirm: '确 认'
  }, // 全局确认框内容
  GmtpopupCancel: function () {} ,// 确认框 错误函数
  GmtpopupConfirm: function () {}, // 确认框 成功回调
  failStata: true, // 显示提示框取消按钮
  FbInfo: '', // 个人发布信息
  FbInfoTag: 1,
  GmtMessageBox: false,
  GmtMessageBoxContent: '',
  publicMessage: '',
  GmtMessageBoxCancel: function () {},
  inFoData: '', // 实名认证记录个人信息
  zxdtTagStata: 0,
  indexBenner: [], // 首页Benner
  buttomTab: 1,
  lbTab: 0,
  lbTab1: 0,
  ruleInfo: '',
  messageBut: false,
  voteMessage: false,
  voteContent: {},
  showIcon: false,
  increase: function () {},
  increaseNumber: 1,
  fntrlState: 1, // 妇女通微心愿认领顶部导航状态
  questionnaire_bg:"",
  jszpData:{},  //招聘管理报名数据 gwxx baseData  zlData
  zkbmData:{},  //教师招聘报名数据 gwxx baseData  zlData
}
