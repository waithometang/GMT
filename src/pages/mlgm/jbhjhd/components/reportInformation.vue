<!-- 举报 -->
<template>
  <div class="currentAffair scelloe">
    <GmtSearchList
      :url="url"
      :parms="{villageId: longData.id, IsAll: stateType === 1 ? true : false}"
      :pageSize="pageSize"
      :useSearch="false"
      :report="true"
    >
    <div class="nocontent" slot="empty">
      <img src="../../images/无数据.png" alt />
        <span>没有环境黑点随手拍<br/>请点击下方按钮，开始环境黑点随手拍吧</span>
    </div>
      <template slot="item" slot-scope="listData">
        <div class="content" v-for="(item, index) in listData.data" :key="index">
          <div class="iconTitle" :class="{'bor': index==listData.data.length-1}">
            <div class="left">
              <img :src="item.headPortrait ? item.headPortrait : require('../../images/默认头像.png')" />
            </div>
            <div class="right">
              <div class="nameTitle">
                <div class="name">
                  <span class="name-span" v-if="item.name">{{item.name}}</span>
                  <span class="name-span" v-else>匿名</span>
                  <van-tag class="examine-tag" round plain color="#898989"  v-if="stateType === 2 && item.shzt==='待审核'">正在审核</van-tag>
                  <van-tag class="examine-tag" round plain color="#E66464"  v-else-if="stateType === 2 && item.shzt==='未通过'">审核不通过</van-tag>
                  <van-tag class="examine-tag" round plain color="#3C8AE1"  v-else-if="stateType === 2 && item.shzt==='已通过'">审核通过</van-tag>
                  <span class="verification" @click="()=>HxmFn(item)" v-if="stateType === 2 && item.fwpj == '已采纳'">点击核销码<img src="../../images/核销码.png"></span>
                </div>
                <div class="title">{{item.content}}</div>
              </div>
              <div class="icon">
                <div
                  class="images"
                  @click="lookOver(item_1,item.picture)"
                  v-for="(item_1, index_1) in item.picture"
                  :key="index_1"
                >
                  <img :src="item_1"/>
                </div>
              </div>
              <div class="timecomment"><img src="../../images/定位 (2).png">{{item.location}}</div>
              <div class="timecomment right">
                <!-- {{item.isPublic == 1 ? '公开' : '保密'}} -->
                <div class="state"></div>
                <div class="time">{{item.date}}</div>
                <div
                  class="evaluate"
                  v-if="item.kypj && stateType === 1"
                  @click="GotoeValuate(item)"
                >
                  <img src="@/images/evaluate.png" alt />
                  评价
                </div>
              </div>
              <div class="reply-list" v-if="item.zzzt=='已整治'">
                <span>环境黑点整治效果</span>
                <div
                  v-if="item.reply"
                  class="reply-content"
                  :class="{'content_hide': item.reply && fullTextState < index }"
                >
                  <span>市政部门回复:</span>
                  {{item.reply}}
                </div>
                <div class="icon">
                  <div
                    class="images"
                    @click="lookOver(item_1,item.zzpicture)"
                    v-for="(item_1, index_1) in item.zzpicture"
                    :key="index_1"
                  >
                    <img :src="item_1" />
                  </div>
                </div>
                <div class="replyDate">{{item.replyDate}}</div>
                <div
                  class="fullText"
                  @click="showfullText(index)"
                  v-if="item.reply && item.reply.length >= 40"
                >{{fullTextState >= index ? '收起' : '全文'}}</div>
              </div>
              <div v-else-if="!item.reply && (item.shzt==='待审核' || item.shzt==='未通过')" class="govern">
                <span><img src="../../images/加急治理.png">相关部门正在加紧核查中</span>
              </div>
              <div v-else-if="!item.reply && item.shzt==='已通过'" class="govern">
                <span><img src="../../images/加急治理.png">相关部门正在加紧治理中</span>
              </div>
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
import { ImagePreview } from 'vant';

export default {
  props: {
    stateType: {
      type: Number,
    },
    WaChatConfigData: {
      // type: Object
    },
  },
  components: {
    GmtSearchList,
  },
  computed: {
    longData() {
      return storage.fetch("longData").data;
    },
  },
  data() {
    return {
      url: "api/mlgm/GetShotList",
      IsAll: false,
      pupopLook: false,
      imgSrc: [],
      pageSize: 3,
      pageIndex: 1,
      initialSlide: 0,
      caseInfo: "",
      caseInfoindex: 99999,
      fullTextState: -1,
    };
  },
  methods: {
    bigImg(item) {
      this.pupopLook = item;
    },
    // 查看照片
    lookOver(item, data) {
      let url = "http://gmt.gaoming.gov.cn" + item;
      let datas = [];
      for (let index = 0; index < data.length; index++) {
        const element = data[index];
        let str = "http://gmt.gaoming.gov.cn" + element;
        datas.push(str);
      }
      WcChatPreviewImage(url, datas, this.WaChatConfigData);
    },
    ViewProgress(item, index) {
      console.log(index);
      if (this.caseInfoindex == index) {
        this.caseInfoindex = 999999;
      } else {
        this.caseInfoindex = index;
      }
      GetCaseState({
        id: item,
      }).then((rps) => {
        if (rps.data.success) {
          this.caseInfo = rps.data.content.caseInfo;
        } else {
          this.changtoast(rps.data.message, "error");
        }
      });
    },
    GotoeValuate(item) {
      this.$router.push(`/evaluate/${item.id}`);
    },
    showfullText(index) {
      if (this.fullTextState === index) {
        this.fullTextState = index - 1;
      } else {
        this.fullTextState = index;
      }
    },
    HxmFn(item) {
      this.$router.push(`/mlgm/jbhjhd/hxm?id=${item.id}`)
    },
    // 评论
    comment(item) {
      this.$router.push(
        `/pj/${item.id}/${item.dzs ? item.dzs : 0}/${item.cps ? item.cps : 0}/${
          item.yds ? item.yds : 0
        }/${item.pls ? item.pls : 0}`
      );
    },
    // 点赞 踩
    LikeOrNegative(item, dome) {
      this._GetMark(item, dome);
    },
    _GetMark(item, dome) {
      SqMark({
        id: dome.id,
        mkid: 203,
        IsGood: item,
      }).then((rps) => {
        if (rps.data.success) {
          dome.dzzt = rps.data.content.dzzt;
          dome.dzs = rps.data.content.dzs;
          dome.cps = rps.data.content.cps;
          if (item) {
            let str = "您已点赞，目前已有" + rps.data.content.dzs + "人点赞";
            if (rps.data.content.dzzt) {
              this.changtoast(str);
            }
          }
        } else {
          this.changtoast(rps.data.message, "error");
        }
      });
    },
  },
};
</script>


<style lang="scss" type="text/css" scoped>
@import "../style/reportInformation.scss";
</style>
