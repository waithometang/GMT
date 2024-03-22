<template>
  <div class="gd">
    <div class="page-content">
      <div class="page-content-tab" v-for="(item, index) in listData" :key="index">
        <div class="tab-head">{{item.name}}</div>
        <div class="tab-base">
          <ul>
            <li v-for="(val, key) in getTagData(item)" :key="key" @click="lookOver(val)">
              <div class="tab-base-icon"><img :src="val.icon" alt=""></div>
              <div class="tab-base-name">{{val.name}}</div>
            </li>
            <div style="clear:both;"></div> 
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { Getysgn } from '@/api/FirstLevelPage';
import { HasVid } from "@/js/until";
export default {
  data () {
    return {
      listData: [
        {name: '党群连心', state: 1},
        {name: '政民互动', state: 2},
        {name: '乡村振兴', state: 3},
        {name: '妇女之家', state: 4},
        // {name: '招生报名', state: 5},
        {name: '其他服务', state: 6}
      ],
      tagData: [
        {name: '党建概况', icon: '/static/newEditionIndex/tag_icon_1.png',  url: '/djgk', state: 1, type: 3},
        {name: '主题党日', icon: '/static/newEditionIndex/tag_icon_2.png',  url: '/djfb/4', state: 1, type: 3},
        {name: '党员学习', icon: '/static/newEditionIndex/tag_icon_3.png',  url: 'nrfb/7', state: 1, type: 1},
        // {name: '主题教育', icon: '/static/newEditionIndex/tag_icon_4.png',  url: '/indexHome/6', state: 1, type: 1},
        // {name: '党员实事', icon: '/static/newEditionIndex/tag_icon_5.png',  url: '/hdxq/301', state: 1, type: 1},
        {name: '干部风采', icon: '/static/newEditionIndex/tag_icon_6.png',  url: '/hdxq/201', state: 1, type: 1},
        {name: '直联动态', icon: '/static/newEditionIndex/tag_icon_7.png',  url: '/hdxq/202', state: 1, type: 1},

        {name: '网格管理', icon: '/static/newEditionIndex/tag_icon_8.png',  url: '/randomlySnapPicture/1', state: 2, type: 1},
        {name: '童话说高明', icon: '/images/FirstLevelPage/thsgm.png',  url: '/vote', state: 2, type: 1},
        {name: '我要反映', icon: '/static/newEditionIndex/tag_icon_9.png',  url: '/randomlySnapPicture/3', state: 2, type: 1},
        {name: '有奖问答', icon: '/static/icon/sy_cwwj.png',  url: '/questionnaire_index1', state: 2, type: 1},
        {name: '大学生信息库', icon: '/static/icon/dxsxxk.png',  url: '/dxs', state: 2, type: 1},
        {name: '统计数据', icon: '/images/Pages_5.1/tjsj.png',  url: 'http://tjj.gaoming.gov.cn:9090/statsdbgaoming/pages/dist/index.html?openId=of1XZ1SwEVBHdJN8G_cgKi_R6xzI#/', state: 2, type: 4},
        {name: '招生报名',   icon: '/static/icon/zsbm.png', url: '/ybm/bmindex', state: 2, type: 2},
        {name: '民生实事征集',   icon: '/static/icon/msss.png', url: '/msss', state: 2, type: 2},
        {name: '代表之声',   icon: '/static/icon/dbzs.png', url: '/dbzsLogin', state: 2, type: 2},

        {name: '环境整治', icon: '/static/newEditionIndex/tag_icon_10.png', url: '/sqsc', state: 3, type: 3},
        {name: '涉农补助', icon: '/static/newEditionIndex/tag_icon_11.png', url: '/AgricultureSubsidy', state: 3, type: 3},
        {name: '技术指导', icon: '/static/newEditionIndex/tag_icon_12.png', url: '/Agriculture', state: 3, type: 3},
        {name: '涉农政策', icon: '/static/newEditionIndex/tag_icon_13.png', url: '/nrfb/12', state: 3, type: 3},
        // {name: '高明三农', icon: '/static/newEditionIndex/tag_icon_14.png', url: 'https://www.fstv.com.cn/jiemu/gmsn', state: 3, type: 2},

        {name: '找组织',   icon: '/static/newEditionIndex/tag_icon_15.png', url: '/fntZzz', state: 4, type: 1},
        {name: '找活动',   icon: '/static/newEditionIndex/tag_icon_16.png', url: '/fntZhd', state: 4, type: 1},
        {name: '找咨询',   icon: '/static/newEditionIndex/tag_icon_17.png', url: '/randomlySnapPicture/3', state: 4, type: 1},
        {name: '找帮助',   icon: '/static/newEditionIndex/tag_icon_18.png', url: '/fntZbz', state: 4, type: 1},
        {name: '主席信箱', icon: '/static/newEditionIndex/tag_icon_19.png', url: '/fntxx', state: 4, type: 1},
        {name: '专题签到', icon: '/static/newEditionIndex/tag_icon_20.png', url: '/fntQd', state: 4, type: 1},

        {name: '小学报名', icon: '/static/newEditionIndex/tag_icon_21.png', url: 'http://gmt.gaoming.gov.cn/ybm/bm/1', state: 5, type: 2},
        {name: '初中报名', icon: '/static/newEditionIndex/tag_icon_22.png', url: 'http://gmt.gaoming.gov.cn/ybm/bm/2', state: 5, type: 2},

        {name: '点赞',     icon: '/static/newEditionIndex/tag_icon_23.png', url: '/like', state: 6, type: 1},
        // {name: '找工作',   icon: '/static/newEditionIndex/tag_icon_24.png', url: '/xzgz', state: 6, type: 1},
        {name: '坐车',     icon: '/static/newEditionIndex/tag_icon_25.png', url: '/Wblj/2', state: 6, type: 1},
        {name: '成绩查询',     icon: '/static/newEditionIndex/tag_icon_29.png', url: '/jszp/jgcx', state: 6, type: 1},
        {name: '挂号',     icon: '/static/newEditionIndex/tag_icon_26.png', url: '/Wblj/3', state: 6, type: 1},
        {name: '查天气',   icon: '/static/newEditionIndex/tag_icon_27.png', url: 'http://www.sunhero.cn/GaoMingweixin/weixinPage/todayWether.html', state: 6, type: 2},
        {name: 'AED急救点',   icon: '/static/newEditionIndex/tag_icon_30.png', url: '/aedmap', state: 6, type: 1}
      ]
    }
  },
  methods: {
    getTagData (item) {
      let data = this.tagData.filter(val => {
        return val.state === item.state
      })
      return data
    },
    lookOver (val) {
      /*if(val.name==='有奖问答'){
        this.$alert('活动维护中','温馨提示')
        return
      }*/
      switch (val.type) {
        case 1:
          this.$router.push(val.url)
          break;
        case 2:
          window.location.href = val.url
          break;
        case 3:
          HasVid(`${val.url}/{vid}`)
          break;
        case 4:  //自动加上openId
          this.$store.dispatch('getZhxx').then(zhxx => {
            if (zhxx.openid) {
              window.location.href = `${val.url}?openId=${zhxx.openid}`
            }else{
              this.$alert('获取账号信息失败','抱歉')
            }
          })
          break;
        default:
          break;
      }
    }
  },
}
</script>

<style lang='scss' scoped>
@import './style/gd.scss';
</style>