<template>
  <vant-selector :value="value" @input="inputEv" :columns="columns" label="政治面貌" :readonly="readonly" />
</template>


<script>
//政治面貌
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
  data() {
    return {
      columns:['中共党员','中共预备党员','共青团员','群众','民革党员','民盟盟员','民建会员','民进会员','农工党党员','致公党党员','九三学社社员','台盟盟员','无党派人士']
    }
  },
  methods: {
      inputEv(val){
          this.$emit('input',val)
      }
  }
};
</script>