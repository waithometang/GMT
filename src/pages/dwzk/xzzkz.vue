<template>
  <div class="ydxz">
    <div class="header">重要提醒</div>
    <div class="content">
      <div>
        一、请于5月22日上午9:00前下载报名表，逾期系统关闭将无法打印报名表。本报名表是考生参加面谈和面试环节的重要凭据，考生必须妥善保管。
      </div>
      <div>
        二、在面谈或专业试现场，须向工作人员提交齐全的纸质应聘材料。在规定时间内未按要求当场提交纸质应聘材料的，视为自动放弃面谈或专业试资格。纸质资料审核通过后，方可参加面谈或专业试。
      </div>
      <div>
        三、考生必须提前注册本人的粤康码，并在粤省事健康申报功能中如实登记个人近期旅居史、接触史、身体健康状况、来粤方式等情况。
      </div>
      <div>
        四、考生在进入考点时，应主动出示粤康码绿码，接受体温检测，并全程佩戴一次性医用口罩。如粤康码为红码、黄码或体温≥37.3℃，不得进入考场。在抵达高明之日起计算，14天内曾去过中、高风险地区的考生，要主动报告，并出示当地的核酸检测报告（7日内有效）。考生可通过粤省事小程序中的疫情区域查询到中、高风险地区，并请留意官方权威发布的最新动态。
      </div>
      <div>其他未尽事宜，请自行认真阅读招聘公告。</div>
      <div class="detail read">
        <van-checkbox
          v-model="checked"
          :disabled="cannotClick"
          icon-size="4vw"
        ></van-checkbox
        ><span @click="readFn">本人已仔细阅读且知悉，确认打印准考证</span>
      </div>
      <div class="base">
        <div class="base-tab width">
          <div
            v-if="!checked || cannotClick"
            @click="xzbtFn"
            class="public-long-but"
            :class="{ noEdit: cannotClick }"
          >
            下载准考证<span v-if="cannotClick">（{{ count }}）</span>
          </div>
          <a
            v-else
            download="准考证.docx"
            :href="zkzUrl"
            class="public-long-but"
          >
            下载准考证</a
          >
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      gwxx: {},
      checked: false,
      count: 10,
      cannotClick: true,
      zkzUrl: '',
    }
  },
  created () {
    if (!this.$route.params.zkzUrl) {
      this.$router.go(-1)
      return
    }
    this.zkzUrl = this.$route.params.zkzUrl
    setTimeout(this.countFn, 1000)
  },
  methods: {
    countFn () {  //倒数
      this.count--
      if (this.count === 0) {
        this.cannotClick = false
      } else {
        setTimeout(this.countFn, 1000)
      }
    },
    xzbtFn () {
      if (!this.checked) {
        this.$toast.fail('请确认阅读细则')
      }
    },
    readFn () {
      this.checked = !this.checked
    },
    getWord (content) {
      return content || '无'
    },
  }
}
</script>

<style lang="scss" scoped>
.ydxz {
  .header {
    margin-top: 40px;
    height: 31px;
    font-size: 32px;
    font-family: PingFang SC;
    font-weight: bold;
    text-align: center;
    color: rgba(51, 51, 51, 1);
    line-height: 56px;
  }
  .content {
    padding: 50px 50px 10px 50px;
    font-size: 28px;
    font-family: PingFang SC;
    color: rgba(51, 51, 51, 1);
    line-height: 48px;
    .detail {
      font-size: 28px;
      font-family: PingFang SC;
      font-weight: 400;
      color: rgba(51, 51, 51, 1);
      line-height: 48px;
    }
    .read {
      padding-top: 40px;
      .van-checkbox {
        display: inline-block;
        margin-right: 10px;
      }
    }
    .base {
      width: 600px;
      position: absolute;
      bottom: 50px;
      left: 50%;
      margin-left: -300px;
    }
    .wordimg {
      width: 80px;
      height: 90px;
      img {
        width: 100%;
      }
    }
    .tip {
      height: 26px;
      font-size: 28px;
      padding: 50px 0;
      font-family: PingFang SC;
      font-weight: bold;
      color: rgba(16, 16, 16, 1);
      line-height: 37px;
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
    .public-long-but {
      background-color: #3296ea;
      margin-top: 30px;
      color: #fff;
      display: block;
    }
    .noEdit {
      background-color: rgba(137, 137, 137, 1);
    }
  }
}
</style>
