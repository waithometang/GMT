<!-- 点赞列表 -->
<template>
  <div class="Like">
    <div class="content">
      <div class="head">
        <img src="/images/like.png" alt="">
      </div>
      <GmtSelectTab :TabData="TabData" @changeTabState="SetTabState" :TabStateData="TabStateData"></GmtSelectTab>
      <div class="likelistContent">
        <GmtSearchList url="api/sy/HotPulishList" :useSearch="false" :parms="{lx: this.TabStateData}" :pageSize="3">
          <template slot="item" slot-scope="listData">
            <div class="listParticulars" v-for="(item, index) in listData.data" :key="index">
              <div class="left_icon">
                <img :src="setHeadPortrait(item)" alt="">
              </div>
              <div class="right_content">
                <div class="name_time">
                  <div class="name">{{setNmae(item)}}</div>
                  <div class="time">{{item.date}}</div>
                </div>
                <div class="link_type" v-if="item.linkage" @click="changelinkage(item)">
                  <div class="link_type_icon" v-if="item.cover">
                    <img :src="item.cover" alt="">
                  </div>
                  <div class="link_type_text">{{item.title}}</div>
                </div>
                <div class="note_link_type" v-else>
                  <div class="headline">{{item.title}}</div>
                  <div class="particulars">
                    <div class="particulars_content" :class="{'particulars_action': item.content.length >= 60}" v-if="item.content">
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
          </template>
        </GmtSearchList>
      </div>
    </div>
  </div>
</template>

<script>
import GmtSelectTab from '@/components/GmtSelectTab'
import GmtSearchList from '@/components/GmtSearchList'
import { GetHotPulishList } from '@/api/secondLevelPage'
import {GetMark, GetFavorite, GetUndoFavorite } from "@/api/secondLevelPage.js";
import { WcChatPreviewImage }from '@/js/WeChatpreviewImage'

export default {
  components: {
    GmtSelectTab,
    GmtSearchList
  },
  data () {
    return {
      TabData: [{name: '最新实事', type: 0}, {name: '城市热点', type: 1}],
      lx: 0,
      TabStateData: 0,
      OverflowState: -1,
      showYuDu: false, // 控制阅读数显示隐藏
    }
  },
  methods: {
    SetTabState (item) {
      this.TabStateData = item.type
      this.lx = item.type
      if (item == 0) {
        this.showYuDu = false
      } else {
        this.showYuDu = true
      }
    },
    // 设置头像
    setHeadPortrait (item) {
      if (item.cjfb) {
        return '/static/cunjufabu@2x.png'
      } else {
        if (item.mkid === 201) {
          return item.photo ? item.photo : '/static/liangweifabu@2x.png'
        } else if (item.mkid === 202) {
          return item.photo ? item.photo : '/static/zhilianfabu@2x.png'
        } else if (item.mkid === 301) {
          return item.photo ? item.photo : '/static/dangyuanfabu@2x.png'
        }
      }
    },
    // 设置名字
    setNmae(item) {
      if (item.cjfb) {
        return item.name
      } else {
        if (item.mkid === 201) {
          return item.name ? item.name : '两委成员'
        } else if (item.mkid === 202) {
          return item.name ? item.name : '直联代表'
        } else if (item.mkid === 301) {
          return item.name ? item.name : '党员实事'
        }
      }
    },
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
            let str = "您已点赞，目前已有"+ rps.data.content.dzs + "人点赞"
            if (rps.data.content.dzzt) {
              this.changtoast(str)
            }
          }
        } else {
          this.changtoast(rps.data.message, "error");
        }
      })
    },
    changelinkage (item) {
      window.location.href = item.linkage
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
  }
}
</script>

<style lang='scss' scoped type="text">
@import '@/style/pages/secondLevelPages/homePage/like.scss';
.likelistContent{
  position:absolute;
  top:300px;
  bottom:0px;
}
</style>
