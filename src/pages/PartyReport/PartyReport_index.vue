<template>
  <div class="PartyReport_index">
    <div class="PartyReport_select">
      <router-link replace to="/PartyReport_index">
        <div :class="$route.name=='PartyReport_message'?'target':''" @click="load()" class="PartyReport_select_list">
          党员报到
        </div>
      </router-link>
      <router-link to="/PartyReport_record">
        <div :class="$route.name=='PartyReport_record'?'target':''"  class="PartyReport_select_list">
          报到记录
        </div>
      </router-link>
    </div>
    <div class="PartyReport_main">
      <router-view></router-view>
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
@import "./style/PartyReport_index.scss"
</style>