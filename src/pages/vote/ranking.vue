<template>
  <div class="ranking" v-if="infoData">
    <div class="tab-list">
      <div class="tab" :class="{'tan_action': tabState === index}" @click="setTab(item, index)" v-for="(item, index) in infoData.lbs" :key="index">{{item}}</div>
    </div>
    <div class="head">
      <div class="top-three">
        <div class="ranking-lsit">
          <div class="ranking-lsit-tab">
            <div class=" ranking-lsit-tab-name" v-if="twoData.length > 0">{{twoData[0].xm}}</div>
            <div class="ranking-lsit-tab-number" v-if="twoData.length > 0">{{twoData[0].ps}}票</div>
          </div>
          <div class="ranking-lsit-tab two">
            <div class=" ranking-lsit-tab-name" v-if="oneData.length > 0">{{oneData[0].xm}}</div>
            <div class="ranking-lsit-tab-number" v-if="oneData.length > 0">{{oneData[0].ps}}票</div>
          </div>
          <div class="ranking-lsit-tab">
            <div class=" ranking-lsit-tab-name" v-if="therrData.length > 0">{{therrData[0].xm}}</div>
            <div class="ranking-lsit-tab-number" v-if="therrData.length > 0">{{therrData[0].ps}}票</div>
          </div>
        </div>
      </div>
      <div class="tag">
        <div class="icon"><img :src="`/static/vote/laba.gif?${Math.random()}`" alt=""></div>
        <div class="inform-title">
          <div class="title" ref="title">{{infoData.hdby}}</div>
        </div>
      </div>
    </div>
    <div class="list-head">
      <div class="list-head-tab">排名</div>
      <div class="list-head-tab">参与选手</div>
      <div class="list-head-tab">票数</div>
    </div>
    <div  v-for="(item, index) in listData" :key="index">
      <div class="list-head" :class="{'tab-action': index%2 === 0}" v-if="item">
        <div class="list-head-tab">{{item.pm}}</div>
        <div class="list-head-tab">{{item.xm}}</div>
        <div class="list-head-tab"><span>{{item.ps}}票</span></div>
      </div>
    </div>
  </div>
</template>

<script>
import { pxbxx, pxbList, tphdxx } from  '@/api/secondLevelPage'
export default {
  data () {
    return {
      listData: [],
      pageSize: 15,
      pageIndex: 1,
      toLoad: false,
      loading: false,
      oneData: '',
      twoData: '',
      therrData: '',
      lb: '',
      countDownDome: ''
    }
  },
  computed: {
    tabState () {
      return this.$store.state.lbTab1
    },
    infoData () {
      return this.$store.state.ruleInfo
    }
  },
  mounted () {
    this.$nextTick(rps => {
      window.onscroll = (rps => {
        this.pageScroll()
      })
      this.scroll()
    })
  },
  created () {
    if (!this.infoData) {
      tphdxx().then (rps => {
        if (rps.data.success) {
          this.lb = rps.data.content.lbs[0]
          this.$store.commit('SetruleInfo', rps.data.content)
          this.getpxbxx()
          this.getListData()
        } else {
          this.changtoast(rps.data.message, 'error')
        }
      })
    } else {
      this.lb = this.infoData.lbs[0]
      this.getpxbxx()
      this.getListData()
    }
  },
  methods: {
    setTab (item, ind) {
      this.lb = item
      this.$store.commit('SetlbTab1', ind)
      this.oneData = ''
      this.twoData = ''
      this.therrData = ''
      this.listData = []
      this.pageIndex = 1
      this.toLoad = false
      this.getpxbxx()
      this.getListData()
    },
    pageScroll () {
      let scrollTop = document.documentElement.scrollTop || document.body.scrollTop
      let windowHeight = document.documentElement.clientHeight || document.body.clientHeight
      let scrollHeight = document.documentElement.scrollHeight || document.body.scrollHeight
      if (scrollTop + windowHeight === scrollHeight) {
        if (this.toLoad) {
          return
        }
        this.getListData()
      }
    },
    getListData () {
      if (this.loading) {
        return
      }
      this.loading = true
      let lbs = this.infoData.lbs[this.tabState]
      pxbList ({
        pageSize: this.pageSize,
        pageIndex: this.pageIndex,
        id: this.infoData.id,
        lb: this.lb
      }).then (rps => {
        this.loading = false
        if (rps.data.success) {
          this.listData = this.listData.concat(rps.data.content)
          if (rps.data.content.length < 15) {
            this.toLoad = true
          } else {
            this.pageIndex++
          }
        } else {
          this.changtoast(rps.data.message, 'error')
        }
      })
    },
    getpxbxx () {
      pxbxx({
        lb: this.lb
      }).then(rps => {
        if (rps.data.success) {
          let data = rps.data.content.pm
          this.oneData = data.filter(val => {
            return val.pm === 1
          })
          this.twoData = data.filter(val => {
            return val.pm === 2
          })
          this.therrData = data.filter(val => {
            return val.pm === 3
          })
        } else {
          this.changtoast(rps.data.message, 'error')
        }
      })
    },
    scroll () {
      let dome = this.$refs.title
        this.countDownDome =  setInterval(() => {
        let dome = this.$refs.title
        if (dome) {
          if (dome.scrollWidth >= dome.clientWidth) {
            dome.scrollLeft = dome.scrollLeft + 2
            if (dome.scrollLeft + dome.clientWidth === dome.scrollWidth) {
              dome.scrollLeft = 0
            }
          } else {
            clearInterval(this.countDownDome)
          }
        } else {
          clearInterval(this.countDownDome)
        }
      }, 100)
    }
  },
  beforeRouteEnter (to, from, next) {
    next(vm => {
      vm.$store.commit('SetbuttomTab', 3)
    })
  },
  activated () {
    this.scroll()
  },
  deactivated () {
    clearInterval(this.countDownDome)
  },
  beforeRouteLeave (to, from, next) {
    clearInterval(this.countDownDome)
    next()
  }
}
</script>

<style lang='scss' scoped>
@import './style/ranking.scss';
</style>