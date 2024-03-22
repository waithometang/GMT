<template>
  <div class="container">
    <div class="banner">
      <img src="./banner.png" alt />
    </div>
    <div class="wrapper">
      <div class="qyxx">
        <div class="title">一、企业信息</div>
        <GmtField label="企业名称" :required="false" v-model="form.qymc" />
        <GmtField label="主要产业" :required="false" v-model="form.zycy" />
        <GmtField label="企业地址" :required="false" v-model="form.dz" />
        <GmtField label="对接人岗位" :required="false" v-model="form.djrgw" />
      </div>

      <div class="xxbsqk">
        <div class="title">二、信息系统部署情况</div>
        <p class="header">已有信息系统：</p>
        <div class="wz">
          <van-checkbox v-model="check">网站</van-checkbox>
          <input type="text" placeholder="请输入网址" v-model="form.yyxt_wz" />
        </div>
        <div class="select">
          <van-checkbox-group v-model="result" direction="horizontal">
            <van-checkbox name="APP">APP</van-checkbox>
            <van-checkbox name="小程序">小程序</van-checkbox>
            <van-checkbox name="数据库">数据库</van-checkbox>
            <van-checkbox name="OA系统">OA系统</van-checkbox>
            <van-checkbox name="ERP系统">ERP系统</van-checkbox>
            <van-checkbox name="CRM系统">CRM系统</van-checkbox>
            <van-checkbox name="财务系统">财务系统</van-checkbox>
            <van-checkbox name="无">无</van-checkbox>
            <van-checkbox name="其它">其它</van-checkbox>
            <!-- <GmtField placeholder="请输入其他已有信息系统" /> -->
            <input type="text" name id placeholder="请输入其他已有信息系统" v-model="form.yyxt_qt" />
          </van-checkbox-group>
        </div>
        <p class="header border">近期计划新上线系统/应用：</p>
        <div class="select">
          <van-checkbox-group v-model="result1" direction="horizontal">
            <van-checkbox name="网站">网站</van-checkbox>
            <van-checkbox name="OA系统">OA系统</van-checkbox>
            <van-checkbox name="ERP系统">ERP系统</van-checkbox>
            <van-checkbox name="财务系统">财务系统</van-checkbox>
            <van-checkbox name="CRM系统">CRM系统</van-checkbox>
            <van-checkbox name="无">无</van-checkbox>
            <van-checkbox name="其它">其它</van-checkbox>
            <!-- <GmtField placeholder="请输入其他已有信息系统" /> -->
            <input type="text" name id placeholder="请输入其他(app、公众号、小程序等)" v-model="form.jhxt_qt" />
          </van-checkbox-group>
        </div>
      </div>

      <div class="yjfwq">
        <div class="title">三、是否有硬件服务器</div>
        <van-radio-group v-model="form.sffwq" direction="horizontal">
          <van-radio name="已有（自有机房 / IDC托管）">已有（自有机房 / IDC托管）</van-radio>
          <van-radio name="无">无</van-radio>
        </van-radio-group>
        <GmtField v-if="form.sffwq=='无'" label="原因" :required="false" v-model="form.sffwq_yy" />
        <template v-else>
          <GmtField label="硬件服务器数" :required="false" type="number" v-model="form.sffwq_sl" />
          <GmtField
            label="系统维护人员"
            :required="false"
            v-model="form.sffwq_ry"
            type="number"
            placeholder="请输入服务器数量"
          />
          <vant-selector v-model="form.sffwq_fs" :columns="columns" label="维护方式" :required="false" />
        </template>
        <!-- <GmtField label="维护方式" :required="false" v-model="form.djrgw" placeholder="请选择维护方式" /> -->
      </div>

      <div class="yfw">
        <div class="title">四、是否在用天翼云、沃云、移动云、阿里云、 腾讯云等云服务器</div>
        <van-radio-group v-model="form.sfyfwq" direction="horizontal">
          <van-radio name="是">是</van-radio>
          <van-radio name="否">否</van-radio>
        </van-radio-group>
        <van-radio-group v-if="form.sfyfwq=='否'" v-model="form.sfyfwq_jh" direction="horizontal">
          计划租用云服务器
          <van-radio name="是">是</van-radio>
          <van-radio name="否">否</van-radio>
        </van-radio-group>
        <template v-else>
          <GmtField
            label="云服务器"
            v-model="form.sfyfwq_mc"
            :required="false"
            placeholder="请输入云服务器名称"
          />
          <GmtField
            label="费用"
            v-model="form.sfyfwq_fy"
            :required="false"
            type="number"
            placeholder="请输入云服务器费用"
          />
        </template>
      </div>

      <div class="xfss">
        <div class="title">五、是否配备机房消防设施</div>
        <van-radio-group v-model="form.sfxf" direction="horizontal">
          <van-radio name="是">是</van-radio>
          <van-radio name="否">否</van-radio>
        </van-radio-group>
        <van-radio-group v-if="form.sfxf=='否'" v-model="form.sfxf_jh" direction="horizontal">
          是否计划配备
          <van-radio name="是">是</van-radio>
          <van-radio name="否">否</van-radio>
        </van-radio-group>
        <template v-else>
          <GmtField label="消防设施" :required="false" v-model="form.sfxf_mc" placeholder="请输入消防设施名称" />
          <GmtField
            label="费用"
            :required="false"
            v-model="form.sfxf_fy"
            type="number"
            placeholder="请输入配备机房消防设施费用"
          />
        </template>
      </div>

      <div class="xfss">
        <div class="title">六、预算情况</div>
        <GmtField label="目前年均IT支出" v-model="form.mqityys" :required="false" placeholder="请输入支出费用" />
        <GmtField
          label="新上线系统预算"
          v-model="form.xsxys"
          :required="false"
          placeholder="请输入预算费用"
        />
      </div>

      <div class="itry">
        <div class="title">七、企业现有IT相关技术人员</div>
        <GmtField label="初级" v-model="form.itrs_cj" :required="false" placeholder="请输入初级技术人员人数" />
        <GmtField
          label="中级"
          v-model="form.itrs_zj"
          :required="false"
          type="number"
          placeholder="请输入中级技术人员人数"
        />
        <GmtField
          label="中级以上"
          v-model="form.itrs_zjys"
          :required="false"
          type="number"
          placeholder="请输入中级以上技术人员人数"
        />
      </div>

      <div class="xxgzw">
        <div class="title">八、企业是否设首席信息官职位</div>
        <van-radio-group v-model="form.sfcto" @change="handler" direction="horizontal">
          <van-radio name="是">是</van-radio>
          <van-radio name="否">否</van-radio>
        </van-radio-group>
        <van-radio-group v-if="form.sfcto=='否'" direction="horizontal">
          <GmtField label="原因" :required="false" v-model="form.sfcto_yy" />
        </van-radio-group>
        <template v-else>
          <GmtField
            label="姓名"
            v-model="form.sfcto_xm"
            :required="false"
            placeholder="请输入首席信息官姓名"
            :disabled="disabled"
          />
          <GmtField
            label="职称"
            v-model="form.sfcto_jc"
            :required="false"
            placeholder="请输入首席信息官职称"
            :disabled="disabled"
          />
        </template>
      </div>

      <GmtSelect title="九、对上云的态度" value1="愿意上云" value2="不愿意" v-model="form.sytd" />
      <GmtSelect title="十、是否了解今年省市上云上平台补贴" v-model="form.sfljbt" />
      <GmtSelect title="十一、对企业信息化程序是否满意" v-model="form.sfcxmy" />
      <GmtSelect title="十二、对高明区工业互联网推进是否满意" v-model="form.sfgymy" />

      <div class="cbxq">
        <div class="title">十三、企业“上云上平台”初步需求（选填）</div>
        <GmtField
          label="CPU"
          :required="false"
          v-model="form.cpu"
          type="number"
          placeholder="请输入CPU核需求"
          rightWord="核"
        />
        <GmtField
          v-model="form.memery"
          label="内存"
          :required="false"
          type="number"
          placeholder="请输入内存需求"
          rightWord="G"
        />
        <GmtField
          v-model="form.harddisk"
          label="硬盘"
          :required="false"
          type="number"
          placeholder="请输入硬盘需求"
          rightWord="G"
        />
        <GmtField
          label="公网宽带"
          v-model="form.internet"
          :required="false"
          type="number"
          placeholder="请输入公网宽带需求"
          rightWord="M"
        />
        <GmtField
          v-model="form.qtxq"
          label="其他需求"
          :required="false"
          placeholder="请输入其他需求(数据库、对象存储等)"
        />
        <GmtField v-model="form.bz" label="备注" :required="false" placeholder="请输入" />
      </div>
    </div>
    <div class="btn" @click="submit" v-if="!readonly">确认提交</div>
  </div>
