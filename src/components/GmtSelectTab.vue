<!-- 全局通用顶部导航栏 -->
<template>
  <div class="select">
    <div :class="{'cor1': TabStateData == index}" v-for="(item, index) in TabData" :key="index" @click="SetTabStateData(item)">{{item.name}}</div>
	</div>
</template>

<script>
export default {
  // TabData 导航渲染数据
  props: {
    TabData: {
      type: Array
    },
    TabStateData :{
      type: Number
    }
  },
  methods: {
    SetTabStateData (item) {
      this.$emit('changeTabState', item)
    }
  }
}
</script>

<style lang='scss' scoped type="text/css">
@import "@/style/FirstLevelPage/select.scss";
</style>
