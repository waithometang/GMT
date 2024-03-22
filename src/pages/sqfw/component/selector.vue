<template>
  <div>
    <van-field
      readonly
      clickable
      :value="value"
      :required="required"
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
  props: {
    columns: {
      type: Array,
      required: true
    },
    value: {
        type: String
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
    placeholder: {
      type: String,
    }
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
<style lang="scss" scoped>
/deep/ .van-cell,.van-cell--clickable,.van-field{
  padding: 20px 0 20px 0;
  border-bottom: 1px solid #cccccc;
  margin-bottom: 10px;
}
/deep/ .van-field__control{
  font-size: 28px;
}
/deep/ .van-hairline--bottom{
  display: none;
}
</style>