<template>
  <div class="container">
    <!-- tab -->
    <div class="header-fix">
      <template v-if="isBuilder">
        <div class="select">
          <div
            @click="changeState(item.state)"
            :class="{ cor1: tagState === item.state }"
            v-for="(item, index) in tagData"
            :key="index"
          >
            {{ item.name }}
          </div>
        </div>
      </template>
      <!-- update start -->
      <div class="list_tab" v-if="tagState === 1">
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
    <!-- 全部工程/我的工程--列表数据 -->
    <template v-if="tagState === 1 || tagState === 2">
      <div class="need-list">
        <randomly-snap-picture-list
          :stateType="tagState"
          ref="mylist"
          :WaChatConfigData="WaChatConfigData"
        ></randomly-snap-picture-list>
      </div>
    </template>

    <!-- 进度发布 -->
    <template v-else-if="tagState === 3">
      <progress-release />
    </template>
  </div>
</template>

<script>
import ProgressRelease from './ProgressRelease'
import wjutils from "@/js/WjSmrzUtil";
import randomlySnapPictureList from './components/reportInformation'
import { GetWechatConfig } from '@/api/GetWechatConfig'
import { storage } from '@/js/until'
import GmtVillageSelector from '@/components/GmtVillageSelector'
import { Getzjxx } from '@/api/secondLevelPage'

export default {
  data() {
    return {
      isBuilder: false, // 是否施工员
      tagState: 1,
      WaChatConfigData: '',

      tagData: [
        { name: '全部工程', state: 1 },
        { name: '我的工程', state: 2 },
        { name: '进展发布', state: 3 }
      ],

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
  components: {
    randomlySnapPictureList,
    ProgressRelease,
    GmtVillageSelector
  },
  mounted() {
    wjutils.gotoSMRZIfNot(this,this.init)
  },

  methods: {
    _Getzjxx() {
      Getzjxx().then(rps => {
        if (rps.data.success) {
          this.zjxxData = rps.data.content
        } else {
          this.changtoast(rps.data.message, 'error')
        }
      })
    },
      init(){
    this._Getzjxx()
    this.$indicator.open('加载中...')
    this.$post('/api/gcjd/sfgzry').then(res => {
      this.$indicator.close()
      if (res.data.success) {
        this.isBuilder = res.data.content
      } else {
        this.changtoast(res.data.message, 'error')
      }
    })
  },
    changeState(item) {
      // todo
      this.tagState = item
    },
    // todo
    // 获取微信sdk 初始化参数
    _GetWechatConfig() {
      var u = navigator.userAgent
      var isAndroid = u.indexOf('Android') > -1 || u.indexOf('Linux') > -1 //g
      var isIOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/) //ios终端
      let url = ''
      if (isAndroid) {
        url = location.href
      }
      if (isIOS) {
        url = location.href.split('#')[0] //hash后面的部分如果带上ios中config会不对
      }
      GetWechatConfig({
        url: url
      }).then(rps => {
        if (rps.data.success) {
          this.WaChatConfigData = rps.data.content
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
      this.$refs.mylist.searchArea(parms)
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
@import './style/select.scss';
@import './style/select_city.scss';
.container {
  /* padding: 24px; */
  .need-list {
    position: absolute;
    height: 84%;
    /* margin-top: 180px; */
  }
}
.container /deep/ .picker_list {
  .picker-slot-wrapper {
    width: 750px;
    .picker-item {
      font-size: 38px;
      font-weight: bold;
    }
    .picker-selected {
      color: rgba(40, 40, 40, 1);
    }
  }
}

.container {
  .header-fix {
    padding: 20px;
    /* width: 100%;
    position: fixed;
    top: 20px;
    z-index: 999;
    padding: 0 20px 0 20px;
    box-sizing: border-box; */
  }
}
</style>