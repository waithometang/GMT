<!-- 支部简介 -->
<template>
  <div class="BranchPartyMember">
    <div class="content">
      <div class="head"></div>
      <div class="title">{{title}}</div>
      <div class="name-hint">
        <div v-html="content"></div>
      </div>
    </div>
  </div>
</template> 

<script>
import { GetDescription } from "@/api/secondLevelPage.js";

export default {
  computed: {
    dataType() {
      return this.$route.params.type;
    },
    villageId() {
      return this.$route.params.vid;
    }
  },
  data() {
    return {
      readedCount: "",
      editTime: "",
      title: "",
      content: "",
      title: ''
      };
  },
  created() {
    this.init();
  },
  methods: {
    init() {
      let that = this,
      villageId = this.villageId;
      GetDescription(this.dataType, villageId).then(res => {
        if (res.data.success) {
          that.readedCount = res.data.content.readedCount;
          that.editTime = res.data.content.editTime;
          that.title = res.data.content.title;
          that.content = res.data.content.content;
          that.title = res.data.content.title
        } else {
          that.changtoast(res.data.message, "error");
        }
      });
    }
  }
};
</script>
<style lang="scss" scoped>
@import "@/style/pages/secondLevelPages/party/ConditionIntro.scss";
</style>