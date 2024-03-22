<template>
  <div class="accomplish">
    <div class="pages">
      <img src="/images/img_10.png">
      <div style="height:30px"></div>
      <span v-if="isPass == '1'">实名信息已通过认证</span>
      <template v-else-if="isPass=='001'">
        <span>企业信息提交成功</span>
        <p>请耐心等待审核</p>
      </template>
      <template v-else>
        <span>实名信息提交成功</span>
        <p>请耐心等待{{cj}}村居审核</p>
      </template>
      <div class="but cor" @click="gotoHome">返回首页</div>
    </div>
  </div>
</template>
<script>
export default {
  computed:{
    isPass(){
      console.log(this.$route.query.pass)
      return this.$route.query.pass
    },
    cj() {
      return this.$route.query.cj
    },
  },
  methods: {
    gotoHome(){
      this.$router.replace('/')
      this.$store.commit('Set_ButtomTageState', 1)
    }
  },
}
</script>
<style lang="scss" type="text/css" scoped>
.accomplish {
  width: 750px;
  background: #ffffff;
  margin: 0;
  padding: 0;
  position: absolute;
  top: 0;
  bottom: 0;
  .pages {
    margin-top: 186px;
    text-align: center;
    img {
      width: 258px;
      display: inline-block;
    }
    span {
      font-size: 32px;
      font-family: MicrosoftYaHei;
      font-weight: 400;
      color: rgba(51, 51, 51, 1);
      display: block;
      margin: 0;
      // margin-top: 100px;
    }
    p {
      font-size: 28px;
      font-family: MicrosoftYaHei;
      font-weight: 400;
      color: rgba(153, 153, 153, 1);
      margin-bottom: 0;
    }
    .but{
      width: 290px;
      height: 88px;
      margin-top: 40px;
      display: inline-block;
      background: rgba(255, 255, 255, 1);
      border: 1px solid rgba(153, 153, 153, 1);
      border-radius: 6px;
      font-size: 32px;
      font-family: PingFang-SC-Regular;
      font-weight: 400;
      color: rgba(108, 108, 108, 1);
      line-height: 88px;
    }
    .left-but {
      margin-right: 24px;
    }
    .cor{
      background: rgba(55, 157, 234, 1);
      color: rgba(255, 255, 255, 1);
    }
  }
}
</style>
