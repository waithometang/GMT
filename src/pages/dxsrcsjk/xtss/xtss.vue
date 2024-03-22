<template>
  <div class="container">
    <div class="middle">
      <div class="middle-input">
        <van-form
          @submit="onSubmit"
          ref="form"
          label-align="right"
          :scroll-to-error="true"
        >
          <GmtField v-model="baseData.xm" label="姓名" :readonly="isView" />
          <div class="spilt" />
          <mobile v-model="baseData.lxdh" label="手机号码" :readonly="isView" />
          <div class="spilt" />
          <GmtField
            v-model="baseData.nr"
            autosize
            show-word-limit
            type="textarea"
            :maxlength="300"
            label=""
            placeholder="请输入系统问题申诉，例如输错姓名、电话号码等"
            :readonly="isView"
          />
          <div class="spilt" />
          <div class="pic">
            <GmtImageUpload v-model="baseData.file_id" />
          </div>
        </van-form>
      </div>
    </div>
    <div class="base">
      <div class="base-tab width">
        <div class="public-long-but" @click="nextStep">发送诉求反映</div>
      </div>
    </div>
  </div>
</template>

<script>
import addressSelector from "@/components/vantSelector/address"
import datetimeSelector from "@/components/vantSelector/datetime"
import mobile from "@/components/vantField/mobile"
import GmtField from "@/components/GmtField"
import GmtImageUpload from "@/components/GmtImageUpload"
export default {
  components: {
    addressSelector,
    datetimeSelector,
    mobile,
    GmtField,
    GmtImageUpload
  },
  computed: {
    isView() {
      //查看模式，不能修改
      return false
    }
  },
  data() {
    return {
      baseData: {},
      WaChatConfigData: ""
    }
  },
  methods: {
    nextStep() {
      this.$refs.form.submit()
    },
    onSubmit() {
      this.$indicator.open("加载中...")
      this.$post("api/Zx/dxsXtssTj", this.baseData).then(res => {
        this.$indicator.close()
        if (res.data.success) {
          this.$parent.gotoWdss()
        } else {
          this.changtoast(res.data.message, "error")
        }
      })
    }
  }
}
</script>

<style lang='scss' scoped>
@import "./style/xtss.scss";
/deep/ .van-cell::after {
  border-bottom: 1px solid #fff;
}
/deep/ .van-hairline--bottom {
  display: none;
}
/deep/ .van-field__label {
  width: auto;
}
/deep/ .sxsj .van-cell,
.sxsj .van-cell--clickable,
.sxsj .van-field,
.sxsj .van-field--label-right {
  padding: 10px;
}
/deep/ .van-field__body textarea{
  min-height: 350px!important;
}
</style>
