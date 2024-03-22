<!--发布类列表通用页面-->
<template>
  <div>
    <GmtSearchList url="api/Common/PulishList" :parms="{mkId:this.mkid,fblxId:this.__fblxId,vid:this.$route.params.vid,lb:this.lb}" >
      <template slot="item" slot-scope="listData">
        <GmtDefaultList :listData="listData.data" :mkid='mkid'></GmtDefaultList>
      </template>
    </GmtSearchList>
  </div>
</template>
<script>
(function () {
  var isPageHide = false
  window.addEventListener('pageshow', function () {
    if (isPageHide) {
      window.location.reload()
    }
  });
  window.addEventListener('pagehide', function () {
   isPageHide = true
  })
})(window)

import GmtSearchList from "@/components/GmtSearchList.vue";
import { PublishUtil } from "@/js/businessUntil";
import { GetAddReaded,GetFblx } from '@/api/secondLevelPage'
import GmtDefaultList from '@/components/GmtDefaultList'

export default {
  data() {
    return {
      mkid:0,
      lb:''
    };
  },
  props: {
    fblxId:{
      type:String
    },
    t:{
      type:String
    }
  },
  computed: {
    newsType() { // 发布类型
      return Number(this.$route.query.type);
    },
    __fblxId(){ // 发布id
      return this.$route.params.id || this.fblxId
    },
  },
  methods: {
    updateLb(){
      if (this.__fblxId==='33') {
        if (this.t==='1') {
          this.lb='3861家长学校'
        }else if (this.t==='2'){
          this.lb='益家课堂'
        }else if (this.t==='3'){
          this.lb='乐享家'
        }else if(this.lb){
          this.lb=''
        }
      }
    }
  },
  created() {
    this.updateLb()
    GetFblx(this.__fblxId).then(res=>{
      if(res.data.success){
        try {
          if(res.data.content.title) {
            document.title=res.data.content.title
          }
        } catch (error) {}
        finally {
          this.mkid=res.data.content.mkid
        }
        
      }else{
        this.changtoast(res.data.message,'error')
      } 
    })
  },
  components: {
    GmtSearchList,
    GmtDefaultList
  }
};
</script>
<style lang="scss" scoped>
@import "@/style/components/villagePublishList.scss"
</style>
