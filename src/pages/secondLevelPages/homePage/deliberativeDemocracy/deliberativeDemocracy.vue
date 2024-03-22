<!-- 协商民主 -->
<template>
  <div class="deliberativeDemocracy">
     <div class="select">
      <div @click="changeState(1)" :class="{'cor1': StateType == 1}">协商民主事宜</div>
      <div @click="changeState(4)" :class="{'cor1': StateType == 4}">协商民主制度</div>
    </div> 
    <GmtCommonList
      class="lady"
      v-show="StateType == 1"
      url="api/VillageOpen/GetVillageDeliberationList"
      :parms="{villageId:vid}">
      <template slot="item" slot-scope="listData">
        <div class="item" @click="goto(item.id)" v-for="(item,index) in listData.data" :key="index">
          <img class="header-icon" src="/images/secondLevelPages/img_01.png">
          <span class="title">{{item.title}}</span>
          <span class="number"><img src="/images/secondLevelPages/img_04.png"/></span>
        </div>
      </template>
    </GmtCommonList>
    <div v-show="StateType == 4" v-html="XszdContent">

    </div>
  </div>
</template>

<script>
import { storage } from '@/js/until'
import GmtCommonList from "@/components/GmtCommonList"
import { XSZD } from "@/api/secondLevelPages/homePage";
export default {
  components: {
    GmtCommonList
  },
  computed:{
    vid(){
      return storage.fetch('longData').data.id
    }
  },
  data () {
    return {
      StateType: 1,
      villageId:0,
      XszdContent:''
    }
  },
  created() {
    this.init()
  },
  methods: {
    init(){
      XSZD({villageId:this.vid}).then(res=>{
        if(res.data.success){
          this.XszdContent=res.data.content
        }else{
          this.changtoast(res.data.message,'error')
        } 
      })
    },
    changeState (item) {
      this.StateType = item
    },
    goto(id){
      this.$router.push({
          path: "/deliberativeDemocracyDetails",
          query:{
            id
          }
        });
    }
  }
};
</script>

<style scoped lang="scss" type='text/css'>
@import "@/style/FirstLevelPage/select.scss";
@import '@/style/pages/secondLevelPages/homePage/deliberativeDemocracy.scss';
</style>
