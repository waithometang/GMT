<template>
  <div class="questionnaire_receive">
    <div class="questionnaire_receive_head_font">
      <span>恭喜您获奖了！</span>
      <br>
      <br>
      <span class="ts">积分排行{{ljPhJpBo.ph}}名，获得价值{{ljPhJpBo.jp}}元的礼品一份</span>
      <p>感谢您的助力。</p>
      <p>助力佛山争创全国一流文明城市，高明在行动。</p>
    </div>
    <div class="questionnaire_receive_from">
      <div><input type="text" v-model="listdata.xm" placeholder="请输入姓名"/></div>
      <div><input type="text" v-model="listdata.lxdh" placeholder="请输入手机号进行领取"/></div>
      <div @click="submit" class="button">确认</div>
    </div>
    <div class="questionnaire_receive_text" v-html="gz"></div>
  </div>
</template>
<script>
import {Ljgz,Txzl} from "@/api/questionnaire"
export default {
  data () {
    return {
      gz:'',
      listdata:{
        xm:'',
        lxdh:''
      },
      ljPhJpBo:''
    }
  },
  methods:{
    submit(){
      Txzl(this.listdata).then(rps=>{
      if(rps.data.success){
          this.$router.replace("/")
           this.changtoast('已成功保存中奖信息!')
        }else{
          this.changtoast(rps.data.message,"error")
        }
    })
    }
  },
  created () {
    Ljgz().then(rps=>{
      if(rps.data.success){
          this.gz=rps.data.content.ljgz
          if(rps.data.content.yhxx.ljzt==1){
            this.listdata=rps.data.content.yhxx
          }
          this.ljPhJpBo=rps.data.content.ljPhJpBo
        }else{
          this.changtoast(rps.data.message,"error")
        }
    })
  }
}
</script>
<style lang="scss" scoped>
@import "./style/questionnaire_receive.scss"
</style>
