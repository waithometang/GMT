<template>
  <div class="rjhjzz">
    <div class="serch">
      <div>
        <input v-model="search" placeholder="请输入搜索内容" type="text" />
        <div class="imagesss" @click="clickSearch">
          <img src="/images/secondLevelPages/search.png"/>
        </div>
      </div>
    </div>
    <div class="list_tab">
      <div class="tab tab_margin" :class="{'tab_action':zjInfo.id}" @click="select_tab(1)">
        <div class="name" :class="{'name_action': zjInfo.id}">{{zjInfo.id  ? zjInfo.name :'选择镇街'}}</div>
        <div class="icon"><img :src='zjInfo.id ? "/static/a@2x.png" : "/static/c@2x.png"' alt=""></div>
      </div>
        <div class="tab tab_margin" :class="{'tab_action': cjInfo.id}" @click="select_tab(2)">
        <div class="name" :class="{'name_action': cjInfo.id}">{{cjInfo.id  ? cjInfo.name :'选择村居'}}</div>
        <div class="icon"><img :src='cjInfo.id ? "/static/a@2x.png" : "/static/c@2x.png"' alt=""></div>
      </div>
      <div class="tab" :class="{'tab_action': zrcInfo.id}" @click="select_tab(3)">
        <div class="name" :class="{'name_action': zrcInfo.id}">{{zrcInfo.id ? zrcInfo.name :'选择村小组'}}</div>
        <div class="icon"><img :src='zrcInfo.id ? "/static/a@2x.png" : "/static/c@2x.png"' alt=""></div>
      </div>
    </div>
    <div class="list_content" ref="list_content" :style="styleData">
      <scroller :on-infinite= 'infinite' :on-refresh="refresh" ref="myScroller">
        <GmtDefaultList :listData="listData" :mkid='4'/>
      </scroller>
    </div>
    <mt-popup v-model="popupVisible" position="bottom">
      <div v-if="popupVisible" class="accomplish" @click="setpopupVisible()">完成</div>
      <mt-picker v-if="popupVisible" :slots="slots" @change="onValuesChange" valueKey="name"></mt-picker>
    </mt-popup>
  </div>
</template>

<script>
import GmtDefaultList from '@/components/GmtDefaultList'
import { PublishUtil } from "@/js/businessUntil";
import { publicListData } from '@/api/secondLevelPage'
import { Getzjxx } from '@/api/secondLevelPage'
let refreshing = false

