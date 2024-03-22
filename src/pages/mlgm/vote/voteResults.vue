<template>

  <div class="voteResults">
    <div class="alsrtInfo" :style="{display: displayStsates}" ref="alertMsg">
      <div class="profPrompt_test">{{aletMsg}}</div>
    </div>
    <span class="title">获得红包</span>
    <div v-if="hbcqzt==-1" class="resultLoading">正在抽奖中..</div>
    <div v-else class="result">{{ hbcqzt ? hbs + '元' : '谢谢参与' }}</div>
    <img :src="hbcqzt ? zjImg : wzjImg" />
    <div class="thank">
      <p>齐齐助力共创美丽高明！<br />感谢您的投票~</p>
    </div>
    <div v-if="hbcqzt==-1"></div>
    <div v-else class="btn" @click="getMoney">
      {{ hbcqzt ? '领取红包' : '谢谢惠顾' }}
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      hbcqzt: -1, // 红包抽取状态0是不中，1是中了 -1是正在抽奖中
      hbs: 0,  // 红包金额
      lqdz: '', // 领取后跳转页面
      wzjImg: require('./image/wzj.png'), // 未中奖 
      zjImg: require('./image/zj.png'), // 中奖
      aletMsg: '', // 弹出框中的提示语
      displayStsates: 'none'
    }
  },
  created () {
    this.getList()
  },
  methods: {
    getList () {
      this.$indicator.open()

      //判断是否刷新页面
      let beforeUrl = sessionStorage.getItem('beforeUrl');
      if (window.performance.navigation.type == 1 ) {
        this.$indicator.close()
        console.log('SX')
        this.hbcqzt=0
      }
      else{
        console.log(sessionStorage)
        //判断是否分享页面
        if(beforeUrl !="true"){
           this.$indicator.close()
           console.log('FX')
           this.hbcqzt=0
        } 
        else{
          this.$post('api/mlgm/TpChb').then(res => {
            if (res.data.success) {
              this.$indicator.close()
              this.hbcqzt = res.data.content.hbcqzt
              this.hbs = res.data.content.hbs
              this.lqdz = res.data.content.lqdz
            } else {
              this.$indicator.close()
              this.hbcqzt=0
              this.changtoast(res.data.message, 'error')
            }
          }).catch(() => {
            this.$indicator.close()
            this.hbcqzt=0
            this.changtoast(res.data.message, 'error')
          })
          
        }
      }
      window.setTimeout(() => {
            this.$indicator.close();
          }, 2000)
    },
    getMoney () {
      if(this.hbcqzt == 1){
        this.alertDia("领取成功!")
          window.setTimeout(() => {
            this.backHome();
          }, 2000)

      }
      else{
          this.backHome();
      }
    },

    backHome(){
      this.$router.replace("/mlgm/vote")
    },

    alertDia (msg) {
      this.displayStsates = 'block'
      this.aletMsg = msg
      // 延迟2秒后消失 自己可以更改时间
      window.setTimeout(() => {
        this.displayStsates = 'none'
      }, 1800)
    }
  }
}
</script>

<style scoped lang="scss">
.voteResults {
  width: 100%;
  height: 100vh;
  background: url('./image/vote_bg.png') no-repeat;
  background-size: 100% auto;
  background-color: #f9cd92;
  position: relative;
  .title {
    position: absolute;
    top: 105px;
    left: 50%;
    margin-left: -58px;
    width: 116px;
    height: 27px;
    font-size: 28px;
    font-weight: bold;
    color: #ec522c;
  }
  .result {
    position: absolute;
    top: 180px;
    left: 50%;
    transform: translateX(-50%);
    font-size: 80px;
    font-weight: bold;
    color: #f3990b;
  }
  .resultLoading{
    position: absolute;
    top: 180px;
    left: 50%;
    transform: translateX(-50%);
    font-size: 60px;
    font-weight: bold;
    color: #f3990b;
  }
  img {
    width: 454px;
    height: 82px;
    position: absolute;
    top: 510px;
    left: 50%;
    margin-left: -227px;
  }
  .thank {
    width: 454px;
    position: absolute;
    top: 610px;
    left: 50%;
    margin-left: -227px;
    font-size: 30px;
    font-weight: 500;
    color: #ffcd7e;
    line-height: 48px;
    p {
      text-align: center;
    }
  }
  .btn {
    width: 472px;
    height: 82px;
    background: #ffffff;
    border-radius: 41px;
    font-size: 34px;
    font-weight: bold;
    color: #f3990b;
    position: absolute;
    top: 850px;
    left: 50%;
    margin-left: -236px;
    text-align: center;
    line-height: 82px;
  }
}

.alsrtInfo{
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    z-index: 10;
    background: rgba(0, 0, 0, 0.1);
    .profPrompt_test{
      padding: 30px 10px;
      width: 480px;
      overflow: hidden;
      line-height: 28px;
      border: 1px solid #4eb6d3;
      color: #4eb6d3;
      position: absolute;
      background-color: #fbfbfb;
      top: 356px;
      left: 50%;
      font-size: 14px;
      font-family: Gotham-Book;
      opacity: 1;
      /* z-index: 1; */
      text-align: center;
      transform: translate(-50%, -50%);
    }
  }

</style>
