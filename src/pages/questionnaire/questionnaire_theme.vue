<template>
  <div class="questionnaire_theme">
    <div class="questionnaire_theme_pages">
      <p class="questionnaire_theme_title">请选一个主题词游戏入口</p>
      <ul><li v-for="(item,index) in ListData" @click="nextIssue(item)" :key="index" :class="!item.dtzt?'back':''">
        <p>{{item.zm}}</p>
        <div class="buttom">{{item.dtzt?'开始答题':'已答题'}}</div>
        </li>
      </ul>
    </div>
  </div>
</template>
<script>
import {Fzsz} from "@/api/questionnaire"
export default {
  data(){
    return{
      ListData:''
    }
  },
  methods:{
    nextIssue(item){
      if(item.dtzt){
        this.$router.push(`/questionnaire_issue?zm=${item.zm}&dh=${item.dh}&ts=${item.ts}`)
      }else{
        this.changtoast("今天已回答过此词组，明天可再次回答！","error")
      }
    },
  },
  created(){
    Fzsz().then(rps=>{
      if(rps.data.success){
        this.ListData=rps.data.content
      }else{
        this.changtoast(rps.data.message,"error")
      }
    })
  }
}
</script>
<style lang="scss" scoped>
@import "./style/questionnaire_theme.scss"
</style>