<template>
  <div class="Myreflect">
    <div class="tab-list">
      <div class="tab-li" :class="{'tab-li-action': tabState == 1}" @click="SetTabState(1)">全部</div>
      <div class="tab-li" :class="{'tab-li-action': tabState == 2}" @click="SetTabState(2)">待办理</div>
      <div class="tab-li" :class="{'tab-li-action': tabState == 3}" @click="SetTabState(3)">已办理</div>
      <div class="tab-li" :class="{'tab-li-action': tabState == 4}" @click="SetTabState(4)">已评价</div>
      <div class="tab-li" :class="{'tab-li-action': tabState == 5}" @click="SetTabState(5)">已取消</div>
    </div>
    <div class="list-content">
      <scroller :on-infinite= 'infinite' :on-refresh="refresh" ref="myScroller">
        <div class="content" v-for="(item, index) in listData" :key="index">
          <div class="iconTitle"> 
            <div class="left">
              <img :src="item.headPortrait">
            </div>
            <div class="right">
              <div class="nameTitle">
                <div class="name">{{item.name}}</div>
                <div class="title">{{item.content}}</div>
              </div>
              <div class="icon">
                <div class="images" v-for="(item_1, index_1) in item.picture" :key="index_1" @click="lookOver(item,index_1)">
                  <img :src="item_1">
                </div>
              </div>
              <div class="timecomment">
                <img src="/images/weizhi.png">
                {{item.addr}}
              </div>
              <div class="timecomment right">
                <div>
                  {{item.date}}
                </div>
              </div> 
              <!--  v-if="tabState === 3 || tabState === 4" -->
              <div class="caseInfo">
                <span @click="viewProgress(item)">处理结果</span>
              </div>
            </div>
          </div>
        </div>
      </scroller>
    </div>
    <lookOverImage v-if='pupopLook' :imgSrc='imgSrc' :index="initialSlide" @SETbigImg="bigImg"></lookOverImage>
    <mt-popup v-model="popupVisible" position="bottom">
      <div class="view-progress">
        <div class="progress-content" :class="{'progress-content-action': QyfypjData}">
          <div class="content-interval">
            <div class="content-interval-icon"></div>
            {{QyfyjgData.blzt}}
          </div>
          <div class="content-interval">
            <div class="content-interval-icon"></div>
            回复内容:
          </div>
          <div class="content-text" v-if="QyfyjgData.hfnr" v-html="QyfyjgData.hfnr">
            {{QyfyjgData.hfnr}}
          </div>
          <div class="content-interval">
            <div class="content-interval-icon"></div>
            处理评价:
          </div>
          <div class="content-text" v-if="QyfypjData" v-html="QyfypjData">
            {{QyfypjData}}
          </div>
          <div class="content-info" v-if="QyfyjgData.hfrq || QyfyjgData.hfry">
            <div class="content-info-list" v-if="QyfyjgData.hfrq">回复人: {{QyfyjgData.hfrq}}</div>
            <div class="content-info-list right" v-if="QyfyjgData.hfry">回复时间: {{QyfyjgData.hfry}}</div>
          </div>
        </div>
        <div class="grade-comment-content">
          <div class="comment-grade">
            <div class="content-interval">
              <div class="content-interval-icon"></div>
              处理结果评分:
            </div>
            <div class="grade-icon-content">
              <div class="grade-icon-list">
                <div class="grade-icon-list-tab" v-for="(item, index) in 5" :key="index" @click="SetserverScore(index)">
                  <img v-if="index + 1 <= serverScore" src="/images/xingimg_02.png" alt="">
                  <img v-else src="/images/xingimg_03.png">
                </div>
              </div> 
              <div class="grade-icon-text">{{serverScore === 1 ? '非常不满意' : serverScore === 2 ? '不太满意' : serverScore === 3 ? '基本满意' : serverScore === 4 ? '比较满意' : serverScore === 5 ? '非常满意' : '待评价'}}</div>
            </div>
          </div>
          <div class="progress-comment" v-if="!QyfypjData">
            <div class="comment-inpt">
              <input type="text" v-model="inputText" placeholder="请对处理结果做出评价">
            </div>
            <div class="comment-but" @click="comment_but">发送</div>
          </div>
        </div>
      </div>
    </mt-popup>
  </div>
