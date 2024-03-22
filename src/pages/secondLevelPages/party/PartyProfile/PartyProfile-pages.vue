<!-- 党建概括 -->
<template>
  <div class="VillageRegulations">
    <!-- 图片 -->
    <div class="hread">
      <img src="/images/party/party-banner-04.png">
    </div>
    <!-- 选择-->
    <div class="select">
      <div @click="changeState(1)" :class="{'cor1': party_stateType == 1}">党建简介</div>
      <div @click="changeState(2)" :class="{'cor1': party_stateType == 2}">党员信息</div>
    </div>
    <!-- 党委简介 党员信息 -->
    <div v-if="party_stateType == 1" class="RegulationsContent">
      <div class="headline">
        <!-- <div class="title">1</div> -->
        <div class="timeNumber">
          <div class="timeNumber_li">
            <div class="images add">
              <img src="/images/img_12.png">
            </div>
            {{fbr}}
          </div>
          <div class="timeNumber_li">
            <div class="images Number">
              <img src="/images/img_11.png">
            </div>
            {{readedCount}} 阅读
          </div>
        </div>
      </div>
      <div class="Content" v-html="content"></div>
    </div>
    <div v-if="party_stateType == 2" class="important">
      <GmtSearchList
        class="laye"
        url="api/PartyBuilding/GetPartyMemberList"
        :useSearch="false"
        :parms="{VillageId:this.$route.params.vid, pageSize: 12}"
      >
        <template slot="item" slot-scope="listData">
          <PartyMemberList :listData="listData.data"></PartyMemberList>
        </template>
      </GmtSearchList>
    </div>
  </div>
</template>

<script>
import { GetDescription } from "@/api/secondLevelPage.js";
import GmtSearchList from "@/components/GmtSearchList.vue";
import PartyMemberList from '@/components/secondLevelPages/party/PartyMemberList'

export default {
  data() {
    return {
      StateType: 1,
      content: "",
      DataType: 3,
      fbr: "",
      readedCount: ""
    };
  },
  components: {
    GmtSearchList,
    PartyMemberList
  },
  computed: {
    party_stateType () {
      return this.$store.state.party_stateType
    }
  },
  methods: {
    _GetDescription() {
      GetDescription(this.DataType,this.$route.params.vid).then(rps => {
        if (rps.data.success) {
          this.fbr = rps.data.content.fbr;
          this.readedCount = rps.data.content.readedCount;
          this.content = rps.data.content.content;
        } else {
          this.changtoast(res.data.message, "error");
        }
      });
    },
    changeState(item) {
      this.StateType = item;
      this.$store.commit('Set_party_stateType', item)
    }
  },
  created() {
    this._GetDescription();
  }
};
</script>  

<style lang='scss'>
@import "@/style/FirstLevelPage/select.scss";
@import "@/style/pages/secondLevelPages/homePage/VillageRegulations.scss";
</style>
