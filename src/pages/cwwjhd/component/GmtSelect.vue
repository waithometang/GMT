<template>
  <div class="container">
    <div class="title">{{title}}</div>
    <van-radio-group v-model="radio" @change="handler">
      <van-radio name="1" class="radio1">{{value1}}</van-radio>
      <div class="reason">
        <van-radio name="2" class="radio1">{{value2}}</van-radio>
        <input ref="inputRef" type="text" placeholder="请说明原因" :disabled="disabled" @input="handler" />
      </div>
    </van-radio-group>
  </div>
</template>

<script>
export default {
  props: {
    title: {
      type: String,
      default: "",
    },
    value: {
      type: String,
    },
    value1: {
      type: String,
      default: "是",
    },
    value2: {
      type: String,
      default: "否",
    },
  },
  data() {
    return {
      radio: "",
      disabled: true,
    };
  },
  mounted() {
    this.$nextTick(this.initData)
  },
  methods: {
    initData() {
      if (this.value) {
        if (this.value.indexOf(this.value2) > -1 ) {
          this.radio = '2'
          let val = this.value.split(" ")[1]
          val && (this.$refs.inputRef.value=val)
        }else{
          if (this.value == this.value1) {
            this.radio = '1'
          }else if (this.value == this.value2) {
            this.radio = '2'
          }
        }
      }
    },
    handler() {
      // this.radio == "2" ? (this.disabled = false) : (this.disabled = true);
      if (this.radio == 1) {
        this.$refs.inputRef.value = "";
        this.$emit("input", this.value1);
        this.disabled = true;
      } else {
        this.disabled = false;
        let val = this.$refs.inputRef.value;
        this.$emit("input", this.value2 + " " + val);
      }
    },
  },
};
</script>

<style lang="scss" scoped>
@import "./style.scss";
</style>