</template>

<script>
import GmtField from "@/components/GmtField.vue";
import GmtSelect from "./component/GmtSelect.vue";
export default {
  data() {
    return {
      form: {},
      sytd: "", //    --对上云态度
      sfljbt: "", // --是否了解补贴
      sfcxmy: "", // --是否信息化程序满意
      sfgymy: "", //--是否对高明区工业互联网满意
      check: false,
      radio: "",
      radio1: "",
      radio2: "",
      radio3: "",
      none: "",
      other: "",
      result: [],
      result1: [],
      disabled: true,
      columns: ["代维", "自行维护"],
      value: "",
    };
  },
  components: {
    GmtField,
    GmtSelect,
  },
  props: {
    readonly:{
      type: Boolean,
      default:false,
    },
    detailData:{
      type: Object
    }
  },
  created () {
    if (this.detailData) {
      this.form=this.detailData
      this.form.yyxt && (this.result = this.form.yyxt.split(';'))
      this.form.jhxt && (this.result1 = this.form.jhxt.split(';'))
    }
  },
  methods: {
    submit() {
      this.$indicator.open("提交中...");
      let params = this.form;
      params.yyxt = this.result.join(";");
      params.jhxt = this.result1.join(";");
      this.$post("api/qy/qydcwjtj", params).then((res) => {
        this.$indicator.close();
        if (res.data.success) {
          this.$toast("提交成功")
          this.form={}
          this.$emit('submitSc')
        } else {
          this.changtoast(res.data.message, "error");
        }
      });
    },
    // 测试
    handler() {
      this.radio == "2" ? (this.disabled = true) : (this.disabled = false);
    },
  },
};
</script>

<style lang="scss" scoped>
@import "./cwwjhd.scss";
</style>