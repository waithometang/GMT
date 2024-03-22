<template>
  <div>
    <div class="MissiveList">
      <div class="existList" v-if="listData.length>0">
        <scroller :on-infinite= 'infinite' ref="myScroller">
          <slot name="item" :data="listData"></slot>
        </scroller>
      </div>
      <div class="noList" v-else>
        <p v-if="loading">正在获取数据</p>
        <p v-else>当前没有数据</p>
      </div>
    </div>
  </div>
</template>
<script>
import Axios from '@/api/axios'

export default {
  data () {
    return {
      listData: [],
      pageIndex: 1,
      countNumber:0,
      loading:true,  //是否正在获取数据
    }
  },
  created () {
    if(this.autoFetchData) this.initData()
  },
  methods: {
    updateListData(){  //重新获取数据
      this.pageIndex=1
      this.listData=[]
      this.loading=true
      this.GetListData()
    },
    initData(){
      this.GetListData()
    },
    Api (SettingData) {
      let url = this.url
      let data = SettingData
      return Axios({
        url,
        data
      })
    },
    GetListData (done) {
      let _parms = {pageIndex: this.pageIndex, pageSize: this.pageSize }
      this.Api(Object.assign(_parms,this.parms)).then(rps => {
        this.listData.push(...rps.data.content)
        this.loading=false
        this.pageIndex++
        if(!this.initFlag) this.initFlag=true
        if(done) done()
        if (rps.data.content.length < this.pageSize && this.$refs['myScroller']) {
          this.$refs['myScroller'].finishInfinite(true)
        } 
      })
    },
    infinite (done) {
      this.GetListData(done)
    }
  },
  props:{
    url:{
      type: String,
      required: true
    },
    pageSize:{
      type: Number,
      default: 10
    },
    parms:{
      type: Object
    },
    autoFetchData:{ //自动获取数据，默认是true
      type: Boolean,
      default: true
    },
  }
}
</script>

<style lang='scss' scoped>
@import "@/style/components/GmtCommonList.scss";
</style>
