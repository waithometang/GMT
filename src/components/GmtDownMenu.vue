<template>
  <div class="GmtDownMenu">
    <van-action-sheet v-model="mShow" :actions="actions" @select="onSelect" @click-overlay="overlay"/>
  </div>
</template>

<script>
export default {
  watch:{
    show(val){
      this.mShow = val
    }
  },
  data() {
    return {
      mValue: '',
      mShow: false
    };
  },
  props:{
    actions: {
      type: Array,
      required: true
    },
    show: {
      type: Boolean,
      default: false
    }
  },
  methods: {
    onSelect(item) {
      this.$emit('setActions', item)
      this.$emit('input', item.name)
      this.$emit('select',item.name)
    },
    overlay () {
      this.$emit('setActions')
    }
  },
  created(){
    this.mShow = this.show
  }
}
</script>