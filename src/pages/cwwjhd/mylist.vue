<template>
    <div class="PartyReport_record" style="top:44px;">
      <GmtSearchList url="api/qy/qydcwjList" :useSearch="false" :parms="{lx:$route.params.type}" :pageSize="10" ref="gmtlist">
        <template slot="item" slot-scope="listData">
          <div class="PartyReport_record_item" v-for="(item,index) in listData.data" @click="goto(item)" :key="index">
           <div class="item_font">
              <p class="bold">企业名称：{{item.qymc}}</p>
              <p class="bold">主要产业：{{item.zycy}}</p>
              <p>{{item.fi_new_time}}</p>
            </div>
            </div>
        </template>
      </GmtSearchList>
    </div>
</template>
<script>
import GmtSearchList from '@/components/GmtSearchList'
import { Tag } from 'vant'
export default {
  components:{
    GmtSearchList,
    Tag
  },
  methods:{
    goto(item){
      this.$emit('click', item)
    },
    getRylx(lx){
        if (lx===1) {
            return '高三毕业生（含中职应届毕业生）'
        }else if (lx===2) {
            return '在校大学生'
        }else{
            return '毕业五年内大学生'
        }
    },
    refresh(){
      this.$refs.gmtlist.search()
    }
  }
}
</script>
<style lang="scss" scoped>
@import "../PartyReport/style/PartyReport_record.scss";
.PartyReport_record{
    position: fixed;
    width: 100%;
    bottom:0px;
}
/deep/ .MissiveList{
    top: 0px !important;
}
</style>