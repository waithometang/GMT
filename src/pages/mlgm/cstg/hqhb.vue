<template>

  <div class="questionnaire_lottery">
    <div class="alsrtInfo" :style="{display: displayStsates}" ref="alertMsg">
      <div class="profPrompt_test">{{aletMsg}}</div>
    </div>
    <div class="questionnaire_lottery_pages bg1" v-if="open || Hbcqzt">
      <div class="money" v-if="ListData.hbcqzt==4">感谢参与</div>
      <div class="money" v-else-if="ListData.hbs>0">{{ListData.hbs}}元</div>
      <div class="money" v-else-if="ListData.jfs>0">{{ListData.jfs}}积分</div>
      <div class="money" v-else>抽奖中..</div>
      <div class="curve" v-if="ListData.hbcqzt==4">很遗憾，未中奖</div>
      <div class="curve" v-else-if="ListData.hbs>0">恭喜获得现金红包</div>
      <div class="curve" v-else-if="ListData.jfs>0">恭喜获得积分红包</div>
      <div class="curve" v-else>请等待片刻..</div>
      <p class="intro">齐齐助力佛山争创全国一流文明城市！</p>
      <p class="intro size">创文问卷有奖活动，<br/> 参加答题，领取更多现金红包与积分吧！</p>
      <div class="button" @click="backHome" v-if="ListData.hbcqzt==4">确认</div>
      <div class="button" @click="lingqu" v-else>领取红包</div>
      <p class="jifen_intro" v-if="ListData.jfs!=0">领取积分后 系统将自动帮你累计到本微信号积分中</p>
    </div>
    <div class="questionnaire_lottery_pages bg2" @click="shownimation" v-else-if="!open && !Hbcqzt">
      <div class="title">点击任意处打开红包</div>
    </div>
    <div class="shade" v-show="packet_animation">
        <div class="animation" :class="animation_begin ? 'bottom':''">
          <img class="img1" src="/static/questionnaire/img_09.png"/>
          <img class="img2" src="/static/questionnaire/img_09.png"/>
          <img class="img3" src="/static/questionnaire/img_09.png"/>
          <img class="img4" src="/static/questionnaire/img_09.png"/>
          <img class="img5" src="/static/questionnaire/img_09.png"/>
          <img class="img6" src="/static/questionnaire/img_09.png"/>
          <img class="img7" src="/static/questionnaire/img_09.png"/>
          <img class="img8" src="/static/questionnaire/img_09.png"/>
          <img class="img8" src="/static/questionnaire/img_09.png"/>
       </div>
    </div>
  </div>
</template> 
<script>
import {DtwcCj} from "@/api/questionnaire"
export default {
  data(){
    return{
      packet_animation:false,
      animation_begin:false,
      open:false,
      ListData:'',
      aletMsg: '', // 弹出框中的提示语
      displayStsates: 'none',
      dtzt:false
    }
  },
  computed:{
    Hbcqzt(){
      return this.$route.params.sdsc=="true"
    },
    fzdh(){
      return this.$route.params.fzdh
    }
  },
  methods:{
    shownimation(){
      //红包雨动画效果
      this.packet_animation=true
      setTimeout(() => {
        if(!this.open)this.animation_begin=true
        setTimeout(() => {
           this.packet_animation=false
           this.animation_begin=false
           this.open=true
        }, 3000);
      }, 10);
    },
    alertDia (msg) {
      this.displayStsates = 'block'
      this.aletMsg = msg
      // 延迟2秒后消失 自己可以更改时间
      window.setTimeout(() => {
        this.displayStsates = 'none'
      }, 2000)
    },
    backHome(){
      this.$router.replace({name:'questionnaire_index'})
    },
    lingqu(){
      if(this.ListData.ljdz){
        this.alertDia("领取成功!")
        window.setTimeout(() => {
          window.location.href=this.ListData.ljdz
        }, 2500)

      }
      else{
        if(this.dtzt){
          this.alertDia("领取成功!")
          window.setTimeout(() => {
            this.$router.replace({name:'questionnaire_index'})
          }, 2500)
        }
      }
    }
  },


  mounted  (){

    let beforeUrl = sessionStorage.getItem('beforeUrl');
    console.log(beforeUrl);
    if (window.performance.navigation.type == 1 ) {
      //console.log("页面被刷新")
      this.changtoast("不能刷新再次访问!!","error")
    }else {
      //console.log("首次被加载")
      if(beforeUrl !="true")  this.changtoast("不能直接分享访问此页面!!","error")
      //获取红包金额
      DtwcCj({sfdyccj:this.Hbcqzt,fzdh:this.fzdh}).then(rps=>{
        if(rps.data.success){
          this.ListData=rps.data.content
          this.dtzt=true
          setTimeout(() => {
            if(!this.Hbcqzt)this.shownimation()
          }, 3000);
        }else{
          this.dtzt=true
          this.changtoast(rps.data.message,"error")
        }
      })
    }

  }
}

</script>
<style lang="scss" scoped>
@import "@/pages/questionnaire/style/questionnaire_lottery.scss"
</style>
