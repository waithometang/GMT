<template>
  <div>
    <GmtSearchList url="api/sy/tpxxList" :useSearch="false" :autoFetchData="false" :parms="params">
    <template slot="item" slot-scope="listData">
    <div class="homePage">
    <voteHead :images="infoData.dbtp" :title="infoData.hdby" ref="voteHead"/>
    <div class="page-content">
      <div class="info">
        <div class="info-tab">
          <p>{{infoData.csxs ? infoData.csxs : 0}}</p>
          <p>参赛选手</p>
        </div>
        <div class="info-tab">
          <p>{{infoData.ljps ? infoData.ljps : 0}}</p>
          <p>累计票数</p>
        </div>
        <div class="info-tab">
          <p>{{infoData.fwcs ? infoData.fwcs : 0}}</p>
          <p>访问次数</p>
        </div>
      </div>
      <div class="time">
        <i class="time-icon"></i>
        结束倒计时<span>{{time.d}}</span>天<span>{{time.h}}</span>时<span>{{time.m}}</span>分<span>{{time.s}}</span>秒
      </div>
      <div class="rule">
        <div class="rule-tab">
          <i class="rule-tab-icon"></i>活动开始：{{infoData.tpkssj}}
        </div>
        <div class="rule-tab">
          <i class="rule-tab-icon"></i>活动截止：{{infoData.tpjzsj}}
        </div>
        <div class="rule-tab">
          <i class="rule-tab-icon" :style="{backgroundImage: 'url(/static/vote/gui.png)'}"></i>活动规则：{{infoData.hdgz}}
        </div>
        <div class="rule-tab">
          <i class="rule-tab-icon" :style="{backgroundImage: 'url(/static/vote/huo.png)'}"></i>活动详情：<span @click="particulars">点击查看 ></span>
        </div>
      </div>
      <div class="search">
        <div class="search-input">
          <input type="text" v-model="value" placeholder="请输入名字或编号">
        </div>
        <div class="search-but" @click="search">
          <i class="search-but-icon"></i>
        </div>
      </div>
      <div class="classify">
        <div class="classify-tab" :class="{'classify-tab-action': tabState === index}" @click="clickTab(item,index)" v-for="(item, index) in infoData.lbs" :key="index">{{item}}</div>
      </div>
        <div class="list">
            <ul>
            <li v-for="(item, index) in listData.data" :key="index">
              <div class="tab-icon" @click="voteParticlars(item)">
                <img :src="item.zptp" alt="">
              </div>
              <div class="tab-info">
                <div class="name">{{item.xm}}</div>
                <div class="name"><span>{{item.tps}}</span>票</div>
              </div>
              <div class="tan-but">
                <div class="but" @click="vote(item)">投票</div>
              </div>
              <div class="ranking">{{item.xh}}</div>
            </li>
            <div style="clear:both"></div>
          </ul>
        </div>
      <div class="toast">
        由佛山市高明区政务服务数据管理局提供技术支持
      </div>
    </div>
    </div>
    </template>
    </GmtSearchList>
  </div>
</template>

<script>
import voteHead from './component/voteHead'
import { tphdxx, tpxxList, tp } from  '@/api/secondLevelPage'
import { WaChatrequireShare } from '@/js/WaChatrequireShare'
import {mapActions} from "vuex"
import GmtSearchList from "@/components/GmtSearchList";

