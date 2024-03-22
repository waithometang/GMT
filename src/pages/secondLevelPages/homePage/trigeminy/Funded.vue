<template>
  <div class="FinancePublic">
    <div class="hread">
        <img src="/images/FirstLevelPage/Funded_banner.jpg"/>
    </div>
    <div class="main">
      <div class="item">
          <!-- <div class="list" @click="goto(9)"><span>招标公告</span><img src="/images/secondLevelPages/guideIcon.png"/></div> -->
          <!-- <div class="list" @click="goto(10)"><span>中标公告</span><img src="/images/secondLevelPages/guideIcon.png"/></div> -->
          <div class="list" @click="goto(11)"><span>农村集体资产发包（租赁）月度合同清单</span><img src="/images/secondLevelPages/guideIcon.png"/></div>
          <div class="list" @click="goto(12)"><span>农村集体资产发包（租赁）合同总清单</span><img src="/images/secondLevelPages/guideIcon.png"/></div>
          <div class="list" @click="goto(13)"><span>资产情况公布</span><img src="/images/secondLevelPages/guideIcon.png"/></div>
          <div class="list" @click="goto(14)"><span>农村建设类项目招投标情况公布表</span><img src="/images/secondLevelPages/guideIcon.png"/></div>
      </div>
    </div>
  </div>
</template>
<script>
import {mapActions} from "vuex"
export default {
  methods:{
    ...mapActions(['getGrxx']),
    goto(t) {
      this.getGrxx().then(grxx=>{ 
        if(t!=9 && t!=10){
          if (!grxx || !grxx.hasSM) {
            this.changtoast("请先实名认证", "info");
            this.$router.replace("Certification");
            return;
          }
        }
        this.$router.push({
          path: "/Announcement",
          query: {
            type: t
          }
        })
      })
    },
    init(){
      
    }
  },
}
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
