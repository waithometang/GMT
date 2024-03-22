<template>
  <vant-selector :value="value" @input="inputEv" :columns="['男','女']" label="性别" :readonly="readonly" />
</template>


<script>
export default {
  props: {
    value: {
      type: String,
    },
    readonly: {
      type: Boolean,
      default: false
    }
  },
  methods: {
      inputEv(val){
          this.$emit('input',val)
      }
  }
};
</script>