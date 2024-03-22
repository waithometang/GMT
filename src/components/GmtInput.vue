<template>
  <div class="GmtInput">
    <div class="input-list" :class="{'input-list-action':  modelData.border}">
      <div class="images"  v-if="modelData.icon">
        <img :src="modelData.icon" alt=""> 
      </div>
      <div class="text">
        <input @blur.prevent="changeCount()" type="text" placeholder="" ref="inputs" v-model="model" v-if="modelData.type == 'text'">
        <input @blur.prevent="changeCount()" type="number" placeholder="" ref="inputs" v-model="model" v-if="modelData.type == 'number'">
      </div>
      <div class="tost" v-if="modelData.tost && model">{{modelData.tost}}</div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    modelData: { // icon: 显示图标 placeholder: 提示信息 tost: 输入文字后提示信息 type: 定义类型 vaule: 文本值
      type: Object
    }
  },
  data () {
    return {
      model: this.modelData.vaule || ''
    }
  },
  methods: {
    changeCount () {
      this.$emit('WatchInputModel',this.model)
    }
  },
  mounted () {
    this.$refs.inputs.setAttribute('placeholder', this.modelData.placeholder)
  },
}
</script>

<style lang='scss' scoped type="text/css">
.GmtInput{
  .input-list {
    display: flex;
    align-items: center;
    min-height: 50px;
    padding: 20px 0;
    margin: 0 20px;
    .images{
      flex: 0 0 36px;
      margin:0 20px;
      width:36px;
      height:36px;
      img{
        width:36px;
        height:36px;
      }
    }
    .text {
      flex: 1;
      margin-left: 20px;
      min-height: 50px;
      display: flex;
      align-items: center;
      input{
        min-height: 50px;
        width: 100%;
        display: flex;
        align-items: center;
      }
    }
    .tost {
      flex: 0 0 auto;
      margin-right: 20px;
      font-size: 30px;
      color:rgba(153,153,153,1);
    }
  }
  .input-list-action {
    border-bottom: 1px solid #cccccc;
  }
}
</style>
