<template>
  <div class="Record_ewm">
    <div class="record_pages" v-for="item in 34" :key="item">
      <div class="record_hread">
        <div class="hread_icon"></div>
        <div class="hread_time">2020-03-25</div>
        <div class="hread_xq">详情>></div>
      </div>
      <div class="record_item">
        <div class="record_list" @click="details">
          <div class="list">
            <img src="/static/yq-icon-2.png" />
            <span>等级：2人</span>
          </div>
          <div class="list">
            <img src="/static/yq-icon-1.png" />
            <span>等级：2人</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  methods:{
    details(){
      this.$router.push("/RecorDetails_ewm")
    }
  }
}
</script>
<style lang="scss" scoped>
@import "./style/Record_ewm.scss";
</style>