<template>
  <div class="Record_ewm">
    <div class="record_pages">
      <div class="record_hread">
        <div class="hread_icon"></div>
        <div class="hread_time">2020-03-25</div>
        <div class="hread_xq">详情>></div>
      </div>
      <div class="record_item" @click="Register" v-for="(item,index) in 3" :key="index">
        <div class="record_dg">
          {{index==0?'登记2人  体温异常1人':''}}
        </div>
        <div class="details_list">
        <div class="list_hread">
          <img src="/static/ren.png"/>张**
          <span>正常</span>
        </div>
        <p>备注：一切正常</p>
        <p>10：10</p>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  methods:{
    Register(){
      this.$router.push("/Register_ewm")
    }
  }
}
</script>
<style lang="scss" scoped>
@import "./style/Record_ewm.scss";
</style>