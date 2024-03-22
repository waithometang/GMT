<template>
  <div class="qygs">
    <div class="top-title">
      2020年高明区第三届<br />
      村际（百村）足球赛运动员相片册
    </div>
    <!-- update start -->
    <div class="list_tab">
      <div
        class="tab tab_margin"
        :class="{ tab_action: zjInfo.id }"
        @click="select_tab(1)"
      >
        <div class="name" :class="{ name_action: zjInfo.id }">
          {{ zjInfo.id ? zjInfo.name : '选择镇街' }}
        </div>
        <div class="icon">
          <img
            :src="zjInfo.id ? '/static/a@2x.png' : '/static/c@2x.png'"
            alt=""
          />
        </div>
      </div>
      <div
        class="tab tab_margin"
        :class="{ tab_action: cjInfo.id }"
        @click="select_tab(2)"
      >
        <div class="name" :class="{ name_action: cjInfo.id }">
          {{ cjInfo.id ? cjInfo.name : '选择村居' }}
        </div>
        <div class="icon">
          <img
            :src="cjInfo.id ? '/static/a@2x.png' : '/static/c@2x.png'"
            alt=""
          />
        </div>
      </div>
      <div
        class="tab"
        :class="{ tab_action: zrcInfo.id }"
        @click="select_tab(3)"
      >
        <div class="name" :class="{ name_action: zrcInfo.id }">
          {{ zrcInfo.id ? zrcInfo.name : '选择村小组' }}
        </div>
        <div class="icon">
          <img
            :src="zrcInfo.id ? '/static/a@2x.png' : '/static/c@2x.png'"
            alt=""
          />
        </div>
      </div>
    </div>

    <mt-popup v-model="popupVisible" position="bottom">
      <div v-if="popupVisible" class="accomplish" @click="setpopupVisible()">
        完成
      </div>
      <mt-picker
        v-if="popupVisible"
        :slots="slots"
        @change="onValuesChange"
        valueKey="name"
      ></mt-picker>
    </mt-popup>
    <!-- update end -->
    <div class="need-list" ref="needList">
      <template v-if="qyList.length">
        <div class="content-wrapper" v-for="item in qyList" :key="item.lxdh">
          <div class="content-item">
            <div class="participants">参赛单位：{{ item.csdw }}</div>
            <div class="item">
              <div class="left">
                <div class="common">领队：{{ item.ld }}</div>
                <div class="common">联系人：{{ item.ld }}</div>
                <div class="common">队长：{{ item.dz }}</div>
              </div>
              <div class="right">
                <div class="common">教练：{{ item.jl }}</div>
                <div class="common">联系电话：{{ item.lxdh }}</div>
                <div class="common">队医：{{ item.dy }}</div>
              </div>
            </div>
            <div class="info-wrapper">
              <div v-for="(list, index) in item.qyxxs" :key="index">
                <div class="info">
                  <img :src="list.grtx" alt="" />
                  <div class="name">姓名：{{ list.xm }}</div>
                  <div class="phone">号码：{{ list.hm }}</div>
                </div>
              </div>
            </div>
          </div>
          <div class="bd-line"></div>
        </div>
      </template>
      <template v-else>
        <div class="no-data">暂无更多数据</div>
      </template>
    </div>
  </div>
</template>

<script>
import wjutils from '@/js/WjSmrzUtil'
import { Getzjxx } from '@/api/secondLevelPage'

export default {
  data() {
    return {
      qyList: [],
      slots: [
        {
          flex: 1,
          values: [],
          textAlign: 'center',
          defaultIndex: 1,
          className: 'picker_list'
        }
      ],

      popupVisible: false,
      zjxxData: '',
      tabState: 1,
      zjInfo: {}, // 镇街信息
      cjInfo: {}, // 村居信息
      zrcInfo: {}, //自然村信息
      zrcid: '',
      zjid: '',
      vid: ''
    }
  },
  created() {
    this.getQyList()
  },
  mounted() {
    wjutils.gotoSMRZIfNot(this, this._Getzjxx)
  },
  methods: {
    getQyList() {
      this.$indicator.open('加载中...')
      this.$post('/api/gcjd/qdwdresult').then(res => {
        this.$indicator.close()
        if (res.data.success) {
          this.qyList = res.data.content
        } else {
          this.changtoast(res.data.message, 'error')
        }
      })
    },
    _Getzjxx() {
      Getzjxx().then(rps => {
        if (rps.data.success) {
          this.zjxxData = rps.data.content
        } else {
          this.changtoast(rps.data.message, 'error')
        }
      })
    },
    setpopupVisible() {
      this.popupVisible = false
      let parms = {}
      if (this.tabState === 1) {
        this.zjInfo = this.selectData
        if (this.zjInfo.id) {
          this.zjid = this.zjInfo.id
          parms.zjid = this.zjInfo.id
        }
      } else if (this.tabState === 2) {
        this.cjInfo = this.selectData
        if (this.cjInfo.id) {
          this.vid = this.cjInfo.id
          parms.cjid = this.cjInfo.id
        }
      } else if (this.tabState === 3) {
        this.zrcInfo = this.selectData
        if (this.zrcInfo.id) {
          this.zrcid = this.zrcInfo.id
          parms.zrcid = this.zrcInfo.id
        }
      }
      this.$indicator.open('加载中...')
      this.$post('/api/gcjd/qdwdresult', {
        zjid: parms.zjid,
        zrcid: parms.zrcid,
        cjid: parms.cjid
      }).then(res => {
        this.$indicator.close()
        if (res.data.success) {
          this.qyList = res.data.content
        } else {
          this.changtoast(res.data.message, 'error')
        }
      })
      this.$refs.needList.scrollTop = 0
    },
    onValuesChange(picker, values) {
      this.selectData = values[0]
    },
    select_tab(item) {
      this.tabState = item
      let values = []
      console.log(this.zjxxData.length)
      if (this.zjxxData.length > 0) {
        if (item === 1) {
          values = this.zjxxData
          this.slots[0].values = values
          if (this.zjInfo.id) {
            // 重新选择情空往期数据
            this.cjInfo = {}
            this.zrcInfo = {}
          }
          this.vid = ''
          this.zrcid = ''
        } else if (item === 2) {
          let arr = Object.keys(this.zjInfo)
          if (arr.length <= 0) {
            this.changtoast('请先选择镇街')
            return
          }
          let dome = this.zjxxData.filter(rps => {
            return rps.id === this.zjInfo.id
          })
          values = dome[0].cjxxs
          this.slots[0].values = values
          if (this.cjInfo.id) {
            // 重新选择情空往期数据
            this.zrcInfo = {}
          }
          this.zjid = ''
          this.zrcid = ''
        } else if (item === 3) {
          let arr = Object.keys(this.zjInfo)
          let arr2 = Object.keys(this.cjInfo)
          if (arr.length <= 0 && arr2.length <= 0) {
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
    }
  }
}
</script>

<style scoped lang="scss">
@import './styles/qygs.scss';
@import './styles/select.scss';
/deep/ .mint-popup-bottom {
  width: 100%;
}
</style>