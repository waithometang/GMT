<template>
  <div class="Myreflect">
    <scroller :on-infinite= 'infinite' :on-refresh="refresh" ref="myScroller">
      <div class="list" v-for="(item,index_1) in listData" :key="index_1">
        <!-- 顶部 -->
        <div class="head">
          <div class="headPortrait">
            <img :src="item.headPortrait" alt="">
          </div>
          <div class="head-name-content">
            <div class="head-name-state">
              <div class="head-name">{{item.name}}</div>
              <div class="head-state">
                <span :class="{'span-colo_1': item.zt === '已办理', 'span-colo_2': item.zt === '已评价', 'span-colo_3': item.zt === '已取消'}">{{item.zt}}</span>
              </div>
            </div>
            <div class="haed-content">{{item.content}}</div>
          </div>
        </div>
        <!-- 图片 -->
        <div class="images" v-if="item.picture.length >= 1">
          <ul class="images-list">
            <li class="images-list-li" v-for="(item_1, index) in item.picture" :key="index" @click="previewImages(item_1, item.picture)">
              <img :src="item_1" alt="">
            </li>
          </ul>
        </div>
        <!-- 位置 -->
        <div class="site-time" :class="{'site-time-action': item.picture.length <= 0}">
          <div class="site-tab" v-if="false">
            <img src="/images/img_02.png" alt="">
            {{item.addr}}
          </div>
          <div class="site-tab">
            {{item.date}}
          </div>
        </div>
        <!-- 回复内容 -->
        <div class="reply" v-if="item.zt === '已评价' || item.zt === '已办理'">
          <div class="reply-content" v-if="item.cljg">
            <span>回复内容:</span>{{item.cljg}}
          </div>
          <div class="reply-accessory" v-for="(item_1, index_1) in item.wjList" :key="index_1" v-show="item.wjList.length > 0">
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
          <div class="reply-time">
            {{item.clsj}}
          </div>
          <div class="reply-mark" v-if="false">
            <div class="mark-name">满意度:</div>
            <div class="mark-list" v-if="item.pf <= 0">
              <div class="mark-list-tab" v-for="(item, index) in 5" :key="index" @click="SetmarkNumber(index, index_1)">
                <img src="/images/sart_yellow@2x.png" alt="" v-if="index + 1 <= markNumber && listNumber === index_1">
                <img src="/images/sart_grey@2x.png" alt="" v-else>
              </div>
            </div>
            <div class="mark-list" v-else>
              <div class="mark-list-tab" v-for="(itemS, index) in 5" :key="index">
                <img src="/images/sart_yellow@2x.png" alt="" v-if="index + 1 <= item.pf">
                <img src="/images/sart_grey@2x.png" alt="" v-else>
              </div>
            </div>
            <div class="mark-but" @click="Setmark(item)" v-if="item.pf <= 0">评分</div>
          </div>
        </div>
      </div>
    </scroller>
  </div>
</template>

<script>
import GmtSearchList from '@/components/GmtSearchList'
import lookOverImage from '@/components/secondLevelPages/ruralRevitalization/lookOverImage'
import {GetQyfyList, GetQyfyjg, GetQyfypj, Qyfypj} from  '@/api/secondLevelPage'
import { WcChatPreviewImage } from '@/js/WeChatpreviewImage'
import { session_Storage } from '@/js/until'

let refreshing = false
export default {
  props: ["WaChatConfigData"],
  data () {
    return {
      pageIndex: 1,
      pageSize: 10,
      listData: [],
      zt: '',
      markNumber: '',
      listNumber: ''
    }
  },
  methods: {
    GetListData (done) {
      if(refreshing) return
      refreshing=true
      GetQyfyList({
        pageIndex: this.pageIndex,
        pageSize: this.pageSize,
      }).then(rps => {
        refreshing=false
        if (rps.data.success) {
          if(this.pageIndex===1) this.listData=rps.data.content;
          else this.listData.push(...rps.data.content)
          this.pageIndex++
          if(done) done()
          if (rps.data.content.length < this.pageSize && this.$refs['myScroller']) {
            this.$refs.myScroller.finishInfinite(true)
          }
        } else {
          this.$refs.myScroller.finishInfinite(true)
          this.changtoast(rps.data.message, 'error')
        }
      })
    },
    infinite (done) {
      this.GetListData(done)
    },
    refresh (done) {
      this.pageIndex = 1
      this.GetListData(done)
      this.$refs.myScroller.finishInfinite(false)
    },
    SetmarkNumber (item, index) {
      this.markNumber = item + 1
      this.listNumber = index
    },
    Setmark (item) {
      console.log(item.id)
      if (!this.markNumber) {
        this.changtoast('请先评价')
        return
      }
      Qyfypj ({
        pf: this.markNumber,
        id: item.id
      }).then (rps => {
        if (rps.data.success) {
          this.changtoast('评价成功')
        } else {
          this.changtoast(rps.data.message, 'error')
        }
      })
    },
    // 预览图片
    previewImages (item, data) {
      let url = 'http://gmt.gaoming.gov.cn' + item
      console.log(url)
      let datas = []
      for (let index = 0; index < data.length; index++) {
        const element = data[index];
        let str = 'http://gmt.gaoming.gov.cn' + element
        datas.push(str)
      }
      WcChatPreviewImage(url,datas, this.WaChatConfigData)
    },
    // 预览文件
    previewFile (item) {
      if (/\.(gif|jpg|jpeg|png|GIF|JPG|PNG)$/.test(item)) { // 图片
        let data = [item]
        this.previewImages(item,data)
      } else { // 文件类型
        let url = `http://www.xdocin.com/xdoc?_func=to&_format=html&_cache=1&_xdoc=http://gmt.gaoming.gov.cn${item}`
        this.clickTagA()
        window.location.href = url
      }
    },
    // a标签跳转记录状态
    clickTagA (item) {
      session_Storage.save('qyTagState', 1)
      session_Storage.save('ButtomTageState', this.$store.state.ButtomTageState)
      window.location.href = `http://gmt.gaoming.gov.cn${item}`
    }
  }
}
</script>

<style lang="scss" type="text/css" scoped>
@import '@/style/components/secondLevelPages/PersonalCenter/Myreflect_v1.scss';
</style>
