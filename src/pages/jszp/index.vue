<template>
  <div class="index">
    <div class="head">
      <div class="icon"><img src="/static/zkbm/jsbanner2.png" alt="" /></div>
      <div class="category">
        <div class="category-tab" @click="wybmFn">
          <div class="tab-right tab-sjzp"></div>
          <div class="tab-left">
            <div class="left-head">我要报考</div>
            <div class="left-base">点击进行报考</div>
          </div>
        </div>
        <div class="category-tab" @click="wycxFn">
          <div class="tab-right"></div>
          <div class="tab-left">
            <div class="left-head">点击查询</div>
            <div class="left-base">所有报考记录</div>
          </div>
        </div>
      </div>
    </div>
    <div class="inform">
      <notification :mkid="12" />
    </div>
    <div class="procedure">
      <div class="procedure-name">报考步骤</div>
      <div class="procedure-list">
        <div class="bar" v-for="(item, index) in listData" :key="index">
          <div class="icon-name">
            <div class="icon"><img :src="item.icon" alt="" /></div>
            <div class="name">{{ item.name }}</div>
          </div>
          <div class="procedure-bar">
            <div class="bar-icon">
              <img src="/static/ybmimages/jiantou_2.png" alt="" />
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="RecentNewsList">
      <!-- <div class="information-title">
        <div class="title-icon">信息发布</div>
        <div class="title-more" @click="viewMore">更多<div class="more-icon"></div></div>
      </div>
      <div class="information-list">
        <div class="information-tab" v-for="(item, index) in publishData" :key="index" @click="lookOver(item)">
          <div class="tab-head">{{item.title}}</div>
          <div class="tab-base">
            <div class="base-time">
              <div class="time-icon"></div>
              {{item.publishTime}}
            </div>
          </div>
        </div>
      </div> -->
      <!-- <recent-news :GMT_TageState="12" :showFbIds="showFbId"></recent-news> -->
      <div class="xxfb procedure">
        <div class="procedure-name">文件下载</div>
        <div class="content">
          <!-- <a class="row" download="高明区事业单位公开招聘工作人员报名表.doc" href="/files/template/jszp/baoming.doc">
                <van-row>
                    <van-col><div class="wordimg"><img src="/static/zkbm/wendang.png"/></div></van-col>
                    <van-col :span="19">
                        <div class="filename">高明区事业单位公开招聘工作人员报名表.doc</div>
                        <div class="filesize">37K</div>
                    </van-col>
                </van-row>
            </a> -->
          <a
            class="row"
            download="2021年佛山市高明区公开招聘中小学教师职位表（第三场）.xls"
            href="/files/template/jszp/附件1：2021年佛山市高明区公开招聘中小学教师职位表（第三场）.xls"
          >
            <van-row>
              <van-col
                ><div class="wordimg">
                  <img src="./image/xls.png" /></div
              ></van-col>
              <van-col :span="19">
                <div class="filename">
                  2021年佛山市高明区公开招聘中小学教师职位表（第三场）.xls
                </div>
                <!-- <div class="filesize">15K</div> -->
              </van-col>
            </van-row>
          </a>
          <a
            class="row"
            download="考生提交纸质应聘材料清单.pdf"
            href="/files/template/jszp/附件2：考生提交纸质应聘材料清单.pdf"
          >
            <van-row>
              <van-col
                ><div class="wordimg">
                  <img src="./image/pdf.png" /></div
              ></van-col>
              <van-col :span="19">
                <div class="filename">考生提交纸质应聘材料清单.pdf</div>
                <!-- <div class="filesize">15K</div> -->
              </van-col>
            </van-row>
          </a>
          <a
            class="row"
            download="广东省2021年考试录用公务员专业参考目录.xls"
            href="/files/template/jszp/附件3：广东省2021年考试录用公务员专业参考目录.xls"
          >
            <van-row>
              <van-col
                ><div class="wordimg">
                  <img src="./image/xls.png" /></div
              ></van-col>
              <van-col :span="19">
                <div class="filename">
                  广东省2021年考试录用公务员专业参考目录.xls
                </div>
                <!-- <div class="filesize">15K</div> -->
              </van-col>
            </van-row>
          </a>
          <a
            class="row"
            download="教师资质承诺书.doc"
            href="/files/template/jszp/附件4：教师资质承诺书.doc"
          >
            <van-row>
              <van-col
                ><div class="wordimg">
                  <img src="./image/doc.png" /></div
              ></van-col>
              <van-col :span="19">
                <div class="filename">教师资质承诺书.doc</div>
                <!-- <div class="filesize">15K</div> -->
              </van-col>
            </van-row>
          </a>
          <a
            class="row"
            download="2021年佛山市高明区公开招聘中小学教师考生个人健康状况承诺书.pdf"
            href="/files/template/jszp/附件5：2021年佛山市高明区公开招聘中小学教师考生个人健康状况承诺书.pdf"
          >
            <van-row>
              <van-col
                ><div class="wordimg">
                  <img src="./image/pdf.png" /></div
              ></van-col>
              <van-col :span="19">
                <div class="filename">
                  2021年佛山市高明区公开招聘中小学教师考生个人健康状况承诺书.pdf
                </div>
                <!-- <div class="filesize">15K</div> -->
              </van-col>
            </van-row>
          </a>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { Tzgg } from "@/api/FirstLevelPage";
