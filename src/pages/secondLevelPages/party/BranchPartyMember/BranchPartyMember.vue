<!-- 支部党员 -->
<template>
  <div class="BranchPartyMember">
    <div class="content">
      <div class="name-hint">
        <GmtSearchList :url="url" :useSearch="false" :pageSize="pageSize" :parms="{villageId: this.longData}" >
          <template slot="item" slot-scope="listData">
          <div class="name-icon">
            <ul>
              <li v-for="(item, index) in listData.data" :key="index" @click="viewDetail(item.id)">
                <div  class="icon">
                  <img v-if="item.photo" :src="item.photo">
                  <img v-else src="/images/yuangong-ling_03.png">
                </div> 
                <div class="name">
                  <p>{{item.name}}</p>
                  <p>党员</p>
                </div>
              </li>
              <div style="clear:both"></div>
            </ul>
          </div>
          </template>
        </GmtSearchList>
      </div>
    </div>
  </div>
</template>
<script>
import GmtSearchList from "@/components/GmtSearchList";
export default {
  data() {
    return {
      memberList: [],
      refreshing: false,
      pageIndex: 1,
      pageSize: 12,
      url: 'api/PartyBuilding/GetPartyMemberList'
    };
  },
  components: {
    GmtSearchList
  },
  computed: {
    longData() {
      return this.$route.params.vid
    }
  },
  methods: {
    viewDetail(id) {
      this.$router.push({
        path: "/BranchPartyMemberDetails",
        query: {
          id
        }
      });
    },
  },
};
</script>

  
<style lang="scss" scoped>
@import "@/style/pages/secondLevelPages/party/BranchPartyMember.scss";
</style>