<template>
  <div class="ewm">
    <van-form @submit="onSubmit" label-align="right" label-width="100px">
      <van-field
        v-model="pageObj.xm"
        label="姓名"
        :required="true"
        :readonly="readonly && !canEdit"
        placeholder="请输入您的真实姓名"
        :rules="[{ required: true, message: '请输入您的真实姓名' }]"
      />
      <sexSelector v-model="pageObj.xb" :readonly="readonly && !canEdit"/>
      <van-field
          v-model="pageObj.sfzh"
          label="身份证号"
          :required="true"
          :readonly="readonly && !canEdit"
          placeholder="请输入您的身份证号"
          :rules="[{ required: true, message: '请输入您的身份证号' }]"
        />
      <!-- <idCardF :disabled="canEdit" v-model="pageObj.sfzh" :readonly="readonly"/> -->
      <template v-if="type===1 || type===2">
        <vant-selector v-model="pageObj.gzbyxx" :columns="['佛山市高明区第一中学','佛山市高明区纪念中学','佛山市高明区高明实验中学','广东外语外贸大学附设佛山外国语学校','佛山市高明区职业技术学校','佛山市高明区高级技工学校','其他']" label="高中毕业学校" :readonly="readonly && !canEdit" />
        <datetimeSelector v-if="type===2" v-model="pageObj.gzbysj" label="高中毕业时间" :readonly="readonly && !canEdit" />
      </template>
      <template v-if="type===2 || type===3 || type===4">
        <zzmmSelector v-model="pageObj.zzmm" :readonly="readonly && !canEdit" />
        <nationSelector v-model="pageObj.mz" :readonly="readonly && !canEdit" />
        <vant-selector v-model="pageObj.xl" :columns="['大专','本科','硕士研究生','博士研究生']" label="学历" :readonly="readonly && !canEdit" />
        <addressSelector v-model="pageObj.hjszd" label="户籍所在地" :readonly="readonly && !canEdit" />
        <van-field
          v-model="pageObj.dxjdyx"
          label="大学就读院校"
          :readonly="readonly && !canEdit"
          :required="true"
          placeholder="请输入您的大学就读院校"
          :rules="[{ required: true, message: '请输入您的大学就读院校' }]"
        />
        <areaSelector v-model="pageObj.dxdz" label="大学校园地址" :readonly="readonly && !canEdit" />
        <van-field
          v-model="pageObj.sxzy"
          label="第一专业"
          :required="true"
          :readonly="readonly && !canEdit"
          placeholder="请输入您的第一专业"
          :rules="[{ required: true, message: '请输入您的第一专业' }]"
        />
      <van-field
        v-model="pageObj.dezy"
        label="第二专业"
        :readonly="readonly && !canEdit"
        placeholder="请输入您的第二专业"
      />
      <datetimeSelector :minDate="bysjMinDate" :maxDate="bysjMaxDate" v-model="pageObj.dxbysj" label="大学毕业时间" :readonly="readonly && !canEdit" />
      <addressSelector v-model="pageObj.xjzd" label="现居住地" :readonly="readonly && !canEdit" />
      </template>
      <template v-if="type===3 || type===4">
        <vant-selector v-model="pageObj.jyzt" :columns="['单位就业','企业就业','灵活就业','自主创业','失业','无业','升学深造','出国','应征入伍']" label="就业状态" :readonly="readonly && !canEdit" />
        <vant-selector v-if="isNotInWork()" v-model="pageObj.wyyy" :columns="['正在求职','自愿暂时未就业','其他情况未就业']" label="失业或无业原因" :readonly="readonly && !canEdit" />
        <template v-else-if="pageObj.jyzt=='单位就业' || pageObj.jyzt=='企业就业'">
          <GmtField v-model="pageObj.jydwmc" label="就业单位名称" :readonly="readonly && !canEdit"/>
          <addressSelector v-model="pageObj.jydwdz" label="就业单位地址" :readonly="readonly && !canEdit" />
        </template>
      </template>
      <template v-if="type===2 || type===3 || type===4">
      <van-field
        v-model="pageObj.lxfs"
        label="联系方式"
        type="tel"
        :required="true"
        :readonly="readonly && !canEdit"
        maxlength="11"
        placeholder="请输入您的联系方式"
        :rules="[{ required: true, message: '请输入您的联系方式' }]"
      />
      <van-cell title="专业技术资格证书(职称)--填写最高级别" class="titleCell"/>
      <certificateCom placeholder="请输入您的专业技术资格证书" 
        :params1.sync="pageObj.zyjszs_mc1" 
        :params2.sync="pageObj.zyjszs_dj1"
        :columns="['高级','中级','初级']" 
        :readonly="readonly && !canEdit"
        label="证书1"/>
      <certificateCom placeholder="请输入您的专业技术资格证书" 
        :params1.sync="pageObj.zyjszs_mc2" 
        :params2.sync="pageObj.zyjszs_dj2"
        :columns="['高级','中级','初级']" 
        :readonly="readonly && !canEdit"
        label="证书2"/>
      <certificateCom placeholder="请输入您的专业技术资格证书" 
        :params1.sync="pageObj.zyjszs_mc3" 
        :params2.sync="pageObj.zyjszs_dj3"
        :columns="['高级','中级','初级']" 
        :readonly="readonly && !canEdit"
        label="证书3"/>
      <van-cell title="职业资格证书(技能)--填写最高级别" class="titleCell"/>
      <certificateCom placeholder="请输入您的职业资格证书" 
        :params1.sync="pageObj.zyzs_mc1" 
        :params2.sync="pageObj.zyzs_dj1"
        :columns="['高级技师','技师','高级工','中级工','初级工']" 
        :readonly="readonly && !canEdit"
        :required="false"
        label="证书1"/>
      <certificateCom placeholder="请输入您的职业资格证书" 
        :params1.sync="pageObj.zyzs_mc2" 
        :params2.sync="pageObj.zyzs_dj2"
        :columns="['高级技师','技师','高级工','中级工','初级工']" 
        :readonly="readonly && !canEdit"
        :required="false"
        label="证书2"/>
      <certificateCom placeholder="请输入您的职业资格证书" 
        :params1.sync="pageObj.zyzs_mc3" 
        :params2.sync="pageObj.zyzs_dj3"
        :columns="['高级技师','技师','高级工','中级工','初级工']" 
        :readonly="readonly && !canEdit"
        :required="false"
        label="证书3"/>
      </template>
      <div style="margin: 16px;" v-if="!readonly || canEdit">
        <van-button round block type="info" native-type="submit">提交</van-button>
      </div>
      <div style="margin: 16px;" v-else-if="pageObj.rzzt === '待认证'">
        <van-button round block type="info" native-type="button" @click="rzClickFn">认证</van-button>
      </div>
      <div style="margin: 16px;" v-if="readonly && !canEdit">
        <van-button round block type="info" native-type="button" @click="editFn">点击修改信息</van-button>
      </div>
    </van-form>
  </div>
