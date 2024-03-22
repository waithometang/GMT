<template>
  <div class="questionnaire_Ranking">
    <div class="questionnaire_Ranking_head">
      <div class="head_font">
        <p>我的累计积分：{{ListData.yhJfzsBo}} 积分</p>
        <p>当前积分排名：{{ListData.yhphBo}} 名</p>
        <p class="X_size">继续答题赢积分，丰富礼品等着你来拿！</p>
      </div>
      <div class="head_icon">
        <img src="/static/questionnaire/img_10.png" />
      </div>
    </div>
    <div class="hr"></div>
    <div class="questionnaire_Ranking_Table">
      <div class="table_hr">
        <span>更新时间：{{gxsj}}</span>
        <!-- <div class="Pagination" @click="beat">
          {{PageIndex}}/{{ListData.zysBo}}
          <div class="Pagination_icon">
            <img src="/static/questionnaire/xiala.png" />
          </div>
        </div> -->
      </div>
      <table>
        <tr>
          <th>排名</th>
          <th>微信用户</th>
          <th>当前积分</th>
        </tr>
        <tr v-for="(item,index) in ListData.phbBo" :key="index">
          <!-- <td>{{item.ph}}</td> -->
          <td>
            <img v-if="item.ph==1" src="/static/questionnaire/img_17.png"/>
            <img v-else-if="item.ph==2" src="/static/questionnaire/img_18.png"/>
            <img v-else-if="item.ph==3" src="/static/questionnaire/img_19.png"/>
            <span v-else>{{item.ph}}</span>
          </td>
          <td>{{item.memberName}}</td>
          <td>{{item.jfzs}}</td>
        </tr>
        <!-- <tr v-show="ListData.phbBo.length<10" v-for="item in (10-ListData.phbBo.length)" :key="item">

        </tr> -->
      </table>
      <!-- <div class="button_grop">
        <div @click="step">上一页</div>
        <div @click="next">下一页</div>
      </div> -->
    </div>
    <van-popup v-model="popupShow" position="bottom" :round="true">
      <van-picker :show-toolbar="true" :columns="toalPagesArray" @confirm="onChange" />
    </van-popup>
  </div>
</template>
<script>
let init=true
import {Jfph} from '@/api/questionnaire';
export default {
  data(){
    return{
      popupShow:false,
      ListData:"",
      toalPagesArray:[],
      PageIndex:1,
      // gxsj:new Date()
    }
  },
  computed:{
    gxsj(){
      let date = new Date();
      let Y = date.getFullYear() + '-';
      let M = (date.getMonth()+1 < 10 ? '0'+(date.getMonth()+1) : date.getMonth()+1) + '-';
      let D = date.getDate() < 10 ? '0'+(date.getDate()) + ' ': date.getDate() + ' ';
      let h = date.getHours() < 10 ? '0'+(date.getHours()) + ':': date.getHours() + ':';
      let m = date.getMinutes() < 10 ? '0'+(date.getMinutes()) + ':': date.getMinutes() + ':';
      let s = date.getSeconds() < 10 ? '0'+(date.getSeconds()): date.getSeconds();
      return Y+M+D;
    }
  },
  methods:{
    //跳转
    onChange(item) {
      this.PageIndex=parseInt(item)
      this.getLiatData()
      this.popupShow=false
    },
    //显示弹出框
    beat(){
      this.popupShow=true
    },
    //上一页
    step(){
      this.PageIndex-=1
       if(this.PageIndex>=1){
        this.getLiatData()
      }else{
        this.PageIndex+=1
        this.changtoast('当前是第一页','error')
        return
      }
      this.getLiatData()
    },
    //下一页
    next(){
      this.PageIndex+=1
      if(this.PageIndex<=this.ListData.zysBo){
        this.getLiatData()
      }else{
        this.PageIndex-=1
         this.changtoast('当前是最后一页','error')
        return
      }
    },
    getLiatData(){
      //获得排行榜列表
      Jfph({PageIndex:this.PageIndex,PageSize:10}).then(rps=>{
        if(rps.data.success){
          this.ListData=rps.data.content
          //第一次进入初始化弹出框数组
          if(init){
            for (let index = 1; index <=this.ListData.zysBo; index++) {
              this.toalPagesArray.push(index)
            }
            init=false
          }
        }else{
          this.changtoast(rps.data.message,"error")
        }
      })
    }
  },
  created() {
    //初始化列表
    this.getLiatData()
  }
};
</script>
<style lang="scss" scoped>
@import "./style/questionnaire_Ranking.scss";
</style>