export default {
  components: {
    voteHead,
    GmtSearchList
  },
  data () {
    return {
      countDownDome: '',
      time: '',
      listData: [],
      infoData: {},
      lb: '',
      pageSize: 10,
      pageIndex: 1,
      toLoad: false,
      loading: false,
      value: '',
    }
  },
  computed: {
    tabState () {
      return this.$store.state.lbTab
    },
    ruleInfo () {
      return this.$store.state.ruleInfo
    },
    params(){
      return {id:this.infoData.id,lb:this.lb}
    }
  },
  created () {
    this.getTphdxx()
  },
  mounted () {
    this.$nextTick(rps => {
      window.onscroll = (rps => {
        this.pageScroll()
      })
    })
  },
  methods: {
    ...mapActions(['voteMessage']),
    clickTab (item, index) {
      this.$store.commit('SetlbTab', index)
      this.lb = item
      this.pageIndex = 1
      this.toLoad = false
      // this.getListData()
    },
    search () {
      this.pageIndex = 1
      this.toLoad = false
      // this.getListData()
    },
    particulars () {
      this.$store.commit('SetbuttomTab', 2)
      this.$router.push('/particulars')
    },
    countDown () {
      this.countDownDome = setInterval(this.countTime,1000);
    },
    countTime () {
      let predictTime = new Date(this.infoData.tpjzsj).getTime()
      let currentTime = new Date().getTime()
      let date = predictTime - currentTime
      var d, h, m, s
      if (date <= 0) {
        d = 0
        h = 0
        m = 0
        s = 0
        this.time = {d, h, m, s}
        return
      }
      d = Math.floor(date/1000/60/60/24)+1
      h = Math.floor(date/1000/60/60%24)
      m = Math.floor(date/1000/60%60)
      s = Math.floor(date/1000%60)
      if (h < 10 || m < 10 || s < 10 || d < 10) {
        d = d < 10 ? "0" + d : d
        h = h < 10 ? "0" + h : h
        m = m < 10 ? "0" + m : m
        s = s < 10 ? "0" + s : s
      }
      this.time = {d, h, m, s}
    },
    voteParticlars (item) {
      this.$router.push(`/voteParticlars/${item.id}`)
    },
    pageScroll () {
      let scrollTop = document.documentElement.scrollTop||document.body.scrollTop
      let windowHeight = document.documentElement.clientHeight || document.body.clientHeight
      let scrollHeight = document.documentElement.scrollHeight||document.body.scrollHeight
      if (scrollTop+windowHeight==scrollHeight) {
        if (!this.toLoad) {
          // this.getListData()
        }
      }
    },
    getListData () {
      return //不需要此方法
      if (this.loading) {
        return
      }
      this.loading = true
      let lbs = this.infoData.lbs?this.infoData.lbs[this.tabState]:null
      tpxxList ({
        pageIndex: this.pageIndex,
        pageSize: this.pageSize,
        id: this.infoData.id,
        lb: lbs,
        search: this.value
      }).then (rps => {
        this.loading = false
        if (rps.data.success) {
          if (this.pageIndex === 1) {
            this.listData = rps.data.content
          } else {
            this.listData = this.listData.concat(rps.data.content)
          }
          if (rps.data.content.length < 10) {
            this.toLoad = true
          } else {
            this.pageIndex++
          }
        } else {
          this.changtoast(rps.data.message, 'error')
        }
      })
    },
    getTphdxx () {
      if (this.ruleInfo) {
        this.infoData = this.ruleInfo
        this.lb = this.infoData.lbs[0]
        // this.getListData()
        this.countDown()
        this.waChatShara()
        return
      }
      tphdxx ().then (rps => {
        if (rps.data.success) {
          this.infoData = rps.data.content
          this.$store.commit('SetruleInfo', this.infoData)
          this.lb = this.infoData.lbs[0]
          this.$store.commit('SetDocumentTitle', {k:'投票活动',v:this.infoData.hdmc})
          // this.getListData()
          this.countDown()
          this.waChatShara()
        } else {
          this.changtoast(rps.data.message, 'error')
        }
      })
    },
    vote (item) {
      let that = this
      this.voteMessage({
        id: item.id,
        success: function () {
          item.tps = item.tps + that.$store.state.increaseNumber
          that.infoData.ljps = that.infoData.ljps + that.$store.state.increaseNumber
        }
      })
    },
    waChatShara () {
      let url = this.infoData.dbtp
      WaChatrequireShare(this.infoData.hdmc, this.infoData.hdxq, 'vote', url)
    }
  },
  // activated () {
  //   this.$refs.voteHead.scroll()
  //   this.toLoad = false
  // },
  // deactivated () {
  //   this.$refs.voteHead.clos()
  //   clearInterval(this.countDownDome)
  // },
  beforeRouteLeave (to, from, next) {
    this.$refs.voteHead.clos()
    this.toLoad = true
    this.$store.commit('SetmessageBut', false)
    this.$store.commit('SetvoteMessage', false)
    clearInterval(this.countDownDome)
    next()
  }
  
}
</script>

<style lang="scss" scoped>
@import './style/homePage.scss';
/deep/ .no-data-text{
  display:none;
}
</style>