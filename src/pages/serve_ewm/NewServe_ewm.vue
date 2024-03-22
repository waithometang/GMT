<template>
  <div class="ewm">
    <div class="ewm_pages">
      <div class="ewm_hread">
        <p>企业（个体户）信息</p>
      </div>
      <div class="ewm_item">
        <span>名称</span>
        <input v-model="mc"  type="text" placeholder="请输入企业（个体户）名称"/> 
      </div>
      <div class="ewm_item">
        <span>注册号或信用代码</span>
        <input v-model="zch"  type="text" placeholder="请输入注册号或信用代码"/>
      </div>
      <div class="ewm_item" @click.stop="select(1)">
        <span>所属行业</span>
        <input v-model="hy_val" type="text" readonly placeholder="请选择所属行业"/>
      </div>
      <div class="ewm_item" @click="select(2)">
        <span>所在镇街</span>
        <input v-model="sszj_val" type="text" placeholder="请选择所在镇街"/>
      </div>
      <div class="ewm_item">
        <span>详细地址</span>
        <input v-model="xxdz" type="text" placeholder="请选择详细地址"/>
      </div>
    </div>
    <div class="ewm_pages">
      <div class="ewm_hread">
        <p>联系人信息</p>
      </div>
      <div class="ewm_item">
        <span>姓名</span>
        <input v-model="xm"  type="text" placeholder="请输入姓名"/> 
      </div>
      <div class="ewm_item">
        <span>身份证号</span>
        <input v-model="sfzh"  type="text" placeholder="请输入身份证号"/>
      </div>
      <div class="ewm_item">
        <span>联系电话</span>
        <input v-model="lxdh" type="text" placeholder="请输入联系电话"/>
      </div>
    </div>
    <div @click="next" class="ewm_button">下一步</div>
    <van-popup v-model="popupShow" position="bottom" :round="true" :close="onClose">
      <van-picker :show-toolbar="true" :columns="columns"  @confirm="onChange" @cancel="closePopup" />
    </van-popup> 
    <van-dialog use-slot v-model="dialogShow" :show-cancel-button="false" >
      <img class="action_img" src="/static/report/cg.png"/>
       <p>确认信息填报无误后<br/>
       将资料提交后台进行数据比对<br/>
       比对正确后将生成服务二维码</p>
      </van-dialog>
  </div>
</template>
<script>
export default {
  data(){
    return{
      xm:'',
      sfzh:'',
      lxdh:"",
      mc:'',
      zch:'',
      xxdz:'',
      popupShow:false,
      hy:['物业小区','公众场所','住宿和餐饮业','企业和个体户','其他'],
      hy_val:'',
      sszj:['荷城街道','杨和镇','明城镇','更合镇'],
      sszj_val:'',
      static:1,
      columns:'',
      dialogShow:false
    }
  },
  methods:{
    select(item){
      this.static=item
      if(item==1){
        this.columns=this.hy
      }else{
        this.columns=this.sszj
      }
      this.popupShow=true
    },
    onClose(){
      console.log(this.val);
    },
    onChange(item){
      if(this.static==1){
        this.hy_val=item
      }else{
        this.sszj_val=item
      }
      this.popupShow=false
    },
    closePopup(){
      this.popupShow=false
    },
    next(){
      // this.dialogShow=true
      this.$router.push("/Download_ewm")
    }
  }
}
</script>
<style>
.van-dialog__content{
  text-align: center;
  font-size: 28px;
}
.action_img{
    width: 80px;
    height: 80px;
    display:inline-block;
    margin: 30px 0 0 0;
}

</style>
<style lang="scss" scoped>
@import "./style/NewServe_ewm.scss";
</style>