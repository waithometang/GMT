<template>
  <div class="PublicService">
    <div class="Pub_top">
      <div class="pub_top_hread">
        高明
      </div>
      <div class="pub_top_middle">26°C 阴<img src="/images/PublicService/img_03.png">|AQI|30空气质量优</div>
      <div class="pub_top_bottom">
        我的服务
        <img src="/images/PublicService/img_01.png">
      </div>
    </div>
    <div v-if="this.Ser_type==1" class="Pub_middle">
      <div class="Pub_middle_hread">网上服务</div>
      <div class="Pub_middle_main">
        <ul>
          <li @click="goto_z(1)">
            <img  src="/images/PublicService/icon_1.png">个人服务
          </li>
          <li @click="goto_z(2)">
            <img  src="/images/PublicService/icon_2.png">法人服务
          </li>
        </ul>
      </div>
    </div>
    <div v-if="this.Ser_type==1" class="Pub_middle">
      <div class="Pub_middle_hread">综合服务</div>
      <div class="Pub_middle_main">
        <ul>
          <li @click="goto_z(3)">
            <img  src="/images/PublicService/icon_3.png">办事预约
          </li>
          <li @click="goto_z(4)">
            <img src="/images/PublicService/icon_4.png">预约查询
          </li>
          <li @click="goto_z(5)">
            <img src="/images/PublicService/icon_5.png">办事指南
          </li>
          <li @click="goto_z(6)">
            <img src="/images/PublicService/icon_6.png">服务导航
          </li>
        </ul>
      </div>
    </div>
    <div v-if="this.Ser_type==1" class="Pub_middle">
      <div class="Pub_middle_hread">人社服务</div>
      <div class="Pub_middle_main">
        <ul>
          <li @click="goto_z(7)">
            <img src="/images/PublicService/icon_7.png">证书查询
          </li>
          <li @click="goto_z(8)">
            <img src="/images/PublicService/icon_8.png">公务员考试
          </li>
        </ul>
      </div>
    </div>
    <div v-if="this.Ser_type==1" class="Pub_middle">
      <div class="Pub_middle_hread">公安服务</div>
      <div class="Pub_middle_main">
        <ul>
          <li @click="goto_z(9)">
            <img src="/images/PublicService/icon_9.png">户政业务
          </li>
          <li @click="goto_z(10)">
            <img src="/images/PublicService/icon_10.png">治安业务
          </li>
          <li @click="goto_z(11)">
            <img src="/images/PublicService/icon_11.png">机动车服务
          </li>
          <li @click="goto_z(12)">
            <img src="/images/PublicService/icon_12.png">驾驶证服务
          </li>
          <li @click="goto_z(13)">
            <img src="/images/PublicService/icon_13.png">出入境业务
          </li>
          <li @click="goto_z(14)">
            <img src="/images/PublicService/icon_14.png">非税缴费
          </li>
        </ul>
      </div>
    </div>
    <div v-if="this.Ser_type==2" class="Pub_middle">
      <div class="Pub_middle_hread">就诊挂号</div>
      <div class="Pub_middle_main">
        <ul>
          <li @click="goto_s(1)">
            <img src="/images/PublicService/icon_15.png">高明区人民医院
          </li>
          <li @click="goto_s(2)"> 
            <img src="/images/PublicService/icon_15.png">高明区中医院
          </li>
          <li @click="goto_s(3)">
            <img src="/images/PublicService/icon_15.png">佛山市中医院
          </li>
          <li @click="goto_s(4)">
            <img src="/images/PublicService/icon_15.png">佛山市妇幼保健院
          </li>
        </ul>
      </div>
    </div>
    <div v-if="this.Ser_type==2" class="Pub_middle">
      <div class="Pub_middle_hread">天气</div>
      <div class="Pub_middle_main">
        <ul>
          <li @click="goto_s(5)"> 
            <img src="/images/PublicService/icon_16.png">天气预报
          </li>
          <li @click="goto_s(6)">
            <img src="/images/PublicService/icon_17.png">预警信息
          </li>
          <li @click="goto_s(7)">
            <img src="/images/PublicService/icon_18.png">台风路径
          </li>
        </ul>
      </div>
    </div>
    <div v-if="this.Ser_type==2" class="Pub_middle">
      <div class="Pub_middle_hread">交通</div>
      <div class="Pub_middle_main">
        <ul>
          <li @click="goto_s(8)">
            <img src="/images/PublicService/icon_19.png">车来了（佛山）
          </li>
          <li @click="goto_s(9)">
            <img src="/images/PublicService/icon_20.png">长途汽车票
          </li>
          <li @click="goto_s(10)">
            <img src="/images/PublicService/icon_21.png">直通香港巴士
          </li>
          <li @click="goto_s(11)">
            <img src="/images/PublicService/icon_22.png">高速路况
          </li>
        </ul>
      </div>
    </div>
    <div v-if="this.Ser_type==2" class="Pub_middle">
      <div class="Pub_middle_hread">教育</div>
      <div class="Pub_middle_main">
        <ul>
          <li @click="goto_s(12)">
            <img src="/images/PublicService/icon_23.png">高考通知书查询
          </li>
          <li @click="goto_s(13)">
            <img src="/images/PublicService/icon_24.png">学历查询
          </li>
        </ul>
      </div>
    </div>
    <div v-if="this.Ser_type==2" class="Pub_middle">
      <div class="Pub_middle_hread">生活</div>
      <div class="Pub_middle_main">
        <ul>
          <li @click="goto_s(14)">
            <img src="/images/PublicService/icon_25.png">停水通知
          </li>
          <li @click="goto_s(15)">
            <img src="/images/PublicService/icon_26.png">水费缴费
          </li>
          <li @click="goto_s(16)">
            <img src="/images/PublicService/icon_27.png">燃气缴费
          </li>
          <li @click="goto_s(17)">
            <img src="/images/PublicService/icon_28.png">供电缴费
          </li>
        </ul>
      </div>
    </div>
    <div v-if="this.Ser_type==2" class="Pub_middle">
      <div class="Pub_middle_hread">邮政</div>
      <div class="Pub_middle_main">
        <ul>
          <li @click="goto_s(18)">
            <img src="/images/PublicService/icon_29.png">广东港澳台签注
          </li>
          <li @click="goto_s(19)">
            <img src="/images/PublicService/icon_30.png">DIY明信片
          </li>
          <li @click="goto_s(20)">
            <img src="/images/PublicService/icon_31.png">快递查询
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  computed: {
    Ser_type () {
      return (this.$route.params.type)*1
    }
  },
  created() {
    switch (this.Ser_type) {
      case 1:
        document.title='政务服务'
        break;
      case 2:
        document.title='便民服务'
        break;
    }
  },
