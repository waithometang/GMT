<template>
  <div class="pushParticulars pushParticulars_action">
    <div class="content">
      <div class="iconTitle"> 
        <div class="left">
          <img :src="listData.headPortrait">
        </div>
        <div class="right">
          <div class="nameTitle">
            <div class="name">
              <div class="name_name">{{listData.name}}</div>
            </div>
            <div class="title">{{listData.content}}</div>
          </div>
          <div class="icon">
            <div class="images"  v-for="(item_1, index_1) in listData.picture" :key="index_1" @click="previewImages(item_1, listData.picture)">
              <img :src="item_1">
            </div>
          </div>
          <div class="timecomment">
            {{listData.location}}
          </div>
          <div class="timecomment right">
            <div>
              {{listData.date}}
            </div>
          </div>
          <div class="reply-list">
            <div class="reply-content">
              <span>回复内容:</span>{{listData.reply}}
            </div>
            <div class="reply-accessory" v-for="(item_1, index_1) in listData.wjList" :key="index_1" v-show="listData.wjList">
              <div class="accessory-icon">
                <img src="/images/word_icon@2x.png" alt="">
              </div>
              <div class="accessory-name">
                <a :href="item_1.wj_url" @click="clickTagA(item_1.wj_url)" :download="item_1.wjmc">
                {{item_1.wjmc}}
                </a>
              </div>
              <a :href="item_1.wj_url" @click="clickTagA(item_1.wj_url)" :download="item_1.wjmc">
                <div class="download-icon">
                  <img src="/images/download_icon@2x.png" alt="">
                </div>
              </a>
            </div>
            <div class="reply-content" v-if="listData.fwpj">
              <span>服务评价:</span>{{listData.fwpj}}
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="base">
      <div class="operation_list">
        <div class="operation_list_tab"  @click="LikeOrNegative(true, listData)">
          <div class="operation_list_tab_icon"><img :src="listData.dzzt === 1 ? '/static/good@2x_red.png' : '/static/good@2x.png'" alt=""></div>
          <div class="operation_list_tab_name" :class="{'operation_list_tab_name_action': listData.dzzt === 1}">赞 {{listData.dzs ? listData.dzs : 0}}</div>
        </div>
        <div class="operation_list_tab"  @click="LikeOrNegative(false, listData)">
          <div class="operation_list_tab_icon"><img :src="listData.dzzt === 2 ? '/static/bad@2x_red.png' : '/static/bad@2x.png'" alt=""></div>
          <div class="operation_list_tab_name" :class="{'operation_list_tab_name_action': listData.dzzt === 2}">踩 {{listData.cps ? listData.cps : 0}}</div>
        </div>
        <div class="operation_list_tab" @click="comment(listData)">
          <div class="operation_list_tab_icon"><img src="/static/talk_black@2x.png" alt=""></div>
          <div class="operation_list_tab_name">评论 {{listData.pls}}</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { GetSqxx } from "@/api/secondLevelPage"
import { GetSqfyxx, GetSqfypj, GetSqpjTag} from '@/api/secondLevelPage'
import { WcChatPreviewImage } from '@/js/WeChatpreviewImage'
import { SqMark } from "@/api/secondLevelPage"

export default {
  data () {
    return {
      lx:1,
      listData: ''
    }
  },
  computed: {
    id () {
      return this.$route.params.id
    }
  },
  methods: {
    getListData () {
      GetSqxx ({
        id: this.id
      }).then (rps => {
        if (rps.data.success) {
          this.listData = rps.data.content
        } else {
          // this.chang
        }
      })
    },
    previewImages (item, data) {
      let url = 'http://gmt.gaoming.gov.cn' + item
      let datas = []
      for (let index = 0; index < data.length; index++) {
        const element = data[index];
        let str = 'http://gmt.gaoming.gov.cn' + element
        datas.push(str)
      }
      WcChatPreviewImage(url, datas)
    },
    // 评论
    comment (item) {
      this.$router.push(`/pj/${item.id}/${item.dzs ? item.dzs : 0}/${item.cps ? item.cps : 0}/${item.yds ? item.yds : 0}/${item.pls ? item.pls : 0}`)
    },
    // 点赞 踩
    LikeOrNegative (item, dome) {
      this._GetMark(item, dome)
    },
    _GetMark (item, dome) {
      SqMark ({
        id: dome.id,
        mkid: 203,
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
          this.changtoast(rps.data.message, "error")
        }
      })
    },
  },
  created () {
    this.getListData()
  }
}
</script>

<style lang="scss" scoped>
@import '@/style/pushParticulars.scss';
</style>