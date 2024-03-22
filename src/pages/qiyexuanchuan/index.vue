<template>
  <div class="qyxc">
    <div class="public_top_select">
      <div class="public_top_select_tab" v-for="(item,index) in tabData" :key="index" :class="{'public_top_select_tab_action': tabState === item.type}" @click="setTabState(item.type)">{{item.name}}</div>
    </div>
    <publicityFrom v-if="tabState === 1" :configData="WaChatConfigData" @setTab="setTabState"/>
    <publicityList v-if="tabState === 0" />
  </div>
</template>

<script>
import publicityFrom from './compnent/publicityFrom'
import publicityList from './compnent/publicityList'
import { GetWechatConfig } from "@/api/GetWechatConfig"
import { mapActions } from 'vuex'

export default {
  components: {
    publicityFrom,
    publicityList
  },
  data () {
    return {
      tabData: [{name: '我的宣传', type: 0}, {name: '我要宣传', type: 1}],
      tabState: 1,
      WaChatConfigData: '',
    }
  },
  methods: {
    ...mapActions(['getGrxx']),
    setTabState (item) {
      this.tabState = item
    },
    // js-sdk 实例参数
    _GetWechatConfig () {
      let url = window.location.href
      GetWechatConfig({
        url: url
      }).then(rps => {
        if (rps.data.success) {
          this.WaChatConfigData = rps.data.content
        } else {
          this.changtoast(rps.data.message, "error")
        }
      })
    }
  },
  beforeRouteEnter (to, from, next) {
    next (vm => {
      vm.getGrxx().then (val => {
        if (!val.hasQY) {
          vm.$router.replace('/qyrz/3')
          return
        }
      })
      if (from.name === 'qyxcxq') {
        vm.tabState = 0
      }
    })
  },
  created () {
    this._GetWechatConfig()
  }
}
</script>

<style lang='scss' scoped>
@import './style/index.scss';
</style>