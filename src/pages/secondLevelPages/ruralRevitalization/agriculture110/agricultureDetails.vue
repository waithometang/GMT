<!-- 技术指导发布列表 详情 -->
<template>
  <div class="NotificationParticulars">
    <div class="head">
      <div class="title">{{listData.title}}</div>
      <div class="iconList">
        <div class="list">
          <div class="images">
            <img id="GMT_min_icon" src="/images/img_12.png">
          </div>
          {{listData.fbr}}
        </div>
        <div class="list">
          <div class="images">
            <img id="GMT_min_icon" src="/images/img_13.png">
          </div>
          {{listData.publishTime}}
        </div>
        <div class="list">
          <div class="images">
            <img id="GMT_min_icon" src="/images/img_11.png">
          </div>
          {{listData.readedCount}} 阅读
        </div>
      </div>
    </div>
    <div class="content" v-html="listData.content">{{listData.content}}</div>
  </div>
</template>

<script>
import { GetJszdxx } from "@/api/secondLevelPages/ruralRevitalization";
import { configAndSetShare } from "@/js/WeChatShareData.js";
import { WaChatrequireShare } from "@/js/WaChatrequireShare";

export default {
  data() {
    return {
      listData: ""
    };
  },
  computed: {
    id() {
      return this.$route.params.id;
    }
  },
  methods: {
    _GetPublish() {
      GetJszdxx({
        id: this.id
      }).then(rps => {
        if (rps.data.success) {
          let _data = rps.data.content;
          this.listData = _data;
          WaChatrequireShare(
            _data.title,
            _data.content,
            "jszdxq/" + this.id, // 分享路径
            "http://gmt.gaoming.gov.cn/image/notice.png",
            this
          );
        } else {
          this.changtoast(rps.data.message, "error");
        }
      });
    }
  },
  created() {
    this._GetPublish();
  },
  updated () {
    this.$nextTick(function(){
      this.RichTextDispose()
    })
    
  }
};
</script>

<style lang='scss' type="text/css" scoped>
@import "@/style/pages/secondLevelPages/homePage/NotificationParticulars.scss";
</style>
