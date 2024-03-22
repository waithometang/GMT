<!-- 随手拍 详情 -->
<template>
  <div class="randomlySnapPictureParticulars">
    <img :src="img">
    <div class="top">
      <span v-if="fbr">{{fbr}}：</span>
      {{word}}
    </div>
    <div class="bottom" v-if="reply">管理员：{{reply}}</div>
  </div>
</template>
<script>
import { GetShotDetail } from "@/api/secondLevelPages/ruralRevitalization";

export default {
  data() {
    return {
      img: "",
      fbr: "",
      word: "",
      reply: ""
    };
  },
  methods: {
    init() {
      let parms = { id: this.$route.query.id };
      GetShotDetail(parms).then(res => {
        if (res.data.success) {
          this.img = res.data.content.imgUrl;
          this.word = res.data.content.content;
          this.fbr = res.data.content.fbr;
          this.reply = res.data.content.auditContent;
        } else {
          this.changtoast(rps.data.message, "error");
        }
      });
    }
  },
  created() {
    this.init();
  }
};
</script>

<style scoped lang='scss'>
.randomlySnapPictureParticulars {
  margin: 0;
  padding: 0;
  position: absolute;
  top: 0px;
  bottom: 0px;
  left: 0px;
  right: 0px;
  background: black;
  color: #ffffff;
  overflow-y: scroll;
  overflow-x: hidden;
  img {
    width: 750px;
  }
  .top {
    width: 706px;
    margin-left: 22px;
    word-wrap: break-word;
    word-break: break-all;
    overflow: hidden;
    margin-top: 40px;
  }
  .bottom {
    margin-top: 15px;
    width: 706px;
    margin-left: 22px;
    word-wrap: break-word;
    word-break: break-all;
    overflow: hidden;
  }
}
</style>