//   mounted(){
//   if (window.history && window.history.pushState) {
//     history.pushState(null, null, document.URL);
//     window.addEventListener('popstate', this.goBack, false);
//   }
// },
// destroyed(){
//   window.removeEventListener('popstate', this.goBack, false);
// },
  methods : {
    goto_z(item){
      // window.removeEventListener('popstate', this.goBack, false);
      if(item==1)window.location.href = "http://www.gdzwfw.gov.cn/portal/personal/hot?region=440608"
      else if(item==2)window.location.href = "http://www.gdzwfw.gov.cn/portal/legal/hot?region=440608"
      else if(item==3)window.location.href = "#"
      else if(item==4)window.location.href = "#"
      else if(item==5)window.location.href = "https://wap.gdbs.gov.cn/gdbsWX/mobileH/jsp/itemGuide/itemGuide.jsp?divisionCode=440608&divisionName=%E9%AB%98%E6%98%8E%E5%8C%BA"
      else if(item==6)window.location.href = "#"
      else if(item==7)window.location.href = "http://ggfw.gdhrss.gov.cn/gdrsWXPro/cert/certlist.shtml"
      else if(item==8)window.location.href = "https://open.weixin.qq.com/connect/oauth2/authorize?appid=wx6df5dd27605bca97&redirect_uri=http%3A%2F%2Fggfw.gdhrss.gov.cn%2FgdrsWXPro%2FSiInfo%2Findex.shtml&response_type=code&scope=snsapi_base&state=1#wechat_redirect"
      else if(item==9)window.location.href = "https://mp.weixin.qq.com/cityservice/search?action=click_layout_tag&keyword=%E6%88%B7%E6%94%BF&cityid=441900&csentrance=13&red_point_id=0"
      else if(item==10)window.location.href = "https://wx.fsga.gov.cn/fsweixin/FsIndexZAServlet?service=EED3418AD05340CE927A319C6267D43B&pageIndex=1&pageSize=10&key=b43cf8e1-c64b-480d-be00-490d63636fbe&wxcity=y&cityid=440600"
      else if(item==11)window.location.href = "https://mp.weixin.qq.com/cityservice/search?action=click_layout_tag&keyword=%E6%9C%BA%E5%8A%A8%E8%BD%A6%E4%B8%9A%E5%8A%A1&cityid=441900&csentrance=13&red_point_id=0"
      else if(item==12)window.location.href = "https://mp.weixin.qq.com/cityservice/search?action=click_layout_tag&keyword=%E9%A9%BE%E9%A9%B6%E8%AF%81%E4%B8%9A%E5%8A%A1&cityid=441900&csentrance=13&red_point_id=0"
      else if(item==13)window.location.href = "https://mp.weixin.qq.com/cityservice/search?action=click_layout_tag&keyword=%E7%A7%BB%E6%B0%91%E5%92%8C%E5%87%BA%E5%85%A5%E5%A2%83&cityid=441900&csentrance=13&red_point_id=0"
      else if(item==14)window.location.href = "http://wsjfwx.gdgpo.gov.cn/nontax-wxpay/pay_demand.html?ts=1555487444850"
    },
    goto_s(item){
      // window.removeEventListener('popstate', this.goBack, false);
      if(item==1)window.location.href = "https://mp.mhealth100.com/ip-pat-web/wxInfo!linkloginToChoiseHos.do?realName=&mobile=&certNo="
      else if(item==2)window.location.href = "#"
      else if(item==3)window.location.href = "https://mp.weixin.qq.com/cityservice/index?csentrance=1#wechat_redirect"
      else if(item==4)window.location.href = "https://mp.weixin.qq.com/cityservice/index?csentrance=1#wechat_redirect"
      else if(item==5)window.location.href = "http://www.sunhero.cn/GaoMingweixin/weixinPage/todayWether.html"
      else if(item==6)window.location.href = "http://www.sunhero.cn/GaoMingweixin/weixinPage/yujingxinxi.html"
      else if(item==7)window.location.href = "http://typhoon.zjwater.gov.cn/wap.htm?from=message&isappinstalled=0"
      else if(item==8)window.location.href = "https://web.chelaile.net.cn/ch5/?showFav=1&utm_source=weixinmp&wxckey=CK1298484483775&src=webapp_weixin_mp&s=browser&utm_medium=menu&homePage=linearound&userId=ou7QDjyFScC4ptbTYqz4dRntSsQ8&unionId=wechat_12345&cityName=%E4%BD%9B%E5%B1%B1&cityId=019&supportSubway=0&cityVersion=0"
      else if(item==9)window.location.href = "http://www.gdnyt.cn/app/index.php?i=3&c=entry&do=openid&m=nanyuetong&pages=index&ch=003&url=http%3A%2F%2Fmobile.gdnyt.cn%2Fuser%2Fauth2Back&signature=eb8d6065759f9adb218ba0906424e301d1abce36&timestamp=1555487031&nonce=ywf3z0u4&appId=wechat_5367B069&wxref=mp.weixin.qq.com#wechat_redirect"
      else if(item==10)window.location.href = "https://mp.weixin.qq.com/cityservice/search?action=click_layout_tag&keyword=%E7%9B%B4%E9%80%9A%E9%A6%99%E6%B8%AF%E5%B7%B4%E5%A3%AB&cityid=441900&csentrance=13&red_point_id=0"
      else if(item==11)window.location.href = "http://mainten.televehicle.com/highwaystatus/getRoadListForRegion.action?regionId=0&cityid=440600"
      else if(item==12)window.location.href = "https://yzgklife.wecity-qcloud.com/index.html?wxcityid=ADSDIUXERWERWERWEAFDASFDSAFDERWE&cityid=440600"
      else if(item==13)window.location.href = "https://www.chsi.com.cn/xlcx/lscx/query.action?cityid=440600&state=wxcity"
      else if(item==14)window.location.href = "https://wx.fswater.com/StopNotice_list.aspx?area=400&type=1"
      else if(item==15)window.location.href = "https://wx.fswater.com/bandwater_list.aspx?type=select"
      else if(item==16)window.location.href = "https://weixin.towngasvcc.com/vcc-wx/gasAirlines/gasService?wx_appid=wx8fc39eb60e11ff9d"
      else if(item==17)window.location.href = "http://weixin.csg.cn/WeChat/wap/wx2_0/pages/"
      else if(item==18)window.location.href = "https://mp.weixin.qq.com/cityservice/index?csentrance=1#wechat_redirect"
      else if(item==19)window.location.href = "https://mp.weixin.qq.com/cityservice/index?csentrance=1#wechat_redirect"
      else if(item==20)window.location.href = "https://m.kuaidi100.com/?openid=ofaKJv1diTNS7kXEc-Hck69Bs4m0"
    },
    selectcity(){
      this.$router.push({
        path: "/SelectCity"
      })
    },
    goBack () {
      this.$router.push({
        path: '/index'
      })
    }
  },
}
</script>

