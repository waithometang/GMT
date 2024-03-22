<template>
    <div>
    <div class="header">
        <img src="/static/images/PersonalHomePage/yqfkbnr2.png" alt="">
    </div>
    <div class="pageContent">
    <div class="content-tab">
      <!-- <div class="tab-middle">
        <div class="tab-middle-left">疫情防控</div>
      </div> -->
      <div class="tab-base">
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
            <div class="list-tag-tab" @click="clickCheck(32)">
              <div class="tag-tab-left"><img src="/static/images/PersonalHomePage/jkdk.png" alt=""></div>
              <div class="tag-tab-right">
                <div class="tab-right-name">健康打卡</div>
                <div class="tab-right-title">每日健康打卡</div>
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
          <div class="list-tag list-tag-margin">
            <!-- <div class="list-tag-tab" @click="clickCheck(22)">
              <div class="tag-tab-left"><img src="/static/images/PersonalHomePage/qyfgtb.png" alt=""></div>
              <div class="tag-tab-right">
                <div class="tab-right-name">企业口罩申购</div>
                <div class="tab-right-title">企业复工口罩申购</div>
              </div>
            </div> -->
            <div class="list-tag-tab" @click="clickCheck(15)">
              <div class="tag-tab-left"><img src="/static/images/PersonalHomePage/yqfk3.png" alt=""></div>
              <div class="tag-tab-right">
                <div class="tab-right-name">患者同行速查</div>
                <div class="tab-right-title">确诊患者同行查询</div>
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
          <!-- <div class="list-tag list-tag-margin"> -->
            <!-- <div class="list-tag-tab" @click="clickCheck(23)">
              <div class="tag-tab-left"><img src="/static/images/PersonalHomePage/yqtk8.png" alt=""></div>
              <div class="tag-tab-right">
                <div class="tab-right-name">返岗直通车</div>
                <div class="tab-right-title">企业员工返岗直通车</div>
              </div>
            </div> -->
          <!-- </div> -->
          <div class="list-tag list-tag-margin">
            <!-- <div class="list-tag-tab" @click="clickCheck(33)">
              <div class="tag-tab-left"><img src="/static/gtgsh1.png" alt=""></div>
              <div class="tag-tab-right">
                <div class="tab-right-name">个体工商户口罩申购</div>
                <div class="tab-right-title">个体工商户口罩抽签申购</div>
              </div>
            </div> -->
            <div class="list-tag-tab" @click="clickCheck(31)">
              <div class="tag-tab-left"><img src="/static/images/PersonalHomePage/yqfk11.png" alt=""></div>
              <div class="tag-tab-right">
                <div class="tab-right-name">抗疫援企政策</div>
                <div class="tab-right-title">抗疫期间援企政策</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <!-- <div class="content-tab fblist">
      <div class="tab-middle">
        <div class="tab-middle-left">信息发布</div>
      </div>
      <div class="tab-base">
        <GmtSearchList url="api/Common/PulishList" :parms="{mkId:1,fblxId:42}" :useSearch="false" >
            <template slot="item" slot-scope="listData">
                <GmtDefaultList :listData="listData.data" :mkid='1'></GmtDefaultList>
            </template>
        </GmtSearchList>
      </div>
    </div> -->
    </div>
    </div>
</template>


<script>
import GmtSearchList from "@/components/GmtSearchList.vue";
import GmtDefaultList from '@/components/GmtDefaultList'
import { Dialog } from 'vant';

export default {
  components: {
    GmtSearchList,
    GmtDefaultList
  },
    methods: {
        clickCheck (item) {
            switch (item) {
                case 14:
                window.location.href = 'https://foshantoont700.systoon.com/foshannewoutbreaks-static/m/index.html#/'
                break;
                case 13:
                window.location.href = 'https://foshantoont700.systoon.com/foshannewoutbreaks-static/m/index.html#/InformationReporting'
                break;
                case 15:
                window.location.href = 'https://h5.peopleapp.com/txcx/index.html?from=groupmessage'
                break;
                case 16:
                window.location.href = 'https://ncov.dxy.cn/ncovh5/view/pneumonia_peopleapp?from=groupmessage&isappinstalled=0'
                break;
                case 19:
                window.location.href = 'https://foshantoont700.systoon.com/foshannewoutbreaks-static/m/index.html#/IllegalWork'
                break;
                case 20:
                this.$router.push('/fgtb')
                break;
                case 22:
                  this.$dialog.alert({
                    title: "温馨提示",
                    message: "企业口罩网上申购功能暂时停止，如有口罩申购需求请与企业属地镇（街道）、西江产业新城管委会联系。 <br/>荷城街道经促局：88988976 <br/>杨和镇经促局：88809681<br/>明城镇经促局：88836188<br/>更合镇经促局：88843980<br/>西江产业新城：88629036"
                    }).then(() =>{
                    })
                // this.$router.push('/fgsbindex')
                break;
                case 23:
                // this.$router.push('/fgdjIndex')
                Dialog.alert({
                  title: '温馨提示',
                  confirmButtonText:'知道了',
                  confirmButtonColor:'#00bede',
                  message: '如有需要报名的人员请与企业沟通，由企业向所属镇街进行报名，再由区经济科技促进局统计人数后，按超过20人，不多于23人的原则，以确定乘车地点并进行发车。'
                }).then(() => {
                });
                break;
                case 30:
                this.$router.push('/txewm')
                break;
                case 31:
                this.$router.push('/nrfb/43')
                break;
                case 32:
                this.$router.push('/jkdk')
                break;
                case 33:
                this.$router.push('/sblist')
                default:
                break;
            }
            }
    }
}
</script>

<style lang='scss' scoped>
@import '@/pages/newEditionIndex/style/pageContent.scss';

// .pageContent .content-tab{
//   padding: 0 25px;
// }
.fblist{
    margin-left: 0px;
    padding-left: 0px !important;
    .tab-base{
        position: relative;
        height: 650px;
    }
    .tab-middle-left{
        margin-left: 30px;
    }
}
.header{
    width: 100%;
    img{
        width: 100%;
    }
}
.tab-middle{
    padding-top: 20px;
}
</style>