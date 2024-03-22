<template>
  <div class="csbm" v-if="showAll">
    <van-form @submit="onSubmit" label-align="right" label-width="50px">
      <div class="line"><span class="col">*</span>报名信息</div>
      <vant-selector
        v-model="bmfs"
        label-width="80px"
        :columns="['以行政村为单位', '以自然村为单位']"
        :disabled="isEditting"
        :readonly="isEditting"
        label="报名方式"
        :required="true"
      />
      <villageSelector
        v-if="bmfs == '以行政村为单位'"
        :required="true"
        :sszj.sync="formData.sszj_id"
        :sscj.sync="formData.sscj_id"
        :mc.sync="formData.dm"
        :disabled="isEditting"
        :readonly="isEditting"
        label="队名"
      />
      <villageGroupSelector
        v-else
        :required="true"
        :sszj.sync="formData.sszj_id"
        :sscj.sync="formData.sscj_id"
        :sszrc.sync="formData.cjxz_id"
        :disabled="isEditting"
        :readonly="isEditting"
        :mc.sync="formData.dm"
        label="队名"
      />
      <GmtCheckGroupField v-model="formData.zw" label="职务" :columns="duties" :disabled="isEnd"/>
      <GmtField v-model="formData.xm" label="姓名" :disabled="isEnd"/>
      <idCardF v-model="formData.zjhm" label-width="80px" :disabled="isEnd"/>
      <mobile v-model="formData.lxdh" label="联系电话" label-width="80px" :disabled="isEnd" />
      <GmtField label-width="80px" v-model="formData.dfhm" label="队服号码" :disabled="isEnd" />
      <div class="centre">
        <div class="line"><span class="col">*</span>上传个人头像图片</div>
        <GmtImageUpload
          v-model="formData.grtx"
          :onlyOne="true"
          ref="coverUploader"
          class="image-upload"
        />
      </div>
      <div class="other-information">
        <div class="line">其他资料</div>
        <p>
          以下三种情况的人员，需提交以下资料：<br />
          1、新参赛球员需上传身份证的正、反面；<br />
          2、籍贯属于本村但户籍不在本村的需提供村有效盖章证明；<br />
          3、满16周岁但未满18周岁的需提交身份证复印件、户口本复印件、户主页复印件并监护人签名、联系电话
        </p>
        <GmtImageUpload
          v-model="formData.mainid"
          :showExists="isEditting"
          class="image-upload"
          ref="qtzlImg"
        />
      </div>
      <div class="submit">
        <van-button type="primary" color="#379DEA" class="button" :disabled="!isEditting && isEnd">
          <span>提交报名</span>
        </van-button>
      </div>
    </van-form>
  </div>
</template>

<script>
import GmtImageUpload from "@/components/GmtImageUpload";
import { WaChatUploadPictures } from "@/js/WaChatUploadPictures";
import idCardF from "@/components/GmtIdCardField";
import mobile from "@/components/vantField/mobile";
import villageGroupSelector from "@/components/vantSelector/villageGroup";
import villageSelector from "@/components/vantSelector/village";
import GmtCheckGroupField from "@/components/GmtCheckGroupField";
import GmtField from "@/components/GmtField";

export default {
  watch: {
    bmfs() {
      this.formData.sszj_id = 0;
      this.formData.sscj_id = 0;
      this.formData.cjxz_id = 0;
    },
  },
  data() {
    return {
      bmfs: "以行政村为单位",
      showAll:true,
      isEditting: false,
      isEnd: true,
      formData: {
        dm: "",
        zw: "",
        xm: "",
        // xb: "",
        lxdh: "",
        dfhm: "",
        sszj_id: 0,
        sscj_id: 0,
        cjxz_id: 0,
      },
      duties: ["领队", "队长", "教练", "队医", "运动员"],
      // 判断之前是否报名过，报名过的无需填其他资料
      personnelStatus: false,
    };
  },
  props: {
    bmxx:{
      type: Object
    }
  },
  components: {
    GmtImageUpload,
    idCardF,
    mobile,
    villageGroupSelector,
    GmtField,
    GmtCheckGroupField,
    villageSelector,
  },
  created() {
    this.formData=this.bmxx
    if (this.formData.id) {
      this.isEditting=true
    }
  },
  methods: {
    longData() {
      return storage.fetch("longData").data;
    },
    UploadPicturesSrc() {
      return this.$store.state.UploadPicturesSrc;
    },
    UploadPicturesId() {
      return this.$store.state.MainIdData;
    },
    WaChetLatitude() {
      return this.$store.state.WaChetLatitude;
    },
    WaChetLongitude() {
      return this.$store.state.WaChetLongitude;
    },
    // 选取图片 9张
    UploadPictures() {
      let amount = 9 - this.UploadPicturesSrc.length;
      WaChatUploadPictures(this.WaChatConfigData, amount);
    },
    _popupVisible(item) {
      if (item === 1) {
        if (!this.WaChetLatitude && !this.WaChetLongitude) {
          return;
        }
      }
      this.popupType = item;
      this.popupVisible = true;
    },
    submitCallback(pass) {
      let msg;
      if (pass) {
        msg = `<img style="width: 50px;height: 50px;" src="/static/report/cg.png" /><p style="font-weight: bold;font-size: 18px;">审核通过</p><p style="font-size: 13px;">您的报名信息审核已通过</p>`;
      } else {
        msg = `<img style="width: 50px;height: 50px;" src="/static/report/cg.png" /><p style="font-weight: bold;font-size: 18px;">报名提交成功</p><p style="font-size: 13px;">您的报名信息正在审核中</p>`;
      }
      this.$dialog
        .confirm({
          // title: '温馨提示',
          message: msg,
          confirmButtonText: "继续报名",
          cancelButtonText: "确定",
        })
        .then(() => {
          this.nextBM();
        })
        .catch(() => {
          this.$emit("finishedBM");
        });
    },
    nextBM() {
      this.formData.dfhm = "";
      this.formData.xm = "";
      this.formData.zjhm = "";
      this.formData.grtx = "";
      this.formData.mainid = "";
      this.$refs.coverUploader.initPicData([]);
      this.$refs.qtzlImg.initPicData([]);
    },
    // 提交举报
    onSubmit() {
      if (!this.formData.grtx) {
        this.$toast.fail("请上传个人头像图片");
        return;
      }
      this.$indicator.open("加载中...");
      this.$post("api/gcjd/qdbm", this.formData).then((res) => {
        this.$indicator.close();
        if (res.data.success) {
          this.submitCallback(res.data.content);
        } else {
          this.changtoast(res.data.message, "error");
        }
      });
    },
  },
};
</script>
<style lang="scss" scoped>
@import "./style/wybm.scss";
</style>