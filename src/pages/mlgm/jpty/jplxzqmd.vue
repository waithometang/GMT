<!-- 精品路线中奖名单 -->
<template>
  <div class="win-prize">
    <div class="content">
      <div class="head">
        <span class="title">{{title}} 中签名单</span>
        <span class="release-date">发布时间：{{fbsj}}</span>
      </div>
      <div class="number">
        <div class="line">
          <span>总计报名人数：{{zjbmrs}}人</span>
          <span>中签人数：{{zqrs}}人</span>
        </div>
        <div class="line">
          <span>总计报名微信号数：{{zjbmwxhs}}</span>
          <span>中签微信：{{zqrs2}}个</span>
        </div>
      </div>
      <div class="name-list">
        <!-- <GmtSearchList :url="url" :parms="{}" :pageSize="11" :useSearch="false" :report="true">
        <template slot="item" slot-scope="listData">-->
        <table class>
          <tr>
            <th>姓名</th>
            <th>手机号</th>
            <th>人数</th>
          </tr>
          <tr v-for="(item,index) in listData" :key="index">
            <td>{{item.name}}</td>
            <td>{{item.phone | hidephone}}</td>
            <td>{{item.number}}</td>
          </tr>
        </table>
        <!-- </template>
        </GmtSearchList>-->
      </div>
    </div>
  </div>
</template>

<script>
import GmtSearchList from "@/components/GmtSearchList";
export default {
  data() {
    return {
      title: "",
      fbsj: "",
      zjbmrs: "",
      zqrs: "",
      zjbmwxhs: "",
      zqrs2: "",
      listData: [],
    };
  },
  components: {
    GmtSearchList,
  },
  methods: {},
  created () {
    this.$indicator.open('加载中...')
    this.$post('api/mlgm/jplxzcmd',{}).then(res => {
      this.$indicator.close()
      if(res.data.success){
        let _data = res.data.content
        this.listData=_data.list
        this.title=_data.zt
        this.fbsj=_data.fbsj
        this.zjbmrs=_data.zjbmrs
        this.zqrs=_data.zqrs
        this.zjbmwxhs=_data.zjbmwxhs
        this.zqrs2=_data.zqrs2
      }else{
        this.changtoast(res.data.message,'error')
      }
    })
  },
  filters: {
    hidephone: function (value) {
      return value.replace(/^(\d{3})\d{4}(\d{4})$/,'$1****$2');
    },
  },
};
</script>


<style lang="scss" type="text/css" scoped>
@import "./style/jplxzqmd.scss";
</style>
