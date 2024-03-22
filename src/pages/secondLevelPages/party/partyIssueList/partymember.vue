<!-- 最新实事列表 详情 -->
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
    <!-- <div class="like" @click="giveLike">
      给他点赞
    </div> -->
    <div class="remark-on" v-if="!listData.kydz">
      <div class="tab-icon" :class="{'action-icon': IsLike && dzzt == 1}">
        <img class="iamges" :src="IsLike && dzzt == 1 ? '/images/zan-red.png' : '/images/zan.png'" alt="">
        {{!listData.dzs ? 0 : listData.dzs}}
      </div>
      <div class="tab-icon" :class="{'action-icon': IsNegative && dzzt == 2}">
        <img class="iamges" :src="IsNegative && dzzt == 2 ? '/images/cai-red.png' : '/images/cai.png'" alt="">
        {{!listData.cps ? 0 : listData.cps}}
      </div>
      <div class="tab-icon">
        <img class="iamges" :src="Isshouc ? '/images/shouc-red.png' : '/images/shouc.png'" alt="">
      </div>
    </div>
    <transition name="fade">
      <div v-show="likealert!=0" class="likealert">
        <div v-if="likealert!=0" class="writa">
            <div class="close" ><img  @click="close_like" src="/images/party/close(1).png"/></div>
            <div v-if="likealert==2"> 
              <img class="imgs" src="/images/party/succeed_like.png"/>
              <div class="font">点赞成功</div>
            </div>
            <div v-else-if="likealert==1"> 
              <img class="imgs" src="/images/party/repetition_like.png"/>
              <div class="font">您已点过赞</div>
            </div>
            <div v-else-if="likealert==3"> 
              <img class="imgs" src="/images/party/authentication_like.png"/>
              <div class="font">请先通过实名认证</div>
            </div>
            <div class="yes-but" @click="close_like">确定</div>
        </div>
      </div>
    </transition>
  </div>
</template>

<script>
import { Dyssxx,Dyssdz } from "@/api/PartyBuilding";
import { configAndSetShare } from "@/js/WeChatShareData.js";
import { WaChatrequireShare } from "@/js/WaChatrequireShare";

export default {
  data() {
    return {
      listData: "",
      likealert:0,
      IsLike: false,
      IsNegative: false,
      Isshouc: false,
      dzzt: 0,
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
    giveLike(){
      Dyssdz({id:this.id}).then(res=>{
        if(res.data.success){
          this.likealert=2;
        }else{
          if(res.data.message=="您已点过赞"){
            this.likealert=1;
          }else{
            this.likealert=3;
          }
        }
      })
    },
    _GetPublish() {
      Dyssxx({
        id: this.id 
      }).then(rps => {
        if (rps.data.success) {
          let _data = rps.data.content
          this.dzzt = _data.dzzt
          this.listData = _data
          document.title = _data.lx
          WaChatrequireShare(
            _data.title,
            _data.content,
            "djfbxq/" + this.id , // 分享路径
            "http://gmt.gaoming.gov.cn/image/notice.png",
            this
          );
        } else {
          this.changtoast(rps.data.message, "error");
        }
      });
    },
    close_like(){
      this.likealert=0;
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
