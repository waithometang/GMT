<template>
  <div class="index">
    <div class="main">
      <div class="button-tab">
        <div class="button-nor button-nor-margin" :class="{'on': type == 1}" @click="BottonType(1)">需求申请</div>
        <div class="button-nor button-nor-margin" :class="{'on': type == 2}" @click="BottonType(2)">我的申请</div>
      </div>
    </div>
    <xqsq @childFn="BottonType(2)" v-if="type == 1"></xqsq>
    <wdsq class="wdsq" v-else></wdsq>
  </div>
</template>
<script>
import xqsq from "./component/xqsq"
import wdsq from "./component/wdsq"
export default {
  components:{
    xqsq,
    wdsq
  },
  data(){
    return{
      type:1
    }
  },
  methods:{
    BottonType(state){
      this.type=state
    }
  }
}
</script>
<style lang="scss" scoped>
@import "../FNT_zzx/style/index";
</style>