<style lang="scss" scoped>
.PublicService {
  background: #F2F9FF;
  margin: 0;
  padding: 0;
  padding-bottom: 100px;
  .Pub_top {
    width: 750px;
    // height: 352px;
    background: rgba(51, 173, 240, 1);
    padding-top: 41px;
    .pub_top_hread {
      font-size: 94px;
      font-family: PingFang-SC-ExtraLight;
      font-weight: 200;
      color: rgba(254, 255, 255, 1);
      padding-left: 45px;
      opacity: 0.8;
      display: flex;
      img {
        width: 34px;
        height: 34px;
        margin-left: 30px;
        margin-top: 15px;
      }
    }
    .pub_top_middle {
      margin-top: 46px;
      font-size: 30px;
      font-family: PingFang-SC-Regular;
      font-weight: 400;
      color: rgba(254, 255, 255, 0.8);
      padding-left: 45px;
      letter-spacing:10px;
        img{
          width: 28px;
          height: 28px;
        }
    }
    .pub_top_bottom {
      margin: 56px 40px 0px 40px;
      border-top: 1px solid rgba(255, 255, 255, 0.8);
      font-size: 30px;
      font-family: PingFang-SC-Regular;
      font-weight: 400;
      color: rgba(254, 255, 255, 0.8);
      opacity: 0.8;
      height: 80px;
      display: flex;
      align-items: center;
      img {
        width: 19px;
        height: 36px;
        margin-left: auto;
      }
    }
  }
  .Pub_middle {
    padding: 0px 40px 20px 40px;
    margin-top: 20px;
    background: #ffffff;
    
    .Pub_middle_hread {
      height: 95px;
      display: flex;
      align-items: center;
      font-size: 30px;
      font-family: PingFang-SC-Medium;
      font-weight: 500;
      color: rgba(143, 143, 143, 1);
      border-bottom: 1px solid rgba(221, 221, 221, 1);
    }
    .Pub_middle_main {
      display: block;
      ul {
        padding: 0;
        margin: 0;
        list-style: none;
        width: 105%;
        overflow: hidden;
        li {
          float: left;
          width: 50%;
          height: 90px;
          display: flex;
          align-items: center;
          font-size: 30px;
          color: rgba(0, 0, 0, 1);
           &:active{
             background: #f4f4f4;
           }
          img {
            width: 43px;
            height: 44px;
            margin-right: 34px;
          }
        }
      }
    }
  }
  .Pub_middle:nth-child(2) {
    margin: 0;
  }
  // .Pub_middle:last-child {
  //   margin-bottom: 100px;
  // }
}
</style>

