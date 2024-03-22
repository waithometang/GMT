<template>
  <van-field
      :readonly="readonly"
      :value="value"
      @input="inputEv"
      :label="label"
      :label-width="labelWidth"
      :autosize="autosize"
      :required="required"
      :rules="rules"
      :type="type"
      :disabled="disabled"
      :showWordLimit="showWordLimit"
      :maxlength="maxlength"
      :placeholder="thisplaceholder"
    >
    <div v-if="rightWord" class="rightWord" slot="right-icon">
      {{rightWord}}
    </div>
    </van-field>
</template>


<script>
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
    showWordLimit:{
      type: Boolean,
      default: false
    },
    value: {
        type: String | Number
    },
    readonly:{
      type: Boolean,
      default:false
    },
    disabled:{
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
    rightWord:{
      type: String,
    },
    type:{
      type: String,
      default:"text"
    },
    maxlength:{
      type: Number,
      default: 200
    }
  },
  created() {
    if (this.required) {
      this.rules=[{ required: true, message: '请输入'+(this.label|| '') }]
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