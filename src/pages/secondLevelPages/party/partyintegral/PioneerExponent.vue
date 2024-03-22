<!-- 党员积分列表 -->
<template>
  <div class="PioneerExponent">
    <div class="content">
      <div class="icon-title"  v-for="(item, index)  in listData" :key="index" @click="goto(item)">
        <div class="icon-index">
          <div class="index" v-if="index==0"><img src="/images/partyintegral/NO1.png" /></div>
          <div class="index" v-else-if="index==1"><img src="/images/partyintegral/NO2.png" /></div>
          <div class="index" v-else-if="index==2"><img src="/images/partyintegral/NO3.png" /></div>
          <div class="index" v-else>{{index+1}}</div>
          <div class="icon">
            <img v-if="item.avatar" :src="item.avatar">
            <img v-else src="/images/yuangong-ling_02.png">
          </div>
        </div>
        <div class="name-Exponent">
          <div class="name">{{item.name}}</div>
          <div class="slogan">{{item.word}}</div>
          <div class="Exponent">
            <ul>
              <li>先锋指数：
                <span>{{item.zjf}}</span>
              </li>
              <li>点赞数：
                <span>{{item.dzs}}</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: ["listData"],
  methods : {
    goto(item){
      this.$router.push({
        path: "/BranchPartyMemberDetails?id="+item.id
      });
    }
  }

};
</script>

<style lang='scss'>
@import "@/style/pages/secondLevelPages/party/PioneerExponent.scss";
</style>
