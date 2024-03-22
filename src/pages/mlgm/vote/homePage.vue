<template>
  <div>
    <div class="homePage">
      <voteHead ref="voteHead" />
      <div class="page-content">
        <div class="info">
          <div class="info-tab">
            <p>{{ infoData.cssl ? infoData.cssl : 0 }}</p>
            <p>参赛选手</p>
          </div>
          <div class="info-tab">
            <p>{{ infoData.tpzs ? infoData.tpzs : 0 }}</p>
            <p>累计票数</p>
          </div>
          <div class="info-tab">
            <p>{{ infoData.fwcs ? infoData.fwcs : 0 }}</p>
            <p>访问次数</p>
          </div>
        </div>
        <div class="time">
          <i class="time-icon"></i>
          结束倒计时<span>{{ time.d }}</span
          >天<span>{{ time.h }}</span
          >时<span>{{ time.m }}</span
          >分<span>{{ time.s }}</span
          >秒
        </div>
        <div class="rule">
          <div class="rule-tab">
            <i class="rule-tab-icon"></i>活动开始：{{ infoData.hdkssj }}
          </div>
          <div class="rule-tab">
            <i class="rule-tab-icon"></i>活动截止：{{ infoData.hdjssj }}
          </div>
          <div class="rule-tab">
            <i
              class="rule-tab-icon"
              :style="{ backgroundImage: 'url(/static/vote/gui.png)' }"
            ></i
            >活动规则：{{ infoData.hdgzjj }}
          </div>
          <div class="rule-tab">
            <i
              class="rule-tab-icon"
              :style="{ backgroundImage: 'url(/static/vote/huo.png)' }"
            ></i
            >活动详情：<span @click="particulars">点击查看 ></span>
          </div>
        </div>
        <div class="search">
          <div class="search-input">
            <input type="text" v-model="value" placeholder="请输入编号或名字" />
          </div>
          <div class="search-but" @click="search">
            <i class="search-but-icon"></i>
          </div>
        </div>
        <p class="tips">（需投满两个部门和两个镇街才能提交）</p>
        <div class="department">
          <div class="department_title">
            <span class="circle_small"></span>
            <span class="circle_big"></span>
            <span class="title">部门</span>
            <span class="circle_big"></span>
            <span class="circle_small"></span>
          </div>
          <van-checkbox-group
            class="department_checkbox"
            v-model="departmentResults"
            :max="2"
            :disabled="sfyt"
          >
            <div class="department_item" v-for="item in bmData" :key="item.id">
              <div @click="voteParticlars(item.id)">
                <img :src="item.fmtp" />
              </div>
              <p>{{ item.mc }}<br />{{ item.dw }}</p>
              <div class="department_check">
                <span
                  ><span class="red">{{ item.ps }}</span
                  >票</span
                >
                <div
                  class="check_box"
                  :class="{
                    select: departmentResults.includes(item.id)
                  }"
                >
                  <van-checkbox :name="item.id">{{
                    departmentResults.includes(item.id) ? '已投' : '投票'
                  }}</van-checkbox>
                </div>
              </div>
            </div>
          </van-checkbox-group>
        </div>
        <div class="department">
          <div class="department_title">
            <span class="circle_small"></span>
            <span class="circle_big"></span>
            <span class="title">镇街</span>
            <span class="circle_big"></span>
            <span class="circle_small"></span>
          </div>
          <van-checkbox-group
            class="department_checkbox"
            v-model="townStreetResults"
            :max="2"
            :disabled="sfyt"
          >
            <div class="department_item" v-for="item in zjData" :key="item.id">
              <div @click="voteParticlars(item.id)">
                <img :src="item.fmtp" />
              </div>
              <p>{{ item.dw }}</p>
              <div class="department_check">
                <span
                  ><span class="red">{{ item.ps }}</span
                  >票</span
                >
                <div
                  class="check_box"
                  :class="{
                    select: townStreetResults.includes(item.id)
                  }"
                >
                  <van-checkbox :name="item.id">{{
                    townStreetResults.includes(item.id) ? '已投' : '投票'
                  }}</van-checkbox>
                </div>
                <!-- <van-checkbox :name="item.id"></van-checkbox> -->
              </div>
            </div>
          </van-checkbox-group>
        </div>
        <div class="btn" @click="voteSubmit">投票 ( 已选{{ count }}项 ）</div>
        <div class="toast">由佛山市高明区政务服务数据管理局提供技术支持</div>
      </div>
    </div>
    <van-dialog
      v-model="dialogShow"
      @confirm="confirm"
      @cancel="cancel"
      :confirmButtonText="'抽取红包'"
      :showCancelButton="false"
      :showConfirmButton="true"
    >
      <div class="dialogshow">
        <img src="/static/tpcg.png" />
        <div>投票成功！</div>
      </div>
    </van-dialog>
  </div>
</template>

<script>
import voteHead from './component/voteHead'
import { tphdxx, tpxxList, tp } from '@/api/secondLevelPage'
import { WaChatrequireShare } from '@/js/WaChatrequireShare'
import { mapActions } from "vuex"
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
      departmentResults: [], // 投票选中的数据
      townStreetResults: [], // 投票选中的数据
      bmData: [], // 部门数据
      zjData: [], // 镇街数据
      sfyt: false,// 是否有投票权
      dialogShow: false, // 弹窗
      isOver: false
    }
  },
  computed: {
    tabState () {
      return this.$store.state.lbTab
    },
    ruleInfo () {
      return this.$store.state.ruleInfo
    },
    params () {
      return { id: this.infoData.id, lb: this.lb }
    },
    // 投票选中数量
    count () {
      return [...this.departmentResults, ...this.townStreetResults].length
    }
  },
  created () {
    // 投票必须关注高明通
    this.$showSubscribe()
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
    confirm () {
      this.$router.push('/mlgm/voteResults')
    },
    cancel () { },
    ...mapActions(['voteMessage']),
    clickTab (item, index) {
      this.$store.commit('SetlbTab', index)
      this.lb = item
      this.pageIndex = 1
      this.toLoad = false
      // this.getListData()
    },
    search () {
      // this.pageIndex = 1
      // this.toLoad = false
      // this.getListData()
      this.getTphdxx()
    },
    particulars () {
      this.$store.commit('SetbuttomTab', 2)
      this.$router.push('/mlgm/vote/particulars')
    },
    countDown () {
      this.countDownDome = setInterval(this.countTime, 1000);
    },
    countTime () {
      let predictTime = new Date(this.infoData.hdjssj).getTime()
      let currentTime = new Date().getTime()
      let date = predictTime - currentTime
      var d, h, m, s
      if (date <= 0) {
        d = 0
        h = 0
        m = 0
        s = 0
        this.time = { d, h, m, s }
        this.isOver = true
        return
      }
      d = Math.floor(date / 1000 / 60 / 60 / 24)
      h = Math.floor(date / 1000 / 60 / 60 % 24)
      m = Math.floor(date / 1000 / 60 % 60)
      s = Math.floor(date / 1000 % 60)
      if (h < 10 || m < 10 || s < 10 || d < 10) {
        d = d < 10 ? "0" + d : d
        h = h < 10 ? "0" + h : h
        m = m < 10 ? "0" + m : m
        s = s < 10 ? "0" + s : s
      }
      this.time = { d, h, m, s }
    },
    voteParticlars (id) {
      this.$router.push(`/mlgm/vote/voteParticlars/${id}`)
    },
    pageScroll () {
      let scrollTop = document.documentElement.scrollTop || document.body.scrollTop
      let windowHeight = document.documentElement.clientHeight || document.body.clientHeight
      let scrollHeight = document.documentElement.scrollHeight || document.body.scrollHeight
      if (scrollTop + windowHeight == scrollHeight) {
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
      let lbs = this.infoData.lbs ? this.infoData.lbs[this.tabState] : null
      tpxxList({
        pageIndex: this.pageIndex,
        pageSize: this.pageSize,
        id: this.infoData.id,
        lb: lbs,
        search: this.value
      }).then(rps => {
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
      // if (this.ruleInfo) {
      //   this.infoData = this.ruleInfo
      //   this.lb = this.infoData.lbs[0]
      //   // this.getListData()
      //   this.countDown()
      //   this.waChatShara()
      //   return
      // }
      // start
      //  tphdxx().then(rps => {
      this.$indicator.open()
      this.$post('api/mlgm/BmzjTpList', {
        search: this.value
      }).then(rps => {
        this.$indicator.close()
        this.departmentResults = []
        this.townStreetResults = []
        if (rps.data.success) {
          this.infoData = rps.data.content.hdxx
          this.sfyt = this.infoData.sfytDto.sfyt
          let csxx_ids = this.infoData.sfytDto.csxx_ids_lb
          let csxxList = rps.data.content.csxxList

          this.$store.commit('SetruleInfo', this.infoData)

          // 获取不同类别数据
          this.bmData = csxxList.filter(item => item.lb === '部门')
          this.zjData = csxxList.filter(item => item.lb === '镇街')
          // 获取选中的数据
          if (csxx_ids) {
            csxx_ids.map(item => {
              if (item.lb === '部门') {
                this.departmentResults = [...this.departmentResults, item.csxx_id]
              } else if (item.lb === '镇街') {
                this.townStreetResults = [...this.townStreetResults, item.csxx_id]
              }
            })
          }
          // this.lb = this.infoData.lbs[0]
          // this.$store.commit('SetDocumentTitle', { k: '投票活动', v: this.infoData.hdmc })
          // this.getListData()
          this.countDown()
          this.waChatShara()
        } else {
          this.$indicator.close()
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
    voteSubmit () {
      if (this.isOver) {
        this.changtoast('投票时间已结束', 'error')
        return
      }
      let zpids = [...this.departmentResults, ...this.townStreetResults]
      if (this.sfyt) {
        this.$alert('今天的投票次数已用完！', '')
        return
      }
      if (zpids.length !== 4) {
        this.changtoast('请投满两个部门和镇街', 'error')
        return
      }
      this.$indicator.open()
      this.$post('api/mlgm/BmzjTpTp', {
        zpids
      }).then(res => {
        if(!(res.data.success)){
          this.changtoast(res.data.message, 'error')
          return;
        }
        if (res.data.content.success) {
          this.$indicator.close()
          this.changtoast('投票成功')
          // this.dialogShow = true
          this.getTphdxx()
        } else {
          this.$indicator.close()
          this.changtoast(res.data.content.msg, 'error')
        }
      })
    },
    waChatShara () {
      let url = this.infoData.dbtp
      WaChatrequireShare(this.infoData.hdmc, this.infoData.hdxq, 'vote', url)
    },
  },
  activated () {
    this.countDown()
    // this.$refs.voteHead.scroll()
    // this.toLoad = false
  },
  deactivated () {
    // this.$refs.voteHead.clos()
    clearInterval(this.countDownDome)
  },
  beforeRouteLeave (to, from, next) {
    this.$refs.voteHead.clos()
    this.toLoad = true
    this.$store.commit('SetmessageBut', false)
    this.$store.commit('SetvoteMessage', false)
    clearInterval(this.countDownDome)
    next()
  },
  beforeRouteEnter (to, from, next) {
    next(vm => {
      console.log(from);
      sessionStorage.setItem('beforeUrl', "true");
    });
  },

}
</script>

<style lang="scss" scoped>
@import './style/homePage.scss';
/deep/ .no-data-text {
  display: none;
}
/deep/ .van-checkbox__icon--disabled.van-checkbox__icon--checked .van-icon {
  color: #1989fa;
}
.dialogshow {
  text-align: center;
  font-size: 30px;
  font-family: PingFang SC;
  font-weight: 500;
  color: #000000;
  padding: 30px;
  padding-right: 0;
  img {
    margin-top: 20px;
    margin-bottom: 20px;
    margin-left: -8px;
  }
}
</style>