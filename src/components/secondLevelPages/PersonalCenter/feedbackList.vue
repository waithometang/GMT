<template>
  <div class="feedbackList">
	<GmtSearchList :url='url' :useSearch='false'>
      <template slot="item" slot-scope="listData">
        <div class="content" v-for="(item, index) in listData.data" :key="index">
          <div class="iconTitle"> 
            <div class="left">
              <img :src="item.headPortrait">
            </div>
            <div class="right">
              <div class="nameTitle">
                <div class="name" v-if="item.name">{{item.name}}</div>
                <div class="title">{{item.content}}</div>
              </div>
              <div class="icon">
                <div class="images" v-for="(item_1, index_1) in item.picture" :key="index_1" @click="lookOver(item,index_1)">
                  <img :src="item_1">
                </div>
              </div>
              <div class="timecomment" v-if="item.addr">
                <img src="/images/weizhi.png">
                {{item.addr}}
              </div>
              <div class="timecomment right">
                <div>
									{{item.date}}
                </div>
              </div>
              <!-- 回复内容 -->
              <div class="reply" v-if="item.reply">
                <div class="reply-content">
                  <span>回复内容:</span>{{item.reply}}
                </div>
                <!-- <div class="reply-accessory" v-for="(item_1, index_1) in item.wjList" :key="index_1" v-show="item.wjList.length > 0">
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
                </div> -->
                <div class="reply-time">
                  <span>{{item.replyDate}}</span>
                </div>
                <!-- <div class="reply-mark" v-if="false">
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
                </div> -->
              </div>
              <div class="caseInfo" v-if="caseInfoindex == index"></div>
            </div>
          </div>
        </div>
      </template>
    </GmtSearchList>
  <lookOverImage v-if='pupopLook' :imgSrc='imgSrc' :index="initialSlide" @SETbigImg="bigImg"></lookOverImage>
  </div>
</template>

<script>
import GmtSearchList from '@/components/GmtSearchList'
import lookOverImage from '@/components/secondLevelPages/ruralRevitalization/lookOverImage'

export default {
  data () {
    return {
      url : 'api/system/XtfkList',
      caseInfoindex: '',
      pupopLook: false,
      imgSrc: [],
      initialSlide: 0,
    }
  },
  components: {
    GmtSearchList,
    lookOverImage
  },
  methods: {
    bigImg (item) {
      this.pupopLook = item
    },
    // 查看照片
    lookOver (item,index) {
      this.pupopLook = true
      this.initialSlide = index // 记录分页数据
      this.imgSrc = item.picture // 记录需要展示的图片
    },
  }
}
</script>
<style lang="scss" type="text/css" scoped>
.feedbackList {
  position: absolute;
  top: 92px;
  bottom: 0;
  left: 0;
  right: 0;
  overflow-y: scroll;
  .content {
    background: #ffffff;
    .iconTitle {
      width: 694px;
      padding: 0 28px 28px 28px;
      border-bottom: 1px solid #cccccc;
      display: flex;
      overflow: hidden;
      margin-top: 20px;
      height:auto;
      .left {
        height: 90px;
        width: 90px;
        margin-right: 24px;
        img {
          border-radius: 10px;
          width: 100%;
          height: 100%;
        }
      }
      .right {
        width: 565px;
        .nameTitle {
          .name {
            height: 45px;
            overflow: hidden;
            margin-bottom: 13px;
            text-align: left;
            font-size: 30px;
            font-family: PingFang-SC-Heavy;
            font-weight: 800;
            color:rgb(23, 5, 124);
            span {
              color: #ff6633;
            }
          }
          .title {
            width: 100%;
            text-align: left;
            font-size: 30px;
            font-family: PingFang-SC-Medium;
            font-weight: 500;
            color: rgba(102, 102, 102, 1);
            height: auto;
            overflow: hidden;
          }
        }
        .icon {
          width: 100%;
          height:auto;
          margin:0;
          margin-top: 22px;
          .images {
            height: 160px;
            display: inline-block;
            width: 175px;
            margin-bottom: 20px;
            margin-right: 10px;
            img {
              width: 100%;
              height: 100%;
            }
          }
        }
        .timecomment {
          width: 100%;
          display: flex;
          font-size: 24px;
          color: #999999;
          display: flex;
          align-items: center;
          padding: 5px 0px 5px 0px;
          img {
            height: 30px;
            margin-right: 10px;
          }
          .state {
            display: flex;
            align-items: center;
          }
          .schedule {
            height: 40px;
            padding: 0px 20px 0px 20px;
            background: #66b7f3;
            color: #ffffff;
            margin-bottom: 20px;
             display: flex;
             align-items: center;
            border-radius: 5px;
          }
        }
        .right{
          justify-content: space-between;
          margin-bottom: 20px;
        }
        .reply-content{
          margin: 0 20px;
          font-size:28px;
          font-weight:500;
          background-color:#f8f8f8;
          color:rgba(40,40,40,1);
          overflow: hidden;
          span{
            display: inline-block;
            flex: 0 0 auto;
            margin-right: 20px;
            color:rgba(90,103,158,1);
          }
        }
        .reply-time{
          text-align:right;
          padding-right: 20px;
          line-height:32px;
          margin: 0 20px;
          background-color:#f8f8f8;
          font-size:3.2vw;
          color:#999;
        }
      }
      .caseInfo {
        height: auto;
        font-size: 28px;
        color: red;
        margin-bottom: 15px;
      }
    }
    .bor{
      border: 0;
    }
  }
}

.scelloe {
  position: absolute;
  top: 100px;
  bottom: 0;
  width: 100%;
  overflow: scroll;
  overflow-x: hidden;
}
</style>

