<template>
  <div class="zgz">
    <div class="public_top_select">
      <div class="public_top_select_tab" v-for="(item,index) in tabData" :key="index" :class="{'public_top_select_tab_action': tabState === item.type}" @click="setTabState(item.type)">{{item.name}}</div>
    </div>
    <sgzo v-if="tabState === 1"/>
    <gwzz  v-if="tabState === 2"/>
  </div>
</template>

<script>
import gwzz from './components/gwzz'
import sgzo from './components/shzp'
export default {
  components: {
    gwzz,
    sgzo
  },
  data () {
    return {
      tabData: [{name: '政府招考', type: 0}, {name: '社会招聘', type: 1}, {name: '岗位直招', type: 2}],
      tabState: 0,
      WaChatConfigData: '',
    }
  },
  methods: {
    setTabState (item) {
      if (item === 0 ) {
        window.location.href = 'http://www.gaoming.gov.cn/zwgk/rsxx/gwykl/index.html'
      } else {
        this.tabState = item
      }
    }
  },
  beforeRouteEnter (to, from, next) {
    next (vm => {
      if (from.name === 'qyzpxq') {
        vm.tabState = 2
      }else if (from.name === 'CommonPublishDetail') {
        vm.tabState = 1
      } else {
        vm.tabState = 1
      }
    })
  }
}
</script>