<template>
  <div class="pageContent">
    <div class="content-tab">
      <div class="tab-head" @click="clickCheck(17)">
        <img src="/static/images/PersonalHomePage/yqfkbnr.png" alt />
      </div>
      <!-- <div class="tab-middle">
        <div class="tab-middle-left">疫情防控</div>
      </div>-->
      <!-- <div class="tab-base">
        <div class="base-list">
          <div class="list-tag list-tag-margin">
            <div class="list-tag-tab" @click="clickCheck(30)">
              <div class="tag-tab-left"><img src="/static/images/PersonalHomePage/yqfk10.png" alt=""></div>
              <div class="tag-tab-right">
                <div class="tab-right-name">电子通行证</div>
                <div class="tab-right-title">人员通行证明及记录</div>
              </div>
            </div>
            <div class="list-tag-tab" @click="clickCheck(13)">
              <div class="tag-tab-left"><img src="/static/images/PersonalHomePage/yqfk1.png" alt=""></div>
              <div class="tag-tab-right">
                <div class="tab-right-name">信息报备</div>
                <div class="tab-right-title">疫地抵返佛山人员</div>
              </div>
            </div>
          </div>
          <div class="list-tag list-tag-margin">
            <div class="list-tag-tab" @click="clickCheck(15)">
              <div class="tag-tab-left"><img src="/static/images/PersonalHomePage/yqfk3.png" alt=""></div>
              <div class="tag-tab-right">
                <div class="tab-right-name">患者同行速查</div>
                <div class="tab-right-title">确诊患者同行查询</div>
              </div>
            </div>
            <div class="list-tag-tab" @click="clickCheck(14)">
              <div class="tag-tab-left"><img src="/static/images/PersonalHomePage/yqfk2.png" alt=""></div>
              <div class="tag-tab-right">
                <div class="tab-right-name">疫情征集</div>
                <div class="tab-right-title">疫情相关信息征集</div>
              </div>
            </div>
          </div>
          <div class="list-tag">
            <div class="list-tag-tab" @click="clickCheck(31)">
              <div class="tag-tab-left"><img src="/static/images/PersonalHomePage/yqfk11.png" alt=""></div>
              <div class="tag-tab-right">
                <div class="tab-right-name">抗疫援企政策</div>
                <div class="tab-right-title">抗疫期间援企政策</div>
              </div>
            </div>
            <div class="list-tag-tab" @click="clickCheck(16)">
              <div class="tag-tab-left"><img src="/static/images/PersonalHomePage/yqfk4.png" alt=""></div>
              <div class="tag-tab-right">
                <div class="tab-right-name">疫情实时动态</div>
                <div class="tab-right-title">肺炎疫情实时动态</div>
              </div>
            </div>
          </div>
        </div>
      </div>-->
    </div>
    <lazy-component>
      <div class="content-tab">
        <div class="tab-head" @click="clickCheck(18)">
          <img src="/static/newEditionIndex/cunbanner.png" alt />
        </div>
        <div class="tab-middle">
          <div class="tab-middle-left">村居通</div>
          <div class="tab-middle-right" @click="clickCyt">
            <i></i>
            {{ userInfo.name ? userInfo.name : '请选择村居' }} [切换]
          </div>
        </div>
        <div class="tab-base">
          <div class="base-list">
            <div class="list-tag">
              <div class="list-tag-tab">
                <div class="tag-tab-left">
                  <img src="/static/newEditionIndex/xingcunzx.png" alt />
                </div>
                <div class="tag-tab-right">
                  <div @click="clickCheck(1)">
                    <div class="tab-right-name">乡村振兴</div>
                    <div class="tab-right-title">关注乡村振兴建设</div>
                  </div>
                  <div class="right-function-list">
                    <div
                      class="function-tab function-tab-border"
                      @click="clickCheck(2)"
                    >
                      招投标
                    </div>
                    <div
                      class="function-tab function-tab-border"
                      @click="clickCheck(3)"
                    >
                      两委成员
                    </div>
                    <div
                      class="function-tab function-tab-border"
                      @click="clickCheck(4)"
                    >
                      党员先锋
                    </div>
                  </div>
                </div>
              </div>
              <div class="list-tag-tab">
                <div class="tag-tab-left">
                  <img src="/static/newEditionIndex/chuwujd.png" alt />
                </div>
                <div class="tag-tab-right">
                  <div @click="clickCheck(5)">
                    <div class="tab-right-name">村务监督</div>
                    <div class="tab-right-title">村务大小事查看</div>
                  </div>
                  <div class="right-function-list">
                    <div class="function-tab" @click="clickCheck(6)">
                      红黑榜
                    </div>
                    <div class="function-tab" @click="clickCheck(7)">
                      村居直联
                    </div>
                    <div class="function-tab" @click="clickCheck(8)">
                      村居概况
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </lazy-component>
    <lazy-component>
      <div class="content-tab">
        <div class="tab-head" @click="clickCheck(21)">
          <img src="/static/newEditionIndex/qiyebanner.png" alt />
        </div>
        <div class="tab-middle">
          <div class="tab-middle-left">企业+</div>
        </div>
        <div class="tab-base">
          <div class="base-list">
            <div class="list-tag list-tag-margin">
              <div class="list-tag-tab" @click="clickCheck(9)">
                <div class="tag-tab-left">
                  <img src="/static/newEditionIndex/fanyi.png" alt />
                </div>
                <div class="tag-tab-right">
                  <div class="tab-right-name">企业反映</div>
                  <div class="tab-right-title">企业问题马上反映</div>
                </div>
              </div>
              <div class="list-tag-tab" @click="clickCheck(32)">
                <div class="tag-tab-left">
                  <img src="/static/newEditionIndex/qyrz.png" alt />
                </div>
                <div class="tag-tab-right">
                  <div class="tab-right-name">企业认证</div>
                  <div class="tab-right-title">获取企业二维码</div>
                </div>
              </div>
            </div>
            <div class="list-tag list-tag-margin">
              <div class="list-tag-tab" @click="clickCheck(10)">
                <div class="tag-tab-left">
                  <img src="/static/newEditionIndex/zhaopin.png" alt />
                </div>
                <div class="tag-tab-right">
                  <div class="tab-right-name">企业招聘</div>
                  <div class="tab-right-title">企业岗位招聘发布</div>
                </div>
              </div>
              <div class="list-tag-tab" @click="clickCheck(33)">
                <div class="tag-tab-left">
                  <img src="/static/newEditionIndex/ymjzdj.png" alt />
                </div>
                <div class="tag-tab-right">
                  <div class="tab-right-name">疫苗接种登记</div>
                  <div class="tab-right-title">企业员工接种登记</div>
                </div>
              </div>
            </div>
            <div class="list-tag list-tag-margin">
              <div class="list-tag-tab" @click="clickCheck(11)">
                <div class="tag-tab-left">
                  <img src="/static/newEditionIndex/xuanchuan.png" alt />
                </div>
                <div class="tag-tab-right">
                  <div class="tab-right-name">我要宣传</div>
                  <div class="tab-right-title">宣传信息发布</div>
                </div>
              </div>
              <div
                class="list-tag-tab"
                @click="() => this.$router.push('/sysptdc')"
              >
                <div class="tag-tab-left">
                  <img src="../../../images/topic.png" alt />
                </div>
                <div class="tag-tab-right">
                  <div class="tab-right-name">上云上平台调查</div>
                  <div class="tab-right-title">工业企业信息化调查</div>
                </div>
              </div>
              <!-- <div class="list-tag-tab" @click="clickCheck(12)">
                <div class="tag-tab-left">
                  <img src="/static/newEditionIndex/zhenci.png" alt />
                </div>
                <div class="tag-tab-right">
                  <div class="tab-right-name">优惠政策</div>
                  <div class="tab-right-title">优惠政策查看</div>
                </div>
              </div> -->
            </div>
          </div>
        </div>
      </div>
    </lazy-component>
  </div>
