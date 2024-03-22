<template>
  <div class="rule">
    <div class="rule-pages" v-html="ListData.gzsm">
    </div>
    <div class="button" @click="pushtheme">
      我要参加答题
    </div>
  </div>
</template>
<script>
import {Hdgz} from "@/api/questionnaire"
export default {
  data(){
    return{
      ListData:''
    }
  },
  methods:{
    pushtheme(){
      this.$router.push("/questionnaire_theme")
    }
  },
  created(){
    Hdgz().then(rps=>{
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
@import "./style/rule.scss"
</style>