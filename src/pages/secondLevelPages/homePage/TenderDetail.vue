
<template>
  <div class="TenderDetail">
    <div v-html="content"></div>
  </div>
</template>
<script>
import { Zbgg } from "@/api/SanLian.js";

export default {
  data(){
    return {
      content:''
    }
  },
  created() {
    Zbgg({fid:this.$route.params.fid}).then(res=>{
      if(res.data.success){
        this.content=res.data.content.content
        document.title=res.data.content.title
      }else{
        this.changtoast(res.data.message,'error')
      } 
    })
  },
  updated () {
    this.$nextTick(function(){
      this.RichTextDispose()
    })
  }
}
</script>
<style>
.TenderDetail{
  padding:0px 20px 0px 20px;
}
</style>