</template>

<script>
import GmtSearchList from '@/components/GmtSearchList'
import lookOverImage from '@/components/secondLevelPages/ruralRevitalization/lookOverImage'
import {GetQyfyList, GetQyfyjg, GetQyfypj, Qyfypj} from  '@/api/secondLevelPage'

let refreshing = false
export default {
  data () {
    return {
      url : 'api/peopleopen/GetQyfyList',
      caseInfoindex: '',
      pupopLook: false,
      imgSrc: [],
      initialSlide: 0,
      tabState: 1,
      renovateScroller: false,
      zt: '',
      pageIndex: 1,
      pageSize: 10,
      listData: [],
      popupVisible:false,
      serverScore: '',
      QyfyjgData: '',// 企业反应结果数据
      QyfypjData: '', // 企业反应评价数据
      item_id: '',
      inputText: ''
    }
  },
  components: {
    GmtSearchList,
    lookOverImage
  },
  methods: {
    // 打分
    SetserverScore (item) {
      if (!this.QyfypjData) {
        this.serverScore = item+1
      }
    },
    bigImg (item) {
      this.pupopLook = item
    },
    SetTabState (item) {
      this.tabState = item
      switch (item) {
        case 1:
          this.zt = ''
          break;
          case 2:
          this.zt = '待办理'
          break;
          case 3:
          this.zt = '已办理'
          break;
          case 4:
          this.zt = '已评价'
          break;
          case 5:
          this.zt = '已取消'
          break;
        default:
          break;
      }
      this.pageIndex = 1
      this.listData = []
      this.$refs.myScroller.finishInfinite(false)
    },
    // 查看照片
    lookOver (item,index) {
      this.pupopLook = true
      this.initialSlide = index // 记录分页数据
      this.imgSrc = item.picture // 记录需要展示的图片
    },
    GetListData (done) {
      if(refreshing) return
      refreshing=true
      GetQyfyList({
        zt: this.zt,
        pageIndex: this.pageIndex,
        pageSize: this.pageSize,
      }).then(rps => {
        refreshing=false
        if (rps.data.success) {
          if(this.pageIndex===1) this.listData=rps.data.content;
          else this.listData.push(...rps.data.content)
          this.pageIndex++
          if(done) done()
          if (rps.data.content.length < this.pageSize && this.$refs['myScroller']) {
            this.$refs.myScroller.finishInfinite(true)
          }
        } else {
          this.$refs.myScroller.finishInfinite(true)
          this.changtoast(rps.data.message, 'error')
        }
      })
    },
    infinite (done) {
      this.GetListData(done)
    },
    refresh (done) {
      this.pageIndex = 1
      this.GetListData(done)
      this.$refs.myScroller.finishInfinite(false)
    },
    // 查看办理进度
    viewProgress (item) {
      this.item_id = item.id
      GetQyfyjg ({
        id: item.id
      }).then (rps => {
        if (rps.data.success) {
          this.popupVisible = true
          this.QyfyjgData = rps.data.content
        }else {
          this.changtoast(rps.data.message, 'error')
        }
      })
      GetQyfypj ({
        id: item.id
      }).then (rps => {
        if (rps.data.success) {
          this.popupVisible = true
          this.QyfypjData = rps.data.content.pj
          this.serverScore = rps.data.content.pf
        }else {
          this.changtoast(rps.data.message, 'error')
        }
      })
    },
    // 发布评价
    comment_but () {
      Qyfypj({
        id: this.item_id,
        pf: this.serverScore,
        pj: this.inputText
      }).then (rps => {
        if (rps.data.success) {

        } else {
          this.changtoast(rps.data.message, 'error')
        }
      })
    }
  }
}
</script>
<style lang="scss" type="text/css" scoped>
@import '@/style/components/secondLevelPages/PersonalCenter/Myreflect.scss';
</style>

