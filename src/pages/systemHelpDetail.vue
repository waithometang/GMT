<template>
  <div class="systemHelpDetail">
    <div class="head">
      <img src='/static/systemHelp.jpg' alt="" />
    </div>
    <div class="head_title">
      {{filterData().name}}
    </div>
    <div class="content" v-for="(item, index) in filterData().data" :key="index">
      <div class="title">
        <img src="/static/img_01.png" alt="">
        {{item.title}}
      </div>
      <div v-if="item.introduce" class="introduce" v-html="item.introduce">
      </div>
      <div class="images" v-if="item.images.length > 0">
        <ul>
          <li v-for="(item_1, index_1) in item.images" :key="index_1" @click="PreviewImage(item_1, item.images)">
            <img :src="item_1" alt="">
          </li>
          <div style="clear:both;"></div>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
import { GetWechatConfig } from "@/api/GetWechatConfig"
import { WcChatPreviewImage } from '@/js/WeChatpreviewImage'

export default {
  data () {
    return {
      listData: {
        fysq: {
          WaChatConfigData: '',
          name: '群众如何反映诉求',
          data: [
                  {
                    title: '诉求反映', 
                    introduce: '进入高明通首页，找到“<span style="color: #0087FF">我要反映</span>”,点击进入反映诉求界面,填写需要反映的诉求,也可进行拍照上传,点击【<span style="color: #0087FF">发送诉求反映</span>】即可。注：诉求反映也可以匿名反映',
                    images: ['/static/newEditionIndex/xtfh_icon_2.png', '/static/systemHelpDetail/icon_2.jpg']
                  },
                  {
                    title: '回复查看及评价诉求', 
                    introduce: '选择“<span style="color: #0087FF">我的反映</span>”，可查看自己的反映诉求的进度，也可以对回复进行评价。', 
                    images: ['/static/systemHelpDetail/icon_3.png', '/static/systemHelpDetail/icon_4.jpg']
                  },
                  {
                    title: '查看大家的回复',
                    introduce: '',
                    images: ['/static/systemHelpDetail/icon_5.png']
                  }
                ]
        },
        smrz: {
          name: '个人如何实名认证',
          data: [
                  {
                    title: '个人如何实名认证',
                    introduce: '进入高明通，点击底部栏目“<span style="color: #0087FF">我的</span>”，找到“<span style="color: #0087FF">实名认证</span>”，按照提示要求填写个人相关信息，点击“<span style="color: #0087FF">提交认证</span>”即可',
                    images: ['/static/newEditionIndex/xtfh_icon_1.png', '/static/systemHelpDetail/icon_7.jpg']
                  }
          ]
        },
        nfsm: {
          name: '实名认证后能做什么',
          data: [
                  {
                    title: '认证通过后可查看所在户籍村民小组/经联社的资产情况',
                    introduce: '进入高明通，点击底部菜单栏“<span style="color: #0087FF">首页</span>”后，找到“<span style="color: #0087FF">村居通</span>”，点击"<span style="color: #0087FF">村务监督</span>"后可查看所在户籍村民小组/经联社的财务公开、集体三资管理、涉农惠农资金等信息',
                    images: ['/static/newEditionIndex/xtfh_icon_3.png','/static/systemHelpDetail/icon_9.png','/static/systemHelpDetail/icon_10.png']
                  },
                  {
                    title: '认证通过后，如果是党员(两委成员,直联代表），可发布党员实事(两委工作,直联工作动态)',
                    introduce: '打开高明通，点击底部菜单栏“首页”后，点击悬浮按钮“发布”进入发布界面，点击“提交发布”即可',
                    images: ['/static/systemHelpDetail/icon_12.jpg', '/static/newEditionIndex/xtfh_icon_6.png']
                  },
          ]
        },
        fyfy: {
          name: '企业如何反映企业诉求',
          data: [
                  {
                    title: '企业如何反映企业诉求',
                    introduce: '进入高明通首页，点击底部菜单栏“<span style="color: #0087FF">首页</span>”后，找到“<span style="color: #0087FF">企业+</span>”，点击"<span style="color: #0087FF">我要反映</span>"即可进入反映诉求，按照提示要求填写反映内容，下拉到底部点击“<span style="color: #0087FF">发送诉求反映</span>”即可',
                    images: ['/static/newEditionIndex/xtfh_icon_4.png', '/static/systemHelpDetail/icon_15.jpg', '/static/systemHelpDetail/icon_16.png']
                  }
          ]
        },
        xtfk: {
          name: '如何反馈系统问题',
          data: [
                  {
                    title: '如何反馈系统问题',
                    introduce: '进入高明通，点击底部菜单栏“<span style="color: #0087FF">我的</span>”后，找到“<span style="color: #0087FF">系统反馈</span>”，按照提示填写系统问题，点击“提交反馈”即可，可通过【<span style="color: #0087FF">我的反馈</span>】查看管理员的回复内容',
                    images: ['/static/newEditionIndex/xtfh_icon_7.png', '/static/systemHelpDetail/icon_19.jpg']
                  }
          ]
        }
      }
    }
  },
  methods: {
    filterData () {
      let type = this.$route.params.type * 1
      switch (type) {
        case 1:
          return this.listData.fysq
          break;
        case 2:
          return this.listData.smrz
          break;
        case 3:
          return this.listData.nfsm
          break;
        case 4:
          return this.listData.fyfy
          break;
        case 5:
          return this.listData.xtfk
          break;
        default:
          break;
      }
    },
    PreviewImage (item, data) {
      let url = 'http://gmt.gaoming.gov.cn' + item
      let datas = []
      for (let index = 0; index < data.length; index++) {
        const element = data[index];
        let str = 'http://gmt.gaoming.gov.cn' + element
        datas.push(str)
      }
      WcChatPreviewImage(url, datas,this.WaChatConfigData)
    },
    _GetWechatConfig() {
      var u = navigator.userAgent;
      var isAndroid = u.indexOf("Android") > -1 || u.indexOf("Linux") > -1; //g
      var isIOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/); //ios终端
      let url = "";
      if (isAndroid) {
        url = location.href;
      }
      if (isIOS) {
        url = location.href.split("#")[0]; //hash后面的部分如果带上ios中config会不对
      }
      GetWechatConfig({
        url: url
      }).then(rps => {
        if (rps.data.success) {
          this.WaChatConfigData = rps.data.content;
        } else {
          this.changtoast(rps.data.message, "error");
        }
      });
    }
  },
  created () {
    this._GetWechatConfig()
  }
}
</script>

