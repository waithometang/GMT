<template>
  <div>
    <van-field
      readonly
      clickable
      :value="value"
      :label="label"
      :required="required"
      :label-width="labelWidth"
      :rules="rules"
      :disabled="disabled"
      :placeholder="placeholder"
      :right-icon="readonly?'':'arrow-down'"
      @click="clickFn"
    />
    <div class="van-hairline--bottom" style="height:1px;padding:0px 16px;"></div>
    <van-popup v-model="showPicker" position="bottom">
      <van-picker
        show-toolbar
        :columns="columns"
        @confirm="onConfirm"
        @cancel="showPicker = false"
      />
    </van-popup>
  </div>
</template>


<script>
export default {
  name:'vant-selector',
  data() {
    return {
      showPicker: false,
      rules:[]
    };
  },
  computed: {
    placeholder () {
      return this.readonly?"":('请选择'+this.label)
    }
  },
  created() {
    if (this.required) {
      this.rules=[{ required: true, message: '请选择'+this.label, trigger:'onChange' }]
    }
  },
  props: {
    label:{
      type: String,
      required: true
    },
    columns: {
      type: Array,
      required: true
    },
    value: {
        // type: String
    },
    disabled: {
      type: Boolean,
      default: false,
    },
    readonly:{
      type: Boolean,
      default:false
    },
    required:{
      type: Boolean,
      default:true
    },
    labelWidth:{
      type: String,
      default: null
    },
  },
  methods: {
    clickFn(){
      if(this.readonly) return
      this.showPicker = true
    },
    onConfirm(value) {
      this.$emit("input", value);
      this.showPicker = false;
    }
  }
};
</script>