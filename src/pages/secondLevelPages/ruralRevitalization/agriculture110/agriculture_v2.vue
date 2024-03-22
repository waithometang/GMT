<template>
  <div class="agriculture">
    <div class="serch">
      <div>
        <input placeholder="请输入搜索内容" type="text" v-model="key"/>
        <div class="imagesss"  @click="search">
          <img src="/images/secondLevelPages/search.png"/>
        </div>
      </div>
    </div>
    <div class="tag">
      <div class="tag_ul">
        <div class="tag_li" @click="changeType('', 9999)" :class="{'action': stateType == 9999}">
        <span>全部</span>
      </div>
      <div class="tag_li" @click="changeType(item, index)" :class="{'action': stateType == index}" v-for="(item, index) in typeData" :key="index" v-show="item">
        <span>{{item}}</span>
      </div>
      </div>
      
    </div>
    <div class="lists">
      <scroller :on-infinite= 'infinite' :on-refresh="refresh" ref="myScroller">
        <div class="list" v-for="(item, index) in listData" :key="index" @click="viewDetails(item)">
          <div class="list-left">
            <div class="list-title">
              <span v-if="item.publishGrade != null && issueClass">{{_GetGrade(item.publishGrade)}}</span>
                {{item.title}}
            </div>
            <div class="list-icon" :class="{'not-images': !item.cover}">
              <div class="list-icon-li time">
                <div class="icon">
                  <img src="/images/img_13.png" alt="">
                </div>
                <div class="name">{{item.publishTime || item.date || item.editTime}}</div>
              </div>
              <div class="list-icon-li">
                <div class="icon">
                  <img src="/images/img_11.png" alt="">
                </div>
                <div class="name">{{item.readedCount}}</div>
              </div>
              <div class="list-icon-lb">
                {{item.lb}}
              </div>
            </div>
          </div>
          <div class="list-right" v-if="item.cover">
            <img :src="item.cover ? SetImages(item.cover) :'/images/FirstLevelPage/tacitlyapprove.jpg'" alt="">
          </div>
        </div>
      </scroller>
    </div>
  </div>
</template>

<script>
import { storage, session_Storage } from "@/js/until";
import { GetJszdList, GetJszdlb } from '@/api/secondLevelPages/ruralRevitalization'
import { GetAddReaded,GetFblx } from '@/api/secondLevelPage'
import releaseContentList from '@/components/releaseContentList'

let refreshing = false

export default {
  components: {
    releaseContentList
  },
  data () {
    return {
      key: '',
      pageIndex: 1,
      pageSize: 10,
      listData: [],
      typeData: [],
      detailsUrl: '/jszdxq',
      lx: '',
      stateType: 9999,
      mkid: 4
    }
  },
  computed: {
    longdata () {
      return storage.fetch('longData').data
    }
  },
  methods: {
    infinite (done) {
      this._GetJszdList(done)
    },
    refresh (done) {
      this.pageIndex = 1
      this._GetJszdList(done)
      this.$refs.myScroller.finishInfinite(false)
    },
    changeType (item, index) {
      this.pageIndex = 1
      this.stateType = index
      this.lx = item
      this.listData = []
      this.$refs.myScroller.finishInfinite(false)
    },
    search () {
      this.pageIndex = 1
      this.$refs.myScroller.finishInfinite(false)
      this._GetJszdList()
    },
    _GetJszdList (done) {
      if(refreshing) return
      refreshing=true
      GetJszdList({
        villageId: this.longdata.id,
        pageIndex: this.pageIndex,
        pageSize: this.pageSize,
        search: this.key,
        lb: this.lx,
      }).then (rps => {
        if (rps.data.success) {
          refreshing=false
          if(this.pageIndex===1) this.listData=rps.data.content
          else this.listData.push(...rps.data.content)
          this.pageIndex++
          if(!this.initFlag) this.initFlag=true
          if(done) done()
          if (rps.data.content.length < this.pageSize && this.$refs['myScroller']) {
            this.$refs.myScroller.finishInfinite(true)
          }
        } else {
          this.changtoast(rps.data.message,'error')
          this.$refs.myScroller.finishInfinite(true)
        }
      })
    },
    _GetJszdlb () {
      GetJszdlb ({

      }).then(rps => {
        if (rps.data.success) {
          this.typeData = rps.data.content.split(';')
        } else {
          this.changtoast(rps.data.message,'error')
        }
      })
    },
    viewDetails (item) {
      if (item.linkage) {
        GetAddReaded ({
          id: item.id,
          lb: 0
        })
        // let url = item.linkage + '&scene=4#wechat_redirect'
        // window.location.href = url
        session_Storage.save('ButtomTageState', this.$store.state.ButtomTageState)
        window.location.href = item.linkage
      } else {
        if (this.mkid) {
          let _mkid = this.mkid
          if( _mkid === 5) _mkid = 2
          this.$router.push(`/nrfbxx/${_mkid}/${item.id}`)
        } else {
          this.$router.push(`/nrfbxx/${item.mkid || item.mk}/${item.id}`)
        }
      }
    },
        // 设置图片
    SetImages (item) {
      if (item.indexOf('../') === 0) { // 自己上传的
        return '/gmt' + item.slice(2, item.length)
      } else {
        return item
      }
    },
    _GetGrade (item) {
      switch (item) {
        case 0:
          return '区级发布'
          break;
        case 1:
          return '镇街发布'
          break;
        case 2:
          return '村居发布'
          break;
        case 5:
          return '两委发布'
          break;
        case 6:
          return '直联发布'
          break;
        case 7:
          return '实事发布'
          break;
        default:
          return ''
          break;
      }
    },
  },
  mounted () {
    this._GetJszdlb()
  }
}
</script>

<style lang='scss' scopde>
@import "@/style/components/GmtSearchList.scss";
@import '@/style/GmtDefaultList.scss';
@import '@/style/pages/secondLevelPages/ruralRevitalization/agriculture.scss';
</style>
 