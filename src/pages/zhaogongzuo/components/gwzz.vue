<template>
  <div class="infoList" ref="infoList" :style="styleData">
    <div class="head">
      <div class="head_tab">
        <div class="serch">
          <div>
            <input placeholder="请输入搜索内容" type="text" v-model="search"/>
            <div class="imagesss" @click="setsearch">
              <img src="/images/secondLevelPages/search.png"/>
            </div>
          </div>
        </div>
      </div>
      <div class="head_but" @click="filtrate">筛选</div>
    </div>
    <div class="infoList_content">
      <scroller :on-infinite= 'infinite' :on-refresh="refresh" ref="myScroller">
        <div class="infoList_list_tab" v-for="(item, index) in listData" :key="index" @click="lookOver(item.id)">
          <div class="infoList_list_tab_head">
            <div class="infoList_list_tab_head_tab">
              <div class="infoList_list_tab_head_icon">
                <img src="/static/bule@2x.png" alt="">
              </div>
              {{item.zwmc}}
            </div>
            <div class="infoList_list_tab_head_yx">{{item.yxfw}}</div>
          </div>
          <div class="infoList_list_tab_middle">{{item.zwms}}</div>
          <div class="infoList_list_tab_base">
            <div class="infoList_list_tab_base_tab">
              <img src="/static/time@2x.png" alt="">
              {{item.date}}
            </div>
            <div class="infoList_list_tab_base_tab">
              <img src="/static/see@2x.png" alt="">
              {{item.yds ? item.yds : 0}}
            </div>
          </div>
        </div>
      </scroller>
    </div>
    <mt-popup v-model="popupVisible" position="bottom" >
      <div class="filtrate" v-if="tagData">
        <div class="condition_list">
          <div class="condition_list_tab">
            <div class="name">薪资待遇</div>
            <ul class="condition_tag">
              <li class="tag" @click="selectAll(1)"><div class="tab_name" :class="{'action': yxfwStata === -1}">全部</div></li>
              <li class="tag" v-for="(item, index) in tagData.yxfw" :key="index" @click="setCondition(item,index, 1)"><div class="tab_name" :class="{'action': yxfwStata === index}">{{item.name}}</div></li>
              <div style="clear:both;"></div>
            </ul>
          </div>
          <div class="condition_list_tab">
            <div class="name">工作经验</div>
            <ul class="condition_tag">
               <li class="tag" v-for="(item, index) in tagData.gznx" :key="index" @click="setCondition(item,index, 2)"><div class="tab_name" :class="{'action': gznxState === index}">{{item.name}}</div></li>
              <div style="clear:both;"></div>
            </ul>
          </div>
          <div class="condition_list_tab">
            <div class="name">学历要求</div>
            <ul class="condition_tag">
               <li class="tag" v-for="(item, index) in tagData.xllb" :key="index" @click="setCondition(item,index, 3)"><div class="tab_name" :class="{'action': xllbState === index}">{{item.name}}</div></li>
              <div style="clear:both;"></div>
            </ul>
          </div>
          <div class="condition_list_tab">
            <div class="name">工作性质</div>
            <ul class="condition_tag">
              <li class="tag" @click="selectAll(2)"><div class="tab_name" :class="{'action': gzxzState === -1}">全部</div></li>
              <li class="tag" v-for="(item, index) in tagData.gzxz" :key="index" @click="setCondition(item,index, 4)"><div class="tab_name" :class="{'action': gzxzState === index}">{{item.name}}</div></li>
              <div style="clear:both;"></div>
            </ul>
          </div>
        </div>
        <div class="filtrate_but">
          <div class="filtrate_but_tab" @click="eliminate">清除</div>
          <div class="filtrate_but_tab affirm" @click="affirm">确认</div>
        </div>
      </div>
    </mt-popup>
  </div>
</template>

<script>
import GmtSearchList from "@/components/GmtSearchList.vue"
import { qbzpxx, qyzpfbList } from '@/api/secondLevelPage'
export default {
  components: {
    GmtSearchList
  },
  data () {
    return {
      styleData: {},
      popupVisible: false,
      tagData: {},
      listData: [],
      pageIndex: 1,
      pageSize: 10,
      search: '',
      yxfwStata: -1,
      yxfwName: '',
      gznxState: -1,
      gznxName: '',
      xllbState: -1,
      xllbName: '',
      gzxzState: -1,
      gzxzName: '',
    }
  },
  methods: {
    lookOver (item) {
      this.$router.push(`/qyzpxq/${item}`)
    },
    getListData (done) {
      if( this.refreshing) return
      this.refreshing = true
      qyzpfbList({
        pageSize: this.pageSize,
        pageIndex: this.pageIndex,
        search: this.search,
        gznx: this.gznxName,
        gzxz: this.gzxzName,
        xllb: this.xllbName,
        yxfw: this.yxfwName,
      }).then (rps => {
        this.refreshing = false
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
      this.getListData(done)
    },
    refresh(done) {
      this.pageIndex = 1
      this.getListData(done)
      this.$refs.myScroller.finishInfinite(false)
    },
    getTagData () {
      qbzpxx().then (rps => {
        if (rps.data.success) {
          let data = rps.data.content
          this.tagData.gznx = this.setTagData(data.gznx.split(';'))
          this.tagData.gzxz = this.setTagData(data.gzxz.split(';'))
          this.tagData.xllb = this.setTagData(data.xllb.split(';'))
          this.tagData.yxfw = this.setTagData(data.yxfw.split(';'))
        } else {
          this.changtoast(rps.data.message,'error')
        }
      })
    },
    setTagData (item) {
      let dome = []
      for (let index = 0; index < item.length; index++) {
        const element = item[index]
        if (element) {
          dome.push({name:element, state: false})
        }
      }
      return dome
    },
    filtrate () {
      this.popupVisible = true
    },
    selectAll (item) {
      switch (item) {
        case 1:
          this.yxfwStata = -1
          this.yxfwName = ''
          break;
        case 2:
          this.gzxzState = -1
          this.gzxzName = ''
          break;
      
        default:
          break;
      }
    },
    eliminate () {
      this.yxfwStata = -1
      this.yxfwName = ''
      this.gznxState = -1
      this.gznxName = ''
      this.xllbState = -1
      this.xllbName = ''
      this.gzxzState = -1
      this.gzxzName = ''
      this.pageIndex=1
      this.listData=[]
      this.getListData()
      this.popupVisible = false
    },
    affirm () {
      this.popupVisible = false
      this.pageIndex=1
      this.listData=[]
      this.getListData()
    },
    setsearch () {
      this.pageIndex=1
      this.listData=[]
      this.getListData()
    },
    setCondition (item,index,type) {
      switch (type) {
        case 1:
          this.yxfwStata = index
          this.yxfwName = item.name
          break;
        case 2:
          this.gznxState = index
          this.gznxName = item.name
          break;
        case 3:
          this.xllbState = index
          this.xllbName = item.name
          break;
        case 4:
          this.gzxzState = index
          this.gzxzName = item.name
          break;
        default:
          break;
      }
    }
  },
  created () {
    this.getTagData()
  },
  mounted () {
    this.$nextTick(rps => {
      setTimeout(() => {
        let dome = this.$refs.infoList
        let domeTop = dome.offsetTop
        this.styleData = {
          position: 'absolute',
          top: domeTop + "px",
          bottom: 0,
          left: 0,
          right: 0,
        }
      }, 100);
    })
  }
}
</script>

<style lang='scss' scoped>
@import '../style/infoList.scss';
</style>