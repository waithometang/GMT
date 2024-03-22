<template>
  <div class="viewMore">
    <BetterScroll>
      <template slot="BetterScroll">
        <div class="hread_content" v-for="(item, index) in initData" :key="index" v-show="item.menus.length>0">
          <div class="hread-title" v-if="item.name!='首页'">
            <div></div>{{item.name}}
          </div>
          <div v-else class="hread-title">
            <div></div>更多
          </div>
          <div class="content">
            <div class="list">
              <div class="list-li" v-for="(items, index) in item.menus" :key="index" @click="SetselectIndex(item, items)">
                <div class="iconTetile">
                  <div class="icon" :class="{'icon_action': item.name === '企业+'}">
                    <img :src="items.images" alt="">
                  </div>	
                  <div class="tetile">{{items.title}}</div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="hread_content" v-if="initData.length>0">
          <div class="hread-title">
            <div></div>我的
          </div>
          <div class="content">
            <div class="list">
              <div class="list-li" v-for="(items, index) in personalCenter" :key="index" :class="{'action': selectIndex == items.id}" @click="SetpersonalCenterIndex(items)">
                <div class="iconTetile">
                  <div class="icon">
                    <img :src="items.images" alt="">
                  </div>
                  <div class="tetile">{{items.title}}</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </template>
    </BetterScroll>
  </div>
</template>

<script>
import { Getysgn } from '@/api/FirstLevelPage'
import { storage } from "@/js/until";
import {mapActions} from 'vuex'
import BetterScroll from '@/components/BetterScroll'

export default {
  data () {
    return {
      initData: [],
      personalCenter: [
        { images: "/static/smrz@2x.png", title: '实名认证', url: '/Certification', type: '1', id: '5001' },
        { images: "/static/qyrz@2x.png", title: '企业认证', url: '/qyrz', type: '1', id: '5003' },
        { images: "/static/wdfy@2x.png", title: '我的反映', url: '/randomlySnapPicture/1', type: '1', id: '5004' },
        { images: "/static/wosc@2x.png", title: '我的收藏', url: '/likeCollect/2', type: '1', id: '5005' },
        { images: "/static/dz@2x.png", title: '我的点赞', url: '/likeCollect/1', type: '1', id: '5006' },
        { images: "/static/wdfb@2x.png", title: '我的发布', url: '/release', type: '1', id: '5007'},
        { images: "/static/bzfk@2x.png", title: '系统反馈', url: '/systemFeedback', type: '1', id: '5008'},
        { images: "/static/xtbz@2x.png", title: '系统帮助', url: '/systemHelp', type: '1', id: '5009' },
      ],
      viewMoreData: [
        {id: '103', title: '查天气', gnlx: 3, fblx_id: '', images: '/static/tq@2x.png', linkage: 'http://www.sunhero.cn/GaoMingweixin/weixinPage/todayWether.html'},
        {id: '102', title: '办事指南', gnlx: 3, fblx_id: '',images: '/static/bszn@2x.png', linkage: 'https://wap.gdbs.gov.cn/gdbsWX/mobileH/jsp/itemGuide/itemGuide.jsp?divisionCode=440608&divisionName=%E9%AB%98%E6%98%8E%E5%8C%BA'},
        // {id: '101', title: '办事预约', gnlx: 3, fblx_id: '',images: '/images/FirstLevelPage_6.0/Syicon_11.png', linkage: ''},
        // {id: '100', title: '读书', gnlx: 3, fblx_id: '', images: '/images/FirstLevelPage_6.0/Syicon_10.png', linkage: ''},
      ],
      selectIndex: 0
    }
  },
  components: {
    BetterScroll
  },
  computed: {
    VillageId () {
      return storage.fetch("longData").data;
    }
  },
  methods: {
    ...mapActions(['getGrxx']),
    _Getysgn () {
      Getysgn ({

      }).then (rps => {
        if (rps.data.success) {
          let _data = rps.data.content.items
          for (let index = 0; index < _data.length; index++) {
            const element = _data[index]
            if (element.name === '首页') {
              for (let i = 0; i < this.viewMoreData.length; i++) {
                element.menus.push(this.viewMoreData[i])
              }
            }
          }
          this.initData = _data
        } else {
          this.changtoast(rps.data.message,'error')
        }
      })
    },
    SetselectIndex (item, items) {
    // 首页图标跳转
      let urlVillageId=''
      if (item.name !== '首页'){
        if (!this.VillageId.id) {
          this.$router.push({
            path: "/AreaSelection"
          })
          return
        }else{
          urlVillageId='/'+this.VillageId.id
        }
      }
      this.selectIndex = items.id
      switch (items.gnlx) {  //功能类型
        case 1:   //发布类
          this.$router.push(`/nrfb/${items.fblx_id}${urlVillageId}`)
          break;
        case 2:  //内部链接
          if (item.name !== '妇女通_首页') {
            this.$router.push(items.linkage+urlVillageId)
          } else {
            this.$router.push(items.linkage)
          }
          break;
        case 3:  //外部链接
          if (items.linkage) {
            window.location.href = items.linkage
          } else {
            this.changtoast('功能正在开发中')
          }
          break;
        default:
          break;
      }
        
    },
    SetpersonalCenterIndex (item) {
      this.selectIndex = item.id;
      switch (item.type) {
        case "1":
          if (item.id === '5001') {
            this.getGrxx().then (val => {
              if (val.hasSM) {
                if (val.isGwy) {
                  this.$router.push('/gwyrz')
                } else {
                  this.$router.push('/Certification')
                }
              } else {
                if (val.smrzzt === '认证中' || val.smrzzt === '已撤消') {
                  this.$router.push('/Certification')
                } else {
                  this.$router.push('/smrz')
                }
              }
            })
          } else{
            this.$router.push(item.url);
          }
          break;
        case "3":
          window.location.href = item.url;
          break;
        case "4":
          this.$router.push(`${item.url}/${storage.fetch("longData").data.id}`);
          break;
        case "5":
          this.$store.commit('Set_ButtomTageState', 3) // 底部导航状态
          this.$store.commit('Set_TopTagState', 1) // 诉求反映顶部导航状态
          this.$router.go(-1)
          break;
        default:
          break;
      }
    }
  },
  created () {
    this._Getysgn()
  }
}
</script>

<style lang='scss' scoped type="text/css">
@import '@/style/pages/viewMore.scss';
</style>
