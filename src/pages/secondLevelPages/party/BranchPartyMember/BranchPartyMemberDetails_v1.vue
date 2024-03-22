<!-- 支部党员 -->
<template>
  <div class="BranchPartyMemberDetails">
    <div class="hread">
      <div class="hread-main">
        <ul>
          <li>
            <img v-if="longData.photo" :src="longData.photo">
            <img v-else src="/images/yuangong-ling_03.png">
          </li>
          <li>
            <div class="top-font">
              <span class="name">{{longData.name}}</span>
              <span class="jifen">先锋指数：{{longData.jf||0}}</span>
            </div>
            <p>所属支部：{{longData.sszb}}</p>
            <p>入党时间:{{longData.joinDate}}</p>
            <p>{{longData.word}}</p>
          </li>
        </ul>
      </div>
    </div>
    <div class="Pages">
      <GmtSearchList :url="url" :useSearch="false" :parms="{id: this.partyMemberId}" >
        <template slot="item" slot-scope="listData">
          <div class="main-li" v-for="(item ,index) in listData.data " :key="index" @click="goto(item)">
            <div>
              <img class="main-img" :src="item.cover ? item.cover : '/images/tacitlyapprove.jpg'">
            </div>
            <div class="main-font">
              <span class="font-matter">
                {{item.title}}
              </span>
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
      </GmtSearchList>
    </div>
  </div>
</template>

<script>
import { GetPartyMemberInfo } from "@/api/PartyBuilding.js"
import GmtSearchList from "@/components/GmtSearchList";

export default {
  components: {
    GmtSearchList
  },
  computed: {
    partyMemberId() {
      return this.$route.query.id;
    },
    partyMemberName() {
      if (this.detail.name) return this.detail.name;
      else return "";
    }
  },
  data () {
    return {
      longData: '',
      url: 'api/PartyBuilding/GetPracticalJobList'
    }
  },
  methods: {
    init() {
      GetPartyMemberInfo ({
        id: this.partyMemberId
      }).then (rps => {
        if (rps.data.success) {
          this.longData = rps.data.content
        } else {
          this.changtoast(rps.data.message, "error");
        }
      })
    },
    goto(item){
      this.$router.push({
        path: "/nrfbxx/"+item.mk + '/' + item.id,
      });
    }
  },
  created() {
    this.init();
  }
}
</script>

<style lang="scss" scoped>
@import "@/style/pages/secondLevelPages/party/BranchPartyMemberDetails_v2.scss";
</style>
 