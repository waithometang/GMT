<template>
  <van-field
      :readonly="readonly"
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
    <template #input>
      <van-checkbox-group :disabled="disabled" @change="changeFn" v-model="selected" direction="horizontal">
        <van-checkbox v-for="duty in columns" :name="duty" :key="duty">{{duty}}</van-checkbox>
      </van-checkbox-group>
    </template>
    </van-field>
</template>


<script>
export default {
  data(){
    return {
      rules:[],
      selected:[],
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
    columns:{
      type: Array,
      required: true
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
      this.rules=[{ required: true, message: '请选择'+(this.label|| '') }]
    }
    if (this.value) {
      this.selected=this.value.split(';')
    }
  },
  methods: {
    changeFn(value) {
      this.$emit("input", value.join(";"))
    }
  }
};
</script>

<style lang='scss'scoped>
/deep/ .van-checkbox--horizontal{
  margin-bottom: 4Px;
}
</style>