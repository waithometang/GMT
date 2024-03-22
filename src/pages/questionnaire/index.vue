<template>
  <div class="index">
      <div class="bg"></div>
      <div :class="jianbain ? 'main_index' : 'main_content'">
        <router-view></router-view>
      </div>
      <div class="publicAttention" v-if="sfgz">
        <div class="attention-maike"></div>
        <div class="attention-content">
          <div class="clos" @click="clos"><img src="/static/ybmimages/close.png" alt=""></div>
          <div class="headIcon"><img src="/static/ybmimages/gm.png" alt=""></div>
          <div class="name">高明通</div>
          <div class="title">长按下方二维码关注高明通公众号，获取权限</div>
          <div class="icon"><img src="/static/ybmimages/gmt-url.jpg" alt=""></div>
        </div>
      </div>
  </div>
</template>
<script>
import { WaChatrequireShare } from "@/js/WaChatrequireShare";
import { mapActions } from 'vuex';
export default {
  data () {
    return {
      jianbain:true,
      sfgz:false
    }
  },
  watch:{
     $route(to,from){
       this.change(to)
    }
  },
  methods:{
    ...mapActions(['getGrxx']),
    change(to){
      this.jianbain=false
       if(to.name=="questionnaire_Ranking"){
        window.document.documentElement.setAttribute('data-theme', 'Ranking');
       }else if(to.name=='questionnaire'){ 
         this.jianbain=true
        window.document.documentElement.setAttribute('data-theme', 'index');
      }else{
         window.document.documentElement.setAttribute('data-theme', 'theme');
      }
    },
    clos(){
      this.getGrxx(true).then(grxx => {
        if (grxx.sfgz) {
          this.sfgz=false
        }
      })
    },
  },
  created(){
    this.change(this.$route)
    this.getGrxx().then (grxx => {
      if (!grxx.sfgz) {
        this.sfgz=true
      }
    })
    setTimeout(() => {
      this.$nextTick(() => {
        WaChatrequireShare("高明区创文问卷调查有奖活动",'','questionnaire_index','/images/wcwj_logo.png')
      })
    }, 1500);
  }
}
</script>
<style lang="scss" scoped>
@import "./style/index.scss";
</style>