<template>
  <div class="PartyMemberList">
    <div class="content">
      <div class="list">
        <div
          class="iconName"
          v-for="(item, index) in listData"
          :key="index"
          @click="viewDetail(item.id)"
        >
          <div class="icon">
            <img :src="item.photo == null ? defaultImage : item.photo">
          </div>
          <div class="name">{{item.name}}</div>
          <div class="identity">党员</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: ["listData"],
  data () {
    return {
      defaultImage: '/images/yuangong-ling_03.png'
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
    }
  }
};
</script>

<style lang='scss' scoped type="text/css">
@import "@/style/components/secondLevelPages/party/PartyMemberList.scss";
</style>
