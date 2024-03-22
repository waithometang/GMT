<template>
  <div class="ExternalLinks">
    <BetterScroll>
      <template slot="BetterScroll">
        <div class="head">
          <div class="jiaof" v-if="Ser_type == 1">
            <img src="/images/jiaof.png" alt="">
          </div>
          <div class="guah" v-if="Ser_type == 3">
            <div class="guah-icon">
              <img src="/images/huah.png" alt="">
            </div>
          </div>
          <div class="jiaof" v-if="Ser_type == 2">
            <img src="/images/zuoc.png" alt="">
          </div>
        </div>
        <div v-if="Ser_type==1" class="mian_list">
          <div @click="goto(1)">
            <img src="/images/PublicService/icon_26.png">
            <span>水费缴费</span>
          </div>
          <div @click="goto(2)">
            <img src="/images/PublicService/icon_27.png">
            <span>燃气缴费</span>
          </div>
          <div @click="goto(3)" v-if="false">
            <img src="/images/PublicService/icon_28.png">
            <span>电费交费</span>
          </div>
          <div @click="goto(4)">
            <img src="/images/Tv_icon.png">
            <span>电视缴费</span>
          </div>
        </div>
        <div v-if="Ser_type==2" class="mian_list">
          <div @click="goto(5)">
            <img src="/images/PublicService/icon_19.png">
            <span>车来了(佛山)</span>
          </div>
          <div @click="goto(6)">
            <img src="/images/PublicService/icon_20.png">
            <span>长途汽车票</span>
          </div>
        </div>
        <div v-if="Ser_type==3" class="mian_list" :class="{'mian_list-action': Ser_type == 3}">
          <!-- <div @click="goto(9)">
            <img src="/images/PublicService/icon_32.png">
            <span>佛山市中医院</span>
          </div> -->
          <div @click="goto(10)">
            <img src="/images/PublicService/icon_32.png">
            <span>佛山市妇幼保健院</span>
          </div>
        </div>
      </template>
    </BetterScroll>
  </div>
</template>

<script>
import BetterScroll from "@/components/BetterScroll";
export default {
  data() {
    return {
      imgaes: ""
    };
  },
  components: {
    BetterScroll
  },
  computed: {
    Ser_type() {
      return this.$route.params.type * 1;
    }
  },
  methods: {
    goto(item) {
      //水费缴费
      if (item == 1)
        window.location =
          "https://wx.fswater.com/bandwater_list.aspx?type=selec&scene=4#wechat_redirect";
      //燃气缴费
      else if (item == 2)
        window.location =
          "https://weixin.towngasvcc.com/vcc-wx/gasAirlines/gasService?wx_appid=wx8fc39eb60e11ff9d&scene=4#wechat_redirect";
      //电费交费
      else if (item == 3)
        window.location =
          "https://payapp.weixin.qq.com/life/index?showwxpaytitle=1&from=cs#/agency/2/city/440600&scene=4#wechat_redirect";
      //电视缴费
      else if (item == 4) window.location = "http://www.96956.com.cn/mcrweb/pages/addrarrear/addrarrear.shtml?publishid=gh_c18d8c5de73b&scene=4#wechat_redirect";
      //车来了
      else if (item == 5)
        window.location =
          "https://web.chelaile.net.cn/ch5/?showFav=1&utm_source=weixinmp&wxckey=CK1298484483775&src=webapp_weixin_mp&s=browser&utm_medium=menu&homePage=linearound&userId=ou7QDjyFScC4ptbTYqz4dRntSsQ8&unionId=wechat_12345&cityName=%E4%BD%9B%E5%B1%B1&cityId=019&supportSubway=0&cityVersion=0&scene=4#wechat_redirect";
      //长途汽车
      else if (item == 6)
        window.location =
          "http://www.gdnyt.cn/app/index.php?i=3&c=entry&do=openid&m=nanyuetong&pages=index&ch=003&url=http%3A%2F%2Fmobile.gdnyt.cn%2Fuser%2Fauth2Back&signature=eb8d6065759f9adb218ba0906424e301d1abce36&timestamp=1555487031&nonce=ywf3z0u4&appId=wechat_5367B069&wxref=mp.weixin.qq.com#wechat_redirect&scene=4#wechat_redirect";
      //高明区人民医院
      else if (item == 7)
        window.location =
          "https://mp.mhealth100.com/ip-pat-web/wxInfo!linkloginToChoiseHos.do?realName=&mobile=&certNo=&scene=4#wechat_redirect";
      //高明区中医院
      else if (item == 8)
        window.location =
          "https://mp.mhealth100.com/ip-pat-web/wxInfo!getDeptInfo.do?hospitalId=100060001&deptType=&expertAppointment=&scene=4#wechat_redirect";
      //佛山市中医院
      else if (item == 9)
        window.location =
          "https://wx.fshtcm.com.cn/h5/?0523=&from=groupmessage#/op/reg/depts/ROOT&scene=4#wechat_redirect";
      //佛山市妇幼保健院
      else if (item == 10)
        window.location =
          "https://mp.fsfy.com/?IM_SRC=151125165819&cityid=440600&from=groupmessage&scene=4#wechat_redirect";
    }
  },
  created() {
    switch (this.Ser_type) {
      case 1:
        document.title = "去缴费";
        this.imgaes = "/images/FirstLevelPage_6.0/img_03.jpg";
        break;
      case 2:
        document.title = "坐车";
        this.imgaes = "/images/FirstLevelPage_6.0/img_02.jpg";
        break;
      case 3:
        document.title = "挂号";
        this.imgaes = "/images/FirstLevelPage_6.0/img_01.jpg";
        break;
    }
  }
};
</script>
<style lang="scss" scoped>
.ExternalLinks {
  // margin: 0;
  // padding: 0;
  // background: #ffffff;
  // position: relative;
  .head {
    .zuoc {
      width: 750px;
      height: 360px;
      border-radius: 10px;
      display: inline-block;
      img {
        width: 100%;
        height: 100%;
      }
    }
    .jiaof {
      width:750px;
      height:364px;
      img {
        width:750px;
        height:364px;
      }
    }
    .guah {
      position: relative;
      width:750px;
      height:300px;
      background:linear-gradient(0deg,rgba(136,203,252,1),rgba(79,172,241,1));
      .guah-icon {
        width:670px;
        height:300px;
        margin: 0 auto;
        img {
          margin-top: 64px;
          width:670px;
          height:300px;
          border-radius:10px;
        }
      }
    }
  }
  .mian_list {
    margin-top: 60px;
    div {
      height: 100px;
      width: 49%;
      text-align: center;
      display: inline-block;
      margin-bottom: 60px;
      padding: 10px 0px 10px 0px;
      &:nth-child(2n) {
        border-left: 1px solid rgba(204, 204, 204, 1);
      }
      &:active {
        background: #f2f2ff;
      }
      span {
        display: block;
        font-size: 30px;
        font-family: PingFang-SC-Medium;
        font-weight: 500;
        color: rgba(0, 0, 0, 1);
        margin-top: 8px;
      }
      img {
        width: 54px;
        height: 54px;
      }
    }
  }
  .mian_list-action {
      margin-top: 124px;
  }
}
</style>
