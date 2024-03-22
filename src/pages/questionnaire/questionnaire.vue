<template>
  <div class="questionnaire">
    <router-link v-for="(item,index) in listData" :key="index" :to="item.link">
      <div class="push">
        <img :src="item.img" />
        <div>
          <span>{{item.span}}</span>
          <p>{{item.p}}</p>
        </div>
      </div>
    </router-link>
  </div>
</template>
<script>
import { cwwjFzsz } from '@/api/secondLevelPage';
let cwwjFzszProm
export default {
  data() {
    return {
      listData: [
        {
          img: "/static/questionnaire/img_01.png",
          span: "参加活动",
          p: "点击参加创文问卷，答题赢积分",
          link: "/questionnaire_theme",
        },
        {
          img: "/static/questionnaire/img_02.png",
          span: "活动规则",
          p: "点击了解红包、积分细则",
          link: "/questionnaire_rule",
        },
        {
          img: "/static/questionnaire/img_03.png",
          span: "积分排行榜",
          p: "累计积分排行榜，丰富礼品等着你",
          link: "/questionnaire_Ranking",
        }
      ]
    };
  },
  methods: {
  
  },
  beforeRouteLeave (to, from, next) {
    if (to.path=='/questionnaire_theme') {
      cwwjFzszProm.then(res =>{
        if (res.data.success){
          next();
        }else{
          if (res.data.errorCode==1001) {
            this.$dialog.alert({title:"温馨提示",message:res.data.message})
          }else{
            this.changtoast(res.data.message,'error')
          }
        }
      })
    }else{
      next();
    }
  },
  created(){
    cwwjFzszProm = cwwjFzsz()
    this.$store.commit('Setquestionnaire_bg', "index_bg")
  }
};
</script>
<style lang="scss" scoped>
@import "./style/questionnaire.scss";
</style>