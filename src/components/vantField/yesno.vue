<template>
  <van-field :label="label" :required="required">
    <template slot="input">
      <van-checkbox :disabled="readonly" :value="formateFn()" @input="inputEv" shape="square">是</van-checkbox>
    </template>
  </van-field>
</template>

<script>
export default {
  data() {
    return {
        thisVal:false
    };
  },
  created() {
    if (this.value === '否') {
        this.$emit("input", '否')
    }
  },
  props: {
    label:{
      type: String,
      required: true
    },
    value: {
        type: String,
        default: '否'
    },
    readonly:{
      type: Boolean,
      default:false
    },
    required:{
      type: Boolean,
      default:false
    }
  },
  methods: {
    formateFn(){
        if(this.value==='是') return true
        else return false
    },
    inputEv(value) {
      this.thisVal=value
      this.$emit("input", value?'是':'否')
    }
  }
};
</script>