<style lang='scss' scoped>
  .systemHelpDetail{
    height: 100vh;
    overflow-y: scroll;
    background: #F9F9F9;
    .head {
      height: 200px;
      width: 750px;
      background: #ffffff;
      img{
        height: 200px;
        width: 750px;
      }
    }
    .head_title {
      background: #ffffff;
      padding: 30px;
      font-size:44px;
      font-weight:bold;
      color:rgba(51,51,51,1);
      box-shadow:0px 1px 0px 0px rgba(204,204,204,1);
    }
    .content {
      padding: 0 30px;
      padding-bottom: 40px;
      .title {
        padding-top: 32px;
        img{
          width:28px;
          height:28px;
          border-radius:2px;
          margin-right: 20px;
          margin-top: 10px;
        }
        font-size:32px;
        font-weight:bold;
        color:rgba(51,51,51,1);
      }
      .introduce {
        margin-top: 28px;
        font-size:30px;
        font-weight:500;
        color:rgba(102,102,102,1);
        span{
          color: #0087FF;
        }
      }
      .images{
        padding-top: 30px;
        ul {
          list-style: none;
          margin: 0;
          padding: 0;
          li{
            float: left;
            // width:33%;
            width: 230px;
            height:365px;
            display: flex;
            justify-content: center;
            img {
              width:206px;
              height:365px;
            }
          }
        }
      }
    }
  }
</style>
