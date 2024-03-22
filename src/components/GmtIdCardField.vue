<template>
    <van-field
      :value="value"
      @input="inputEv"
      label="身证号码"
      :readonly="readonly"
      :required="required"
      :rules="rules"
      maxlength="18"
      :label-width="labelWidth"
      :disabled="disabled"
      placeholder="请输入身份证号码"
    />
</template>


<script>
import { IdentityCodeValid } from "@/js/commonUtils";
export default {
  data() {
    return {
      rules:[]
    };
  },
  props: {
    value: {
        type: String
    },
    readonly:{
      type: Boolean,
      default:false
    },
    labelWidth:{
      type: String,
      default: null
    },
    disabled:{
      type: Boolean,
      default:false
    },
    required:{
      type: Boolean,
      default:true
    }
  },
  created() {
    if (this.required) {
      this.rules=[{ validator:IdentityCodeValid, message: '请填写正确的身份证号码' }]
    }
  },
  methods: {
    inputEv(value) {
      this.$emit("input", value);
    }
  }
};
</script>