import Notification from "@/components/FirstLevelPage/notification"
import RecentNews from "@/components/FirstLevelPage/recentNews"
import wjutils from '@/js/WjSmrzUtil'
import { Dialog } from "vant"
import { storage } from "@/js/until";
import { mapActions } from 'vuex'
export default {
  components: {
    Notification,
    RecentNews
  },
  data () {
    return {
      listData: [{ name: '报考申请', icon: '/static/zkbm/bmsq.png' }, { name: '资格审核', icon: '/static/zkbm/bmsh.png' }, { name: '获取准考证', icon: '/static/zkbm/bmzkz.png' }],
      publishData: '',
      tzggData: [],
      showFbId: { Id: 48, Name: '信息发布' },
      ksrq: '',
      jsrq: '',
      ifEnlist: true
    }
  },
  created () {
    this.$showSubscribe().then(() => {
      wjutils.gotoSMRZIfNot(this, this.init)
    })
    this.$post('api/jszp/GetCcxx').then(res => {
      this.$indicator.close()
      if (res.data.success) {
        this.ksrq = this.changeData(res.data.content.ksrq)
        this.ksrq = this.ksrq + ' ' + res.data.content.kssj
        this.jsrq = this.changeData(res.data.content.jsrq)
        this.jsrq = this.jsrq + ' ' + res.data.content.jssj
        this.ifEnlist = this.isDuringDate(this.ksrq, this.jsrq)
      } else {
        this.changtoast(res.data.message, 'error')
      }
    })
    Dialog.alert({
      message: `1.采用手机端报名；<br/>2.报考期间持续关注“高明通”，后续招考信息将通过“高明通”推送；<br/>3.须在报名系统上传本人近两年的彩色免冠正面证件电子照片（格式为*.JPG格式，大小为10KB以下）；`,
    }).then(() => {
    });
  },
  activated () {
    document.title = '教师招聘服务平台'
  },
  methods: {
    ...mapActions(['getGrxx']),
    // confirmFn(){
    //   this.$dialog({title:'温馨提示',message:'是否下载'})
    // },
    wybmFn () {
      if (this.ifEnlist) {
        this.$router.push('jszp/ydgg')
      } else {
        this.$dialog.alert({
          title: "温馨提示",
          message: `教师招聘报名时间为<br/>` + this.ksrq + '至' + this.jsrq
        })
      }
    },
    wycxFn () {
      this.$router.push('jszp/wdbm/list')
    },
    lookOver (item) {
      if (item.linkage) {
        window.location = item.linkage
      } else {
        this.$router.push(`/fbxq/${item.id}`)
      }
    },
    clickTzgg (item) {
      this.$router.push(`/tzggxq/${item.id}`)
    },
    examineList () {
      this.$router.push('/tzgg_list/11')
    },
    seeAbout () {
      this.$router.push(`/cx`)
    },
    viewMore () {
      this.$router.push(`/zxdt`)
    },
    init () {
      this.getGrxx().then(Grxx => {
        if (!Grxx.hasSM) {
          storage.save('path', this.$route.fullPath)
          wjutils.gotoSMRZ(this, 'http://gmt.gaoming.gov.cn/smrz')
        }
      })
    },
    isDuringDate (beginDateStr, endDateStr) {
      var curDate = new Date()
      var beginDate = new Date(beginDateStr.replace(/-/g, "/"))
      var endDate = new Date(endDateStr.replace(/-/g, "/"))
      if (curDate >= beginDate && curDate <= endDate) {
        return true;
      }
      return false;
    },
    changeData (data) {
      var da = new Date(
        data
          .replace('/Date(', '')
          .replace(')/', '')
          .split('+')[0]
      )
      return (
        da.getFullYear() +
        '-' +
        (da.getMonth() + 1) +
        '-' +
        da.getDate())
    }
  }
}
</script>

<style lang='scss'>
@import '../zkbm/style/index.scss';
.index {
  overflow-x: hidden;
}
.xxfb {
  margin-top: 2.133vw;
  background-color: #fff;
  .procedure-name {
    line-height: 60px;
  }
  .content {
    .row {
      margin: 20px;
      .wordimg {
        width: 48px;
        height: 65px;
        img {
          width: 100%;
        }
      }
      .filename {
        padding-left: 28px;
        font-size: 28px;
        font-family: PingFang SC;
        font-weight: 400;
        color: rgba(51, 51, 51, 1);
        line-height: 35px;
      }
      .filesize {
        width: 50px;
        padding-left: 28px;
        font-size: 26px;
        font-family: PingFang SC;
        font-weight: 400;
        color: rgba(137, 137, 137, 1);
        line-height: 37px;
      }
    }
  }
}
.van-dialog__message {
  text-align: left !important;
}
</style>