</template>
<script>
import sexSelector from "@/components/vantSelector/sex"
import nationSelector from "@/components/vantSelector/nation"
import zzmmSelector from "@/components/vantSelector/zzmm"
import addressSelector from "@/components/vantSelector/address"
import datetimeSelector from "@/components/vantSelector/datetime"
import idCardF from "@/components/GmtIdCardField"
import GmtField from "@/components/GmtField"
import certificateCom from "./components/certificateCom"
import areaSelector from "@/components/vantSelector/area"

export default {
  computed:{
    type(){
      return Number(this.$route.params.type)
    }
  },
  props:{
    detailData:{
      type: Object,
      default:null,
    },
    readonly:{
      type: Boolean,
      default:false
    }
  },
  data() {
    return {
      pageObj:{},
      bysjMinDate:new Date(2000, 0, 1),
      bysjMaxDate:new Date(2025, 11, 31),
      tabState: 2,
      columns: "",
      static: 1,
      popupShow: false,
      canEdit:false,
    };
  },
  created() {
    if (this.detailData) {
      this.pageObj = this.detailData
    }else{
      this.pageObj.rylx_id = this.type
    }
  },
  components: {
    sexSelector,
    idCardF,
    nationSelector,
    addressSelector,
    datetimeSelector,
    GmtField,
    certificateCom,
    zzmmSelector,
    areaSelector
  },
  methods: {
    editFn(){
      this.canEdit=true
    },
    isNotInWork(){
      return '失业;无业'.indexOf(this.pageObj.jyzt)>-1
    },
    rzClickFn(){
      this.$emit('rzEv',this.pageObj)
    },
    onSubmit(){
      this.$dialog
            .confirm({
                title: "确认报名",
                message: "请确认填报报名信息!",
                confirmButtonColor: "#2E3092",
                className: "bigConfirm",
            })
            .then(()=>{
              this.$indicator.open('提交中...')
              this.$post('api/zx/dxsbm',this.pageObj).then(res => {
                if(res.data.success){
                  this.$toast.success('提交成功')
                  this.pageObj={rylx_id: this.type}
                  this.$emit('submitSc',{id:res.data.content,isEdit:this.canEdit})
                }else{
                  this.$alert(res.data.message)
                }
              })
            })
    },
    changeTab(item) {
      if (item.state == 2) {
        this.$router.push("/dxsmyinfo" + window.location.search);
      }
    },
    select(index) {
      this.static = index;
      if (index == 1) {
        this.columns = this.sex_list;
      }
      this.popupShow = true;
    },
    onClose() {},
    onChange(item) {
      if (this.static == 1) {
        this.dxsList.sex = item;
      }
      this.popupShow = false;
    },
    closePopup() {
      this.popupShow = false;
    },
  }
};
</script>

<style lang='scss' scoped>
@import "./style/index.scss";
</style>