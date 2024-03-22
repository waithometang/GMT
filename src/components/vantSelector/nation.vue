<template>
  <vant-selector :value="value" @input="inputEv" :columns="columns" label="民族" :readonly="readonly" />
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
  data() {
    return {
      columns:[]
    }
  },
  created () {
    this.$get('/ybm/api/MzOption').then(res=>{
      if(res.data.success){
        this.columns=res.data.content.mzxx.split(';')
      }
    })
  },
  methods: {
      inputEv(val){
          this.$emit('input',val)
      }
  }
};
</script>