<!-- 最新实事 -->
<template>
  <div class="NewestPractical">
    <gmt-search-list url="api/PartyBuilding/LastPracticalJobList" :parms="{villageId: villageId}">
      <template slot="item" slot-scope="listData">
          <div class="main-li" v-for="(item ,index) in listData.data " :class="{'bor':index+1==listData.data.length}" :key="index" @click="goto(item)">
            <div>
              <img class="main-img" src="/images/tacitlyapprove.jpg">
            </div>
            <div class="main-font">
              <span class="font-matter"> 
                {{item.title}}
                <!-- <span class="font-name-color">（{{item.name}}）</span> -->
              </span>
              <!-- <p class="font-details" v-html="item.content"></p> -->
              <div class="details">
                <span class="font-details-time">
                  <img src="/images/BranchPartyMemberDetails/img_04.png">{{item.addTime}}
                </span>
                <span class="font-like">
                  <img src="/images/BranchPartyMemberDetails/img_05.png">点赞:&nbsp;
                  <span class="like">{{item.likeCount}}</span>
                </span> 
              </div>
            </div>
          </div> 
      </template>
    </gmt-search-list>
  </div>
</template>
<script>
import { LastPracticalJobList } from "@/api/PartyBuilding";
import GmtSearchList from "@/components/GmtSearchList";

export default {
  components: {
    GmtSearchList
  },
  computed: {
    villageId() {
      return this.$route.params.vid
    }
  },
  data() {
    return {
      listData: []
    };
  },
  methods: {
    viewDetail(id) {
      this.$router.push({
        path: "/NewestPracticalDetails",
        query: {
          id
        }
      });
    },
    goto(item){
      this.$router.push({
        path: "/zbdy/"+item.id,
        query: {
        }
      });
    }
  }
};
</script>
<style lang="scss" scoped>
@import "@/style/pages/secondLevelPages/party/latestpractical.scss";
</style>