export default {
  data () {
    return {
      slots: [
        {
          flex: 1,
          values: [],
          textAlign: 'center',
          defaultIndex: 1,
          className: 'picker_list',
        }
      ],
      popupVisible: false,
      zjxxData: '',
      tabState: 1,
      zjInfo: {}, // 镇街信息
      cjInfo: {}, // 村居信息
      zrcInfo:{}, //自然村信息
      styleData: '',
      zrcid: '',
      search: '',
      listData: [],
      pageIndex: 1,
      pageSize: 10,
      zjid: '',
      vid: '',
      selectData: ''

    }
  },
  components: {
    GmtDefaultList
  },
  methods: {
    infinite (done) {
      this.getListData(done)
    },
    refresh (done) {
      done(true)
    },
    getListData (done) {
      if(refreshing) return
      publicListData ({
        fblxId: this.$route.params.fblxid,
        mkId: 4,
        pageIndex: this.pageIndex,
        pageSize: this.pageSize,
        search: this.search,
        cjid: this.vid,
        zrcid: this.zrcid,
        zjid: this.zjid
      }).then (rps => {
        refreshing=false
        if (rps.data.success) {
          if(this.pageIndex===1) this.listData=rps.data.content;
          else this.listData.push(...rps.data.content)
          this.pageIndex++
          if(!this.initFlag) this.initFlag=true
          if(done) done()
          if (rps.data.content.length < this.pageSize && this.$refs['myScroller']) {
            try {
              this.$refs.myScroller.finishInfinite(true)
            } catch (error) {
              console.log(error)
            }
          }
        } else {
          try {
            this.$refs.myScroller.finishInfinite(true)
          } catch (error) {
            console.log(error)
          }
          this.changtoast(rps.data.message, 'error')
        }
      })
    },
    setpopupVisible () {
      this.popupVisible = false
      if (this.tabState === 1) {
        this.zjInfo = this.selectData
        if (this.zjInfo.id) {
          this.zjid = this.zjInfo.id
        }
      } else if (this.tabState === 2) {
        this.cjInfo = this.selectData
        if (this.cjInfo.id) {
          this.vid = this.cjInfo.id
        }
      } else if (this.tabState === 3) {
        this.zrcInfo = this.selectData
        if (this.zrcInfo.id) {
          this.zrcid = this.zrcInfo.id
        }
      }
      if (this.zjid || this.zrcid || this.vid) {
        this.pageIndex = 1
        this.listData = []
        try {
          this.$refs.myScroller.finishInfinite(false)
        } catch (error) {
          console.log(error)
        }
      }
    },
    select_tab (item) {
      this.tabState = item
      let values = []
      if (this.zjxxData.length > 0) {
        if (item === 1) {
          values = this.zjxxData
          this.slots[0].values = values
          if (this.zjInfo.id) { // 重新选择情空往期数据
            this.cjInfo = {}
            this.zrcInfo = {}
          }
          this.vid = ''
          this.zrcid = ''
        } else if (item === 2) {
          let arr  = Object.keys(this.zjInfo)
          if (arr.length <= 0) {
            this.changtoast('请先选择镇街')
            return
          }
          let dome = this.zjxxData.filter(rps => {
            return rps.id === this.zjInfo.id
          })
          values = dome[0].cjxxs
          this.slots[0].values = values
          if (this.cjInfo.id) { // 重新选择情空往期数据
            this.zrcInfo = {}
          }
          this.zjid = ''
          this.zrcid = ''
        } else if (item === 3) {
          let arr  = Object.keys(this.zjInfo)
          let arr2  = Object.keys(this.cjInfo)
          if (arr.length <= 0 && arr2.length <= 0 ) {
            this.changtoast('请先选择镇街或村居')
            return
          }
          let dome = this.zjxxData.filter(rps => {
            return rps.id === this.zjInfo.id
          })
          console.log(dome[0].cjxxs)
          console.log(this.cjInfo.id)
          let data = dome[0].cjxxs 
          let dome_2 = data.filter(rps => {
            return rps.id === this.cjInfo.id
          })
          values = dome_2[0].zrcxxs
          this.slots[0].values = values
          this.zjid = ''
          this.vid = ''
        }
        this.popupVisible = true
      } else {
        this._Getzjxx(item)
      }
    },
    onValuesChange (picker, values) {
      this.selectData = values[0]
    },
    clickSearch () {
      this.$refs.myScroller.finishInfinite(false)
      this.pageIndex = 1
      this.listData = []
    },
    _Getzjxx () {
      Getzjxx().then(rps => {
        if(rps.data.success) {
          this.zjxxData = rps.data.content
        } else {
          this.changtoast(rps.data.message,'error')
        }
      })
    }
  },
  mounted () {
    this._Getzjxx()
    this.$nextTick(rps => {
      setTimeout(() => {
        let dome = this.$refs.list_content
        let domeTop = dome.offsetTop
        this.styleData = {
          position: 'absolute',
          top: domeTop + "px",
          bottom: 0,
          left: 0,
          right: 0,
          "z-index": 2000
        }
      }, 100);
    })
  }
}
</script>

<style lang="scss" scoped>
@import './style/index.scss';
.rjhjzz /deep/ .picker_list {
    .picker-slot-wrapper {
      width: 750px;
      .picker-item {
        font-size:38px;
        font-weight:bold;
      }
      .picker-selected {
        color:rgba(40,40,40,1);
      }
    }
  }
</style>