<template>
  <div class="Download_ewm">
    <div class="txewm_pages">
            <div class="txewm_img">
                <!-- <qrcode-vue v-show="listData" :value="listData.ewm" :size="300" :foreground="txcolor" level="H"></qrcode-vue> -->
            </div>
            <div class="txewm_hread">
                <span>我的信息</span>
                <span class="ewm-edit">查看更多>>></span>
            </div>
            <div class="txewm_item">
                <div class="txewm_list">
                    <span>名称</span>
                    <span>强记茶餐厅</span>
                </div>
                <div class="txewm_list">
                    <span>注册号或信用代码</span>
                    <span>211111111111111111</span>
                </div>
                <div class="txewm_list">
                    <span>详细地址</span>
                    <Span>高明区荷城街道滨江路125号</Span>
                </div>
            </div>
        </div>   
        <div class="txewm_pages">
            <div class="txewm_cx">
                <div class="jilu"><img src="/static/ewm/出行记录.png"/><span>点击保存二维码</span></div>
            </div>
        </div>
        <div @click="Record" class="txewm_pages">
            <div class="txewm_cx">
                <div class="jilu"><img src="/static/ewm/出行记录.png"/><span>扫码人员信息</span></div>
            </div>
        </div>
  </div>
</template>
<script>
export default {
  methods:{
    Record(){
      this.$router.push("/Record_ewm")
    }
  }
}
</script>
<style lang="scss" scoped>
@import "./style/Download_ewm.scss";
</style>