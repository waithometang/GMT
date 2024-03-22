<template>
  <div class="FinancePublic">
    <div class="hread">
        <img src="/images/FirstLevelPage/PovertyRelief_banner.jpg"/>
    </div>
    <div class="main">
      <div class="item">
          <div class="list" @click="goto(15)"><span>涉农、惠农政策资金补贴使用情况公布表</span><img src="/images/secondLevelPages/guideIcon.png"/></div>
      </div>
    </div>
  </div>
</template>
<script>
import {mapActions} from "vuex"
export default {
  methods: {
    ...mapActions(['getGrxx']),
    goto(t) {
      this.getGrxx().then(grxx=>{
        if (!grxx || !grxx.hasSM) {
          this.changtoast("请先实名认证", "info");
          this.$router.replace("Certification");
          return;
        }
        this.$router.push({
          path: "/Announcement",
          query: {
            type: t
          }
        })
      })
    }
  }
};
</script>
<style lang="scss" scoped>
  .FinancePublic{
    margin: 0;
    padding: 0;
    background: #ffffff;
      .hread{
        width: 750px;
        height: 200px;
        text-align: center;
        line-height: 200px;
        margin-bottom: 40px;
          img{
            height: 100%;
            width: 100%;
          }
      }
      .main{
        width: 750px;
        .title{
          padding-top: 25px;
          width: 750px;
          height:28px;
          font-size:28px;
          font-weight: bold;
          color: rgba(55,157,234,1);
          border-bottom: 1px solid;
          padding-bottom: 25px;
          border-color: #f4f4f4;
          display: flex;
          div{
            height:28px;
            width:8px;
            background: rgba(55,157,234,1);
            border-radius: 8px;
            vertical-align: middle;
            margin-left: 22px;
            margin-right: 22px;
          }
        }
        .item{
          width: 750px;
          font-size: 27px;
          .list{
            border-bottom: 1px solid;
            border-color:#f4f4f4;
           padding-left: 25px;
           width: 725px;
           height: 90px;
           line-height: 90px;
            span{
              width: 650px;
              display: inline-block;
            }
            img{
              margin-left: 22px;
              height: 25px;
              vertical-align: middle;
              display: inline-block;
            }
          }
        }
      }
  }
</style>
