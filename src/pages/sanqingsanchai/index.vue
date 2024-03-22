<template>
  <div class="sqsc_index">
    <div class="list_tab">
      <div class="tab" @click="cliclSkip(1)">
        <img src="/static/renju@2x.png" alt="">
        人居环境整治动态
      </div>
      <div class="tab" @click="cliclSkip(2)" v-if="showZxkh">
        <img src="/static/heshi@2x.png" alt="">
        现场核实
      </div>
      <div class="tab" v-if="false">
        <img src="/static/paihang@2x.png" alt="">
        整治排行榜
      </div>
    </div>
  </div>
</template>

<script>
import { storage } from "@/js/until";
import {mapActions} from 'vuex'
export default {
  computed: {
    longData(){
      return storage.fetch("longData").data
    }
  },
  data () {
    return {
      showZxkh:false
    }
  },
  methods: {
    ...mapActions(['GetuserInfo']),
    cliclSkip (item) {
      switch (item) {
        case 1:
          this.$router.push(`/rjhjzz/23/${this.longData.id}`)
          break;
        case 2:
          this.$router.push(`/xchs/26/${this.longData.id}`)
          break;
        default:
          break;
      }
    }
  },
  created() {
    this.GetuserInfo().then (rps => {
        if (rps.zxkhfb) {
          this.showZxkh = true
        }
      })
  },
}
</script>

<style lang='scss' scoped>
@import './style/index.scss';
</style>