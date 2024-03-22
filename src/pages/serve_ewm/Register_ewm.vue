<template>
  <div class="ewm">
    <div class="ewm_pages">
      <div class="ewm_hread">
        <p>企业（个体户）信息</p>
      </div>
      <div class="ewm_item">
        <span>名称</span>
        <input v-model="mc" readonly  type="text" placeholder="请输入企业（个体户）名称"/> 
      </div>
      <div class="ewm_item">
        <span>详细地址</span>
        <input v-model="xxdz" readonly type="text" placeholder="请选择详细地址"/>
      </div>
    </div>
    <div class="ewm_pages">
      <div class="ewm_hread">
        <p>来访信息</p>
      </div>
      <div class="ewm_item">
        <span>类型</span>
        <input v-model="lx"  type="text" placeholder="请选择来访类型"/> 
      </div>
      <div class="ewm_hread">
        <p>个人体温情况</p>
      </div>
      <div class="tw_static" @click="chageTw(index+1)" v-for="(item,index) in tw" :class="tw_static==index+1 ? 'cor' : ''" :key="index">{{item}}</div>
    </div>
    <div class="ewm_button">
      提交
    </div>
  </div>
</template>
<script>
export default {
  data(){
    return{
        mc:"",
        xxdz:'',
        lx:"",
        tw:['正常37.3℃以下','低热37.3~37.9℃','中热38℃~39℃','高热39℃以上'],
        tw_static:1
    }
  },
  methods:{
    chageTw(item){
      this.tw_static=item
    }
  }
}
</script>
<style lang="scss" scoped>
@import "./style/NewServe_ewm.scss";
</style>