<!-- 协商民主事宜 详情 -->
<template>
  <div class="deliberativeDemocracyDetails">
    <div class="title">
      <img src="/images/secondLevelPages/minzhu.png">事项主题
    </div>
    <div class="pages">{{sxzt}}</div>
    <div class="title">
      <img src="/images/secondLevelPages/minzhu.png">评议时间
    </div>
    <div class="pages">{{plsj}}</div>
    <div class="title">
      <img src="/images/secondLevelPages/minzhu.png">参加对象
    </div>
    <div class="pages">{{cjdx}}</div>
    <div class="title">
      <img src="/images/secondLevelPages/minzhu.png">主要内容
    </div>
    <div class="pages" v-html="zynr">
    </div>
  </div>
</template>
<script>
import { GetVillageDeliberation } from "@/api/secondLevelPages/homePage";
// import { storage } from '@/js/until'

export default {
  data(){
    return {
      sxzt:'',
      plsj:'',
      cjdx:'',
      zynr:'',
    }
  },
  created() {
    this.init()
  },
  methods:{
    init(){
      GetVillageDeliberation({id:this.$route.query.id}).then(res=>{
        if(res.data.success){
          this.sxzt=res.data.content.sxzt
          this.plsj=res.data.content.plsj
          this.cjdx=res.data.content.cjdx
          this.zynr=res.data.content.zynr
        }else{
          this.changtoast(res.data.message,'error')
        }
      })
    }
  },
};
</script>
<style scoped lang="scss">
@import '@/style/pages/secondLevelPages/homePage/deliberativeDemocracyDetails.scss';
</style>
