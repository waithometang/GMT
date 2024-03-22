<template>
  <div class="integralRanking">
    <div class="list">
      <div class="list-tab" v-for="(item, index) in listData" :key="index" @click="goto(item)">
        <div class="ranking">
          <img v-if="index == 0" src="/images/partyintegral/NO1.png" alt="">
          <img v-else-if="index == 1" src="/images/partyintegral/NO2.png" alt="">
          <img v-else-if="index == 2" src="/images/partyintegral/NO3.png" alt="">
          <span v-else>{{index+1}}</span>
        </div>
        <div class="images">
          <img :src="item.avatar ? item.avatar : '/images/yuangong-ling_02.png'" alt="">
        </div>
        <div class="tab-content">
          <div class="tab-name">{{item.name}}</div>
          <div class="tab-title">{{item.zw}}</div>
          <div class="tab-title">{{item.word}}</div>
          <div class="tab-li">
            <div class="li-content">
              积分: {{item.zjf ? item.zjf : 0}}
            </div>
            <div class="li-content">
              <img class="li-icon" src="/images/zan.png" alt=""> {{item.dzs}}
            </div>
            <div class="li-content">
              <img class="li-icon" src="/images/cai.png" alt=""> {{item.cps ? item.cps : 0}}
            </div>
          </div>
          <div class="swiper-content" v-if="(item.wddt.length >=1)">
            <div class="swiper-title" v-for="(item, index) in item.wddt.slice(0, 2)" :key="index">
              {{item}}
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import {Getwdjfph} from '@/api/secondLevelPage'
export default {
  props:{
    listData: {
      type: Array
    }
  },
  methods: {
    goto(item){
      this.$router.push({
        path: "/BranchPartyMemberDetails?id="+item.id
      });
    }
  }
}
</script>

<style lang='scss' scoped type="text/css">
@import '@/style/components/secondLevelPages/party/integralRanking.scss';
</style>
