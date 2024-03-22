<template>
    <div class="PartyReport_record">
      <GmtSearchList url="api/PartyBuilding/dybdList" :useSearch="false"  :pageSize="10">
        <template slot="item" slot-scope="listData">
          <div class="PartyReport_record_item" v-for="(item,index) in listData.data" @click="goto(item)" :key="index">
            <div class="item_img">
              <img :src="item.shjg== '通过' ? '/static/static/PartyReport/img_4.png' : item.shjg== '不通过' ? '/static/static/PartyReport/img_3.png' : '/static/static/PartyReport/img_1.png' "/>
            </div>
            <div class="item_font">
              <p>报到时间：{{item.bdsj}}</p>
              <p>审核时间：{{item.shsj ? item.shsj : '暂无数据'}}</p>
              <p>审核结果：<span class="bold">{{item.shjg ? item.shjg : '待审核'}}</span> </p>
            </div>
          </div>
        </template>
      </GmtSearchList>
    </div>
</template>
<script>
import GmtSearchList from '@/components/GmtSearchList'
export default {
  components:{
    GmtSearchList
  },
  methods:{
    goto(item){
      this.$router.push("/PartyReport_index?isXX=true&id="+item.id)
    }
  }
}
</script>
<style lang="scss" scoped>
@import "./style/PartyReport_record.scss";
</style>