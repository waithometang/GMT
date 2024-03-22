/**
 *过滤 选择 二级目录
 *images: 图标路径  titile: 图标名字 url: 二级功能页面路劲 type: 跳转类型 (1: 跳转二级页面，2: 打开子集目录, 3: 跳转外部链接, 4: route参数加上村居id后跳转, 5: 更改底部导航Tag状态) id: 唯一标识符
 * item: 需要展示的图标, type: 图标展示样式类型
 */
export function getCatalogue(item, type) {
  const initData = []
  const size = 12
  const ArrayData = []
  const listData = [
    // 村务数据
    // { images: "/images/FirstLevelPage/Home_icon02.png", title: '村情动态', url: '/villagePublishList?type=0', type: '1', id: '1001' },
    // { images: "/images/FirstLevelPage/Home_icon11.png", title: '政务动态', url: 'http://www.gaoming.gov.cn/zwgk/zwdt/index_29377.html', type: '3', id: '1011' },
    // { images: "/images/FirstLevelPage/Home_icon05.png", title: '村务监督', url: '/VillageSupervision', type: '1', id: '1002' },
    // { images: "/images/FirstLevelPage/Home_icon10.png", title: '政策宣传', url: '/villagePublishList?type=4', type: '1', id: '1005' },
    // { images: "/images/FirstLevelPage/Home_icon07.png", title: '务工信息', url: '/villagePublishList?type=5', type: '1', id: '1006' },
    // { images: "/images/FirstLevelPage/Home_icon06.png", title: '网上办事', url: 'http://www.gdzwfw.gov.cn/?region=440608', type: '3', id: '1009' },
    // { images: "/images/FirstLevelPage/Home_icon16.png", title: '招投标公告', url: '/TenderAnnouncement', type: '3', id: '1012' },
  
    // 党建数据
    // { images: "/images/FirstLevelPage/DjIcon01.png", title: '党建概况', url: '/djgk', type: '4', id: '2001' },
    // { images: "/images/FirstLevelPage/DjIcon08.png", title: '支部简介', url: '/ConditionIntro?type=3', type: '1', id: '2002' },
    // { images: "/images/FirstLevelPage/DjIcon07.png", title: '党员信息', url: '/BranchPartyMember', type: '4', id: '2003' },
    // { images: "/images/FirstLevelPage/DjIcon10.png", title: '主题党日', url: '/djfb/4', type: '4', id: '2004' },
    // { images: "/images/FirstLevelPage/DjIcon12.png", title: '工作动态', url: '/djfb/5', type: '4', id: '2012' },
    // { images: "/images/FirstLevelPage/DjIcon11.png", title: '党务知识', url: '/djfb/6', type: '4', id: '2013' },
    // { images: "/images/FirstLevelPage/DjIcon12.png", title: '最新实事', url: '/zxss', type: '4', id: '2005' },
    // { images: "/images/FirstLevelPage/DjIcon04.png", title: '发布实事', url: '/Login', type: '1', id: '2006' },
    // { images: "/images/FirstLevelPage/DjIcon11.png", title: '主题教育', url: '/ztjy/0', type: '4', id: '2007' },
    // { images: "/images/FirstLevelPage/DjIcon03.png", title: '党员学习', url: '/partyStudy/1', type: '4', id: '2008' }, 
    // { images: "/images/FirstLevelPage/DjIcon06.png", title: '先锋指数', url: '/PioneerExponent', type: '1', id: '2009' },
    // { images: "/images/FirstLevelPage/DjIcon09.png", title: '制度文件', url: '/djfb/2', type: '4', id: '2010' },
    // { images: "/images/FirstLevelPage/DjIcon02.png", title: '党员积分', url: '/dyjf', type: '4', id: '2014' },
    // { images: "/images/FirstLevelPage/DjIcon05.png", title: '公告公示', url: '/djfb/3', type: '4', id: '2011' },
    // { images: "/images/FirstLevelPage/DjIcon03.png", title: '先进典型', url: '/AdvancedModelList', type: '4', id: '2016' },
    // 乡村振兴数据
    // { images: "/images/FirstLevelPage/XcIcon02.png", title: '涉农补助', url: '/AgricultureSubsidy', type: '1', id: '3005' },
    // { images: "/images/FirstLevelPage/XcIcon05.png", title: '技术指导', url: '/Agriculture', type: '1', id: '3006' },
    // { images: "/images/FirstLevelPage/XcIcon08.png", title: '涉农政策', url: '/xczxfb/2', type: '1', id: '3010' },
    // { images: "/images/FirstLevelPage/jianfang.png", title: '高明三农', url: 'https://www.fstv.com.cn/jiemu/gmsn', type: '3', id: '3011' },

    // 诉求反应数据
    // { images: "/images/FirstLevelPage/XcIcon04.png", title: '随手拍', url: '/randomlySnapPicture', type: '1', id: '4003' },

    // 个人中心数据
    { images: "/static/smrz@2x.png", title: '实名认证', url: '/Certification', type: '1', id: '5001' },
    { images: "/static/qyrz@2x.png", title: '企业认证', url: '/qyrz', type: '1', id: '5003' },
    { images: "/static/wdfy@2x.png", title: '我的反映', url: '/randomlySnapPicture/1', type: '1', id: '5004' },
    { images: "/static/wosc@2x.png", title: '我的收藏', url: '/likeCollect/2', type: '1', id: '5005' },
    { images: "/static/dz@2x.png", title: '我的点赞', url: '/likeCollect/1', type: '1', id: '5006' },
    { images: "/static/wdfb@2x.png", title: '我的发布', url: '/release', type: '1', id: '5007'},
    { images: "/static/bzfk@2x.png", title: '系统反馈', url: '/systemFeedback', type: '1', id: '5008'},
    { images: "/static/xtbz@2x.png", title: '系统帮助', url: '/systemHelp', type: '1', id: '5009' },


		// 涉农补助
    { images: "/images/FirstLevelPage/FishingBoats.png", title: '渔业项目', url: '', type: '6', id: '6001' },
    { images: "/images/FirstLevelPage/Production.png", title: '农机补贴', url: '/agricultureSubsidyApplication', type: '1', id: '6002' },
    { images: "/images/FirstLevelPage/promote.png", title: '耕地保护补贴', url: '/agricultureSubsidyApplication', type: '1', id: '6003' },
    // 首页_5.1
    // { images: "/images/FirstLevelPage/Pag_icon1.png", title: '政务服务', url: 'PublicService', type: '3', id: '7001' },
    // { images: "/images/FirstLevelPage/Pag_icon2.png", title: '政策宣传', url: 'villagePublishList?type=4', type: '1', id: '7002' },
    // { images: "/images/FirstLevelPage/Pag_icon3.png", title: '政务动态', url: 'http://www.gaoming.gov.cn/zwgk/zwdt/index_29377.html', type: '1', id: '7003' },
    // { images: "/images/FirstLevelPage/Pag_icon4.png", title: '便民服务', url: '', type: '1', id: '7004' },
    // { images: "/images/FirstLevelPage/Pag_icon5.png", title: '智慧党建', url: 'indexHome/3', type: '1', id: '7005' },
    // { images: "/images/FirstLevelPage/Pag_icon6.png", title: '乡村振兴', url: 'indexHome/4', type: '1', id: '7006' },
    // { images: "/images/FirstLevelPage/Pag_icon7.png", title: '全域旅游', url: '', type: '1', id: '7007' },
    // { images: "/images/FirstLevelPage/Pag_icon8.png", title: '务工信息', url: 'villagePublishList?type=5', type: '3', id: '7008' },
    // { images: "/images/FirstLevelPage/Pag_icon9.png", title: '招投标公告', url: 'TenderAnnouncement', type: '3', id: '7009' },
    // { images: "/images/FirstLevelPage/Pag_icon10.png", title: '村情通', url: 'indexHome/2', type: '1', id: '7010' },
    // { images: "/images/FirstLevelPage/Pag_icon11.png", title: '企业+', url: 'http://www.znzwoa.com/qyfw/weixin/Qyfw_Frame.aspx', type: '3', id: '7011' },
    // { images: "/images/FirstLevelPage/Pag_icon12.png", title: '更多', url: '', type: '3', id: '7012' },
  ]
  // 过滤数据
  for (var s in item) {
    for (var x in listData) {
      if (item[s] == listData[x].id) {
        initData.push(listData[x])
        break
      }
    }
  }

  let len = initData.length
  let lineNum = len % 12 === 0 ? len / 12 : Math.floor((len / 12) + 1);
  // 拆分数据格式  二维数组
  for (let i = 0; i < lineNum; i++) {
    let temp = initData.slice(i * size, i * size + size);
    ArrayData.push(JSON.parse(JSON.stringify(temp)));
  }

  // 拆分为三维数组
  let aa = []
  for (var s in ArrayData) {
    var bb = []
    let lens = ArrayData[s].length
    let lineNums = lens % 4 === 0 ? lens / 4 : Math.floor((lens / 4) + 1);
    for (let i = 0; i < lineNums; i++) {
      let temps = ArrayData[s].slice(i * 4, i * 4 + 4);
      bb.push(JSON.parse(JSON.stringify(temps)));
    }
    aa.push(JSON.parse(JSON.stringify(bb)));
  }
  if (type) {
    return aa
  } else {
    return ArrayData
  }
}