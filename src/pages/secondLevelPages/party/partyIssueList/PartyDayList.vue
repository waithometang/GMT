<!-- 主题党日 详情 -->
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
    <div class="record" v-if="listData && listData.zbmc && listData.sdrs">
      <div class="hint"><span>[支部名称]&nbsp;&nbsp;</span>{{listData.zbmc}}</div>
      <div class="hint"><span>[参会情况]&nbsp;&nbsp;</span>应到{{listData.ydrs}}人, 实到{{listData.sdrs}}人</div>
      <div class="present">
        <div class="personnel"><img src="/images/party/blue_yes.png"/>到会人员&nbsp;&nbsp;({{listData.sdrs}}人)&nbsp;&nbsp;:</div>
        <ul class="detail">
            <li v-for="(item,index) in dh_people" :key="index">{{item}}</li>
        </ul>
        <div class="personnel"><img src="/images/party/yellow_time.png"/>请假人员&nbsp;&nbsp;({{listData.qjrs}}人)&nbsp;&nbsp;:</div>
        <ul class="detail">
            <li v-for="(item,index) in qj_people" :key="index">{{item}}</li>
        </ul>
        <div class="personnel"><img src="/images/party/red_cuowu.png"/>未到人员&nbsp;&nbsp;({{listData.qxrs}}人)&nbsp;&nbsp;:</div>
        <ul class="detail">
            <li v-for="(item,index) in qx_people" :key="index">{{item}}</li>
        </ul>
      </div>
  </div>
</div>
</template>

<script>
import { Getztdrxx } from "@/api/PartyBuilding";
import { configAndSetShare } from "@/js/WeChatShareData.js";
import { WaChatrequireShare } from "@/js/WaChatrequireShare";
// import { storage } from "@/js/until";

export default {
  data() {
    return {
      listData: "",
      dh_people: [],
      qj_people: [],
      qx_people: [],
    };
  },
  computed: {
    id() {
      return this.$route.params.id;
    },
    titleData() {
      return this.$route.params.titleData;
    }
  },
  methods: {
    _GetPublish() {
      Getztdrxx({
        id: this.id
      }).then(rps => {
        if (rps.data.success) {
          let _data = rps.data.content;
          this.listData = _data;
          this.dh_people = _data.dh_people.split('、')
          this.qj_people = _data.qj_people.split('、')
          this.qx_people = _data.qx_people.split('、')
          document.title = "主题党日";
          WaChatrequireShare(
            _data.title,
            _data.content,
            "ztdr/" + this.id, // 分享路径
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
  updated() {
    this.$nextTick(function() {
      this.RichTextDispose();
    });
  }
};
</script>

<style lang='scss' type="text/css" scoped>
@import "@/style/pages/secondLevelPages/homePage/NotificationParticulars.scss";
</style>
