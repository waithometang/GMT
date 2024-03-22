<template>
<div class="GmtLoading">
  <div class="Obscuration"></div>
  <div id="Loading">
    <div class="loader-inner ball-beat">
      <div></div>
      <div></div>
      <div></div>
    </div>
  </div>
</div>
</template>

<script>
export default {

}
</script>

<style lang='scss' scoped type="text/css">
.GmtLoading {
    #Loading {
      top: 50%;
      left: 50%;
      position: absolute;
      -webkit-transform: translateY(-50%) translateX(-50%);
      transform: translateY(-50%) translateX(-50%);
      z-index: 99999999;
    }
    @-webkit-keyframes ball-beat {
      50% {
        opacity: 0.2;
        -webkit-transform: scale(0.75);
        transform: scale(0.75);
      }
      100% {
        opacity: 1;
        -webkit-transform: scale(1);
        transform: scale(1);
      }
    }
    @keyframes ball-beat {
      50% {
        opacity: 0.2;
        -webkit-transform: scale(0.75);
        transform: scale(0.75);
      }
      100% {
        opacity: 1;
        -webkit-transform: scale(1);
        transform: scale(1);
      }
    }
    .ball-beat>div {
      background-color: #ffffff;
      opacity: 0.7;
      width: 30px;
      height: 30px;
      border-radius: 100% !important;
      margin: 2px;
      -webkit-animation-fill-mode: both;
      animation-fill-mode: both;
      display: inline-block;
      -webkit-animation: ball-beat 0.7s 0s infinite linear;
      animation: ball-beat 0.7s 0s infinite linear;
    }

    .ball-beat>div:nth-child(2n-1) {
      -webkit-animation-delay: 0.35s !important;
      animation-delay: 0.35s !important;
    }
    .Obscuration {
      position: absolute;
      top: 0;
      bottom: 0;
      left: 0;
      right: 0;
      z-index: 99999998;
      background:rgba(102,102,102,1);
      opacity: 0.2;
    }
}
</style>
