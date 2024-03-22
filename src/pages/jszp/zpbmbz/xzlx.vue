<template>
  <div class="xxxzlx">
    <div class="middle">
      <div class="middle-title">请选择人员类别:</div>
      <div class="type-list">
        <div
          class="list-tab"
          :class="{ 'list-tab-action': selectRxlb === rxlb }"
          v-for="(rxlb, index) in rxlbs"
          :key="index"
          @click="select(rxlb)"
        >
          {{ rxlb.lxmc }}
          <div class="detail">{{ rxlb.bz }}</div>
        </div>
      </div>
    </div>
    <div class="base">
      <div class="base-tab">
        <div class="public-long-but" @click="beforeStep">上一步</div>
      </div>
      <div class="base-tab">
        <div class="public-long-but" @click="nextStep">下一步</div>
      </div>
    </div>
  </div>
</template>
 
<script>

export default {
  computed: {
    bmid () {
      return this.$route.query.bmid;
    },
    isView () {
      //查看模式，不能修改
      return this.$route.query.m === "v";
    },
    isEdit () {
      //查看模式，待审查前
      return this.$route.query.m === "e";
    },
  },
  data () {
    return {
      selectRxlb: "",
      rxlbs: [],
      gwxxId: '',
      dxlxs: [],
      bykssj: '',
      byjssj: ''
    };
  },
  methods: {
    select (i) {
      if (this.isView) {
        return
      } else {
        this.selectRxlb = i
      }
    },
    nextStep () {
      if (!this.selectRxlb) {
        this.$toast.fail('请选择类型')
        return
      }
      // console.log(this.selectRxlb);
      if (!this.bmid) {
        var tempData = JSON.parse(localStorage.getItem('tempJszpData' + this.gwxxId)).baseData
      } else {
        var tempData = Object.assign(JSON.parse(localStorage.getItem('tempJszpDataJTCY'))[0], JSON.parse(localStorage.getItem('baseData')))
      }
      if (this.selectRxlb.id === 11) {
        this.getBysj(this.selectRxlb.lxmc)
        if (parseInt(this.getAge(tempData.csrq)) > 30) {
          this.$toast.fail('年龄条件不符合公告要求')
          return
        }
        if (['本科学历学士学位', '研究生学历硕士学位', '研究生学历博士学位'].indexOf(tempData.xl) === -1) {
          this.$toast.fail('学历学位条件不符合公告要求')
          return
        }
        if (parseInt(tempData.bysj.split('-')[0]) < parseInt(this.bykssj.split('-')[0]) || parseInt(tempData.bysj.split('-')[0]) > parseInt(this.byjssj.split('-')[0])) {
          this.$toast.fail('本类别人员的毕业时间应为' + this.bykssj + '至' + this.byjssj + '才能参加此次招考！')
          return
        }
      }
      if (this.selectRxlb.id === 1) {
        this.getBysj(this.selectRxlb.lxmc)
        if (this.getAge(tempData.csrq) > 30) {
          this.$toast.fail('年龄条件不符合公告要求')
          return
        }
        if (['本科学历学士学位', '研究生学历硕士学位', '研究生学历博士学位'].indexOf(tempData.xl) === -1) {
          this.$toast.fail('学历学位条件不符合公告要求')
          return
        }
        if (parseInt(tempData.bysj.split('-')[0]) < parseInt(this.bykssj.split('-')[0]) || parseInt(tempData.bysj.split('-')[0]) > parseInt(this.byjssj.split('-')[0])) {
          this.$toast.fail('本类别人员的毕业时间应为' + this.bykssj + '至' + this.byjssj + '才能参加此次招考！')
          return
        }
      }
      if (this.selectRxlb.id === 2) {
        this.getBysj(this.selectRxlb.lxmc)
        if (this.getAge(tempData.csrq) > 30) {
          this.$toast.fail('年龄条件不符合公告要求')
          return
        }
        if (['本科学历学士学位', '研究生学历硕士学位', '研究生学历博士学位'].indexOf(tempData.xl) === -1) {
          this.$toast.fail('学历学位条件不符合公告要求')
          return
        }
        if (parseInt(tempData.bysj.split('-')[0]) < parseInt(this.bykssj.split('-')[0]) || parseInt(tempData.bysj.split('-')[0]) > parseInt(this.byjssj.split('-')[0])) {
          this.$toast.fail('本类别人员的毕业时间应为' + this.bykssj + '至' + this.byjssj + '才能参加此次招考！')
          return
        }
      }
      if (this.selectRxlb.id === 5) {
        this.getBysj(this.selectRxlb.lxmc)
        if (parseInt(this.getAge(tempData.csrq)) > 35) {
          this.$toast.fail('年龄条件不符合公告要求')
          return
        }
        if (tempData.lngzjy === '否') {
          this.$toast.fail('任教经历不符合公告要求')
          return
        }
      }
      if (this.selectRxlb.id === 3) {
        this.getBysj(this.selectRxlb.lxmc)
        if (parseInt(this.getAge(tempData.csrq)) > 35) {
          this.$toast.fail('年龄条件不符合公告要求')
          return
        }
        if (['研究生学历硕士学位', '研究生学历博士学位'].indexOf(tempData.xl) === -1) {
          this.$toast.fail('学历学位条件不符合公告要求')
          return
        }
        if (tempData.lngzjy === '否') {
          this.$toast.fail('任教经历不符合公告要求')
          return
        }
        if (parseInt(tempData.bysj.split('-')[0]) < parseInt(this.bykssj.split('-')[0]) || parseInt(tempData.bysj.split('-')[0]) > parseInt(this.byjssj.split('-')[0])) {
          this.$toast.fail('本类别人员的毕业时间应为' + this.bykssj + '至' + this.byjssj + '才能参加此次招考！')
          return
        }
      }
      if (this.selectRxlb.id === 12) {
        this.getBysj(this.selectRxlb.lxmc)
        if (parseInt(this.getAge(tempData.csrq)) > 35) {
          this.$toast.fail('年龄条件不符合公告要求')
          return
        }
        if (tempData.lngzjy === '否') {
          this.$toast.fail('任教经历不符合公告要求')
          return
        }
      }
      if (this.selectRxlb.id === 13) {
        this.getBysj(this.selectRxlb.lxmc)
        if (parseInt(this.getAge(tempData.csrq)) > 45) {
          this.$toast.fail('年龄条件不符合公告要求')
          return
        }
        if (tempData.lngzjy === '否') {
          this.$toast.fail('任教经历不符合公告要求')
          return
        }
      }
      if (this.selectRxlb.id === 4) {
        this.getBysj(this.selectRxlb.lxmc)
        if (parseInt(this.getAge(tempData.csrq)) > 35) {
          this.$toast.fail('年龄条件不符合公告要求')
          return
        }
        if (['本科学历学士学位', '研究生学历硕士学位', '研究生学历博士学位'].indexOf(tempData.xl) === -1) {
          this.$toast.fail('学历学位条件不符合公告要求')
          return
        }
        if (tempData.lngzjy === '否') {
          this.$toast.fail('任教经历不符合公告要求')
          return
        }
        if (tempData.syd !== '广东省佛山市高明区' && tempData.xhjd_qu !== '高明区') {
          this.$toast.fail('非高明区户籍或高明区生源')
          return
        }
        if (parseInt(tempData.bysj.split('-')[0]) < parseInt(this.bykssj.split('-')[0]) || parseInt(tempData.bysj.split('-')[0]) > parseInt(this.byjssj.split('-')[0])) {
          this.$toast.fail('本类别人员的毕业时间应为' + this.bykssj + '至' + this.byjssj + '才能参加此次招考！')
          return
        }
      }
      if (this.selectRxlb.sfyjby === '是' && !this.isThisYear()) {
        this.$dialog.confirm({ title: "温馨提示", message: "本人已认真阅读《关于实行广东省普通高等学校毕业生就业择业期政策（试行）的通知》（粤教毕〔2019〕3号），确认本人属于择业期政策适用对象。" }).then(res => {
          this.gotoNext()
        })
      } else {
        this.gotoNext()
      }
    },
    isThisYear () {  //毕业时间是否填写了本年
      if (!this.$store.state.jszpData.baseData || !this.$store.state.jszpData.baseData.bysj)
        return false
      let by_year = this.$store.state.jszpData.baseData.bysj.split('-')[0]
      // console.log(this.$store.state.jszpData.baseData.bysj);
      return Number(by_year) == new Date().getFullYear()
    },
    gotoNext () {
      this.$store.state.jszpData.dxlxData = this.selectRxlb
      this.$router.push('sczl' + window.location.search)
    },
    beforeStep () {
      this.$router.go(-1)
    },
    getBmdata (bmid) {
      //获取已报名信息
      BmLb(bmid).then(rps => {
        if (rps.data.success) {
          this.oldLBData = rps.data.content.dm
          this.selectRxlb = this.rxlbs.find(el => el.dh === rps.data.content.dm) || ''
          if (this.selectRxlb) {
            let selectRxlx = this.selectRxlb.lxs.find(el => el.id === rps.data.content.rxlxid)
            selectRxlx && sessionInfo.save('selectZc', selectRxlx)
          }
        } else {
          this.changtoast(rps.data.message, "error");
        }
      });
    },
    getAge (strAge) {
      var birArr = strAge.split("-");
      var birYear = birArr[0];
      var birMonth = birArr[1];
      var birDay = birArr[2];

      d = new Date();
      var nowYear = d.getFullYear();
      var nowMonth = d.getMonth() + 1; //记得加1
      var nowDay = d.getDate();
      var returnAge;

      if (birArr == null) {
        return false
      };
      var d = new Date(birYear, birMonth - 1, birDay);
      if (d.getFullYear() == birYear && (d.getMonth() + 1) == birMonth && d.getDate() == birDay) {
        if (nowYear == birYear) {
          returnAge = 0; // 
        } else {
          var ageDiff = nowYear - birYear; // 
          if (ageDiff > 0) {
            if (nowMonth == birMonth) {
              var dayDiff = nowDay - birDay; // 
              if (dayDiff < 0) {
                returnAge = ageDiff - 1;
              } else {
                returnAge = ageDiff;
              }
            } else {
              var monthDiff = nowMonth - birMonth; // 
              if (monthDiff < 0) {
                returnAge = ageDiff - 1;
              } else {
                returnAge = ageDiff;
              }
            }
          } else {
            return "出生日期晚于今天，数据有误"; //返回-1 表示出生日期输入错误 晚于今天
          }
        }
        return returnAge;
      } else {
        return ("输入的日期格式错误！");
      }
    },
    getBysj (lxmc) {
      this.dxlxs.forEach(dxlx => {
        if (lxmc === dxlx.lxmc) {
          this.bykssj = dxlx.bykssj
          this.byjssj = dxlx.byjssj
        }
      });
    }
  },
  created () {
    let gwxxStr = sessionStorage.getItem('jszpDataGWXX')
    if (!gwxxStr) {
      this.$toast.fail('获取报考岗位信息失败,请重新选择')
      this.$router.replace('wybm')
      return
    }
    let gwxx = JSON.parse(gwxxStr)
    this.dxlxs = gwxx.dxlxs
    this.rxlbs = gwxx.dxlxs
    this.gwxxId = gwxx.id

  }
};
</script>

<style lang='scss' scoped>
@import '../style/xxxzlx.scss';
</style>