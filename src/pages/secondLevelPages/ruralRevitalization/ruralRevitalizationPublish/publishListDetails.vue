<!-- 乡村振兴发布 详情 -->
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
import { Getfbxx } from "@/api/secondLevelPages/ruralRevitalization";
import { configAndSetShare } from "@/js/WeChatShareData.js";
import { WaChatrequireShare } from "@/js/WaChatrequireShare";
import { GetWechatConfig } from "@/api/GetWechatConfig";

export default {
  data() {
    return {
      listData: "",
      WaChatConfigData: '',
    };
  },
  computed: {
    id() {
      return this.$route.params.id;
    },
    titleData () {
      return this.$route.params.titleData
    },
  },
  methods: {
    _Getfbxx() {
      Getfbxx({
        id: this.id
      }).then(rps => {
        if (rps.data.success) {
          let _data = rps.data.content;
          this.listData = _data;
          document.title = _data.lx
          WaChatrequireShare(
            _data.title,
            _data.content,
            "xczxfbxq/" + this.id, // 分享路径
            "http://gmt.gaoming.gov.cn/image/notice.png",
            this
          );
        } else {
          this.changtoast(rps.data.message, "error");
        }
      });
    },
  },
  created() {
    this._Getfbxx();
  },
  updated: function  () {
    this.$nextTick(function(){
      this.RichTextDispose()
      console.log('后执行')
    })
    console.log('先执行')
  }
};
</script>

<style lang='scss' type="text/css" scoped>
@import "@/style/pages/secondLevelPages/homePage/NotificationParticulars.scss";
</style>
