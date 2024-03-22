<template>
  <div class="questionnaire_list">
    <div class="questionnaire_issue_item">
      <div class="questionnaire_issue_item_head">
        <div class="flex">
          <div class="num">题{{index+1}}</div>
          <div class="issue">
            <div class="title">{{item.tkxxArgs.tmbt}}({{item.tkxxArgs.tmlb}})</div>
          </div>
        </div>
      </div>
      <GmtRadio :options="thisList" :title="''" :border="false" :multiSelect="item.tkxxArgs.tmlb=='多选'" class="select" v-model="thisChages"/>
      <div class="prompt">
        <span>你的答案:<span>{{youranswer}}</span></span>
        <div class="icon"><img src="/static/questionnaire/img_11.png"/></div>
        <div class="dialogue" v-if="xxts">
					<div class="font">{{xxts}}</div>
          <div class="triangle"></div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import GmtRadio from "@/components/GmtRadio";
export default {
  data(){
    return{
      youranswer:'', //你的答案
      thisChages:'',
      thisList:'',
      xxts:''
    }
  },
  components:{
    GmtRadio
  },
  props:{
    index:{
      type:Number
    },
    item:{
      type: Object,
    }
  },
  watch: {
    thisChages(val){
      let thisChagesList=this.thisChages.split(";")
      let value=thisChagesList[thisChagesList.length-1]
      let list=this.item.tkxxArgs.tmXxXq.find(s=>s.dtxx==value)
      if(list){
        this.xxts=list.xxts
        for (let i = 0; i < thisChagesList.length; i++) {
          if(i==0){
            this.youranswer=thisChagesList[i].substring(0,1)
          }else{
            this.youranswer+=','+thisChagesList[i].substring(0,1)
          }
        }
      }else{
        this.xxts=''
        this.youranswer=''
      }
    }
  },
  methods:{
    getVal () {
      this.thisChages.split(';').forEach(i => {
       this.item.tkxxArgs.tmXxXq.forEach(s=>{
         if(s.dtxx==i){
           s.isselect=true
         }
         });
      });
      return this.item
    }
  },
  created(){
    let ins=0;
    this.thisList=this.item.tkxxArgs.tmXxXq
    this.thisList.forEach(i => {
      i.value=i.dtxx
      i.id=ins;
      ins++;
    });
  }
}
</script>
<style lang="scss" scoped>
@import "../style/questionnaire_issue.scss"
</style>