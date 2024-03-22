<template>
  <div class="wedreams">
    <div class="button-tab">
      <div class="button-nor button-nor-margin" :class="{'on': bottonType == 1}" @click="BottonType(1)">我的申请</div>
      <div class="button-nor button-nor-margin" :class="{'on': bottonType == 2}" @click="BottonType(2)">我要申请</div>
    </div>
    <applyList v-if="bottonType === 1" />
    <applyFrom v-if="bottonType === 2" @setState="BottonType"/>
  </div>
</template>
<script>
import applyList from './conponents/applyList'
import applyFrom from './conponents/applyFrom'
import { GetWechatConfig } from "@/api/GetWechatConfig"

export default {
  data() {
    return {
      bottonType: 2,
      WaChatConfigData: ''
    }
  },
  components: {
    applyList,
    applyFrom
  },
  methods: {
    BottonType (item) {
      this.bottonType = item
    }
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
      if (from.name === 'fntZbzsqxq') {
        val.bottonType = 1
      }
    })
  }
};
</script>
<style lang="scss" scoped>
@import './style/wedreams.scss';
</style>
