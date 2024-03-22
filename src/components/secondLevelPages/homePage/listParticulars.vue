<template>
  <div class="listParticulars">
    <div class="list_tab" v-for="(item, index) in listData" :key="index">
      <div class="tab_icon" @click="userInfo(item)">
        <img :src="item.cjfb ? '/static/cunjufabu@2x.png' :item.photo" alt="">
      </div>
      <div class="tab_content">
        <div class="head" @click="userInfo(item)">
          <div class="name">{{item.name}}</div>
          <div class="time">{{item.date}}</div>
        </div>
        <div class="middle">
          <div class="headline">{{item.title}}</div>
          <div class="particulars" :class="{'particulars_action': item.content.length >= 60}" v-if="item.content">
            <div class="particulars_content" ref="particulars_content">
              <div class="text" :class="{'text_hidden': OverflowState != index && item.content.length >= 60}">{{item.content}}</div>
              <div class="full_text" v-if="item.content.length >= 60" @click="SetContentOverflow(index)">
                {{OverflowState === index ? '收起' : '全文'}}
              </div>
            </div>
          </div>
          <div class="images">
            <ul>
              <li v-for="(item_1, index_1) in item.imgs" :key="index_1" @click="SeePhotos(item,item_1,index_1)">
                <img :src="SetImages(item_1)" alt="">
              </li>
              <div style="clear:both;"></div>
            </ul>
          </div>
          <div class="remark_on">
            <div class="tag" @click="LikeOrNegative(true, item)">
              <div class="tag_icon">
                <img :src="item.dzzt === 1 ? '/images/sure-red.png' :'/images/sure.png'" alt="">
              </div>
              <div class="tag_text" :class="{'tag_text_action': item.dzzt === 1}">点赞 {{item.dzs}}</div>
            </div>
            <div class="tag tab_middle" @click="LikeOrNegative(false, item)">
              <div class="tag_icon">
                <img :src="item.dzzt === 2 ? '/images/stamp-red.png': '/images/stamp.png'" alt="">
              </div>
              <div class="tag_text" :class="{'tag_text_action': item.dzzt === 2}">踩 {{item.cps}}</div>
            </div>
            <div class="tag" @click="_GetFavorite(item)">
              <div class="tag_icon">
                <img :src="item.sfsc ? '/images/collect-red.png' : '/images/collect.png'" alt="">
              </div>
              <div class="tag_text" :class="{'tag_text_action': item.sfsc}">收藏</div>
            </div>
            <div class="tag">
              <div class="tag_icon">
                <img src="/static/eye.png" alt="">
              </div>
              <div class="tag_text">阅读 {{item.yds === null ? 0 : item.yds}}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import {GetMark, GetFavorite, GetUndoFavorite } from "@/api/secondLevelPage.js";
import { WcChatPreviewImage }from '@/js/WeChatpreviewImage'

export default {
  props: {
    listData: {
      type: Array
    },
    mkid: {
      type: Number
    },
    userInfoType: {
      type: Number
    }
  },
  data () {
    return {
      OverflowState: -1
    }
  },
  methods: {
    LikeOrNegative (item, dome) {
      if (item) {// 点赞
        this._GetMark(item, dome)
      } else {// 踩
        this._GetMark(item, dome)
      }
    },
    _GetMark (item, dome) {
      GetMark ({
        id:dome.id,
        mkid: dome.mkid,
        IsGood: item,
      }).then (rps => {
        if (rps.data.success) {
          dome.dzzt = rps.data.content.dzzt
          dome.dzs = rps.data.content.dzs
          dome.cps = rps.data.content.cps
          if (item) {
            let str = "您已点赞，目前已有"+ this.listData.dzs + "人点赞"
            if (this.dzzt == 1) {
              this.changtoast(str)
            }
          }
        } else {
          this.changtoast(rps.data.message, "error");
        }
      })
    },
    _GetFavorite (item) {
      if (item.sfsc) {
        GetUndoFavorite ({
          mkid: item.mkid,
          id: item.id
        }).then(rps => {
          if (rps.data.success) {
            item.sfsc = false
          } else {
            this.changtoast(rps.data.message, "error");
          }
        })
      } else {
        GetFavorite ({
          mkid: item.mkid,
          id: item.id,
        }).then (rps => {
          if (rps.data.success) {
            item.sfsc = true
          } else {
            this.changtoast(rps.data.message, "error");
          }
        })
      }
    },
    SetImages (item) {
      return item
    },
    SetContentOverflow (index) {
      if (this.OverflowState === index) {
        this.OverflowState = -1
      } else {
        this.OverflowState = index
      }
    },
    SeePhotos (item,url,index) {
      let arr = []
      if(!item.cjfb) {   //手机端发布
        url = `/api/common/ImgOirginal/${item.imgOirg}/${index}`
        url='http://gmt.gaoming.gov.cn'+url
        for (let i = 0; i < item.imgs.length ; i++) {
          let str = `http://gmt.gaoming.gov.cn/api/common/ImgOirginal/${item.imgOirg}/${i}`
          arr.push(str)
        }
      } else {
        for (let i = 0; i < item.imgs.length ; i++) {
          let data = item.imgs[i]
          let str = 'http://gmt.gaoming.gov.cn'+ data
          arr.push(str)
        }
      }
      WcChatPreviewImage(url, arr)
    },
    userInfo (item) {
      if (item.ryid) {
        if (this.userInfoType === 1) {
          this.$router.push(`/memberListDetails/${this.userInfoType}/${item.ryid}`)
        } else if (this.userInfoType === 2) {
          this.$router.push({
            path: '/LeagueMemberdy',
            query: {
              id: item.ryid
            }
          })
        }
      }
    }
  }
}
</script>

<style lang='scss' scoped type="text/css">
@import '@/style/components/secondLevelPages/homePage/listParticulars.scss';
</style>
