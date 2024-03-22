<template>
    <div class="PartyReport_record" style="top:44px;">
      <GmtSearchList url="api/zx/dxshdbmlist" :useSearch="false" :parms="{lx:$route.params.type}" :pageSize="10" ref="gmtlist">
        <template slot="item" slot-scope="listData">
          <div class="PartyReport_record_item" v-for="(item,index) in listData.data" @click="goto(item)" :key="index">
           <div class="item_font">
              <p class="bold">姓名：{{item.xm}}</p>
              <p class="bold">活动主题：{{item.zt}}</p>
              <p>{{item.rq}}</p>
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
            return '2020年毕业的高三毕业生'
        }else if (lx===1) {
            return '2020年毕业的大学毕业生'
        }else{
            return '2016年至2020年大学毕业的应往届生'
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