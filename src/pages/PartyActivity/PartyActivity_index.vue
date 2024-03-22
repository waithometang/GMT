<template>
  <div class="PartyReport_index">
    <div class="PartyReport_select">
      <router-link to="/PartyActivity_index">
        <div :class="$route.name=='PartyActivity_list'?'target':''" class="PartyReport_select_list">
          活动列表
        </div>
      </router-link>
      <router-link to="/PartyActivity_mylist">
        <div :class="$route.name=='PartyActivity_mylist'?'target':''"  class="PartyReport_select_list">
          我的活动
        </div>
      </router-link>
    </div>
    <div class="PartyReport_main">
      <keep-alive>
        <router-view></router-view>
      </keep-alive>
    </div>
  </div>
</template>
<script>
export default {
  data () {
    return {
    }
  },
  inject: ["reload"],
  methods:{
    load(){
      this.reload()
    }
  }
}
</script>
<style lang="scss" scoped>
@import "../PartyReport/style/PartyReport_index.scss";
.PartyReport_select{
  padding-bottom: 0px !important;
}
</style>