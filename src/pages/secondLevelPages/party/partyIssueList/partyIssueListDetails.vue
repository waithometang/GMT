<!-- 通用发布详情 -->
<template>
  <div class="NotificationParticularss" :class="{'NotificationParticularss-action': listData.kydz}">
    <BetterScroll>
      <template slot="BetterScroll">
        <div class="content-list">
          <div class="head">
            <div class="title">{{listData.title}}</div>
            <div class="head-list">
              <div class="list-tab">
                <img id="GMT_min_icon" src="/images/img_12.png" alt="">
                {{listData.fbr}}
              </div>
              <div class="list-tab">
                <img id="GMT_min_icon" src="/images/img_13.png" alt="">
                {{listData.publishTime}}
              </div>
              <div class="list-tab">
                <img id="GMT_min_icon" src="/images/img_11.png" alt="">
                {{listData.readedCount}} 阅读
              </div>
            </div>
          </div>
          <div class="content" v-html="listData.content"></div>
          <div class="images-list" v-if="listData.contentType == 1 && listData.imgUrls">
            <div class="images-list-tab" v-for="(item, index) in listData.imgUrls" :key="index"  @click="loveImages(item, listData.imgUrls)">
              <img class="images-tab" :src="item" alt="">
            </div>
          </div>
          <div class="conferenceDetails" v-if="listData.sdrs">
            <div class="name">支部名称: &nbsp;{{listData.zbmc}}</div>
            <div class="name">参会情况: &nbsp;应到人数:{{listData.ydrs}}人 &nbsp;  实到人数: {{listData.sdrs}}人</div>
            <div class="arrive-details">
              <div class="details-text">
                <div class="title-icon"></div>
                到会人员 ({{listData.sdrs}}):
              </div>
              <div class="details-content">{{listData.dh_people}}</div>
            </div>
            <div class="arrive-details">
              <div class="details-text">
                <div class="title-icon"></div>
                请假人员 ({{listData.qjrs}}):
              </div>
              <div class="details-content">{{listData.qj_people}}</div>
            </div>
            <div class="arrive-details">
              <div class="details-text">
                <div class="title-icon"></div>
                未到人员 ({{listData.qxrs}}):
              </div>
              <div class="details-content">{{listData.qx_people}}</div>
            </div>
          </div>
        </div>
      </template>
    </BetterScroll>
    <div class="CommentsContent" v-if="false">
      <div class="comments-interval">
        <div class="interval"></div>评论
      </div>
      <div class="comments-list" v-infinite-scroll="loadMore" infinite-scroll-disabled="moreLoading" infinite-scroll-distance="0" infinite-scroll-immediate-check="false">
        <div class="comments-list-tab" v-for="(item, index) in CommentsListData" :key="index">
          <div class="comments-list-tab-icon">
            <img id="GMT_min_icon" :src="item.avatar" alt="">
          </div>
          <div class="comments-list-tab-title">
            <div class="tab-title-name-time">
              <div class="tab-title-name">{{item.name}}</div>
              <div class="tab-title-time">{{item.plsj}}</div>
            </div>
            <div class="tab-title-title">{{item.content}}</div>
          </div>
        </div>
      </div>
      <div class="CommentsContent-tost" v-if="moreLoading">{{CommentsListData.length > 0 ?  '已显示全部评论' : '暂无评论'}}</div>
      <div class="CommentsContent-input" :class="{'CommentsContent-input-action': CommentsContentTab}">
        <div class="CommentsContent-input-action-title" v-if="CommentsContentTab">
          <div class="cancel" @click="Setcomments(false)">取消</div>
          <div class="release" @click="Setcomments(true)">发布</div>
        </div>
        <input type="text" @focus.prevent="acquisition(true)"  @blur.prevent="acquisition(false)" placeholder="请发表你的评论" v-model="CommentsContent">
      </div>
    </div>
    <div class="evaluate" v-if="listData.kydz">
      <div class="evaluate-tab" @click="LikeOrNegative(true)">
        <div class="evaluate-tab-icon">
          <img id="GMT_min_icon" :src="IsLike && dzzt == 1 ? '/images/sure-red.png' : '/images/sure.png'" alt="">
        </div>
        <div class="evaluate-tab-title" :class="{'evaluate-tab-title-action': IsLike && dzzt == 1}">点赞 {{!listData.dzs ? 0 : listData.dzs}}</div>
      </div>
      <div class="evaluate-tab" @click="LikeOrNegative(false)">
        <div class="evaluate-tab-icon">
           <img id="GMT_min_icon" :src="IsNegative && dzzt == 2 ? '/images/stamp-red.png' : '/images/stamp.png'" alt="">
        </div>
        <div class="evaluate-tab-title" :class="{'evaluate-tab-title-action': IsNegative && dzzt == 2}">踩 {{!listData.cps ? 0 : listData.cps}}</div>
      </div>
      <div class="evaluate-tab" @click="_GetFavorite">
        <div class="evaluate-tab-icon">
           <img id="GMT_min_icon" :src="Isshouc ? '/images/collect-red.png': '/images/collect.png'" alt="">
        </div>
        <div class="evaluate-tab-title" :class="{'evaluate-tab-title-action': Isshouc}">收藏</div>
      </div>
    </div>
  </div>
</template>

<script>
import { GetPulishDetail, GetMark, GetFavorite, GetUndoMark, GetUndoFavorite, Getfbpl, GetPlList, GetPlDel, Getztdrxx } from "@/api/secondLevelPage.js";
import { WaChatrequireShare } from '@/js/WaChatrequireShare'
import { WcChatPreviewImage }from '@/js/WeChatpreviewImage'
import BetterScroll from '@/components/BetterScroll'

