<!-- 精品体验 -->
<template>
  <div class="Boutique_experience" style="top:44px;">
    <GmtSearchList url="api/mlgm/jplxList" :useSearch="true" :parms="{}" :pageSize="10">
      <div class="nocontent" slot="empty">
        <img src="../images/null.png" alt />
        精品路线正在策划中，敬请期待
      </div>
      <template slot="item" slot-scope="listData">
        <div
          class="Boutique_experience_item"
          @click="()=>toDetails(item)"
          v-for="(item,index) in listData.data"
          :key="index"
        >
          <div class="card" >
            <div class="images" :style="{backgroundImage: 'url( '+ item.xlfm +')'}">
              <div class="title">{{item.xlzt}}</div>
              <div class="end-data" v-if="item.sfyy===1">
                <div class="content">
                  <span>体验预约报名截止时间</span>
                  <span>{{item.kssj}}至{{item.jssj}}</span>
                </div>
                <img src="../images/new.png" />
              </div>
            </div>
            <div class="line">
              <div class="tag">
                <van-tag
                  plain
                  v-for="(label,index) in getArr(item.xlbq)"
                  :key="index"
                  color="#e8e8e8"
                  size="medium"
                  class="van-tag"
                >
                  <span>{{label}}</span>
                </van-tag>
              </div>
            </div>
            <div class="line-one">
              <!-- 发布时间：{{item.fbsj}} -->
              <span class="release-data"></span>
              <template v-if="item.sfyy===1">
                <span
                  v-if="item.bmzt===3"
                  class="successyy-color"
                >
                  <img src="../images/success.png" />本路线体验预约成功
                </span>
                <span v-else-if="item.bmzt===1" class="noyy-color">
                  <img src="../images/感叹号.png" />您还没预约报名哦！
                </span>
                <span
                  v-else-if="item.bmzt===2"
                  class="successbm-color"
                >本路线体验预约已报名</span>
                <span
                  v-else-if="item.bmzt===4"
                  class="failbm-color"
                >本路线体验预约失败</span>
              </template>
            </div>
            <div class="line-two" v-if="item.sfyy===1">
              <span>
                <img src="../images/quota.png" />
                体验名额：{{item.tyme}}人
              </span>
              <span>
                <img src="../images/时钟.png" />
                活动日期：{{item.hdsj}}
              </span>
            </div>
          </div>
        </div>
      </template>
    </GmtSearchList>
  </div>
</template>

<script>
import GmtSearchList from "@/components/GmtSearchList";
import { storage } from "@/js/until";
import { WcChatPreviewImage } from "@/js/WeChatpreviewImage";
import { GetCaseState } from "@/api/secondLevelPages/ruralRevitalization";
import { SqMark } from "@/api/secondLevelPage";

export default {
  // props: {
  //   stateType: {
  //     type: Number,
  //   },
  //   WaChatConfigData: {
  //     // type: Object
  //   },
  // },
  components: {
    GmtSearchList,
  },
  // computed: {
  //   longData() {
  //     return storage.fetch("longData").data;
  //   },
  // },
  data() {
    return {};
  },
  methods: {
    getArr(val) {
      return (val || "").split(";");
    },
    toDetails(item) {
      this.$router.push({
        name: "jptyjptyxq",
        params: item,
      });
    },
  },
};
</script>


<style lang="scss" type="text/css" scoped>
@import "./style/index.scss";
</style>
