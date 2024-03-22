<!-- 通用发布详情 -->
<template>
  <div class="NotificationParticulars">
    <div class="head">
      <div class="title">{{listData.title}}</div>
      <div class="iconList">
        <div class="list">
          <div class="images">
            <img id="GMT_min_icon" src="/images/img_12.png">
          </div>{{listData.fbr}}
        </div>
        <div class="list">
          <div class="images">
            <img id="GMT_min_icon" src="/images/img_13.png">
          </div>{{listData.publishTime}}
        </div>
        <div class="list">
          <div class="images">
            <img id="GMT_min_icon" src="/images/img_11.png">
          </div>{{listData.readedCount}} 阅读
        </div>
      </div>
    </div>
    <div class="content" v-html="listData.content">{{listData.content}}</div>
    <div class="remark-on" v-if="listData.kydz">
      <div class="tab-icon" :class="{'action-icon': IsLike && dzzt == 1}"  @click="LikeOrNegative(true)">
        <img class="iamges" :src="IsLike && dzzt == 1 ? '/images/zan-red.png' : '/images/zan.png'" alt="">
        {{!listData.dzs ? 0 : listData.dzs}}
      </div>
      <div class="tab-icon" :class="{'action-icon': IsNegative && dzzt == 2}"  @click="LikeOrNegative(false)">
        <img class="iamges" :src="IsNegative && dzzt == 2 ? '/images/cai-red.png' : '/images/cai.png'" alt="">
        {{!listData.cps ? 0 : listData.cps}}
      </div>
      <div class="tab-icon" @click="_GetFavorite">
        <img class="iamges" :src="Isshouc ? '/images/shouc-red.png' : '/images/shouc.png'" alt="">
      </div>
    </div>
  </div>
</template>

<script>
import { GetPulishDetail, GetMark, GetFavorite, GetUndoMark, GetUndoFavorite } from "@/api/secondLevelPage.js";
import { GetHotPulishxx } from '@/api/secondLevelPage'
import { WaChatrequireShare } from '@/js/WaChatrequireShare'

export default {
  data() {
    return {
      listData: "",
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
    mk() {
      return this.$route.params.mk;
    },
    lx () {
      return this.$route.params.lx
    },
    titleData() {
      return this.$route.params.titleData;
    }
  },
  methods: {
    _GetDetailPages() {
      GetHotPulishxx({
        id: this.id,
        mk: this.mk
      }).then(rps => {
        if (rps.data.success) {
          let _data = rps.data.content
          this.listData = _data
          if (_data.dzzt == 1) {
            this.IsLike = true
          } else if (_data.dzzt == 2) {
            this.IsNegative = true
          }
          if (_data.sfsc) {
            this.Isshouc = true
          }
          WaChatrequireShare(_data.title,_data.content
                  ,'nrfbxx/'+ this.mkid + '/' + this.id ,null,this)
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
          } else {
            this.IsNegative = true
          }
        } else {
          this.changtoast(rps.data.message, "error");
        }
      })
    },
    _GetUndoMark (item) {
      GetUndoMark ({
        id:this.id,
        mkid: this.mkid,
        IsGood: item, // true 点赞 false 踩
      }).then (rps => {
        if (rps.data.success) {
          if (item) {
            this.listData.dzs = this.listData.dzs - 1
          } else {
            this.listData.cps = this.listData.cps - 1
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
    }
  },
  created() {
    if (this.lx == 1) {
      document.title = '最新热事'
    } else {
      document.title = '城市热点'
    }
    this._GetDetailPages();
  },
  updated: function  () {
    this.$nextTick(function(){
      this.RichTextDispose()
    })
  }
};
</script>

<style lang='scss' type="text/css" scoped>
@import "@/style/pages/secondLevelPages/homePage/NotificationParticulars.scss";
</style>
