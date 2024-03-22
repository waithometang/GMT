<template>
  <div class="ranking">
    <div class="head">
      <div class="top-three">
        <div class="ranking-lsit">
          <div class="ranking-lsit-tab">
            <div class="ranking-lsit-tab-name">
              {{ bmData[1].bm }}
            </div>
            <div class="ranking-lsit-tab-number">{{ bmData[1].ps }}票</div>
          </div>
          <div class="ranking-lsit-tab two">
            <div class="ranking-lsit-tab-name">
              {{ bmData[0].bm }}
            </div>
            <div class="ranking-lsit-tab-number">{{ bmData[0].ps }}票</div>
          </div>
          <div class="ranking-lsit-tab">
            <div class="ranking-lsit-tab-name">
              {{ bmData[2].bm }}
            </div>
            <div class="ranking-lsit-tab-number">{{ bmData[2].ps }}票</div>
          </div>
        </div>
      </div>
      <div class="tag">
        <div class="icon">
          <img :src="`/static/vote/laba.gif?${Math.random()}`" alt="" />
        </div>
        <div class="inform-title">
          <div class="title" ref="title">请为您满意的部门和镇街投票吧~</div>
        </div>
      </div>
    </div>
    <div class="list-head">
      <div class="list-head-tab">排名</div>
      <div class="list-head-tab">参与选手</div>
      <div class="list-head-tab">票数</div>
    </div>
    <div v-for="(item, index) in bmList" :key="index">
      <div
        class="list-head"
        :class="{ 'tab-action': index % 2 === 0 }"
        v-if="item"
      >
        <div class="list-head-tab">{{ item.ph }}</div>
        <div class="list-head-tab">{{ item.bm }}</div>
        <div class="list-head-tab">
          <span>{{ item.ps }}票</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    bmData: {
      type: Array,
      default: () => []
    }
  },
  data () {
    return {
    }
  },
  computed: {
    bmList () {
      return this.bmData.slice(3)
    }
  },
}
</script>
<style lang='scss' scoped>
@import '../style/ranking.scss';
</style>
