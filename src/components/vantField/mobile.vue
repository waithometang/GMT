<template>
  <van-field
      :readonly="readonly"
      :value="value"
      @input="inputEv"
      :label="label"
      :autosize="autosize"
      :required="required"
      :disabled="disabled"
      :rules="rules"
      type="tel"
      :label-width="labelWidth"
      :maxlength="11"
      :placeholder="thisplaceholder"
    >
    </van-field>
</template>

<script>
import { regPhone } from "@/js/commonUtils";

export default {
  data(){
    return {
      rules:[],
    }
  },
  computed: {
    thisplaceholder () {
      return this.readonly?"":(this.placeholder?this.placeholder:('请输入'+this.label))
    }
  },
  props: {
    placeholder:{
      type: String,
      required: false
    },
    label:{
      type: String,
      default: ''
    },
    labelWidth:{
      type: String,
      default: null
    },
    value: {
        type: String | Number
    },
    disabled: {
      type: Boolean,
      default: false
    },
    readonly:{
      type: Boolean,
      default:false
    },
    required:{
      type: Boolean,
      default:true
    },
    autosize:{
      type: Boolean,
      default:false
    },
  },
  created() {
    if (this.required) {
      this.rules=[{ validator:regPhone, message: '请填写正确的手机号码' }]
    }
  },
  methods: {
    inputEv(value) {
      this.$emit("input", value)
    }
  }
};
</script>

<style scoped>
.rightWord{
  color: #000;
}
</style>