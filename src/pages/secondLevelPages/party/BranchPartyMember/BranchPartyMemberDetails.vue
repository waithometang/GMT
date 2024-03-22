<!-- 支部党员详情 -->
<template>
  <div class="main">
    <div class="hread">
      <div>
        <img class="hread-img" :src="detail.photo == null ? defaultImage : detail.photo">
      </div> 
      <div class="hread-font">
        <span class="font-name" v-text="partyMemberName">
          <span class="font-index">先锋指数：{{detail.pioneerIndex}}</span>
        </span>
        <p class="font-time">入党时间：{{detail.joinDate}}</p>
        <p class="font-evaluation">{{detail.word}}</p>
      </div>
    </div>
    <div class="main-li" v-for="(item, index) in jobList" :key="index">
      <div>
        <img class="main-img" :src="item.cover">
      </div>
      <div class="main-font">
        <span class="font-matter">
          {{item.title}}
          <span class="font-name-color">（{{partyMemberName}}）</span>
        </span>
        <p class="font-details">{{item.content}}</p>
        <p class="font-details-time">
          [{{item.addTime}}]
          <span class="font-like">
            点赞:&nbsp;
            <span class="like">{{item.likeCount}}</span>&nbsp;获积分：&nbsp;
            <span class="like">{{item.credit}}</span>
          </span>
        </p>
      </div>
    </div>
  </div>
</template>
 <script>
import { GetPartyMemberInfo, GetPracticalJobList } from "@/api/PartyBuilding.js";

export default {
  components: {},
  computed: {
    partyMemberId() {
      return this.$route.query.id;
    },
    partyMemberName() {
      if (this.detail.name) return this.detail.name;
      else return "";
    }
  },
  data() {
    return {
      detail: {},
      jobList: [],
      defaultImage: '/images/yuangong-ling_03.png'
    };
  },
  methods: {
    init() {
      let that = this;
      GetPartyMemberInfo({ id: this.partyMemberId }).then(res => {
        that.detail = res.data.content;
      });
      GetPracticalJobList({ id: this.partyMemberId }).then(res => {
        that.jobList = res.data.content;
      });
    }
  },
  created() {
    this.init();
  }
};
</script>
<style lang="scss" scoped>
@import "@/style/pages/secondLevelPages/party/BranchPartyMemberDetails.scss";
</style>