<template>
  <div class="tcyh" v-show="hasData">
    <div class="popup">
      <img v-if="!sfgz" src="/static/tcyh/img_03.png"/>
      <img v-else src="/static/tcyh/img_02.png"/>
      <p v-if="sfgz">长按识别 立享优惠</p>
      <p v-else>长按识别 关注高明通</p>
    </div>
  </div>
</template>
<script>
import {mapActions} from "vuex";

export default {
  data(){
    return{
      sfgz:false,
      hasData:false
    }
  },
  methods: {
    ...mapActions(['getGrxx']),
  },
  created () {
    this.getGrxx(true).then(grxx => {
      this.sfgz=grxx.sfgz
      this.hasData=true
    })
  }
}
</script>
<style lang="scss" scoped>
.tcyh{
  position: absolute;
  top: 0;
  bottom: 0;
  width: 100%;
  background-image: url("/static/tcyh/img_01.jpg");
  background-size: 100% 100%;
  .popup{
    position: absolute;
    bottom: 195px;
    width:650px;
    height:650px;
    background:rgba(255,255,255,1);
    border-radius:10px;
    left: 50px;
    padding: 88px 120px;
    box-sizing: border-box;
    text-align: center;
    img{
      width:410px;
      height:410px;
      position: relative;
      z-index: 999;
      pointer-events: auto;
  }
    p{
      font-size:32px;
      font-weight:400;
      color:rgba(74,147,255,1);
      margin-top: 40px;
      margin-bottom: 0;;
    }
  }
}
</style>