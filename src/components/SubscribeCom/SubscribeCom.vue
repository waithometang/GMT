<template>
  <div class="publicAttention" v-if="isShow">
    <div class="attention-maike"></div>
    <div class="attention-content">
      <div class="clos" @click="closeFn">
        <img src="/static/ybmimages/close.png" alt />
      </div>
      <div class="headIcon">
        <img src="/static/ybmimages/gm.png" alt />
      </div>
      <div class="name">高明通</div>
      <div class="title">为提供更好的功能体验，<br/>请先关注“高明通”微信公众号。<br/>长按下方二维码关注“高明通”微信公众号</div>
      <div class="icon">
        <img src="/static/ybmimages/gmt-url.jpg" alt />
      </div>
    </div>
  </div>
</template>


<script>
import store from "@/store";

export default {
  data() {
    return {
      isShow:false
    }
  },
  methods: {
    install (){
      return new Promise((resolve, reject) => {
        this.promiseStatus = {resolve, reject}
        store.dispatch('getGrxx').then(grxx => {
          if (grxx.sfgz) {
            resolve(grxx)
          }else{
            this.isShow=true
          }
        })
      })
    },
    closeFn() {
      store.dispatch('getGrxx',true).then(grxx =>{
        if (grxx.sfgz) {
          this.isShow=false
          this.promiseStatus.resolve()
        }
      })
    }
  }
};
</script>
<style lang="scss" scoped>
    .publicAttention {
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    display: flex;
    align-items: center;
    justify-content: center;
    overflow: hidden;
    .attention-maike {
      position: fixed;
      left: 0;
      top: 0;
      right: 0;
      bottom: 0;
      opacity: .5;
      background: #000;
      z-index: 9999;
    }
    .attention-content {
      width:650px;
      background:rgba(255,255,255,1);
      border-radius:10px;
      z-index: 99999;
      padding: 10px 0 20px 0;
      .clos {
        width: 22px;
        height: 22px;
        margin-right: 10px;
        float: right;
        display: flex;
        align-items: center;
        justify-content: center;
        img {
          width: 22px;
          height: 22px;
        }
      }
      .headIcon {
        width:100px;
        height:100px;
        margin: 0 auto;
        margin-top: 10px;
        img{
          width:100px;
          height:100px;
        }
      }
      .name {
        font-size:26px;
        font-weight:500;
        color:rgba(137,137,137,1);
        text-align: center;
        margin-top: 10px;
      }
      .title {
        text-align: center;
        font-size:28px;
        font-weight:500;
        color:rgba(0,0,0,1);
        margin-top: 33px;
      }
      .but {
        width:424px;
        margin: 50px auto 0 auto;
        height:70px;
        background:rgba(65,176,248,1);
        border-radius:10px;
        font-size:30px;
        font-weight:bold;
        color:rgba(255,255,255,1);
        display: flex;
        align-items: center;
        justify-content: center;
      }
      .icon {
        width:240px;
        height:240px;
        margin: auto;
        margin-top: 30px;
        img {
          width:100%;
          height:100%;
          pointer-events: all;
        }
      }
    }
  }
</style>