</template>

<script>
import { HasVid } from "@/js/until";
import { Dialog } from "vant";

export default {
  computed: {
    userInfo () {
      return this.$store.state.userinfo;
    },
  },
  methods: {
    clickCyt () {
      this.$router.push("/AreaSelection");
    },

    clickCheck (item) {
      switch (item) {
        case 1:
          HasVid("/indexHome/4/{vid}");
          break;
        case 2:
          HasVid("/TenderAnnouncement/{vid}");
          break;
        case 3:
          HasVid("/lwcys/{vid}");
          break;
        case 4:
          HasVid("/indexHome/3/{vid}");
          break;
        case 5:
          HasVid("/VillageSupervision/{vid}");
          break;
        case 6:
          HasVid("/hhb/{vid}");
          break;
        case 7:
          HasVid("/cjzl/{vid}");
          break;
        case 8:
          HasVid("/cjgk/3/{vid}");
          break;
        case 9:
          this.$router.push(`/enterpriseReflect/2`);
          break;
        case 10:
          this.$router.push(`/qyzp`);
          break;
        case 11:
          this.$router.push(`/qyxc`);
          break;
        case 12:
          this.$router.push(`/nrfb/16`);
          break;
        case 14:
          window.location.href =
            "https://foshantoont700.systoon.com/foshannewoutbreaks-static/m/index.html#/";
          break;
        case 13:
          window.location.href =
            "https://foshantoont700.systoon.com/foshannewoutbreaks-static/m/index.html#/InformationReporting";
          break;
        case 15:
          window.location.href =
            "https://h5.peopleapp.com/txcx/index.html?from=groupmessage";
          break;
        case 16:
          window.location.href =
            "https://ncov.dxy.cn/ncovh5/view/pneumonia_peopleapp?from=groupmessage&isappinstalled=0";
          break;
        case 17:
          this.$router.push(`/yqfkzl`);
          break;
        case 18:
          HasVid("/indexHome/2/{vid}");
          break;
        case 19:
          window.location.href =
            "https://foshantoont700.systoon.com/foshannewoutbreaks-static/m/index.html#/IllegalWork";
          break;
        case 20:
          this.$router.push("/fgtb");
          break;
        case 21:
          this.$router.push("/indexHome/5");
          break;
        case 22:
          this.$dialog
            .alert({
              title: "温馨提示",
              message:
                "企业口罩网上申购功能暂时停止，如有口罩申购需求请与企业属地镇（街道）、西江产业新城管委会联系。 <br/>荷城街道经促局：88988976 <br/>杨和镇经促局：88809681<br/>明城镇经促局：88836188<br/>更合镇经促局：88843980<br/>西江产业新城：88629036",
            })
            .then(() => { });
          break;
        case 23:
          this.$router.push("/sblist");
          // Dialog.alert({
          //   title: '温馨提示',
          //   confirmButtonText:'知道了',
          //   confirmButtonColor:'#00bede',
          // 	message: '如有需要报名的人员请与企业沟通，由企业向所属镇街进行报名，再由区经济科技促进局统计人数后，按超过20人，不多于23人的原则，以确定乘车地点并进行发车。'
          // }).then(() => {
          // });
          break;
        case 30:
          this.$router.push("/txewm");
          break;
        case 31:
          this.$router.push("/nrfb/43");
          break;
        case 32:
          this.$router.push('/qyrz');
          break;
        case 33:
          this.$router.push('/ymdj');
          break;
        default:
          break;
      }
    },
  },
};
</script>

<style lang='scss' scoped>
@import '../style/pageContent.scss';
</style>