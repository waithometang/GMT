<!-- 主题教育 -->
<template>
  <div class="agriculture">
    <div class="serch">
      <div>
      <input placeholder="请输入搜索内容" type="text" v-model="key"/>
      <img src="/images/secondLevelPages/search.png" @click="search"/>
      </div>
    </div>
    <div class="tag">
      <div class="tag_li" @click="changeType('', 9999)" :class="{'action': stateType == 9999}">
        <span>全部</span>
      </div>
      <div class="tag_li" @click="changeType(item, index)" :class="{'action': stateType == index}" v-for="(item, index) in typeData" :key="index" v-show="item">
        <span>{{item}}</span>
      </div>
    </div>
    <div class="lists">
      <scroller :on-infinite= 'infinite' :on-refresh="refresh" ref="myScroller">
        <releaseContentList :listData="listData" :url='detailsUrl'></releaseContentList>
      </scroller>
    </div>
  </div>
</template>

<script>
import { GetJszdList, GetJszdlb } from '@/api/secondLevelPages/ruralRevitalization'
import releaseContentList from '@/components/releaseContentList'
import {  GetZtjylb } from '@/api/PartyBuilding'
import { GetPulishList } from "@/api/FirstLevelPage.js";

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
      detailsUrl: '/djfbxq',
      lx: '',
      stateType: 9999,
    }
  },
  computed: {
    publishType() {
      return this.$route.params.publishType;
    },
    villageId () {
      return this.$route.params.vid
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
      this.$refs.myScroller.finishInfinite(false)
      this.pageIndex = 1
      this.stateType = index
      this.lx = item
    },
    search () {
      this.pageIndex = 1
      this.$refs.myScroller.finishInfinite(false)
    },
    _GetJszdList (done) {
      if(refreshing) return
      refreshing=true
      GetPulishList({
        Vid: this.villageId,
        pageIndex: this.pageIndex,
        pageSize: this.pageSize,
        mkid: 3,
        fblxId: 13,
        search: this.key,
        lb: this.lx,
      }).then (rps => {
        if (rps.data.success) {
          refreshing=false
          if(this.pageIndex===1) this.listData=rps.data.content
          else this.listData.push(...rps.data.content)
          console.log(this.listData)
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
      GetZtjylb ({

      }).then(rps => {
        if (rps.data.success) {
          this.typeData = rps.data.content.split(';')
        } else {
          this.changtoast(rps.data.message,'error')
        }
      })
    }
  },
  mounted () {
    this._GetJszdlb()
  }
}
</script>

<style lang='scss' scopde>
@import "@/style/components/GmtSearchList.scss";
@import '@/style/pages/secondLevelPages/ruralRevitalization/agriculture.scss';
</style>
 