export default {
  data() {
    return {
      listData: "",
      IsLike: false,
      IsNegative: false,
      Isshouc: false,
      dzzt: 0,
      CommentsListData : [],
      CommentsContent: '',
      pageIndex: 1,
      CommentsContentTab: false,
      moreLoading: false, // 数据加载完毕
      RichTextDisposeSatae: false
    };
  },
  components: {
    BetterScroll
  },
  computed: {
    id() {
      return this.$route.params.id;
    },
    mkid() {
      return this.$route.params.mkid;
    },
    titleData() {
      return this.$route.params.titleData;
    },
    publishType () {
      return this.$route.params.publishType
    }
  },
  methods: {
    // 输入框获取焦点
    acquisition (item) {
      this.CommentsContentTab = item
    },
    // 取消评论
    Setcomments (item) {
      if (item) {
        this.PublishComments ()
      } else {
        this.CommentsContentTab = false
      }
    },
    _GetDetailPages() {
      Getztdrxx({
        id: this.id,
      }).then(rps => {
        if (rps.data.success) {
          let _data = rps.data.content
          this.dzzt = _data.dzzt
          this.listData = _data
          if (_data.dzzt == 1) {
            this.IsLike = true
          } else if (_data.dzzt == 2) {
            this.IsNegative = true
          }
          if (_data.sfsc) {
            this.Isshouc = true
          }
          WaChatrequireShare(_data.title,_data.content,`djfbxq/${this.publishType}/${this.id}` ,null,this)
        } else {
          this.changtoast(rps.data.message, "error");
        }
      });
    },
    LikeOrNegative (item) {
      if (item) {// 点赞
        this._GetMark(item)
      } else {// 踩
        this._GetMark(item)
      }
    },
    // 点赞 踩
    _GetMark (item) {
      GetMark ({
        id:this.id,
        mkid: this.mkid,
        IsGood: item,
      }).then (rps => {
        if (rps.data.success) {
          this.dzzt = rps.data.content.dzzt
          this.listData.dzs = rps.data.content.dzs
          this.listData.cps = rps.data.content.cps
          if (item) {
            this.IsLike = true
            let str = "您已点赞，目前已有"+ this.listData.dzs + "人点赞"
            if (this.dzzt == 1) {
              this.changtoast(str)
            }
          } else {
            this.IsNegative = true
          }
        } else {
          this.changtoast(rps.data.message, "error");
        }
      })
    },
    // 取消点赞
    _GetUndoMark (item) {
      GetUndoMark ({
        id:this.id,
        mkid: this.mkid,
        IsGood: item, // true 点赞 false 踩
      }).then (rps => {
        if (rps.data.success) {
          if (item) {
            this.listData.dzs = rps.data.content.dzs
            this.IsLike = false
          } else {
            this.listData.cps = rps.data.content.cps
            this.IsNegative = false
          }
        } else {
          this.changtoast(rps.data.message, "error");
        }
      })
    },
    // 收藏
    _GetFavorite () {
      this.Isshouc = ! this.Isshouc
      if (!this.Isshouc) {
        GetUndoFavorite ({
          mkid: this.mkid,
          id: this.id
        }).then(rps => {
          if (rps.data.success) {
          } else {
            this.changtoast(rps.data.message, "error");
          }
        })
      } else {
        GetFavorite ({
          mkid: this.mkid,
          id: this.id,
        }).then (rps => {
          if (rps.data.success) {
          } else {
            this.changtoast(rps.data.message, "error");
          }
        })
      }
    },
    // 查看图片
    loveImages (item, data) {
      let url = 'http://gmt.gaoming.gov.cn'+ item
      let datas = []
      for (let index = 0; index < data.length; index++) {
        const element = data[index];
        let str = 'http://gmt.gaoming.gov.cn' + element
        datas.push(str)
      }
      WcChatPreviewImage(url, datas)
    },
    // 发布评论
    PublishComments () {
      Getfbpl ({
        id: this.id,
        mk: this.mkid,
        content: this.CommentsContent
      }).then(rps => {
        this.CommentsContentTab = false
        this.CommentsContent = ''
        if (rps.data.success) {
          this.GetCommentsList()
        } else {
          this.changtoast(rps.data.message, "error");
        }
      })
    },
    // 获取评论列表
    GetCommentsList () {
      GetPlList ({
        id: this.id,
        mk: this.mkid,
        pageIndex: this.pageIndex
      }).then (rps => {
        if (rps.data.success) {
          this.CommentsListData = this.CommentsListData.concat (rps.data.content)
          if (rps.data.content.length < 10) {
            this.moreLoading = true
          } else {
            this.pageIndex++
          }
        } else {
          this.changtoast(rps.data.message, "error");
        }
      })
    },
    // 删除评论
    DeleteComment () {
      GetPlDel ({
        id: ''
      }).then (rps => {

      })
    },
    // 下拉刷新事件 
    loadMore () {
      if (this.moreLoading) {
        return
      } else {
        this.GetCommentsList()
      }
    }
  },
  created() {
    this._GetDetailPages();
    switch (this.publishType) {
      case '4':
        document.title = '主题党日'
        break;
    
      default:
        break;
    }
  },
  updated: function  () {
    this.$nextTick(function(){
      if (!this.RichTextDisposeSatae) {
        this.RichTextDispose()
        this.RichTextDisposeSatae = true
      }
    })
  }
};
</script>

<style lang='scss' type="text/css" scoped>
@import "@/style/pages/secondLevelPages/homePage/NotificationParticulars_v1.scss";
</style>
