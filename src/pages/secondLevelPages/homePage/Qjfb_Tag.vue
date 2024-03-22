<template>
  <div class="agriculture" ref="agriculture">
    <div class="serch">
      <div>
      <input placeholder="请输入搜索内容" type="text" v-model="key"/>
        <div class="imagesss"  @click="search">
          <img src="/images/secondLevelPages/search.png"/>
        </div>
      </div>
    </div>
    <div class="tag">
      <ul class="tag_ul">
        <li class="tag_li" @click="changeType('', 9999)" :class="{'action': stateType == 9999}">全部</li>
        <li class="tag_li" @click="changeType(item, index)" :class="{'action': stateType == index}" v-for="(item, index) in typeData" :key="index" v-show="item">{{item}}</li>
        <div style="clear:both;"></div>
      </ul>
    </div>
    <div class="lists" ref="lists">
      <scroller :on-infinite= 'infinite' :on-refresh="refresh" ref="myScroller">
        <GmtDefaultList :listData="listData" :mkid="mkid"></GmtDefaultList>
      </scroller>
    </div>
  </div>
</template>

<script>
import { storage } from "@/js/until";
import GmtDefaultList from '@/components/GmtDefaultList'
import { GetAddReaded,GetFblx } from '@/api/secondLevelPage'
import { GetPulishList,GetFbTag } from '@/api/FirstLevelPage'

let refreshing = false
let tagMapper={'wg':'务工类别', 'yh':'优惠政策类别'}  //标签key对照字典

export default {
  components: {
    GmtDefaultList
  },
  data () {
    return {
      key: '',
      pageIndex: 1,
      pageSize: 10,
      listData: [],
      typeData: [],
      detailsUrl: '',
      lx: '',
      stateType: 9999,
      updatedState: false,
      showList: false
    }
  },
  computed: {
    fblxId(){
      return this.$route.params.lxid
    },
    mkid () {
      return this.$route.params.mkid*1
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
      this._GetJszdList()
    },
    search () {
      this.pageIndex = 1
      this.listData = []
      this.$refs.myScroller.finishInfinite(false)
    },
    _GetJszdList (done) {
      if(refreshing) return
      refreshing=true
      GetPulishList({
        pageIndex: this.pageIndex,
        pageSize: this.pageSize,
        search: this.key,
        fblxId:this.fblxId,
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
      let tag=tagMapper[this.$route.params.tag]
      if(!tag) return
      GetFbTag (tag).then(rps => {
        if (rps.data.success) {
          if(rps.data.content) 
            this.typeData = rps.data.content.split(';')
            this.SetListTop()
        } else {
          this.changtoast(rps.data.message,'error')
        }
      })
    },
    SetListTop(){
      this.$nextTick(function (){
        if (!this.updatedState) {
          let str = this.$refs.agriculture.clientHeight
          this.$refs.lists.style.top = str + 'px'
          this.updatedState = true
        }
      })
    }
  },
  created() {
    this._GetJszdlb()
    this.detailsUrl='/nrfbxx/'+this.$route.params.mkid
    GetFblx(this.fblxId).then(res=>{
      this.showList = true
      if(res.data.success){
        if(res.data.content.title) document.title=res.data.content.title
      }else{
        // this.changtoast(res.data.message,'error')
      } 
    })
  }
}
</script>

<style lang='scss' scopde>
@import "@/style/components/GmtSearchList.scss";
@import '@/style/pages/secondLevelPages/ruralRevitalization/agriculture.scss';
</style>
 