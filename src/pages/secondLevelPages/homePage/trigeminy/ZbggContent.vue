<template>
  <div v-html="content"></div>
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
    Zbgg({fid:this.$route.query.fid}).then(res=>{
      if(res.data.success){
        this.content=res.data.content.content
      }else{
        this.changtoast(res.data.message,'error')
      }
    })
  },
}
</script>
