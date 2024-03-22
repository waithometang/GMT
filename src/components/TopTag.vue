<!-- 顶部导航栏 -->
<template>
  <div class="TopTag">
    <div class="threeTage">
      <div class="list" v-for="(item, index) in listData" :key="index" :class="{'action': StateType == index}" @click="ChangeState(index)">{{item}}</div>
    </div>
  </div>
</template>

<script>
export default {
  props: ['listData', 'ShowType'],
  data () {
    return {
      StateType: 0
    }
  },
  methods: {
    ChangeState (item) {
      this.StateType = item
      this.$emit('SetStateType', this.StateType)
    },
    watch: {
      ShowType () {
        if (ShowType == 0) {
          this.StateType = 0
        }
      }
    }
  }
};
</script>

<style lang='scss' type='text/css' scoped>
.TopTag {
  height: 60px;
  background: #ffffff;
  .threeTage {
    height: 60px;
    display: flex;
    .list {
      width: 33%;
      text-align: center;
      line-height: 60px;
      font-size: 32px;
      font-family: MicrosoftYaHei;
      font-weight: 400;
      color:rgba(51,51,51,1);
    }
    .action{
      color:rgba(24,130,214,1);
      border-bottom: 2px solid rgba(24,130,214,1);
    }
  }
}
</style>
