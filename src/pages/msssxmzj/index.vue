<!-- 百村足球赛参赛报名 -->
<template>
  <div class="randomlySnapPicture">
    <div class="select">
      <div
        @click="changeState(item.state)"
        :class="{ cor1: tagState === item.state }"
        v-for="(item, index) in tagData"
        :key="index"
      >
        {{ item.name }}
      </div>
    </div>
    <div class="bg-line"></div>
    <div class="need-list" ref="needList">
      <zjgg v-if="tagState === 1" @changeState="changeState" />
      <wyjy v-if="tagState === 2" @changeState="changeState" :wdjy="wdjy" />
      <!-- <wdjy v-if="tagState === 3" @showDetails="showDetails" /> -->
      <wdjy v-if="tagState === 3" />
    </div>
  </div>
</template>
<script>
import zjgg from './zjgg'
import wyjy from './wyjy'
import wdjy from './wdjy'
export default {
  components: {
    zjgg,
    wyjy,
    wdjy
  },
  data() {
    return {
      tagState: 1,
      tagData: [
        { name: '征集公告', state: 1 },
        { name: '我要建议', state: 2 },
        { name: '我的建议', state: 3 }
      ],
      wdjy: {}
    }
  },
  created() {
    this.$showSubscribe()
  },
  watch: {
    tagState() {
      this.$refs.needList.scrollTop = 0
    }
  },
  methods: {
    changeState(item) {
      if (item == 3 || item == 1) {
        this.wdjy = {}
      }
      if(item == 2 ){
        this.$alert('2021年民生实事项目建议征集已结束','温馨提示')
        return
      }
      this.tagState = item
    }
    // showDetails(wdjy) {
    //   this.wdjy = wdjy
    //   this.changeState(2)
    // }
  }
}
</script>

<style lang='scss' type="text/css" scoped>
@import '@/style/FirstLevelPage/select.scss';
.need-list {
  position: absolute;
  top: 120px;
  bottom: 0;
  left: 0;
  right: 0;
  overflow-y: scroll;
}
.bg-line {
  height: 16px;
  background-color: #f5f5f5;
  margin: 10px 0;
}
</style>