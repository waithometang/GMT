<!-- 通知公告详情页面 -->
<template>
  <div class="NotificationParticulars">
    <BetterScroll>
      <template slot="BetterScroll">
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
              {{listData.date}}
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
      </template>
    </BetterScroll>
  </div>
</template>

<script>
import BetterScroll from '@/components/BetterScroll'
import { TzggXX } from "@/api/secondLevelPages/homePage";
import { configAndSetShare } from "@/js/WeChatShareData.js";
import { WaChatrequireShare } from "@/js/WaChatrequireShare";

export default {
  data() {
    return {
      listData: "",
      WaChatConfigData: ''
    };
  },
  components: {
    BetterScroll
  },
  computed: {
    id() {
      return this.$route.params.id;
    },
    mk() {
      return this.$route.params.mk;
    }
  },
  methods: {
    _GetTzggXX() {
      TzggXX({
        id: this.id,
        mk: this.mk
      }).then(rps => {
        if (rps.data.success) {
          let _data = rps.data.content;
          this.listData = _data;
          WaChatrequireShare(
            _data.title,
            _data.content,
            "tzgg/" + this.mk + "/" + this.id, // 分享路径
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
    this._GetTzggXX();
  },
  updated: function  () {
    this.$nextTick(function(){
      this.RichTextDispose()
    })
  }
};
</script>
<style lang='scss' type="scss/text">
@import "@/style/pages/secondLevelPages/homePage/NotificationParticulars.scss";
</style>


