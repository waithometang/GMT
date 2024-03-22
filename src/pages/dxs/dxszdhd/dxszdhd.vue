<template>
  <div class="ewm">
    <van-form @submit="onSubmit" label-align="left" label-width="100px">
      <van-field :value="form.xm" disabled label="姓名："/>
      <van-field :value="form.xb" disabled label="性别："/>
      <van-field :value="form.sfzh" disabled label="身份证号："/>
      <van-field :value="form.lxfs" disabled label="联系方式："/>
      <van-field :value="form.xjzd" disabled label="家庭地址："/>
      <div class="spilt"/>
      <pathGroup ref="pathGroup" v-model="pathType" :isDetail="isDetail" @routeNumber="inputRouteNumber" />
      <van-field v-model="remarks" v-if="!isDetail || form.bz" :disabled="isDetail" placeholder="请输入" maxlength="500" :show-word-limit="true" label="备注：" type="textarea" :rows="4"/>
      <div style="margin: 16px;" v-if="canEdit">
        <van-button round block v-if="!isDetail" type="info" native-type="submit">提交</van-button>
      </div>
    </van-form>
  </div>
</template>
<script>
import pathGroup from "./pathGroup.vue"
export default {
  data() {
    return {
      form:{},
      pathType:[],
      remarks:'',
      routeNumber: ""
    };
  },
  props: {
    canEdit:{
      type:Boolean,
      default:true
    },
    isDetail:{
      type:Boolean,
      default:false
    },
  },
  inject: ["reload"],
  components:{
    pathGroup
  },
  created() {
    this.$indicator.open('加载中...')
    if (this.isDetail) {
       this.$post('api/zx/dxsmcbmxx').then(res => {
        this.$indicator.close()
        if(res.data.success){
          this.form=res.data.content
          this.pathType=this.form.type.split(',').map(m=>Number(m))
          this.remarks=this.form.bz
          this.$refs.pathGroup.setType(this.pathType)
        }else{
          this.changtoast(res.data.message,'error')
        }
      })     
    }else{
      this.$post('api/zx/dxsbmxx').then(res => {
        this.$indicator.close()
        if(res.data.success){
          this.form=res.data.content
        }else{
          this.changtoast(res.data.message,'error')
        }
      })
    }
  },
  methods: {
    onSubmit(){
      if (this.pathType.length===0) {
        this.$alert('请选择活动路线','温馨提示')
        return
      }
      this.$dialog
        .confirm({
          title: "确认报名",
          message: "请确认是否报名"+this.routeNumber+"\n提交后不可更改！"
        }).then(()=>{
          this.$indicator.open('提交中...')
          this.$post('api/zx/dxsmcbm',{pathType:this.pathType,bz:this.remarks}).then(res =>{
            if (res.data.success){
              this.$toast.success('提交成功')
              this.reload()
            }else{
              this.$alert(res.data.message,'温馨提示')
            }
          })
        })

    },
    inputRouteNumber(val) {
      this.routeNumber = val;
    },
  }
};
</script>

<style lang='scss' scoped>
@import "../style/index.scss";
/deep/ .van-field__control{
  text-align:right;
  color: #333333;
}
/deep/ textarea{
  text-align: left !important;
}
.spilt{
  width:100vw;
  height:12px;
  background:rgba(238,238,238,1);
}
</style>