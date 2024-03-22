<template>
  <div class="home_zx">
    <GmtSearchList url="fapi/qzhd/yyzxList" :parms="{isAll: true}" :pageSize="10">
      <template slot="item" slot-scope="listData">
        <div class="home_list" v-for="(item, index) in listData.data" :key="index" @click="public_list_click(item)">
          <div class="hread">
            <div class="home_hread_img"><img :src="item.img"/></div>
            <div class="home_hread_name">
              <span>{{item.name ? item.name :'匿名'}}</span>
              <p>{{item.rq}}</p>
            </div>
            <div class="home_hread_but">{{item.lx}}</div>
          </div>
          <div class="home_title">{{item.bt}}</div>
          <div class="list_content">
            <div class="home_cont noshow" v-if="item.nr != ''" :class="{'noshow':cont_isshow}">
              {{item.nr}}
            </div>
          </div>
          <div class="home_hf" v-if="item.zt !== '待回复'">
            <span>回复内容：</span>{{item.hfnr}}
          </div>
        </div>
      </template>
     </GmtSearchList>
  </div>
</template>

<script>
import GmtSearchList from '@/components/GmtSearchList'
export default {
  components: {
    GmtSearchList
  },
  data(){
    return{
      cont_isshow:false,
      quanwen:false
    }
  },
  methods:{
    public_list_click(item) {
      // this.$emit('public_list_click', item)
      this.$router.push(`/fntzzxxq/${item.id/1}`)
    }
  },
}
</script>

<style lang="scss" scoped>
@import '../style/publicList.scss';
</style>
