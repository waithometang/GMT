<template>
  <div class="container">
    <img src="./images/lemon.png" />
    <div class="title">{{pageData.jbmc}}</div>
    <div class="central">
      <div class="line-one">
        <span>兑奖截止时间</span>
        <span>{{pageData.jzsj}}</span>
      </div>
      <div class="line-two">
        <span>兑奖状态</span>
        <span class="invalid" v-if="pageData.sfgq">已失效</span>
        <span class="no" v-else-if="pageData.sfyx">未领奖</span>
        <span class="already" v-else>已领奖</span>
      </div>
    </div>
    <div class="confirm">
      <van-button round type="info" size="large" color="rgba(255, 219, 37, 1)" v-if="!pageData.sfgq && pageData.sfyx" @click="verificate">
        <span>确认核销</span>
      </van-button>
      <van-button round disabled type="info" size="large" color="rgba(199, 199, 199, 1)" v-else>
        <span>确认核销</span>
      </van-button>
    </div>
  </div>
</template>

<script>
import wjutils from "@/js/WjSmrzUtil";
export default {
  data() {
    return {
      pageData:{}
      // pageData:{
      //   jbmc: "【柠檬柠檬茶】夏日饮品一杯",
      //   jzsj : "2020-12-12 02:20",
      //   sfgq : false,
      //   sfyx: true,
      // }
    };
  },
  computed: {
    hxm() {
      return this.$route.query.hxm
    }
  },
  methods: {
    verificate(){
      this.$indicator.open('加载中...')
      this.$post('api/mlgm/Jphx',{name:this.hxm}).then(res => {
        this.$indicator.close()
        if(res.data.success){
          this.changtoast('核销成功','success')
        }else{
          this.changtoast(res.data.message,'error')
        }
      })
    },
    getData() {
      this.$indicator.open('加载中...')
      this.$post('api/mlgm/HxmInfo',{sjlb:this.hxm,id:10000}).then(res => {
        this.$indicator.close()
        if(res.data.success){
          this.pageData=res.data.content
        }else{
          this.changtoast(res.data.message,'error')
        }
      })
    }
  },
  created() {
    wjutils.gotoSMRZIfNot(this,this.getData)
  },
};
</script>

<style scoped lang="scss">
@import "./style/shjg.scss";
</style>