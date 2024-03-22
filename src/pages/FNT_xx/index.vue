<template>
  <div class="zxMailbox">
    <div class="button-tab">
      <!-- <div class="button-nor" :class="{'on': bottonType == 1}" @click="BottonType(1)">公开信件</div> -->
      <div class="button-nor bottom-margin" :class="{'on': bottonType == 2}" @click="BottonType(2)">我的信件</div>
      <div class="button-nor" :class="{'on': bottonType == 3}" @click="BottonType(3)">我要写信</div>
    </div>
    <list :state="bottonType" v-if="bottonType <= 2 && bottonType > 0" />
    <issueFrom v-if="bottonType === 3" @setState="BottonType"/>
  </div>
</template>
<script>
import list from './component/list'
import issueFrom from './component/issueFrom'
import { GetWechatConfig } from "@/api/GetWechatConfig"

export default {
  data() {
    return {
      bottonType: 0,
      value: '',
      isall:true,
      WaChatConfigData: ''
    }
  },
  components: {
    list,
    issueFrom
  },
  methods: {
    BottonType(x) {
      this.bottonType = x;
    },
  },
  created () {
    let url = location.href
    GetWechatConfig({
      url: url
    }).then(rps => {
      if (rps.data.success) {
        this.WaChatConfigData = rps.data.content
      } else {
        this.changtoast(rps.data.message, "error")
      }
    })
  },
  beforeRouteEnter (to, from, next) {
    next(val => {
      let state = from.params.bottonType*1
      if (state === 1) {
        val.bottonType = 1
      } else if (state === 2) {
        val.bottonType = 2
      } else {
        val.bottonType = 2
      }
    })
  }
}
</script>
<style lang="scss" scoped>
  @import './style/index.scss';
</style>
