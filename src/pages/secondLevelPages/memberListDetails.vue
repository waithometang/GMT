<!-- 两位成员 直连代表 党员 详情 -->
<template>
  <div class="memberListDetails">
    <div class="head">
      <div class="head-content">
        <div class="head-top">
          <div class="head-icon">
            <img :src="photo ? SetImageUrl(photo): '/images/yuangong-ling_01.png'" alt="">
          </div>
          <div class="head-title">
            <div class="name-tel">
              <div class="name">{{name}}</div>
                <div class="tel" v-if="showtel">
                  <a :href="'tel:' + tel">
                    <div class="tel-but">
                      联系他
                      <img src="/images/tel.png" alt="">
                    </div>
                  </a>
                </div>
            </div>
            <div class="duty">党内职务: {{dnzw}}</div>
            <div class="duty">村委职务: {{xzzw}}</div>
            <div class="head-tel" v-if="showtel">
              联系电话: {{tel}}
            </div>
          </div>
        </div>
        <div class="head-images">
          <div class="head-images-content">
            <div class="min-images min-images-action">
              工作动态: {{fbzs ? fbzs : 0}}
            </div>
            <div class="min-images">
              <div class="min-icon">
                <img src="/images/icon_dianzan@2x.png" alt="">
              </div>
              {{dzs ? dzs : 0}}
            </div>
            <div class="min-images">
              <div class="min-icon">
                <img src="/images/icon_cai@2x.png" alt="">
              </div>
            {{cps ? cps : 0}}
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="interval">
      <div></div>TA的发布
    </div>
    <div class="list">
      <scroller :on-infinite= 'infinite' :on-refresh="refresh" ref="myScroller">
        <GmtDefaultList :listData='ListData' :issueClass="false"></GmtDefaultList>
      </scroller>
    </div>
  </div>
</template>

<script>
import GmtSearchList from '@/components/GmtSearchList'
import GmtDefaultList from '@/components/GmtDefaultList'
import { Getryxx } from '@/api/secondLevelPage'
 let refreshing = false
export default {
  components: {
    GmtSearchList,
    GmtDefaultList,
  },
  data () {
    return {
      mkid: 2,
      name: '',
      dnzw: '',
      xzzw: '',
      photo: '',
      ListData: [],
      pageIndex: 1,
      pageSize: 10,
      dzs: '',
      cps: '',
      tel: '',
      fbzs: ''
    }
  },
  computed: {
    lx () {
      return this.$route.params.statetype
    },
    id () {
      return this.$route.params.id
    },
    GmtLoadingState () {
      return this.$store.sate.GmtLoadingState
    },
    Grxx () {
      return JSON.parse(sessionStorage.getItem('_ss_grxx'))
    },
    userinfo () {
      return this.$store.state.userinfo
    },
    showtel () {
      return this.Grxx.id === this.userinfo.id
    }
  },
  methods: {
    GetListData (done) {
      this.$store.commit('Set_GmtLoadingState', true)
      if(refreshing) return
      refreshing=true
      Getryxx ({
        lx: this.lx,
        id: this.id
      }).then (rps => {
        this.$store.commit('Set_GmtLoadingState', false)
        if (rps.data.success) {
          refreshing=false
          let _data = rps.data.content
          this.name = _data.name
          this.dnzw = _data.dnzw
          this.photo = _data.photo
          this.xzzw = _data.xzzw
          this.dzs = _data.dzs
          this.cps = _data.cps
          this.tel = _data.tel
          this.fbzs = _data.fbzs
          if (this.pageIndex == 1) this.ListData = _data.wddt
          else this.ListData.push(..._data.wddt)
          this.pageIndex++
          if(done) done()
          if (_data.wddt.length < this.pageSize && this.$refs['myScroller']) {
            this.$refs.myScroller.finishInfinite(true)
          }
        } else {
          this.changtoast(rps.data.message,'error')
          this.$refs.myScroller.finishInfinite(true)
        }
      })
    },
    infinite (done) {
      this.GetListData(done)
    },
    refresh (done) {
      this.pageIndex = 1
      this.$refs.myScroller.finishInfinite(false)
      this.GetListData(done)
    },
    SetImageUrl (item) {
      return item.slice(2,item.length)
    }
  },
  created () {
    switch (this.lx) {
      case '1':
        document.title = '两委成员'
        this.mkid = 2
        break;
      case '2':
        document.title = '村居直联'
        this.mkid = 2
        break
      case '3':
        document.title = '党员积分'
        break
      default:
        break;
    }
    this.GetListData()
  }
};
</script>

<style lang="scss" scoped type="text/css">
.memberListDetails /deep/ .GmtDefaultList {
  padding: 0 20px;
}
@import '@/style/pages/secondLevelPages/memberListDetails.scss';
</style>

